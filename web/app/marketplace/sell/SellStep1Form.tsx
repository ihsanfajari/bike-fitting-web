"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Field, Input } from "@/components/ui";
import { CategoryIcon } from "../_components/CategoryIcon";
import { IconArrowRight, IconCamera } from "../_components/icons";
import { compressListingPhoto } from "@/lib/storage/compress";
import { uploadListingPhotoAction, deleteListingPhotoAction } from "@/lib/storage/photoUpload";
import { createDraftListingAction } from "@/lib/listings/actions";

type CategoryLeaf = { slug: string; name: string };
type UploadedPhoto = { url: string; path: string; previewUrl: string };

export function SellStep1Form({
  categories,
  initialDraft,
}: {
  categories: CategoryLeaf[];
  initialDraft?: {
    listingId: string;
    title: string;
    categorySlug: string;
    photos: Array<{ url: string }>;
  };
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialDraft?.categorySlug ?? "");
  const [title, setTitle] = useState<string>(initialDraft?.title ?? "");
  const [photos, setPhotos] = useState<UploadedPhoto[]>(
    initialDraft?.photos.map((p) => ({ url: p.url, path: "", previewUrl: p.url })) ?? [],
  );
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (files: FileList) => {
    setError(null);
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        if (photos.length >= 8) {
          setError("Maksimal 8 foto.");
          break;
        }
        const { file: compressed } = await compressListingPhoto(file);
        const fd = new FormData();
        fd.append("file", compressed);
        const result = await uploadListingPhotoAction(fd);
        if (!result.ok) {
          setError(result.error);
          break;
        }
        setPhotos((prev) => [
          ...prev,
          { url: result.url, path: result.path, previewUrl: result.url },
        ]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload gagal.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = async (index: number) => {
    const photo = photos[index];
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    if (photo.path) {
      // Fire-and-forget cleanup (best-effort)
      void deleteListingPhotoAction(photo.path);
    }
  };

  const handleNext = () => {
    setError(null);
    if (!selectedCategory) {
      setError("Pilih kategori dulu.");
      return;
    }
    if (!title.trim()) {
      setError("Judul listing wajib diisi.");
      return;
    }
    if (photos.length < 1) {
      setError("Upload minimal 1 foto. (Untuk publish butuh 3.)");
      return;
    }

    startTransition(async () => {
      const result = await createDraftListingAction({
        categorySlug: selectedCategory,
        title: title.trim(),
        photos: photos.map((p) => ({ url: p.url, path: p.path })),
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push(`/marketplace/sell/spesifikasi?id=${result.data.listingId}`);
    });
  };

  return (
    <>
      <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
        <h2 className="text-[16px] font-extrabold text-[var(--color-m-ink-900)] mb-1">Kategori sepeda</h2>
        <p className="text-[12px] text-[var(--color-m-ink-500)] mb-4">
          Pilih kategori yang paling tepat — bantu calon pembeli menemukan listingmu.
        </p>
        <div className="grid grid-cols-3 gap-2">
          {categories.map((c) => {
            const active = selectedCategory === c.slug;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => setSelectedCategory(c.slug)}
                className={`flex flex-col items-center gap-1 py-3.5 rounded-2xl border-[1.5px] transition-all ${
                  active
                    ? "border-[var(--color-m-orange-500)] bg-[var(--color-m-orange-100)]/50"
                    : "border-[var(--color-m-ink-100)] bg-white hover:border-[var(--color-m-orange-400)]"
                }`}
              >
                <CategoryIcon slug={c.slug} size={22} className={active ? "text-[var(--color-m-orange-600)]" : "text-[var(--color-m-ink-600)]"} />
                <span className={`text-[11px] font-semibold leading-tight text-center px-1 ${active ? "text-[var(--color-m-orange-700)]" : "text-[var(--color-m-ink-800)]"}`}>
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
        <h2 className="text-[16px] font-extrabold text-[var(--color-m-ink-900)] mb-1">Foto sepeda</h2>
        <p className="text-[12px] text-[var(--color-m-ink-500)] mb-4">
          Min 3 foto · Maks 8. Foto pertama jadi cover. Pakai cahaya alami untuk hasil terbaik.
        </p>

        <div className="grid grid-cols-3 gap-2">
          {photos.map((p, i) => (
            <div
              key={p.url}
              className="aspect-square rounded-xl relative overflow-hidden bg-[var(--color-m-ink-100)]"
            >
              <img src={p.previewUrl} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
              {i === 0 && (
                <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[var(--color-m-orange-500)] text-white text-[9px] font-bold">
                  COVER
                </span>
              )}
              <button
                type="button"
                onClick={() => handleRemovePhoto(i)}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center text-[12px] hover:bg-red-500"
                aria-label="Hapus foto"
              >
                ×
              </button>
            </div>
          ))}

          {photos.length < 8 && (
            <label className={`aspect-square rounded-xl border-[1.5px] border-dashed flex flex-col items-center justify-center gap-1 cursor-pointer ${uploading ? "border-[var(--color-m-orange-400)] bg-[var(--color-m-orange-100)]/30" : "border-[var(--color-m-ink-200)] hover:border-[var(--color-m-orange-400)]"}`}>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                disabled={uploading}
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="hidden"
              />
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-m-ink-500)]">
                <path d="M12 5v14M5 12h14" />
              </svg>
              <span className="text-[10px] font-semibold text-[var(--color-m-ink-500)]">
                {uploading ? "Upload..." : "Tambah"}
              </span>
            </label>
          )}
        </div>

        <div className="mt-4 p-3 rounded-xl bg-[var(--color-m-amber-100)]/50 text-[12px] text-[var(--color-m-ink-700)] leading-relaxed flex gap-2">
          <IconCamera size={18} className="flex-shrink-0 mt-0.5 text-[var(--color-m-amber-500)]" />
          <span><b>Tips foto laku:</b> samping kanan, samping kiri, groupset close-up, kondisi ban. Foto otomatis dikompresi ke WebP biar hemat data.</span>
        </div>
      </section>

      <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
        <Field label="Judul listing" required hint="Contoh: Trek Domane SL5 2022 Full Shimano 105 — 22jt nego">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
            placeholder="Brand + Model + Tahun + Highlight"
          />
        </Field>
      </section>

      {error && (
        <div className="mx-5 mt-3 px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-[13px] text-red-700">
          {error}
        </div>
      )}

      <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg flex gap-2">
        <a
          href="/marketplace/me"
          className="px-5 h-12 rounded-xl border border-[var(--color-m-ink-200)] flex items-center justify-center text-[14px] font-bold text-[var(--color-m-ink-700)]"
        >
          Batal
        </a>
        <button
          type="button"
          onClick={handleNext}
          disabled={pending || uploading}
          className="flex-1 h-12 rounded-xl bg-[var(--color-m-orange-500)] text-white font-extrabold text-[14px] flex items-center justify-center m-shadow-cta hover:bg-[var(--color-m-orange-600)] disabled:opacity-60"
        >
          {pending ? "Menyimpan..." : <span className="inline-flex items-center gap-1.5">Lanjut ke Spesifikasi <IconArrowRight size={16} /></span>}
        </button>
      </div>
    </>
  );
}
