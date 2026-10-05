"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Wrench } from "lucide-react";
import type { ReactNode } from "react";

export function ToolsNavigation({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isMainToolsPage = pathname === "/tools";

  return (
    <div className="pt-24 sm:pt-28">
      {!isMainToolsPage && (
        <div className="container max-w-5xl mx-auto px-4 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/tools"
              className="group flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-muted/50 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all text-sm font-semibold text-muted-foreground hover:text-primary w-fit"
            >
              <div className="flex items-center justify-center bg-white rounded-full p-1 shadow-sm group-hover:scale-110 transition-transform">
                <ArrowLeft size={14} className="text-foreground group-hover:text-primary" />
              </div>
              Kembali ke Katalog Tools
            </Link>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-semibold border border-primary/20 shadow-sm shadow-primary/5">
              <Wrench size={12} />
              <span className="tracking-wide uppercase">Client-Side Tool</span>
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
