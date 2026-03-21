"use client";

// Grid de mensagens com paginação para a página de categoria
import Link from "next/link";
import type { Mensagem } from "@/components/MessageCard";
import MensagensGrid from "@/components/MessageCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  mensagens: Mensagem[];
  fotos: Record<string, string>;
  pagina: number;
  totalPaginas: number;
  slugCategoria: string;
}

export default function CategoriaGrid({
  mensagens,
  fotos,
  pagina,
  totalPaginas,
  slugCategoria,
}: Props) {
  const basePath = `/categoria/${slugCategoria}`;

  return (
    <div className="flex flex-col gap-8">
      {/* Grid reutilizando o componente padrão */}
      <MensagensGrid mensagens={mensagens} fotos={fotos} categoriaAtiva={null} />

      {/* Paginação */}
      {totalPaginas > 1 && (
        <nav
          className="flex items-center justify-center gap-2 pt-4"
          aria-label="Paginação de mensagens"
        >
          {/* Anterior */}
          {pagina > 1 ? (
            <Link
              href={`${basePath}?pagina=${pagina - 1}`}
              className="flex items-center gap-1 text-sm font-semibold text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-full hover:border-[#E8537A] hover:text-[#E8537A] transition-colors"
            >
              <ChevronLeft size={14} /> Anterior
            </Link>
          ) : (
            <span className="flex items-center gap-1 text-sm text-gray-300 bg-white border border-gray-100 px-3 py-2 rounded-full cursor-not-allowed">
              <ChevronLeft size={14} /> Anterior
            </span>
          )}

          {/* Números de página */}
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
            <Link
              key={num}
              href={`${basePath}?pagina=${num}`}
              className="flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold transition-colors"
              style={
                num === pagina
                  ? { backgroundColor: "#E8537A", color: "white" }
                  : { backgroundColor: "white", color: "#374151", border: "1px solid #e5e7eb" }
              }
            >
              {num}
            </Link>
          ))}

          {/* Próxima */}
          {pagina < totalPaginas ? (
            <Link
              href={`${basePath}?pagina=${pagina + 1}`}
              className="flex items-center gap-1 text-sm font-semibold text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-full hover:border-[#E8537A] hover:text-[#E8537A] transition-colors"
            >
              Próxima <ChevronRight size={14} />
            </Link>
          ) : (
            <span className="flex items-center gap-1 text-sm text-gray-300 bg-white border border-gray-100 px-3 py-2 rounded-full cursor-not-allowed">
              Próxima <ChevronRight size={14} />
            </span>
          )}
        </nav>
      )}
    </div>
  );
}
