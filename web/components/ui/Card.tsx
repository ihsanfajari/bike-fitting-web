import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type CardProps = ComponentPropsWithoutRef<"div"> & {
  shadow?: "none" | "xs" | "sm" | "md";
  padded?: boolean;
};

const shadowCls = {
  none: "",
  xs: "m-shadow-xs",
  sm: "m-shadow-sm",
  md: "m-shadow-md",
};

export function Card({ shadow = "xs", padded = true, className, ...rest }: CardProps) {
  return (
    <div
      className={cn("bg-[var(--color-m-paper)] rounded-2xl", shadowCls[shadow], padded && "p-4", className)}
      {...rest}
    />
  );
}
