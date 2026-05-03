import Link from "next/link";
import { PageTopBar } from "../_components/TopBar";
import { IconShield } from "../_components/icons";
import { ButtonLink, Field, Input } from "@/components/ui";

export default function SignUpPage() {
  return (
    <>
      <PageTopBar title="Daftar Akun" backHref="/marketplace" />

      <main className="flex-1 px-5 py-6 bg-[var(--color-m-cream)]">
        <div className="mb-6">
          <h1 className="text-[22px] font-extrabold text-[var(--color-m-ink-900)] leading-tight tracking-tight">
            Selamat datang di GowesFit 👋
          </h1>
          <p className="mt-1.5 text-[13px] text-[var(--color-m-ink-600)] leading-relaxed">
            Daftar dalam 1 menit, mulai jual atau beli sepeda dengan aman.
          </p>
        </div>

        <form className="space-y-4" action="/marketplace/verify-otp">
          <Field label="Nama Lengkap" required>
            <Input type="text" name="name" placeholder="Contoh: Budi Santoso" required />
          </Field>

          <Field label="Email" required hint="Kami kirim notifikasi pesanan ke sini">
            <Input type="email" name="email" placeholder="kamu@email.com" required />
          </Field>

          <Field label="Nomor HP" required hint="Wajib aktif WhatsApp untuk verifikasi">
            <Input type="tel" name="phone" placeholder="+62 812 3456 7890" required />
          </Field>

          <Field label="Password" required hint="Minimal 8 karakter">
            <Input type="password" name="password" minLength={8} required />
          </Field>

          <label className="flex items-start gap-2.5 pt-2">
            <input
              type="checkbox"
              required
              defaultChecked
              className="mt-0.5 w-4 h-4 rounded accent-[var(--color-m-orange-500)]"
            />
            <span className="text-[12px] text-[var(--color-m-ink-600)] leading-snug">
              Saya setuju dengan{" "}
              <Link href="/marketplace/terms" className="font-bold text-[var(--color-m-orange-600)]">
                Syarat Penggunaan
              </Link>{" "}
              dan{" "}
              <Link href="/marketplace/privacy" className="font-bold text-[var(--color-m-orange-600)]">
                Kebijakan Privasi
              </Link>{" "}
              GowesFit.
            </span>
          </label>

          <ButtonLink href="/marketplace/verify-otp" full size="lg" className="mt-2">
            Lanjut Verifikasi HP
          </ButtonLink>
        </form>

        <div className="mt-6 flex items-start gap-2.5 p-3.5 rounded-xl bg-[var(--color-m-teal-100)]/60">
          <IconShield size={18} className="text-[var(--color-m-teal-600)] flex-shrink-0 mt-0.5" />
          <p className="text-[12px] text-[var(--color-m-ink-700)] leading-relaxed">
            Verifikasi HP wajib supaya komunitas tetap aman dari akun palsu.
          </p>
        </div>

        <p className="mt-6 text-center text-[13px] text-[var(--color-m-ink-600)]">
          Sudah punya akun?{" "}
          <Link href="/marketplace/sign-in" className="font-bold text-[var(--color-m-orange-600)]">
            Masuk
          </Link>
        </p>
      </main>
    </>
  );
}
