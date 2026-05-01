"use client";

import Link from "next/link";
import { use, useState } from "react";
import { TopBar } from "../../_components/TopBar";
import { PhotoPlaceholder } from "../../_components/ui";
import { CHAT_MESSAGES, CHAT_THREADS, getListing, getSeller } from "../../_lib/mock-data";
import { formatRupiah } from "../../_lib/format";
import { IconAttach, IconSend } from "../../_components/icons";

const QUICK_REPLIES = [
  "Apakah masih tersedia?",
  "Bisa nego?",
  "Bisa COD?",
  "Minta foto tambahan dong",
];

export default function ChatThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(CHAT_MESSAGES[id] ?? []);

  const thread = CHAT_THREADS.find((t) => t.id === id);
  const listing = thread ? getListing(thread.listingId) : undefined;
  const other = thread ? getSeller(thread.otherUserId) : undefined;

  const send = () => {
    if (!draft.trim()) return;
    setMessages([
      ...messages,
      { id: `local-${Date.now()}`, threadId: id, senderId: "me", body: draft, time: "sekarang" },
    ]);
    setDraft("");
  };

  return (
    <>
      <TopBar
        back
        title={other?.name ?? "Chat"}
        right={
          other?.lastActive === "online" ? (
            <span className="text-[10px] text-[var(--color-sp-green)] font-bold mr-2">Online</span>
          ) : null
        }
      />

      {/* Listing pinned card */}
      {listing && (
        <Link
          href={`/marketplace/listing/${listing.slug}`}
          className="flex gap-3 bg-[var(--color-sp-black)] text-white px-4 py-3 border-b-2 border-[var(--color-sp-red)]"
        >
          <PhotoPlaceholder className="w-14 h-14 flex-shrink-0" label="foto" />
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-bold leading-snug line-clamp-1">{listing.title}</div>
            <div className="sp-display text-[15px] font-extrabold text-[var(--color-sp-red)] mt-0.5">
              {formatRupiah(listing.price)}
            </div>
            <div className="text-[10px] text-[#b0b0b0]">{listing.city}</div>
          </div>
          <span className="sp-display text-[10px] font-bold uppercase tracking-wide text-[var(--color-sp-red)] self-center">
            Lihat →
          </span>
        </Link>
      )}

      <main className="flex-1 overflow-y-auto bg-[var(--color-sp-black-50)] p-4 space-y-3">
        <div className="text-center text-[10px] text-[var(--color-sp-black-400)] bg-[var(--color-sp-amber-tint)] border border-[#f0c040] px-3 py-2 sp-display font-bold uppercase tracking-wide">
          ⚠ Jangan transfer di luar rekber — dilindungi saat lewat SEPEDAIN
        </div>

        {messages.map((m) => {
          const mine = m.senderId === "me";
          return (
            <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] ${mine ? "items-end" : "items-start"} flex flex-col`}>
                <div
                  className={`px-3 py-2 text-[13px] leading-relaxed ${
                    mine
                      ? "bg-[var(--color-sp-red)] text-white"
                      : "bg-white text-[var(--color-sp-black)] border border-[var(--color-sp-black-100)]"
                  }`}
                >
                  {m.body}
                </div>
                <div className="text-[9px] text-[var(--color-sp-black-400)] mt-1 px-1">{m.time}</div>
              </div>
            </div>
          );
        })}
      </main>

      {/* Quick replies */}
      <div className="bg-white border-t border-[var(--color-sp-black-100)] px-4 py-2 flex gap-2 overflow-x-auto sp-no-scrollbar">
        {QUICK_REPLIES.map((r) => (
          <button
            key={r}
            onClick={() => setDraft(r)}
            className="sp-display text-[11px] font-bold whitespace-nowrap border border-[var(--color-sp-black-100)] px-3 py-1.5 hover:border-[var(--color-sp-red)] hover:text-[var(--color-sp-red)]"
          >
            {r}
          </button>
        ))}
      </div>

      {/* Composer */}
      <div className="bg-white border-t-2 border-[var(--color-sp-black)] px-3 py-2 flex items-center gap-2">
        <button className="p-2 text-[var(--color-sp-black-400)]" aria-label="Lampirkan">
          <IconAttach size={20} />
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Tulis pesan..."
          className="sp-body flex-1 border border-[var(--color-sp-black-100)] px-3 py-[10px] text-[13px] outline-none focus:border-[var(--color-sp-red)]"
        />
        <button
          onClick={send}
          disabled={!draft.trim()}
          className="w-10 h-10 bg-[var(--color-sp-red)] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[var(--color-sp-red-dark)]"
          aria-label="Kirim"
        >
          <IconSend size={18} />
        </button>
      </div>
    </>
  );
}
