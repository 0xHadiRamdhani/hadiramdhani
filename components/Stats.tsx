"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { id: "01", value: "4", label: "Interests" },
  { id: "02", value: "3", label: "School Levels Completed" },
  { id: "03", value: "1", label: "Current University" },
  { id: "04", value: "∞", label: "Things To Learn" },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="w-full py-12 sm:py-16 border-y border-border bg-muted/30">
      <div className="container">
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y lg:divide-y-0 divide-border"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-start px-4 sm:px-8 py-5 sm:py-6 first:pl-0 [&:nth-child(2)]:pl-4 sm:[&:nth-child(2)]:pl-8"
            >
              <div className="text-xs font-bold text-primary tracking-widest mb-1">{stat.id}</div>
              <div className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">{stat.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
