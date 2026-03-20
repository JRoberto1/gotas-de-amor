// Página especial Dia das Mães — /datas/dia-das-maes
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import DiaDasMaesContent from "./DiaDasMaesContent";

export const metadata: Metadata = {
  title: "Mensagens para o Dia das Mães 2026 | Gotas de Amor",
  description:
    "As 20 mensagens mais bonitas e emocionantes para o Dia das Mães 2026. Mensagens para mãe, para filhos, para homenagear e celebrar o amor materno.",
  keywords:
    "mensagens dia das mães, feliz dia das mães, mensagem para mãe, homenagem dia das mães 2026",
  openGraph: {
    title: "Mensagens para o Dia das Mães 2026",
    description: "As mensagens mais emocionantes para celebrar o Dia das Mães.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80",
        width: 600,
        height: 400,
        alt: "Mãe e filho se abraçando com amor",
      },
    ],
  },
};

export default function DiaDasMaesPage() {
  return (
    <>
      <Header />

      <main className="flex flex-col flex-1 bg-[#FAFAFA]">
        {/* Hero temático */}
        <div className="relative w-full overflow-hidden" style={{ height: 340 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80"
            alt="Mãe e filho se abraçando com amor e carinho"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            style={{
              background:
                "linear-gradient(to top, rgba(232,83,122,0.85) 0%, rgba(232,83,122,0.4) 60%, transparent 100%)",
            }}
          >
            <p
              className="text-white/90 text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
            >
              Dia das Mães 2026
            </p>
            <h1
              className="text-3xl sm:text-5xl font-bold text-white leading-tight max-w-2xl"
              style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
            >
              Mensagens para o Dia das Mães
            </h1>
            <p
              className="text-white/80 mt-3 max-w-md text-sm"
              style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
            >
              20 mensagens emocionantes para celebrar o amor mais bonito do mundo
            </p>
          </div>
        </div>

        {/* Grid de mensagens hardcoded */}
        <DiaDasMaesContent />

        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
