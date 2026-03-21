"use client";

import { useState } from "react";
import { Copy, Share2, Heart, Check } from "lucide-react";

export interface MensagemPascoa {
  _id: string;
  titulo: string;
  texto: string;
  destaque?: boolean;
  slug?: { current: string };
  pexelsQuery?: string;
}

function CardPascoa({
  mensagem,
  foto,
}: {
  mensagem: MensagemPascoa;
  foto: string;
}) {
  const [copiado, setCopiado] = useState(false);
  const [favoritado, setFavoritado] = useState(false);

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
      await navigator.share({ title: mensagem.titulo, text: mensagem.texto, url: window.location.href });
    } else {
      copiar();
    }
  };

  return (
    <article className="flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm border border-green-100 hover:shadow-md transition-shadow duration-300">
      {/* Foto */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: 180 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={foto}
          alt={`Mensagem de Páscoa: ${mensagem.titulo}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        <span
          className="absolute top-3 left-3 inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full text-white"
          style={{ backgroundColor: "#52B788" }}
        >
          Páscoa
        </span>
        {mensagem.destaque && (
          <span
            className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "#F9C74F", color: "#1A1A2E" }}
          >
            Destaque
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Título */}
        <h2
          className="font-semibold text-[#1A1A2E] leading-snug"
          style={{
            fontFamily: "var(--font-playfair-display), Georgia, serif",
            fontSize: 16,
          }}
        >
          {mensagem.titulo}
        </h2>

        {/* Texto */}
        <p
          className="text-gray-600 flex-1"
          style={{
            fontFamily: "var(--font-lato), Arial, sans-serif",
            fontSize: 14,
            lineHeight: 1.8,
          }}
        >
          {mensagem.texto}
        </p>

        {/* Botões */}
        <div className="border-t border-green-100 pt-3 flex items-center gap-2">
          <button
            onClick={compartilhar}
            className="flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1.5 rounded-full transition-opacity hover:opacity-90 flex-1 justify-center"
            style={{ backgroundColor: "#52B788" }}
            aria-label="Compartilhar mensagem"
          >
            <Share2 size={12} /> Compartilhar
          </button>
          <button
            onClick={copiar}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors"
            aria-label="Copiar mensagem"
          >
            {copiado ? <Check size={12} /> : <Copy size={12} />}
            {copiado ? "Copiado!" : "Copiar"}
          </button>
          <button
            onClick={() => setFavoritado(!favoritado)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-green-50 transition-colors flex-shrink-0"
            aria-label={favoritado ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Heart
              size={14}
              style={{ color: favoritado ? "#52B788" : "#9ca3af" }}
              fill={favoritado ? "#52B788" : "none"}
            />
          </button>
        </div>
      </div>
    </article>
  );
}

interface PascoaContentProps {
  mensagens: MensagemPascoa[];
  fotos: Record<string, string>;
}

export default function PascoaContent({ mensagens, fotos }: PascoaContentProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full">
      <div className="text-center mb-8">
        <h2
          className="text-2xl font-semibold text-[#1A1A2E]"
          style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
        >
          {mensagens.length} Mensagens de Páscoa
        </h2>
        <p
          className="text-sm text-gray-400 mt-1"
          style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
        >
          Copie ou compartilhe diretamente no WhatsApp, Instagram e Facebook
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mensagens.map((mensagem) => (
          <CardPascoa
            key={mensagem._id}
            mensagem={mensagem}
            foto={fotos[mensagem._id] ?? ""}
          />
        ))}
      </div>
    </section>
  );
}
