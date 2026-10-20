import CountUp from "./CountUp";
import { Heading, Reveal } from "./Reveal";
import { siteData } from "@/lib/site";

export default function Changelog() {
  return (
    <section style={{ padding: "56px 24px", borderTop: "1px solid var(--border)" }}>
      <div className="wrap-narrow stack" style={{ gap: 20 }}>
        <Heading>บันทึกอัปเดต</Heading>
        <Reveal>
          <div className="changelog">
            <div className="v">
              <b>เวอร์ชัน {siteData.version}</b>
              <span className="chip">ล่าสุด</span>
              <span className="faint">{siteData.files.windows?.date}</span>
            </div>
            <ul>
              <li>
                แปลข้อความสกิลและคำอธิบายครบทั้ง <CountUp value={siteData.cards} /> ใบ พร้อมป้ายคีย์เวิร์ดสีกลางประโยค
              </li>
              <li>
                แปลเมนู ปุ่ม และข้อความในเกมอีก <CountUp value={siteData.uiLines} /> บรรทัด
              </li>
              <li>ตัวติดตั้ง Windows เลือกติดตั้งรูปการ์ดและข้อความในเกมแยกกันได้</li>
              <li>รองรับเกม OPTCGSim เวอร์ชัน {siteData.version} บน Windows, Android และ iOS</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
