"use client";
import { useState } from "react";

// Simple markdown parser (subset)
function parseMarkdown(md: string) {
  return md
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/^#{6}\s(.+)/gm, "<h6 class='text-base font-bold mt-4 mb-1'>$1</h6>")
    .replace(/^#{5}\s(.+)/gm, "<h5 class='text-lg font-bold mt-4 mb-1'>$1</h5>")
    .replace(/^#{4}\s(.+)/gm, "<h4 class='text-xl font-bold mt-4 mb-1'>$1</h4>")
    .replace(/^#{3}\s(.+)/gm, "<h3 class='text-2xl font-bold mt-5 mb-2'>$1</h3>")
    .replace(/^#{2}\s(.+)/gm, "<h2 class='text-3xl font-bold mt-6 mb-2 border-b border-border pb-1'>$1</h2>")
    .replace(/^#{1}\s(.+)/gm, "<h1 class='text-4xl font-bold mt-6 mb-3'>$1</h1>")
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/~~(.+?)~~/g, "<del>$1</del>")
    .replace(/`([^`]+)`/g, "<code class='bg-muted px-1.5 py-0.5 rounded text-sm font-mono'>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, "<a href='$2' class='text-primary underline' target='_blank'>$1</a>")
    .replace(/^>\s(.+)/gm, "<blockquote class='border-l-4 border-primary pl-4 italic text-muted-foreground my-2'>$1</blockquote>")
    .replace(/^- (.+)/gm, "<li class='ml-4 list-disc'>$1</li>")
    .replace(/^(\d+)\. (.+)/gm, "<li class='ml-4 list-decimal'>$2</li>")
    .replace(/^---$/gm, "<hr class='border-border my-4' />")
    .replace(/\n\n/g, "</p><p class='mb-3'>")
    .replace(/^(?!<[hlbpucio])/gm, "")
}

export default function MarkdownPreviewPage() {
  const defaultMd = `# Hello Markdown!

## Fitur yang didukung

Ini adalah **teks tebal**, *miring*, dan ***keduanya***.

Kamu bisa membuat \`kode inline\` dan link seperti [Google](https://google.com).

> Ini adalah blockquote yang bagus.

- Item satu
- Item dua
- Item tiga

---

Markdown previewer ini berjalan 100% di browser!
`;
  const [md, setMd] = useState(defaultMd);

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">👁️ Markdown Previewer</h1>
          <p className="text-muted-foreground text-sm">Tulis Markdown dan lihat preview-nya secara real-time.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Markdown</label>
            <textarea value={md} onChange={(e) => setMd(e.target.value)}
              className="w-full min-h-[600px] p-4 rounded-xl border border-border bg-muted/20 font-mono text-sm resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none leading-relaxed" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Preview</label>
            <div
              className="w-full min-h-[600px] p-6 rounded-xl border border-border bg-white overflow-auto prose prose-sm max-w-none text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(md) }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
