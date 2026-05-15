"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUpAction, type AuthFormState } from "@/lib/auth/actions";
import { ButtonLink, Field, Input } from "@/components/ui";
import { IconShield } from "../_components/icons";

export function SignUpForm() {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(signUpAction, undefined);

  return (
    <>
      <form className="space-y-4" action={formAction}>
        <Field label="Nama Lengkap" required>
          <Input type="text" name="name" placeholder="Contoh: Budi Santoso" required />
        </Field>

        <Field label="Email" required hint="Kami kirim notifikasi pesanan ke sini">
          <Input type="email" name="email" placeholder="kamu@email.com" required />
        </Field>

        <Field label="Nomor HP" required hint="Wajib aktif WhatsApp — admin akan verifikasi manual">
          <Input type="tel" name="phone" placeholder="081234567890" required />
        </Field>

        <Field label="Password" required hint="Minimal 8 karakter">
          <Input type="password" name="password" minLength={8} required />
        </Field>

        {state?.error && (
          <div className="px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-[13px] text-red-700">
            {state.error}
          </div>
        )}

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

        <button
          type="submit"
          disabled={pending}
          className="w-full h-12 rounded-xl bg-[var(--color-m-orange-500)] text-white font-extrabold text-[14px] flex items-center justify-center m-shadow-cta hover:bg-[var(--color-m-orange-600)] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
        >
          {pending ? "Mendaftarkan..." : "Daftar Akun"}
        </button>
      </form>

      <div className="mt-6 flex items-start gap-2.5 p-3.5 rounded-xl bg-[var(--color-m-teal-100)]/60">
        <IconShield size={18} className="text-[var(--color-m-teal-600)] flex-shrink-0 mt-0.5" />
        <p className="text-[12px] text-[var(--color-m-ink-700)] leading-relaxed">
          Verifikasi HP wajib supaya komunitas tetap aman dari akun palsu. Setelah daftar, admin akan kontak via WhatsApp.
        </p>
      </div>
    </>
  );
}
