"use client";

import { motion } from "motion/react";
import { PirateSilhouette } from "./Art";
import { CoffeeIcon, MessageIcon } from "./Icons";
import { Heading, Reveal } from "./Reveal";
import { siteConfig } from "@/config/site.config";
import { asset } from "@/lib/site";

function LinkButton({ href, children, ghost }: { href: string; children: React.ReactNode; ghost?: boolean }) {
  const on = Boolean(href);
  return (
    <motion.a
      className={`btn small${ghost ? " ghost" : ""}`}
      href={on ? href : undefined}
      target={on ? "_blank" : undefined}
      rel={on ? "noopener" : undefined}
      aria-disabled={!on}
      title={on ? undefined : "ยังไม่ได้ตั้งค่าลิงก์"}
      whileHover={on ? { y: -2 } : undefined}
      whileTap={on ? { scale: 0.97 } : undefined}
    >
      {children}
      {!on && " (เร็วๆ นี้)"}
    </motion.a>
  );
}

export default function Support() {
  const { kofi, contact, promptpayQr } = siteConfig.support;
  return (
    <section id="support-section" className="band">
      <div className="wrap support">
        <div className="stack" style={{ gap: 14 }}>
          <Heading>สนับสนุนผู้แปล</Heading>
          <Reveal delay={0.1}>
            <p>
              ม็อดนี้ทำและดูแลต่อเนื่องโดย <strong>{siteConfig.author}</strong> แฟนเกมคนหนึ่งที่อยากให้เพื่อนผู้เล่นชาวไทยเข้าถึงเกมนี้ได้ง่ายขึ้น
              หากชอบผลงานและอยากเป็นกำลังใจ สามารถเลี้ยงกาแฟหรือติดต่อพูดคุยกันได้
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 4 }}>
              <LinkButton href={kofi}>
                <CoffeeIcon />
                สนับสนุนทาง Ko-fi
              </LinkButton>
              <LinkButton href={contact} ghost>
                <MessageIcon />
                ช่องทางติดต่อ
              </LinkButton>
            </div>
          </Reveal>
        </div>
        <Reveal x={40} y={0}>
          <div className="poster paper">
            <span className="ttl">WANTED</span>
            <div className="sil">
              <PirateSilhouette size={130} />
            </div>
            <span className="who">{siteConfig.author}</span>
            <span className="bounty">รางวัลนำจับ: กาแฟหนึ่งแก้ว</span>
            <div className="qr">
              {promptpayQr ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={asset(promptpayQr)} alt="QR พร้อมเพย์สำหรับสนับสนุนผู้แปล" />
              ) : (
                <div className="ph">
                  QR พร้อมเพย์
                  <br />
                  (ยังไม่ได้ใส่)
                </div>
              )}
              <span className="faint" style={{ fontSize: 12 }}>
                สแกนเพื่อสนับสนุน
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
