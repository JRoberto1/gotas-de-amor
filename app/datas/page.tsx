// Índice de datas comemorativas — /datas
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Datas Comemorativas | Gotas de Amor",
  description:
    "Mensagens para todas as datas comemorativas do ano: Dia das Mães, Dia dos Pais, Natal, Dia dos Namorados e muito mais.",
};

interface DataComemorativa {
  slug: string;
  mes: string;
  numeroMes: number;
  nome: string;
  descricao: string;
  imagem: string;
  altImagem: string;
  corBadge: string;
  disponivel: boolean;
}

// Lista cronológica das datas comemorativas com imagens Unsplash (600px)
const DATAS: DataComemorativa[] = [
  {
    slug: "janeiro-branco",
    mes: "Janeiro",
    numeroMes: 1,
    nome: "Janeiro Branco",
    descricao: "Saúde mental e bem-estar emocional",
    imagem: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
    altImagem: "Fundo branco com luz suave representando calma e saúde mental",
    corBadge: "#8D99AE",
    disponivel: false,
  },
  {
    slug: "fevereiro-roxo",
    mes: "Fevereiro",
    numeroMes: 2,
    nome: "Fevereiro Roxo",
    descricao: "Conscientização sobre epilepsia e doenças raras",
    imagem: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80",
    altImagem: "Flores roxas em luz suave representando o Fevereiro Roxo",
    corBadge: "#9B72CF",
    disponivel: false,
  },
  {
    slug: "dia-da-mulher",
    mes: "Março",
    numeroMes: 3,
    nome: "Dia Internacional da Mulher",
    descricao: "Celebração e homenagem às mulheres",
    imagem: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
    altImagem: "Mulher confiante e sorridente representando força e empoderamento",
    corBadge: "#E8537A",
    disponivel: false,
  },
  {
    slug: "pascoa",
    mes: "Abril",
    numeroMes: 4,
    nome: "Páscoa",
    descricao: "Mensagens de fé, renovação e esperança",
    imagem: "https://images.unsplash.com/photo-1457301353672-324d6d14f471?w=600&q=80",
    altImagem: "Flores da primavera e ovos coloridos celebrando a Páscoa",
    corBadge: "#52B788",
    disponivel: true,
  },
  {
    slug: "dia-das-maes",
    mes: "Maio",
    numeroMes: 5,
    nome: "Dia das Mães",
    descricao: "Mensagens emocionantes para celebrar o amor materno",
    imagem: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80",
    altImagem: "Mãe e filho se abraçando com carinho e amor",
    corBadge: "#E8537A",
    disponivel: true,
  },
  {
    slug: "maio-amarelo",
    mes: "Maio",
    numeroMes: 5,
    nome: "Maio Amarelo",
    descricao: "Segurança no trânsito — juntos salvamos vidas",
    imagem: "https://images.unsplash.com/photo-1494059980473-813e73ee784b?w=600&q=80",
    altImagem: "Estrada ao amanhecer representando segurança e atenção no trânsito",
    corBadge: "#F9C74F",
    disponivel: false,
  },
  {
    slug: "dia-dos-namorados",
    mes: "Junho",
    numeroMes: 6,
    nome: "Dia dos Namorados",
    descricao: "Declare seu amor com as palavras certas",
    imagem: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80",
    altImagem: "Casal de mãos dadas em jardim florido ao entardecer",
    corBadge: "#E8537A",
    disponivel: false,
  },
  {
    slug: "dia-dos-pais",
    mes: "Julho",
    numeroMes: 7,
    nome: "Dia dos Pais",
    descricao: "Homenagens para o herói de todo dia",
    imagem: "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=600&q=80",
    altImagem: "Pai e filho brincando juntos em parque ao ar livre",
    corBadge: "#118AB2",
    disponivel: false,
  },
  {
    slug: "agosto-dourado",
    mes: "Agosto",
    numeroMes: 8,
    nome: "Agosto Dourado",
    descricao: "Aleitamento materno — amor que nutre",
    imagem: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80",
    altImagem: "Mãe amamentando bebê com amor e ternura",
    corBadge: "#F9C74F",
    disponivel: false,
  },
  {
    slug: "setembro-amarelo",
    mes: "Setembro",
    numeroMes: 9,
    nome: "Setembro Amarelo",
    descricao: "Prevenção ao suicídio — a vida sempre vale a pena",
    imagem: "https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?w=600&q=80",
    altImagem: "Campo de girassóis amarelos sob céu azul representando esperança",
    corBadge: "#F9C74F",
    disponivel: false,
  },
  {
    slug: "outubro-rosa",
    mes: "Outubro",
    numeroMes: 10,
    nome: "Outubro Rosa",
    descricao: "Conscientização sobre o câncer de mama",
    imagem: "https://images.unsplash.com/photo-1508184964240-ee96bb9677a7?w=600&q=80",
    altImagem: "Flores rosas delicadas representando o Outubro Rosa",
    corBadge: "#E8537A",
    disponivel: false,
  },
  {
    slug: "novembro-azul",
    mes: "Novembro",
    numeroMes: 11,
    nome: "Novembro Azul",
    descricao: "Saúde do homem — cuide-se sempre",
    imagem: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600&q=80",
    altImagem: "Céu azul profundo ao entardecer representando o Novembro Azul",
    corBadge: "#118AB2",
    disponivel: false,
  },
  {
    slug: "natal",
    mes: "Dezembro",
    numeroMes: 12,
    nome: "Natal",
    descricao: "Paz, amor e alegria para todos",
    imagem: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&q=80",
    altImagem: "Árvore de Natal iluminada com enfeites coloridos na noite",
    corBadge: "#52B788",
    disponivel: false,
  },
];

export default function DatasPage() {
  return (
    <>
      <Header />

      <main className="flex flex-col flex-1 bg-[#FAFAFA]">
        {/* Cabeçalho */}
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-10 pb-6">
          <h1
            className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-2"
            style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
          >
            Datas Comemorativas
          </h1>
          <p
            className="text-gray-500"
            style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
          >
            Mensagens especiais para cada data importante do ano.
          </p>
        </div>

        {/* Lista cronológica de datas */}
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DATAS.map((data) => {
              const conteudo = (
                <div className="group flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  {/* Foto temática */}
                  <div className="relative overflow-hidden flex-shrink-0" style={{ height: 160 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={data.imagem}
                      alt={data.altImagem}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Badge do mês */}
                    <span
                      className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: data.corBadge }}
                    >
                      {data.mes}
                    </span>
                    {/* Badge "Em breve" para datas sem página */}
                    {!data.disponivel && (
                      <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-black/40 text-white backdrop-blur-sm">
                        Em breve
                      </span>
                    )}
                  </div>

                  {/* Corpo */}
                  <div className="flex flex-col p-4 gap-1">
                    <h2
                      className="font-semibold text-[#1A1A2E] text-base leading-snug"
                      style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
                    >
                      {data.nome}
                    </h2>
                    <p
                      className="text-gray-500 text-sm"
                      style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
                    >
                      {data.descricao}
                    </p>
                  </div>
                </div>
              );

              return data.disponivel ? (
                <Link key={data.slug} href={`/datas/${data.slug}`} aria-label={`Ver mensagens: ${data.nome}`}>
                  {conteudo}
                </Link>
              ) : (
                <div key={data.slug} className="cursor-default opacity-80">
                  {conteudo}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
