"use client";
import { useState } from "react";
import { Copy, Check, Zap } from "lucide-react";

function minifyCSS(css: string) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "") // comments
    .replace(/\s+/g, " ")
    .replace(/\s*{\s*/g, "{")
    .replace(/\s*}\s*/g, "}")
    .replace(/\s*:\s*/g, ":")
    .replace(/\s*;\s*/g, ";")
    .replace(/;\s*}/g, "}")
    .replace(/\s*,\s*/g, ",")
    .trim();
}

export default function CssMinifierPage() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const output = minifyCSS(input);
  const saved = input.length > 0 ? Math.round((1 - output.length / input.length) * 100) : 0;

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 mb-2"><Zap className="text-primary" /> CSS Minifier</h1>
          <p className="text-muted-foreground text-sm">Minify CSS untuk mengurangi ukuran file dan meningkatkan performa loading.</p>
        </div>

        {input && output && (
          <div className="flex gap-6 mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
            <div className="text-center"><div className="text-2xl font-bold text-green-600">{input.length}</div><div className="text-xs text-muted-foreground">Original (bytes)</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-green-600">{output.length}</div><div className="text-xs text-muted-foreground">Minified (bytes)</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-green-600">{saved}%</div><div className="text-xs text-muted-foreground">Saved</div></div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">CSS Input</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)}
              placeholder={`.container {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}`}
              className="w-full min-h-[450px] p-4 rounded-xl border border-border bg-muted/20 font-mono text-sm resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Minified Output</label>
              {output && <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline">{copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "Copied!" : "Copy"}</button>}
            </div>
            <textarea readOnly value={output} className="w-full min-h-[450px] p-4 rounded-xl border border-border bg-muted/10 font-mono text-sm resize-none outline-none" />
          </div>
        </div>
      </div>
    </main>
  );
}
