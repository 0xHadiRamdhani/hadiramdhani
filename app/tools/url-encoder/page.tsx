"use client";
import { useState, useRef, useCallback } from "react";
import { Link2, Copy, Check } from "lucide-react";

export default function UrlEncoderPage() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const output = (() => {
    if (!input) return "";
    try {
      return mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input);
    } catch { return "️ Input tidak valid"; }
  })();

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 mb-2"><Link2 className="text-primary" />URL Encoder / Decoder
          </h1>
          <p className="text-muted-foreground text-sm">Encode karakter spesial URL atau decode URL yang sudah ter-encode.</p>
        </div>
        <div className="flex bg-muted p-1 rounded-xl w-fit mb-6">
          {(["encode", "decode"] as const).map((m) => (
            <button key={m} onClick={() =>setMode(m)} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${mode === m ? "bg-white shadow text-primary" : "text-muted-foreground"}`}>{m}</button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Input</label>
            <textarea value={input} onChange={(e) =>setInput(e.target.value)} placeholder={mode === "encode" ? "https://example.com/path?name=Hadi Ramdhani" : "https%3A%2F%2Fexample.com"}
              className="w-full min-h-[350px] p-4 rounded-xl border border-border bg-muted/20 font-mono text-sm resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Output</label>
              {output && <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() =>setCopied(false), 2000); }} className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline">{copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "Copied!" : "Copy"}</button>}
            </div>
            <textarea readOnly value={output} className="w-full min-h-[350px] p-4 rounded-xl border border-border bg-muted/10 font-mono text-sm resize-none outline-none" />
          </div>
        </div>
      </div>
    </main>
  );
}
