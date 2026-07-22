"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createCategoryAction, updateCategoryAction } from "@/lib/admin/categoryActions";

type ParentOption = { id: string; name: string };

type Initial = {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
  iconUrl: string | null;
  specSchema: string;
};

type Props = {
  parentOptions: ParentOption[];
  initial?: Initial;
};

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-slate-300 text-[13px] focus:outline-none focus:border-slate-500";
const labelCls = "block text-[12px] font-bold text-slate-600 mb-1";

const SPEC_PLACEHOLDER = `{
  "fields": [
    { "key": "wheelset", "label": "Wheelset", "required": false },
    { "key": "weight_kg", "label": "Berat (kg)", "type": "number" }
  ]
}`;

export function CategoryForm({ parentOptions, initial }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [parentId, setParentId] = useState(initial?.parentId ?? "");
  const [sortOrder, setSortOrder] = useState(String(initial?.sortOrder ?? 0));
  const [isActive, setIsActive] = useState(initial?.isActive ?? true);
  const [iconUrl, setIconUrl] = useState(initial?.iconUrl ?? "");
  const [specSchema, setSpecSchema] = useState(initial?.specSchema ?? "");

  const isEdit = Boolean(initial);

  const handleSubmit = () => {
    setError(null);
    if (!name.trim()) return setError("Nama kategori wajib diisi.");

    const payload = {
      name,
      slug: slug || undefined,
      parentId: parentId || null,
      sortOrder: Number(sortOrder) || 0,
      isActive,
      iconUrl: iconUrl || null,
      specSchema,
    };

    startTransition(async () => {
      const result = isEdit
        ? await updateCategoryAction(initial!.id, payload)
        : await createCategoryAction(payload);
      if (!result.ok) return setError(result.error);
      router.push("/admin/categories");
      router.refresh();
    });
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-4 max-w-xl">
      <div>
        <label className={labelCls}>Nama</label>
        <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Contoh: Roadbike" />
      </div>

      <div>
        <label className={labelCls}>Slug</label>
        <input className={inputCls} value={slug} onChange={(e) => setSlug(e.target.value)} placeholder={isEdit ? "" : "Kosongkan untuk auto dari nama"} />
        <p className="text-[11px] text-slate-400 mt-1">Dipakai di URL: /marketplace/kategori/&lt;slug&gt;. Akan di-slugify otomatis.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Kategori Induk</label>
          <select className={inputCls} value={parentId} onChange={(e) => setParentId(e.target.value)}>
            <option value="">— (kategori utama)</option>
            {parentOptions.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Urutan</label>
          <input type="number" className={inputCls} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Icon URL (opsional)</label>
        <input className={inputCls} value={iconUrl} onChange={(e) => setIconUrl(e.target.value)} placeholder="https://…" />
      </div>

      <div>
        <label className={labelCls}>spec_schema (JSON, opsional)</label>
        <textarea
          className={`${inputCls} font-mono text-[12px] min-h-[140px]`}
          value={specSchema}
          onChange={(e) => setSpecSchema(e.target.value)}
          placeholder={SPEC_PLACEHOLDER}
          spellCheck={false}
        />
        <p className="text-[11px] text-slate-400 mt-1">
          Skema field spesifikasi per kategori. Kosongkan jika belum dipakai. Harus JSON valid (object/array).
        </p>
      </div>

      <label className="flex items-center gap-2 text-[13px] text-slate-700">
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="h-4 w-4" />
        Aktif (tampil di marketplace)
      </label>

      {error && (
        <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-[12px] text-red-700">{error}</div>
      )}

      <div className="flex gap-2 pt-1">
        <button
          onClick={handleSubmit}
          disabled={pending}
          className="px-5 py-2 rounded-lg bg-slate-900 text-white text-[13px] font-bold hover:bg-slate-800 disabled:opacity-60"
        >
          {pending ? "Menyimpan…" : isEdit ? "Simpan Perubahan" : "Buat Kategori"}
        </button>
        <button
          onClick={() => router.push("/admin/categories")}
          className="px-5 py-2 rounded-lg border border-slate-300 text-slate-700 text-[13px] font-semibold hover:border-slate-400"
        >
          Batal
        </button>
      </div>
    </div>
  );
}
