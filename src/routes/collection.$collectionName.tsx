import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/collection/$collectionName")({
  head: () => ({ meta: [
    { title: 'Collectie — JORCUSTOM' },
    { name: 'description', content: 'Collectie bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:title', content: 'Collectie — JORCUSTOM' },
    { property: 'og:description', content: 'Collectie bij JORCUSTOM: streetwear en gepersonaliseerde kleding.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  ssr: false,
  component: () => <Outlet />,
});
