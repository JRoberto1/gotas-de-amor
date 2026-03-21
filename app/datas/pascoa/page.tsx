// Página especial Páscoa — /datas/pascoa
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import PascoaContent, { type MensagemPascoa } from "./PascoaContent";
import { CATEGORIAS } from "@/lib/categorias";
import { getImage, getFotosParaMensagens } from "@/lib/pexels";
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

// Queries simples em inglês — retornam resultados confiáveis no Pexels (page=1)
const PEXELS_QUERIES: Record<string, string> = {
  "Páscoa de Renovação":             "cross sunrise easter",
  "Ele Ressuscitou":                 "sunrise golden sky morning",
  "Recomeço de Páscoa":              "spring flowers pink white",
  "Paz Que Vem da Fé":               "candle light peace",
  "Páscoa em Família":               "family table meal together",
  "Amor Que Não Tem Fim":            "cross light church",
  "Primavera da Alma":               "flowers spring bloom pink",
  "Chocolate e Gratidão":            "chocolate eggs easter basket",
  "Vitória Sobre Tudo":              "sunrise sky clouds light",
  "Feliz Páscoa Meu Amor":           "flowers bouquet pink spring",
  "Para os Filhos na Páscoa":        "children nature outdoor happy",
  "Páscoa de Cura":                  "hands prayer light",
  "Amigo Feliz Páscoa":              "friends outdoor smiling",
  "A Pedra Foi Removida":            "path light nature open",
  "Páscoa de Luz":                   "candle flame light dark",
  "Ressurreição e Esperança":        "horizon dawn sky sunrise",
  "Páscoa de Graça":                 "dove white sky flying",
  "Tradição de Amor":                "family dinner table warm",
  "Mensagem de Páscoa Para Mãe":     "mother daughter flowers garden",
  "Esperança Viva":                  "butterfly flower spring colorful",
};

export default async function PascoaPage() {
  const categoriasLink = CATEGORIAS.filter((c) =>
    CATEGORIAS_RELACIONADAS.includes(c.valor)
  );

  // Busca mensagens de Páscoa do Sanity (tag "páscoa")
  const mensagens = await client
    .fetch<MensagemPascoa[]>(
      `*[_type == "mensagem" && "páscoa" in tags] | order(_createdAt asc) {
        _id, titulo, texto, destaque, slug, pexelsQuery
      }`
    )
    .catch(() => [] as MensagemPascoa[]);

  // Busca imagens em paralelo: hero + cards
  const [heroUrl, fotos] = await Promise.all([
    getImage("Easter spring flowers sunrise hope"),
    getFotosParaMensagens(
      mensagens.map((m) => ({
        _id: m._id,
        titulo: m.titulo,
        categoria: "páscoa",
        // query curada > campo Sanity > título (fallback final em getFotosParaMensagens)
        pexelsQuery: PEXELS_QUERIES[m.titulo] ?? m.pexelsQuery ?? undefined,
      }))
    ),
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
            {/* Badge */}
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
