import Navbar from "@/app/ui/Navbar";
import Hero from "@/app/(overview)/components/Hero";
import Features from "@/app/(overview)/components/Features";
import CallToAction from "@/app/ui/CallToAction";
import Contact from "@/app/ui/Contact";
import Footer from "@/app/ui/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen pt-15">
      <Navbar />
      <Hero />
      <Features />
      <CallToAction />
      <Contact />
      <Footer />
    </main>
  );
}