import { PageTopBar } from "../../_components/TopBar";
import { IconShield } from "../../_components/icons";
import { LISTINGS } from "@/lib/mock/api";
import { getListing } from "@/lib/mock/data";
import { formatRupiah } from "@/lib/format";
import { Button, ButtonLink } from "@/components/ui";

export default async function PaymentInstructionsPage({
  searchParams,
}: {
  searchParams: Promise<{ listing?: string }>;
}) {
  const { listing: listingId } = await searchParams;
  const listing = getListing(listingId ?? "") ?? LISTINGS[0];
  const adminFee = Math.max(5000, Math.round(listing.price * 0.01));
  const shipping = 150_000;
  const total = listing.price + adminFee + shipping;
  const va = "8821 0942 7361 8500";
  const expiry = "23:59 — 4 Mei 2026";

  return (
    <>
      <PageTopBar title="Instruksi Pembayaran" backHref="/marketplace/orders?tab=buyer" />

      <main className="flex-1 pb-6 bg-[var(--color-m-cream)]">
        {/* Countdown */}
        <section className="bg-[var(--color-m-amber-100)] px-5 py-4 border-b border-[var(--color-m-amber-100)] flex items-center gap-3">
          <span className="text-[24px]">⏰</span>
          <div>
            <div className="text-[13px] font-bold text-[var(--color-m-ink-900)]">Bayar sebelum {expiry}</div>
            <div className="text-[11px] text-[var(--color-m-ink-600)] mt-0.5">
              Pesanan otomatis dibatalkan jika lewat waktu.
            </div>
          </div>
        </section>

        {/* VA card */}
        <section className="px-5 py-5">
          <div className="bg-[var(--color-m-paper)] rounded-3xl p-5 m-shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0058A8] flex items-center justify-center text-white font-extrabold text-[12px]">
                BCA
              </div>
              <div>
                <div className="text-[13px] font-bold text-[var(--color-m-ink-900)]">BCA Virtual Account</div>
                <div className="text-[11px] text-[var(--color-m-ink-500)]">a.n. GowesFit Indonesia</div>
              </div>
            </div>

            <div className="text-[10px] uppercase tracking-wider font-bold text-[var(--color-m-ink-400)] mb-1.5">
              Nomor Virtual Account
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-[22px] font-extrabold text-[var(--color-m-ink-900)] m-tnum tracking-tight flex-1">
                {va}
              </div>
              <Button variant="outline" size="sm">
                Salin
              </Button>
            </div>

            <div className="border-t border-dashed border-[var(--color-m-ink-100)] pt-4 flex items-baseline justify-between">
              <span className="text-[12px] text-[var(--color-m-ink-500)]">Jumlah Bayar</span>
              <span className="text-[20px] font-extrabold text-[var(--color-m-orange-600)] m-tnum tracking-tight">
                {formatRupiah(total)}
              </span>
            </div>
          </div>
        </section>

        {/* How to pay */}
        <section className="px-5 pb-5">
          <h2 className="text-[14px] font-extrabold text-[var(--color-m-ink-900)] mb-3">Cara Bayar</h2>
          <div className="bg-[var(--color-m-paper)] rounded-2xl p-4 m-shadow-xs">
            <details className="group" open>
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="text-[13px] font-bold text-[var(--color-m-ink-900)]">Lewat m-BCA</span>
                <span className="text-[var(--color-m-ink-400)] group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <ol className="mt-3 space-y-2 text-[13px] text-[var(--color-m-ink-700)] leading-relaxed list-decimal list-inside">
                <li>Buka aplikasi m-BCA, login dengan PIN</li>
                <li>Pilih <b>m-Transfer</b> → <b>BCA Virtual Account</b></li>
                <li>Masukkan nomor VA: <span className="m-tnum font-bold">{va.replace(/\s/g, "")}</span></li>
                <li>Cek nominal & nama, pastikan benar</li>
                <li>Konfirmasi dengan PIN m-BCA</li>
              </ol>
            </details>
            <details className="group mt-3 pt-3 border-t border-[var(--color-m-ink-100)]">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="text-[13px] font-bold text-[var(--color-m-ink-900)]">Lewat ATM BCA</span>
                <span className="text-[var(--color-m-ink-400)] group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <ol className="mt-3 space-y-2 text-[13px] text-[var(--color-m-ink-700)] leading-relaxed list-decimal list-inside">
                <li>Masukkan kartu, pilih bahasa & masukkan PIN</li>
                <li>Pilih <b>Transaksi Lainnya</b> → <b>Transfer</b> → <b>Ke Rek BCA Virtual Account</b></li>
                <li>Masukkan nomor VA dan ikuti instruksi berikutnya</li>
              </ol>
            </details>
            <details className="group mt-3 pt-3 border-t border-[var(--color-m-ink-100)]">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="text-[13px] font-bold text-[var(--color-m-ink-900)]">Lewat Bank Lain</span>
                <span className="text-[var(--color-m-ink-400)] group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <p className="mt-3 text-[13px] text-[var(--color-m-ink-700)] leading-relaxed">
                Pilih transfer ke BCA, lalu masukkan nomor VA di atas. Bisa kena biaya transfer antarbank dari bank pengirim.
              </p>
            </details>
          </div>
        </section>

        {/* Trust */}
        <section className="px-5 pb-6">
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[var(--color-m-green-100)]/60">
            <IconShield size={20} className="text-[var(--color-m-green-500)] flex-shrink-0 mt-0.5" />
            <p className="text-[12px] text-[var(--color-m-ink-700)] leading-relaxed">
              Setelah bayar, status otomatis berubah menjadi <b>Dibayar</b>. Penjual akan mendapat notifikasi untuk segera mengirim barang.
            </p>
          </div>
        </section>

        <section className="px-5 pb-6">
          <ButtonLink href={`/marketplace/checkout/success?listing=${listing.id}`} full size="lg">
            Saya Sudah Bayar
          </ButtonLink>
          <p className="text-center text-[11px] text-[var(--color-m-ink-400)] mt-2">
            Verifikasi otomatis 1–5 menit setelah pembayaran
          </p>
        </section>
      </main>
    </>
  );
}
