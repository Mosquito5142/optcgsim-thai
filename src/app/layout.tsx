import type { Metadata, Viewport } from "next";
import { Chonburi, Mali, Prompt } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-prompt",
  display: "swap",
});
// Poster-style display face for headings; handwriting face for notes, labels and the ship's log.
const display = Chonburi({ subsets: ["thai", "latin"], weight: "400", variable: "--font-display", display: "swap" });
const hand = Mali({ subsets: ["thai", "latin"], weight: ["400", "600"], variable: "--font-hand", display: "swap" });

export const metadata: Metadata = {
  title: "ม็อดการ์ดภาษาไทย One Piece TCG — OPTCGSim และ OPlayTCG",
  description:
    "ม็อดแฟนเมดแปลสกิลการ์ดวันพีซเป็นภาษาไทย: เกม OPTCGSim (Windows, Android, iOS) และสคริปต์เสริมสำหรับเว็บ OPlayTCG กลับเป็นภาษาอังกฤษได้ทุกเมื่อ",
  openGraph: {
    title: "ม็อดการ์ดภาษาไทย One Piece TCG",
    description: "เลือกว่าคุณเล่นแบบไหน: เกม OPTCGSim หรือเว็บ OPlayTCG แล้วอ่านสกิลการ์ดเป็นภาษาไทย",
    type: "website",
    locale: "th_TH",
  },
  icons: {
    icon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23e2823f'/%3E%3Ctext x='32' y='44' font-size='36' text-anchor='middle' fill='%23241206' font-family='serif' font-weight='700'%3E%E0%B8%97%3C/text%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = { themeColor: "#0c1418", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${prompt.variable} ${display.variable} ${hand.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
