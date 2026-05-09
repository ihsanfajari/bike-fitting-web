import { PageTopBar } from "../../_components/TopBar";
import { ButtonLink, Field, Input, Select } from "@/components/ui";

const PROVINCES = [
  "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur",
  "Banten", "Bali", "Sumatera Utara", "Sumatera Selatan", "Kalimantan Barat",
];

export default function EditProfilePage() {
  return (
    <>
      <PageTopBar title="Edit Profil & Alamat" backHref="/marketplace/me" />

      <main className="flex-1 pb-32 bg-[var(--color-m-cream)]">
        {/* Foto profil */}
        <section className="bg-[var(--color-m-paper)] px-5 py-6 border-b border-[var(--color-m-ink-100)]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-m-orange-400)] to-[var(--color-m-orange-600)] flex items-center justify-center text-white text-[24px] font-extrabold flex-shrink-0">
              IF
            </div>
            <button className="px-4 py-2 rounded-xl border border-[var(--color-m-orange-400)] text-[13px] font-bold text-[var(--color-m-orange-600)]">
              Ganti Foto
            </button>
          </div>
        </section>

        {/* Data diri */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-4">Data Diri</h2>
          <div className="space-y-4">
            <Field label="Nama Lengkap" required>
              <Input defaultValue="Ihsan Fajari" placeholder="Nama lengkap" />
            </Field>
            <Field label="Email" hint="Email digunakan untuk login dan notifikasi penting.">
              <Input type="email" defaultValue="ihsan@example.com" placeholder="email@kamu.com" />
            </Field>
            <Field label="Nomor HP" required hint="Harus aktif — dipakai untuk verifikasi OTP dan kontak transaksi.">
              <div className="flex gap-2">
                <div className="px-3 h-11 rounded-xl border border-[var(--color-m-ink-200)] bg-[var(--color-m-ink-50)] flex items-center text-[13px] text-[var(--color-m-ink-600)] font-mono flex-shrink-0">
                  +62
                </div>
                <Input className="flex-1" defaultValue="81234567890" placeholder="81234567890" inputMode="tel" />
              </div>
            </Field>
          </div>
        </section>

        {/* Alamat pengiriman */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-1">Alamat Pengiriman</h2>
          <p className="text-[12px] text-[var(--color-m-ink-500)] mb-4 leading-relaxed">
            Alamat default untuk pesanan sebagai pembeli.
          </p>
          <div className="space-y-4">
            <Field label="Nama Penerima" required>
              <Input defaultValue="Ihsan Fajari" placeholder="Nama penerima paket" />
            </Field>
            <Field label="Nomor HP Penerima">
              <Input defaultValue="+628123456789" placeholder="+628xxxxxxxx" inputMode="tel" />
            </Field>
            <Field label="Alamat Lengkap" required hint="Nama jalan, nomor, RT/RW, kelurahan.">
              <Input defaultValue="Jl. Kemang Raya No. 42, RT 5 RW 3" placeholder="Jl. nama jalan No. xx, RT/RW" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Provinsi" required>
                <Select defaultValue="DKI Jakarta">
                  {PROVINCES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Kota / Kabupaten" required>
                <Input defaultValue="Jakarta Selatan" placeholder="Kota / kab" />
              </Field>
            </div>
            <Field label="Kode Pos" required>
              <Input defaultValue="12730" placeholder="12345" inputMode="numeric" className="w-32" />
            </Field>
          </div>
        </section>

        <section className="px-5 py-4">
          <p className="text-[11px] text-[var(--color-m-ink-500)] text-center leading-relaxed">
            Perubahan nomor HP memerlukan verifikasi OTP ulang.
          </p>
        </section>
      </main>

      <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg flex gap-2">
        <ButtonLink href="/marketplace/me" variant="ghost" size="lg" className="px-5">
          Batal
        </ButtonLink>
        <ButtonLink href="/marketplace/me" full size="lg" variant="success">
          Simpan Perubahan
        </ButtonLink>
      </div>
    </>
  );
}
