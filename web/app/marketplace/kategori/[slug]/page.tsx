import Link from "next/link";
import { notFound } from "next/navigation";
import { PageTopBar } from "../../_components/TopBar";
import { BottomNav } from "../../_components/BottomNav";
import { ListingCardGrid, type CardListing } from "../../_components/ListingCard";
import { CategoryIcon } from "../../_components/CategoryIcon";
import { IconRuler } from "../../_components/icons";
import { Chip, EmptyState } from "@/components/ui";
import { prisma } from "@/lib/prisma";
import { listActiveListings } from "@/lib/listings/queries";

const SORTS = [
  { key: "latest", label: "Terbaru" },
  { key: "cheapest", label: "Termurah" },
  { key: "expensive", label: "Termahal" },
  { key: "popular", label: "Paling dilihat" },
] as const;

export default async function KategoriPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: "latest" | "cheapest" | "expensive" | "popular" }>;
}) {
  const { slug } = await params;
  const { sort = "latest" } = await searchParams;

  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) notFound();

  const listings = await listActiveListings({ categorySlug: slug, sort, take: 48 });

  const cards: CardListing[] = listings.map((l) => ({
    id: l.id,
    slug: l.slug,
    title: l.title,
    brand: l.brand,
    price: l.price,
    status: l.status,
    condition: l.condition,
    city: l.city,
    photoUrl: l.photos[0]?.url ?? null,
  }));

  const showFitFilter = ["roadbike", "mtb", "gravel", "folding"].includes(slug);

  return (
    <>
      <PageTopBar title={category.name} backHref="/marketplace" />

      <main className="flex-1 pb-6 bg-[var(--color-m-cream)]">
        <section className="px-5 pt-4 pb-3">
          <div className="rounded-3xl p-5 flex items-center gap-4" style={{ background: "linear-gradient(135deg,#FFE5D6,#FFF8F0 60%,#E0F7F8)" }}>
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[var(--color-m-orange-600)] m-shadow-xs">
              <CategoryIcon slug={slug} size={28} />
            </div>
            <div className="flex-1">
              <div className="text-[18px] font-extrabold text-[var(--color-m-ink-900)] leading-tight">
                {category.name}
              </div>
              <div className="text-[12px] text-[var(--color-m-ink-600)] mt-0.5">
                {listings.length} listing aktif · semua dilindungi rekber
              </div>
            </div>
          </div>
        </section>

        {showFitFilter && (
          <section className="px-5 pt-3 pb-0">
            <Link href={`/marketplace/recommendation?category=${slug}`} className="flex items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-[#1A3A4A] to-[#0F2030] mb-1">
              <span className="flex-shrink-0 text-[var(--color-m-teal-500)]"><IconRuler size={18} /></span>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-bold text-white leading-tight">
                  Tampilkan {category.name} yang Fit Untukku
                </div>
                <div className="text-[10px] text-white/60 mt-0.5">Berdasarkan tinggi & inseam kamu</div>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[var(--color-m-teal-500)] text-white flex-shrink-0">
                Coba
              </span>
            </Link>
          </section>
        )}

        <section className="px-5 pb-4 pt-3">
          <div className="flex gap-2 overflow-x-auto m-no-scrollbar -mx-1 px-1 pb-1">
            {SORTS.map((s) => (
              <Link key={s.key} href={`/marketplace/kategori/${slug}?sort=${s.key}`} className="flex-shrink-0">
                <Chip active={sort === s.key} className="cursor-pointer">
                  {s.label}
                </Chip>
              </Link>
            ))}
          </div>
        </section>

        {cards.length === 0 ? (
          <EmptyState
            icon={<CategoryIcon slug={slug} size={30} className="text-[var(--color-m-orange-400)]" />}
            title="Belum ada listing"
            description="Kategori ini lagi sepi. Coba kategori lain atau pasang notifikasi listing baru."
            className="mt-8"
          />
        ) : (
          <section className="px-5">
            <div className="grid grid-cols-2 gap-3">
              {cards.map((l) => (
                <ListingCardGrid key={l.id} listing={l} />
              ))}
            </div>
          </section>
        )}
      </main>

      <BottomNav />
    </>
  );
}
