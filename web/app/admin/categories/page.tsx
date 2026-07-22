import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CategoryRow } from "./CategoryRow";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      slug: true,
      parentId: true,
      sortOrder: true,
      isActive: true,
      specSchema: true,
      _count: { select: { listings: true } },
    },
  });

  // Susun jadi tree: parent dulu, anak menyusul tepat di bawahnya.
  const parents = categories.filter((c) => !c.parentId);
  const childrenOf = (parentId: string) => categories.filter((c) => c.parentId === parentId);
  const ordered = parents.flatMap((p) => [
    { ...p, isChild: false },
    ...childrenOf(p.id).map((c) => ({ ...c, isChild: true })),
  ]);
  // Orphan (induk tidak ada / nonaktif terhapus) — tetap tampilkan di bawah.
  const orphans = categories
    .filter((c) => c.parentId && !parents.some((p) => p.id === c.parentId))
    .map((c) => ({ ...c, isChild: true }));
  const rows = [...ordered, ...orphans];

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-extrabold tracking-tight text-slate-900">Kategori</h1>
          <p className="text-[13px] text-slate-500 mt-1">{categories.length} kategori · kelola struktur & spec_schema</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="px-4 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-800"
        >
          + Kategori Baru
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-left text-[11px] uppercase tracking-wider text-slate-600">
              <th className="px-4 py-3 font-semibold">Nama</th>
              <th className="px-4 py-3 font-semibold">Urutan</th>
              <th className="px-4 py-3 font-semibold">Listing</th>
              <th className="px-4 py-3 font-semibold">Spec</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-slate-400">Belum ada kategori.</td></tr>
            )}
            {rows.map((c) => (
              <CategoryRow
                key={c.id}
                id={c.id}
                name={c.name}
                slug={c.slug}
                isActive={c.isActive}
                sortOrder={c.sortOrder}
                listingCount={c._count.listings}
                hasSpecSchema={c.specSchema !== null}
                isChild={c.isChild}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
