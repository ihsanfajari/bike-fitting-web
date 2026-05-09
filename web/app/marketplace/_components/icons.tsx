type IconProps = { size?: number; className?: string };

const base = (s: number) => ({ width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const });

export const IconHome = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M3 11l9-8 9 8v10a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z"/></svg>
);
export const IconSearch = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
);
export const IconPlus = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M12 5v14M5 12h14"/></svg>
);
export const IconChat = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12z"/></svg>
);
export const IconUser = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
);
export const IconBell = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M18 16V11a6 6 0 0 0-12 0v5l-2 3h16zM10 21a2 2 0 0 0 4 0"/></svg>
);
export const IconHeart = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>
);
export const IconHeartFill = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className} fill="currentColor" stroke="none"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>
);
export const IconShield = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M12 2 4 5v7c0 5 3.5 9 8 10 4.5-1 8-5 8-10V5z"/><path d="m9 12 2 2 4-4"/></svg>
);
export const IconChevronRight = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="m9 6 6 6-6 6"/></svg>
);
export const IconChevronLeft = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="m15 6-6 6 6 6"/></svg>
);
export const IconChevronDown = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="m6 9 6 6 6-6"/></svg>
);
export const IconShare = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>
);
export const IconStar = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} className={className} fill="currentColor" stroke="none"><path d="m12 2 3 7 7 .5-5.5 4.5L18 21l-6-3.5L6 21l1.5-7L2 9.5 9 9z"/></svg>
);
export const IconMapPin = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M12 21s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
);
export const IconWallet = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M16 12h2"/><path d="M3 9V7a2 2 0 0 1 2-2h12"/></svg>
);
export const IconTrendUp = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="m3 17 6-6 4 4 8-8M14 7h7v7"/></svg>
);
export const IconBox = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="m21 8-9-5-9 5 9 5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>
);
export const IconFire = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} className={className} fill="currentColor" stroke="none"><path d="M12 2c1 3-1 5-1 7a3 3 0 0 0 5 2c0 4-2 7-4 7s-6-2-6-7c0-4 4-5 6-9z"/></svg>
);
export const IconCheck = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="m5 12 5 5L20 7"/></svg>
);
export const IconClock = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
);
export const IconTruck = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M3 7h11v10H3zM14 11h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
);
export const IconSend = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg>
);
export const IconX = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M18 6 6 18M6 6l12 12"/></svg>
);
