import Link from "next/link";
import { Listing, CONDITION_LABEL } from "../_lib/mock-data";
import { formatRupiah } from "../_lib/format";
import { Badge, PhotoPlaceholder } from "./ui";
import { IconPin } from "./icons";

export function ListingCardGrid({ listing }: { listing: Listing }) {
  const sold = listing.status === "sold";
  return (
    <Link
      href={`/marketplace/listing/${listing.slug}`}
      className={`block bg-white border border-[var(--color-sp-black-100)] overflow-hidden hover:border-[var(--color-sp-black-400)] transition-colors ${sold ? "opacity-65" : ""}`}
    >
      <div className="relative">
        <PhotoPlaceholder className={`h-40 ${sold ? "grayscale" : ""}`} />
        {sold && (
          <div className="absolute top-3 left-3">
            <Badge color="dark">SOLD</Badge>
          </div>
        )}
        {!sold && listing.negotiable && (
          <div className="absolute top-2 right-2">
            <Badge color="outline" className="bg-white">Nego</Badge>
          </div>
        )}
      </div>
      <div className="p-3">
        <div className={`sp-display text-[20px] font-extrabold leading-none mb-1 ${sold ? "text-[var(--color-sp-black-400)]" : "text-[var(--color-sp-red)]"}`}>
          {formatRupiah(listing.price)}
        </div>
        <div className="text-[13px] font-bold leading-snug mb-2 text-[var(--color-sp-black)] line-clamp-2">
          {listing.title}
        </div>
        <div className="flex gap-2 items-center text-[10px] text-[var(--color-sp-black-400)] flex-wrap">
          <Badge color="dark" className="!text-[8px]">{CONDITION_LABEL[listing.condition]}</Badge>
          <span className="flex items-center gap-0.5"><IconPin size={11} /> {listing.city}</span>
        </div>
      </div>
    </Link>
  );
}

export function ListingCardRow({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/marketplace/listing/${listing.slug}`}
      className="flex bg-white border border-[var(--color-sp-black-100)] hover:border-[var(--color-sp-black-400)] transition-colors"
    >
      <PhotoPlaceholder className="w-[110px] h-[110px] flex-shrink-0" label="foto" />
      <div className="flex-1 p-3 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <Badge color="dark">{CONDITION_LABEL[listing.condition]}</Badge>
          <span className="text-[10px] text-[var(--color-sp-black-400)]">{listing.postedAgo}</span>
        </div>
        <div className="text-[13px] font-bold leading-snug mb-1 line-clamp-2 text-[var(--color-sp-black)]">
          {listing.title}
        </div>
        <div className="sp-display text-[18px] font-extrabold text-[var(--color-sp-red)] leading-none mb-1">
          {formatRupiah(listing.price)}
        </div>
        <div className="flex gap-2 items-center text-[10px] text-[var(--color-sp-black-400)] flex-wrap">
          <span className="flex items-center gap-0.5"><IconPin size={11} /> {listing.city}</span>
          {listing.negotiable && <span className="text-[var(--color-sp-red)] font-bold">Nego</span>}
          {listing.cod && <span>COD</span>}
        </div>
      </div>
    </Link>
  );
}
