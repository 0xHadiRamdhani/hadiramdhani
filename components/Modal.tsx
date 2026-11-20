"use client";

import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Accessible name of the dialog */
  label: string;
  size?: "sm" | "md" | "lg";
  /** rgb triplet used for the top bar and the backdrop glow, e.g. "32,160,232" */
  accent?: string;
  /** Use "light" when the close button sits on a dark or image header */
  closeTone?: "light" | "dark";
};

const SIZES = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
} as const;

/**
 * Keeps the last opened item around so the content stays visible while the
 * exit animation plays, instead of collapsing the moment the state clears.
 */
export function useModalItem<T>() {
  const [item, setItem] = useState<T | null>(null);
  const [open, setOpen] = useState(false);
  const show = useCallback((next: T) => {
    setItem(next);
    setOpen(true);
  }, []);
  const hide = useCallback(() => setOpen(false), []);
  return { item, open, show, hide };
}

export function Modal({
  open,
  onClose,
  children,
  label,
  size = "md",
  accent = "32,160,232",
  closeTone = "dark",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-[#0A110F]/60 backdrop-blur-md"
          style={{
            backgroundImage: `radial-gradient(60% 50% at 50% 40%, rgba(${accent},0.22), transparent 70%)`,
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            initial={{ opacity: 0, y: 56, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 36, scale: 0.97 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            style={{ "--accent": accent } as CSSProperties}
            className={`relative flex w-full ${SIZES[size]} max-h-[92dvh] sm:max-h-[88vh] flex-col overflow-hidden rounded-t-[2rem] sm:rounded-[2rem] bg-white shadow-[0_40px_120px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/40`}
          >
            {/* Accent bar */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-40 h-1.5"
              style={{ background: `linear-gradient(90deg, rgb(${accent}), #5865f2, rgb(${accent}))` }}
            />
            {/* Sheet handle (mobile) */}
            <div className="pointer-events-none absolute left-1/2 top-2.5 z-40 h-1 w-10 -translate-x-1/2 rounded-full bg-white/70 sm:hidden mix-blend-difference" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup"
              className={`group absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:rotate-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                closeTone === "light"
                  ? "bg-black/25 text-white backdrop-blur-md hover:bg-black/45"
                  : "bg-muted text-muted-foreground hover:bg-border hover:text-foreground"
              }`}
            >
              <X size={18} />
            </button>

            <div className="custom-scrollbar flex-1 overflow-y-auto overscroll-contain">{children}</div>
          </motion.div>

          <span className="pointer-events-none absolute bottom-5 hidden font-mono text-[11px] tracking-widest text-white/45 sm:block">
            ESC UNTUK MENUTUP
          </span>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
