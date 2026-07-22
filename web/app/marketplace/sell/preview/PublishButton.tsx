"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { IconCheck } from "../../_components/icons";
import { publishListingAction } from "@/lib/listings/actions";

export function PublishButton({ listingId }: { listingId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handlePublish = () => {
    setError(null);
    startTransition(async () => {
      const result = await publishListingAction(listingId);
      if (!result.ok) return setError(result.error);
      router.push(`/marketplace/listing/${result.data.slug}`);
    });
  };

  return (
    <>
      {error && (
        <div className="mx-4 mb-2 px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-[13px] text-red-700">
          {error}
        </div>
      )}
      <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg flex gap-2">
        <a
          href="/marketplace/me/listings"
          className="px-5 h-12 rounded-xl border border-[var(--color-m-ink-200)] flex items-center justify-center text-[14px] font-bold text-[var(--color-m-ink-700)]"
        >
          Simpan Draft
        </a>
        <button
          type="button"
          onClick={handlePublish}
          disabled={pending}
          className="flex-1 h-12 rounded-xl bg-[var(--color-m-orange-500)] text-white font-extrabold text-[14px] flex items-center justify-center gap-1.5 m-shadow-cta hover:bg-[var(--color-m-orange-600)] disabled:opacity-60"
        >
          <IconCheck size={18} />
          {pending ? "Mempublish..." : "Publikasikan"}
        </button>
      </div>
    </>
  );
}
