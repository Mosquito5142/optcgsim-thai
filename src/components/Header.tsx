"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

/** Sticky header that turns into a blurred bar once the page is scrolled. */
export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="wrap">
        <a className="brand" href="#top" aria-label="ม็อดการ์ดภาษาไทย OPTCGSim">
          <div className="brand-logo" aria-hidden="true">
            ท
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
