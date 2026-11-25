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
  size?: "sm" | "md" | "lg" | "xl";
  /** rgb triplet used for the top bar and the backdrop glow, e.g. "207,140,118" */
  accent?: string;
};

const SIZES = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
  xl: "sm:max-w-4xl",
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
  accent = "207,140,118",
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
          className="fixed inset-0 z-[100] flex items-end justify-center bg-[#0b0100]/80 p-0 backdrop-blur-xl sm:items-center sm:p-6"
          style={{
            backgroundImage: `radial-gradient(60% 55% at 50% 100%, rgba(${accent},0.28), transparent 70%), radial-gradient(40% 40% at 0% 0%, rgba(79,10,1,0.7), transparent 70%)`,
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            initial={{ opacity: 0, y: 40, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.99 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{ "--accent": accent } as CSSProperties}
            className={`ticks relative flex w-full ${SIZES[size]} max-h-[92dvh] flex-col overflow-hidden rounded-t-xl border border-border bg-[#130503] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] sm:max-h-[88vh] sm:rounded-md`}
          >
            {/* Warm glow + hairline along the top edge */}
            <div className="ember-glow pointer-events-none absolute inset-0 opacity-70" />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup"
              className="group absolute right-3 top-3 z-50 flex h-9 items-center gap-2 rounded-sm border border-border bg-[#110100]/70 px-3 text-[11px] uppercase tracking-[0.18em] text-foreground/75 backdrop-blur transition-colors hover:border-primary-300/60 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 sm:right-4 sm:top-4"
            >
              Tutup
              <X size={14} className="transition-transform duration-200 group-hover:rotate-90" />
            </button>

            <div className="custom-scrollbar relative flex-1 overflow-y-auto overscroll-contain">{children}</div>
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
