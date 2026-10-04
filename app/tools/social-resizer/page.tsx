"use client";
import { useState, useRef, useCallback } from "react";
import { Upload, Download } from "lucide-react";

const PRESETS = [
  { id: "ig-square", label: "Instagram Post", w: 1080, h: 1080 },
  { id: "ig-portrait", label: "Instagram Portrait", w: 1080, h: 1350 },
  { id: "ig-story", label: "Instagram Story", w: 1080, h: 1920 },
  { id: "yt-thumb", label: "YouTube Thumbnail", w: 1280, h: 720 },
  { id: "yt-banner", label: "YouTube Banner", w: 2560, h: 1440 },
  { id: "tiktok", label: "TikTok Cover", w: 1080, h: 1920 },
  { id: "fb", label: "Facebook Cover", w: 820, h: 312 },
  { id: "linkedin", label: "LinkedIn Banner", w: 1584, h: 396 },
  { id: "twitter", label: "Twitter Header", w: 1500, h: 500 },
  { id: "profile", label: "Profile Picture", w: 400, h: 400 },
];

export default function SocialResizerPage() {
  const [img, setImg] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [results, setResults] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => { setImg(e.target!.result as string); setFileName(file.name); setResults({}); };
    reader.readAsDataURL(file);
  };

  const processAll = () => {
    if (!img) return;
    setProcessing(true);
    const image = new Image();
    image.onload = () => {
      const res: Record<string, string> = {};
      PRESETS.forEach((preset) => {
        const canvas = document.createElement("canvas");
        canvas.width = preset.w; canvas.height = preset.h;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, preset.w, preset.h);
        const scale = Math.max(preset.w / image.width, preset.h / image.height);
        const dw = image.width * scale, dh = image.height * scale;
        ctx.drawImage(image, (preset.w - dw) / 2, (preset.h - dh) / 2, dw, dh);
        res[preset.id] = canvas.toDataURL("image/jpeg", 0.92);
      });
      setResults(res);
      setProcessing(false);
    };
    image.src = img;
  };

  const download = (id: string, label: string) => {
    const a = document.createElement("a");
    a.href = results[id];
    a.download = label.replace(/\s+/g, "_") + ".jpg";
    a.click();
  };

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Social Media Resizer</h1>
          <p className="text-muted-foreground text-sm">Upload satu gambar  dapatkan semua ukuran media sosial sekaligus.</p>
        </div>

        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) =>e.target.files?.[0] && handleFile(e.target.files[0])} />

        {!img ? (
          <div onClick={() =>inputRef.current?.click()} onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }} onDragOver={(e) =>e.preventDefault()}
            className="border-2 border-dashed border-border rounded-2xl p-16 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
            <Upload className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="font-semibold text-foreground mb-1">Upload satu gambar</p>
            <p className="text-sm text-muted-foreground">Akan di-resize ke {PRESETS.length} format sosmed sekaligus</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-card border border-border rounded-xl p-4">
              <img src={img} alt="Source" className="w-20 h-20 object-cover rounded-lg border border-border" />
              <div className="flex-1">
                <p className="font-semibold text-foreground mb-1">{fileName}</p>
                <p className="text-sm text-muted-foreground">Siap diproses ke {PRESETS.length} format</p>
              </div>
              <div className="flex gap-2">
                <button onClick={processAll} disabled={processing}
                  className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors">
                  {processing ? "Processing..." : " Generate All"}
                </button>
                <button onClick={() => { setImg(null); setResults({}); inputRef.current!.value = ""; }}
                  className="px-4 py-2.5 bg-muted text-muted-foreground rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors">Clear</button>
              </div>
            </div>

            {Object.keys(results).length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {PRESETS.map((preset) =>results[preset.id] && (
                  <div key={preset.id} className="bg-card border border-border rounded-xl overflow-hidden group">
                    <div className="relative overflow-hidden bg-muted/20" style={{ aspectRatio: `${preset.w}/${Math.min(preset.h, preset.w * 1.5)}` }}>
                      <img src={results[preset.id]} alt={preset.label} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-semibold text-foreground mb-0.5">{preset.label}</p>
                      <p className="text-xs text-muted-foreground mb-2">{preset.w}×{preset.h}px</p>
                      <button onClick={() =>download(preset.id, preset.label)}
                        className="flex items-center justify-center gap-1.5 w-full py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-xs font-semibold transition-colors">
                        <Download size={12} />Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
