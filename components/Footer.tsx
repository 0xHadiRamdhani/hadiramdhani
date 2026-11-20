"use client";

import Link from "next/link";
import { ArrowUp, Code2 } from "lucide-react";
import { ClockWidget } from "./ClockWidget";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Journey", href: "#journey" },
  { name: "Experience", href: "#experience" },
  { name: "Interests", href: "#hobbies" },
  { name: "Swarm", href: "#swarm" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socials = [
  { name: "GitHub", href: "https://github.com/0xHadiRamdhani" },
  { name: "Instagram", href: "https://instagram.com/hadiramdhani.tsx" },
  { name: "TikTok", href: "https://tiktok.com/@hadimobileengineer" },
  { name: "WhatsApp", href: "https://wa.me/6283199456915" },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-bg-dark text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute inset-0 dot-grid-dark opacity-60 pointer-events-none" />
      <div className="absolute -top-32 left-1/4 h-64 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="container relative pt-14 md:pt-20 pb-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                <Code2 size={18} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg">Hadi Ramdhani</span>
            </div>
            <p className="text-sm text-white/55 leading-relaxed max-w-xs">
              Siswa Software Engineering yang membangun hal-hal kecil menjadi sesuatu yang nyata.
            </p>
            <p className="font-mono text-xs tracking-wider text-primary-300">
              Coding • Hacking • Electrical • Coffee
            </p>
          </div>

          {/* Pages */}
          <div className="space-y-4">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Halaman</h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Kontak</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:hadsxdev@icloud.com" className="text-sm text-white/65 hover:text-white transition-colors">
                  hadsxdev@icloud.com
                </a>
              </li>
              <li>
                <a href="tel:+6283199456915" className="text-sm text-white/65 hover:text-white transition-colors">
                  +62 831-9945-6915
                </a>
              </li>
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/65 hover:text-white transition-colors"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Time */}
          <div className="space-y-4">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Local Time</h3>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 w-fit [&_*]:!text-white/70 [&_.text-primary]:!text-primary-300">
              <ClockWidget compact />
            </div>
          </div>
        </div>

        {/* Wordmark */}
        <div
          aria-hidden="true"
          className="mt-14 select-none text-center font-bold leading-none tracking-tighter text-[clamp(2.5rem,11vw,9rem)] text-transparent bg-clip-text bg-gradient-to-b from-white/15 to-transparent"
        >
          HADI RAMDHANI
        </div>

        <div className="mt-6 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/45 text-center sm:text-left">
            © 2026 Hadi Ramdhani. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-white/45">Kota Bandung • WIB</p>
            <a
              href="#"
              aria-label="Kembali ke atas"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/60 hover:bg-primary hover:border-primary hover:text-white transition-all"
            >
              <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
