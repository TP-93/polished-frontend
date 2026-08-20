import { useState } from "react";

import { AppLink } from "@/components/layout/AppLink";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n, useLocalized } from "@/lib/i18n";
import { subscribeToNewsletter } from "@/services/catalog.service";
import { companyLinks, legalLinks, serviceLinks } from "@/services/navigation";

export function Footer() {
  const { t } = useI18n();
  const l = useLocalized();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setState("loading");
    const result = await subscribeToNewsletter(email);
    setState(result.ok ? "done" : "error");
    if (result.ok) setEmail("");
  }

  const columns = [
    { title: t("footer.service"), links: serviceLinks },
    { title: t("footer.company"), links: companyLinks },
    { title: t("footer.general"), links: legalLinks },
  ];

  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <h2 className="mt-6 text-lg font-semibold">{t("footer.newsletter")}</h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {t("footer.newsletterBody")}
            </p>
            <form onSubmit={onSubmit} className="mt-4 flex max-w-sm gap-2">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.emailPlaceholder")}
                aria-label={t("footer.emailPlaceholder")}
                className="h-10 rounded-sm bg-background"
              />
              <Button type="submit" className="h-10 rounded-sm" disabled={state === "loading"}>
                {t("footer.subscribe")}
              </Button>
            </form>
            {state === "done" ? (
              <p className="mt-2 text-sm text-brand">{t("footer.subscribed")}</p>
            ) : null}
            {state === "error" ? (
              <p className="mt-2 text-sm text-destructive">{t("checkout.invalidEmail")}</p>
            ) : null}
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="label-caps mb-4 text-muted-foreground">{column.title}</p>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <AppLink
                      to={link.to}
                      className="text-sm text-foreground transition-colors hover:text-brand"
                    >
                      {l(link.label)}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} JORCUSTOM. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4">
            <span>9.2 / 10 — 1.842 reviews</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
