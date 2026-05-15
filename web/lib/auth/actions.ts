"use server";

import { redirect } from "next/navigation";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export type AuthFormState = { error?: string } | undefined;

function normalizePhone(raw: string): string | null {
  const cleaned = raw.replace(/[\s\-()]/g, "");
  if (!cleaned) return null;
  if (cleaned.startsWith("+")) return cleaned;
  if (cleaned.startsWith("0")) return "+62" + cleaned.slice(1);
  if (cleaned.startsWith("62")) return "+" + cleaned;
  return "+62" + cleaned;
}

export async function signUpAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("name") ?? "").trim();
  const phoneRaw = String(formData.get("phone") ?? "").trim();
  const phone = normalizePhone(phoneRaw);

  if (!email || !password || !fullName) {
    return { error: "Email, nama, dan password wajib diisi." };
  }
  if (password.length < 8) {
    return { error: "Password minimal 8 karakter." };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return { error: error.message };
  if (!data.user) return { error: "Pendaftaran gagal." };

  try {
    await prisma.user.create({
      data: {
        id: data.user.id,
        email,
        fullName,
        phone,
      },
    });
  } catch (e) {
    // Rollback auth user supaya tidak ada inkonsistensi
    const admin = createSupabaseAdminClient();
    await admin.auth.admin.deleteUser(data.user.id);
    const message = e instanceof Error && e.message.includes("Unique") ? "Email atau nomor HP sudah terdaftar." : "Gagal menyimpan profil. Coba lagi.";
    return { error: message };
  }

  redirect("/marketplace/verify-otp");
}

export async function signInAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("identifier") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Email atau password salah." };

  redirect("/marketplace");
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/marketplace/sign-in");
}
