// Server-only utility — NÃO importar em arquivos "use client"
// Usa a Pexels API para buscar imagens por tema, com cache em memória e fallback seguro.

const BASE_URL = "https://api.pexels.com/v1/search";

// Cache em processo — evita requisições duplicadas durante o build/renderização
const _cache = new Map<string, string>();

/** Hash determinístico a partir de uma string — devolve número não-negativo */
function strHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(h, 31) + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/**
 * Busca uma imagem no Pexels por query de texto.
 * Busca per_page=15 resultados e escolhe um deterministicamente pelo hash da query
 * para garantir variedade sem ser sempre o primeiro resultado.
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
    const url = `${BASE_URL}?query=${encodeURIComponent(query)}&per_page=15&page=${page}&orientation=landscape`;
    const res = await fetch(url, {
      headers: { Authorization: apiKey },
      next: { revalidate: 86400 }, // ISR: revalida a cada 24h
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const photos: unknown[] = data.photos ?? [];
    if (!photos.length) {
      _cache.set(key, "");
      return "";
    }

    // Escolha determinística: hash(query+page) % total — evita sempre o primeiro
    const pick = strHash(query + page) % photos.length;
    const photo = photos[pick] as Record<string, Record<string, string>>;
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
 * Prioridade: pexelsQuery > titulo > categoria (fallback).
 * Page é determinístico pelo _id para garantir variedade entre cards.
 * Retorna Record<_id, url>.
 */
export async function getFotosParaMensagens(
  mensagens: Array<{ _id: string; titulo: string; categoria: string; pexelsQuery?: string }>
): Promise<Record<string, string>> {
  const results = await Promise.all(
    mensagens.map(async (m) => {
      const query = m.pexelsQuery || m.titulo;
      const page = pageFromId(m._id);
      const url = await getImageParaMensagem(query, m.categoria, page);
      return { id: m._id, url };
    })
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
