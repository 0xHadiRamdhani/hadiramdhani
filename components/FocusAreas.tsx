"use client";

import { motion } from "framer-motion";
import { Layers, Code, Smartphone, LayoutTemplate, type LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Spotlight from "./Spotlight";
import { Modal, useModalItem } from "./Modal";
import { PopupHead, PopupLabel } from "./PopupParts";
import MobileCarousel from "./MobileCarousel";

const RING_R = 32;
const RING_C = 2 * Math.PI * RING_R;

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
  const modal = useModalItem<Area>();
  const selectedArea = modal.item;

  return (
    <section className="relative w-full py-20 sm:py-28 bg-muted/30 border-y border-border overflow-hidden">
      <div className="absolute inset-0 grid-bg mask-fade-y pointer-events-none" />
      <div className="container relative">
        <SectionHeader
          title={
            <>
              Areas of <span className="text-primary-gradient">Focus</span>
            </>
          }
          subtitle="Bidang yang sedang saya dalami, beserta tingkat progresnya."
        />

        <MobileCarousel desktopClassName="sm:grid sm:grid-cols-2 sm:max-w-5xl sm:mx-auto">
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
                <Spotlight tilt={5} ticks
                  onClick={() => modal.show(area)}
                  className="group h-full bg-card border border-border rounded-3xl overflow-hidden p-6 sm:p-7 flex flex-col gap-5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary-300 group-hover:bg-primary group-hover:text-white group-hover:scale-105 transition-all duration-300">
                      <Icon size={22} />
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-primary-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      {area.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-foreground text-lg group-hover:text-primary-300 transition-colors">{area.title}</h3>
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
                        style={{ boxShadow: "0 0 10px rgba(163, 230, 53, 0.55)" }}
                      />
                    </div>
                  </div>
                </Spotlight>
              </motion.div>
            );
          })}
        </MobileCarousel>
      </div>

      {/* Detail modal */}
      {selectedArea && (
        <Modal open={modal.open} onClose={modal.hide} size="lg" label={selectedArea.title}>
          <div className="relative px-5 pb-8 pt-16 sm:px-10 sm:pb-10 sm:pt-20">
            <PopupHead
              kicker={
                <>
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-300" />
                  {selectedArea.status}
                </>
              }
              title={selectedArea.title}
            />

            {/* Progress */}
            <div className="mt-8 flex items-end gap-6 border-t border-border pt-6">
              <div className="relative h-28 w-28 shrink-0 sm:h-32 sm:w-32">
                <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
                  <circle cx="40" cy="40" r={RING_R} fill="none" strokeWidth="1.5" className="stroke-border" />
                  <motion.circle
                    cx="40"
                    cy="40"
                    r={RING_R}
                    fill="none"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    stroke="url(#ringGrad)"
                    strokeDasharray={RING_C}
                    initial={{ strokeDashoffset: RING_C }}
                    animate={{ strokeDashoffset: RING_C * (1 - selectedArea.percentage / 100) }}
                    transition={{ duration: 1.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <defs>
                    <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ad4a37" />
                      <stop offset="100%" stopColor="#dfb5ad" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-light tabular-nums tracking-tight text-foreground">
                    {selectedArea.percentage}
                    <span className="text-base text-foreground/50">%</span>
                  </span>
                </div>
              </div>
              <p className="max-w-sm pb-1 text-[15px] leading-relaxed text-foreground/70">{selectedArea.description}</p>
            </div>

            <div className="mt-8">
              <PopupLabel>Tech stack / tools</PopupLabel>
              <ul className="flex flex-wrap gap-2">
                {selectedArea.techStack.map((tech, i) => (
                  <motion.li
                    key={tech}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                    className="rounded-sm border border-border px-3 py-1.5 text-sm text-foreground/85"
                  >
                    {tech}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
