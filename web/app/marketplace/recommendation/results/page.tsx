import Link from "next/link";
import { PageTopBar } from "../../_components/TopBar";
import { BottomNav } from "../../_components/BottomNav";
import { LISTINGS } from "@/lib/mock/api";
import { IconChevronRight, IconRuler, IconCheck } from "../../_components/icons";
import { RecommendedCard } from "../_components/RecommendedCard";

const MOCK_BODY = { height: 175, inseam: 82 };

const MOCK_MATCHES = LISTINGS.slice(0, 6).map((l, i) => ({
  ...l,
  matchScore: [95, 88, 82, 76, 71, 64][i] ?? 60,
  fitLabel: [95, 88, 82].includes([95, 88, 82, 76, 71, 64][i] ?? 0) ? "Fit Untukmu" : "Mungkin Cocok",
  fitLevel: ([95, 88, 82].includes([95, 88, 82, 76, 71, 64][i] ?? 0) ? "high" : "mid") as "high" | "mid",
}));

export default function RecommendationResultsPage() {
  const highFit = MOCK_MATCHES.filter((l) => l.fitLevel === "high");
  const maybeFit = MOCK_MATCHES.filter((l) => l.fitLevel === "mid");

  return (
    <>
      <PageTopBar title="Sepeda yang Fit Untukmu" backHref="/marketplace/recommendation" />

      <main className="flex-1 pb-6 bg-[var(--color-m-cream)]">
        {/* Body summary */}
        <section className="bg-[var(--color-m-paper)] px-5 py-4 border-b border-[var(--color-m-ink-100)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1A3A4A] flex items-center justify-center text-white flex-shrink-0">
                <IconRuler size={16} />
              </div>
              <div>
                <div className="text-[13px] font-bold text-[var(--color-m-ink-900)]">
                  Tinggi {MOCK_BODY.height} cm · Inseam {MOCK_BODY.inseam} cm
                </div>
                <div className="text-[11px] text-[var(--color-m-ink-500)] mt-0.5">
                  {MOCK_MATCHES.length} listing dianalisis · {highFit.length} sangat cocok
                </div>
              </div>
            </div>
            <Link
              href="/marketplace/recommendation"
              className="text-[12px] font-bold text-[var(--color-m-orange-600)] flex items-center gap-0.5"
            >
              Ubah <IconChevronRight size={13} />
            </Link>
          </div>
        </section>

        {/* High fit */}
        {highFit.length > 0 && (
          <section className="px-5 pt-5 pb-3">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--color-m-teal-500)]" />
              <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)]">Sangat Cocok Untukmu</h2>
              <span className="ml-auto text-[12px] font-semibold text-[var(--color-m-teal-600)]">{highFit.length} listing</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {highFit.map((l) => (
                <RecommendedCard key={l.id} listing={l} />
              ))}
            </div>
          </section>
        )}

        {/* Maybe fit */}
        {maybeFit.length > 0 && (
          <section className="px-5 pt-4 pb-3">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--color-m-amber-400)]" />
              <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)]">Mungkin Cocok</h2>
              <span className="ml-auto text-[12px] font-semibold text-[var(--color-m-ink-400)]">{maybeFit.length} listing</span>
            </div>
            <p className="text-[12px] text-[var(--color-m-ink-500)] mb-3 leading-relaxed">
              Ukurannya mendekati — cek deskripsi penjual dan konsultasi sebelum beli.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {maybeFit.map((l) => (
                <RecommendedCard key={l.id} listing={l} />
              ))}
            </div>
          </section>
        )}

        {/* Empty fallback — browse all */}
        <section className="px-5 pt-2 pb-4">
          <Link
            href="/marketplace/search"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl border border-[var(--color-m-ink-200)] text-[13px] font-bold text-[var(--color-m-ink-600)] hover:bg-[var(--color-m-ink-50)]"
          >
            Lihat Semua Listing <IconChevronRight size={16} />
          </Link>
        </section>

        {/* How match works */}
        <section className="mx-5 mb-4 p-4 rounded-2xl bg-[var(--color-m-paper)] border border-[var(--color-m-ink-100)]">
          <div className="text-[12px] font-bold text-[var(--color-m-ink-800)] mb-2">Bagaimana match dihitung?</div>
          <ul className="text-[12px] text-[var(--color-m-ink-600)] space-y-1.5 leading-relaxed">
            <li className="flex gap-2"><IconCheck size={15} className="flex-shrink-0 mt-0.5 text-[var(--color-m-teal-500)]" /> Inseam kamu vs ukuran frame yang direkomendasikan penjual</li>
            <li className="flex gap-2"><IconCheck size={15} className="flex-shrink-0 mt-0.5 text-[var(--color-m-teal-500)]" /> Tinggi badan vs sizing chart merek (Trek, Specialized, Polygon, dll)</li>
            <li className="flex gap-2"><span className="text-[var(--color-m-ink-400)] flex-shrink-0">~</span> Geometri & tipe sepeda (reach, stack) — Phase 2</li>
          </ul>
        </section>
      </main>

      <BottomNav />
    </>
  );
}