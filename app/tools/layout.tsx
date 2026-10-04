import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Back to Tools bar */}
      <div className="fixed top-16 sm:top-20 left-0 right-0 z-40 border-b border-border bg-white/80 backdrop-blur-md">
        <div className="container max-w-7xl mx-auto px-4 h-10 flex items-center">
          <Link
            href="/tools"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            <ChevronLeft size={16} />
            Semua Tools
          </Link>
        </div>
      </div>
      <div className="pt-28 sm:pt-36">{children}</div>
    </>
  );
}
