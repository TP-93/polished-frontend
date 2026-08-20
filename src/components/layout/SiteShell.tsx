import type { ReactNode } from "react";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-border bg-surface">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16">
        {eyebrow ? <p className="label-caps mb-3 text-brand">{eyebrow}</p> : null}
        <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
