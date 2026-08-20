import { createFileRoute } from "@tanstack/react-router";

import { ContentPageView } from "@/components/content/ContentPageView";
import { contentPages } from "@/services/content";

export const Route = createFileRoute("/privacybeleid")({
  head: () => {
    const page = contentPages["privacybeleid"]!;
    const title = `${page.title.en} — JORCUSTOM`;
    return {
      meta: [
        { title },
        { name: "description", content: page.intro.en },
        { property: "og:title", content: title },
        { property: "og:description", content: page.intro.en },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PrivacybeleidPage,
});

function PrivacybeleidPage() {
  return <ContentPageView page={contentPages["privacybeleid"]!} />;
}
