"use client";

import { useEffect, useRef, useState } from "react";
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils,
  NormalizedLandmark,
} from "@mediapipe/tasks-vision";
import { BIKE_STANDARDS, BikeType } from "@/config/bikeFitStandards";
import { calculateFitResult, FitResult } from "@/lib/bikeFitScoring";
import {
  BodySide,
  selectBestSide,
  sideVisibility,
  computeJointAngles,
  drawAngleLabel,
  MIN_SIDE_VISIBILITY,
} from "@/lib/poseAngles";
import { analyzeFrames, FrameSample } from "@/lib/videoFitAnalysis";
import FitResultCard from "@/components/FitResultCard";

const SAMPLE_FPS = 15;
const MIN_DURATION_SEC = 5;
const MAX_DURATION_SEC = 30;
const MAX_FILE_MB = 100;
// Minimal proporsi frame dengan pose terdeteksi jelas agar hasil bisa dipercaya
const MIN_VALID_RATIO = 0.5;

interface DetectedFrame {
  t: number;
  lm: NormalizedLandmark[];
}

interface QualityInfo {
  cycles: number;
  validFrames: number;
  totalFrames: number;
  side: BodySide;
}

function seekTo(video: HTMLVideoElement, t: number): Promise<void> {
  return new Promise((resolve) => {
    // Fallback: seek ke posisi yang sama dengan currentTime tidak selalu
    // memicu "seeked" — jangan biarkan loop pemrosesan menggantung.
    const timer = setTimeout(() => {
      video.removeEventListener("seeked", onSeeked);
      resolve();
    }, 500);
    const onSeeked = () => {
      clearTimeout(timer);
      video.removeEventListener("seeked", onSeeked);
      resolve();
    };
    video.addEventListener("seeked", onSeeked);
    video.currentTime = t;
  });
}

export default function VideoAnalysis() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const landmarkerRef = useRef<PoseLandmarker | null>(null);
  const abortRef = useRef(false);
  // detectForVideo mensyaratkan timestamp naik monoton sepanjang umur landmarker,
  // termasuk saat user menganalisis video kedua — jangan pernah di-reset.
  const monoTsRef = useRef(0);
  const lastAnalysisRef = useRef<{ aggregate: FrameSample } | null>(null);

  const [modelReady, setModelReady] = useState(false);
  const [status, setStatus] = useState("Memuat model AI...");
  const [bikeType, setBikeType] = useState<BikeType>("road");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fitResult, setFitResult] = useState<FitResult | null>(null);
  const [quality, setQuality] = useState<QualityInfo | null>(null);

  useEffect(() => {
    async function init() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      landmarkerRef.current = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numPoses: 1,
      });
      setStatus("");
      setModelReady(true);
    }

    init().catch((err) => setStatus(`Error: ${err.message}`));
    return () => {
      abortRef.current = true;
      landmarkerRef.current?.close();
    };
  }, []);

  function resetResults() {
    setFitResult(null);
    setQuality(null);
    setErrorMsg(null);
    setProgress(0);
    lastAnalysisRef.current = null;
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    resetResults();

    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setErrorMsg(`Ukuran video maksimal ${MAX_FILE_MB} MB.`);
      return;
    }

    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoUrl(URL.createObjectURL(file));
  }

  // Ganti tipe sepeda setelah analisis: hitung ulang skor dari agregat tersimpan,
  // tanpa memproses ulang video.
  function handleBikeTypeChange(type: BikeType) {
    setBikeType(type);
    if (lastAnalysisRef.current) {
      setFitResult(calculateFitResult([lastAnalysisRef.current.aggregate], BIKE_STANDARDS[type]));
    }
  }

  async function analyzeVideo() {
    const video = videoRef.current;
    const landmarker = landmarkerRef.current;
    if (!video || !landmarker || !videoUrl) return;

    resetResults();
    setProcessing(true);
    abortRef.current = false;

    try {
      if (video.readyState < 1) {
        await new Promise<void>((resolve) => {
          video.addEventListener("loadedmetadata", () => resolve(), { once: true });
        });
      }

      const duration = video.duration;
      if (!isFinite(duration) || duration < MIN_DURATION_SEC) {
        setErrorMsg(`Video terlalu pendek. Rekam minimal ${MIN_DURATION_SEC} detik sambil mengayuh normal.`);
        return;
      }
      if (duration > MAX_DURATION_SEC) {
        setErrorMsg(`Video terlalu panjang (maks ${MAX_DURATION_SEC} detik). Potong ke bagian saat kamu mengayuh stabil.`);
        return;
      }

      // --- Tahap 1: ekstraksi frame (seek-based, deterministik) ---
      const step = 1 / SAMPLE_FPS;
      const detected: DetectedFrame[] = [];
      const sideVotes: Record<BodySide, number> = { left: 0, right: 0 };
      let totalFrames = 0;

      for (let t = 0; t < duration; t += step) {
        if (abortRef.current) return;
        totalFrames++;

        await seekTo(video, t);
        monoTsRef.current += Math.round(step * 1000);
        const result = landmarker.detectForVideo(video, monoTsRef.current);

        if (result.landmarks.length > 0) {
          const lm = result.landmarks[0];
          detected.push({ t, lm });
          const side = selectBestSide(lm);
          if (side) sideVotes[side]++;
        }

        setProgress(Math.round((t / duration) * 100));
      }
      setProgress(100);

      if (sideVotes.left + sideVotes.right === 0) {
        setErrorMsg("Tidak ada orang terdeteksi di video. Pastikan seluruh tubuh terlihat dari samping dengan pencahayaan cukup.");
        return;
      }

      // Kunci satu sisi tubuh untuk seluruh video (hindari flip-flop antar frame)
      const side: BodySide = sideVotes.left >= sideVotes.right ? "left" : "right";

      const w = video.videoWidth;
      const h = video.videoHeight;
      const samples: FrameSample[] = [];
      for (const f of detected) {
        if (sideVisibility(f.lm, side) < MIN_SIDE_VISIBILITY) continue;
        const { angles } = computeJointAngles(f.lm, side, w, h);
        samples.push({ t: f.t, ...angles });
      }

      if (samples.length / totalFrames < MIN_VALID_RATIO) {
        setErrorMsg("Kualitas deteksi terlalu rendah di sebagian besar video. Coba rekam ulang: kamera lebih jauh (seluruh tubuh + sepeda masuk frame), pencahayaan lebih terang.");
        return;
      }

      // --- Tahap 2: deteksi siklus kayuhan & agregasi ---
      const analysis = analyzeFrames(samples);
      if (!analysis.ok) {
        setErrorMsg(
          analysis.reason === "too-few-cycles"
            ? `Hanya ${analysis.cycles} putaran kayuhan terdeteksi (minimal 3). Kayuh pedal terus-menerus selama perekaman.`
            : "Frame valid terlalu sedikit untuk dianalisis. Coba rekam ulang dengan durasi lebih panjang."
        );
        return;
      }

      // --- Preview beranotasi: frame BDC siklus pertengahan video ---
      // Digambar SEBELUM set state hasil — begitu fitResult ter-set, elemen
      // video disembunyikan dan tidak bisa lagi jadi sumber drawImage.
      const midPeak = analysis.peakIndices[Math.floor(analysis.peakIndices.length / 2)];
      const peakT = samples[midPeak].t;
      const peakFrame = detected.find((f) => f.t === peakT);
      if (peakFrame && canvasRef.current) {
        await seekTo(video, peakT);
        const canvas = canvasRef.current;
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(video, 0, 0);

        const drawingUtils = new DrawingUtils(ctx);
        drawingUtils.drawConnectors(peakFrame.lm, PoseLandmarker.POSE_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: Math.max(2, w / 400),
        });
        drawingUtils.drawLandmarks(peakFrame.lm, {
          color: "#FF0000",
          lineWidth: 1,
          radius: Math.max(4, w / 200),
        });

        const { angles, anchors } = computeJointAngles(peakFrame.lm, side, w, h);
        drawAngleLabel(ctx, anchors.knee,  "Lutut", angles.knee,  w, h);
        drawAngleLabel(ctx, anchors.elbow, "Siku",  angles.elbow, w, h);
        drawAngleLabel(ctx, anchors.torso, "Torso", angles.torso, w, h);
      }

      lastAnalysisRef.current = { aggregate: { t: 0, ...analysis.aggregate } };
      setFitResult(calculateFitResult([analysis.aggregate], BIKE_STANDARDS[bikeType]));
      setQuality({
        cycles: analysis.cycles,
        validFrames: samples.length,
        totalFrames,
        side,
      });
    } catch (err) {
      setErrorMsg(`Gagal memproses video: ${err instanceof Error ? err.message : String(err)}. Coba format MP4 (H.264).`);
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-5 p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Bike Fitting — Analisis Video</h1>

      {/* Bike type selector */}
      <div className="flex gap-3">
        {(["road", "mtb", "gravel"] as BikeType[]).map((type) => (
          <button
            key={type}
            onClick={() => handleBikeTypeChange(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              bikeType === type
                ? "bg-white text-black border-white"
                : "bg-transparent text-zinc-400 border-zinc-600 hover:border-zinc-400"
            }`}
          >
            {BIKE_STANDARDS[type].label}
          </button>
        ))}
      </div>

      {status && <p className="text-yellow-400 text-sm">{status}</p>}

      {/* Panduan perekaman */}
      <div className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4">
        <p className="text-sm font-semibold mb-2">Cara merekam video yang baik:</p>
        <ul className="text-xs text-zinc-400 flex flex-col gap-1">
          <li>• Rekam <strong className="text-zinc-300">10–15 detik</strong> dari <strong className="text-zinc-300">samping</strong> (lateral) — seluruh tubuh & sepeda masuk frame</li>
          <li>• Sepeda statis di trainer/roller, kayuh pedal dengan kecepatan normal (minimal 5 putaran)</li>
          <li>• Kamera sejajar tinggi pinggul, posisi landscape, pencahayaan cukup</li>
        </ul>
      </div>

      {/* Upload area */}
      <label className="w-full border-2 border-dashed border-zinc-600 hover:border-zinc-400 rounded-xl p-8 text-center cursor-pointer transition-colors">
        <input
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={processing}
        />
        <p className="text-zinc-400 text-sm">Klik untuk upload video, atau drag & drop</p>
        <p className="text-zinc-600 text-xs mt-1">MP4, WebM, MOV · {MIN_DURATION_SEC}–{MAX_DURATION_SEC} detik · maks {MAX_FILE_MB} MB</p>
      </label>

      {/* Video preview (elemen ini juga dipakai untuk pemrosesan seek-based) */}
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          playsInline
          preload="auto"
          controls={!processing}
          className={`w-full rounded-xl bg-black ${fitResult ? "hidden" : ""}`}
        />
      )}

      {/* Progress */}
      {processing && (
        <div className="w-full">
          <div className="flex justify-between text-xs text-zinc-400 mb-1">
            <span>Menganalisis frame video di perangkatmu (video tidak di-upload ke server)...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {errorMsg && <p className="text-red-400 text-sm text-center">{errorMsg}</p>}

      {/* Analyse button */}
      <button
        onClick={analyzeVideo}
        disabled={!videoUrl || !modelReady || processing}
        className="px-8 py-3 rounded-full bg-white text-black font-semibold text-sm disabled:opacity-40 hover:bg-zinc-200 transition-colors"
      >
        {processing ? "Memproses..." : !modelReady ? "Menunggu model AI..." : "Analisis Video"}
      </button>

      {/* Annotated BDC frame — kanvas harus selalu ter-mount: penggambaran
          terjadi sebelum React re-render, jadi ref-nya wajib sudah tersedia */}
      <div className={`w-full flex flex-col gap-2 ${fitResult ? "" : "hidden"}`}>
        <div className="w-full rounded-xl overflow-hidden bg-black">
          <canvas ref={canvasRef} className="w-full h-auto" />
        </div>
        <p className="text-xs text-zinc-500 text-center">
          Frame saat pedal di titik terbawah (ekstensi lutut maksimum) — dasar pengukuran sudut lutut
        </p>
      </div>

      {/* Quality info */}
      {quality && (
        <div className="w-full grid grid-cols-3 gap-3">
          <div className="bg-zinc-800 border border-zinc-600 rounded-lg p-3 text-center">
            <p className="text-xs text-zinc-400">Putaran kayuhan</p>
            <p className="text-2xl font-bold text-yellow-400">{quality.cycles}</p>
          </div>
          <div className="bg-zinc-800 border border-zinc-600 rounded-lg p-3 text-center">
            <p className="text-xs text-zinc-400">Frame valid</p>
            <p className="text-2xl font-bold text-yellow-400">
              {Math.round((quality.validFrames / quality.totalFrames) * 100)}%
            </p>
          </div>
          <div className="bg-zinc-800 border border-zinc-600 rounded-lg p-3 text-center">
            <p className="text-xs text-zinc-400">Sisi tubuh</p>
            <p className="text-2xl font-bold text-yellow-400">{quality.side === "left" ? "Kiri" : "Kanan"}</p>
          </div>
        </div>
      )}

      {fitResult && <FitResultCard fitResult={fitResult} />}

      <p className="text-gray-500 text-xs">
        Semua analisis berjalan di browser — video kamu <strong>tidak pernah dikirim ke server</strong>.
      </p>
    </div>
  );
}
