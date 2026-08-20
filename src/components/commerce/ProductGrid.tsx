import { ProductCard } from "@/components/commerce/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/lib/i18n";
import type { Product } from "@/services/types";

export function ProductGrid({
  products,
  loading = false,
  columns = 4,
}: {
  products: Product[];
  loading?: boolean;
  columns?: 3 | 4;
}) {
  const { t } = useI18n();
  const grid =
    columns === 3
      ? "grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3"
      : "grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-4";

  if (loading) {
    return (
      <div className={grid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="aspect-4/5 w-full rounded-md" />
            <Skeleton className="mt-3 h-4 w-3/4" />
            <Skeleton className="mt-2 h-4 w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="rounded-md border border-dashed border-border px-6 py-16 text-center">
        <p className="font-medium">{t("plp.empty")}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t("plp.emptyBody")}</p>
      </div>
    );
  }

  return (
    <div className={grid}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 4} />
      ))}
    </div>
  );
}
