"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Briefcase, GraduationCap, Mail, Play, type LucideIcon } from "lucide-react";
import Spotlight from "./Spotlight";

type RoleData = {
  title: string;
  skills: string[];
};

const roles: Record<string, RoleData> = {
  Coding: {
    title: "Coding",
    skills: ["Software Engineering", "Mobile Development", "Dart / Flutter", "TypeScript"],
  },
  Hacking: {
    title: "Hacking",
    skills: ["Cybersecurity", "Penetration Testing", "Linux / Terminal", "Networking"],
  },
  Electrical: {
    title: "Electrical",
    skills: ["Hardware & Circuits", "Microcontrollers", "IoT Devices", "Soldering"],
  },
  Coffee: {
    title: "Coffee",
    skills: ["Caffeine Fuel", "Espresso", "Manual Brew", "Late Night Coding"],
  },
};

type Tile = {
  icon: LucideIcon;
  label: string;
  value: string;
  rgb: string;
  iconBg: string;
  iconColor: string;
  dot?: boolean;
  small?: boolean;
};

const tiles: Tile[] = [
  { icon: Radio, label: "Status", value: "Available to Collab", rgb: "163,230,53", iconBg: "bg-primary/10", iconColor: "text-lime-ink", dot: true },
  { icon: Briefcase, label: "Experience", value: "Siswa", rgb: "163,230,53", iconBg: "bg-primary/10", iconColor: "text-lime-ink" },
  { icon: GraduationCap, label: "Education", value: "Software Engineering", rgb: "163,230,53", iconBg: "bg-primary/10", iconColor: "text-lime-ink" },
  { icon: Mail, label: "Email", value: "hadsxdev@icloud.com", rgb: "163,230,53", iconBg: "bg-primary/10", iconColor: "text-lime-ink", small: true },
];

export default function InteractiveProfile() {
  const roleKeys = Object.keys(roles);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const currentRole = roles[roleKeys[currentRoleIndex]];

  return (
    <div className="flex flex-col gap-4 sm:gap-5 w-full">
      {/* Interactive Bio, styled as a terminal window */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-lg shadow-primary/5">
        <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
          <span className="ml-3 font-mono text-[11px] text-muted-foreground">~/hadi/bio.ts</span>
        </div>

        <div className="p-5 sm:p-6 flex flex-col gap-4">
          <div className="text-xl sm:text-2xl font-semibold text-foreground">
            I love{" "}
            <button
              onClick={() => setCurrentRoleIndex((prev) => (prev + 1) % roleKeys.length)}
              className="relative text-lime-ink font-bold cursor-pointer rounded-md px-2 py-0.5 -mx-1 bg-primary/10 hover:bg-primary/15 transition-colors"
            >
              {currentRole.title}
            </button>
            .
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            {"// klik kata biru untuk mengubah bio"}
          </p>

          <div className="flex flex-wrap gap-2 min-h-[84px] content-start">
            <AnimatePresence mode="popLayout">
              {currentRole.skills.map((skill, idx) => (
                <motion.div
                  key={`${currentRole.title}-${skill}`}
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-sm text-foreground/80"
                >
                  <Play className="text-lime-ink w-2.5 h-2.5 fill-primary shrink-0" />
                  {skill}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 2x2 Bento Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {tiles.map((tile, i) => {
          const Icon = tile.icon;
          return (
            <motion.div
              key={tile.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
            >
              <Spotlight tilt={5}
                color={tile.rgb}
                className="group h-full overflow-hidden bg-card border border-border rounded-2xl p-4 sm:p-5 flex flex-col gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl ${tile.iconBg} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  <Icon className={tile.iconColor} size={20} />
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] font-mono font-bold text-muted-foreground tracking-widest uppercase mb-1">
                    {tile.label}
                  </div>
                  <div className={`font-bold text-foreground flex items-center gap-1.5 ${tile.small ? "text-xs sm:text-sm break-all" : "text-sm"}`}>
                    {tile.dot && <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />}
                    {tile.value}
                  </div>
                </div>
              </Spotlight>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
