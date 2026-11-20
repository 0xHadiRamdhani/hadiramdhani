"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Layers, Code, Smartphone, LayoutTemplate, type LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Spotlight from "./Spotlight";

type Area = {
  title: string;
  status: string;
  percentage: number;
  description: string;
  techStack: string[];
  icon: LucideIcon;
};

const areas: Area[] = [
  { 
    title: "Mobile Development", 
    status: "ACTIVE", 
    percentage: 90,
    description: "Berfokus pada pembuatan aplikasi mobile yang interaktif dan berkinerja tinggi, memberikan pengalaman pengguna yang native secara efisien.",
    techStack: ["Flutter", "Dart", "React Native", "Kotlin", "Swift"],
    icon: Smartphone
  },
  { 
    title: "Frontend Development", 
    status: "BUILDING", 
    percentage: 85,
    description: "Membangun antarmuka pengguna web yang responsif, modern, cepat diakses dan dapat dinikmati di berbagai ukuran layar.",
    techStack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    icon: LayoutTemplate
  },
  { 
    title: "Backend Development", 
    status: "LEARNING", 
    percentage: 75,
    description: "Mengembangkan logika di sisi server, pembuatan struktur basis data yang solid, serta integrasi API yang aman dan scalable.",
    techStack: ["Node.js", "Express", "PostgreSQL", "Firebase", "Go"],
    icon: Code
  },
  { 
    title: "UI/UX Design", 
    status: "DESIGNING", 
    percentage: 80,
    description: "Mendesain pengalaman pengguna yang memuaskan dari awal hingga akhir, membuat wireframe, prototype, serta sistem desain yang konsisten.",
    techStack: ["Figma", "Adobe XD", "Prototyping", "Wireframing", "User Research"],
    icon: Layers
  },
];

export default function FocusAreas() {
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);

  return (
    <section className="relative w-full py-20 sm:py-28 bg-muted/30 border-y border-border overflow-hidden">
      <div className="absolute inset-0 grid-bg mask-fade-y pointer-events-none" />
      <div className="container relative">
        <SectionHeader
          index="05"
          eyebrow="Focus"
          title={
            <>
              Areas of <span className="text-primary-gradient">Focus</span>
            </>
          }
          subtitle="Bidang yang sedang saya dalami, beserta tingkat progresnya."
        />

        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 max-w-5xl mx-auto">
          {areas.map((area, index) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <Spotlight
                  onClick={() => setSelectedArea(area)}
                  className="group h-full bg-card border border-border rounded-3xl overflow-hidden p-6 sm:p-7 flex flex-col gap-5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-105 transition-all duration-300">
                      <Icon size={22} />
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-primary">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      {area.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">{area.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {area.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground/60">
                          {tech}
                        </span>
                      ))}
                      {area.techStack.length > 3 && (
                        <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                          +{area.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between font-mono text-xs mb-2">
                      <span className="text-muted-foreground">PROGRESS</span>
                      <span className="font-bold text-foreground">{area.percentage}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-border/70 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${area.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary-400"
                        style={{ boxShadow: "0 0 10px rgba(32, 160, 232, 0.45)" }}
                      />
                    </div>
                  </div>
                </Spotlight>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal / Popup Overlay */}
      <AnimatePresence>
        {selectedArea && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6"
            onClick={() => setSelectedArea(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white border border-border rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedArea(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 shrink-0 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <selectedArea.icon size={28} />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                      {selectedArea.title}
                    </h2>
                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs font-mono mt-1">
                      <div>
                        <span className="text-muted-foreground">STATUS: </span>
                        <span className="text-primary font-bold">{selectedArea.status}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">PROGRESS: </span>
                        <span className="text-foreground font-bold">{selectedArea.percentage}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-4 border-y border-border/50 text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {selectedArea.description}
                </div>

                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-3">Tech Stack / Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedArea.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-muted border border-border/50 text-foreground text-xs font-medium rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
