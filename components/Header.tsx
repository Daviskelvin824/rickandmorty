"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { MusicToggle } from "./MusicToggle";
import Image from "next/image";
import gsap from "gsap";

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }

    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power3.out" }
      );
    }

    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b-2 border-[#00ff88]/30 dark:border-[#00ff88]/30 bg-white/95 dark:bg-[#0a0e27]/95 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,136,0.1)] dark:shadow-[0_0_20px_rgba(0,255,136,0.3)]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            ref={logoRef}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#00ff88] rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <Image
                src="/icon.png"
                alt="Rick & Morty Explorer"
                width={200}
                height={100}
              />
            </div>
          </Link>
          <div ref={navRef} className="flex items-center gap-4">
            <Link
              href="/favorites"
              className="relative px-4 py-2 text-sm font-semibold text-gray-800 dark:text-white hover:text-[#00ff88] transition-all duration-300 group"
            >
              <span className="relative z-10">Favorites</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/20 to-[#00d4ff]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
            <MusicToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
