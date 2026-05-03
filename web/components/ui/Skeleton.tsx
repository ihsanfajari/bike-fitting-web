import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type SkeletonProps = ComponentPropsWithoutRef<"div">;

export function Skeleton({ className, ...rest }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-gradient-to-r from-[var(--color-m-ink-100)] via-[var(--color-m-ink-50)] to-[var(--color-m-ink-100)]",
        className,
      )}
      {...rest}
    />
  );
}
