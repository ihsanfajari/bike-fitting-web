// Kompresi foto sisi client sebelum upload ke server.
// Target: maks 1280px dimensi terpanjang, format WebP, ~300-500KB.
// Hemat bandwidth user + biaya Storage.
import imageCompression from "browser-image-compression";

export type CompressResult = { file: File; originalKB: number; compressedKB: number };

export async function compressListingPhoto(input: File): Promise<CompressResult> {
  const originalKB = Math.round(input.size / 1024);

  const compressed = await imageCompression(input, {
    maxSizeMB: 0.6,
    maxWidthOrHeight: 1280,
    fileType: "image/webp",
    useWebWorker: true,
    initialQuality: 0.82,
  });

  // Pastikan punya nama file dengan extension yang benar
  const baseName = input.name.replace(/\.[^.]+$/, "");
  const out = new File([compressed], `${baseName}.webp`, {
    type: "image/webp",
    lastModified: Date.now(),
  });

  return {
    file: out,
    originalKB,
    compressedKB: Math.round(out.size / 1024),
  };
}
