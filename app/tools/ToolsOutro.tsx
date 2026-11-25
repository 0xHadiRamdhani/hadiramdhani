"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Gift, Lock, ServerOff } from "lucide-react";
import SwarmField from "@/components/SwarmField";

const points = [
  { icon: ServerOff, label: "Tanpa upload" },
  { icon: Lock, label: "Tanpa login" },
  { icon: Gift, label: "Gratis" },
];

export default function ToolsOutro() {
  return (
    <section className="px-3 pb-16 pt-6 sm:px-4 sm:pb-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] bg-bg-dark text-white ring-1 ring-white/10 sm:rounded-[2.25rem]">
        <div className="stage-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-drift" />

        <SwarmField
          mode="auto"
          text="LOCAL"
          theme="dark"
          density={1500}
          burstOnClick
          autoSwarmMs={3800}
          autoRebuildMs={6000}
          formation={{ cx: 0.74, cy: 0.5, width: 0.4 }}
          formationMobile={{ cx: 0.5, cy: 0.84, width: 0.8 }}
        />

        <div className="relative z-10 px-5 pb-52 pt-12 sm:px-10 sm:pb-16 sm:pt-16 lg:px-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-primary-300">
              Privasi by design
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              Semua berjalan <span className="text-primary-gradient">di browser kamu.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
              Tidak ada file yang meninggalkan perangkatmu. Tool bekerja secara lokal, lalu hilang begitu tab ditutup.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {points.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 backdrop-blur"
                >
                  <Icon size={13} className="text-primary-300" />
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary-500"
              >
                Request tool baru
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition-all hover:-translate-y-0.5 hover:bg-white/10"
              >
                Kembali ke portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
