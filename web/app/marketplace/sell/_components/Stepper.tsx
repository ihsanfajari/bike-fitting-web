import { IconCheck } from "../../_components/icons";

const STEPS = [
  { num: 1, label: "Kategori & Foto" },
  { num: 2, label: "Spesifikasi" },
  { num: 3, label: "Harga & Lokasi" },
];

export function Stepper({ current }: { current: 1 | 2 | 3 }) {
  return (
    <div className="bg-[var(--color-m-paper)] px-5 py-5 border-b border-[var(--color-m-ink-100)]">
      <div className="flex items-center">
        {STEPS.map((step, i) => {
          const done = current > step.num;
          const active = current === step.num;
          return (
            <div key={step.num} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all ${
                    done
                      ? "bg-[var(--color-m-green-500)] text-white"
                      : active
                      ? "bg-[var(--color-m-orange-500)] text-white ring-4 ring-[var(--color-m-orange-100)]"
                      : "bg-[var(--color-m-ink-100)] text-[var(--color-m-ink-400)]"
                  }`}
                >
                  {done ? <IconCheck size={14} /> : step.num}
                </div>
                <span
                  className={`text-[10px] text-center max-w-[70px] leading-tight ${
                    active || done ? "font-bold text-[var(--color-m-ink-900)]" : "text-[var(--color-m-ink-400)] font-medium"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 mb-5 rounded-full ${
                    done ? "bg-[var(--color-m-green-500)]" : "bg-[var(--color-m-ink-100)]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
