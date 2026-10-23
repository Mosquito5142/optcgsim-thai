"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { Waves, WaxSeal } from "./Art";
import { DesktopIcon } from "./Icons";
import { siteData } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

function GlobeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
    </svg>
  );
}

const CHOICES = [
  {
    href: "/optcgsim/",
    icon: <DesktopIcon />,
    name: "OPTCGSim",
    tag: "เกมที่โหลดลงเครื่อง",
    text: `แปลสกิลการ์ด ${siteData.cards.toLocaleString("en-US")} ใบ และข้อความในเกม ${siteData.uiLines.toLocaleString("en-US")} บรรทัดเป็นภาษาไทย ติดตั้งด้วยตัวติดตั้งหรือไฟล์ APK / IPA`,
    chips: ["Windows", "Android", "iOS"],
    cta: "ไปหน้า OPTCGSim",
  },
  {
    href: "/oplaytcg/",
    icon: <GlobeIcon />,
    name: "OPlayTCG",
    tag: "เว็บเล่นออนไลน์ (oplaytcg.com)",
    text: "อ่านสกิลเป็นภาษาไทยบนการ์ดใบใหญ่ ด้วยสคริปต์เสริมในเบราว์เซอร์ ไม่ต้องโหลดเกมเพิ่ม ติดตั้งครั้งเดียว",
    chips: ["คอมพิวเตอร์", "มือถือ (ทดลอง)"],
    cta: "ไปหน้า OPlayTCG",
  },
];

/** Home page: pick the product. Same night-sea hero as the product pages, with two big "map" cards. */
export default function Landing() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const starsY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const sunY = useTransform(scrollYProgress, [0, 1], [0, 170]);
  const wave1 = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const wave2 = useTransform(scrollYProgress, [0, 1], [0, 18]);

  return (
    <section className="hero landing" ref={ref} id="top">
      <motion.div className="stars" style={{ y: starsY }} aria-hidden="true" />
      <motion.div className="sun" style={{ y: sunY }} aria-hidden="true" />
      <div className="wrap">
        <motion.div className="landing-head" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: EASE }}>
          <span className="badge">ม็อดแฟนเมด • ไม่เกี่ยวข้องกับ Bandai</span>
          <h1>
            การ์ดวันพีซภาษา<span>ไทย</span> เลือกว่าคุณเล่นแบบไหน
          </h1>
          <p className="lead">มีให้สองทาง: เกม OPTCGSim ที่ติดตั้งลงเครื่อง และเว็บ OPlayTCG ที่เล่นในเบราว์เซอร์ แต่ละทางมีวิธีติดตั้งและคลิปสอนของตัวเอง</p>
        </motion.div>

        <div className="choices">
          {CHOICES.map((c, i) => (
            <motion.div
              key={c.href}
              className="choice paper"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 + i * 0.12, ease: EASE }}
              whileHover={{ y: -6 }}
            >
              <WaxSeal size={58}>{c.icon}</WaxSeal>
              <h2>{c.name}</h2>
              <b className="tag-line">{c.tag}</b>
              <p>{c.text}</p>
              <div className="chips">
                {c.chips.map((x) => (
                  <span key={x} className="chip mute">
                    {x}
                  </span>
                ))}
              </div>
              <Link className="btn" href={c.href}>
                {c.cta}
              </Link>
            </motion.div>
          ))}
        </div>
        <p className="faint landing-hint">ไม่แน่ใจ? ถ้าเล่นเกมที่โหลดลงเครื่อง (OPTCGSim) เลือกซ้าย ถ้าเล่นผ่านเว็บ oplaytcg.com เลือกขวา</p>
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
