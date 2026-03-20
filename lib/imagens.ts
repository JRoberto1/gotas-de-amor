// Imagens Unsplash e alt texts por categoria — arquivo neutro (sem "use client")
// Importável em server components e client components

// Imagens Unsplash por categoria (URLs diretas, 600px otimizado)
export const IMAGENS_CATEGORIA: Record<string, string> = {
  "bom-dia":
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  "boa-noite":
    "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600&q=80",
  amor: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80",
  "fe-espiritualidade":
    "https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=600&q=80",
  familia:
    "https://images.unsplash.com/photo-1476234251651-f353703a034d?w=600&q=80",
  motivacao:
    "https://images.unsplash.com/photo-1464820453369-31d2c0b651af?w=600&q=80",
  amizade:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
  aniversario:
    "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600&q=80",
  "datas-comemorativas":
    "https://images.unsplash.com/photo-1518365050014-70fe7232a541?w=600&q=80",
  "meses-tematicos":
    "https://images.unsplash.com/photo-1508184964240-ee96bb9677a7?w=600&q=80",
  reflexao:
    "https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=600&q=80",
};

// Alt text descritivo por categoria para acessibilidade e SEO
export const ALT_CATEGORIA: Record<string, string> = {
  "bom-dia": "Amanhecer com luz dourada entre montanhas",
  "boa-noite": "Céu estrelado e lua cheia ao entardecer",
  amor: "Casal caminhando em jardim florido ao pôr do sol",
  "fe-espiritualidade": "Luz suave passando por janela de vitral em igreja",
  familia: "Família reunida sorrindo com crianças felizes",
  motivacao: "Pessoa no topo de montanha ao amanhecer com braços abertos",
  amizade: "Grupo de amigos sorrindo e se abraçando ao ar livre",
  aniversario: "Bolo de aniversário colorido com velas acesas",
  "datas-comemorativas": "Decoração festiva e colorida de celebração",
  "meses-tematicos": "Paisagem natural representando os meses do ano",
  reflexao: "Lago calmo refletindo céu e montanhas ao redor",
};
