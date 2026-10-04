"use client";
import { useState, useRef } from "react";
import { Upload, Download } from "lucide-react";

export default function IgPostResizerPage() {
  const [img, setImg] = useState<string | null>(null);
  const [ratio, setRatio] = useState<[number, number, string]>([1080, 1080, "Square 1:1"]);
  const [result, setResult] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const ratios: [number, number, string][] = [
    [1080, 1080, "Square 1:1"],
    [1080, 1350, "Portrait 4:5"],
    [1080, 566, "Landscape 1.91:1"],
  ];

  const process = () => {
    if (!img) return;
    const image = new Image();
    image.onload = () => {
      const [w, h] = ratio;
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, w, h);
      const scale = Math.max(w / image.width, h / image.height);
      const dw = image.width * scale, dh = image.height * scale;
      ctx.drawImage(image, (w - dw) / 2, (h - dh) / 2, dw, dh);
      setResult(canvas.toDataURL("image/jpeg", 0.95));
    };
    image.src = img;
  };

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">📸 Instagram Post Resizer</h1>
          <p className="text-muted-foreground text-sm">Resize foto ke format Instagram yang tepat: Square, Portrait, atau Landscape.</p>
        </div>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && (setImg(URL.createObjectURL(e.target.files[0])), setResult(null))} />
        {!img ? (
          <div onClick={() => inputRef.current?.click()} onDrop={(e) => { e.preventDefault(); setImg(URL.createObjectURL(e.dataTransfer.files[0])); setResult(null); }} onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-border rounded-2xl p-16 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
            <Upload className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="font-semibold text-foreground">Upload foto</p>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {ratios.map((r) => (
                <button key={r[2]} onClick={() => { setRatio(r); setResult(null); }}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${JSON.stringify(ratio) === JSON.stringify(r) ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                  {r[2]} ({r[0]}×{r[1]})
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={process} className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90">Resize</button>
              {result && <a href={result} download="instagram_post.jpg" className="flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600"><Download size={14} /> Download</a>}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-border rounded-xl overflow-hidden"><div className="p-2 text-xs text-muted-foreground border-b border-border">Original</div><img src={img} className="w-full object-contain max-h-64" /></div>
              {result && <div className="border border-border rounded-xl overflow-hidden"><div className="p-2 text-xs text-green-600 border-b border-border font-semibold">✅ {ratio[2]}</div><img src={result} className="w-full object-contain max-h-64" /></div>}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
