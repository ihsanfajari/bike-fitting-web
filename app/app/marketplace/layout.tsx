import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "SEPEDAIN — Marketplace Jual Beli Sepeda",
  description: "Jual beli sepeda dan komponen dengan aman lewat rekber. Khusus untuk komunitas goweser Indonesia.",
};

export default function MarketplaceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] flex justify-center">
      {/* Mobile-first shell */}
      <div className="w-full max-w-[480px] bg-[var(--color-sp-black-50)] min-h-screen flex flex-col relative">
        {children}
      </div>
    </div>
  );
}
