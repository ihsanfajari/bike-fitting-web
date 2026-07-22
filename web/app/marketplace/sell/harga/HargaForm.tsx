"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Field, Input, Select } from "@/components/ui";
import { IconShield, IconArrowLeft, IconArrowRight } from "../../_components/icons";
import { updateListingAction } from "@/lib/listings/actions";
import { formatRupiah } from "@/lib/format";

const PROVINCES = [
  "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur",
  "Banten", "Bali", "Sumatera Utara", "Sumatera Selatan", "Kalimantan Barat",
  "Kalimantan Timur", "Sulawesi Selatan", "Sulawesi Utara",
];

type Initial = {
  listingId: string;
  price: number;
  isNegotiable: boolean;
  allowCod: boolean;
  city: string;
  province: string;
};

export function HargaForm({ initial }: { initial: Initial }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [priceStr, setPriceStr] = useState<string>(initial.price > 0 ? String(initial.price) : "");
  const [isNegotiable, setIsNegotiable] = useState(initial.isNegotiable);
  const [allowCod, setAllowCod] = useState(initial.allowCod);
  const [province, setProvince] = useState(initial.province === "—" ? "DKI Jakarta" : initial.province);
  const [city, setCity] = useState(initial.city === "—" ? "" : initial.city);

  const price = Number(priceStr.replace(/\D/g, "")) || 0;
  const fee = Math.max(5000, Math.round(price * 0.01));
  const net = price - fee;

  const handleNext = () => {
    setError(null);
    if (price <= 0) return setError("Harga wajib diisi.");
    if (!province) return setError("Provinsi wajib diisi.");
    if (!city.trim()) return setError("Kota/kabupaten wajib diisi.");

    startTransition(async () => {
      const result = await updateListingAction({
        listingId: initial.listingId,
        price,
        isNegotiable,
        allowCod,
        city: city.trim(),
        province,
      });
      if (!result.ok) return setError(result.error);
      router.push(`/marketplace/sell/preview?id=${initial.listingId}`);
    });
  };

  return (
    <>
      <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3 space-y-4">
        <h2 className="text-[16px] font-extrabold text-[var(--color-m-ink-900)]">Harga jual</h2>

        <Field label="Harga (Rp)" required hint="Harga yang dilihat pembeli — biaya rekber 1% ditanggung pembeli.">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] font-bold text-[var(--color-m-ink-500)]">Rp</span>
            <Input
              type="text"
              inputMode="numeric"
              value={priceStr ? Number(priceStr.replace(/\D/g, "")).toLocaleString("id-ID") : ""}
              onChange={(e) => setPriceStr(e.target.value)}
              className="pl-10 m-tnum text-[18px] font-extrabold"
              placeholder="0"
            />
          </div>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <label className={`flex items-center gap-2.5 p-3.5 rounded-xl border-[1.5px] cursor-pointer ${isNegotiable ? "border-[var(--color-m-orange-500)] bg-[var(--color-m-orange-100)]/40" : "border-[var(--color-m-ink-100)]"}`}>
            <input type="checkbox" checked={isNegotiable} onChange={(e) => setIsNegotiable(e.target.checked)} className="w-4 h-4 accent-[var(--color-m-orange-500)]" />
            <span className="text-[13px] font-bold text-[var(--color-m-ink-900)]">Bisa nego</span>
          </label>
          <label className={`flex items-center gap-2.5 p-3.5 rounded-xl border-[1.5px] cursor-pointer ${allowCod ? "border-[var(--color-m-orange-500)] bg-[var(--color-m-orange-100)]/40" : "border-[var(--color-m-ink-100)]"}`}>
            <input type="checkbox" checked={allowCod} onChange={(e) => setAllowCod(e.target.checked)} className="w-4 h-4 accent-[var(--color-m-orange-500)]" />
            <span className="text-[13px] font-bold text-[var(--color-m-ink-900)]">Bisa COD</span>
          </label>
        </div>
      </section>

      <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3 space-y-4">
        <h2 className="text-[16px] font-extrabold text-[var(--color-m-ink-900)]">Lokasi barang</h2>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Provinsi" required>
            <Select value={province} onChange={(e) => setProvince(e.target.value)}>
              {PROVINCES.map((p) => <option key={p}>{p}</option>)}
            </Select>
          </Field>
          <Field label="Kota/Kab" required>
            <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Contoh: Jakarta Selatan" />
          </Field>
        </div>
      </section>

      {price > 0 && (
        <section className="px-5 py-4">
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[var(--color-m-green-100)]/60">
            <IconShield size={20} className="text-[var(--color-m-green-500)] flex-shrink-0 mt-0.5" />
            <div className="text-[12px] text-[var(--color-m-ink-700)] leading-relaxed">
              <b>Estimasi diterima:</b> {formatRupiah(net)}<br />
              <span className="text-[var(--color-m-ink-500)]">
                Setelah dipotong biaya rekber {formatRupiah(fee)} (1%, dibebankan ke pembeli)
              </span>
            </div>
          </div>
        </section>
      )}

      {error && (
        <div className="mx-5 mt-3 px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-[13px] text-red-700">
          {error}
        </div>
      )}

      <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg flex gap-2">
        <a
          href={`/marketplace/sell/spesifikasi?id=${initial.listingId}`}
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
          {pending ? "Menyimpan..." : <span className="inline-flex items-center gap-1.5">Lihat Preview <IconArrowRight size={16} /></span>}
        </button>
      </div>
    </>
  );
}
