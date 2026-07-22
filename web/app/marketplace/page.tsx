import type { ReactNode } from "react";
import Link from "next/link";
import { BottomNav } from "./_components/BottomNav";
import { ListingCardGrid, type CardListing } from "./_components/ListingCard";
import { HomeTopBar } from "./_components/TopBar";
import { CategoryIcon } from "./_components/CategoryIcon";
import { IconArrowRight, IconBike, IconChevronRight, IconFire, IconShield } from "./_components/icons";
import { getCategoryTree, listActiveListings } from "@/lib/listings/queries";
import { prisma } from "@/lib/prisma";

function toCardListing(l: Awaited<ReturnType<typeof listActiveListings>>[number]): CardListing {
  return {
    id: l.id,
    slug: l.slug,
    title: l.title,
    brand: l.brand,
    price: l.price,
    status: l.status,
    condition: l.condition,
    city: l.city,
    photoUrl: l.photos[0]?.url ?? null,
  };
}

export default async function MHomepage() {
  const [hot, latest, categoryTree, activeCount] = await Promise.all([
    listActiveListings({ sort: "popular", take: 4 }),
    listActiveListings({ sort: "latest", take: 6 }),
    getCategoryTree(),
    prisma.listing.count({ where: { status: "active", deletedAt: null } }),
  ]);

  // Flatten kategori untuk tampilan (anak Sepeda Utuh + komponen root)
  const sepedaUtuh = categoryTree.find((c) => c.slug === "sepeda-utuh");
  const sepedaSubs = sepedaUtuh ? categoryTree.filter((c) => c.parentId === sepedaUtuh.id) : [];
  const componentRoots = categoryTree.filter((c) => !c.parentId && c.slug !== "sepeda-utuh");
  const flatCategories = [...sepedaSubs, ...componentRoots]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 8);

  return (
    <>
      <HomeTopBar />

      <main className="flex-1">
        <section className="px-5 pt-2 pb-6">
          <div
            className="relative overflow-hidden rounded-3xl p-6 text-white"
            style={{ background: "linear-gradient(135deg,#FF8B5E 0%,#FF6B35 60%,#E55A2B 100%)" }}
          >
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.25), transparent 70%)" }} />
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/25 backdrop-blur text-[11px] font-bold">
              Khusus komunitas Indonesia
            </span>
            <h1 className="mt-3 text-[26px] font-extrabold leading-[1.15] tracking-tight">
              Cari sepeda. Jual sepeda.<br />
              Aman lewat <span className="italic">Rekber.</span>
            </h1>
            <p className="mt-2 text-[13px] text-white/90 leading-relaxed max-w-[300px]">
              Dana ditahan sampai barang diterima. Tidak ada drama, tidak ada tipu-tipu.
            </p>
            <div className="mt-4 flex gap-2 relative z-10">
              <Link href="/marketplace/search" className="inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-white text-[var(--color-m-orange-600)] font-bold text-[13px]">
                Mulai Cari
              </Link>
              <Link href="/marketplace/sell" className="inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-white/20 backdrop-blur text-white font-bold text-[13px] border border-white/30">
                Jual Sepedaku
              </Link>
            </div>
          </div>
        </section>

        <section className="px-5 pb-6">
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { v: activeCount > 0 ? `${activeCount}` : "0", l: "Listing aktif" },
              { v: "100%", l: "Rekber" },
              { v: "1%", l: "Fee transaksi" },
            ].map((s) => (
              <div key={s.l} className="bg-[var(--color-m-paper)] rounded-2xl py-3 m-shadow-xs">
                <div className="text-[18px] font-extrabold text-[var(--color-m-ink-900)] tracking-tight">{s.v}</div>
                <div className="text-[11px] text-[var(--color-m-ink-400)] mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 pb-6">
          <SectionHeader title="Kategori" linkText="Semua" linkHref="/marketplace/search" />
          <div className="grid grid-cols-4 gap-2">
            {flatCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/marketplace/kategori/${c.slug}`}
                className="bg-[var(--color-m-paper)] rounded-2xl py-3 px-2 flex flex-col items-center gap-1.5 m-shadow-xs hover:m-shadow-sm transition-all"
              >
                <CategoryIcon slug={c.slug} size={22} className="text-[var(--color-m-orange-600)]" />
                <span className="text-[11px] font-semibold text-[var(--color-m-ink-800)] text-center leading-tight">
                  {c.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-5 pb-6">
          <Link href="/marketplace/about-rekber" className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-[var(--color-m-teal-100)] to-[var(--color-m-orange-100)] border border-[var(--color-m-teal-100)]">
            <div className="w-11 h-11 rounded-full bg-white/80 flex items-center justify-center text-[var(--color-m-teal-600)] flex-shrink-0">
              <IconShield size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold text-[var(--color-m-ink-900)]">Aman dengan Rekber GowesFit</div>
              <div className="text-[11px] text-[var(--color-m-ink-600)] leading-snug">Dana baru cair ke penjual setelah kamu konfirmasi barang OK</div>
            </div>
            <IconChevronRight size={18} className="text-[var(--color-m-ink-400)]" />
          </Link>
        </section>

        {hot.length > 0 && (
          <section className="px-5 pb-6">
            <SectionHeader title="Lagi rame" icon={<IconFire size={16} className="text-[var(--color-m-orange-500)]" />} linkText="Semua" linkHref="/marketplace/search?sort=popular" />
            <div className="grid grid-cols-2 gap-3">
              {hot.map((l, i) => (
                <ListingCardGrid key={l.id} listing={toCardListing(l)} hot={i < 2} />
              ))}
            </div>
          </section>
        )}

        {latest.length > 0 && (
          <section className="px-5 pb-6">
            <SectionHeader title="Listing terbaru" linkText="Semua" linkHref="/marketplace/search?sort=latest" />
            <div className="grid grid-cols-2 gap-3">
              {latest.map((l) => (
                <ListingCardGrid key={l.id} listing={toCardListing(l)} />
              ))}
            </div>
          </section>
        )}

        {activeCount === 0 && (
          <section className="px-5 pb-6">
            <div className="text-center py-10 px-4 rounded-2xl bg-[var(--color-m-paper)] m-shadow-xs">
              <div className="flex justify-center mb-3"><IconBike size={40} className="text-[var(--color-m-orange-400)]" /></div>
              <div className="text-[14px] font-bold text-[var(--color-m-ink-900)]">Belum ada listing</div>
              <p className="text-[12px] text-[var(--color-m-ink-500)] mt-1.5 leading-relaxed">
                GowesFit masih sangat baru. Jadi seller pertama dan dapatkan exposure ekstra dari komunitas.
              </p>
            </div>
          </section>
        )}

        <section className="px-5 pb-6">
          <div className="bg-[var(--color-m-paper)] rounded-3xl p-6 m-shadow-xs">
            <div className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-1">Sepedamu udah jarang dipakai?</div>
            <p className="text-[13px] text-[var(--color-m-ink-600)] leading-relaxed mb-4">
              Daftarkan dalam 5 menit. Audiensnya komunitas yang paham nilai sepedamu.
            </p>
            <Link href="/marketplace/sell" className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-[var(--color-m-orange-500)] text-white font-bold text-[14px] m-shadow-cta hover:bg-[var(--color-m-orange-600)] transition-colors">
              Jual Sepedaku Sekarang <IconArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  );
}

function SectionHeader({ title, icon, linkText, linkHref }: { title: string; icon?: ReactNode; linkText: string; linkHref: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="flex items-center gap-1.5 text-[16px] font-extrabold text-[var(--color-m-ink-900)] tracking-tight">{icon}{title}</h2>
      <Link href={linkHref} className="inline-flex items-center gap-0.5 text-[12px] font-semibold text-[var(--color-m-orange-600)]">
        {linkText} <IconChevronRight size={14} />
      </Link>
    </div>
  );
}
