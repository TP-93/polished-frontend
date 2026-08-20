import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { Price } from "@/components/commerce/Price";
import { useI18n, useLocalized } from "@/lib/i18n";
import type { Product } from "@/services/types";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { t } = useI18n();
  const l = useLocalized();
  const [colorIndex, setColorIndex] = useState(0);
  const color = product.colors[colorIndex] ?? product.colors[0]!;

  return (
    <article className="group">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block overflow-hidden rounded-md border border-border bg-card"
      >
        <div className="relative aspect-4/5 overflow-hidden bg-surface">
          <img
            src={color.image}
            alt={`${product.name} — ${l(color.name)}`}
            width={1024}
            height={1280}
            loading={priority ? "eager" : "lazy"}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute left-2 top-2 flex flex-col items-start gap-1">
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
        </div>
      </Link>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="line-clamp-2 text-sm font-medium text-foreground hover:text-brand"
          >
            {product.name}
          </Link>
          <Price
            cents={product.priceCents}
            compareAtCents={product.compareAtCents}
            className="mt-1 text-sm"
          />
        </div>

        {product.colors.length > 1 ? (
          <div className="flex shrink-0 items-center gap-1 pt-1">
            {product.colors.map((c, index) => (
              <button
                key={c.id}
                type="button"
                onMouseEnter={() => setColorIndex(index)}
                onFocus={() => setColorIndex(index)}
                onClick={() => setColorIndex(index)}
                aria-label={l(c.name)}
                aria-pressed={index === colorIndex}
                className={`size-3.5 rounded-full border transition-[box-shadow] ${
                  index === colorIndex
                    ? "border-foreground ring-1 ring-foreground/20"
                    : "border-border-strong"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
