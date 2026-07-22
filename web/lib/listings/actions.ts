"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export type ListingActionResult<T = unknown> =
  | { ok: true; data: T }
  | { ok: false; error: string };

type FrameMaterial = "aluminum" | "carbon" | "steel" | "titanium" | "other";
type ListingCondition = "new" | "like_new" | "used_mint" | "used_normal" | "used_repair";

const VALID_MATERIALS: FrameMaterial[] = ["aluminum", "carbon", "steel", "titanium", "other"];
const VALID_CONDITIONS: ListingCondition[] = ["new", "like_new", "used_mint", "used_normal", "used_repair"];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
}

type CreateDraftInput = {
  categorySlug: string;
  title: string;
  photos: Array<{ url: string; path: string }>;
};

/**
 * Bikin draft listing — dipanggil saat user klik "Lanjut" dari step 1.
 * Photos sudah ter-upload sebelumnya; di sini hanya menyambungkan rownya.
 */
export async function createDraftListingAction(
  input: CreateDraftInput,
): Promise<ListingActionResult<{ listingId: string }>> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Silakan login dulu." };

  const title = input.title.trim();
  if (!title) return { ok: false, error: "Judul listing wajib diisi." };
  if (title.length > 120) return { ok: false, error: "Judul maks 120 karakter." };

  const category = await prisma.category.findUnique({ where: { slug: input.categorySlug } });
  if (!category) return { ok: false, error: "Kategori tidak ditemukan." };

  if (input.photos.length < 1) return { ok: false, error: "Minimal 1 foto. (Untuk publish butuh 3.)" };

  // Default value sementara — diisi user di step berikutnya.
  // City & province wajib di schema, jadi pakai placeholder yang harus diisi.
  const listing = await prisma.listing.create({
    data: {
      sellerId: user.id,
      categoryId: category.id,
      title,
      condition: "used_normal",
      price: BigInt(0),
      city: user.city ?? "—",
      province: "—",
      status: "draft",
      photos: {
        create: input.photos.map((p, i) => ({
          url: p.url,
          sortOrder: i,
        })),
      },
    },
  });

  return { ok: true, data: { listingId: listing.id } };
}

type UpdateListingInput = {
  listingId: string;
  brand?: string;
  model?: string;
  year?: number;
  frameSize?: string;
  groupset?: string;
  frameMaterial?: string;
  condition?: string;
  description?: string;
  price?: number;
  isNegotiable?: boolean;
  allowCod?: boolean;
  city?: string;
  province?: string;
  extraSpecs?: Record<string, string>;
};

export async function updateListingAction(
  input: UpdateListingInput,
): Promise<ListingActionResult<{ listingId: string }>> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Silakan login dulu." };

  const existing = await prisma.listing.findUnique({
    where: { id: input.listingId },
    select: { sellerId: true, status: true },
  });
  if (!existing || existing.sellerId !== user.id) {
    return { ok: false, error: "Listing tidak ditemukan." };
  }

  const data: Prisma.ListingUpdateInput = {};
  if (input.brand !== undefined) data.brand = input.brand.trim() || null;
  if (input.model !== undefined) data.model = input.model.trim() || null;
  if (input.year !== undefined) data.year = input.year;
  if (input.frameSize !== undefined) data.frameSize = input.frameSize.trim() || null;
  if (input.groupset !== undefined) data.groupset = input.groupset.trim() || null;
  if (input.frameMaterial !== undefined) {
    if (input.frameMaterial && !VALID_MATERIALS.includes(input.frameMaterial as FrameMaterial)) {
      return { ok: false, error: "Material tidak valid." };
    }
    data.frameMaterial = (input.frameMaterial || null) as FrameMaterial | null;
  }
  if (input.condition !== undefined) {
    if (!VALID_CONDITIONS.includes(input.condition as ListingCondition)) {
      return { ok: false, error: "Kondisi tidak valid." };
    }
    data.condition = input.condition as ListingCondition;
  }
  if (input.description !== undefined) data.description = input.description.trim() || null;
  if (input.price !== undefined) {
    if (input.price < 0) return { ok: false, error: "Harga tidak boleh negatif." };
    data.price = BigInt(Math.floor(input.price));
  }
  if (input.isNegotiable !== undefined) data.isNegotiable = input.isNegotiable;
  if (input.allowCod !== undefined) data.allowCod = input.allowCod;
  if (input.city !== undefined && input.city.trim()) data.city = input.city.trim();
  if (input.province !== undefined && input.province.trim()) data.province = input.province.trim();
  if (input.extraSpecs !== undefined) data.extraSpecs = input.extraSpecs;

  await prisma.listing.update({ where: { id: input.listingId }, data });
  return { ok: true, data: { listingId: input.listingId } };
}

/**
 * Publish listing — set status=active, generate slug, syaratnya:
 * - Phone terverifikasi
 * - Minimal 3 foto
 * - Field wajib (title, condition, price > 0, city, province) terisi
 */
export async function publishListingAction(
  listingId: string,
): Promise<ListingActionResult<{ slug: string }>> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Silakan login dulu." };
  if (!user.phoneVerifiedAt) {
    return { ok: false, error: "Nomor HP harus diverifikasi admin dulu sebelum bisa publish listing." };
  }

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    include: { photos: true },
  });
  if (!listing || listing.sellerId !== user.id) {
    return { ok: false, error: "Listing tidak ditemukan." };
  }
  if (listing.photos.length < 3) {
    return { ok: false, error: "Minimal 3 foto sebelum publish." };
  }
  if (!listing.title || listing.price <= 0 || listing.city === "—" || listing.province === "—") {
    return { ok: false, error: "Lengkapi judul, harga, dan lokasi dulu." };
  }

  // Generate slug unik
  let baseSlug = slugify(listing.title);
  if (!baseSlug) baseSlug = "listing";
  let slug = baseSlug;
  let counter = 1;
  while (await prisma.listing.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`;
    if (counter > 50) {
      slug = `${baseSlug}-${Date.now()}`;
      break;
    }
  }

  await prisma.listing.update({
    where: { id: listingId },
    data: { status: "active", slug, publishedAt: new Date() },
  });

  revalidatePath("/marketplace");
  revalidatePath("/marketplace/me/listings");
  return { ok: true, data: { slug } };
}

export async function deleteListingAction(listingId: string): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/marketplace/sign-in");

  await prisma.listing.updateMany({
    where: { id: listingId, sellerId: user.id },
    data: { deletedAt: new Date(), status: "removed" },
  });
  revalidatePath("/marketplace/me/listings");
}

export async function pauseListingAction(listingId: string): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/marketplace/sign-in");

  const listing = await prisma.listing.findFirst({
    where: { id: listingId, sellerId: user.id },
    select: { status: true },
  });
  if (!listing) return;

  await prisma.listing.update({
    where: { id: listingId },
    data: { status: listing.status === "paused" ? "active" : "paused" },
  });
  revalidatePath("/marketplace/me/listings");
}
