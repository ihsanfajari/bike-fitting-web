import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [
    totalUsers,
    pendingPhoneVerify,
    suspendedUsers,
    activeListings,
    draftListings,
    pendingHighValue,
    last7DaysSignups,
    recentListings,
    recentSignups,
  ] = await Promise.all([
    prisma.user.count({ where: { deletedAt: null } }),
    prisma.user.count({ where: { phoneVerifiedAt: null, deletedAt: null } }),
    prisma.user.count({ where: { accountStatus: { in: ["suspended", "banned"] } } }),
    prisma.listing.count({ where: { status: "active", deletedAt: null } }),
    prisma.listing.count({ where: { status: "draft", deletedAt: null } }),
    prisma.listing.count({
      where: { status: "active", price: { gte: BigInt(20_000_000) }, deletedAt: null },
    }),
    prisma.user.count({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, deletedAt: null },
    }),
    prisma.listing.findMany({
      where: { deletedAt: null, status: { in: ["active", "draft", "paused"] } },
      orderBy: { createdAt: "desc" },
      take: 8,
      select: {
        id: true, title: true, price: true, status: true, createdAt: true,
        seller: { select: { fullName: true } },
      },
    }),
    prisma.user.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 8,
      select: { id: true, fullName: true, email: true, phoneVerifiedAt: true, createdAt: true },
    }),
  ]);

  const stats = [
    { label: "Total Users", value: totalUsers, href: "/admin/users" },
    { label: "Pending Verify HP", value: pendingPhoneVerify, href: "/admin/users?filter=pending_verify", highlight: pendingPhoneVerify > 0 },
    { label: "Suspended/Banned", value: suspendedUsers, href: "/admin/users?filter=suspended" },
    { label: "Signup 7 hari", value: last7DaysSignups, href: "/admin/users?sort=newest" },
    { label: "Listing Aktif", value: activeListings, href: "/admin/listings?status=active" },
    { label: "Draft (belum publish)", value: draftListings, href: "/admin/listings?status=draft" },
    { label: "Listing > Rp 20jt", value: pendingHighValue, href: "/admin/listings?filter=high_value", highlight: pendingHighValue > 0 },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[24px] font-extrabold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-[13px] text-slate-500 mt-1">Ringkasan kesehatan marketplace.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className={`block bg-white rounded-xl p-4 border transition-colors ${
              s.highlight
                ? "border-orange-300 bg-orange-50 hover:border-orange-400"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500">{s.label}</div>
            <div className="text-[28px] font-extrabold text-slate-900 mt-1 tabular-nums">{s.value}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl p-5 border border-slate-200">
        <h2 className="text-[14px] font-bold text-slate-900 mb-2">Tindakan cepat</h2>
        <p className="text-[12px] text-slate-600 mb-3">
          {pendingPhoneVerify > 0 ? (
            <>Ada <b>{pendingPhoneVerify} user</b> menunggu verifikasi HP — kontak via WA & verify di halaman Users.</>
          ) : (
            <>Tidak ada user yang menunggu verifikasi HP.</>
          )}
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/users?filter=pending_verify" className="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[12px] font-semibold hover:bg-slate-800">
            Lihat Pending Verify →
          </Link>
          <Link href="/admin/listings?status=active" className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-[12px] font-semibold hover:border-slate-400">
            Browse Listing
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <section className="bg-white rounded-xl p-5 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[14px] font-bold text-slate-900">Listing terbaru</h2>
            <Link href="/admin/listings" className="text-[12px] font-semibold text-slate-500 hover:text-slate-700">Semua →</Link>
          </div>
          {recentListings.length === 0 ? (
            <p className="text-[12px] text-slate-400 italic">Belum ada listing.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentListings.map((l) => (
                <Link key={l.id} href={`/admin/listings/${l.id}`} className="flex items-center gap-3 py-2.5 -mx-2 px-2 rounded-lg hover:bg-slate-50">
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold text-slate-900 truncate">{l.title}</div>
                    <div className="text-[11px] text-slate-500">{l.seller.fullName} · {l.createdAt.toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[12px] font-bold text-slate-900 tabular-nums">Rp {Number(l.price).toLocaleString("id-ID")}</div>
                    <span className={`text-[10px] font-bold ${
                      l.status === "active" ? "text-green-600" : l.status === "paused" ? "text-amber-600" : "text-slate-500"
                    }`}>{l.status}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="bg-white rounded-xl p-5 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[14px] font-bold text-slate-900">Signup terbaru</h2>
            <Link href="/admin/users?sort=newest" className="text-[12px] font-semibold text-slate-500 hover:text-slate-700">Semua →</Link>
          </div>
          {recentSignups.length === 0 ? (
            <p className="text-[12px] text-slate-400 italic">Belum ada user.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentSignups.map((u) => (
                <Link key={u.id} href={`/admin/users/${u.id}`} className="flex items-center gap-3 py-2.5 -mx-2 px-2 rounded-lg hover:bg-slate-50">
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold text-slate-900 truncate">{u.fullName}</div>
                    <div className="text-[11px] text-slate-500 truncate">{u.email}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[11px] text-slate-500">{u.createdAt.toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}</div>
                    <span className={`text-[10px] font-bold ${u.phoneVerifiedAt ? "text-green-600" : "text-amber-600"}`}>
                      {u.phoneVerifiedAt ? "✓ verified" : "⏳ pending"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
