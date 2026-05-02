"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHome, IconSearch, IconPlus, IconChat, IconUser } from "./icons";

const ITEMS = [
  { href: "/marketplace", icon: IconHome, label: "Home", match: (p: string) => p === "/marketplace" },
  { href: "/marketplace/search", icon: IconSearch, label: "Cari", match: (p: string) => p.startsWith("/marketplace/search") },
  { href: "/marketplace/sell", icon: IconPlus, label: "Jual", match: (p: string) => p.startsWith("/marketplace/sell"), highlight: true },
  { href: "/marketplace/chat", icon: IconChat, label: "Chat", match: (p: string) => p.startsWith("/marketplace/chat") },
  { href: "/marketplace/me", icon: IconUser, label: "Saya", match: (p: string) => p.startsWith("/marketplace/me") || p.startsWith("/marketplace/dashboard") || p.startsWith("/marketplace/orders") },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="sticky bottom-0 z-40 bg-white border-t-2 border-[var(--color-sp-black)] flex h-[60px]">
      {ITEMS.map((item) => {
        const active = item.match(pathname);
        const Icon = item.icon;
        if (item.highlight) {
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 relative"
            >
              <div className="w-11 h-11 bg-[var(--color-sp-red)] text-white flex items-center justify-center -mt-4 shadow-md">
                <Icon size={22} />
              </div>
              <span className={`sp-display text-[9px] font-bold uppercase tracking-wide ${active ? "text-[var(--color-sp-red)]" : "text-[var(--color-sp-black-400)]"}`}>
                {item.label}
              </span>
            </Link>
          );
        }
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 border-t-[3px] transition-colors ${
              active ? "border-[var(--color-sp-red)] text-[var(--color-sp-red)]" : "border-transparent text-[var(--color-sp-black-400)]"
            }`}
          >
            <Icon size={22} />
            <span className={`sp-display text-[9px] font-bold uppercase tracking-wide ${active ? "text-[var(--color-sp-red)]" : "text-[var(--color-sp-black-400)]"}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
