"use client";
import { useState, useRef } from "react";
import { Upload, Download } from "lucide-react";

const FORMATS = ["image/jpeg", "image/png", "image/webp"] as const;
const FORMAT_LABELS: Record<string, string> = { "image/jpeg": "JPG", "image/png": "PNG", "image/webp": "WebP" };

export default function FormatConverterPage() {
  const [img, setImg] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [targetFormat, setTargetFormat] = useState<string>("image/jpeg");
  const [quality, setQuality] = useState(90);
  const [result, setResult] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => { setImg(e.target!.result as string); setFileName(file.name); setResult(null); };
    reader.readAsDataURL(file);
  };

  const convert = () => {
    if (!img) return;
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      canvas.getContext("2d")!.drawImage(image, 0, 0);
      setResult(canvas.toDataURL(targetFormat, quality / 100));
    };
    image.src = img;
  };

  const download = () => {
    if (!result) return;
    const ext = FORMAT_LABELS[targetFormat].toLowerCase();
    const a = document.createElement("a");
    a.href = result;
    a.download = fileName.replace(/\.[^.]+$/, "") + "." + ext;
    a.click();
  };

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">🔄 Image Format Converter</h1>
          <p className="text-muted-foreground text-sm">Konversi gambar antara JPG, PNG, dan WebP di browser.</p>
        </div>

        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />

        {!img ? (
          <div onClick={() => inputRef.current?.click()} onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }} onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-border rounded-2xl p-16 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
            <Upload className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="font-semibold text-foreground mb-1">Drag & drop gambar di sini</p>
            <p className="text-sm text-muted-foreground">JPG, PNG, WebP, GIF, AVIF</p>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row gap-4 items-center">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Format Target</label>
                <div className="flex gap-2">
                  {FORMATS.map((f) => (
                    <button key={f} onClick={() => setTargetFormat(f)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${targetFormat === f ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
                      {FORMAT_LABELS[f]}
                    </button>
                  ))}
                </div>
              </div>
              {targetFormat !== "image/png" && (
                <div className="flex-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Kualitas: {quality}%</label>
                  <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(+e.target.value)} className="w-full" />
                </div>
              )}
              <div className="flex gap-2 shrink-0">
                <button onClick={convert} className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">Convert</button>
                <button onClick={() => { setImg(null); setResult(null); inputRef.current!.value = ""; }}
                  className="px-4 py-2.5 bg-muted text-muted-foreground rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors">Clear</button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="p-3 border-b border-border text-sm font-semibold text-muted-foreground">Original</div>
                <img src={img} alt="Original" className="w-full object-contain max-h-64" />
              </div>
              {result && (
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="p-3 border-b border-border flex items-center justify-between">
                    <span className="text-sm font-semibold text-green-600">✅ {FORMAT_LABELS[targetFormat]} Result</span>
                    <button onClick={download} className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"><Download size={12} /> Download</button>
                  </div>
                  <img src={result} alt="Converted" className="w-full object-contain max-h-64" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
