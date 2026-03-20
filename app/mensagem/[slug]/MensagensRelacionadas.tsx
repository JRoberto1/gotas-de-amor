// Seção de mensagens relacionadas — server component
import Link from "next/link";
import type { Mensagem } from "@/components/MessageCard";
import { IMAGENS_CATEGORIA } from "@/components/MessageCard";
import { CATEGORIAS } from "@/components/CategoryFilter";

interface Props {
  mensagens: Mensagem[];
}

export default function MensagensRelacionadas({ mensagens }: Props) {
  return (
    <section className="bg-white border-t border-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="text-xl font-semibold text-[#1A1A2E] mb-6"
          style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
        >
          Mensagens relacionadas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mensagens.slice(0, 6).map((m) => {
            const categoriaConfig = CATEGORIAS.find((c) => c.valor === m.categoria);
            const imagem = IMAGENS_CATEGORIA[m.categoria] ?? IMAGENS_CATEGORIA["reflexao"];
            const slug = m.slug?.current;

            return (
              <article
                key={m._id}
                className="flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                {/* Imagem */}
                <div className="relative overflow-hidden flex-shrink-0" style={{ height: 140 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagem}
                    alt={`Mensagem: ${m.titulo}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Corpo */}
                <div className="flex flex-col flex-1 p-4 gap-2">
                  {categoriaConfig && (
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full self-start"
                      style={{
                        backgroundColor: categoriaConfig.corFundo,
                        color: categoriaConfig.cor,
                        border: `1px solid ${categoriaConfig.corBorda}`,
                      }}
                    >
                      <categoriaConfig.Icon size={11} />
                      {categoriaConfig.nome}
                    </span>
                  )}
                  {slug ? (
                    <Link href={`/mensagem/${slug}`}>
                      <h3
                        className="text-sm font-semibold text-[#1A1A2E] leading-snug hover:text-[#E8537A] transition-colors"
                        style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
                      >
                        {m.titulo}
                      </h3>
                    </Link>
                  ) : (
                    <h3
                      className="text-sm font-semibold text-[#1A1A2E] leading-snug"
                      style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
                    >
                      {m.titulo}
                    </h3>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
