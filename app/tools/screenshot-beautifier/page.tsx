"use client";
import { useState, useRef } from "react";
import { Upload, Download } from "lucide-react";

const GRADIENTS = [
  { label: "Sunset", value: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
  { label: "Ocean", value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  { label: "Forest", value: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" },
  { label: "Fire", value: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)" },
  { label: "Night", value: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)" },
  { label: "Rose", value: "linear-gradient(135deg, #f8cdda 0%, #1d2b64 100%)" },
  { label: "Dark", value: "#1a1a2e" },
  { label: "Light", value: "#f8fafc" },
];

const PADDING_OPTIONS = [40, 60, 80, 100, 120];
const RADIUS_OPTIONS = [0, 8, 16, 24, 32];
const SHADOW_OPTIONS = [
  { label: "None", value: "0 0 0 transparent" },
  { label: "Soft", value: "0 20px 60px rgba(0,0,0,0.15)" },
  { label: "Medium", value: "0 30px 80px rgba(0,0,0,0.3)" },
  { label: "Hard", value: "0 40px 100px rgba(0,0,0,0.5)" },
];

export default function ScreenshotBeautifierPage() {
  const [img, setImg] = useState<string | null>(null);
  const [bg, setBg] = useState(GRADIENTS[0].value);
  const [padding, setPadding] = useState(60);
  const [radius, setRadius] = useState(16);
  const [shadow, setShadow] = useState(SHADOW_OPTIONS[2].value);
  const previewRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) =>setImg(e.target!.result as string);
    reader.readAsDataURL(file);
  };

  const download = async () => {
    if (!previewRef.current || !img) return;
    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(previewRef.current, { useCORS: true, scale: 2 });
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "beautified_screenshot.png";
    a.click();
  };

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Screenshot Beautifier</h1>
          <p className="text-muted-foreground text-sm">Percantik screenshot dengan gradient background, shadow, dan border radius elegan.</p>
        </div>

        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) =>e.target.files?.[0] && handleFile(e.target.files[0])} />

        {!img ? (
          <div onClick={() =>inputRef.current?.click()} onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }} onDragOver={(e) =>e.preventDefault()}
            className="border-2 border-dashed border-border rounded-2xl p-16 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
            <Upload className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="font-semibold text-foreground mb-1">Upload screenshot</p>
            <p className="text-sm text-muted-foreground">PNG, JPG, WebP</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-[1fr_240px] gap-6">
            {/* Preview */}
            <div className="space-y-4">
              <div ref={previewRef} className="w-full flex items-center justify-center overflow-hidden rounded-xl" style={{ background: bg, padding }}>
                <img src={img} alt="Screenshot" style={{ borderRadius: radius, boxShadow: shadow, maxWidth: "100%", display: "block" }} />
              </div>
              <button onClick={download} className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">
                <Download size={16} />Download PNG
              </button>
            </div>

            {/* Controls */}
            <div className="space-y-6">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Background</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {GRADIENTS.map((g) => (
                    <button key={g.label} onClick={() =>setBg(g.value)} title={g.label}
                      className={`h-8 rounded-lg border-2 transition-all ${bg === g.value ? "border-primary scale-105" : "border-transparent hover:border-border"}`}
                      style={{ background: g.value }} />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Padding: {padding}px</label>
                <div className="flex gap-1">
                  {PADDING_OPTIONS.map((p) => (
                    <button key={p} onClick={() =>setPadding(p)} className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${padding === p ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>{p}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Border Radius: {radius}px</label>
                <div className="flex gap-1">
                  {RADIUS_OPTIONS.map((r) => (
                    <button key={r} onClick={() =>setRadius(r)} className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${radius === r ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>{r}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Shadow</label>
                <div className="space-y-1">
                  {SHADOW_OPTIONS.map((s) => (
                    <button key={s.label} onClick={() =>setShadow(s.value)}
                      className={`w-full py-2 px-3 rounded-lg text-xs font-semibold text-left transition-all ${shadow === s.value ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{s.label}</button>
                  ))}
                </div>
              </div>

              <button onClick={() => { setImg(null); inputRef.current!.value = ""; }} className="w-full py-2 text-xs text-muted-foreground hover:text-red-500 transition-colors">Ganti Gambar</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
