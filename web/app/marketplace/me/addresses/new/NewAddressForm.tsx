"use client";

import { useActionState } from "react";
import { createAddressAction, type AddressFormState } from "@/lib/addresses/actions";
import { Field, Input, Select } from "@/components/ui";

const PROVINCES = [
  "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur",
  "Banten", "Bali", "Sumatera Utara", "Sumatera Selatan", "Kalimantan Barat",
  "Kalimantan Timur", "Sulawesi Selatan", "Sulawesi Utara",
];

const LABELS = ["Rumah", "Kantor", "Kos", "Lainnya"];

export function NewAddressForm() {
  const [state, formAction, pending] = useActionState<AddressFormState, FormData>(createAddressAction, undefined);

  return (
    <form action={formAction}>
      <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
        <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-4">Label & Kontak</h2>
        <div className="space-y-4">
          <Field label="Label Alamat">
            <Select name="label" defaultValue="Rumah">
              {LABELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </Select>
          </Field>

          <Field label="Nama Penerima" required>
            <Input name="recipientName" placeholder="Nama lengkap penerima paket" required />
          </Field>

          <Field label="Nomor HP" required hint="Akan dihubungi kurir saat pengiriman">
            <Input name="recipientPhone" placeholder="081234567890" inputMode="tel" required />
          </Field>
        </div>
      </section>

      <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3 space-y-4">
        <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)]">Detail Alamat</h2>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Provinsi" required>
            <Select name="province" defaultValue="" required>
              <option value="" disabled>Pilih provinsi</option>
              {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
            </Select>
          </Field>
          <Field label="Kota / Kabupaten" required>
            <Input name="city" placeholder="Kota / kab" required />
          </Field>
        </div>

        <Field label="Kecamatan">
          <Input name="district" placeholder="Nama kecamatan" />
        </Field>

        <Field label="Kode Pos">
          <Input name="postalCode" placeholder="12345" inputMode="numeric" className="w-32" />
        </Field>

        <Field label="Alamat Lengkap" required hint="Nama jalan, nomor rumah, RT/RW, patokan — detail agar kurir tidak nyasar.">
          <textarea
            name="fullAddress"
            rows={3}
            placeholder="Jl. nama jalan No. xx, RT/RW, patokan"
            required
            className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-[var(--color-m-ink-100)] bg-white text-[14px] text-[var(--color-m-ink-900)] placeholder:text-[var(--color-m-ink-300)] resize-none focus:outline-none focus:border-[var(--color-m-orange-500)] focus:ring-4 focus:ring-[var(--color-m-orange-100)]"
          />
        </Field>
      </section>

      <section className="bg-[var(--color-m-paper)] px-5 py-4 mt-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <div className="relative w-11 h-6 flex-shrink-0">
            <input type="checkbox" name="isPrimary" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 rounded-full bg-[var(--color-m-ink-200)] peer-checked:bg-[var(--color-m-orange-500)] transition-colors" />
            <div className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow peer-checked:translate-x-5 transition-transform" />
          </div>
          <div>
            <div className="text-[13px] font-bold text-[var(--color-m-ink-900)]">Jadikan alamat utama</div>
            <div className="text-[11px] text-[var(--color-m-ink-500)] mt-0.5">Otomatis terisi saat checkout</div>
          </div>
        </label>
      </section>

      {state?.error && (
        <div className="mx-5 mt-3 px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-[13px] text-red-700">
          {state.error}
        </div>
      )}

      <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg flex gap-2">
        <a
          href="/marketplace/me/addresses"
          className="px-5 h-12 rounded-xl border border-[var(--color-m-ink-200)] flex items-center justify-center text-[14px] font-bold text-[var(--color-m-ink-700)]"
        >
          Batal
        </a>
        <button
          type="submit"
          disabled={pending}
          className="flex-1 h-12 rounded-xl bg-[var(--color-m-green-500)] text-white font-extrabold text-[14px] flex items-center justify-center m-shadow-cta hover:bg-[var(--color-m-green-600)] disabled:opacity-60"
        >
          {pending ? "Menyimpan..." : "Simpan Alamat"}
        </button>
      </div>
    </form>
  );
}
