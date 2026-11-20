"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, Users, Award, ExternalLink, Calendar, ArrowUpRight, type LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { Modal, useModalItem } from "./Modal";
import MobileCarousel from "./MobileCarousel";

const EXP_RGB: Record<string, string> = {
  "sbm-itb": "163,230,53",
  imphnen: "163,230,53",
  "sbm-itb-cert": "163,230,53",
};

type ExperienceData = {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  image: string;
  icon: LucideIcon;
  colorClass: string;
  hoverColorClass: string;
  hoverBorderClass: string;
  hoverBgClass: string;
  date: string;
  details: string[];
  imageFit?: "cover" | "contain";
  imageContainerClass?: string;
  colSpanClass?: string;
};

const experiences: ExperienceData[] = [
  {
    id: "sbm-itb",
    type: "Professional",
    title: "Software Engineer",
    subtitle: "at SBM ITB",
    image: "/sbm-itb.jpg",
    icon: Building2,
    colorClass: "text-lime-ink",
    hoverColorClass: "group-hover:text-lime-ink",
    hoverBorderClass: "hover:border-primary/40",
    hoverBgClass: "bg-primary/[0.02]",
    date: "April 13, 2026 - June 30, 2026",
    details: [
      "Completed a comprehensive internship program at the School of Business and Management, ITB.",
      "Demonstrated professionalism, responsibility, and dedication throughout the internship.",
      "Contributed to software engineering projects and technical problem-solving."
    ]
  },
  {
    id: "imphnen",
    type: "Community",
    title: "Part of IMPHNEN",
    subtitle: "Active Member",
    image: "/imphnen.png",
    icon: Users,
    colorClass: "text-lime-ink",
    hoverColorClass: "group-hover:text-lime-ink",
    hoverBorderClass: "hover:border-primary/40",
    hoverBgClass: "bg-primary/[0.02]",
    date: "2023 - Present",
    details: [
      "Actively participate in community discussions and collaborative initiatives.",
      "Engage with fellow tech enthusiasts to share knowledge and experiences.",
      "Support community events and networking activities."
    ]
  },
  {
    id: "sbm-itb-cert",
    type: "Achievement",
    title: "Internship Certificate",
    subtitle: "SBM ITB",
    image: "/sbm-itb-certificate.jpg",
    icon: Award,
    colorClass: "text-lime-ink",
    hoverColorClass: "group-hover:text-lime-ink",
    hoverBorderClass: "hover:border-primary/40",
    hoverBgClass: "bg-primary/[0.02]",
    date: "June 30, 2026",
    imageFit: "contain",
    imageContainerClass: "bg-slate-50 border-b border-border/50 p-4 sm:p-6",
    colSpanClass: "md:col-span-2 lg:col-span-1",
    details: [
      "Awarded Certificate of Appreciation for successful completion of the internship program.",
      "Recognized for professionalism, responsibility, and dedication.",
      "Demonstrated significant contribution to the School of Business and Management, ITB."
    ]
  }
];

export default function Experience() {
  const modal = useModalItem<ExperienceData>();
  const selectedExp = modal.item;

  return (
    <section id="experience" className="relative w-full py-20 sm:py-28 bg-white border-t border-border overflow-hidden scroll-mt-16">
      <div className="absolute inset-0 aurora opacity-70 pointer-events-none" />
      <div className="container relative">
        <SectionHeader
          title={
            <>
              Experience &amp; <span className="text-primary-gradient">Affiliations</span>
            </>
          }
          subtitle="Pengalaman profesional, komunitas, dan pencapaian yang membentuk perjalanan saya."
        />

        <MobileCarousel desktopClassName="sm:grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 sm:max-w-7xl sm:mx-auto">
          {experiences.map((exp, index) => {
            const IconComponent = exp.icon;
            const isContain = exp.imageFit === "contain";

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                onClick={() => modal.show(exp)}
                className={`relative group flex flex-col bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1.5 ${exp.hoverBorderClass} transition-all duration-500 cursor-pointer ${exp.colSpanClass || ""}`}
              >
                <div className={`relative h-64 sm:h-72 w-full overflow-hidden ${exp.imageContainerClass || "bg-muted"}`}>
                  {isContain ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={exp.image}
                        alt={exp.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain drop-shadow-sm group-hover:scale-[1.04] transition-transform duration-700"
                      />
                    </div>
                  ) : (
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                  )}

                  {!isContain && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                  )}

                  {/* Type badge */}
                  <div className={`absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 shadow-sm ${exp.colorClass}`}>
                    <IconComponent size={14} />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider">{exp.type}</span>
                  </div>

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors z-10 flex items-center justify-center">
                    <span className="bg-white/95 text-foreground text-sm font-semibold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-300 shadow-md inline-flex items-center gap-1.5">
                      View Details
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>

                <div className="relative z-20 p-6 sm:p-7 flex flex-col justify-center flex-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-3">
                    <Calendar size={13} />
                    {exp.date}
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-bold text-foreground mb-1 ${exp.hoverColorClass} transition-colors`}>
                    {exp.title}
                  </h3>
                  <p className="text-muted-foreground font-medium text-base">
                    {exp.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </MobileCarousel>
      </div>

      {/* Detail modal */}
      {selectedExp && (
        <Modal
          open={modal.open}
          onClose={modal.hide}
          size="lg"
          closeTone={selectedExp.imageFit === "contain" ? "dark" : "light"}
          accent={EXP_RGB[selectedExp.id]}
          label={`${selectedExp.title} ${selectedExp.subtitle}`}
        >
          {/* Cover */}
          <div className={`relative h-52 sm:h-72 w-full shrink-0 ${selectedExp.imageFit === "contain" ? "bg-slate-50" : "bg-muted"}`}>
            <Image
              src={selectedExp.image}
              alt={selectedExp.title}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className={selectedExp.imageFit === "contain" ? "object-contain p-6 sm:p-8 drop-shadow-sm" : "object-cover object-center"}
            />
            {selectedExp.imageFit !== "contain" && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    <selectedExp.icon size={13} className={selectedExp.colorClass} />
                    <span className={selectedExp.colorClass}>{selectedExp.type}</span>
                  </span>
                  <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-md">{selectedExp.title}</h2>
                  <p className="mt-0.5 text-sm sm:text-base font-medium text-white/85 drop-shadow-md">{selectedExp.subtitle}</p>
                </div>
              </>
            )}
          </div>

          <div className="p-5 sm:p-8">
            {selectedExp.imageFit === "contain" && (
              <div className="mb-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider">
                  <selectedExp.icon size={13} className={selectedExp.colorClass} />
                  <span className={selectedExp.colorClass}>{selectedExp.type}</span>
                </span>
                <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight text-foreground">{selectedExp.title}</h2>
                <p className="mt-0.5 text-sm sm:text-base font-medium text-muted-foreground">{selectedExp.subtitle}</p>
              </div>
            )}
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground">
              <Calendar size={14} className={selectedExp.colorClass} />
              {selectedExp.date}
            </div>

            <h3 className="mt-6 mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Key Responsibilities &amp; Achievements
            </h3>
            <ul className="space-y-2.5">
              {selectedExp.details.map((detail, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + idx * 0.07 }}
                  className="flex gap-3.5 rounded-2xl border border-border bg-muted/30 p-3.5 sm:p-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white font-mono text-xs font-bold shadow-sm ring-1 ring-border">
                    <span className={selectedExp.colorClass}>{idx + 1}</span>
                  </span>
                  <span className="text-sm sm:text-[15px] leading-relaxed text-foreground/75">{detail}</span>
                </motion.li>
              ))}
            </ul>

            {selectedExp.imageFit === "contain" && (
              <a
                href={selectedExp.image}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3.5 text-sm font-semibold text-bg-dark shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary-500 sm:w-auto"
              >
                <ExternalLink size={16} />
                Lihat Gambar Penuh
              </a>
            )}
          </div>
        </Modal>
      )}
    </section>
  );
}
