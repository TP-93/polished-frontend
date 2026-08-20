import { useState } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const gallery = images.length ? images : [""];

  return (
    <div className="flex flex-col gap-4 lg:flex-row-reverse">
      <div className="flex-1 overflow-hidden rounded-md border border-border bg-surface">
        <img
          src={gallery[active]}
          alt={alt}
          width={1024}
          height={1280}
          className="aspect-4/5 size-full object-cover"
        />
      </div>
      {gallery.length > 1 ? (
        <div className="hide-scrollbar flex gap-3 overflow-x-auto lg:w-20 lg:flex-col lg:overflow-visible">
          {gallery.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`${alt} — view ${index + 1}`}
              aria-pressed={index === active}
              className={`w-20 shrink-0 overflow-hidden rounded-sm border bg-surface ${
                index === active ? "border-foreground" : "border-border"
              }`}
            >
              <img
                src={image}
                alt=""
                loading="lazy"
                width={1024}
                height={1280}
                className="aspect-4/5 size-full object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
