import type { ReactNode } from "react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/** Small caps line, big light title, optional rose subtitle. */
export function PopupHead({
  kicker,
  title,
  subtitle,
  className = "",
}: {
  kicker: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}) {
  return (
    <header className={className}>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: 0.05 }}
        className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary-300"
      >
        {kicker}
      </motion.p>
      <h2 className="mt-4 overflow-hidden pb-1 text-[2.1rem] leading-[1.02] tracking-[-0.04em] text-foreground sm:text-5xl">
        <motion.span
          initial={{ y: "105%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="block"
        >
          {title}
        </motion.span>
      </h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.25 }}
          className="mt-3 max-w-md text-base font-light leading-snug text-primary-200/80 sm:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  );
}

/** Label / value rows separated by hairlines, like a spec sheet. */
export function SpecList({ rows, delay = 0.2 }: { rows: { label: string; value: ReactNode }[]; delay?: number }) {
  return (
    <dl className="border-b border-border">
      {rows.map((r, i) => (
        <motion.div
          key={r.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease, delay: delay + i * 0.06 }}
          className="grid gap-1 border-t border-border py-3.5 sm:grid-cols-[7.5rem_1fr] sm:gap-6"
        >
          <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{r.label}</dt>
          <dd className="text-[15px] leading-snug text-foreground">{r.value}</dd>
        </motion.div>
      ))}
    </dl>
  );
}

/** Numbered rows with hairlines instead of boxed cards. */
export function NumberedList({ items, delay = 0.25 }: { items: ReactNode[]; delay?: number }) {
  return (
    <ol className="border-b border-border">
      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease, delay: delay + i * 0.07 }}
          className="grid grid-cols-[2.25rem_1fr] gap-3 border-t border-border py-3.5"
        >
          <span className="pt-0.5 font-mono text-[11px] tabular-nums text-primary-300">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-[15px] leading-relaxed text-foreground/75">{item}</span>
        </motion.li>
      ))}
    </ol>
  );
}

/** Mono label above a block. */
export function PopupLabel({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{children}</p>;
}
