import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";
import { sendContactMessage } from "@/services/catalog.service";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — JORCUSTOM" },
      {
        name: "description",
        content:
          "Questions about an order, a custom design or a collaboration? Reach the JORCUSTOM team.",
      },
      { property: "og:title", content: "Contact — JORCUSTOM" },
      { property: "og:description", content: "Reach the JORCUSTOM team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    for (const key of ["name", "email", "subject", "message"] as const) {
      if (!form[key].trim()) next[key] = t("checkout.required");
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) {
      next.email = t("checkout.invalidEmail");
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    try {
      await sendContactMessage(form);
      toast.success(t("contact.sent"));
      setForm({ name: "", email: "", subject: "", message: "" });
    } finally {
      setSending(false);
    }
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("contact.title")}</h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">{t("contact.body")}</p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_320px]">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="name" className="mb-2 block text-xs text-muted-foreground">
                  {t("checkout.firstName")}
                </Label>
                <Input
                  id="name"
                  value={form.name}
                  aria-invalid={Boolean(errors.name)}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="h-11 rounded-sm"
                />
                {errors.name ? (
                  <p className="mt-1 text-xs text-destructive">{errors.name}</p>
                ) : null}
              </div>
              <div>
                <Label htmlFor="email" className="mb-2 block text-xs text-muted-foreground">
                  {t("checkout.email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  aria-invalid={Boolean(errors.email)}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  className="h-11 rounded-sm"
                />
                {errors.email ? (
                  <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                ) : null}
              </div>
            </div>
            <div>
              <Label htmlFor="subject" className="mb-2 block text-xs text-muted-foreground">
                {t("contact.subject")}
              </Label>
              <Input
                id="subject"
                value={form.subject}
                aria-invalid={Boolean(errors.subject)}
                onChange={(event) => setForm({ ...form, subject: event.target.value })}
                className="h-11 rounded-sm"
              />
              {errors.subject ? (
                <p className="mt-1 text-xs text-destructive">{errors.subject}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="message" className="mb-2 block text-xs text-muted-foreground">
                {t("contact.message")}
              </Label>
              <Textarea
                id="message"
                rows={7}
                value={form.message}
                aria-invalid={Boolean(errors.message)}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                className="rounded-sm"
              />
              {errors.message ? (
                <p className="mt-1 text-xs text-destructive">{errors.message}</p>
              ) : null}
            </div>
            <Button type="submit" disabled={sending} className="h-11 rounded-sm px-6">
              {sending ? t("common.loading") : t("contact.send")}
            </Button>
          </form>

          <aside className="space-y-6 rounded-md border border-border bg-card p-6 text-sm">
            <div className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-brand" />
              <div>
                <p className="font-medium">Email</p>
                <a href="mailto:info@jorcustom.com" className="text-muted-foreground hover:underline">
                  info@jorcustom.com
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-brand" />
              <div>
                <p className="font-medium">{t("checkout.phone")}</p>
                <a href="tel:+31401234567" className="text-muted-foreground hover:underline">
                  +31 (0)40 123 45 67
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
              <div>
                <p className="font-medium">Studio</p>
                <p className="text-muted-foreground">
                  Kanaaldijk-Noord 12
                  <br />
                  5642 JA Eindhoven
                  <br />
                  Nederland
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}
