"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Users, Award, ExternalLink, X, Calendar, CheckCircle2 } from "lucide-react";

type ExperienceData = {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  image: string;
  icon: any;
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
    colorClass: "text-primary",
    hoverColorClass: "group-hover:text-primary",
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
    colorClass: "text-blue-500",
    hoverColorClass: "group-hover:text-blue-500",
    hoverBorderClass: "hover:border-blue-400/40",
    hoverBgClass: "bg-blue-500/[0.02]",
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
    colorClass: "text-amber-500",
    hoverColorClass: "group-hover:text-amber-500",
    hoverBorderClass: "hover:border-amber-400/40",
    hoverBgClass: "bg-amber-500/[0.02]",
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
  const [selectedExp, setSelectedExp] = useState<ExperienceData | null>(null);

  return (
    <section id="experience" className="w-full py-16 sm:py-24 bg-white border-t border-border">
      <div className="container">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center mb-10 sm:mb-16"
        >
          Experience & <span className="text-primary-gradient">Affiliations</span>
        </motion.h2>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {experiences.map((exp, index) => {
            const IconComponent = exp.icon;
            const isContain = exp.imageFit === "contain";
            
            return (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                onClick={() => setSelectedExp(exp)}
                className={`relative group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg ${exp.hoverBorderClass} transition-all duration-300 cursor-pointer ${exp.colSpanClass || ""}`}
              >
                <div className={`absolute inset-0 ${exp.hoverBgClass} translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out z-10 pointer-events-none`} />
                
                <div className={`relative h-64 sm:h-72 w-full overflow-hidden ${exp.imageContainerClass || "bg-muted"}`}>
                  {isContain ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={exp.image}
                        alt={exp.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain drop-shadow-sm group-hover:scale-[1.03] transition-transform duration-700"
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
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center">
                    <span className="bg-white/90 text-foreground text-sm font-semibold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300 shadow-sm">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="relative z-20 p-6 sm:p-8 flex flex-col justify-center flex-1">
                  <div className={`flex items-center gap-2 ${exp.colorClass} mb-3`}>
                    <IconComponent size={20} />
                    <span className="font-mono text-sm font-semibold uppercase tracking-wider">{exp.type}</span>
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-bold text-foreground mb-1 ${exp.hoverColorClass} transition-colors`}>
                    {exp.title}
                  </h3>
                  <p className="text-muted-foreground font-medium text-lg">
                    {exp.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
        
      </div>

      {/* Detail Modal Overlay */}
      <AnimatePresence>
        {selectedExp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6"
            onClick={() => setSelectedExp(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-border rounded-2xl sm:rounded-3xl shadow-2xl custom-scrollbar flex flex-col"
              onClick={(e) => e.stopPropagation()} 
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedExp(null)}
                className={`absolute top-4 right-4 z-50 p-2 rounded-full transition-colors ${
                  selectedExp.imageFit === "contain" 
                    ? "bg-muted hover:bg-muted/80 text-muted-foreground" 
                    : "bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm"
                }`}
              >
                <X size={20} />
              </button>

              {/* Cover Image Header */}
              <div className={`relative h-48 sm:h-64 w-full shrink-0 ${selectedExp.imageFit === "contain" ? "bg-slate-50 p-4" : ""}`}>
                <Image
                  src={selectedExp.image}
                  alt={selectedExp.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={selectedExp.imageFit === "contain" ? "object-contain drop-shadow-sm p-4" : "object-cover object-center"}
                />
                <div className={`absolute inset-0 ${selectedExp.imageFit === "contain" ? "bg-gradient-to-t from-black/80 via-black/20 to-transparent" : "bg-gradient-to-t from-black/60 to-transparent"}`} />
                <div className="absolute bottom-4 left-6 sm:bottom-6 sm:left-8 right-6">
                  <div className={`flex items-center gap-2 text-white/90 mb-2`}>
                    <selectedExp.icon size={18} />
                    <span className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider">{selectedExp.type}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 drop-shadow-md">{selectedExp.title}</h2>
                  <p className="text-white/90 font-medium text-sm sm:text-base drop-shadow-md">{selectedExp.subtitle}</p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 bg-white flex-1">
                <div className="flex items-center gap-2 text-muted-foreground mb-6 pb-6 border-b border-border/50">
                  <Calendar size={18} />
                  <span className="text-sm font-medium">{selectedExp.date}</span>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground text-lg">Key Responsibilities & Achievements</h4>
                  <ul className="space-y-3">
                    {selectedExp.details.map((detail, idx) => (
                      <li key={idx} className="flex gap-3 text-muted-foreground">
                        <CheckCircle2 size={18} className={`${selectedExp.colorClass} shrink-0 mt-0.5`} />
                        <span className="text-sm sm:text-base leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Additional Action for Certificate */}
                  {selectedExp.imageFit === "contain" && (
                    <div className="mt-8 pt-6 border-t border-border/50">
                      <a 
                        href={selectedExp.image} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all shadow-sm hover:shadow group"
                      >
                        <ExternalLink size={18} />
                        Lihat Gambar Penuh
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
