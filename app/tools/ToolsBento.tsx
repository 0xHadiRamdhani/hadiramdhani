"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Flame } from "lucide-react";
import Spotlight from "@/components/Spotlight";
import type { Category, Tool } from "./data";

type Item = { tool: Tool; cat: Category };

const ease = [0.22, 1, 0.36, 1] as const;

const codeLines: { i: number; node: React.ReactNode }[] = [
  { i: 0, node: <span className="text-white/40">{"{"}</span> },
  { i: 1, node: <>{"  "}<span className="text-primary-300">&quot;name&quot;</span>: <span className="text-primary-300">&quot;Hadi&quot;</span>,</> },
  { i: 2, node: <>{"  "}<span className="text-primary-300">&quot;tools&quot;</span>: <span className="text-primary-300">{"42"}</span>,</> },
  { i: 3, node: <>{"  "}<span className="text-primary-300">&quot;upload&quot;</span>: <span className="text-primary-300">false</span>,</> },
  { i: 4, node: <>{"  "}<span className="text-primary-300">&quot;login&quot;</span>: <span className="text-primary-300">false</span></> },
  { i: 5, node: <span className="text-white/40">{"}"}<span className="caret ml-0.5 inline-block h-3.5 w-[7px] translate-y-0.5 bg-primary-300" /></span> },
];

function BigTile({ item }: { item: Item }) {
  const { tool, cat } = item;
  return (
    <Link href={`/tools/${tool.id}`} className="tool-card-link block h-full">
      <Spotlight
        color={cat.accent}
        tilt={3}
        className="group relative flex h-full min-h-[17rem] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-bg-dark p-6 text-white shadow-xl sm:p-7"
      >
        <div className="stage-grid pointer-events-none absolute inset-0 opacity-70" />
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
          style={{ background: `rgba(${cat.accent},0.35)` }}
        />
        <div className="relative flex items-start justify-between gap-3">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-2xl text-white"
            style={{ background: `linear-gradient(135deg, rgb(${cat.accent}), rgba(${cat.accent},0.65))` }}
          >
            <span className="icon-wiggle">{tool.icon}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-primary-300">
            <Flame size={11} />
            Terpopuler
          </span>
        </div>

        <div
          aria-hidden="true"
          className="relative my-5 rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-[12px] leading-[1.7] text-white/80 backdrop-blur sm:text-[13px]"
        >
          {codeLines.map((l) => (
            <div key={l.i} className="code-line whitespace-pre" style={{ "--i": l.i } as React.CSSProperties}>
              {l.node}
            </div>
          ))}
        </div>

        <div className="relative">
          <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{tool.name}</h3>
          <p className="mt-1 text-sm text-white/60">{tool.description}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-200">
            Buka tool
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Spotlight>
    </Link>
  );
}

function Tile({ item }: { item: Item }) {
  const { tool, cat } = item;
  return (
    <Link href={`/tools/${tool.id}`} className="tool-card-link block h-full">
      <Spotlight
        color={cat.accent}
        tilt={8}
        className="group relative flex h-full min-h-[8.5rem] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-5"
        style={{ "--hover-border": `rgba(${cat.accent},0.5)`, "--hover-shadow": `rgba(${cat.accent},0.22)` } as React.CSSProperties}
      >
        {/* oversized watermark icon */}
        <span
          className="pointer-events-none absolute -bottom-5 -right-5 opacity-[0.07] transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:opacity-[0.14] [&_svg]:h-28 [&_svg]:w-28"
          style={{ color: "var(--color-primary-300)" }}
        >
          {tool.icon}
        </span>
        <div className="relative flex items-start justify-between">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: `rgba(${cat.accent},0.13)`, color: "var(--color-primary-300)" }}
          >
            <span className="icon-wiggle">{tool.icon}</span>
          </span>
          <ArrowUpRight
            size={16}
            className="text-muted-foreground/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
          />
        </div>
        <div className="relative mt-4">
          <h3 className="text-sm font-semibold leading-snug text-foreground sm:text-[15px]">{tool.name}</h3>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{tool.description}</p>
        </div>
      </Spotlight>
    </Link>
  );
}

export default function ToolsBento({ items, total, onBrowse }: { items: Item[]; total: number; onBrowse: () => void }) {
  const [big, ...rest] = items;
  return (
    <section className="mb-14 sm:mb-20" aria-labelledby="popular-heading">
      <div className="mb-5 flex items-center gap-3">
        <h2 id="popular-heading" className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Paling sering dipakai
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="h-px flex-1 origin-left bg-border"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {big && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease }}
            className="col-span-2 lg:row-span-2"
          >
            <BigTile item={big} />
          </motion.div>
        )}
        {rest.map((item, i) => (
          <motion.div
            key={item.tool.id}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, ease, delay: 0.06 * i }}
          >
            <Tile item={item} />
          </motion.div>
        ))}

        <motion.button
          type="button"
          onClick={onBrowse}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, ease, delay: 0.06 * rest.length }}
          className="group relative flex min-h-[8.5rem] flex-col justify-between overflow-hidden rounded-2xl bg-primary p-4 text-left text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/35 sm:p-5"
        >
          <span className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15 blur-2xl transition-transform duration-500 group-hover:scale-150" />
          <span className="relative font-mono text-3xl font-bold tabular-nums">{total}</span>
          <span className="relative">
            <span className="block text-sm font-semibold">Jelajahi semua tools</span>
            <span className="mt-1 inline-flex items-center gap-1 text-xs text-white/80">
              Lihat kategori
              <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </span>
        </motion.button>
      </div>
    </section>
  );
}
