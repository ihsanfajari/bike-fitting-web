import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center text-center px-6 py-12 gap-3", className)}>
      {icon && (
        <div className="w-14 h-14 rounded-full bg-[var(--color-m-orange-100)] text-[var(--color-m-orange-600)] flex items-center justify-center">
          {icon}
        </div>
      )}
      <div className="text-[15px] font-extrabold text-[var(--color-m-ink-900)]">{title}</div>
      {description && (
        <p className="text-[13px] text-[var(--color-m-ink-500)] max-w-[280px] leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
