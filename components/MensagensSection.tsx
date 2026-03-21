"use client";

// Seção client-side: filtro + Mensagem do Dia + grid rotativo diário
import { useState, useEffect } from "react";
import { Copy, Share2, CalendarDays } from "lucide-react";
import Link from "next/link";
import CategoryFilter from "./CategoryFilter";
import MensagensGrid, { type Mensagem, IMAGENS_CATEGORIA, MENSAGENS_FALLBACK } from "./MessageCard";
import { CATEGORIAS } from "@/lib/categorias";
import { seedDoDia, embaralharComSeed, dataHojeFormatada } from "@/lib/rotacaoDiaria";

interface MensagensSectionProps {
  mensagens: Mensagem[];
  fotos?: Record<string, string>;
}

// Card especial "Mensagem do Dia" — ocupa largura total acima do grid
function CardMensagemDoDia({ mensagem, foto }: { mensagem: Mensagem; foto?: string }) {
  const [copiado, setCopiado] = useState(false);
  const [dataHoje, setDataHoje] = useState("");

  // Formata data apenas no cliente para evitar hydration mismatch
  useEffect(() => {
    setDataHoje(dataHojeFormatada());
  }, []);

  const categoriaConfig = CATEGORIAS.find((c) => c.valor === mensagem.categoria);
  const imagem = foto || (IMAGENS_CATEGORIA[mensagem.categoria] ?? IMAGENS_CATEGORIA["reflexao"]);
  const slug = mensagem.slug?.current;

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(mensagem.texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
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
    <article className="rounded-2xl overflow-hidden bg-white shadow-md border border-[#E8537A]/20 mb-6">
      <div className="flex flex-col sm:flex-row">
        {/* Imagem lateral */}
        <div className="relative overflow-hidden flex-shrink-0 sm:w-64" style={{ height: 220 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imagem}
            alt={`Mensagem do Dia: ${mensagem.titulo}`}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        {/* Conteúdo */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full text-white"
              style={{ backgroundColor: "#E8537A" }}
            >
              <CalendarDays size={11} />
              Mensagem do Dia
            </span>
            {dataHoje && (
              <span
                className="text-xs text-gray-400"
                style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
              >
                {dataHoje}
              </span>
            )}
            {categoriaConfig && (
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: categoriaConfig.corFundo,
                  color: categoriaConfig.cor,
                  border: `1px solid ${categoriaConfig.corBorda}`,
                }}
              >
                <categoriaConfig.Icon size={10} strokeWidth={2.5} />
                {categoriaConfig.nome}
              </span>
            )}
          </div>

          {/* Título */}
          {slug ? (
            <Link href={`/mensagem/${slug}`}>
              <h2
                className="font-bold text-[#1A1A2E] leading-snug hover:text-[#E8537A] transition-colors"
                style={{ fontFamily: "var(--font-playfair-display), Georgia, serif", fontSize: 20 }}
              >
                {mensagem.titulo}
              </h2>
            </Link>
          ) : (
            <h2
              className="font-bold text-[#1A1A2E] leading-snug"
              style={{ fontFamily: "var(--font-playfair-display), Georgia, serif", fontSize: 20 }}
            >
              {mensagem.titulo}
            </h2>
          )}

          {/* Texto completo */}
          <p
            className="text-gray-600 flex-1 leading-relaxed"
            style={{ fontFamily: "var(--font-lato), Arial, sans-serif", fontSize: 15, lineHeight: 1.75 }}
          >
            {mensagem.texto}
          </p>

          {/* Botões */}
          <div className="flex items-center gap-2 pt-1 border-t border-gray-100 flex-wrap">
            <button
              onClick={compartilhar}
              className="flex items-center gap-1.5 text-xs font-semibold text-white px-4 py-2 rounded-full transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#E8537A" }}
              aria-label="Compartilhar mensagem do dia"
            >
              <Share2 size={12} /> Compartilhar
            </button>
            <button
              onClick={copiar}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors"
              aria-label="Copiar mensagem do dia"
            >
              <Copy size={12} />
              {copiado ? "Copiado!" : "Copiar texto"}
            </button>
            {slug && (
              <Link
                href={`/mensagem/${slug}`}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#E8537A] hover:underline ml-auto"
                style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
              >
                Ver completa
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function MensagensSection({ mensagens, fotos }: MensagensSectionProps) {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(null);

  // Seed calculado apenas no cliente para evitar hydration mismatch
  const [seedDiario, setSeedDiario] = useState<number | null>(null);

  useEffect(() => {
    setSeedDiario(seedDoDia());
  }, []);

  // Usa dados do Sanity se disponíveis, senão usa fallback
  const fonte = mensagens.length > 0 ? mensagens : MENSAGENS_FALLBACK;

  // Mensagem do Dia: sempre da fonte completa (sem filtro de categoria)
  const mensagemDia =
    seedDiario !== null && fonte.length > 0
      ? embaralharComSeed(fonte, seedDiario)[0]
      : null;

  // Mensagens filtradas pela categoria ativa
  const filtradas = categoriaAtiva
    ? fonte.filter((m) => m.categoria === categoriaAtiva)
    : fonte;

  // Grid rotativo: embaralhado com seed do dia para ordem consistente entre usuários
  const gridRotativo =
    seedDiario !== null ? embaralharComSeed(filtradas, seedDiario) : filtradas;

  // Remove a Mensagem do Dia do grid quando sem filtro para evitar duplicata
  const gridFinal =
    !categoriaAtiva && mensagemDia
      ? gridRotativo.filter((m) => m._id !== mensagemDia._id)
      : gridRotativo;

  // Exibe a Mensagem do Dia apenas sem filtro de categoria ativo
  const mostrarMensagemDoDia = !categoriaAtiva && mensagemDia !== null;

  return (
    <section className="flex-1 w-full">
      {/* Filtro de categorias em pills com scroll horizontal */}
      <CategoryFilter categoriaAtiva={categoriaAtiva} onChange={setCategoriaAtiva} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
        {/* Card "Mensagem do Dia" acima do grid — só quando sem filtro ativo */}
        {mostrarMensagemDoDia && mensagemDia && (
          <CardMensagemDoDia mensagem={mensagemDia} foto={fotos?.[mensagemDia._id]} />
        )}

        {/* Grid de mensagens rotativo — passa a lista já ordenada com seed do dia */}
        <MensagensGrid mensagens={gridFinal} fotos={fotos} categoriaAtiva={null} />
      </div>
    </section>
  );
}
