"use client";

import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { ClockWidget } from "./ClockWidget";

/** Framed portrait that opens the biodata popup. */
export default function HeroVisual({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Lihat biodata lengkap"
      className="group ticks glass-panel relative block w-full max-w-[300px] rounded-sm p-2 text-left transition-colors hover:border-primary-300/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-300 sm:max-w-[320px]"
    >
      <span className="relative block aspect-[4/5] overflow-hidden rounded-[2px]">
        <Image
          src="/avatar.jpg"
          alt="Hadi Ramdhani"
          fill
          priority
          sizes="320px"
          className="object-cover object-top grayscale-[0.35] contrast-105 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-[#110100] via-[#4f0a01]/20 to-transparent" />
        <span className="absolute inset-0 bg-[#ad4a37]/15 mix-blend-color" />
        <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
          <span>
            <span className="block text-lg font-medium leading-tight tracking-tight text-foreground">Hadi Ramdhani</span>
            <span className="mt-0.5 block text-xs text-foreground/65">Software Engineering Student</span>
          </span>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-foreground/25 text-foreground transition-all group-hover:border-primary-300 group-hover:bg-primary group-hover:text-white">
            <ArrowUpRight size={15} />
          </span>
        </span>
      </span>

      <span className="mt-2 flex items-center justify-between gap-3 px-1 pb-0.5 pt-1.5 text-[11px] text-foreground/60">
        <span className="flex items-center gap-1.5">
          <MapPin size={12} className="text-primary-300" />
          Kota Bandung
        </span>
        <ClockWidget compact />
      </span>
    </button>
  );
}
