import { Link, createFileRoute } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";

import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatPrice, useI18n, useLocalized } from "@/lib/i18n";
import {
  FREE_SHIPPING_THRESHOLD_CENTS,
  cartShipping,
  cartSubtotal,
  cartTotal,
} from "@/services/checkout.service";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — JORCUSTOM" },
      {
        name: "description",
        content: "Review your JORCUSTOM cart, adjust sizes and quantities, and check out.",
      },
      { property: "og:title", content: "Cart — JORCUSTOM" },
      { property: "og:description", content: "Review your JORCUSTOM cart and check out." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { t, locale } = useI18n();
  const l = useLocalized();
  const { items, updateQuantity, removeItem } = useCart();

  const subtotal = cartSubtotal(items);
  const shipping = cartShipping(items);
  const total = cartTotal(items);
  const remaining = FREE_SHIPPING_THRESHOLD_CENTS - subtotal;

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-semibold sm:text-3xl">{t("cart.title")}</h1>

        {items.length === 0 ? (
          <div className="mt-12 rounded-md border border-border bg-card px-6 py-16 text-center">
            <ShoppingBag className="mx-auto size-8 text-muted-foreground" />
            <p className="mt-4 text-lg font-medium">{t("cart.empty")}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t("cart.emptyBody")}</p>
            <Button asChild className="mt-6 rounded-sm">
              <Link to="/collection/$collectionName" params={{ collectionName: "shop" }}>
                {t("cart.continue")}
              </Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
            <ul className="divide-y divide-border border-y border-border">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-5">
                  <Link
                    to="/product/$slug"
                    params={{ slug: item.productSlug }}
                    className="w-24 shrink-0 overflow-hidden rounded-sm border border-border"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      width={1024}
                      height={1280}
                      className="aspect-4/5 size-full object-cover"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link
                          to="/product/$slug"
                          params={{ slug: item.productSlug }}
                          className="text-sm font-medium hover:underline"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {l(item.colorName)} · {item.size}
                        </p>
                        {item.customDesign ? (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="label-caps rounded-sm bg-brand-soft px-2 py-0.5 text-brand">
                              {t("cart.custom")}
                            </span>
                            <span className="flex gap-1">
                              {Object.entries(item.customDesign.layerColors).map(([id, hex]) => (
                                <span
                                  key={id}
                                  className="size-4 rounded-sm border border-border"
                                  style={{ backgroundColor: hex }}
                                />
                              ))}
                            </span>
                          </div>
                        ) : null}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={t("cart.remove")}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="size-4" />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-sm border border-border">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label={`${t("cart.quantity")} -1`}
                          className="grid size-9 place-items-center hover:bg-accent"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label={`${t("cart.quantity")} +1`}
                          className="grid size-9 place-items-center hover:bg-accent"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-medium">
                        {formatPrice(item.unitPriceCents * item.quantity, locale)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-md border border-border bg-card p-5">
                <p className="label-caps mb-4">{t("cart.summary")}</p>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">{t("cart.subtotal")}</dt>
                    <dd>{formatPrice(subtotal, locale)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">{t("cart.shipping")}</dt>
                    <dd>{shipping === 0 ? t("cart.free") : formatPrice(shipping, locale)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3 text-base font-medium">
                    <dt>{t("cart.total")}</dt>
                    <dd>{formatPrice(total, locale)}</dd>
                  </div>
                </dl>
                {remaining > 0 ? (
                  <p className="mt-4 rounded-sm bg-surface px-3 py-2 text-xs text-muted-foreground">
                    {locale === "nl"
                      ? `Nog ${formatPrice(remaining, locale)} tot gratis verzending.`
                      : `${formatPrice(remaining, locale)} away from free shipping.`}
                  </p>
                ) : null}
                <Button asChild className="mt-6 h-12 w-full rounded-sm">
                  <Link to="/checkout">{t("cart.checkout")}</Link>
                </Button>
                <Button asChild variant="ghost" className="mt-2 w-full rounded-sm">
                  <Link to="/collection/$collectionName" params={{ collectionName: "shop" }}>
                    {t("cart.continue")}
                  </Link>
                </Button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </SiteShell>
  );
}
