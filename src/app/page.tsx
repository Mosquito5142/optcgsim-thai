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

export default function Page() {
  return (
    <PlatformProvider>
      <Header />
      <main>
        <Hero />
        <Features />
        <Shots />
        <Download />
        <Faq />
        <Changelog />
        <Support />
      </main>
      <Footer />
    </PlatformProvider>
  );
}
