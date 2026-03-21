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

// Queries Pexels fixas por posição (ordem do Sanity: _createdAt asc)
// Igual ao padrão do dia-das-maes — sem lookup por título
const QUERIES_POR_POSICAO = [
  { query: "cross sunrise easter",              page: 1 }, // Páscoa de Renovação
  { query: "sunrise golden sky morning",        page: 1 }, // Ele Ressuscitou
  { query: "spring flowers pink white",         page: 1 }, // Recomeço de Páscoa
  { query: "candle light peace",                page: 1 }, // Paz Que Vem da Fé
  { query: "family table meal together",        page: 1 }, // Páscoa em Família
  { query: "cross light church",                page: 1 }, // Amor Que Não Tem Fim
  { query: "flowers spring bloom pink",         page: 1 }, // Primavera da Alma
  { query: "chocolate eggs easter basket",      page: 1 }, // Chocolate e Gratidão
  { query: "sunrise sky clouds light",          page: 1 }, // Vitória Sobre Tudo
  { query: "flowers bouquet pink spring",       page: 1 }, // Feliz Páscoa Meu Amor
  { query: "children nature outdoor happy",     page: 1 }, // Para os Filhos na Páscoa
  { query: "hands prayer light",                page: 1 }, // Páscoa de Cura
  { query: "friends outdoor smiling",           page: 1 }, // Amigo Feliz Páscoa
  { query: "path light nature open",            page: 1 }, // A Pedra Foi Removida
  { query: "candle flame light dark",           page: 1 }, // Páscoa de Luz
  { query: "horizon dawn sky sunrise",          page: 1 }, // Ressurreição e Esperança
  { query: "dove white sky flying",             page: 1 }, // Páscoa de Graça
  { query: "family dinner table warm",          page: 1 }, // Tradição de Amor
  { query: "mother daughter flowers garden",   page: 1 }, // Mensagem de Páscoa Para Mãe
  { query: "butterfly flower spring colorful", page: 1 }, // Esperança Viva
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

  // Busca mensagens de Páscoa do Sanity
  const mensagens = await client
    .fetch<MensagemPascoa[]>(
      `*[_type == "mensagem" && "páscoa" in tags] | order(_createdAt asc) {
        _id, titulo, texto, destaque
      }`
    )
    .catch(() => [] as MensagemPascoa[]);

  // Monta array de queries por posição (igual ao padrão do dia-das-maes)
  const queriesComChave = mensagens.map((m, i) => ({
    key: m._id,
    query: QUERIES_POR_POSICAO[i]?.query ?? "spring flowers colorful",
    page: QUERIES_POR_POSICAO[i]?.page ?? 1,
  }));

  // Busca hero + todas as fotos em paralelo — mesmo padrão do dia-das-maes
  const [heroUrl, fotos] = await Promise.all([
    getImage("Easter spring flowers sunrise hope"),
    getImages(queriesComChave),
  ]);

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
