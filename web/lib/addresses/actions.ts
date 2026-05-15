"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export type AddressFormState = { error?: string } | undefined;

function normalizePhone(raw: string): string {
  const cleaned = raw.replace(/[\s\-()]/g, "");
  if (cleaned.startsWith("+")) return cleaned;
  if (cleaned.startsWith("0")) return "+62" + cleaned.slice(1);
  if (cleaned.startsWith("62")) return "+" + cleaned;
  return "+62" + cleaned;
}

export async function createAddressAction(
  _prev: AddressFormState,
  formData: FormData,
): Promise<AddressFormState> {
  const user = await getCurrentUser();
  if (!user) redirect("/marketplace/sign-in");

  const label = String(formData.get("label") ?? "").trim() || null;
  const recipientName = String(formData.get("recipientName") ?? "").trim();
  const recipientPhone = normalizePhone(String(formData.get("recipientPhone") ?? "").trim());
  const province = String(formData.get("province") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const district = String(formData.get("district") ?? "").trim() || null;
  const postalCode = String(formData.get("postalCode") ?? "").trim() || null;
  const fullAddress = String(formData.get("fullAddress") ?? "").trim();
  const isPrimary = formData.get("isPrimary") === "on";

  if (!recipientName || !province || !city || !fullAddress) {
    return { error: "Nama, provinsi, kota, dan alamat lengkap wajib diisi." };
  }

  // Kalau diset utama, un-set address utama lain dulu (dalam satu transaksi)
  await prisma.$transaction(async (tx) => {
    if (isPrimary) {
      await tx.address.updateMany({
        where: { userId: user.id, isPrimary: true },
        data: { isPrimary: false },
      });
    }
    await tx.address.create({
      data: {
        userId: user.id,
        label,
        recipientName,
        recipientPhone,
        province,
        city,
        district,
        postalCode,
        fullAddress,
        isPrimary,
      },
    });
  });

  revalidatePath("/marketplace/me/addresses");
  redirect("/marketplace/me/addresses");
}

export async function setPrimaryAddressAction(addressId: string) {
  const user = await getCurrentUser();
  if (!user) redirect("/marketplace/sign-in");

  await prisma.$transaction([
    prisma.address.updateMany({
      where: { userId: user.id, isPrimary: true },
      data: { isPrimary: false },
    }),
    prisma.address.update({
      where: { id: addressId, userId: user.id },
      data: { isPrimary: true },
    }),
  ]);

  revalidatePath("/marketplace/me/addresses");
}

export async function deleteAddressAction(addressId: string) {
  const user = await getCurrentUser();
  if (!user) redirect("/marketplace/sign-in");

  await prisma.address.deleteMany({
    where: { id: addressId, userId: user.id },
  });

  revalidatePath("/marketplace/me/addresses");
}
