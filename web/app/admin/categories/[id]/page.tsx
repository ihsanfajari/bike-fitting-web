import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CategoryForm } from "../CategoryForm";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [category, parentOptions] = await Promise.all([
    prisma.category.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        slug: true,
        parentId: true,
        sortOrder: true,
        isActive: true,
        iconUrl: true,
        specSchema: true,
      },
    }),
    prisma.category.findMany({
      where: { parentId: null },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      select: { id: true, name: true },
    }),
  ]);

  if (!category) notFound();

  return (
    <div>
      <div className="mb-5">
        <Link href="/admin/categories" className="text-[12px] text-slate-500 hover:text-slate-700">← Kembali ke Kategori</Link>
        <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-slate-900">Edit: {category.name}</h1>
      </div>
      <CategoryForm
        parentOptions={parentOptions.filter((p) => p.id !== category.id)}
        initial={{
          id: category.id,
          name: category.name,
          slug: category.slug,
          parentId: category.parentId,
          sortOrder: category.sortOrder,
          isActive: category.isActive,
          iconUrl: category.iconUrl,
          specSchema: category.specSchema ? JSON.stringify(category.specSchema, null, 2) : "",
        }}
      />
    </div>
  );
}
