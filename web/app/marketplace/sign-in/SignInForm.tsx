"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signInAction, type AuthFormState } from "@/lib/auth/actions";
import { Field, Input } from "@/components/ui";

export function SignInForm() {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(signInAction, undefined);

  return (
    <form className="space-y-4" action={formAction}>
      <Field label="Email" required>
        <Input type="email" name="identifier" placeholder="kamu@email.com" required />
      </Field>

      <Field label="Password" required>
        <Input type="password" name="password" required />
      </Field>

      {state?.error && (
        <div className="px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-[13px] text-red-700">
          {state.error}
        </div>
      )}

      <div className="flex items-center justify-end text-[12px]">
        <Link href="/marketplace/forgot-password" className="font-semibold text-[var(--color-m-orange-600)]">
          Lupa password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full h-12 rounded-xl bg-[var(--color-m-orange-500)] text-white font-extrabold text-[14px] flex items-center justify-center m-shadow-cta hover:bg-[var(--color-m-orange-600)] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
      >
        {pending ? "Memproses..." : "Masuk"}
      </button>
    </form>
  );
}
