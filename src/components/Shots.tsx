"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Heading, Reveal } from "./Reveal";
import { asset } from "@/lib/site";

/** One screenshot that drifts at its own speed while the page scrolls past it (`drift` px up/down). */
function Shot({
  src,
  width,
  height,
  alt,
  caption,
  drift,
  narrow,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  drift: number;
  narrow?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [drift > 0 ? -1.2 : 1.2, 0, drift > 0 ? 1.2 : -1.2]);

  return (
    <motion.figure ref={ref} className={narrow ? "narrow-shot" : undefined} style={{ y, rotate }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(src)} width={width} height={height} loading="lazy" alt={alt} />
      <figcaption>{caption}</figcaption>
    </motion.figure>
  );
}

export default function Shots() {
  return (
    <section className="shots">
      <div className="wrap stack gap32">
        <Heading>ภาพจริงจากโปรแกรมและเกม</Heading>
        <Reveal>
          <div className="grid">
            <Shot
              src="/assets/installer-window.webp"
              width={616}
              height={529}
              alt="หน้าต่างตัวติดตั้งม็อดบน Windows มีปุ่มติดตั้งภาษาไทยและกลับเป็นภาษาอังกฤษ"
              caption="ตัวติดตั้งบน Windows — เลือกโฟลเดอร์เกม แล้วกดปุ่มเดียว"
              drift={34}
              narrow
            />
            <Shot
              src="/assets/game-menu.webp"
              width={737}
              height={414}
              alt="เมนูหลักของเกม OPTCGSim ที่เป็นภาษาไทยทั้งหมด"
              caption="เมนูหลักของเกมเป็นภาษาไทย (ถ่ายจากเวอร์ชัน Android)"
              drift={-34}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
