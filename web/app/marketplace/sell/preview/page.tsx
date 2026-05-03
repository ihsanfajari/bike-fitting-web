import Link from "next/link";
import { PageTopBar } from "../../_components/TopBar";
import { Badge, Button, ButtonLink } from "@/components/ui";
import { IconCheck, IconChevronRight, IconMapPin, IconShield } from "../../_components/icons";
import { formatRupiah } from "@/lib/format";

export default function SellPreviewPage() {
  const draft = {
    title: "Trek Domane SL5 2022 Full Shimano 105",
    price: 22_000_000,
    condition: "Bekas Mulus",
    city: "Jakarta Selatan",
    brand: "Trek",
    model: "Domane SL5",
    year: 2022,
    frameSize: "54",
    frameMaterial: "Carbon",
    groupset: "Shimano 105 R7000",
    description:
      "Dijual Trek Domane SL5 tahun 2022. Kondisi mulus, jarang digunakan hanya weekend ride. Full Shimano 105 R7000 groupset.",
  };

  return (
    <>
      <PageTopBar title="Preview Listing" backHref="/marketplace/sell/harga" />

      <main className="flex-1 pb-32 bg-[var(--color-m-cream)]">
        <div className="bg-[var(--color-m-amber-100)]/50 border-b border-[var(--color-m-amber-100)] px-5 py-3 text-center text-[12px] font-semibold text-[var(--color-m-ink-700)]">
          ✨ Preview — beginilah pembeli akan melihat listingmu
        </div>

        {/* Hero photo */}
        <div
          className="aspect-square w-full flex items-center justify-center text-[var(--color-m-ink-400)] italic"
          style={{ background: "linear-gradient(135deg,#FFE5D6,#FFF0E6 50%,#E0F7F8)" }}
        >
          <span className="text-[13px]">[ foto utama ]</span>
        </div>

        {/* Title + price */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 border-b border-[var(--color-m-ink-100)]">
          <div className="flex items-start gap-2 mb-2">
            <Badge tone="orange">{draft.condition}</Badge>
            <Badge tone="teal">Bisa Nego</Badge>
            <Badge tone="green">COD</Badge>
          </div>
          <h1 className="text-[20px] font-extrabold text-[var(--color-m-ink-900)] leading-tight tracking-tight">
            {draft.title}
          </h1>
          <div className="mt-3 text-[28px] font-extrabold text-[var(--color-m-ink-900)] m-tnum tracking-tight">
            {formatRupiah(draft.price)}
          </div>
          <div className="mt-2 text-[12px] text-[var(--color-m-ink-400)] inline-flex items-center gap-1">
            <IconMapPin size={13} /> {draft.city}
          </div>
        </section>

        {/* Rekber callout */}
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

        {/* Specs */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-3">Spesifikasi</h2>
          <dl className="divide-y divide-[var(--color-m-ink-100)]">
            {[
              ["Brand", draft.brand],
              ["Model", draft.model],
              ["Tahun", String(draft.year)],
              ["Ukuran Frame", draft.frameSize],
              ["Material", draft.frameMaterial],
              ["Groupset", draft.groupset],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2.5 text-[13px]">
                <dt className="text-[var(--color-m-ink-500)]">{k}</dt>
                <dd className="text-[var(--color-m-ink-900)] font-semibold text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Description */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-3">Deskripsi</h2>
          <p className="text-[14px] text-[var(--color-m-ink-700)] leading-relaxed whitespace-pre-line">
            {draft.description}
          </p>
        </section>

        {/* Section: edit shortcuts */}
        <section className="px-5 py-5 mt-3">
          <p className="text-[12px] font-bold uppercase tracking-wider text-[var(--color-m-ink-400)] mb-2">
            Mau ganti?
          </p>
          <div className="bg-[var(--color-m-paper)] rounded-2xl m-shadow-xs divide-y divide-[var(--color-m-ink-100)]">
            {[
              { label: "Edit kategori & foto", href: "/marketplace/sell" },
              { label: "Edit spesifikasi", href: "/marketplace/sell/spesifikasi" },
              { label: "Edit harga & lokasi", href: "/marketplace/sell/harga" },
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
      </main>

      <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg flex gap-2">
        <Button variant="ghost" size="lg" className="px-5">
          Simpan Draft
        </Button>
        <ButtonLink href="/marketplace/me/listings?published=1" full size="lg" leading={<IconCheck size={18} />}>
          Publikasikan
        </ButtonLink>
      </div>
    </>
  );
}
