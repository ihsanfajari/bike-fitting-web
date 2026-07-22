"use client";

import Link from "next/link";
import { useTransition } from "react";
import { toggleCategoryActiveAction } from "@/lib/admin/categoryActions";

type Props = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
  listingCount: number;
  hasSpecSchema: boolean;
  isChild: boolean;
};

export function CategoryRow({ id, name, slug, isActive, sortOrder, listingCount, hasSpecSchema, isChild }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <tr className="hover:bg-slate-50">
      <td className="px-4 py-3">
        <div className={`font-bold text-slate-900 ${isChild ? "pl-6" : ""}`}>
          {isChild && <span className="text-slate-300 mr-1">↳</span>}
          {name}
        </div>
        <div className={`text-[11px] text-slate-500 ${isChild ? "pl-6" : ""}`}>/{slug}</div>
      </td>
      <td className="px-4 py-3 text-slate-700 tabular-nums">{sortOrder}</td>
      <td className="px-4 py-3 text-slate-700 tabular-nums">{listingCount}</td>
      <td className="px-4 py-3">
        {hasSpecSchema ? (
          <span className="text-[11px] font-semibold text-green-600">✓ ada</span>
        ) : (
          <span className="text-[11px] text-slate-400">—</span>
        )}
      </td>
      <td className="px-4 py-3">
        <button
          disabled={pending}
          onClick={() => startTransition(() => toggleCategoryActiveAction(id).then(() => {}))}
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold disabled:opacity-50 ${
            isActive ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-slate-200 text-slate-600 hover:bg-slate-300"
          }`}
        >
          {isActive ? "Aktif" : "Nonaktif"}
        </button>
      </td>
      <td className="px-4 py-3">
        <Link href={`/admin/categories/${id}`} className="text-[12px] font-semibold text-slate-700 hover:text-slate-900">
          Edit →
        </Link>
      </td>
    </tr>
  );
}
