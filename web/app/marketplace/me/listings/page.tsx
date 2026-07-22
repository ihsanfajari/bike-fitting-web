import Link from "next/link";
import { redirect } from "next/navigation";
import { PageTopBar } from "../../_components/TopBar";
import { BottomNav } from "../../_components/BottomNav";
import { IconChevronRight, IconPlus, IconCamera, IconEye, IconHeart } from "../../_components/icons";
import { formatRupiah } from "@/lib/format";
import { Badge, ButtonLink, EmptyState } from "@/components/ui";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { getMyListings } from "@/lib/listings/queries";

const STATUS_TONE: Record<string, { label: string; tone: "green" | "amber" | "gray" | "orange" }> = {
  active: { label: "Aktif", tone: "green" },
  paused: { label: "Dijeda", tone: "amber" },
  sold: { label: "Terjual", tone: "gray" },
  draft: { label: "Draft", tone: "orange" },
  removed: { label: "Dihapus", tone: "gray" },
  rejected: { label: "Ditolak", tone: "gray" },
};

function relativeTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} menit lalu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} hari lalu`;
  return date.toLocaleDateString("id-ID");
}

export default async function MyListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: "active" | "draft" | "paused" | "sold" }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/marketplace/sign-in");

  const { tab = "active" } = await searchParams;

  const myListings = await getMyListings(user.id);
  const counts = {
    active: myListings.filter((l) => l.status === "active").length,
    draft: myListings.filter((l) => l.status === "draft").length,
    paused: myListings.filter((l) => l.status === "paused").length,
    sold: myListings.filter((l) => l.status === "sold").length,
  };

  const filtered = myListings.filter((l) => l.status === tab);

  return (
    <>
      <PageTopBar
        title="Listing Saya"
        backHref="/marketplace/me"
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
        <div className="sticky top-14 z-20 bg-[var(--color-m-cream)] border-b border-[var(--color-m-ink-100)]">
          <div className="flex px-2">
            {(
              [
                { key: "active", label: "Aktif", count: counts.active },
                { key: "draft", label: "Draft", count: counts.draft },
                { key: "paused", label: "Dijeda", count: counts.paused },
                { key: "sold", label: "Terjual", count: counts.sold },
              ] as const
            ).map(({ key, label, count }) => {
              const active = tab === key;
              return (
                <Link
                  key={key}
                  href={`/marketplace/me/listings?tab=${key}`}
                  className={`flex-1 py-3 text-center text-[12px] font-semibold border-b-2 transition-colors ${
                    active ? "text-[var(--color-m-orange-600)] border-[var(--color-m-orange-500)]" : "text-[var(--color-m-ink-500)] border-transparent"
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
            description={
              tab === "draft"
                ? "Mulai bikin listing dan biarkan saja kalau belum siap publish — draft tersimpan otomatis."
                : "Mulai jual sepedamu dalam 5 menit. Audiensnya komunitas yang paham nilai sepedamu."
            }
            action={
              <ButtonLink href="/marketplace/sell" size="md">
                Jual Sepedaku
              </ButtonLink>
            }
            className="mt-8"
          />
        ) : (
          <div className="px-5 pt-4 space-y-3">
            {filtered.map((listing) => {
              const cover = listing.photos[0]?.url;
              const isDraft = listing.status === "draft";
              const href = isDraft
                ? `/marketplace/sell/preview?id=${listing.id}`
                : `/marketplace/me/listings/${listing.id}`;
              return (
                <Link
                  key={listing.id}
                  href={href}
                  className="flex items-center gap-3 p-3 bg-[var(--color-m-paper)] rounded-2xl m-shadow-xs hover:m-shadow-sm transition-all"
                >
                  {cover ? (
                    <img src={cover} alt="" className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center text-[var(--color-m-ink-400)]" style={{ background: "linear-gradient(135deg,#FFE5D6,#E0F7F8)" }}>
                      <IconCamera size={20} />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Badge tone={STATUS_TONE[listing.status]?.tone ?? "gray"} className="px-2 py-0.5 text-[10px]">
                        {STATUS_TONE[listing.status]?.label ?? listing.status}
                      </Badge>
                    </div>
                    <div className="text-[13px] font-bold text-[var(--color-m-ink-900)] truncate leading-snug">
                      {listing.title}
                    </div>
                    <div className="text-[14px] font-extrabold text-[var(--color-m-orange-600)] m-tnum mt-0.5">
                      {Number(listing.price) > 0 ? formatRupiah(Number(listing.price)) : "—"}
                    </div>
                    <div className="flex items-center gap-2.5 mt-1 text-[11px] text-[var(--color-m-ink-500)]">
                      <span className="inline-flex items-center gap-1"><IconEye size={13} /> {listing.viewCount}</span>
                      <span className="inline-flex items-center gap-1"><IconHeart size={13} /> {listing._count.wishlists}</span>
                      <span>· {relativeTime(listing.updatedAt)}</span>
                    </div>
                  </div>
                  <IconChevronRight size={18} className="text-[var(--color-m-ink-400)] flex-shrink-0" />
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
