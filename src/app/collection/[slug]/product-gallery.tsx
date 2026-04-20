"use client";

import { useState } from "react";
import Image from "next/image";

export function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [idx, setIdx] = useState(0);
  const [zoom, setZoom] = useState(false);
  const active = images[idx];

  return (
    <div>
      <button
        type="button"
        onClick={() => setZoom(true)}
        className="block w-full cursor-zoom-in"
        aria-label={`Zoom ${title}`}
      >
        <div className="frame-gilt">
          <div className="relative aspect-[4/5] bg-ink overflow-hidden">
            <Image
              src={active}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </button>

      {images.length > 1 && (
        <div className="mt-5 grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              type="button"
              key={src}
              onClick={() => setIdx(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
              className={`relative aspect-[3/4] overflow-hidden border transition-all ${
                i === idx
                  ? "border-gold shadow-[0_0_0_2px_rgba(201,164,74,0.2)]"
                  : "border-ink/15 hover:border-gold-deep"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="15vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {zoom && (
        <div
          className="fixed inset-0 z-[70] bg-ink/95 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setZoom(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setZoom(false)}
            className="absolute top-6 right-6 text-ivory/80 hover:text-gold-hi font-display text-sm tracking-[0.25em] uppercase"
          >
            Close ✕
          </button>
          <div
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="frame-gilt">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] bg-ink">
                <Image
                  src={active}
                  alt={title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <p className="mt-4 font-serif italic text-ivory/80 text-center">
              {title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
