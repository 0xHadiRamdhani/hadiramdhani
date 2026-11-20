"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowRight, ArrowUpRight, Loader2, CheckCircle2, AlertCircle, MapPin, Send } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Spotlight from "./Spotlight";

const socials = [
  { name: "Instagram", href: "https://instagram.com/hadiramdhani.tsx" },
  { name: "TikTok", href: "https://tiktok.com/@hadimobileengineer" },
  { name: "WhatsApp", href: "https://wa.me/6283199456915" },
  { name: "GitHub", href: "https://github.com/0xHadiRamdhani" },
];



export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://formsubmit.co/ajax/hadsxdev@icloud.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `Pesan Portfolio dari ${formData.name}`,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await res.json();
        setErrorMessage(data.error || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  };


  return (
    <section id="contact" className="relative w-full py-20 sm:py-28 bg-muted/30 border-t border-border overflow-hidden scroll-mt-16">
      <div className="absolute inset-0 grid-bg mask-fade-y pointer-events-none" />
      <div className="absolute -bottom-40 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl pointer-events-none" />

      <div className="container relative">
        <SectionHeader
          title={
            <>
              Let&apos;s build something <span className="text-primary-gradient">together.</span>
            </>
          }
          subtitle="Punya ide, project, atau sekadar ingin terhubung? Saya terbuka untuk berdiskusi."
        />

        <div className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] max-w-5xl mx-auto">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            {[
              { href: "mailto:hadsxdev@icloud.com", icon: Mail, label: "Email", value: "hadsxdev@icloud.com" },
              { href: "tel:+6283199456915", icon: Phone, label: "Phone", value: "+62 831-9945-6915" },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <Spotlight tilt={5}
                  key={c.label}
                  className="rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <a href={c.href} className="flex items-center gap-4 p-4 sm:p-5 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                      <Icon size={20} className="text-lime-ink group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5">{c.label}</div>
                      <div className="text-sm font-semibold text-foreground truncate">{c.value}</div>
                    </div>
                    <ArrowRight size={16} className="text-muted-foreground shrink-0 group-hover:translate-x-1 group-hover:text-lime-ink transition-all" />
                  </a>
                </Spotlight>
              );
            })}

            {/* Socials */}
            <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
              <div className="text-[11px] font-mono font-bold text-lime-ink tracking-widest uppercase mb-3">Find me on</div>
              <div className="flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground/70 hover:border-primary/40 hover:text-lime-ink hover:bg-primary/5 transition-all"
                  >
                    {s.name}
                    <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </div>

            {/* Local time card */}
            <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
              <div className="text-[11px] font-mono font-bold text-lime-ink tracking-widest uppercase mb-3">My Local Time</div>
              <div className="flex items-center gap-2 text-foreground/80 text-sm font-medium">
                <MapPin size={15} className="text-lime-ink shrink-0" />
                Kota Bandung, Jawa Barat (WIB / UTC+7)
              </div>
              <div className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Walaupun Anda berada di zona waktu berbeda, widget waktu menampilkan waktu lokal saya.
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="gradient-border shadow-xl shadow-primary/10">
              <div className="relative bg-card rounded-[calc(1.25rem-1px)] p-6 sm:p-8 overflow-hidden">
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-bg-dark shadow-md shadow-primary/30">
                      <Send size={17} />
                    </span>
                    <h3 className="text-lg font-bold">Send a Message</h3>
                  </div>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-1.5">Nama</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground bg-background focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-1.5">Email</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground bg-background focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-1.5">Pesan</label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground bg-background focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary transition-all resize-none"
                        placeholder="Hi, I would like to discuss..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-bg-dark px-6 py-3.5 text-sm font-semibold hover:bg-primary-500 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 group shadow-lg shadow-primary/25"
                    >
                      {status === "loading" ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <>
                          Send Message
                          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </button>

                    {status === "success" && (
                      <div className="flex items-center gap-2 text-green-700 text-sm bg-green-50 border border-green-200 p-3 rounded-xl">
                        <CheckCircle2 size={15} />
                        Message sent successfully!
                      </div>
                    )}
                    {status === "error" && (
                      <div className="flex items-center gap-2 text-red-700 text-sm bg-red-50 border border-red-200 p-3 rounded-xl">
                        <AlertCircle size={15} />
                        {errorMessage}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
