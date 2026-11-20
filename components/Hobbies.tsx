"use client";

import { motion } from "framer-motion";
import { Code2, Terminal, Zap, Coffee, ArrowRight, CheckCircle2, type LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Spotlight from "./Spotlight";
import { Modal, useModalItem } from "./Modal";

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
  const modal = useModalItem<Hobby>();
  const selectedHobby = modal.item;

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
                  onClick={() => modal.show(hobby)}
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

      {/* Detail modal */}
      {selectedHobby && (
        <Modal
          open={modal.open}
          onClose={modal.hide}
          accent={HOBBY_RGB[selectedHobby.title]}
          label={selectedHobby.title}
        >
          <div className="relative overflow-hidden px-5 pb-6 pt-10 sm:px-8 sm:pb-8 sm:pt-12">
            <div
              className="pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full blur-3xl opacity-40"
              style={{ background: `rgb(${HOBBY_RGB[selectedHobby.title]})` }}
            />
            <div className="pointer-events-none absolute inset-0 dot-grid opacity-40 mask-fade-y" />

            <div className="relative">
              <motion.div
                initial={{ scale: 0.6, rotate: -12, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 14, stiffness: 220, delay: 0.1 }}
                className={`flex h-20 w-20 items-center justify-center rounded-3xl border ${selectedHobby.border} ${selectedHobby.bg} ${selectedHobby.color} shadow-lg`}
              >
                <selectedHobby.icon size={36} />
              </motion.div>

              <h2 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">{selectedHobby.title}</h2>
              <p className="mt-1.5 text-sm sm:text-base text-muted-foreground">{selectedHobby.description}</p>

              <h3 className="mt-7 mb-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Hal yang saya lakukan
              </h3>
              <ul className="space-y-2.5">
                {selectedHobby.details.map((detail, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + idx * 0.08 }}
                    className="flex gap-3.5 rounded-2xl border border-border bg-white/80 p-3.5 sm:p-4 backdrop-blur"
                  >
                    <CheckCircle2 size={20} className={`${selectedHobby.color} mt-0.5 shrink-0`} />
                    <span className="text-sm sm:text-[15px] leading-relaxed text-foreground/75">{detail}</span>
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
