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
      tilt={isClickable ? 7 : 0}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-3.5 transition-all sm:p-5 duration-300 ${
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

      <div className="mb-3 flex items-start justify-between gap-2 sm:mb-4 sm:gap-3">
        <span
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11"
          style={{ background: `rgba(${accent},0.12)`, color: "var(--color-primary-300)" }}
        >
          {isClickable && (
            <span
              className="ping-soft absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
              style={{ boxShadow: `0 0 0 1px rgba(${accent},0.5)` }}
            />
          )}
          <span className="icon-wiggle relative">{tool.icon}</span>
        </span>

        {isLive && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-primary-300">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            Live
          </span>
        )}
        {isExternal && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-primary-300">
            <ArrowUpRight size={10} />
            Link
          </span>
        )}
        {!isClickable && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-primary-300">
            <Clock size={10} />
            Soon
          </span>
        )}
      </div>

      <h3 className="mb-1 text-[13px] font-semibold leading-snug text-foreground sm:mb-1.5 sm:text-[15px]">{tool.name}</h3>
      <p className="line-clamp-2 flex-1 text-[11px] leading-relaxed text-muted-foreground sm:text-xs">{tool.description}</p>

      {isClickable && (
        <div
          className="mt-3 flex items-center gap-1.5 border-t border-border/60 pt-2.5 text-[11px] font-semibold sm:mt-4 sm:pt-3 sm:text-xs"
          style={{ color: "var(--color-primary-300)" }}
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
    initial: { opacity: 0, y: 26, scale: 0.97 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.07 },
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
