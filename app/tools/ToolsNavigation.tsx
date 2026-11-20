"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronRight, Gift, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { categories } from "./data";
import { ToolCard } from "./ToolCard";
import SwarmField from "@/components/SwarmField";

/** Word the swarm rebuilds into, per category */
const SHORT: Record<string, string> = {
  "image-editor": "IMAGE",
  "social-media": "SOCIAL",
  screenshot: "SHOT",
  "ai-text": "AI",
  "dev-tools": "DEV",
  "osint-tools": "OSINT",
};

export function ToolsNavigation({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const toolId = pathname.startsWith("/tools/") ? pathname.replace("/tools/", "").split("/")[0] : null;

  const found = toolId
    ? categories
        .map((cat) => ({ cat, tool: cat.tools.find((t) => t.id === toolId) }))
        .find((x) => x.tool)
    : undefined;

  // Hub page renders its own hero
  if (!found || !found.tool) {
    return <div>{children}</div>;
  }

  const { cat, tool } = found;
  const related = cat.tools.filter((t) => t.id !== tool.id && t.status !== "coming-soon").slice(0, 3);

  return (
    <div className="tool-body pt-24 sm:pt-28" style={{ "--accent": cat.accent } as React.CSSProperties}>
      {/* ================= TOOL HEADER ================= */}
      <header className="px-3 pb-8 sm:px-4 sm:pb-10">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] bg-bg-dark text-white ring-1 ring-white/10 shadow-xl sm:rounded-[2rem]">
          <div className="stage-grid pointer-events-none absolute inset-0" />
          <div
            className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full blur-3xl animate-drift"
            style={{ background: `rgba(${cat.accent},0.3)` }}
          />
          <SwarmField
            mode="auto"
            text={SHORT[cat.id] ?? "TOOLS"}
            theme="dark"
            accent={cat.accent}
            density={1500}
            burstOnClick
            autoSwarmMs={3600}
            autoRebuildMs={6400}
            formation={{ cx: 0.77, cy: 0.5, width: 0.34 }}
            formationMobile={{ cx: 0.5, cy: 0.84, width: 0.7 }}
          />

          <div className="relative z-10 px-5 pb-48 pt-6 sm:px-10 sm:pb-12 sm:pt-8">
            {/* Breadcrumb */}
            <motion.nav
              aria-label="Breadcrumb"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex flex-wrap items-center gap-1.5 text-xs font-medium text-white/60"
            >
              <Link
                href="/tools"
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 py-1 pl-1.5 pr-3 backdrop-blur transition-all hover:border-white/25 hover:text-white"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:-translate-x-0.5">
                  <ArrowLeft size={11} />
                </span>
                Semua Tools
              </Link>
              <ChevronRight size={13} className="opacity-50" />
              <span style={{ color: `rgb(${cat.accent})`, filter: "brightness(1.35)" }}>{cat.label}</span>
            </motion.nav>

            <div className="max-w-xl sm:max-w-[58%]">
              <motion.span
                initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl text-white [&_svg]:h-7 [&_svg]:w-7"
                style={{
                  background: `linear-gradient(135deg, rgb(${cat.accent}), rgba(${cat.accent},0.72))`,
                  boxShadow: `0 18px 40px -14px rgba(${cat.accent},0.8)`,
                }}
              >
                {tool.icon}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl font-bold tracking-tight sm:text-5xl"
              >
                {tool.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base"
              >
                {tool.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="mt-5 flex flex-wrap items-center gap-2"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-300">
                  <ShieldCheck size={13} />
                  Berjalan di browser
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70 backdrop-blur">
                  <Gift size={13} />
                  Gratis, tanpa login
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* ================= TOOL ================= */}
      {children}

      {/* ================= RELATED ================= */}
      {related.length > 0 && (
        <section className="border-t border-border bg-muted/30 px-4 py-14 sm:py-16">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Lanjut dengan
                </p>
                <h2 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">Tools lain di {cat.label}</h2>
              </div>
              <Link
                href="/tools"
                className="group hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-lime-ink sm:inline-flex"
              >
                Semua tools
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((t, i) => (
                <ToolCard key={t.id} tool={t} index={i} accent={cat.accent} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
