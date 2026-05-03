import Link from "next/link";
import { notFound } from "next/navigation";
import { PageTopBar } from "../../_components/TopBar";
import { IconCheck, IconChat, IconChevronRight, IconShield, IconTruck } from "../../_components/icons";
import { ORDER_STATUS_LABEL, type OrderStatus } from "@/lib/mock/api";
import { getListing, getOrder, getSeller } from "@/lib/mock/data";
import { formatRupiah } from "@/lib/format";
import { Badge, ButtonLink, Field, Input, Select } from "@/components/ui";

const STATUS_TONE: Record<OrderStatus, "amber" | "teal" | "orange" | "green" | "gray" | "red"> = {
  pending_payment: "amber",
  paid: "teal",
  shipped: "orange",
  delivered: "teal",
  completed: "green",
  cancelled: "gray",
  disputed: "red",
};

const COURIERS = ["JNE", "SiCepat", "AnterAja", "JNT", "Pos Indonesia", "Cargo"];

const TIMELINE_STEPS = [
  { key: "paid", label: "Dibayar" },
  { key: "shipped", label: "Dikirim" },
  { key: "delivered", label: "Sampai" },
  { key: "completed", label: "Selesai" },
] as const;

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = getOrder(id);
  if (!order) notFound();
  const item = getListing(order.listingId);
  const seller = getSeller(order.sellerId);
  const isSeller = order.sellerId === "me";
  const needsTracking = isSeller && order.status === "paid";
  const currentStepIdx = TIMELINE_STEPS.findIndex((s) => s.key === order.status);

  return (
    <>
      <PageTopBar
        title={`Pesanan ${order.orderNumber.split("-").pop()}`}
        backHref={`/marketplace/orders?tab=${isSeller ? "seller" : "buyer"}`}
      />

      <main className="flex-1 pb-32 bg-[var(--color-m-cream)]">
        {/* Status banner */}
        <section className="bg-[var(--color-m-paper)] px-5 py-4 border-b border-[var(--color-m-ink-100)]">
          <div className="flex items-center justify-between mb-3">
            <Badge tone={STATUS_TONE[order.status]}>{ORDER_STATUS_LABEL[order.status]}</Badge>
            <span className="text-[10px] font-mono text-[var(--color-m-ink-400)]">{order.orderNumber}</span>
          </div>

          {/* Timeline */}
          <div className="flex items-center mt-2">
            {TIMELINE_STEPS.map((step, i) => {
              const done = i <= currentStepIdx;
              const active = i === currentStepIdx;
              return (
                <div key={step.key} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        done
                          ? "bg-[var(--color-m-green-500)] text-white"
                          : active
                          ? "bg-[var(--color-m-orange-500)] text-white ring-4 ring-[var(--color-m-orange-100)]"
                          : "bg-[var(--color-m-ink-100)] text-[var(--color-m-ink-400)]"
                      }`}
                    >
                      {done ? <IconCheck size={12} /> : i + 1}
                    </div>
                    <span className={`text-[9px] ${done ? "font-bold text-[var(--color-m-ink-900)]" : "text-[var(--color-m-ink-400)] font-medium"}`}>
                      {step.label}
                    </span>
                  </div>
                  {i < TIMELINE_STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-1.5 mb-4 rounded-full ${i < currentStepIdx ? "bg-[var(--color-m-green-500)]" : "bg-[var(--color-m-ink-100)]"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Action card — seller input resi (#27) */}
        {needsTracking && (
          <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3 border-l-4 border-[var(--color-m-orange-500)]">
            <h2 className="text-[16px] font-extrabold text-[var(--color-m-ink-900)] mb-1 flex items-center gap-2">
              <IconTruck size={20} className="text-[var(--color-m-orange-500)]" /> Input resi pengiriman
            </h2>
            <p className="text-[12px] text-[var(--color-m-ink-500)] mb-4 leading-relaxed">
              Pembeli sudah membayar. Kirim barang dalam <b className="text-[var(--color-m-orange-600)]">2 × 24 jam</b>, lalu input resi di sini.
            </p>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Kurir" required>
                  <Select defaultValue={order.courier}>
                    {COURIERS.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </Select>
                </Field>
                <Field label="Layanan" required>
                  <Select defaultValue={order.service}>
                    <option>YES</option>
                    <option>REG</option>
                    <option>OKE</option>
                    <option>BEST</option>
                  </Select>
                </Field>
              </div>

              <Field label="Nomor resi" required hint="Cek 2× sebelum submit — pembeli akan langsung dapat notifikasi.">
                <Input placeholder="Misal: JNE9283746592" defaultValue="" className="m-tnum" />
              </Field>

              <ButtonLink href={`/marketplace/orders/${order.id}?status=shipped`} full size="lg">
                Konfirmasi Sudah Dikirim
              </ButtonLink>
            </div>
          </section>
        )}

        {/* Item */}
        <section className="bg-[var(--color-m-paper)] px-5 py-4 mt-3">
          <div className="flex gap-3">
            <div
              className="w-16 h-16 rounded-xl flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#FFE5D6,#E0F7F8)" }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold text-[var(--color-m-ink-900)] line-clamp-2 leading-snug">
                {item?.title}
              </div>
              <div className="text-[11px] text-[var(--color-m-ink-500)] mt-1">{item?.city}</div>
              <div className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] m-tnum mt-1">
                {formatRupiah(order.itemPrice)}
              </div>
            </div>
          </div>
        </section>

        {/* Tracking timeline if shipped */}
        {order.tracking && order.tracking.length > 0 && (
          <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
            <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-3 flex items-center gap-2">
              <IconTruck size={18} /> Lacak Paket
            </h2>
            {order.trackingNumber && (
              <div className="mb-3 px-3 py-2.5 rounded-lg bg-[var(--color-m-ink-50)] flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--color-m-ink-400)] font-bold">
                    {order.courier} {order.service}
                  </div>
                  <div className="text-[13px] font-bold text-[var(--color-m-ink-900)] m-tnum mt-0.5">
                    {order.trackingNumber}
                  </div>
                </div>
                <button className="text-[11px] font-bold text-[var(--color-m-orange-600)]">Salin</button>
              </div>
            )}
            <ol className="space-y-3 ml-1">
              {order.tracking.map((event, i) => (
                <li key={i} className="flex gap-3">
                  <div className="flex flex-col items-center pt-1">
                    <span className={`w-2.5 h-2.5 rounded-full ${i === 0 ? "bg-[var(--color-m-orange-500)] ring-4 ring-[var(--color-m-orange-100)]" : "bg-[var(--color-m-ink-200)]"}`} />
                    {i < order.tracking!.length - 1 && (
                      <span className="w-px flex-1 bg-[var(--color-m-ink-100)] mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="text-[12px] text-[var(--color-m-ink-500)]">{event.timestamp}</div>
                    <div className="text-[13px] font-semibold text-[var(--color-m-ink-900)] mt-0.5">
                      {event.description}
                    </div>
                    <div className="text-[11px] text-[var(--color-m-ink-400)] mt-0.5">{event.location}</div>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Cost breakdown */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-3">Rincian Biaya</h2>
          <dl className="space-y-2.5 text-[13px]">
            <Row label="Harga sepeda" value={formatRupiah(order.itemPrice)} />
            <Row label={`Ongkir (${order.courier} ${order.service})`} value={formatRupiah(order.shippingCost)} />
            <Row label="Biaya Rekber" value={formatRupiah(order.adminFee)} />
            {order.insuranceFee > 0 && <Row label="Asuransi" value={formatRupiah(order.insuranceFee)} />}
          </dl>
          <div className="mt-3 pt-3 border-t border-dashed border-[var(--color-m-ink-100)] flex items-baseline justify-between">
            <span className="text-[14px] font-bold text-[var(--color-m-ink-900)]">Total</span>
            <span className="text-[18px] font-extrabold text-[var(--color-m-orange-600)] m-tnum">
              {formatRupiah(order.total)}
            </span>
          </div>
          {order.paymentMethod && (
            <div className="mt-2 text-[11px] text-[var(--color-m-ink-500)]">
              Dibayar via {order.paymentMethod}
            </div>
          )}
        </section>

        {/* Address */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-3">Alamat Pengiriman</h2>
          <div className="text-[13px] text-[var(--color-m-ink-700)] leading-relaxed">
            <div className="font-bold text-[var(--color-m-ink-900)]">{order.shippingAddress.recipient}</div>
            <div className="mt-0.5">{order.shippingAddress.phone}</div>
            <div className="mt-1.5">{order.shippingAddress.address}</div>
            <div>{order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.postal}</div>
          </div>
        </section>

        {/* Counterparty */}
        {seller && !isSeller && (
          <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
            <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-3">Penjual</h2>
            <Link href={`/marketplace/seller/${seller.id}`} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-m-orange-400)] to-[var(--color-m-orange-600)] flex items-center justify-center text-white font-bold">
                {seller.avatar}
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-bold text-[var(--color-m-ink-900)]">{seller.name}</div>
                <div className="text-[12px] text-[var(--color-m-ink-500)]">{seller.city}</div>
              </div>
              <Link
                href={`/marketplace/chat/t1`}
                className="px-3 h-9 rounded-full border border-[var(--color-m-ink-200)] flex items-center gap-1.5 text-[12px] font-bold text-[var(--color-m-ink-700)]"
              >
                <IconChat size={14} /> Chat
              </Link>
            </Link>
          </section>
        )}

        {/* Trust footer */}
        <section className="px-5 py-4">
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[var(--color-m-green-100)]/60">
            <IconShield size={20} className="text-[var(--color-m-green-500)] flex-shrink-0 mt-0.5" />
            <p className="text-[12px] text-[var(--color-m-ink-700)] leading-relaxed">
              {isSeller ? (
                <>Dana pembeli ditahan GowesFit. Setelah barang dikonfirmasi diterima, dana cair otomatis ke saldomu.</>
              ) : (
                <>Dananya ditahan GowesFit dulu. Kalau barangnya bermasalah, kamu bisa ajukan dispute dalam 3 hari setelah barang sampai.</>
              )}
            </p>
          </div>
        </section>
      </main>

      {/* Buyer action bar */}
      {!isSeller && order.status === "shipped" && (
        <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg flex gap-2">
          <Link
            href={`/marketplace/orders/${order.id}/dispute`}
            className="px-5 h-12 rounded-xl border border-[var(--color-m-ink-200)] flex items-center justify-center text-[13px] font-bold text-[var(--color-m-ink-700)]"
          >
            Ada Masalah?
          </Link>
          <ButtonLink href={`/marketplace/orders/${order.id}/confirm`} full size="lg" leading={<IconCheck size={18} />}>
            Sudah Diterima
          </ButtonLink>
        </div>
      )}

      {!isSeller && order.status === "delivered" && (
        <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg">
          <ButtonLink href={`/marketplace/orders/${order.id}/review`} full size="lg">
            Beri Review Penjual
          </ButtonLink>
        </div>
      )}
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-[var(--color-m-ink-700)]">{label}</span>
      <span className="font-bold text-[var(--color-m-ink-900)] m-tnum">{value}</span>
    </div>
  );
}
