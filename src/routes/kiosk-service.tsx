import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/KioskService/index";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/kiosk-service")({
  head: () => ({ meta: [
    { title: 'Kiosk service — JORCUSTOM' },
    { name: 'description', content: 'Kiosk service bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:title', content: 'Kiosk service — JORCUSTOM' },
    { property: 'og:description', content: 'Kiosk service bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <RoutedPage />,
});
