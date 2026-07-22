import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CategoryForm } from "../CategoryForm";

export default async function NewCategoryPage() {
  // Hanya kategori utama (parentId null) yang boleh jadi induk — maks 2 level.
  const parentOptions = await prisma.category.findMany({
    where: { parentId: null },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: { id: true, name: true },
  });

  return (
    <div>
      <div className="mb-5">
        <Link href="/admin/categories" className="text-[12px] text-slate-500 hover:text-slate-700">← Kembali ke Kategori</Link>
        <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-slate-900">Kategori Baru</h1>
      </div>
      <CategoryForm parentOptions={parentOptions} />
    </div>
  );
}
