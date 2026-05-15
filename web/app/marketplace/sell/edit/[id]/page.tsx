import { PageTopBar } from "../../../_components/TopBar";
import { ButtonLink, Field, Input, Select, Textarea } from "@/components/ui";
import { LISTINGS } from "@/lib/mock/api";
import { IconShield } from "../../../_components/icons";
import { formatRupiah } from "@/lib/format";

const FRAME_SIZES = ["48", "50", "52", "54", "56", "58", "S", "M", "L", "XL", "One Size"];
const MATERIALS = ["Carbon", "Aluminum", "Steel", "Titanium"];
const CONDITIONS = [
  { value: "new", label: "Baru" },
  { value: "like_new", label: "Seperti Baru" },
  { value: "used_mint", label: "Bekas Mulus" },
  { value: "used_normal", label: "Bekas Normal" },
  { value: "used_repair", label: "Butuh Servis" },
];
const PROVINCES = ["DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "DIY", "Banten", "Bali"];

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = LISTINGS.find((l) => l.id === id) ?? LISTINGS[0];
  const fee = Math.max(5000, Math.round(listing.price * 0.01));

  return (
    <>
      <PageTopBar title="Edit Listing" backHref="/marketplace/me/listings" />

      <main className="flex-1 pb-32 bg-[var(--color-m-cream)]">
        {/* Status banner */}
        <section className="bg-[var(--color-m-amber-100)]/70 px-5 py-3 border-b border-[var(--color-m-amber-200)]">
          <p className="text-[12px] text-[var(--color-m-amber-800)] font-medium leading-relaxed">
            ⚠️ Listing yang sedang aktif akan <b>otomatis dijeda</b> saat kamu menyimpan perubahan. Aktifkan kembali dari halaman Listing Saya setelah selesai edit.
          </p>
        </section>

        {/* Foto */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-1">Foto</h2>
          <p className="text-[12px] text-[var(--color-m-ink-500)] mb-4">
            Min 3 foto · Maks 8. Foto pertama jadi cover.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-xl relative overflow-hidden flex items-center justify-center text-[11px] text-[var(--color-m-ink-400)] italic"
                style={{ background: "linear-gradient(135deg,#FFE5D6,#E0F7F8)" }}
              >
                {i === 0 && (
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[var(--color-m-orange-500)] text-white text-[9px] font-bold">
                    COVER
                  </span>
                )}
                <button className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/40 text-white text-[10px] flex items-center justify-center">
                  ✕
                </button>
                <span>Foto {i + 1}</span>
              </div>
            ))}
            <button className="aspect-square rounded-xl border-[1.5px] border-dashed border-[var(--color-m-ink-200)] flex flex-col items-center justify-center gap-1 text-[var(--color-m-ink-500)] hover:border-[var(--color-m-orange-400)] hover:text-[var(--color-m-orange-600)]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              <span className="text-[10px] font-semibold">Tambah</span>
            </button>
          </div>
        </section>

        {/* Judul */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <Field label="Judul listing" required hint="Merek, model, tahun, groupset — makin detail makin cepat laku.">
            <Input defaultValue={listing.title} />
          </Field>
        </section>

        {/* Spesifikasi */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3 space-y-4">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)]">Spesifikasi</h2>

          <Field label="Brand" required>
            <Input defaultValue={listing.brand} placeholder="Trek, Polygon, Specialized, dll" />
          </Field>

          <Field label="Model" required>
            <Input defaultValue={listing.model} />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Tahun" required>
              <Input type="number" defaultValue={listing.year} min={1990} max={2026} />
            </Field>
            <Field label="Ukuran Frame" required>
              <Select defaultValue={listing.frameSize}>
                {FRAME_SIZES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Material">
              <Select defaultValue={listing.frameMaterial}>
                {MATERIALS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </Select>
            </Field>
            <Field label="Kondisi" required>
              <Select defaultValue={listing.condition}>
                {CONDITIONS.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </Select>
            </Field>
          </div>

          <Field label="Groupset" hint="Opsional — sangat membantu pembeli serius">
            <Input defaultValue={listing.groupset} />
          </Field>
        </section>

        {/* Deskripsi */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-3">Deskripsi</h2>
          <Field hint="Kondisi detail, alasan jual, riwayat servis, kelengkapan yang disertakan.">
            <Textarea rows={6} defaultValue={listing.description} />
          </Field>
        </section>

        {/* Spec tambahan */}
        {listing.extraSpecs && Object.keys(listing.extraSpecs).length > 0 && (
          <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
            <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-3">Spec Tambahan</h2>
            <div className="space-y-2">
              {Object.entries(listing.extraSpecs).map(([k, v]) => (
                <div key={k} className="grid grid-cols-2 gap-2">
                  <Input defaultValue={k} placeholder="Nama spec" />
                  <Input defaultValue={v} placeholder="Nilai" />
                </div>
              ))}
              <button className="w-full py-2.5 rounded-xl border border-dashed border-[var(--color-m-ink-200)] text-[13px] font-semibold text-[var(--color-m-orange-600)] hover:bg-[var(--color-m-orange-100)]/30">
                + Tambah spec
              </button>
            </div>
          </section>
        )}

        {/* Harga */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3 space-y-4">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)]">Harga</h2>

          <Field label="Harga (Rp)" required>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] font-bold text-[var(--color-m-ink-500)]">
                Rp
              </span>
              <Input
                type="text"
                inputMode="numeric"
                defaultValue={listing.price.toLocaleString("id-ID")}
                className="pl-10 m-tnum text-[18px] font-extrabold"
              />
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <label className={`flex items-center gap-2.5 p-3.5 rounded-xl border-[1.5px] cursor-pointer ${listing.negotiable ? "border-[var(--color-m-orange-500)] bg-[var(--color-m-orange-100)]/40" : "border-[var(--color-m-ink-100)]"}`}>
              <input type="checkbox" defaultChecked={listing.negotiable} className="w-4 h-4 accent-[var(--color-m-orange-500)]" />
              <span className="text-[13px] font-bold text-[var(--color-m-ink-900)]">Bisa nego</span>
            </label>
            <label className={`flex items-center gap-2.5 p-3.5 rounded-xl border-[1.5px] cursor-pointer ${listing.cod ? "border-[var(--color-m-orange-500)] bg-[var(--color-m-orange-100)]/40" : "border-[var(--color-m-ink-100)]"}`}>
              <input type="checkbox" defaultChecked={listing.cod} className="w-4 h-4 accent-[var(--color-m-orange-500)]" />
              <span className="text-[13px] font-bold text-[var(--color-m-ink-900)]">Bisa COD</span>
            </label>
          </div>

          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[var(--color-m-green-100)]/60">
            <IconShield size={18} className="text-[var(--color-m-green-500)] flex-shrink-0 mt-0.5" />
            <p className="text-[12px] text-[var(--color-m-ink-600)] leading-relaxed">
              Estimasi kamu terima: <b>{formatRupiah(listing.price - fee)}</b>
              <br />
              <span className="text-[var(--color-m-ink-400)]">Setelah biaya rekber 1% ({formatRupiah(fee)}) ditanggung pembeli</span>
            </p>
          </div>
        </section>

        {/* Lokasi */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3 space-y-4">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)]">Lokasi Barang</h2>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Provinsi" required>
              <Select defaultValue={listing.province}>
                {PROVINCES.map((p) => <option key={p}>{p}</option>)}
              </Select>
            </Field>
            <Field label="Kota/Kab" required>
              <Input defaultValue={listing.city} />
            </Field>
          </div>
        </section>
      </main>

      <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg flex gap-2">
        <ButtonLink href="/marketplace/me/listings" variant="ghost" size="lg" className="px-5">
          Batal
        </ButtonLink>
        <ButtonLink href="/marketplace/me/listings" full size="lg" variant="success">
          Simpan Perubahan
        </ButtonLink>
      </div>
    </>
  );
}