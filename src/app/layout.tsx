import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import CommandPalette from "@/components/CommandPalette";
import KonamiEgg from "@/components/KonamiEgg";
import DevConsole from "@/components/DevConsole";
import ParticlesBg from "@/components/ParticlesBg";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Anish Kumar Patra | Developer Portfolio",
  description: "Computer Science Engineering student & Full Stack / Web3 Developer. Currently exploring smart contracts, DSA, and scalable web architectures.",
  authors: [{ name: "Anish Kumar Patra" }],
  keywords: ["Anish Kumar Patra", "Developer Portfolio", "Full Stack Developer", "Web3 Developer", "NMAMIT", "Motoko", "ICP", "React", "Next.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`} style={{ scrollBehavior: "smooth" }}>
      <body className="min-h-full flex flex-col font-sans bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 relative selection:bg-indigo-500/30">
        <ThemeProvider>
          {/* Subtle canvas background particles */}
          <ParticlesBg />
          
          {/* Custom reactive mouse ring cursor */}
          <CustomCursor />
          
          {/* Floating glass header */}
          <Navbar />
          
          {/* Main page layout context */}
          <main className="flex-1 w-full flex flex-col relative z-10">
            {children}
          </main>
          
          {/* Keyboard palette navigation */}
          <CommandPalette />
          
          {/* Konami code hacker matrix rain */}
          <KonamiEgg />
          
          {/* Draggable stats & quotes console */}
          <DevConsole />
        </ThemeProvider>
      </body>
    </html>
  );
}
