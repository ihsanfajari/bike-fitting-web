import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/admin/getCurrentAdmin";
import { signOutAction } from "@/lib/auth/actions";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/users", label: "Users", icon: "👤" },
  { href: "/admin/listings", label: "Listings", icon: "📦" },
  { href: "/admin/categories", label: "Kategori", icon: "🗂️" },
  { href: "/admin/logs", label: "Audit Log", icon: "📜" },
  { href: "/admin/orders", label: "Orders", icon: "🛒", disabled: true },
  { href: "/admin/disputes", label: "Disputes", icon: "⚠️", disabled: true },
  { href: "/admin/reports", label: "Reports", icon: "🚨", disabled: true },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/marketplace");

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-60 bg-slate-900 text-white flex flex-col flex-shrink-0">
        <div className="px-5 py-5 border-b border-slate-800">
          <div className="text-[15px] font-extrabold tracking-tight">
            Gowes<span className="text-orange-400">Fit</span>
            <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500 align-middle">ADMIN</span>
          </div>
        </div>

        <nav className="flex-1 py-3 space-y-0.5 px-3">
          {NAV.map((item) => {
            const disabled = "disabled" in item && item.disabled;
            const className = `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium ${
              disabled
                ? "text-slate-500 cursor-not-allowed"
                : "text-slate-200 hover:bg-slate-800 hover:text-white"
            }`;
            return disabled ? (
              <div key={item.href} className={className} title="Belum tersedia">
                <span>{item.icon}</span>
                <span>{item.label}</span>
                <span className="ml-auto text-[9px] uppercase font-bold text-slate-500">soon</span>
              </div>
            ) : (
              <Link key={item.href} href={item.href} className={className}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-3 border-t border-slate-800">
          <div className="px-3 py-2 text-[11px] text-slate-400">Logged in sebagai</div>
          <div className="px-3 pb-2 text-[13px] font-bold text-white truncate">{admin.fullName}</div>
          <Link href="/marketplace" className="block px-3 py-2 text-[12px] text-slate-300 hover:text-white rounded-lg hover:bg-slate-800">
            ← Ke Marketplace
          </Link>
          <form action={signOutAction}>
            <button type="submit" className="w-full text-left px-3 py-2 text-[12px] text-red-300 hover:text-red-200 rounded-lg hover:bg-slate-800">
              Keluar
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-x-auto">
        <div className="max-w-6xl mx-auto px-8 py-6">{children}</div>
      </main>
    </div>
  );
}
