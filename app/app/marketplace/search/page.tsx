"use client";

import { useMemo, useState, use } from "react";
import { TopBar } from "../_components/TopBar";
import { BottomNav } from "../_components/BottomNav";
import { ListingCardGrid } from "../_components/ListingCard";
import { Chip, Input, SectionLabel } from "../_components/ui";
import { IconSearch, IconFilter } from "../_components/icons";
import { LISTINGS, CATEGORIES } from "../_lib/mock-data";

type SearchParams = { category?: string; q?: string; sort?: string };

export default function SearchPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = use(searchParams);
  const [query, setQuery] = useState(params.q ?? "");
  const [category, setCategory] = useState<string>(params.category ?? "all");
  const [sort, setSort] = useState<string>(params.sort ?? "latest");

  const filtered = useMemo(() => {
    let result = LISTINGS.slice();
    if (category !== "all") result = result.filter((l) => l.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.brand.toLowerCase().includes(q) ||
          l.model.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q),
      );
    }
    if (sort === "price_low") result.sort((a, b) => a.price - b.price);
    else if (sort === "price_high") result.sort((a, b) => b.price - a.price);
    else if (sort === "views") result.sort((a, b) => b.views - a.views);
    return result;
  }, [query, category, sort]);

  return (
    <>
      <TopBar title="Cari Sepeda" back />

      <div className="bg-white border-b border-[var(--color-sp-black-100)] px-4 pb-3">
        <div className="relative mb-3">
          <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-sp-black-400)]" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Trek, Polygon, Shimano 105..."
            className="!pl-9"
          />
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto sp-no-scrollbar -mx-4 px-4">
          <Chip active={category === "all"} onClick={() => setCategory("all")}>Semua</Chip>
          {CATEGORIES.map((c) => (
            <Chip key={c.slug} active={category === c.slug} onClick={() => setCategory(c.slug)}>
              {c.name}
            </Chip>
          ))}
        </div>
      </div>

      {/* Sort + filter bar */}
      <div className="bg-white border-b border-[var(--color-sp-black-100)] px-4 py-2 flex items-center gap-3">
        <span className="sp-display text-[10px] text-[var(--color-sp-black-400)] uppercase tracking-wide font-bold">
          {filtered.length} listing
        </span>
        <div className="ml-auto flex items-center gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="sp-display text-[11px] font-bold uppercase tracking-wide border border-[var(--color-sp-black-100)] px-2 py-1 bg-white cursor-pointer"
          >
            <option value="latest">Terbaru</option>
            <option value="price_low">Harga Termurah</option>
            <option value="price_high">Harga Tertinggi</option>
            <option value="views">Terpopuler</option>
          </select>
          <button className="sp-display inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide border border-[var(--color-sp-black-100)] px-2 py-1 bg-white hover:bg-[var(--color-sp-black-50)]">
            <IconFilter size={14} /> Filter
          </button>
        </div>
      </div>

      <main className="flex-1 px-4 py-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <SectionLabel className="mb-2">Tidak ada hasil</SectionLabel>
            <p className="text-[13px] text-[var(--color-sp-black-400)]">
              Coba ubah kata kunci atau hapus filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((l) => (
              <ListingCardGrid key={l.id} listing={l} />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </>
  );
}
