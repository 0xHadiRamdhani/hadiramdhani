"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
};

export default function SectionHeader({
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
      initial={{ opacity: 0, y: 36, rotateX: -32, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 900, transformOrigin: "50% 100%" }}
      className={`relative flex flex-col gap-4 mb-10 sm:mb-14 ${center ? "items-center text-center" : "items-start text-left"} ${className}`}
    >
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
