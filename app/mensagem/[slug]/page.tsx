// Página individual de mensagem — /mensagem/[slug]
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Copy, Share2 } from "lucide-react";
import { client } from "@/sanity/lib/client";
import {
  mensagemPorSlugQuery,
  mensagensRelacionadasQuery,
  todosSlugsQuery,
} from "@/lib/queries";
import type { Mensagem } from "@/components/MessageCard";
import { IMAGENS_CATEGORIA } from "@/components/MessageCard";
import { CATEGORIAS } from "@/components/CategoryFilter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MensagemAcoesClient from "./MensagemAcoesClient";
import MensagensRelacionadas from "./MensagensRelacionadas";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Gera parâmetros estáticos para todas as mensagens publicadas
export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(todosSlugsQuery);
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

// Metadata SEO dinâmica por mensagem
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const mensagem = await client.fetch<Mensagem | null>(mensagemPorSlugQuery, { slug });
    if (!mensagem) return { title: "Mensagem não encontrada" };

    const categoriaConfig = CATEGORIAS.find((c) => c.valor === mensagem.categoria);
    const imagem = IMAGENS_CATEGORIA[mensagem.categoria] ?? IMAGENS_CATEGORIA["reflexao"];

    return {
      title: `${mensagem.titulo} | Gotas de Amor`,
      description: mensagem.texto.slice(0, 160),
      keywords: `${mensagem.titulo}, ${categoriaConfig?.nome ?? mensagem.categoria}, mensagens, Gotas de Amor`,
      openGraph: {
        title: mensagem.titulo,
        description: mensagem.texto.slice(0, 160),
        images: [{ url: imagem, width: 600, height: 400 }],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: mensagem.titulo,
        description: mensagem.texto.slice(0, 160),
        images: [imagem],
      },
    };
  } catch {
    return { title: "Gotas de Amor" };
  }
}

export default async function MensagemPage({ params }: PageProps) {
  const { slug } = await params;

  const [mensagem, relacionadas] = await Promise.all([
    client.fetch<Mensagem | null>(mensagemPorSlugQuery, { slug }).catch(() => null),
    client
      .fetch<Mensagem[]>(mensagensRelacionadasQuery, { slug, categoria: "" })
      .catch(() => []),
  ]);

  if (!mensagem) notFound();

  // Busca relacionadas com a categoria correta após obter a mensagem
  let mensagensRelacionadas: Mensagem[] = relacionadas;
  try {
    mensagensRelacionadas = await client.fetch<Mensagem[]>(mensagensRelacionadasQuery, {
      slug,
      categoria: mensagem.categoria,
    });
  } catch {
    mensagensRelacionadas = [];
  }

  const categoriaConfig = CATEGORIAS.find((c) => c.valor === mensagem.categoria);
  const imagem = IMAGENS_CATEGORIA[mensagem.categoria] ?? IMAGENS_CATEGORIA["reflexao"];

  // JSON-LD Schema.org para SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: mensagem.titulo,
    description: mensagem.texto.slice(0, 160),
    image: imagem,
    author: { "@type": "Organization", name: "Gotas de Amor" },
    publisher: {
      "@type": "Organization",
      name: "Gotas de Amor",
      logo: { "@type": "ImageObject", url: "https://gotasdeamor.com.br/favicon.ico" },
    },
    keywords: mensagem.tags?.join(", ") ?? "",
  };

  return (
    <>
      <Header />

      {/* JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex flex-col flex-1 bg-[#FAFAFA]">
        {/* Hero com imagem da categoria */}
        <div className="relative w-full overflow-hidden" style={{ height: 320 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imagem.replace("w=600", "w=1200")}
            alt={`Imagem temática para: ${mensagem.titulo}`}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
            }}
          />

          {/* Badge da categoria sobre a imagem */}
          <div className="absolute bottom-6 left-6">
            {categoriaConfig && (
              <span
                className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm"
                style={{
                  backgroundColor: `${categoriaConfig.corFundo}DD`,
                  color: categoriaConfig.cor,
                  border: `1px solid ${categoriaConfig.corBorda}`,
                }}
              >
                <categoriaConfig.Icon size={14} strokeWidth={2.5} />
                {categoriaConfig.nome}
              </span>
            )}
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-10">
          {/* Título */}
          <h1
            className="text-3xl sm:text-4xl text-[#1A1A2E] mb-6 leading-tight"
            style={{
              fontFamily: "var(--font-playfair-display), Georgia, serif",
              fontWeight: 700,
            }}
          >
            {mensagem.titulo}
          </h1>

          {/* Texto completo */}
          <p
            className="text-gray-700 mb-8 whitespace-pre-line"
            style={{
              fontFamily: "var(--font-lato), Arial, sans-serif",
              fontSize: 18,
              lineHeight: 1.9,
            }}
          >
            {mensagem.texto}
          </p>

          {/* Tags */}
          {mensagem.tags && mensagem.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {mensagem.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-500"
                  style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Botões Compartilhar e Copiar (client component) */}
          <MensagemAcoesClient titulo={mensagem.titulo} texto={mensagem.texto} />
        </div>

        {/* Mensagens relacionadas */}
        {mensagensRelacionadas.length > 0 && (
          <MensagensRelacionadas mensagens={mensagensRelacionadas} />
        )}
      </main>

      <Footer />
    </>
  );
}
