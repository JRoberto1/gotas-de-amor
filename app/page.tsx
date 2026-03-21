// Homepage do Gotas de Amor — server component que busca dados do Sanity
// v2 - queries hardcoded ativas
export const revalidate = 0; // temporário: força revalidação para limpar cache ISR
import { sanityFetch } from "@/sanity/lib/live";
import { todasMensagensQuery } from "@/lib/queries";
import type { Mensagem } from "@/components/MessageCard";
import { getImages } from "@/lib/pexels";
import Header from "@/components/Header";
import CarouselDestaque from "@/components/CarouselDestaque";
import MensagensSection from "@/components/MensagensSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

// 24 queries hardcoded — independentes do Sanity, igual ao padrão do Dia das Mães e Páscoa
const QUERIES_HOMEPAGE = [
  "couple love romantic sunset",
  "sunrise morning motivation coffee",
  "family together happy home",
  "friends laughing outdoor joy",
  "faith prayer hands light",
  "mother child love embrace",
  "birthday cake celebration candles",
  "nature forest peaceful green",
  "beach sunset golden sky",
  "flowers garden spring colorful",
  "rain window cozy reading",
  "mountains landscape adventure sky",
  "city lights night urban",
  "books study learning desk",
  "dog pet happy outdoors",
  "cooking kitchen food warm",
  "music headphones relax lifestyle",
  "sport running fitness energy",
  "travel road trip adventure",
  "baby smile innocent joy",
  "elderly couple love enduring",
  "rain puddle reflection umbrella",
  "starry night sky universe",
  "autumn leaves fall colors",
];

export default async function HomePage() {
  // Busca mensagens e imagens em paralelo — imagens nunca dependem do Sanity
  let mensagens: Mensagem[] = [];
  const fotos: Record<string, string> = {};

  const [resultado, fotosNumericas] = await Promise.allSettled([
    sanityFetch({ query: todasMensagensQuery }),
    getImages(
      QUERIES_HOMEPAGE.map((query, i) => ({ key: String(i), query, page: 1 }))
    ),
  ]);

  if (resultado.status === "fulfilled") {
    mensagens = (resultado.value.data as Mensagem[]) ?? [];
  }

  if (fotosNumericas.status === "fulfilled") {
    // Mapeia foto por posição → _id da mensagem
    mensagens.slice(0, 24).forEach((m, i) => {
      fotos[m._id] = fotosNumericas.value[String(i)] ?? "";
    });
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
