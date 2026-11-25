"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, SearchX } from "lucide-react";
import { categories } from "./data";
import { ToolCard } from "./ToolCard";
import ToolsHero from "./ToolsHero";
import ToolsMarquee from "./ToolsMarquee";
import ToolsBento from "./ToolsBento";
import ToolsOutro from "./ToolsOutro";

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

const ease = [0.22, 1, 0.36, 1] as const;

export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

  const browse = () => listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <ToolsHero
        search={search}
        onSearch={setSearch}
        searchRef={searchRef}
        totalTools={totalTools}
        totalLive={totalLive}
        totalCategories={categories.length}
      />

      <ToolsMarquee items={allTools} />

      {/* ================= CATEGORY BAR ================= */}
      <div ref={listRef} className="sticky top-16 z-30 mt-6 scroll-mt-16 border-y border-border/70 bg-card/80 backdrop-blur-xl sm:top-20 sm:scroll-mt-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="scrollbar-hide flex gap-1.5 overflow-x-auto py-2.5" role="tablist" aria-label="Kategori tools">
            <CategoryPill
              active={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
              accent="207,140,118"
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

      <div className="container mx-auto max-w-7xl px-4 pt-10 sm:pt-14">
        {/* ================= POPULAR ================= */}
        {!q && activeCategory === "all" && <ToolsBento items={popular} total={totalTools} onBrowse={browse} />}

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
          <div className="space-y-16 sm:space-y-24">
            {filtered.map((cat) => {
              const live = cat.tools.filter((t) => t.status === "live").length;
              const index = String(categories.findIndex((c) => c.id === cat.id) + 1).padStart(2, "0");
              return (
                <section
                  key={cat.id}
                  aria-labelledby={`cat-${cat.id}`}
                  className="relative"
                  style={{ "--accent": cat.accent } as React.CSSProperties}
                >
                  <div
                    className="pointer-events-none absolute -left-16 -top-10 h-56 w-56 rounded-full opacity-60 blur-3xl"
                    style={{ background: `rgba(${cat.accent},0.13)` }}
                  />

                  <div className="relative mb-7">
                    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
                      <div className="flex items-center gap-4 sm:gap-5">
                        <motion.span
                          initial={{ opacity: 0, x: -16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, ease }}
                          className="cat-outline-num hidden font-mono text-5xl font-bold leading-none sm:block sm:text-7xl"
                        >
                          {index}
                        </motion.span>
                        <motion.div
                          initial={{ opacity: 0, y: 14 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.55, ease, delay: 0.08 }}
                          className="flex items-center gap-3.5"
                        >
                          <span
                            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white sm:h-14 sm:w-14"
                            style={{
                              background: `linear-gradient(135deg, rgb(${cat.accent}), rgba(${cat.accent},0.7))`,
                              boxShadow: `0 14px 30px -10px rgba(${cat.accent},0.65)`,
                            }}
                          >
                            <span
                              className="ping-soft absolute inset-0 rounded-2xl"
                              style={{ boxShadow: `0 0 0 1.5px rgba(${cat.accent},0.5)` }}
                            />
                            {cat.icon}
                          </span>
                          <div>
                            <h2 id={`cat-${cat.id}`} className="text-xl font-bold tracking-tight sm:text-3xl">
                              {cat.label}
                            </h2>
                            <p className="mt-0.5 max-w-md text-xs text-muted-foreground sm:text-sm">{cat.blurb}</p>
                          </div>
                        </motion.div>
                      </div>
                      <span
                        className="rounded-full border px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest"
                        style={{
                          color: "var(--color-primary-300)",
                          borderColor: `rgba(${cat.accent},0.55)`,
                          background: `rgba(${cat.accent},0.18)`,
                        }}
                      >
                        {cat.tools.length} tools · {live} live
                      </span>
                    </div>

                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease, delay: 0.15 }}
                      className="mt-6 h-px origin-left"
                      style={{
                        background: `linear-gradient(90deg, rgb(${cat.accent}), rgba(${cat.accent},0.15) 60%, transparent)`,
                      }}
                    />
                  </div>

                  <div className="relative grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
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

      <ToolsOutro />
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
      role="tab"
      onClick={onClick}
      aria-selected={active}
      className={`relative flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
        active ? "text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {active && (
        <motion.span
          layoutId="cat-pill"
          className="absolute inset-0 rounded-full"
          style={{ background: `rgb(${accent})`, boxShadow: `0 8px 20px -8px rgba(${accent},0.7)` }}
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}
      {icon && <span className="relative [&_svg]:h-4 [&_svg]:w-4">{icon}</span>}
      <span className="relative">{children}</span>
      <span
        className={`relative rounded-full px-1.5 font-mono text-[10px] font-bold ${
          active ? "bg-card/25 text-white" : "bg-muted text-muted-foreground"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
