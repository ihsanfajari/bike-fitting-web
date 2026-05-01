import Link from "next/link";
import { TopBar } from "../_components/TopBar";
import { BottomNav } from "../_components/BottomNav";
import { PhotoPlaceholder, SectionLabel } from "../_components/ui";
import { CHAT_THREADS, getListing, getSeller } from "../_lib/mock-data";
import { formatRupiah } from "../_lib/format";

export default function ChatInboxPage() {
  return (
    <>
      <TopBar title="Chat" />

      <main className="flex-1 bg-white">
        {CHAT_THREADS.length === 0 ? (
          <div className="text-center py-16 px-4">
            <SectionLabel className="mb-2">Belum ada chat</SectionLabel>
            <p className="text-[13px] text-[var(--color-sp-black-400)]">
              Mulai tanya-tanya dengan penjual dari halaman listing.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[var(--color-sp-black-100)]">
            {CHAT_THREADS.map((t) => {
              const listing = getListing(t.listingId);
              const other = getSeller(t.otherUserId);
              return (
                <li key={t.id}>
                  <Link
                    href={`/marketplace/chat/${t.id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-sp-black-50)]"
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 bg-[var(--color-sp-black)] text-white flex items-center justify-center sp-display font-extrabold text-[14px]">
                        {other?.avatar}
                      </div>
                      {other?.lastActive === "online" && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[var(--color-sp-green)] border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold text-[13px] truncate">{other?.name}</span>
                        <span className={`text-[10px] flex-shrink-0 ${t.unread > 0 ? "text-[var(--color-sp-red)] font-bold" : "text-[var(--color-sp-black-400)]"}`}>
                          {t.lastTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[var(--color-sp-black-400)] mb-0.5">
                        <span className="truncate">{listing?.title}</span>
                        <span className="text-[var(--color-sp-red)] font-bold flex-shrink-0">
                          {listing && formatRupiah(listing.price).replace("Rp ", "Rp")}
                        </span>
                      </div>
                      <div className={`text-[12px] truncate ${t.unread > 0 ? "font-bold text-[var(--color-sp-black)]" : "text-[var(--color-sp-black-600)]"}`}>
                        {t.lastMessage}
                      </div>
                    </div>
                    {t.unread > 0 && (
                      <div className="w-5 h-5 bg-[var(--color-sp-red)] text-white sp-display text-[10px] font-extrabold flex items-center justify-center rounded-full flex-shrink-0">
                        {t.unread}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </main>

      <BottomNav />
    </>
  );
}
