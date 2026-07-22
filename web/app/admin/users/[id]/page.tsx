import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { UserActions } from "./UserActions";

const ACTION_LABEL: Record<string, string> = {
  verify_phone: "✓ Verify HP",
  suspend_user: "⏸ Suspend",
  unsuspend_user: "▶ Unsuspend",
  ban_user: "🚫 Ban",
};

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      _count: { select: { listings: true, buyerOrders: true, sellerOrders: true } },
    },
  });
  if (!user) notFound();

  const recentActions = await prisma.adminActionLog.findMany({
    where: { targetType: "user", targetId: id },
    orderBy: { createdAt: "desc" },
    take: 20,
    include: { admin: { select: { fullName: true } } },
  });

  return (
    <div>
      <div className="mb-5">
        <Link href="/admin/users" className="text-[12px] text-slate-500 hover:text-slate-700">← Kembali ke Users</Link>
        <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
          {user.fullName}
          {user.isAdmin && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500 text-white">ADMIN</span>}
        </h1>
        <p className="text-[13px] text-slate-500 mt-0.5">{user.email}</p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 space-y-5">
          <section className="bg-white rounded-xl p-5 border border-slate-200">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate-500 mb-3">Identitas</h2>
            <dl className="grid grid-cols-2 gap-y-2.5 text-[13px]">
              <dt className="text-slate-500">ID</dt><dd className="font-mono text-[11px] text-slate-700">{user.id}</dd>
              <dt className="text-slate-500">Nama</dt><dd className="text-slate-900 font-medium">{user.fullName}</dd>
              <dt className="text-slate-500">Email</dt><dd className="text-slate-900">{user.email}</dd>
              <dt className="text-slate-500">HP</dt>
              <dd>
                {user.phone ?? "—"}
                {user.phoneVerifiedAt ? (
                  <span className="ml-2 text-[11px] font-bold text-green-600">✓ Verified {user.phoneVerifiedAt.toLocaleDateString("id-ID")}</span>
                ) : (
                  <span className="ml-2 text-[11px] font-bold text-amber-600">⏳ Pending</span>
                )}
              </dd>
              <dt className="text-slate-500">Kota</dt><dd className="text-slate-900">{user.city ?? "—"}</dd>
              <dt className="text-slate-500">KYC Status</dt><dd className="text-slate-900">{user.kycStatus}</dd>
              <dt className="text-slate-500">Account Status</dt>
              <dd>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  user.accountStatus === "active" ? "bg-green-100 text-green-700" :
                  user.accountStatus === "suspended" ? "bg-amber-100 text-amber-700" :
                  "bg-red-100 text-red-700"
                }`}>{user.accountStatus}</span>
                {user.suspendedReason && (
                  <span className="ml-2 text-[12px] text-slate-600">{user.suspendedReason}</span>
                )}
              </dd>
              <dt className="text-slate-500">Bergabung</dt><dd className="text-slate-900">{user.createdAt.toLocaleString("id-ID")}</dd>
              <dt className="text-slate-500">Last active</dt><dd className="text-slate-900">{user.lastActiveAt?.toLocaleString("id-ID") ?? "—"}</dd>
            </dl>
          </section>

          <section className="bg-white rounded-xl p-5 border border-slate-200">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate-500 mb-3">Aktivitas</h2>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-slate-50 p-3"><div className="text-[20px] font-extrabold text-slate-900 tabular-nums">{user._count.listings}</div><div className="text-[11px] text-slate-500">Listings</div></div>
              <div className="rounded-lg bg-slate-50 p-3"><div className="text-[20px] font-extrabold text-slate-900 tabular-nums">{user._count.buyerOrders}</div><div className="text-[11px] text-slate-500">Sebagai Buyer</div></div>
              <div className="rounded-lg bg-slate-50 p-3"><div className="text-[20px] font-extrabold text-slate-900 tabular-nums">{user._count.sellerOrders}</div><div className="text-[11px] text-slate-500">Sebagai Seller</div></div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center mt-3">
              <div className="rounded-lg bg-slate-50 p-3"><div className="text-[20px] font-extrabold text-slate-900 tabular-nums">{user.txCount}</div><div className="text-[11px] text-slate-500">Transaksi Sukses</div></div>
              <div className="rounded-lg bg-slate-50 p-3"><div className="text-[20px] font-extrabold text-slate-900 tabular-nums">{user.ratingAvg.toString()}</div><div className="text-[11px] text-slate-500">Rating Avg</div></div>
              <div className="rounded-lg bg-slate-50 p-3"><div className="text-[20px] font-extrabold text-slate-900 tabular-nums">Rp {Number(user.balance).toLocaleString("id-ID")}</div><div className="text-[11px] text-slate-500">Saldo</div></div>
            </div>
          </section>

          <section className="bg-white rounded-xl p-5 border border-slate-200">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate-500 mb-3">Riwayat Tindakan Admin</h2>
            {recentActions.length === 0 ? (
              <p className="text-[12px] text-slate-400 italic">Belum ada tindakan admin pada user ini.</p>
            ) : (
              <div className="space-y-2">
                {recentActions.map((a) => (
                  <div key={a.id} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                    <span className="text-[13px] font-semibold text-slate-900 flex-shrink-0">
                      {ACTION_LABEL[a.action] ?? a.action}
                    </span>
                    <div className="flex-1 text-[12px] text-slate-600">
                      {a.reason && <div>{a.reason}</div>}
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        oleh {a.admin.fullName} · {a.createdAt.toLocaleString("id-ID")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div>
          <section className="bg-white rounded-xl p-5 border border-slate-200 sticky top-5">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate-500 mb-3">Tindakan</h2>
            <UserActions
              userId={user.id}
              phoneVerified={user.phoneVerifiedAt !== null}
              accountStatus={user.accountStatus}
              isAdmin={user.isAdmin}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
