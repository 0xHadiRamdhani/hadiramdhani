"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BiodataModal from "./BiodataModal";
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
                <span className="absolute inset-0 rounded-full bg-primary-500 animate-pulse-ring" />
                <span className="relative h-2 w-2 rounded-full bg-primary-500" />
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
                <span className="text-lime-ink">&gt;</span> Code. Create. Explore.
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
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-bg-dark px-6 py-3.5 text-sm sm:text-base font-semibold hover:bg-primary-500 transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 group"
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
                  <div className="text-2xl sm:text-3xl font-bold text-lime-ink leading-none">{stat.value}</div>
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
        className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground hover:text-lime-ink transition-colors"
      >
        Scroll
        <span className="relative h-8 w-px bg-border overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-3 bg-primary [animation:scroll-cue_1.6s_ease-in-out_infinite]" />
        </span>
      </Link>

      <BiodataModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
