"use client";

import { useState } from "react";
import { Copy, Share2, Heart, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { CATEGORIAS } from "@/lib/categorias";
import { IMAGENS_CATEGORIA, ALT_CATEGORIA } from "@/lib/imagens";

// Reexporta para manter compatibilidade com imports existentes
export { IMAGENS_CATEGORIA };

// Tipo Mensagem alinhado ao schema do Sanity
export interface Mensagem {
  _id: string;
  titulo: string;
  texto: string;
  categoria: string;
  tags?: string[];
  slug?: { current: string };
  destaque?: boolean;
}


// Trunca em até maxChars sem cortar no meio de uma palavra
function truncarTexto(texto: string, maxChars: number): string {
  if (texto.length <= maxChars) return texto;
  const cortado = texto.slice(0, maxChars);
  const ultimoEspaco = cortado.lastIndexOf(" ");
  return cortado.slice(0, ultimoEspaco) + "…";
}

// Card individual — foto em cima (180px) + corpo branco embaixo
function MessageCard({ mensagem }: { mensagem: Mensagem }) {
  const [copiado, setCopiado] = useState(false);
  const [favoritado, setFavoritado] = useState(false);
  const [expandido, setExpandido] = useState(false);

  const categoriaConfig = CATEGORIAS.find((c) => c.valor === mensagem.categoria);
  const imagem = IMAGENS_CATEGORIA[mensagem.categoria] ?? IMAGENS_CATEGORIA["reflexao"];
  const altText = ALT_CATEGORIA[mensagem.categoria] ?? "Imagem temática da mensagem";
  const textoExibido = expandido ? mensagem.texto : truncarTexto(mensagem.texto, 120);
  const precisaExpandir = mensagem.texto.length > 120;
  const slug = mensagem.slug?.current;

  // Copia o texto para a área de transferência
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(mensagem.texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // fallback silencioso
    }
  };

  // Compartilha via Web Share API com fallback para copiar
  const compartilhar = async () => {
    if (navigator.share) {
      await navigator.share({
        title: mensagem.titulo,
        text: mensagem.texto,
        url: slug
          ? `${window.location.origin}/mensagem/${slug}`
          : window.location.href,
      });
    } else {
      copiar();
    }
  };

  return (
    <article className="flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      {/* Foto temática (180px) com link para página individual se tiver slug */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: 180 }}>
        {slug ? (
          <Link
            href={`/mensagem/${slug}`}
            tabIndex={-1}
            aria-label={`Ver mensagem: ${mensagem.titulo}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagem}
              alt={altText}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </Link>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imagem}
            alt={altText}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}

        {/* Badge de destaque */}
        {mensagem.destaque && (
          <span
            className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "#F9C74F", color: "#1A1A2E" }}
          >
            Destaque
          </span>
        )}
      </div>

      {/* Corpo branco */}
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

        {/* Título em Playfair Display */}
        {slug ? (
          <Link href={`/mensagem/${slug}`}>
            <h2
              className="font-semibold text-[#1A1A2E] leading-snug hover:text-[#E8537A] transition-colors"
              style={{
                fontFamily: "var(--font-playfair-display), Georgia, serif",
                fontSize: 16,
              }}
            >
              {mensagem.titulo}
            </h2>
          </Link>
        ) : (
          <h2
            className="font-semibold text-[#1A1A2E] leading-snug"
            style={{
              fontFamily: "var(--font-playfair-display), Georgia, serif",
              fontSize: 16,
            }}
          >
            {mensagem.titulo}
          </h2>
        )}

        {/* Texto da mensagem em Lato */}
        <p
          className="text-gray-600 flex-1"
          style={{
            fontFamily: "var(--font-lato), Arial, sans-serif",
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          {textoExibido}
        </p>

        {/* Botão expansível "Ler mensagem completa" */}
        {precisaExpandir && (
          <button
            onClick={() => setExpandido(!expandido)}
            className="flex items-center gap-1 text-xs font-semibold self-start transition-colors hover:opacity-80"
            style={{ color: "#E8537A" }}
          >
            {expandido ? (
              <>
                <ChevronUp size={13} /> Mostrar menos
              </>
            ) : (
              <>
                <ChevronDown size={13} /> Ler mensagem completa
              </>
            )}
          </button>
        )}

        {/* Botões de ação */}
        <div className="border-t border-gray-100 pt-3 flex items-center gap-2">
          {/* Compartilhar — destaque rosa */}
          <button
            onClick={compartilhar}
            className="flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1.5 rounded-full transition-opacity hover:opacity-90 flex-1 justify-center"
            style={{ backgroundColor: "#E8537A" }}
            aria-label="Compartilhar mensagem"
          >
            <Share2 size={12} />
            Compartilhar
          </button>

          {/* Copiar */}
          <button
            onClick={copiar}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors"
            aria-label="Copiar mensagem"
          >
            <Copy size={12} />
            {copiado ? "Copiado!" : "Copiar"}
          </button>

          {/* Favoritar */}
          <button
            onClick={() => setFavoritado(!favoritado)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-pink-50 transition-colors flex-shrink-0"
            aria-label={favoritado ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Heart
              size={14}
              style={{ color: favoritado ? "#E8537A" : "#9ca3af" }}
              fill={favoritado ? "#E8537A" : "none"}
            />
          </button>
        </div>
      </div>
    </article>
  );
}

// Skeleton de carregamento com estrutura do novo card
function MessageCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100">
      <div className="bg-gray-200 animate-pulse flex-shrink-0" style={{ height: 180 }} />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-5 bg-gray-200 animate-pulse rounded-full w-24" />
        <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 animate-pulse rounded w-full" />
          <div className="h-3 bg-gray-200 animate-pulse rounded w-5/6" />
          <div className="h-3 bg-gray-200 animate-pulse rounded w-4/6" />
        </div>
        <div className="flex gap-2 pt-1">
          <div className="h-7 bg-gray-200 animate-pulse rounded-full flex-1" />
          <div className="h-7 bg-gray-200 animate-pulse rounded-full w-20" />
          <div className="h-7 w-7 bg-gray-200 animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  );
}

// Mensagens de fallback quando o Sanity não retornar dados
export const MENSAGENS_FALLBACK: Mensagem[] = [
  {
    _id: "fb-1",
    titulo: "Cada Amanhecer É um Recomeço",
    texto:
      "Que este novo dia traga leveza para o seu coração e clareza para os seus passos. O sol nasceu de novo — e com ele, a chance de ser ainda melhor do que você foi ontem. Respire fundo, sorria para a vida.",
    categoria: "bom-dia",
    destaque: true,
  },
  {
    _id: "fb-2",
    titulo: "A Noite Tem Seu Próprio Encanto",
    texto:
      "Que a calma da noite envolva você com paz e serenidade. Deixe para trás os pesos do dia e descanse com a certeza de que amanhã trará novas oportunidades.",
    categoria: "boa-noite",
  },
  {
    _id: "fb-3",
    titulo: "Amor é a Linguagem que Todos Entendem",
    texto:
      "Amar é o ato mais corajoso que existe. É se abrir para o outro sem garantias, é escolher todos os dias, é crescer junto mesmo nas diferenças.",
    categoria: "amor",
  },
  {
    _id: "fb-4",
    titulo: "A Fé Move o que os Olhos Não Veem",
    texto:
      "Quando o caminho parece escuro e as forças parecem acabar, é a fé que acende a chama dentro de nós. Confie no processo e siga em frente com o coração cheio de esperança.",
    categoria: "fe-espiritualidade",
  },
  {
    _id: "fb-5",
    titulo: "Família é o Lar que Carregamos no Coração",
    texto:
      "A família não é apenas aquela com quem compartilhamos o sangue — é com quem dividimos as risadas, as lágrimas e os abraços que curam.",
    categoria: "familia",
  },
  {
    _id: "fb-6",
    titulo: "Você é Mais Forte do que Imagina",
    texto:
      "Cada obstáculo que você superou até aqui foi uma prova da sua força. Continue — o melhor ainda está por vir.",
    categoria: "motivacao",
  },
];

interface MensagensGridProps {
  mensagens: Mensagem[];
  carregando?: boolean;
  categoriaAtiva: string | null;
}

// Grid de mensagens — 2 colunas desktop, 1 mobile
export default function MensagensGrid({
  mensagens,
  carregando = false,
  categoriaAtiva,
}: MensagensGridProps) {
  const fonte = mensagens.length > 0 ? mensagens : MENSAGENS_FALLBACK;
  const filtradas = categoriaAtiva
    ? fonte.filter((m) => m.categoria === categoriaAtiva)
    : fonte;

  if (carregando) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <MessageCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (filtradas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p
          className="text-lg text-gray-500"
          style={{
            fontFamily: "var(--font-playfair-display), Georgia, serif",
            fontStyle: "italic",
          }}
        >
          Nenhuma mensagem encontrada nessa categoria.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Selecione outra categoria ou veja todas as mensagens.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {filtradas.map((mensagem) => (
        <MessageCard key={mensagem._id} mensagem={mensagem} />
      ))}
    </div>
  );
}
