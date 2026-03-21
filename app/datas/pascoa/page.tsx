// Página especial Páscoa — /datas/pascoa
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import PascoaContent from "./PascoaContent";
import { CATEGORIAS } from "@/lib/categorias";
import { getImage, getImages } from "@/lib/pexels";
import { client } from "@/sanity/lib/client";

export const metadata: Metadata = {
  title: "Mensagens de Páscoa 2026 — Gotas de Amor",
  description:
    "As mensagens mais bonitas e emocionantes para a Páscoa 2026. Copie e compartilhe no WhatsApp, Instagram e Facebook.",
  keywords:
    "mensagens de páscoa, feliz páscoa, mensagem de páscoa, páscoa 2026, ressurreição, esperança",
  openGraph: {
    title: "Mensagens de Páscoa 2026 — Gotas de Amor",
    description:
      "As mensagens mais bonitas e emocionantes para a Páscoa 2026. Copie e compartilhe no WhatsApp, Instagram e Facebook.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1457301353672-324d6d14f471?w=900&q=80",
        width: 900,
        height: 600,
        alt: "Flores da primavera e ovos coloridos celebrando a Páscoa",
      },
    ],
  },
};

const CATEGORIAS_RELACIONADAS = ["fe-espiritualidade", "familia", "amor"];

// 21 queries hardcoded — independentes do Sanity, igual ao padrão do dia-das-maes
// Índice 0 = hero; índices 1-20 = cards na ordem de criação
const QUERIES_PASCOA = [
  "Easter spring flowers sunrise",     // 0 — hero
  "Easter spring flowers sunrise",     // 1 — Páscoa de Renovação
  "resurrection hope dawn light",      // 2 — Ele Ressuscitou
  "spring bloom new beginning",        // 3 — Recomeço de Páscoa
  "candle peace faith light",          // 4 — Paz Que Vem da Fé
  "family dinner table together",      // 5 — Páscoa em Família
  "cross golden light church",         // 6 — Amor Que Não Tem Fim
  "pink flowers spring garden",        // 7 — Primavera da Alma
  "chocolate eggs easter basket",      // 8 — Chocolate e Gratidão
  "sunrise sky clouds victory",        // 9 — Vitória Sobre Tudo
  "flowers bouquet pink romantic",     // 10 — Feliz Páscoa Meu Amor
  "children outdoor happy playing",   // 11 — Para os Filhos na Páscoa
  "hands prayer nature light",         // 12 — Páscoa de Cura
  "friends smiling outdoor together", // 13 — Amigo Feliz Páscoa
  "path nature open light",            // 14 — A Pedra Foi Removida
  "candle flame warm glow",            // 15 — Páscoa de Luz
  "horizon dawn sunrise sky",          // 16 — Ressurreição e Esperança
  "dove white sky flying",             // 17 — Páscoa de Graça
  "family warm gathering meal",        // 18 — Tradição de Amor
  "mother flowers garden love",        // 19 — Mensagem de Páscoa Para Mãe
  "butterfly flower spring colorful",  // 20 — Esperança Viva
];

export interface MensagemPascoa {
  _id: string;
  titulo: string;
  texto: string;
  destaque?: boolean;
}

export default async function PascoaPage() {
  const categoriasLink = CATEGORIAS.filter((c) =>
    CATEGORIAS_RELACIONADAS.includes(c.valor)
  );

  // Busca Sanity + Pexels em paralelo — imagens nunca dependem do Sanity
  // Keys numéricas fixas ("1"–"20") igual ao dia-das-maes
  const [mensagens, heroUrl, fotosNumericas] = await Promise.all([
    client
      .fetch<MensagemPascoa[]>(
        `*[_type == "mensagem" && "páscoa" in tags] | order(_createdAt asc) {
          _id, titulo, texto, destaque
        }`
      )
      .catch(() => [] as MensagemPascoa[]),
    getImage(QUERIES_PASCOA[0]),
    getImages(
      Array.from({ length: 20 }, (_, i) => ({
        key: String(i + 1),
        query: QUERIES_PASCOA[i + 1],
        page: 1,
      }))
    ),
  ]);

  // Mapeia fotos por _id usando a posição — igual ao dia-das-maes com fotosPorId
  const fotos: Record<string, string> = {};
  mensagens.forEach((m, i) => {
    fotos[m._id] = fotosNumericas[String(i + 1)] ?? "";
  });

  const heroFinal =
    heroUrl ||
    "https://images.unsplash.com/photo-1457301353672-324d6d14f471?w=900&q=80";

  return (
    <>
      <Header />

      <main className="flex flex-col flex-1 bg-[#FAFAFA]">
        {/* Hero */}
        <div className="relative w-full overflow-hidden" style={{ height: 380 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroFinal}
            alt="Flores da primavera e ovos coloridos celebrando a Páscoa"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(82,183,136,0.75) 0%, rgba(82,183,136,0.3) 55%, transparent 100%)",
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 text-white"
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(4px)",
                border: "1px solid rgba(255,255,255,0.35)",
              }}
            >
              Abril 2026
            </span>
            <h1
              className="text-3xl sm:text-5xl font-bold text-white leading-tight max-w-2xl drop-shadow-md"
              style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
            >
              Mensagens de Páscoa
            </h1>
            <p
              className="text-white/90 mt-4 max-w-lg text-base sm:text-lg drop-shadow"
              style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
            >
              As palavras mais bonitas para celebrar a renovação e a esperança
            </p>
          </div>
        </div>

        {/* Grid de mensagens */}
        <PascoaContent mensagens={mensagens} fotos={fotos} />

        {/* Categorias relacionadas */}
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
