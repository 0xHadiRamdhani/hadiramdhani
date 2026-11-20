"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Terminal, Zap, Coffee, ArrowRight, X, CheckCircle2, type LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Spotlight from "./Spotlight";

const HOBBY_RGB: Record<string, string> = {
  Coding: "32,160,232",
  Hacking: "168,85,247",
  Electrical: "245,158,11",
  Coffee: "34,197,94",
};

type Hobby = {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
  color: string;
  bg: string;
  border: string;
  hoverBorder: string;
};

const hobbies: Hobby[] = [
  {
    icon: Code2,
    title: "Coding",
    description: "Building ideas through technology and code.",
    details: [
      "Membangun aplikasi web yang interaktif, modern dan responsif.",
      "Mempelajari arsitektur frontend dan performa aplikasi.",
      "Selalu antusias dalam mengikuti perkembangan bahasa pemrograman terbaru."
    ],
    color: "text-primary",
    bg: "bg-primary/5",
    border: "border-primary/20",
    hoverBorder: "hover:border-primary/50",
  },
  {
    icon: Terminal,
    title: "Hacking",
    description: "Exploring system security and ethical hacking.",
    details: [
      "Mempelajari konsep keamanan siber dan celah kerentanan web.",
      "Suka memecahkan masalah dalam tantangan Capture The Flag (CTF).",
      "Eksperimen dengan penetration testing secara etis."
    ],
    color: "text-purple-500",
    bg: "bg-purple-500/5",
    border: "border-purple-500/20",
    hoverBorder: "hover:border-purple-500/50",
  },
  {
    icon: Zap,
    title: "Electrical",
    description: "Exploring electronics, circuits, and hardware.",
    details: [
      "Merancang dan bereksperimen dengan sirkuit elektronik dasar.",
      "Membuat prototipe inovatif menggunakan mikrokontroler (Arduino/ESP32).",
      "Menggabungkan software dan hardware (IoT)."
    ],
    color: "text-amber-500",
    bg: "bg-amber-500/5",
    border: "border-amber-500/20",
    hoverBorder: "hover:border-amber-500/50",
  },
  {
    icon: Coffee,
    title: "Coffee",
    description: "Brewing the best code with a cup of coffee.",
    details: [
      "Mengeksplorasi berbagai teknik seduh kopi secara manual.",
      "Mencicipi karakteristik rasa biji kopi dari berbagai roastery lokal.",
      "Membantu menjaga fokus, energi dan produktivitas saat menulis kode."
    ],
    color: "text-green-500",
    bg: "bg-green-500/5",
    border: "border-green-500/20",
    hoverBorder: "hover:border-green-500/50",
  },
];

export default function Hobbies() {
  const [selectedHobby, setSelectedHobby] = useState<Hobby | null>(null);

  return (
    <section id="hobbies" className="relative w-full py-20 sm:py-28 bg-white overflow-hidden scroll-mt-16">
      <div className="absolute inset-0 dot-grid opacity-40 mask-fade-y pointer-events-none" />
      <div className="container relative">
        <SectionHeader
          index="04"
          eyebrow="Interests"
          title={
            <>
              Things I <span className="text-primary-gradient">Love</span>
            </>
          }
          subtitle="Beberapa hal yang membuat saya terus belajar dan bereksplorasi."
        />

        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {hobbies.map((hobby, index) => {
            const Icon = hobby.icon;
            return (
              <motion.div
                key={hobby.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="h-full"
              >
                <Spotlight
                  color={HOBBY_RGB[hobby.title]}
                  onClick={() => setSelectedHobby(hobby)}
                  className={`group h-full overflow-hidden p-6 sm:p-7 bg-card border ${hobby.border} ${hobby.hoverBorder} rounded-3xl hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer`}
                >
                  {/* Big faint index */}
                  <span className="pointer-events-none absolute -right-2 -top-4 font-mono text-8xl font-black text-foreground/[0.04] select-none">
                    0{index + 1}
                  </span>

                  <div className="relative flex flex-col gap-5">
                    <div className={`w-14 h-14 rounded-2xl ${hobby.bg} border ${hobby.border} flex items-center justify-center ${hobby.color} transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                      <Icon size={26} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1.5">{hobby.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{hobby.description}</p>
                    </div>
                  </div>
                  <div className={`relative inline-flex items-center gap-1.5 mt-6 text-sm font-semibold ${hobby.color}`}>
                    <span>Explore</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1.5" />
                  </div>
                </Spotlight>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal / Popup Overlay */}
      <AnimatePresence>
        {selectedHobby && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6"
            onClick={() => setSelectedHobby(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white border border-border rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedHobby(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-6">
                <div className={`w-16 h-16 rounded-2xl ${selectedHobby.bg} border ${selectedHobby.border} flex items-center justify-center ${selectedHobby.color}`}>
                  <selectedHobby.icon size={32} />
                </div>
                
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    {selectedHobby.title}
                  </h2>
                  <p className="text-muted-foreground font-medium text-base">
                    {selectedHobby.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <h4 className="font-semibold text-foreground text-lg mb-4">Hal yang saya lakukan:</h4>
                  <ul className="space-y-4">
                    {selectedHobby.details.map((detail, idx) => (
                      <li key={idx} className="flex gap-3 text-muted-foreground">
                        <CheckCircle2 size={20} className={`${selectedHobby.color} shrink-0 mt-0.5`} />
                        <span className="text-sm sm:text-base leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
