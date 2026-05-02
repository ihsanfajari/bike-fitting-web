"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Link from "next/link";

const PoseLandmarker = dynamic(() => import("@/components/PoseLandmarker"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

const PhotoAnalysis = dynamic(() => import("@/components/PhotoAnalysis"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white text-sm">
      Memuat...
    </div>
  );
}

type Mode = "camera" | "photo";

export default function FittingPage() {
  const [mode, setMode] = useState<Mode>("camera");

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex items-center justify-between px-6 pt-5 pb-2">
        <Link href="/" className="text-sm font-semibold text-white/60 hover:text-white transition-colors">
          ← GowesFit
        </Link>
        <div className="flex gap-2">
          {(["camera", "photo"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
                mode === m
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-zinc-400 border-zinc-600 hover:border-zinc-400"
              }`}
            >
              {m === "camera" ? "Kamera Real-time" : "Upload Foto"}
            </button>
          ))}
        </div>
        <div className="w-24" />
      </div>

      {mode === "camera" ? <PoseLandmarker /> : <PhotoAnalysis />}
    </main>
  );
}
