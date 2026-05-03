import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Tone = "orange" | "teal" | "green" | "amber" | "red" | "gray" | "dark" | "solid-orange";

type BadgeProps = ComponentPropsWithoutRef<"span"> & { tone?: Tone };

const toneCls: Record<Tone, string> = {
  orange: "bg-[var(--color-m-orange-100)] text-[var(--color-m-orange-700)]",
  teal: "bg-[var(--color-m-teal-100)] text-[var(--color-m-teal-600)]",
  green: "bg-[var(--color-m-green-100)] text-[var(--color-m-green-500)]",
  amber: "bg-[var(--color-m-amber-100)] text-[var(--color-m-amber-500)]",
  red: "bg-[var(--color-m-red-100)] text-[var(--color-m-red-500)]",
  gray: "bg-[var(--color-m-ink-100)] text-[var(--color-m-ink-600)]",
  dark: "bg-[var(--color-m-ink-900)] text-white",
  "solid-orange": "bg-[var(--color-m-orange-500)] text-white",
};

export function Badge({ tone = "gray", className, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold leading-tight",
        toneCls[tone],
        className,
      )}
      {...rest}
    />
  );
}
