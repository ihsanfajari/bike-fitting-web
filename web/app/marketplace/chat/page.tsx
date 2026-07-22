import Link from "next/link";
import { CHAT_THREADS, LISTINGS, SELLERS } from "@/lib/mock/data";
import { BottomNav } from "../_components/BottomNav";
import { PageTopBar } from "../_components/TopBar";
import { IconChat, IconAlertTriangle } from "../_components/icons";

export default function ChatListPage() {
  return (
    <>
      <PageTopBar title="Chat" />

      <main className="flex-1 bg-[var(--color-m-cream)]">
        {CHAT_THREADS.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-8">
            <div className="mb-3 text-[var(--color-m-orange-400)]"><IconChat size={44} /></div>
            <div className="text-[16px] font-extrabold text-[var(--color-m-ink-900)] mb-1">Belum ada chat</div>
            <p className="text-[13px] text-[var(--color-m-ink-500)] leading-relaxed">
              Chat dengan penjual langsung dari halaman listing.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[var(--color-m-ink-100)] bg-[var(--color-m-paper)]">
            {CHAT_THREADS.map((thread) => {
              const listing = LISTINGS.find((l) => l.id === thread.listingId);
              const seller = SELLERS.find((s) => s.id === thread.otherUserId);

              return (
                <Link
                  key={thread.id}
                  href={`/marketplace/chat/${thread.id}`}
                  className="flex items-center gap-3 px-4 py-4 hover:bg-[var(--color-m-ink-50)] transition-colors"
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-m-orange-300)] to-[var(--color-m-orange-500)] flex items-center justify-center text-white font-bold text-[14px]">
                      {seller?.avatar ?? "?"}
                    </div>
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[var(--color-m-green-500)] border-2 border-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="text-[14px] font-bold text-[var(--color-m-ink-900)] truncate">
                        {seller?.name ?? thread.otherUserId}
                      </div>
                      <div className="text-[11px] text-[var(--color-m-ink-400)] flex-shrink-0">{thread.lastTime}</div>
                    </div>
                    <div className="text-[12px] text-[var(--color-m-ink-400)] mt-0.5 truncate italic">
                      {listing?.title}
                    </div>
                    <div className={`text-[13px] mt-0.5 truncate ${thread.unread > 0 ? "font-bold text-[var(--color-m-ink-900)]" : "text-[var(--color-m-ink-500)]"}`}>
                      {thread.lastMessage}
                    </div>
                  </div>

                  {/* Unread badge */}
                  {thread.unread > 0 && (
                    <div className="w-5 h-5 rounded-full bg-[var(--color-m-orange-500)] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {thread.unread}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        )}

        {/* Info safe chat */}
        <div className="px-5 py-5">
          <div className="p-3.5 rounded-xl bg-[var(--color-m-amber-100)]/60 border border-[var(--color-m-amber-100)] flex gap-2.5">
            <IconAlertTriangle size={18} className="flex-shrink-0 mt-0.5 text-[var(--color-m-amber-500)]" />
            <p className="text-[12px] text-[var(--color-m-ink-700)] leading-relaxed">
              <b>Selalu gunakan rekber GowesFit</b> untuk transaksi. Jangan transfer langsung — GowesFit tidak menjamin transaksi di luar platform.
            </p>
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
