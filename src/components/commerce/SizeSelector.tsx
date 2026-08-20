import type { ProductSize } from "@/services/types";

export function SizeSelector({
  sizes,
  value,
  onChange,
  soldOutLabel,
}: {
  sizes: ProductSize[];
  value: string | null;
  onChange: (size: string) => void;
  soldOutLabel: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => {
        const active = value === size.label;
        return (
          <button
            key={size.label}
            type="button"
            disabled={!size.inStock}
            onClick={() => onChange(size.label)}
            aria-pressed={active}
            title={size.inStock ? size.label : `${size.label} — ${soldOutLabel}`}
            className={`h-11 min-w-14 rounded-sm border px-3 text-sm font-medium transition-colors ${
              active
                ? "border-foreground bg-primary text-primary-foreground"
                : "border-border hover:border-border-strong"
            } ${!size.inStock ? "cursor-not-allowed text-muted-foreground/60 line-through" : ""}`}
          >
            {size.label}
          </button>
        );
      })}
    </div>
  );
}
