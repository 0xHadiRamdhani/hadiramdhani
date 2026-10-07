import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Hadi Ramdhani - Software Engineering Student",
  description: "Saya adalah Hadi Ramdhani, siswa jurusan Software Engineering di SMK Bani Ma'sum. Saya tertarik dengan dunia teknologi, coding, hacking, electrical, dan coffee.",
  applicationName: "Hadi Ramdhani - NexoraLabStudio",
  openGraph: {
    siteName: "Hadi Ramdhani - NexoraLabStudio",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
