import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FieldProps = {
  label?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

export function Field({ label, required, hint, error, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-[12px] font-semibold text-[var(--color-m-ink-800)]">
          {label}
          {required && <span className="ml-0.5 text-[var(--color-m-orange-500)]">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-[12px] font-medium text-[var(--color-m-red-500)]">{error}</p>
      ) : hint ? (
        <p className="text-[11px] text-[var(--color-m-ink-400)]">{hint}</p>
      ) : null}
    </div>
  );
}
