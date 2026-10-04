"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Zap, Clock } from "lucide-react";
import { Tool, ToolStatus } from "./data";

const statusConfig: Record<ToolStatus, { label: string; className: string; icon: React.ReactNode }> = {
  live: {
    label: "Live",
    className: "bg-green-500/15 text-green-600 border-green-500/20",
    icon: <Zap size={10} />,
  },
  "coming-soon": {
    label: "Soon",
    className: "bg-amber-500/15 text-amber-600 border-amber-500/20",
    icon: <Clock size={10} />,
  },
  external: {
    label: "External",
    className: "bg-blue-500/15 text-blue-600 border-blue-500/20",
    icon: <ExternalLink size={10} />,
  },
};

type Props = {
  tool: Tool;
  index: number;
};

export function ToolCard({ tool, index }: Props) {
  const status = statusConfig[tool.status];
  const isClickable = tool.status === "live" || tool.status === "external";

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: (index % 10) * 0.04 }}
      className={`relative group h-full flex flex-col bg-card border border-border rounded-xl p-4 transition-all duration-300 overflow-hidden ${
        isClickable
          ? "cursor-pointer hover:shadow-md hover:border-primary/30"
          : "opacity-70 cursor-default"
      }`}
    >
      {/* Swipe hover bg */}
      {isClickable && (
        <div className="absolute inset-0 bg-primary/[0.025] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-none" />
      )}

      <div className="relative z-10 flex items-start justify-between gap-2 mb-3">
        <span className="text-primary bg-primary/10 p-1.5 rounded-lg flex items-center justify-center">
          {tool.icon}
        </span>
        <span
          className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${status.className}`}
        >
          {status.icon}
          {status.label}
        </span>
      </div>

      <div className="relative z-10 flex-1">
        <h3 className="font-semibold text-foreground text-sm leading-snug mb-1 group-hover:text-primary transition-colors">
          {tool.name}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
      </div>

      {tool.status === "external" && (
        <div className="relative z-10 mt-3 pt-3 border-t border-border/50 flex items-center gap-1 text-[11px] text-blue-500 font-medium">
          <ExternalLink size={11} />Buka layanan
        </div>
      )}
      {tool.status === "live" && (
        <div className="relative z-10 mt-3 pt-3 border-t border-border/50 flex items-center gap-1 text-[11px] text-green-600 font-medium">
          <Zap size={11} />Buka tool
        </div>
      )}
    </motion.div>
  );

  if (tool.status === "external" && tool.externalUrl) {
    return (
      <a href={tool.externalUrl} target="_blank" rel="noopener noreferrer" className="h-full">
        {cardContent}
      </a>
    );
  }

  if (tool.status === "live") {
    return (
      <Link href={`/tools/${tool.id}`} className="h-full">
        {cardContent}
      </Link>
    );
  }

  return <div className="h-full">{cardContent}</div>;
}
