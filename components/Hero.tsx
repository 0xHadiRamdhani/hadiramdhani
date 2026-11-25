"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import BiodataModal from "./BiodataModal";
import HeroVisual from "./HeroVisual";
import FlowLines from "./FlowLines";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden pb-8 pt-24 sm:pb-10 sm:pt-28">
      {/* Backdrop: ember glow, flowing fibres, page guides */}
      <div className="ember-glow pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(75%_55%_at_50%_70%,rgba(226,112,72,0.3),transparent_72%)]" />
      <div className="absolute inset-x-0 bottom-0 top-[26%]">
        <FlowLines />
      </div>
      <div className="page-guides" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#110100] to-transparent" />

      <div className="container relative">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div>
            <h1 className="text-[clamp(3.4rem,10.5vw,9rem)] leading-[0.92] tracking-[-0.045em] text-foreground">
              {["Hadi", "Ramdhani"].map((word, i) => (
                <span key={word} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.12 }}
                    className={`block ${i === 1 ? "text-primary-gradient" : ""}`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.55 }}
              className="mt-6 max-w-md text-lg font-light leading-snug text-foreground/70 sm:text-2xl"
            >
              Software Engineering Student. Code, create, explore.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.4 }}
            className="lg:mt-4"
          >
            <HeroVisual onOpen={() => setIsModalOpen(true)} />
          </motion.div>
        </div>
      </div>

      {/* Bottom bar: summary left, contact right */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.8 }}
        className="container relative mt-16"
      >
        <div className="flex flex-col gap-6 border-t border-border pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xs">
            <p className="text-[13px] leading-relaxed text-foreground/65">
              Siswa Software Engineering yang tertarik pada coding, hacking, electrical, dan coffee. Saat ini
              menempuh Sekolah Profesi Insinyur di Bandung.
            </p>
            <div className="mt-4 flex items-center gap-6 text-[13px]">
              <Link
                href="#journey"
                className="group inline-flex items-center gap-1.5 border-b border-foreground/40 pb-0.5 text-foreground transition-colors hover:border-primary-300 hover:text-primary-300"
              >
                Explore my journey
                <ArrowDown size={13} className="transition-transform group-hover:translate-y-0.5" />
              </Link>
              <Link
                href="#contact"
                className="group inline-flex items-center gap-1 text-foreground/70 transition-colors hover:text-primary-300"
              >
                Let&apos;s connect
                <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
          <a
            href="mailto:hadsxdev@icloud.com"
            className="text-[13px] text-foreground/65 transition-colors hover:text-primary-300"
          >
            hadsxdev@icloud.com
          </a>
        </div>
      </motion.div>

      <BiodataModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
