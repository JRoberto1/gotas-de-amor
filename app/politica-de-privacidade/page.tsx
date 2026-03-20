// Página de Política de Privacidade — /politica-de-privacidade
// Obrigatória para aprovação no Google AdSense
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidade | Gotas de Amor",
  description:
    "Política de privacidade do Gotas de Amor. Saiba como coletamos, usamos e protegemos suas informações.",
};

export default function PoliticaPrivacidadePage() {
  const secoes = [
    {
      titulo: "1. Informações que Coletamos",
      conteudo: `Podemos coletar informações pessoais quando você utiliza nosso site, como endereço de e-mail (ao se inscrever na newsletter) e informações de contato fornecidas voluntariamente por você através do formulário de contato.

Também coletamos automaticamente dados de uso, incluindo endereço IP, tipo de navegador, páginas visitadas e tempo de permanência, por meio de ferramentas de análise como o Google Analytics 4.`,
    },
    {
      titulo: "2. Como Usamos suas Informações",
      conteudo: `Utilizamos as informações coletadas para:
- Enviar a newsletter com mensagens temáticas (apenas para inscritos)
- Responder suas dúvidas e sugestões enviadas pelo formulário de contato
- Melhorar o conteúdo e a experiência de navegação do site
- Analisar o tráfego e o comportamento dos usuários de forma agregada e anônima`,
    },
    {
      titulo: "3. Cookies e Tecnologias de Rastreamento",
      conteudo: `Utilizamos cookies para melhorar sua experiência de navegação. Os cookies são pequenos arquivos armazenados no seu dispositivo que nos ajudam a lembrar suas preferências e entender como você usa o site.

Você pode desativar os cookies nas configurações do seu navegador, mas isso pode afetar algumas funcionalidades do site.

Tipos de cookies utilizados:
- Cookies essenciais: necessários para o funcionamento básico do site
- Cookies analíticos: usados pelo Google Analytics 4 para análise de tráfego
- Cookies de publicidade: usados pelo Google AdSense para exibir anúncios relevantes`,
    },
    {
      titulo: "4. Google AdSense e Publicidade",
      conteudo: `Este site utiliza o Google AdSense para exibição de anúncios. O Google pode usar cookies para exibir anúncios com base em suas visitas anteriores a este e outros sites.

O Google AdSense utiliza o cookie DART para exibir anúncios com base nas visitas do usuário a sites na internet. Você pode desativar o uso do cookie DART visitando a Política de Privacidade da rede de conteúdo e anúncios do Google em: https://policies.google.com/privacy.

Provedores terceiros, incluindo o Google, usam cookies para exibir anúncios com base nas visitas anteriores do usuário a este ou outros sites.`,
    },
    {
      titulo: "5. Google Analytics",
      conteudo: `Utilizamos o Google Analytics 4 para analisar o uso do nosso site. O Google Analytics coleta dados como endereço IP (anonimizado), tipo de dispositivo, navegador e comportamento de navegação.

Esses dados são usados exclusivamente para melhorar nosso conteúdo e experiência. Nenhuma informação pessoal identificável é compartilhada com terceiros.

Para saber mais sobre como o Google usa os dados coletados, visite: https://policies.google.com/technologies/partner-sites`,
    },
    {
      titulo: "6. Compartilhamento de Informações",
      conteudo: `Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto:
- Quando exigido por lei ou ordem judicial
- Com provedores de serviço que nos auxiliam na operação do site (como Google Analytics e Google AdSense), sujeitos a acordos de confidencialidade
- Para proteger os direitos, propriedade ou segurança do Gotas de Amor e seus usuários`,
    },
    {
      titulo: "7. Seus Direitos (LGPD)",
      conteudo: `Em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018), você tem o direito de:
- Acessar os dados pessoais que mantemos sobre você
- Solicitar a correção de dados incorretos ou desatualizados
- Solicitar a exclusão dos seus dados pessoais
- Revogar o consentimento para o uso dos seus dados
- Solicitar a portabilidade dos dados

Para exercer esses direitos, entre em contato conosco através da página de Contato.`,
    },
    {
      titulo: "8. Segurança dos Dados",
      conteudo: `Adotamos medidas técnicas e organizacionais adequadas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela internet é 100% seguro.`,
    },
    {
      titulo: "9. Links Externos",
      conteudo: `Nosso site pode conter links para sites externos. Não somos responsáveis pelas práticas de privacidade desses sites e recomendamos que você leia as políticas de privacidade de qualquer site que visitar.`,
    },
    {
      titulo: "10. Alterações nesta Política",
      conteudo: `Podemos atualizar esta Política de Privacidade periodicamente. A data da última atualização será sempre indicada no topo desta página. Recomendamos que você a revise regularmente.`,
    },
    {
      titulo: "11. Contato",
      conteudo: `Se tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos seus dados, entre em contato conosco através da nossa página de Contato.

Site: gotasdeamor.com.br
Última atualização: março de 2026`,
    },
  ];

  return (
    <>
      <Header />

      <main className="flex flex-col flex-1 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-12">
          {/* Título */}
          <h1
            className="text-4xl font-bold text-[#1A1A2E] mb-3"
            style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
          >
            Política de Privacidade
          </h1>
          <p
            className="text-sm text-gray-400 mb-10"
            style={{ fontFamily: "var(--font-lato), Arial, sans-serif" }}
          >
            Última atualização: março de 2026
          </p>

          {/* Introdução */}
          <p
            className="text-gray-600 mb-10 leading-relaxed"
            style={{
              fontFamily: "var(--font-lato), Arial, sans-serif",
              fontSize: 16,
              lineHeight: 1.8,
            }}
          >
            O Gotas de Amor (&quot;nós&quot;, &quot;nosso&quot; ou &quot;site&quot;) está comprometido em
            proteger sua privacidade. Esta Política de Privacidade descreve como coletamos,
            usamos e protegemos suas informações quando você utiliza nosso site
            gotasdeamor.com.br.
          </p>

          {/* Seções */}
          <div className="flex flex-col gap-8">
            {secoes.map(({ titulo, conteudo }) => (
              <section key={titulo}>
                <h2
                  className="text-lg font-semibold text-[#1A1A2E] mb-3"
                  style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
                >
                  {titulo}
                </h2>
                <div
                  className="text-gray-600 leading-relaxed whitespace-pre-line"
                  style={{
                    fontFamily: "var(--font-lato), Arial, sans-serif",
                    fontSize: 15,
                    lineHeight: 1.8,
                  }}
                >
                  {conteudo}
                </div>
                <hr className="border-gray-100 mt-8" />
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
