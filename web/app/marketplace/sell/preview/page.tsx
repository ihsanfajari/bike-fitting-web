import Link from "next/link";
import { redirect } from "next/navigation";
import { PageTopBar } from "../../_components/TopBar";
import { Badge } from "@/components/ui";
import { IconChevronRight, IconMapPin, IconShield, IconSparkle, IconHourglass, IconCamera } from "../../_components/icons";
import { formatRupiah } from "@/lib/format";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { getListingForEdit } from "@/lib/listings/queries";
import { PublishButton } from "./PublishButton";

const CONDITION_LABELS: Record<string, string> = {
  new: "Baru",
  like_new: "Seperti Baru",
  used_mint: "Bekas Mulus",
  used_normal: "Bekas Normal",
  used_repair: "Butuh Servis",
};

const MATERIAL_LABELS: Record<string, string> = {
  carbon: "Carbon",
  aluminum: "Aluminum",
  steel: "Steel",
  titanium: "Titanium",
  other: "Lainnya",
};

export default async function SellPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/marketplace/sign-in");

  const { id } = await searchParams;
  if (!id) redirect("/marketplace/sell");

  const listing = await getListingForEdit(user.id, id);
  if (!listing) redirect("/marketplace/sell");

  const price = Number(listing.price);
  const photos = listing.photos;
  const extraSpecsObj = (listing.extraSpecs ?? {}) as Record<string, string>;
  const specRows: Array<[string, string]> = [
    ["Brand", listing.brand ?? "—"],
    ["Model", listing.model ?? "—"],
    ["Tahun", listing.year ? String(listing.year) : "—"],
    ["Ukuran Frame", listing.frameSize ?? "—"],
    ["Material", listing.frameMaterial ? MATERIAL_LABELS[listing.frameMaterial] : "—"],
    ["Groupset", listing.groupset ?? "—"],
    ...Object.entries(extraSpecsObj),
  ];

  return (
    <>
      <PageTopBar title="Preview Listing" backHref={`/marketplace/sell/harga?id=${id}`} />

      <main className="flex-1 pb-32 bg-[var(--color-m-cream)]">
        <div className="bg-[var(--color-m-amber-100)]/50 border-b border-[var(--color-m-amber-100)] px-5 py-3 flex items-center justify-center gap-1.5 text-[12px] font-semibold text-[var(--color-m-ink-700)]">
          <IconSparkle size={14} className="text-[var(--color-m-amber-500)]" /> Preview — beginilah pembeli akan melihat listingmu
        </div>

        {photos[0] ? (
          <img src={photos[0].url} alt={listing.title} className="aspect-square w-full object-cover" />
        ) : (
          <div className="aspect-square w-full flex items-center justify-center text-[var(--color-m-ink-400)] italic" style={{ background: "linear-gradient(135deg,#FFE5D6,#FFF0E6)" }}>
            <span className="text-[13px]">[ belum ada foto ]</span>
          </div>
        )}

        {photos.length > 1 && (
          <div className="px-4 py-3 bg-[var(--color-m-paper)] border-b border-[var(--color-m-ink-100)]">
            <div className="flex gap-2 overflow-x-auto m-no-scrollbar">
              {photos.map((p, i) => (
                <img
                  key={p.id}
                  src={p.url}
                  alt={`Foto ${i + 1}`}
                  className={`flex-shrink-0 w-16 h-16 rounded-xl object-cover border-2 ${i === 0 ? "border-[var(--color-m-orange-500)]" : "border-transparent"}`}
                />
              ))}
            </div>
          </div>
        )}

        <section className="bg-[var(--color-m-paper)] px-5 py-5 border-b border-[var(--color-m-ink-100)]">
          <div className="flex items-start gap-2 mb-2 flex-wrap">
            <Badge tone="orange">{CONDITION_LABELS[listing.condition]}</Badge>
            {listing.isNegotiable && <Badge tone="teal">Bisa Nego</Badge>}
            {listing.allowCod && <Badge tone="green">COD</Badge>}
          </div>
          <h1 className="text-[20px] font-extrabold text-[var(--color-m-ink-900)] leading-tight tracking-tight">
            {listing.title}
          </h1>
          <div className="mt-3 text-[28px] font-extrabold text-[var(--color-m-ink-900)] m-tnum tracking-tight">
            {formatRupiah(price)}
          </div>
          <div className="mt-2 text-[12px] text-[var(--color-m-ink-400)] inline-flex items-center gap-1">
            <IconMapPin size={13} /> {listing.city}, {listing.province}
          </div>
        </section>

        <section className="px-5 py-4 bg-gradient-to-br from-[var(--color-m-green-100)] to-[var(--color-m-teal-100)]">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--color-m-green-500)] flex-shrink-0">
              <IconShield size={22} />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-bold text-[var(--color-m-ink-900)]">Transaksi dilindungi Rekber</div>
              <p className="text-[12px] text-[var(--color-m-ink-600)] leading-snug mt-0.5">
                Otomatis untuk semua transaksi. Pembeli aman, kamu pasti dibayar.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-3">Spesifikasi</h2>
          <dl className="divide-y divide-[var(--color-m-ink-100)]">
            {specRows.map(([k, v]) => (
              <div key={k} className="flex justify-between py-2.5 text-[13px]">
                <dt className="text-[var(--color-m-ink-500)]">{k}</dt>
                <dd className="text-[var(--color-m-ink-900)] font-semibold text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {listing.description && (
          <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
            <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-3">Deskripsi</h2>
            <p className="text-[14px] text-[var(--color-m-ink-700)] leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </section>
        )}

        <section className="px-5 py-5 mt-3">
          <p className="text-[12px] font-bold uppercase tracking-wider text-[var(--color-m-ink-400)] mb-2">
            Mau ganti?
          </p>
          <div className="bg-[var(--color-m-paper)] rounded-2xl m-shadow-xs divide-y divide-[var(--color-m-ink-100)]">
            {[
              { label: "Edit kategori & foto", href: "/marketplace/sell" },
              { label: "Edit spesifikasi", href: `/marketplace/sell/spesifikasi?id=${id}` },
              { label: "Edit harga & lokasi", href: `/marketplace/sell/harga?id=${id}` },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex items-center justify-between px-4 py-3 text-[13px] font-semibold text-[var(--color-m-ink-800)]"
              >
                {s.label}
                <IconChevronRight size={16} className="text-[var(--color-m-ink-400)]" />
              </Link>
            ))}
          </div>
        </section>

        {!user.phoneVerifiedAt && (
          <section className="mx-5 mt-4 p-3.5 rounded-xl bg-[var(--color-m-amber-100)]/60 border border-[var(--color-m-amber-100)]">
            <p className="text-[12px] text-[var(--color-m-ink-700)] leading-relaxed flex gap-2">
              <IconHourglass size={15} className="flex-shrink-0 mt-0.5 text-[var(--color-m-amber-500)]" />
              <span><b>HP belum diverifikasi.</b> Listing tidak bisa di-publish dulu — tunggu admin verifikasi HP via WhatsApp (1×24 jam). Draft tetap tersimpan, bisa di-publish nanti.</span>
            </p>
          </section>
        )}

        {photos.length < 3 && (
          <section className="mx-5 mt-4 p-3.5 rounded-xl bg-[var(--color-m-amber-100)]/60 border border-[var(--color-m-amber-100)]">
            <p className="text-[12px] text-[var(--color-m-ink-700)] leading-relaxed flex gap-2">
              <IconCamera size={16} className="flex-shrink-0 mt-0.5 text-[var(--color-m-amber-500)]" />
              <span><b>Minimal 3 foto untuk publish.</b> Sekarang baru {photos.length} foto — balik ke step 1 untuk tambah.</span>
            </p>
          </section>
        )}
      </main>

      <PublishButton listingId={listing.id} />
    </>
  );
}
