// Server-only utility — NÃO importar em arquivos "use client"
// Usa a Pexels API para buscar imagens por tema, com cache em memória e fallback seguro.

const BASE_URL = "https://api.pexels.com/v1/search";

// Cache em processo — evita requisições duplicadas durante o build/renderização
const _cache = new Map<string, string>();

/**
 * Busca a primeira imagem no Pexels por query de texto (orientation=landscape).
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
      cache: "no-store", // temporário: sem cache para bustar Vercel
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const photo = (data.photos ?? [])[0] as Record<string, Record<string, string>> | undefined;
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
 * Busca imagem usando a query principal.
 * Fallback: título isolado se a query falhar, sem usar categoria
 * (categoria causava imagens repetidas para mensagens da mesma categoria).
 */
export async function getImageParaMensagem(
  query: string,
  _categoria: string,
  page: number
): Promise<string> {
  return getImage(query, { page });
}

/**
 * Busca imagens para um array de mensagens Sanity em paralelo.
 * Prioridade: pexelsQuery > titulo > categoria (fallback).
 * Page é determinístico pelo _id para garantir variedade entre cards.
 * Retorna Record<_id, url>.
 */
/**
 * Busca imagens para um array de mensagens Sanity em lotes de 2 com 600ms entre lotes.
 * Prioridade de query: pexelsQuery (campo Sanity, inglês) > titulo (português, fallback).
 * Evita HTTP 429 (rate limit por segundo da Pexels).
 * Retorna Record<_id, url>.
 */
export async function getFotosParaMensagens(
  mensagens: Array<{ _id: string; titulo: string; categoria: string; pexelsQuery?: string }>
): Promise<Record<string, string>> {
  const CHUNK = 2;
  const DELAY = 600;
  const results: Array<{ id: string; url: string }> = [];

  for (let i = 0; i < mensagens.length; i += CHUNK) {
    if (i > 0) await new Promise((r) => setTimeout(r, DELAY));
    const lote = mensagens.slice(i, i + CHUNK);
    const loteResults = await Promise.all(
      lote.map(async (m) => {
        const query = m.pexelsQuery || m.titulo;
        const url = await getImageParaMensagem(query, m.categoria, 1);
        return { id: m._id, url };
      })
    );
    results.push(...loteResults);
  }

  return Object.fromEntries(results.map(({ id, url }) => [id, url]));
}

/**
 * Busca múltiplas imagens em lotes de 3 com 350ms entre lotes.
 * Evita HTTP 429 (rate limit por segundo da Pexels).
 * Retorna um Record<key, url> — url é string vazia se a busca falhar.
 */
export async function getImages(
  queries: Array<{ key: string; query: string; page?: number }>
): Promise<Record<string, string>> {
  const CHUNK = 2;
  const DELAY = 600; // ms entre lotes
  const results: Array<{ key: string; url: string }> = [];

  for (let i = 0; i < queries.length; i += CHUNK) {
    if (i > 0) await new Promise((r) => setTimeout(r, DELAY));
    const lote = queries.slice(i, i + CHUNK);
    const loteResults = await Promise.all(
      lote.map(async ({ key, query, page }) => ({
        key,
        url: await getImage(query, { page }),
      }))
    );
    results.push(...loteResults);
  }

  return Object.fromEntries(results.map(({ key, url }) => [key, url]));
}
