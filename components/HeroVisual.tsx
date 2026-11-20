"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Code2, Coffee, GraduationCap, MapPin, Terminal, Zap, type LucideIcon } from "lucide-react";
import { ClockWidget } from "./ClockWidget";

const orbit: { icon: LucideIcon; angle: number; color: string }[] = [
  { icon: Code2, angle: 0, color: "text-lime-ink border-primary/30" },
  { icon: Terminal, angle: 90, color: "text-lime-ink border-primary/30" },
  { icon: Zap, angle: 180, color: "text-lime-ink border-primary/30" },
  { icon: Coffee, angle: 270, color: "text-lime-ink border-primary/30" },
];

const glass =
  "rounded-2xl border border-white/80 bg-white/80 backdrop-blur-xl shadow-xl shadow-primary/10";

export default function HeroVisual({ onOpen }: { onOpen: () => void }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 110, damping: 18 });
  const sy = useSpring(my, { stiffness: 110, damping: 18 });

  const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);
  const nearX = useTransform(sx, [-0.5, 0.5], [16, -16]);
  const nearY = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const farX = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const farY = useTransform(sy, [-0.5, 0.5], [-8, 8]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 1200 }}
      className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[500px]"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-[6%] rounded-full bg-gradient-to-br from-primary/35 via-secondary-400/20 to-transparent blur-3xl" />

      {/* Orbit rings */}
      <div className="pointer-events-none absolute inset-0 rounded-full border border-dashed border-primary/30 orbit-spin" />
      <div className="pointer-events-none absolute inset-[8%] rounded-full border border-primary/15" />

      {/* Orbiting skill badges */}
      <div className="pointer-events-none absolute inset-0 orbit-spin">
        {orbit.map(({ icon: Icon, angle, color }) => (
          <div key={angle} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
              <div style={{ transform: `rotate(${-angle}deg)` }}>
                <div
                  className={`orbit-counter flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border bg-white shadow-lg shadow-black/5 ${color}`}
                >
                  <Icon size={20} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Portrait */}
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label="Lihat biodata lengkap"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileTap={{ scale: 0.98 }}
        className="group absolute inset-[14%] cursor-pointer rounded-[2.2rem] bg-gradient-to-br from-primary via-secondary-400 to-primary-600 p-[3px] shadow-2xl shadow-primary/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-ink"
      >
        <span className="relative block h-full w-full overflow-hidden rounded-[calc(2.2rem-3px)] bg-white">
          <Image
            src="/avatar.jpg"
            alt="Hadi Ramdhani"
            fill
            priority
            sizes="(max-width: 640px) 240px, 360px"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <span className="absolute inset-x-0 bottom-0 flex flex-col items-start p-4 sm:p-5 text-left">
            <span className="text-base sm:text-xl font-bold leading-tight tracking-tight text-white drop-shadow">
              Hadi Ramdhani
            </span>
            <span className="text-[11px] sm:text-xs font-medium text-white/80">Software Engineering Student</span>
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-lime-ink opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100">
            Biodata
          </span>
        </span>
      </motion.button>

      {/* Terminal card */}
      <motion.div
        style={{ x: nearX, y: nearY }}
        className="absolute -left-4 top-[4%] z-10 hidden w-[218px] sm:block lg:-left-12"
      >
        <div className={`${glass} overflow-hidden animate-float-y`}>
          <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-zinc-300" />
            <span className="h-2 w-2 rounded-full bg-zinc-300" />
            <span className="h-2 w-2 rounded-full bg-zinc-300" />
            <span className="ml-2 font-mono text-[10px] text-muted-foreground">hadi.ts</span>
          </div>
          <pre className="px-3.5 py-3 font-mono text-[11px] leading-[1.65] text-foreground/70">
            <span className="text-lime-ink">const</span> <span className="text-lime-ink">hadi</span> = {"{"}
            {"\n"}  role: <span className="text-lime-ink">&quot;Engineering Student&quot;</span>,
            {"\n"}  stack: [<span className="text-lime-ink">&quot;Flutter&quot;</span>,
            {"\n"}          <span className="text-lime-ink">&quot;Next.js&quot;</span>],
            {"\n"}  coffee: <span className="text-lime-ink">true</span>,
            {"\n"}{"}"};<span className="ml-0.5 inline-block h-3 w-[2px] translate-y-0.5 bg-primary animate-pulse" />
          </pre>
        </div>
      </motion.div>

      {/* Status card */}
      <motion.div style={{ x: farX, y: farY }} className="absolute right-0 top-[1%] z-10 sm:-right-4 sm:top-[30%] xl:-right-10">
        <div className={`${glass} flex items-center gap-3 px-3.5 py-3 animate-float-y [animation-delay:-2s]`}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lime-ink">
            <GraduationCap size={17} />
          </span>
          <span className="leading-tight">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-lime-ink">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-primary-500 animate-pulse-ring" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-primary-500" />
              </span>
              Studying
            </span>
            <span className="block max-w-[150px] text-xs font-bold uppercase leading-snug tracking-wide text-foreground">Sekolah Profesi Insinyur</span>
          </span>
        </div>
      </motion.div>

      {/* Location + live time */}
      <motion.div style={{ x: nearX, y: nearY }} className="absolute -bottom-3 left-0 z-10 sm:bottom-[6%] sm:-left-6">
        <div className={`${glass} flex items-center gap-2.5 px-3.5 py-2.5 animate-float-y [animation-delay:-3.5s]`}>
          <MapPin size={15} className="shrink-0 text-lime-ink" />
          <span className="leading-tight">
            <span className="block text-xs font-bold text-foreground">Kota Bandung</span>
            <ClockWidget compact />
          </span>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div style={{ x: farX, y: farY }} className="absolute -bottom-3 right-1 z-20 sm:right-0">
        <button
          type="button"
          onClick={onOpen}
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-bg-dark shadow-lg shadow-primary/35 transition-all hover:-translate-y-0.5 hover:bg-primary-500 sm:px-5 sm:py-3 sm:text-sm"
        >
          Lihat Biodata
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>
    </div>
  );
}
