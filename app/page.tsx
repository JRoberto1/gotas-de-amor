// Homepage do Gotas de Amor — server component que busca dados do Sanity
export const revalidate = 86400; // ISR: revalida a cada 24h
import { sanityFetch } from "@/sanity/lib/live";
import { mensagensHomepageQuery } from "@/lib/queries";
import type { Mensagem } from "@/components/MessageCard";
import { getFotosParaMensagens } from "@/lib/pexels";
import Header from "@/components/Header";
import CarouselDestaque from "@/components/CarouselDestaque";
import MensagensSection from "@/components/MensagensSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default async function HomePage() {
  let mensagens: Mensagem[] = [];

  try {
    const resultado = await sanityFetch({ query: mensagensHomepageQuery });
    mensagens = (resultado.data as Mensagem[]) ?? [];
  } catch {
    mensagens = [];
  }

  const fotos = await getFotosParaMensagens(mensagens);

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
