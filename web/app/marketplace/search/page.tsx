import { CATEGORIES, LISTINGS } from "@/lib/mock/data";
import { formatRupiah } from "@/lib/format";
import { BottomNav } from "../_components/BottomNav";
import { ListingCardGrid } from "../_components/ListingCard";
import { IconSearch } from "../_components/icons";

const SORT_OPTIONS = [
  { key: "newest", label: "Terbaru" },
  { key: "cheapest", label: "Termurah" },
  { key: "priciest", label: "Termahal" },
  { key: "popular", label: "Paling dilihat" },
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>;
}) {
  const { q = "", category = "", sort = "newest" } = await searchParams;

  let results = LISTINGS.filter((l) => l.status === "active");

  if (q) {
    const lower = q.toLowerCase();
    results = results.filter(
      (l) =>
        l.title.toLowerCase().includes(lower) ||
        l.brand.toLowerCase().includes(lower) ||
        l.model.toLowerCase().includes(lower) ||
        l.city.toLowerCase().includes(lower)
    );
  }

  if (category) {
    results = results.filter((l) => l.category === category);
  }

  if (sort === "cheapest") results = [...results].sort((a, b) => a.price - b.price);
  else if (sort === "priciest") results = [...results].sort((a, b) => b.price - a.price);
  else if (sort === "popular") results = [...results].sort((a, b) => b.views - a.views);

  const selectedCat = CATEGORIES.find((c) => c.slug === category);

  return (
    <main className="flex-1 flex flex-col bg-[var(--color-m-cream)]">
      {/* Search bar */}
      <div className="bg-[var(--color-m-paper)] px-4 pt-4 pb-3 border-b border-[var(--color-m-ink-100)] sticky top-0 z-20">
        <form method="GET" action="/marketplace/search">
          <div className="flex items-center gap-2 bg-[var(--color-m-ink-50)] rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-[var(--color-m-orange-300)]">
            <IconSearch size={18} className="text-[var(--color-m-ink-400)] flex-shrink-0" />
            <input
              name="q"
              defaultValue={q}
              type="search"
              placeholder="Cari sepeda, komponen, brand…"
              autoFocus={!q}
              className="flex-1 bg-transparent text-[14px] text-[var(--color-m-ink-900)] placeholder-[var(--color-m-ink-300)] outline-none"
            />
            {category && <input type="hidden" name="category" value={category} />}
            {sort !== "newest" && <input type="hidden" name="sort" value={sort} />}
          </div>
        </form>
      </div>

      {/* Category filter */}
      <div className="bg-[var(--color-m-paper)] pb-3 px-4 overflow-x-auto">
        <div className="flex gap-2 w-max pt-3">
          <a
            href={`/marketplace/search?q=${encodeURIComponent(q)}`}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold border-[1.5px] whitespace-nowrap transition-all ${
              !category
                ? "bg-[var(--color-m-orange-500)] text-white border-[var(--color-m-orange-500)]"
                : "bg-white text-[var(--color-m-ink-700)] border-[var(--color-m-ink-100)]"
            }`}
          >
            Semua
          </a>
          {CATEGORIES.map((cat) => (
            <a
              key={cat.slug}
              href={`/marketplace/search?q=${encodeURIComponent(q)}&category=${cat.slug}`}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold border-[1.5px] whitespace-nowrap transition-all ${
                category === cat.slug
                  ? "bg-[var(--color-m-orange-500)] text-white border-[var(--color-m-orange-500)]"
                  : "bg-white text-[var(--color-m-ink-700)] border-[var(--color-m-ink-100)]"
              }`}
            >
              {cat.icon} {cat.name}
            </a>
          ))}
        </div>
      </div>

      {/* Sort & results count */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="text-[12px] text-[var(--color-m-ink-500)]">
          {results.length > 0 ? (
            <>
              <span className="font-bold text-[var(--color-m-ink-900)]">{results.length}</span> listing ditemukan
              {selectedCat && <> di <span className="font-bold">{selectedCat.name}</span></>}
            </>
          ) : (
            "Tidak ada hasil"
          )}
        </div>
        <div className="flex gap-1.5 overflow-x-auto">
          {SORT_OPTIONS.map((opt) => (
            <a
              key={opt.key}
              href={`/marketplace/search?q=${encodeURIComponent(q)}${category ? `&category=${category}` : ""}&sort=${opt.key}`}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap border transition-all ${
                sort === opt.key
                  ? "bg-[var(--color-m-ink-900)] text-white border-[var(--color-m-ink-900)]"
                  : "bg-white text-[var(--color-m-ink-600)] border-[var(--color-m-ink-100)]"
              }`}
            >
              {opt.label}
            </a>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="px-4 pb-6">
        {results.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {results.map((listing) => (
              <ListingCardGrid key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-[48px] mb-3">🔍</div>
            <div className="text-[16px] font-extrabold text-[var(--color-m-ink-900)] mb-1">
              {q ? `Tidak ada hasil untuk "${q}"` : "Mulai pencarian"}
            </div>
            <p className="text-[13px] text-[var(--color-m-ink-500)] max-w-[240px] leading-relaxed">
              {q
                ? "Coba kata kunci lain atau hapus filter kategori."
                : "Ketik nama sepeda, brand, atau kota di kotak pencarian di atas."}
            </p>
            {q && (
              <a
                href="/marketplace/search"
                className="mt-4 px-5 py-2.5 rounded-xl bg-[var(--color-m-orange-500)] text-white text-[13px] font-bold"
              >
                Hapus filter
              </a>
            )}
          </div>
        )}
      </div>

      {/* Popular searches when empty query */}
      {!q && (
        <div className="px-4 pb-6">
          <h3 className="text-[13px] font-bold text-[var(--color-m-ink-700)] mb-3">Pencarian populer</h3>
          <div className="flex flex-wrap gap-2">
            {["Trek Domane", "Brompton", "Shimano 105", "Full Carbon", "Roadbike Jakarta", "MTB Bandung"].map(
              (term) => (
                <a
                  key={term}
                  href={`/marketplace/search?q=${encodeURIComponent(term)}`}
                  className="px-3.5 py-2 rounded-full text-[12px] font-semibold border border-[var(--color-m-ink-100)] bg-white text-[var(--color-m-ink-700)]"
                >
                  {term}
                </a>
              )
            )}
          </div>

          <h3 className="text-[13px] font-bold text-[var(--color-m-ink-700)] mt-5 mb-3">Semua listing terbaru</h3>
          <div className="grid grid-cols-2 gap-3">
            {LISTINGS.filter((l) => l.status === "active")
              .slice(0, 6)
              .map((listing) => (
                <ListingCardGrid key={listing.id} listing={listing} />
              ))}
          </div>
        </div>
      )}
      <BottomNav />
    </main>
  );
}
