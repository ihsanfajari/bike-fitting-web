"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Field, Input, Select, Textarea } from "@/components/ui";
import { updateListingAction } from "@/lib/listings/actions";
import { IconArrowLeft, IconArrowRight } from "../../_components/icons";

const FRAME_SIZES = ["48", "50", "52", "54", "56", "58", "S", "M", "L", "XL", "One Size", "N/A"];
const MATERIALS = [
  { value: "", label: "—" },
  { value: "carbon", label: "Carbon" },
  { value: "aluminum", label: "Aluminum" },
  { value: "steel", label: "Steel" },
  { value: "titanium", label: "Titanium" },
  { value: "other", label: "Lainnya" },
];
const CONDITIONS = [
  { value: "new", label: "Baru" },
  { value: "like_new", label: "Seperti Baru" },
  { value: "used_mint", label: "Bekas Mulus" },
  { value: "used_normal", label: "Bekas Normal" },
  { value: "used_repair", label: "Butuh Servis" },
];

type Initial = {
  listingId: string;
  brand: string | null;
  model: string | null;
  year: number | null;
  frameSize: string | null;
  frameMaterial: string | null;
  condition: string;
  groupset: string | null;
  description: string | null;
  extraSpecs: Array<{ key: string; value: string }>;
};

export function SpesifikasiForm({ initial }: { initial: Initial }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [brand, setBrand] = useState(initial.brand ?? "");
  const [model, setModel] = useState(initial.model ?? "");
  const [year, setYear] = useState<string>(initial.year ? String(initial.year) : "");
  const [frameSize, setFrameSize] = useState(initial.frameSize ?? "");
  const [material, setMaterial] = useState(initial.frameMaterial ?? "");
  const [condition, setCondition] = useState(initial.condition);
  const [groupset, setGroupset] = useState(initial.groupset ?? "");
  const [description, setDescription] = useState(initial.description ?? "");
  const [extraSpecs, setExtraSpecs] = useState<Array<{ key: string; value: string }>>(
    initial.extraSpecs.length > 0 ? initial.extraSpecs : [{ key: "", value: "" }],
  );

  const updateSpec = (i: number, key: "key" | "value", v: string) =>
    setExtraSpecs((prev) => prev.map((s, idx) => (idx === i ? { ...s, [key]: v } : s)));
  const addSpec = () => setExtraSpecs((prev) => [...prev, { key: "", value: "" }]);

  const handleNext = () => {
    setError(null);
    if (!brand.trim()) return setError("Brand wajib diisi.");
    if (!condition) return setError("Pilih kondisi.");

    const extraSpecsObj: Record<string, string> = {};
    extraSpecs.forEach((s) => {
      if (s.key.trim() && s.value.trim()) extraSpecsObj[s.key.trim()] = s.value.trim();
    });

    startTransition(async () => {
      const result = await updateListingAction({
        listingId: initial.listingId,
        brand,
        model: model || undefined,
        year: year ? Number(year) : undefined,
        frameSize: frameSize || undefined,
        frameMaterial: material || "",
        condition,
        groupset: groupset || undefined,
        description: description || undefined,
        extraSpecs: extraSpecsObj,
      });
      if (!result.ok) return setError(result.error);
      router.push(`/marketplace/sell/harga?id=${initial.listingId}`);
    });
  };

  return (
    <>
      <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3 space-y-4">
        <h2 className="text-[16px] font-extrabold text-[var(--color-m-ink-900)]">Spesifikasi</h2>

        <Field label="Brand" required>
          <Input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Contoh: Trek, Polygon, Specialized" />
        </Field>
        <Field label="Model">
          <Input value={model} onChange={(e) => setModel(e.target.value)} placeholder="Contoh: Domane SL5" />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Tahun">
            <Input type="number" min={1990} max={2030} value={year} onChange={(e) => setYear(e.target.value)} />
          </Field>
          <Field label="Ukuran Frame">
            <Select value={frameSize} onChange={(e) => setFrameSize(e.target.value)}>
              <option value="">—</option>
              {FRAME_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
            </Select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Material">
            <Select value={material} onChange={(e) => setMaterial(e.target.value)}>
              {MATERIALS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
            </Select>
          </Field>
          <Field label="Kondisi" required>
            <Select value={condition} onChange={(e) => setCondition(e.target.value)}>
              {CONDITIONS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </Select>
          </Field>
        </div>

        <Field label="Groupset" hint="Opsional, tapi sangat membantu pembeli serius">
          <Input value={groupset} onChange={(e) => setGroupset(e.target.value)} placeholder="Shimano 105 R7000 11s" />
        </Field>
      </section>

      <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
        <h2 className="text-[16px] font-extrabold text-[var(--color-m-ink-900)] mb-3">Deskripsi</h2>
        <Field hint="Ceritakan kondisi, alasan jual, riwayat servis, dan kelengkapan yang disertakan.">
          <Textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Kondisi, alasan jual, kelengkapan…"
          />
        </Field>
      </section>

      <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
        <h2 className="text-[16px] font-extrabold text-[var(--color-m-ink-900)] mb-1">Spec tambahan (opsional)</h2>
        <p className="text-[12px] text-[var(--color-m-ink-500)] mb-4">
          Wheelset, handlebar, saddle, berat, dll. Listing dengan spec lengkap rata-rata 2× lebih cepat laku.
        </p>
        <div className="space-y-2">
          {extraSpecs.map((s, i) => (
            <div key={i} className="grid grid-cols-2 gap-2">
              <Input placeholder="Nama spec" value={s.key} onChange={(e) => updateSpec(i, "key", e.target.value)} />
              <Input placeholder="Nilai" value={s.value} onChange={(e) => updateSpec(i, "value", e.target.value)} />
            </div>
          ))}
          <button
            type="button"
            onClick={addSpec}
            className="w-full py-2.5 rounded-xl border border-dashed border-[var(--color-m-ink-200)] text-[13px] font-semibold text-[var(--color-m-orange-600)] hover:bg-[var(--color-m-orange-100)]/30"
          >
            + Tambah spec
          </button>
        </div>
      </section>

      {error && (
        <div className="mx-5 mt-3 px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-[13px] text-red-700">
          {error}
        </div>
      )}

      <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg flex gap-2">
        <a
          href="/marketplace/sell"
          className="px-5 h-12 rounded-xl border border-[var(--color-m-ink-200)] flex items-center justify-center gap-1.5 text-[14px] font-bold text-[var(--color-m-ink-700)]"
        >
          <IconArrowLeft size={16} /> Kembali
        </a>
        <button
          type="button"
          onClick={handleNext}
          disabled={pending}
          className="flex-1 h-12 rounded-xl bg-[var(--color-m-orange-500)] text-white font-extrabold text-[14px] flex items-center justify-center m-shadow-cta hover:bg-[var(--color-m-orange-600)] disabled:opacity-60"
        >
          {pending ? "Menyimpan..." : <span className="inline-flex items-center gap-1.5">Lanjut ke Harga <IconArrowRight size={16} /></span>}
        </button>
      </div>
    </>
  );
}
