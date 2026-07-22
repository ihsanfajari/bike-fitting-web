import Link from "next/link";
import { PageTopBar } from "../_components/TopBar";
import { IconCheck, IconHourglass, IconChat, IconArrowRight } from "../_components/icons";

// Halaman "menunggu verifikasi HP".
// Untuk soft launch, verifikasi HP dilakukan manual oleh admin via WhatsApp —
// belum ada integrasi provider OTP. Halaman ini cuma info untuk user setelah signup.
export default function VerifyOtpPage() {
  return (
    <>
      <PageTopBar title="Verifikasi HP" backHref="/marketplace" />

      <main className="flex-1 px-5 py-8 bg-[var(--color-m-cream)]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-[var(--color-m-orange-100)] text-[var(--color-m-orange-600)] flex items-center justify-center mb-5">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </div>
          <h1 className="text-[22px] font-extrabold text-[var(--color-m-ink-900)] leading-tight tracking-tight">
            Pendaftaran berhasil!
          </h1>
          <p className="mt-2 text-[14px] text-[var(--color-m-ink-600)] leading-relaxed max-w-md mx-auto">
            Akun kamu sudah dibuat. Untuk fase awal soft launch, verifikasi nomor HP dilakukan langsung oleh tim GowesFit via <b className="text-[var(--color-m-ink-900)]">WhatsApp</b> — biasanya dalam 1×24 jam.
          </p>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-[var(--color-m-teal-100)]/60 border border-[var(--color-m-teal-100)]">
          <h2 className="text-[14px] font-bold text-[var(--color-m-ink-900)] mb-2">Selama menunggu verifikasi, kamu bisa:</h2>
          <ul className="space-y-1.5 text-[13px] text-[var(--color-m-ink-700)]">
            <li className="flex items-start gap-2"><IconCheck size={15} className="flex-shrink-0 mt-0.5 text-[var(--color-m-green-500)]" /><span>Browse listing & lihat detail sepeda</span></li>
            <li className="flex items-start gap-2"><IconCheck size={15} className="flex-shrink-0 mt-0.5 text-[var(--color-m-green-500)]" /><span>Simpan sepeda ke wishlist</span></li>
            <li className="flex items-start gap-2"><IconHourglass size={15} className="flex-shrink-0 mt-0.5 text-[var(--color-m-amber-500)]" /><span>Buat listing jualan — <i>aktif setelah HP terverifikasi</i></span></li>
            <li className="flex items-start gap-2"><IconHourglass size={15} className="flex-shrink-0 mt-0.5 text-[var(--color-m-amber-500)]" /><span>Transaksi pembelian — <i>aktif setelah HP terverifikasi</i></span></li>
          </ul>
        </div>

        <div className="mt-6 p-3.5 rounded-xl bg-[var(--color-m-amber-100)]/60 border border-[var(--color-m-amber-100)]">
          <p className="text-[12px] text-[var(--color-m-ink-700)] leading-relaxed flex gap-2">
            <IconChat size={16} className="flex-shrink-0 mt-0.5 text-[var(--color-m-amber-500)]" />
            <span><b>Belum dihubungi setelah 24 jam?</b> Chat ke admin di WhatsApp <b className="text-[var(--color-m-ink-900)]">0812-XXXX-XXXX</b> dengan menyebutkan email yang kamu daftarkan.</span>
          </p>
        </div>

        <Link
          href="/marketplace"
          className="mt-6 w-full h-12 rounded-xl bg-[var(--color-m-orange-500)] text-white font-extrabold text-[14px] flex items-center justify-center gap-2 m-shadow-cta hover:bg-[var(--color-m-orange-600)]"
        >
          Mulai Browse Listing <IconArrowRight size={16} />
        </Link>
      </main>
    </>
  );
}
