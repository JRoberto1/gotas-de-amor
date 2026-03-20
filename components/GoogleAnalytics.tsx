// Componente Google Analytics 4 — inserido no layout
// Substitua G-XXXXXXXXXX pelo seu Measurement ID real
import Script from "next/script";

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
    // Em desenvolvimento ou sem ID configurado, não carrega o script
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

// Função utilitária para disparar eventos GA4
// Uso: trackEvent("copiar_mensagem", { categoria: "bom-dia" })
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && "gtag" in window) {
    (
      window as Window & {
        gtag: (command: string, event: string, params?: Record<string, unknown>) => void;
      }
    ).gtag("event", eventName, params);
  }
}
