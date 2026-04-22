"use client";

import { useEffect, useRef, useState } from "react";
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils,
  NormalizedLandmark,
} from "@mediapipe/tasks-vision";
import { BIKE_STANDARDS, BikeType } from "@/config/bikeFitStandards";
import { calculateFitResult, FitResult, JointStatus } from "@/lib/bikeFitScoring";

interface JointAngles {
  knee: number;
  torso: number;
  elbow: number;
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

const JOINT_BG: Record<JointStatus, string> = {
  ideal:      "bg-green-900 border-green-500",
  acceptable: "bg-yellow-900 border-yellow-500",
  low:        "bg-red-900 border-red-500",
  high:       "bg-red-900 border-red-500",
};

function scoreColor(score: number) {
  if (score >= 80) return "text-green-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}

export default function PhotoAnalysis() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const landmarkerRef = useRef<PoseLandmarker | null>(null);

  const [modelReady, setModelReady] = useState(false);
  const [status, setStatus] = useState("Memuat model AI...");
  const [bikeType, setBikeType] = useState<BikeType>("road");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [angles, setAngles] = useState<JointAngles | null>(null);
  const [fitResult, setFitResult] = useState<FitResult | null>(null);
  const [processing, setProcessing] = useState(false);
  const [noPersonFound, setNoPersonFound] = useState(false);

  useEffect(() => {
    async function init() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      landmarkerRef.current = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
          delegate: "GPU",
        },
        runningMode: "IMAGE",
        numPoses: 1,
      });
      setStatus("");
      setModelReady(true);
    }

    init().catch((err) => setStatus(`Error: ${err.message}`));
    return () => { landmarkerRef.current?.close(); };
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFitResult(null);
    setAngles(null);
    setNoPersonFound(false);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }

  function analyzePhoto() {
    if (!previewUrl || !landmarkerRef.current || !canvasRef.current) return;

    setProcessing(true);
    setNoPersonFound(false);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);

      const result = landmarkerRef.current!.detect(img);

      if (result.landmarks.length === 0) {
        setNoPersonFound(true);
        setProcessing(false);
        return;
      }

      const drawingUtils = new DrawingUtils(ctx);
      const lm = result.landmarks[0];

      drawingUtils.drawConnectors(lm, PoseLandmarker.POSE_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: Math.max(2, canvas.width / 400),
      });
      drawingUtils.drawLandmarks(lm, {
        color: "#FF0000",
        lineWidth: 1,
        radius: Math.max(4, canvas.width / 200),
      });

      const kneeL  = calcAngle(lm[23], lm[25], lm[27]);
      const kneeR  = calcAngle(lm[24], lm[26], lm[28]);
      const elbowL = calcAngle(lm[11], lm[13], lm[15]);
      const elbowR = calcAngle(lm[12], lm[14], lm[16]);
      const torso  = calcAngle(lm[11], lm[23], lm[25]);

      // Use the side more visible (lower visibility score = more occluded)
      const kneeAngle  = lm[25].visibility! >= lm[26].visibility! ? kneeL : kneeR;
      const elbowAngle = lm[13].visibility! >= lm[14].visibility! ? elbowL : elbowR;

      drawAngleLabel(ctx, lm[25], "Lutut L", kneeL,  canvas.width, canvas.height);
      drawAngleLabel(ctx, lm[26], "Lutut R", kneeR,  canvas.width, canvas.height);
      drawAngleLabel(ctx, lm[13], "Siku L",  elbowL, canvas.width, canvas.height);
      drawAngleLabel(ctx, lm[14], "Siku R",  elbowR, canvas.width, canvas.height);
      drawAngleLabel(ctx, lm[23], "Torso",   torso,  canvas.width, canvas.height);

      setAngles({ knee: kneeAngle, torso, elbow: elbowAngle });

      const standard = BIKE_STANDARDS[bikeType];
      const fitRes = calculateFitResult(
        [{ knee: kneeAngle, torso, elbow: elbowAngle }],
        standard
      );
      setFitResult(fitRes);
      setProcessing(false);
    };

    img.src = previewUrl;
  }

  return (
    <div className="flex flex-col items-center gap-5 p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Bike Fitting — Analisis Foto</h1>

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

      {/* Upload area */}
      <label className={`w-full border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
        modelReady ? "border-zinc-600 hover:border-zinc-400" : "border-zinc-800 cursor-not-allowed"
      }`}>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={!modelReady}
          onChange={handleFileChange}
        />
        <p className="text-zinc-400 text-sm">
          {modelReady ? "Klik untuk upload foto, atau drag & drop" : "Menunggu model siap..."}
        </p>
        <p className="text-zinc-600 text-xs mt-1">JPG, PNG, WEBP · Rekomendasi: foto dari samping (lateral view)</p>
      </label>

      {/* Canvas preview */}
      {previewUrl && (
        <div className="w-full rounded-xl overflow-hidden bg-black">
          <canvas ref={canvasRef} className="w-full h-auto" />
        </div>
      )}

      {/* Show image before analysis if canvas not yet drawn */}
      {previewUrl && !angles && (
        <div className="w-full rounded-xl overflow-hidden bg-black -mt-5 hidden">
          <img src={previewUrl} alt="preview" className="w-full h-auto" />
        </div>
      )}

      {noPersonFound && (
        <p className="text-red-400 text-sm">Tidak ada orang terdeteksi. Coba foto yang lebih jelas dengan pencahayaan cukup.</p>
      )}

      {/* Analyse button */}
      <button
        onClick={analyzePhoto}
        disabled={!previewUrl || !modelReady || processing}
        className="px-8 py-3 rounded-full bg-white text-black font-semibold text-sm disabled:opacity-40 hover:bg-zinc-200 transition-colors"
      >
        {processing ? "Memproses..." : "Analisis Foto"}
      </button>

      {/* Angle summary */}
      {angles && (
        <div className="grid grid-cols-3 gap-3 w-full">
          {(["knee", "torso", "elbow"] as const).map((joint) => {
            const labels = { knee: "Lutut", torso: "Torso", elbow: "Siku" };
            return (
              <div key={joint} className="bg-zinc-800 border border-zinc-600 rounded-lg p-3 text-center">
                <p className="text-xs text-zinc-400">{labels[joint]}</p>
                <p className="text-2xl font-bold text-yellow-400">{angles[joint]}°</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Fit result */}
      {fitResult && (
        <div className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Hasil Fitting</h2>
            <span className={`text-3xl font-bold ${scoreColor(fitResult.totalScore)}`}>
              {fitResult.totalScore}/100
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {(["knee", "torso", "elbow"] as const).map((joint) => {
              const r = fitResult[joint];
              const labels = { knee: "Lutut", torso: "Torso", elbow: "Siku" };
              return (
                <div key={joint} className={`rounded-lg p-3 border ${JOINT_BG[r.status]}`}>
                  <p className="text-xs text-zinc-300">{labels[joint]}</p>
                  <p className="text-xl font-bold text-white">{r.angle}°</p>
                  <p className={`text-xs mt-1 ${STATUS_COLOR[r.status]}`}>{STATUS_LABEL[r.status]}</p>
                </div>
              );
            })}
          </div>

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
        Foto dari <strong>samping (lateral view)</strong> menghasilkan analisis paling akurat.
      </p>
    </div>
  );
}
