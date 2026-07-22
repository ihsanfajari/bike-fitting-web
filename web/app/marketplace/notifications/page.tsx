import type { ComponentType } from "react";
import Link from "next/link";
import { PageTopBar } from "../_components/TopBar";
import { IconTruck, IconChat, IconBag, IconCheck, IconStar, IconEye, IconGift } from "../_components/icons";

type IconComp = ComponentType<{ size?: number; className?: string }>;
type Tone = "teal" | "orange" | "green" | "amber";

type Notification = {
  id: string;
  icon: IconComp;
  tone: Tone;
  title: string;
  body: string;
  time: string;
  href: string;
  unread: boolean;
};

const TONE_CLASS: Record<Tone, string> = {
  teal: "bg-[var(--color-m-teal-100)] text-[var(--color-m-teal-600)]",
  orange: "bg-[var(--color-m-orange-100)] text-[var(--color-m-orange-600)]",
  green: "bg-[var(--color-m-green-100)] text-[var(--color-m-green-500)]",
  amber: "bg-[var(--color-m-amber-100)] text-[var(--color-m-amber-500)]",
};

const NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    icon: IconTruck,
    tone: "teal",
    title: "Paket dalam perjalanan",
    body: "Trek Domane SL5 2022 sedang dalam pengiriman JNE YES. Resi: JNE9283746592",
    time: "10 menit lalu",
    href: "/marketplace/orders/o1",
    unread: true,
  },
  {
    id: "n2",
    icon: IconChat,
    tone: "orange",
    title: "Pesan baru dari Toko Sepeda Kita",
    body: "\"Nego 30jt gimana kak? Udah include ongkir\"",
    time: "Kemarin 16:45",
    href: "/marketplace/chat/t2",
    unread: true,
  },
  {
    id: "n3",
    icon: IconBag,
    tone: "orange",
    title: "Pesananmu sedang diproses",
    body: "Penjual sudah menerima pesanan Trek Domane SL5. Menunggu pengiriman dalam 2×24 jam.",
    time: "Kemarin 14:55",
    href: "/marketplace/orders/o1",
    unread: false,
  },
  {
    id: "n4",
    icon: IconCheck,
    tone: "green",
    title: "Pembayaran berhasil",
    body: "Pembayaran ORD-20260424-0001 sebesar Rp22.414.000 via BCA Virtual Account berhasil diterima.",
    time: "Kemarin 14:55",
    href: "/marketplace/orders/o1",
    unread: false,
  },
  {
    id: "n5",
    icon: IconStar,
    tone: "amber",
    title: "Review baru untuk listing kamu",
    body: "Buyer meninggalkan review bintang 5 untuk Fulcrum Racing 5 DB. Terima kasih!",
    time: "2 hari lalu",
    href: "/marketplace/dashboard",
    unread: false,
  },
  {
    id: "n6",
    icon: IconEye,
    tone: "teal",
    title: "Listing kamu semakin populer",
    body: "Specialized Rockhopper Elite sudah dilihat 200+ orang minggu ini. Pertahankan harga kompetitif!",
    time: "3 hari lalu",
    href: "/marketplace/me/listings",
    unread: false,
  },
  {
    id: "n7",
    icon: IconGift,
    tone: "green",
    title: "Transaksi selesai",
    body: "Fulcrum Racing 5 DB Wheelset dinyatakan selesai. Dana Rp3.277.000 telah masuk ke saldo kamu.",
    time: "7 hari lalu",
    href: "/marketplace/orders/o3",
    unread: false,
  },
];

export default function NotificationsPage() {
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <>
      <PageTopBar title="Notifikasi" backHref="/marketplace/me" />

      <main className="flex-1 bg-[var(--color-m-cream)]">
        {unreadCount > 0 && (
          <div className="bg-[var(--color-m-paper)] px-5 py-3 border-b border-[var(--color-m-ink-100)] flex items-center justify-between">
            <span className="text-[12px] text-[var(--color-m-ink-500)]">
              <span className="font-bold text-[var(--color-m-ink-900)]">{unreadCount}</span> notifikasi belum dibaca
            </span>
            <button className="text-[12px] font-bold text-[var(--color-m-orange-600)]">Tandai semua dibaca</button>
          </div>
        )}

        <div className="divide-y divide-[var(--color-m-ink-100)] bg-[var(--color-m-paper)]">
          {NOTIFICATIONS.map((notif) => (
            <Link
              key={notif.id}
              href={notif.href}
              className={`flex items-start gap-3 px-4 py-4 transition-colors hover:bg-[var(--color-m-ink-50)] ${
                notif.unread ? "bg-[var(--color-m-orange-100)]/30" : ""
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${TONE_CLASS[notif.tone]}`}>
                <notif.icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className={`text-[13px] leading-snug ${notif.unread ? "font-bold text-[var(--color-m-ink-900)]" : "font-semibold text-[var(--color-m-ink-800)]"}`}>
                    {notif.title}
                  </div>
                  {notif.unread && (
                    <div className="w-2 h-2 rounded-full bg-[var(--color-m-orange-500)] flex-shrink-0 mt-1" />
                  )}
                </div>
                <p className="text-[12px] text-[var(--color-m-ink-500)] mt-0.5 leading-relaxed line-clamp-2">
                  {notif.body}
                </p>
                <div className="text-[11px] text-[var(--color-m-ink-400)] mt-1">{notif.time}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="py-8 text-center text-[12px] text-[var(--color-m-ink-400)]">
          Itu semua notifikasi kamu.
        </div>
      </main>
    </>
  );
}
