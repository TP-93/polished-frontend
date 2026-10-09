import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/Category";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/category/$slug")({
  head: () => ({ meta: [
    { title: 'Productcategorie — JORCUSTOM' },
    { name: 'description', content: 'Productcategorie bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:title', content: 'Productcategorie — JORCUSTOM' },
    { property: 'og:description', content: 'Productcategorie bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <RoutedPage />,
});
