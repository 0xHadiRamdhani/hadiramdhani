"use client";

import { motion } from "framer-motion";

const journeys = [
  { id: "01", title: "SD Nagasari 01", subtitle: "Elementary School", status: "Completed", active: false },
  { id: "02", title: "MTs Bani Ma'sum", subtitle: "Junior High School", status: "Completed", active: false },
  { id: "03", title: "SMA Bani Ma'sum", subtitle: "Senior High School", status: "Completed", active: false },
  { id: "04", title: "Universitas Sains Indonesia", subtitle: "Teknik Informatika", status: "Currently Studying", active: true },
];

export default function Journey() {
  return (
    <section id="journey" className="w-full py-16 sm:py-24 bg-muted/30 border-y border-border">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-3 text-center mb-10 sm:mb-16">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary-500">
            Education
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            My <span className="text-primary-gradient">Journey</span>
          </h2>
          <p className="max-w-xl text-muted-foreground text-sm sm:text-base">
            Jejak pendidikan Muhamad Aris.
          </p>
        </div>

        {/* Mobile: vertical, Desktop: horizontal */}
        <div className="relative">
          {/* Horizontal line (desktop) */}
          <div className="hidden md:block absolute top-8 left-8 right-8 h-px bg-border" />

          <div className="flex flex-col md:flex-row gap-6 md:gap-4 relative z-10">
            {journeys.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex md:flex-col items-start md:items-center gap-4 md:gap-5 flex-1 group"
              >
                {/* Connector dot */}
                <div className={`relative flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 font-bold font-mono text-sm transition-all duration-300 ${
                  item.active
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                    : "bg-white border-border text-muted-foreground group-hover:border-primary/40"
                }`}>
                  {item.id}
                  {item.active && (
                    <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1 md:items-center md:text-center">
                  <h3 className={`font-bold text-sm sm:text-base leading-tight ${item.active ? "text-primary" : "text-foreground"}`}>
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">{item.subtitle}</p>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium mt-1 ${
                    item.active
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "bg-muted text-muted-foreground border border-border"
                  }`}>
                    {item.active && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                    {item.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
