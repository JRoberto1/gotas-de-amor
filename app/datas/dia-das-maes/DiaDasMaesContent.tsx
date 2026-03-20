"use client";

import { useState } from "react";
import { Copy, Share2, Heart, Check } from "lucide-react";

type Categoria = "curta" | "elaborada";

interface MensagemDia {
  id: number;
  titulo: string;
  texto: string;
  categoria: Categoria;
}


const MENSAGENS: MensagemDia[] = [
  {
    id: 1,
    titulo: "O Amor Sem Motivo",
    texto: "Mãe é o único amor que não precisa de motivo para existir.",
    categoria: "curta",
  },
  {
    id: 2,
    titulo: "O Cheiro do Seu Abraço",
    texto:
      "Onde quer que eu esteja, levo comigo o cheiro do seu abraço e a certeza do seu amor.",
    categoria: "curta",
  },
  {
    id: 3,
    titulo: "Minha Primeira Casa",
    texto:
      "Mãe, você foi minha primeira casa — o lugar onde aprendi que o mundo podia ser seguro. Obrigado por ser esse lar que nunca fecha as portas.",
    categoria: "elaborada",
  },
  {
    id: 4,
    titulo: "Palavras Que Faltam",
    texto:
      "Nenhuma palavra foi inventada ainda que caiba tudo que sinto por você, mãe.",
    categoria: "curta",
  },
  {
    id: 5,
    titulo: "Aprendi Com Você",
    texto:
      "Cresci observando suas mãos trabalhando, seus olhos velejando e seu coração nunca desistindo. Foi assim que aprendi o que é força. Feliz Dia das Mães.",
    categoria: "elaborada",
  },
  {
    id: 6,
    titulo: "Conhece o Melhor de Mim",
    texto:
      "Mãe é a pessoa que conhece nossa pior versão e ainda assim torce pela melhor.",
    categoria: "curta",
  },
  {
    id: 7,
    titulo: "Saudade Que Aperta",
    texto:
      "Tem dias que a saudade aperta tanto que parece que você está aqui. E talvez esteja — em cada escolha que faço, em cada vez que cuido de quem amo. Te amo, mãe.",
    categoria: "elaborada",
  },
  {
    id: 8,
    titulo: "Você Me Ensinou a Voar",
    texto:
      "Você não me deu asas para me ver voar. Você me ensinou a voar para que eu pudesse voltar.",
    categoria: "curta",
  },
  {
    id: 9,
    titulo: "Acreditou Quando Eu Duvidei",
    texto:
      "Mãe, eu não precisei entender tudo na vida — precisei só de você acreditando em mim quando eu mesmo duvidei. Isso foi suficiente para tudo.",
    categoria: "elaborada",
  },
  {
    id: 10,
    titulo: "Amor Sem Distância",
    texto:
      "O amor de mãe não tem distância, não tem horário, não tem fim.",
    categoria: "curta",
  },
  {
    id: 11,
    titulo: "Lugar Que Tem Seu Nome",
    texto:
      "Se existe um lugar no mundo onde posso ser exatamente quem eu sou, sem medo e sem julgamento, esse lugar tem o seu nome, mãe.",
    categoria: "elaborada",
  },
  {
    id: 12,
    titulo: "Chora Pela Sua Alegria",
    texto:
      "Mãe: a única pessoa que chora de alegria pelas suas conquistas mais do que você mesmo.",
    categoria: "curta",
  },
  {
    id: 13,
    titulo: "Sacrifícios em Silêncio",
    texto:
      "Você abriu mão de tantas coisas em silêncio que só hoje entendo o tamanho do seu amor. Obrigado por cada sacrifício que você nunca chamou assim.",
    categoria: "elaborada",
  },
  {
    id: 14,
    titulo: "Casa é o Seu Colo",
    texto: "Casa não é um endereço. Casa é o colo da minha mãe.",
    categoria: "curta",
  },
  {
    id: 15,
    titulo: "O Maior Sonho",
    texto:
      "Tem uma foto antiga sua que guardo no coração: você jovem, de olhos cheios de sonhos, segurando minha mão pequena. Hoje entendo — eu era o seu maior sonho. E você é o meu maior amor.",
    categoria: "elaborada",
  },
  {
    id: 16,
    titulo: "Amor de Cada Dia",
    texto:
      "Mãe, você me ensinou que amor de verdade aparece todo dia, não só nas datas especiais.",
    categoria: "elaborada",
  },
  {
    id: 17,
    titulo: "A Voz Que Me Ergueu",
    texto:
      "Quando a vida ficou pesada demais, foi a sua voz que me lembrou que eu conseguia. Você nunca me deixou desistir — nem de mim mesmo. Feliz Dia das Mães.",
    categoria: "elaborada",
  },
  {
    id: 18,
    titulo: "Nunca Estamos Sozinhos",
    texto:
      "Todo filho carrega a mãe dentro de si. É por isso que nunca estamos sozinhos.",
    categoria: "curta",
  },
  {
    id: 19,
    titulo: "Ainda Quero Seu Colo",
    texto:
      "Mãe, eu cresci. Mas toda vez que algo dói, ainda quero o seu colo. Isso nunca vai mudar — e eu agradeço a Deus por isso todo dia.",
    categoria: "elaborada",
  },
  {
    id: 20,
    titulo: "O Que Permanece",
    texto:
      "O mundo inteiro pode mudar, mas o amor que sinto por você, mãe, é a única coisa que permanece igual.",
    categoria: "curta",
  },
];


function CardCurta({ mensagem }: { mensagem: MensagemDia }) {
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
      className="flex flex-col rounded-2xl overflow-hidden shadow-sm border border-pink-100 hover:shadow-md transition-shadow duration-300"
      style={{
        background: "linear-gradient(135deg, #fff5f7 0%, #fce4ec 100%)",
      }}
    >
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Badge */}
        <span
          className="inline-flex items-center self-start text-xs font-bold px-2.5 py-1 rounded-full text-white"
          style={{ backgroundColor: "#E8537A" }}
        >
          Dia das Mães
        </span>

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
          className="text-gray-700 flex-1 italic"
          style={{
            fontFamily: "var(--font-lato), Arial, sans-serif",
            fontSize: 15,
            lineHeight: 1.75,
          }}
        >
          &ldquo;{mensagem.texto}&rdquo;
        </p>

        {/* Botões */}
        <div className="border-t border-pink-200 pt-3 flex items-center gap-2">
          <button
            onClick={compartilhar}
            className="flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1.5 rounded-full transition-opacity hover:opacity-90 flex-1 justify-center"
            style={{ backgroundColor: "#E8537A" }}
            aria-label="Compartilhar mensagem"
          >
            <Share2 size={12} /> Compartilhar
          </button>
          <button
            onClick={copiar}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-white hover:bg-gray-50 px-3 py-1.5 rounded-full transition-colors border border-pink-200"
            aria-label="Copiar mensagem"
          >
            {copiado ? <Check size={12} /> : <Copy size={12} />}
            {copiado ? "Copiado!" : "Copiar"}
          </button>
          <button
            onClick={() => setFavoritado(!favoritado)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white hover:bg-pink-50 transition-colors border border-pink-200 flex-shrink-0"
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

function CardElaborada({
  mensagem,
  foto,
}: {
  mensagem: MensagemDia;
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
          alt={`Mensagem do Dia das Mães: ${mensagem.titulo}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        {/* Badge sobre a foto */}
        <span
          className="absolute top-3 left-3 inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full text-white"
          style={{ backgroundColor: "#E8537A" }}
        >
          Dia das Mães
        </span>
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
        <div className="border-t border-gray-100 pt-3 flex items-center gap-2">
          <button
            onClick={compartilhar}
            className="flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1.5 rounded-full transition-opacity hover:opacity-90 flex-1 justify-center"
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
            {copiado ? <Check size={12} /> : <Copy size={12} />}
            {copiado ? "Copiado!" : "Copiar"}
          </button>
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

interface DiaDasMaesContentProps {
  /** URLs por ID de mensagem, vindas do servidor via Pexels API */
  fotos: Record<number, string>;
}

export default function DiaDasMaesContent({ fotos }: DiaDasMaesContentProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full">
      <div className="text-center mb-8">
        <h2
          className="text-2xl font-semibold text-[#1A1A2E]"
          style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
        >
          20 Mensagens para o Dia das Mães
        </h2>
        <p
          className="text-sm text-gray-400 mt-1"
          style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
        >
          Copie ou compartilhe diretamente no WhatsApp, Instagram e Facebook
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MENSAGENS.map((mensagem) => {
          const foto = fotos[mensagem.id] ?? "";
          // Card elaborado sem foto disponível é exibido como curta (gradiente)
          if (mensagem.categoria === "elaborada" && foto) {
            return <CardElaborada key={mensagem.id} mensagem={mensagem} foto={foto} />;
          }
          return <CardCurta key={mensagem.id} mensagem={mensagem} />;
        })}
      </div>
    </section>
  );
}
