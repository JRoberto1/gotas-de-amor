// Página especial Dia das Mães — /datas/dia-das-maes
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import DiaDasMaesContent from "./DiaDasMaesContent";
import { CATEGORIAS } from "@/lib/categorias";

export const metadata: Metadata = {
  title: "Mensagens para o Dia das Mães 2026 — Gotas de Amor",
  description:
    "As mensagens mais bonitas e emocionantes para o Dia das Mães 2026. Copie e compartilhe no WhatsApp, Instagram e Facebook.",
  keywords:
    "mensagens dia das mães, feliz dia das mães, mensagem para mãe, homenagem dia das mães 2026",
  openGraph: {
    title: "Mensagens para o Dia das Mães 2026 — Gotas de Amor",
    description:
      "As mensagens mais bonitas e emocionantes para o Dia das Mães 2026. Copie e compartilhe no WhatsApp, Instagram e Facebook.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=900&q=80",
        width: 900,
        height: 600,
        alt: "Mãe e filho se abraçando com amor",
      },
    ],
  },
};

const CATEGORIAS_RELACIONADAS = ["amor", "familia", "fe-espiritualidade"];

export default function DiaDasMaesPage() {
  const categoriasLink = CATEGORIAS.filter((c) =>
    CATEGORIAS_RELACIONADAS.includes(c.valor)
  );

  return (
    <>
      <Header />

      <main className="flex flex-col flex-1 bg-[#FAFAFA]">
        {/* Hero */}
        <div className="relative w-full overflow-hidden" style={{ height: 380 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-VzqEWn1uxaM?w=900&q=80"
            alt="Mãe e filho em momento de amor e ternura"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            style={{
              background:
                "linear-gradient(to top, rgba(232,83,122,0.75) 0%, rgba(232,83,122,0.3) 55%, transparent 100%)",
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            {/* Badge */}
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 text-white"
              style={{ backgroundColor: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.35)" }}
            >
              Maio 2026
            </span>

            <h1
              className="text-3xl sm:text-5xl font-bold text-white leading-tight max-w-2xl drop-shadow-md"
              style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
            >
              Mensagens para o Dia das Mães
            </h1>

            <p
              className="text-white/90 mt-4 max-w-lg text-base sm:text-lg drop-shadow"
              style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
            >
              As palavras mais bonitas para homenagear quem mais amamos
            </p>
          </div>
        </div>

        {/* Grid de mensagens */}
        <DiaDasMaesContent />

        {/* Seção de categorias relacionadas */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 w-full">
          <h2
            className="text-2xl font-semibold text-[#1A1A2E] mb-6 text-center"
            style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
          >
            Outras categorias que você vai amar
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categoriasLink.map((cat) => (
              <Link
                key={cat.valor}
                href={`/categoria/${cat.valor}`}
                className="flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: cat.corFundo,
                  color: cat.cor,
                  border: `1px solid ${cat.corBorda}`,
                }}
              >
                <cat.Icon size={15} strokeWidth={2.5} />
                {cat.nome}
              </Link>
            ))}
          </div>
        </section>

        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
