import { notFound } from "next/navigation";
import Link from "next/link";
import { CHAT_MESSAGES, CHAT_THREADS, LISTINGS, SELLERS } from "@/lib/mock/data";
import { formatRupiah } from "@/lib/format";
import { IconChevronLeft, IconSend, IconAlertTriangle, IconPaperclip } from "../../_components/icons";

export default async function ChatDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const thread = CHAT_THREADS.find((t) => t.id === id);
  if (!thread) notFound();

  const listing = LISTINGS.find((l) => l.id === thread.listingId);
  const seller = SELLERS.find((s) => s.id === thread.otherUserId);
  const messages = CHAT_MESSAGES[id] ?? [];

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="bg-[var(--color-m-paper)] border-b border-[var(--color-m-ink-100)] px-4 py-3 flex items-center gap-3 sticky top-0 z-20">
        <Link href="/marketplace/chat" className="text-[var(--color-m-ink-700)] flex-shrink-0">
          <IconChevronLeft size={22} />
        </Link>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-m-orange-300)] to-[var(--color-m-orange-500)] flex items-center justify-center text-white font-bold text-[13px] flex-shrink-0">
          {seller?.avatar ?? "?"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-bold text-[var(--color-m-ink-900)] truncate">{seller?.name ?? thread.otherUserId}</div>
          <div className="text-[11px] text-[var(--color-m-green-500)] font-semibold">{seller?.lastActive ?? "Aktif"}</div>
        </div>
        {listing && (
          <Link
            href={`/marketplace/listing/${listing.slug}`}
            className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--color-m-ink-100)] bg-[var(--color-m-ink-50)]"
          >
            <div
              className="w-8 h-8 rounded-lg flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#FFE5D6,#E0F7F8)" }}
            />
            <div className="min-w-0">
              <div className="text-[10px] text-[var(--color-m-ink-500)] truncate max-w-[80px]">{listing.title}</div>
              <div className="text-[11px] font-bold text-[var(--color-m-orange-600)] m-tnum">{formatRupiah(listing.price)}</div>
            </div>
          </Link>
        )}
      </div>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[var(--color-m-cream)]">
        {/* Date separator */}
        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-[var(--color-m-ink-100)]" />
          <span className="text-[11px] text-[var(--color-m-ink-400)] font-medium">Hari ini</span>
          <div className="flex-1 h-px bg-[var(--color-m-ink-100)]" />
        </div>

        {messages.map((msg) => {
          const isMe = msg.senderId === "me";
          return (
            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] ${isMe ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div
                  className={`px-4 py-2.5 rounded-2xl text-[14px] leading-snug ${
                    isMe
                      ? "bg-[var(--color-m-orange-500)] text-white rounded-br-sm"
                      : "bg-[var(--color-m-paper)] text-[var(--color-m-ink-900)] rounded-bl-sm m-shadow-xs"
                  }`}
                >
                  {msg.body}
                </div>
                <div className={`text-[10px] text-[var(--color-m-ink-400)] px-1 ${isMe ? "text-right" : "text-left"}`}>
                  {msg.time}
                </div>
              </div>
            </div>
          );
        })}

        {/* Safe chat reminder */}
        <div className="mx-2 p-3 rounded-xl bg-[var(--color-m-amber-100)]/60 text-[11px] text-[var(--color-m-ink-700)] leading-relaxed flex items-center justify-center gap-1.5 text-center">
          <IconAlertTriangle size={14} className="flex-shrink-0 text-[var(--color-m-amber-500)]" /> Transaksi aman wajib lewat rekber GowesFit. Jangan transfer langsung.
        </div>
      </main>

      {/* Input bar */}
      <div className="bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-3 py-3 flex items-end gap-2 sticky bottom-0">
        <button aria-label="Lampirkan foto" className="w-10 h-10 rounded-xl bg-[var(--color-m-ink-50)] flex items-center justify-center text-[var(--color-m-ink-600)] flex-shrink-0">
          <IconPaperclip size={20} />
        </button>
        <div className="flex-1 min-h-[40px] max-h-[120px] rounded-2xl border border-[var(--color-m-ink-200)] bg-[var(--color-m-ink-50)] px-4 py-2.5 focus-within:border-[var(--color-m-orange-400)] focus-within:ring-2 focus-within:ring-[var(--color-m-orange-100)]">
          <textarea
            rows={1}
            placeholder="Tulis pesan…"
            className="w-full bg-transparent text-[14px] text-[var(--color-m-ink-900)] placeholder-[var(--color-m-ink-300)] outline-none resize-none leading-snug"
          />
        </div>
        <button className="w-10 h-10 rounded-xl bg-[var(--color-m-orange-500)] flex items-center justify-center text-white flex-shrink-0">
          <IconSend size={18} />
        </button>
      </div>
    </div>
  );
}
