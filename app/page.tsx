// Homepage do Gotas de Amor — server component que busca dados do Sanity
export const revalidate = 0; // temporário: força revalidação para limpar cache ISR
import { sanityFetch } from "@/sanity/lib/live";
import { todasMensagensQuery } from "@/lib/queries";
import type { Mensagem } from "@/components/MessageCard";
import { getFotosParaMensagens } from "@/lib/pexels";
import Header from "@/components/Header";
import CarouselDestaque from "@/components/CarouselDestaque";
import MensagensSection from "@/components/MensagensSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default async function HomePage() {
  // Busca todas as mensagens do Sanity com suporte a live preview
  let mensagens: Mensagem[] = [];
  let fotos: Record<string, string> = {};

  try {
    const resultado = await sanityFetch({ query: todasMensagensQuery });
    mensagens = (resultado.data as Mensagem[]) ?? [];
    // Limita a 24 imagens para evitar rate limit do Pexels (200 msgs × 600ms = 60s)
    // Mensagens além das 24 primeiras usam fallback de gradiente no card
    fotos = await getFotosParaMensagens(mensagens.slice(0, 24));
  } catch {
    // Se o Sanity não estiver configurado, MensagensSection usa fallback automaticamente
    mensagens = [];
  }

  return (
    <>
      <Header />

      <main className="flex flex-col flex-1">
        {/* Carrossel inteligente baseado no mês atual */}
        <CarouselDestaque />

        {/* Título da seção de mensagens */}
        <div className="w-full px-4 sm:px-6 pt-8 pb-8 text-center" id="categorias">
          <h2
            className="font-semibold text-[#1A1A2E]"
            style={{
              fontFamily: "var(--font-playfair-display), Georgia, serif",
              fontSize: 28,
            }}
          >
            Mensagens
          </h2>
          <p
            className="mt-2"
            style={{
              fontFamily: "var(--font-lato), Arial, sans-serif",
              fontSize: 14,
              color: "#999",
            }}
          >
            Escolha uma categoria ou explore todas as mensagens
          </p>
        </div>

        {/* Filtro de categorias + grid de mensagens (client-side) */}
        <MensagensSection mensagens={mensagens} fotos={fotos} />

        {/* Seção de newsletter */}
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
