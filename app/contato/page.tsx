// Página de contato — /contato
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContatoForm from "./ContatoForm";

export const metadata: Metadata = {
  title: "Contato | Gotas de Amor",
  description:
    "Entre em contato com o Gotas de Amor. Sugestões, parcerias ou dúvidas — adoramos ouvir você.",
};

export default function ContatoPage() {
  return (
    <>
      <Header />

      <main className="flex flex-col flex-1 bg-[#FAFAFA]">
        <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-14">
          {/* Título */}
          <div className="text-center mb-10">
            <h1
              className="text-4xl font-bold text-[#1A1A2E] mb-3"
              style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
            >
              Fale Conosco
            </h1>
            <p
              className="text-gray-500"
              style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
            >
              Sugestões de mensagens, parcerias ou qualquer dúvida — estamos aqui.
            </p>
          </div>

          {/* Formulário de contato (client component) */}
          <ContatoForm />
        </div>
      </main>

      <Footer />
    </>
  );
}
