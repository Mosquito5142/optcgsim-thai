"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { asset, siteData } from "@/lib/site";

/** English / Thai card text panel on a rolled scroll, with a draggable divider. It sweeps once by itself when it first appears. */
export default function CompareSlider() {
  const [sample, setSample] = useState(0);
  const pos = useMotionValue(50);
  const clip = useTransform(pos, (v) => `inset(0 0 0 ${v}%)`);
  const left = useTransform(pos, (v) => `${v}%`);
  const frameRef = useRef<HTMLDivElement>(null);
  const seen = useInView(frameRef, { once: true, amount: 0.6 });
  const [value, setValue] = useState(50);

  useEffect(() => pos.on("change", (v) => setValue(Math.round(v))), [pos]);

  useEffect(() => {
    if (!seen) return;
    const controls = animate(pos, [92, 18, 50], { duration: 2.2, ease: "easeInOut" });
    return () => controls.stop();
  }, [seen, pos]);

  const pick = (i: number) => {
    setSample(i);
    pos.set(50);
  };
  const dims = siteData.compare[sample] ?? { w: 420, h: 186 };
  const n = sample + 1;

  return (
    <div className="compare" aria-label="ตัวอย่างเปรียบเทียบการ์ดอังกฤษและไทย">
      <div className="compare-tabs" role="group" aria-label="เลือกการ์ดตัวอย่าง">
        {siteData.compare.map((_, i) => (
          <button key={i} type="button" aria-pressed={sample === i} onClick={() => pick(i)}>
            ตัวอย่าง {i + 1}
          </button>
        ))}
      </div>
      <div className="scroll">
        <div className="compare-frame" ref={frameRef} style={{ aspectRatio: `${dims.w} / ${dims.h}` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(`/assets/cmp-${n}-en.webp`)} alt="กล่องข้อความการ์ดต้นฉบับภาษาอังกฤษ" width={dims.w} height={dims.h} />
          <motion.img
            src={asset(`/assets/cmp-${n}-th.webp`)}
            alt="กล่องข้อความการ์ดที่แปลเป็นภาษาไทยแล้ว"
            width={dims.w}
            height={dims.h}
            style={{ clipPath: clip }}
          />
          <motion.div className="compare-divider" style={{ left }} aria-hidden="true" />
          <span className="tag l" aria-hidden="true">
            ENG
          </span>
          <span className="tag r" aria-hidden="true">
            ไทย
          </span>
        </div>
      </div>
      <label>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => pos.set(Number(e.target.value))}
          aria-label="ลากเพื่อเปรียบเทียบการ์ดอังกฤษกับไทย"
        />
        <span>ลากเพื่อเปรียบเทียบการ์ดอังกฤษ-ไทย</span>
      </label>
    </div>
  );
}
