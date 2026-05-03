import { notFound } from "next/navigation";
import { PageTopBar } from "../../../_components/TopBar";
import { IconCheck, IconStar } from "../../../_components/icons";
import { getListing, getOrder, getSeller } from "@/lib/mock/data";
import { formatRupiah } from "@/lib/format";
import { ButtonLink, Field, Textarea } from "@/components/ui";

const TAGS = [
  "Packing rapi",
  "Sesuai deskripsi",
  "Penjual fast response",
  "Pengiriman cepat",
  "Bonus lengkap",
  "Harga oke",
];

export default async function ReviewSellerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = getOrder(id);
  if (!order) notFound();
  const item = getListing(order.listingId);
  const seller = getSeller(order.sellerId);

  return (
    <>
      <PageTopBar title="Beri Review" backHref={`/marketplace/orders/${order.id}`} />

      <main className="flex-1 pb-32 bg-[var(--color-m-cream)]">
        {/* Item */}
        <section className="bg-[var(--color-m-paper)] px-5 py-4 border-b border-[var(--color-m-ink-100)]">
          <div className="flex gap-3">
            <div
              className="w-14 h-14 rounded-xl flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#FFE5D6,#E0F7F8)" }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold text-[var(--color-m-ink-900)] line-clamp-2 leading-snug">
                {item?.title}
              </div>
              <div className="text-[12px] text-[var(--color-m-ink-500)] mt-0.5 m-tnum">{formatRupiah(order.itemPrice)}</div>
            </div>
          </div>
        </section>

        {/* Seller */}
        {seller && (
          <section className="bg-[var(--color-m-paper)] px-5 py-4 mt-3 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-m-orange-400)] to-[var(--color-m-orange-600)] flex items-center justify-center text-white font-bold flex-shrink-0">
              {seller.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-m-ink-400)]">
                Penjual
              </div>
              <div className="text-[14px] font-bold text-[var(--color-m-ink-900)]">{seller.name}</div>
            </div>
          </section>
        )}

        {/* Rating */}
        <section className="bg-[var(--color-m-paper)] px-5 py-6 mt-3 text-center">
          <h2 className="text-[16px] font-extrabold text-[var(--color-m-ink-900)] mb-1">
            Bagaimana pengalamanmu?
          </h2>
          <p className="text-[12px] text-[var(--color-m-ink-500)] mb-5 leading-relaxed">
            Reviewmu bantu pembeli lain dan tingkatkan kepercayaan komunitas.
          </p>

          <div className="flex justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => {
              const active = star <= 5;
              return (
                <button
                  key={star}
                  className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all ${
                    active ? "bg-[var(--color-m-amber-100)] text-[var(--color-m-amber-500)]" : "bg-[var(--color-m-ink-50)] text-[var(--color-m-ink-200)]"
                  }`}
                >
                  <IconStar size={28} />
                </button>
              );
            })}
          </div>
          <div className="text-[14px] font-extrabold text-[var(--color-m-amber-500)] mt-2">Sempurna! 🎉</div>
        </section>

        {/* Tags */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h3 className="text-[13px] font-bold text-[var(--color-m-ink-900)] mb-3">
            Apa yang membuat transaksimu memuaskan?
          </h3>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag, i) => {
              const selected = i < 3;
              return (
                <button
                  key={tag}
                  className={`px-3.5 py-2 rounded-full text-[12px] font-semibold border-[1.5px] transition-all ${
                    selected
                      ? "bg-[var(--color-m-orange-500)] text-white border-[var(--color-m-orange-500)]"
                      : "bg-white text-[var(--color-m-ink-700)] border-[var(--color-m-ink-100)]"
                  }`}
                >
                  {selected && "✓ "}
                  {tag}
                </button>
              );
            })}
          </div>
        </section>

        {/* Comment */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <Field
            label="Tulis review (opsional)"
            hint="Min 20 karakter — review yang detail sangat membantu pembeli berikutnya."
          >
            <Textarea
              rows={4}
              placeholder="Misal: Sepeda persis seperti foto, packing rapi banget pake double bubble wrap. Penjual juga responsif waktu nego. Recommended!"
              defaultValue="Sepeda persis seperti foto, packing rapi banget. Penjual fast response dan mau diskusi panjang sebelum deal. Recommended seller!"
            />
          </Field>
        </section>

        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="mt-0.5 w-4 h-4 accent-[var(--color-m-orange-500)] flex-shrink-0"
            />
            <span className="text-[13px] text-[var(--color-m-ink-800)] leading-snug">
              Tampilkan nama saya di review publik
            </span>
          </label>
        </section>

        <section className="px-5 py-4">
          <p className="text-[11px] text-[var(--color-m-ink-500)] text-center leading-relaxed">
            Kamu bisa skip review, tapi rating bantu komunitas tahu siapa penjual terpercaya.
          </p>
        </section>
      </main>

      <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg flex gap-2">
        <ButtonLink href="/marketplace/orders?tab=buyer" variant="ghost" size="lg" className="px-5">
          Skip
        </ButtonLink>
        <ButtonLink
          href="/marketplace/orders?tab=buyer"
          full
          size="lg"
          leading={<IconCheck size={18} />}
        >
          Kirim Review
        </ButtonLink>
      </div>
    </>
  );
}
