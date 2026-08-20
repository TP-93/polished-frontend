import type { Design } from "@/services/types";

/**
 * Live artwork preview for the Customize Tool.
 *
 * The real print design is a stack of transparent PNG layers on a fixed canvas.
 * Layers the customer may recolour are painted as a solid colour masked by the
 * layer artwork, so a colour change is visible immediately. Fixed layers (the
 * garment mock-up, print edges) are drawn as plain images.
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

  return (
    <div
      className="relative w-full overflow-hidden rounded-md border border-border bg-surface"
      style={{ aspectRatio: `${canvasWidth} / ${canvasHeight}` }}
      role="img"
      aria-label={`${productName} — ${design.name} artwork preview`}
    >
      {design.layers.map((layer) => {
        if (!layer.image) return null;

        const style: React.CSSProperties = {
          left: `${(layer.x / canvasWidth) * 100}%`,
          top: `${(layer.y / canvasHeight) * 100}%`,
          width: `${(layer.width / canvasWidth) * 100}%`,
          height: `${(layer.height / canvasHeight) * 100}%`,
          opacity: activeLayerId && activeLayerId !== layer.id ? 0.85 : 1,
        };

        if (!layer.editableColor) {
          return (
            <img
              key={layer.id}
              src={layer.image}
              alt=""
              aria-hidden
              loading="eager"
              className="absolute transition-opacity duration-200"
              style={style}
            />
          );
        }

        const color = layerColors[layer.id] ?? layer.defaultColor;
        return (
          <div
            key={layer.id}
            aria-hidden
            className="absolute transition-[background-color,opacity] duration-200"
            style={{
              ...style,
              backgroundColor: color,
              maskImage: `url("${layer.image}")`,
              WebkitMaskImage: `url("${layer.image}")`,
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
        );
      })}
    </div>
  );
}
