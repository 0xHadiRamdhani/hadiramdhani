"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, Wrench } from "lucide-react";
import type { ReactNode } from "react";

export default function ToolsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isMainToolsPage = pathname === "/tools";

  return (
    <>
      {/* Secondary Navbar (hanya muncul di sub-page tools) */}
      {!isMainToolsPage && (
        <div className="fixed top-16 sm:top-20 left-0 right-0 z-40 border-b border-border bg-white/70 dark:bg-black/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
          <div className="container max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
            <Link
              href="/tools"
              className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              <span className="flex items-center justify-center p-1 rounded-md bg-muted group-hover:bg-primary/10 transition-colors">
                <ChevronLeft size={14} className="text-muted-foreground group-hover:text-primary" />
              </span>
              Kembali ke Katalog
            </Link>
            
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/5 text-primary text-xs font-semibold border border-primary/10">
              <Wrench size={12} /> Live Browser Tool
            </div>
          </div>
        </div>
      )}
      
      {/* Jarak padding menyesuaikan apakah ada secondary navbar atau tidak */}
      <div className={isMainToolsPage ? "pt-24 sm:pt-28" : "pt-32 sm:pt-40"}>
        {children}
      </div>
    </>
  );
}
