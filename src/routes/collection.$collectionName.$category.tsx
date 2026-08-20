import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";

import { ProductListPage } from "@/components/commerce/ProductListPage";
import { PageHeader, SiteShell } from "@/components/layout/SiteShell";
import { useLocalized } from "@/lib/i18n";
import { listCategories } from "@/services/catalog.service";

export const Route = createFileRoute("/collection/$collectionName/$category")({
  head: ({ params }) => {
    const label = params.category.replace(/-/g, " ");
    const title = `${label} — JORCUSTOM`;
    return {
      meta: [
        { title },
        { name: "description", content: `Shop ${label} at JORCUSTOM. Free shipping over €100.` },
        { property: "og:title", content: title },
        { property: "og:description", content: `Shop ${label} at JORCUSTOM.` },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { collectionName, category } = Route.useParams();
  const l = useLocalized();
  const { data: categories } = useQuery({ queryKey: ["categories"], queryFn: listCategories });
  const match = categories?.find((c) => c.slug === category);
  const isSale = collectionName === "sale";

  return (
    <SiteShell>
      <div className="border-b border-border bg-surface">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-[1400px] px-4 pt-6 text-xs text-muted-foreground sm:px-6"
        >
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="capitalize">{collectionName}</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">{match ? l(match.name) : category}</span>
        </nav>
        <div className="mx-auto max-w-[1400px] px-4 pb-12 pt-4 sm:px-6">
          <h1 className="text-3xl font-semibold capitalize sm:text-4xl">
            {match ? l(match.name) : category.replace(/-/g, " ")}
          </h1>
        </div>
      </div>
      <ProductListPage
        {...(isSale ? { collection: category } : { category })}
      />
    </SiteShell>
  );
}
