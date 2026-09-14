/** Customizer service: designs, layers and colour sources. */
import { fetchLiveColorThemes, fetchLiveDesigns } from "@/lib/catalog.functions";

import { loadDesigns, realColorThemes, realProducts } from "./data/catalog";
import type { ColorTheme, Design } from "./types";

/** A single print design with all of its artwork layers (snapshot lookup). */
export async function getDesign(id: string): Promise<Design | null> {
  const designs = await loadDesigns();
  return designs[id] ?? null;
}

/** All print designs of a product, ordered front first (snapshot lookup). */
export async function getDesigns(ids: string[]): Promise<Design[]> {
  const designs = await loadDesigns();
  return ids
    .map((id) => designs[id])
    .filter((design): design is Design => Boolean(design))
    .sort((a, b) => Number(a.projection === "back") - Number(b.projection === "back"));
}

/**
 * Artwork for one product, straight from the live API. Colourways that carry no
 * artwork of their own in the backend fall back to the snapshot, which matches
 * artwork by theme + garment.
 */
export async function getProductDesigns(slug: string): Promise<Design[]> {
  try {
    const live = await fetchLiveDesigns({ data: { slug } });
    if (live.length) return live;
  } catch (error) {
    console.warn("[customizer] live designs unavailable, using snapshot", error);
  }
  const snapshot = realProducts.find((product) => product.slug === slug);
  return snapshot ? getDesigns(snapshot.designIds) : [];
}

export async function listColorThemes(): Promise<ColorTheme[]> {
  try {
    const themes = await fetchLiveColorThemes();
    if (themes.length) return themes;
  } catch (error) {
    console.warn("[customizer] live colour themes unavailable, using snapshot", error);
  }
  return realColorThemes;
}

/** Layers the customer is allowed to recolour. */
export function editableLayers(design: Design) {
  return design.layers.filter((layer) => layer.editableColor);
}

/** Default layer colours for a design. */
export function initialLayerColors(design: Design): Record<string, string> {
  return Object.fromEntries(design.layers.map((l) => [l.id, l.defaultColor]));
}

function hslToHex(h: number, s: number, l: number) {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

/** A single random-but-wearable colour. */
export function generateColor(): string {
  const hue = Math.floor(Math.random() * 360);
  const sat = 0.18 + Math.random() * 0.42;
  const light = 0.24 + Math.random() * 0.48;
  return hslToHex(hue, sat, light);
}

/** A harmonious set of colours for every layer of a design. */
export function generatePalette(layerIds: string[]): Record<string, string> {
  const base = Math.floor(Math.random() * 360);
  const steps = [0, 24, -24, 180, 48];
  return Object.fromEntries(
    layerIds.map((id, index) => {
      const hue = (base + (steps[index % steps.length] ?? 0) + 360) % 360;
      const light = 0.22 + ((index * 0.17) % 0.55);
      return [id, hslToHex(hue, 0.32, light)];
    }),
  );
}

export function isValidHex(value: string) {
  return /^#([0-9a-f]{6})$/i.test(value.trim());
}

/** Convert a hue/saturation position on the colour wheel into a hex value. */
export function wheelToHex(hue: number, saturation: number, lightness: number) {
  return hslToHex(hue, saturation, lightness);
}
