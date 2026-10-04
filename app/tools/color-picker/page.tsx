"use client";
import { useState, useRef, useCallback } from "react";
import { Upload, Copy, Check , Search} from "lucide-react";

export default function ColorPickerPage() {
  const [img, setImg] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [hovering, setHovering] = useState<string | null>(null);
  const [copied, setCopied] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) =>setImg(e.target!.result as string);
    reader.readAsDataURL(file);
  };

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.round((e.clientY - rect.top) * (canvas.height / rect.height));
    const ctx = canvas.getContext("2d")!;
    const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
    const hex = "#" + [r, g, b].map((v) =>v.toString(16).padStart(2, "0")).join("");
    setColors((prev) => [hex, ...prev.filter((c) =>c !== hex)].slice(0, 20));
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.round((e.clientY - rect.top) * (canvas.height / rect.height));
    const ctx = canvas.getContext("2d")!;
    const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
    setHovering("#" + [r, g, b].map((v) =>v.toString(16).padStart(2, "0")).join(""));
  }, []);

  const onImgLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = e.currentTarget;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext("2d")!.drawImage(img, 0, 0);
  };

  const copy = (val: string) => { navigator.clipboard.writeText(val); setCopied(val); setTimeout(() =>setCopied(""), 2000); };

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-3">
            <span className="text-primary bg-primary/10 p-2 rounded-xl flex items-center justify-center"><Search size={28} /></span>
            {/* Image Color Picker */}
            Image Color Picker
          </h1>
          <p className="text-muted-foreground text-sm">Klik bagian manapun pada gambar untuk mengambil kode warna (HEX).</p>
        </div>

        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) =>e.target.files?.[0] && handleFile(e.target.files[0])} />

        {!img ? (
          <div onClick={() =>inputRef.current?.click()} onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }} onDragOver={(e) =>e.preventDefault()}
            className="border-2 border-dashed border-border rounded-2xl p-16 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
            <Upload className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="font-semibold text-foreground mb-1">Upload gambar</p>
            <p className="text-sm text-muted-foreground">Lalu klik bagian gambar untuk mengambil warna</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-[1fr_220px] gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Klik gambar untuk pick warna</label>
                {hovering && (
                  <span className="flex items-center gap-2 text-sm font-mono font-semibold">
                    <span className="w-5 h-5 rounded border border-border" style={{ background: hovering }} />
                    {hovering}
                  </span>
                )}
              </div>
              <div className="relative overflow-hidden rounded-xl border border-border cursor-crosshair" style={{ maxHeight: 500 }}>
                <img src={img} alt="Source" onLoad={onImgLoad} className="w-full object-contain" style={{ display: "block" }} />
                <canvas ref={canvasRef} onClick={handleCanvasClick} onMouseMove={handleMouseMove}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-crosshair" />
              </div>
              <button onClick={() => { setImg(null); setColors([]); inputRef.current!.value = ""; }}
                className="text-xs text-muted-foreground hover:text-red-500 transition-colors">Ganti gambar</button>
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Warna dipilih ({colors.length})</label>
              {colors.length === 0 ? (
                <div className="text-sm text-muted-foreground p-4 bg-muted/20 rounded-xl text-center">Belum ada warna dipilih</div>
              ) : (
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                  {colors.map((c) => (
                    <div key={c} className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2">
                      <div className="w-8 h-8 rounded-lg border border-border shrink-0" style={{ background: c }} />
                      <code className="font-mono text-sm flex-1">{c}</code>
                      <button onClick={() =>copy(c)} className="text-muted-foreground hover:text-primary">
                        {copied === c ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
