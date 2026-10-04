"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Zap, ExternalLink, Clock } from "lucide-react";
import { categories } from "./data";
import { ToolCard } from "./ToolCard";

export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const totalLive = useMemo(
    () =>categories.flatMap((c) =>c.tools).filter((t) =>t.status === "live").length,
    []
  );
  const totalTools = useMemo(() =>categories.flatMap((c) =>c.tools).length, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return categories
      .filter((cat) =>activeCategory === "all" || cat.id === activeCategory)
      .map((cat) => ({
        ...cat,
        tools: cat.tools.filter(
          (t) =>
            !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) =>cat.tools.length > 0);
  }, [search, activeCategory]);

  return (
    <main className="min-h-screen pt-24 sm:pt-32 pb-24 px-4 bg-background">
      <div className="container max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Developer &amp; Creative{" "}
            <span className="text-primary-gradient">Tools</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            {totalTools}+ tools lengkap untuk developer dan kreator. Tools{" "}
            <span className="text-green-600 font-semibold">live</span>berjalan langsung di
            browser, <span className="text-blue-500 font-semibold">external</span>membuka
            layanan terpercaya, dan{" "}
            <span className="text-amber-500 font-semibold">coming soon</span>segera hadir.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-10 sm:mb-14">
          {[
            { label: "Total Tools", value: totalTools + "+", color: "text-foreground" },
            { label: "Live & Fungsional", value: totalLive, color: "text-green-600" },
            { label: "Kategori", value: categories.length, color: "text-primary" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`text-3xl sm:text-4xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 sm:mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) =>setSearch(e.target.value)}
              placeholder="Cari tool... (contoh: JSON, Base64, Compressor)"
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 sm:mb-12">
          <button
            onClick={() =>setActiveCategory("all")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === "all"
                ? "bg-primary text-white shadow-sm"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
          >Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat.id
                  ? "bg-primary text-white shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
            >
              <span className="flex items-center gap-1.5">
                {cat.icon} <span>{cat.label}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground flex flex-col items-center justify-center">
            <div className="text-4xl mb-4 bg-muted/50 p-4 rounded-full text-muted-foreground">
              <Search size={32} />
            </div>
            <p className="text-lg font-medium">Tidak ada tool yang cocok</p>
            <p className="text-sm mt-1">Coba kata kunci lain</p>
          </div>
        ) : (
          <div className="space-y-12 sm:space-y-16">
            {filtered.map((cat) => (
              <section key={cat.id}>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-6"
                >
                  <span className="text-primary bg-primary/10 p-2 rounded-xl flex items-center justify-center">{cat.icon}</span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">{cat.label}</h2>
                    <p className="text-xs text-muted-foreground">{cat.tools.length} tools</p>
                  </div>
                  <div className="flex-1 h-px bg-border ml-4" />
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {cat.tools.map((tool, i) => (
                    <ToolCard key={tool.id} tool={tool} index={i} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
