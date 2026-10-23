import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Landing from "@/components/Landing";
import LegacyHashRedirect from "@/components/LegacyHashRedirect";
import Support from "@/components/Support";
import Videos from "@/components/Videos";

export default function Page() {
  return (
    <>
      <LegacyHashRedirect />
      <Header page="home" />
      <main>
        <Landing />
        <Videos />
        <Support />
      </main>
      <Footer />
    </>
  );
}
