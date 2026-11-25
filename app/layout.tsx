import type { Metadata } from "next";
import { Geist_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hadi Ramdhani - Software Engineering Student",
  description: "Saya adalah Hadi Ramdhani, lulusan Software Engineering dari SMK Bani Ma'sum yang kini menempuh Sekolah Profesi Insinyur. Saya tertarik dengan dunia teknologi, coding, hacking, electrical, dan coffee.",
  applicationName: "Hadi Ramdhani - NexoraLabStudio",
  openGraph: {
    siteName: "Hadi Ramdhani - NexoraLabStudio",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${instrument.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
