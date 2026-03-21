// Server-only utility — NÃO importar em arquivos "use client"
// Usa a Pexels API para buscar imagens por tema, com cache em memória e fallback seguro.

const BASE_URL = "https://api.pexels.com/v1/search";

// Queries por categoria — 5 variações por categoria para rotacionar entre cards
const QUERIES_POR_CATEGORIA: Record<string, string[]> = {
  "amor": ["couple love romantic sunset", "love embrace tender couple", "romantic flowers hearts", "couple walking together", "love kiss sunset beach"],
  "familia": ["family together happy home", "mother child love", "father daughter playing", "grandparents grandchildren joy", "family dinner table warm"],
  "motivacao": ["person mountain sunrise arms", "running motivation fitness", "success achievement goal", "woman confident strong", "sunrise new day motivation"],
  "amizade": ["friends laughing together", "friendship outdoor joy", "best friends hugging", "friends coffee talking", "group friends smiling"],
  "fe-espiritualidade": ["church light stained glass", "prayer hands light", "cross sunrise faith", "bible open light", "candle prayer peaceful"],
  "bom-dia": ["sunrise morning coffee", "morning golden light", "breakfast cozy morning", "sunrise sky orange", "morning nature peaceful"],
  "boa-noite": ["moon stars night sky", "night city lights", "candle night cozy", "starry night peaceful", "sunset evening sky"],
  "aniversario": ["birthday cake candles", "celebration confetti joy", "birthday balloons colorful", "party celebration happy", "birthday flowers gift"],
  "reflexao": ["person thinking nature", "lake reflection peaceful", "meditation calm nature", "books reading cozy", "autumn leaves reflection"],
  "datas-comemorativas": ["celebration flowers spring", "holiday family together", "festive decoration colorful", "seasonal flowers bouquet", "holiday celebration warm"],
};

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
 * Busca imagens para um array de mensagens em lotes de 2 com 600ms entre lotes.
 * Usa QUERIES_POR_CATEGORIA com rotação por índice global para variedade entre cards.
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
      lote.map(async (m, loteIndex) => {
        const globalIndex = i + loteIndex;
        const queries = QUERIES_POR_CATEGORIA[m.categoria] ?? ["nature beautiful peaceful"];
        const query = queries[globalIndex % queries.length];
        const url = await getImage(query, { page: 1 });
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
