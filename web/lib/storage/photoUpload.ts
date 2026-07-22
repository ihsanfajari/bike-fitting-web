"use server";

import { randomUUID } from "crypto";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const BUCKET = "listing-photos";

export type UploadResult =
  | { ok: true; url: string; path: string }
  | { ok: false; error: string };

/**
 * Upload satu foto listing ke Supabase Storage.
 * Path: <user_id>/<uuid>.<ext>
 * - User wajib login.
 * - File harus image/jpeg|png|webp, maks 5MB.
 * - Pakai service-role key (bypass RLS) — validasi auth & ownership di server.
 */
export async function uploadListingPhotoAction(formData: FormData): Promise<UploadResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Silakan login dulu." };

  const file = formData.get("file");
  if (!(file instanceof File)) return { ok: false, error: "File tidak valid." };
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { ok: false, error: "Tipe file harus JPG, PNG, atau WebP." };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: "File terlalu besar (maks 5MB)." };
  }
  if (file.size === 0) return { ok: false, error: "File kosong." };

  const ext = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
  const path = `${user.id}/${randomUUID()}.${ext}`;

  const supabase = createSupabaseAdminClient();
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return { ok: false, error: `Upload gagal: ${uploadError.message}` };
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { ok: true, url: data.publicUrl, path };
}

/**
 * Hapus foto dari Storage. Path di-bind ke user_id-nya — user lain tidak bisa
 * menghapus foto milik orang lain.
 */
export async function deleteListingPhotoAction(path: string): Promise<{ ok: boolean; error?: string }> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Silakan login dulu." };

  if (!path.startsWith(`${user.id}/`)) {
    return { ok: false, error: "Tidak punya akses ke file ini." };
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
