"use client";

import { CATEGORIAS, type CategoriaConfig } from "@/lib/categorias";

// Reexporta para manter compatibilidade com imports existentes
export { CATEGORIAS, type CategoriaConfig };

interface CategoryFilterProps {
  categoriaAtiva: string | null;
  onChange: (categoria: string | null) => void;
}

export default function CategoryFilter({
  categoriaAtiva,
  onChange,
}: CategoryFilterProps) {
  return (
    <section id="categorias" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
        {/* Pill "Todas" */}
        <button
          onClick={() => onChange(null)}
          className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 whitespace-nowrap"
          style={{
            backgroundColor: categoriaAtiva === null ? "#1A1A2E" : "#fff",
            borderColor: "#1A1A2E",
            color: categoriaAtiva === null ? "#fff" : "#1A1A2E",
          }}
          aria-pressed={categoriaAtiva === null}
        >
          Todas
        </button>

        {/* Pills de cada categoria */}
        {CATEGORIAS.map(({ valor, nome, Icon, cor, corFundo, corBorda }) => {
          const ativa = categoriaAtiva === valor;
          return (
            <button
              key={valor}
              onClick={() => onChange(ativa ? null : valor)}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 whitespace-nowrap"
              style={{
                backgroundColor: ativa ? corFundo : `${corFundo}33`,
                borderColor: corBorda,
                color: ativa ? cor : "#1A1A2E",
              }}
              aria-pressed={ativa}
            >
              <Icon size={14} strokeWidth={2.5} />
              {nome}
            </button>
          );
        })}
      </div>
    </section>
  );
}
