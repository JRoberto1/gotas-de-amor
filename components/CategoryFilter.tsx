"use client";

import {
  Sun,
  Moon,
  Heart,
  Star,
  Home,
  Zap,
  Users,
  Gift,
  Calendar,
  Ribbon,
  Cloud,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Tipo de uma categoria com todas as suas propriedades visuais
export interface CategoriaConfig {
  valor: string;
  nome: string;
  Icon: LucideIcon;
  cor: string;
  corFundo: string;
  corBorda: string;
}

// Configuração visual de cada categoria
export const CATEGORIAS: CategoriaConfig[] = [
  {
    valor: "bom-dia",
    nome: "Bom Dia",
    Icon: Sun,
    cor: "#92400e",
    corFundo: "#FFF7ED",
    corBorda: "#FFB347",
  },
  {
    valor: "boa-noite",
    nome: "Boa Noite",
    Icon: Moon,
    cor: "#fff",
    corFundo: "#4A4E8C",
    corBorda: "#4A4E8C",
  },
  {
    valor: "amor",
    nome: "Amor",
    Icon: Heart,
    cor: "#fff",
    corFundo: "#E8537A",
    corBorda: "#E8537A",
  },
  {
    valor: "fe-espiritualidade",
    nome: "Fé e Espiritualidade",
    Icon: Star,
    cor: "#fff",
    corFundo: "#9B72CF",
    corBorda: "#9B72CF",
  },
  {
    valor: "familia",
    nome: "Família",
    Icon: Home,
    cor: "#fff",
    corFundo: "#52B788",
    corBorda: "#52B788",
  },
  {
    valor: "motivacao",
    nome: "Motivação",
    Icon: Zap,
    cor: "#fff",
    corFundo: "#F4845F",
    corBorda: "#F4845F",
  },
  {
    valor: "amizade",
    nome: "Amizade",
    Icon: Users,
    cor: "#fff",
    corFundo: "#4ECDC4",
    corBorda: "#4ECDC4",
  },
  {
    valor: "aniversario",
    nome: "Aniversário",
    Icon: Gift,
    cor: "#78350f",
    corFundo: "#FFFBEB",
    corBorda: "#FFD166",
  },
  {
    valor: "datas-comemorativas",
    nome: "Datas Comemorativas",
    Icon: Calendar,
    cor: "#fff",
    corFundo: "#06D6A0",
    corBorda: "#06D6A0",
  },
  {
    valor: "meses-tematicos",
    nome: "Meses Temáticos",
    Icon: Ribbon,
    cor: "#fff",
    corFundo: "#118AB2",
    corBorda: "#118AB2",
  },
  {
    valor: "reflexao",
    nome: "Reflexão",
    Icon: Cloud,
    cor: "#fff",
    corFundo: "#8D99AE",
    corBorda: "#8D99AE",
  },
];

interface CategoryFilterProps {
  // Categoria atualmente selecionada (null = todas)
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
