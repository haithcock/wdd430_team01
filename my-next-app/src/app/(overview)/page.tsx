import Navbar from "@/app/ui/Navbar";
import Hero from "@/app/ui/Hero";
import Features from "@/app/ui/Features";
import FeaturedItems from "@/app/ui/FeaturedItems";
import Contact from "@/app/ui/Contact";
import Footer from "@/app/ui/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen pt-15">
      <Navbar />
      <Hero />
      <Features />
      <FeaturedItems />
      <Contact />
      <Footer />
    </main>
  );
}