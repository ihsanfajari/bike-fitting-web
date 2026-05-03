import { notFound } from "next/navigation";
import { PageTopBar } from "../../_components/TopBar";
import { BottomNav } from "../../_components/BottomNav";
import { ListingCardGrid } from "../../_components/ListingCard";
import { IconCheck, IconChat, IconShield, IconStar } from "../../_components/icons";
import { LISTINGS } from "@/lib/mock/api";
import { getSeller } from "@/lib/mock/data";
import { Badge, Button, ButtonLink } from "@/components/ui";

export default async function SellerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const seller = getSeller(id);
  if (!seller) notFound();
  const sellerListings = LISTINGS.filter((l) => l.sellerId === id);
  const activeListings = sellerListings.filter((l) => l.status === "active");

  const reviews = [
    { id: "r1", buyer: "Rama P.", rating: 5, body: "Barang persis seperti foto, packing rapi banget pake double bubble wrap. Recommended seller!", time: "3 hari lalu" },
    { id: "r2", buyer: "Toni S.", rating: 5, body: "Penjual fast response, mau diskusi panjang sebelum deal. Sepeda kondisi sangat OK.", time: "2 minggu lalu" },
    { id: "r3", buyer: "Hendra W.", rating: 4, body: "Sepeda OK tapi ongkir agak lama. Overall puas.", time: "1 bulan lalu" },
  ];

  return (
    <>
      <PageTopBar title="Profil Penjual" backHref="/marketplace" />

      <main className="flex-1 pb-6 bg-[var(--color-m-cream)]">
        {/* Header */}
        <section className="bg-[var(--color-m-paper)] px-5 py-6 border-b border-[var(--color-m-ink-100)]">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-m-orange-400)] to-[var(--color-m-orange-600)] flex items-center justify-center text-white font-extrabold text-[24px] flex-shrink-0">
              {seller.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="text-[18px] font-extrabold text-[var(--color-m-ink-900)] truncate">{seller.name}</h1>
                {seller.verified && (
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--color-m-teal-500)] text-white flex-shrink-0">
                    <IconCheck size={12} />
                  </span>
                )}
              </div>
              <div className="text-[12px] text-[var(--color-m-ink-500)] mt-0.5">{seller.city}</div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <Badge tone="green">{seller.lastActive}</Badge>
                <Badge tone="gray">Sejak {seller.joinedYear}</Badge>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-2xl bg-[var(--color-m-cream)] p-3">
              <div className="text-[11px] text-[var(--color-m-ink-500)] font-medium">Rating</div>
              <div className="flex items-baseline justify-center gap-0.5 mt-1">
                <IconStar size={14} className="text-[var(--color-m-amber-500)]" />
                <span className="text-[16px] font-extrabold text-[var(--color-m-ink-900)] m-tnum">{seller.rating}</span>
              </div>
            </div>
            <div className="rounded-2xl bg-[var(--color-m-cream)] p-3">
              <div className="text-[11px] text-[var(--color-m-ink-500)] font-medium">Transaksi</div>
              <div className="text-[16px] font-extrabold text-[var(--color-m-ink-900)] m-tnum mt-1">{seller.txCount}</div>
            </div>
            <div className="rounded-2xl bg-[var(--color-m-cream)] p-3">
              <div className="text-[11px] text-[var(--color-m-ink-500)] font-medium">Review</div>
              <div className="text-[16px] font-extrabold text-[var(--color-m-ink-900)] m-tnum mt-1">{seller.reviewCount}</div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <ButtonLink href="/marketplace/chat/new" full size="md" leading={<IconChat size={16} />}>
              Chat Penjual
            </ButtonLink>
            <Button variant="ghost" size="md" className="px-5">
              Ikuti
            </Button>
          </div>
        </section>

        {/* Trust mini-card */}
        <section className="px-5 py-4">
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[var(--color-m-green-100)]/60">
            <IconShield size={20} className="text-[var(--color-m-green-500)] flex-shrink-0 mt-0.5" />
            <p className="text-[12px] text-[var(--color-m-ink-700)] leading-relaxed">
              Semua transaksi dengan penjual ini otomatis pakai rekber. Dana baru cair setelah barang diterima dan OK.
            </p>
          </div>
        </section>

        {/* Listings */}
        <section className="px-5 pb-4">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-3">
            Listing aktif ({activeListings.length})
          </h2>
          {activeListings.length === 0 ? (
            <p className="text-[13px] text-[var(--color-m-ink-500)] py-4 text-center">Belum ada listing aktif</p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {activeListings.map((l) => (
                <ListingCardGrid key={l.id} listing={l} />
              ))}
            </div>
          )}
        </section>

        {/* Reviews */}
        <section className="px-5 pb-6">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-3">
            Review pembeli ({reviews.length})
          </h2>
          <div className="space-y-2">
            {reviews.map((r) => (
              <div key={r.id} className="bg-[var(--color-m-paper)] rounded-2xl p-4 m-shadow-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] font-bold text-[var(--color-m-ink-900)]">{r.buyer}</span>
                  <div className="flex items-center gap-0.5 text-[var(--color-m-amber-500)]">
                    {[...Array(5)].map((_, i) => (
                      <IconStar key={i} size={12} className={i < r.rating ? "" : "opacity-25"} />
                    ))}
                  </div>
                </div>
                <p className="text-[13px] text-[var(--color-m-ink-700)] leading-relaxed">{r.body}</p>
                <div className="text-[11px] text-[var(--color-m-ink-400)] mt-2">{r.time}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  );
}
