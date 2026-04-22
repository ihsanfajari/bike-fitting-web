"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils,
  NormalizedLandmark,
} from "@mediapipe/tasks-vision";
import { BIKE_STANDARDS, BikeType } from "@/config/bikeFitStandards";
import { calculateFitResult, FitResult, JointStatus } from "@/lib/bikeFitScoring";

const POSE_CONNECTIONS = PoseLandmarker.POSE_CONNECTIONS;
const SAMPLE_DURATION_MS = 5000;

interface LiveAngles {
  kneeLeft: number | null;
  kneeRight: number | null;
  elbowLeft: number | null;
  elbowRight: number | null;
  torso: number | null;
}

function calcAngle(a: NormalizedLandmark, b: NormalizedLandmark, c: NormalizedLandmark): number {
  const ax = a.x - b.x, ay = a.y - b.y;
  const cx = c.x - b.x, cy = c.y - b.y;
  const dot = ax * cx + ay * cy;
  const mag = Math.sqrt(ax * ax + ay * ay) * Math.sqrt(cx * cx + cy * cy);
  if (mag === 0) return 0;
  return Math.round(Math.acos(Math.min(1, Math.max(-1, dot / mag))) * (180 / Math.PI));
}

function drawAngleLabel(
  ctx: CanvasRenderingContext2D,
  lm: NormalizedLandmark,
  label: string,
  angle: number,
  w: number,
  h: number
) {
  const x = lm.x * w;
  const y = lm.y * h;
  ctx.font = "bold 18px monospace";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 3;
  ctx.fillStyle = "#FACC15";
  const text = `${label}: ${angle}°`;
  ctx.strokeText(text, x + 10, y);
  ctx.fillText(text, x + 10, y);
}

const STATUS_COLOR: Record<JointStatus, string> = {
  ideal:      "text-green-400",
  acceptable: "text-yellow-400",
  low:        "text-red-400",
  high:       "text-red-400",
};

const STATUS_LABEL: Record<JointStatus, string> = {
  ideal:      "Ideal ✅",
  acceptable: "Perlu penyesuaian ⚠️",
  low:        "Terlalu kecil ❌",
  high:       "Terlalu besar ❌",
};

const ANGLE_STATUS_COLOR: Record<string, string> = {
  ideal:      "bg-green-900 border-green-500",
  acceptable: "bg-yellow-900 border-yellow-500",
  low:        "bg-red-900 border-red-500",
  high:       "bg-red-900 border-red-500",
  none:       "bg-zinc-800 border-zinc-600",
};

function scoreColor(score: number) {
  if (score >= 80) return "text-green-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}

export default function PoseLandmarkerComponent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const landmarkerRef = useRef<PoseLandmarker | null>(null);
  const animFrameRef = useRef<number>(0);
  const samplesRef = useRef<{ knee: number; torso: number; elbow: number }[]>([]);
  const samplingRef = useRef(false);
  const samplingStartRef = useRef(0);

  const [status, setStatus] = useState("Memuat model AI...");
  const [ready, setReady] = useState(false);
  const [bikeType, setBikeType] = useState<BikeType>("road");
  const [liveAngles, setLiveAngles] = useState<LiveAngles>({
    kneeLeft: null, kneeRight: null, elbowLeft: null, elbowRight: null, torso: null,
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [fitResult, setFitResult] = useState<FitResult | null>(null);

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

      setStatus("Model siap. Mengakses kamera...");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: "user" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadeddata = () => { setStatus(""); setReady(true); };
      }
    }

    init().catch((err) => setStatus(`Error: ${err.message}`));
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      landmarkerRef.current?.close();
    };
  }, []);

  const startAnalysis = useCallback(() => {
    samplesRef.current = [];
    samplingRef.current = true;
    samplingStartRef.current = performance.now();
    setFitResult(null);
    setAnalyzing(true);
    setCountdown(5);

    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(interval); return 0; }
        return c - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const drawingUtils = new DrawingUtils(ctx);
    let lastTime = -1;

    function detect() {
      if (video.currentTime !== lastTime && video.videoWidth > 0 && video.videoHeight > 0) {
        lastTime = video.currentTime;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const result = landmarkerRef.current!.detectForVideo(video, performance.now());
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const lm of result.landmarks) {
          drawingUtils.drawConnectors(lm, POSE_CONNECTIONS, { color: "#00FF00", lineWidth: 2 });
          drawingUtils.drawLandmarks(lm, { color: "#FF0000", lineWidth: 1, radius: 4 });

          const kneeL  = calcAngle(lm[23], lm[25], lm[27]);
          const kneeR  = calcAngle(lm[24], lm[26], lm[28]);
          const elbowL = calcAngle(lm[11], lm[13], lm[15]);
          const elbowR = calcAngle(lm[12], lm[14], lm[16]);
          const torso  = calcAngle(lm[11], lm[23], lm[25]);

          drawAngleLabel(ctx, lm[25], "Lutut L", kneeL,  canvas.width, canvas.height);
          drawAngleLabel(ctx, lm[26], "Lutut R", kneeR,  canvas.width, canvas.height);
          drawAngleLabel(ctx, lm[13], "Siku L",  elbowL, canvas.width, canvas.height);
          drawAngleLabel(ctx, lm[14], "Siku R",  elbowR, canvas.width, canvas.height);
          drawAngleLabel(ctx, lm[23], "Torso",   torso,  canvas.width, canvas.height);

          setLiveAngles({ kneeLeft: kneeL, kneeRight: kneeR, elbowLeft: elbowL, elbowRight: elbowR, torso });

          // Collect samples during analysis window
          if (samplingRef.current) {
            const elapsed = performance.now() - samplingStartRef.current;
            const knee = Math.min(kneeL, kneeR);
            const elbow = Math.round((elbowL + elbowR) / 2);
            samplesRef.current.push({ knee, torso, elbow });

            if (elapsed >= SAMPLE_DURATION_MS) {
              samplingRef.current = false;
              const standard = BIKE_STANDARDS[bikeType];
              const result = calculateFitResult(samplesRef.current, standard);
              setFitResult(result);
              setAnalyzing(false);
            }
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(detect);
    }

    animFrameRef.current = requestAnimationFrame(detect);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [ready, bikeType]);

  const angleCards = [
    { label: "Lutut Kiri",  value: liveAngles.kneeLeft },
    { label: "Lutut Kanan", value: liveAngles.kneeRight },
    { label: "Siku Kiri",   value: liveAngles.elbowLeft },
    { label: "Siku Kanan",  value: liveAngles.elbowRight },
    { label: "Torso",       value: liveAngles.torso },
  ];

  return (
    <div className="flex flex-col items-center gap-5 p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Bike Fitting — Pose Analysis</h1>

      {/* Bike type selector */}
      <div className="flex gap-3">
        {(["road", "mtb", "gravel"] as BikeType[]).map((type) => (
          <button
            key={type}
            onClick={() => { setBikeType(type); setFitResult(null); }}
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

      {/* Video + canvas */}
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
        <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
        {analyzing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="text-center">
              <p className="text-4xl font-bold text-yellow-400">{countdown}</p>
              <p className="text-white text-sm mt-1">Merekam posisi...</p>
            </div>
          </div>
        )}
      </div>

      {/* Live angle cards */}
      <div className="grid grid-cols-5 gap-3 w-full">
        {angleCards.map(({ label, value }) => (
          <div key={label} className="bg-zinc-800 border border-zinc-600 rounded-lg p-3 text-center">
            <p className="text-xs text-zinc-400">{label}</p>
            <p className="text-2xl font-bold text-yellow-400">{value !== null ? `${value}°` : "—"}</p>
          </div>
        ))}
      </div>

      {/* Analyse button */}
      <button
        onClick={startAnalysis}
        disabled={!ready || analyzing}
        className="px-8 py-3 rounded-full bg-white text-black font-semibold text-sm disabled:opacity-40 hover:bg-zinc-200 transition-colors"
      >
        {analyzing ? `Merekam... ${countdown}s` : "Analisis Posisi Saya"}
      </button>

      {/* Fit result */}
      {fitResult && (
        <div className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-5 flex flex-col gap-4">
          {/* Score */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Hasil Fitting</h2>
            <span className={`text-3xl font-bold ${scoreColor(fitResult.totalScore)}`}>
              {fitResult.totalScore}/100
            </span>
          </div>

          {/* Per joint */}
          <div className="grid grid-cols-3 gap-3">
            {(["knee", "torso", "elbow"] as const).map((joint) => {
              const r = fitResult[joint];
              const labels = { knee: "Lutut", torso: "Torso", elbow: "Siku" };
              return (
                <div
                  key={joint}
                  className={`rounded-lg p-3 border ${ANGLE_STATUS_COLOR[r.status]}`}
                >
                  <p className="text-xs text-zinc-300">{labels[joint]}</p>
                  <p className="text-xl font-bold text-white">{r.angle}°</p>
                  <p className={`text-xs mt-1 ${STATUS_COLOR[r.status]}`}>{STATUS_LABEL[r.status]}</p>
                </div>
              );
            })}
          </div>

          {/* Diagnosis + recommendations */}
          <div className="border-t border-zinc-700 pt-4 flex flex-col gap-2">
            <p className="text-sm text-zinc-400">Diagnosis</p>
            <p className="font-semibold">{fitResult.diagnosis}</p>
            <p className="text-sm text-zinc-400 mt-2">Rekomendasi</p>
            <ul className="flex flex-col gap-1">
              {fitResult.recommendations.map((r, i) => (
                <li key={i} className="text-sm flex gap-2">
                  <span className="text-yellow-400">→</span> {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <p className="text-gray-500 text-xs">
        Posisikan kamera dari <strong>samping (lateral view)</strong> untuk hasil terbaik.
      </p>
    </div>
  );
}
