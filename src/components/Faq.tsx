"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ChevronIcon } from "./Icons";
import { Heading, Stagger, StaggerItem } from "./Reveal";
import { siteData } from "@/lib/site";

const FAQS: { q: string; a: string }[] = [
  {
    q: "ใช้กับเกมเวอร์ชันไหนได้บ้าง?",
    a: `รองรับเกมเวอร์ชัน ${siteData.version} เท่านั้น ถ้า OPTCGSim อัปเดตเป็นเวอร์ชันใหม่กว่านี้ ให้กลับมาที่หน้านี้แล้วติดตั้งม็อดซ้ำอีกครั้ง`,
  },
  {
    q: "เล่นออนไลน์กับคนที่ไม่ได้ลงม็อดนี้ได้ไหม?",
    a: "ได้ตามปกติ เพราะม็อดนี้แก้ไขเฉพาะภาพและข้อความที่แสดงผลในเครื่องของคุณเองเท่านั้น ไม่กระทบกับผู้เล่นคนอื่น",
  },
  {
    q: "ทำไม Windows ถึงเตือนว่าไฟล์อันตราย?",
    a: 'เพราะตัวติดตั้งยังไม่มีลายเซ็นดิจิทัลจากนักพัฒนา ซึ่งเป็นเรื่องปกติของม็อดจากชุมชน กด "More info" แล้วเลือก "Run anyway" เพื่อติดตั้งต่อ และตรวจค่า SHA-256 ของไฟล์ให้ตรงกับที่แสดงในหน้านี้ได้',
  },
  {
    q: "กลับไปใช้ภาษาอังกฤษได้ไหม?",
    a: 'ได้เสมอ บน Windows มีปุ่ม "กลับเป็นภาษาอังกฤษ" ในตัวติดตั้ง กดครั้งเดียวก็คืนไฟล์ต้นฉบับได้ทันที บน Android และ iOS ให้ติดตั้งเกมต้นฉบับทับตามปกติ',
  },
  {
    q: "ทำไม iOS ต้องเซ็นไฟล์ใหม่ทุก 7 วัน?",
    a: "เป็นข้อจำกัดของ Apple สำหรับบัญชี Apple ID แบบฟรีที่ใช้เซ็นแอปเอง (sideload) ซึ่งมีอายุใช้งานสูงสุด 7 วันต่อครั้ง หากมีบัญชีนักพัฒนาแบบเสียเงินจะใช้ได้นานขึ้น",
  },
  {
    q: "การ์ดใบใหม่ยังเป็นภาษาอังกฤษอยู่ ทำไม?",
    a: "เป็นการ์ดที่ยังไม่ได้รับการแปลในรุ่นนี้ และการ์ดที่ไม่มีข้อความสกิลบนรูปก็จะคงไว้เหมือนเดิม จะทยอยแปลเพิ่มในอัปเดตรุ่นถัดไป",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq-section">
      <div className="wrap-narrow stack gap22">
        <Heading>คำถามที่พบบ่อย</Heading>
        <Stagger className="stack" >
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <StaggerItem key={f.q} className="acc-item">
                <div className="acc">
                  <button
                    type="button"
                    className="acc-btn"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{f.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ display: "flex" }}>
                      <ChevronIcon />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${i}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="acc-body">{f.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
