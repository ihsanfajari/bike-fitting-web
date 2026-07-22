"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "./getCurrentAdmin";

export type CategoryActionResult<T = unknown> =
  | { ok: true; data: T }
  | { ok: false; error: string };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
}

type SpecValue = Prisma.InputJsonValue | typeof Prisma.JsonNull;

function parseSpecSchema(raw: string): { ok: true; value: SpecValue } | { ok: false; error: string } {
  const trimmed = raw.trim();
  if (!trimmed) return { ok: true, value: Prisma.JsonNull };
  try {
    const parsed = JSON.parse(trimmed);
    if (typeof parsed !== "object" || parsed === null) {
      return { ok: false, error: "spec_schema harus berupa object atau array JSON." };
    }
    return { ok: true, value: parsed as Prisma.InputJsonValue };
  } catch {
    return { ok: false, error: "spec_schema bukan JSON valid." };
  }
}

type CategoryInput = {
  name: string;
  slug?: string;
  parentId?: string | null;
  sortOrder?: number;
  isActive?: boolean;
  iconUrl?: string | null;
  specSchema?: string;
};

export async function createCategoryAction(
  input: CategoryInput,
): Promise<CategoryActionResult<{ id: string }>> {
  const admin = await getCurrentAdmin();
  if (!admin) return { ok: false, error: "Bukan admin." };

  const name = input.name.trim();
  if (!name) return { ok: false, error: "Nama kategori wajib diisi." };

  const slug = (input.slug?.trim() ? slugify(input.slug) : slugify(name));
  if (!slug) return { ok: false, error: "Slug tidak valid." };

  const existing = await prisma.category.findUnique({ where: { slug } });
  if (existing) return { ok: false, error: `Slug "${slug}" sudah dipakai.` };

  if (input.parentId) {
    const parent = await prisma.category.findUnique({
      where: { id: input.parentId },
      select: { id: true, parentId: true },
    });
    if (!parent) return { ok: false, error: "Kategori induk tidak ditemukan." };
    if (parent.parentId) return { ok: false, error: "Maksimal 2 level — induk tidak boleh subkategori." };
  }

  const spec = parseSpecSchema(input.specSchema ?? "");
  if (!spec.ok) return { ok: false, error: spec.error };

  const created = await prisma.category.create({
    data: {
      name,
      slug,
      parentId: input.parentId || null,
      sortOrder: input.sortOrder ?? 0,
      isActive: input.isActive ?? true,
      iconUrl: input.iconUrl?.trim() || null,
      specSchema: spec.value,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/marketplace");
  return { ok: true, data: { id: created.id } };
}

export async function updateCategoryAction(
  id: string,
  input: CategoryInput,
): Promise<CategoryActionResult<{ id: string }>> {
  const admin = await getCurrentAdmin();
  if (!admin) return { ok: false, error: "Bukan admin." };

  const current = await prisma.category.findUnique({
    where: { id },
    select: { id: true, children: { select: { id: true } } },
  });
  if (!current) return { ok: false, error: "Kategori tidak ditemukan." };

  const data: Prisma.CategoryUpdateInput = {};

  if (input.name !== undefined) {
    const name = input.name.trim();
    if (!name) return { ok: false, error: "Nama kategori wajib diisi." };
    data.name = name;
  }

  if (input.slug !== undefined) {
    const slug = slugify(input.slug);
    if (!slug) return { ok: false, error: "Slug tidak valid." };
    const clash = await prisma.category.findFirst({ where: { slug, NOT: { id } }, select: { id: true } });
    if (clash) return { ok: false, error: `Slug "${slug}" sudah dipakai.` };
    data.slug = slug;
  }

  if (input.parentId !== undefined) {
    if (input.parentId === id) return { ok: false, error: "Kategori tidak boleh jadi induk dirinya sendiri." };
    if (input.parentId) {
      if (current.children.length > 0) {
        return { ok: false, error: "Kategori ini punya subkategori — tidak bisa dijadikan subkategori (maks 2 level)." };
      }
      const parent = await prisma.category.findUnique({
        where: { id: input.parentId },
        select: { id: true, parentId: true },
      });
      if (!parent) return { ok: false, error: "Kategori induk tidak ditemukan." };
      if (parent.parentId) return { ok: false, error: "Maksimal 2 level — induk tidak boleh subkategori." };
      data.parent = { connect: { id: input.parentId } };
    } else {
      data.parent = { disconnect: true };
    }
  }

  if (input.sortOrder !== undefined) data.sortOrder = input.sortOrder;
  if (input.isActive !== undefined) data.isActive = input.isActive;
  if (input.iconUrl !== undefined) data.iconUrl = input.iconUrl?.trim() || null;

  if (input.specSchema !== undefined) {
    const spec = parseSpecSchema(input.specSchema);
    if (!spec.ok) return { ok: false, error: spec.error };
    data.specSchema = spec.value;
  }

  await prisma.category.update({ where: { id }, data });

  revalidatePath("/admin/categories");
  revalidatePath(`/admin/categories/${id}`);
  revalidatePath("/marketplace");
  return { ok: true, data: { id } };
}

export async function toggleCategoryActiveAction(id: string): Promise<CategoryActionResult<{ isActive: boolean }>> {
  const admin = await getCurrentAdmin();
  if (!admin) return { ok: false, error: "Bukan admin." };

  const cat = await prisma.category.findUnique({ where: { id }, select: { isActive: true } });
  if (!cat) return { ok: false, error: "Kategori tidak ditemukan." };

  const updated = await prisma.category.update({
    where: { id },
    data: { isActive: !cat.isActive },
    select: { isActive: true },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/marketplace");
  return { ok: true, data: { isActive: updated.isActive } };
}
