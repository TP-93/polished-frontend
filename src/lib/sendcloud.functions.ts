import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export interface ServicePoint {
  id: string;
  name: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  distance: number | null;
  carrier: string;
  openToday: string;
  lat: number | null;
  lng: number | null;
}

// Looks up nearby DPD parcel shops via the Sendcloud Service Points API.
export const getServicePoints = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        country: z.string().length(2),
        postalCode: z.string().min(3).max(12),
        houseNumber: z.string().max(12).optional(),
        carrier: z.string().max(20).default("dpd"),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<{ points: ServicePoint[]; error?: string }> => {
    const pub = process.env["SENDCLOUD_PUBLIC_KEY"];
    const secret = process.env["SENDCLOUD_SECRET_KEY"];
    if (!pub || !secret) return { points: [], error: "not_configured" };

    const params = new URLSearchParams({
      country: data.country.toUpperCase(),
      address: `${data.postalCode} ${data.houseNumber ?? ""}`.trim(),
      carrier: data.carrier,
      radius: "10000",
    });
    const res = await fetch(`https://servicepoints.sendcloud.sc/api/v2/service-points/?${params}`, {
      headers: { authorization: `Basic ${btoa(`${pub}:${secret}`)}`, accept: "application/json" },
    });
    if (!res.ok) {
      console.error("Sendcloud service points failed", res.status, await res.text());
      return { points: [], error: "upstream" };
    }
    const json = (await res.json()) as any[];
    const day = (new Date().getDay() + 6) % 7; // Sendcloud: 0 = Monday
    const points = (Array.isArray(json) ? json : []).slice(0, 8).map((p) => {
      const hours = p?.formatted_opening_times?.[String(day)] ?? [];
      return {
        id: String(p.id),
        name: String(p.name ?? ""),
        street: String(p.street ?? ""),
        houseNumber: String(p.house_number ?? ""),
        postalCode: String(p.postal_code ?? ""),
        city: String(p.city ?? ""),
        distance: typeof p.distance === "number" ? p.distance : null,
        carrier: String(p.carrier ?? data.carrier),
        openToday: Array.isArray(hours) ? hours.join(", ") : "",
        lat: Number(p.latitude) || null,
        lng: Number(p.longitude) || null,
      };
    });
    return { points };
  });
