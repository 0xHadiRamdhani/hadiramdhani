"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Briefcase, GraduationCap, Mail, Play } from "lucide-react";

type RoleData = {
  title: string;
  skills: string[];
};

const roles: Record<string, RoleData> = {
  "Coding": {
    title: "Coding",
    skills: ["Software Engineering", "Mobile Development", "Dart / Flutter", "TypeScript"],
  },
  "Hacking": {
    title: "Hacking",
    skills: ["Cybersecurity", "Penetration Testing", "Linux / Terminal", "Networking"],
  },
  "Electrical": {
    title: "Electrical",
    skills: ["Hardware & Circuits", "Microcontrollers", "IoT Devices", "Soldering"],
  },
  "Coffee": {
    title: "Coffee",
    skills: ["Caffeine Fuel", "Espresso", "Manual Brew", "Late Night Coding"],
  },
};

export default function InteractiveProfile() {
  const roleKeys = Object.keys(roles);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const currentRole = roles[roleKeys[currentRoleIndex]];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Interactive Bio */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-xl border border-border bg-card p-5 sm:p-6 flex flex-col gap-4 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-foreground/[0.02] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />
        
        <div className="relative z-10 text-lg sm:text-xl font-semibold text-foreground">
          I love{" "}
          <button
            onClick={() => setCurrentRoleIndex((prev) => (prev + 1) % roleKeys.length)}
            className="text-primary font-bold underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all cursor-pointer relative z-20"
          >
            {currentRole.title}
          </button>
          .
        </div>
        <p className="relative z-10 text-xs text-muted-foreground italic">
          (Klik kata biru untuk mengubah bio)
        </p>

        <div className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-3 min-h-[80px]">
          <AnimatePresence mode="popLayout">
            {currentRole.skills.map((skill, idx) => (
              <motion.div
                key={`${currentRole.title}-${skill}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2, delay: idx * 0.04 }}
                className="flex items-center gap-2 text-sm text-foreground/80"
              >
                <Play className="text-primary w-3 h-3 fill-primary shrink-0" />
                {skill}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 2x2 Bento Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Status */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="group relative overflow-hidden bg-card border border-border rounded-xl p-4 sm:p-5 flex flex-col gap-4 hover:border-green-500/30 hover:shadow-sm transition-all"
        >
          <div className="absolute inset-0 bg-green-500/[0.03] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />
          <div className="relative z-10 w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <Radio className="text-green-600" size={20} />
          </div>
          <div className="relative z-10">
            <div className="text-[10px] sm:text-xs font-bold text-muted-foreground tracking-wider uppercase mb-1">STATUS</div>
            <div className="font-bold text-foreground flex items-center gap-1.5 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
              Available to Collab
            </div>
          </div>
        </motion.div>

        {/* Experience */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="group relative overflow-hidden bg-card border border-border rounded-xl p-4 sm:p-5 flex flex-col gap-4 hover:border-primary/30 hover:shadow-sm transition-all"
        >
          <div className="absolute inset-0 bg-primary/[0.03] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />
          <div className="relative z-10 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <Briefcase className="text-primary" size={20} />
          </div>
          <div className="relative z-10">
            <div className="text-[10px] sm:text-xs font-bold text-muted-foreground tracking-wider uppercase mb-1">EXPERIENCE</div>
            <div className="font-bold text-foreground text-sm">Siswa</div>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="group relative overflow-hidden bg-card border border-border rounded-xl p-4 sm:p-5 flex flex-col gap-4 hover:border-purple-500/30 hover:shadow-sm transition-all"
        >
          <div className="absolute inset-0 bg-purple-500/[0.03] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />
          <div className="relative z-10 w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <GraduationCap className="text-purple-500" size={20} />
          </div>
          <div className="relative z-10">
            <div className="text-[10px] sm:text-xs font-bold text-muted-foreground tracking-wider uppercase mb-1">EDUCATION</div>
            <div className="font-bold text-foreground text-sm">Software Engineering</div>
          </div>
        </motion.div>

        {/* Email */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="group relative overflow-hidden bg-card border border-border rounded-xl p-4 sm:p-5 flex flex-col gap-4 hover:border-red-500/30 hover:shadow-sm transition-all"
        >
          <div className="absolute inset-0 bg-red-500/[0.03] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />
          <div className="relative z-10 w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <Mail className="text-red-500" size={20} />
          </div>
          <div className="relative z-10">
            <div className="text-[10px] sm:text-xs font-bold text-muted-foreground tracking-wider uppercase mb-1">EMAIL</div>
            <div className="font-bold text-foreground text-xs sm:text-sm break-all">hadsxdev@icloud.com</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
