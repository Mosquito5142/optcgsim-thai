"use client";

import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef } from "react";
import { Waves } from "./Art";
import CompareSlider from "./CompareSlider";
import CountUp from "./CountUp";
import { DownloadIcon } from "./Icons";
import { usePlatform } from "./PlatformContext";
import { PLATFORM_LABELS, siteData } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;
const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { platform, detected } = usePlatform();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const starsY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const sunY = useTransform(scrollYProgress, [0, 1], [0, 170]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 14]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const wave1 = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const wave2 = useTransform(scrollYProgress, [0, 1], [0, 18]);

  return (
    <section className="hero" ref={ref} id="top">
      <motion.div className="stars" style={{ y: starsY }} aria-hidden="true" />
      <motion.div className="sun" style={{ y: sunY }} aria-hidden="true" />

      {/* dotted route that draws itself toward an X (decorative) */}
      <svg className="route" viewBox="0 0 1200 700" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M40 640 C 260 520, 420 600, 560 470 S 860 330, 1010 170"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.2, delay: 0.6, ease: "easeInOut" }}
        />
        <motion.path
          d="M996 156 L1024 184 M1024 156 L996 184"
          style={{ stroke: "#e2823f", strokeDasharray: "none", strokeWidth: 6 }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.6, duration: 0.5 }}
        />
      </svg>

      <div className="wrap">
        <motion.div className="hero-text" style={{ y: textY, opacity: textOpacity }} variants={list} initial="hidden" animate="show">
          <motion.span className="badge" variants={rise}>
            ม็อดแฟนเมด • ไม่เกี่ยวข้องกับ Bandai
          </motion.span>
          <motion.h1 variants={rise}>
            เล่น OPTCGSim ด้วยการ์ดและเมนู<span>ภาษาไทย</span>
          </motion.h1>
          <motion.p className="lead" variants={rise}>
            แปลสกิลการ์ดครบ <CountUp value={siteData.cards} /> ใบ และข้อความในเกมอีก <CountUp value={siteData.uiLines} /> บรรทัดเป็นภาษาไทยทั้งหมด
            ติดตั้งง่าย รองรับเกมเวอร์ชัน {siteData.version} และกลับไปใช้ภาษาอังกฤษได้ทุกเมื่อ
          </motion.p>
          <motion.div className="cta-row" variants={rise}>
            <motion.a className="btn" href="#download-section" whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <DownloadIcon />
              <span>ออกเรือ: ดาวน์โหลดสำหรับ {PLATFORM_LABELS[platform]}</span>
            </motion.a>
            <span className="faint">ตรวจพบอุปกรณ์: {PLATFORM_LABELS[detected]} • เปลี่ยนแพลตฟอร์มได้ด้านล่าง</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="compare-3d"
          style={{ y: cardY, rotateX, scale }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
        >
          <CompareSlider />
        </motion.div>
      </div>

      <div className="waves-wrap" aria-hidden="true">
        <motion.div style={{ y: wave1, position: "absolute", inset: 0 }}>
          <Waves color="#1f5560" duration={34} opacity={0.9} reverse />
        </motion.div>
        <motion.div style={{ y: wave2, position: "absolute", inset: 0 }}>
          <Waves color="#16303a" duration={24} />
        </motion.div>
      </div>
    </section>
  );
}
