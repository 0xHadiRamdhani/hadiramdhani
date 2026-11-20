"use client";

import { useEffect, useRef } from "react";

export type SwarmMode = "swarm" | "rebuild" | "auto";
export type SwarmPhase = "swarm" | "rebuild";

export type SwarmFormation = {
  /** Horizontal centre of the shape, 0..1 of the canvas width */
  cx: number;
  /** Vertical centre of the shape, 0..1 of the canvas height */
  cy: number;
  /** Width of the shape, 0..1 of the canvas width */
  width: number;
};

type SwarmFieldProps = {
  mode?: SwarmMode;
  /** Text the particles rebuild into */
  text?: string;
  /** Fixed particle count. Defaults to a density based on the canvas area */
  count?: number;
  /** Canvas area (px²) per particle when `count` is not set. Lower = more particles */
  density?: number;
  theme?: "light" | "dark";
  /** rgb triplet ("163,230,53") that tints dots and links instead of the theme palette */
  accent?: string;
  formation?: SwarmFormation;
  /** Used instead of `formation` below 640px width */
  formationMobile?: SwarmFormation;
  autoSwarmMs?: number;
  autoRebuildMs?: number;
  /** Scatter the particles when the host is clicked, they snap back in rebuild */
  burstOnClick?: boolean;
  className?: string;
  onPhaseChange?: (phase: SwarmPhase) => void;
};

const PALETTES = {
  light: {
    dots: ["#0a0a0a", "#3f6212", "#84cc16", "#a3e635"],
    line: "63,98,18",
    lineMax: 0.28,
  },
  dark: {
    dots: ["#a3e635", "#bef264", "#d9f99d", "#ffffff"],
    line: "190,242,100",
    lineMax: 0.38,
  },
} as const;

const DEFAULT_FORMATION: SwarmFormation = { cx: 0.5, cy: 0.5, width: 0.6 };
const TAU = Math.PI * 2;

/**
 * Canvas boids flock. In "swarm" the particles flock and follow the cursor,
 * in "rebuild" they spring into the outline of `text`, and "auto" cycles
 * between the two.
 */
export default function SwarmField({
  mode = "auto",
  text = "</>",
  count,
  density = 4200,
  theme = "light",
  accent,
  formation = DEFAULT_FORMATION,
  formationMobile,
  autoSwarmMs = 5200,
  autoRebuildMs = 5600,
  burstOnClick = false,
  className = "",
  onPhaseChange,
}: SwarmFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cfg = useRef({
    mode,
    text,
    count,
    density,
    theme,
    accent,
    formation,
    formationMobile,
    autoSwarmMs,
    autoRebuildMs,
    burstOnClick,
    onPhaseChange,
  });
  const retarget = useRef<(() => void) | null>(null);

  useEffect(() => {
    cfg.current = {
      mode,
      text,
      count,
      density,
      theme,
      accent,
      formation,
      formationMobile,
      autoSwarmMs,
      autoRebuildMs,
      burstOnClick,
      onPhaseChange,
    };
  });

  const f = formation;
  const fm = formationMobile;
  useEffect(() => {
    retarget.current?.();
  }, [text, f.cx, f.cy, f.width, fm?.cx, fm?.cy, fm?.width]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let N = 0;
    let px = new Float32Array(0);
    let py = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    let tx = new Float32Array(0);
    let ty = new Float32Array(0);
    let hasT = new Uint8Array(0);
    let tint = new Uint8Array(0);
    let size = new Float32Array(0);
    let shapeCx = 0;
    let shapeCy = 0;

    let phase: SwarmPhase = cfg.current.mode === "rebuild" ? "rebuild" : "swarm";
    let autoPhase: SwarmPhase = "swarm";
    let phaseT = 0;
    let blend = phase === "rebuild" ? 1 : 0;
    let time = 0;
    let last = 0;
    let raf = 0;
    let running = false;
    let visible = true;
    const pointer = { x: 0, y: 0, active: false };

    const allocate = (n: number) => {
      N = n;
      px = new Float32Array(n);
      py = new Float32Array(n);
      vx = new Float32Array(n);
      vy = new Float32Array(n);
      tx = new Float32Array(n);
      ty = new Float32Array(n);
      hasT = new Uint8Array(n);
      tint = new Uint8Array(n);
      size = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        px[i] = Math.random() * w;
        py[i] = Math.random() * h;
        const a = Math.random() * TAU;
        const s = 0.6 + Math.random() * 1.2;
        vx[i] = Math.cos(a) * s;
        vy[i] = Math.sin(a) * s;
        tint[i] = Math.floor(Math.random() * 4);
        size[i] = 1.1 + Math.random() * 1.5;
      }
    };

    const computeTargets = () => {
      if (!w || !h || !N) return;
      const c = cfg.current;
      const fo = w < 640 && c.formationMobile ? c.formationMobile : c.formation;
      const s = 0.5;
      const ow = Math.max(1, Math.floor(w * s));
      const oh = Math.max(1, Math.floor(h * s));
      const off = document.createElement("canvas");
      off.width = ow;
      off.height = oh;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;

      const family = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
      octx.font = `800 100px ${family}`;
      const measured = octx.measureText(c.text).width || 1;
      let fs = ((fo.width * ow) / measured) * 100;
      fs = Math.min(fs, oh * 0.78);
      octx.font = `800 ${fs}px ${family}`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillStyle = "#000";
      octx.fillText(c.text, fo.cx * ow, fo.cy * oh);
      shapeCx = fo.cx * w;
      shapeCy = fo.cy * h;

      const data = octx.getImageData(0, 0, ow, oh).data;
      let pts: number[] = [];
      for (let step = 2; step <= 40; step++) {
        pts = [];
        for (let y = 0; y < oh; y += step) {
          for (let x = 0; x < ow; x += step) {
            if (data[(y * ow + x) * 4 + 3] > 140) pts.push(x / s, y / s);
          }
        }
        if (pts.length / 2 <= N) break;
      }

      const M = pts.length / 2;
      const used = new Uint8Array(M);
      hasT.fill(0);
      const order = Array.from({ length: N }, (_, i) => i);
      for (let i = N - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      let assigned = 0;
      for (const i of order) {
        if (assigned >= M) break;
        let best = -1;
        let bd = Infinity;
        for (let k = 0; k < M; k++) {
          if (used[k]) continue;
          const dx = pts[k * 2] - px[i];
          const dy = pts[k * 2 + 1] - py[i];
          const d = dx * dx + dy * dy;
          if (d < bd) {
            bd = d;
            best = k;
          }
        }
        if (best < 0) break;
        used[best] = 1;
        tx[i] = pts[best * 2];
        ty[i] = pts[best * 2 + 1];
        hasT[i] = 1;
        assigned++;
      }
    };

    const draw = () => {
      const a = cfg.current.accent;
      const base = PALETTES[cfg.current.theme];
      const pal = a
        ? { dots: [`rgb(${a})`, `rgba(${a},0.75)`, "#ffffff", `rgba(${a},0.5)`], line: a, lineMax: base.lineMax }
        : base;
      ctx.clearRect(0, 0, w, h);

      const link = 64 - 36 * blend;
      const L2 = link * link;
      const paths = [new Path2D(), new Path2D(), new Path2D()];
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = px[i] - px[j];
          const dy = py[i] - py[j];
          const d2 = dx * dx + dy * dy;
          if (d2 >= L2) continue;
          const t = 1 - Math.sqrt(d2) / link;
          const b = t < 0.34 ? 0 : t < 0.67 ? 1 : 2;
          paths[b].moveTo(px[i], py[i]);
          paths[b].lineTo(px[j], py[j]);
        }
      }
      ctx.lineWidth = 1;
      for (let b = 0; b < 3; b++) {
        ctx.strokeStyle = `rgba(${pal.line},${(pal.lineMax * (b + 1)) / 3})`;
        ctx.stroke(paths[b]);
      }

      for (let t = 0; t < 4; t++) {
        ctx.fillStyle = pal.dots[t];
        ctx.beginPath();
        for (let i = 0; i < N; i++) {
          if (tint[i] !== t) continue;
          const r = size[i] * (1 + 0.45 * blend * hasT[i]);
          ctx.moveTo(px[i] + r, py[i]);
          ctx.arc(px[i], py[i], r, 0, TAU);
        }
        ctx.fill();
      }
    };

    const step = (dt: number) => {
      const R = 74;
      const R2 = R * R;
      const SEP = 24;
      const SEP2 = SEP * SEP;
      const target = phase === "rebuild" ? 1 : 0;
      blend += (target - blend) * Math.min(1, 0.05 * dt);

      for (let i = 0; i < N; i++) {
        let ax = 0;
        let ay = 0;
        let sx = 0;
        let sy = 0;
        let avx = 0;
        let avy = 0;
        let ccx = 0;
        let ccy = 0;
        let n = 0;

        for (let j = 0; j < N; j++) {
          if (j === i) continue;
          const dx = px[j] - px[i];
          const dy = py[j] - py[i];
          const d2 = dx * dx + dy * dy;
          if (d2 > R2 || d2 < 0.0001) continue;
          n++;
          avx += vx[j];
          avy += vy[j];
          ccx += px[j];
          ccy += py[j];
          if (d2 < SEP2) {
            const d = Math.sqrt(d2);
            const f2 = (1 - d / SEP) / d;
            sx -= dx * f2;
            sy -= dy * f2;
          }
        }

        if (n > 0) {
          ax += (avx / n - vx[i]) * 0.05 + (ccx / n - px[i]) * 0.0012;
          ay += (avy / n - vy[i]) * 0.05 + (ccy / n - py[i]) * 0.0012;
        }
        ax += sx * 0.07;
        ay += sy * 0.07;
        ax += Math.cos(time * 0.0007 + i * 1.7) * 0.016;
        ay += Math.sin(time * 0.0009 + i * 2.3) * 0.016;

        const mg = 40;
        if (px[i] < mg) ax += (mg - px[i]) * 0.004;
        else if (px[i] > w - mg) ax -= (px[i] - (w - mg)) * 0.004;
        if (py[i] < mg) ay += (mg - py[i]) * 0.004;
        else if (py[i] > h - mg) ay -= (py[i] - (h - mg)) * 0.004;

        if (pointer.active) {
          const dx = pointer.x - px[i];
          const dy = pointer.y - py[i];
          const d = Math.sqrt(dx * dx + dy * dy) || 1;
          if (blend < 0.5) {
            if (d < 280) {
              const k = 1 - d / 280;
              const radial = d < 46 ? -0.08 : 0.05;
              ax += ((dx / d) * radial + (-dy / d) * 0.05) * k;
              ay += ((dy / d) * radial + (dx / d) * 0.05) * k;
            }
          } else if (d < 120) {
            const k = 1 - d / 120;
            ax -= (dx / d) * k * 1.1;
            ay -= (dy / d) * k * 1.1;
          }
        }

        if (hasT[i] && blend > 0.001) {
          const sax = (tx[i] - px[i]) * 0.03;
          const say = (ty[i] - py[i]) * 0.03;
          ax = ax * (1 - blend) + sax * blend;
          ay = ay * (1 - blend) + say * blend;
          const damp = Math.max(0, 1 - 0.16 * blend * dt);
          vx[i] *= damp;
          vy[i] *= damp;
        } else if (blend > 0.001) {
          ax += (shapeCx - px[i]) * 0.0006 * blend;
          ay += (shapeCy - py[i]) * 0.0006 * blend;
        }

        vx[i] += ax * dt;
        vy[i] += ay * dt;

        const sp = Math.hypot(vx[i], vy[i]);
        const maxSp = hasT[i] ? 2 + 11 * blend : 2.1;
        if (sp > maxSp) {
          vx[i] = (vx[i] / sp) * maxSp;
          vy[i] = (vy[i] / sp) * maxSp;
        } else if (sp < 0.5 && (!hasT[i] || blend < 0.3)) {
          const a = sp > 0.0001 ? 0.5 / sp : 1;
          vx[i] = sp > 0.0001 ? vx[i] * a : 0.5;
          vy[i] *= a;
        }

        px[i] += vx[i] * dt;
        py[i] += vy[i] * dt;
        if (hasT[i] && blend > 0.9) {
          px[i] += Math.sin(time * 0.004 + i) * 0.12;
          py[i] += Math.cos(time * 0.0035 + i * 1.3) * 0.12;
        }
      }
    };

    const kick = () => {
      for (let i = 0; i < N; i++) {
        const a = Math.random() * TAU;
        const s = 2 + Math.random() * 2.5;
        vx[i] += Math.cos(a) * s;
        vy[i] += Math.sin(a) * s;
      }
    };

    const burst = (x: number, y: number) => {
      for (let i = 0; i < N; i++) {
        const dx = px[i] - x;
        const dy = py[i] - y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        if (d > 340) continue;
        const k = (1 - d / 340) * 10;
        vx[i] += (dx / d) * k;
        vy[i] += (dy / d) * k;
      }
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) {
        running = false;
        return;
      }
      const dtMs = Math.min(50, last ? now - last : 16.7);
      last = now;
      const dt = dtMs / 16.667;
      time += dtMs;

      const c = cfg.current;
      let desired: SwarmPhase;
      if (c.mode === "auto") {
        phaseT += dtMs;
        if (autoPhase === "swarm" && phaseT > c.autoSwarmMs) {
          autoPhase = "rebuild";
          phaseT = 0;
        } else if (autoPhase === "rebuild" && phaseT > c.autoRebuildMs) {
          autoPhase = "swarm";
          phaseT = 0;
        }
        desired = autoPhase;
      } else {
        desired = c.mode;
      }
      if (desired !== phase) {
        phase = desired;
        if (phase === "swarm") kick();
        c.onPhaseChange?.(phase);
      }

      step(dt);
      draw();
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    };

    const snapStatic = () => {
      blend = 1;
      for (let i = 0; i < N; i++) {
        if (hasT[i]) {
          px[i] = tx[i];
          py[i] = ty[i];
        }
      }
      draw();
    };

    const resize = () => {
      const nw = host.clientWidth;
      const nh = host.clientHeight;
      if (!nw || !nh) return;
      w = nw;
      h = nh;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const want =
        cfg.current.count ??
        Math.round(Math.min(w < 640 ? 220 : 380, Math.max(110, (w * h) / cfg.current.density)));
      if (want !== N) allocate(want);
      else {
        for (let i = 0; i < N; i++) {
          px[i] = Math.min(px[i], w);
          py[i] = Math.min(py[i], h);
        }
      }
      computeTargets();
      if (reduced) snapStatic();
    };

    retarget.current = () => {
      computeTargets();
      if (reduced) snapStatic();
    };

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const onDown = (e: PointerEvent) => {
      if (!cfg.current.burstOnClick) return;
      const r = host.getBoundingClientRect();
      burst(e.clientX - r.left, e.clientY - r.top);
    };
    const onVisibility = () => {
      if (!document.hidden) start();
    };

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerdown", onDown);
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(() => resize());
    ro.observe(host);
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible) start();
      },
      { threshold: 0 },
    );
    io.observe(host);

    resize();
    start();

    return () => {
      cancelAnimationFrame(raf);
      running = false;
      retarget.current = null;
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
    />
  );
}
