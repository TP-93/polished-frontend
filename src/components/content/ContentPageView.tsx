import { PageHeader, SiteShell } from "@/components/layout/SiteShell";
import { useLocalized } from "@/lib/i18n";
import type { ContentPage } from "@/services/content";

export function ContentPageView({ page }: { page: ContentPage }) {
  const l = useLocalized();

  return (
    <SiteShell>
      <PageHeader title={l(page.title)} description={l(page.intro)} />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="space-y-10">
          {page.sections.map((section) => (
            <section key={l(section.heading)}>
              <h2 className="text-lg font-semibold">{l(section.heading)}</h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph) => (
                  <p key={l(paragraph)} className="text-sm leading-relaxed text-muted-foreground">
                    {l(paragraph)}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
