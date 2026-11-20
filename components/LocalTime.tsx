"use client";

import { motion } from "framer-motion";
import { ClockWidget } from "./ClockWidget";
import SectionHeader from "./SectionHeader";

export default function LocalTime() {
  return (
    <section className="relative w-full py-20 sm:py-28 bg-white border-b border-border overflow-hidden">
      <div className="absolute inset-0 aurora opacity-80 pointer-events-none" />
      <div className="container relative">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 max-w-4xl mx-auto">
          <div className="flex-1 flex flex-col items-center lg:items-start">
            <SectionHeader
              align="left"
              className="!mb-5 items-center text-center lg:items-start lg:text-left"
              title="Current Status"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md text-center lg:text-left"
            >
              Walaupun pengunjung berasal dari berbagai zona waktu, saya berada di Kota Bandung. Widget ini menunjukkan waktu lokal saya secara real-time.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="w-full max-w-xs mx-auto lg:mx-0 lg:shrink-0"
          >
            <ClockWidget />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
