import Link from "next/link";
import { notFound } from "next/navigation";
import { TopBar } from "../../_components/TopBar";
import { Badge, LinkButton, PhotoPlaceholder, RekberBanner, SectionLabel } from "../../_components/ui";
import { IconHeart, IconShare, IconEye, IconPin, IconStar, IconCheck, IconLock } from "../../_components/icons";
import { getListing, getSeller, CONDITION_LABEL, LISTINGS } from "../../_lib/mock-data";
import { formatRupiah } from "../../_lib/format";
import { ListingCardGrid } from "../../_components/ListingCard";

export default async function ListingDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) notFound();
  const seller = getSeller(listing.sellerId);
  const related = LISTINGS.filter((l) => l.category === listing.category && l.id !== listing.id).slice(0, 4);

  return (
    <>
      <TopBar
        back
        right={
          <>
            <button className="p-2 hover:bg-[var(--color-sp-black-50)]" aria-label="Simpan">
              <IconHeart size={22} />
            </button>
            <button className="p-2 hover:bg-[var(--color-sp-black-50)]" aria-label="Bagikan">
              <IconShare size={22} />
            </button>
          </>
        }
      />

      <main className="flex-1 pb-28">
        {/* Main photo gallery */}
        <div className="relative bg-white">
          <PhotoPlaceholder className="w-full aspect-square" label="foto utama" />
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[11px] px-2 py-1 sp-display font-bold">
            1 / {listing.photos.length}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2 overflow-x-auto sp-no-scrollbar px-4 py-3 bg-white border-b border-[var(--color-sp-black-100)]">
          {listing.photos.map((p, i) => (
            <PhotoPlaceholder
              key={p}
              className={`w-16 h-16 flex-shrink-0 ${i === 0 ? "ring-2 ring-[var(--color-sp-red)]" : ""}`}
              label={`${i + 1}`}
            />
          ))}
        </div>

        {/* Price & title */}
        <div className="bg-white px-4 py-4 border-b border-[var(--color-sp-black-100)]">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge color="dark">{CONDITION_LABEL[listing.condition]}</Badge>
            {listing.negotiable && <Badge color="outline">Nego</Badge>}
            {listing.cod && <Badge color="green">COD</Badge>}
          </div>
          <div className="sp-display text-[32px] font-extrabold text-[var(--color-sp-red)] leading-none mb-2">
            {formatRupiah(listing.price)}
          </div>
          <h1 className="sp-display text-[22px] font-extrabold leading-tight text-[var(--color-sp-black)] mb-2">
            {listing.title}
          </h1>
          <div className="flex items-center gap-3 text-[11px] text-[var(--color-sp-black-400)]">
            <span className="flex items-center gap-1"><IconPin size={12} /> {listing.city}</span>
            <span className="flex items-center gap-1"><IconEye size={12} /> {listing.views} dilihat</span>
            <span>• {listing.postedAgo}</span>
          </div>
        </div>

        {/* Rekber callout */}
        <div className="px-4 pt-4">
          <RekberBanner />
        </div>

        {/* Spesifikasi */}
        <section className="bg-white mt-4 px-4 py-5 border-y border-[var(--color-sp-black-100)]">
          <SectionLabel className="mb-3">Spesifikasi</SectionLabel>
          <dl className="divide-y divide-[var(--color-sp-black-100)]">
            {[
              ["Merek", listing.brand],
              ["Model", listing.model],
              ["Tahun", listing.year],
              ["Ukuran Frame", listing.frameSize],
              ["Material Frame", listing.frameMaterial],
              ["Groupset", listing.groupset],
              ["Kondisi", CONDITION_LABEL[listing.condition]],
              ...Object.entries(listing.extraSpecs ?? {}),
            ].map(([k, v]) => (
              <div key={k} className="flex py-2.5 text-[13px]">
                <dt className="w-[40%] text-[var(--color-sp-black-400)]">{k}</dt>
                <dd className="flex-1 font-semibold text-[var(--color-sp-black)]">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Deskripsi */}
        <section className="bg-white mt-4 px-4 py-5 border-y border-[var(--color-sp-black-100)]">
          <SectionLabel className="mb-3">Deskripsi Penjual</SectionLabel>
          <p className="text-[13px] leading-[1.7] text-[var(--color-sp-black-700)] whitespace-pre-line">
            {listing.description}
          </p>
        </section>

        {/* Seller card */}
        {seller && (
          <section className="bg-white mt-4 px-4 py-4 border-y border-[var(--color-sp-black-100)]">
            <SectionLabel className="mb-3">Penjual</SectionLabel>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[var(--color-sp-black)] text-white flex items-center justify-center sp-display font-extrabold text-[15px]">
                {seller.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="font-bold text-[14px] text-[var(--color-sp-black)] truncate">{seller.name}</span>
                  {seller.verified && <IconCheck size={14} className="text-[var(--color-sp-green)]" />}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[var(--color-sp-black-400)]">
                  <span className="flex items-center gap-0.5">
                    <IconStar size={11} className="text-[var(--color-sp-amber)]" /> {seller.rating} ({seller.reviewCount})
                  </span>
                  <span>• {seller.txCount} transaksi</span>
                </div>
                <div className="text-[11px] text-[var(--color-sp-black-400)] mt-0.5">
                  {seller.city} • {seller.lastActive}
                </div>
              </div>
              <Link
                href={`/marketplace/seller/${seller.id}`}
                className="sp-display text-[10px] font-bold uppercase tracking-wide text-[var(--color-sp-red)]"
              >
                Lihat Toko
              </Link>
            </div>
          </section>
        )}

        {/* Trust signals */}
        <section className="bg-white mt-4 px-4 py-5 border-y border-[var(--color-sp-black-100)]">
          <SectionLabel className="mb-3">Perlindungan Pembeli</SectionLabel>
          <ul className="space-y-2.5 text-[12px] text-[var(--color-sp-black-700)]">
            <li className="flex gap-2"><IconLock size={16} className="text-[var(--color-sp-red)] flex-shrink-0 mt-0.5" /> <span>Dana ditahan sampai kamu konfirmasi barang diterima</span></li>
            <li className="flex gap-2"><IconCheck size={16} className="text-[var(--color-sp-green)] flex-shrink-0 mt-0.5" /> <span>Bisa buka sengketa jika barang tidak sesuai</span></li>
            <li className="flex gap-2"><IconCheck size={16} className="text-[var(--color-sp-green)] flex-shrink-0 mt-0.5" /> <span>Penjual sudah terverifikasi nomor HP</span></li>
          </ul>
        </section>

        {/* Related listings */}
        {related.length > 0 && (
          <section className="px-4 py-5 mt-4">
            <SectionLabel className="mb-3">Serupa di kategori ini</SectionLabel>
            <div className="grid grid-cols-2 gap-3">
              {related.map((l) => (
                <ListingCardGrid key={l.id} listing={l} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Sticky CTA bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-center pointer-events-none">
        <div className="w-full max-w-[480px] bg-white border-t-2 border-[var(--color-sp-black)] px-4 py-3 flex gap-2 pointer-events-auto">
          <Link
            href={`/marketplace/chat/new?listing=${listing.id}`}
            className="sp-display flex-1 inline-flex items-center justify-center text-[13px] font-extrabold uppercase tracking-wide border-2 border-[var(--color-sp-black)] text-[var(--color-sp-black)] px-3 py-[11px] hover:bg-[var(--color-sp-black-50)]"
          >
            Chat Penjual
          </Link>
          <LinkButton
            href={`/marketplace/checkout/new?listing=${listing.id}`}
            size="md"
            className="flex-[1.3]"
          >
            Beli Sekarang
          </LinkButton>
        </div>
      </div>
    </>
  );
}
