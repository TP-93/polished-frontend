import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { ProductListPage } from "@/components/commerce/ProductListPage";
import { PageHeader, SiteShell } from "@/components/layout/SiteShell";
import { useLocalized } from "@/lib/i18n";
import { getCollection } from "@/services/catalog.service";

export const Route = createFileRoute("/collection/$collectionName/")({
  head: ({ params }) => {
    const title = `${params.collectionName.replace(/-/g, " ")} — JORCUSTOM`;
    return {
      meta: [
        { title },
        {
          name: "description",
          content: `Shop the ${params.collectionName.replace(/-/g, " ")} collection at JORCUSTOM.`,
        },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: `Shop the ${params.collectionName.replace(/-/g, " ")} collection at JORCUSTOM.`,
        },
      ],
    };
  },
  component: CollectionPage,
});

function CollectionPage() {
  const { collectionName } = Route.useParams();
  const l = useLocalized();
  const { data: collection } = useQuery({
    queryKey: ["collection", collectionName],
    queryFn: () => getCollection(collectionName),
  });

  return (
    <SiteShell>
      <PageHeader
        eyebrow="Collection"
        title={collection?.title ?? collectionName.replace(/-/g, " ")}
        {...(collection ? { description: l(collection.subtitle) } : {})}
      />
      <ProductListPage collection={collectionName} />
    </SiteShell>
  );
}
