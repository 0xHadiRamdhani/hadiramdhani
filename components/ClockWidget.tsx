"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "./Modal";
import { Cloud, MapPin, Clock, ThermometerSun, Wind, Droplets } from "lucide-react";

export function ClockWidget({ compact = false }: { compact?: boolean }) {
  const [time, setTime] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(now)
      );
      setDateStr(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Jakarta",
          weekday: "short",
          month: "short",
          day: "2-digit",
          year: "numeric",
        }).format(now)
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-muted-foreground">
        <span className="hidden sm:inline">BANDUNG</span>
        <span className="text-primary font-bold">{time}</span>
        <span>WIB</span>
      </div>
    );
  }

  return (
    <>
      <div className="gradient-border w-full max-w-xs shadow-xl shadow-primary/10 hover:-translate-y-1 transition-transform duration-300">
        <div
          className="relative bg-white rounded-[calc(1.25rem-1px)] p-6 flex flex-col w-full cursor-pointer group overflow-hidden"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/15 blur-2xl pointer-events-none" />
          <div className="relative flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-primary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-primary animate-pulse-ring" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Local Time
            </div>
            <div className="text-4xl font-bold tracking-tight text-foreground tabular-nums">
              {time.split(" ")[0]}{" "}
              <span className="text-lg font-medium text-muted-foreground">{time.split(" ")[1]}</span>
            </div>
            <div className="text-sm text-muted-foreground">{dateStr}</div>
            <div className="text-sm text-muted-foreground/70">Kota Bandung, Jawa Barat</div>
          </div>
          <div className="relative mt-5 pt-4 border-t border-border group-hover:border-primary/20 transition-colors">
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-purple-500 mb-2">Weather</div>
            <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Cloud size={22} className="text-muted-foreground group-hover:text-purple-500 transition-colors" strokeWidth={1.5} />
              <span>29.0°C</span>
            </div>
          </div>
        </div>
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} size="sm" label="Waktu dan cuaca di Kota Bandung" closeTone="light">
        <div className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary-400 to-primary-600 px-6 pb-8 pt-12 text-white">
          <div className="absolute inset-0 dot-grid-dark opacity-60" />
          <div className="absolute -top-16 -left-10 h-44 w-44 rounded-full bg-white/25 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest backdrop-blur">
              <MapPin size={12} /> Kota Bandung
            </span>
            <div className="mt-4 text-5xl sm:text-6xl font-bold tracking-tight tabular-nums">
              {time.split(" ")[0]}
              <span className="ml-2 text-xl font-medium text-white/75">{time.split(" ")[1]}</span>
            </div>
            <p className="mt-1.5 text-sm text-white/80">{dateStr}</p>
            <p className="text-sm text-white/65">Jawa Barat, Indonesia</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 p-5 sm:p-6">
          {[
            { icon: Clock, label: "Zona Waktu", value: "WIB (UTC+7)", color: "text-primary", bg: "bg-primary/10" },
            { icon: ThermometerSun, label: "Cuaca", value: "Cerah Berawan, 29.0°C", color: "text-amber-500", bg: "bg-amber-500/10" },
            { icon: Droplets, label: "Kelembapan", value: "65%", color: "text-blue-500", bg: "bg-blue-500/10" },
            { icon: Wind, label: "Angin", value: "12 km/h", color: "text-teal-500", bg: "bg-teal-500/10" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="rounded-2xl border border-border bg-muted/30 p-3.5"
              >
                <span className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${item.bg} ${item.color}`}>
                  <Icon size={17} />
                </span>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.label}</div>
                <div className="mt-0.5 text-sm font-semibold leading-snug text-foreground">{item.value}</div>
              </motion.div>
            );
          })}
        </div>
      </Modal>
    </>
  );
}
