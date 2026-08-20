import { SiteShell } from "@/components/layout/SiteShell";
import { useLocalized } from "@/lib/i18n";
import type { ContentPage } from "@/services/content";

export function ContentPageView({ page }: { page: ContentPage }) {
  const l = useLocalized();

  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{l(page.title)}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{l(page.intro)}</p>

        <div className="mt-12 space-y-10">
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
      </article>
    </SiteShell>
  );
}
