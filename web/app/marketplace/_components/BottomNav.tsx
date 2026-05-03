"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconChat, IconHome, IconPlus, IconSearch, IconUser } from "./icons";

const items = [
  { href: "/marketplace", label: "Beranda", icon: IconHome, match: (p: string) => p === "/marketplace" },
  { href: "/marketplace/search", label: "Cari", icon: IconSearch, match: (p: string) => p.startsWith("/marketplace/search") },
  { href: "/marketplace/sell", label: "Jual", icon: IconPlus, match: (p: string) => p.startsWith("/marketplace/sell"), accent: true },
  { href: "/marketplace/chat", label: "Chat", icon: IconChat, match: (p: string) => p.startsWith("/marketplace/chat") },
  { href: "/marketplace/me", label: "Saya", icon: IconUser, match: (p: string) => p.startsWith("/marketplace/me") || p.startsWith("/marketplace/dashboard") },
];

export function BottomNav() {
  const pathname = usePathname() ?? "";
  return (
    <nav className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] safe-area-pb">
      <div className="grid grid-cols-5 px-2 py-2 gap-1">
        {items.map(({ href, label, icon: Icon, match, accent }) => {
          const active = match(pathname);
          if (accent) {
            return (
              <Link key={href} href={href} className="flex flex-col items-center gap-0.5 py-1">
                <span className="w-11 h-11 rounded-full bg-[var(--color-m-orange-500)] text-white flex items-center justify-center m-shadow-cta">
                  <Icon size={22} />
                </span>
                <span className="text-[10px] font-semibold text-[var(--color-m-ink-600)]">{label}</span>
              </Link>
            );
          }
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 py-2 rounded-xl transition-colors ${active ? "bg-[var(--color-m-orange-100)] text-[var(--color-m-orange-600)]" : "text-[var(--color-m-ink-400)]"}`}
            >
              <Icon size={22} />
              <span className={`text-[10px] ${active ? "font-bold" : "font-medium"}`}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
