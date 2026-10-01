"use client";

import { motion } from "framer-motion";

const areas = [
  { title: "Mobile Development", status: "ACTIVE", percentage: 90 },
  { title: "Frontend Development", status: "BUILDING", percentage: 85 },
  { title: "Backend Development", status: "LEARNING", percentage: 75 },
  { title: "UI/UX Design", status: "DESIGNING", percentage: 80 },
];

export default function FocusAreas() {
  return (
    <section className="w-full py-16 sm:py-24 bg-white border-b border-border">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-3 text-center mb-10 sm:mb-16">
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Areas of <span className="text-primary-gradient">Focus</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 max-w-3xl mx-auto">
          {areas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative bg-card border border-border rounded-xl overflow-hidden p-5 sm:p-6 flex items-center justify-between group hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-foreground text-sm sm:text-base">{area.title}</h3>
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <span className="text-muted-foreground">STATUS:</span>
                  <span className="text-primary font-bold">{area.status}</span>
                </div>
              </div>
              <div className="text-lg sm:text-2xl font-mono font-bold text-muted-foreground/60 ml-4 shrink-0">
                [{area.percentage}%]
              </div>

              {/* Progress bar bottom */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-border">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${area.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                  className="h-full bg-primary"
                  style={{ boxShadow: "0 0 8px rgba(32, 160, 232, 0.5)" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
