// Componente de rodapé estático — server component
import { Heart } from "lucide-react";

// Logo reutilizável com gota SVG em versão clara para o fundo escuro
function LogoGotaBranca() {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="28"
        height="36"
        viewBox="0 0 32 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gradiente-gota-footer" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E8537A" />
            <stop offset="100%" stopColor="#F4845F" />
          </linearGradient>
        </defs>
        <path
          d="M16 2C16 2 2 16 2 25C2 33.28 8.27 38 16 38C23.73 38 30 33.28 30 25C30 16 16 2 16 2Z"
          fill="url(#gradiente-gota-footer)"
        />
      </svg>
      <span
        className="text-lg font-semibold text-white tracking-tight"
        style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
      >
        Gotas de Amor
      </span>
    </div>
  );
}

const linksFooter = [
  { grupo: "Conteúdo", links: [{ label: "Categorias", href: "#categorias" }, { label: "Datas Especiais", href: "#datas" }] },
  { grupo: "Institucional", links: [{ label: "Sobre", href: "#sobre" }, { label: "Contato", href: "#contato" }] },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1A1A2E" }} className="mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Coluna da marca */}
          <div className="flex flex-col gap-4">
            <LogoGotaBranca />
            <p
              className="text-sm text-gray-300 leading-relaxed max-w-xs"
              style={{
                fontFamily: "var(--font-playfair-display), Georgia, serif",
                fontStyle: "italic",
              }}
            >
              &ldquo;Palavras certas no momento certo transformam vidas.&rdquo;
            </p>
          </div>

          {/* Grupos de links */}
          {linksFooter.map(({ grupo, links }) => (
            <div key={grupo} className="flex flex-col gap-3">
              <h3
                className="text-xs font-semibold text-gray-400 uppercase tracking-widest"
                style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
              >
                {grupo}
              </h3>
              <ul className="flex flex-col gap-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-gray-300 hover:text-[#E8537A] transition-colors"
                      style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Rodapé inferior */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500" style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}>
            © {new Date().getFullYear()} Gotas de Amor. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1 text-xs text-gray-500" style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}>
            Feito com <Heart size={11} className="text-[#E8537A]" fill="#E8537A" /> para tocar corações
          </p>
        </div>
      </div>
    </footer>
  );
}
