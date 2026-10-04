"use client";
import { useState, useRef } from "react";
import { Upload, Copy, Check } from "lucide-react";

function extractColors(canvas: HTMLCanvasElement, count = 12): string[] {
  const ctx = canvas.getContext("2d")!;
  const { width, height } = canvas;
  const step = Math.max(1, Math.floor(Math.sqrt((width * height) / (count * 100))));
  const data = ctx.getImageData(0, 0, width, height).data;
  const buckets: Record<string, number> = {};

  for (let i = 0; i < data.length; i += 4 * step) {
    const r = Math.round(data[i] / 32) * 32;
    const g = Math.round(data[i + 1] / 32) * 32;
    const b = Math.round(data[i + 2] / 32) * 32;
    if (data[i + 3] < 128) continue;
    const key = `${r},${g},${b}`;
    buckets[key] = (buckets[key] || 0) + 1;
  }

  return Object.entries(buckets)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([key]) => {
      const [r, g, b] = key.split(",").map(Number);
      return "#" + [r, g, b].map((v) => Math.min(255, v).toString(16).padStart(2, "0")).join("");
    });
}

export default function PaletteGenPage() {
  const [img, setImg] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[]>([]);
  const [copied, setCopied] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => { setImg(e.target!.result as string); setPalette([]); };
    reader.readAsDataURL(file);
  };

  const onImgLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const canvas = canvasRef.current!;
    const image = e.currentTarget;
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    canvas.getContext("2d")!.drawImage(image, 0, 0);
    setPalette(extractColors(canvas));
  };

  const copy = (val: string) => { navigator.clipboard.writeText(val); setCopied(val); setTimeout(() => setCopied(""), 2000); };
  const copyAll = () => { navigator.clipboard.writeText(palette.join(", ")); setCopied("all"); setTimeout(() => setCopied(""), 2000); };

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">🌈 Image Palette Generator</h1>
          <p className="text-muted-foreground text-sm">Ekstrak palet warna dominan dari gambar apapun secara otomatis.</p>
        </div>

        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        <canvas ref={canvasRef} className="hidden" />

        {!img ? (
          <div onClick={() => inputRef.current?.click()} onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }} onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-border rounded-2xl p-16 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
            <Upload className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="font-semibold text-foreground mb-1">Upload gambar</p>
            <p className="text-sm text-muted-foreground">Palet warna akan diekstrak otomatis</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <img src={img} alt="Source" onLoad={onImgLoad} className="w-full rounded-xl border border-border object-contain max-h-80" />
              <button onClick={() => { setImg(null); setPalette([]); inputRef.current!.value = ""; }}
                className="text-xs text-muted-foreground hover:text-red-500 transition-colors">Ganti gambar</button>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-foreground">Palet Warna ({palette.length})</h2>
                {palette.length > 0 && (
                  <button onClick={copyAll} className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline">
                    {copied === "all" ? <Check size={12} /> : <Copy size={12} />} Copy All
                  </button>
                )}
              </div>

              {/* Color swatches row */}
              <div className="flex mb-4 rounded-xl overflow-hidden h-12">
                {palette.map((c) => <div key={c} className="flex-1 cursor-pointer hover:flex-[2] transition-all duration-300" style={{ background: c }} onClick={() => copy(c)} title={c} />)}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {palette.map((c) => (
                  <div key={c} className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2 group">
                    <div className="w-7 h-7 rounded-lg border border-border shrink-0" style={{ background: c }} />
                    <code className="font-mono text-xs flex-1">{c}</code>
                    <button onClick={() => copy(c)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary transition-all">
                      {copied === c ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
