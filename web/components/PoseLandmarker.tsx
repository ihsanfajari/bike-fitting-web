"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";
import { BIKE_STANDARDS, BikeType } from "@/config/bikeFitStandards";
import { calculateFitResult, FitResult } from "@/lib/bikeFitScoring";
import { selectBestSide, computeJointAngles, drawAngleLabel } from "@/lib/poseAngles";
import FitResultCard from "@/components/FitResultCard";

const POSE_CONNECTIONS = PoseLandmarker.POSE_CONNECTIONS;
const SAMPLE_DURATION_MS = 5000;

interface LiveAngles {
  knee: number | null;
  torso: number | null;
  elbow: number | null;
  side: "kiri" | "kanan" | null;
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
    knee: null, torso: null, elbow: null, side: null,
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

          const side = selectBestSide(lm);

          if (side !== null) {
            const { angles, anchors } = computeJointAngles(lm, side, canvas.width, canvas.height);

            drawAngleLabel(ctx, anchors.knee,  "Lutut", angles.knee,  canvas.width, canvas.height);
            drawAngleLabel(ctx, anchors.elbow, "Siku",  angles.elbow, canvas.width, canvas.height);
            drawAngleLabel(ctx, anchors.torso, "Torso", angles.torso, canvas.width, canvas.height);

            setLiveAngles({ ...angles, side: side === "left" ? "kiri" : "kanan" });

            if (samplingRef.current) {
              samplesRef.current.push(angles);
            }
          }

          // Always check elapsed time so sampling period always ends on schedule
          if (samplingRef.current) {
            const elapsed = performance.now() - samplingStartRef.current;
            if (elapsed >= SAMPLE_DURATION_MS) {
              samplingRef.current = false;
              setAnalyzing(false);
              if (samplesRef.current.length > 0) {
                const standard = BIKE_STANDARDS[bikeType];
                const fitRes = calculateFitResult(samplesRef.current, standard);
                setFitResult(fitRes);
              }
            }
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(detect);
    }

    animFrameRef.current = requestAnimationFrame(detect);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [ready, bikeType]);

  const sideLabel = liveAngles.side ? ` (${liveAngles.side})` : "";
  const angleCards = [
    { label: `Lutut${sideLabel}`, value: liveAngles.knee },
    { label: `Siku${sideLabel}`,  value: liveAngles.elbow },
    { label: "Torso",             value: liveAngles.torso },
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
      <div className="grid grid-cols-3 gap-3 w-full">
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
      {fitResult && <FitResultCard fitResult={fitResult} />}

      <p className="text-gray-500 text-xs">
        Posisikan kamera dari <strong>samping (lateral view)</strong> untuk hasil terbaik.
      </p>
    </div>
  );
}
