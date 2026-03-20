"use client";

import { useRef, useState, useEffect } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showFade, setShowFade] = useState(true);

  // Drag-to-scroll no desktop
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Atualiza o fade ao rolar
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      setShowFade(!atEnd);
    };
    check();
    el.addEventListener("scroll", check, { passive: true });
    return () => el.removeEventListener("scroll", check);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = scrollLeft.current - (x - startX.current);
  };

  const onMouseUp = () => {
    isDragging.current = false;
    const el = scrollRef.current;
    if (el) {
      el.style.cursor = "grab";
      el.style.userSelect = "";
    }
  };

  return (
    <section id="categorias" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4">
      {/* Wrapper relativo para o fade */}
      <div className="relative">
        {/* Scrollable pills */}
        <div
          ref={scrollRef}
          data-scroll-pills
          className="flex items-center gap-2 overflow-x-auto pb-1"
          style={{
            scrollbarWidth: "none",
            cursor: "grab",
            WebkitOverflowScrolling: "touch",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
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

          {/* Espaço extra no final para o fade não cobrir a última pill */}
          <span className="flex-shrink-0 w-8" aria-hidden="true" />
        </div>

        {/* Fade gradient + seta no lado direito */}
        {showFade && (
          <div
            className="absolute right-0 top-0 bottom-0 flex items-center justify-end pointer-events-none"
            style={{ width: 72 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, transparent 0%, #FAFAFA 70%)",
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10 mr-1"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        )}
      </div>

      {/* Esconde scrollbar no Chrome/Safari */}
      <style>{`
        [data-scroll-pills]::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
