"use client";

// Conteúdo client-side com as 20 mensagens do Dia das Mães e botões de ação
import { useState } from "react";
import { Copy, Share2, Check } from "lucide-react";

interface MensagemData {
  id: number;
  titulo: string;
  texto: string;
}

// 20 mensagens bonitas e originais para o Dia das Mães
const MENSAGENS_DIA_DAS_MAES: MensagemData[] = [
  {
    id: 1,
    titulo: "O Amor que Não Tem Fim",
    texto:
      "Mãe, você é o lar que eu carrego no coração. Em cada escolha, em cada passo difícil, é a sua voz que me guia. Obrigado por existir, por amar sem condições e por me ensinar que o amor verdadeiro não precisa de palavras — ele já se faz presente no seu olhar. Feliz Dia das Mães!",
  },
  {
    id: 2,
    titulo: "Você é Meu Maior Presente",
    texto:
      "De todos os presentes que a vida me deu, você, mãe, é o maior de todos. Não porque é perfeita — mas porque é real, é presente, é amor. Cada abraço seu tem o poder de curar o que as palavras não conseguem. Hoje e sempre, te amo.",
  },
  {
    id: 3,
    titulo: "Nas Suas Mãos Aprendi Tudo",
    texto:
      "Aprendi a caminhar segurando suas mãos. Aprendi a ser forte vendo a sua coragem. Aprendi a amar observando o seu coração. Mãe, você é minha primeira e mais importante professora. Feliz Dia das Mães — que a vida te devolva todo o amor que você semeou.",
  },
  {
    id: 4,
    titulo: "A Força que Vem de Você",
    texto:
      "Nos dias em que me sinto fraco, lembro do seu exemplo. Você que enfrentou tempestades com sorriso no rosto, que fez do pouco muito e do nada um lar. Mãe, sua força me inspira todos os dias. Te amo mais do que as palavras conseguem expressar.",
  },
  {
    id: 5,
    titulo: "Feliz Dia das Mães, Minha Heroína",
    texto:
      "Nenhum cabo de super-herói, nenhum uniforme ou poderes especiais — só o seu amor. E foi o suficiente para mover montanhas, curar dores e fazer o impossível parecer simples. Você é minha heroína de todo dia. Feliz Dia das Mães!",
  },
  {
    id: 6,
    titulo: "O Melhor Colo do Mundo",
    texto:
      "Existem lugares no mundo que a gente nunca esquece. Para mim, o mais especial é o seu colo, mãe. É onde as preocupações somem, onde o mundo fica menor e o amor fica maior. Feliz Dia das Mães — que você sempre tenha um colo para descansar também.",
  },
  {
    id: 7,
    titulo: "Uma Mensagem da Saudade",
    texto:
      "Para quem tem sua mãe por perto: dê um abraço hoje mais longo do que o de costume. Para quem a mãe já partiu: ela ainda vive em cada atitude de amor que você tem. A saudade dói, mas o amor que ela deixou é eterno. Feliz Dia das Mães — seja onde você estiver.",
  },
  {
    id: 8,
    titulo: "Gratidão por Cada Sacrifício",
    texto:
      "Mãe, você fez escolhas que eu só entendi anos depois. Abdicou de sonhos para realizar os meus. Acordou cedo quando quis dormir. Fingiu que estava bem quando não estava. E fez tudo isso com amor. Hoje, só quero dizer: obrigado. Do fundo do meu coração.",
  },
  {
    id: 9,
    titulo: "Você é a Primeira Palavra que Aprendi",
    texto:
      "A primeira palavra que aprendi a falar foi você. A primeira que aprendi a sentir foi seu amor. E a primeira que repetiria em qualquer idioma seria sempre o mesmo: mãe. Feliz Dia das Mães — você é poesia em forma de pessoa.",
  },
  {
    id: 10,
    titulo: "Para Minha Mãe que é Tudo",
    texto:
      "Você é a raiz que me mantém de pé nas tempestades. É o porto seguro onde sempre posso voltar. É o amor que não muda, que não some, que não pede nada em troca. Mãe, você é tudo — e hoje quero que o mundo todo saiba disso. Te amo infinitamente.",
  },
  {
    id: 11,
    titulo: "Seu Sorriso Ilumina Meu Mundo",
    texto:
      "Tem dias que o mundo pesa demais. Mas aí vem o seu sorriso — e tudo fica mais leve. Você tem esse dom, mãe: o de transformar o ordinário em especial. Feliz Dia das Mães para a mulher que ilumina cada ambiente que entra.",
  },
  {
    id: 12,
    titulo: "A Melhor Parte de Mim Vem de Você",
    texto:
      "Quando alguém elogia minha força, lembro que aprendi com você. Quando dizem que sou generoso, reconheço o seu reflexo. A melhor versão de mim é aquela que carrega um pedaço da sua essência. Obrigado por me fazer quem eu sou. Feliz Dia das Mães.",
  },
  {
    id: 13,
    titulo: "Um Abraço que Atravessa a Distância",
    texto:
      "A distância pode separar corpos, mas nunca separa almas que se amam. Mãe, mesmo longe, seu amor é presença constante. Cada ligação, cada mensagem de voz, cada 'está tudo bem?' é um abraço que atravessa quilômetros. Sinto você sempre perto. Te amo.",
  },
  {
    id: 14,
    titulo: "Mãe, Você Merece o Mundo",
    texto:
      "Se eu pudesse te dar o mundo, daria. Mas como não posso, ofereço o que tenho: minha gratidão sem fim, meu amor mais puro e a promessa de estar presente. Você merece cada flor, cada alegria, cada momento de paz. Feliz Dia das Mães.",
  },
  {
    id: 15,
    titulo: "Obrigado por Nunca Desistir de Mim",
    texto:
      "Nos meus piores momentos, você estava lá. Quando eu duvidei de mim mesmo, você acreditou. Quando eu quis desistir, você me deu a mão e disse: vai conseguir. Mãe, obrigado por nunca desistir de mim. Eu te amo mais do que sei expressar.",
  },
  {
    id: 16,
    titulo: "Para a Mãe Que é Também Amiga",
    texto:
      "Você é a amiga que não escolhi — simplesmente ganhei de presente da vida. A que guarda meus segredos, ri das minhas histórias e me diz a verdade com amor. Mãe e amiga: a combinação mais bonita que existe. Feliz Dia das Mães.",
  },
  {
    id: 17,
    titulo: "Seu Nome é Amor",
    texto:
      "Se tivesse que nomear o amor em uma só palavra, diria o seu nome, mãe. Porque em você aprendi que amar é cuidar sem cobrar, é dar sem esperar, é estar presente mesmo quando dói. Feliz Dia das Mães — que o amor que você dá volte para você multiplicado.",
  },
  {
    id: 18,
    titulo: "A Memória que Guardo com Carinho",
    texto:
      "Tenho guardadas as memórias mais bonitas da minha vida. E em quase todas elas, você aparece. Seu cheiro, seu riso, suas histórias antes de dormir. Mãe, você é memória, é presente e é futuro. Te amo hoje e sempre.",
  },
  {
    id: 19,
    titulo: "Parabéns à Mãe que Escolheu Amar",
    texto:
      "Nenhuma escola prepara para a maternidade. Você aprendeu na prática — errando, acertando, amando. E fez tudo isso com tanto cuidado que parecia que você sempre soube. Parabéns, mãe. Pela escolha de amar todos os dias.",
  },
  {
    id: 20,
    titulo: "Que Este Dia Seja Tão Especial Quanto Você",
    texto:
      "Que hoje seja um dia cheio de flores, abraços, risadas e gratidão. Que cada momento reflita o quanto você é amada e admirada. Você dedicou tanto da sua vida aos outros — que este dia seja só seu. Feliz Dia das Mães, com todo o meu amor.",
  },
];

// Card de mensagem do Dia das Mães com botões de ação
function CardMensagem({ mensagem }: { mensagem: MensagemData }) {
  const [copiado, setCopiado] = useState(false);

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
        url: window.location.href,
      });
    } else {
      copiar();
    }
  };

  return (
    <article className="flex flex-col bg-white rounded-2xl shadow-sm border border-pink-100 p-5 gap-4 hover:shadow-md transition-shadow">
      {/* Número + título */}
      <div className="flex items-start gap-3">
        <span
          className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: "#E8537A" }}
        >
          {mensagem.id}
        </span>
        <h2
          className="font-semibold text-[#1A1A2E] leading-snug text-base"
          style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
        >
          {mensagem.titulo}
        </h2>
      </div>

      {/* Texto da mensagem */}
      <p
        className="text-gray-600 leading-relaxed flex-1"
        style={{
          fontFamily: "var(--font-lato), Arial, sans-serif",
          fontSize: 14,
          lineHeight: 1.8,
        }}
      >
        {mensagem.texto}
      </p>

      {/* Botões */}
      <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
        <button
          onClick={compartilhar}
          className="flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1.5 rounded-full flex-1 justify-center transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#E8537A" }}
        >
          <Share2 size={12} /> Compartilhar
        </button>
        <button
          onClick={copiar}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors"
        >
          {copiado ? <Check size={12} /> : <Copy size={12} />}
          {copiado ? "Copiado!" : "Copiar"}
        </button>
      </div>
    </article>
  );
}

export default function DiaDasMaesContent() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2
          className="text-xl font-semibold text-[#1A1A2E]"
          style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
        >
          20 Mensagens para o Dia das Mães
        </h2>
        <span
          className="text-xs text-gray-400"
          style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
        >
          Clique em Copiar ou Compartilhar
        </span>
      </div>

      {/* Grid 2 colunas desktop, 1 mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MENSAGENS_DIA_DAS_MAES.map((mensagem) => (
          <CardMensagem key={mensagem.id} mensagem={mensagem} />
        ))}
      </div>
    </section>
  );
}
