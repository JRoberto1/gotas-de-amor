// Queries GROQ para buscar mensagens no Sanity

// Todos os campos retornados em cada mensagem
const MENSAGEM_FIELDS = `
  _id,
  titulo,
  texto,
  categoria,
  tags,
  slug,
  destaque
`;

// Busca todas as mensagens publicadas, ordenadas por data de criação
export const todasMensagensQuery = `
  *[_type == "mensagem"] | order(_createdAt desc) {
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
