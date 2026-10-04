"use client";
import { useState } from "react";
import { Download } from "lucide-react";

export default function Base64ToImgPage() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const dataUrl = (() => {
    const trimmed = input.trim();
    if (!trimmed) return "";
    if (trimmed.startsWith("data:image")) return trimmed;
    // Try wrapping as JPEG
    return `data:image/jpeg;base64,${trimmed}`;
  })();

  const isValid = (() => {
    if (!dataUrl) return false;
    try { atob(dataUrl.split(",")[1] ?? ""); return true; } catch { return false; }
  })();

  const download = () => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "image_from_base64.jpg";
    a.click();
  };

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">🖼️ Base64 → Image</h1>
          <p className="text-muted-foreground text-sm">Paste string Base64 dan preview langsung sebagai gambar.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Input Base64</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Paste Data URL atau string Base64 murni di sini..."
              className="w-full min-h-[400px] p-4 rounded-xl border border-border bg-muted/20 font-mono text-xs resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Preview</label>
              {isValid && (
                <button onClick={download} className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"><Download size={12} /> Download</button>
              )}
            </div>
            <div className="w-full min-h-[400px] rounded-xl border border-border bg-muted/10 flex items-center justify-center overflow-hidden">
              {isValid ? (
                <img src={dataUrl} alt="Preview" className="max-w-full max-h-96 object-contain" />
              ) : input ? (
                <p className="text-red-500 text-sm font-medium p-4 text-center">⚠️ Base64 tidak valid atau format tidak didukung</p>
              ) : (
                <p className="text-muted-foreground text-sm">Preview gambar akan muncul di sini</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
