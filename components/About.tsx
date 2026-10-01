"use client";

import { motion } from "framer-motion";
import InteractiveProfile from "./InteractiveProfile";

export default function About() {
  return (
    <section id="about" className="w-full py-16 sm:py-24 bg-white">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-6"
          >
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              A student who loves turning ideas into something{" "}
              <span className="text-primary-gradient">real.</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Saya adalah Hadi Ramdhani, siswa jurusan Software Engineering di SMK Bani Ma'sum. Saya tertarik dengan dunia teknologi, coding, hacking, electrical, dan coffee.
            </p>

            {/* Quick facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "📚 School", value: "SMK Bani Ma'sum" },
                { label: "🎓 Major", value: "Software Engineering" },
                { label: "📍 Location", value: "Kota Bandung, Jawa Barat" },
                { label: "💼 Status", value: "Open to Collaborate" },
              ].map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col gap-0.5 rounded-lg bg-muted/50 border border-border px-4 py-3"
                >
                  <span className="text-xs text-muted-foreground">{fact.label}</span>
                  <span className="text-sm font-semibold text-foreground">{fact.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right interactive profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <InteractiveProfile />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
