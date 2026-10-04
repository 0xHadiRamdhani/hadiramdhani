"use client";
import { useState } from "react";
import { Binary, Copy, Check, ArrowLeftRight } from "lucide-react";

export default function Base64ToolPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const process = (val: string, m: "encode" | "decode") => {
    setInput(val);
    setError("");
    try {
      if (!val) { setOutput(""); return; }
      setOutput(m === "encode" ? btoa(unescape(encodeURIComponent(val))) : decodeURIComponent(escape(atob(val))));
    } catch { setError("Input tidak valid untuk mode " + m); setOutput(""); }
  };

  const swap = () => {
    const newMode = mode === "encode" ? "decode" : "encode";
    setMode(newMode);
    process(output, newMode);
  };

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 mb-2"><Binary className="text-primary" />Base64 Encoder / Decoder
          </h1>
          <p className="text-muted-foreground text-sm">Encode teks ke Base64 atau decode Base64 kembali ke teks asli.</p>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex bg-muted p-1 rounded-xl">
            {(["encode", "decode"] as const).map((m) => (
              <button key={m} onClick={() => { setMode(m); process(input, m); }}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${mode === m ? "bg-white shadow text-primary" : "text-muted-foreground"}`}>
                {m}
              </button>
            ))}
          </div>
          <button onClick={swap} className="flex items-center gap-2 px-4 py-2 bg-muted rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors">
            <ArrowLeftRight size={15} />Swap
          </button>
        </div>

        {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">️ {error}</div>}

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {mode === "encode" ? "Teks Biasa (Input)" : "Base64 (Input)"}
            </label>
            <textarea value={input} onChange={(e) =>process(e.target.value, mode)}
              placeholder={mode === "encode" ? "Masukkan teks di sini..." : "Masukkan string Base64 di sini..."}
              className="w-full min-h-[400px] p-4 rounded-xl border border-border bg-muted/20 font-mono text-sm resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {mode === "encode" ? "Base64 (Output)" : "Teks Biasa (Output)"}
              </label>
              {output && (
                <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() =>setCopied(false), 2000); }}
                  className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline">
                  {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
            <textarea readOnly value={output} placeholder="Output akan muncul di sini..."
              className="w-full min-h-[400px] p-4 rounded-xl border border-border bg-muted/10 font-mono text-sm resize-none outline-none" />
          </div>
        </div>
      </div>
    </main>
  );
}
