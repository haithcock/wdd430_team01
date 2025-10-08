"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";
import { useSession, signOut, signIn } from "next-auth/react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const items = [
    { label: "Catalog", href: "/catalog" },
    { label: "Sell", href: "/sell" },
    { label: "Seller Profiles", href: "/sellers" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header className="w-full bg-white fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.webp" alt="Handcrafted Haven Logo" width={70} height={70} />
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FB923C] to-[#EF4444]">
            Handcrafted Haven
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium items-center">
          {items.map((item) => (
            <Link key={item.label} href={item.href} className="transition hover:text-black">
              {item.label}
            </Link>
          ))}
          {session?.user ? (
            <button
              className="ml-4 text-sm underline hover:no-underline"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign out
            </button>
          ) : (
            <button
              className="ml-4 text-sm underline hover:no-underline"
              onClick={() => signIn(undefined, { callbackUrl: "/sell" })}
            >
              Sign in
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={clsx("md:hidden p-2 rounded", menuOpen ? "bg-gray-200" : "hover:bg-gray-100")}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4 text-gray-700 font-medium">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="hover:text-black transition"
            >
              {item.label}
            </Link>
          ))}
          {session?.user ? (
            <button
              className="text-left underline hover:no-underline"
              onClick={() => {
                setMenuOpen(false);
                signOut({ callbackUrl: "/" });
              }}
            >
              Log out
            </button>
          ) : (
            <button
              className="text-left underline hover:no-underline"
              onClick={() => {
                setMenuOpen(false);
                signIn(undefined, { callbackUrl: "/sell" });
              }}
            >
              Log in
            </button>
          )}
        </div>
      )}
    </header>
  );
}