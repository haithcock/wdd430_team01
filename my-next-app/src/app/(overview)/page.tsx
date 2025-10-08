import Hero from "@/app/ui/Hero";
import Features from "@/app/ui/Features";
import FeaturedItems from "@/app/ui/FeaturedItems";
import Contact from "@/app/ui/Contact";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <Hero />
      </Suspense>
      <Features />
      <FeaturedItems />
      <Contact />
    </main>
  );
}