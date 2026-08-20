import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Palette, Ruler } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Price } from "@/components/commerce/Price";
import { ProductGallery } from "@/components/commerce/ProductGallery";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { SizeSelector } from "@/components/commerce/SizeSelector";
import { SiteShell } from "@/components/layout/SiteShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/lib/cart";
import { useI18n, useLocalized } from "@/lib/i18n";
import { getProduct, listRelatedProducts } from "@/services/catalog.service";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => {
    const name = params.slug.replace(/-/g, " ");
    const title = `${name} — JORCUSTOM`;
    return {
      meta: [
        { title },
        {
          name: "description",
          content: `${name} — heavyweight JORCUSTOM streetwear, customisable per layer. Free shipping over €100.`,
        },
        { property: "og:title", content: title },
        { property: "og:description", content: `${name} by JORCUSTOM.` },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { t } = useI18n();
  const l = useLocalized();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [colorId, setColorId] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);

  const productQuery = useQuery({ queryKey: ["product", slug], queryFn: () => getProduct(slug) });
  const relatedQuery = useQuery({
    queryKey: ["related", slug],
    queryFn: () => listRelatedProducts(slug),
  });

  const product = productQuery.data;

  if (productQuery.isLoading) {
    return (
      <SiteShell>
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2">
          <Skeleton className="aspect-4/5 w-full rounded-md" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </SiteShell>
    );
  }

  if (!product) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <h1 className="text-2xl font-semibold">{t("plp.empty")}</h1>
          <Button asChild className="mt-6 rounded-sm">
            <Link to="/">{t("cart.continue")}</Link>
          </Button>
        </div>
      </SiteShell>
    );
  }

  const color = product.colors.find((c) => c.id === colorId) ?? product.colors[0]!;

  function handleAddToCart() {
    if (!size) {
      toast.error(t("pdp.sizeRequired"));
      return;
    }
    addItem({
      productSlug: product!.slug,
      name: product!.name,
      colorId: color.id,
      colorName: color.name,
      size,
      quantity: 1,
      unitPriceCents: product!.priceCents,
      image: color.image,
    });
    toast.success(t("pdp.added"));
  }

  function handleCustomize() {
    if (!size) {
      toast.error(t("pdp.sizeRequired"));
      return;
    }
    navigate({
      to: "/product-customize-create/$slug/$size",
      params: { slug: product!.slug, size },
    });
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            to="/collection/$collectionName/$category"
            params={{ collectionName: "shop", category: product.category }}
            className="capitalize hover:text-foreground"
          >
            {product.category.replace(/-/g, " ")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <ProductGallery
            images={[color.image, ...product.images.filter((i) => i !== color.image)]}
            alt={product.name}
          />

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-wrap items-center gap-2">
              {product.isNew ? (
                <span className="label-caps rounded-sm bg-primary px-2 py-1 text-primary-foreground">
                  {t("common.new")}
                </span>
              ) : null}
              {product.customizable ? (
                <span className="label-caps rounded-sm bg-brand px-2 py-1 text-brand-foreground">
                  {t("common.customizable")}
                </span>
              ) : null}
            </div>

            <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">{product.name}</h1>
            <Price
              cents={product.priceCents}
              compareAtCents={product.compareAtCents}
              className="mt-3 text-lg"
            />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {l(product.description)}
            </p>

            <div className="mt-8">
              <p className="label-caps mb-3 text-muted-foreground">
                {t("pdp.color")}: {l(color.name)}
              </p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setColorId(c.id)}
                    aria-label={l(c.name)}
                    aria-pressed={c.id === color.id}
                    className={`size-9 rounded-full border-2 transition-colors ${
                      c.id === color.id ? "border-foreground" : "border-border"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <p className="label-caps text-muted-foreground">{t("pdp.selectSize")}</p>
                <a
                  href="#size-guide"
                  className="inline-flex items-center gap-1 text-xs text-brand hover:underline"
                >
                  <Ruler className="size-3.5" /> {t("pdp.sizeGuide")}
                </a>
              </div>
              <SizeSelector
                sizes={product.sizes}
                value={size}
                onChange={setSize}
                soldOutLabel={t("pdp.soldOut")}
              />
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Button size="lg" className="h-12 rounded-sm" onClick={handleAddToCart}>
                {t("pdp.addToCart")}
              </Button>
              {product.customizable ? (
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-sm border-brand text-brand hover:bg-brand-soft hover:text-brand"
                  onClick={handleCustomize}
                >
                  <Palette className="mr-2 size-4" />
                  {t("pdp.customize")}
                </Button>
              ) : null}
            </div>

            <Accordion type="single" collapsible className="mt-10">
              <AccordionItem value="details">
                <AccordionTrigger className="text-sm">{t("pdp.details")}</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                    {product.details.map((detail) => (
                      <li key={l(detail)}>{l(detail)}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="sizing" id="size-guide">
                <AccordionTrigger className="text-sm">{t("pdp.sizing")}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">{l(product.sizing)}</p>
                  <table className="mt-4 w-full text-left text-sm">
                    <thead className="text-muted-foreground">
                      <tr>
                        <th className="py-2 font-medium">{t("cz.size")}</th>
                        <th className="py-2 font-medium">Chest (cm)</th>
                        <th className="py-2 font-medium">Length (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.sizes.map((s, i) => (
                        <tr key={s.label} className="border-t border-border">
                          <td className="py-2">{s.label}</td>
                          <td className="py-2">{54 + i * 3}</td>
                          <td className="py-2">{66 + i * 2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-sm">{t("pdp.shipping")}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    {t("usp.shipping")} · {t("usp.returns")}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <section className="mt-20">
          <h2 className="mb-8 text-xl font-semibold">{t("pdp.related")}</h2>
          <ProductGrid
            products={relatedQuery.data ?? []}
            loading={relatedQuery.isLoading}
            columns={4}
          />
        </section>
      </div>
    </SiteShell>
  );
}
