"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { IconArrowLeft, IconBell, IconSearch } from "./icons";
import { useRouter } from "next/navigation";

export function TopBar({
  title,
  back = false,
  right,
  dark = false,
  variant = "default",
}: {
  title?: string;
  back?: boolean;
  right?: ReactNode;
  dark?: boolean;
  variant?: "default" | "transparent";
}) {
  const router = useRouter();
  const bg = variant === "transparent" ? "bg-transparent" : dark ? "bg-[var(--color-sp-black)] text-white" : "bg-white border-b border-[var(--color-sp-black-100)]";
  return (
    <div className={`sticky top-0 z-40 ${bg}`}>
      <div className="flex items-center gap-3 px-4 h-14">
        {back && (
          <button
            type="button"
            onClick={() => router.back()}
            className="-ml-2 p-2 hover:bg-[var(--color-sp-black-50)] rounded-sm"
            aria-label="Kembali"
          >
            <IconArrowLeft size={22} />
          </button>
        )}
        {title && (
          <h1 className={`sp-display text-[20px] font-bold leading-tight flex-1 ${dark ? "text-white" : "text-[var(--color-sp-black)]"}`}>
            {title}
          </h1>
        )}
        {right && <div className="ml-auto flex items-center gap-1">{right}</div>}
      </div>
    </div>
  );
}

export function HomeTopBar() {
  return (
    <div className="sticky top-0 z-40 bg-white border-b border-[var(--color-sp-black-100)]">
      <div className="px-4 pt-3 pb-3">
        <div className="flex items-center justify-between mb-3">
          <Link href="/marketplace" className="sp-display text-[22px] font-extrabold tracking-tight text-[var(--color-sp-black)]">
            SEPEDAIN<span className="text-[var(--color-sp-red)]">.</span>
          </Link>
          <div className="flex items-center gap-1">
            <Link
              href="/marketplace/notifications"
              className="p-2 hover:bg-[var(--color-sp-black-50)] rounded-sm relative"
              aria-label="Notifikasi"
            >
              <IconBell size={22} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[var(--color-sp-red)] rounded-full" />
            </Link>
          </div>
        </div>

        <Link
          href="/marketplace/search"
          className="flex items-center gap-2 border-[1.5px] border-[var(--color-sp-black-100)] px-3 py-[9px] text-[13px] text-[var(--color-sp-black-400)] bg-white hover:border-[var(--color-sp-black-400)] transition-colors"
        >
          <IconSearch size={18} />
          <span>Cari sepeda, merek, atau komponen...</span>
        </Link>
      </div>
    </div>
  );
}
