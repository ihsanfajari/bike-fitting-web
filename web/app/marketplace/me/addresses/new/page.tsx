import { PageTopBar } from "../../../_components/TopBar";
import { ButtonLink, Field, Input, Select } from "@/components/ui";

const PROVINCES = [
  "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur",
  "Banten", "Bali", "Sumatera Utara", "Sumatera Selatan", "Kalimantan Barat",
  "Kalimantan Timur", "Sulawesi Selatan", "Sulawesi Utara",
];

const LABELS = ["Rumah", "Kantor", "Kos", "Lainnya"];

export default function NewAddressPage() {
  return (
    <>
      <PageTopBar title="Tambah Alamat" backHref="/marketplace/me/addresses" />

      <main className="flex-1 pb-32 bg-[var(--color-m-cream)]">
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-4">Label & Kontak</h2>
          <div className="space-y-4">
            <Field label="Label Alamat" required>
              <div className="flex gap-2 flex-wrap">
                {LABELS.map((l, i) => (
                  <button
                    key={l}
                    className={`px-3.5 py-2 rounded-xl border-[1.5px] text-[13px] font-semibold transition-all ${
                      i === 0
                        ? "border-[var(--color-m-orange-500)] bg-[var(--color-m-orange-100)]/50 text-[var(--color-m-orange-700)]"
                        : "border-[var(--color-m-ink-200)] text-[var(--color-m-ink-600)]"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Nama Penerima" required>
              <Input placeholder="Nama lengkap penerima paket" />
            </Field>

            <Field label="Nomor HP" required hint="Akan dihubungi kurir saat pengiriman">
              <div className="flex gap-2">
                <div className="px-3 h-11 rounded-xl border border-[var(--color-m-ink-200)] bg-[var(--color-m-ink-50)] flex items-center text-[13px] text-[var(--color-m-ink-600)] font-mono flex-shrink-0">
                  +62
                </div>
                <Input className="flex-1" placeholder="81234567890" inputMode="tel" />
              </div>
            </Field>
          </div>
        </section>

        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3 space-y-4">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)]">Detail Alamat</h2>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Provinsi" required>
              <Select defaultValue="">
                <option value="" disabled>Pilih provinsi</option>
                {PROVINCES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </Select>
            </Field>
            <Field label="Kota / Kabupaten" required>
              <Input placeholder="Kota / kab" />
            </Field>
          </div>

          <Field label="Kecamatan" required>
            <Input placeholder="Nama kecamatan" />
          </Field>

          <Field label="Kode Pos" required>
            <Input placeholder="12345" inputMode="numeric" className="w-32" />
          </Field>

          <Field label="Alamat Lengkap" required hint="Nama jalan, nomor rumah, RT/RW, patokan — detail agar kurir tidak nyasar.">
            <textarea
              rows={3}
              placeholder="Jl. nama jalan No. xx, RT/RW, patokan"
              className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-[var(--color-m-ink-100)] bg-white text-[14px] text-[var(--color-m-ink-900)] placeholder:text-[var(--color-m-ink-300)] resize-none focus:outline-none focus:border-[var(--color-m-orange-500)] focus:ring-4 focus:ring-[var(--color-m-orange-100)]"
            />
          </Field>
        </section>

        <section className="bg-[var(--color-m-paper)] px-5 py-4 mt-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative w-11 h-6 flex-shrink-0">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 rounded-full bg-[var(--color-m-ink-200)] peer-checked:bg-[var(--color-m-orange-500)] transition-colors" />
              <div className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow peer-checked:translate-x-5 transition-transform" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-[var(--color-m-ink-900)]">Jadikan alamat utama</div>
              <div className="text-[11px] text-[var(--color-m-ink-500)] mt-0.5">Otomatis terisi saat checkout</div>
            </div>
          </label>
        </section>
      </main>

      <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg flex gap-2">
        <ButtonLink href="/marketplace/me/addresses" variant="ghost" size="lg" className="px-5">
          Batal
        </ButtonLink>
        <ButtonLink href="/marketplace/me/addresses" full size="lg" variant="success">
          Simpan Alamat
        </ButtonLink>
      </div>
    </>
  );
}