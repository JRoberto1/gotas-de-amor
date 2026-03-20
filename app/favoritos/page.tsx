// Página de favoritos — /favoritos
// Usa localStorage para persistir mensagens favoritadas pelo usuário
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FavoritosContent from "./FavoritosContent";

export const metadata: Metadata = {
  title: "Meus Favoritos | Gotas de Amor",
  description: "Suas mensagens favoritas salvas no Gotas de Amor.",
  robots: { index: false, follow: false }, // Página pessoal — não indexar
};

export default function FavoritosPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col flex-1 bg-[#FAFAFA]">
        <FavoritosContent />
      </main>
      <Footer />
    </>
  );
}
