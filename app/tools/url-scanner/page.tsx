"use client";

import { useState } from "react";
import { Search, Link as LinkIcon, ShieldAlert, Activity, Calendar, Globe, Server } from "lucide-react";

export default function UrlScannerTool() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError("");
    setResults(null);

    try {
      const res = await fetch(`/api/urlscan?q=domain:${encodeURIComponent(query)}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Gagal mengambil data dari urlscan.");
      } else {
        setResults(data.results || []);
        if (data.results?.length === 0) {
          setError("Tidak ada hasil pindaian yang ditemukan untuk domain ini.");
        }
      }
    } catch (err) {
      setError("Gagal mengambil data. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 flex items-center gap-2">
            <ShieldAlert className="text-primary" />
            URL Scanner (urlscan.io)
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Cari hasil pindaian situs web sebelumnya dari database urlscan.io untuk menganalisis aktivitas berbahaya atau informasi domain.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Masukkan domain (contoh: google.com)"
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !query}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? "Mencari..." : "Cari Pindaian"}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm flex items-start gap-2">
              <ShieldAlert size={18} className="shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <div className="mt-6 pt-5 border-t border-border/50">
            <details className="group">
              <summary className="flex items-center gap-2 cursor-pointer text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                <Activity size={16} />
                Apa saja data yang dimunculkan?
              </summary>
              <div className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong className="text-foreground">Screenshot Visual:</strong> Tangkapan layar web aslinya</li>
                  <li><strong className="text-foreground">URL & Domain:</strong> Tautan lengkap dan domain utama</li>
                  <li><strong className="text-foreground">Waktu Pindaian:</strong> Waktu web terakhir dianalisis</li>
                  <li><strong className="text-foreground">Negara Server:</strong> Lokasi geografis server web</li>
                  <li><strong className="text-foreground">Software Server:</strong> Jenis server (Nginx, Apache, dll)</li>
                </ul>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong className="text-foreground">IP Address:</strong> Alamat IP dari server web</li>
                  <li><strong className="text-foreground">Nomor ASN:</strong> Identitas jaringan / ISP (Autonomous System)</li>
                  <li><strong className="text-foreground">Status Keamanan:</strong> Indikator Malicious (Berbahaya) atau Clean</li>
                  <li><strong className="text-foreground">Laporan Detail:</strong> Tautan ke hasil analisis teknis mendalam</li>
                </ul>
              </div>
            </details>
          </div>
        </div>

        {results && results.length > 0 && (
          <div className="grid gap-4">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Activity size={20} className="text-primary" />
              Hasil Pindaian Terbaru
            </h2>
            {results.map((result, idx) => {
              const isMalicious = result.stats?.malicious || result.stats?.phishing;
              return (
                <div key={idx} className={`bg-card border ${isMalicious ? 'border-red-500/50' : 'border-border'} rounded-xl p-5 hover:border-primary/50 transition-colors flex flex-col sm:flex-row gap-5`}>
                  {result.task?.url && (
                    <div className="shrink-0">
                      <img 
                        src={`https://urlscan.io/screenshots/${result._id}.png`} 
                        alt="Screenshot" 
                        className="w-full sm:w-48 h-auto object-cover rounded-lg border border-border bg-muted/20"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    </div>
                  )}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="font-bold text-lg text-primary break-all">
                        {result.task?.url || result.page?.url}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          {formatDate(result.task?.time)}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Globe size={14} />
                          {result.page?.country || "Unknown"}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Server size={14} />
                          {result.page?.server || "Unknown"}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border/50">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Domain</div>
                        <div className="font-medium text-foreground truncate" title={result.page?.domain}>{result.page?.domain || "-"}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">IP Address</div>
                        <div className="font-medium text-foreground">{result.page?.ip || "-"}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">ASN</div>
                        <div className="font-medium text-foreground">{result.page?.asn || "-"}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Status</div>
                        <div className={`font-medium ${isMalicious ? 'text-red-500' : 'text-green-500'}`}>
                          {isMalicious ? "Malicious" : "Clean"}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <a 
                        href={`https://urlscan.io/result/${result._id}/`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
                      >
                        <LinkIcon size={14} />
                        Lihat Laporan Lengkap di urlscan.io
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

