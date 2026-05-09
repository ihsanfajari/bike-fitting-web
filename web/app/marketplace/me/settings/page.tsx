import Link from "next/link";
import { PageTopBar } from "../../_components/TopBar";
import { IconChevronRight } from "../../_components/icons";

function ToggleRow({ label, desc, defaultOn }: { label: string; desc?: string; defaultOn?: boolean }) {
  return (
    <label className="flex items-center justify-between gap-3 px-4 py-3.5 cursor-pointer">
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-semibold text-[var(--color-m-ink-900)]">{label}</div>
        {desc && <div className="text-[11px] text-[var(--color-m-ink-500)] mt-0.5 leading-snug">{desc}</div>}
      </div>
      <div className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${defaultOn ? "bg-[var(--color-m-orange-500)]" : "bg-[var(--color-m-ink-200)]"}`}>
        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white m-shadow-xs transition-transform ${defaultOn ? "translate-x-5" : "translate-x-0.5"}`} />
        <input type="checkbox" defaultChecked={defaultOn} className="sr-only" />
      </div>
    </label>
  );
}

function LinkRow({ label, desc, href, danger }: { label: string; desc?: string; href: string; danger?: boolean }) {
  return (
    <Link href={href} className="flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-[var(--color-m-ink-50)] transition-colors">
      <div className="flex-1 min-w-0">
        <div className={`text-[14px] font-semibold ${danger ? "text-red-500" : "text-[var(--color-m-ink-900)]"}`}>{label}</div>
        {desc && <div className="text-[11px] text-[var(--color-m-ink-500)] mt-0.5 leading-snug">{desc}</div>}
      </div>
      <IconChevronRight size={16} className="text-[var(--color-m-ink-300)] flex-shrink-0" />
    </Link>
  );
}

export default function SettingsPage() {
  return (
    <>
      <PageTopBar title="Pengaturan" backHref="/marketplace/me" />

      <main className="flex-1 pb-10 bg-[var(--color-m-cream)]">
        {/* Notifikasi */}
        <div className="mt-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-m-ink-400)] px-5 pb-2">
            Notifikasi
          </div>
          <div className="bg-[var(--color-m-paper)] divide-y divide-[var(--color-m-ink-100)] m-shadow-xs">
            <ToggleRow label="Push Notification" desc="Pesanan, pesan chat, penawaran" defaultOn />
            <ToggleRow label="Email Notifikasi" desc="Ringkasan pesanan & update penting" defaultOn />
            <ToggleRow label="Promo & Informasi" desc="Tips jual beli, event komunitas" />
          </div>
        </div>

        {/* Privasi */}
        <div className="mt-5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-m-ink-400)] px-5 pb-2">
            Privasi
          </div>
          <div className="bg-[var(--color-m-paper)] divide-y divide-[var(--color-m-ink-100)] m-shadow-xs">
            <ToggleRow label="Tampilkan profil publik" desc="Pembeli bisa melihat profil & listing kamu" defaultOn />
            <ToggleRow label="Tampilkan kota di listing" desc="Memudahkan pencarian pembeli lokal" defaultOn />
            <ToggleRow label="Izinkan pesan dari siapapun" desc="Jika dimatikan, hanya pembeli yang sedang transaksi" defaultOn />
          </div>
        </div>

        {/* Keamanan */}
        <div className="mt-5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-m-ink-400)] px-5 pb-2">
            Keamanan
          </div>
          <div className="bg-[var(--color-m-paper)] divide-y divide-[var(--color-m-ink-100)] m-shadow-xs">
            <LinkRow label="Ganti Password" href="/marketplace/me/settings" />
            <LinkRow label="Verifikasi Nomor HP" desc="+6281234567890 · Terverifikasi" href="/marketplace/verify-otp" />
            <LinkRow label="Sesi Login Aktif" desc="Lihat & kelola perangkat yang login" href="/marketplace/me/settings" />
          </div>
        </div>

        {/* Aplikasi */}
        <div className="mt-5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-m-ink-400)] px-5 pb-2">
            Aplikasi
          </div>
          <div className="bg-[var(--color-m-paper)] divide-y divide-[var(--color-m-ink-100)] m-shadow-xs">
            <LinkRow label="Syarat & Ketentuan" href="/marketplace/me/settings" />
            <LinkRow label="Kebijakan Privasi" href="/marketplace/me/settings" />
            <LinkRow label="Tentang GowesFit" href="/marketplace/me/settings" />
            <div className="px-4 py-3.5">
              <div className="text-[14px] font-semibold text-[var(--color-m-ink-500)]">Versi Aplikasi</div>
              <div className="text-[12px] text-[var(--color-m-ink-400)] mt-0.5">v0.1.0 (build 2026050901)</div>
            </div>
          </div>
        </div>

        {/* Bahaya zone */}
        <div className="mt-5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-m-ink-400)] px-5 pb-2">
            Zona Bahaya
          </div>
          <div className="bg-[var(--color-m-paper)] divide-y divide-[var(--color-m-ink-100)] m-shadow-xs">
            <LinkRow
              label="Nonaktifkan Akun"
              desc="Listing akan dijeda, kamu bisa aktifkan lagi kapan saja"
              href="/marketplace/me/settings"
              danger
            />
            <LinkRow
              label="Hapus Akun Permanen"
              desc="Data tidak bisa dipulihkan setelah 30 hari"
              href="/marketplace/me/settings"
              danger
            />
          </div>
        </div>
      </main>
    </>
  );
}
