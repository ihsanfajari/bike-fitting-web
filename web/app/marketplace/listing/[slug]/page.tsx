import Link from "next/link";
import { notFound } from "next/navigation";
import { CONDITION_LABEL, LISTINGS } from "@/lib/mock/api";
import { getListing, getSeller } from "@/lib/mock/data";
import { ListingCardGrid } from "../../_components/ListingCard";
import { FloatingTopBar } from "../../_components/TopBar";
import {
  IconChat,
  IconCheck,
  IconChevronRight,
  IconClock,
  IconHeart,
  IconMapPin,
  IconShield,
  IconStar,
} from "../../_components/icons";
import { formatRupiah } from "@/lib/format";

const photoGradient: Record<string, string> = {
  l1: "linear-gradient(135deg,#FFE5D6,#FFF0E6 50%,#E0F7F8)",
  l2: "linear-gradient(135deg,#E0F7F8,#FFF0E6)",
  l3: "linear-gradient(135deg,#FDF4DD,#FFE5D6)",
  l4: "linear-gradient(135deg,#1F2A37,#475569)",
  l5: "linear-gradient(135deg,#F1F5F9,#E2E8F0)",
  l6: "linear-gradient(135deg,#FFF0E6,#FF8B5E)",
  l7: "linear-gradient(135deg,#E3F5EC,#E0F7F8)",
  l8: "linear-gradient(135deg,#FBEAEA,#FFF0E6)",
};

export default async function MListingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) notFound();
  const seller = getSeller(listing.sellerId);
  const similar = LISTINGS.filter((l) => l.id !== listing.id && l.category === listing.category).slice(0, 4);
  const photos = listing.photos.length > 0 ? listing.photos : ["photo-1"];

  return (
    <>
      {/* Photo gallery */}
      <div className="relative">
        <FloatingTopBar />
        <div
          className="aspect-square w-full flex items-center justify-center text-[var(--color-m-ink-400)] italic"
          style={{ background: photoGradient[listing.id] ?? "linear-gradient(135deg,#FFF0E6,#E0F7F8)" }}
        >
          <span className="text-[13px]">[ foto utama — {listing.brand} ]</span>
        </div>
        {/* Photo indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur">
          {photos.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i === 0 ? "w-5 bg-white" : "w-1.5 bg-white/50"}`} />
          ))}
        </div>
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/40 backdrop-blur text-white text-[11px] font-semibold">
          1 / {photos.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="px-4 py-3 bg-[var(--color-m-paper)] border-b border-[var(--color-m-ink-100)]">
        <div className="flex gap-2 overflow-x-auto m-no-scrollbar">
          {photos.map((p, i) => (
            <div
              key={p}
              className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 ${i === 0 ? "border-[var(--color-m-orange-500)]" : "border-transparent"}`}
              style={{ background: photoGradient[listing.id] ?? "linear-gradient(135deg,#FFF0E6,#E0F7F8)" }}
            />
          ))}
        </div>
      </div>

      <main className="flex-1 pb-32">
        {/* Title + price */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 border-b border-[var(--color-m-ink-100)]">
          <div className="flex items-start gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-[var(--color-m-orange-100)] text-[var(--color-m-orange-700)] text-[11px] font-bold">
              {CONDITION_LABEL[listing.condition]}
            </span>
            {listing.negotiable && (
              <span className="px-2.5 py-1 rounded-full bg-[var(--color-m-teal-100)] text-[var(--color-m-teal-600)] text-[11px] font-bold">
                Bisa Nego
              </span>
            )}
            {listing.cod && (
              <span className="px-2.5 py-1 rounded-full bg-[var(--color-m-green-100)] text-[var(--color-m-green-500)] text-[11px] font-bold">
                COD
              </span>
            )}
          </div>
          <h1 className="text-[20px] font-extrabold text-[var(--color-m-ink-900)] leading-tight tracking-tight">
            {listing.title}
          </h1>
          <div className="mt-3 flex items-baseline gap-2">
            <div className="text-[28px] font-extrabold text-[var(--color-m-ink-900)] m-tnum tracking-tight">
              {formatRupiah(listing.price)}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3 text-[12px] text-[var(--color-m-ink-400)]">
            <span className="inline-flex items-center gap-1">
              <IconMapPin size={13} /> {listing.city}
            </span>
            <span className="inline-flex items-center gap-1">
              <IconClock size={13} /> {listing.postedAgo}
            </span>
            <span>· {listing.views} dilihat</span>
          </div>
        </section>

        {/* Rekber callout */}
        <section className="px-5 py-4 bg-gradient-to-br from-[var(--color-m-green-100)] to-[var(--color-m-teal-100)]">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--color-m-green-500)] flex-shrink-0">
              <IconShield size={22} />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-bold text-[var(--color-m-ink-900)]">Transaksi dilindungi Rekber</div>
              <p className="text-[12px] text-[var(--color-m-ink-600)] leading-snug mt-0.5">
                Dana kamu ditahan GowesFit sampai sepeda diterima dan kondisinya sesuai. Kalau ada masalah, refund 100%.
              </p>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-3">Spesifikasi</h2>
          <dl className="divide-y divide-[var(--color-m-ink-100)]">
            {[
              ["Brand", listing.brand],
              ["Model", listing.model],
              ["Tahun", String(listing.year)],
              ["Ukuran Frame", listing.frameSize],
              ["Material", listing.frameMaterial],
              ["Groupset", listing.groupset],
              ...Object.entries(listing.extraSpecs ?? {}),
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2.5 text-[13px]">
                <dt className="text-[var(--color-m-ink-500)]">{k}</dt>
                <dd className="text-[var(--color-m-ink-900)] font-semibold text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Description */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-3">Deskripsi</h2>
          <p className="text-[14px] text-[var(--color-m-ink-700)] leading-relaxed whitespace-pre-line">
            {listing.description}
          </p>
        </section>

        {/* Seller card */}
        {seller && (
          <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
            <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-3">Penjual</h2>
            <Link href={`/marketplace/seller/${seller.id}`} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-m-orange-400)] to-[var(--color-m-orange-600)] flex items-center justify-center text-white font-bold text-[14px]">
                {seller.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-bold text-[var(--color-m-ink-900)] truncate">{seller.name}</span>
                  {seller.verified && (
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[var(--color-m-teal-500)] text-white">
                      <IconCheck size={10} />
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-[12px] text-[var(--color-m-ink-500)] mt-0.5">
                  <span className="inline-flex items-center gap-0.5 text-[var(--color-m-amber-500)]">
                    <IconStar size={12} /> {seller.rating}
                  </span>
                  <span>·</span>
                  <span>{seller.txCount} transaksi</span>
                  <span>·</span>
                  <span>{seller.city.split(" ")[0]}</span>
                </div>
              </div>
              <IconChevronRight size={18} className="text-[var(--color-m-ink-400)]" />
            </Link>
          </section>
        )}

        {/* Similar */}
        <section className="px-5 py-5 mt-3">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-3">Listing serupa</h2>
          <div className="grid grid-cols-2 gap-3">
            {similar.map((l) => (
              <ListingCardGrid key={l.id} listing={l} />
            ))}
          </div>
        </section>
      </main>

      {/* Sticky CTA bar */}
      <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg">
        <div className="flex items-center gap-2">
          <button
            aria-label="Wishlist"
            className="w-12 h-12 rounded-xl border border-[var(--color-m-ink-100)] flex items-center justify-center text-[var(--color-m-ink-600)]"
          >
            <IconHeart size={22} />
          </button>
          <Link
            href={`/marketplace/chat/new?listing=${listing.id}`}
            className="flex-1 h-12 rounded-xl border border-[var(--color-m-ink-200)] flex items-center justify-center gap-2 text-[var(--color-m-ink-800)] font-bold text-[13px] hover:bg-[var(--color-m-ink-50)]"
          >
            <IconChat size={18} /> Chat
          </Link>
          <Link
            href={`/marketplace/checkout?listing=${listing.id}`}
            className="flex-[2] h-12 rounded-xl bg-[var(--color-m-orange-500)] text-white font-extrabold text-[14px] flex items-center justify-center m-shadow-cta hover:bg-[var(--color-m-orange-600)]"
          >
            Beli dengan Rekber
          </Link>
        </div>
      </div>
    </>
  );
}
