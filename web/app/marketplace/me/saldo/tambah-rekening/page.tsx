import { PageTopBar } from "../../../_components/TopBar";
import { IconShield } from "../../../_components/icons";
import { ButtonLink, Field, Input, Select } from "@/components/ui";

// Bank yang didukung Midtrans Payouts (host-to-host + SKN/RTGS)
const BANKS = [
  "BCA", "Bank Mandiri", "BNI", "BRI", "CIMB Niaga", "Bank Permata", "Bank Danamon",
  "BSI", "BTN", "Bank Mega", "OCBC NISP", "Panin Bank", "Maybank Indonesia",
  "Bank Jago", "SeaBank", "Bank Neo Commerce",
];

export default function AddBankAccountPage() {
  return (
    <>
      <PageTopBar title="Tambah Rekening Bank" backHref="/marketplace/me/saldo" />

      <main className="flex-1 pb-32 bg-[var(--color-m-cream)]">
        {/* Info banner */}
        <section className="bg-[var(--color-m-paper)] px-5 py-4 border-b border-[var(--color-m-ink-100)]">
          <div className="flex items-start gap-2.5">
            <span className="text-[20px] leading-none">🏦</span>
            <p className="text-[12px] text-[var(--color-m-ink-600)] leading-relaxed">
              Rekening ini dipakai untuk mencairkan hasil penjualan kamu. Pastikan{" "}
              <b className="text-[var(--color-m-ink-900)]">nama pemilik rekening sama persis</b> dengan yang tertera di
              buku tabungan — jika tidak cocok, pencairan akan gagal.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <div className="space-y-4">
            <Field label="Bank" required>
              <Select defaultValue="">
                <option value="" disabled>
                  Pilih bank
                </option>
                {BANKS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </Select>
            </Field>

            <Field
              label="Nomor Rekening"
              required
              hint="Tanpa spasi atau tanda baca. Contoh: 8812345678"
            >
              <Input placeholder="8812345678" inputMode="numeric" />
            </Field>

            <Field
              label="Nama Pemilik Rekening"
              required
              hint="Harus sama persis dengan nama di buku tabungan / m-banking."
            >
              <Input placeholder="Nama lengkap pemilik rekening" />
            </Field>
          </div>
        </section>

        {/* Verifikasi note */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[var(--color-m-amber-100)]/60 border border-[var(--color-m-amber-100)]">
            <span className="text-[20px] leading-none">🔎</span>
            <div className="text-[12px] text-[var(--color-m-ink-700)] leading-relaxed">
              <b>Verifikasi otomatis.</b> Setelah disimpan, sistem akan mengecek kecocokan nomor rekening dan nama
              pemilik ke bank. Proses ini biasanya selesai dalam beberapa detik. Rekening baru bisa dipakai untuk
              pencairan setelah terverifikasi.
            </div>
          </div>
        </section>

        {/* Set utama */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 accent-[var(--color-m-orange-500)] flex-shrink-0"
            />
            <span className="text-[13px] text-[var(--color-m-ink-800)] leading-snug">
              Jadikan rekening utama untuk pencairan
            </span>
          </label>
        </section>

        {/* Trust */}
        <section className="px-5 py-4">
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[var(--color-m-green-100)]/60">
            <IconShield size={20} className="text-[var(--color-m-green-500)] flex-shrink-0 mt-0.5" />
            <p className="text-[12px] text-[var(--color-m-ink-700)] leading-relaxed">
              Data rekening kamu dienkripsi dan hanya digunakan untuk pencairan dana lewat Midtrans. GowesFit tidak
              pernah menyimpan PIN atau password m-banking kamu.
            </p>
          </div>
        </section>
      </main>

      <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg flex gap-2">
        <ButtonLink href="/marketplace/me/saldo" variant="ghost" size="lg" className="px-5">
          Batal
        </ButtonLink>
        <ButtonLink href="/marketplace/me/saldo" full size="lg" variant="success">
          Simpan & Verifikasi
        </ButtonLink>
      </div>
    </>
  );
}
