"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Layers, Code, Smartphone, LayoutTemplate } from "lucide-react";

type Area = {
  title: string;
  status: string;
  percentage: number;
  description: string;
  techStack: string[];
  icon: any;
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
    <section className="w-full py-16 sm:py-24 bg-white border-b border-border relative">
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
              onClick={() => setSelectedArea(area)}
              className="relative bg-card border border-border rounded-xl overflow-hidden p-5 sm:p-6 flex items-center justify-between group hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer"
            >
              {/* Hover swipe effect */}
              <div className="absolute inset-0 bg-foreground/[0.02] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />
              
              <div className="relative z-10 flex flex-col gap-1">
                <h3 className="font-semibold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors">{area.title}</h3>
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <span className="text-muted-foreground">STATUS:</span>
                  <span className="text-primary font-bold">{area.status}</span>
                </div>
              </div>
              <div className="relative z-10 text-lg sm:text-2xl font-mono font-bold text-muted-foreground/60 ml-4 shrink-0">
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
