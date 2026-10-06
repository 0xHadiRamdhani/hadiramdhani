import { Metadata } from "next";
import { ToolsNavigation } from "./ToolsNavigation";
import Navbar from "@/components/Navbar";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Hadi Ramdhani - Tools",
  description: "Kumpulan tools gratis untuk developer dan kreator yang berjalan 100% di browser secara instan dan aman.",
};

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <ToolsNavigation>{children}</ToolsNavigation>
    </>
  );
}
