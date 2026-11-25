"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Modal } from "./Modal";
import { PopupHead, PopupLabel, SpecList } from "./PopupParts";

const hobbies = ["Coding", "Hacking", "Electrical", "Coffee"];

const socials = [
  { name: "Instagram", handle: "@hadiramdhani.tsx", href: "https://instagram.com/hadiramdhani.tsx" },
  { name: "TikTok", handle: "@hadimobileengineer", href: "https://tiktok.com/@hadimobileengineer" },
  { name: "WhatsApp", handle: "083199456915", href: "https://wa.me/6283199456915" },
];

export default function BiodataModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} label="Biodata Hadi Ramdhani" size="xl">
      <div className="grid md:grid-cols-[0.8fr_1.2fr]">
        {/* Portrait */}
        <div className="relative min-h-[19rem] md:min-h-[36rem]">
          <Image
            src="/avatar.jpg"
            alt="Hadi Ramdhani"
            fill
            priority
            sizes="(min-width: 768px) 360px, 100vw"
            className="object-cover object-top grayscale-[0.4] contrast-105"
          />
          <div className="absolute inset-0 bg-[#ad4a37]/25 mix-blend-color" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#130503] via-[#130503]/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#130503]" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 md:bottom-4">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground/70">
              <span className="relative flex h-1.5 w-1.5">
                <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-primary-300" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-300" />
              </span>
              Open to collaborate
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="px-5 pb-8 pt-8 sm:px-9 md:pb-10 md:pt-16">
          <PopupHead
            kicker="Biodata"
            title="Hadi Ramdhani"
            subtitle="Software Engineering Student"
          />

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-foreground/70">
            Lulusan Software Engineering dari SMK Bani Ma&apos;sum yang kini menempuh Sekolah Profesi Insinyur. Suka
            membangun hal-hal kecil menjadi sesuatu yang nyata.
          </p>

          <div className="mt-8">
            <SpecList
              rows={[
                { label: "Umur", value: "19 Tahun" },
                { label: "Pekerjaan", value: "Software Engineer di SBM ITB" },
                { label: "Sekolah", value: "SEKOLAH PROFESI INSINYUR" },
                { label: "Alamat", value: "Komp. Puri Cipageran Indah 1, Kota Cimahi" },
                {
                  label: "Hobi",
                  value: (
                    <span className="flex flex-wrap gap-x-4 gap-y-1 text-foreground/80">
                      {hobbies.map((h) => (
                        <span key={h}>{h}</span>
                      ))}
                    </span>
                  ),
                },
              ]}
            />
          </div>

          <div className="mt-8">
            <PopupLabel>Temukan saya</PopupLabel>
            <ul className="border-b border-border">
              {socials.map((s) => (
                <li key={s.name} className="border-t border-border">
                  <Link
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-3 text-[15px] text-foreground transition-colors hover:text-primary-300"
                  >
                    <span>{s.name}</span>
                    <span className="flex items-center gap-2 text-sm text-foreground/50 transition-colors group-hover:text-primary-300">
                      {s.handle}
                      <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link
              href="https://wa.me/6283199456915"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm text-white transition-colors hover:bg-primary-400"
            >
              Hubungi saya
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#journey"
              onClick={onClose}
              className="border-b border-foreground/40 pb-0.5 text-sm text-foreground/80 transition-colors hover:border-primary-300 hover:text-primary-300"
            >
              Lihat perjalanan
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
