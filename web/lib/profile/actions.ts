"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export type ProfileFormState = { error?: string; success?: boolean } | undefined;

function normalizePhone(raw: string): string | null {
  const cleaned = raw.replace(/[\s\-()]/g, "");
  if (!cleaned) return null;
  if (cleaned.startsWith("+")) return cleaned;
  if (cleaned.startsWith("0")) return "+62" + cleaned.slice(1);
  if (cleaned.startsWith("62")) return "+" + cleaned;
  return "+62" + cleaned;
}

export async function updateProfileAction(
  _prev: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const user = await getCurrentUser();
  if (!user) redirect("/marketplace/sign-in");

  const fullName = String(formData.get("fullName") ?? "").trim();
  const phoneRaw = String(formData.get("phone") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();

  if (!fullName) return { error: "Nama lengkap wajib diisi." };

  const phone = normalizePhone(phoneRaw);
  const phoneChanged = phone !== user.phone;

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        fullName,
        phone,
        bio: bio || null,
        city: city || null,
        // Kalau HP berubah, reset verifikasi — admin harus verifikasi ulang via WA
        ...(phoneChanged ? { phoneVerifiedAt: null } : {}),
      },
    });
  } catch (e) {
    const msg = e instanceof Error && e.message.includes("Unique") ? "Nomor HP sudah dipakai akun lain." : "Gagal menyimpan profil.";
    return { error: msg };
  }

  revalidatePath("/marketplace/me");
  return { success: true };
}
