"use client";

/**
 * All artwork here is drawn from scratch as simple SVG shapes (compass, galleon silhouette, chest, wax seal, waves...).
 * Do NOT add characters, logos, flags, ship designs or named items from the One Piece franchise — see README.
 */
import { motion, type MotionValue } from "motion/react";
import type { ReactNode } from "react";

type S = { size?: number; className?: string };

/** Compass rose; `needle` (degrees) can be a scroll-linked motion value so the needle turns while scrolling. */
export function CompassRose({ size = 40, needle, className }: S & { needle?: MotionValue<number> }) {
  const ticks = Array.from({ length: 24 }, (_, i) => i * 15);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1.4" opacity=".7" />
      {ticks.map((a) => (
        <line key={a} x1="50" y1="5" x2="50" y2={a % 90 === 0 ? 16 : 11} stroke="currentColor" strokeWidth={a % 90 === 0 ? 3 : 1.6} transform={`rotate(${a} 50 50)`} />
      ))}
      <polygon points="50,14 56,50 50,86 44,50" fill="currentColor" opacity=".35" />
      <polygon points="14,50 50,44 86,50 50,56" fill="currentColor" opacity=".35" />
      <motion.g style={{ rotate: needle, originX: "50px", originY: "50px" }}>
        <polygon points="50,18 57,50 43,50" fill="#e2823f" />
        <polygon points="50,82 57,50 43,50" fill="#f4ebd9" />
      </motion.g>
      <circle cx="50" cy="50" r="5" fill="currentColor" />
    </svg>
  );
}

/** A generic sailing ship silhouette (plain pennant, no emblem). */
export function Ship({ size = 44, className }: S) {
  return (
    <svg width={size} height={(size * 100) / 120} viewBox="0 0 120 100" className={className} aria-hidden="true">
      <path d="M8 62 H112 L99 85 Q60 94 21 85 Z" fill="currentColor" />
      <rect x="57" y="8" width="5" height="56" fill="currentColor" />
      <path d="M62 14 Q98 28 93 55 H62 Z" fill="currentColor" opacity=".92" />
      <path d="M57 20 Q27 31 25 55 H57 Z" fill="currentColor" opacity=".78" />
      <path d="M62 8 L82 14 L62 21 Z" fill="currentColor" />
      <path d="M112 62 L128 54" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

/** Treasure chest; the lid lifts and gold shows when `open`. */
export function Chest({ open = false, size = 30 }: { open?: boolean; size?: number }) {
  return (
    <svg width={size} height={(size * 56) / 64} viewBox="0 0 64 56" aria-hidden="true">
      <motion.ellipse cx="32" cy="27" rx="21" ry="5" fill="#ffd36e" animate={{ opacity: open ? 1 : 0 }} transition={{ duration: 0.2 }} />
      <rect x="6" y="26" width="52" height="26" rx="4" fill="#7a4a22" stroke="#2a1608" strokeWidth="2.5" />
      <rect x="28" y="26" width="8" height="26" fill="#d9a441" stroke="#2a1608" strokeWidth="1.5" />
      <rect x="27" y="32" width="10" height="9" rx="2" fill="#f1cf7d" stroke="#2a1608" strokeWidth="1.5" />
      <motion.g animate={{ y: open ? -8 : 0, rotate: open ? -7 : 0 }} style={{ originX: "6px", originY: "26px" }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
        <path d="M6 26 Q6 8 32 8 Q58 8 58 26 Z" fill="#8a5628" stroke="#2a1608" strokeWidth="2.5" />
        <rect x="28" y="9" width="8" height="17" fill="#d9a441" stroke="#2a1608" strokeWidth="1.5" />
      </motion.g>
    </svg>
  );
}

/** Red wax seal blob with an icon on top. */
export function WaxSeal({ size = 56, children }: { size?: number; children?: ReactNode }) {
  return (
    <span className="seal" style={{ width: size, height: size }}>
      <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
        <path
          d="M32 3 C40 1 46 8 52 10 C58 14 63 22 60 30 C63 38 58 46 52 52 C46 58 38 63 32 61 C24 63 16 58 12 52 C6 46 1 38 4 30 C1 22 6 14 12 10 C18 6 25 5 32 3 Z"
          fill="#a8322d"
        />
        <circle cx="32" cy="32" r="22" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="2" />
        <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="1.5" />
      </svg>
      <span className="seal-ico">{children}</span>
    </span>
  );
}

/** Two looping wave layers (CSS keyframes drive the drift). */
export function Waves({ color, duration = 26, opacity = 1, reverse = false }: { color: string; duration?: number; opacity?: number; reverse?: boolean }) {
  const path = "M0 60 C100 20 200 100 300 60 S500 20 600 60 S800 100 900 60 S1100 20 1200 60 V120 H0 Z";
  return (
    <div className="wave" style={{ color, opacity, animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }} aria-hidden="true">
      {[0, 1].map((i) => (
        <svg key={i} viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d={path} fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}

/** Generic pirate-captain silhouette (tricorn hat, bandana, eye patch) for the poster. */
export function PirateSilhouette({ size = 120, className }: S) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M12 100 Q14 78 50 74 Q86 78 88 100 Z" fill="currentColor" />
      <circle cx="50" cy="52" r="19" fill="currentColor" />
      <path d="M14 40 Q50 -2 86 40 L74 44 Q50 22 26 44 Z" fill="currentColor" />
      <path d="M20 44 H80 L76 51 H24 Z" fill="currentColor" />
      <rect x="30" y="49" width="40" height="3" fill="#ecdcb4" opacity=".4" />
      <ellipse cx="43" cy="55" rx="5" ry="4" fill="#ecdcb4" opacity=".85" />
      <path d="M33 50 L66 62" stroke="#ecdcb4" strokeWidth="1.6" opacity=".85" />
    </svg>
  );
}

export function Anchor({ size = 20 }: S) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v14" />
      <path d="M8 11h8" />
      <path d="M4 15c0 3 3.5 6 8 6s8-3 8-6" />
      <path d="M2.5 16l1.5-2 2 1.5" />
      <path d="M21.5 16L20 14l-2 1.5" />
    </svg>
  );
}

/** A red X marking the treasure spot; it pops in when `show` turns true. */
export function XMark({ size = 40, show = true }: S & { show?: boolean }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" initial={false} animate={{ scale: show ? 1 : 0, rotate: show ? 0 : -40 }} transition={{ type: "spring", stiffness: 300, damping: 14 }}>
      <path d="M8 8 L32 32 M32 8 L8 32" stroke="#a8322d" strokeWidth="6" strokeLinecap="round" />
    </motion.svg>
  );
}
