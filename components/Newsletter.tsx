"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

// Seção de newsletter entre o grid de mensagens e o footer
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Placeholder: integrar com Mailchimp, ConvertKit, etc.
    setEnviado(true);
    setEmail("");
  };

  return (
    <section className="w-full pb-12">
      <div
        className="flex flex-col items-center text-center px-6 py-12 sm:px-12 sm:py-16"
        style={{ backgroundColor: "#1A1A2E" }}
      >
        {/* Ícone */}
        <div
          className="flex items-center justify-center w-14 h-14 rounded-full mb-5"
          style={{ backgroundColor: "#E8537A22" }}
        >
          <Mail size={26} style={{ color: "#E8537A" }} />
        </div>

        {/* Título em Playfair Display itálico */}
        <h2
          className="text-white mb-3"
          style={{
            fontFamily: "var(--font-playfair-display), Georgia, serif",
            fontStyle: "italic",
            fontSize: 28,
            fontWeight: 600,
            lineHeight: 1.3,
          }}
        >
          Receba mensagens que tocam o coração
        </h2>

        {/* Subtítulo */}
        <p
          className="text-gray-400 mb-8 max-w-md"
          style={{
            fontFamily: "var(--font-lato), Arial, sans-serif",
            fontSize: 15,
            lineHeight: 1.7,
          }}
        >
          Toda semana, as melhores mensagens de amor, fé e motivação direto no
          seu e-mail. Gratuito e sem spam.
        </p>

        {/* Formulário ou confirmação */}
        {enviado ? (
          <p
            className="text-[#F9C74F] font-semibold text-base"
            style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
          >
            Obrigado! Em breve você receberá nossas mensagens.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-lg"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              required
              className="flex-1 px-5 py-3.5 rounded-full text-base text-gray-800 outline-none focus:ring-2 focus:ring-[#E8537A]"
              style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
              aria-label="Endereço de e-mail"
            />
            <button
              type="submit"
              className="px-8 py-3.5 rounded-full text-base font-semibold text-white transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{
                backgroundColor: "#E8537A",
                fontFamily: "var(--font-lato), Arial, sans-serif",
              }}
            >
              Quero receber
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
