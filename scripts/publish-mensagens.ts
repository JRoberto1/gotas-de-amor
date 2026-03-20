// Publica todos os drafts do tipo "mensagem" no Sanity CMS
// Uso: SANITY_TOKEN=<token> npx tsx scripts/publish-mensagens.ts

import { createClient } from "@sanity/client";

const PROJECT_ID = "td648r51";
const DATASET = "production";

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error("❌  Defina SANITY_TOKEN antes de executar.");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

async function main() {
  // Busca todos os drafts de mensagem
  const drafts = await client.fetch<{ _id: string; titulo: string }[]>(
    `*[_type == "mensagem" && _id in path("drafts.**")]{ _id, titulo }`
  );

  if (drafts.length === 0) {
    console.log("Nenhum draft de mensagem encontrado.");
    return;
  }

  console.log(`\n📋  ${drafts.length} drafts encontrados. Publicando...\n`);

  // Monta uma transaction com publish (patch + createOrReplace do doc publicado)
  // A forma correta via API é: para cada draft "drafts.XXX", criar/substituir "XXX"
  // usando os dados do draft e deletar o draft.
  let ok = 0;
  let err = 0;

  for (const draft of drafts) {
    const publishedId = draft._id.replace(/^drafts\./, "");

    try {
      // Busca o documento draft completo
      const doc = await client.getDocument(draft._id);
      if (!doc) throw new Error("Documento não encontrado");

      // Cria/substitui o documento publicado (sem o prefixo drafts.)
      const { _id, ...rest } = doc;
      void _id;
      await client
        .transaction()
        .createOrReplace({ ...rest, _id: publishedId })
        .delete(draft._id)
        .commit();

      ok++;
      process.stdout.write(`✓ [${ok}] ${draft.titulo}\n`);
    } catch (e) {
      err++;
      console.error(`✗ Falha em "${draft.titulo}" (${draft._id}):`, (e as Error).message);
    }
  }

  console.log(`\n✅  Concluído: ${ok} publicadas, ${err} erros.\n`);
}

main().catch((e) => {
  console.error("Erro fatal:", e);
  process.exit(1);
});
