"use client";
import { useState } from "react";
import { Globe, Copy, Check } from "lucide-react";

const htmlEntities: [RegExp, string][] = [
  [/&/g, "&amp;"], [/</g, "&lt;"], [/>/g, "&gt;"], [/"/g, "&quot;"], [/'/g, "&#39;"],
];

export default function HtmlEncoderPage() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const output = (() => {
    if (!input) return "";
    if (mode === "encode") {
      return htmlEntities.reduce((s, [re, rep]) => s.replace(re, rep), input);
    } else {
      return input.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    }
  })();

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 mb-2"><Globe className="text-primary" /> HTML Encoder / Decoder</h1>
          <p className="text-muted-foreground text-sm">Encode karakter HTML (&lt; &gt; &amp; " ') atau decode entitas HTML kembali ke teks asli.</p>
        </div>
        <div className="flex bg-muted p-1 rounded-xl w-fit mb-6">
          {(["encode", "decode"] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${mode === m ? "bg-white shadow text-primary" : "text-muted-foreground"}`}>{m}</button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Input</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? '<h1 class="title">Hello & World</h1>' : "&lt;h1&gt;Hello &amp; World&lt;/h1&gt;"}
              className="w-full min-h-[350px] p-4 rounded-xl border border-border bg-muted/20 font-mono text-sm resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Output</label>
              {output && <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline">{copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "Copied!" : "Copy"}</button>}
            </div>
            <textarea readOnly value={output} className="w-full min-h-[350px] p-4 rounded-xl border border-border bg-muted/10 font-mono text-sm resize-none outline-none" />
          </div>
        </div>
      </div>
    </main>
  );
}
