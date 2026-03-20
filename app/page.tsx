// Homepage do Gotas de Amor — server component que busca dados do Sanity
import { sanityFetch } from "@/sanity/lib/live";
import { todasMensagensQuery } from "@/lib/queries";
import type { Mensagem } from "@/components/MessageCard";
import Header from "@/components/Header";
import CarouselDestaque from "@/components/CarouselDestaque";
import MensagensSection from "@/components/MensagensSection";
import Footer from "@/components/Footer";

export default async function HomePage() {
  // Busca todas as mensagens do Sanity com suporte a live preview
  let mensagens: Mensagem[] = [];

  try {
    const resultado = await sanityFetch({ query: todasMensagensQuery });
    mensagens = (resultado.data as Mensagem[]) ?? [];
  } catch {
    // Se o Sanity não estiver configurado ou retornar erro,
    // o componente MensagensGrid usa mensagens de fallback automaticamente
    mensagens = [];
  }

  return (
    <>
      <Header />

      <main className="flex flex-col flex-1">
        {/* Carrossel inteligente baseado no mês atual */}
        <CarouselDestaque />

        {/* Título da seção de mensagens */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-2">
          <h2
            className="text-2xl font-semibold text-[#1A1A2E]"
            style={{
              fontFamily: "var(--font-playfair-display), Georgia, serif",
            }}
          >
            Mensagens
          </h2>
          <p
            className="text-sm text-gray-500 mt-1"
            style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
          >
            Escolha uma categoria ou explore todas as mensagens
          </p>
        </div>

        {/* Filtro de categorias + grid de mensagens (client-side) */}
        <MensagensSection mensagens={mensagens} />
      </main>

      <Footer />
    </>
  );
}
