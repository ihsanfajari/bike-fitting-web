import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ListingActions } from "./ListingActions";

const ACTION_LABEL: Record<string, string> = {
  pause_listing: "⏸ Pause",
  unpause_listing: "▶ Unpause",
  remove_listing: "🗑 Remove",
};

const HIGH_VALUE_THRESHOLD = BigInt(20_000_000);

export default async function AdminListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await prisma.listing.findUnique({
    where: { id },
    include: {
      seller: { select: { id: true, fullName: true, email: true, phone: true, phoneVerifiedAt: true, accountStatus: true } },
      category: { select: { name: true, slug: true } },
      photos: { orderBy: { sortOrder: "asc" } },
      _count: { select: { orders: true, wishlists: true, conversations: true } },
    },
  });
  if (!listing) notFound();

  const recentActions = await prisma.adminActionLog.findMany({
    where: { targetType: "listing", targetId: id },
    orderBy: { createdAt: "desc" },
    take: 20,
    include: { admin: { select: { fullName: true } } },
  });

  const isHighValue = listing.status === "active" && listing.price >= HIGH_VALUE_THRESHOLD;
  const priceNum = Number(listing.price);

  return (
    <div>
      <div className="mb-5">
        <Link href="/admin/listings" className="text-[12px] text-slate-500 hover:text-slate-700">← Kembali ke Listings</Link>
        <h1 className="mt-1 text-[24px] font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
          {listing.title}
          {isHighValue && (
            <span title="Harga di atas Rp 20jt — perlu review manual" className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500 text-white">
              🚩 HIGH VALUE
            </span>
          )}
        </h1>
        <p className="text-[13px] text-slate-500 mt-0.5">
          {listing.category.name} ·
          {listing.slug ? (
            <Link href={`/marketplace/listing/${listing.slug}`} target="_blank" className="ml-1 text-blue-600 hover:underline">
              Lihat di marketplace ↗
            </Link>
          ) : (
            <span className="ml-1">Belum ada slug (draft)</span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 space-y-5">
          {listing.photos.length > 0 && (
            <section className="bg-white rounded-xl p-5 border border-slate-200">
              <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate-500 mb-3">Foto ({listing.photos.length})</h2>
              <div className="grid grid-cols-4 gap-2">
                {listing.photos.map((p) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={p.id} src={p.thumbnailUrl ?? p.url} alt="" className="aspect-square w-full object-cover rounded-lg border border-slate-200" />
                ))}
              </div>
            </section>
          )}

          <section className="bg-white rounded-xl p-5 border border-slate-200">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate-500 mb-3">Detail Listing</h2>
            <dl className="grid grid-cols-2 gap-y-2.5 text-[13px]">
              <dt className="text-slate-500">ID</dt><dd className="font-mono text-[11px] text-slate-700">{listing.id}</dd>
              <dt className="text-slate-500">Harga</dt>
              <dd className="text-slate-900 font-bold">
                Rp {priceNum.toLocaleString("id-ID")}
                {listing.isNegotiable && <span className="ml-1 text-[11px] font-normal text-slate-500">(nego)</span>}
              </dd>
              <dt className="text-slate-500">Brand / Model</dt><dd className="text-slate-900">{listing.brand ?? "—"} {listing.model ? `/ ${listing.model}` : ""}</dd>
              <dt className="text-slate-500">Tahun</dt><dd className="text-slate-900">{listing.year ?? "—"}</dd>
              <dt className="text-slate-500">Kondisi</dt><dd className="text-slate-900">{listing.condition}</dd>
              <dt className="text-slate-500">Material</dt><dd className="text-slate-900">{listing.frameMaterial ?? "—"}</dd>
              <dt className="text-slate-500">Frame Size</dt><dd className="text-slate-900">{listing.frameSize ?? "—"}</dd>
              <dt className="text-slate-500">Groupset</dt><dd className="text-slate-900">{listing.groupset ?? "—"}</dd>
              <dt className="text-slate-500">Lokasi</dt><dd className="text-slate-900">{listing.city}, {listing.province}</dd>
              <dt className="text-slate-500">COD</dt><dd className="text-slate-900">{listing.allowCod ? "Ya" : "Tidak"}</dd>
              <dt className="text-slate-500">Status</dt>
              <dd>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  listing.status === "active" ? "bg-green-100 text-green-700" :
                  listing.status === "paused" ? "bg-amber-100 text-amber-700" :
                  listing.status === "draft" ? "bg-slate-100 text-slate-700" :
                  listing.status === "sold" ? "bg-blue-100 text-blue-700" :
                  "bg-red-100 text-red-700"
                }`}>{listing.status}</span>
                {listing.deletedAt && <span className="ml-2 text-[11px] text-red-600 font-semibold">deleted {listing.deletedAt.toLocaleDateString("id-ID")}</span>}
              </dd>
              <dt className="text-slate-500">Dibuat</dt><dd className="text-slate-900">{listing.createdAt.toLocaleString("id-ID")}</dd>
              <dt className="text-slate-500">Published</dt><dd className="text-slate-900">{listing.publishedAt?.toLocaleString("id-ID") ?? "—"}</dd>
              <dt className="text-slate-500">Sold</dt><dd className="text-slate-900">{listing.soldAt?.toLocaleString("id-ID") ?? "—"}</dd>
            </dl>
            {listing.description && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Deskripsi</div>
                <p className="text-[13px] text-slate-700 whitespace-pre-wrap">{listing.description}</p>
              </div>
            )}
          </section>

          <section className="bg-white rounded-xl p-5 border border-slate-200">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate-500 mb-3">Aktivitas</h2>
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="rounded-lg bg-slate-50 p-3"><div className="text-[20px] font-extrabold text-slate-900 tabular-nums">{listing.viewCount}</div><div className="text-[11px] text-slate-500">Views</div></div>
              <div className="rounded-lg bg-slate-50 p-3"><div className="text-[20px] font-extrabold text-slate-900 tabular-nums">{listing.wishlistCount}</div><div className="text-[11px] text-slate-500">Wishlist</div></div>
              <div className="rounded-lg bg-slate-50 p-3"><div className="text-[20px] font-extrabold text-slate-900 tabular-nums">{listing._count.conversations}</div><div className="text-[11px] text-slate-500">Chat</div></div>
              <div className="rounded-lg bg-slate-50 p-3"><div className="text-[20px] font-extrabold text-slate-900 tabular-nums">{listing._count.orders}</div><div className="text-[11px] text-slate-500">Orders</div></div>
            </div>
          </section>

          <section className="bg-white rounded-xl p-5 border border-slate-200">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate-500 mb-3">Riwayat Tindakan Admin</h2>
            {recentActions.length === 0 ? (
              <p className="text-[12px] text-slate-400 italic">Belum ada tindakan admin pada listing ini.</p>
            ) : (
              <div className="space-y-2">
                {recentActions.map((a) => (
                  <div key={a.id} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                    <span className="text-[13px] font-semibold text-slate-900 flex-shrink-0">
                      {ACTION_LABEL[a.action] ?? a.action}
                    </span>
                    <div className="flex-1 text-[12px] text-slate-600">
                      {a.reason && <div>{a.reason}</div>}
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        oleh {a.admin.fullName} · {a.createdAt.toLocaleString("id-ID")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="space-y-5">
          <section className="bg-white rounded-xl p-5 border border-slate-200">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate-500 mb-3">Tindakan</h2>
            <ListingActions
              listingId={listing.id}
              status={listing.status}
              deleted={listing.deletedAt !== null}
            />
          </section>

          <section className="bg-white rounded-xl p-5 border border-slate-200">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-slate-500 mb-3">Penjual</h2>
            <div className="space-y-2 text-[13px]">
              <Link href={`/admin/users/${listing.seller.id}`} className="block font-bold text-slate-900 hover:underline">
                {listing.seller.fullName} →
              </Link>
              <div className="text-[12px] text-slate-600">{listing.seller.email}</div>
              <div className="text-[12px] text-slate-600">
                {listing.seller.phone ?? "—"}
                {listing.seller.phoneVerifiedAt ? (
                  <span className="ml-2 text-[11px] font-bold text-green-600">✓</span>
                ) : (
                  <span className="ml-2 text-[11px] font-bold text-amber-600">⏳</span>
                )}
              </div>
              <div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  listing.seller.accountStatus === "active" ? "bg-green-100 text-green-700" :
                  listing.seller.accountStatus === "suspended" ? "bg-amber-100 text-amber-700" :
                  "bg-red-100 text-red-700"
                }`}>{listing.seller.accountStatus}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
