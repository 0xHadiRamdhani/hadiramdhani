"use client";
import { useState } from "react";
import { Lock, Copy, Check } from "lucide-react";

// Simple FNV-1a based hash (for demo, without SubtleCrypto complexities)
async function sha256(msg: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(msg));
  return Array.from(new Uint8Array(buf)).map(b =>b.toString(16).padStart(2, "0")).join("");
}
async function sha1(msg: string) {
  const buf = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(msg));
  return Array.from(new Uint8Array(buf)).map(b =>b.toString(16).padStart(2, "0")).join("");
}

// Simple MD5 implementation
function md5(str: string) {
  function safe_add(x: number, y: number) { const lsw = (x & 0xFFFF) + (y & 0xFFFF); const msw = (x >> 16) + (y >> 16) + (lsw >> 16); return (msw << 16) | (lsw & 0xFFFF); }
  function bit_rol(num: number, cnt: number) { return (num << cnt) | (num >>> (32 - cnt)); }
  function md5_cmn(q: number, a: number, b: number, x: number, s: number, t: number) { return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b); }
  function md5_ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t); }
  function md5_gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t); }
  function md5_hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return md5_cmn(b ^ c ^ d, a, b, x, s, t); }
  function md5_ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return md5_cmn(c ^ (b | (~d)), a, b, x, s, t); }
  function str2binl(str: string) { const bin: number[] = []; const mask = (1 << 8) - 1; for (let i = 0; i < str.length * 8; i += 8) bin[i >> 5] |= (str.charCodeAt(i / 8) & mask) << (i % 32); return bin; }
  function binl2hex(binarray: number[]) { const hex = "0123456789abcdef"; let str = ""; for (let i = 0; i < binarray.length * 4; i++) str += hex.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + hex.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF); return str; }
  function core_md5(x: number[], len: number) {
    x[len >> 5] |= 0x80 << ((len) % 32); x[(((len + 64) >>> 9) << 4) + 14] = len;
    let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
    for (let i = 0; i < x.length; i += 16) {
      const [oa, ob, oc, od] = [a, b, c, d];
      a = md5_ff(a, b, c, d, x[i], 7, -680876936); d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586); c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819); b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897); d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426); c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341); b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416); d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417); c = md5_ff(c, d, a, b, x[i + 10], 17, -42063); b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682); d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101); c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290); b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
      a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510); d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632); c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713); b = md5_gg(b, c, d, a, x[i], 20, -373897302);
      a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691); d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083); c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335); b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438); d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690); c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961); b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467); d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784); c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473); b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
      a = md5_hh(a, b, c, d, x[i + 5], 4, -378558); d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463); c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562); b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060); d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353); c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632); b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174); d = md5_hh(d, a, b, c, x[i], 11, -358537222); c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979); b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487); d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835); c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520); b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
      a = md5_ii(a, b, c, d, x[i], 6, -198630844); d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415); c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905); b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571); d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606); c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523); b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359); d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744); c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380); b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070); d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379); c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259); b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = safe_add(a, oa); b = safe_add(b, ob); c = safe_add(c, oc); d = safe_add(d, od);
    }
    return [a, b, c, d];
  }
  return binl2hex(core_md5(str2binl(str), str.length * 8));
}

export default function HashGenPage() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState("");

  const generate = async () => {
    if (!input) return;
    setLoading(true);
    const [s256, s1] = await Promise.all([sha256(input), sha1(input)]);
    setHashes({ MD5: md5(input), "SHA-1": s1, "SHA-256": s256 });
    setLoading(false);
  };

  const copy = (val: string, id: string) => { navigator.clipboard.writeText(val); setCopied(id); setTimeout(() =>setCopied(""), 2000); };

  return (
    <main className="min-h-screen pb-20 px-4">
      <div className="container max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 mb-2"><Lock className="text-primary" />Hash Generator</h1>
          <p className="text-muted-foreground text-sm">Generate MD5, SHA-1, dan SHA-256 hash dari teks apapun. Berguna untuk verifikasi integritas data.</p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <textarea value={input} onChange={(e) =>setInput(e.target.value)} placeholder="Masukkan teks yang ingin di-hash..."
            rows={4} className="w-full p-4 rounded-xl border border-border bg-muted/20 text-sm resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
          <button onClick={generate} disabled={!input || loading}
            className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 w-fit">
            {loading ? "Generating..." : " Generate Hash"}
          </button>
        </div>

        {Object.keys(hashes).length > 0 && (
          <div className="space-y-3">
            {Object.entries(hashes).map(([algo, val]) => (
              <div key={algo} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{algo}</span>
                  <button onClick={() =>copy(val, algo)} className="text-muted-foreground hover:text-primary">
                    {copied === algo ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
                  </button>
                </div>
                <code className="font-mono text-xs break-all text-foreground">{val}</code>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
