// Cliente Sanity para uso direto em componentes e server actions
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "td648r51",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
