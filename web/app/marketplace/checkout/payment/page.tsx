import Link from "next/link";
import { PageTopBar } from "../../_components/TopBar";
import { IconCheck, IconShield } from "../../_components/icons";
import { LISTINGS } from "@/lib/mock/api";
import { getListing } from "@/lib/mock/data";
import { formatRupiah } from "@/lib/format";
import { ButtonLink } from "@/components/ui";

const STEPS = ["Alamat", "Pengiriman", "Bayar"];

const PAYMENT_GROUPS = [
  {
    label: "Virtual Account",
    methods: [
      { id: "bca-va", name: "BCA Virtual Account", desc: "Verifikasi otomatis" },
      { id: "mandiri-va", name: "Mandiri Virtual Account", desc: "Verifikasi otomatis" },
      { id: "bni-va", name: "BNI Virtual Account", desc: "Verifikasi otomatis" },
      { id: "bri-va", name: "BRI Virtual Account", desc: "Verifikasi otomatis" },
    ],
  },
  {
    label: "E-wallet & QRIS",
    methods: [
      { id: "qris", name: "QRIS", desc: "Bayar pakai aplikasi apa saja" },
      { id: "gopay", name: "GoPay", desc: "Saldo & PayLater" },
      { id: "shopeepay", name: "ShopeePay", desc: "Saldo & SPayLater" },
      { id: "ovo", name: "OVO", desc: "Saldo & OVO PayLater" },
    ],
  },
  {
    label: "Lainnya",
    methods: [
      { id: "alfamart", name: "Alfamart / Indomaret", desc: "Bayar di kasir, +Rp 2.500" },
    ],
  },
];

export default async function PaymentMethodPage({
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
    <>
      <PageTopBar title="Checkout" backHref={`/marketplace/checkout?listing=${listing.id}`} />

      <main className="flex-1 pb-32 bg-[var(--color-m-cream)]">
        {/* Step indicator */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 border-b border-[var(--color-m-ink-100)]">
          <div className="flex items-center">
            {STEPS.map((label, i) => {
              const done = i < 2;
              const active = i === 2;
              return (
                <div key={label} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold ${
                        done
                          ? "bg-[var(--color-m-green-500)] text-white"
                          : active
                          ? "bg-[var(--color-m-orange-500)] text-white ring-4 ring-[var(--color-m-orange-100)]"
                          : "bg-[var(--color-m-ink-100)] text-[var(--color-m-ink-400)]"
                      }`}
                    >
                      {done ? <IconCheck size={14} /> : i + 1}
                    </div>
                    <span
                      className={`text-[11px] ${
                        active || done ? "font-bold text-[var(--color-m-ink-900)]" : "text-[var(--color-m-ink-400)] font-medium"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 mb-5 rounded-full ${done ? "bg-[var(--color-m-green-500)]" : "bg-[var(--color-m-ink-100)]"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Item summary */}
        <section className="bg-[var(--color-m-paper)] px-5 py-4 mt-3">
          <div className="flex gap-3">
            <div
              className="w-14 h-14 rounded-xl flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#FFE5D6,#E0F7F8)" }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-bold text-[var(--color-m-ink-900)] line-clamp-2 leading-snug">
                {listing.title}
              </div>
              <div className="text-[14px] font-extrabold text-[var(--color-m-ink-900)] m-tnum mt-0.5">
                {formatRupiah(total)}
              </div>
            </div>
          </div>
        </section>

        {/* Payment methods */}
        <section className="px-5 py-5 mt-3 space-y-5">
          {PAYMENT_GROUPS.map((group, gi) => (
            <div key={group.label}>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-m-ink-400)] mb-2 px-1">
                {group.label}
              </h3>
              <div className="bg-[var(--color-m-paper)] rounded-2xl m-shadow-xs divide-y divide-[var(--color-m-ink-100)]">
                {group.methods.map((m, mi) => {
                  const selected = gi === 0 && mi === 0;
                  return (
                    <label
                      key={m.id}
                      className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer ${selected ? "bg-[var(--color-m-orange-100)]/40" : ""}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        defaultChecked={selected}
                        className="w-4 h-4 accent-[var(--color-m-orange-500)]"
                      />
                      <div className="w-10 h-10 rounded-lg bg-[var(--color-m-ink-50)] flex items-center justify-center text-[10px] font-bold text-[var(--color-m-ink-600)]">
                        {m.name.split(" ")[0].slice(0, 4).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-bold text-[var(--color-m-ink-900)]">{m.name}</div>
                        <div className="text-[11px] text-[var(--color-m-ink-500)] mt-0.5">{m.desc}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        <section className="px-5 py-4">
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[var(--color-m-green-100)]/60">
            <IconShield size={20} className="text-[var(--color-m-green-500)] flex-shrink-0 mt-0.5" />
            <p className="text-[12px] text-[var(--color-m-ink-700)] leading-relaxed">
              Pembayaran diproses oleh Midtrans. Dana ditahan GowesFit sampai kamu konfirmasi barang diterima.
            </p>
          </div>
        </section>
      </main>

      <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] text-[var(--color-m-ink-500)]">Total Bayar</span>
          <span className="text-[18px] font-extrabold text-[var(--color-m-ink-900)] m-tnum">{formatRupiah(total)}</span>
        </div>
        <ButtonLink href={`/marketplace/checkout/instructions?listing=${listing.id}`} full size="lg">
          Bayar Sekarang
        </ButtonLink>
      </div>
    </>
  );
}
