import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { SanityLive } from "@/sanity/lib/live";
import GoogleAnalytics from "@/components/GoogleAnalytics";
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

// Metadata padrão — sobrescrita por cada página individualmente
export const metadata: Metadata = {
  metadataBase: new URL("https://gotasdeamor.com.br"),
  title: {
    default: "Gotas de Amor — Mensagens que tocam o coração",
    template: "%s | Gotas de Amor",
  },
  description:
    "Portal de mensagens temáticas: bom dia, boa noite, amor, família, fé, motivação e muito mais. Encontre as palavras certas para cada momento.",
  keywords: [
    "mensagens",
    "bom dia",
    "boa noite",
    "amor",
    "família",
    "fé",
    "motivação",
    "amizade",
    "Gotas de Amor",
  ],
  authors: [{ name: "Gotas de Amor", url: "https://gotasdeamor.com.br" }],
  creator: "Gotas de Amor",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://gotasdeamor.com.br",
    siteName: "Gotas de Amor",
    title: "Gotas de Amor — Mensagens que tocam o coração",
    description:
      "Portal de mensagens temáticas para compartilhar amor, fé, motivação e muito mais.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gotas de Amor — Mensagens que tocam o coração",
    description:
      "Encontre as palavras certas para cada momento. Compartilhe amor.",
  },
  // Verificação do Google Search Console — substitua XXXXXXXX pelo código real
  verification: {
    google: "XXXXXXXX",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
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
        {/* Google Analytics 4 — substitua G-XXXXXXXXXX no componente */}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
