"use client";

import { useEffect, useState } from "react";
import { Cloud } from "lucide-react";

export function ClockWidget({ compact = false }: { compact?: boolean }) {
  const [time, setTime] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");

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
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      </div>
    );
  }

  return (
    <div className="bg-white border border-border rounded-2xl p-6 flex flex-col w-full max-w-xs shadow-sm">
      <div className="flex flex-col gap-1.5">
        <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary">Local Time</div>
        <div className="text-3xl font-bold tracking-tight text-foreground">
          {time.split(" ")[0]}{" "}
          <span className="text-lg font-medium text-muted-foreground">{time.split(" ")[1]}</span>
        </div>
        <div className="text-sm text-muted-foreground">{dateStr}</div>
        <div className="text-sm text-muted-foreground/70">Kota Bandung, Jawa Barat</div>
      </div>
      <div className="mt-5 pt-4 border-t border-border">
        <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-purple-500 mb-2">Weather</div>
        <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Cloud size={22} className="text-muted-foreground" strokeWidth={1.5} />
          <span>29.0°C</span>
        </div>
      </div>
    </div>
  );
}
