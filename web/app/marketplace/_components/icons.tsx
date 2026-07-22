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
export const IconArrowRight = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
);
export const IconArrowLeft = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
);
export const IconEye = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
);
export const IconLightbulb = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.2 1 2.5h6c0-1.3.3-1.8 1-2.5A6 6 0 0 0 12 3z"/></svg>
);
export const IconGift = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M20 12v9H4v-9M2 7h20v5H2zM12 21V7M12 7S11 3 8.5 3 6 6 12 7zM12 7s1-4 3.5-4S18 6 12 7z"/></svg>
);
export const IconBag = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M6 8h12l1 13H5zM9 8V6a3 3 0 0 1 6 0v2"/></svg>
);
export const IconEdit = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
);
export const IconSettings = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H1a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 2.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 7 2.6h.1A1.6 1.6 0 0 0 9 1.1V1a2 2 0 1 1 4 0v.1A1.6 1.6 0 0 0 15 2.6a1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7h.1a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/></svg>
);
export const IconAlertTriangle = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/></svg>
);
export const IconHourglass = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M6 3h12M6 21h12M6 3c0 5 6 5 6 9s-6 4-6 9M18 3c0 5-6 5-6 9s6 4 6 9"/></svg>
);
export const IconPaperclip = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M21 8.5 12 17a4 4 0 0 1-6-5l8-8a2.7 2.7 0 0 1 4 4l-8 8a1.3 1.3 0 0 1-2-2l7.5-7.5"/></svg>
);
export const IconSparkle = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/></svg>
);
export const IconRuler = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M15 3 21 9 9 21 3 15z"/><path d="M8 8l1.5 1.5M11 5l2 2M5 11l2 2M12.5 12.5l1.5 1.5"/></svg>
);
export const IconBank = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M3 10 12 4l9 6M4 10v9M20 10v9M8 10v9M16 10v9M3 21h18"/></svg>
);
export const IconCamera = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5"/></svg>
);
export const IconArrowDownCircle = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12l4 4 4-4"/></svg>
);
export const IconArrowUpCircle = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="9"/><path d="M12 16V8M8 12l4-4 4 4"/></svg>
);
export const IconHandWave = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M7 11V6.5a1.5 1.5 0 0 1 3 0V10m0-.5V5a1.5 1.5 0 0 1 3 0v5m0-.5V6.5a1.5 1.5 0 0 1 3 0V13a6 6 0 0 1-6 6h-.5a6 6 0 0 1-5.3-3.2L4 13.5a1.6 1.6 0 0 1 2.7-1.7L7 12"/></svg>
);

/* ── Category icons (bike types + components) ── */
export const IconBike = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><circle cx="5.5" cy="16.5" r="3.5"/><circle cx="18.5" cy="16.5" r="3.5"/><path d="M5.5 16.5 9 9h6M12 16.5 9 9M15 9l3.5 7.5M14 6h2.5"/></svg>
);
export const IconMountain = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M3 19 9.5 8l3.5 6 2.5-4L21 19z"/></svg>
);
export const IconGravel = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M3 15c3-3 6 3 9 0s6 3 9 0"/><path d="M5 19h.01M10 19.5h.01M15 19h.01M19 19.5h.01"/></svg>
);
export const IconFolding = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M17 3l4 4-4 4"/><path d="M21 7H8a5 5 0 0 0 0 10h4"/><path d="M9 13l-4 4 4 4"/></svg>
);
export const IconBolt = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>
);
export const IconKids = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="5" r="2.5"/><path d="M12 7.5V15m0-5-4 2m4-2 4 2M9 21l3-6 3 6"/></svg>
);
export const IconFrame = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M4 18 9 8h9l-4 10zM9 8l5 10M18 8l-2-3h-2"/></svg>
);
export const IconGear = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></svg>
);
export const IconWheel = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="1.5"/><path d="M12 3.5v7M12 13.5v7M3.5 12h7M13.5 12h7"/></svg>
);
export const IconCockpit = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M4 9h4a3 3 0 0 1 3 3v4m2 0v-4a3 3 0 0 1 3-3h4"/><circle cx="4" cy="9" r="1.5"/><circle cx="20" cy="9" r="1.5"/><path d="M11 16h2"/></svg>
);
export const IconBackpack = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M6 9a6 6 0 0 1 12 0v11H6zM9 9V6a3 3 0 0 1 6 0v3M9 13h6"/></svg>
);
export const IconShirt = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M8 3 4 6l2 3 2-1v10h8V8l2 1 2-3-4-3-2 2H10z"/></svg>
);
export const IconTag = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M3 12V4h8l9 9-7 7z"/><circle cx="7.5" cy="7.5" r="1.3"/></svg>
);
export const IconHelpCircle = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3M12 17h.01"/></svg>
);
