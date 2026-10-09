import { createFileRoute } from "@tanstack/react-router";

import { withRouter } from "@/legacy-compat/router";
import Page from "@/legacy/pages/CreateNewPassword";

const RoutedPage = withRouter(Page as never);

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [
    { title: 'Wachtwoord herstellen — JORCUSTOM' },
    { name: 'description', content: 'Wachtwoord herstellen bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:title', content: 'Wachtwoord herstellen — JORCUSTOM' },
    { property: 'og:description', content: 'Wachtwoord herstellen bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <RoutedPage />,
});
