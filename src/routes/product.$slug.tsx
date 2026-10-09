import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/Product";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/product/$slug")({
  head: () => ({ meta: [
    { title: 'Productdetails — JORCUSTOM' },
    { name: 'description', content: 'Productdetails bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:title', content: 'Productdetails — JORCUSTOM' },
    { property: 'og:description', content: 'Productdetails bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <RoutedPage />,
});
