"use client";
import { useState } from "react";

export default function DiffCheckerPage() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const diff = (() => {
    if (!left && !right) return [];
    const leftLines = left.split("\n");
    const rightLines = right.split("\n");
    const maxLen = Math.max(leftLines.length, rightLines.length);
    return Array.from({ length: maxLen }, (_, i) => {
      const l = leftLines[i] ?? "";
      const r = rightLines[i] ?? "";
      return { line: i + 1, left: l, right: r, changed: l !== r };
    });
  })();

  const changes = diff.filter((d) =>d.changed).length;

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Text Diff Checker</h1>
          <p className="text-muted-foreground text-sm">Bandingkan dua teks baris per baris dan temukan perbedaannya.</p>
        </div>

        {changes > 0 && (
          <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-600 text-sm font-semibold">
            ️ {changes} baris berbeda ditemukan
          </div>
        )}
        {diff.length > 0 && changes === 0 && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 text-sm font-semibold">Kedua teks identik!
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Teks A (Original)</label>
            <textarea value={left} onChange={(e) =>setLeft(e.target.value)} placeholder="Teks asli di sini..."
              className="w-full min-h-[250px] p-4 rounded-xl border border-border bg-muted/20 font-mono text-sm resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Teks B (Modified)</label>
            <textarea value={right} onChange={(e) =>setRight(e.target.value)} placeholder="Teks yang diubah di sini..."
              className="w-full min-h-[250px] p-4 rounded-xl border border-border bg-muted/20 font-mono text-sm resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
          </div>
        </div>

        {diff.length > 0 && (
          <div className="border border-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-[2rem_1fr_1fr] bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <div className="p-3 text-center">#</div>
              <div className="p-3 border-l border-border">Teks A</div>
              <div className="p-3 border-l border-border">Teks B</div>
            </div>
            <div className="divide-y divide-border/50 max-h-[400px] overflow-y-auto">
              {diff.map((row) => (
                <div key={row.line} className={`grid grid-cols-[2rem_1fr_1fr] text-sm ${row.changed ? "bg-amber-50" : ""}`}>
                  <div className="p-2 text-center text-xs text-muted-foreground font-mono border-r border-border/50">{row.line}</div>
                  <div className={`p-2 font-mono text-xs border-r border-border/50 whitespace-pre-wrap break-all ${row.changed ? "bg-red-100 text-red-800" : ""}`}>{row.left || "\u00A0"}</div>
                  <div className={`p-2 font-mono text-xs whitespace-pre-wrap break-all ${row.changed ? "bg-green-100 text-green-800" : ""}`}>{row.right || "\u00A0"}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
