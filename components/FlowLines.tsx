"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  /** Number of strands across the width. Fewer on phones automatically. */
  strands?: number;
};

/**
 * A ridge of glowing copper fibres that slowly undulates. Each strand is a
 * single line from the ridge down to the bottom edge, drawn additively so
 * overlapping strands bloom. Strands near the cursor lift a little.
 */
export default function FlowLines({ className = "", strands = 420 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let n = 0;
    let raf = 0;
    let visible = true;
    let t = 0;
    let last = 0;
    let phase = new Float32Array(0);
    let gain = new Float32Array(0);
    const pointer = { x: -9999, active: false };

    const resize = () => {
      w = host.clientWidth;
      h = host.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      n = w < 640 ? Math.round(strands * 0.55) : strands;
      phase = new Float32Array(n);
      gain = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        phase[i] = Math.random() * 6.283;
        gain[i] = 0.55 + Math.random() * 0.45;
      }
      draw();
    };

    const ridge = (x: number, time: number, layer = 0) => {
      const u = x / w;
      const base = h * (0.46 + layer * 0.1);
      const o = layer * 1.9;
      return (
        base +
        Math.sin(u * 3.1 + o + time * 0.00032) * h * 0.14 +
        Math.sin(u * 7.3 - o - time * 0.00047 + 1.4) * h * 0.06 +
        Math.sin(u * 13.7 + o + time * 0.0006) * h * 0.02
      );
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const grad = ctx.createLinearGradient(0, h * 0.2, 0, h);
      grad.addColorStop(0, "rgba(255, 190, 140, 1)");
      grad.addColorStop(0.18, "rgba(226, 112, 72, 0.7)");
      grad.addColorStop(0.55, "rgba(173, 74, 55, 0.32)");
      grad.addColorStop(1, "rgba(79, 10, 1, 0)");
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = grad;
      ctx.lineCap = "round";

      const step = w / (n - 1);
      for (let layer = 1; layer >= 0; layer--) {
        const dim = layer === 1 ? 0.45 : 1;
        for (let i = 0; i < n; i++) {
          const x = i * step;
          let y = ridge(x, t, layer);
          if (pointer.active) {
            const d = (x - pointer.x) / (w * 0.12);
            y -= Math.exp(-d * d) * h * 0.1;
          }
          // The strand leans with the slope of the ridge, like combed hair.
          const lean = (ridge(x + 6, t, layer) - ridge(x - 6, t, layer)) * 1.8;
          const flick = Math.sin(t * 0.0009 + phase[i] + layer) * 0.5 + 0.5;
          ctx.globalAlpha = Math.min(1, gain[i] * (0.65 + flick * 0.55) * dim * 1.25);
          ctx.lineWidth = (1 + gain[i] * 1.2) * (layer ? 0.85 : 1);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x - lean, h);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const dt = Math.min(48, last ? now - last : 16);
      last = now;
      t += dt;
      draw();
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (reduced || raf) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => {
      visible = e?.isIntersecting ?? true;
      if (visible) start();
    });
    io.observe(host);
    const onVis = () => {
      if (!document.hidden) start();
    };
    document.addEventListener("visibilitychange", onVis);

    resize();
    start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [strands]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
