"use client";

// Formulário de contato com validação client-side
import { useState } from "react";
import { Send, Check } from "lucide-react";

interface FormData {
  nome: string;
  email: string;
  mensagem: string;
}

export default function ContatoForm() {
  const [form, setForm] = useState<FormData>({ nome: "", email: "", mensagem: "" });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    // Placeholder: integrar com Formspree, Resend, EmailJS, etc.
    await new Promise((r) => setTimeout(r, 800));
    setEnviado(true);
    setEnviando(false);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#E8537A] focus:border-transparent transition-shadow bg-white";
  const labelClass =
    "block text-sm font-semibold text-gray-700 mb-1.5";

  if (enviado) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div
          className="flex items-center justify-center w-16 h-16 rounded-full"
          style={{ backgroundColor: "#E8537A15" }}
        >
          <Check size={28} style={{ color: "#E8537A" }} />
        </div>
        <h2
          className="text-xl font-semibold text-[#1A1A2E]"
          style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
        >
          Mensagem recebida!
        </h2>
        <p
          className="text-gray-500 max-w-xs"
          style={{ fontFamily: "var(--font-lato), Arial, sans-serif", fontSize: 14 }}
        >
          Obrigado pelo contato. Retornaremos em breve pelo e-mail informado.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100"
    >
      {/* Nome */}
      <div>
        <label htmlFor="nome" className={labelClass}
          style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}>
          Nome
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          value={form.nome}
          onChange={handleChange}
          placeholder="Seu nome completo"
          required
          className={inputClass}
          style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}
          style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}>
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="seu@email.com"
          required
          className={inputClass}
          style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
        />
      </div>

      {/* Mensagem */}
      <div>
        <label htmlFor="mensagem" className={labelClass}
          style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}>
          Mensagem
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          value={form.mensagem}
          onChange={handleChange}
          placeholder="Escreva sua mensagem, sugestão ou dúvida..."
          required
          rows={5}
          className={inputClass}
          style={{ fontFamily: "var(--font-lato), Arial, sans-serif", resize: "vertical" }}
        />
      </div>

      {/* Botão enviar */}
      <button
        type="submit"
        disabled={enviando}
        className="flex items-center justify-center gap-2 text-sm font-semibold text-white py-3 rounded-xl transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{
          backgroundColor: "#E8537A",
          fontFamily: "var(--font-lato), Arial, sans-serif",
        }}
      >
        <Send size={15} />
        {enviando ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
}
