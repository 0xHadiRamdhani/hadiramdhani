"use client";
import { useState, useRef } from "react";
import { Upload, Download , RotateCw} from "lucide-react";

export default function ImageRotatorPage() {
  const [img, setImg] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => { setImg(e.target!.result as string); setFileName(file.name); setRotation(0); setFlipH(false); setFlipV(false); };
    reader.readAsDataURL(file);
  };

  const exportImage = () => {
    if (!img) return;
    const image = new Image();
    image.onload = () => {
      const rad = (rotation * Math.PI) / 180;
      const absC = Math.abs(Math.cos(rad)), absS = Math.abs(Math.sin(rad));
      const nW = Math.round(image.width * absC + image.height * absS);
      const nH = Math.round(image.width * absS + image.height * absC);
      const canvas = document.createElement("canvas");
      canvas.width = nW; canvas.height = nH;
      const ctx = canvas.getContext("2d")!;
      ctx.translate(nW / 2, nH / 2);
      ctx.rotate(rad);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(image, -image.width / 2, -image.height / 2);
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/jpeg", 0.92);
      a.download = fileName.replace(/\.[^.]+$/, "") + "_rotated.jpg";
      a.click();
    };
    image.src = img;
  };

  const transform = `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`;

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-3">
            <span className="text-primary bg-primary/10 p-2 rounded-xl flex items-center justify-center"><RotateCw size={28} /></span>
            {/* Image Rotator & Flipper */}
            Image Rotator & Flipper
          </h1>
          <p className="text-muted-foreground text-sm">Putar dan balik gambar dengan presisi.</p>
        </div>

        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) =>e.target.files?.[0] && handleFile(e.target.files[0])} />

        {!img ? (
          <div onClick={() =>inputRef.current?.click()} onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }} onDragOver={(e) =>e.preventDefault()}
            className="border-2 border-dashed border-border rounded-2xl p-16 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
            <Upload className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="font-semibold text-foreground mb-1">Upload gambar</p>
            <p className="text-sm text-muted-foreground">atau drag & drop</p>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2 bg-card border border-border rounded-xl p-4">
              <button onClick={() =>setRotation((r) =>r - 90)} className="px-4 py-2 bg-muted rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors"> -90°</button>
              <button onClick={() =>setRotation((r) =>r + 90)} className="px-4 py-2 bg-muted rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors"> +90°</button>
              <button onClick={() =>setFlipH((v) => !v)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${flipH ? "bg-primary text-white" : "bg-muted"}`}>Flip H</button>
              <button onClick={() =>setFlipV((v) => !v)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${flipV ? "bg-primary text-white" : "bg-muted"}`}>Flip V</button>
              <div className="flex items-center gap-2">
                <label className="text-sm text-muted-foreground">Sudut:</label>
                <input type="number" value={rotation} onChange={(e) =>setRotation(+e.target.value)} className="w-20 px-2 py-1.5 border border-border rounded-lg font-mono text-sm outline-none" />
                <span className="text-muted-foreground text-sm">°</span>
              </div>
              <button onClick={() => { setRotation(0); setFlipH(false); setFlipV(false); }} className="px-4 py-2 bg-red-500/10 text-red-500 rounded-xl text-sm font-semibold hover:bg-red-500/20 transition-colors ml-auto">Reset</button>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 flex items-center justify-center min-h-64 overflow-hidden">
              <img src={img} alt="Preview" style={{ transform, transition: "transform 0.3s ease" }} className="max-w-full max-h-64 object-contain" />
            </div>

            <div className="flex gap-2">
              <button onClick={exportImage} className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">
                <Download size={15} />Download Hasil
              </button>
              <button onClick={() => { setImg(null); inputRef.current!.value = ""; }} className="px-4 py-3 bg-muted text-muted-foreground rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors">Ganti Gambar</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
