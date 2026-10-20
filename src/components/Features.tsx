import { WaxSeal } from "./Art";
import CountUp from "./CountUp";
import { ChatIcon, PaletteIcon, SlidersIcon } from "./Icons";
import { Heading, Stagger, StaggerItem } from "./Reveal";
import { siteData } from "@/lib/site";

export default function Features() {
  return (
    <section className="features band">
      <div className="wrap stack gap32">
        <Heading>ได้อะไรบ้างในม็อดนี้</Heading>
        <Stagger className="grid" >
          <StaggerItem className="card paper">
            <WaxSeal size={58}>
              <ChatIcon />
            </WaxSeal>
            <h3>แปลข้อความบนรูปการ์ด</h3>
            <p>
              สกิล เอฟเฟกต์ และคำอธิบายของการ์ดทั้ง <CountUp value={siteData.cards} /> ใบ ถูกแปลลงบนภาพการ์ดโดยตรง
              อ่านออกได้ทันทีโดยไม่ต้องสลับไปเปิดคำแปลที่อื่น
            </p>
          </StaggerItem>
          <StaggerItem className="card paper">
            <WaxSeal size={58}>
              <SlidersIcon />
            </WaxSeal>
            <h3>เมนูและบันทึกการเล่นเป็นไทย</h3>
            <p>
              ปุ่ม เมนู การตั้งค่า และบันทึกเหตุการณ์ระหว่างเล่นกว่า <CountUp value={siteData.uiLines} /> บรรทัด แปลเป็นไทยทั้งหมด
              ใช้งานลื่นไหลตั้งแต่เปิดเกม
            </p>
          </StaggerItem>
          <StaggerItem className="card paper">
            <WaxSeal size={58}>
              <PaletteIcon />
            </WaxSeal>
            <h3>ป้ายคีย์เวิร์ดสีตรงกับของจริง</h3>
            <p>คำสำคัญอย่างรัชหรือบล็อกเกอร์ ใช้โทนสีเดียวกับคีย์เวิร์ดในเกมต้นฉบับ จำง่าย ไม่ต้องท่องศัพท์ใหม่</p>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
