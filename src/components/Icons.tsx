import type { ReactNode } from "react";

function Svg({ size = 20, stroke = 1.7, children }: { size?: number; stroke?: number; children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

type P = { size?: number };

export const DownloadIcon = ({ size = 20 }: P) => (
  <Svg size={size} stroke={2}>
    <path d="M12 3v12" />
    <path d="M7 11l5 5 5-5" />
    <path d="M4 19h16" />
  </Svg>
);
export const WarnIcon = ({ size = 18 }: P) => (
  <Svg size={size} stroke={1.8}>
    <path d="M12 3l10 18H2L12 3z" />
    <path d="M12 10v4" />
    <path d="M12 17h.01" />
  </Svg>
);
export const CopyIcon = ({ size = 16 }: P) => (
  <Svg size={size} stroke={1.8}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </Svg>
);
export const ChevronIcon = ({ size = 18 }: P) => (
  <Svg size={size} stroke={2}>
    <path d="M6 9l6 6 6-6" />
  </Svg>
);
export const ClockIcon = ({ size = 12 }: P) => (
  <Svg size={size} stroke={2.2}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </Svg>
);
export const CheckIcon = ({ size = 12 }: P) => (
  <Svg size={size} stroke={2.4}>
    <path d="M5 13l4 4L19 7" />
  </Svg>
);
export const DesktopIcon = ({ size = 20 }: P) => (
  <Svg size={size}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8" />
    <path d="M12 16v4" />
  </Svg>
);
export const PhoneIcon = ({ size = 18 }: P) => (
  <Svg size={size}>
    <rect x="6" y="2" width="12" height="20" rx="4" />
    <path d="M10 18h4" />
  </Svg>
);
export const IphoneIcon = ({ size = 18 }: P) => (
  <Svg size={size}>
    <rect x="6" y="2" width="12" height="20" rx="3" />
    <path d="M10 5h4" />
    <circle cx="12" cy="18" r="1" />
  </Svg>
);
export const ChatIcon = ({ size = 24 }: P) => (
  <Svg size={size}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 9h8" />
    <path d="M8 13h5" />
  </Svg>
);
export const SlidersIcon = ({ size = 24 }: P) => (
  <Svg size={size}>
    <path d="M4 6h10" />
    <path d="M18 6h2" />
    <circle cx="16" cy="6" r="2" />
    <path d="M4 12h2" />
    <path d="M10 12h10" />
    <circle cx="8" cy="12" r="2" />
    <path d="M4 18h10" />
    <path d="M18 18h2" />
    <circle cx="16" cy="18" r="2" />
  </Svg>
);
export const PaletteIcon = ({ size = 24 }: P) => (
  <Svg size={size}>
    <path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.3-.5-.8-.5-1.2 0-1.1.9-2 2-2h2.3A4.2 4.2 0 0 0 21.5 11 10 10 0 0 0 12 2z" />
    <circle cx="7.5" cy="10.5" r="1.3" />
    <circle cx="11" cy="7" r="1.3" />
    <circle cx="15.5" cy="9" r="1.3" />
  </Svg>
);
export const CoffeeIcon = ({ size = 18 }: P) => (
  <Svg size={size}>
    <path d="M3 8h14v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
    <path d="M17 9h2a2 2 0 0 1 0 4h-2" />
    <path d="M7 2c0 1-1 1-1 2" />
    <path d="M11 2c0 1-1 1-1 2" />
  </Svg>
);
export const MessageIcon = ({ size = 18 }: P) => (
  <Svg size={size}>
    <path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4 9 9 0 0 1-3.1-.6L3 21l1.7-5A8.4 8.4 0 1 1 21 11.5z" />
  </Svg>
);
