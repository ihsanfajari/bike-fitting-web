import { LISTINGS } from "@/lib/mock/api";
import { getListing } from "@/lib/mock/data";
import { formatRupiah } from "@/lib/format";
import { ButtonLink } from "@/components/ui";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ listing?: string }>;
}) {
  const { listing: listingId } = await searchParams;
  const listing = getListing(listingId ?? "") ?? LISTINGS[0];
  const adminFee = Math.max(5000, Math.round(listing.price * 0.01));
  const shipping = 150_000;
  const total = listing.price + adminFee + shipping;

  return (
    <main className="flex-1 flex flex-col bg-[var(--color-m-cream)]">
      {/* Hero success */}
      <section
        className="px-5 pt-12 pb-8 text-center"
        style={{ background: "linear-gradient(180deg,#E3F5EC 0%,#FFF8F0 100%)" }}
      >
        <div className="w-20 h-20 rounded-full bg-[var(--color-m-green-500)] mx-auto flex items-center justify-center text-white m-shadow-md">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="mt-5 text-[24px] font-extrabold text-[var(--color-m-ink-900)] tracking-tight leading-tight">
          Pembayaran berhasil!
        </h1>
        <p className="mt-2 text-[13px] text-[var(--color-m-ink-600)] leading-relaxed max-w-[320px] mx-auto">
          Dana sudah ditahan rekber. Penjual akan segera mengirim barangmu.
        </p>
      </section>

      {/* Summary card */}
      <section className="px-5 -mt-4 z-10">
        <div className="bg-[var(--color-m-paper)] rounded-3xl p-5 m-shadow-md">
          <div className="text-[10px] uppercase tracking-wider font-bold text-[var(--color-m-ink-400)]">
            Nomor Pesanan
          </div>
          <div className="text-[14px] font-bold text-[var(--color-m-ink-900)] m-tnum mt-1">
            ORD-20260503-0042
          </div>

          <div className="mt-4 pt-4 border-t border-dashed border-[var(--color-m-ink-100)] flex gap-3">
            <div
              className="w-14 h-14 rounded-xl flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#FFE5D6,#E0F7F8)" }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold text-[var(--color-m-ink-900)] line-clamp-2 leading-snug">
                {listing.title}
              </div>
              <div className="text-[15px] font-extrabold text-[var(--color-m-orange-600)] m-tnum mt-1">
                {formatRupiah(total)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next steps */}
      <section className="px-5 mt-5">
        <h2 className="text-[14px] font-extrabold text-[var(--color-m-ink-900)] mb-3">Apa selanjutnya?</h2>
        <div className="space-y-2">
          {[
            { num: 1, title: "Penjual mengirim barang", desc: "Dalam 2 × 24 jam. Kamu akan dapat resi pengiriman.", active: true },
            { num: 2, title: "Lacak paket sampai diterima", desc: "Status pengiriman update otomatis di halaman pesanan." },
            { num: 3, title: "Konfirmasi barang OK", desc: "Setelah barang sampai dan kondisinya sesuai, klik Sudah Diterima — dana cair ke penjual." },
          ].map((s) => (
            <div
              key={s.num}
              className={`flex gap-3 p-3.5 rounded-2xl ${s.active ? "bg-[var(--color-m-orange-100)]/60 border border-[var(--color-m-orange-100)]" : "bg-[var(--color-m-paper)] m-shadow-xs"}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-extrabold flex-shrink-0 ${s.active ? "bg-[var(--color-m-orange-500)] text-white" : "bg-[var(--color-m-ink-100)] text-[var(--color-m-ink-500)]"}`}>
                {s.num}
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-bold text-[var(--color-m-ink-900)]">{s.title}</div>
                <div className="text-[12px] text-[var(--color-m-ink-600)] mt-0.5 leading-relaxed">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex-1" />

      <section className="px-5 py-6 space-y-2">
        <ButtonLink href="/marketplace/orders/o1" full size="lg">
          Lihat Detail Pesanan
        </ButtonLink>
        <ButtonLink href="/marketplace" full size="lg" variant="ghost">
          Kembali ke Beranda
        </ButtonLink>
      </section>
    </main>
  );
}
