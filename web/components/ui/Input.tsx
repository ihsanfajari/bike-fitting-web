import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const baseCls =
  "w-full px-3.5 py-3 rounded-xl border-[1.5px] bg-white text-[14px] text-[var(--color-m-ink-900)] placeholder:text-[var(--color-m-ink-400)] focus:outline-none transition-all";

const stateCls = {
  default:
    "border-[var(--color-m-ink-100)] focus:border-[var(--color-m-orange-500)] focus:ring-4 focus:ring-[var(--color-m-orange-100)]",
  error:
    "border-[var(--color-m-red-500)] focus:border-[var(--color-m-red-500)] focus:ring-4 focus:ring-[var(--color-m-red-100)]",
};

type InputProps = ComponentPropsWithoutRef<"input"> & { invalid?: boolean };

export function Input({ invalid, className, ...rest }: InputProps) {
  return <input className={cn(baseCls, invalid ? stateCls.error : stateCls.default, className)} {...rest} />;
}

type TextareaProps = ComponentPropsWithoutRef<"textarea"> & { invalid?: boolean };

export function Textarea({ invalid, className, rows = 3, ...rest }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      className={cn(baseCls, "resize-none", invalid ? stateCls.error : stateCls.default, className)}
      {...rest}
    />
  );
}

type SelectProps = ComponentPropsWithoutRef<"select"> & { invalid?: boolean };

export function Select({ invalid, className, children, ...rest }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          baseCls,
          "appearance-none pr-9",
          invalid ? stateCls.error : stateCls.default,
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      <svg
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-m-ink-400)]"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}
