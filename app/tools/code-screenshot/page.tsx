"use client";
import { useState, useRef } from "react";
import { Copy, Check, Download } from "lucide-react";

const THEMES = [
  { id: "dark", label: "Dark", bg: "#1e1e2e", text: "#cdd6f4", comment: "#6c7086", keyword: "#cba6f7", string: "#a6e3a1", number: "#fab387", header: "#313244" },
  { id: "monokai", label: "Monokai", bg: "#272822", text: "#f8f8f2", comment: "#75715e", keyword: "#f92672", string: "#e6db74", number: "#ae81ff", header: "#3e3d32" },
  { id: "github-light", label: "GitHub Light", bg: "#ffffff", text: "#24292f", comment: "#6e7781", keyword: "#cf222e", string: "#0a3069", number: "#0550ae", header: "#f6f8fa" },
  { id: "solarized", label: "Solarized", bg: "#002b36", text: "#839496", comment: "#586e75", keyword: "#859900", string: "#2aa198", number: "#d33682", header: "#073642" },
];

const LANGUAGES = ["JavaScript", "TypeScript", "Python", "Rust", "Go", "CSS", "HTML", "SQL", "Bash", "JSON"];

export default function CodeScreenshotPage() {
  const [code, setCode] = useState(`function greet(name: string) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet("Hadi"));`);
  const [theme, setTheme] = useState(THEMES[0]);
  const [lang, setLang] = useState("TypeScript");
  const [fileName, setFileName] = useState("index.ts");
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const download = async () => {
    if (!previewRef.current) return;
    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(previewRef.current, { scale: 2, backgroundColor: null });
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "code_screenshot.png";
    a.click();
  };

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Code Screenshot Generator</h1>
          <p className="text-muted-foreground text-sm">Buat screenshot kode yang cantik seperti VS Code. Cocok untuk share di sosmed.</p>
        </div>

        <div className="grid sm:grid-cols-[1fr_220px] gap-6">
          <div className="space-y-4">
            <textarea
              value={code}
              onChange={(e) =>setCode(e.target.value)}
              placeholder="Paste kode di sini..."
              className="w-full min-h-[200px] p-4 rounded-xl border border-border bg-muted/20 font-mono text-sm resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />

            {/* Preview */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: 32 }}>
              <div ref={previewRef} className="rounded-xl overflow-hidden shadow-2xl" style={{ background: theme.bg }}>
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3" style={{ background: theme.header }}>
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <span className="ml-4 text-xs opacity-60 font-mono" style={{ color: theme.text }}>{fileName}</span>
                  <span className="ml-auto text-xs opacity-40" style={{ color: theme.text }}>{lang}</span>
                </div>
                <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed" style={{ color: theme.text }}>
                  <code>{code}</code>
                </pre>
              </div>
            </div>

            <button onClick={download}
              className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">
              <Download size={16} />Download PNG (2x)
            </button>
          </div>

          {/* Controls */}
          <div className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">File Name</label>
              <input type="text" value={fileName} onChange={(e) =>setFileName(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-xl font-mono text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Language</label>
              <select value={lang} onChange={(e) =>setLang(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 bg-card">
                {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Theme</label>
              <div className="space-y-1.5">
                {THEMES.map((t) => (
                  <button key={t.id} onClick={() =>setTheme(t)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${theme.id === t.id ? "border-2 border-primary" : "border border-border hover:border-primary/40"}`}
                    style={{ background: t.bg }}>
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <span style={{ color: t.text }}>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
