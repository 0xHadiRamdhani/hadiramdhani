"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, GraduationCap, MapPin, X } from "lucide-react";
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
            <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-primary/20 bg-white/70 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-foreground/70 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-green-500 animate-pulse-ring" />
                <span className="relative h-2 w-2 rounded-full bg-green-500" />
              </span>
              Open to collaborate · Kota Bandung
            </div>

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
                { value: "3", label: "School Levels" },
                { value: "∞", label: "Things To Learn" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col px-4 sm:px-6 py-3">
                  <div className="text-2xl sm:text-3xl font-bold text-primary leading-none">{stat.value}</div>
                  <div className="text-[11px] sm:text-xs text-muted-foreground mt-1.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right visual - Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm group/card">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/25 via-secondary-400/10 to-transparent blur-2xl opacity-70 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="gradient-border group-hover/card:-translate-y-1 transition-transform duration-300">
                <div
                  onClick={() => setIsModalOpen(true)}
                  className="relative bg-white/85 backdrop-blur-xl rounded-[calc(1.25rem-1px)] p-6 sm:p-8 shadow-xl shadow-primary/10 overflow-hidden cursor-pointer group"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary-400 to-primary-600" />
                  <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
                  <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-primary/15 blur-2xl pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-2 ring-primary/25 ring-offset-2 ring-offset-white shrink-0">
                        <Image
                          src="/avatar.jpg"
                          alt="Hadi Ramdhani"
                          width={80}
                          height={80}
                          className="w-full h-full object-cover object-top"
                          priority
                        />
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 border border-green-500/20 px-2.5 py-1 text-[11px] font-semibold text-green-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Studying
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-1">Hadi Ramdhani</h3>
                    <p className="text-primary font-medium text-sm mb-4">Software Engineering Student</p>

                    <div className="space-y-2.5 border-t border-border pt-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin size={14} className="text-primary shrink-0" />
                        Kota Bandung, Jawa Barat
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap size={14} className="text-primary shrink-0" />
                        SMK Bani Ma&apos;sum
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4 mb-5">
                      {["Coding", "Hacking", "Electrical", "Coffee"].map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-primary/5 border border-primary/20 px-2.5 py-1 text-xs font-medium text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="w-full bg-primary text-white rounded-xl px-4 py-3 flex items-center justify-between shadow-sm group-hover:bg-primary-500 group-hover:shadow-md transition-all duration-300">
                      <span className="text-xs sm:text-sm font-semibold">Lihat Biodata Lengkap</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative floating elements */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-3 w-11 h-11 rounded-xl bg-white/90 backdrop-blur border border-primary/20 shadow-md flex items-center justify-center text-primary text-xs font-bold font-mono pointer-events-none"
              >
                {"</>"}
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-3 w-11 h-11 rounded-xl bg-white/90 backdrop-blur border border-secondary-400/20 shadow-md flex items-center justify-center text-secondary-400 text-xs font-bold font-mono pointer-events-none"
              >
                {"{}"}
              </motion.div>
            </div>
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

      {/* Biodata Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-3 sm:p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto bg-white border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl custom-scrollbar"
              onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary-300 to-primary-600" />

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={16} className="sm:w-5 sm:h-5" />
              </button>

              <div className="flex flex-col items-center text-center mt-0 sm:mt-2 mb-3 sm:mb-6">
                <div className="w-16 h-16 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 sm:border-4 border-primary/10 mb-2 sm:mb-4 shadow-sm">
                  <Image
                    src="/avatar.jpg"
                    alt="Hadi Ramdhani"
                    width={112}
                    height={112}
                    className="w-full h-full object-cover object-top"
                    priority
                  />
                </div>
                <h2 className="text-lg sm:text-3xl font-bold tracking-tight mb-0 sm:mb-1">Hadi Ramdhani</h2>
                <p className="text-primary font-medium text-[11px] sm:text-base">Software Engineering Student</p>
              </div>

              <div className="space-y-1.5 sm:space-y-4 bg-muted/30 rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-border/50">
                <div className="flex items-center justify-between border-b border-border/50 pb-1.5 sm:pb-3 gap-2">
                  <span className="text-muted-foreground font-medium text-[11px] sm:text-sm shrink-0">Nama</span>
                  <span className="font-semibold text-foreground text-[11px] sm:text-sm text-right">Hadi Ramdhani</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/50 pb-1.5 sm:pb-3 gap-2">
                  <span className="text-muted-foreground font-medium text-[11px] sm:text-sm shrink-0">Umur</span>
                  <span className="font-semibold text-foreground text-[11px] sm:text-sm text-right">19 Tahun</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/50 pb-1.5 sm:pb-3 gap-2">
                  <span className="text-muted-foreground font-medium text-[11px] sm:text-sm shrink-0">Alamat</span>
                  <span className="font-semibold text-foreground text-[11px] sm:text-sm text-right max-w-[180px] sm:max-w-[340px]">Komp. Puri Cipageran Indah 1, Kota Cimahi</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/50 pb-1.5 sm:pb-3 gap-2">
                  <span className="text-muted-foreground font-medium text-[11px] sm:text-sm shrink-0">Sekolah</span>
                  <span className="font-semibold text-foreground text-[11px] sm:text-sm text-right max-w-[180px] sm:max-w-[340px]">SMK Bani Ma&apos;sum</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/50 pb-1.5 sm:pb-3 gap-2">
                  <span className="text-muted-foreground font-medium text-[11px] sm:text-sm shrink-0">Pekerjaan</span>
                  <span className="font-semibold text-foreground text-[11px] sm:text-sm text-right max-w-[180px] sm:max-w-[340px]">Software Engineer di SBM ITB</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/50 pb-1.5 sm:pb-3 gap-2">
                  <span className="text-muted-foreground font-medium text-[11px] sm:text-sm shrink-0">Hobi</span>
                  <span className="font-semibold text-foreground text-[11px] sm:text-sm text-right max-w-[180px] sm:max-w-[340px]">Coding, Hacking, Electrical, Coffee</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/50 pb-1.5 sm:pb-3 gap-2">
                  <span className="text-muted-foreground font-medium text-[11px] sm:text-sm shrink-0">Instagram</span>
                  <Link href="https://instagram.com/hadiramdhani.tsx" target="_blank" className="font-semibold text-primary hover:underline text-[11px] sm:text-sm text-right max-w-[180px] sm:max-w-[340px]">@hadiramdhani.tsx</Link>
                </div>
                <div className="flex items-center justify-between border-b border-border/50 pb-1.5 sm:pb-3 gap-2">
                  <span className="text-muted-foreground font-medium text-[11px] sm:text-sm shrink-0">TikTok</span>
                  <Link href="https://tiktok.com/@hadimobileengineer" target="_blank" className="font-semibold text-primary hover:underline text-[11px] sm:text-sm text-right max-w-[180px] sm:max-w-[340px]">@hadimobileengineer</Link>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground font-medium text-[11px] sm:text-sm shrink-0">WhatsApp</span>
                  <Link href="https://wa.me/6283199456915" target="_blank" className="font-semibold text-primary hover:underline text-[11px] sm:text-sm text-right max-w-[180px] sm:max-w-[340px]">083199456915</Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
