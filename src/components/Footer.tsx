import { Anchor } from "./Art";
import { siteConfig } from "@/config/site.config";

export default function Footer() {
  return (
    <footer>
      {/* plain div, not <Reveal>: at the very bottom of the page a slide-in can never reach the viewport trigger line */}
      <div className="wrap">
        <p>
          ม็อดนี้จัดทำโดยแฟนเกม ไม่มีส่วนเกี่ยวข้องกับ Bandai หรือผู้พัฒนาเกม OPTCGSim ภาพและเนื้อหาการ์ดทั้งหมดเป็นลิขสิทธิ์ของ Bandai
          ใช้เพื่อการเล่นส่วนตัวเท่านั้น ห้ามนำไปจำหน่ายหรือใช้เพื่อการค้า
        </p>
        <span className="sign">
          <Anchor size={18} />© 2026 แปลและพัฒนาโดย {siteConfig.author}
        </span>
      </div>
    </footer>
  );
}
