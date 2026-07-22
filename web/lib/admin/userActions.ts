"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "./getCurrentAdmin";
import { logAdminAction } from "./auditLog";

export type AdminActionResult = { ok: true } | { ok: false; error: string };

export async function verifyPhoneAction(userId: string, reason?: string): Promise<AdminActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) return { ok: false, error: "Bukan admin." };

  const target = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, phone: true, phoneVerifiedAt: true },
  });
  if (!target) return { ok: false, error: "User tidak ditemukan." };
  if (target.phoneVerifiedAt) return { ok: false, error: "HP sudah terverifikasi." };

  await prisma.user.update({
    where: { id: userId },
    data: { phoneVerifiedAt: new Date() },
  });
  await logAdminAction({
    adminId: admin.id,
    action: "verify_phone",
    targetType: "user",
    targetId: userId,
    reason: reason ?? null,
    metadata: { phone: target.phone },
  });

  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${userId}`);
  return { ok: true };
}

export async function suspendUserAction(
  userId: string,
  reason: string,
): Promise<AdminActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) return { ok: false, error: "Bukan admin." };
  if (admin.id === userId) return { ok: false, error: "Tidak bisa suspend diri sendiri." };
  if (!reason.trim()) return { ok: false, error: "Alasan suspend wajib diisi." };

  await prisma.user.update({
    where: { id: userId },
    data: {
      accountStatus: "suspended",
      suspendedReason: reason.trim(),
      suspendedAt: new Date(),
    },
  });
  await logAdminAction({
    adminId: admin.id,
    action: "suspend_user",
    targetType: "user",
    targetId: userId,
    reason: reason.trim(),
  });

  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${userId}`);
  return { ok: true };
}

export async function unsuspendUserAction(userId: string): Promise<AdminActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) return { ok: false, error: "Bukan admin." };

  await prisma.user.update({
    where: { id: userId },
    data: { accountStatus: "active", suspendedReason: null, suspendedAt: null },
  });
  await logAdminAction({
    adminId: admin.id,
    action: "unsuspend_user",
    targetType: "user",
    targetId: userId,
  });

  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${userId}`);
  return { ok: true };
}

export async function banUserAction(userId: string, reason: string): Promise<AdminActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) return { ok: false, error: "Bukan admin." };
  if (admin.id === userId) return { ok: false, error: "Tidak bisa ban diri sendiri." };
  if (!reason.trim()) return { ok: false, error: "Alasan ban wajib diisi." };

  await prisma.user.update({
    where: { id: userId },
    data: {
      accountStatus: "banned",
      suspendedReason: reason.trim(),
      suspendedAt: new Date(),
    },
  });
  await logAdminAction({
    adminId: admin.id,
    action: "ban_user",
    targetType: "user",
    targetId: userId,
    reason: reason.trim(),
  });

  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${userId}`);
  return { ok: true };
}
