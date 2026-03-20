"use client";

// Seção client-side que une filtro de categorias + grid de mensagens
// Recebe todas as mensagens do server component e filtra localmente

import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import MensagensGrid, { type Mensagem } from "./MessageCard";

interface MensagensSectionProps {
  mensagens: Mensagem[];
}

export default function MensagensSection({ mensagens }: MensagensSectionProps) {
  // Categoria selecionada pelo usuário (null = todas)
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(null);

  return (
    <section className="flex-1 w-full">
      {/* Filtro de categorias em pills com scroll horizontal */}
      <CategoryFilter
        categoriaAtiva={categoriaAtiva}
        onChange={setCategoriaAtiva}
      />

      {/* Grid de mensagens filtradas */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
        <MensagensGrid
          mensagens={mensagens}
          categoriaAtiva={categoriaAtiva}
        />
      </div>
    </section>
  );
}
