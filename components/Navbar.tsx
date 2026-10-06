"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { ClockWidget } from "./ClockWidget";

const navLinks = [
  { name: "About", href: "/#about" },
  { name: "Journey", href: "/#journey" },
  { name: "Experience", href: "/#experience" },
  { name: "Interests", href: "/#hobbies" },
  { name: "Projects", href: "/#projects" },
  { name: "Tools", href: "/tools" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
              style={{ width: pastHero ? (pathname.startsWith("/tools") ? "210px" : "120px") : "0px" }}
            >
              <span
                className={`font-bold text-sm text-foreground whitespace-nowrap absolute transition-all duration-500 ${
                  pastHero ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                {pathname.startsWith("/tools") ? "Developer & Creative Tools" : "Hadi Ramdhani"}
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
                    isActive ? "text-primary bg-primary/5" : "text-foreground/70 hover:text-primary hover:bg-muted/50"
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
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col">
          <div className="flex flex-col h-full pt-20 pb-8 px-6">
            <nav className="flex flex-col gap-2 flex-1">
              {navLinks.map((link, i) => {
                const isActive = link.href === "/tools" && pathname.startsWith("/tools");
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-4 rounded-xl text-xl font-semibold transition-all ${
                      isActive ? "text-primary bg-primary/10" : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    <span className={`font-mono text-sm ${isActive ? "text-primary" : "text-primary/70"}`}>0{i + 1}.</span>
                    {link.name}
                  </Link>
                );
              })}
            </nav>
            <div className="pt-6 border-t border-border">
              <ClockWidget compact />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
