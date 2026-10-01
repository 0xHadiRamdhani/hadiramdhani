"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Featured() {
  return (
    <section className="w-full py-0 bg-[#D6E9F8] relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px] sm:min-h-[580px]">

        {/* LEFT — Text column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-14 sm:py-16 gap-8 order-2 lg:order-1"
        >
          {/* Big quote mark */}
          <div>
            <div className="text-primary/30 font-serif text-7xl sm:text-8xl leading-none mb-1 select-none">&ldquo;</div>
            <p className="text-foreground text-xl sm:text-2xl lg:text-3xl font-light leading-snug tracking-tight -mt-4">
              I don&apos;t just write code.{" "}
              <span className="text-primary font-semibold italic">I build things</span>{" "}
              that mean something.
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-primary/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="h-px w-8 bg-primary/20" />
          </div>

          {/* Personal note */}
          <p className="text-foreground/60 text-sm sm:text-base leading-relaxed max-w-sm">
            Software Engineering, terminal, hardware, dan kopi — itulah ruang hidup saya. Saya percaya setiap hal yang dibuat dengan niat punya nilainya sendiri.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-500 transition-all shadow-sm"
            >
              Let&apos;s talk
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="#about"
              className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors underline underline-offset-4 decoration-foreground/20"
            >
              or read more about me
            </Link>
          </div>

          {/* Stat row */}
          <div className="flex items-center gap-6 pt-2 border-t border-primary/10">
            <div>
              <div className="text-foreground font-bold text-lg">∞</div>
              <div className="text-foreground/40 text-xs">Things to learn</div>
            </div>
            <div>
              <div className="text-foreground font-bold text-lg">4</div>
              <div className="text-foreground/40 text-xs">Interests</div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-foreground font-bold text-sm">Open</span>
              </div>
              <div className="text-foreground/40 text-xs">to collaborate</div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — Photo column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-0 overflow-hidden order-1 lg:order-2"
        >
          <Image
            src="/featured.jpg"
            alt="Hadi Ramdhani"
            fill
            className="object-cover object-[center_20%]"
          />

          {/* Left gradient blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#D6E9F8] via-[#D6E9F8]/20 to-transparent" />
          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#D6E9F8]/70 via-transparent to-transparent lg:hidden" />

          {/* Floating label bottom-left */}
          <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 text-right">
            <div className="text-xs font-mono text-foreground/40 tracking-widest uppercase mb-1">
              — The person
            </div>
            <div className="text-foreground font-bold text-lg sm:text-xl tracking-tight leading-none">
              Hadi Ramdhani
            </div>
            <div className="text-foreground/50 text-xs mt-0.5">Kota Bandung, Jawa Barat · 2026</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
