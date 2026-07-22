import Link from "next/link";
import { PageTopBar } from "../_components/TopBar";
import { ButtonLink, Field, Input } from "@/components/ui";
import { CategoryIcon } from "../_components/CategoryIcon";
import { IconArrowRight, IconRuler, IconShield } from "../_components/icons";

const FLEXIBILITY = [
  { value: "flexible", label: "Fleksibel", desc: "Bisa bungkuk jauh" },
  { value: "moderate", label: "Sedang", desc: "Posisi endurance" },
  { value: "stiff", label: "Kaku", desc: "Tegak, santai" },
];

const BIKE_TYPES = [
  { slug: "roadbike", label: "Roadbike" },
  { slug: "mtb", label: "MTB" },
  { slug: "gravel", label: "Gravel" },
  { slug: "folding", label: "Folding" },
];

export default function RecommendationPage() {
  return (
    <>
      <PageTopBar title="Cari Sepeda yang Fit" backHref="/marketplace" />

      <main className="flex-1 pb-32 bg-[var(--color-m-cream)]">
        {/* Hero */}
        <section className="px-5 pt-4 pb-5">
          <div
            className="relative overflow-hidden rounded-3xl p-6"
            style={{ background: "linear-gradient(135deg,#1A3A4A 0%,#0F2030 100%)" }}
          >
            <div
              className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #4ECDC4, transparent 70%)" }}
            />
            <div className="mb-3 text-[var(--color-m-teal-300)]"><IconRuler size={26} /></div>
            <h1 className="text-[20px] font-extrabold text-white leading-tight">
              Temukan Sepeda yang<br />
              <span className="text-[var(--color-m-teal-300)]">FIT Untukmu</span>
            </h1>
            <p className="mt-2 text-[12px] text-white/70 leading-relaxed">
              Masukkan tinggi badan & inseam, kami cocokkan dengan sizing chart ratusan listing aktif.
            </p>
          </div>
        </section>

        {/* Ukuran Badan */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-0 space-y-4">
          <div>
            <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)]">Ukuran Badan</h2>
            <p className="text-[12px] text-[var(--color-m-ink-500)] mt-0.5">
              Dua angka ini yang paling menentukan sepeda mana yang pas.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Tinggi Badan" required hint="cm">
              <div className="relative">
                <Input type="number" inputMode="numeric" placeholder="175" min={140} max={220} className="pr-10 m-tnum text-[18px] font-bold" />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[12px] text-[var(--color-m-ink-400)] font-medium">cm</span>
              </div>
            </Field>

            <Field label="Panjang Inseam" required hint="cm">
              <div className="relative">
                <Input type="number" inputMode="numeric" placeholder="82" min={60} max={110} className="pr-10 m-tnum text-[18px] font-bold" />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[12px] text-[var(--color-m-ink-400)] font-medium">cm</span>
              </div>
            </Field>
          </div>

          {/* Cara ukur inseam */}
          <div className="p-3.5 rounded-xl bg-[var(--color-m-ink-50)] border border-[var(--color-m-ink-100)]">
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-[var(--color-m-ink-800)] mb-1"><IconRuler size={14} className="text-[var(--color-m-ink-500)]" />Cara ukur inseam</div>
            <p className="text-[12px] text-[var(--color-m-ink-600)] leading-relaxed">
              Berdiri tegak, ukur dari pangkal paha sampai lantai. Atau lihat tag celana jeans: angka kedua setelah tanda &quot;×&quot; (misal 32×34 → inseam ≈ 86 cm).
            </p>
          </div>
        </section>

        {/* Reach (opsional) */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-0.5">Panjang Lengan <span className="text-[12px] font-medium text-[var(--color-m-ink-400)]">(opsional)</span></h2>
          <p className="text-[12px] text-[var(--color-m-ink-500)] mb-4">Untuk rekomendasi yang lebih akurat, terutama roadbike.</p>
          <div className="flex gap-3 items-end">
            <div className="w-36">
              <Field label="Arm Reach">
                <div className="relative">
                  <Input type="number" inputMode="numeric" placeholder="70" min={50} max={90} className="pr-10 m-tnum" />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[12px] text-[var(--color-m-ink-400)]">cm</span>
                </div>
              </Field>
            </div>
            <p className="text-[11px] text-[var(--color-m-ink-400)] pb-2 leading-relaxed flex-1">
              Ujung jari ke tengah punggung (posisi lengan lurus ke samping)
            </p>
          </div>
        </section>

        {/* Fleksibilitas */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-1">Fleksibilitas Punggung</h2>
          <p className="text-[12px] text-[var(--color-m-ink-500)] mb-4">Mempengaruhi panjang stem & reach yang cocok.</p>
          <div className="space-y-2">
            {FLEXIBILITY.map((f, i) => (
              <label
                key={f.value}
                className={`flex items-center gap-3 p-3.5 rounded-xl border-[1.5px] cursor-pointer transition-all ${
                  i === 1
                    ? "border-[var(--color-m-teal-500)] bg-[var(--color-m-teal-100)]/30"
                    : "border-[var(--color-m-ink-100)] bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="flexibility"
                  value={f.value}
                  defaultChecked={i === 1}
                  className="w-4 h-4 accent-[var(--color-m-teal-500)]"
                />
                <div className="flex-1">
                  <div className="text-[13px] font-bold text-[var(--color-m-ink-900)]">{f.label}</div>
                  <div className="text-[11px] text-[var(--color-m-ink-500)]">{f.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Tipe Sepeda */}
        <section className="bg-[var(--color-m-paper)] px-5 py-5 mt-3">
          <h2 className="text-[15px] font-extrabold text-[var(--color-m-ink-900)] mb-1">Tipe Sepeda</h2>
          <p className="text-[12px] text-[var(--color-m-ink-500)] mb-4">Pilih satu atau lebih.</p>
          <div className="grid grid-cols-4 gap-2">
            {BIKE_TYPES.map((t, i) => (
              <button
                key={t.slug}
                className={`flex flex-col items-center gap-1.5 py-3.5 rounded-2xl border-[1.5px] transition-all ${
                  i === 0
                    ? "border-[var(--color-m-teal-500)] bg-[var(--color-m-teal-100)]/30"
                    : "border-[var(--color-m-ink-100)] bg-white"
                }`}
              >
                <CategoryIcon slug={t.slug} size={22} className={i === 0 ? "text-[var(--color-m-teal-600)]" : "text-[var(--color-m-ink-600)]"} />
                <span className={`text-[11px] font-semibold ${i === 0 ? "text-[var(--color-m-teal-700)]" : "text-[var(--color-m-ink-700)]"}`}>
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Trust note */}
        <section className="px-5 py-4">
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[var(--color-m-teal-100)]/40">
            <IconShield size={18} className="text-[var(--color-m-teal-600)] flex-shrink-0 mt-0.5" />
            <p className="text-[12px] text-[var(--color-m-ink-600)] leading-relaxed">
              Data body kamu <b>tidak dibagikan</b> ke penjual. Hanya dipakai untuk menghitung ukuran frame yang cocok.
            </p>
          </div>
        </section>
      </main>

      <div className="sticky bottom-0 z-30 bg-[var(--color-m-paper)] border-t border-[var(--color-m-ink-100)] px-4 py-3 m-shadow-lg">
        <ButtonLink
          href="/marketplace/recommendation/results"
          full
          size="lg"
          className="bg-[#1A3A4A] hover:bg-[#0F2030] text-white"
        >
          <span className="inline-flex items-center gap-2">Cari Sepeda yang Fit Untukku <IconArrowRight size={16} /></span>
        </ButtonLink>
        <p className="text-center text-[11px] text-[var(--color-m-ink-400)] mt-2">
          Menyesuaikan dengan {"{"}ratusan{"}"} listing aktif sekarang
        </p>
      </div>
    </>
  );
}