"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { Heart, Hourglass, Rocket, Sparkles, type LucideIcon } from "lucide-react";

type Stat = {
  id: string;
  value: number | "∞";
  label: string;
  icon: LucideIcon;
};

const stats: Stat[] = [
  { id: "01", value: 4, label: "Interests", icon: Heart },
  { id: "02", value: 3, label: "School Levels Completed", icon: Hourglass },
  { id: "03", value: 6, label: "Featured Projects", icon: Rocket },
  { id: "04", value: "∞", label: "Things To Learn", icon: Sparkles },
];

const stack = [
  "Flutter",
  "Dart",
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Kotlin",
  "Swift",
  "Node.js",
  "PostgreSQL",
  "Firebase",
  "Go",
  "Figma",
  "Linux",
  "Arduino",
  "ESP32",
];

function CountUp({ to, active }: { to: number; active: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    const controls = animate(0, to, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [active, to]);

  return <>{n}</>;
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative w-full border-y border-border bg-muted/30 overflow-hidden">
      {/* Tech marquee */}
      <div className="border-b border-border/70 bg-white/60 py-4 mask-fade-x overflow-hidden" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-3 pr-3">
          {[...stack, ...stack].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs sm:text-sm font-medium text-foreground/70 whitespace-nowrap"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="container py-12 sm:py-16">
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-[11px] font-bold tracking-widest text-primary">{stat.id}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon size={15} />
                  </span>
                </div>
                <div className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-none">
                  {stat.value === "∞" ? "∞" : <CountUp to={stat.value} active={isInView} />}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-2.5">{stat.label}</div>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary to-secondary-400 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
