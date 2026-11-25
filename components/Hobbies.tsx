"use client";

import { motion } from "framer-motion";
import { Code2, Terminal, Zap, Coffee, ArrowRight, type LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Spotlight from "./Spotlight";
import { Modal, useModalItem } from "./Modal";
import { NumberedList, PopupHead, PopupLabel } from "./PopupParts";

const HOBBY_RGB: Record<string, string> = {
  Coding: "207,140,118",
  Hacking: "207,140,118",
  Electrical: "207,140,118",
  Coffee: "207,140,118",
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
    color: "text-primary-300",
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
    color: "text-primary-300",
    bg: "bg-primary/5",
    border: "border-primary/20",
    hoverBorder: "hover:border-primary/50",
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
    color: "text-primary-300",
    bg: "bg-primary/5",
    border: "border-primary/20",
    hoverBorder: "hover:border-primary/50",
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
    color: "text-primary-300",
    bg: "bg-primary/5",
    border: "border-primary/20",
    hoverBorder: "hover:border-primary/50",
  },
];

export default function Hobbies() {
  const modal = useModalItem<Hobby>();
  const selectedHobby = modal.item;

  return (
    <section id="hobbies" className="relative w-full py-20 sm:py-28 bg-card overflow-hidden scroll-mt-16">
      <div className="absolute inset-0 dot-grid opacity-40 mask-fade-y pointer-events-none" />
      <div className="container relative">
        <SectionHeader
          title={
            <>
              Things I <span className="text-primary-gradient">Love</span>
            </>
          }
          subtitle="Beberapa hal yang membuat saya terus belajar dan bereksplorasi."
        />

        <div className="grid gap-3 sm:gap-5 grid-cols-2 lg:grid-cols-4">
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
                <Spotlight tilt={5} ticks
                  color={HOBBY_RGB[hobby.title]}
                  onClick={() => modal.show(hobby)}
                  className={`group h-full overflow-hidden p-4 sm:p-7 bg-card border ${hobby.border} ${hobby.hoverBorder} rounded-2xl sm:rounded-3xl hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer`}
                >
                  {/* Big faint index */}
                  <span className="pointer-events-none absolute -right-2 -top-4 font-mono text-6xl sm:text-8xl font-black text-foreground/[0.04] select-none">
                    0{index + 1}
                  </span>

                  <div className="relative flex flex-col gap-3 sm:gap-5">
                    <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${hobby.bg} border ${hobby.border} flex items-center justify-center ${hobby.color} transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-xl font-bold text-foreground mb-1">{hobby.title}</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{hobby.description}</p>
                    </div>
                  </div>
                  <div className={`relative inline-flex items-center gap-1.5 mt-4 sm:mt-6 text-xs sm:text-sm font-semibold ${hobby.color}`}>
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
          size="lg"
          accent={HOBBY_RGB[selectedHobby.title]}
          label={selectedHobby.title}
        >
          <div className="relative overflow-hidden px-5 pb-8 pt-16 sm:px-10 sm:pb-10 sm:pt-20">
            {/* oversized outline icon as a backdrop */}
            <selectedHobby.icon
              aria-hidden="true"
              strokeWidth={0.6}
              className="pointer-events-none absolute -right-6 top-10 h-56 w-56 text-primary-300/20 sm:h-72 sm:w-72"
            />
            <div className="relative">
              <PopupHead
                kicker={
                  <>
                    <selectedHobby.icon size={13} />
                    Minat
                  </>
                }
                title={selectedHobby.title}
                subtitle={selectedHobby.description}
              />
              <div className="mt-9">
                <PopupLabel>Hal yang saya lakukan</PopupLabel>
                <NumberedList items={selectedHobby.details} delay={0.3} />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
