"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";



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
    <section id="contact" className="w-full py-16 sm:py-24 bg-muted/30 border-t border-border">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-3 text-center mb-10 sm:mb-16">
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Let&apos;s build something <span className="text-primary-gradient">together.</span>
          </h2>
          <p className="max-w-xl text-muted-foreground text-sm sm:text-base">
            Punya ide, project, atau sekadar ingin terhubung? Saya terbuka untuk berdiskusi.
          </p>
        </div>

        <div className="grid gap-8 lg:gap-12 grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hadsxdev@icloud.com"
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 sm:p-5 hover:border-primary/40 hover:shadow-sm transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-muted-foreground mb-0.5">Email</div>
                  <div className="text-sm font-semibold text-foreground truncate">hadsxdev@icloud.com</div>
                </div>
                <ArrowRight size={16} className="text-muted-foreground shrink-0 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+6283199456915"
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 sm:p-5 hover:border-primary/40 hover:shadow-sm transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-muted-foreground mb-0.5">Phone</div>
                  <div className="text-sm font-semibold text-foreground">+62 831-9945-6915</div>
                </div>
                <ArrowRight size={16} className="text-muted-foreground shrink-0 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>



            {/* LocalTime Card inline */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="text-xs font-bold text-primary tracking-widest uppercase mb-3">My Local Time</div>
              <div className="text-foreground/70 text-sm">📍 Kota Bandung, Jawa Barat (WIB / UTC+7)</div>
              <div className="text-xs text-muted-foreground mt-1">
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
            <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-1.5">Nama</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
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
                    className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
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
                    className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                    placeholder="Hi, I would like to discuss..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-white px-6 py-3 text-sm font-semibold hover:bg-primary-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed group shadow-sm"
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
                  <div className="flex items-center gap-2 text-green-700 text-sm bg-green-50 border border-green-200 p-3 rounded-lg">
                    <CheckCircle2 size={15} />
                    Message sent successfully!
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-700 text-sm bg-red-50 border border-red-200 p-3 rounded-lg">
                    <AlertCircle size={15} />
                    {errorMessage}
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
