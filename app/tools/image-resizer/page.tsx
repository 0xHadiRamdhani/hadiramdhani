"use client";
import { useState, useRef } from "react";
import { Upload, Download } from "lucide-react";

export default function ImageResizerPage() {
  const [img, setImg] = useState<string | null>(null);
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  const [lock, setLock] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target!.result as string;
      const image = new Image();
      image.onload = () => { setOrigW(image.width); setOrigH(image.height); setW(image.width); setH(image.height); };
      image.src = src;
      setImg(src);
      setFileName(file.name);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const updateW = (v: number) => { setW(v); if (lock && origW) setH(Math.round(v * origH / origW)); };
  const updateH = (v: number) => { setH(v); if (lock && origH) setW(Math.round(v * origW / origH)); };

  const resize = () => {
    if (!img) return;
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d")!.drawImage(image, 0, 0, w, h);
      setResult(canvas.toDataURL("image/jpeg", 0.92));
    };
    image.src = img;
  };

  const download = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = fileName.replace(/\.[^.]+$/, "") + `_${w}x${h}.jpg`;
    a.click();
  };

  const presets = [
    { label: "HD 1280×720", w: 1280, h: 720 },
    { label: "FHD 1920×1080", w: 1920, h: 1080 },
    { label: "Instagram 1080×1080", w: 1080, h: 1080 },
    { label: "Thumbnail 1280×720", w: 1280, h: 720 },
    { label: "4K 3840×2160", w: 3840, h: 2160 },
  ];

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Image Resizer</h1>
          <p className="text-muted-foreground text-sm">Ubah dimensi gambar secara presisi. Tersedia preset populer.</p>
        </div>

        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) =>e.target.files?.[0] && handleFile(e.target.files[0])} />

        {!img ? (
          <div onClick={() =>inputRef.current?.click()} onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }} onDragOver={(e) =>e.preventDefault()}
            className="border-2 border-dashed border-border rounded-2xl p-16 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
            <Upload className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="font-semibold text-foreground mb-1">Upload gambar</p>
            <p className="text-sm text-muted-foreground">atau drag & drop di sini</p>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="text-sm text-muted-foreground">Ukuran asli: <span className="font-mono font-semibold text-foreground">{origW} × {origH}px</span></div>

            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <button key={p.label} onClick={() => { setW(p.w); setH(p.h); setLock(false); }}
                  className="px-3 py-1.5 bg-muted text-xs font-semibold rounded-lg hover:bg-primary/10 hover:text-primary transition-colors">{p.label}</button>
              ))}
            </div>

            <div className="bg-card border border-border rounded-xl p-5 flex flex-wrap gap-4 items-end">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Width (px)</label>
                <input type="number" value={w} onChange={(e) =>updateW(+e.target.value)} className="w-28 px-3 py-2 border border-border rounded-xl font-mono text-sm outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <button onClick={() =>setLock(!lock)} className={`p-2 rounded-xl border text-sm font-bold transition-colors ${lock ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground"}`}>
                {lock ? "" : ""}
              </button>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Height (px)</label>
                <input type="number" value={h} onChange={(e) =>updateH(+e.target.value)} className="w-28 px-3 py-2 border border-border rounded-xl font-mono text-sm outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <button onClick={resize} className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">Resize</button>
              {result && <button onClick={download} className="flex items-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors"><Download size={14} />Download</button>}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="p-3 border-b border-border text-sm font-semibold text-muted-foreground">Original ({origW}×{origH})</div>
                <img src={img} alt="Original" className="w-full object-contain max-h-64" />
              </div>
              {result && (
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="p-3 border-b border-border text-sm font-semibold text-green-600">Resized ({w}×{h})</div>
                  <img src={result} alt="Resized" className="w-full object-contain max-h-64" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
