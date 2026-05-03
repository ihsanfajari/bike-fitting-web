import Link from "next/link";
import { PageTopBar } from "../../_components/TopBar";
import { Stepper } from "../_components/Stepper";
import { IconShield } from "../../_components/icons";
import { ButtonLink, Field, Input, Select } from "@/components/ui";
import { formatRupiah } from "@/lib/format";

const PROVINCES = ["DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "DIY", "Banten", "Bali"];

export default function SellStep3Page() {
  const price = 22_000_000;
  const fee = Math.max(5000, Math.round(price * 0.01));

  return (
    <>
      <PageTopBar title="Buat Listing — 3/3" backHref="/marketplace/sell/spesifikasi" />

      <main className="flex-1 pb-32 bg-[var(--color-m-cream)]">
        <Stepper current={3} />

        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3 space-y-4">
          <h2 className="text-[16px] font-extrabold text-[var(--color-m-ink-900)]">Harga jual</h2>

          <Field label="Harga (Rp)" required hint="Harga yang dilihat pembeli — biaya rekber 1% ditanggung pembeli.">
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] font-bold text-[var(--color-m-ink-500)]">
                Rp
              </span>
              <Input
                type="text"
                inputMode="numeric"
                defaultValue="22.000.000"
                className="pl-10 m-tnum text-[18px] font-extrabold"
              />
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2.5 p-3.5 rounded-xl border-[1.5px] border-[var(--color-m-orange-500)] bg-[var(--color-m-orange-100)]/40 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[var(--color-m-orange-500)]" />
              <span className="text-[13px] font-bold text-[var(--color-m-ink-900)]">Bisa nego</span>
            </label>
            <label className="flex items-center gap-2.5 p-3.5 rounded-xl border-[1.5px] border-[var(--color-m-orange-500)] bg-[var(--color-m-orange-100)]/40 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[var(--color-m-orange-500)]" />
              <span className="text-[13px] font-bold text-[var(--color-m-ink-900)]">Bisa COD</span>
            </label>
          </div>
        </section>

        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3 space-y-4">
          <h2 className="text-[16px] font-extrabold text-[var(--color-m-ink-900)]">Lokasi barang</h2>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Provinsi" required>
              <Select defaultValue="DKI Jakarta">
                {PROVINCES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </Select>
            </Field>
            <Field label="Kota/Kab" required>
              <Select defaultValue="Jakarta Selatan">
                <option>Jakarta Selatan</option>
                <option>Jakarta Pusat</option>
                <option>Jakarta Barat</option>
                <option>Jakarta Timur</option>
                <option>Jakarta Utara</option>
              </Select>
            </Field>
          </div>

          <Field label="Alamat singkat" hint="Untuk estimasi ongkir. Alamat detail diminta saat ada pembeli.">
            <Input placeholder="Misal: Kemang, Jakarta Selatan" defaultValue="Kemang, Jakarta Selatan" />
          </Field>
        </section>

        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[16px] font-extrabold text-[var(--color-m-ink-900)] mb-3">Pengiriman</h2>
          <div className="space-y-2">
            {[
              { name: "JNE", checked: true },
              { name: "SiCepat", checked: true },
              { name: "AnterAja", checked: true },
              { name: "JNT", checked: false },
              { name: "Cargo (sepeda utuh)", checked: true, hint: "Direkomendasikan untuk frame >Rp 10jt" },
            ].map((c) => (
              <label
                key={c.name}
                className="flex items-center gap-3 p-3 rounded-xl border border-[var(--color-m-ink-100)] bg-white cursor-pointer"
              >
                <input
                  type="checkbox"
                  defaultChecked={c.checked}
                  className="w-4 h-4 accent-[var(--color-m-orange-500)]"
                />
                <div className="flex-1">
                  <div className="text-[13px] font-bold text-[var(--color-m-ink-900)]">{c.name}</div>
                  {c.hint && <div className="text-[11px] text-[var(--color-m-ink-500)] mt-0.5">{c.hint}</div>}
                </div>
              </label>
            ))}
          </div>
        </section>

        <section className="px-5 py-4">
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[var(--color-m-green-100)]/60">
            <IconShield size={20} className="text-[var(--color-m-green-500)] flex-shrink-0 mt-0.5" />
            <div className="text-[12px] text-[var(--color-m-ink-700)] leading-relaxed">
              <b>Estimasi diterima:</b> {formatRupiah(price - fee)}
              <br />
              <span className="text-[var(--color-m-ink-500)]">
                Setelah dipotong biaya rekber {formatRupiah(fee)} (1%, dibebankan ke pembeli)
              </span>
            </div>
          </div>
        </section>
      </main>

      <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg flex gap-2">
        <Link
          href="/marketplace/sell/spesifikasi"
          className="px-5 h-12 rounded-xl border border-[var(--color-m-ink-200)] flex items-center justify-center text-[14px] font-bold text-[var(--color-m-ink-700)]"
        >
          ← Kembali
        </Link>
        <ButtonLink href="/marketplace/sell/preview" full size="lg">
          Lihat Preview →
        </ButtonLink>
      </div>
    </>
  );
}
