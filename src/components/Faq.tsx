"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ChevronIcon } from "./Icons";
import { Heading, Stagger, StaggerItem } from "./Reveal";
import type { FaqItem } from "@/data/faqs";

export default function Faq({ items, id = "faq-section" }: { items: FaqItem[]; id?: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id={id}>
      <div className="wrap-narrow stack gap22">
        <Heading>คำถามที่พบบ่อย</Heading>
        <Stagger className="stack" >
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <StaggerItem key={f.q} className="acc-item">
                <div className="acc paper">
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
