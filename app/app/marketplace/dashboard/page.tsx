import Link from "next/link";
import { TopBar } from "../_components/TopBar";
import { BottomNav } from "../_components/BottomNav";
import { Badge, OrderStatusBadge, SectionLabel, PhotoPlaceholder } from "../_components/ui";
import { IconChevronRight, IconEye, IconHeart, IconPackage, IconWallet } from "../_components/icons";
import { LISTINGS, ORDERS, SELLERS, getListing } from "../_lib/mock-data";
import { formatRupiah } from "../_lib/format";

export default function DashboardPage() {
  const me = SELLERS[0];
  const myListings = LISTINGS.slice(0, 4);
  const incoming = ORDERS.filter((o) => o.sellerId === "me");
  const actionNeeded = incoming.filter((o) => o.status === "paid");
  const balance = 12540000;
  const totalSales = incoming.reduce((sum, o) => sum + (o.status === "completed" ? o.itemPrice : 0), 0);
  const activeListings = myListings.length;

  return (
    <>
      <TopBar title="Dashboard Penjual" />

      <main className="flex-1 pb-4">
        {/* Greeting */}
        <div className="bg-[var(--color-sp-black)] text-white px-4 py-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[var(--color-sp-red)] text-white flex items-center justify-center sp-display font-extrabold">
              {me.avatar}
            </div>
            <div>
              <div className="text-[11px] text-[#b0b0b0] sp-display uppercase tracking-wide">Halo,</div>
              <div className="sp-display font-bold text-[16px]">{me.name}</div>
            </div>
          </div>

          {/* Balance card */}
          <div className="bg-[var(--color-sp-red)] text-white p-4 flex justify-between items-center">
            <div>
              <div className="sp-display text-[10px] font-bold uppercase tracking-[1px] opacity-80 mb-1">Saldo Tersedia</div>
              <div className="sp-display text-[28px] font-extrabold leading-none">{formatRupiah(balance)}</div>
            </div>
            <Link
              href="/marketplace/withdraw"
              className="sp-display text-[11px] font-extrabold uppercase tracking-wide border-2 border-white text-white px-3 py-2 hover:bg-white hover:text-[var(--color-sp-red)]"
            >
              Tarik Dana
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 px-4 -mt-3 relative z-10">
          {[
            { label: "Listing Aktif", value: activeListings, icon: IconPackage },
            { label: "Terjual", value: formatRupiah(totalSales).replace("Rp ", ""), icon: IconWallet, prefix: "Rp" },
            { label: "Dilihat", value: "1.2k", icon: IconEye },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-[var(--color-sp-black-100)] p-3">
              <s.icon size={18} className="text-[var(--color-sp-red)] mb-2" />
              <div className="sp-display text-[18px] font-extrabold leading-none">
                {s.prefix && <span className="text-[11px] mr-0.5">{s.prefix}</span>}
                {s.value}
              </div>
              <div className="sp-display text-[9px] uppercase tracking-wide text-[var(--color-sp-black-400)] mt-1 font-bold">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Action needed */}
        {actionNeeded.length > 0 && (
          <section className="px-4 pt-6">
            <div className="flex justify-between items-center mb-3">
              <SectionLabel>Perlu Tindakan Kamu</SectionLabel>
              <Badge color="red">{actionNeeded.length}</Badge>
            </div>
            <div className="space-y-2">
              {actionNeeded.map((o) => {
                const listing = getListing(o.listingId);
                return (
                  <Link
                    key={o.id}
                    href={`/marketplace/orders/${o.id}`}
                    className="flex bg-white border-l-[3px] border-l-[var(--color-sp-red)] border-y border-r border-[var(--color-sp-black-100)] p-3 gap-3"
                  >
                    <PhotoPlaceholder className="w-14 h-14 flex-shrink-0" label="foto" />
                    <div className="flex-1 min-w-0">
                      <div className="sp-display text-[11px] uppercase font-bold text-[var(--color-sp-red)] tracking-wide mb-0.5">
                        Kirim barang dalam 2×24 jam
                      </div>
                      <div className="text-[12px] font-bold line-clamp-1">{listing?.title}</div>
                      <div className="text-[11px] text-[var(--color-sp-black-400)]">{o.orderNumber}</div>
                    </div>
                    <IconChevronRight size={18} className="text-[var(--color-sp-black-400)] self-center" />
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Incoming orders summary */}
        <section className="px-4 pt-6">
          <div className="flex justify-between items-center mb-3">
            <SectionLabel>Pesanan Masuk</SectionLabel>
            <Link href="/marketplace/orders?tab=seller" className="sp-display text-[10px] font-bold text-[var(--color-sp-red)] uppercase tracking-wide flex items-center gap-0.5">
              Semua <IconChevronRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {incoming.slice(0, 3).map((o) => {
              const listing = getListing(o.listingId);
              return (
                <Link
                  key={o.id}
                  href={`/marketplace/orders/${o.id}`}
                  className="flex bg-white border border-[var(--color-sp-black-100)] p-3 gap-3 hover:border-[var(--color-sp-black-400)]"
                >
                  <PhotoPlaceholder className="w-14 h-14 flex-shrink-0" label="foto" />
                  <div className="flex-1 min-w-0">
                    <OrderStatusBadge status={o.status} />
                    <div className="text-[12px] font-bold line-clamp-1 mt-1">{listing?.title}</div>
                    <div className="text-[11px] text-[var(--color-sp-black-400)] mt-0.5">
                      {o.orderNumber} · {formatRupiah(o.total)}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* My listings */}
        <section className="px-4 pt-6 pb-4">
          <div className="flex justify-between items-center mb-3">
            <SectionLabel>Listing Saya</SectionLabel>
            <Link href="/marketplace/me/listings" className="sp-display text-[10px] font-bold text-[var(--color-sp-red)] uppercase tracking-wide flex items-center gap-0.5">
              Kelola <IconChevronRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {myListings.map((l) => (
              <Link
                key={l.id}
                href={`/marketplace/listing/${l.slug}`}
                className="flex bg-white border border-[var(--color-sp-black-100)] p-3 gap-3 hover:border-[var(--color-sp-black-400)]"
              >
                <PhotoPlaceholder className="w-14 h-14 flex-shrink-0" label="foto" />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-bold line-clamp-1">{l.title}</div>
                  <div className="sp-display text-[15px] font-extrabold text-[var(--color-sp-red)] leading-none my-1">
                    {formatRupiah(l.price)}
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-[var(--color-sp-black-400)]">
                    <span className="flex items-center gap-0.5"><IconEye size={11} /> {l.views}</span>
                    <span className="flex items-center gap-0.5"><IconHeart size={11} /> {l.wishlistCount}</span>
                    <Badge color="green" className="ml-auto !text-[8px]">AKTIF</Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  );
}
