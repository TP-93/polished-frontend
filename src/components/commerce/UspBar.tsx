import { Palette, RotateCcw, Sparkles, Truck } from "lucide-react";

import { useI18n } from "@/lib/i18n";

export function UspBar() {
  const { t } = useI18n();
  const items = [
    { icon: Truck, label: t("usp.shipping") },
    { icon: RotateCcw, label: t("usp.returns") },
    { icon: Palette, label: t("usp.custom") },
    { icon: Sparkles, label: t("usp.made") },
  ];

  return (
    <ul className="grid grid-cols-2 gap-4 border-y border-border bg-surface px-4 py-6 sm:px-6 lg:grid-cols-4">
      {items.map(({ icon: Icon, label }) => (
        <li key={label} className="flex items-center gap-3 text-sm text-muted-foreground">
          <Icon className="size-4 shrink-0 text-brand" aria-hidden />
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}
