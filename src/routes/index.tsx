import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import heroCampaign from "@/assets/hero-campaign.jpg";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { UspBar } from "@/components/commerce/UspBar";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { useI18n, useLocalized } from "@/lib/i18n";
import { listCollections, listProducts } from "@/services/catalog.service";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JORCUSTOM — Streetwear you colour yourself" },
      {
        name: "description",
        content:
          "Heavyweight streetwear built to be customised. Pick a piece and set every colour of the artwork yourself in the Customize Tool.",
      },
      { property: "og:title", content: "JORCUSTOM — Streetwear you colour yourself" },
      {
        property: "og:description",
        content: "Heavyweight streetwear built to be customised. Design your own colourway.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useI18n();
  const l = useLocalized();

  const collectionsQuery = useQuery({ queryKey: ["collections"], queryFn: listCollections });
  const newInQuery = useQuery({
    queryKey: ["products", "new-in"],
    queryFn: () => listProducts({ sort: "new", perPage: 8 }),
  });
  const customQuery = useQuery({
    queryKey: ["products", "customizable"],
    queryFn: () => listProducts({ customizableOnly: true, perPage: 4 }),
  });
  const saleQuery = useQuery({
    queryKey: ["products", "sale"],
    queryFn: () => listProducts({ collection: "sale", perPage: 4 }),
  });

  const featured = (collectionsQuery.data ?? []).filter((c) => c.featured).slice(0, 3);

  return (
    <SiteShell>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] items-stretch gap-0 px-0 lg:grid-cols-2">
          <div className="flex flex-col justify-center px-4 py-14 sm:px-6 lg:py-24">
            <p className="label-caps text-brand">{t("home.hero.eyebrow")}</p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              {t("home.hero.title")}
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("home.hero.body")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-sm">
                <Link
                  to="/collection/$collectionName"
                  params={{ collectionName: "fallwinter25-drop-two" }}
                >
                  {t("home.hero.cta")}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-sm">
                <Link to="/custom-made-kleding">{t("home.hero.cta2")}</Link>
              </Button>
            </div>
          </div>
          <div className="relative min-h-[320px] lg:min-h-[560px]">
            <img
              src={heroCampaign}
              alt="Two models wearing black oversized JORCUSTOM pieces in a concrete studio"
              width={1920}
              height={1088}
              className="absolute inset-0 size-full object-cover"
            />
          </div>
        </div>
      </section>

      <UspBar />

      {/* Collections */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">{t("home.collections")}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((collection) => (
            <Link
              key={collection.slug}
              to="/collection/$collectionName"
              params={{ collectionName: collection.slug }}
              className="group overflow-hidden rounded-md border border-border bg-card"
            >
              <div className="aspect-3/2 overflow-hidden bg-surface">
                <img
                  src={collection.image}
                  alt={collection.title}
                  loading="lazy"
                  width={1024}
                  height={683}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold">{collection.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{l(collection.subtitle)}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
                  {t("home.viewAll")} <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New in */}
      <section className="mx-auto max-w-[1400px] px-4 pb-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">{t("home.newIn")}</h2>
          <Link
            to="/collection/$collectionName/$category"
            params={{ collectionName: "shop", category: "hoodies" }}
            className="text-sm font-medium text-brand hover:underline"
          >
            {t("home.viewAll")}
          </Link>
        </div>
        <ProductGrid products={newInQuery.data?.items ?? []} loading={newInQuery.isLoading} />
      </section>

      {/* Customize band */}
      <section className="border-y border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="label-caps text-primary-foreground/70">{t("cz.title")}</p>
            <h2 className="mt-3 max-w-xl text-2xl font-semibold sm:text-3xl">
              {t("home.customizable")}
            </h2>
          </div>
          <Button asChild size="lg" variant="secondary" className="w-fit rounded-sm">
            <Link to="/custom-made-kleding">{t("home.hero.cta2")}</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-2xl font-semibold sm:text-3xl">{t("home.customizable")}</h2>
        <ProductGrid products={customQuery.data?.items ?? []} loading={customQuery.isLoading} />
      </section>

      {/* Sale */}
      <section className="mx-auto max-w-[1400px] px-4 pb-8 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">{t("home.sale")}</h2>
          <Link
            to="/collection/$collectionName"
            params={{ collectionName: "sale" }}
            className="text-sm font-medium text-brand hover:underline"
          >
            {t("home.viewAll")}
          </Link>
        </div>
        <ProductGrid products={saleQuery.data?.items ?? []} loading={saleQuery.isLoading} />
      </section>
    </SiteShell>
  );
}
