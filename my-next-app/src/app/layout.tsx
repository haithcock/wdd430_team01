import type { Metadata } from "next";
import { inter } from '../../lib/fonts';
import "./global.css";
import Navbar from "@/app/ui/Navbar";
import Footer from "@/app/ui/Footer";
import Providers from "./providers";
import Search from "./ui/Search";


export const metadata: Metadata = {
  title: "Handicrafted Haven",
  description: "Handicrafted Haven is a curated space for unique, handmade creations — where artistry, tradition, and modern design meet to bring warmth and authenticity to your home and lifestyle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
    </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <Navbar />
          <div className="pt-15">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
