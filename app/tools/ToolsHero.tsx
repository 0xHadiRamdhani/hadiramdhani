"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { animate, motion, useInView } from "framer-motion";
import { Boxes, MousePointerClick, Search, ShieldCheck, X } from "lucide-react";
import SwarmField, { type SwarmMode, type SwarmPhase } from "@/components/SwarmField";

const modes: { id: SwarmMode; label: string }[] = [
  { id: "auto", label: "Auto" },
  { id: "swarm", label: "Swarm" },
  { id: "rebuild", label: "Rebuild" },
];

function CountUp({ to, className = "" }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}

type Props = {
  search: string;
  onSearch: (v: string) => void;
  searchRef: RefObject<HTMLInputElement | null>;
  totalTools: number;
  totalLive: number;
  totalCategories: number;
};

export default function ToolsHero({ search, onSearch, searchRef, totalTools, totalLive, totalCategories }: Props) {
  const [mode, setMode] = useState<SwarmMode>("auto");
  const [phase, setPhase] = useState<SwarmPhase>("swarm");

  const stats = [
    { value: totalTools, label: "Tools" },
    { value: totalLive, label: "Live" },
    { value: totalCategories, label: "Kategori" },
  ];

  return (
    <section className="px-3 pt-24 sm:px-4 sm:pt-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] bg-bg-dark text-white shadow-2xl shadow-primary/10 ring-1 ring-white/10 sm:rounded-[2.25rem]">
        {/* backdrop */}
        <div className="stage-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -left-24 -top-32 h-96 w-96 rounded-full bg-primary/25 blur-3xl animate-drift" />
        <div className="pointer-events-none absolute -bottom-40 right-10 h-96 w-96 rounded-full bg-secondary-400/20 blur-3xl animate-drift [animation-delay:-6s]" />

        {/* swarm shape on the right (desktop) / bottom (mobile) */}
        <SwarmField
          mode={mode}
          text="TOOLS"
          theme="dark"
          density={1500}
          burstOnClick
          autoSwarmMs={4600}
          autoRebuildMs={6200}
          formation={{ cx: 0.74, cy: 0.5, width: 0.4 }}
          formationMobile={{ cx: 0.5, cy: 0.86, width: 0.86 }}
          onPhaseChange={setPhase}
        />

        <div className="relative z-10 px-5 pb-60 pt-10 sm:px-10 sm:pb-16 sm:pt-14 lg:px-16 lg:pb-20 lg:pt-20">
          <div className="max-w-2xl lg:max-w-[46%]">
            <h1 className="text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
              {["Tools", "untuk"].map((w, i) => (
                <motion.span
                  key={w}
                  initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="mr-[0.25em] inline-block"
                >
                  {w}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
                className="text-primary-gradient inline-block"
              >
                developer
              </motion.span>
              <br />
              {["dan", "kreator."].map((w, i) => (
                <motion.span
                  key={w}
                  initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, delay: 0.34 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="mr-[0.25em] inline-block"
                >
                  {w}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-5 max-w-md text-sm leading-relaxed text-white/65 sm:text-base"
            >
              Gratis, tanpa login, dan berjalan langsung di browser. File dan teks kamu tidak pernah diunggah ke
              server.
            </motion.p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-7"
            >
              <div className="relative overflow-hidden rounded-2xl p-px shadow-xl shadow-black/30">
                <span className="beam" style={{ "--spot": "190,242,100" } as React.CSSProperties} />
                <div className="relative flex items-center rounded-[calc(1rem-1px)] bg-[#121212]/95 backdrop-blur">
                  <Search className="pointer-events-none absolute left-4 text-white/50" size={18} />
                  <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Cari tool, misalnya JSON, Base64, Compressor"
                    aria-label="Cari tool"
                    className="tool-search w-full rounded-2xl bg-transparent py-4 pl-12 pr-16 text-sm text-white outline-none placeholder:text-white/40 sm:text-base"
                  />
                  <div className="absolute right-3 flex items-center">
                    {search ? (
                      <button
                        type="button"
                        onClick={() => onSearch("")}
                        aria-label="Hapus pencarian"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    ) : (
                      <kbd className="hidden rounded-md border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-white/50 sm:block">
                        /
                      </kbd>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3"
            >
              {stats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-2">
                  <CountUp to={s.value} className="font-mono text-3xl font-bold tabular-nums text-white" />
                  <span className="text-xs uppercase tracking-widest text-white/50">{s.label}</span>
                </div>
              ))}
              <span className="inline-flex items-center gap-1.5 text-xs text-white/60">
                <ShieldCheck size={14} className="text-primary-300" />
                100% client-side
              </span>
            </motion.div>
          </div>

          {/* swarm controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center justify-between gap-3 sm:bottom-6 sm:left-10 sm:right-10 lg:left-auto lg:right-12"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-white/70 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span
                  className={`ping-soft absolute inline-flex h-full w-full rounded-full ${
                    phase === "rebuild" ? "bg-primary-300" : "bg-secondary-300"
                  }`}
                />
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${
                    phase === "rebuild" ? "bg-primary-300" : "bg-secondary-300"
                  }`}
                />
              </span>
              {phase === "rebuild" ? "Rebuild" : "Swarm"}
            </span>

            <div
              role="group"
              aria-label="Mode swarm"
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur"
            >
              <Boxes size={14} className="mx-1.5 text-white/40" />
              {modes.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={mode === m.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMode(m.id);
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                    mode === m.id ? "bg-primary text-white shadow-md shadow-primary/30" : "text-white/60 hover:text-white"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <span className="hidden items-center gap-1.5 text-[11px] text-white/40 xl:inline-flex">
              <MousePointerClick size={13} />
              Gerakkan kursor atau klik untuk memecah
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
