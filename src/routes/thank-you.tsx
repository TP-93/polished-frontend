import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/ThankYou";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/thank-you")({
  head: () => ({ meta: [
    { title: 'Bedankt voor je bestelling — JORCUSTOM' },
    { name: 'description', content: 'Bekijk de bevestiging van je JORCUSTOM bestelling.' },
    { property: 'og:title', content: 'Bedankt voor je bestelling — JORCUSTOM' },
    { property: 'og:description', content: 'Bekijk de bevestiging van je JORCUSTOM bestelling.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <RoutedPage />,
});
