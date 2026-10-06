import {
  Image, Sparkles, Smile, RotateCcw, Droplet, Eye, PenTool, Eraser,
  Lightbulb, Sun, Moon, User, History, Palette, Cloud, Maximize, Scissors,
  Wand2, ImagePlus, UserCircle, Users, ImageIcon, Maximize2, RotateCw,
  Minimize2, FileImage, Layers, Binary, Search, EyeOff, Film, Video,
  Music, FileText, SplitSquareHorizontal, FileJson, CheckSquare, Settings,
  Hash, Code, Type, Layout, Terminal, Clock, Lock, Zap, Box, FileEdit, Link2,
  List, Check, BookOpen, Wind, GitBranch, Globe, Shield, Radar
} from "lucide-react";
import type { ReactNode } from "react";

export type ToolStatus = "live" | "coming-soon" | "external";

export type Tool = {
  id: string;
  name: string;
  description: string;
  status: ToolStatus;
  externalUrl?: string;
  icon: ReactNode;
  tags?: string[];
};

export type Category = {
  id: string;
  label: string;
  icon: ReactNode;
  tools: Tool[];
};

const iconProps = { size: 24, strokeWidth: 1.5 };
const smallIconProps = { size: 18, strokeWidth: 2 };

export const categories: Category[] = [
  {
    id: "image-editor",
    label: "Image Editor",
    icon: <Image {...iconProps} />,
    tools: [
      { id: "image-resizer", name: "Image Resizer", description: "Ubah dimensi gambar sesuai kebutuhan", status: "live", icon: <Maximize2 {...smallIconProps} /> },
      { id: "image-rotator", name: "Image Rotator & Flipper", description: "Putar dan balik gambar", status: "live", icon: <RotateCw {...smallIconProps} /> },
      { id: "image-compressor", name: "Image Compressor", description: "Kompres ukuran file gambar", status: "live", icon: <Minimize2 {...smallIconProps} /> },
      { id: "format-converter", name: "Image Format Converter", description: "PNG, JPG, WebP, AVIF dll", status: "live", icon: <FileImage {...smallIconProps} /> },
      { id: "img-to-base64", name: "Image  Base64", description: "Konversi gambar ke string Base64", status: "live", icon: <Binary {...smallIconProps} /> },
      { id: "base64-to-img", name: "Base64  Image", description: "Konversi Base64 kembali ke gambar", status: "live", icon: <Image {...smallIconProps} /> },
      { id: "color-picker", name: "Image Color Picker", description: "Ambil kode warna dari gambar manapun", status: "live", icon: <Search {...smallIconProps} /> },
      { id: "palette-gen", name: "Image Palette Generator", description: "Ekstrak palet warna dari gambar", status: "live", icon: <Palette {...smallIconProps} /> },
    ],
  },
  {
    id: "social-media",
    label: "Social Media",
    icon: <Users {...iconProps} />,
    tools: [
      { id: "ig-post-resizer", name: "Instagram Post Resizer", description: "1:1, 4:5, 1.91:1 siap posting", status: "live", icon: <Image {...smallIconProps} /> },
      { id: "social-resizer", name: "Social Media Resizer", description: "Satu gambar  semua format sosmed", status: "live", icon: <Maximize2 {...smallIconProps} /> },
    ],
  },
  {
    id: "screenshot",
    label: "Screenshot Tools",
    icon: <CameraIcon {...iconProps} />,
    tools: [
      { id: "screenshot-beautifier", name: "Screenshot Beautifier", description: "Percantik screenshot dengan frame & background", status: "live", icon: <Palette {...smallIconProps} /> },
      { id: "code-screenshot", name: "Code Screenshot Generator", description: "Buat screenshot code yang cantik (VS Code style)", status: "live", icon: <Code {...smallIconProps} /> },
    ],
  },
  {
    id: "ai-text",
    label: "AI Text Tools",
    icon: <Type {...iconProps} />,
    tools: [
      { id: "ai-readme", name: "AI README Generator", description: "Buat README.md untuk project GitHub", status: "live", icon: <GitBranch {...smallIconProps} /> },
    ],
  },
  {
    id: "dev-tools",
    label: "Developer Tools",
    icon: <Code {...iconProps} />,
    tools: [
      { id: "json-formatter", name: "JSON Formatter", description: "Format dan validasi JSON", status: "live", icon: <FileJson {...smallIconProps} /> },
      { id: "base64-tool", name: "Base64 Encoder/Decoder", description: "Encode & decode Base64 string", status: "live", icon: <Binary {...smallIconProps} /> },
      { id: "text-counter", name: "Text & Word Counter", description: "Hitung kata, karakter, dan lebih", status: "live", icon: <Type {...smallIconProps} /> },
      { id: "url-encoder", name: "URL Encoder/Decoder", description: "Encode dan decode URL string", status: "live", icon: <Link2 {...smallIconProps} /> },
      { id: "html-encoder", name: "HTML Encoder/Decoder", description: "Encode entitas HTML", status: "live", icon: <Code {...smallIconProps} /> },
      { id: "regex-tester", name: "Regex Tester", description: "Test dan debug regular expression", status: "live", icon: <Search {...smallIconProps} /> },
      { id: "color-converter", name: "Color Converter", description: "HEX  RGB  HSL konversi warna", status: "live", icon: <Palette {...smallIconProps} /> },
      { id: "timestamp-converter", name: "Timestamp Converter", description: "Unix timestamp ke tanggal dan sebaliknya", status: "live", icon: <Clock {...smallIconProps} /> },
      { id: "uuid-gen", name: "UUID Generator", description: "Generate UUID/GUID v4 secara acak", status: "live", icon: <FingerprintIcon {...smallIconProps} /> },
      { id: "hash-gen", name: "Hash Generator", description: "MD5, SHA-1, SHA-256 hash dari teks", status: "live", icon: <Lock {...smallIconProps} /> },
      { id: "css-minifier", name: "CSS Minifier", description: "Minify CSS untuk performa lebih baik", status: "live", icon: <FileEdit {...smallIconProps} /> },
      { id: "diff-checker", name: "Text Diff Checker", description: "Bandingkan dua teks dan temukan perbedaan", status: "live", icon: <SplitSquareHorizontal {...smallIconProps} /> },
      { id: "markdown-preview", name: "Markdown Previewer", description: "Preview Markdown secara realtime", status: "live", icon: <Eye {...smallIconProps} /> },
    ],
  },
  {
    id: "osint-tools",
    label: "OSINT Tools",
    icon: <Radar {...iconProps} />,
    tools: [
      { id: "ip-lookup", name: "IP & Geo Lookup", description: "Lacak lokasi, ISP, dan ASN dari sebuah IP Address secara realtime", status: "live", icon: <Globe {...smallIconProps} /> },
      { id: "mac-lookup", name: "MAC Vendor Lookup", description: "Cek nama vendor atau pabrikan dari sebuah MAC Address", status: "live", icon: <Search {...smallIconProps} /> },
      { id: "url-scanner", name: "URL Scanner", description: "Cari hasil pindaian situs web menggunakan database urlscan.io", status: "live", icon: <Shield {...smallIconProps} /> },
      { id: "shodan", name: "Shodan", description: "Search engine untuk perangkat yang terhubung internet", status: "external", externalUrl: "https://www.shodan.io/", icon: <Search {...smallIconProps} /> },
      { id: "virustotal", name: "VirusTotal", description: "Analisis file mencurigakan, domain, IP, dan URL", status: "external", externalUrl: "https://www.virustotal.com/", icon: <Shield {...smallIconProps} /> },
      { id: "whois", name: "Whois Lookup", description: "Cek informasi kepemilikan domain dan IP", status: "external", externalUrl: "https://who.is/", icon: <Globe {...smallIconProps} /> },
      { id: "hunter", name: "Hunter.io", description: "Cari alamat email profesional dari sebuah domain", status: "external", externalUrl: "https://hunter.io/", icon: <FileText {...smallIconProps} /> },
      { id: "haveibeenpwned", name: "Have I Been Pwned", description: "Cek apakah email/telepon Anda pernah bocor", status: "external", externalUrl: "https://haveibeenpwned.com/", icon: <EyeOff {...smallIconProps} /> },
    ],
  },
];

// Fallbacks for lucide icons
function AlignLeftIcon(props: any) { return <List {...props} />; }
function GlobeIcon(props: any) { return <Search {...props} />; }
function MailIcon(props: any) { return <FileText {...props} />; }
function MessageSquareIcon(props: any) { return <Type {...props} />; }
function FingerprintIcon(props: any) { return <Hash {...props} />; }
function CameraIcon(props: any) { return <Image {...props} />; }
