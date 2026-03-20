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
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
      <div
        className="flex flex-col items-center text-center px-6 py-10 sm:px-10 sm:py-12"
        style={{
          backgroundColor: "#1A1A2E",
          borderRadius: 16,
        }}
      >
        {/* Ícone */}
        <div
          className="flex items-center justify-center w-12 h-12 rounded-full mb-4"
          style={{ backgroundColor: "#E8537A22" }}
        >
          <Mail size={22} style={{ color: "#E8537A" }} />
        </div>

        {/* Título em Playfair Display itálico */}
        <h2
          className="text-white mb-2"
          style={{
            fontFamily: "var(--font-playfair-display), Georgia, serif",
            fontStyle: "italic",
            fontSize: 24,
            fontWeight: 600,
            lineHeight: 1.3,
          }}
        >
          Receba mensagens que tocam o coração
        </h2>

        {/* Subtítulo */}
        <p
          className="text-gray-400 mb-6 max-w-sm"
          style={{
            fontFamily: "var(--font-lato), Arial, sans-serif",
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          Toda semana, as melhores mensagens de amor, fé e motivação direto no
          seu e-mail. Gratuito e sem spam.
        </p>

        {/* Formulário ou confirmação */}
        {enviado ? (
          <p
            className="text-[#F9C74F] font-semibold"
            style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
          >
            Obrigado! Em breve você receberá nossas mensagens.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              required
              className="flex-1 px-4 py-2.5 rounded-full text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#E8537A]"
              style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
              aria-label="Endereço de e-mail"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90 whitespace-nowrap"
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
