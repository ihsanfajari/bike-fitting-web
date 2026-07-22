"use client";

import { useEffect, useRef, useState } from "react";
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";
import { BIKE_STANDARDS, BikeType } from "@/config/bikeFitStandards";
import { calculateFitResult, FitResult } from "@/lib/bikeFitScoring";
import { selectBestSide, computeJointAngles, drawAngleLabel, JointAngles } from "@/lib/poseAngles";
import FitResultCard from "@/components/FitResultCard";

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
  const [lowVisibility, setLowVisibility] = useState(false);

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
    setLowVisibility(false);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }

  function analyzePhoto() {
    if (!previewUrl || !landmarkerRef.current || !canvasRef.current) return;

    setProcessing(true);
    setNoPersonFound(false);
    setLowVisibility(false);

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

      const side = selectBestSide(lm);
      if (side === null) {
        setLowVisibility(true);
        setProcessing(false);
        return;
      }

      const { angles: jointAngles, anchors } = computeJointAngles(lm, side, canvas.width, canvas.height);

      drawAngleLabel(ctx, anchors.knee,  "Lutut", jointAngles.knee,  canvas.width, canvas.height);
      drawAngleLabel(ctx, anchors.elbow, "Siku",  jointAngles.elbow, canvas.width, canvas.height);
      drawAngleLabel(ctx, anchors.torso, "Torso", jointAngles.torso, canvas.width, canvas.height);

      setAngles(jointAngles);

      const standard = BIKE_STANDARDS[bikeType];
      const fitRes = calculateFitResult([jointAngles], standard);
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
      <label className="w-full border-2 border-dashed border-zinc-600 hover:border-zinc-400 rounded-xl p-8 text-center cursor-pointer transition-colors">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <p className="text-zinc-400 text-sm">Klik untuk upload foto, atau drag & drop</p>
        <p className="text-zinc-600 text-xs mt-1">JPG, PNG, WEBP · Rekomendasi: foto dari samping (lateral view)</p>
        <p className="text-yellow-600 text-xs mt-1">Penting: ambil foto saat pedal di posisi terbawah (jam 6) — sudut lutut hanya akurat pada posisi ini</p>
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
      {lowVisibility && (
        <p className="text-yellow-400 text-sm">Visibilitas sisi tubuh terlalu rendah. Pastikan seluruh tubuh terlihat jelas dari samping tanpa bagian yang terhalang.</p>
      )}

      {/* Analyse button */}
      <button
        onClick={analyzePhoto}
        disabled={!previewUrl || !modelReady || processing}
        className="px-8 py-3 rounded-full bg-white text-black font-semibold text-sm disabled:opacity-40 hover:bg-zinc-200 transition-colors"
      >
        {processing ? "Memproses..." : !modelReady ? "Menunggu model AI..." : "Analisis Foto"}
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
      {fitResult && <FitResultCard fitResult={fitResult} />}

      <p className="text-gray-500 text-xs">
        Foto dari <strong>samping (lateral view)</strong> menghasilkan analisis paling akurat.
      </p>
    </div>
  );
}
