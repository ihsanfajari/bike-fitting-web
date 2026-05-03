import { PageTopBar } from "../_components/TopBar";
import { BottomNav } from "../_components/BottomNav";
import { ListingCardGrid } from "../_components/ListingCard";
import { LISTINGS } from "@/lib/mock/api";
import { ButtonLink, EmptyState } from "@/components/ui";

export default function WishlistPage() {
  const wishlist = LISTINGS.slice(0, 4);

  return (
    <>
      <PageTopBar title="Wishlist" backHref="/marketplace" />

      <main className="flex-1 pb-6 bg-[var(--color-m-cream)]">
        {wishlist.length === 0 ? (
          <EmptyState
            icon={<span className="text-2xl">♡</span>}
            title="Wishlist masih kosong"
            description="Tap ikon hati di listing yang kamu suka — kami simpan supaya gampang dicari nanti."
            action={
              <ButtonLink href="/marketplace" size="md">
                Mulai Cari
              </ButtonLink>
            }
            className="mt-8"
          />
        ) : (
          <>
            <section className="px-5 pt-4 pb-2">
              <p className="text-[13px] text-[var(--color-m-ink-600)]">
                {wishlist.length} sepeda tersimpan. Penjual akan melihat seberapa diminati listing-nya.
              </p>
            </section>

            <section className="px-5 pb-4">
              <div className="grid grid-cols-2 gap-3">
                {wishlist.map((l) => (
                  <ListingCardGrid key={l.id} listing={l} />
                ))}
              </div>
            </section>

            <section className="px-5 pb-6">
              <div className="rounded-2xl p-4 bg-gradient-to-br from-[var(--color-m-teal-100)] to-[var(--color-m-orange-100)] border border-[var(--color-m-teal-100)]">
                <div className="text-[12px] font-bold text-[var(--color-m-teal-600)] uppercase tracking-wider mb-1">
                  💡 Tips
                </div>
                <p className="text-[13px] text-[var(--color-m-ink-800)] leading-relaxed">
                  Aktifkan notifikasi harga turun supaya kamu tidak kelewat penawaran terbaik dari listing yang kamu suka.
                </p>
              </div>
            </section>
          </>
        )}
      </main>

      <BottomNav />
    </>
  );
}
