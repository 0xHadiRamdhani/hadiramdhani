"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function AiReadmePage() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [features, setFeatures] = useState("");
  const [author, setAuthor] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const featureList = features.split("\n").filter(Boolean).map((f) => `- ${f.trim()}`).join("\n");
    const techList = tech.split(",").map((t) => `![${t.trim()}](https://img.shields.io/badge/-${t.trim().replace(/ /g, "_")}-blue?style=flat-square)`).join(" ");

    const readme = `# ${projectName || "Project Name"}

${techList}

##  Deskripsi

${description || "Deskripsi proyek akan muncul di sini."}

##  Fitur Utama

${featureList || "- Fitur 1\n- Fitur 2\n- Fitur 3"}

##  Cara Menjalankan

\`\`\`bash
# Clone repo
git clone https://github.com/${author || "username"}/${(projectName || "repo-name").toLowerCase().replace(/ /g, "-")}.git

# Masuk ke direktori
cd ${(projectName || "repo-name").toLowerCase().replace(/ /g, "-")}

# Install dependencies
npm install

# Jalankan development server
npm run dev
\`\`\`

## ️ Tech Stack

${tech.split(",").map((t) => `- **${t.trim()}**`).join("\n") || "- Technology 1\n- Technology 2"}

##  Struktur Proyek

\`\`\`
${projectName || "project"}/
 src/
    components/
    pages/
    styles/
 public/
 package.json
 README.md
\`\`\`

##  Kontribusi

Kontribusi, issue, dan feature request selalu diterima!

1. Fork project ini
2. Buat branch fitur (\`git checkout -b feature/amazing-feature\`)
3. Commit perubahan (\`git commit -m 'Add amazing feature'\`)
4. Push ke branch (\`git push origin feature/amazing-feature\`)
5. Buka Pull Request

##  Lisensi

Distributed under the MIT License. See \`LICENSE\` for more information.

##  Author

**${author || "Your Name"}**

- GitHub: [@${author || "username"}](https://github.com/${author || "username"})

---

⭐ Star repo ini jika bermanfaat!
`;
    setResult(readme);
  };

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">README Generator</h1>
          <p className="text-muted-foreground text-sm">Buat README.md profesional untuk project GitHub kamu dengan cepat.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            {[
              { label: "Project Name", value: projectName, setter: setProjectName, placeholder: "My Awesome Project" },
              { label: "Tech Stack (pisahkan koma)", value: tech, setter: setTech, placeholder: "React, TypeScript, Tailwind CSS, Next.js" },
              { label: "Author / GitHub Username", value: author, setter: setAuthor, placeholder: "hadiramdhani" },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">{field.label}</label>
                <input type="text" value={field.value} onChange={(e) =>field.setter(e.target.value)} placeholder={field.placeholder}
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 bg-card" />
              </div>
            ))}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Deskripsi</label>
              <textarea value={description} onChange={(e) =>setDescription(e.target.value)} placeholder="Jelaskan project kamu secara singkat..."
                rows={3} className="w-full px-4 py-3 border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none bg-card" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Fitur Utama (satu per baris)</label>
              <textarea value={features} onChange={(e) =>setFeatures(e.target.value)} placeholder={"Authentication system\nDark mode support\nResponsive design"}
                rows={5} className="w-full px-4 py-3 border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none bg-card font-mono" />
            </div>
            <button onClick={generate} className="w-full py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">Generate README
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Output Markdown</label>
              {result && (
                <button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() =>setCopied(false), 2000); }}
                  className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline">
                  {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
            <textarea readOnly value={result} placeholder="README.md akan muncul di sini setelah kamu klik Generate..."
              className="flex-1 min-h-[600px] p-4 rounded-xl border border-border bg-muted/10 font-mono text-xs resize-none outline-none" />
          </div>
        </div>
      </div>
    </main>
  );
}
