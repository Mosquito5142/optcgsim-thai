"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Heading, Reveal, Stagger, StaggerItem } from "./Reveal";
import { siteConfig } from "@/config/site.config";

/** Click-to-play YouTube embed: nothing from YouTube loads (no cookies) until the player is opened. */
function Player({ id, title }: { id: string; title: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="vplayer">
      {open ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setOpen(true)} aria-label={`เล่นวิดีโอ: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" width={480} height={360} />
          <span className="vplay" aria-hidden="true">
            <motion.i whileHover={{ scale: 1.12 }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
              </svg>
            </motion.i>
          </span>
        </button>
      )}
    </div>
  );
}

export default function Videos() {
  const { channel, channelName, videos } = siteConfig.youtube;
  return (
    <section id="video-section">
      <div className="wrap stack gap32">
        <div>
          <Heading>ดูวิธีติดตั้งแบบวิดีโอ</Heading>
          <Reveal delay={0.1}>
            <p style={{ marginTop: 8, fontSize: 14, color: "#d9ccaf" }}>
              ทำตามคลิปได้ทีละขั้นตั้งแต่เข้าเว็บ ดาวน์โหลด จนใช้งานได้ (พากย์และแปลด้วย AI)
            </p>
          </Reveal>
        </div>

        <Stagger className="vids">
          {videos.map((v) => (
            <StaggerItem key={v.id} className="vcard paper">
              <Player id={v.id} title={v.title} />
              <h3>{v.title}</h3>
              <p>{v.text}</p>
              <a className="vlink" href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener">
                เปิดบน YouTube
              </a>
            </StaggerItem>
          ))}
        </Stagger>

        {channel && (
          <Reveal>
            <div className="vchannel">
              <span>มีคลิปใหม่และอัปเดตม็อดที่ช่อง</span>
              <motion.a className="btn small" href={channel} target="_blank" rel="noopener" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                ติดตามช่อง {channelName}
              </motion.a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
