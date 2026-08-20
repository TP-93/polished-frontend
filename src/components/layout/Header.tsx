import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

import { AppLink } from "@/components/layout/AppLink";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { useCart } from "@/lib/cart";
import { useI18n, useLocalized } from "@/lib/i18n";
import heroCampaign from "@/assets/hero-campaign.jpg";
import {
  collectionLinks,
  saleLinks,
  serviceLinks,
  shopCategoryLinks,
} from "@/services/navigation";

type PanelKey = "shop" | "sale" | "service" | null;

export function Header() {
  const { t } = useI18n();
  const l = useLocalized();
  const { count } = useCart();
  const [panel, setPanel] = useState<PanelKey>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const columns =
    panel === "shop"
      ? [
          { title: t("nav.collections"), links: collectionLinks },
          { title: t("nav.categories"), links: shopCategoryLinks.slice(0, 6) },
          { title: "\u00a0", links: shopCategoryLinks.slice(6) },
        ]
      : panel === "sale"
        ? [{ title: t("nav.sale"), links: saleLinks }]
        : panel === "service"
          ? [{ title: t("nav.service"), links: serviceLinks }]
          : [];

  return (
    <header
      className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm"
      onMouseLeave={() => setPanel(null)}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 sm:px-6">
        <MobileNav />
        <Logo />

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {(
            [
              ["shop", t("nav.shop")],
              ["sale", t("nav.sale")],
              ["service", t("nav.service")],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onMouseEnter={() => setPanel(key)}
              onClick={() => setPanel(panel === key ? null : key)}
              aria-expanded={panel === key}
              className={`label-caps rounded-sm px-3 py-2 transition-colors ${
                panel === key ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
          <Link
            to="/ons-verhaal"
            onMouseEnter={() => setPanel(null)}
            className="label-caps rounded-sm px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("nav.story")}
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <Link
            to="/cart"
            aria-label={t("nav.cart")}
            className="relative inline-flex size-9 items-center justify-center rounded-sm text-foreground transition-colors hover:bg-accent"
          >
            <ShoppingBag className="size-5" />
            {mounted && count > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-4 justify-center rounded-full bg-brand px-1 text-[10px] font-semibold leading-4 text-brand-foreground">
                {count}
              </span>
            ) : null}
          </Link>
        </div>
      </div>

      {panel ? (
        <div className="hidden border-t border-border bg-card lg:block">
          <div className="mx-auto grid max-w-[1400px] grid-cols-4 gap-8 px-6 py-8">
            {columns.map((column, i) => (
              <div key={`${column.title}-${i}`}>
                <p className="label-caps mb-4 text-muted-foreground">{column.title}</p>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.to}>
                      <AppLink
                        to={link.to}
                        onClick={() => setPanel(null)}
                        className="text-sm text-foreground transition-colors hover:text-brand"
                      >
                        {l(link.label)}
                      </AppLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {panel === "shop" ? (
              <Link
                to="/collection/$collectionName"
                params={{ collectionName: "fallwinter25-drop-two" }}
                onClick={() => setPanel(null)}
                className="group relative col-start-4 overflow-hidden rounded-md border border-border"
              >
                <img
                  src={heroCampaign}
                  alt="FallWinter'25 Drop Two campaign"
                  loading="lazy"
                  width={1920}
                  height={1088}
                  className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="label-caps absolute bottom-3 left-3 rounded-sm bg-background px-2 py-1">
                  Drop Two
                </span>
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
