"use client";

import { use, useState } from "react";
import Link from "next/link";
import { TopBar } from "../../_components/TopBar";
import { Button, Input, InputGroup, Select, RekberBanner, PhotoPlaceholder, SectionLabel } from "../../_components/ui";
import { IconCheck, IconLock } from "../../_components/icons";
import { getListing } from "../../_lib/mock-data";
import { formatRupiah } from "../../_lib/format";

type Step = 1 | 2 | 3;

const PAYMENT_METHODS = [
  { group: "Virtual Account", items: [
    { id: "bca_va", name: "BCA Virtual Account", fee: 4000 },
    { id: "mandiri_va", name: "Mandiri Virtual Account", fee: 4000 },
    { id: "bni_va", name: "BNI Virtual Account", fee: 4000 },
    { id: "bri_va", name: "BRI Virtual Account", fee: 4000 },
  ]},
  { group: "E-wallet", items: [
    { id: "gopay", name: "GoPay", fee: 0 },
    { id: "ovo", name: "OVO", fee: 0 },
    { id: "dana", name: "DANA", fee: 0 },
    { id: "shopeepay", name: "ShopeePay", fee: 0 },
  ]},
  { group: "QRIS", items: [
    { id: "qris", name: "QRIS (Semua e-wallet & m-banking)", fee: 0 },
  ]},
];

const COURIERS = [
  { id: "jne_reg", name: "JNE REG", cost: 135000, eta: "2-3 hari" },
  { id: "jne_yes", name: "JNE YES", cost: 185000, eta: "1-2 hari" },
  { id: "jnt_reg", name: "J&T REG", cost: 125000, eta: "2-4 hari" },
  { id: "sicepat_best", name: "SiCepat BEST", cost: 150000, eta: "1-2 hari" },
];

export default function CheckoutPage({ searchParams }: { searchParams: Promise<{ listing?: string }> }) {
  const sp = use(searchParams);
  const listingId = sp.listing ?? "l1";
  const listing = getListing(listingId);

  const [step, setStep] = useState<Step>(1);
  const [recipient, setRecipient] = useState("Ihsan Fajari");
  const [phone, setPhone] = useState("+62 812 3456 7890");
  const [address, setAddress] = useState("Jl. Kemang Raya No. 42, RT 5 RW 3");
  const [city, setCity] = useState("Jakarta Selatan");
  const [postal, setPostal] = useState("12730");
  const [courierId, setCourierId] = useState("jne_reg");
  const [paymentId, setPaymentId] = useState("bca_va");

  if (!listing) return null;

  const courier = COURIERS.find((c) => c.id === courierId)!;
  const payment = PAYMENT_METHODS.flatMap((g) => g.items).find((p) => p.id === paymentId)!;

  const adminFee = Math.max(5000, Math.round(listing.price * 0.01));
  const insurance = Math.round(listing.price * 0.002);
  const total = listing.price + courier.cost + adminFee + insurance + payment.fee;

  return (
    <>
      <TopBar title={step === 3 ? "Pembayaran" : "Checkout"} back />

      {/* Step indicator */}
      <div className="bg-white border-b border-[var(--color-sp-black-100)] px-4 py-4">
        <div className="flex items-center">
          {[1, 2, 3].map((n, i) => {
            const active = step === n;
            const done = step > n;
            const label = n === 1 ? "Alamat" : n === 2 ? "Pembayaran" : "Konfirmasi";
            return (
              <div key={n} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-7 h-7 sp-display text-[11px] font-extrabold flex items-center justify-center ${
                      done ? "bg-[var(--color-sp-green)] text-white" : active ? "bg-[var(--color-sp-red)] text-white" : "bg-[var(--color-sp-black-100)] text-[var(--color-sp-black-400)]"
                    }`}
                  >
                    {done ? <IconCheck size={14} /> : n}
                  </div>
                  <div className={`sp-display text-[9px] uppercase font-bold tracking-wide ${active ? "text-[var(--color-sp-red)]" : done ? "text-[var(--color-sp-green)]" : "text-[var(--color-sp-black-400)]"}`}>
                    {label}
                  </div>
                </div>
                {n < 3 && (
                  <div className={`flex-1 h-[2px] mx-2 mb-4 ${done ? "bg-[var(--color-sp-green)]" : "bg-[var(--color-sp-black-100)]"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <main className="flex-1 pb-28">
        {/* Item summary */}
        <div className="bg-white px-4 py-3 flex gap-3 border-b border-[var(--color-sp-black-100)]">
          <PhotoPlaceholder className="w-16 h-16 flex-shrink-0" label="foto" />
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-bold leading-snug line-clamp-2 mb-1">{listing.title}</div>
            <div className="sp-display text-[15px] font-extrabold text-[var(--color-sp-red)]">{formatRupiah(listing.price)}</div>
          </div>
        </div>

        {step === 1 && (
          <>
            <section className="bg-white mt-3 px-4 py-4 border-y border-[var(--color-sp-black-100)]">
              <SectionLabel className="mb-3">Alamat Pengiriman</SectionLabel>
              <InputGroup label="Nama Penerima">
                <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} />
              </InputGroup>
              <InputGroup label="No. HP Penerima" helper="Akan dibagikan ke kurir">
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" />
              </InputGroup>
              <InputGroup label="Kota / Kabupaten">
                <Input value={city} onChange={(e) => setCity(e.target.value)} />
              </InputGroup>
              <InputGroup label="Alamat Lengkap">
                <Input value={address} onChange={(e) => setAddress(e.target.value)} />
              </InputGroup>
              <InputGroup label="Kode Pos">
                <Input value={postal} onChange={(e) => setPostal(e.target.value)} />
              </InputGroup>
            </section>

            <section className="bg-white mt-3 px-4 py-4 border-y border-[var(--color-sp-black-100)]">
              <SectionLabel className="mb-3">Pilih Ekspedisi</SectionLabel>
              <div className="space-y-2">
                {COURIERS.map((c) => {
                  const active = courierId === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setCourierId(c.id)}
                      className={`w-full flex items-center gap-3 border-[1.5px] p-3 text-left transition-colors ${
                        active ? "border-[var(--color-sp-red)] bg-[var(--color-sp-red-tint)]" : "border-[var(--color-sp-black-100)] bg-white"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${active ? "border-[var(--color-sp-red)]" : "border-[var(--color-sp-black-200)]"}`}>
                        {active && <div className="w-2 h-2 rounded-full bg-[var(--color-sp-red)]" />}
                      </div>
                      <div className="flex-1">
                        <div className="sp-display text-[13px] font-bold uppercase tracking-wide">{c.name}</div>
                        <div className="text-[11px] text-[var(--color-sp-black-400)]">Estimasi {c.eta}</div>
                      </div>
                      <div className="sp-display text-[14px] font-extrabold text-[var(--color-sp-black)]">{formatRupiah(c.cost)}</div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="bg-white mt-3 px-4 py-4 border-y border-[var(--color-sp-black-100)]">
              <InputGroup label="Catatan untuk Penjual (opsional)">
                <Input placeholder="Contoh: mohon kirim pagi hari" />
              </InputGroup>
            </section>
          </>
        )}

        {step === 2 && (
          <>
            {PAYMENT_METHODS.map((group) => (
              <section key={group.group} className="bg-white mt-3 px-4 py-4 border-y border-[var(--color-sp-black-100)]">
                <SectionLabel className="mb-3">{group.group}</SectionLabel>
                <div className="space-y-2">
                  {group.items.map((p) => {
                    const active = paymentId === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setPaymentId(p.id)}
                        className={`w-full flex items-center gap-3 border-[1.5px] p-3 text-left transition-colors ${
                          active ? "border-[var(--color-sp-red)] bg-[var(--color-sp-red-tint)]" : "border-[var(--color-sp-black-100)] bg-white"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${active ? "border-[var(--color-sp-red)]" : "border-[var(--color-sp-black-200)]"}`}>
                          {active && <div className="w-2 h-2 rounded-full bg-[var(--color-sp-red)]" />}
                        </div>
                        <div className="flex-1">
                          <div className="text-[13px] font-bold">{p.name}</div>
                          {p.fee > 0 && <div className="text-[11px] text-[var(--color-sp-black-400)]">Biaya admin {formatRupiah(p.fee)}</div>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </>
        )}

        {step === 3 && (
          <section className="bg-white mt-3 px-4 py-6 border-y border-[var(--color-sp-black-100)]">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[var(--color-sp-black)] text-[var(--color-sp-red)] flex items-center justify-center mb-4">
                <IconLock size={32} />
              </div>
              <div className="sp-display text-[18px] font-extrabold mb-2">PESANAN DIBUAT</div>
              <p className="text-[13px] text-[var(--color-sp-black-600)] leading-relaxed max-w-xs mb-4">
                Order <span className="font-bold text-[var(--color-sp-black)]">#ORD-20260424-0052</span> sudah dibuat. Selesaikan pembayaran dalam 24 jam.
              </p>
            </div>
            <div className="bg-[var(--color-sp-black-50)] p-4 mt-2 border border-[var(--color-sp-black-100)]">
              <div className="flex justify-between items-center mb-2">
                <SectionLabel>No. Virtual Account {payment.name}</SectionLabel>
              </div>
              <div className="sp-display text-[22px] font-extrabold tracking-wider">
                8808 2264 2244 1199
              </div>
              <div className="text-[11px] text-[var(--color-sp-black-400)] mt-1">
                Tap nomor untuk menyalin
              </div>
            </div>
            <div className="mt-4 space-y-2 text-[12px] text-[var(--color-sp-black-600)]">
              <p>1. Buka aplikasi m-banking atau internet banking</p>
              <p>2. Pilih Transfer → Virtual Account</p>
              <p>3. Masukkan nomor di atas, jumlah akan terisi otomatis</p>
              <p>4. Selesaikan pembayaran & simpan bukti transfer</p>
            </div>
          </section>
        )}

        {/* Rekber note */}
        <div className="px-4 pt-4">
          <RekberBanner />
        </div>

        {/* Order summary */}
        <section className="bg-white mt-3 px-4 py-4 border-y border-[var(--color-sp-black-100)]">
          <SectionLabel className="mb-3">Ringkasan Pembayaran</SectionLabel>
          <dl className="space-y-2 text-[13px]">
            <div className="flex justify-between">
              <dt className="text-[var(--color-sp-black-600)]">Harga barang</dt>
              <dd className="font-semibold">{formatRupiah(listing.price)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--color-sp-black-600)]">Ongkir ({courier.name})</dt>
              <dd className="font-semibold">{formatRupiah(courier.cost)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--color-sp-black-600)]">Biaya rekber (1%)</dt>
              <dd className="font-semibold">{formatRupiah(adminFee)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--color-sp-black-600)]">Asuransi pengiriman</dt>
              <dd className="font-semibold">{formatRupiah(insurance)}</dd>
            </div>
            {payment.fee > 0 && (
              <div className="flex justify-between">
                <dt className="text-[var(--color-sp-black-600)]">Biaya admin {payment.name}</dt>
                <dd className="font-semibold">{formatRupiah(payment.fee)}</dd>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t border-[var(--color-sp-black-100)] mt-3">
              <dt className="sp-display font-extrabold text-[14px] uppercase">Total Pembayaran</dt>
              <dd className="sp-display font-extrabold text-[20px] text-[var(--color-sp-red)]">{formatRupiah(total)}</dd>
            </div>
          </dl>
        </section>
      </main>

      {/* Sticky CTA bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-center pointer-events-none">
        <div className="w-full max-w-[480px] bg-white border-t-2 border-[var(--color-sp-black)] px-4 py-3 pointer-events-auto">
          {step === 1 && (
            <Button full size="md" onClick={() => setStep(2)}>
              Lanjut ke Pembayaran →
            </Button>
          )}
          {step === 2 && (
            <div className="flex gap-2">
              <Button variant="ghost" size="md" onClick={() => setStep(1)}>Kembali</Button>
              <Button size="md" className="flex-1" onClick={() => setStep(3)}>
                Buat Pesanan & Bayar
              </Button>
            </div>
          )}
          {step === 3 && (
            <Link
              href="/marketplace/orders/o1"
              className="sp-display inline-flex items-center justify-center w-full text-[13px] font-extrabold uppercase tracking-wide border-2 border-[var(--color-sp-red)] bg-[var(--color-sp-red)] text-white px-[18px] py-[11px]"
            >
              Saya Sudah Bayar
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
