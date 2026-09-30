"use client";

import Link from "next/link";
import { ClockWidget } from "./ClockWidget";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Journey", href: "#journey" },
  { name: "Interests", href: "#hobbies" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-12 md:py-16">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-extrabold text-sm">
                MA
              </div>
              <span className="font-bold text-base">Muhamad Aris</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Informatics Engineering Student • Creator • Explorer
            </p>
          </div>

          {/* Pages */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground">Halaman</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground">Kontak</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:bachungans@gmail.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  bachungans@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+6283857451951"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  +62 838-5745-1951
                </a>
              </li>
            </ul>
          </div>

          {/* Time */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground">Local Time</h3>
            <ClockWidget compact />
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © 2026 Muhamad Aris. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Jakarta • WIB
          </p>
        </div>
      </div>
    </footer>
  );
}
