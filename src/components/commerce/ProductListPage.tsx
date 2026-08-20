import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { FilterPanel, type FilterState } from "@/components/commerce/FilterPanel";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/lib/i18n";
import { listFilterFacets, listProducts } from "@/services/catalog.service";
import type { SortKey } from "@/services/types";

const PER_PAGE = 24;

export function ProductListPage({
  collection,
  category,
}: {
  collection?: string;
  category?: string;
}) {
  const { t } = useI18n();
  const [sort, setSort] = useState<SortKey>("featured");
  const [filters, setFilters] = useState<FilterState>({
    sizes: [],
    colors: [],
    maxPriceCents: Number.MAX_SAFE_INTEGER,
    customizableOnly: false,
  });

  const facetsQuery = useQuery({ queryKey: ["facets"], queryFn: listFilterFacets });
  const facets = facetsQuery.data;
  const maxPrice = facets?.maxPriceCents ?? 20000;
  const effectiveMax = Math.min(filters.maxPriceCents, maxPrice);

  const productsQuery = useQuery({
    queryKey: ["products", collection, category, filters, sort, effectiveMax],
    queryFn: () =>
      listProducts({
        ...(collection ? { collection } : {}),
        ...(category ? { category } : {}),
        sizes: filters.sizes,
        colors: filters.colors,
        maxPriceCents: effectiveMax,
        customizableOnly: filters.customizableOnly,
        sort,
        perPage: PER_PAGE,
      }),
  });

  const sortOptions: { value: SortKey; label: string }[] = [
    { value: "featured", label: t("plp.sort.featured") },
    { value: "new", label: t("plp.sort.new") },
    { value: "priceAsc", label: t("plp.sort.priceAsc") },
    { value: "priceDesc", label: t("plp.sort.priceDesc") },
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
      <div className="flex gap-10">
        {facets ? (
          <FilterPanel
            facets={facets}
            value={{ ...filters, maxPriceCents: effectiveMax }}
            onChange={setFilters}
            onClear={() =>
              setFilters({
                sizes: [],
                colors: [],
                maxPriceCents: maxPrice,
                customizableOnly: false,
              })
            }
          />
        ) : null}

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {productsQuery.data?.total ?? 0} {t("plp.results")}
            </p>
            <div className="flex items-center gap-2">
              {facets ? (
                <div className="lg:hidden">
                  <FilterPanel
                    facets={facets}
                    value={{ ...filters, maxPriceCents: effectiveMax }}
                    onChange={setFilters}
                    onClear={() =>
                      setFilters({
                        sizes: [],
                        colors: [],
                        maxPriceCents: maxPrice,
                        customizableOnly: false,
                      })
                    }
                  />
                </div>
              ) : null}
              <Select value={sort} onValueChange={(value) => setSort(value as SortKey)}>
                <SelectTrigger className="h-9 w-44 rounded-sm" aria-label={t("plp.sort")}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <ProductGrid
            products={productsQuery.data?.items ?? []}
            loading={productsQuery.isLoading}
          />
        </div>
      </div>
    </div>
  );
}
