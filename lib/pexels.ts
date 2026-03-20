// Server-only utility — NÃO importar em arquivos "use client"
// Usa a Pexels API para buscar imagens por tema, com cache em memória e fallback seguro.

const BASE_URL = "https://api.pexels.com/v1/search";

// Cache em processo — evita requisições duplicadas durante o build/renderização
const _cache = new Map<string, string>();

/**
 * Busca uma imagem no Pexels por query de texto.
 * Retorna a URL da foto ou string vazia se a API não estiver configurada ou falhar.
 *
 * @param query  Termo de busca em inglês (ex: "mother daughter love")
 * @param page   Página de resultados para variar a foto (default: 1)
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
