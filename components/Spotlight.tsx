"use client";

import { useRef, type ReactNode, type MouseEvent, type HTMLAttributes } from "react";

type SpotlightProps = {
  children: ReactNode;
  className?: string;
  /** rgb triplet, e.g. "32,160,232" */
  color?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "color">;

/** Card wrapper with a cursor-following glow (see `.spot` in globals.css). */
export default function Spotlight({
  children,
  className = "",
  color = "32,160,232",
  ...rest
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      style={{ "--spot": color } as React.CSSProperties}
      className={`spot ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
