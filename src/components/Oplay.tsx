"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Chest } from "./Art";
import { Heading, Reveal } from "./Reveal";
import { siteConfig } from "@/config/site.config";

const EXTENSION_LINKS = [
  { label: "Chrome", href: "https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo" },
  { label: "Edge", href: "https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd" },
  { label: "Firefox", href: "https://addons.mozilla.org/firefox/addon/tampermonkey/" },
];

/** Install guide for the OPlayTCG userscript (hover a card -> Thai skill text). Link lives in site.config.ts. */
export default function Oplay() {
  const url = siteConfig.oplay.userscript;
  const [hover, setHover] = useState(false);

  return (
    <section id="install">
      <div className="wrap-narrow stack gap24">
        <div>
          <Heading>ติดตั้งสคริปต์ OPlayTCG ภาษาไทย</Heading>
          <Reveal delay={0.1}>
            <p style={{ marginTop: 8, fontSize: 14, color: "#d9ccaf" }}>
              สคริปต์เสริม (คอมพิวเตอร์ใช้ได้เต็มรูปแบบ มือถือดูหัวข้อด้านล่าง): ชี้การ์ดบน oplaytcg.com แล้วกล่องข้อความสกิลบนการ์ดใบใหญ่จะเป็นภาษาไทย
              หน้าตาเหมือนการ์ดไทยในม็อด OPTCGSim แจกเฉพาะตัวอักษรคำแปล ไม่มีรูปการ์ด
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="sheet paper" style={{ borderTopLeftRadius: 14 }}>
            <div className="panel">
              <div className="steps">
                <h3>ติดตั้งใน 2 ขั้นตอน</h3>
                <div className="list">
                  <div className="step on">
                    <div className="n" aria-hidden="true">
                      1
                    </div>
                    <div className="body">
                      <div className="head">
                        <b>ติดตั้งส่วนขยาย Tampermonkey (ครั้งเดียว)</b>
                      </div>
                      <p>เลือกตามเบราว์เซอร์ที่ใช้ แล้วกดเพิ่มส่วนขยาย</p>
                      <p style={{ marginTop: 6 }}>
                        <b>ผู้ใช้ Chrome:</b> เปิด chrome://extensions → กด &quot;รายละเอียด&quot; ที่ Tampermonkey → เปิดสวิตช์
                        &quot;อนุญาตสคริปต์ของผู้ใช้&quot; (Allow User Scripts) ถ้าไม่เปิด สคริปต์จะไม่ทำงาน
                      </p>
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
                        {EXTENSION_LINKS.map((e) => (
                          <a key={e.label} className="btn small ghost" href={e.href} target="_blank" rel="noopener">
                            {e.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="step on">
                    <div className="n" aria-hidden="true">
                      2
                    </div>
                    <div className="body">
                      <div className="head">
                        <b>กดติดตั้งสคริปต์ภาษาไทย</b>
                      </div>
                      <p>Tampermonkey จะเปิดหน้ายืนยัน กด &quot;ติดตั้ง&quot; (Install) หนึ่งครั้ง แล้วเปิด oplaytcg.com ได้เลย</p>
                      <div className="dl" style={{ marginTop: 8 }}>
                        <motion.a
                          className="btn big"
                          href={url || undefined}
                          aria-disabled={!url}
                          onHoverStart={() => setHover(true)}
                          onHoverEnd={() => setHover(false)}
                          whileHover={url ? { y: -2, scale: 1.02 } : undefined}
                          whileTap={url ? { scale: 0.97 } : undefined}
                        >
                          <Chest size={34} open={Boolean(url) && hover} />
                          <span>{url ? "ติดตั้งสคริปต์ OPlayTCG ภาษาไทย" : "ลิงก์ยังไม่พร้อม"}</span>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="hand" style={{ fontSize: 14, lineHeight: 1.9, color: "var(--ink-soft)", paddingLeft: 4 }}>
                <li>✦ เข้าเว็บแล้วมีข้อความ &quot;OPlay ไทย พร้อมใช้งาน&quot; ขึ้นด้านล่างจอ แปลว่าสคริปต์ทำงานแล้ว</li>
                <li>✦ กด Alt+T เปิด/ปิดคำแปลบนการ์ด · กด Alt+P เปิดป๊อปอัปข้างเมาส์ (สำหรับการ์ดใบเล็กที่ยังไม่มีกล่องแปล)</li>
                <li>✦ การ์ดที่ไม่มีข้อความสกิล หรือยังไม่ได้แปล จะไม่มีป๊อปอัป</li>
                <li>✦ มือถือ (Android / iPhone): ดูหัวข้อ &quot;ใช้บนมือถือ&quot; ด้านล่าง</li>
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="sheet paper" style={{ borderTopLeftRadius: 14 }}>
            <div className="panel">
              <div className="steps">
                <h3>ใช้บนมือถือ (ทดลอง)</h3>
                <ul className="hand" style={{ fontSize: 14, lineHeight: 1.9, color: "var(--ink-soft)", paddingLeft: 4 }}>
                  <li>
                    ✦ <b>Android:</b> ใช้เบราว์เซอร์ Firefox สำหรับ Android แล้วเพิ่มส่วนขยาย Tampermonkey หรือ Violentmonkey จากนั้นกดปุ่มติดตั้งสคริปต์ด้านบนเหมือนบนคอมพิวเตอร์
                    (Chrome บน Android ลงสคริปต์ไม่ได้)
                  </li>
                  <li>
                    ✦ <b>iPhone / iPad:</b> ใช้แอป Userscripts (ทำงานใน Safari) หรือเบราว์เซอร์ Orion แล้วเปิดลิงก์สคริปต์ (ยังไม่ได้ทดสอบกับอุปกรณ์ Apple)
                  </li>
                  <li>
                    ✦ เข้า oplaytcg.com แล้วแตะปุ่มส้ม &quot;ไทย&quot; มุมขวาล่างของจอ เปิดสวิตช์ &quot;โหมดแตะอ่านการ์ด&quot; จากนั้นแตะการ์ดใบไหนก็ได้
                    เพื่อดูสกิลภาษาไทยในแผงด้านล่าง (ปิดสวิตช์เมื่อจะเล่นตามปกติ)
                  </li>
                  <li>✦ หน้าที่มีการ์ดใบใหญ่ เช่น หน้าการ์ดเดี่ยว จะเห็นกล่องไทยทับบนการ์ดโดยไม่ต้องเปิดโหมดแตะอ่าน</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="warn" role="note">
            <p>
              เป็นสคริปต์แฟนเมด ไม่เกี่ยวข้องกับ OPlayTCG หรือ Bandai สคริปต์แค่แสดงข้อความเพิ่มบนหน้าเว็บในเครื่องของคุณ
              ไม่ส่งข้อมูลใดออกไป และไม่แตะระบบเกมหรือผลการแข่ง
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
