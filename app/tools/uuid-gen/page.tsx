"use client";
import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export default function UuidGenPage() {
  const [uuids, setUuids] = useState<string[]>([uuidv4()]);
  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState<string>("");

  const generate = () =>setUuids(Array.from({ length: count }, uuidv4));

  const copy = (val: string) => { navigator.clipboard.writeText(val); setCopied(val); setTimeout(() =>setCopied(""), 2000); };
  const copyAll = () => { navigator.clipboard.writeText(uuids.join("\n")); setCopied("all"); setTimeout(() =>setCopied(""), 2000); };

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">UUID Generator</h1>
          <p className="text-muted-foreground text-sm">Generate UUID v4 secara acak. Aman digunakan sebagai ID unik.</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-muted-foreground">Jumlah UUID:</label>
              <input type="number" min={1} max={50} value={count} onChange={(e) =>setCount(Math.max(1, Math.min(50, +e.target.value)))}
                className="w-20 px-3 py-2 border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <button onClick={generate} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">
              <RefreshCw size={15} />Generate
            </button>
            {uuids.length > 1 && (
              <button onClick={copyAll} className="flex items-center gap-2 px-4 py-2.5 bg-muted text-foreground rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors ml-auto">
                {copied === "all" ? <Check size={15} className="text-green-500" /> : <Copy size={15} />} Copy All
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {uuids.map((u, i) => (
            <div key={i} className="flex items-center justify-between bg-card border border-border rounded-xl px-5 py-3 group">
              <code className="font-mono text-sm text-foreground">{u}</code>
              <button onClick={() =>copy(u)} className="ml-4 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted transition-all text-muted-foreground hover:text-primary">
                {copied === u ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
