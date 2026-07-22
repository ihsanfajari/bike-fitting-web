"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "./getCurrentAdmin";
import { logAdminAction } from "./auditLog";

export type AdminListingActionResult = { ok: true } | { ok: false; error: string };

export async function adminPauseListingAction(
  listingId: string,
  reason: string,
): Promise<AdminListingActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) return { ok: false, error: "Bukan admin." };
  if (!reason.trim()) return { ok: false, error: "Alasan pause wajib diisi." };

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    select: { id: true, status: true, slug: true },
  });
  if (!listing) return { ok: false, error: "Listing tidak ditemukan." };
  if (listing.status !== "active") {
    return { ok: false, error: `Hanya listing aktif yang bisa di-pause (status sekarang: ${listing.status}).` };
  }

  await prisma.listing.update({
    where: { id: listingId },
    data: { status: "paused" },
  });
  await logAdminAction({
    adminId: admin.id,
    action: "pause_listing",
    targetType: "listing",
    targetId: listingId,
    reason: reason.trim(),
  });

  revalidatePath("/admin/listings");
  revalidatePath(`/admin/listings/${listingId}`);
  if (listing.slug) revalidatePath(`/marketplace/listing/${listing.slug}`);
  return { ok: true };
}

export async function adminUnpauseListingAction(
  listingId: string,
): Promise<AdminListingActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) return { ok: false, error: "Bukan admin." };

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    select: { id: true, status: true, slug: true },
  });
  if (!listing) return { ok: false, error: "Listing tidak ditemukan." };
  if (listing.status !== "paused") {
    return { ok: false, error: `Listing tidak dalam status paused (sekarang: ${listing.status}).` };
  }

  await prisma.listing.update({
    where: { id: listingId },
    data: { status: "active" },
  });
  await logAdminAction({
    adminId: admin.id,
    action: "unpause_listing",
    targetType: "listing",
    targetId: listingId,
  });

  revalidatePath("/admin/listings");
  revalidatePath(`/admin/listings/${listingId}`);
  if (listing.slug) revalidatePath(`/marketplace/listing/${listing.slug}`);
  return { ok: true };
}

export async function adminRemoveListingAction(
  listingId: string,
  reason: string,
): Promise<AdminListingActionResult> {
  const admin = await getCurrentAdmin();
  if (!admin) return { ok: false, error: "Bukan admin." };
  if (!reason.trim()) return { ok: false, error: "Alasan remove wajib diisi." };

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    select: { id: true, status: true, slug: true, deletedAt: true },
  });
  if (!listing) return { ok: false, error: "Listing tidak ditemukan." };
  if (listing.deletedAt) return { ok: false, error: "Listing sudah dihapus." };

  await prisma.listing.update({
    where: { id: listingId },
    data: { status: "removed", deletedAt: new Date() },
  });
  await logAdminAction({
    adminId: admin.id,
    action: "remove_listing",
    targetType: "listing",
    targetId: listingId,
    reason: reason.trim(),
  });

  revalidatePath("/admin/listings");
  revalidatePath(`/admin/listings/${listingId}`);
  revalidatePath("/marketplace");
  if (listing.slug) revalidatePath(`/marketplace/listing/${listing.slug}`);
  return { ok: true };
}
