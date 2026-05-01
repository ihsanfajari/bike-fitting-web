import Link from "next/link";
import { notFound } from "next/navigation";
import { TopBar } from "../../_components/TopBar";
import { Badge, Button, OrderStatusBadge, SectionLabel, PhotoPlaceholder, RekberBanner } from "../../_components/ui";
import { getOrder, getListing, getSeller, ORDER_STATUS_LABEL, type OrderStatus } from "../../_lib/mock-data";
import { formatRupiah } from "../../_lib/format";
import { IconCheck, IconLock, IconPackage, IconPin } from "../../_components/icons";

const STEP_ORDER: OrderStatus[] = ["pending_payment", "paid", "shipped", "delivered", "completed"];
const STEP_SHORT: Record<OrderStatus, string> = {
  pending_payment: "Bayar",
  paid: "Proses",
  shipped: "Dikirim",
  delivered: "Sampai",
  completed: "Selesai",
  cancelled: "Batal",
  disputed: "Sengketa",
};

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = getOrder(id);
  if (!order) notFound();
  const listing = getListing(order.listingId);
  const seller = getSeller(order.sellerId);

  const stepIndex = STEP_ORDER.indexOf(order.status as OrderStatus);

  return (
    <>
      <TopBar title="Detail Pesanan" back />

      <main className="flex-1 pb-24">
        {/* Status header */}
        <div className="bg-[var(--color-sp-black)] text-white px-4 py-5">
          <SectionLabel className="!text-[var(--color-sp-red)] mb-2">STATUS PESANAN</SectionLabel>
          <div className="sp-display text-[24px] font-extrabold leading-tight mb-2">
            {ORDER_STATUS_LABEL[order.status]}
          </div>
          <div className="text-[12px] text-[#b0b0b0]">
            {order.orderNumber} · Dibuat {order.createdAt}
          </div>

          {/* Horizontal step progress */}
          <div className="mt-5 flex items-center">
            {STEP_ORDER.map((s, i) => {
              const done = i <= stepIndex;
              const active = i === stepIndex;
              return (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-extrabold ${
                        done
                          ? "bg-[var(--color-sp-red)] text-white"
                          : "bg-[#444] text-[#888]"
                      } ${active ? "ring-2 ring-[var(--color-sp-red)] ring-offset-2 ring-offset-[var(--color-sp-black)]" : ""}`}
                    >
                      {done ? <IconCheck size={12} /> : i + 1}
                    </div>
                    <div className={`sp-display text-[8px] uppercase font-bold tracking-wide ${done ? "text-white" : "text-[#888]"}`}>
                      {STEP_SHORT[s]}
                    </div>
                  </div>
                  {i < STEP_ORDER.length - 1 && (
                    <div className={`flex-1 h-[2px] mx-1 mb-5 ${i < stepIndex ? "bg-[var(--color-sp-red)]" : "bg-[#444]"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Item */}
        <div className="bg-white mt-3 px-4 py-3 flex gap-3 border-y border-[var(--color-sp-black-100)]">
          <PhotoPlaceholder className="w-16 h-16 flex-shrink-0" label="foto" />
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-bold leading-snug line-clamp-2 mb-1">{listing?.title}</div>
            <div className="sp-display text-[16px] font-extrabold text-[var(--color-sp-red)]">{formatRupiah(order.itemPrice)}</div>
          </div>
        </div>

        {/* Shipping address */}
        <section className="bg-white mt-3 px-4 py-4 border-y border-[var(--color-sp-black-100)]">
          <SectionLabel className="mb-3">Alamat Pengiriman</SectionLabel>
          <div className="flex gap-2 items-start">
            <IconPin size={16} className="text-[var(--color-sp-red)] flex-shrink-0 mt-0.5" />
            <div className="text-[13px]">
              <div className="font-bold">{order.shippingAddress.recipient}</div>
              <div className="text-[var(--color-sp-black-600)]">{order.shippingAddress.phone}</div>
              <div className="text-[var(--color-sp-black-600)] mt-1 leading-relaxed">
                {order.shippingAddress.address}<br />
                {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.postal}
              </div>
            </div>
          </div>
        </section>

        {/* Tracking */}
        {order.trackingNumber && (
          <section className="bg-white mt-3 px-4 py-4 border-y border-[var(--color-sp-black-100)]">
            <div className="flex items-center justify-between mb-3">
              <SectionLabel>Pengiriman</SectionLabel>
              <Badge color="blue">{order.courier} {order.service}</Badge>
            </div>
            <div className="flex items-center gap-2 py-2 px-3 bg-[var(--color-sp-black-50)] mb-3">
              <IconPackage size={16} />
              <span className="sp-display text-[13px] font-extrabold tracking-wide flex-1">{order.trackingNumber}</span>
              <button className="sp-display text-[10px] font-bold text-[var(--color-sp-red)] uppercase tracking-wide">
                Salin
              </button>
            </div>

            {order.tracking && (
              <div className="relative pl-6 mt-4">
                <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[var(--color-sp-black-100)]" />
                {order.tracking.map((t, i) => {
                  const latest = i === order.tracking!.length - 1;
                  return (
                    <div key={i} className="relative pb-4 last:pb-0">
                      <div
                        className={`absolute left-[-22px] top-1 w-4 h-4 rounded-full ${latest ? "bg-[var(--color-sp-red)] ring-4 ring-[var(--color-sp-red-tint)]" : "bg-[var(--color-sp-black-200)]"}`}
                      />
                      <div className={`text-[12px] font-bold mb-0.5 ${latest ? "text-[var(--color-sp-red)]" : ""}`}>
                        {t.description}
                      </div>
                      <div className="text-[11px] text-[var(--color-sp-black-400)]">
                        {t.timestamp} · {t.location}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* Rekber */}
        <div className="px-4 mt-3">
          <RekberBanner />
        </div>

        {/* Payment summary */}
        <section className="bg-white mt-3 px-4 py-4 border-y border-[var(--color-sp-black-100)]">
          <SectionLabel className="mb-3">Ringkasan Pembayaran</SectionLabel>
          {order.paymentMethod && (
            <div className="flex justify-between text-[12px] mb-3 pb-3 border-b border-[var(--color-sp-black-100)]">
              <span className="text-[var(--color-sp-black-400)]">Metode bayar</span>
              <span className="font-bold">{order.paymentMethod}</span>
            </div>
          )}
          <dl className="space-y-2 text-[13px]">
            <div className="flex justify-between">
              <dt className="text-[var(--color-sp-black-600)]">Harga barang</dt>
              <dd className="font-semibold">{formatRupiah(order.itemPrice)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--color-sp-black-600)]">Ongkir</dt>
              <dd className="font-semibold">{formatRupiah(order.shippingCost)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--color-sp-black-600)]">Rekber</dt>
              <dd className="font-semibold">{formatRupiah(order.adminFee)}</dd>
            </div>
            {order.insuranceFee > 0 && (
              <div className="flex justify-between">
                <dt className="text-[var(--color-sp-black-600)]">Asuransi</dt>
                <dd className="font-semibold">{formatRupiah(order.insuranceFee)}</dd>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t border-[var(--color-sp-black-100)] mt-3">
              <dt className="sp-display font-extrabold text-[13px] uppercase">Total</dt>
              <dd className="sp-display font-extrabold text-[18px] text-[var(--color-sp-red)]">{formatRupiah(order.total)}</dd>
            </div>
          </dl>
        </section>

        {/* Seller contact */}
        {seller && order.sellerId !== "me" && (
          <section className="bg-white mt-3 px-4 py-4 border-y border-[var(--color-sp-black-100)]">
            <SectionLabel className="mb-3">Penjual</SectionLabel>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--color-sp-black)] text-white flex items-center justify-center sp-display font-extrabold">
                {seller.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[13px]">{seller.name}</div>
                <div className="text-[11px] text-[var(--color-sp-black-400)]">{seller.city}</div>
              </div>
              <Link
                href="/marketplace/chat/t1"
                className="sp-display text-[11px] font-bold uppercase tracking-wide border-2 border-[var(--color-sp-black)] px-3 py-2 hover:bg-[var(--color-sp-black-50)]"
              >
                Hubungi
              </Link>
            </div>
          </section>
        )}
      </main>

      {/* Sticky CTA based on role/status */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-center pointer-events-none">
        <div className="w-full max-w-[480px] bg-white border-t-2 border-[var(--color-sp-black)] px-4 py-3 pointer-events-auto">
          {order.buyerId === "me" && order.status === "shipped" && (
            <Button full size="md">
              <IconCheck size={16} className="mr-2" /> Konfirmasi Diterima
            </Button>
          )}
          {order.buyerId === "me" && order.status === "pending_payment" && (
            <Button full size="md">Bayar Sekarang</Button>
          )}
          {order.sellerId === "me" && order.status === "paid" && (
            <Button full size="md">
              <IconPackage size={16} className="mr-2" /> Input Nomor Resi
            </Button>
          )}
          {order.status === "completed" && order.buyerId === "me" && (
            <Button full variant="dark" size="md">Beri Rating Penjual</Button>
          )}
          {!["pending_payment", "paid", "shipped"].includes(order.status) && order.status !== "completed" && (
            <Button full variant="ghost" size="md" disabled>Pesanan Ditutup</Button>
          )}
          {order.sellerId === "me" && order.status === "shipped" && (
            <Button full variant="ghost" size="md" disabled>
              <IconLock size={14} className="mr-1" /> Menunggu Pembeli Konfirmasi
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
