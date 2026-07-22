import Link from "next/link";
import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

const ACTION_LABEL: Record<string, string> = {
  verify_phone: "✓ Verify HP",
  suspend_user: "⏸ Suspend user",
  unsuspend_user: "▶ Unsuspend user",
  ban_user: "🚫 Ban user",
  pause_listing: "⏸ Pause listing",
  unpause_listing: "▶ Unpause listing",
  remove_listing: "🗑 Remove listing",
};

const TARGET_TYPES = ["all", "user", "listing", "order", "dispute", "report"] as const;
type TargetTypeFilter = (typeof TARGET_TYPES)[number];

const PAGE_SIZE = 40;

function targetHref(targetType: string, targetId: string): string | null {
  if (targetType === "user") return `/admin/users/${targetId}`;
  if (targetType === "listing") return `/admin/listings/${targetId}`;
  return null;
}

export default async function AdminLogsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: TargetTypeFilter; page?: string }>;
}) {
  const sp = await searchParams;
  const type: TargetTypeFilter = TARGET_TYPES.includes(sp.type as TargetTypeFilter) ? (sp.type as TargetTypeFilter) : "all";
  const pageNum = Math.max(1, Number(sp.page) || 1);

  const where: Prisma.AdminActionLogWhereInput = {};
  if (type !== "all") where.targetType = type;

  const [logs, total] = await Promise.all([
    prisma.adminActionLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip: (pageNum - 1) * PAGE_SIZE,
      include: { admin: { select: { fullName: true } } },
    }),
    prisma.adminActionLog.count({ where }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-[24px] font-extrabold tracking-tight text-slate-900">Audit Log</h1>
        <p className="text-[13px] text-slate-500 mt-1">{total} tindakan admin · halaman {pageNum} / {totalPages}</p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {TARGET_TYPES.map((t) => {
          const active = t === type;
          return (
            <Link
              key={t}
              href={`/admin/logs${t === "all" ? "" : `?type=${t}`}`}
              className={`px-3 py-1.5 rounded-full text-[12px] font-semibold ${
                active ? "bg-slate-900 text-white" : "bg-white border border-slate-300 text-slate-700 hover:border-slate-400"
              }`}
            >
              {t === "all" ? "Semua" : t}
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-left text-[11px] uppercase tracking-wider text-slate-600">
              <th className="px-4 py-3 font-semibold">Waktu</th>
              <th className="px-4 py-3 font-semibold">Admin</th>
              <th className="px-4 py-3 font-semibold">Tindakan</th>
              <th className="px-4 py-3 font-semibold">Target</th>
              <th className="px-4 py-3 font-semibold">Alasan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-slate-400">Belum ada tindakan admin.</td></tr>
            )}
            {logs.map((log) => {
              const href = targetHref(log.targetType, log.targetId);
              return (
                <tr key={log.id} className="hover:bg-slate-50 align-top">
                  <td className="px-4 py-3 text-slate-500 text-[12px] whitespace-nowrap">
                    {log.createdAt.toLocaleString("id-ID", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td className="px-4 py-3 text-slate-900 font-medium">{log.admin.fullName}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{ACTION_LABEL[log.action] ?? log.action}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">{log.targetType}</span>
                    {href ? (
                      <Link href={href} className="text-[12px] text-blue-600 hover:underline font-mono">
                        {log.targetId.slice(0, 8)}…
                      </Link>
                    ) : (
                      <span className="text-[12px] text-slate-500 font-mono">{log.targetId.slice(0, 8)}…</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-[12px] max-w-xs">{log.reason ?? "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {pageNum > 1 && (
            <Link href={`/admin/logs?${type !== "all" ? `type=${type}&` : ""}page=${pageNum - 1}`}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-[12px] font-semibold">← Prev</Link>
          )}
          <span className="px-3 py-1.5 text-[12px] text-slate-500">{pageNum} / {totalPages}</span>
          {pageNum < totalPages && (
            <Link href={`/admin/logs?${type !== "all" ? `type=${type}&` : ""}page=${pageNum + 1}`}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-[12px] font-semibold">Next →</Link>
          )}
        </div>
      )}
    </div>
  );
}
