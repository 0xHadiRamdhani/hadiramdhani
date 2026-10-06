"use client";

import { useState } from "react";
import { Search, MapPin, Globe, Server, Activity, ShieldAlert } from "lucide-react";

export default function IPLookupTool() {
  const [ip, setIp] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ip) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      // Using ipapi.co for IP lookup
      const res = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await res.json();

      if (data.error) {
        setError(data.reason || "IP tidak valid atau tidak ditemukan.");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Gagal mengambil data. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  const getMyIp = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      setIp(data.ip);
    } catch (err) {
      setError("Gagal mendapatkan IP lokal Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 flex items-center gap-2">
            <Globe className="text-primary" />
            IP & Geolocation Lookup
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Lacak informasi rinci tentang alamat IPv4 atau IPv6, termasuk lokasi geografis, ISP, zona waktu, dan ASN.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="Masukkan IP Address (contoh: 8.8.8.8)"
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
            <div className="flex flex-row gap-2 w-full sm:w-auto">
              <button
                type="submit"
                disabled={loading || !ip}
                className="flex-1 sm:flex-none px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? "Mencari..." : "Lacak IP"}
              </button>
              <button
                type="button"
                onClick={getMyIp}
                className="flex-1 sm:flex-none px-4 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors whitespace-nowrap"
                title="Gunakan IP saya saat ini"
              >
                My IP
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm flex items-start gap-2">
              <ShieldAlert size={18} className="shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}
        </div>

        {result && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 text-primary font-semibold mb-4 pb-3 border-b border-border/50">
                <MapPin size={18} />
                Geographic Location
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Country</div>
                  <div className="font-medium text-foreground flex items-center gap-2">
                    <span className="text-2xl leading-none">{result.country_name ? `🌐` : ''}</span>
                    {result.country_name} ({result.country_code})
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Region / State</div>
                  <div className="font-medium text-foreground">{result.region || "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">City</div>
                  <div className="font-medium text-foreground">{result.city || "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Coordinates</div>
                  <div className="font-medium text-foreground font-mono">{result.latitude}, {result.longitude}</div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 text-primary font-semibold mb-4 pb-3 border-b border-border/50">
                <Server size={18} />
                Network Information
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">IP Address</div>
                  <div className="font-bold text-foreground font-mono text-lg">{result.ip}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">ISP (Internet Service Provider)</div>
                  <div className="font-medium text-foreground">{result.org || result.asn || "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">ASN</div>
                  <div className="font-medium text-foreground font-mono">{result.asn || "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Timezone</div>
                  <div className="font-medium text-foreground">{result.timezone || "-"}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

