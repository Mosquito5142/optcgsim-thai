"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Counts from 0 to `value` the first time it is visible (shows the final number straight away without JS/animation). */
export default function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    // safety net: never leave a half-counted number if the browser throttles animation frames
    const fallback = setTimeout(() => {
      controls.stop();
      setShown(value);
    }, 2600);
    return () => {
      controls.stop();
      clearTimeout(fallback);
    };
  }, [inView, reduce, value]);

  return <span ref={ref}>{shown.toLocaleString("en-US")}</span>;
}
