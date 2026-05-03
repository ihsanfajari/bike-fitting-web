import Link from "next/link";
import { LISTINGS, ORDERS } from "@/lib/mock/api";
import { getListing } from "@/lib/mock/data";
import { BottomNav } from "../_components/BottomNav";
import { PageTopBar } from "../_components/TopBar";
import {
  IconBox,
  IconChat,
  IconChevronRight,
  IconClock,
  IconHeart,
  IconPlus,
  IconTrendUp,
  IconWallet,
} from "../_components/icons";
import { formatRupiah, formatRupiahShort } from "@/lib/format";

export default function MDashboardPage() {
  const myListings = LISTINGS.slice(0, 3);
  const myOrders = ORDERS.filter((o) => o.sellerId === "me");
  const pendingActions = myOrders.filter((o) => o.status === "paid").length;
  const balance = 12_450_000;
  const monthRevenue = 18_200_000;
  const monthDelta = 23;

  return (
    <>
      <PageTopBar title="Dashboard Penjual" backHref="/marketplace" />

      <main className="flex-1 pb-6 bg-[var(--color-m-cream)]">
        {/* Hero revenue card — V-B style */}
        <section className="px-5 pt-4 pb-2">
          <div
            className="relative overflow-hidden rounded-3xl p-5 text-white"
            style={{ background: "linear-gradient(135deg,#FF8B5E 0%,#FF6B35 60%,#E55A2B 100%)" }}
          >
            <div
              className="absolute -bottom-12 -right-8 w-44 h-44 rounded-full opacity-50"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)" }}
            />
            <div className="relative">
              <div className="flex items-center justify-between mb-1">
                <div className="text-[11px] font-bold uppercase tracking-widest text-white/80">
                  Pendapatan Mei 2026
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/25 text-[11px] font-bold backdrop-blur">
                  <IconTrendUp size={12} /> +{monthDelta}%
                </span>
              </div>
              <div className="text-[36px] font-extrabold m-tnum tracking-tight leading-none mt-1">
                {formatRupiah(monthRevenue)}
              </div>
              <div className="mt-1 text-[12px] text-white/85">
                dari {myOrders.length} transaksi · vs Apr {formatRupiahShort(14_800_000)}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <Link
                  href="/marketplace/dashboard/balance"
                  className="bg-white/15 backdrop-blur rounded-2xl p-3 border border-white/20"
                >
                  <div className="flex items-center gap-1.5 text-white/80 text-[10px] font-bold uppercase tracking-wider">
                    <IconWallet size={12} /> Saldo
                  </div>
                  <div className="text-[18px] font-extrabold m-tnum mt-1">{formatRupiah(balance)}</div>
                  <div className="text-[10px] text-white/70 mt-0.5">Tarik ke rekening →</div>
                </Link>
                <Link
                  href="/marketplace/orders"
                  className="bg-white/15 backdrop-blur rounded-2xl p-3 border border-white/20"
                >
                  <div className="flex items-center gap-1.5 text-white/80 text-[10px] font-bold uppercase tracking-wider">
                    <IconBox size={12} /> Perlu tindakan
                  </div>
                  <div className="text-[18px] font-extrabold m-tnum mt-1">{pendingActions}</div>
                  <div className="text-[10px] text-white/70 mt-0.5">Pesanan siap kirim →</div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick actions */}
        <section className="px-5 py-4">
          <div className="grid grid-cols-4 gap-2">
            <QuickAction icon={<IconPlus size={20} />} label="Listing" href="/marketplace/sell" accent />
            <QuickAction icon={<IconBox size={20} />} label="Pesanan" href="/marketplace/orders" badge={pendingActions} />
            <QuickAction icon={<IconChat size={20} />} label="Chat" href="/marketplace/chat" badge={3} />
            <QuickAction icon={<IconHeart size={20} />} label="Promosi" href="/marketplace/promo" />
          </div>
        </section>

        {/* Stats row */}
        <section className="px-5 pb-5">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-3">Performa Listing</h2>
          <div className="grid grid-cols-3 gap-2">
            <Stat label="Listing aktif" value={myListings.length.toString()} />
            <Stat label="Total dilihat" value="1.2K" delta="+18%" />
            <Stat label="Wishlist" value="89" delta="+12" />
          </div>
        </section>

        {/* Pending orders — needs action */}
        {pendingActions > 0 && (
          <section className="px-5 pb-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)]">Perlu Tindakan</h2>
              <Link href="/marketplace/orders" className="text-[12px] font-semibold text-[var(--color-m-orange-600)] inline-flex items-center gap-0.5">
                Semua <IconChevronRight size={14} />
              </Link>
            </div>
            <div className="space-y-2">
              {myOrders
                .filter((o) => o.status === "paid")
                .map((order) => {
                  const item = getListing(order.listingId);
                  return (
                    <Link
                      key={order.id}
                      href={`/marketplace/orders/${order.id}`}
                      className="flex items-center gap-3 p-3 bg-[var(--color-m-paper)] rounded-2xl m-shadow-xs hover:m-shadow-sm transition-all"
                    >
                      <div
                        className="w-14 h-14 rounded-xl flex-shrink-0"
                        style={{ background: "linear-gradient(135deg,#FFE5D6,#E0F7F8)" }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="px-2 py-0.5 rounded-full bg-[var(--color-m-amber-100)] text-[var(--color-m-amber-500)] text-[10px] font-bold">
                            Siap Kirim
                          </span>
                        </div>
                        <div className="text-[13px] font-bold text-[var(--color-m-ink-900)] truncate">
                          {item?.title}
                        </div>
                        <div className="text-[11px] text-[var(--color-m-ink-500)] mt-0.5 inline-flex items-center gap-1">
                          <IconClock size={11} /> Bayar {order.paidAt?.split(" ")[0]}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[13px] font-extrabold text-[var(--color-m-ink-900)] m-tnum">
                          {formatRupiahShort(order.itemPrice)}
                        </div>
                        <div className="mt-1 px-3 py-1 rounded-lg bg-[var(--color-m-orange-500)] text-white text-[11px] font-bold">
                          Input Resi
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </section>
        )}

        {/* My listings */}
        <section className="px-5 pb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)]">Listing Saya</h2>
            <Link href="/marketplace/me/listings" className="text-[12px] font-semibold text-[var(--color-m-orange-600)] inline-flex items-center gap-0.5">
              Kelola <IconChevronRight size={14} />
            </Link>
          </div>
          <div className="space-y-2">
            {myListings.map((listing) => (
              <Link
                key={listing.id}
                href={`/marketplace/me/listings/${listing.id}`}
                className="flex items-center gap-3 p-3 bg-[var(--color-m-paper)] rounded-2xl m-shadow-xs hover:m-shadow-sm transition-all"
              >
                <div
                  className="w-14 h-14 rounded-xl flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#FFE5D6,#E0F7F8)" }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-bold text-[var(--color-m-ink-900)] truncate">
                    {listing.title}
                  </div>
                  <div className="text-[14px] font-extrabold text-[var(--color-m-orange-600)] m-tnum mt-0.5">
                    {formatRupiah(listing.price)}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[var(--color-m-ink-500)] mt-1">
                    <span>👁 {listing.views}</span>
                    <span>♡ {listing.wishlistCount}</span>
                    <span>· {listing.postedAgo}</span>
                  </div>
                </div>
                <IconChevronRight size={18} className="text-[var(--color-m-ink-400)]" />
              </Link>
            ))}
          </div>
        </section>

        {/* Tip card */}
        <section className="px-5 pb-6">
          <div className="rounded-2xl p-4 bg-gradient-to-br from-[var(--color-m-teal-100)] to-[var(--color-m-orange-100)] border border-[var(--color-m-teal-100)]">
            <div className="text-[12px] font-bold text-[var(--color-m-teal-600)] uppercase tracking-wider mb-1">
              💡 Tips
            </div>
            <p className="text-[13px] text-[var(--color-m-ink-800)] leading-relaxed">
              Foto sepeda dari samping dengan cahaya pagi cenderung dapat <b>3× lebih banyak klik</b>. Coba update foto listing yang sudah lama.
            </p>
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  );
}

function QuickAction({
  icon,
  label,
  href,
  accent,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  accent?: boolean;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      className="bg-[var(--color-m-paper)] rounded-2xl p-3 flex flex-col items-center gap-1.5 m-shadow-xs hover:m-shadow-sm transition-all relative"
    >
      <span
        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          accent
            ? "bg-[var(--color-m-orange-500)] text-white"
            : "bg-[var(--color-m-orange-100)] text-[var(--color-m-orange-600)]"
        }`}
      >
        {icon}
      </span>
      <span className="text-[11px] font-bold text-[var(--color-m-ink-800)]">{label}</span>
      {badge && badge > 0 && (
        <span className="absolute top-2 right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--color-m-red-500)] text-white text-[10px] font-bold flex items-center justify-center">
          {badge}
        </span>
      )}
    </Link>
  );
}

function Stat({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <div className="bg-[var(--color-m-paper)] rounded-2xl p-3 m-shadow-xs">
      <div className="text-[11px] text-[var(--color-m-ink-500)] font-medium">{label}</div>
      <div className="flex items-baseline gap-1.5 mt-0.5">
        <span className="text-[20px] font-extrabold text-[var(--color-m-ink-900)] m-tnum tracking-tight">
          {value}
        </span>
        {delta && (
          <span className="text-[10px] font-bold text-[var(--color-m-green-500)]">{delta}</span>
        )}
      </div>
    </div>
  );
}
