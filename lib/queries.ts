// Queries GROQ para buscar mensagens no Sanity

// Todos os campos retornados em cada mensagem
const MENSAGEM_FIELDS = `
  _id,
  titulo,
  texto,
  categoria,
  tags,
  slug,
  destaque,
  pexelsQuery
`;

// Busca todas as mensagens publicadas, ordenadas por data de criação
export const todasMensagensQuery = `
  *[_type == "mensagem"] | order(_createdAt desc) {
    ${MENSAGEM_FIELDS}
  }
`;

// Busca as 24 mensagens mais recentes para a homepage
export const mensagensHomepageQuery = `
  *[_type == "mensagem"] | order(_createdAt desc) [0..23] {
    ${MENSAGEM_FIELDS}
  }
`;

// Busca mensagens de uma categoria específica
export const mensagensPorCategoriaQuery = `
  *[_type == "mensagem" && categoria == $categoria] | order(_createdAt desc) {
    ${MENSAGEM_FIELDS}
  }
`;

// Busca mensagens marcadas como destaque
export const mensagensDestaqueQuery = `
  *[_type == "mensagem" && destaque == true] | order(_createdAt desc) {
    ${MENSAGEM_FIELDS}
  }
`;

// Busca uma mensagem pelo slug
export const mensagemPorSlugQuery = `
  *[_type == "mensagem" && slug.current == $slug][0] {
    ${MENSAGEM_FIELDS}
  }
`;

// Busca mensagens relacionadas da mesma categoria (excluindo a atual), máx 6
export const mensagensRelacionadasQuery = `
  *[_type == "mensagem" && categoria == $categoria && slug.current != $slug] | order(_createdAt desc)[0..5] {
    ${MENSAGEM_FIELDS}
  }
`;

// Busca todos os slugs para geração estática (generateStaticParams)
export const todosSlugsQuery = `
  *[_type == "mensagem" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// Busca mensagens com paginação para página de categoria
export const mensagensPorCategoriaComPaginacaoQuery = `
  *[_type == "mensagem" && categoria == $categoria] | order(_createdAt desc) [$inicio..$fim] {
    ${MENSAGEM_FIELDS}
  }
`;

// Contagem total de mensagens por categoria (para paginação)
export const contarMensagensPorCategoriaQuery = `
  count(*[_type == "mensagem" && categoria == $categoria])
`;
