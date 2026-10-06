"use client";

import { useState } from "react";
import { Search, ShieldAlert, Cpu, Server, Hash } from "lucide-react";

export default function MacLookupTool() {
  const [mac, setMac] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mac) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      // Using macvendors API
      const res = await fetch(`https://api.macvendors.com/${encodeURIComponent(mac)}`);
      
      if (!res.ok) {
        if (res.status === 404) {
          setError("Vendor tidak ditemukan untuk MAC address tersebut.");
        } else {
          setError("Gagal mengambil data dari server. Coba lagi nanti.");
        }
        setLoading(false);
        return;
      }

      const text = await res.text();
      setResult(text);
    } catch (err) {
      setError("Gagal melakukan lookup. Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 flex items-center gap-2">
            <Hash className="text-primary" />
            MAC Vendor Lookup
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Cari nama pabrikan atau vendor dari sebuah perangkat keras berdasarkan alamat MAC (Media Access Control).
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                value={mac}
                onChange={(e) => setMac(e.target.value)}
                placeholder="Contoh: 00:1A:2B:3C:4D:5E atau 00-1A-2B-3C-4D-5E"
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg font-mono focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !mac}
              className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? "Mencari..." : "Cari Vendor"}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm flex items-start gap-2">
              <ShieldAlert size={18} className="shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}
        </div>

        {result && (
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 text-primary font-semibold mb-4 pb-3 border-b border-border/50">
              <Cpu size={18} />
              Vendor Information
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">MAC Address</div>
                <div className="font-medium text-foreground font-mono">{mac.toUpperCase()}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Vendor / Manufacturer</div>
                <div className="text-2xl font-bold text-foreground">{result}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

