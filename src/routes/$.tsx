import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/404";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/$")({
  head: () => ({ meta: [
    { title: 'Pagina niet gevonden — JORCUSTOM' },
    { name: 'description', content: 'Deze JORCUSTOM pagina is niet gevonden.' },
    { property: 'og:title', content: 'Pagina niet gevonden — JORCUSTOM' },
    { property: 'og:description', content: 'Deze JORCUSTOM pagina is niet gevonden.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <RoutedPage />,
});
