import Link from "next/link";
import { PageTopBar } from "../_components/TopBar";
import { ButtonLink } from "@/components/ui";

export default function VerifyOtpPage() {
  return (
    <>
      <PageTopBar title="Verifikasi HP" backHref="/marketplace/sign-up" />

      <main className="flex-1 px-5 py-6 bg-[var(--color-m-cream)]">
        <div className="mb-6">
          <div className="w-14 h-14 rounded-full bg-[var(--color-m-orange-100)] text-[var(--color-m-orange-600)] flex items-center justify-center mb-4">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <h1 className="text-[22px] font-extrabold text-[var(--color-m-ink-900)] leading-tight tracking-tight">
            Masukkan kode 6 digit
          </h1>
          <p className="mt-1.5 text-[13px] text-[var(--color-m-ink-600)] leading-relaxed">
            Kode dikirim via WhatsApp ke <b className="text-[var(--color-m-ink-900)]">+62 812 3456 7890</b>.
          </p>
          <button className="mt-1 text-[12px] font-semibold text-[var(--color-m-orange-600)]">
            Ganti nomor
          </button>
        </div>

        <div className="flex justify-between gap-2 mb-6">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              defaultValue={["1", "2", "3", "4", "5", "6"][i]}
              className="w-12 h-14 text-center text-[22px] font-extrabold m-tnum rounded-xl border-[1.5px] border-[var(--color-m-orange-500)] bg-white text-[var(--color-m-ink-900)] focus:outline-none focus:ring-4 focus:ring-[var(--color-m-orange-100)]"
            />
          ))}
        </div>

        <ButtonLink href="/marketplace/dashboard" full size="lg">
          Verifikasi
        </ButtonLink>

        <div className="mt-6 text-center">
          <p className="text-[13px] text-[var(--color-m-ink-600)]">
            Belum dapat kode?{" "}
            <button className="font-bold text-[var(--color-m-ink-300)]" disabled>
              Kirim ulang dalam 0:48
            </button>
          </p>
        </div>

        <div className="mt-6 p-3.5 rounded-xl bg-[var(--color-m-amber-100)]/60 border border-[var(--color-m-amber-100)]">
          <p className="text-[12px] text-[var(--color-m-ink-700)] leading-relaxed">
            <b>💡 Tidak menerima kode?</b> Pastikan WhatsApp aktif dan nomor benar. Jika 2 menit tidak masuk, kami akan kirim via SMS otomatis.
          </p>
        </div>

        <p className="mt-6 text-center text-[12px] text-[var(--color-m-ink-500)]">
          Butuh bantuan?{" "}
          <Link href="/marketplace/help" className="font-semibold text-[var(--color-m-orange-600)]">
            Hubungi kami
          </Link>
        </p>
      </main>
    </>
  );
}
