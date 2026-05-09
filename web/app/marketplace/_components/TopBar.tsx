"use client";
import Link from "next/link";
import { IconBell, IconChevronLeft, IconHeart, IconSearch, IconShare } from "./icons";

export function HomeTopBar() {
  return (
    <header className="sticky top-0 z-30 bg-[var(--color-m-paper)]/90 backdrop-blur-sm border-b border-[var(--color-m-ink-100)]">
      <div className="px-5 h-14 flex items-center justify-between">
        <Link href="/marketplace" className="text-[18px] font-extrabold tracking-tight text-[var(--color-m-ink-900)]">
          Gowes<span className="text-[var(--color-m-orange-500)]">Fit</span>
        </Link>
        <div className="flex items-center gap-1">
          <Link href="/marketplace/wishlist" aria-label="Wishlist" className="w-10 h-10 flex items-center justify-center text-[var(--color-m-ink-600)] hover:text-[var(--color-m-orange-500)]">
            <IconHeart size={22} />
          </Link>
          <Link href="/marketplace/notifications" aria-label="Notifikasi" className="w-10 h-10 flex items-center justify-center text-[var(--color-m-ink-600)] hover:text-[var(--color-m-orange-500)] relative">
            <IconBell size={22} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[var(--color-m-orange-500)] ring-2 ring-[var(--color-m-paper)]" />
          </Link>
        </div>
      </div>
      <div className="px-5 pb-3">
        <Link
          href="/marketplace/search"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[var(--color-m-paper)] border border-[var(--color-m-ink-100)] text-[14px] text-[var(--color-m-ink-400)] hover:border-[var(--color-m-orange-400)] transition-colors"
        >
          <IconSearch size={18} />
          <span>Cari sepeda, brand, atau kota...</span>
        </Link>
      </div>
    </header>
  );
}

export function PageTopBar({ title, backHref = "/marketplace", action }: { title?: string; backHref?: string; action?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-30 bg-[var(--color-m-paper)]/95 backdrop-blur border-b border-[var(--color-m-ink-100)]">
      <div className="px-3 h-14 flex items-center gap-2">
        <Link href={backHref} aria-label="Kembali" className="w-10 h-10 flex items-center justify-center text-[var(--color-m-ink-800)] hover:bg-[var(--color-m-ink-50)] rounded-lg">
          <IconChevronLeft size={22} />
        </Link>
        {title ? (
          <h1 className="flex-1 text-[15px] font-bold text-[var(--color-m-ink-900)] truncate">{title}</h1>
        ) : <div className="flex-1" />}
        {action}
      </div>
    </header>
  );
}

export function FloatingTopBar({ onShare }: { onShare?: () => void }) {
  return (
    <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between">
      <Link href="/marketplace" aria-label="Kembali" className="w-10 h-10 flex items-center justify-center bg-[var(--color-m-paper)]/95 backdrop-blur rounded-full m-shadow-sm text-[var(--color-m-ink-800)]">
        <IconChevronLeft size={22} />
      </Link>
      <div className="flex items-center gap-2">
        <button aria-label="Bagikan" onClick={onShare} className="w-10 h-10 flex items-center justify-center bg-[var(--color-m-paper)]/95 backdrop-blur rounded-full m-shadow-sm text-[var(--color-m-ink-800)]">
          <IconShare size={20} />
        </button>
        <button aria-label="Wishlist" className="w-10 h-10 flex items-center justify-center bg-[var(--color-m-paper)]/95 backdrop-blur rounded-full m-shadow-sm text-[var(--color-m-ink-800)]">
          <IconHeart size={20} />
        </button>
      </div>
    </div>
  );
}
