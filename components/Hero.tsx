"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Briefcase, Cake, Camera, GraduationCap, Heart, MapPin, MessageCircle, Music2 } from "lucide-react";
import { Modal } from "./Modal";
import HeroVisual from "./HeroVisual";
import SwarmField from "./SwarmField";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative w-full min-h-screen flex items-center pt-24 sm:pt-28 pb-16 sm:pb-20 overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 aurora pointer-events-none" />
      <div className="absolute inset-0 grid-bg mask-fade-y pointer-events-none" />
      <SwarmField
        mode="auto"
        text="</>"
        theme="light"
        density={6000}
        formation={{ cx: 0.73, cy: 0.5, width: 0.46 }}
        formationMobile={{ cx: 0.5, cy: 0.84, width: 0.8 }}
        className="opacity-80"
      />
      <div className="absolute top-1/4 -left-24 w-72 h-72 sm:w-[26rem] sm:h-[26rem] rounded-full bg-primary/20 blur-3xl animate-drift pointer-events-none" />
      <div className="absolute bottom-0 -right-24 w-72 h-72 sm:w-[26rem] sm:h-[26rem] rounded-full bg-secondary-400/15 blur-3xl animate-drift pointer-events-none [animation-delay:-6s]" />

      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col space-y-7 sm:space-y-8"
          >
            {/* Status pill */}
            {/* <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-primary/20 bg-white/70 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-foreground/70 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-green-500 animate-pulse-ring" />
                <span className="relative h-2 w-2 rounded-full bg-green-500" />
              </span>
              Open to collaborate · Kota Bandung
            </div> */}

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.02]">
                <span className="block text-foreground">Hadi</span>
                <span className="block text-primary-gradient pb-1">Ramdhani</span>
              </h1>
              <p className="font-mono text-base sm:text-lg lg:text-xl font-medium text-foreground/70 tracking-tight">
                <span className="text-primary">&gt;</span> Code. Create. Explore.
                <span className="ml-1 inline-block h-5 w-[2px] translate-y-1 bg-primary animate-pulse" />
              </p>
              <p className="max-w-lg text-sm sm:text-base text-muted-foreground leading-relaxed">
                Siswa Software Engineering yang memiliki ketertarikan pada coding, hacking, electrical, dan coffee.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="#journey"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white px-6 py-3.5 text-sm sm:text-base font-semibold hover:bg-primary-500 transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 group"
              >
                Explore My Journey
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white/70 backdrop-blur px-6 py-3.5 text-sm sm:text-base font-medium hover:bg-white hover:border-primary/40 hover:-translate-y-0.5 transition-all"
              >
                Let&apos;s Connect
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex items-stretch w-fit rounded-2xl border border-border bg-white/60 backdrop-blur divide-x divide-border">
              {[
                { value: "4", label: "Interests" },
                { value: "4", label: "School Levels" },
                { value: "∞", label: "Things To Learn" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col px-4 sm:px-6 py-3">
                  <div className="text-2xl sm:text-3xl font-bold text-primary leading-none">{stat.value}</div>
                  <div className="text-[11px] sm:text-xs text-muted-foreground mt-1.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="w-full"
          >
            <HeroVisual onOpen={() => setIsModalOpen(true)} />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <Link
        href="#about"
        aria-label="Scroll ke bawah"
        className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground hover:text-primary transition-colors"
      >
        Scroll
        <span className="relative h-8 w-px bg-border overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-3 bg-primary [animation:scroll-cue_1.6s_ease-in-out_infinite]" />
        </span>
      </Link>

      {/* Biodata modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} label="Biodata Hadi Ramdhani" closeTone="light">
        {/* Banner */}
        <div className="relative h-32 sm:h-40 overflow-hidden bg-gradient-to-br from-primary via-secondary-400 to-primary-600">
          <div className="absolute inset-0 dot-grid-dark opacity-70" />
          <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/25 blur-3xl" />
          <div className="absolute -bottom-12 right-0 h-44 w-44 rounded-full bg-primary-200/40 blur-3xl" />
          <span className="absolute bottom-4 right-5 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
            {"// biodata"}
          </span>
        </div>

        <div className="relative px-5 pb-6 sm:px-8 sm:pb-8">
          {/* Identity */}
          <div className="-mt-12 sm:-mt-14 flex items-end justify-between gap-3">
            <div className="h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-3xl ring-4 ring-white shadow-xl">
              <Image
                src="/avatar.jpg"
                alt="Hadi Ramdhani"
                width={112}
                height={112}
                className="h-full w-full object-cover object-top"
                priority
              />
            </div>
            <span className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-[11px] font-semibold text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              Open to collaborate
            </span>
          </div>

          <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">Hadi Ramdhani</h2>
          <p className="text-primary font-medium text-sm sm:text-base">Software Engineering Student</p>

          {/* Details */}
          <dl className="mt-6 divide-y divide-border/70 overflow-hidden rounded-2xl border border-border bg-muted/30">
            {[
              { icon: Cake, label: "Umur", value: "19 Tahun" },
              { icon: MapPin, label: "Alamat", value: "Komp. Puri Cipageran Indah 1, Kota Cimahi" },
              { icon: GraduationCap, label: "Sekolah", value: "SEKOLAH PROFESI INSINYUR" },
              { icon: Briefcase, label: "Pekerjaan", value: "Software Engineer di SBM ITB" },
            ].map((row) => {
              const Icon = row.icon;
              return (
                <div key={row.label} className="flex items-start gap-3.5 px-4 py-3.5">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={16} />
                  </span>
                  <div className="min-w-0">
                    <dt className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{row.label}</dt>
                    <dd className="text-sm font-semibold text-foreground leading-snug">{row.value}</dd>
                  </div>
                </div>
              );
            })}
            <div className="flex items-start gap-3.5 px-4 py-3.5">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Heart size={16} />
              </span>
              <div className="min-w-0">
                <dt className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Hobi</dt>
                <dd className="mt-1.5 flex flex-wrap gap-1.5">
                  {["Coding", "Hacking", "Electrical", "Coffee"].map((h) => (
                    <span key={h} className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {h}
                    </span>
                  ))}
                </dd>
              </div>
            </div>
          </dl>

          {/* Socials */}
          <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {[
              { icon: Camera, name: "Instagram", handle: "@hadiramdhani.tsx", href: "https://instagram.com/hadiramdhani.tsx" },
              { icon: Music2, name: "TikTok", handle: "@hadimobileengineer", href: "https://tiktok.com/@hadimobileengineer" },
              { icon: MessageCircle, name: "WhatsApp", handle: "083199456915", href: "https://wa.me/6283199456915" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-white px-3.5 py-3 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-bold text-foreground">{s.name}</span>
                    <span className="block truncate text-[11px] text-muted-foreground">{s.handle}</span>
                  </span>
                  <ArrowUpRight size={14} className="shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              );
            })}
          </div>
        </div>
      </Modal>
    </section>
  );
}
