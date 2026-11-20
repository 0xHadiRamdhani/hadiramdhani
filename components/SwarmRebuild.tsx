"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Compass, Hammer, MousePointer2, Repeat2 } from "lucide-react";
import SwarmField, { type SwarmMode, type SwarmPhase } from "./SwarmField";
import SectionHeader from "./SectionHeader";

const modes: { id: SwarmMode; label: string }[] = [
  { id: "auto", label: "Auto" },
  { id: "swarm", label: "Swarm" },
  { id: "rebuild", label: "Rebuild" },
];

const shapes = ["</>", "HADI", "{ }", "01"];

const principles = [
  {
    icon: Compass,
    tag: "SWARM",
    title: "Eksplorasi",
    text: "Ide, eksperimen, dan rasa penasaran bergerak ke segala arah, tanpa takut salah jalan.",
  },
  {
    icon: Hammer,
    tag: "REBUILD",
    title: "Merakit ulang",
    text: "Potongan-potongan kecil disusun menjadi satu bentuk yang utuh dan bisa dipakai orang lain.",
  },
  {
    icon: Repeat2,
    tag: "REPEAT",
    title: "Iterasi",
    text: "Setiap kali bubar, hasilnya dirakit lagi, dan selalu sedikit lebih baik dari sebelumnya.",
  },
];

export default function SwarmRebuild() {
  const [mode, setMode] = useState<SwarmMode>("auto");
  const [text, setText] = useState(shapes[0]);
  const [phase, setPhase] = useState<SwarmPhase>("swarm");

  return (
    <section
      id="swarm"
      className="relative w-full py-20 sm:py-28 bg-bg-dark text-white overflow-hidden scroll-mt-16"
    >
      <div className="absolute inset-0 dot-grid-dark mask-fade-y pointer-events-none" />
      <div className="absolute -top-40 left-1/2 h-[32rem] w-[48rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-32 h-96 w-96 rounded-full bg-secondary-400/15 blur-3xl pointer-events-none" />

      <div className="container relative">
        <SectionHeader
          tone="dark"
          index="06"
          eyebrow="Swarm / Rebuild"
          title={
            <>
              Dari kawanan kecil,{" "}
              <span className="text-primary-gradient">dirakit jadi nyata.</span>
            </>
          }
          subtitle="Cara saya bekerja: bergerak bebas, mengeksplorasi, lalu menyusun semuanya kembali menjadi sesuatu yang berbentuk."
        />

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-5xl mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div role="group" aria-label="Mode" className="inline-flex w-fit rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur">
            {modes.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                aria-pressed={mode === m.id}
                className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all ${
                  mode === m.id
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div role="group" aria-label="Bentuk" className="flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-[11px] uppercase tracking-widest text-white/40">Bentuk</span>
            {shapes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setText(s)}
                aria-pressed={text === s}
                className={`rounded-lg border px-3 py-1.5 font-mono text-sm transition-all ${
                  text === s
                    ? "border-primary/60 bg-primary/15 text-primary-200"
                    : "border-white/10 bg-white/5 text-white/60 hover:border-white/25 hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto max-w-5xl h-[360px] sm:h-[480px] lg:h-[540px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] shadow-2xl shadow-black/40 cursor-crosshair touch-pan-y"
        >
          <SwarmField
            mode={mode}
            text={text}
            theme="dark"
            burstOnClick
            density={1700}
            formation={{ cx: 0.5, cy: 0.5, width: 0.66 }}
            formationMobile={{ cx: 0.5, cy: 0.5, width: 0.82 }}
            onPhaseChange={setPhase}
          />

          {/* HUD */}
          <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-white/70 backdrop-blur">
            <span
              className={`h-1.5 w-1.5 rounded-full ${phase === "rebuild" ? "bg-green-400" : "bg-primary-300 animate-pulse"}`}
            />
            Phase: {phase}
          </div>
          <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 font-mono text-[11px] text-white/40">
            <span className="inline-flex items-center gap-1.5">
              <MousePointer2 size={12} />
              <span className="hidden sm:inline">gerakkan kursor untuk menarik, klik untuk menyebar</span>
              <span className="sm:hidden">sentuh untuk menarik</span>
            </span>
            <span>boids · flock · rebuild</span>
          </div>
        </motion.div>

        {/* Principles */}
        <div className="mx-auto mt-6 grid max-w-5xl gap-4 sm:mt-8 sm:grid-cols-3">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.tag}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 backdrop-blur transition-all duration-300 hover:border-primary/40 hover:bg-white/[0.07] hover:-translate-y-1"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary-300 transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon size={18} />
                  </span>
                  <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-white/35">{p.tag}</span>
                </div>
                <h3 className="mb-1.5 text-lg font-bold text-white">{p.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{p.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
