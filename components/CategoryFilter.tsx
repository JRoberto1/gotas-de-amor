"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORIAS, type CategoriaConfig } from "@/lib/categorias";

// Reexporta para manter compatibilidade com imports existentes
export { CATEGORIAS, type CategoriaConfig };

interface CategoryFilterProps {
  categoriaAtiva: string | null;
  onChange: (categoria: string | null) => void;
}

const SCROLL_STEP = 200;
const FADE_COLOR = "#FAFAFA";

export default function CategoryFilter({
  categoriaAtiva,
  onChange,
}: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  // Drag-to-scroll no desktop
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragScrollLeft = useRef(0);
  // Evita disparar onClick ao soltar após arrastar
  const didDrag = useRef(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 4);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    // Reavalia se a janela for redimensionada
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollBy = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? SCROLL_STEP : -SCROLL_STEP,
      behavior: "smooth",
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    didDrag.current = false;
    startX.current = e.pageX - el.offsetLeft;
    dragScrollLeft.current = el.scrollLeft;
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const delta = e.pageX - el.offsetLeft - startX.current;
    if (Math.abs(delta) > 4) didDrag.current = true;
    el.scrollLeft = dragScrollLeft.current - delta;
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
      <div className="relative flex items-center">

        {/* ── Seta esquerda ── */}
        <button
          onClick={() => scrollBy("left")}
          aria-label="Rolar categorias para a esquerda"
          className="absolute left-0 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md"
          style={{
            opacity: showLeft ? 1 : 0,
            pointerEvents: showLeft ? "auto" : "none",
            transform: showLeft ? "scale(1)" : "scale(0.8)",
          }}
        >
          <ChevronLeft size={16} strokeWidth={2.5} style={{ color: "#1A1A2E" }} />
        </button>

        {/* Fade esquerdo */}
        <div
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: 48,
            background: `linear-gradient(to right, ${FADE_COLOR} 30%, transparent 100%)`,
            opacity: showLeft ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        />

        {/* ── Scrollable pills ── */}
        <div
          ref={scrollRef}
          data-scroll-pills
          className="flex items-center gap-2 overflow-x-auto pb-1 w-full"
          style={{
            scrollbarWidth: "none",
            cursor: "grab",
            WebkitOverflowScrolling: "touch",
            paddingLeft: showLeft ? 36 : 0,
            paddingRight: showRight ? 36 : 0,
            transition: "padding 0.2s",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {/* Pill "Todas" */}
          <button
            onClick={() => { if (!didDrag.current) onChange(null); }}
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
                onClick={() => { if (!didDrag.current) onChange(ativa ? null : valor); }}
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

        {/* Fade direito */}
        <div
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: 48,
            background: `linear-gradient(to left, ${FADE_COLOR} 30%, transparent 100%)`,
            opacity: showRight ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        />

        {/* ── Seta direita ── */}
        <button
          onClick={() => scrollBy("right")}
          aria-label="Rolar categorias para a direita"
          className="absolute right-0 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md"
          style={{
            opacity: showRight ? 1 : 0,
            pointerEvents: showRight ? "auto" : "none",
            transform: showRight ? "scale(1)" : "scale(0.8)",
          }}
        >
          <ChevronRight size={16} strokeWidth={2.5} style={{ color: "#1A1A2E" }} />
        </button>
      </div>

      {/* Esconde scrollbar no Chrome/Safari */}
      <style>{`
        [data-scroll-pills]::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
