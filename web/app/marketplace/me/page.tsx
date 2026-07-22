import Link from "next/link";
import { redirect } from "next/navigation";
import { BottomNav } from "../_components/BottomNav";
import type { ComponentType } from "react";
import { IconBell, IconBox, IconChevronRight, IconHeart, IconStar, IconTrendUp, IconWallet, IconBag, IconEdit, IconMapPin, IconSettings, IconCheck, IconHourglass } from "../_components/icons";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { signOutAction } from "@/lib/auth/actions";

const MENU_ITEMS = [
  {
    group: "Aktivitas",
    items: [
      { href: "/marketplace/me/listings", icon: IconBox, label: "Listing Saya", desc: "Kelola barang yang kamu jual" },
      { href: "/marketplace/orders?tab=buyer", icon: IconBag, label: "Pesanan Saya", desc: "Lacak pembelian & konfirmasi" },
      { href: "/marketplace/wishlist", icon: IconHeart, label: "Wishlist", desc: "Barang yang kamu simpan" },
      { href: "/marketplace/dashboard", icon: IconTrendUp, label: "Dashboard Penjual", desc: "Performa listing & pendapatan" },
    ],
  },
  {
    group: "Keuangan",
    items: [
      { href: "/marketplace/me/saldo", icon: IconWallet, label: "Saldo & Rekening", desc: "Cairkan hasil penjualan" },
    ],
  },
  {
    group: "Akun",
    items: [
      { href: "/marketplace/me/edit", icon: IconEdit, label: "Edit Profil", desc: "Nama, HP, bio, kota" },
      { href: "/marketplace/me/addresses", icon: IconMapPin, label: "Alamat Pengiriman", desc: "Kelola alamat tersimpan" },
      { href: "/marketplace/notifications", icon: IconBell, label: "Notifikasi", desc: "Pesanan, penawaran, update" },
      { href: "/marketplace/me/settings", icon: IconSettings, label: "Pengaturan", desc: "Privasi, keamanan, hapus akun" },
    ],
  },
];

function MenuIcon({ icon: Icon }: { icon: ComponentType<{ size?: number; className?: string }> }) {
  return <Icon size={20} className="text-[var(--color-m-orange-500)]" />;
}

function initialsOf(name: string): string {
  return name.split(/\s+/).slice(0, 2).map((s) => s[0]?.toUpperCase() ?? "").join("") || "?";
}

function maskPhone(phone: string | null): string {
  if (!phone) return "—";
  if (phone.length < 6) return phone;
  return phone.slice(0, 5) + "***" + phone.slice(-3);
}

export default async function MePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/marketplace/sign-in");

  const isPhoneVerified = user.phoneVerifiedAt !== null;
  const joinedYear = user.createdAt.getFullYear();

  return (
    <main className="flex-1 flex flex-col bg-[var(--color-m-cream)]">
      <section
        className="px-5 pt-10 pb-6"
        style={{ background: "linear-gradient(180deg,#FFF0E6 0%,#FFF8F0 100%)" }}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-m-orange-400)] to-[var(--color-m-orange-600)] flex items-center justify-center text-white text-[24px] font-extrabold flex-shrink-0">
            {initialsOf(user.fullName)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[18px] font-extrabold text-[var(--color-m-ink-900)] leading-tight">
              {user.fullName}
            </div>
            <div className="text-[12px] text-[var(--color-m-ink-500)] mt-0.5 truncate">
              {user.email} · {maskPhone(user.phone)}
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${isPhoneVerified ? "bg-[var(--color-m-green-100)] text-[var(--color-m-green-500)]" : "bg-[var(--color-m-amber-100)] text-[var(--color-m-amber-500)]"}`}>
                {isPhoneVerified ? <><IconCheck size={11} /> HP Terverifikasi</> : <><IconHourglass size={11} /> Menunggu verifikasi</>}
              </span>
              {user.ratingCount > 0 && (
                <div className="flex items-center gap-0.5 text-[var(--color-m-amber-500)] text-[12px] font-bold">
                  <IconStar size={12} />
                  {user.ratingAvg.toString()}
                </div>
              )}
            </div>
          </div>
          <Link
            href="/marketplace/me/edit"
            className="w-9 h-9 rounded-xl bg-white border border-[var(--color-m-ink-100)] flex items-center justify-center text-[var(--color-m-ink-600)] flex-shrink-0"
            aria-label="Edit profil"
          >
            <IconEdit size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-5">
          {[
            { label: "Transaksi", value: user.txCount.toString() },
            { label: "Rating", value: user.ratingCount > 0 ? user.ratingAvg.toString() : "—" },
            { label: "Bergabung", value: joinedYear.toString() },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl py-3 text-center">
              <div className="text-[18px] font-extrabold text-[var(--color-m-ink-900)] m-tnum">{stat.value}</div>
              <div className="text-[11px] text-[var(--color-m-ink-500)] mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex-1 px-4 py-4 space-y-4">
        {MENU_ITEMS.map((group) => (
          <div key={group.group}>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-m-ink-400)] mb-2 px-1">
              {group.group}
            </div>
            <div className="bg-[var(--color-m-paper)] rounded-2xl divide-y divide-[var(--color-m-ink-100)] m-shadow-xs overflow-hidden">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3.5 hover:bg-[var(--color-m-ink-50)] transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-[var(--color-m-orange-100)] flex items-center justify-center flex-shrink-0">
                    <MenuIcon icon={item.icon} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-bold text-[var(--color-m-ink-900)]">{item.label}</div>
                    <div className="text-[11px] text-[var(--color-m-ink-500)] mt-0.5">{item.desc}</div>
                  </div>
                  <IconChevronRight size={16} className="text-[var(--color-m-ink-300)]" />
                </Link>
              ))}
            </div>
          </div>
        ))}

        <form action={signOutAction}>
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl border border-[var(--color-m-ink-100)] bg-[var(--color-m-paper)] text-[14px] font-bold text-red-500 m-shadow-xs hover:bg-red-50"
          >
            Keluar
          </button>
        </form>

        <p className="text-center text-[11px] text-[var(--color-m-ink-400)] pb-4">
          GowesFit Marketplace v0.1.0
        </p>
      </div>
      <BottomNav />
    </main>
  );
}
