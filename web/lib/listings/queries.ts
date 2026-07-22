// Query helpers untuk listing — dipakai Server Components.
import "server-only";
import { prisma } from "@/lib/prisma";

export async function getMyListings(userId: string) {
  return prisma.listing.findMany({
    where: { sellerId: userId, deletedAt: null },
    include: {
      photos: { orderBy: { sortOrder: "asc" }, take: 1 },
      category: { select: { name: true, slug: true } },
      _count: { select: { wishlists: true } },
    },
    orderBy: [{ updatedAt: "desc" }],
  });
}

export async function getMyDraftListing(userId: string) {
  return prisma.listing.findFirst({
    where: { sellerId: userId, status: "draft", deletedAt: null },
    include: { photos: { orderBy: { sortOrder: "asc" } } },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getListingForEdit(userId: string, listingId: string) {
  return prisma.listing.findFirst({
    where: { id: listingId, sellerId: userId, deletedAt: null },
    include: {
      photos: { orderBy: { sortOrder: "asc" } },
      category: true,
    },
  });
}

type ListActiveOptions = {
  categorySlug?: string;
  city?: string;
  sort?: "latest" | "cheapest" | "expensive" | "popular";
  take?: number;
  skip?: number;
};

export async function listActiveListings(opts: ListActiveOptions = {}) {
  const where: Parameters<typeof prisma.listing.findMany>[0] extends infer T
    ? T extends { where?: infer W }
      ? W
      : never
    : never = {
    status: "active",
    deletedAt: null,
  };

  if (opts.categorySlug) {
    const category = await prisma.category.findUnique({ where: { slug: opts.categorySlug } });
    if (!category) return [];
    (where as { categoryId?: string }).categoryId = category.id;
  }
  if (opts.city) (where as { city?: string }).city = opts.city;

  const orderBy =
    opts.sort === "cheapest"
      ? { price: "asc" as const }
      : opts.sort === "expensive"
        ? { price: "desc" as const }
        : opts.sort === "popular"
          ? { viewCount: "desc" as const }
          : { publishedAt: "desc" as const };

  return prisma.listing.findMany({
    where,
    include: {
      photos: { orderBy: { sortOrder: "asc" }, take: 1 },
      seller: { select: { id: true, fullName: true, city: true } },
      category: { select: { name: true, slug: true } },
    },
    orderBy,
    take: opts.take ?? 24,
    skip: opts.skip ?? 0,
  });
}

export async function getListingBySlug(slug: string) {
  return prisma.listing.findFirst({
    where: { slug, status: "active", deletedAt: null },
    include: {
      photos: { orderBy: { sortOrder: "asc" } },
      seller: {
        select: {
          id: true,
          fullName: true,
          avatarUrl: true,
          city: true,
          ratingAvg: true,
          ratingCount: true,
          txCount: true,
          phoneVerifiedAt: true,
          createdAt: true,
          lastActiveAt: true,
        },
      },
      category: { select: { name: true, slug: true, parentId: true } },
    },
  });
}

export async function incrementViewCount(listingId: string) {
  await prisma.listing.update({
    where: { id: listingId },
    data: { viewCount: { increment: 1 } },
  });
}

export async function getCategoryTree() {
  const all = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: [{ parentId: "asc" }, { sortOrder: "asc" }],
    select: { id: true, slug: true, name: true, parentId: true, iconUrl: true, sortOrder: true },
  });
  return all;
}
