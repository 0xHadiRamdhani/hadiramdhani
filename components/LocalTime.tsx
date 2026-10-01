"use client";

import { motion } from "framer-motion";
import { ClockWidget } from "./ClockWidget";

export default function LocalTime() {
  return (
    <section className="w-full py-16 sm:py-24 bg-muted/20 border-b border-border">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 text-center lg:text-left"
          >
            
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Current Status
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
              Walaupun pengunjung berasal dari berbagai zona waktu, saya berada di Kota Bandung. Widget ini menunjukkan waktu lokal saya secara real-time.
            </p>
          </motion.div>

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
