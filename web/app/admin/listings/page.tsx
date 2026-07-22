import Link from "next/link";
import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

type StatusFilter = "all" | "draft" | "active" | "paused" | "sold" | "removed" | "rejected";
type SpecialFilter = "high_value" | "";

const STATUS_TABS: Array<{ key: StatusFilter; label: string }> = [
  { key: "all", label: "Semua" },
  { key: "active", label: "Aktif" },
  { key: "draft", label: "Draft" },
  { key: "paused", label: "Paused" },
  { key: "sold", label: "Sold" },
  { key: "removed", label: "Removed" },
];

const HIGH_VALUE_THRESHOLD = BigInt(20_000_000);
const PAGE_SIZE = 30;

export default async function AdminListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: StatusFilter; filter?: SpecialFilter; q?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const status: StatusFilter = sp.status ?? "all";
  const special: SpecialFilter = sp.filter ?? "";
  const q = (sp.q ?? "").trim();
  const pageNum = Math.max(1, Number(sp.page) || 1);

  const where: Prisma.ListingWhereInput = {};
  if (special === "high_value") {
    where.status = "active";
    where.price = { gte: HIGH_VALUE_THRESHOLD };
    where.deletedAt = null;
  } else {
    if (status !== "all") where.status = status;
    if (status !== "removed") where.deletedAt = null;
  }

  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { brand: { contains: q, mode: "insensitive" } },
      { model: { contains: q, mode: "insensitive" } },
      { seller: { fullName: { contains: q, mode: "insensitive" } } },
      { seller: { email: { contains: q, mode: "insensitive" } } },
    ];
  }

  const [listings, total] = await Promise.all([
    prisma.listing.findMany({
      where,
      orderBy: [{ createdAt: "desc" }],
      take: PAGE_SIZE,
      skip: (pageNum - 1) * PAGE_SIZE,
      select: {
        id: true,
        title: true,
        slug: true,
        price: true,
        status: true,
        city: true,
        createdAt: true,
        publishedAt: true,
        viewCount: true,
        seller: { select: { id: true, fullName: true, email: true } },
        category: { select: { name: true } },
        photos: { select: { url: true, thumbnailUrl: true }, orderBy: { sortOrder: "asc" }, take: 1 },
      },
    }),
    prisma.listing.count({ where }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const buildQS = (overrides: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    const merged: { status?: string; filter?: string; q?: string; page?: string } = {
      status, filter: special, q, ...overrides,
    };
    if (merged.status && merged.status !== "all") params.set("status", merged.status);
    if (merged.filter) params.set("filter", merged.filter);
    if (merged.q) params.set("q", merged.q);
    if (merged.page) params.set("page", merged.page);
    const s = params.toString();
    return s ? `?${s}` : "";
  };

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-[24px] font-extrabold tracking-tight text-slate-900">Listings</h1>
        <p className="text-[13px] text-slate-500 mt-1">{total} listing · halaman {pageNum} / {totalPages}</p>
      </div>

      <form className="mb-4 flex gap-2 items-center">
        <input
          name="q"
          defaultValue={q}
          placeholder="Cari judul, brand, model, atau penjual…"
          className="flex-1 max-w-md px-3 py-2 rounded-lg border border-slate-300 text-[13px] focus:outline-none focus:border-slate-500"
        />
        {status !== "all" && <input type="hidden" name="status" value={status} />}
        {special && <input type="hidden" name="filter" value={special} />}
        <button type="submit" className="px-4 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-800">
          Cari
        </button>
        {q && (
          <Link href={`/admin/listings${buildQS({ q: "" })}`} className="text-[12px] text-slate-500 hover:text-slate-700">
            Clear
          </Link>
        )}
      </form>

      <div className="mb-4 flex flex-wrap gap-2 items-center">
        {STATUS_TABS.map((t) => {
          const active = !special && status === t.key;
          return (
            <Link
              key={t.key}
              href={`/admin/listings${buildQS({ status: t.key, filter: "" })}`}
              className={`px-3 py-1.5 rounded-full text-[12px] font-semibold ${
                active ? "bg-slate-900 text-white" : "bg-white border border-slate-300 text-slate-700 hover:border-slate-400"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
        <span className="text-slate-300 mx-1">|</span>
        <Link
          href={`/admin/listings${buildQS({ filter: "high_value", status: "all" })}`}
          className={`px-3 py-1.5 rounded-full text-[12px] font-semibold ${
            special === "high_value"
              ? "bg-orange-500 text-white"
              : "bg-orange-50 border border-orange-300 text-orange-700 hover:bg-orange-100"
          }`}
        >
          🚩 Auto-flag &gt; Rp 20jt
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-left text-[11px] uppercase tracking-wider text-slate-600">
              <th className="px-4 py-3 font-semibold">Listing</th>
              <th className="px-4 py-3 font-semibold">Penjual</th>
              <th className="px-4 py-3 font-semibold">Harga</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Lokasi</th>
              <th className="px-4 py-3 font-semibold">Dibuat</th>
              <th className="px-4 py-3 font-semibold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {listings.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-10 text-center text-slate-400">Tidak ada listing.</td></tr>
            )}
            {listings.map((l) => {
              const priceNum = Number(l.price);
              const isHighValue = l.status === "active" && l.price >= HIGH_VALUE_THRESHOLD;
              const photo = l.photos[0]?.thumbnailUrl ?? l.photos[0]?.url;
              return (
                <tr key={l.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-3">
                      {photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={photo} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-slate-200" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex-shrink-0" />
                      )}
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate max-w-xs flex items-center gap-1.5">
                          {l.title}
                          {isHighValue && <span title="Harga > Rp 20jt — perlu review" className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-500 text-white">FLAG</span>}
                        </div>
                        <div className="text-[11px] text-slate-500">{l.category.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/users/${l.seller.id}`} className="font-medium text-slate-900 hover:underline">
                      {l.seller.fullName}
                    </Link>
                    <div className="text-[11px] text-slate-500">{l.seller.email}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-900 font-semibold tabular-nums">
                    Rp {priceNum.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      l.status === "active" ? "bg-green-100 text-green-700" :
                      l.status === "paused" ? "bg-amber-100 text-amber-700" :
                      l.status === "draft" ? "bg-slate-100 text-slate-700" :
                      l.status === "sold" ? "bg-blue-100 text-blue-700" :
                      l.status === "removed" ? "bg-red-100 text-red-700" :
                      "bg-slate-100 text-slate-700"
                    }`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{l.city}</td>
                  <td className="px-4 py-3 text-slate-500 text-[12px]">
                    {l.createdAt.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/listings/${l.id}`} className="text-[12px] font-semibold text-slate-700 hover:text-slate-900">
                      Detail →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {pageNum > 1 && (
            <Link href={`/admin/listings${buildQS({ page: String(pageNum - 1) })}`}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-[12px] font-semibold">← Prev</Link>
          )}
          <span className="px-3 py-1.5 text-[12px] text-slate-500">{pageNum} / {totalPages}</span>
          {pageNum < totalPages && (
            <Link href={`/admin/listings${buildQS({ page: String(pageNum + 1) })}`}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-[12px] font-semibold">Next →</Link>
          )}
        </div>
      )}
    </div>
  );
}
