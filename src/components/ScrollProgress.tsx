"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Ship } from "./Art";

/** A rope along the top of the screen; a little ship sails along it as you scroll down the page. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 22, restDelta: 0.001 });
  const left = useTransform(progress, (v) => `calc(${v * 100}% - ${v * 44}px)`);
  return (
    <div className="sea-progress" aria-hidden="true">
      <motion.div className="rope" style={{ scaleX: progress }} />
      <motion.div className="ship" style={{ left }}>
        <Ship size={44} />
      </motion.div>
    </div>
  );
}
