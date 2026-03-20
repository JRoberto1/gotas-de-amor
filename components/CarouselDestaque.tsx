"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Share2, ChevronLeft, ChevronRight } from "lucide-react";

// Tipo de um slide do carrossel
interface Slide {
  campanha: string;
  tagMes: string;
  frase: string;
  imagem: string;
  corBadge: string;
}

// Calendário completo de campanhas por mês (índice 0 = Janeiro)
const SLIDES_POR_MES: Record<number, Slide[]> = {
  0: [
    {
      campanha: "Janeiro Branco",
      tagMes: "Janeiro",
      frase:
        "Cuidar da mente é um ato de amor. Fale sobre o que sente — você não está sozinho nessa jornada.",
      imagem:
        "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80",
      corBadge: "#8D99AE",
    },
  ],
  1: [
    {
      campanha: "Fevereiro Roxo",
      tagMes: "Fevereiro",
      frase:
        "Prevenir é amar. Conscientizar é cuidar. Neste mês, a luta contra o lúpus e a fibromialgia ganha cor e voz.",
      imagem:
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&q=80",
      corBadge: "#9B72CF",
    },
  ],
  2: [
    {
      campanha: "Dia da Mulher",
      tagMes: "Março",
      frase:
        "Toda mulher carrega dentro de si uma força que move montanhas. Hoje e sempre, celebre quem você é.",
      imagem:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80",
      corBadge: "#E8537A",
    },
  ],
  3: [
    {
      campanha: "Páscoa",
      tagMes: "Abril",
      frase:
        "A Páscoa nos lembra que após cada inverno vem a primavera. Que a renovação chegue ao seu coração.",
      imagem:
        "https://images.unsplash.com/photo-1457301353672-324d6d14f471?w=1200&q=80",
      corBadge: "#52B788",
    },
  ],
  4: [
    {
      campanha: "Dia das Mães",
      tagMes: "Maio",
      frase:
        "Mãe é quem nos ensina que o amor não precisa de palavras — ele se faz presente em cada gesto, em cada abraço.",
      imagem:
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200&q=80",
      corBadge: "#E8537A",
    },
    {
      campanha: "Maio Amarelo",
      tagMes: "Maio",
      frase:
        "No trânsito, um segundo de atenção pode salvar uma vida. Dirija com amor — alguém está esperando você chegar.",
      imagem:
        "https://images.unsplash.com/photo-1494059980473-813e73ee784b?w=1200&q=80",
      corBadge: "#FFD166",
    },
  ],
  5: [
    {
      campanha: "Dia dos Namorados",
      tagMes: "Junho",
      frase:
        "Amar é escolher o outro todos os dias — nos momentos de alegria e nos de tempestade. Feliz Dia dos Namorados.",
      imagem:
        "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&q=80",
      corBadge: "#E8537A",
    },
  ],
  6: [
    {
      campanha: "Dia dos Pais",
      tagMes: "Julho",
      frase:
        "Pai é presença, é exemplo, é o porto seguro que nos ensina a enfrentar o mundo com coragem e amor.",
      imagem:
        "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=1200&q=80",
      corBadge: "#118AB2",
    },
  ],
  7: [
    {
      campanha: "Agosto Dourado",
      tagMes: "Agosto",
      frase:
        "O aleitamento materno é o primeiro ato de amor. Cada gota de leite é uma gota de vida, de proteção, de vínculo eterno.",
      imagem:
        "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&q=80",
      corBadge: "#F9C74F",
    },
  ],
  8: [
    {
      campanha: "Setembro Amarelo",
      tagMes: "Setembro",
      frase:
        "A vida vale a pena ser vivida. Se você está passando por um momento difícil, peça ajuda — não existe fraqueza nisso.",
      imagem:
        "https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?w=1200&q=80",
      corBadge: "#FFD166",
    },
  ],
  9: [
    {
      campanha: "Outubro Rosa",
      tagMes: "Outubro",
      frase:
        "Cuidar de si é um ato de amor. A prevenção salva vidas — faça seus exames e incentive quem você ama a fazer também.",
      imagem:
        "https://images.unsplash.com/photo-1508184964240-ee96bb9677a7?w=1200&q=80",
      corBadge: "#E8537A",
    },
  ],
  10: [
    {
      campanha: "Novembro Azul",
      tagMes: "Novembro",
      frase:
        "Homem que cuida da saúde é homem que ama a família. Prevenção do câncer de próstata começa com uma conversa.",
      imagem:
        "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&q=80",
      corBadge: "#118AB2",
    },
  ],
  11: [
    {
      campanha: "Natal",
      tagMes: "Dezembro",
      frase:
        "Que o Natal renove a esperança no seu coração. O maior presente é estar ao lado de quem amamos.",
      imagem:
        "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=1200&q=80",
      corBadge: "#52B788",
    },
  ],
};

export default function CarouselDestaque() {
  // Mês detectado apenas no cliente via useEffect para evitar erro de hydration.
  // Durante o SSR usamos janeiro (índice 0) como valor neutro.
  const [slides, setSlides] = useState(SLIDES_POR_MES[0]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    const mes = new Date().getMonth();
    setSlides(SLIDES_POR_MES[mes] ?? SLIDES_POR_MES[0]);
    setIndiceAtual(0);
  }, []);

  const slideAtual = slides[indiceAtual];

  // Avança para o próximo slide
  const avancar = useCallback(() => {
    setIndiceAtual((i) => (i + 1) % slides.length);
  }, [slides.length]);

  // Volta para o slide anterior
  const voltar = () => {
    setIndiceAtual((i) => (i - 1 + slides.length) % slides.length);
  };

  // Auto-play a cada 5 segundos quando há mais de um slide
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(avancar, 5000);
    return () => clearInterval(timer);
  }, [slides.length, avancar]);

  // Copia o texto da frase para a área de transferência
  const copiarFrase = async () => {
    try {
      await navigator.clipboard.writeText(slideAtual.frase);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // fallback silencioso
    }
  };

  // Compartilha via Web Share API com fallback
  const compartilhar = async () => {
    if (navigator.share) {
      await navigator.share({
        title: slideAtual.campanha,
        text: slideAtual.frase,
        url: window.location.href,
      });
    } else {
      copiarFrase();
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2">
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 260, borderRadius: 18 }}
      >
        {/* Imagem de fundo com transição de opacidade */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === indiceAtual ? 1 : 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.imagem}
              alt={slide.campanha}
              className="w-full h-full object-cover"
            />
            {/* Overlay gradiente escuro de baixo para cima */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.10) 100%)",
              }}
            />
          </div>
        ))}

        {/* Conteúdo sobre a imagem */}
        <div className="absolute inset-0 flex flex-col justify-between p-5">
          {/* Badge campanha + tag do mês — canto superior esquerdo */}
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-semibold text-white px-3 py-1 rounded-full"
              style={{ backgroundColor: slideAtual.corBadge }}
            >
              {slideAtual.campanha}
            </span>
            <span className="text-xs font-medium text-white/80 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
              {slideAtual.tagMes}
            </span>
          </div>

          {/* Frase em Playfair Display itálico */}
          <div className="flex flex-col gap-3">
            <p
              className="text-white leading-snug"
              style={{
                fontFamily: "var(--font-playfair-display), Georgia, serif",
                fontStyle: "italic",
                fontSize: 18,
                maxWidth: "75%",
                textShadow: "0 1px 4px rgba(0,0,0,0.4)",
              }}
            >
              {slideAtual.frase}
            </p>

            {/* Botões Copiar e Compartilhar */}
            <div className="flex items-center gap-2">
              <button
                onClick={copiarFrase}
                className="flex items-center gap-1.5 text-xs font-semibold text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-full transition-colors"
                aria-label="Copiar frase"
              >
                <Copy size={13} />
                {copiado ? "Copiado!" : "Copiar"}
              </button>
              <button
                onClick={compartilhar}
                className="flex items-center gap-1.5 text-xs font-semibold text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-full transition-colors"
                aria-label="Compartilhar frase"
              >
                <Share2 size={13} />
                Compartilhar
              </button>
            </div>
          </div>
        </div>

        {/* Setas de navegação — só aparecem com múltiplos slides */}
        {slides.length > 1 && (
          <>
            <button
              onClick={voltar}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-colors"
              aria-label="Slide anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={avancar}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-colors"
              aria-label="Próximo slide"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Dots de navegação clicáveis */}
        {slides.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndiceAtual(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === indiceAtual ? 20 : 6,
                  height: 6,
                  backgroundColor:
                    i === indiceAtual ? "#fff" : "rgba(255,255,255,0.5)",
                }}
                aria-label={`Ir para slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
