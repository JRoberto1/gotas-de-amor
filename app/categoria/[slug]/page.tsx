// Página de listagem por categoria — /categoria/[slug]
// Exibe mensagens filtradas com paginação de 12 por página
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import {
  mensagensPorCategoriaComPaginacaoQuery,
  contarMensagensPorCategoriaQuery,
} from "@/lib/queries";
import type { Mensagem } from "@/components/MessageCard";
import { CATEGORIAS } from "@/lib/categorias";
import { getFotosParaMensagens } from "@/lib/pexels";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import CategoriaGrid from "./CategoriaGrid";

const POR_PAGINA = 12;

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ pagina?: string }>;
}

// Gera parâmetros estáticos para cada categoria
export function generateStaticParams() {
  return CATEGORIAS.map((c) => ({ slug: c.valor }));
}

// Metadata SEO dinâmica por categoria
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoriaConfig = CATEGORIAS.find((c) => c.valor === slug);
  if (!categoriaConfig) return { title: "Categoria não encontrada" };

  return {
    title: `Mensagens de ${categoriaConfig.nome} | Gotas de Amor`,
    description: `Encontre as melhores mensagens de ${categoriaConfig.nome} para compartilhar com quem você ama. Copie, compartilhe e espalhe amor.`,
    keywords: `mensagens de ${categoriaConfig.nome}, ${categoriaConfig.nome}, Gotas de Amor`,
    openGraph: {
      title: `Mensagens de ${categoriaConfig.nome}`,
      description: `As melhores mensagens de ${categoriaConfig.nome} para você compartilhar.`,
    },
  };
}

export default async function CategoriaPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { pagina: paginaParam } = await searchParams;

  const categoriaConfig = CATEGORIAS.find((c) => c.valor === slug);
  if (!categoriaConfig) notFound();

  const pagina = Math.max(1, parseInt(paginaParam ?? "1", 10));
  const inicio = (pagina - 1) * POR_PAGINA;
  const fim = inicio + POR_PAGINA - 1;

  const [mensagens, total] = await Promise.all([
    client
      .fetch<Mensagem[]>(mensagensPorCategoriaComPaginacaoQuery, {
        categoria: slug,
        inicio,
        fim,
      })
      .catch(() => [] as Mensagem[]),
    client
      .fetch<number>(contarMensagensPorCategoriaQuery, { categoria: slug })
      .catch(() => 0),
  ]);

  const fotos = await getFotosParaMensagens(mensagens);

  const totalPaginas = Math.ceil(total / POR_PAGINA);

  return (
    <>
      <Header />

      <main className="flex flex-col flex-1 bg-[#FAFAFA]">
        {/* Cabeçalho da categoria */}
        <div
          className="w-full py-12 px-4 sm:px-6"
          style={{
            background: `linear-gradient(135deg, ${categoriaConfig.cor}15 0%, ${categoriaConfig.corFundo} 100%)`,
            borderBottom: `3px solid ${categoriaConfig.cor}33`,
          }}
        >
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <div
              className="flex items-center justify-center w-14 h-14 rounded-2xl flex-shrink-0"
              style={{ backgroundColor: categoriaConfig.cor }}
            >
              <categoriaConfig.Icon size={28} color="white" strokeWidth={2} />
            </div>
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-1"
                style={{
                  color: categoriaConfig.cor,
                  fontFamily: "var(--font-lato), Arial, sans-serif",
                }}
              >
                Categoria
              </p>
              <h1
                className="text-3xl font-bold text-[#1A1A2E]"
                style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
              >
                {categoriaConfig.nome}
              </h1>
              <p
                className="text-sm text-gray-500 mt-1"
                style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
              >
                {total} mensagem{total !== 1 ? "s" : ""} encontrada{total !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Grid de mensagens com paginação */}
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-10">
          <CategoriaGrid
            mensagens={mensagens}
            fotos={fotos}
            pagina={pagina}
            totalPaginas={totalPaginas}
            slugCategoria={slug}
          />
        </div>

        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
