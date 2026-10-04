"use client";
import { useState } from "react";
import { Type } from "lucide-react";

export default function TextCounterPage() {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const sentences = text.split(/[.!?]+/).filter(Boolean).length;
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length;
  const readTime = Math.max(1, Math.ceil(words / 200));

  const stats = [
    { label: "Words", value: words, color: "text-primary", bg: "bg-primary/5 border-primary/20" },
    { label: "Characters", value: chars, color: "text-blue-500", bg: "bg-blue-500/5 border-blue-500/20" },
    { label: "No Spaces", value: charsNoSpace, color: "text-green-500", bg: "bg-green-500/5 border-green-500/20" },
    { label: "Sentences", value: sentences, color: "text-purple-500", bg: "bg-purple-500/5 border-purple-500/20" },
    { label: "Paragraphs", value: paragraphs, color: "text-orange-500", bg: "bg-orange-500/5 border-orange-500/20" },
    { label: "Read Time", value: readTime + " min", color: "text-rose-500", bg: "bg-rose-500/5 border-rose-500/20" },
  ];

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 mb-2">
            <Type className="text-primary" /> Text & Word Counter
          </h1>
          <p className="text-muted-foreground text-sm">Analisis teks secara real-time: kata, karakter, kalimat, dan estimasi waktu baca.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {stats.map((s) => (
            <div key={s.label} className={`border rounded-xl p-4 text-center ${s.bg}`}>
              <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Teks Kamu</label>
            <button onClick={() => setText("")} className="text-xs text-red-500 hover:underline font-semibold">Clear</button>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ketik atau paste teks di sini... Statistik diperbarui secara real-time."
            className="w-full min-h-[400px] p-4 rounded-xl border border-border bg-muted/20 text-sm resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all leading-relaxed"
          />
        </div>
      </div>
    </main>
  );
}
