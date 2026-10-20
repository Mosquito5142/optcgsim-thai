import { Reveal } from "./Reveal";
import { siteConfig } from "@/config/site.config";

export default function Footer() {
  return (
    <footer>
      <Reveal className="wrap" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <p>
          ม็อดนี้จัดทำโดยแฟนเกม ไม่มีส่วนเกี่ยวข้องกับ Bandai หรือผู้พัฒนาเกม OPTCGSim ภาพและเนื้อหาการ์ดทั้งหมดเป็นลิขสิทธิ์ของ Bandai
          ใช้เพื่อการเล่นส่วนตัวเท่านั้น ห้ามนำไปจำหน่ายหรือใช้เพื่อการค้า
        </p>
        <span>© 2026 แปลและพัฒนาโดย {siteConfig.author}</span>
      </Reveal>
    </footer>
  );
}
