import Link from "next/link";
import { PageTopBar } from "../_components/TopBar";
import { Stepper } from "./_components/Stepper";
import { CATEGORIES } from "@/lib/mock/api";
import { ButtonLink, Field } from "@/components/ui";

export default function SellStep1Page() {
  return (
    <>
      <PageTopBar title="Buat Listing — 1/3" backHref="/marketplace/dashboard" />

      <main className="flex-1 pb-32 bg-[var(--color-m-cream)]">
        <Stepper current={1} />

        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[16px] font-extrabold text-[var(--color-m-ink-900)] mb-1">Kategori sepeda</h2>
          <p className="text-[12px] text-[var(--color-m-ink-500)] mb-4">
            Pilih kategori yang paling tepat — bantu calon pembeli menemukan listingmu.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map((c, i) => {
              const active = i === 0;
              return (
                <button
                  key={c.slug}
                  className={`flex flex-col items-center gap-1 py-3.5 rounded-2xl border-[1.5px] transition-all ${
                    active
                      ? "border-[var(--color-m-orange-500)] bg-[var(--color-m-orange-100)]/50"
                      : "border-[var(--color-m-ink-100)] bg-white hover:border-[var(--color-m-orange-400)]"
                  }`}
                >
                  <span className="text-[22px]">{c.icon}</span>
                  <span
                    className={`text-[11px] font-semibold leading-tight ${
                      active ? "text-[var(--color-m-orange-700)]" : "text-[var(--color-m-ink-800)]"
                    }`}
                  >
                    {c.name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[16px] font-extrabold text-[var(--color-m-ink-900)] mb-1">Foto sepeda</h2>
          <p className="text-[12px] text-[var(--color-m-ink-500)] mb-4">
            Min 3 foto · Maks 8. Foto pertama jadi cover. Pakai cahaya alami untuk hasil terbaik.
          </p>

          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-xl flex items-center justify-center text-[var(--color-m-ink-400)] italic text-[11px] relative overflow-hidden"
                style={{ background: "linear-gradient(135deg,#FFE5D6,#E0F7F8)" }}
              >
                {i === 0 && (
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[var(--color-m-orange-500)] text-white text-[9px] font-bold">
                    COVER
                  </span>
                )}
                <span>Foto {i + 1}</span>
              </div>
            ))}
            <button className="aspect-square rounded-xl border-[1.5px] border-dashed border-[var(--color-m-ink-200)] flex flex-col items-center justify-center gap-1 text-[var(--color-m-ink-500)] hover:border-[var(--color-m-orange-400)] hover:text-[var(--color-m-orange-600)]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              <span className="text-[10px] font-semibold">Tambah</span>
            </button>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-[var(--color-m-amber-100)]/50 text-[12px] text-[var(--color-m-ink-700)] leading-relaxed">
            <b>📸 Tips foto laku:</b> samping kanan, samping kiri, groupset close-up, kondisi ban.
          </div>
        </section>

        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <Field label="Judul listing" required hint="Contoh: Trek Domane SL5 2022 Full Shimano 105 — 22jt nego">
            <input
              type="text"
              defaultValue="Trek Domane SL5 2022 Full Shimano 105"
              className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-[var(--color-m-ink-100)] bg-white text-[14px] text-[var(--color-m-ink-900)] focus:outline-none focus:border-[var(--color-m-orange-500)] focus:ring-4 focus:ring-[var(--color-m-orange-100)]"
            />
          </Field>
        </section>
      </main>

      <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg flex gap-2">
        <Link
          href="/marketplace/dashboard"
          className="px-5 h-12 rounded-xl border border-[var(--color-m-ink-200)] flex items-center justify-center text-[14px] font-bold text-[var(--color-m-ink-700)]"
        >
          Batal
        </Link>
        <ButtonLink href="/marketplace/sell/spesifikasi" full size="lg">
          Lanjut ke Spesifikasi →
        </ButtonLink>
      </div>
    </>
  );
}
