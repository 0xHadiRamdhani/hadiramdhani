"use client";

import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { PopupHead, SpecList } from "./PopupParts";
import { Cloud, MapPin } from "lucide-react";

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
        <span className="text-primary-300 font-bold">{time}</span>
        <span>WIB</span>
      </div>
    );
  }

  return (
    <>
      <div className="gradient-border w-full max-w-xs shadow-xl shadow-primary/10 hover:-translate-y-1 transition-transform duration-300">
        <div
          className="relative bg-card rounded-[calc(1.25rem-1px)] p-6 flex flex-col w-full cursor-pointer group overflow-hidden"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/15 blur-2xl pointer-events-none" />
          <div className="relative flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-primary-300">
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
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary-300 mb-2">Weather</div>
            <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Cloud size={22} className="text-muted-foreground group-hover:text-primary-300 transition-colors" strokeWidth={1.5} />
              <span>29.0°C</span>
            </div>
          </div>
        </div>
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} size="md" label="Waktu dan cuaca di Kota Bandung">
        <div className="px-5 pb-8 pt-16 sm:px-9 sm:pb-9 sm:pt-20">
          <PopupHead
            kicker={
              <>
                <MapPin size={13} />
                Kota Bandung
              </>
            }
            title={
              <span className="tabular-nums">
                {time.split(" ")[0]}
                <span className="ml-3 text-2xl text-foreground/50">{time.split(" ")[1]}</span>
              </span>
            }
            subtitle={`${dateStr} · Jawa Barat, Indonesia`}
          />
          <div className="mt-8">
            <SpecList
              rows={[
                { label: "Zona waktu", value: "WIB (UTC+7)" },
                { label: "Cuaca", value: "Cerah berawan, 29.0°C" },
                { label: "Kelembapan", value: "65%" },
                { label: "Angin", value: "12 km/h" },
              ]}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
