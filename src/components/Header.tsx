"use client";

import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { CompassRose } from "./Art";

type Page = "home" | "optcgsim" | "oplaytcg";

const LINKS: Record<Page, { href: string; label: string }[]> = {
  home: [{ href: "#video-section", label: "วิดีโอสอน" }],
  optcgsim: [
    { href: "#download-section", label: "ดาวน์โหลด" },
    { href: "#faq-section", label: "คำถาม" },
  ],
  oplaytcg: [
    { href: "#install", label: "ติดตั้ง" },
    { href: "#faq-section", label: "คำถาม" },
  ],
};

/** Wooden plank header; the compass needle turns while you scroll. `page` picks the quick links and the active tab. */
export default function Header({ page }: { page: Page }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));
  const needle = useTransform(scrollY, [0, 3000], [0, 720]);

  return (
    <header className={`site-header wood${scrolled ? " scrolled" : ""}`}>
      <div className="wrap">
        <Link className="brand" href="/" aria-label="ม็อดการ์ดภาษาไทย หน้าแรก">
          <div className="brand-logo" aria-hidden="true">
            <CompassRose size={42} needle={needle} />
          </div>
          <div className="brand-text">
            <b>ม็อดการ์ดภาษาไทย</b>
            <span>One Piece TCG • ไม่เป็นทางการ</span>
          </div>
        </Link>
        <nav aria-label="เมนูหลัก">
          <div className="switch" role="group" aria-label="เลือกหน้า">
            <Link href="/optcgsim/" className={page === "optcgsim" ? "on" : undefined} aria-current={page === "optcgsim" ? "page" : undefined}>
              OPTCGSim
            </Link>
            <Link href="/oplaytcg/" className={page === "oplaytcg" ? "on" : undefined} aria-current={page === "oplaytcg" ? "page" : undefined}>
              OPlayTCG
            </Link>
          </div>
          {LINKS[page].map((l) => (
            <a key={l.href} className="quick" href={l.href}>
              {l.label}
            </a>
          ))}
          <a className="pill" href="#support-section">
            <span className="long">สนับสนุนผู้แปล</span>
            <span className="short">สนับสนุน</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
