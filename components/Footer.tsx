"use client";

import Link from "next/link";
import { Code2 } from "lucide-react";
import { ClockWidget } from "./ClockWidget";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Journey", href: "#journey" },
  { name: "Experience", href: "#experience" },
  { name: "Interests", href: "#hobbies" },
  { name: "Projects", href: "#projects" },
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
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <Code2 size={18} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-base">Hadi Ramdhani</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Coding • Hacking • Electrical • Coffee
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
                  href="mailto:hadsxdev@icloud.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  hadsxdev@icloud.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+6283199456915"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  +62 831-9945-6915
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
            © 2026 Hadi Ramdhani. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Kota Bandung • WIB
          </p>
        </div>
      </div>
    </footer>
  );
}
