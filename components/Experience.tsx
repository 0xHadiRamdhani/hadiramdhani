import Image from "next/image";
import { Building2, Users } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="w-full py-16 sm:py-24 bg-white border-t border-border">
      <div className="container">
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center mb-10 sm:mb-16">
          Experience & <span className="text-primary-gradient">Affiliations</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Card 1: SBM ITB */}
          <div className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/40 transition-all duration-300">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-muted">
              <Image
                src="/sbm-itb.jpg"
                alt="Software Engineer at SBM ITB"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-center flex-1">
              <div className="flex items-center gap-2 text-primary mb-3">
                <Building2 size={20} />
                <span className="font-mono text-sm font-semibold uppercase tracking-wider">Professional</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                Software Engineer
              </h3>
              <p className="text-muted-foreground font-medium text-lg">
                at SBM ITB
              </p>
            </div>
          </div>

          {/* Card 2: IMPHNEN */}
          <div className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-blue-400/40 transition-all duration-300">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-muted">
              <Image
                src="/imphnen.png"
                alt="Part of IMPHNEN"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-center flex-1">
              <div className="flex items-center gap-2 text-blue-500 mb-3">
                <Users size={20} />
                <span className="font-mono text-sm font-semibold uppercase tracking-wider">Community</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                Part of IMPHNEN
              </h3>
              <p className="text-muted-foreground font-medium text-lg">
                Active Member
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
