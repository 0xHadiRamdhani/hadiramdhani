"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ClockWidget } from "./ClockWidget";

const navLinks = [
  { name: "About", href: "/#about" },
  { name: "Journey", href: "/#journey" },
  { name: "Experience", href: "/#experience" },
  { name: "Interests", href: "/#hobbies" },
  { name: "Swarm", href: "/#swarm" },
  { name: "Projects", href: "/#projects" },
  { name: "Tools", href: "/tools" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled ? "border-b border-border bg-[#110100]/70 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="container flex h-16 items-center justify-between gap-4 sm:h-20">
          <Link href="/" className="z-50 flex shrink-0 items-center gap-2.5">
            <span className="h-7 w-7 shrink-0 overflow-hidden rounded-md border border-border">
              <Image
                src="/avatar.jpg"
                alt="Hadi Ramdhani"
                width={28}
                height={28}
                className="h-full w-full object-cover object-top"
                priority
              />
            </span>
            <span className="text-sm font-medium tracking-tight text-foreground">
              Hadi Ramdhani<sup className="ml-0.5 text-[8px] text-foreground/50">®</sup>
            </span>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-7 px-4 md:flex lg:gap-9">
            {navLinks.map((link) => {
              const isActive = link.href === "/tools" && pathname.startsWith("/tools");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-[13px] transition-colors ${
                    isActive ? "text-foreground" : "text-foreground/55 hover:text-foreground"
                  }`}
                >
                  {link.name}
                  {isActive && <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-primary-300" />}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/#contact"
            className="hidden items-center gap-1 text-[13px] text-foreground/85 transition-colors hover:text-primary-300 md:inline-flex"
          >
            Let&apos;s talk
            <ArrowUpRight size={13} />
          </Link>

          <button
            className="z-50 rounded-lg p-2 transition-colors hover:bg-muted md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-primary via-primary-300 to-primary-200"
        />
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[#110100]"
          >
            <div className="pointer-events-none absolute inset-0 ember-glow" />
            <div className="pointer-events-none absolute inset-0 grid-bg mask-fade-y opacity-60" />

            <div className="relative flex min-h-full flex-col px-6 pb-8 pt-24">
              <nav className="flex flex-1 flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = link.href === "/tools" && pathname.startsWith("/tools");
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + i * 0.045, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group flex items-center gap-4 rounded-2xl px-4 py-3.5 text-2xl font-bold tracking-tight transition-colors ${
                          isActive ? "bg-primary/10 text-primary-300" : "text-foreground/85 active:bg-primary/5"
                        }`}
                      >
                        <span className="w-7 font-mono text-xs font-bold text-primary/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1">{link.name}</span>
                        <ArrowUpRight
                          size={18}
                          className="text-muted-foreground/40 transition-transform group-active:translate-x-0.5 group-active:-translate-y-0.5"
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-6 space-y-4 border-t border-border pt-6"
              >
                <Link
                  href="/#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 active:bg-primary-500"
                >
                  Let&apos;s Connect
                  <ArrowUpRight size={16} />
                </Link>
                <div className="flex items-center justify-between">
                  <ClockWidget compact />
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                    Open to collaborate
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
