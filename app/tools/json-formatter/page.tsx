"use client";
import { useState } from "react";
import { Braces, RefreshCw, Copy, Check, Trash2, ArrowDownUp , FileJson} from "lucide-react";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() =>setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 mb-2"><Braces className="text-primary" />JSON Formatter & Validator
          </h1>
          <p className="text-muted-foreground text-sm">Format, minify, dan validasi JSON. Semua berjalan di browser.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <button onClick={format} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">
            <RefreshCw size={15} />Format
          </button>
          <button onClick={minify} className="flex items-center gap-2 px-4 py-2.5 bg-muted text-foreground rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors">
            <ArrowDownUp size={15} />Minify
          </button>
          <select value={indent} onChange={(e) =>setIndent(+e.target.value)} className="px-3 py-2 bg-card border border-border rounded-xl text-sm outline-none">
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={1}>1 tab</option>
          </select>
          <button onClick={() => { setInput(""); setOutput(""); setError(""); }} className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-500 rounded-xl text-sm font-semibold hover:bg-red-500/20 transition-colors ml-auto">
            <Trash2 size={15} />Clear
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-mono">
            ️ {error}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Input</label>
            <textarea
              value={input}
              onChange={(e) =>setInput(e.target.value)}
              placeholder={'{\n  "name": "Hadi",\n  "role": "Software Engineer"\n}'}
              className="w-full min-h-[500px] p-4 rounded-xl border border-border bg-muted/20 font-mono text-sm resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Output</label>
              {output && (
                <button onClick={copy} className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline">
                  {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
            <textarea
              readOnly
              value={output}
              placeholder="Output JSON akan muncul di sini..."
              className="w-full min-h-[500px] p-4 rounded-xl border border-border bg-muted/10 font-mono text-sm resize-none outline-none text-foreground"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
