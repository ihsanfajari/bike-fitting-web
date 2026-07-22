"use client";

import Link from "next/link";
import { formatRupiah } from "@/lib/format";
import { IconFire, IconHeart, IconMapPin, IconShield } from "./icons";

export type CardListing = {
  id: string;
  slug: string | null;
  title: string;
  brand: string | null;
  price: number | bigint;
  status: string;
  condition: string;
  city: string;
  photoUrl?: string | null;
};

const CONDITION_LABEL: Record<string, string> = {
  new: "Baru",
  like_new: "Seperti Baru",
  used_mint: "Bekas Mulus",
  used_normal: "Bekas Normal",
  used_repair: "Butuh Servis",
};

const conditionTone: Record<string, string> = {
  new: "bg-[var(--color-m-green-100)] text-[var(--color-m-green-500)]",
  like_new: "bg-[var(--color-m-teal-100)] text-[var(--color-m-teal-600)]",
  used_mint: "bg-[var(--color-m-orange-100)] text-[var(--color-m-orange-700)]",
  used_normal: "bg-[var(--color-m-ink-100)] text-[var(--color-m-ink-600)]",
  used_repair: "bg-[var(--color-m-amber-100)] text-[var(--color-m-amber-500)]",
};

const fallbackGradients = [
  "linear-gradient(135deg,#FFE5D6,#FFF0E6 60%,#E0F7F8)",
  "linear-gradient(135deg,#E0F7F8,#FFF0E6)",
  "linear-gradient(135deg,#FDF4DD,#FFF0E6)",
  "linear-gradient(135deg,#F1F5F9,#E2E8F0)",
  "linear-gradient(135deg,#FFF0E6,#FF8B5E55)",
  "linear-gradient(135deg,#E3F5EC,#E0F7F8)",
  "linear-gradient(135deg,#FBEAEA,#FFF0E6)",
];

function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function ListingCardGrid({ listing, hot }: { listing: CardListing; hot?: boolean }) {
  const href = listing.slug ? `/marketplace/listing/${listing.slug}` : "#";
  const gradient = fallbackGradients[hashCode(listing.id) % fallbackGradients.length];
  const price = typeof listing.price === "bigint" ? Number(listing.price) : listing.price;

  return (
    <Link
      href={href}
      className="group block bg-[var(--color-m-paper)] rounded-2xl overflow-hidden m-shadow-xs hover:m-shadow-md transition-all"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {listing.photoUrl ? (
          <img src={listing.photoUrl} alt={listing.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--color-m-ink-400)] text-[11px] italic" style={{ background: gradient }}>
            <span>{listing.brand ?? "—"}</span>
          </div>
        )}
        <div className="absolute top-2 left-2 flex gap-1">
          {hot && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--color-m-orange-500)] text-white text-[10px] font-bold">
              <IconFire size={11} /> Hot
            </span>
          )}
          {listing.status === "sold" && (
            <span className="inline-flex px-2 py-1 rounded-full bg-[var(--color-m-ink-900)] text-white text-[10px] font-bold">SOLD</span>
          )}
        </div>
        <button
          aria-label="Wishlist"
          onClick={(e) => e.preventDefault()}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center text-[var(--color-m-ink-600)] hover:text-[var(--color-m-orange-500)]"
        >
          <IconHeart size={16} />
        </button>
      </div>
      <div className="p-3">
        <div className="text-[16px] font-extrabold text-[var(--color-m-ink-900)] m-tnum tracking-tight">
          {formatRupiah(price)}
        </div>
        <div className="text-[13px] font-semibold text-[var(--color-m-ink-800)] mt-0.5 line-clamp-2 leading-snug min-h-[34px]">
          {listing.title}
        </div>
        <div className="flex flex-wrap items-center gap-1.5 mt-2 text-[11px] text-[var(--color-m-ink-400)]">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${conditionTone[listing.condition] ?? conditionTone.used_normal}`}>
            {CONDITION_LABEL[listing.condition] ?? listing.condition}
          </span>
          <span className="inline-flex items-center gap-0.5">
            <IconMapPin size={11} /> {listing.city.split(" ")[0]}
          </span>
        </div>
        <div className="mt-2 pt-2 border-t border-[var(--color-m-ink-100)] flex items-center gap-1.5 text-[11px] text-[var(--color-m-green-500)] font-semibold">
          <IconShield size={13} /> Aman dengan Rekber
        </div>
      </div>
    </Link>
  );
}

export { CONDITION_LABEL };
