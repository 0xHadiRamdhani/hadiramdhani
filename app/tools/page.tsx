"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, SearchX, Search, ShieldCheck, Sparkles, X } from "lucide-react";
import { categories } from "./data";
import { ToolCard } from "./ToolCard";

const POPULAR = [
  "json-formatter",
  "image-compressor",
  "base64-tool",
  "hash-gen",
  "regex-tester",
  "screenshot-beautifier",
  "ip-lookup",
  "color-picker",
];

export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const searchRef = useRef<HTMLInputElement>(null);

  const allTools = useMemo(
    () => categories.flatMap((c) => c.tools.map((t) => ({ tool: t, cat: c }))),
    [],
  );
  const totalTools = allTools.length;
  const totalLive = allTools.filter(({ tool }) => tool.status === "live").length;

  const popular = useMemo(
    () => POPULAR.map((id) => allTools.find(({ tool }) => tool.id === id)).filter(Boolean) as typeof allTools,
    [allTools],
  );

  const q = search.trim().toLowerCase();
  const filtered = useMemo(() => {
    return categories
      .filter((cat) => activeCategory === "all" || cat.id === activeCategory)
      .map((cat) => ({
        ...cat,
        tools: cat.tools.filter(
          (t) =>
            !q ||
            t.name.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q) ||
            cat.label.toLowerCase().includes(q) ||
            cat.id.toLowerCase().includes(q),
        ),
      }))
      .filter((cat) => cat.tools.length > 0);
  }, [q, activeCategory]);

  const resultCount = filtered.reduce((n, c) => n + c.tools.length, 0);

  // "/" focuses the search box
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing = el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden px-4 pb-10 pt-28 sm:pb-14 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 aurora" />
        <div className="pointer-events-none absolute inset-0 grid-bg mask-fade-y" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl animate-drift" />

        <div className="container relative max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <span className="eyebrow">
              <Sparkles size={13} />
              <i className="eyebrow-line" />
              Tools
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Tools untuk <span className="text-primary-gradient">developer</span>
              <br className="hidden sm:block" /> dan kreator.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Gratis, tanpa login, dan berjalan langsung di browser. File dan teks kamu tidak pernah diunggah ke
              server.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-8 max-w-2xl"
          >
            <div className="group relative rounded-2xl bg-gradient-to-r from-primary/40 via-secondary-400/40 to-primary/40 p-px shadow-xl shadow-primary/10 transition-shadow focus-within:shadow-2xl focus-within:shadow-primary/20">
              <div className="relative flex items-center rounded-[calc(1rem-1px)] bg-white">
                <Search className="pointer-events-none absolute left-4 text-muted-foreground" size={18} />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari tool, misalnya JSON, Base64, Compressor"
                  aria-label="Cari tool"
                  className="tool-search w-full rounded-2xl bg-transparent py-4 pl-12 pr-24 text-sm outline-none placeholder:text-muted-foreground/70 sm:text-base"
                />
                <div className="absolute right-3 flex items-center gap-2">
                  {search ? (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      aria-label="Hapus pencarian"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-border hover:text-foreground"
                    >
                      <X size={14} />
                    </button>
                  ) : (
                    <kbd className="hidden rounded-md border border-border bg-muted/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground sm:block">
                      /
                    </kbd>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="font-mono text-sm font-bold text-foreground">{totalTools}</span> tools
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span className="font-mono text-sm font-bold text-foreground">{totalLive}</span> live
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="font-mono text-sm font-bold text-foreground">{categories.length}</span> kategori
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-primary" />
                100% client-side
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CATEGORY BAR ================= */}
      <div className="sticky top-16 z-30 border-y border-border/70 bg-white/80 backdrop-blur-xl sm:top-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="scrollbar-hide flex gap-2 overflow-x-auto py-3">
            <CategoryPill
              active={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
              accent="32,160,232"
              count={totalTools}
            >
              Semua
            </CategoryPill>
            {categories.map((cat) => (
              <CategoryPill
                key={cat.id}
                active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                accent={cat.accent}
                count={cat.tools.length}
                icon={cat.icon}
              >
                {cat.label}
              </CategoryPill>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 pt-10 sm:pt-12">
        {/* ================= POPULAR ================= */}
        {!q && activeCategory === "all" && (
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16"
          >
            <div className="mb-4 flex items-center gap-3">
              <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Paling sering dipakai
              </h2>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="scrollbar-hide -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
              {popular.map(({ tool, cat }) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.id}`}
                  className="group flex shrink-0 items-center gap-2.5 rounded-full border border-border bg-white py-1.5 pl-1.5 pr-4 text-sm font-medium text-foreground/80 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground hover:shadow-md"
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                    style={{ background: `rgba(${cat.accent},0.14)`, color: `rgb(${cat.accent})` }}
                  >
                    {tool.icon}
                  </span>
                  {tool.name}
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* ================= RESULTS ================= */}
        {q && (
          <p className="mb-6 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{resultCount}</span> hasil untuk{" "}
            <span className="font-mono text-foreground">&ldquo;{search.trim()}&rdquo;</span>
          </p>
        )}

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center">
            <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <SearchX size={28} />
            </span>
            <p className="text-lg font-semibold">Tidak ada tool yang cocok</p>
            <p className="mt-1 text-sm text-muted-foreground">Coba kata kunci lain, atau lihat semua kategori.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary-500"
            >
              Reset pencarian
              <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <div className="space-y-14 sm:space-y-20">
            {filtered.map((cat) => {
              const live = cat.tools.filter((t) => t.status === "live").length;
              return (
                <section key={cat.id} aria-labelledby={`cat-${cat.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-3"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, rgba(${cat.accent},1), rgba(${cat.accent},0.7))`,
                          color: "#fff",
                          boxShadow: `0 12px 28px -10px rgba(${cat.accent},0.6)`,
                        }}
                      >
                        {cat.icon}
                      </span>
                      <div>
                        <h2 id={`cat-${cat.id}`} className="text-xl font-bold tracking-tight sm:text-2xl">
                          {cat.label}
                        </h2>
                        <p className="text-xs text-muted-foreground sm:text-sm">{cat.blurb}</p>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      {cat.tools.length} tools · {live} live
                    </span>
                  </motion.div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {cat.tools.map((tool, i) => (
                      <ToolCard key={tool.id} tool={tool} index={i} accent={cat.accent} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

function CategoryPill({
  active,
  onClick,
  accent,
  count,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  accent: string;
  count: number;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all ${
        active ? "text-white shadow-md" : "border-border bg-white text-muted-foreground hover:text-foreground"
      }`}
      style={
        active
          ? {
              background: `rgb(${accent})`,
              borderColor: `rgb(${accent})`,
              boxShadow: `0 8px 20px -8px rgba(${accent},0.7)`,
            }
          : undefined
      }
    >
      {icon && <span className="[&_svg]:h-4 [&_svg]:w-4">{icon}</span>}
      {children}
      <span
        className={`rounded-full px-1.5 font-mono text-[10px] font-bold ${
          active ? "bg-white/25 text-white" : "bg-muted text-muted-foreground"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
