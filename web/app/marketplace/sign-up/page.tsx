import Link from "next/link";
import { PageTopBar } from "../_components/TopBar";
import { SignUpForm } from "./SignUpForm";

export default function SignUpPage() {
  return (
    <>
      <PageTopBar title="Daftar Akun" backHref="/marketplace" />

      <main className="flex-1 px-5 py-6 bg-[var(--color-m-cream)]">
        <div className="mb-6">
          <h1 className="text-[22px] font-extrabold text-[var(--color-m-ink-900)] leading-tight tracking-tight">
            Selamat datang di GowesFit
          </h1>
          <p className="mt-1.5 text-[13px] text-[var(--color-m-ink-600)] leading-relaxed">
            Daftar dalam 1 menit, mulai jual atau beli sepeda dengan aman.
          </p>
        </div>

        <SignUpForm />

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
