"use client";
import { useState, useRef, useCallback } from "react";
import { Upload, Download } from "lucide-react";

export default function ImageCompressorPage() {
  const [original, setOriginal] = useState<{ src: string; size: number; name: string } | null>(null);
  const [compressed, setCompressed] = useState<{ src: string; size: number } | null>(null);
  const [quality, setQuality] = useState(80);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginal({ src: e.target!.result as string, size: file.size, name: file.name });
      setCompressed(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const compress = () => {
    if (!original) return;
    setProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const src = canvas.toDataURL("image/jpeg", quality / 100);
      const bytes = Math.round((src.length - 22) * 3 / 4);
      setCompressed({ src, size: bytes });
      setProcessing(false);
    };
    img.src = original.src;
  };

  const download = () => {
    if (!compressed || !original) return;
    const a = document.createElement("a");
    a.href = compressed.src;
    a.download = original.name.replace(/\.[^.]+$/, "") + "_compressed.jpg";
    a.click();
  };

  const saved = original && compressed ? Math.round((1 - compressed.size / original.size) * 100) : 0;

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">️ Image Compressor</h1>
          <p className="text-muted-foreground text-sm">Kompres gambar JPEG/PNG langsung di browser tanpa upload ke server manapun.</p>
        </div>

        <input ref={inputRef} type="file" accept="image/*" className="hidden"
          onChange={(e) =>e.target.files?.[0] && handleFile(e.target.files[0])} />

        {!original ? (
          <div
            onClick={() =>inputRef.current?.click()}
            onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }}
            onDragOver={(e) =>e.preventDefault()}
            className="border-2 border-dashed border-border rounded-2xl p-16 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <Upload className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="font-semibold text-foreground mb-1">Drag & drop gambar di sini</p>
            <p className="text-sm text-muted-foreground">atau klik untuk memilih file (JPG, PNG, WebP)</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center p-4 bg-card border border-border rounded-xl">
              <div className="flex-1">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Kualitas: {quality}%</label>
                <input type="range" min={10} max={100} value={quality} onChange={(e) =>setQuality(+e.target.value)} className="w-full" />
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={compress} disabled={processing}
                  className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50">
                  {processing ? "Compressing..." : " Compress"}
                </button>
                <button onClick={() => { setOriginal(null); setCompressed(null); inputRef.current!.value = ""; }}
                  className="px-4 py-2.5 bg-muted text-muted-foreground rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors">Clear
                </button>
              </div>
            </div>

            {compressed && (
              <div className="grid grid-cols-3 gap-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                <div><div className="text-xl font-bold text-foreground">{(original!.size / 1024).toFixed(1)} KB</div><div className="text-xs text-muted-foreground">Original</div></div>
                <div><div className="text-xl font-bold text-green-600">{(compressed.size / 1024).toFixed(1)} KB</div><div className="text-xs text-muted-foreground">Compressed</div></div>
                <div><div className="text-xl font-bold text-green-600">{saved}%</div><div className="text-xs text-muted-foreground">Saved</div></div>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="p-3 border-b border-border text-sm font-semibold text-muted-foreground">Original ({(original.size / 1024).toFixed(1)} KB)</div>
                <img src={original.src} alt="Original" className="w-full object-contain max-h-64" />
              </div>
              {compressed && (
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="p-3 border-b border-border flex items-center justify-between">
                    <span className="text-sm font-semibold text-muted-foreground">Compressed ({(compressed.size / 1024).toFixed(1)} KB)</span>
                    <button onClick={download} className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"><Download size={12} />Download</button>
                  </div>
                  <img src={compressed.src} alt="Compressed" className="w-full object-contain max-h-64" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
