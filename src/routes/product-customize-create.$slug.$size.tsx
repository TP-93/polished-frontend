import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, HelpCircle, RotateCcw, Shuffle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ColorWheel } from "@/components/customizer/ColorWheel";
import { DesignPreview } from "@/components/customizer/DesignPreview";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/lib/cart";
import { formatPrice, useI18n, useLocalized } from "@/lib/i18n";
import { getProduct } from "@/services/catalog.service";
import {
  generateColor,
  generatePalette,
  getDesign,
  initialLayerColors,
  isValidHex,
  listColorThemes,
} from "@/services/customizer.service";

export const Route = createFileRoute("/product-customize-create/$slug/$size")({
  head: ({ params }) => {
    const name = params.slug.replace(/-/g, " ");
    const title = `Customize ${name} — JORCUSTOM`;
    return {
      meta: [
        { title },
        {
          name: "description",
          content: `Colour every layer of the ${name} artwork yourself in the JORCUSTOM Customize Tool.`,
        },
        { property: "og:title", content: title },
        { property: "og:description", content: `Design your own colourway for the ${name}.` },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: CustomizePage,
});

function CustomizePage() {
  const { slug, size } = Route.useParams();
  const { t, locale } = useI18n();
  const l = useLocalized();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const productQuery = useQuery({ queryKey: ["product", slug], queryFn: () => getProduct(slug) });
  const product = productQuery.data;

  const designQuery = useQuery({
    queryKey: ["design", product?.designId],
    queryFn: () => getDesign(product!.designId!),
    enabled: Boolean(product?.designId),
  });
  const themesQuery = useQuery({ queryKey: ["colorThemes"], queryFn: listColorThemes });

  const design = designQuery.data;
  const [layerColors, setLayerColors] = useState<Record<string, string>>({});
  const [activeLayerId, setActiveLayerId] = useState<string | null>(null);
  const [hexDraft, setHexDraft] = useState("#4A4F33");

  useEffect(() => {
    if (!design) return;
    setLayerColors(initialLayerColors(design));
    setActiveLayerId(design.layers[0]?.id ?? null);
  }, [design]);

  if (!product || !design) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">{t("common.loading")}</p>
      </div>
    );
  }

  const color = product.colors[0]!;
  const activeLayer = design.layers.find((layer) => layer.id === activeLayerId) ?? null;

  function setActiveColor(hex: string) {
    if (!activeLayerId) return;
    setLayerColors((current) => ({ ...current, [activeLayerId]: hex }));
    setHexDraft(hex);
  }

  function nextLayer() {
    if (!activeLayerId) return;
    const index = design!.layers.findIndex((layer) => layer.id === activeLayerId);
    const next = design!.layers[index + 1];
    setActiveLayerId(next ? next.id : design!.layers[0]!.id);
  }

  function handleAddToCart() {
    addItem({
      productSlug: product!.slug,
      name: product!.name,
      colorId: color.id,
      colorName: color.name,
      size,
      quantity: 1,
      unitPriceCents: product!.priceCents,
      image: color.image,
      customDesign: {
        designId: design!.id,
        designName: design!.name,
        layerColors,
      },
    });
    toast.success(t("pdp.added"));
    navigate({ to: "/cart" });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-4 px-4 sm:px-6">
          <Link
            to="/product/$slug"
            params={{ slug }}
            className="label-caps inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="size-4" /> {t("cz.back")}
          </Link>
          <span className="mx-auto hidden sm:block">
            <Logo />
          </span>
          <span className="label-caps ml-auto text-brand">{t("cz.title")}</span>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_360px_320px]">
        {/* Preview */}
        <div>
          <DesignPreview
            design={design}
            layerColors={layerColors}
            productImage={color.image}
            productName={product.name}
            activeLayerId={activeLayerId}
          />
        </div>

        {/* Layers + colour sources */}
        <div className="space-y-8">
          <section>
            <div className="mb-3 flex items-center justify-between">
              <p className="label-caps text-muted-foreground">{t("cz.selectLayer")}</p>
              <span className="text-xs text-muted-foreground">
                {design.layers.length} {t("cz.layers")}
              </span>
            </div>
            <ul className="grid grid-cols-2 gap-2">
              {design.layers.map((layer) => {
                const active = layer.id === activeLayerId;
                return (
                  <li key={layer.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveLayerId(layer.id);
                        setHexDraft(layerColors[layer.id] ?? layer.defaultColor);
                      }}
                      aria-pressed={active}
                      className={`flex w-full items-center gap-3 rounded-sm border px-3 py-2 text-left transition-colors ${
                        active ? "border-foreground bg-accent" : "border-border hover:border-border-strong"
                      }`}
                    >
                      <span
                        className="size-6 shrink-0 rounded-sm border border-border-strong"
                        style={{ backgroundColor: layerColors[layer.id] ?? layer.defaultColor }}
                      />
                      <span className="truncate text-sm">{layer.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <section>
            <p className="label-caps mb-3 text-muted-foreground">{t("cz.selectSource")}</p>
            <Tabs defaultValue="generator">
              <TabsList className="grid h-auto w-full grid-cols-2 gap-1 rounded-sm bg-surface p-1 sm:grid-cols-4">
                <TabsTrigger value="generator" className="rounded-sm text-xs">
                  {t("cz.generator")}
                </TabsTrigger>
                <TabsTrigger value="themes" className="rounded-sm text-xs">
                  {t("cz.themes")}
                </TabsTrigger>
                <TabsTrigger value="wheel" className="rounded-sm text-xs">
                  {t("cz.wheel")}
                </TabsTrigger>
                <TabsTrigger value="picker" className="rounded-sm text-xs">
                  {t("cz.picker")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="generator" className="mt-4 space-y-3">
                <Button
                  variant="outline"
                  className="w-full rounded-sm"
                  onClick={() => setActiveColor(generateColor())}
                  disabled={!activeLayer}
                >
                  <Shuffle className="mr-2 size-4" /> {t("cz.generate")}
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-sm"
                  onClick={() =>
                    setLayerColors(generatePalette(design.layers.map((layer) => layer.id)))
                  }
                >
                  <Shuffle className="mr-2 size-4" /> {design.layers.length} {t("cz.layers")}
                </Button>
              </TabsContent>

              <TabsContent value="themes" className="mt-4 space-y-3">
                {(themesQuery.data ?? []).map((theme) => (
                  <div key={theme.id} className="rounded-sm border border-border p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm font-medium">{l(theme.name)}</p>
                      <button
                        type="button"
                        onClick={() =>
                          setLayerColors(
                            Object.fromEntries(
                              design.layers.map((layer, index) => [
                                layer.id,
                                theme.colors[index % theme.colors.length]!,
                              ]),
                            ),
                          )
                        }
                        className="text-xs text-brand hover:underline"
                      >
                        {t("plp.apply")}
                      </button>
                    </div>
                    <div className="flex gap-1">
                      {theme.colors.map((hex) => (
                        <button
                          key={hex}
                          type="button"
                          onClick={() => setActiveColor(hex)}
                          aria-label={hex}
                          className="h-8 flex-1 rounded-sm border border-border"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="wheel" className="mt-4">
                <ColorWheel onPick={setActiveColor} lightnessLabel={t("cz.wheel")} />
              </TabsContent>

              <TabsContent value="picker" className="mt-4 space-y-3">
                <label className="label-caps block text-muted-foreground" htmlFor="hex-input">
                  {t("cz.hex")}
                </label>
                <div className="flex gap-2">
                  <span
                    className="size-10 shrink-0 rounded-sm border border-border"
                    style={{ backgroundColor: isValidHex(hexDraft) ? hexDraft : "transparent" }}
                  />
                  <Input
                    id="hex-input"
                    value={hexDraft}
                    onChange={(event) => setHexDraft(event.target.value)}
                    className="h-10 rounded-sm font-mono"
                    placeholder="#4A4F33"
                  />
                  <Button
                    className="h-10 rounded-sm"
                    onClick={() => {
                      if (isValidHex(hexDraft)) setActiveColor(hexDraft.toUpperCase());
                      else toast.error("#RRGGBB");
                    }}
                  >
                    {t("plp.apply")}
                  </Button>
                </div>
                <input
                  type="color"
                  value={isValidHex(hexDraft) ? hexDraft : "#4A4F33"}
                  onChange={(event) => setActiveColor(event.target.value.toUpperCase())}
                  aria-label={t("cz.picker")}
                  className="h-10 w-full cursor-pointer rounded-sm border border-border bg-background"
                />
              </TabsContent>
            </Tabs>
          </section>

          <div className="flex flex-wrap gap-2">
            <Button className="rounded-sm" onClick={nextLayer}>
              {t("cz.finish")}
            </Button>
            <Button
              variant="outline"
              className="rounded-sm"
              onClick={() => setLayerColors(initialLayerColors(design))}
            >
              <RotateCcw className="mr-2 size-4" /> {t("cz.reset")}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="rounded-sm">
                  <HelpCircle className="mr-2 size-4" /> {t("cz.how")}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("cz.how")}</DialogTitle>
                  <DialogDescription>
                    {locale === "nl"
                      ? "Kies links een laag van het ontwerp en geef die een kleur via de generator, een thema, het kleurenwiel of een hexcode. Herhaal dit voor elke laag en voeg je ontwerp daarna toe aan je winkelwagen."
                      : "Pick a layer of the artwork, then give it a colour using the generator, a theme, the colour wheel or a hex code. Repeat for each layer and add your design to the cart."}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-md border border-border bg-card p-5">
            <p className="label-caps mb-4">{t("cz.summary")}</p>
            <dl className="space-y-3 text-sm">
              <div className="border-b border-border pb-3">
                <dt className="font-medium">{t("cz.product")}</dt>
                <dd className="text-muted-foreground">{product.name}</dd>
              </div>
              <div className="border-b border-border pb-3">
                <dt className="font-medium">{t("cz.productColor")}</dt>
                <dd className="text-muted-foreground">{l(color.name)}</dd>
              </div>
              <div className="border-b border-border pb-3">
                <dt className="font-medium">{t("cz.design")}</dt>
                <dd className="text-muted-foreground">{design.name}</dd>
              </div>
              <div className="border-b border-border pb-3">
                <dt className="font-medium">{t("cz.size")}</dt>
                <dd className="text-muted-foreground">{size}</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="font-medium">{t("cz.price")}</dt>
                <dd>{formatPrice(product.priceCents, locale)}</dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-1">
              {design.layers.map((layer) => (
                <span
                  key={layer.id}
                  title={`${layer.name} — ${layerColors[layer.id]}`}
                  className="size-5 rounded-sm border border-border"
                  style={{ backgroundColor: layerColors[layer.id] ?? layer.defaultColor }}
                />
              ))}
            </div>
            <Button className="mt-6 h-12 w-full rounded-sm" onClick={handleAddToCart}>
              {t("cz.addToCart")}
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
