import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { formatPrice, useI18n } from "@/lib/i18n";

export interface FilterState {
  sizes: string[];
  colors: string[];
  maxPriceCents: number;
  customizableOnly: boolean;
}

export interface FilterFacets {
  sizes: string[];
  colors: { id: string; hex: string }[];
  maxPriceCents: number;
}

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function FilterFields({
  facets,
  value,
  onChange,
}: {
  facets: FilterFacets;
  value: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const { t, locale } = useI18n();

  return (
    <div className="space-y-8">
      <section>
        <p className="label-caps mb-3 text-muted-foreground">{t("plp.filter.size")}</p>
        <div className="flex flex-wrap gap-2">
          {facets.sizes.map((size) => {
            const active = value.sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => onChange({ ...value, sizes: toggle(value.sizes, size) })}
                aria-pressed={active}
                className={`h-9 min-w-9 rounded-sm border px-2 text-xs font-medium transition-colors ${
                  active
                    ? "border-foreground bg-primary text-primary-foreground"
                    : "border-border hover:border-border-strong"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <p className="label-caps mb-3 text-muted-foreground">{t("plp.filter.color")}</p>
        <div className="flex flex-wrap gap-2">
          {facets.colors.map((color) => {
            const active = value.colors.includes(color.id);
            return (
              <button
                key={color.id}
                type="button"
                onClick={() => onChange({ ...value, colors: toggle(value.colors, color.id) })}
                aria-pressed={active}
                aria-label={color.id}
                className={`size-8 rounded-full border-2 transition-colors ${
                  active ? "border-foreground" : "border-border"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            );
          })}
        </div>
      </section>

      <section>
        <p className="label-caps mb-3 text-muted-foreground">{t("plp.filter.price")}</p>
        <Slider
          value={[value.maxPriceCents]}
          min={1000}
          max={facets.maxPriceCents}
          step={500}
          onValueChange={([next]) => onChange({ ...value, maxPriceCents: next ?? facets.maxPriceCents })}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          ≤ {formatPrice(value.maxPriceCents, locale)}
        </p>
      </section>

      <section className="flex items-center gap-2">
        <Checkbox
          id="customizable-only"
          checked={value.customizableOnly}
          onCheckedChange={(checked) =>
            onChange({ ...value, customizableOnly: checked === true })
          }
        />
        <Label htmlFor="customizable-only" className="text-sm font-normal">
          {t("plp.filter.customizable")}
        </Label>
      </section>
    </div>
  );
}

export function FilterPanel({
  facets,
  value,
  onChange,
  onClear,
}: {
  facets: FilterFacets;
  value: FilterState;
  onChange: (next: FilterState) => void;
  onClear: () => void;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const activeCount =
    value.sizes.length +
    value.colors.length +
    (value.customizableOnly ? 1 : 0) +
    (value.maxPriceCents < facets.maxPriceCents ? 1 : 0);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="mb-6 flex items-center justify-between">
          <p className="label-caps">{t("plp.refine")}</p>
          {activeCount > 0 ? (
            <button
              type="button"
              onClick={onClear}
              className="text-xs text-muted-foreground underline hover:text-foreground"
            >
              {t("plp.clear")}
            </button>
          ) : null}
        </div>
        <FilterFields facets={facets} value={value} onChange={onChange} />
      </aside>

      {/* Mobile drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="rounded-sm lg:hidden">
            <SlidersHorizontal className="mr-2 size-4" />
            {t("plp.refine")}
            {activeCount > 0 ? ` (${activeCount})` : ""}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="label-caps">{t("plp.refine")}</SheetTitle>
          </SheetHeader>
          <div className="px-4 pb-4">
            <FilterFields facets={facets} value={value} onChange={onChange} />
            <div className="mt-8 flex gap-2">
              <Button variant="outline" className="flex-1 rounded-sm" onClick={onClear}>
                {t("plp.clear")}
              </Button>
              <Button className="flex-1 rounded-sm" onClick={() => setOpen(false)}>
                {t("plp.apply")}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
