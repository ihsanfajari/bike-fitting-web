import Link from "next/link";
import { PageTopBar } from "../../_components/TopBar";
import { IconChevronRight, IconShield, IconWallet, IconArrowDownCircle, IconArrowUpCircle } from "../../_components/icons";
import { formatRupiah } from "@/lib/format";
import { ButtonLink } from "@/components/ui";

const HISTORY = [
  { id: "t1", type: "in", label: "Dana masuk — Fulcrum Racing 5 DB", amount: 3168000, date: "18 Apr 2026", status: "Selesai" },
  { id: "t2", type: "out", label: "Withdraw ke BCA 8812", amount: 3000000, date: "19 Apr 2026", status: "Berhasil" },
  { id: "t3", type: "in", label: "Dana masuk — Specialized Rockhopper", amount: 9604000, date: "Menunggu konfirmasi" , status: "Pending" },
];

export default function SaldoPage() {
  const balance = 168000 + 9604000;

  return (
    <>
      <PageTopBar title="Saldo & Rekening" backHref="/marketplace/me" />

      <main className="flex-1 pb-10 bg-[var(--color-m-cream)]">
        {/* Balance card */}
        <section
          className="px-5 py-8 text-center"
          style={{ background: "linear-gradient(180deg,#E3F5EC 0%,#FFF8F0 100%)" }}
        >
          <div className="text-[13px] text-[var(--color-m-ink-500)] font-semibold mb-1">Saldo Tersedia</div>
          <div className="text-[36px] font-extrabold text-[var(--color-m-ink-900)] m-tnum tracking-tight">
            {formatRupiah(balance)}
          </div>
          <p className="text-[12px] text-[var(--color-m-ink-500)] mt-2 leading-relaxed">
            Termasuk Rp9.604.000 dana rekber yang menunggu konfirmasi pembeli.
          </p>
          <ButtonLink href="/marketplace/me/saldo" full size="lg" className="mt-5 max-w-[280px] mx-auto">
            Cairkan Saldo
          </ButtonLink>
        </section>

        {/* Rekening */}
        <section className="px-4 mt-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-m-ink-400)] mb-2">
            Rekening Bank
          </div>
          <div className="bg-[var(--color-m-paper)] rounded-2xl overflow-hidden m-shadow-xs">
            <div className="flex items-center gap-3 px-4 py-4 border-b border-[var(--color-m-ink-100)]">
              <div className="w-10 h-10 rounded-xl bg-[#0058A8] flex items-center justify-center text-white font-extrabold text-[11px]">
                BCA
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-bold text-[var(--color-m-ink-900)]">BCA — 8812 ****</div>
                <div className="text-[12px] text-[var(--color-m-ink-500)]">a.n. Ihsan Fajari · Utama</div>
              </div>
              <span className="text-[11px] font-bold text-[var(--color-m-green-500)] bg-[var(--color-m-green-100)] px-2 py-0.5 rounded-full">
                Aktif
              </span>
            </div>
            <Link href="/marketplace/me/saldo/tambah-rekening" className="flex items-center gap-3 px-4 py-3.5 text-[var(--color-m-orange-600)]">
              <span className="text-[13px] font-bold">+ Tambah Rekening</span>
              <IconChevronRight size={16} className="ml-auto text-[var(--color-m-ink-300)]" />
            </Link>
          </div>
        </section>

        {/* History */}
        <section className="px-4 mt-5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-m-ink-400)] mb-2">
            Riwayat Saldo
          </div>
          <div className="bg-[var(--color-m-paper)] rounded-2xl overflow-hidden m-shadow-xs divide-y divide-[var(--color-m-ink-100)]">
            {HISTORY.map((h) => (
              <div key={h.id} className="flex items-center gap-3 px-4 py-4">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${h.type === "in" ? "bg-[var(--color-m-green-100)] text-[var(--color-m-green-500)]" : "bg-[var(--color-m-ink-100)] text-[var(--color-m-ink-600)]"}`}>
                  {h.type === "in" ? <IconArrowDownCircle size={18} /> : <IconArrowUpCircle size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-[var(--color-m-ink-900)] truncate">{h.label}</div>
                  <div className="text-[11px] text-[var(--color-m-ink-400)] mt-0.5">{h.date}</div>
                </div>
                <div className={`text-[14px] font-bold m-tnum ${h.type === "in" ? "text-[var(--color-m-green-500)]" : "text-[var(--color-m-ink-700)]"}`}>
                  {h.type === "in" ? "+" : "−"}{formatRupiah(h.amount)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust */}
        <div className="px-4 mt-5">
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[var(--color-m-green-100)]/60">
            <IconShield size={20} className="text-[var(--color-m-green-500)] flex-shrink-0 mt-0.5" />
            <p className="text-[12px] text-[var(--color-m-ink-700)] leading-relaxed">
              Pencairan via Midtrans Iris. Proses T+1 hari kerja ke rekening yang terdaftar dan terverifikasi.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
