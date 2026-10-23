import type { Metadata } from "next";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Oplay from "@/components/Oplay";
import OplayHero from "@/components/OplayHero";
import Support from "@/components/Support";
import Videos from "@/components/Videos";
import { OPLAY_FAQS } from "@/data/faqs";

export const metadata: Metadata = {
  title: "อ่านสกิลการ์ดเป็นภาษาไทยบน OPlayTCG — สคริปต์เสริมแฟนเมด",
  description:
    "สคริปต์เสริมสำหรับเบราว์เซอร์ ช่วยให้กล่องข้อความสกิลบนการ์ดใบใหญ่ของ oplaytcg.com เป็นภาษาไทย ติดตั้งครั้งเดียว ใช้ได้บนคอมพิวเตอร์และมือถือ (ทดลอง)",
  openGraph: { title: "OPlayTCG ภาษาไทย (สคริปต์เสริม)", description: "อ่านสกิลการ์ดเป็นภาษาไทยบนเว็บ OPlayTCG", type: "website", locale: "th_TH" },
};

export default function Page() {
  return (
    <>
      <Header page="oplaytcg" />
      <main>
        <OplayHero />
        <Oplay />
        <Videos only="oplaytcg" />
        <Faq items={OPLAY_FAQS} />
        <Support />
      </main>
      <Footer />
    </>
  );
}
