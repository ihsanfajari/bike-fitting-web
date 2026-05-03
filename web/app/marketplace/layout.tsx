import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "GowesFit Marketplace — Tropis Pagi",
  description: "Jual beli sepeda khusus komunitas goweser Indonesia, dengan rekber otomatis.",
};

export default function MTropisLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[var(--color-m-ink-100)] flex justify-center m-shell">
      <div className="w-full max-w-[480px] bg-[var(--color-m-cream)] min-h-screen flex flex-col relative">
        {children}
      </div>
    </div>
  );
}
