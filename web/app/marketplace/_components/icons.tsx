/**
 * Thin-stroke line icons inspired by Lucide / Phosphor.
 * Use currentColor so they inherit text color.
 */

type IconProps = { size?: number; className?: string };

const base = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
});

export const IconSearch = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
);

export const IconHome = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z" /></svg>
);

export const IconChat = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
);

export const IconUser = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);

export const IconPlus = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><path d="M12 5v14M5 12h14" /></svg>
);

export const IconBell = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" /></svg>
);

export const IconHeart = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1 7.8 7.8 7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.8z" /></svg>
);

export const IconHeartFill = ({ size = 20, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1 7.8 7.8 7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

export const IconPin = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
);

export const IconPackage = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><path d="M16 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0-2 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 16 16z" transform="translate(4 0)" /></svg>
);

export const IconStar = ({ size = 20, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8l-6.2 3.3L7 14.2l-5-4.9 6.9-1z" />
  </svg>
);

export const IconLock = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
);

export const IconCamera = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
);

export const IconArrowLeft = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
);

export const IconArrowRight = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
);

export const IconChevronRight = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><path d="M9 6l6 6-6 6" /></svg>
);

export const IconChevronDown = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><path d="M6 9l6 6 6-6" /></svg>
);

export const IconCheck = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><path d="M20 6L9 17l-5-5" /></svg>
);

export const IconX = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><path d="M18 6L6 18M6 6l12 12" /></svg>
);

export const IconShare = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4M12 2v13" /></svg>
);

export const IconSettings = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
);

export const IconSend = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" /></svg>
);

export const IconFilter = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><path d="M22 3H2l8 9.5V19l4 2v-8.5z" /></svg>
);

export const IconWallet = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><rect x="2" y="6" width="20" height="14" rx="2" /><path d="M2 10h20M18 14h.01" /></svg>
);

export const IconBox = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><path d="M21 8l-9-5-9 5v8l9 5 9-5z" /><path d="M3 8l9 5 9-5M12 13v10" /></svg>
);

export const IconEye = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
);

export const IconMore = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
);

export const IconAttach = ({ size = 20, className }: IconProps) => (
  <svg {...base(size, className)}><path d="M21.4 11.05l-9.19 9.19a6 6 0 0 1-8.48-8.48l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
);
