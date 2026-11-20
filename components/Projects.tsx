"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Coffee,
  Download,
  GraduationCap,
  Lock,
  Timer,
  Users,
  type LucideIcon,
} from "lucide-react";
import SectionHeader from "./SectionHeader";
import Spotlight from "./Spotlight";
import MobileCarousel from "./MobileCarousel";

const GithubIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

type Project = {
  name: string;
  category: string;
  description: string;
  url: string;
  host: string;
  tags: string[];
  icon: LucideIcon;
  /** rgb triplet */
  accent: string;
};

const projects: Project[] = [
  {
    name: "PPDB SMK Bani Masum",
    category: "Pendidikan",
    description: "Situs penerimaan peserta didik baru SMK Bani Masum, tempat calon siswa mendaftar secara online.",
    url: "https://ppdb-smk-bani-masum.vercel.app/",
    host: "ppdb-smk-bani-masum.vercel.app",
    tags: ["Website", "PPDB"],
    icon: GraduationCap,
    accent: "163,230,53",
  },
  {
    name: "None Cafe",
    category: "Cafe & Kitchen",
    description: "Website kafe di Cisalak, Subang. Menampilkan menu lengkap beserta harganya, dari kopi susu sampai nasi goreng.",
    url: "https://nonecafe.site",
    host: "nonecafe.site",
    tags: ["Website", "Menu Digital"],
    icon: Coffee,
    accent: "163,230,53",
  },
  {
    name: "BrewLogic",
    category: "Mobile App",
    description: "Kalkulator seduh, timer step-by-step, dan jurnal untuk homebrewer kopi. Halaman unduh APK dan IPA.",
    url: "https://brewlogicdownload.vercel.app/",
    host: "brewlogicdownload.vercel.app",
    tags: ["Android", "iOS", "Download"],
    icon: Timer,
    accent: "163,230,53",
  },
  {
    name: "Nex Downloader",
    category: "Mobile App",
    description: "Aplikasi pengunduh video dan audio native untuk Android dan iOS, dengan halaman unduh resmi.",
    url: "https://nexdownload.vercel.app/",
    host: "nexdownload.vercel.app",
    tags: ["Android", "iOS", "Download"],
    icon: Download,
    accent: "163,230,53",
  },
  {
    name: "NexoraLabStudio",
    category: "Studio",
    description: "Studio pembuatan website, web app, dan aplikasi Android & iOS untuk bisnis dan startup, dari ide sampai rilis.",
    url: "https://nexoralabstudios.vercel.app/",
    host: "nexoralabstudios.vercel.app",
    tags: ["Website", "Web App", "Mobile"],
    icon: Code2,
    accent: "163,230,53",
  },
  {
    name: "IMPHNEN",
    category: "Komunitas",
    description: "Komunitas gratis untuk programmer Indonesia: meme, showcase, event, kerja, kuis, dan polling.",
    url: "https://imphnen.dev/",
    host: "imphnen.dev",
    tags: ["Komunitas", "Web"],
    icon: Users,
    accent: "163,230,53",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative w-full py-20 sm:py-28 bg-muted/30 border-t border-border overflow-hidden scroll-mt-16">
      <div className="absolute inset-0 grid-bg mask-fade-y pointer-events-none" />
      <div className="container relative">
        <SectionHeader
          title={
            <>
              Featured <span className="text-primary-gradient">Projects</span>
            </>
          }
          subtitle="Project dan produk yang sudah live. Klik untuk membuka situsnya."
        />

        <MobileCarousel desktopClassName="sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:max-w-6xl sm:mx-auto">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.url}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
              >
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Buka ${project.name} (${project.host})`}
                  className="block h-full rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-ink"
                >
                  <Spotlight tilt={5}
                    color={project.accent}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                  >
                    {/* Browser-style preview */}
                    <div
                      className="relative h-44 overflow-hidden border-b border-border/70"
                      style={{
                        background: `linear-gradient(140deg, rgba(${project.accent},0.18), rgba(${project.accent},0.05) 55%, rgba(190,242,100,0.1))`,
                      }}
                    >
                      <div className="absolute inset-0 dot-grid opacity-50" />
                      <div
                        className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl opacity-50 transition-opacity duration-500 group-hover:opacity-90"
                        style={{ background: `rgb(${project.accent})` }}
                      />

                      {/* window bar */}
                      <div className="relative mx-4 mt-4 flex items-center gap-3 rounded-xl border border-white/80 bg-white/80 px-3 py-2 shadow-sm backdrop-blur">
                        <span className="flex gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-zinc-300" />
                          <span className="h-2 w-2 rounded-full bg-zinc-300" />
                          <span className="h-2 w-2 rounded-full bg-zinc-300" />
                        </span>
                        <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-muted/70 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                          <Lock size={9} className="shrink-0" />
                          <span className="truncate">{project.host}</span>
                        </span>
                      </div>

                      {/* centre mark */}
                      <div className="absolute inset-x-0 bottom-0 top-12 flex items-center justify-center">
                        <span
                          className="flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                          style={{
                            background: `linear-gradient(135deg, rgb(${project.accent}), rgba(${project.accent},0.7))`,
                            boxShadow: `0 18px 36px -14px rgba(${project.accent},0.7)`,
                          }}
                        >
                          <Icon size={28} />
                        </span>
                      </div>

                      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-lime-ink shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse" />
                        Live
                      </span>
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span
                          className="font-mono text-[11px] font-bold uppercase tracking-[0.15em]"
                          style={{ color: "var(--color-lime-ink)" }}
                        >
                          {project.category}
                        </span>
                        <span className="font-mono text-[11px] font-bold tracking-widest text-muted-foreground/50">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground">{project.name}</h3>
                      <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border/70 bg-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground/65"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm font-semibold text-foreground/80 transition-colors group-hover:text-lime-ink">
                        Kunjungi situs
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-bg-dark">
                          <ArrowUpRight
                            size={15}
                            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </span>
                      </div>
                    </div>
                  </Spotlight>
                </Link>
              </motion.div>
            );
          })}
        </MobileCarousel>

        <div className="mt-12 text-center">
          <Link
            href="https://github.com/0xHadiRamdhani"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-6 py-3 text-sm font-medium hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-md transition-all shadow-sm"
          >
            <GithubIcon size={16} />
            Lihat kode di GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
