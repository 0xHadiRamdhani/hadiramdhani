"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Terminal, Zap, Coffee, ArrowRight, X, CheckCircle2 } from "lucide-react";

type Hobby = {
  icon: any;
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
    <section id="hobbies" className="w-full py-16 sm:py-24 bg-white relative">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-3 text-center mb-10 sm:mb-16">
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Things I <span className="text-primary-gradient">Love</span>
          </h2>
          <p className="max-w-xl text-muted-foreground text-sm sm:text-base">
            Beberapa hal yang membuat saya terus belajar dan bereksplorasi.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {hobbies.map((hobby, index) => {
            const Icon = hobby.icon;
            return (
              <motion.div
                key={hobby.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => setSelectedHobby(hobby)}
                className={`group overflow-hidden relative p-6 sm:p-8 bg-card border ${hobby.border} ${hobby.hoverBorder} rounded-xl hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer`}
              >
                {/* Hover swipe effect */}
                <div className="absolute inset-0 bg-foreground/[0.02] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                
                <div className="relative z-10 flex flex-col gap-4">
                  <div className={`w-12 h-12 rounded-xl ${hobby.bg} border ${hobby.border} flex items-center justify-center ${hobby.color} transition-all group-hover:scale-110`}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{hobby.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{hobby.description}</p>
                  </div>
                </div>
                <div className={`relative z-10 inline-flex items-center gap-1.5 mt-5 text-sm font-medium ${hobby.color} transition-colors`}>
                  <span>Explore</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
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
