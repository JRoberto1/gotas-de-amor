// Faz patch nos 200 documentos do Sanity adicionando o campo pexelsQuery
// Uso: SANITY_TOKEN=<token> npx tsx scripts/patch-pexels-query.ts

import { createClient } from "@sanity/client";
import { mensagens as seed } from "./seed-mensagens";

const token = process.env.SANITY_TOKEN;
if (!token) { console.error("❌  SANITY_TOKEN não definido."); process.exit(1); }

const client = createClient({
  projectId: "td648r51",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// Mapa título → pexelsQuery do seed
const queryPorTitulo = new Map(seed.map((m) => [m.titulo, m.pexelsQuery]));

async function main() {
  console.log(`\n🔍  Buscando documentos no Sanity...\n`);

  const docs = await client.fetch<{ _id: string; titulo: string; pexelsQuery?: string }[]>(
    `*[_type == "mensagem"] { _id, titulo, pexelsQuery }`
  );

  console.log(`📄  ${docs.length} documentos encontrados.\n`);

  let ok = 0, semMatch = 0, jaTemCampo = 0;

  for (const doc of docs) {
    const pexelsQuery = queryPorTitulo.get(doc.titulo);

    if (!pexelsQuery) {
      semMatch++;
      console.log(`⚠️  Sem match no seed: "${doc.titulo}"`);
      continue;
    }

    if (doc.pexelsQuery === pexelsQuery) {
      jaTemCampo++;
      continue; // já está correto, pula
    }

    try {
      await client.patch(doc._id).set({ pexelsQuery }).commit();
      ok++;
      process.stdout.write(`✓ [${ok}] ${doc.titulo}\n`);
    } catch (e) {
      console.error(`✗ "${doc.titulo}":`, (e as Error).message);
    }
  }

  console.log(`\n✅  Concluído: ${ok} atualizados, ${jaTemCampo} já corretos, ${semMatch} sem match.\n`);
}

main().catch((e) => { console.error(e); process.exit(1); });
