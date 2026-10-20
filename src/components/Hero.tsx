"use client";

import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef } from "react";
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

  const glowY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 14]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section className="hero" ref={ref} id="top">
      <motion.div
        className="hero-glow"
        style={{
          y: glowY,
          background:
            "radial-gradient(ellipse 900px 480px at 15% 10%,rgba(226,130,63,.16),transparent 60%),radial-gradient(ellipse 700px 420px at 100% 15%,rgba(111,166,207,.13),transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div className="wrap" style={{ position: "relative" }}>
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
              <span>ดาวน์โหลดสำหรับ {PLATFORM_LABELS[platform]}</span>
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
    </section>
  );
}
