"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, Users } from "lucide-react";

export default function Experience() {
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

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Card 1: SBM ITB */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/40 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-primary/[0.02] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out z-10 pointer-events-none" />
            
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-muted">
              <Image
                src="/sbm-itb.jpg"
                alt="Software Engineer at SBM ITB"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative z-20 p-6 sm:p-8 flex flex-col justify-center flex-1">
              <div className="flex items-center gap-2 text-primary mb-3">
                <Building2 size={20} />
                <span className="font-mono text-sm font-semibold uppercase tracking-wider">Professional</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                Software Engineer
              </h3>
              <p className="text-muted-foreground font-medium text-lg">
                at SBM ITB
              </p>
            </div>
          </motion.div>

          {/* Card 2: IMPHNEN */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-blue-400/40 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-blue-500/[0.02] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out z-10 pointer-events-none" />
            
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-muted">
              <Image
                src="/imphnen.png"
                alt="Part of IMPHNEN"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative z-20 p-6 sm:p-8 flex flex-col justify-center flex-1">
              <div className="flex items-center gap-2 text-blue-500 mb-3">
                <Users size={20} />
                <span className="font-mono text-sm font-semibold uppercase tracking-wider">Community</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1 group-hover:text-blue-500 transition-colors">
                Part of IMPHNEN
              </h3>
              <p className="text-muted-foreground font-medium text-lg">
                Active Member
              </p>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
