import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/Checkout";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [
    { title: 'Checkout — JORCUSTOM' },
    { name: 'description', content: 'Rond je JORCUSTOM bestelling af: informatie, verzending en betaling.' },
    { property: 'og:title', content: 'Checkout — JORCUSTOM' },
    { property: 'og:description', content: 'Rond je JORCUSTOM bestelling af: informatie, verzending en betaling.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <RoutedPage />,
});
