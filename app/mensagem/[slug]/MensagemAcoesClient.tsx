"use client";

// Botões Compartilhar e Copiar — client component para acessar navigator
import { useState } from "react";
import { Copy, Share2 } from "lucide-react";

interface Props {
  titulo: string;
  texto: string;
}

export default function MensagemAcoesClient({ titulo, texto }: Props) {
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // fallback silencioso
    }
  };

  const compartilhar = async () => {
    if (navigator.share) {
      await navigator.share({ title: titulo, text: texto, url: window.location.href });
    } else {
      copiar();
    }
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <button
        onClick={compartilhar}
        className="flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-full transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#E8537A" }}
      >
        <Share2 size={15} />
        Compartilhar
      </button>
      <button
        onClick={copiar}
        className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 px-5 py-2.5 rounded-full transition-colors"
      >
        <Copy size={15} />
        {copiado ? "Copiado!" : "Copiar texto"}
      </button>
    </div>
  );
}
