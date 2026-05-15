"use client";

import { useTransition } from "react";
import { setPrimaryAddressAction, deleteAddressAction } from "@/lib/addresses/actions";
import { IconCheck, IconX } from "../../_components/icons";

export function AddressActions({ addressId, isPrimary }: { addressId: string; isPrimary: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="border-t border-[var(--color-m-ink-50)] flex">
      {!isPrimary && (
        <button
          disabled={pending}
          onClick={() => startTransition(() => setPrimaryAddressAction(addressId))}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 text-[12px] font-semibold text-[var(--color-m-teal-600)] border-r border-[var(--color-m-ink-50)] hover:bg-[var(--color-m-teal-100)]/30 disabled:opacity-50"
        >
          <IconCheck size={14} />
          Jadikan Utama
        </button>
      )}
      {!isPrimary && (
        <button
          disabled={pending}
          onClick={() => {
            if (confirm("Hapus alamat ini?")) {
              startTransition(() => deleteAddressAction(addressId));
            }
          }}
          className="flex items-center justify-center px-4 py-3 text-[var(--color-m-ink-400)] hover:text-red-500 hover:bg-red-50 disabled:opacity-50"
        >
          <IconX size={16} />
        </button>
      )}
      {isPrimary && (
        <div className="flex-1 py-3 text-center text-[11px] text-[var(--color-m-ink-400)]">
          Alamat utama — tidak bisa dihapus
        </div>
      )}
    </div>
  );
}
