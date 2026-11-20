"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ClockWidget } from "./ClockWidget";
import { categories } from "@/app/tools/data";

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
  const [pastHero, setPastHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  const getNavTitle = () => {
    if (pathname === "/") return "Hadi Ramdhani";
    if (pathname === "/tools") return "Developer & Creative Tools";
    if (pathname.startsWith("/tools/")) {
      const toolId = pathname.replace("/tools/", "");
      for (const cat of categories) {
        const tool = cat.tools.find((t) => t.id === toolId);
        if (tool) return tool.name;
      }
      return "Developer & Creative Tools";
    }
    return "Hadi Ramdhani";
  };
  const navTitle = getNavTitle();

  const getNavTitleWidth = () => {
    if (navTitle === "Hadi Ramdhani") return "120px";
    if (navTitle === "Developer & Creative Tools") return "210px";
    return `${Math.max(120, navTitle.length * 8.5)}px`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      // Detect when scrolled past roughly the hero height (80vh)
      setPastHero(window.scrollY > window.innerHeight * 0.6);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-border/60 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container flex h-16 sm:h-20 items-center justify-between gap-4">
          {/* Logo — photo always visible */}
          <Link href="/" className="flex items-center gap-2.5 z-50 shrink-0">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-primary/20 shrink-0">
              <Image
                src="/avatar.jpg"
                alt="Hadi Ramdhani"
                width={32}
                height={32}
                className="w-full h-full object-cover object-top"
                priority
              />
            </div>

            {/* Name slides in from below when past hero */}
            <div className="overflow-hidden h-5 relative w-0 transition-all duration-500"
              style={{ width: pastHero ? getNavTitleWidth() : "0px" }}
            >
              <span
                className={`font-bold text-sm text-foreground whitespace-nowrap absolute transition-all duration-500 ${
                  pastHero ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                {navTitle}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center justify-center gap-1 lg:gap-2 flex-1 px-4">
            {navLinks.map((link) => {
              const isActive = link.href === "/tools" && pathname.startsWith("/tools");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium px-3 py-2 rounded-md transition-colors relative group ${
                    isActive ? "text-lime-ink bg-primary/5" : "text-foreground/70 hover:text-lime-ink hover:bg-muted/50"
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-1 left-3 right-3 h-0.5 rounded-full transition-transform origin-left ${isActive ? "bg-primary scale-x-100" : "bg-primary scale-x-0 group-hover:scale-x-100"}`} />
                </Link>
              );
            })}
          </nav>

          {/* Clock widget desktop */}
          <div className="hidden lg:flex items-center shrink-0">
            <ClockWidget compact />
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden z-50 p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-primary via-secondary-400 to-primary-600"
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
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-white"
          >
            <div className="pointer-events-none absolute inset-0 aurora" />
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
                          isActive ? "bg-primary/10 text-lime-ink" : "text-foreground/85 active:bg-primary/5"
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
                  className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-bg-dark shadow-lg shadow-primary/30 active:bg-primary-500"
                >
                  Let&apos;s Connect
                  <ArrowUpRight size={16} />
                </Link>
                <div className="flex items-center justify-between">
                  <ClockWidget compact />
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-lime-ink">
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
