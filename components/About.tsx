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
            <span className="inline-flex w-fit items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary-500">
              About Me
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              A student who loves turning ideas into something{" "}
              <span className="text-primary-gradient">real.</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Saya adalah Muhamad Aris, mahasiswa Program Studi Teknik Informatika di Universitas Sains Indonesia. Saya tertarik dengan dunia teknologi, coding, kreativitas digital, editing, fotografi, dan traveling.
            </p>

            {/* Quick facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "📚 University", value: "Universitas Sains Indonesia" },
                { label: "🎓 Program", value: "Teknik Informatika" },
                { label: "📍 Location", value: "Indonesia" },
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
