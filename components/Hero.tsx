"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, X } from "lucide-react";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative w-full min-h-screen flex items-center pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg" />

      {/* Gradient orbs - like imphnen */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-primary/20 to-blue-400/20 blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-1/3 -right-20 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-blue-400/20 to-primary/20 blur-3xl opacity-60 pointer-events-none" />

      <div className="container relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col space-y-6 sm:space-y-8"
          >

            {/* Headline */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
                <span className="block text-foreground">Hadi</span>
                <span className="block text-primary-gradient">Ramdhani</span>
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground/60 tracking-tight">
                Code. Create. Explore.
              </p>
              <p className="max-w-lg text-sm sm:text-base text-muted-foreground leading-relaxed">
                Siswa Software Engineering yang memiliki ketertarikan pada coding, hacking, electrical, dan coffee.
              </p>
            </div>

            {/* CTAs */}
            <div className="hidden sm:flex sm:flex-row gap-3">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white px-6 py-3.5 text-sm sm:text-base font-semibold hover:bg-primary-500 transition-all shadow-sm hover:shadow group"
              >
                Explore My Journey
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3.5 text-sm sm:text-base font-medium hover:bg-muted hover:border-primary/30 transition-all"
              >
                Let&apos;s Connect
              </Link>
            </div>

            {/* Stats row - like imphnen */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-4 gap-x-0 pt-2 w-full">
              {[
                { value: "4", label: "Interests" },
                { value: "3", label: "School Levels" },
                { value: "∞", label: "Things To Learn" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center">
                  <div className="flex flex-col items-center sm:items-start px-4 sm:px-4 sm:first:pl-0">
                    <div className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                  {i < 2 && <div className="h-8 border-r border-border" />}
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
            <div className="relative w-full max-w-sm">
              {/* Card */}
              <div
                onClick={() => setIsModalOpen(true)}
                className="relative bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-lg overflow-hidden cursor-pointer hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary-300 to-primary-600 rounded-t-2xl" />

                {/* Grid inside card */}
                <div className="absolute inset-0 grid-bg opacity-40 rounded-2xl pointer-events-none" />

                {/* Floating orb */}
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  {/* Avatar photo */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-primary/20 mb-4 sm:mb-5 shrink-0">
                    <Image
                      src="/avatar.jpg"
                      alt="Hadi Ramdhani"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover object-top"
                      priority
                    />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-1">Hadi Ramdhani</h3>
                  <p className="text-primary font-medium text-sm mb-4">Software Engineering Student</p>

                  <div className="space-y-3 border-t border-border pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={14} className="text-primary shrink-0" />
                      Kota Bandung, Jawa Barat
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                      Currently studying at SMK Bani Ma'sum
                    </div>
                  </div>

                  {/* Tags */}
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

                  {/* Indicator Tombol */}
                  <div className="w-full bg-primary text-white rounded-xl px-4 py-3 flex items-center justify-between shadow-sm group-hover:bg-primary/90 group-hover:shadow-md transition-all duration-300">
                    <span className="text-xs sm:text-sm font-semibold">Lihat Biodata Lengkap</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Decorative floating elements */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-bold pointer-events-none"
              >
                {"</>"}
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-10 h-10 rounded-xl bg-secondary-300/10 border border-secondary-300/20 flex items-center justify-center text-secondary-300 text-xs font-bold pointer-events-none"
              >
                {"{}"}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

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
                  <span className="font-semibold text-foreground text-[11px] sm:text-sm text-right max-w-[180px] sm:max-w-[340px]">SMK Bani Ma'sum</span>
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
