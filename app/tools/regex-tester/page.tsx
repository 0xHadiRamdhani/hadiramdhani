"use client";
import { useState } from "react";
import { Search } from "lucide-react";

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");

  const { matches, error, highlighted } = (() => {
    if (!pattern || !text) return { matches: [], error: "", highlighted: text };
    try {
      const re = new RegExp(pattern, flags);
      const m: string[] = [];
      let match;
      const gRe = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      while ((match = gRe.exec(text)) !== null) {
        m.push(match[0]);
        if (!flags.includes("g")) break;
      }
      const hRe = new RegExp(`(${pattern})`, flags.includes("g") ? flags : flags + "g");
      const highlighted = text.replace(hRe, '<mark class="bg-yellow-300 text-yellow-900 rounded px-0.5">$1</mark>');
      return { matches: m, error: "", highlighted };
    } catch (e: any) {
      return { matches: [], error: e.message, highlighted: text };
    }
  })();

  const allFlags = ["g", "i", "m", "s"];

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 mb-2"><Search className="text-primary" /> Regex Tester</h1>
          <p className="text-muted-foreground text-sm">Test dan debug Regular Expression secara real-time dengan highlight match.</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mb-4 flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Pattern</label>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground font-mono">/</span>
              <input value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="[a-z]+" className="flex-1 bg-transparent font-mono text-sm outline-none" />
              <span className="text-muted-foreground font-mono">/</span>
              <span className="font-mono text-primary text-sm">{flags}</span>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Flags</label>
            <div className="flex gap-1">
              {allFlags.map((f) => (
                <button key={f} onClick={() => setFlags(prev => prev.includes(f) ? prev.replace(f, "") : prev + f)}
                  className={`w-8 h-8 rounded-lg font-mono text-sm font-bold transition-colors ${flags.includes(f) ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>{f}</button>
              ))}
            </div>
          </div>
        </div>

        {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">⚠️ {error}</div>}

        {matches.length > 0 && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
            <span className="text-green-600 font-semibold text-sm">{matches.length} match{matches.length > 1 ? "es" : ""} ditemukan: </span>
            <span className="font-mono text-sm text-foreground">{matches.map((m, i) => <mark key={i} className="bg-yellow-200 rounded px-1 mx-0.5">"{m}"</mark>)}</span>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Teks Test</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Masukkan teks untuk ditest dengan regex..."
              className="w-full min-h-[300px] p-4 rounded-xl border border-border bg-muted/20 font-mono text-sm resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Preview (dengan highlight)</label>
            <div
              className="w-full min-h-[300px] p-4 rounded-xl border border-border bg-muted/10 font-mono text-sm whitespace-pre-wrap break-all leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlighted || '<span class="text-muted-foreground">Highlight akan muncul di sini...</span>' }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
