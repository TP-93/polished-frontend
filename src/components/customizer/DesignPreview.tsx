import type { Design } from "@/services/types";

/**
 * Mock artwork renderer. Each design layer is drawn as its own SVG shape so a
 * colour change is visible immediately. In production these shapes come from
 * the design assets returned by the backend.
 */
const shapes = [
  "M100 12 L124 74 L188 84 L138 124 L152 188 L100 154 L48 188 L62 124 L12 84 L76 74 Z",
  "M100 40 C132 60 148 96 100 160 C52 96 68 60 100 40 Z",
  "M100 70 m-26 0 a26 26 0 1 0 52 0 a26 26 0 1 0 -52 0",
  "M56 168 h88 v14 h-88 Z",
  "M92 96 h16 v42 h-16 Z",
];

export function DesignPreview({
  design,
  layerColors,
  productImage,
  productName,
  activeLayerId,
}: {
  design: Design;
  layerColors: Record<string, string>;
  productImage: string;
  productName: string;
  activeLayerId?: string | null;
}) {
  return (
    <div className="relative aspect-4/5 w-full overflow-hidden rounded-md border border-border bg-surface">
      <img
        src={productImage}
        alt={productName}
        width={1024}
        height={1280}
        className="absolute inset-0 size-full object-cover"
      />
      <svg
        viewBox="0 0 200 200"
        role="img"
        aria-label={`${design.name} artwork preview`}
        className="absolute left-1/2 top-[38%] w-[46%] -translate-x-1/2 -translate-y-1/2"
      >
        {design.layers.map((layer, index) => (
          <path
            key={layer.id}
            d={shapes[index % shapes.length]}
            fill={layerColors[layer.id] ?? layer.defaultColor}
            opacity={activeLayerId && activeLayerId !== layer.id ? 0.75 : 1}
            className="transition-[fill,opacity] duration-300"
          />
        ))}
      </svg>
    </div>
  );
}
