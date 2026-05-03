import Link from "next/link";
import { notFound } from "next/navigation";
import { PageTopBar } from "../../../_components/TopBar";
import { IconCheck, IconShield } from "../../../_components/icons";
import { getListing, getOrder } from "@/lib/mock/data";
import { formatRupiah } from "@/lib/format";
import { ButtonLink, Field, Textarea } from "@/components/ui";

export default async function ConfirmReceivedPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = getOrder(id);
  if (!order) notFound();
  const item = getListing(order.listingId);

  return (
    <>
      <PageTopBar title="Konfirmasi Barang Diterima" backHref={`/marketplace/orders/${order.id}`} />

      <main className="flex-1 pb-32 bg-[var(--color-m-cream)]">
        <section className="bg-[var(--color-m-paper)] px-5 py-5 border-b border-[var(--color-m-ink-100)]">
          <div className="flex gap-3">
            <div
              className="w-16 h-16 rounded-xl flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#FFE5D6,#E0F7F8)" }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold text-[var(--color-m-ink-900)] line-clamp-2 leading-snug">
                {item?.title}
              </div>
              <div className="text-[14px] font-extrabold text-[var(--color-m-ink-900)] m-tnum mt-1">
                {formatRupiah(order.itemPrice)}
              </div>
              <div className="text-[11px] text-[var(--color-m-ink-500)] mt-0.5 font-mono">{order.orderNumber}</div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[16px] font-extrabold text-[var(--color-m-ink-900)] mb-1">
            Pastikan barang sudah dicek
          </h2>
          <p className="text-[12px] text-[var(--color-m-ink-500)] mb-4 leading-relaxed">
            Setelah kamu klik "Konfirmasi Diterima", dana <b className="text-[var(--color-m-ink-900)]">{formatRupiah(order.itemPrice)}</b> akan langsung cair ke penjual dan transaksi tidak bisa dibatalkan.
          </p>

          <div className="space-y-2.5">
            {[
              "Sepeda sesuai dengan deskripsi & foto listing",
              "Tidak ada kerusakan signifikan saat unboxing",
              "Kelengkapan (groupset, accessory) sesuai",
              "Frame, fork, dan komponen utama tidak rusak",
            ].map((point) => (
              <label key={point} className="flex items-start gap-3 p-3 rounded-xl border border-[var(--color-m-ink-100)] bg-white cursor-pointer hover:border-[var(--color-m-orange-300)]">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-0.5 w-4 h-4 accent-[var(--color-m-orange-500)] flex-shrink-0"
                />
                <span className="text-[13px] text-[var(--color-m-ink-800)] leading-snug">{point}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <Field label="Catatan untuk penjual (opsional)" hint="Misalnya ucapan terima kasih atau feedback singkat.">
            <Textarea rows={3} placeholder="Mantap kak, packing rapi banget. Sepeda kondisinya sesuai foto." />
          </Field>
        </section>

        <section className="px-5 py-4">
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[var(--color-m-amber-100)]/60 border border-[var(--color-m-amber-100)]">
            <span className="text-[20px] leading-none">⚠️</span>
            <div className="text-[12px] text-[var(--color-m-ink-700)] leading-relaxed">
              <b>Ada masalah dengan barang?</b> Jangan klik konfirmasi. Buka{" "}
              <Link href={`/marketplace/orders/${order.id}/dispute`} className="font-bold text-[var(--color-m-orange-600)] underline">
                ajukan dispute
              </Link>{" "}
              dalam 3 hari setelah barang sampai supaya dana tetap ditahan.
            </div>
          </div>
        </section>

        <section className="px-5 pb-4">
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[var(--color-m-green-100)]/60">
            <IconShield size={20} className="text-[var(--color-m-green-500)] flex-shrink-0 mt-0.5" />
            <p className="text-[12px] text-[var(--color-m-ink-700)] leading-relaxed">
              Setelah konfirmasi, kamu akan diminta memberi review supaya komunitas tetap aman dari penjual nakal.
            </p>
          </div>
        </section>
      </main>

      <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg flex gap-2">
        <Link
          href={`/marketplace/orders/${order.id}/dispute`}
          className="px-5 h-12 rounded-xl border border-[var(--color-m-ink-200)] flex items-center justify-center text-[13px] font-bold text-[var(--color-m-ink-700)]"
        >
          Ada Masalah
        </Link>
        <ButtonLink
          href={`/marketplace/orders/${order.id}/review`}
          full
          size="lg"
          variant="success"
          leading={<IconCheck size={18} />}
        >
          Konfirmasi Diterima
        </ButtonLink>
      </div>
    </>
  );
}
