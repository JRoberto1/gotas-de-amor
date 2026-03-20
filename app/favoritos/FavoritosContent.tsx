"use client";

// Conteúdo client-side da página de favoritos — lê e gerencia o localStorage
import { useState, useEffect } from "react";
import { Heart, Trash2, Copy, Share2 } from "lucide-react";
import Link from "next/link";
import { CATEGORIAS } from "@/lib/categorias";
import { IMAGENS_CATEGORIA } from "@/lib/imagens";
import type { Mensagem } from "@/components/MessageCard";

const STORAGE_KEY = "gotas-favoritos";

// Lê favoritos do localStorage com tratamento de erro
function lerFavoritos(): Mensagem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Mensagem[]) : [];
  } catch {
    return [];
  }
}

// Remove um favorito pelo _id e atualiza o localStorage
function removerFavorito(id: string, lista: Mensagem[]): Mensagem[] {
  const nova = lista.filter((m) => m._id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nova));
  } catch {
    // fallback silencioso
  }
  return nova;
}

// Card de favorito com botões Copiar, Compartilhar e Remover
function CardFavorito({
  mensagem,
  onRemover,
}: {
  mensagem: Mensagem;
  onRemover: (id: string) => void;
}) {
  const [copiado, setCopiado] = useState(false);
  const categoriaConfig = CATEGORIAS.find((c) => c.valor === mensagem.categoria);
  const imagem = IMAGENS_CATEGORIA[mensagem.categoria] ?? IMAGENS_CATEGORIA["reflexao"];
  const slug = mensagem.slug?.current;

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(mensagem.texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // fallback silencioso
    }
  };

  const compartilhar = async () => {
    if (navigator.share) {
      await navigator.share({
        title: mensagem.titulo,
        text: mensagem.texto,
        url: slug ? `${window.location.origin}/mensagem/${slug}` : window.location.href,
      });
    } else {
      copiar();
    }
  };

  return (
    <article className="flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Foto */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: 160 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imagem}
          alt={`Mensagem: ${mensagem.titulo}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Coração preenchido indicando favorito */}
        <div
          className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full"
          style={{ backgroundColor: "#E8537A" }}
        >
          <Heart size={14} color="white" fill="white" />
        </div>
      </div>

      {/* Corpo */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Badge da categoria */}
        {categoriaConfig && (
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full self-start"
            style={{
              backgroundColor: categoriaConfig.corFundo,
              color: categoriaConfig.cor,
              border: `1px solid ${categoriaConfig.corBorda}`,
            }}
          >
            <categoriaConfig.Icon size={11} strokeWidth={2.5} />
            {categoriaConfig.nome}
          </span>
        )}

        {/* Título com link se tiver slug */}
        {slug ? (
          <Link href={`/mensagem/${slug}`}>
            <h2
              className="font-semibold text-[#1A1A2E] leading-snug hover:text-[#E8537A] transition-colors"
              style={{ fontFamily: "var(--font-playfair-display), Georgia, serif", fontSize: 15 }}
            >
              {mensagem.titulo}
            </h2>
          </Link>
        ) : (
          <h2
            className="font-semibold text-[#1A1A2E] leading-snug"
            style={{ fontFamily: "var(--font-playfair-display), Georgia, serif", fontSize: 15 }}
          >
            {mensagem.titulo}
          </h2>
        )}

        {/* Texto curto */}
        <p
          className="text-gray-500 text-sm leading-relaxed flex-1"
          style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
        >
          {mensagem.texto.length > 100
            ? mensagem.texto.slice(0, mensagem.texto.lastIndexOf(" ", 100)) + "…"
            : mensagem.texto}
        </p>

        {/* Botões de ação */}
        <div className="border-t border-gray-100 pt-3 flex items-center gap-2">
          <button
            onClick={compartilhar}
            className="flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1.5 rounded-full flex-1 justify-center transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#E8537A" }}
            aria-label="Compartilhar mensagem"
          >
            <Share2 size={12} /> Compartilhar
          </button>
          <button
            onClick={copiar}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors"
            aria-label="Copiar mensagem"
          >
            <Copy size={12} />
            {copiado ? "Copiado!" : "Copiar"}
          </button>
          {/* Remover dos favoritos */}
          <button
            onClick={() => onRemover(mensagem._id)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-red-50 transition-colors flex-shrink-0"
            aria-label="Remover dos favoritos"
          >
            <Trash2 size={13} className="text-gray-400 hover:text-red-400" />
          </button>
        </div>
      </div>
    </article>
  );
}

// Estado vazio — nenhum favorito salvo ainda
function EstadoVazio() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div
        className="flex items-center justify-center w-20 h-20 rounded-full mb-5"
        style={{ backgroundColor: "#E8537A15" }}
      >
        <Heart size={36} style={{ color: "#E8537A" }} strokeWidth={1.5} />
      </div>
      <h2
        className="text-2xl font-semibold text-[#1A1A2E] mb-3"
        style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
      >
        Nenhum favorito ainda
      </h2>
      <p
        className="text-gray-500 max-w-sm mb-6"
        style={{ fontFamily: "var(--font-lato), Arial, sans-serif", fontSize: 15 }}
      >
        Toque no ícone de coração em qualquer mensagem para salvá-la aqui. Seus
        favoritos ficam guardados neste dispositivo.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-full transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#E8537A" }}
      >
        Explorar mensagens
      </Link>
    </div>
  );
}

export default function FavoritosContent() {
  // Inicializa com array vazio para evitar hydration mismatch
  const [favoritos, setFavoritos] = useState<Mensagem[]>([]);
  const [carregado, setCarregado] = useState(false);

  // Lê localStorage apenas no cliente após hidratação
  useEffect(() => {
    setFavoritos(lerFavoritos());
    setCarregado(true);
  }, []);

  const handleRemover = (id: string) => {
    setFavoritos((lista) => removerFavorito(id, lista));
  };

  const limparTodos = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // fallback silencioso
    }
    setFavoritos([]);
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-10">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-3xl font-bold text-[#1A1A2E]"
            style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
          >
            Meus Favoritos
          </h1>
          {carregado && favoritos.length > 0 && (
            <p
              className="text-gray-500 text-sm mt-1"
              style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
            >
              {favoritos.length} mensagem{favoritos.length !== 1 ? "s" : ""} salva{favoritos.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Botão limpar tudo */}
        {carregado && favoritos.length > 0 && (
          <button
            onClick={limparTodos}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-100 hover:bg-red-50 hover:text-red-500 px-3 py-2 rounded-full transition-colors"
            style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
          >
            <Trash2 size={13} /> Limpar tudo
          </button>
        )}
      </div>

      {/* Conteúdo: estado vazio ou grid de favoritos */}
      {!carregado ? (
        // Skeleton enquanto carrega o localStorage
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden bg-white border border-gray-100"
            >
              <div className="bg-gray-200 animate-pulse" style={{ height: 160 }} />
              <div className="p-4 flex flex-col gap-3">
                <div className="h-4 bg-gray-200 animate-pulse rounded-full w-24" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                <div className="h-3 bg-gray-200 animate-pulse rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : favoritos.length === 0 ? (
        <EstadoVazio />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {favoritos.map((m) => (
            <CardFavorito key={m._id} mensagem={m} onRemover={handleRemover} />
          ))}
        </div>
      )}
    </div>
  );
}
