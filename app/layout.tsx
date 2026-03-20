import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

// Fonte serifada para títulos e frases de destaque
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

// Fonte sans-serif para corpo do texto
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Gotas de Amor — Mensagens que tocam o coração",
  description:
    "Portal de mensagens temáticas: bom dia, amor, família, fé, motivação e muito mais. Compartilhe palavras que transformam vidas.",
  keywords: "mensagens, bom dia, amor, família, fé, motivação, amizade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfairDisplay.variable} ${lato.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#FAFAFA]">
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
