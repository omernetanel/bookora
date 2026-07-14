"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function MarketingNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
      className={`sticky top-0 z-40 border-b bg-background/70 backdrop-blur-md transition-colors ${
        isScrolled ? "border-border" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div dir="ltr">
          <Image src="/lynkologow.png" alt="LYNKO" width={151} height={36} className="h-7 w-auto" priority />
        </div>
        <Link
          href="/demo"
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-card"
        >
          כניסה לדמו
        </Link>
      </div>
    </motion.header>
  );
}
