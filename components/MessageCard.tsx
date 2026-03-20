"use client";

import { useState } from "react";
import { Copy, Share2 } from "lucide-react";
import { CATEGORIAS } from "./CategoryFilter";

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

// Imagens Unsplash por categoria (URLs diretas, sem API key)
const IMAGENS_CATEGORIA: Record<string, string> = {
  "bom-dia":
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  "boa-noite":
    "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600&q=80",
  amor: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80",
  "fe-espiritualidade":
    "https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=600&q=80",
  familia:
    "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&q=80",
  motivacao:
    "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600&q=80",
  amizade:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
  aniversario:
    "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600&q=80",
  "datas-comemorativas":
    "https://images.unsplash.com/photo-1518365050014-70fe7232a541?w=600&q=80",
  "meses-tematicos":
    "https://images.unsplash.com/photo-1518365050014-70fe7232a541?w=600&q=80",
  reflexao:
    "https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=600&q=80",
};

// Trunca o texto em até maxChars caracteres sem cortar no meio de uma palavra
function truncarTexto(texto: string, maxChars: number): string {
  if (texto.length <= maxChars) return texto;
  const cortado = texto.slice(0, maxChars);
  const ultimoEspaco = cortado.lastIndexOf(" ");
  return cortado.slice(0, ultimoEspaco) + "…";
}

// Card individual de mensagem
function MessageCard({ mensagem }: { mensagem: Mensagem }) {
  const [copiado, setCopiado] = useState(false);

  const categoriaConfig = CATEGORIAS.find((c) => c.valor === mensagem.categoria);
  const imagem =
    IMAGENS_CATEGORIA[mensagem.categoria] ?? IMAGENS_CATEGORIA["reflexao"];

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
        url: window.location.href,
      });
    } else {
      copiar();
    }
  };

  return (
    <article
      className="relative overflow-hidden cursor-pointer group"
      style={{ aspectRatio: "3/4", borderRadius: 16 }}
    >
      {/* Imagem de fundo com zoom suave no hover */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imagem}
        alt={mensagem.titulo}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      {/* Overlay gradiente escuro de baixo para cima */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.50) 50%, rgba(0,0,0,0.10) 100%)",
        }}
      />

      {/* Conteúdo sobre a imagem */}
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        {/* Badge da categoria com backdrop-blur */}
        {categoriaConfig && (
          <div className="flex items-start">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full backdrop-blur-sm"
              style={{
                backgroundColor: `${categoriaConfig.corFundo}CC`,
                color: categoriaConfig.cor,
                border: `1px solid ${categoriaConfig.corBorda}66`,
              }}
            >
              <categoriaConfig.Icon size={11} strokeWidth={2.5} />
              {categoriaConfig.nome}
            </span>
          </div>
        )}

        {/* Texto da mensagem e botões */}
        <div className="flex flex-col gap-3">
          <p
            className="text-white"
            style={{
              fontFamily: "var(--font-lato), Arial, sans-serif",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: 15,
              lineHeight: 1.8,
              textShadow: "0 2px 8px rgba(0,0,0,0.9)",
            }}
          >
            {truncarTexto(mensagem.texto, 120)}
          </p>

          {/* Botões Copiar e Compartilhar */}
          <div className="flex items-center gap-2">
            <button
              onClick={copiar}
              className="flex items-center gap-1 text-xs font-semibold text-white bg-white/20 hover:bg-white/35 backdrop-blur-sm px-2.5 py-1.5 rounded-full transition-colors"
              aria-label="Copiar mensagem"
            >
              <Copy size={11} />
              {copiado ? "Copiado!" : "Copiar"}
            </button>
            <button
              onClick={compartilhar}
              className="flex items-center gap-1 text-xs font-semibold text-white bg-white/20 hover:bg-white/35 backdrop-blur-sm px-2.5 py-1.5 rounded-full transition-colors"
              aria-label="Compartilhar mensagem"
            >
              <Share2 size={11} />
              Compartilhar
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

// Skeleton de carregamento com mesma proporção do card
function MessageCardSkeleton() {
  return (
    <div
      className="bg-gray-200 animate-pulse"
      style={{ aspectRatio: "3/4", borderRadius: 16 }}
    />
  );
}

// Mensagens de exemplo para quando o Sanity não retornar dados
const MENSAGENS_FALLBACK: Mensagem[] = [
  {
    _id: "fb-1",
    titulo: "Cada Amanhecer É um Recomeço",
    texto:
      "Que este novo dia traga leveza para o seu coração e clareza para os seus passos. O sol nasceu de novo — e com ele, a chance de ser ainda melhor do que você foi ontem.",
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

// Grid de mensagens com filtro por categoria aplicado
export default function MensagensGrid({
  mensagens,
  carregando = false,
  categoriaAtiva,
}: MensagensGridProps) {
  // Usa mensagens do Sanity se houver, senão usa fallback
  const fonte = mensagens.length > 0 ? mensagens : MENSAGENS_FALLBACK;

  // Filtra pelo categoria selecionada no filtro
  const filtradas =
    categoriaAtiva
      ? fonte.filter((m) => m.categoria === categoriaAtiva)
      : fonte;

  if (carregando) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtradas.map((mensagem) => (
        <MessageCard key={mensagem._id} mensagem={mensagem} />
      ))}
    </div>
  );
}
