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

      {/* CTA to Marketplace — muncul setelah user selesai fitting */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-5 pt-2 pointer-events-none">
        <Link
          href="/marketplace/recommendation"
          className="pointer-events-auto flex items-center gap-3 w-full max-w-lg mx-auto px-4 py-3.5 rounded-2xl text-white font-bold text-[13px] shadow-2xl"
          style={{ background: "linear-gradient(135deg,#1A3A4A,#0F5438)" }}
        >
          <span className="text-[18px] flex-shrink-0">🎯</span>
          <div className="flex-1 min-w-0">
            <div className="font-bold leading-tight">Lihat sepeda yang cocok di Marketplace</div>
            <div className="text-[11px] text-white/60 mt-0.5 font-normal">Ukuranmu otomatis terbawa</div>
          </div>
          <span className="text-white/60 text-[11px] font-semibold flex-shrink-0">GowesFit →</span>
        </Link>
      </div>
    </main>
  );
}
