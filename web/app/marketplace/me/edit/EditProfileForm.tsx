"use client";

import { useActionState } from "react";
import { updateProfileAction, type ProfileFormState } from "@/lib/profile/actions";
import { Field, Input, Textarea } from "@/components/ui";

type Props = {
  initialFullName: string;
  initialEmail: string;
  initialPhone: string | null;
  initialBio: string | null;
  initialCity: string | null;
};

export function EditProfileForm(props: Props) {
  const [state, formAction, pending] = useActionState<ProfileFormState, FormData>(updateProfileAction, undefined);

  return (
    <form action={formAction}>
      <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
        <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-4">Data Diri</h2>
        <div className="space-y-4">
          <Field label="Nama Lengkap" required>
            <Input name="fullName" defaultValue={props.initialFullName} placeholder="Nama lengkap" required />
          </Field>
          <Field label="Email" hint="Email login tidak bisa diubah dari sini.">
            <Input type="email" defaultValue={props.initialEmail} disabled />
          </Field>
          <Field label="Nomor HP" required hint="Mengubah HP akan mereset verifikasi — admin verifikasi ulang via WA.">
            <Input
              name="phone"
              defaultValue={props.initialPhone ?? ""}
              placeholder="081234567890"
              inputMode="tel"
              required
            />
          </Field>
          <Field label="Kota" hint="Lokasi default kamu (bukan alamat pengiriman).">
            <Input name="city" defaultValue={props.initialCity ?? ""} placeholder="Contoh: Jakarta Selatan" />
          </Field>
          <Field label="Bio" hint="Tampil di profil publik. Maks 500 karakter.">
            <Textarea name="bio" defaultValue={props.initialBio ?? ""} rows={3} maxLength={500} placeholder="Ceritakan singkat tentang kamu — komunitas yang kamu ikuti, tipe sepeda favorit, dll." />
          </Field>
        </div>
      </section>

      {state?.error && (
        <div className="mx-5 mt-3 px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-[13px] text-red-700">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="mx-5 mt-3 px-3.5 py-2.5 rounded-xl bg-green-50 border border-green-200 text-[13px] text-green-700">
          ✅ Profil tersimpan
        </div>
      )}

      <section className="px-5 py-4">
        <p className="text-[11px] text-[var(--color-m-ink-500)] text-center leading-relaxed">
          Untuk mengelola alamat pengiriman, kunjungi halaman <b>Alamat Pengiriman</b> di menu Akun.
        </p>
      </section>

      <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg flex gap-2">
        <a
          href="/marketplace/me"
          className="px-5 h-12 rounded-xl border border-[var(--color-m-ink-200)] flex items-center justify-center text-[14px] font-bold text-[var(--color-m-ink-700)]"
        >
          Batal
        </a>
        <button
          type="submit"
          disabled={pending}
          className="flex-1 h-12 rounded-xl bg-[var(--color-m-green-500)] text-white font-extrabold text-[14px] flex items-center justify-center m-shadow-cta hover:bg-[var(--color-m-green-600)] disabled:opacity-60"
        >
          {pending ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}
