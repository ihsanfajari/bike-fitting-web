"use client";

import { useState, useTransition } from "react";
import {
  adminPauseListingAction,
  adminUnpauseListingAction,
  adminRemoveListingAction,
} from "@/lib/admin/listingActions";

type Props = {
  listingId: string;
  status: string;
  deleted: boolean;
};

export function ListingActions({ listingId, status, deleted }: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const run = (fn: () => Promise<{ ok: true } | { ok: false; error: string }>) => {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (!r.ok) setError(r.error);
    });
  };

  const handlePause = () => {
    const reason = window.prompt("Alasan pause listing? (mis. 'review harga mencurigakan')");
    if (!reason?.trim()) return;
    run(() => adminPauseListingAction(listingId, reason));
  };

  const handleRemove = () => {
    if (!confirm("Yakin remove listing ini? Listing akan dihapus dari marketplace (soft delete).")) return;
    const reason = window.prompt("Alasan remove? (mis. 'barang ilegal', 'duplikat', 'penipuan')");
    if (!reason?.trim()) return;
    run(() => adminRemoveListingAction(listingId, reason));
  };

  if (deleted) {
    return (
      <div className="text-[12px] text-slate-500 italic">
        Listing sudah di-remove. Tidak ada aksi tersedia.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {status === "active" && (
        <button
          disabled={pending}
          onClick={handlePause}
          className="w-full px-3 py-2 rounded-lg bg-amber-500 text-white text-[13px] font-bold hover:bg-amber-600 disabled:opacity-60"
        >
          ⏸ Pause Listing
        </button>
      )}

      {status === "paused" && (
        <button
          disabled={pending}
          onClick={() => run(() => adminUnpauseListingAction(listingId))}
          className="w-full px-3 py-2 rounded-lg bg-green-600 text-white text-[13px] font-bold hover:bg-green-700 disabled:opacity-60"
        >
          ▶ Unpause (jadikan Active)
        </button>
      )}

      {status !== "removed" && status !== "sold" && (
        <button
          disabled={pending}
          onClick={handleRemove}
          className="w-full px-3 py-2 rounded-lg bg-red-600 text-white text-[13px] font-bold hover:bg-red-700 disabled:opacity-60"
        >
          🗑 Remove Listing
        </button>
      )}

      {status === "sold" && (
        <div className="text-[12px] text-slate-500 italic">Listing sudah terjual.</div>
      )}

      {error && (
        <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-[12px] text-red-700">{error}</div>
      )}
    </div>
  );
}
