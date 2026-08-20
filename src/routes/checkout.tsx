import { Link, createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";

import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/lib/cart";
import { formatPrice, useI18n, useLocalized } from "@/lib/i18n";
import {
  cartShipping,
  cartSubtotal,
  cartTotal,
  paymentMethods,
  placeOrder,
} from "@/services/checkout.service";
import type { OrderConfirmation, OrderDraft } from "@/services/types";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — JORCUSTOM" },
      {
        name: "description",
        content: "Complete your JORCUSTOM order: contact details, delivery address and payment.",
      },
      { property: "og:title", content: "Checkout — JORCUSTOM" },
      { property: "og:description", content: "Complete your JORCUSTOM order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const emptyDraft: OrderDraft = {
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  street: "",
  postal: "",
  city: "",
  country: "Nederland",
  paymentMethod: "ideal",
};

type Step = 1 | 2 | 3;

function CheckoutPage() {
  const { t, locale } = useI18n();
  const l = useLocalized();
  const { items, clear } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [draft, setDraft] = useState<OrderDraft>(emptyDraft);
  const [errors, setErrors] = useState<Partial<Record<keyof OrderDraft, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState<OrderConfirmation | null>(null);

  const subtotal = cartSubtotal(items);
  const shipping = cartShipping(items);
  const total = cartTotal(items);

  function set<K extends keyof OrderDraft>(key: K, value: OrderDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function validate(fields: (keyof OrderDraft)[]) {
    const next: Partial<Record<keyof OrderDraft, string>> = {};
    for (const field of fields) {
      if (!draft[field]?.trim()) next[field] = t("checkout.required");
    }
    if (fields.includes("email") && draft.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(draft.email)) {
      next.email = t("checkout.invalidEmail");
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit() {
    setSubmitting(true);
    try {
      const confirmation = await placeOrder(draft, items);
      setOrder(confirmation);
      clear();
    } finally {
      setSubmitting(false);
    }
  }

  if (order) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-brand-soft text-brand">
            <Check className="size-6" />
          </span>
          <h1 className="mt-6 text-2xl font-semibold">
            {locale === "nl" ? "Bedankt voor je bestelling" : "Thanks for your order"}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {locale === "nl" ? "Bestelnummer" : "Order number"}{" "}
            <span className="font-mono text-foreground">{order.orderNumber}</span> ·{" "}
            {formatPrice(order.totalCents, locale)}
          </p>
          <Button asChild className="mt-8 rounded-sm">
            <Link to="/collection/$collectionName" params={{ collectionName: "shop" }}>
              {t("cart.continue")}
            </Link>
          </Button>
        </div>
      </SiteShell>
    );
  }

  if (items.length === 0) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
          <h1 className="text-2xl font-semibold">{t("cart.empty")}</h1>
          <Button asChild className="mt-6 rounded-sm">
            <Link to="/collection/$collectionName" params={{ collectionName: "shop" }}>
              {t("cart.continue")}
            </Link>
          </Button>
        </div>
      </SiteShell>
    );
  }

  const steps: { id: Step; label: string }[] = [
    { id: 1, label: t("checkout.contact") },
    { id: 2, label: t("checkout.delivery") },
    { id: 3, label: t("checkout.payment") },
  ];

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-semibold sm:text-3xl">{t("checkout.title")}</h1>

        <ol className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {steps.map((entry) => (
            <li
              key={entry.id}
              aria-current={entry.id === step ? "step" : undefined}
              className={`flex items-center gap-2 ${
                entry.id === step ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <span
                className={`grid size-6 place-items-center rounded-full border text-xs ${
                  entry.id < step
                    ? "border-brand bg-brand text-brand-foreground"
                    : entry.id === step
                      ? "border-foreground"
                      : "border-border"
                }`}
              >
                {entry.id < step ? <Check className="size-3" /> : entry.id}
              </span>
              {entry.label}
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            {step === 1 ? (
              <section className="space-y-4 rounded-md border border-border bg-card p-5">
                <h2 className="text-sm font-semibold">{t("checkout.contact")}</h2>
                <Field
                  id="email"
                  label={t("checkout.email")}
                  value={draft.email}
                  error={errors.email}
                  type="email"
                  onChange={(value) => set("email", value)}
                />
                <Field
                  id="phone"
                  label={t("checkout.phone")}
                  value={draft.phone}
                  error={errors.phone}
                  onChange={(value) => set("phone", value)}
                />
                <Button
                  className="h-11 rounded-sm"
                  onClick={() => validate(["email", "phone"]) && setStep(2)}
                >
                  {t("checkout.next")}
                </Button>
              </section>
            ) : null}

            {step === 2 ? (
              <section className="space-y-4 rounded-md border border-border bg-card p-5">
                <h2 className="text-sm font-semibold">{t("checkout.delivery")}</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    id="firstName"
                    label={t("checkout.firstName")}
                    value={draft.firstName}
                    error={errors.firstName}
                    onChange={(value) => set("firstName", value)}
                  />
                  <Field
                    id="lastName"
                    label={t("checkout.lastName")}
                    value={draft.lastName}
                    error={errors.lastName}
                    onChange={(value) => set("lastName", value)}
                  />
                </div>
                <Field
                  id="street"
                  label={t("checkout.street")}
                  value={draft.street}
                  error={errors.street}
                  onChange={(value) => set("street", value)}
                />
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field
                    id="postal"
                    label={t("checkout.postal")}
                    value={draft.postal}
                    error={errors.postal}
                    onChange={(value) => set("postal", value)}
                  />
                  <Field
                    id="city"
                    label={t("checkout.city")}
                    value={draft.city}
                    error={errors.city}
                    onChange={(value) => set("city", value)}
                  />
                  <Field
                    id="country"
                    label={t("checkout.country")}
                    value={draft.country}
                    error={errors.country}
                    onChange={(value) => set("country", value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="h-11 rounded-sm" onClick={() => setStep(1)}>
                    {t("checkout.back")}
                  </Button>
                  <Button
                    className="h-11 rounded-sm"
                    onClick={() =>
                      validate(["firstName", "lastName", "street", "postal", "city", "country"]) &&
                      setStep(3)
                    }
                  >
                    {t("checkout.next")}
                  </Button>
                </div>
              </section>
            ) : null}

            {step === 3 ? (
              <section className="space-y-5 rounded-md border border-border bg-card p-5">
                <h2 className="text-sm font-semibold">{t("checkout.payment")}</h2>
                <RadioGroup
                  value={draft.paymentMethod}
                  onValueChange={(value) => set("paymentMethod", value)}
                  className="gap-2"
                >
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      htmlFor={`pm-${method.id}`}
                      className="flex cursor-pointer items-center gap-3 rounded-sm border border-border px-4 py-3 text-sm has-[button[data-state=checked]]:border-foreground"
                    >
                      <RadioGroupItem id={`pm-${method.id}`} value={method.id} />
                      {method.label}
                    </label>
                  ))}
                </RadioGroup>

                <div className="rounded-sm bg-surface p-4 text-sm">
                  <p className="label-caps mb-2 text-muted-foreground">{t("checkout.review")}</p>
                  <p>
                    {draft.firstName} {draft.lastName}
                  </p>
                  <p className="text-muted-foreground">
                    {draft.street}, {draft.postal} {draft.city}, {draft.country}
                  </p>
                  <p className="text-muted-foreground">{draft.email}</p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="h-11 rounded-sm" onClick={() => setStep(2)}>
                    {t("checkout.back")}
                  </Button>
                  <Button className="h-11 rounded-sm" disabled={submitting} onClick={submit}>
                    {submitting ? t("common.loading") : t("checkout.pay")}
                  </Button>
                </div>
              </section>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-md border border-border bg-card p-5">
              <p className="label-caps mb-4">{t("cart.summary")}</p>
              <ul className="space-y-3 border-b border-border pb-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3 text-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      width={1024}
                      height={1280}
                      className="aspect-4/5 w-12 rounded-sm border border-border object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {l(item.colorName)} · {item.size} · {item.quantity}×
                      </p>
                    </div>
                    <p>{formatPrice(item.unitPriceCents * item.quantity, locale)}</p>
                  </li>
                ))}
              </ul>
              <dl className="mt-4 space-y-3 text-sm">
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
            </div>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}

function Field({
  id,
  label,
  value,
  error,
  type = "text",
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-2 block text-xs text-muted-foreground">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-sm"
      />
      {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
