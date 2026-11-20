"use client";

import { useRef, type ReactNode, type MouseEvent, type HTMLAttributes } from "react";

type SpotlightProps = {
  children: ReactNode;
  className?: string;
  /** rgb triplet, e.g. "163,230,53" */
  color?: string;
  /** Tilt the card towards the cursor (max degrees). 0 disables. */
  tilt?: number;
} & Omit<HTMLAttributes<HTMLDivElement>, "color">;

/** Card wrapper with a cursor-following glow (see `.spot` in globals.css). */
export default function Spotlight({
  children,
  className = "",
  color = "163,230,53",
  tilt = 0,
  ...rest
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    if (tilt) {
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--rx", `${(px * tilt).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(-py * tilt).toFixed(2)}deg`);
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el || !tilt) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ "--spot": color } as React.CSSProperties}
      className={`spot ${tilt ? "spot-tilt" : ""} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
