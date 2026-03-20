// Sitemap dinâmico — lista todas as mensagens e categorias para indexação
import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { todosSlugsQuery } from "@/lib/queries";
import { CATEGORIAS } from "@/lib/categorias";

const BASE_URL = "https://gotasdeamor.com.br";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Páginas estáticas
  const paginasEstaticas: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/sobre`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contato`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/politica-de-privacidade`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/datas/dia-das-maes`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
  ];

  // Páginas de categoria
  const paginasCategorias: MetadataRoute.Sitemap = CATEGORIAS.map((c) => ({
    url: `${BASE_URL}/categoria/${c.valor}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Páginas individuais de mensagens do Sanity
  let paginasMensagens: MetadataRoute.Sitemap = [];
  try {
    const slugs = await client.fetch<{ slug: string }[]>(todosSlugsQuery);
    paginasMensagens = slugs.map((s) => ({
      url: `${BASE_URL}/mensagem/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // Se o Sanity não estiver disponível, retorna apenas páginas estáticas
  }

  return [...paginasEstaticas, ...paginasCategorias, ...paginasMensagens];
}
