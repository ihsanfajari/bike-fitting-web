import Link from "next/link";
import { PageTopBar } from "../../_components/TopBar";
import { Stepper } from "../_components/Stepper";
import { ButtonLink, Field, Input, Select, Textarea } from "@/components/ui";

const FRAME_SIZES = ["48", "50", "52", "54", "56", "58", "S", "M", "L", "XL", "One Size"];
const MATERIALS = ["Carbon", "Aluminum", "Steel", "Titanium"];
const CONDITIONS = [
  { value: "new", label: "Baru" },
  { value: "like_new", label: "Seperti Baru" },
  { value: "used_mint", label: "Bekas Mulus" },
  { value: "used_normal", label: "Bekas Normal" },
  { value: "used_repair", label: "Butuh Servis" },
];

export default function SellStep2Page() {
  return (
    <>
      <PageTopBar title="Buat Listing — 2/3" backHref="/marketplace/sell" />

      <main className="flex-1 pb-32 bg-[var(--color-m-cream)]">
        <Stepper current={2} />

        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3 space-y-4">
          <h2 className="text-[16px] font-extrabold text-[var(--color-m-ink-900)]">Spesifikasi</h2>

          <Field label="Brand" required>
            <Input type="text" defaultValue="Trek" placeholder="Contoh: Trek, Polygon, Specialized" />
          </Field>

          <Field label="Model" required>
            <Input type="text" defaultValue="Domane SL5" placeholder="Contoh: Domane SL5" />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Tahun" required>
              <Input type="number" defaultValue={2022} min={1990} max={2026} />
            </Field>
            <Field label="Ukuran Frame" required>
              <Select defaultValue="54">
                {FRAME_SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Material" required>
              <Select defaultValue="Carbon">
                {MATERIALS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Kondisi" required>
              <Select defaultValue="used_mint">
                {CONDITIONS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <Field label="Groupset" hint="Opsional, tapi sangat membantu pembeli serius">
            <Input type="text" defaultValue="Shimano 105 R7000 11s" />
          </Field>
        </section>

        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[16px] font-extrabold text-[var(--color-m-ink-900)] mb-3">Deskripsi</h2>
          <Field hint="Ceritakan kondisi, alasan jual, riwayat servis, dan kelengkapan yang disertakan.">
            <Textarea
              rows={6}
              defaultValue={`Dijual Trek Domane SL5 tahun 2022. Kondisi mulus, jarang digunakan hanya weekend ride.\n\nFull Shimano 105 R7000 groupset. Frame carbon dengan IsoSpeed decoupler. Sudah termasuk pedal Shimano 105 dan bidon cage.\n\nAlasan jual: upgrade ke Madone.`}
            />
          </Field>
        </section>

        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[16px] font-extrabold text-[var(--color-m-ink-900)] mb-1">Spec tambahan (opsional)</h2>
          <p className="text-[12px] text-[var(--color-m-ink-500)] mb-4">
            Wheelset, handlebar, saddle, berat, dll. Listing dengan spec lengkap rata-rata 2× lebih cepat laku.
          </p>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Nama spec" defaultValue="Wheelset" />
              <Input placeholder="Nilai" defaultValue="Bontrager Paradigm" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Nama spec" defaultValue="Berat" />
              <Input placeholder="Nilai" defaultValue="8.2 kg" />
            </div>
            <button className="w-full py-2.5 rounded-xl border border-dashed border-[var(--color-m-ink-200)] text-[13px] font-semibold text-[var(--color-m-orange-600)] hover:bg-[var(--color-m-orange-100)]/30">
              + Tambah spec
            </button>
          </div>
        </section>
      </main>

      <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg flex gap-2">
        <Link
          href="/marketplace/sell"
          className="px-5 h-12 rounded-xl border border-[var(--color-m-ink-200)] flex items-center justify-center text-[14px] font-bold text-[var(--color-m-ink-700)]"
        >
          ← Kembali
        </Link>
        <ButtonLink href="/marketplace/sell/harga" full size="lg">
          Lanjut ke Harga →
        </ButtonLink>
      </div>
    </>
  );
}
