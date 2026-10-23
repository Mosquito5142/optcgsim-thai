import type { Metadata } from "next";
import Changelog from "@/components/Changelog";
import Download from "@/components/Download";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { PlatformProvider } from "@/components/PlatformContext";
import Shots from "@/components/Shots";
import Support from "@/components/Support";
import Videos from "@/components/Videos";
import { OPTCGSIM_FAQS } from "@/data/faqs";

export const metadata: Metadata = {
  title: "ม็อดการ์ดภาษาไทย OPTCGSim — ดาวน์โหลดสำหรับ Windows, Android, iOS",
  description:
    "ม็อดแฟนเมดแปลสกิลการ์ด OPTCGSim 2,640 ใบ และข้อความในเกม 1,425 บรรทัดเป็นภาษาไทย ติดตั้งง่ายบน Windows, Android และ iOS กลับเป็นภาษาอังกฤษได้ทุกเมื่อ",
  openGraph: { title: "ม็อดการ์ดภาษาไทย OPTCGSim", description: "เล่น OPTCGSim ด้วยการ์ดและเมนูภาษาไทย แปลสกิลการ์ด 2,640 ใบ", type: "website", locale: "th_TH" },
};

export default function Page() {
  return (
    <PlatformProvider>
      <Header page="optcgsim" />
      <main>
        <Hero />
        <Features />
        <Shots />
        <Videos only="optcgsim" />
        <Download />
        <Faq items={OPTCGSIM_FAQS} />
        <Changelog />
        <Support />
      </main>
      <Footer />
    </PlatformProvider>
  );
}
