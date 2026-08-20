import type { Design } from "@/services/types";

/**
 * Live artwork preview for the Customize Tool.
 *
 * The real print design is a stack of transparent PNG layers on a fixed canvas.
 * Recolourable layers are tinted with an inline SVG filter (flood colour
 * composited into the layer's alpha channel). Unlike a CSS mask this works with
 * artwork served from another origin, so colour changes are visible instantly.
 */
export function DesignPreview({
  design,
  layerColors,
  productName,
  activeLayerId,
}: {
  design: Design;
  layerColors: Record<string, string>;
  productName: string;
  activeLayerId?: string | null;
}) {
  const canvasWidth = design.canvasWidth || 1667;
  const canvasHeight = design.canvasHeight || 2000;
  const editable = design.layers.filter((layer) => layer.image && layer.editableColor);

  return (
    <div
      className="relative w-full overflow-hidden rounded-md border border-border bg-surface"
      style={{ aspectRatio: `${canvasWidth} / ${canvasHeight}` }}
      role="img"
      aria-label={`${productName} — ${design.name} artwork preview`}
    >
      {/* One tint filter per recolourable layer. */}
      <svg aria-hidden className="absolute size-0" focusable="false">
        <defs>
          {editable.map((layer) => (
            <filter
              key={layer.id}
              id={tintId(design.id, layer.id)}
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodColor={layerColors[layer.id] ?? layer.defaultColor ?? "#FFFFFF"} />
              <feComposite in2="SourceAlpha" operator="in" />
            </filter>
          ))}
        </defs>
      </svg>

      {design.layers.map((layer) => {
        if (!layer.image) return null;

        return (
          <img
            key={layer.id}
            src={layer.image}
            alt=""
            aria-hidden
            loading="eager"
            draggable={false}
            className="absolute select-none transition-opacity duration-200"
            style={{
              left: `${(layer.x / canvasWidth) * 100}%`,
              top: `${(layer.y / canvasHeight) * 100}%`,
              width: `${(layer.width / canvasWidth) * 100}%`,
              height: `${(layer.height / canvasHeight) * 100}%`,
              opacity: activeLayerId && layer.editableColor && activeLayerId !== layer.id ? 0.9 : 1,
              filter: layer.editableColor ? `url(#${tintId(design.id, layer.id)})` : undefined,
            }}
          />
        );
      })}
    </div>
  );
}

function tintId(designId: string, layerId: string) {
  return `tint-${designId}-${layerId}`;
}
