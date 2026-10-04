"use client";
import { useState } from "react";
import { Clock, Copy, Check } from "lucide-react";

export default function TimestampConverterPage() {
  const [unix, setUnix] = useState(Math.floor(Date.now() / 1000).toString());
  const [dateStr, setDateStr] = useState(new Date().toISOString().slice(0, 16));
  const [copied, setCopied] = useState("");

  const copy = (val: string, id: string) => { navigator.clipboard.writeText(val); setCopied(id); setTimeout(() => setCopied(""), 2000); };

  const fromUnix = (() => {
    try {
      const d = new Date(parseInt(unix) * 1000);
      return {
        local: d.toLocaleString("id-ID"),
        utc: d.toUTCString(),
        iso: d.toISOString(),
        relative: (() => {
          const s = Math.abs(Math.floor(Date.now() / 1000) - parseInt(unix));
          if (s < 60) return s + " detik lalu";
          if (s < 3600) return Math.floor(s / 60) + " menit lalu";
          if (s < 86400) return Math.floor(s / 3600) + " jam lalu";
          return Math.floor(s / 86400) + " hari lalu";
        })(),
      };
    } catch { return null; }
  })();

  const fromDate = (() => {
    try { return Math.floor(new Date(dateStr).getTime() / 1000).toString(); }
    catch { return ""; }
  })();

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 mb-2"><Clock className="text-primary" /> Timestamp Converter</h1>
          <p className="text-muted-foreground text-sm">Konversi Unix timestamp ke tanggal/waktu dan sebaliknya.</p>
        </div>

        <div className="text-center mb-4 p-3 bg-primary/5 border border-primary/20 rounded-xl text-sm text-muted-foreground">
          ⏰ Waktu sekarang: <span className="font-mono font-semibold text-foreground">{Math.floor(Date.now() / 1000)}</span>
          <button onClick={() => setUnix(Math.floor(Date.now() / 1000).toString())} className="ml-2 text-primary text-xs hover:underline">(Pakai sekarang)</button>
        </div>

        <div className="grid gap-4">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-semibold text-foreground mb-4">Unix Timestamp → Tanggal</h2>
            <input type="number" value={unix} onChange={(e) => setUnix(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl font-mono text-sm outline-none focus:ring-2 focus:ring-primary/20 mb-4" />
            {fromUnix && (
              <div className="space-y-2">
                {[{ label: "Lokal (ID)", val: fromUnix.local }, { label: "UTC", val: fromUnix.utc }, { label: "ISO 8601", val: fromUnix.iso }, { label: "Relatif", val: fromUnix.relative }].map((row) => (
                  <div key={row.label} className="flex items-center justify-between bg-muted/30 rounded-xl px-4 py-3">
                    <div><span className="text-xs text-muted-foreground">{row.label}: </span><span className="font-mono text-sm">{row.val}</span></div>
                    <button onClick={() => copy(row.val, row.label)} className="ml-2 text-muted-foreground hover:text-primary"><Check size={14} className={copied === row.label ? "text-green-500" : "hidden"} /><Copy size={14} className={copied === row.label ? "hidden" : ""} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-semibold text-foreground mb-4">Tanggal → Unix Timestamp</h2>
            <input type="datetime-local" value={dateStr} onChange={(e) => setDateStr(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 mb-4" />
            {fromDate && (
              <div className="flex items-center justify-between bg-muted/30 rounded-xl px-4 py-3">
                <span className="font-mono text-lg font-bold text-primary">{fromDate}</span>
                <button onClick={() => copy(fromDate, "date")} className="text-muted-foreground hover:text-primary">
                  {copied === "date" ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
