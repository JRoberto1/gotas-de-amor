// Importa 20 mensagens de Páscoa para o Sanity CMS
// Uso: SANITY_TOKEN=<token> npx tsx scripts/import-pascoa.ts

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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 200);
}

const mensagens = [
  {
    titulo: "Páscoa de Renovação",
    texto: "A Páscoa nos lembra que nenhuma pedra é grande demais para ser removida. Que esse dia traga renovação real para a sua vida.",
    categoria: "datas-comemorativas",
    tags: ["páscoa", "renovação", "esperança", "ressurreição"],
    destaque: true,
  },
  {
    titulo: "Ele Ressuscitou",
    texto: "A maior notícia da história não veio por jornal, por rádio ou por celular. Veio por uma tumba vazia. Feliz Páscoa!",
    categoria: "datas-comemorativas",
    tags: ["páscoa", "ressurreição", "fé", "Cristo"],
    destaque: true,
  },
  {
    titulo: "Recomeço de Páscoa",
    texto: "Se a Páscoa significa alguma coisa, é que todo fim pode virar começo. Que a sua história tenha esse mesmo poder.",
    categoria: "datas-comemorativas",
    tags: ["páscoa", "recomeço", "esperança", "vida"],
    destaque: false,
  },
  {
    titulo: "Paz Que Vem da Fé",
    texto: "Feliz Páscoa! Que a paz que veio com a ressurreição entre na sua casa, no seu coração e na sua vida.",
    categoria: "datas-comemorativas",
    tags: ["páscoa", "paz", "fé", "bênção"],
    destaque: false,
  },
  {
    titulo: "Páscoa em Família",
    texto: "A Páscoa mais bonita é aquela vivida junto com quem você ama. Que a mesa esteja cheia e o coração mais ainda.",
    categoria: "datas-comemorativas",
    tags: ["páscoa", "família", "amor", "reunião"],
    destaque: true,
  },
  {
    titulo: "Amor Que Não Tem Fim",
    texto: "A Páscoa é a prova maior de um amor que não tem limite, não tem condição e não tem fim. Feliz Páscoa!",
    categoria: "datas-comemorativas",
    tags: ["páscoa", "amor", "sacrifício", "graça"],
    destaque: false,
  },
  {
    titulo: "Primavera da Alma",
    texto: "Assim como a primavera faz as flores voltarem, a Páscoa faz a esperança voltar. Feliz Páscoa!",
    categoria: "datas-comemorativas",
    tags: ["páscoa", "primavera", "flores", "esperança"],
    destaque: false,
  },
  {
    titulo: "Chocolate e Gratidão",
    texto: "Que a doçura do chocolate lembre que a vida também tem momentos doces. Feliz Páscoa com muito amor!",
    categoria: "datas-comemorativas",
    tags: ["páscoa", "chocolate", "alegria", "gratidão"],
    destaque: false,
  },
  {
    titulo: "Vitória Sobre Tudo",
    texto: "A Páscoa é a celebração da maior vitória já conquistada. Que essa vitória se reflita em cada área da sua vida.",
    categoria: "datas-comemorativas",
    tags: ["páscoa", "vitória", "fé", "poder"],
    destaque: false,
  },
  {
    titulo: "Feliz Páscoa Meu Amor",
    texto: "Feliz Páscoa! Que esse dia seja tão especial quanto você é pra mim. Com amor e muita esperança.",
    categoria: "datas-comemorativas",
    tags: ["páscoa", "amor", "casal", "especial"],
    destaque: false,
  },
  {
    titulo: "Para os Filhos na Páscoa",
    texto: "Que seus olhos brilhem ao encontrar os ovos, mas que seu coração brilhe mais ainda ao entender o verdadeiro significado da Páscoa.",
    categoria: "datas-comemorativas",
    tags: ["páscoa", "filhos", "crianças", "família"],
    destaque: true,
  },
  {
    titulo: "Páscoa de Cura",
    texto: "Que essa Páscoa traga cura para o que está partido em você. Nada está quebrado demais para ser restaurado.",
    categoria: "datas-comemorativas",
    tags: ["páscoa", "cura", "restauração", "esperança"],
    destaque: false,
  },
  {
    titulo: "Amigo Feliz Páscoa",
    texto: "Feliz Páscoa, meu amigo! Que essa data te lembre que você tem valor, que é amado e que não está sozinho.",
    categoria: "datas-comemorativas",
    tags: ["páscoa", "amizade", "valor", "amor"],
    destaque: false,
  },
  {
    titulo: "A Pedra Foi Removida",
    texto: "Se Deus removeu a pedra do sepulcro, Ele pode remover qualquer obstáculo que está no seu caminho. Feliz Páscoa!",
    categoria: "datas-comemorativas",
    tags: ["páscoa", "fé", "obstáculo", "Deus"],
    destaque: false,
  },
  {
    titulo: "Páscoa de Luz",
    texto: "Que a luz da Páscoa ilumine seus caminhos, espante o medo e encha seu coração de fé. Feliz Páscoa!",
    categoria: "datas-comemorativas",
    tags: ["páscoa", "luz", "fé", "coragem"],
    destaque: false,
  },
  {
    titulo: "Ressurreição e Esperança",
    texto: "A ressurreição não é só um evento histórico. É uma promessa viva de que o melhor ainda está por vir. Feliz Páscoa!",
    categoria: "datas-comemorativas",
    tags: ["páscoa", "ressurreição", "promessa", "esperança"],
    destaque: true,
  },
  {
    titulo: "Páscoa de Graça",
    texto: "A graça é receber o que não merecemos. A Páscoa é a maior expressão dessa graça. Seja grato hoje.",
    categoria: "datas-comemorativas",
    tags: ["páscoa", "graça", "gratidão", "fé"],
    destaque: false,
  },
  {
    titulo: "Tradição de Amor",
    texto: "A Páscoa é uma das tradições mais bonitas que existe: parar, lembrar e agradecer pelo amor que muda tudo.",
    categoria: "datas-comemorativas",
    tags: ["páscoa", "tradição", "amor", "gratidão"],
    destaque: false,
  },
  {
    titulo: "Mensagem de Páscoa Para Mãe",
    texto: "Feliz Páscoa, mãe! Que Deus te abençoe com saúde, paz e muito amor. Você merece tudo de melhor.",
    categoria: "datas-comemorativas",
    tags: ["páscoa", "mãe", "bênção", "amor"],
    destaque: false,
  },
  {
    titulo: "Esperança Viva",
    texto: "A Páscoa transforma o luto em dança, o choro em alegria e o fim em começo. Que você viva isso hoje.",
    categoria: "datas-comemorativas",
    tags: ["páscoa", "esperança", "alegria", "transformação"],
    destaque: true,
  },
];

async function main() {
  console.log(`\n🐣  Importando ${mensagens.length} mensagens de Páscoa...\n`);
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
      console.error(`✗ "${m.titulo}":`, (e as Error).message);
    }
  }

  console.log(`\n✅  Concluído: ${ok} inseridas, ${err} erros.\n`);
}

main().catch((e) => { console.error(e); process.exit(1); });
