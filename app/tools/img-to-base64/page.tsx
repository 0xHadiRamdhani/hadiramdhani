"use client";
import { useState, useRef } from "react";
import { Upload, Copy, Check } from "lucide-react";

export default function ImgToBase64Page() {
  const [result, setResult] = useState<{ base64: string; mimeType: string; size: number } | null>(null);
  const [copied, setCopied] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target!.result as string;
      setResult({ base64, mimeType: file.type, size: file.size });
    };
    reader.readAsDataURL(file);
  };

  const copy = (val: string, id: string) => { navigator.clipboard.writeText(val); setCopied(id); setTimeout(() =>setCopied(""), 2000); };

  const dataUrl = result?.base64 ?? "";
  const pureBase64 = dataUrl.split(",")[1] ?? "";

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Image  Base64</h1>
          <p className="text-muted-foreground text-sm">Konversi gambar ke string Base64 untuk digunakan di HTML, CSS, atau API.</p>
        </div>

        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) =>e.target.files?.[0] && handleFile(e.target.files[0])} />

        <div onClick={() =>inputRef.current?.click()} onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }} onDragOver={(e) =>e.preventDefault()}
          className="border-2 border-dashed border-border rounded-2xl p-10 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all mb-6">
          <Upload className="mx-auto mb-3 text-muted-foreground" size={36} />
          <p className="font-semibold text-foreground">Upload gambar</p>
          <p className="text-sm text-muted-foreground">PNG, JPG, WebP, SVG</p>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl text-center text-sm">
              <div><div className="font-bold">{result.mimeType}</div><div className="text-xs text-muted-foreground">Format</div></div>
              <div><div className="font-bold">{(result.size / 1024).toFixed(1)} KB</div><div className="text-xs text-muted-foreground">File Size</div></div>
              <div><div className="font-bold">{Math.round(dataUrl.length / 1024)} KB</div><div className="text-xs text-muted-foreground">Base64 Size</div></div>
            </div>

            {[
              { id: "dataurl", label: "Data URL (src-ready)", val: dataUrl },
              { id: "base64", label: "Pure Base64 (no prefix)", val: pureBase64 },
              { id: "img-tag", label: "HTML <img>Tag", val: `<img src="${dataUrl}" alt="image" />` },
              { id: "css-bg", label: "CSS background-image", val: `background-image: url('${dataUrl}');` },
            ].map((row) => (
              <div key={row.id} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{row.label}</span>
                  <button onClick={() =>copy(row.val, row.id)} className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline">
                    {copied === row.id ? <Check size={12} /> : <Copy size={12} />} {copied === row.id ? "Copied!" : "Copy"}
                  </button>
                </div>
                <code className="text-xs font-mono break-all text-muted-foreground">{row.val.slice(0, 120)}...</code>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
