"use client";

import Link from "next/link";
import { useState } from "react";
import { TopBar } from "../_components/TopBar";
import { BottomNav } from "../_components/BottomNav";
import { OrderStatusBadge, PhotoPlaceholder, SectionLabel, Chip } from "../_components/ui";
import { IconChevronRight } from "../_components/icons";
import { ORDERS, getListing, ORDER_STATUS_LABEL, type OrderStatus } from "../_lib/mock-data";
import { formatRupiah } from "../_lib/format";

const TABS = [
  { key: "buyer", label: "Pesanan Saya" },
  { key: "seller", label: "Pesanan Masuk" },
] as const;

const STATUS_FILTERS: (OrderStatus | "all")[] = ["all", "pending_payment", "paid", "shipped", "completed"];

export default function OrdersPage() {
  const [tab, setTab] = useState<"buyer" | "seller">("buyer");
  const [status, setStatus] = useState<OrderStatus | "all">("all");

  const filtered = ORDERS.filter((o) => (tab === "buyer" ? o.buyerId === "me" : o.sellerId === "me")).filter(
    (o) => status === "all" || o.status === status,
  );

  return (
    <>
      <TopBar title="Pesanan" />

      {/* Tabs */}
      <div className="bg-white border-b border-[var(--color-sp-black-100)] flex">
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 sp-display text-[12px] font-bold uppercase tracking-wide py-3 border-b-[3px] transition-colors ${
                active ? "border-[var(--color-sp-red)] text-[var(--color-sp-red)]" : "border-transparent text-[var(--color-sp-black-400)]"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Status filter chips */}
      <div className="bg-white border-b border-[var(--color-sp-black-100)] px-4 py-3">
        <div className="flex gap-2 overflow-x-auto sp-no-scrollbar">
          {STATUS_FILTERS.map((s) => (
            <Chip key={s} active={status === s} onClick={() => setStatus(s)}>
              {s === "all" ? "Semua" : ORDER_STATUS_LABEL[s]}
            </Chip>
          ))}
        </div>
      </div>

      <main className="flex-1 px-4 py-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <SectionLabel className="mb-2">Belum ada pesanan</SectionLabel>
            <p className="text-[13px] text-[var(--color-sp-black-400)]">
              {tab === "buyer" ? "Mulai belanja sepeda impianmu" : "Daftarkan barangmu dulu"}
            </p>
          </div>
        ) : (
          filtered.map((o) => {
            const listing = getListing(o.listingId);
            return (
              <Link
                key={o.id}
                href={`/marketplace/orders/${o.id}`}
                className="flex bg-white border border-[var(--color-sp-black-100)] p-3 gap-3 hover:border-[var(--color-sp-black-400)]"
              >
                <PhotoPlaceholder className="w-20 h-20 flex-shrink-0" label="foto" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <OrderStatusBadge status={o.status} />
                    <span className="text-[10px] text-[var(--color-sp-black-400)]">{o.createdAt.split(" ")[0]}</span>
                  </div>
                  <div className="text-[12px] font-bold line-clamp-2 mb-1">{listing?.title}</div>
                  <div className="text-[10px] text-[var(--color-sp-black-400)] mb-1">{o.orderNumber}</div>
                  <div className="flex items-center justify-between">
                    <span className="sp-display text-[15px] font-extrabold text-[var(--color-sp-red)]">
                      {formatRupiah(o.total)}
                    </span>
                    <IconChevronRight size={16} className="text-[var(--color-sp-black-400)]" />
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </main>

      <BottomNav />
    </>
  );
}
