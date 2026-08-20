import { useRef, useState } from "react";

import { Slider } from "@/components/ui/slider";
import { wheelToHex } from "@/services/customizer.service";

export function ColorWheel({
  onPick,
  lightnessLabel,
}: {
  onPick: (hex: string) => void;
  lightnessLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [lightness, setLightness] = useState(0.5);

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const x = event.clientX - rect.left - cx;
    const y = event.clientY - rect.top - cy;
    const radius = Math.min(cx, cy);
    const distance = Math.min(Math.hypot(x, y), radius);
    const hue = (Math.atan2(y, x) * (180 / Math.PI) + 360) % 360;
    onPick(wheelToHex(hue, distance / radius, lightness));
  }

  return (
    <div className="space-y-4">
      <div
        ref={ref}
        onClick={handleClick}
        role="application"
        aria-label="Colour wheel"
        className="relative mx-auto size-48 cursor-crosshair rounded-full border border-border"
        style={{
          background:
            "conic-gradient(from 90deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${
              lightness > 0.5 ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.9)"
            } 0%, transparent 70%)`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{ backgroundColor: `rgba(0,0,0,${Math.max(0, 0.5 - lightness) * 1.2})` }}
        />
      </div>
      <div>
        <p className="mb-2 text-xs text-muted-foreground">{lightnessLabel}</p>
        <Slider
          value={[Math.round(lightness * 100)]}
          min={10}
          max={90}
          step={1}
          onValueChange={([next]) => setLightness((next ?? 50) / 100)}
        />
      </div>
    </div>
  );
}
