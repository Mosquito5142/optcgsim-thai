import { WaxSeal } from "./Art";
import CountUp from "./CountUp";
import { CheckIcon } from "./Icons";
import { Heading, Reveal } from "./Reveal";
import { siteData } from "@/lib/site";

/** Captain's log: ruled paper with a red margin line and a wax seal on the latest entry. */
export default function Changelog() {
  return (
    <section style={{ padding: "56px 24px" }}>
      <div className="wrap-narrow stack" style={{ gap: 20 }}>
        <Heading>บันทึกการเดินทาง</Heading>
        <Reveal>
          <div className="logbook paper">
            <div className="v">
              <b>เวอร์ชัน {siteData.version}</b>
              <WaxSeal size={34}>
                <CheckIcon size={18} />
              </WaxSeal>
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
