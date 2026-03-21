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

// Queries em inglês curadas manualmente para garantir imagens relevantes e coloridas
const PEXELS_QUERIES: Record<string, string> = {
  "Páscoa de Renovação":             "Easter sunrise flowers spring hope",
  "Ele Ressuscitou":                 "sunrise golden light dawn sky",
  "Recomeço de Páscoa":              "spring bloom flowers garden new",
  "Paz Que Vem da Fé":               "Easter candle light peaceful prayer",
  "Páscoa em Família":               "family table dinner together happy",
  "Amor Que Não Tem Fim":            "Easter cross love light golden church",
  "Primavera da Alma":               "spring flowers colorful bloom garden",
  "Chocolate e Gratidão":            "Easter chocolate eggs basket sweet",
  "Vitória Sobre Tudo":              "victory celebration triumph arms raised",
  "Feliz Páscoa Meu Amor":           "Easter couple love flowers romantic spring",
  "Para os Filhos na Páscoa":        "children happy playing outdoors joy",
  "Páscoa de Cura":                  "healing nature light hope restoration",
  "Amigo Feliz Páscoa":              "Easter friends celebrate outdoor colorful",
  "A Pedra Foi Removida":            "clear path light mountain faith walk",
  "Páscoa de Luz":                   "Easter candle light golden glow warm",
  "Ressurreição e Esperança":        "Easter dawn promise horizon hope beautiful sky",
  "Páscoa de Graça":                 "grace gratitude Easter gift light nature",
  "Tradição de Amor":                "Easter family tradition warm gathering",
  "Mensagem de Páscoa Para Mãe":     "mother flowers spring love bouquet",
  "Esperança Viva":                  "joy dance celebrate colorful happy",
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
