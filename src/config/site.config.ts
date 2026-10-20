// ============================================================
//  ไฟล์นี้ไฟล์เดียวที่ต้องแก้: ใส่ลิงก์ดาวน์โหลดและช่องทางสนับสนุน
//  - ปล่อย "" ไว้ = ปุ่มนั้นจะแสดงว่า "ลิงก์ยังไม่พร้อม" และกดไม่ได้
//  - ขนาดไฟล์ / SHA-256 / วันที่ ไม่ต้องกรอกเอง (อยู่ใน src/data/site-data.json
//    ซึ่งสร้างด้วย  python build_site.py --next <โฟลเดอร์นี้>  ในโปรเจกต์ thai_cards)
// ============================================================

export type DownloadLink = { url: string; mirror?: string };

export const siteConfig = {
  author: "$ong$oul",

  downloads: {
    // Windows: ตัวติดตั้ง .exe
    windows: {
      url: "", // เช่น "https://github.com/ชื่อคุณ/โปรเจกต์/releases/download/v1.44a/OPTCGSim-Thai-Installer.exe"
      mirror: "", // ลิงก์สำรอง (ไม่บังคับ) จะโผล่หลังกดดาวน์โหลด
    },
    // Android: APK แปลไทยสำเร็จรูป (มีรูปการ์ด Bandai อยู่ในไฟล์ ระวังเรื่องลิขสิทธิ์ถ้าแจกสาธารณะ)
    androidReady: { url: "", mirror: "" },
    // Android: เครื่องมือแปลง APK ของผู้เล่นเอง (ยังไม่เสร็จ ตั้ง enabled: true เมื่อพร้อม)
    androidConverter: { enabled: false, url: "", mirror: "" },
    // iOS: ไฟล์ .ipa (ต้องเซ็นด้วย Sideloadly/AltStore)
    ios: { url: "", mirror: "" },
  },

  support: {
    kofi: "", // เช่น "https://ko-fi.com/ชื่อคุณ"
    contact: "", // เช่น "https://discord.gg/xxxx" หรือ "mailto:you@example.com"
    promptpayQr: "", // เช่น "/assets/promptpay-qr.png" (วางรูปไว้ใน public/assets)
  },
};
