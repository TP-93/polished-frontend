import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/Static";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/ons-verhaal")({
  head: () => ({ meta: [
    { title: 'Ons verhaal — JORCUSTOM' },
    { name: 'description', content: 'Ons verhaal bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:title', content: 'Ons verhaal — JORCUSTOM' },
    { property: 'og:description', content: 'Ons verhaal bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <RoutedPage />,
});
