import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/Home";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: 'JORCUSTOM — Make It Personal' },
    { name: 'description', content: 'Ontdek JORCUSTOM streetwear en personaliseer jouw kleding met de Customize Tool.' },
    { property: 'og:title', content: 'JORCUSTOM — Make It Personal' },
    { property: 'og:description', content: 'Ontdek JORCUSTOM streetwear en personaliseer jouw kleding met de Customize Tool.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <RoutedPage />,
});
