"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import Spotlight from "@/components/Spotlight";
import { Tool } from "./data";

type Props = {
  tool: Tool;
  index: number;
  /** rgb triplet of the tool's category */
  accent: string;
};

export function ToolCard({ tool, index, accent }: Props) {
  const isLive = tool.status === "live";
  const isExternal = tool.status === "external";
  const isClickable = isLive || isExternal;

  const body = (
    <Spotlight
      color={accent}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-5 transition-all duration-300 ${
        isClickable
          ? "border-border hover:-translate-y-1 hover:shadow-xl"
          : "border-dashed border-border opacity-70"
      }`}
      style={
        isClickable
          ? ({ "--hover-border": `rgba(${accent},0.45)`, "--hover-shadow": `rgba(${accent},0.18)` } as React.CSSProperties)
          : undefined
      }
    >
      {/* Accent hairline on hover */}
      {isClickable && (
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: `linear-gradient(90deg, transparent, rgb(${accent}), transparent)` }}
        />
      )}

      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
          style={{ background: `rgba(${accent},0.12)`, color: `rgb(${accent})` }}
        >
          {tool.icon}
        </span>

        {isLive && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-green-600">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Live
          </span>
        )}
        {isExternal && (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-blue-600">
            <ArrowUpRight size={10} />
            Link
          </span>
        )}
        {!isClickable && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-600">
            <Clock size={10} />
            Soon
          </span>
        )}
      </div>

      <h3 className="mb-1.5 text-[15px] font-semibold leading-snug text-foreground">{tool.name}</h3>
      <p className="flex-1 text-xs leading-relaxed text-muted-foreground">{tool.description}</p>

      {isClickable && (
        <div
          className="mt-4 flex items-center gap-1.5 border-t border-border/60 pt-3 text-xs font-semibold"
          style={{ color: `rgb(${accent})` }}
        >
          {isLive ? "Buka tool" : "Buka layanan"}
          {isLive ? (
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          ) : (
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          )}
        </div>
      )}
    </Spotlight>
  );

  const motionProps = {
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.35, delay: (index % 8) * 0.04 },
    className: "h-full",
  } as const;

  if (isExternal && tool.externalUrl) {
    return (
      <motion.div {...motionProps}>
        <a href={tool.externalUrl} target="_blank" rel="noopener noreferrer" className="tool-card-link block h-full">
          {body}
        </a>
      </motion.div>
    );
  }

  if (isLive) {
    return (
      <motion.div {...motionProps}>
        <Link href={`/tools/${tool.id}`} className="tool-card-link block h-full">
          {body}
        </Link>
      </motion.div>
    );
  }

  return <motion.div {...motionProps}>{body}</motion.div>;
}
