"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronRight, Gift, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { categories } from "./data";
import { ToolCard } from "./ToolCard";

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
      <header className="relative overflow-hidden px-4 pb-8 sm:pb-10">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(55% 80% at 50% 0%, rgba(${cat.accent},0.16), transparent 70%)`,
          }}
        />
        <div className="pointer-events-none absolute inset-0 grid-bg mask-fade-y opacity-70" />

        <div className="container relative mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-wrap items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground"
          >
            <Link
              href="/tools"
              className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-white/80 py-1 pl-1.5 pr-3 backdrop-blur transition-all hover:border-primary/40 hover:text-primary"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted transition-transform group-hover:-translate-x-0.5">
                <ArrowLeft size={11} />
              </span>
              Semua Tools
            </Link>
            <ChevronRight size={13} className="opacity-50" />
            <span style={{ color: `rgb(${cat.accent})` }}>{cat.label}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col items-center text-center"
          >
            <span
              className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl text-white [&_svg]:h-7 [&_svg]:w-7"
              style={{
                background: `linear-gradient(135deg, rgb(${cat.accent}), rgba(${cat.accent},0.72))`,
                boxShadow: `0 18px 40px -14px rgba(${cat.accent},0.7)`,
              }}
            >
              {tool.icon}
            </span>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{tool.name}</h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {tool.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-700">
                <ShieldCheck size={13} />
                Berjalan di browser
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/80 px-3 py-1 text-xs font-semibold text-muted-foreground backdrop-blur">
                <Gift size={13} />
                Gratis, tanpa login
              </span>
            </div>
          </motion.div>
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
                className="group hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-primary sm:inline-flex"
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
