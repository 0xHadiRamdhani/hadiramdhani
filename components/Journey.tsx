"use client";

import { motion } from "framer-motion";
import { GraduationCap, School, BookOpen, HardHat } from "lucide-react";
import SectionHeader from "./SectionHeader";

const journeys = [
  { id: "01", title: "SDN Cipageran Mandiri 1", subtitle: "Elementary School", status: "Completed", active: false, icon: BookOpen },
  { id: "02", title: "MTs Bani Ma'sum", subtitle: "Junior High School", status: "Completed", active: false, icon: School },
  { id: "03", title: "SMK Bani Ma'sum", subtitle: "Software Engineering", status: "Completed", active: false, icon: GraduationCap },
  { id: "04", title: "SEKOLAH PROFESI INSINYUR", subtitle: "Engineering Profession", status: "Currently Studying", active: true, icon: HardHat },
];

export default function Journey() {
  return (
    <section id="journey" className="relative w-full py-20 sm:py-28 bg-muted/30 border-y border-border overflow-hidden scroll-mt-16">
      <div className="absolute inset-0 grid-bg mask-fade-y pointer-events-none" />
      <div className="container relative">
        <SectionHeader
          title={
            <>
              My <span className="text-primary-gradient">Journey</span>
            </>
          }
          subtitle="Jejak pendidikan Hadi Ramdhani."
        />

        <div className="relative max-w-6xl mx-auto">
          {/* Animated connector (desktop) */}
          <div className="hidden md:block absolute top-[2.25rem] left-[12.5%] right-[12.5%] h-px bg-border overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="h-full origin-left bg-gradient-to-r from-primary/30 via-primary to-secondary-400"
            />
          </div>
          {/* Vertical connector (mobile) */}
          <div className="md:hidden absolute top-8 bottom-8 left-[1.75rem] w-px bg-gradient-to-b from-primary/20 via-primary/60 to-primary" />

          <div className="flex flex-col md:flex-row gap-6 md:gap-6 relative z-10">
            {journeys.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex md:flex-col items-start md:items-center gap-4 md:gap-6 flex-1 group"
                >
                  {/* Node */}
                  <div
                    className={`relative shrink-0 w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] rounded-2xl flex items-center justify-center border-2 transition-all duration-300 group-hover:-translate-y-1 ${
                      item.active
                        ? "bg-primary border-primary text-bg-dark shadow-xl shadow-primary/30"
                        : "bg-white border-border text-muted-foreground group-hover:border-primary/50 group-hover:text-lime-ink group-hover:shadow-lg group-hover:shadow-primary/10"
                    }`}
                  >
                    <Icon size={22} />
                    {item.active && <span className="absolute inset-0 rounded-2xl bg-primary/30 animate-pulse-ring" />}
                  </div>

                  {/* Card */}
                  <div
                    className={`flex-1 w-full flex flex-col gap-1.5 md:items-center md:text-center rounded-2xl border p-4 sm:p-5 transition-all duration-300 group-hover:-translate-y-1 ${
                      item.active
                        ? "bg-white border-primary/30 shadow-lg shadow-primary/10"
                        : "bg-white/70 border-border group-hover:border-primary/30 group-hover:shadow-md"
                    }`}
                  >
                    <span className="font-mono text-[11px] font-bold tracking-widest text-lime-ink">STEP {item.id}</span>
                    <h3 className={`font-bold text-base sm:text-lg leading-tight ${item.active ? "text-lime-ink" : "text-foreground"}`}>
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">{item.subtitle}</p>
                    <span
                      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium mt-1.5 ${
                        item.active
                          ? "bg-primary/10 text-lime-ink border border-primary/20"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      {item.active && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                      {item.status}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
