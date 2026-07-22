import Link from "next/link";
import { LISTINGS } from "@/lib/mock/api";
import { getListing } from "@/lib/mock/data";
import { PageTopBar } from "../_components/TopBar";
import { IconCheck, IconChevronRight, IconShield, IconTruck, IconArrowRight } from "../_components/icons";
import { formatRupiah } from "@/lib/format";

const STEPS = ["Alamat", "Pengiriman", "Bayar"];

export default async function MCheckoutPage({
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
      <PageTopBar title="Checkout" backHref={`/marketplace/listing/${listing.slug}`} />

      <main className="flex-1 pb-32">
        {/* Step indicator */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 border-b border-[var(--color-m-ink-100)]">
          <div className="flex items-center">
            {STEPS.map((label, i) => {
              const active = i === 0;
              const done = false;
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
                    <div className="flex-1 h-0.5 mx-2 mb-5 bg-[var(--color-m-ink-100)] rounded-full" />
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
              className="w-16 h-16 rounded-xl flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#FFE5D6,#E0F7F8)" }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold text-[var(--color-m-ink-900)] line-clamp-2 leading-snug">
                {listing.title}
              </div>
              <div className="text-[11px] text-[var(--color-m-ink-500)] mt-1">{listing.city}</div>
              <div className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] m-tnum mt-1">
                {formatRupiah(listing.price)}
              </div>
            </div>
          </div>
        </section>

        {/* Address form */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-1">Alamat Pengiriman</h2>
          <p className="text-[12px] text-[var(--color-m-ink-500)] mb-4">
            Pastikan alamat lengkap supaya barang sampai dengan selamat.
          </p>

          <div className="space-y-4">
            <Field label="Nama Penerima" required>
              <input
                type="text"
                defaultValue="Ihsan Fajari"
                className="m-inp w-full px-3.5 py-3 rounded-xl border-[1.5px] border-[var(--color-m-ink-100)] bg-white text-[14px] text-[var(--color-m-ink-900)] focus:outline-none focus:border-[var(--color-m-orange-500)] focus:ring-4 focus:ring-[var(--color-m-orange-100)]"
              />
            </Field>

            <Field label="Nomor HP" required hint="Untuk dihubungi kurir saat pengiriman">
              <input
                type="tel"
                defaultValue="+62 812 3456 7890"
                className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-[var(--color-m-ink-100)] bg-white text-[14px] text-[var(--color-m-ink-900)] focus:outline-none focus:border-[var(--color-m-orange-500)] focus:ring-4 focus:ring-[var(--color-m-orange-100)]"
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Provinsi" required>
                <SelectStyled defaultValue="DKI Jakarta">
                  <option>DKI Jakarta</option>
                  <option>Jawa Barat</option>
                  <option>Jawa Tengah</option>
                  <option>Jawa Timur</option>
                </SelectStyled>
              </Field>
              <Field label="Kota" required>
                <SelectStyled defaultValue="Jakarta Selatan">
                  <option>Jakarta Selatan</option>
                  <option>Jakarta Pusat</option>
                  <option>Jakarta Barat</option>
                </SelectStyled>
              </Field>
            </div>

            <Field label="Kode Pos" required>
              <input
                type="text"
                defaultValue="12730"
                className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-[var(--color-m-ink-100)] bg-white text-[14px] text-[var(--color-m-ink-900)] m-tnum focus:outline-none focus:border-[var(--color-m-orange-500)] focus:ring-4 focus:ring-[var(--color-m-orange-100)]"
              />
            </Field>

            <Field label="Alamat Lengkap" required hint="Nama jalan, nomor rumah, RT/RW, patokan">
              <textarea
                rows={3}
                defaultValue="Jl. Kemang Raya No. 42, RT 5 RW 3"
                className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-[var(--color-m-ink-100)] bg-white text-[14px] text-[var(--color-m-ink-900)] resize-none focus:outline-none focus:border-[var(--color-m-orange-500)] focus:ring-4 focus:ring-[var(--color-m-orange-100)]"
              />
            </Field>

            <Field label="Catatan untuk Kurir (opsional)">
              <input
                type="text"
                placeholder="Misal: Titip ke security komplek"
                className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-[var(--color-m-ink-100)] bg-white text-[14px] text-[var(--color-m-ink-900)] placeholder:text-[var(--color-m-ink-400)] focus:outline-none focus:border-[var(--color-m-orange-500)] focus:ring-4 focus:ring-[var(--color-m-orange-100)]"
              />
            </Field>
          </div>
        </section>

        {/* Shipping option (preview) */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-3">Ekspedisi</h2>
          <button className="w-full flex items-center gap-3 p-3.5 rounded-xl border-2 border-[var(--color-m-orange-500)] bg-[var(--color-m-orange-100)]/40 text-left">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[var(--color-m-orange-600)]">
              <IconTruck size={20} />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-bold text-[var(--color-m-ink-900)]">JNE YES — 1 hari</div>
              <div className="text-[11px] text-[var(--color-m-ink-500)] mt-0.5">Asuransi termasuk · {formatRupiah(shipping)}</div>
            </div>
            <IconCheck size={20} className="text-[var(--color-m-orange-500)]" />
          </button>
          <button className="w-full mt-2 flex items-center gap-2 p-3.5 rounded-xl border border-[var(--color-m-ink-100)] text-[13px] text-[var(--color-m-ink-600)]">
            <span className="flex-1 text-left">Lihat opsi lain (3)</span>
            <IconChevronRight size={16} />
          </button>
        </section>

        {/* Cost breakdown */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-3">Rincian Biaya</h2>
          <dl className="space-y-2.5 text-[13px]">
            <Row label="Harga sepeda" value={formatRupiah(listing.price)} />
            <Row label="Ongkir (JNE YES)" value={formatRupiah(shipping)} />
            <Row label="Biaya Rekber 1%" value={formatRupiah(adminFee)} hint="Proteksi dana sampai barang diterima" />
          </dl>
          <div className="mt-3 pt-3 border-t border-dashed border-[var(--color-m-ink-100)] flex items-baseline justify-between">
            <span className="text-[14px] font-bold text-[var(--color-m-ink-900)]">Total Bayar</span>
            <span className="text-[20px] font-extrabold text-[var(--color-m-orange-600)] m-tnum tracking-tight">
              {formatRupiah(total)}
            </span>
          </div>
        </section>

        {/* Trust signal */}
        <section className="px-5 py-4">
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[var(--color-m-green-100)]/60">
            <IconShield size={20} className="text-[var(--color-m-green-500)] flex-shrink-0 mt-0.5" />
            <p className="text-[12px] text-[var(--color-m-ink-700)] leading-relaxed">
              Dananya ditahan GowesFit dulu. Setelah kamu klik <b>"Sudah Diterima"</b> dan barangnya OK, baru dana cair ke penjual.
            </p>
          </div>
        </section>
      </main>

      {/* Sticky bottom CTA */}
      <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] text-[var(--color-m-ink-500)]">Total</span>
          <span className="text-[18px] font-extrabold text-[var(--color-m-ink-900)] m-tnum">{formatRupiah(total)}</span>
        </div>
        <Link
          href={`/marketplace/checkout/payment?listing=${listing.id}`}
          className="w-full h-12 rounded-xl bg-[var(--color-m-orange-500)] text-white font-extrabold text-[14px] flex items-center justify-center gap-2 m-shadow-cta hover:bg-[var(--color-m-orange-600)]"
        >
          Lanjut ke Pembayaran <IconArrowRight size={16} />
        </Link>
      </div>
    </>
  );
}

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-[var(--color-m-ink-800)] mb-1.5">
        {label}
        {required && <span className="text-[var(--color-m-orange-500)] ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-[var(--color-m-ink-400)] mt-1.5">{hint}</p>}
    </div>
  );
}

function SelectStyled({ defaultValue, children }: { defaultValue: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      <select
        defaultValue={defaultValue}
        className="w-full appearance-none px-3.5 py-3 pr-9 rounded-xl border-[1.5px] border-[var(--color-m-ink-100)] bg-white text-[14px] text-[var(--color-m-ink-900)] focus:outline-none focus:border-[var(--color-m-orange-500)] focus:ring-4 focus:ring-[var(--color-m-orange-100)]"
      >
        {children}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-m-ink-400)] pointer-events-none">
        <IconChevronRight size={14} className="rotate-90" />
      </div>
    </div>
  );
}

function Row({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <div className="flex-1">
        <div className="text-[var(--color-m-ink-700)]">{label}</div>
        {hint && <div className="text-[11px] text-[var(--color-m-ink-400)]">{hint}</div>}
      </div>
      <div className="font-bold text-[var(--color-m-ink-900)] m-tnum">{value}</div>
    </div>
  );
}
