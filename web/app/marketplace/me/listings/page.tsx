import Link from "next/link";
import { PageTopBar } from "../../_components/TopBar";
import { BottomNav } from "../../_components/BottomNav";
import { IconChevronRight, IconPlus } from "../../_components/icons";
import { LISTINGS } from "@/lib/mock/api";
import { formatRupiah } from "@/lib/format";
import { Badge, ButtonLink, EmptyState } from "@/components/ui";

const STATUS_TONE = {
  active: { label: "Aktif", tone: "green" as const },
  paused: { label: "Dijeda", tone: "amber" as const },
  sold: { label: "Terjual", tone: "gray" as const },
};

export default async function MyListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: "active" | "paused" | "sold" }>;
}) {
  const { tab = "active" } = await searchParams;
  const myListings = LISTINGS.slice(0, 5);
  const counts = {
    active: myListings.filter((l) => l.status === "active").length,
    paused: myListings.filter((l) => l.status === "paused").length,
    sold: myListings.filter((l) => l.status === "sold").length,
  };
  const filtered = myListings.filter((l) => (tab === "active" ? l.status === "active" : l.status === tab));

  return (
    <>
      <PageTopBar
        title="Listing Saya"
        backHref="/marketplace/dashboard"
        action={
          <Link
            href="/marketplace/sell"
            className="inline-flex items-center gap-1 px-3 h-9 rounded-full bg-[var(--color-m-orange-500)] text-white text-[12px] font-bold m-shadow-cta"
          >
            <IconPlus size={14} /> Listing
          </Link>
        }
      />

      <main className="flex-1 pb-6 bg-[var(--color-m-cream)]">
        {/* Tabs */}
        <div className="sticky top-14 z-20 bg-[var(--color-m-cream)] border-b border-[var(--color-m-ink-100)]">
          <div className="flex px-2">
            {(
              [
                { key: "active", label: "Aktif", count: counts.active },
                { key: "paused", label: "Dijeda", count: counts.paused },
                { key: "sold", label: "Terjual", count: counts.sold },
              ] as const
            ).map(({ key, label, count }) => {
              const active = tab === key;
              return (
                <Link
                  key={key}
                  href={`/marketplace/me/listings?tab=${key}`}
                  className={`flex-1 py-3 text-center text-[13px] font-semibold border-b-2 transition-colors ${
                    active
                      ? "text-[var(--color-m-orange-600)] border-[var(--color-m-orange-500)]"
                      : "text-[var(--color-m-ink-500)] border-transparent"
                  }`}
                >
                  {label} <span className={active ? "text-[var(--color-m-orange-500)]" : "text-[var(--color-m-ink-400)]"}>({count})</span>
                </Link>
              );
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={<IconPlus size={26} />}
            title="Belum ada listing di tab ini"
            description="Mulai jual sepedamu dalam 5 menit. Audiensnya komunitas yang paham nilai sepedamu."
            action={
              <ButtonLink href="/marketplace/sell" size="md">
                Jual Sepedaku
              </ButtonLink>
            }
            className="mt-8"
          />
        ) : (
          <div className="px-5 pt-4 space-y-3">
            {filtered.map((listing) => (
              <Link
                key={listing.id}
                href={`/marketplace/me/listings/${listing.id}`}
                className="flex items-center gap-3 p-3 bg-[var(--color-m-paper)] rounded-2xl m-shadow-xs hover:m-shadow-sm transition-all"
              >
                <div
                  className="w-16 h-16 rounded-xl flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#FFE5D6,#E0F7F8)" }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Badge tone={STATUS_TONE[listing.status].tone} className="px-2 py-0.5 text-[10px]">
                      {STATUS_TONE[listing.status].label}
                    </Badge>
                  </div>
                  <div className="text-[13px] font-bold text-[var(--color-m-ink-900)] truncate leading-snug">
                    {listing.title}
                  </div>
                  <div className="text-[14px] font-extrabold text-[var(--color-m-orange-600)] m-tnum mt-0.5">
                    {formatRupiah(listing.price)}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-[var(--color-m-ink-500)]">
                    <span>👁 {listing.views}</span>
                    <span>♡ {listing.wishlistCount}</span>
                    <span>· {listing.postedAgo}</span>
                  </div>
                </div>
                <IconChevronRight size={18} className="text-[var(--color-m-ink-400)] flex-shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </>
  );
}
