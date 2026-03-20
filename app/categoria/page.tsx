// Índice de categorias — /categoria
import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIAS } from "@/components/CategoryFilter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Categorias | Gotas de Amor",
  description:
    "Explore todas as categorias de mensagens do Gotas de Amor: bom dia, amor, família, fé, motivação, amizade e muito mais.",
};

// Cores de fundo vibrantes para os cards de categoria no grid
const COR_CARD: Record<string, string> = {
  "bom-dia": "#FFB347",
  "boa-noite": "#4A4E8C",
  amor: "#E8537A",
  "fe-espiritualidade": "#9B72CF",
  familia: "#52B788",
  motivacao: "#F4845F",
  amizade: "#4ECDC4",
  aniversario: "#FFD166",
  "datas-comemorativas": "#06D6A0",
  "meses-tematicos": "#118AB2",
  reflexao: "#8D99AE",
};

export default function CategoriasPage() {
  return (
    <>
      <Header />

      <main className="flex flex-col flex-1 bg-[#FAFAFA]">
        {/* Cabeçalho da página */}
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-10 pb-6">
          <h1
            className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-2"
            style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
          >
            Categorias
          </h1>
          <p
            className="text-gray-500"
            style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
          >
            Escolha uma categoria e encontre as mensagens certas para cada momento.
          </p>
        </div>

        {/* Grid visual de categorias */}
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pb-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIAS.map((cat) => {
              const corCard = COR_CARD[cat.valor] ?? "#E8537A";
              const isEscuro =
                ["boa-noite", "amor", "fe-espiritualidade", "familia", "motivacao", "amizade", "datas-comemorativas", "meses-tematicos", "reflexao"].includes(cat.valor);

              return (
                <Link
                  key={cat.valor}
                  href={`/categoria/${cat.valor}`}
                  className="group flex flex-col items-center justify-center gap-3 rounded-2xl p-6 text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
                  style={{ backgroundColor: corCard }}
                  aria-label={`Ver mensagens de ${cat.nome}`}
                >
                  {/* Ícone com fundo semi-transparente */}
                  <div
                    className="flex items-center justify-center w-14 h-14 rounded-full"
                    style={{ backgroundColor: "rgba(255,255,255,0.20)" }}
                  >
                    <cat.Icon
                      size={28}
                      color={isEscuro ? "white" : "#1A1A2E"}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Nome da categoria */}
                  <span
                    className="font-semibold text-sm leading-snug"
                    style={{
                      fontFamily: "var(--font-lato), Arial, sans-serif",
                      color: isEscuro ? "white" : "#1A1A2E",
                    }}
                  >
                    {cat.nome}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
