// Página institucional Sobre — /sobre
import type { Metadata } from "next";
import { Heart, Star, Users, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sobre | Gotas de Amor",
  description:
    "Conheça o Gotas de Amor — um portal dedicado a mensagens que tocam corações, espalham amor e transformam vidas.",
};

const valores = [
  {
    Icon: Heart,
    titulo: "Amor",
    descricao:
      "Acreditamos que palavras de amor têm o poder de curar, aproximar e transformar relações.",
  },
  {
    Icon: Star,
    titulo: "Autenticidade",
    descricao:
      "Todas as mensagens são criadas com cuidado, sem geração automática vazia. Cada palavra importa.",
  },
  {
    Icon: Users,
    titulo: "Comunidade",
    descricao:
      "Somos um espaço de conexão — onde as pessoas encontram as palavras certas para os momentos certos.",
  },
  {
    Icon: MessageCircle,
    titulo: "Propósito",
    descricao:
      "Nosso propósito é simples: levar mensagens que fazem bem. Ao coração, à alma e aos relacionamentos.",
  },
];

export default function SobrePage() {
  return (
    <>
      <Header />

      <main className="flex flex-col flex-1 bg-[#FAFAFA]">
        {/* Hero */}
        <div
          className="py-16 px-4 sm:px-6 text-center"
          style={{
            background: "linear-gradient(135deg, #E8537A15 0%, #F4845F10 100%)",
          }}
        >
          <div className="max-w-2xl mx-auto">
            <h1
              className="text-4xl sm:text-5xl font-bold text-[#1A1A2E] mb-4"
              style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
            >
              Sobre o Gotas de Amor
            </h1>
            <p
              className="text-gray-600 text-lg leading-relaxed"
              style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
            >
              Um portal criado com o propósito de levar palavras que tocam corações
              e transformam o dia de quem lê e de quem compartilha.
            </p>
          </div>
        </div>

        {/* História */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <h2
            className="text-2xl font-semibold text-[#1A1A2E] mb-4"
            style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
          >
            Nossa história
          </h2>
          <div
            className="text-gray-600 space-y-4 leading-relaxed"
            style={{
              fontFamily: "var(--font-lato), Arial, sans-serif",
              fontSize: 16,
              lineHeight: 1.8,
            }}
          >
            <p>
              O Gotas de Amor nasceu da crença de que as palavras certas, no momento certo,
              têm o poder de transformar vidas. Em um mundo cada vez mais acelerado,
              encontrar as palavras para expressar o que sentimos ficou mais difícil — e ao
              mesmo tempo, mais necessário.
            </p>
            <p>
              Criamos este portal para ser um espaço de mensagens genuínas: para bom dia e
              boa noite, para o Dia das Mães e o Dia dos Pais, para a amizade que precisa
              ser celebrada e para a fé que sustenta nos momentos difíceis.
            </p>
            <p>
              Cada mensagem é pensada com cuidado para tocar o coração de quem lê — e de
              quem a compartilha. Porque o amor também se expressa em palavras.
            </p>
          </div>
        </section>

        {/* Missão */}
        <section
          className="py-12 px-4 sm:px-6"
          style={{ backgroundColor: "#1A1A2E" }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <p
              className="text-2xl sm:text-3xl text-white leading-relaxed"
              style={{
                fontFamily: "var(--font-playfair-display), Georgia, serif",
                fontStyle: "italic",
              }}
            >
              &ldquo;Palavras certas no momento certo transformam vidas.&rdquo;
            </p>
            <p
              className="text-gray-400 mt-4 text-sm"
              style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
            >
              — Missão do Gotas de Amor
            </p>
          </div>
        </section>

        {/* Valores */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h2
            className="text-2xl font-semibold text-[#1A1A2E] mb-8 text-center"
            style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
          >
            Nossos valores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {valores.map(({ Icon, titulo, descricao }) => (
              <div
                key={titulo}
                className="flex gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl"
                  style={{ backgroundColor: "#E8537A15" }}
                >
                  <Icon size={22} style={{ color: "#E8537A" }} />
                </div>
                <div>
                  <h3
                    className="font-semibold text-[#1A1A2E] mb-1"
                    style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
                  >
                    {titulo}
                  </h3>
                  <p
                    className="text-gray-500 text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
                  >
                    {descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
