"use client";

import { motion } from "framer-motion";
import { Video, Camera, Map, Code2, ArrowRight } from "lucide-react";

const hobbies = [
  {
    icon: Code2,
    title: "Coding",
    description: "Building ideas through technology and code.",
    color: "text-primary",
    bg: "bg-primary/5",
    border: "border-primary/20",
    hoverBorder: "hover:border-primary/50",
  },
  {
    icon: Video,
    title: "Editing",
    description: "Exploring visual storytelling through photo and video editing.",
    color: "text-purple-500",
    bg: "bg-purple-500/5",
    border: "border-purple-500/20",
    hoverBorder: "hover:border-purple-500/50",
  },
  {
    icon: Camera,
    title: "Fotografi",
    description: "Capturing moments, details, and perspectives.",
    color: "text-amber-500",
    bg: "bg-amber-500/5",
    border: "border-amber-500/20",
    hoverBorder: "hover:border-amber-500/50",
  },
  {
    icon: Map,
    title: "Traveling",
    description: "Discovering new places and experiences.",
    color: "text-green-500",
    bg: "bg-green-500/5",
    border: "border-green-500/20",
    hoverBorder: "hover:border-green-500/50",
  },
];

export default function Hobbies() {
  return (
    <section id="hobbies" className="w-full py-16 sm:py-24 bg-white">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-3 text-center mb-10 sm:mb-16">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary-500">
            Interests
          </span>
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
                className={`group relative p-6 sm:p-8 bg-card border ${hobby.border} ${hobby.hoverBorder} rounded-xl hover:shadow-md transition-all duration-300 flex flex-col justify-between`}
              >
                <div className="flex flex-col gap-4">
                  <div className={`w-12 h-12 rounded-xl ${hobby.bg} border ${hobby.border} flex items-center justify-center ${hobby.color} transition-all group-hover:scale-110`}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{hobby.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{hobby.description}</p>
                  </div>
                </div>
                <div className={`inline-flex items-center gap-1.5 mt-5 text-sm font-medium ${hobby.color} transition-colors`}>
                  <span>Explore</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
