"use client";

import { motion } from "framer-motion";
import { BookOpen, Briefcase, GraduationCap, MapPin } from "lucide-react";
import InteractiveProfile from "./InteractiveProfile";
import SectionHeader from "./SectionHeader";
import Spotlight from "./Spotlight";

const facts = [
  { icon: BookOpen, label: "School", value: "SEKOLAH PROFESI INSINYUR" },
  { icon: GraduationCap, label: "Major", value: "Software Engineering" },
  { icon: MapPin, label: "Location", value: "Kota Bandung, Jawa Barat" },
  { icon: Briefcase, label: "Status", value: "Open to Collaborate" },
];

export default function About() {
  return (
    <section id="about" className="relative w-full py-20 sm:py-28 bg-card overflow-hidden scroll-mt-16">
      <div className="absolute inset-0 dot-grid opacity-40 mask-fade-y pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left text */}
          <div className="flex flex-col lg:sticky lg:top-28">
            <SectionHeader
              align="left"
              className="!mb-6"
              title={
                <>
                  A student who loves turning ideas into something{" "}
                  <span className="text-primary-gradient">real.</span>
                </>
              }
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8 max-w-xl"
            >
              Saya adalah Hadi Ramdhani, lulusan Software Engineering dari SMK Bani Ma&apos;sum yang kini menempuh Sekolah Profesi Insinyur. Saya tertarik dengan dunia teknologi, coding, hacking, electrical, dan coffee.
            </motion.p>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {facts.map((fact, i) => {
                const Icon = fact.icon;
                return (
                  <motion.div
                    key={fact.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                  >
                    <Spotlight tilt={5} className="flex flex-col items-start gap-2.5 sm:flex-row sm:items-center sm:gap-3.5 rounded-xl bg-card border border-border px-3.5 py-3.5 sm:px-4 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 h-full">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary-300">
                        <Icon size={18} />
                      </span>
                      <span className="flex flex-col min-w-0">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{fact.label}</span>
                        <span className="text-[13px] sm:text-sm font-semibold leading-snug text-foreground break-words">{fact.value}</span>
                      </span>
                    </Spotlight>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right interactive profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <InteractiveProfile />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
