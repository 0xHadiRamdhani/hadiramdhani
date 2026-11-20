"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Cake,
  Camera,
  Code2,
  Coffee,
  GraduationCap,
  MapPin,
  MessageCircle,
  Music2,
  Terminal,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Modal } from "./Modal";

const ease = [0.22, 1, 0.36, 1] as const;

const details: { icon: LucideIcon; label: string; value: string; wide?: boolean }[] = [
  { icon: Cake, label: "Umur", value: "19 Tahun" },
  { icon: Briefcase, label: "Pekerjaan", value: "Software Engineer di SBM ITB" },
  { icon: GraduationCap, label: "Sekolah", value: "SEKOLAH PROFESI INSINYUR", wide: true },
  { icon: MapPin, label: "Alamat", value: "Komp. Puri Cipageran Indah 1, Kota Cimahi", wide: true },
];

const hobbies: { icon: LucideIcon; label: string }[] = [
  { icon: Code2, label: "Coding" },
  { icon: Terminal, label: "Hacking" },
  { icon: Zap, label: "Electrical" },
  { icon: Coffee, label: "Coffee" },
];

const socials: { icon: LucideIcon; name: string; handle: string; href: string }[] = [
  { icon: Camera, name: "Instagram", handle: "@hadiramdhani.tsx", href: "https://instagram.com/hadiramdhani.tsx" },
  { icon: Music2, name: "TikTok", handle: "@hadimobileengineer", href: "https://tiktok.com/@hadimobileengineer" },
  { icon: MessageCircle, name: "WhatsApp", handle: "083199456915", href: "https://wa.me/6283199456915" },
];

function reveal(i: number) {
  return {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease, delay: 0.12 + i * 0.05 },
  };
}

export default function BiodataModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} label="Biodata Hadi Ramdhani" size="xl" closeTone="responsive">
      <div className="grid md:grid-cols-[19rem_1fr]">
        {/* ============ Profile panel ============ */}
        <aside className="relative isolate overflow-hidden bg-bg-dark text-white">
          <div className="stage-grid pointer-events-none absolute inset-0 -z-10 opacity-60" />
          <div className="pointer-events-none absolute -left-16 -top-16 -z-10 h-56 w-56 rounded-full bg-primary/35 blur-3xl" />

          <div className="relative h-72 sm:h-80 md:h-[22rem]">
            <Image
              src="/avatar.jpg"
              alt="Hadi Ramdhani"
              fill
              sizes="(min-width: 768px) 304px, 100vw"
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/30 to-transparent" />
            <span className="absolute left-4 top-4 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70">
              {"// biodata"}
            </span>
            <div className="absolute inset-x-0 bottom-0 px-5 pb-4">
              <h2 className="text-2xl font-bold tracking-tight">Hadi Ramdhani</h2>
              <p className="text-sm font-medium text-primary-200">Software Engineering Student</p>
            </div>
          </div>

          <div className="space-y-4 px-5 pb-6 pt-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary-300">
              <span className="relative flex h-2 w-2">
                <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-primary" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Open to collaborate
            </span>

            <ul className="space-y-2">
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.li key={s.name} {...reveal(i + 3)}>
                    <Link
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 transition-all hover:border-primary/50 hover:bg-white/10"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary-200 transition-colors group-hover:bg-primary group-hover:text-bg-dark">
                        <Icon size={15} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold">{s.name}</span>
                        <span className="block truncate text-[11px] text-white/50">{s.handle}</span>
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="shrink-0 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                      />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* ============ Details ============ */}
        <div className="relative px-5 pb-6 pt-6 sm:px-8 sm:pb-8 md:pt-9">
          <motion.p {...reveal(0)} className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-lime-ink">
            Tentang saya
          </motion.p>
          <motion.p {...reveal(1)} className="mt-2 text-[15px] leading-relaxed text-foreground/80">
            Lulusan Software Engineering dari SMK Bani Ma&apos;sum yang kini menempuh Sekolah Profesi Insinyur. Suka
            membangun hal-hal kecil menjadi sesuatu yang nyata.
          </motion.p>

          <dl className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
            {details.map((row, i) => {
              const Icon = row.icon;
              return (
                <motion.div
                  key={row.label}
                  {...reveal(i + 2)}
                  className={`flex items-start gap-3 rounded-2xl border border-border bg-muted/40 p-3.5 ${
                    row.wide ? "col-span-2" : ""
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lime-ink">
                    <Icon size={16} />
                  </span>
                  <div className="min-w-0">
                    <dt className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {row.label}
                    </dt>
                    <dd className="mt-0.5 text-sm font-semibold leading-snug text-foreground">{row.value}</dd>
                  </div>
                </motion.div>
              );
            })}
          </dl>

          <motion.div {...reveal(6)} className="mt-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Hobi</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {hobbies.map((h) => {
                const Icon = h.icon;
                return (
                  <li
                    key={h.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-lime-ink"
                  >
                    <Icon size={13} />
                    {h.label}
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div {...reveal(7)} className="mt-7 flex flex-wrap gap-2.5">
            <Link
              href="https://wa.me/6283199456915"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-bg-dark shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary-500"
            >
              Hubungi saya
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#journey"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground/80 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-lime-ink"
            >
              Lihat perjalanan
            </Link>
          </motion.div>
        </div>
      </div>
    </Modal>
  );
}
