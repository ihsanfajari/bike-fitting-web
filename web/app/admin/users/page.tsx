import Link from "next/link";
import { prisma } from "@/lib/prisma";

type Filter = "pending_verify" | "suspended" | "all";

const FILTERS: Array<{ key: Filter; label: string }> = [
  { key: "all", label: "Semua" },
  { key: "pending_verify", label: "Pending Verify HP" },
  { key: "suspended", label: "Suspended/Banned" },
];

const PAGE_SIZE = 30;

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: Filter; q?: string; page?: string }>;
}) {
  const { filter = "all", q = "", page = "1" } = await searchParams;
  const pageNum = Math.max(1, Number(page) || 1);
  const search = q.trim();

  const where: Parameters<typeof prisma.user.findMany>[0] extends infer T
    ? T extends { where?: infer W }
      ? NonNullable<W>
      : never
    : never = { deletedAt: null };

  if (filter === "pending_verify") (where as { phoneVerifiedAt: null }).phoneVerifiedAt = null;
  if (filter === "suspended") (where as { accountStatus: object }).accountStatus = { in: ["suspended", "banned"] };

  if (search) {
    (where as { OR: object[] }).OR = [
      { email: { contains: search, mode: "insensitive" } },
      { fullName: { contains: search, mode: "insensitive" } },
      { phone: { contains: search } },
    ];
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: [{ createdAt: "desc" }],
      take: PAGE_SIZE,
      skip: (pageNum - 1) * PAGE_SIZE,
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        phoneVerifiedAt: true,
        accountStatus: true,
        isAdmin: true,
        createdAt: true,
        txCount: true,
        ratingAvg: true,
        ratingCount: true,
      },
    }),
    prisma.user.count({ where }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-[24px] font-extrabold tracking-tight text-slate-900">Users</h1>
        <p className="text-[13px] text-slate-500 mt-1">{total} user · halaman {pageNum} / {totalPages}</p>
      </div>

      <form className="mb-4 flex gap-2 items-center">
        <input
          name="q"
          defaultValue={search}
          placeholder="Cari email, nama, atau HP…"
          className="flex-1 max-w-md px-3 py-2 rounded-lg border border-slate-300 text-[13px] focus:outline-none focus:border-slate-500"
        />
        {filter !== "all" && <input type="hidden" name="filter" value={filter} />}
        <button type="submit" className="px-4 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-800">
          Cari
        </button>
        {search && (
          <Link href={`/admin/users${filter !== "all" ? `?filter=${filter}` : ""}`} className="text-[12px] text-slate-500 hover:text-slate-700">
            Clear
          </Link>
        )}
      </form>

      <div className="mb-4 flex gap-2">
        {FILTERS.map((f) => {
          const active = f.key === filter;
          return (
            <Link
              key={f.key}
              href={`/admin/users?filter=${f.key}${search ? `&q=${encodeURIComponent(search)}` : ""}`}
              className={`px-3 py-1.5 rounded-full text-[12px] font-semibold ${
                active ? "bg-slate-900 text-white" : "bg-white border border-slate-300 text-slate-700 hover:border-slate-400"
              }`}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-left text-[11px] uppercase tracking-wider text-slate-600">
              <th className="px-4 py-3 font-semibold">User</th>
              <th className="px-4 py-3 font-semibold">HP</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Tx</th>
              <th className="px-4 py-3 font-semibold">Joined</th>
              <th className="px-4 py-3 font-semibold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-slate-400">Tidak ada user.</td></tr>
            )}
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    {u.fullName}
                    {u.isAdmin && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-500 text-white">ADMIN</span>}
                  </div>
                  <div className="text-[11px] text-slate-500">{u.email}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-slate-700">{u.phone ?? "—"}</div>
                  <div className={`text-[11px] font-semibold ${u.phoneVerifiedAt ? "text-green-600" : "text-amber-600"}`}>
                    {u.phoneVerifiedAt ? "✓ Verified" : "⏳ Pending"}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    u.accountStatus === "active" ? "bg-green-100 text-green-700" :
                    u.accountStatus === "suspended" ? "bg-amber-100 text-amber-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {u.accountStatus}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-700 tabular-nums">{u.txCount}</td>
                <td className="px-4 py-3 text-slate-500 text-[12px]">
                  {u.createdAt.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/users/${u.id}`} className="text-[12px] font-semibold text-slate-700 hover:text-slate-900">
                    Detail →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {pageNum > 1 && (
            <Link href={`/admin/users?filter=${filter}&page=${pageNum - 1}${search ? `&q=${encodeURIComponent(search)}` : ""}`}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-[12px] font-semibold">← Prev</Link>
          )}
          <span className="px-3 py-1.5 text-[12px] text-slate-500">{pageNum} / {totalPages}</span>
          {pageNum < totalPages && (
            <Link href={`/admin/users?filter=${filter}&page=${pageNum + 1}${search ? `&q=${encodeURIComponent(search)}` : ""}`}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-[12px] font-semibold">Next →</Link>
          )}
        </div>
      )}
    </div>
  );
}
