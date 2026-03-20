// Utilitários para rotação diária determinística de mensagens
// Todos os usuários veem o mesmo conjunto no mesmo dia

/**
 * Gerador de número pseudoaleatório simples baseado em uma semente (seed).
 * Algoritmo mulberry32 — determinístico e leve.
 */
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Gera um número de seed baseado na data atual (muda a cada meia-noite).
 * Formato: YYYYMMDD como inteiro — ex: 20260320.
 */
export function seedDoDia(): number {
  const hoje = new Date();
  return (
    hoje.getFullYear() * 10000 +
    (hoje.getMonth() + 1) * 100 +
    hoje.getDate()
  );
}

/**
 * Embaralha um array usando o seed do dia.
 * Retorna sempre a mesma ordem para o mesmo dia.
 */
export function embaralharComSeed<T>(array: T[], seed: number): T[] {
  const rng = seededRandom(seed);
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/**
 * Retorna a "Mensagem do Dia" — a primeira do array embaralhado com seed do dia.
 * Se o array estiver vazio, retorna null.
 */
export function mensagemDoDia<T>(array: T[], seed: number): T | null {
  if (array.length === 0) return null;
  const embaralhado = embaralharComSeed(array, seed);
  return embaralhado[0];
}

/**
 * Formata a data de hoje em português para exibição no badge.
 * Ex: "20 de março de 2026"
 */
export function dataHojeFormatada(): string {
  return new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
