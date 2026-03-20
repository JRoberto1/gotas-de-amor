// Script de importação: insere 200 mensagens no Sanity CMS
// Uso: SANITY_TOKEN=<token> npx tsx scripts/import-mensagens.ts

import { createClient } from "@sanity/client";
import { mensagens } from "./seed-mensagens";

const PROJECT_ID = "td648r51";
const DATASET = "production";

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error("❌  Defina a variável SANITY_TOKEN antes de executar.");
  console.error("   Exemplo: SANITY_TOKEN=skXXX npx tsx scripts/import-mensagens.ts");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 200);
}

async function main() {
  console.log(`\n🌱  Importando ${mensagens.length} mensagens para ${PROJECT_ID}/${DATASET}...\n`);

  let ok = 0;
  let err = 0;

  for (const m of mensagens) {
    const doc = {
      _type: "mensagem",
      titulo: m.titulo,
      slug: { _type: "slug", current: slugify(m.titulo) },
      texto: m.texto,
      categoria: m.categoria,
      tags: m.tags,
      destaque: m.destaque,
    };

    try {
      await client.create(doc);
      ok++;
      process.stdout.write(`✓ [${ok}] ${m.titulo}\n`);
    } catch (e) {
      err++;
      console.error(`✗ Falha em "${m.titulo}":`, (e as Error).message);
    }
  }

  console.log(`\n✅  Concluído: ${ok} inseridas, ${err} erros.\n`);
}

main().catch((e) => {
  console.error("Erro fatal:", e);
  process.exit(1);
});
