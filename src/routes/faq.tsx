import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { SiteShell } from "@/components/layout/SiteShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useI18n, useLocalized } from "@/lib/i18n";
import { listFaq } from "@/services/catalog.service";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — JORCUSTOM" },
      {
        name: "description",
        content:
          "Answers about ordering, shipping, payment, returns and the JORCUSTOM Customize Tool.",
      },
      { property: "og:title", content: "FAQ — JORCUSTOM" },
      {
        property: "og:description",
        content: "Answers about ordering, shipping, payment and returns.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { t } = useI18n();
  const l = useLocalized();
  const [query, setQuery] = useState("");
  const { data: entries = [] } = useQuery({ queryKey: ["faq"], queryFn: listFaq });

  const groups = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = needle
      ? entries.filter((entry) =>
          `${l(entry.question)} ${l(entry.answer)}`.toLowerCase().includes(needle),
        )
      : entries;
    const map = new Map<string, typeof filtered>();
    for (const entry of filtered) {
      const key = l(entry.category);
      map.set(key, [...(map.get(key) ?? []), entry]);
    }
    return [...map.entries()];
  }, [entries, query, l]);

  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("faq.title")}</h1>

        <div className="relative mt-8">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("faq.search")}
            aria-label={t("faq.search")}
            className="h-11 rounded-sm pl-9"
          />
        </div>

        {groups.length === 0 ? (
          <p className="mt-10 text-sm text-muted-foreground">{t("faq.noResults")}</p>
        ) : (
          <div className="mt-10 space-y-10">
            {groups.map(([category, categoryEntries]) => (
              <section key={category}>
                <h2 className="label-caps mb-3 text-muted-foreground">{category}</h2>
                <Accordion type="single" collapsible>
                  {categoryEntries.map((entry) => (
                    <AccordionItem key={entry.id} value={entry.id}>
                      <AccordionTrigger className="text-left text-sm">
                        {l(entry.question)}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {l(entry.answer)}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  );
}
