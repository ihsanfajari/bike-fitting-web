"use client";

import { useState, useTransition } from "react";
import {
  verifyPhoneAction,
  suspendUserAction,
  unsuspendUserAction,
  banUserAction,
} from "@/lib/admin/userActions";

type Props = {
  userId: string;
  phoneVerified: boolean;
  accountStatus: string;
  isAdmin: boolean;
};

export function UserActions({ userId, phoneVerified, accountStatus, isAdmin }: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const run = (fn: () => Promise<{ ok: true } | { ok: false; error: string }>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (!r.ok) setError(r.error);
    });
  };

  const handleSuspend = () => {
    const reason = window.prompt("Alasan suspend?");
    if (!reason?.trim()) return;
    run(() => suspendUserAction(userId, reason));
  };

  const handleBan = () => {
    if (!confirm("Yakin ban user ini? Tindakan ini permanen sampai di-unban manual.")) return;
    const reason = window.prompt("Alasan ban?");
    if (!reason?.trim()) return;
    run(() => banUserAction(userId, reason));
  };

  return (
    <div className="space-y-2">
      {!phoneVerified && (
        <button
          disabled={pending}
          onClick={() => {
            const reason = window.prompt("Catatan verifikasi (opsional, mis. 'matching WA & KTP'):") ?? undefined;
            run(() => verifyPhoneAction(userId, reason));
          }}
          className="w-full px-3 py-2 rounded-lg bg-green-600 text-white text-[13px] font-bold hover:bg-green-700 disabled:opacity-60"
        >
          ✓ Verify HP
        </button>
      )}

      {!isAdmin && accountStatus === "active" && (
        <>
          <button
            disabled={pending}
            onClick={handleSuspend}
            className="w-full px-3 py-2 rounded-lg bg-amber-500 text-white text-[13px] font-bold hover:bg-amber-600 disabled:opacity-60"
          >
            Suspend
          </button>
          <button
            disabled={pending}
            onClick={handleBan}
            className="w-full px-3 py-2 rounded-lg bg-red-600 text-white text-[13px] font-bold hover:bg-red-700 disabled:opacity-60"
          >
            Ban
          </button>
        </>
      )}

      {!isAdmin && (accountStatus === "suspended" || accountStatus === "banned") && (
        <button
          disabled={pending}
          onClick={() => run(() => unsuspendUserAction(userId))}
          className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white text-[13px] font-bold hover:bg-slate-800 disabled:opacity-60"
        >
          {accountStatus === "banned" ? "Unban" : "Unsuspend"}
        </button>
      )}

      {isAdmin && (
        <div className="text-[12px] text-slate-500 italic">User ini admin — aksi suspend/ban tidak tersedia.</div>
      )}

      {error && (
        <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-[12px] text-red-700">{error}</div>
      )}
    </div>
  );
}
