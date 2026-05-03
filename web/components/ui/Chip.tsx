import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type ChipProps = ComponentPropsWithoutRef<"button"> & { active?: boolean };

export function Chip({ active, className, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-medium border-[1.5px] transition-all",
        active
          ? "bg-[var(--color-m-ink-900)] text-white border-[var(--color-m-ink-900)]"
          : "bg-[var(--color-m-paper)] text-[var(--color-m-ink-700)] border-[var(--color-m-ink-100)] hover:border-[var(--color-m-orange-400)]",
        className,
      )}
      {...rest}
    />
  );
}
