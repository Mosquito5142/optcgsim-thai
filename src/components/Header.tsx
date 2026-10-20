"use client";

import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useState } from "react";
import { CompassRose } from "./Art";

/** Wooden plank header; the compass needle turns while you scroll. */
export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));
  const needle = useTransform(scrollY, [0, 3000], [0, 720]);

  return (
    <header className={`site-header wood${scrolled ? " scrolled" : ""}`}>
      <div className="wrap">
        <a className="brand" href="#top" aria-label="ม็อดการ์ดภาษาไทย OPTCGSim">
          <div className="brand-logo" aria-hidden="true">
            <CompassRose size={42} needle={needle} />
          </div>
          <div className="brand-text">
            <b>ม็อดการ์ดภาษาไทย</b>
            <span>สำหรับ OPTCGSim • ไม่เป็นทางการ</span>
          </div>
        </a>
        <nav aria-label="เมนูหลัก">
          <a href="#download-section">ดาวน์โหลด</a>
          <a href="#faq-section">คำถามที่พบบ่อย</a>
          <a className="pill" href="#support-section">
            <span className="long">สนับสนุนผู้แปล</span>
            <span className="short">สนับสนุน</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
