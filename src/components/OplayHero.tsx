"use client";

import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef } from "react";
import { Waves } from "./Art";
import CompareSlider from "./CompareSlider";
import CountUp from "./CountUp";
import { siteData } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;
const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

/** Hero of the OPlayTCG page. The compare slider shows the same Thai text box the script draws on oplaytcg.com. */
export default function OplayHero() {
  const ref = useRef<HTMLElement>(null);
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
      <div className="wrap">
        <motion.div className="hero-text" style={{ y: textY, opacity: textOpacity }} variants={list} initial="hidden" animate="show">
          <motion.span className="badge" variants={rise}>
            สคริปต์เสริมแฟนเมด • ไม่เกี่ยวข้องกับ OPlayTCG / Bandai
          </motion.span>
          <motion.h1 variants={rise}>
            อ่านสกิลการ์ดบน OPlayTCG เป็น<span>ภาษาไทย</span>
          </motion.h1>
          <motion.p className="lead" variants={rise}>
            ติดตั้งสคริปต์ครั้งเดียว แล้วชี้การ์ดใบใหญ่บน oplaytcg.com กล่องข้อความสกิลจะเป็นภาษาไทย หน้าตาเหมือนการ์ดไทยของ OPTCGSim
            มีคำแปลสกิลให้ <CountUp value={siteData.cards} /> ใบ ใช้ได้บนคอมพิวเตอร์ และมือถือแบบทดลอง
          </motion.p>
          <motion.div className="cta-row" variants={rise}>
            <motion.a className="btn" href="#install" whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <span>ออกเรือ: ติดตั้งสคริปต์ OPlayTCG</span>
            </motion.a>
            <span className="faint">ต้องมีส่วนขยาย Tampermonkey • ติดตั้งใน 2 ขั้นตอน</span>
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
