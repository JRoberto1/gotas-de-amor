"use client";

import { useState } from "react";
import { Copy, Share2, Heart, Check } from "lucide-react";
import { type MensagemPascoa } from "./page";

// Card com foto — mesmo padrão do CardElaborada do dia-das-maes
function CardComFoto({
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
    <article className="flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
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
        <h2
          className="font-semibold text-[#1A1A2E] leading-snug"
          style={{ fontFamily: "var(--font-playfair-display), Georgia, serif", fontSize: 16 }}
        >
          {mensagem.titulo}
        </h2>
        <p
          className="text-gray-600 flex-1"
          style={{ fontFamily: "var(--font-lato), Arial, sans-serif", fontSize: 14, lineHeight: 1.8 }}
        >
          {mensagem.texto}
        </p>
        <div className="border-t border-gray-100 pt-3 flex items-center gap-2">
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

// Card sem foto — gradiente verde como fallback (mesmo padrão do CardCurta do dia-das-maes)
function CardGradiente({ mensagem }: { mensagem: MensagemPascoa }) {
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
    <article
      className="flex flex-col rounded-2xl overflow-hidden shadow-sm border border-green-100 hover:shadow-md transition-shadow duration-300"
      style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)" }}
    >
      <div className="flex flex-col flex-1 p-5 gap-3">
        <span
          className="inline-flex items-center self-start text-xs font-bold px-2.5 py-1 rounded-full text-white"
          style={{ backgroundColor: "#52B788" }}
        >
          Páscoa
        </span>
        <h2
          className="font-semibold text-[#1A1A2E] leading-snug"
          style={{ fontFamily: "var(--font-playfair-display), Georgia, serif", fontSize: 16 }}
        >
          {mensagem.titulo}
        </h2>
        <p
          className="text-gray-700 flex-1 italic"
          style={{ fontFamily: "var(--font-lato), Arial, sans-serif", fontSize: 15, lineHeight: 1.75 }}
        >
          &ldquo;{mensagem.texto}&rdquo;
        </p>
        <div className="border-t border-green-200 pt-3 flex items-center gap-2">
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
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-white hover:bg-gray-50 px-3 py-1.5 rounded-full transition-colors border border-green-200"
            aria-label="Copiar mensagem"
          >
            {copiado ? <Check size={12} /> : <Copy size={12} />}
            {copiado ? "Copiado!" : "Copiar"}
          </button>
          <button
            onClick={() => setFavoritado(!favoritado)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white hover:bg-green-50 transition-colors border border-green-200 flex-shrink-0"
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
  /** URLs por _id, vindas do servidor via Pexels API */
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
        {mensagens.map((mensagem) => {
          const foto = fotos[mensagem._id] ?? "";
          // Com foto → card com imagem; sem foto → gradiente verde (mesmo padrão dia-das-maes)
          return foto
            ? <CardComFoto    key={mensagem._id} mensagem={mensagem} foto={foto} />
            : <CardGradiente  key={mensagem._id} mensagem={mensagem} />;
        })}
      </div>
    </section>
  );
}
