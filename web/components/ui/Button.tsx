import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "success" | "danger";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
  children?: ReactNode;
};

const sizeCls: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] rounded-lg",
  md: "h-11 px-5 text-[14px] rounded-xl",
  lg: "h-12 px-6 text-[14px] rounded-xl",
};

const variantCls: Record<Variant, string> = {
  primary:
    "bg-[var(--color-m-orange-500)] text-white border border-[var(--color-m-orange-500)] m-shadow-cta hover:bg-[var(--color-m-orange-600)] hover:border-[var(--color-m-orange-600)]",
  secondary:
    "bg-[var(--color-m-ink-900)] text-white border border-[var(--color-m-ink-900)] hover:bg-[var(--color-m-ink-800)]",
  outline:
    "bg-transparent text-[var(--color-m-orange-600)] border border-[var(--color-m-orange-500)] hover:bg-[var(--color-m-orange-100)]",
  ghost:
    "bg-[var(--color-m-ink-50)] text-[var(--color-m-ink-800)] border border-transparent hover:bg-[var(--color-m-ink-100)]",
  success:
    "bg-[var(--color-m-green-500)] text-white border border-[var(--color-m-green-500)] hover:opacity-90",
  danger:
    "bg-[var(--color-m-red-500)] text-white border border-[var(--color-m-red-500)] hover:opacity-90",
};

const baseCls =
  "inline-flex items-center justify-center gap-2 font-bold leading-none transition-all whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed";

function buildClasses({ variant = "primary", size = "md", full, className }: CommonProps) {
  return cn(baseCls, sizeCls[size], variantCls[variant], full && "w-full", className);
}

type ButtonProps = CommonProps & ComponentPropsWithoutRef<"button">;

export function Button({ variant, size, full, leading, trailing, className, children, ...rest }: ButtonProps) {
  return (
    <button className={buildClasses({ variant, size, full, className })} {...rest}>
      {leading}
      {children}
      {trailing}
    </button>
  );
}

type ButtonLinkProps = CommonProps & ComponentPropsWithoutRef<typeof Link>;

export function ButtonLink({ variant, size, full, leading, trailing, className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link className={buildClasses({ variant, size, full, className })} {...rest}>
      {leading}
      {children}
      {trailing}
    </Link>
  );
}
