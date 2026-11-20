"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionHeaderProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
};

export default function SectionHeader({
  index,
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className = "",
}: SectionHeaderProps) {
  const center = align === "center";
  const dark = tone === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`flex flex-col gap-4 mb-10 sm:mb-14 ${center ? "items-center text-center" : "items-start text-left"} ${className}`}
    >
      <span className={`eyebrow ${dark ? "eyebrow-dark" : ""}`}>
        <span className="eyebrow-index">{index}</span>
        <span className="eyebrow-line" />
        {eyebrow}
      </span>
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] ${dark ? "text-white" : "text-foreground"} ${center ? "max-w-3xl" : "max-w-2xl"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`max-w-xl text-sm sm:text-base leading-relaxed ${dark ? "text-white/60" : "text-muted-foreground"}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
