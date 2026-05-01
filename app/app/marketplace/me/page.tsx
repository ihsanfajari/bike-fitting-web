import Link from "next/link";
import { TopBar } from "../_components/TopBar";
import { BottomNav } from "../_components/BottomNav";
import { SectionLabel } from "../_components/ui";
import { IconBox, IconChevronRight, IconHeart, IconPackage, IconSettings, IconStar, IconUser, IconWallet } from "../_components/icons";
import { SELLERS } from "../_lib/mock-data";

export default function MePage() {
  const me = SELLERS[0];

  const MENU_GROUPS: { title: string; items: { href: string; label: string; icon: typeof IconBox }[] }[] = [
    {
      title: "Transaksi",
      items: [
        { href: "/marketplace/orders", label: "Pesanan Saya", icon: IconBox },
        { href: "/marketplace/dashboard", label: "Dashboard Penjual", icon: IconPackage },
        { href: "/marketplace/wishlist", label: "Wishlist", icon: IconHeart },
        { href: "/marketplace/withdraw", label: "Saldo & Penarikan", icon: IconWallet },
      ],
    },
    {
      title: "Akun",
      items: [
        { href: "/marketplace/me/profile", label: "Profil & Verifikasi", icon: IconUser },
        { href: "/marketplace/me/addresses", label: "Alamat Tersimpan", icon: IconPackage },
        { href: "/marketplace/me/banks", label: "Rekening Bank", icon: IconWallet },
        { href: "/marketplace/me/reviews", label: "Ulasan Saya", icon: IconStar },
        { href: "/marketplace/me/settings", label: "Pengaturan", icon: IconSettings },
      ],
    },
  ];

  return (
    <>
      <TopBar title="Akun Saya" />

      <main className="flex-1 pb-4">
        {/* Profile header */}
        <div className="bg-[var(--color-sp-black)] text-white px-4 py-5 flex items-center gap-3">
          <div className="w-14 h-14 bg-[var(--color-sp-red)] text-white flex items-center justify-center sp-display font-extrabold text-[18px]">
            {me.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="sp-display font-bold text-[18px] leading-tight">{me.name}</div>
            <div className="text-[11px] text-[#b0b0b0] flex items-center gap-2 mt-0.5">
              <span>⭐ {me.rating} · {me.reviewCount} ulasan</span>
              <span>•</span>
              <span>{me.txCount} transaksi</span>
            </div>
          </div>
          <Link
            href="/marketplace/me/profile"
            className="sp-display text-[10px] font-bold uppercase tracking-wide border border-white px-2 py-1.5 hover:bg-white hover:text-[var(--color-sp-black)]"
          >
            Edit
          </Link>
        </div>

        {MENU_GROUPS.map((g) => (
          <section key={g.title} className="mt-4">
            <SectionLabel className="px-4 mb-2">{g.title}</SectionLabel>
            <div className="bg-white border-y border-[var(--color-sp-black-100)] divide-y divide-[var(--color-sp-black-100)]">
              {g.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3.5 hover:bg-[var(--color-sp-black-50)]"
                >
                  <item.icon size={18} className="text-[var(--color-sp-black-600)]" />
                  <span className="flex-1 text-[13px] font-semibold">{item.label}</span>
                  <IconChevronRight size={16} className="text-[var(--color-sp-black-400)]" />
                </Link>
              ))}
            </div>
          </section>
        ))}

        <div className="text-center mt-6 px-4">
          <button className="sp-display text-[12px] font-bold uppercase tracking-wide text-[var(--color-sp-red)] py-3">
            Keluar
          </button>
          <div className="text-[10px] text-[var(--color-sp-black-400)] mt-4 sp-display tracking-widest uppercase">
            SEPEDAIN v1.0 · MVP
          </div>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
