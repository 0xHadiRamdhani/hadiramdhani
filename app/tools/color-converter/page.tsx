"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}
function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((v) =>v.toString(16).padStart(2, "0")).join("");
}
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function ColorConverterPage() {
  const [hex, setHex] = useState("#3b82f6");
  const [copied, setCopied] = useState("");

  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);

  const copy = (val: string, id: string) => {
    navigator.clipboard.writeText(val);
    setCopied(id);
    setTimeout(() =>setCopied(""), 2000);
  };

  const updateFromRgb = (nr: number, ng: number, nb: number) =>setHex(rgbToHex(nr, ng, nb));

  const formats = [
    { id: "hex", label: "HEX", value: hex },
    { id: "rgb", label: "RGB", value: `rgb(${r}, ${g}, ${b})` },
    { id: "rgba", label: "RGBA", value: `rgba(${r}, ${g}, ${b}, 1)` },
    { id: "hsl", label: "HSL", value: `hsl(${h}, ${s}%, ${l}%)` },
    { id: "css", label: "CSS Variable", value: `--color: ${hex};` },
    { id: "tailwind", label: "Tailwind (closest)", value: `text-[${hex}]` },
  ];

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Color Converter</h1>
          <p className="text-muted-foreground text-sm">Konversi warna antara HEX, RGB, HSL, dan format CSS lainnya.</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-6 items-center mb-6">
            <div className="w-32 h-32 rounded-2xl shadow-lg border border-border shrink-0" style={{ background: hex }} />
            <div className="flex-1 w-full">
              <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Pilih Warna</label>
              <div className="flex gap-3 items-center">
                <input type="color" value={hex} onChange={(e) =>setHex(e.target.value)} className="w-12 h-10 rounded-lg cursor-pointer border border-border" />
                <input type="text" value={hex} onChange={(e) => /^#[0-9a-fA-F]{0,6}$/.test(e.target.value) && setHex(e.target.value)}
                  className="flex-1 px-4 py-2 border border-border rounded-xl font-mono text-sm outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[{ label: "R", val: r, max: 255 }, { label: "G", val: g, max: 255 }, { label: "B", val: b, max: 255 }].map(({ label, val, max }) => (
                  <div key={label}>
                    <label className="text-xs font-bold text-muted-foreground">{label}: {val}</label>
                    <input type="range" min={0} max={max} value={val}
                      onChange={(e) =>updateFromRgb(label === "R" ? +e.target.value : r, label === "G" ? +e.target.value : g, label === "B" ? +e.target.value : b)}
                      className="w-full h-2 rounded cursor-pointer" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {formats.map((f) => (
            <div key={f.id} className="flex items-center justify-between bg-card border border-border rounded-xl p-4">
              <div>
                <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">{f.label}</div>
                <code className="text-sm font-mono text-foreground">{f.value}</code>
              </div>
              <button onClick={() =>copy(f.value, f.id)} className="ml-2 p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary shrink-0">
                {copied === f.id ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
