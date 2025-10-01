import Hero from "@/app/ui/Hero";
import Features from "@/app/ui/Features";
import FeaturedItems from "@/app/ui/FeaturedItems";
import Contact from "@/app/ui/Contact";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <FeaturedItems />
      <Contact />
    </main>
  );
}