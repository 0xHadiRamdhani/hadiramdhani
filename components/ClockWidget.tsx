"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, X, MapPin, Clock, ThermometerSun, Wind, Droplets } from "lucide-react";

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
      <div 
        className="bg-white border border-border rounded-2xl p-6 flex flex-col w-full max-w-xs shadow-sm cursor-pointer hover:shadow-md hover:border-primary/30 transition-all group"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex flex-col gap-1.5">
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary">Local Time</div>
          <div className="text-3xl font-bold tracking-tight text-foreground">
            {time.split(" ")[0]}{" "}
            <span className="text-lg font-medium text-muted-foreground">{time.split(" ")[1]}</span>
          </div>
          <div className="text-sm text-muted-foreground">{dateStr}</div>
          <div className="text-sm text-muted-foreground/70">Kota Bandung, Jawa Barat</div>
        </div>
        <div className="mt-5 pt-4 border-t border-border group-hover:border-primary/20 transition-colors">
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-purple-500 mb-2">Weather</div>
          <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Cloud size={22} className="text-muted-foreground group-hover:text-purple-500 transition-colors" strokeWidth={1.5} />
            <span>29.0°C</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-sm bg-white border border-border rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center justify-center text-center mt-2">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MapPin className="text-primary" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Kota Bandung</h2>
                  <p className="text-muted-foreground">Jawa Barat, Indonesia</p>
                </div>

                <div className="bg-muted/30 rounded-xl p-4 flex flex-col gap-4 border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white border border-border/50 shadow-sm">
                      <Clock size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-mono">ZONA WAKTU</div>
                      <div className="font-medium text-sm">WIB (UTC+7)</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white border border-border/50 shadow-sm">
                      <ThermometerSun size={18} className="text-amber-500" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-mono">CUACA SAAT INI</div>
                      <div className="font-medium text-sm">Cerah Berawan, 29.0°C</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white border border-border/50 shadow-sm">
                      <Droplets size={18} className="text-blue-500" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-mono">KELEMBAPAN</div>
                      <div className="font-medium text-sm">65%</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white border border-border/50 shadow-sm">
                      <Wind size={18} className="text-teal-500" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-mono">KECEPATAN ANGIN</div>
                      <div className="font-medium text-sm">12 km/h</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
