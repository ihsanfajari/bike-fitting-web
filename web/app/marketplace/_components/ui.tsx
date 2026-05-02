import Link from "next/link";
import { ReactNode } from "react";

/* ── BUTTON ─────────────────────────────────────────────── */
type BtnVariant = "primary" | "outline" | "dark" | "ghost" | "danger";
type BtnSize = "lg" | "md" | "sm" | "xs";
const btnVariantClass: Record<BtnVariant, string> = {
  primary: "bg-[var(--color-sp-red)] text-white border-[var(--color-sp-red)] hover:bg-[var(--color-sp-red-dark)] hover:border-[var(--color-sp-red-dark)]",
  outline: "bg-transparent text-[var(--color-sp-red)] border-[var(--color-sp-red)] hover:bg-[var(--color-sp-red-tint)]",
  dark: "bg-[var(--color-sp-black)] text-white border-[var(--color-sp-black)] hover:bg-black",
  ghost: "bg-transparent text-[var(--color-sp-black)] border-[var(--color-sp-black-100)] hover:bg-[var(--color-sp-black-50)]",
  danger: "bg-white text-[var(--color-sp-red)] border-[var(--color-sp-red)] hover:bg-[var(--color-sp-red-tint)]",
};
const btnSizeClass: Record<BtnSize, string> = {
  lg: "text-[15px] px-6 py-3.5",
  md: "text-[13px] px-[18px] py-[11px]",
  sm: "text-[11px] px-3.5 py-[7px]",
  xs: "text-[10px] px-2.5 py-[5px]",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  full = false,
  disabled,
  type = "button",
  onClick,
  className = "",
}: {
  children: ReactNode;
  variant?: BtnVariant;
  size?: BtnSize;
  full?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`sp-display inline-flex items-center justify-center font-extrabold tracking-wide cursor-pointer border-2 whitespace-nowrap transition-colors ${btnVariantClass[variant]} ${btnSizeClass[size]} ${full ? "w-full" : ""} disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  href,
  variant = "primary",
  size = "md",
  full = false,
  className = "",
}: {
  children: ReactNode;
  href: string;
  variant?: BtnVariant;
  size?: BtnSize;
  full?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`sp-display inline-flex items-center justify-center font-extrabold tracking-wide cursor-pointer border-2 whitespace-nowrap transition-colors ${btnVariantClass[variant]} ${btnSizeClass[size]} ${full ? "w-full" : ""} ${className}`}
    >
      {children}
    </Link>
  );
}

/* ── BADGE ─────────────────────────────────────────────── */
type BadgeColor = "red" | "dark" | "gray" | "green" | "blue" | "amber" | "outline";
const badgeColor: Record<BadgeColor, string> = {
  red: "bg-[var(--color-sp-red)] text-white",
  dark: "bg-[var(--color-sp-black)] text-white",
  gray: "bg-[var(--color-sp-black-100)] text-[var(--color-sp-black-600)]",
  green: "bg-[var(--color-sp-green)] text-white",
  blue: "bg-[var(--color-sp-blue)] text-white",
  amber: "bg-[var(--color-sp-amber-tint)] text-[var(--color-sp-amber)] border border-[#f0c040]",
  outline: "bg-transparent text-[var(--color-sp-red)] border-[1.5px] border-[var(--color-sp-red)]",
};

export function Badge({ children, color = "gray", className = "" }: { children: ReactNode; color?: BadgeColor; className?: string }) {
  return (
    <span
      className={`sp-display inline-block font-extrabold text-[9px] tracking-[0.6px] uppercase px-2 py-[3px] leading-[1.4] ${badgeColor[color]} ${className}`}
    >
      {children}
    </span>
  );
}

/* ── CHIP ─────────────────────────────────────────────── */
export function Chip({
  children,
  active = false,
  onClick,
  className = "",
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`sp-display inline-block text-[11px] font-bold px-3 py-[5px] border-[1.5px] cursor-pointer whitespace-nowrap transition-colors ${
        active
          ? "bg-[var(--color-sp-red)] text-white border-[var(--color-sp-red)]"
          : "bg-white text-[var(--color-sp-black)] border-[var(--color-sp-black-100)] hover:border-[var(--color-sp-black-400)]"
      } ${className}`}
    >
      {children}
    </button>
  );
}

/* ── INPUT ─────────────────────────────────────────────── */
export function InputGroup({
  label,
  helper,
  error,
  children,
}: {
  label?: string;
  helper?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className="sp-display block text-[10px] font-bold uppercase tracking-[0.6px] text-[var(--color-sp-black-600)] mb-[5px]">
          {label}
        </label>
      )}
      {children}
      {error ? (
        <div className="text-[10px] text-[var(--color-sp-red)] mt-1 font-semibold">⚠ {error}</div>
      ) : helper ? (
        <div className="text-[10px] text-[var(--color-sp-black-400)] mt-1">{helper}</div>
      ) : null}
    </div>
  );
}

export function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  className = "",
  ...rest
}: {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: boolean;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "value" | "onChange">) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`sp-body w-full border-[1.5px] ${
        error ? "border-[var(--color-sp-red)]" : "border-[var(--color-sp-black-100)]"
      } px-3 py-[10px] text-[13px] bg-white text-[var(--color-sp-black)] outline-none focus:border-[var(--color-sp-red)] transition-colors ${className}`}
      {...rest}
    />
  );
}

export function Textarea({
  value,
  onChange,
  placeholder,
  rows = 4,
  className = "",
}: {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`sp-body w-full border-[1.5px] border-[var(--color-sp-black-100)] px-3 py-[10px] text-[13px] bg-white text-[var(--color-sp-black)] outline-none focus:border-[var(--color-sp-red)] transition-colors resize-none ${className}`}
    />
  );
}

export function Select({
  value,
  onChange,
  children,
  className = "",
}: {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`sp-body w-full border-[1.5px] border-[var(--color-sp-black-100)] px-3 py-[10px] text-[13px] bg-white text-[var(--color-sp-black)] outline-none focus:border-[var(--color-sp-red)] transition-colors appearance-none bg-no-repeat pr-8 cursor-pointer ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23777'/%3E%3C/svg%3E")`,
        backgroundPosition: "right 12px center",
        backgroundSize: "8px",
      }}
    >
      {children}
    </select>
  );
}

/* ── REKBER BANNER ─────────────────────────────────────────── */
export function RekberBanner({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`bg-[var(--color-sp-red-tint)] border border-[var(--color-sp-red)] text-[var(--color-sp-red)] sp-display font-bold uppercase tracking-wide ${
        compact ? "text-[10px] px-3 py-2" : "text-[11px] px-4 py-3"
      }`}
    >
      🔒 Rekber aktif — Dana ditahan sampai barang diterima
    </div>
  );
}

/* ── PHOTO PLACEHOLDER ─────────────────────────────────────── */
export function PhotoPlaceholder({ label = "foto sepeda", className = "" }: { label?: string; className?: string }) {
  return (
    <div className={`sp-photo-placeholder flex items-center justify-center text-[#bbb] text-[11px] italic ${className}`}>
      [ {label} ]
    </div>
  );
}

/* ── STATUS BADGE FROM ORDER STATUS ────────────────────────── */
export function OrderStatusBadge({ status }: { status: string }) {
  const map: Record<string, { color: BadgeColor; label: string }> = {
    pending_payment: { color: "amber", label: "Menunggu Bayar" },
    paid: { color: "blue", label: "Dibayar" },
    shipped: { color: "blue", label: "Dikirim" },
    delivered: { color: "green", label: "Sampai Tujuan" },
    completed: { color: "dark", label: "Selesai" },
    cancelled: { color: "gray", label: "Dibatalkan" },
    disputed: { color: "red", label: "Sengketa" },
  };
  const s = map[status] ?? { color: "gray" as const, label: status };
  return <Badge color={s.color}>{s.label}</Badge>;
}

/* ── SECTION TITLE ─────────────────────────────────────────── */
export function SectionLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`sp-display text-[10px] font-bold uppercase tracking-[1px] text-[var(--color-sp-black-400)] ${className}`}
    >
      {children}
    </div>
  );
}
