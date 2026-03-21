// Server-only utility — NÃO importar em arquivos "use client"
// Usa a Pexels API para buscar imagens por tema, com cache em memória e fallback seguro.

const BASE_URL = "https://api.pexels.com/v1/search";

// Cache em processo — evita requisições duplicadas durante o build/renderização
const _cache = new Map<string, string>();

/**
 * Busca uma imagem no Pexels por query de texto.
 * Retorna a URL da foto ou string vazia se a API não estiver configurada ou falhar.
 */
export async function getImage(
  query: string,
  { page = 1 }: { page?: number } = {}
): Promise<string> {
  const key = `${query}::${page}`;
  if (_cache.has(key)) return _cache.get(key)!;

  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    console.warn(`[pexels] PEXELS_API_KEY não definida — sem imagem para: "${query}"`);
    return "";
  }

  try {
    const url = `${BASE_URL}?query=${encodeURIComponent(query)}&per_page=1&page=${page}&orientation=landscape`;
    const res = await fetch(url, {
      headers: { Authorization: apiKey },
      next: { revalidate: 86400 }, // ISR: revalida a cada 24h
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const photo = data.photos?.[0];
    const photoUrl: string =
      photo?.src?.large2x ?? photo?.src?.large ?? photo?.src?.medium ?? "";

    _cache.set(key, photoUrl);
    return photoUrl;
  } catch (err) {
    console.error(`[pexels] Falha para "${query}" (page ${page}):`, err);
    return "";
  }
}

/**
 * Gera um número de página 1–5 deterministicamente a partir de um ID Sanity.
 * Garante variação entre cards sem aleatoriedade a cada render.
 */
export function pageFromId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) & 0xfffff;
  }
  return (hash % 5) + 1;
}

/**
 * Busca imagem usando o título como query principal.
 * Se não encontrar resultado, faz fallback para a categoria.
 */
export async function getImageParaMensagem(
  titulo: string,
  categoria: string,
  page: number
): Promise<string> {
  const url = await getImage(titulo, { page });
  if (url) return url;

  // Fallback: categoria (slug → palavras)
  const queryFallback = categoria.replace(/-/g, " ");
  return getImage(queryFallback, { page });
}

/**
 * Busca imagens para um array de mensagens Sanity em paralelo.
 * Usa o título como query + page determinístico pelo _id + fallback pela categoria.
 * Retorna Record<_id, url>.
 */
export async function getFotosParaMensagens(
  mensagens: Array<{ _id: string; titulo: string; categoria: string }>
): Promise<Record<string, string>> {
  const results = await Promise.all(
    mensagens.map(async (m) => ({
      id: m._id,
      url: await getImageParaMensagem(m.titulo, m.categoria, pageFromId(m._id)),
    }))
  );
  return Object.fromEntries(results.map(({ id, url }) => [id, url]));
}

/**
 * Busca múltiplas imagens em paralelo.
 * Retorna um Record<key, url> — url é string vazia se a busca falhar.
 */
export async function getImages(
  queries: Array<{ key: string; query: string; page?: number }>
): Promise<Record<string, string>> {
  const results = await Promise.all(
    queries.map(async ({ key, query, page }) => ({
      key,
      url: await getImage(query, { page }),
    }))
  );
  return Object.fromEntries(results.map(({ key, url }) => [key, url]));
}
