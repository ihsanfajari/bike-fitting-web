import Link from "next/link";
import { PageTopBar } from "../_components/TopBar";
import { SignInForm } from "./SignInForm";

export default function SignInPage() {
  return (
    <>
      <PageTopBar title="Masuk" backHref="/marketplace" />

      <main className="flex-1 px-5 py-6 bg-[var(--color-m-cream)]">
        <div className="mb-6">
          <h1 className="text-[22px] font-extrabold text-[var(--color-m-ink-900)] leading-tight tracking-tight">
            Masuk ke Gowes<span className="text-[var(--color-m-orange-500)]">Fit</span>
          </h1>
          <p className="mt-1.5 text-[13px] text-[var(--color-m-ink-600)]">
            Pakai email yang terdaftar.
          </p>
        </div>

        <SignInForm />

        <p className="mt-6 text-center text-[13px] text-[var(--color-m-ink-600)]">
          Belum punya akun?{" "}
          <Link href="/marketplace/sign-up" className="font-bold text-[var(--color-m-orange-600)]">
            Daftar gratis
          </Link>
        </p>
      </main>
    </>
  );
}
