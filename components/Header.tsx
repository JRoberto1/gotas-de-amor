"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

// Logo com ícone de gota SVG e gradiente da paleta Gotas de Amor
function LogoGota() {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="32"
        height="40"
        viewBox="0 0 32 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gradiente-gota" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E8537A" />
            <stop offset="100%" stopColor="#F4845F" />
          </linearGradient>
        </defs>
        <path
          d="M16 2C16 2 2 16 2 25C2 33.28 8.27 38 16 38C23.73 38 30 33.28 30 25C30 16 16 2 16 2Z"
          fill="url(#gradiente-gota)"
        />
      </svg>
      <span
        className="text-xl font-semibold text-[#1A1A2E] tracking-tight"
        style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
      >
        Gotas de Amor
      </span>
    </div>
  );
}

// Links de navegação principal
const navLinks = [
  { label: "Início", href: "/" },
  { label: "Categorias", href: "#categorias" },
  { label: "Datas", href: "#datas" },
  { label: "Favoritos", href: "#favoritos" },
];

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" aria-label="Gotas de Amor — página inicial">
            <LogoGota />
          </Link>

          {/* Navegação desktop */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#1A1A2E] hover:text-[#E8537A] transition-colors duration-200"
                style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Botão hamburger — mobile */}
          <button
            className="md:hidden p-2 rounded-lg text-[#1A1A2E] hover:bg-gray-100 transition-colors"
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
          >
            {menuAberto ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuAberto && (
        <nav
          className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 pt-2"
          aria-label="Navegação mobile"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 text-base font-medium text-[#1A1A2E] hover:text-[#E8537A] border-b border-gray-50 transition-colors"
              style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
              onClick={() => setMenuAberto(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
