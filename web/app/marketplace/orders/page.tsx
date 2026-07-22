import Link from "next/link";
import { PageTopBar } from "../_components/TopBar";
import { BottomNav } from "../_components/BottomNav";
import { IconChevronRight, IconClock, IconBox, IconTruck, IconArrowRight } from "../_components/icons";
import { ORDERS, ORDER_STATUS_LABEL, type OrderStatus } from "@/lib/mock/api";
import { getListing } from "@/lib/mock/data";
import { formatRupiah } from "@/lib/format";
import { Badge, EmptyState } from "@/components/ui";

const STATUS_TONE: Record<OrderStatus, "amber" | "teal" | "orange" | "green" | "gray" | "red"> = {
  pending_payment: "amber",
  paid: "teal",
  shipped: "orange",
  delivered: "teal",
  completed: "green",
  cancelled: "gray",
  disputed: "red",
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: "buyer" | "seller" }>;
}) {
  const { tab = "buyer" } = await searchParams;
  const orders = ORDERS.filter((o) => (tab === "buyer" ? o.buyerId === "me" : o.sellerId === "me"));

  return (
    <>
      <PageTopBar title="Pesanan" backHref="/marketplace/dashboard" />

      <main className="flex-1 pb-6 bg-[var(--color-m-cream)]">
        <div className="sticky top-14 z-20 bg-[var(--color-m-cream)] border-b border-[var(--color-m-ink-100)]">
          <div className="flex px-2">
            {(
              [
                { key: "buyer", label: "Saya beli" },
                { key: "seller", label: "Saya jual" },
              ] as const
            ).map(({ key, label }) => {
              const active = tab === key;
              return (
                <Link
                  key={key}
                  href={`/marketplace/orders?tab=${key}`}
                  className={`flex-1 py-3 text-center text-[13px] font-semibold border-b-2 transition-colors ${
                    active
                      ? "text-[var(--color-m-orange-600)] border-[var(--color-m-orange-500)]"
                      : "text-[var(--color-m-ink-500)] border-transparent"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {orders.length === 0 ? (
          <EmptyState
            icon={<IconBox size={30} className="text-[var(--color-m-orange-400)]" />}
            title={tab === "buyer" ? "Belum ada pesanan" : "Belum ada pesanan masuk"}
            description={
              tab === "buyer"
                ? "Mulai cari sepeda impianmu — semua transaksi otomatis pakai rekber."
                : "Listing yang sudah dipublish akan tampil di marketplace. Semoga cepat laku!"
            }
            className="mt-8"
          />
        ) : (
          <div className="px-5 pt-4 space-y-3">
            {orders.map((order) => {
              const item = getListing(order.listingId);
              const ctaForSeller = tab === "seller" && order.status === "paid";
              return (
                <Link
                  key={order.id}
                  href={`/marketplace/orders/${order.id}`}
                  className="block p-3 bg-[var(--color-m-paper)] rounded-2xl m-shadow-xs hover:m-shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge tone={STATUS_TONE[order.status]}>{ORDER_STATUS_LABEL[order.status]}</Badge>
                    <span className="text-[10px] font-mono text-[var(--color-m-ink-400)]">{order.orderNumber}</span>
                  </div>
                  <div className="flex gap-3">
                    <div
                      className="w-16 h-16 rounded-xl flex-shrink-0"
                      style={{ background: "linear-gradient(135deg,#FFE5D6,#E0F7F8)" }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-bold text-[var(--color-m-ink-900)] truncate leading-snug">
                        {item?.title ?? "Listing tidak ditemukan"}
                      </div>
                      <div className="text-[14px] font-extrabold text-[var(--color-m-orange-600)] m-tnum mt-0.5">
                        {formatRupiah(order.total)}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[var(--color-m-ink-500)]">
                        <IconClock size={11} />
                        <span>{order.createdAt}</span>
                      </div>
                    </div>
                    <IconChevronRight size={18} className="text-[var(--color-m-ink-400)] flex-shrink-0 self-center" />
                  </div>
                  {ctaForSeller && (
                    <div className="mt-3 pt-3 border-t border-dashed border-[var(--color-m-ink-100)]">
                      <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[var(--color-m-orange-600)]">
                        <IconTruck size={14} /> Perlu input resi pengiriman <IconArrowRight size={13} />
                      </span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />
    </>
  );
}
