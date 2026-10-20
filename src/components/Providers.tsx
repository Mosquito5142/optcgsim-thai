"use client";

import { MotionConfig } from "motion/react";
import ScrollProgress from "./ScrollProgress";

/** reducedMotion="user": people who turned animations off in their OS get no transform animations. */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      {children}
    </MotionConfig>
  );
}
