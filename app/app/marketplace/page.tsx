import Link from "next/link";
import { HomeTopBar } from "./_components/TopBar";
import { BottomNav } from "./_components/BottomNav";
import { ListingCardGrid } from "./_components/ListingCard";
import { SectionLabel, RekberBanner } from "./_components/ui";
import { LISTINGS, CATEGORIES } from "./_lib/mock-data";
import { IconChevronRight } from "./_components/icons";

export default function MarketplaceHome() {
  const featured = LISTINGS.slice(0, 4);
  const latest = LISTINGS.slice(2);

  return (
    <>
      <HomeTopBar />

      <main className="flex-1 pb-4">
        {/* Hero / Rekber callout */}
        <div className="bg-[var(--color-sp-black)] text-white px-4 py-6">
          <div className="sp-display text-[11px] font-bold uppercase tracking-[2px] text-[var(--color-sp-red)] mb-2">
            MARKETPLACE SEPEDA
          </div>
          <h2 className="sp-display text-[28px] font-extrabold leading-none mb-3">
            CARI SEPEDA.<br />
            JUAL SEPEDA.<br />
            <span className="text-[var(--color-sp-red)]">AMAN LEWAT REKBER.</span>
          </h2>
          <p className="text-[13px] text-[#b0b0b0] leading-relaxed max-w-sm">
            Platform khusus komunitas goweser Indonesia. Dana ditahan sampai barang diterima.
          </p>
        </div>

        {/* Categories */}
        <section className="px-4 pt-5 pb-4">
          <div className="flex items-center justify-between mb-3">
            <SectionLabel>Kategori Produk</SectionLabel>
            <Link href="/marketplace/search" className="sp-display text-[10px] text-[var(--color-sp-red)] font-bold uppercase tracking-wide flex items-center gap-0.5">
              Lihat Semua <IconChevronRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {CATEGORIES.slice(0, 8).map((c) => (
              <Link
                key={c.slug}
                href={`/marketplace/search?category=${c.slug}`}
                className="bg-white border border-[var(--color-sp-black-100)] flex flex-col items-center justify-center py-3 gap-1 hover:border-[var(--color-sp-red)] transition-colors"
              >
                <span className="text-2xl">{c.icon}</span>
                <span className="sp-display text-[10px] font-bold uppercase tracking-wide text-[var(--color-sp-black-600)]">
                  {c.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Rekber reassurance */}
        <div className="px-4 pb-4">
          <RekberBanner />
        </div>

        {/* Featured / Unggulan */}
        <section className="px-4 pb-5">
          <div className="flex items-center justify-between mb-3">
            <SectionLabel>Unggulan Minggu Ini</SectionLabel>
            <Link href="/marketplace/search?sort=featured" className="sp-display text-[10px] text-[var(--color-sp-red)] font-bold uppercase tracking-wide flex items-center gap-0.5">
              Semua <IconChevronRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {featured.map((l) => (
              <ListingCardGrid key={l.id} listing={l} />
            ))}
          </div>
        </section>

        {/* Latest listings */}
        <section className="px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <SectionLabel>Listing Terbaru</SectionLabel>
            <Link href="/marketplace/search?sort=latest" className="sp-display text-[10px] text-[var(--color-sp-red)] font-bold uppercase tracking-wide flex items-center gap-0.5">
              Semua <IconChevronRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {latest.map((l) => (
              <ListingCardGrid key={l.id} listing={l} />
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="px-4 py-8 mt-4 bg-white border-t border-[var(--color-sp-black-100)]">
          <div className="sp-display text-[14px] font-bold uppercase tracking-wide text-[var(--color-sp-black-600)] mb-2">
            Punya sepeda yang sudah tidak terpakai?
          </div>
          <p className="text-[12px] text-[var(--color-sp-black-400)] mb-4 leading-relaxed">
            Daftarkan dalam 3 menit. Audiensnya pasti paham nilai sepedamu.
          </p>
          <Link
            href="/marketplace/sell"
            className="sp-display inline-flex items-center justify-center bg-[var(--color-sp-red)] text-white text-[13px] font-extrabold uppercase tracking-wide border-2 border-[var(--color-sp-red)] px-[18px] py-[11px] hover:bg-[var(--color-sp-red-dark)] transition-colors"
          >
            Jual Sepedaku →
          </Link>
        </section>
      </main>

      <BottomNav />
    </>
  );
}
