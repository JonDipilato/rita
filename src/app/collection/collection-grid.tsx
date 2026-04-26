"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import {
  categories,
  categoriesES,
  formatPrice,
  type Category,
  type Piece,
} from "@/lib/collection";

type Sort = "featured" | "price-asc" | "price-desc";

export function CollectionGrid({ pieces }: { pieces: Piece[] }) {
  const [filter, setFilter] = useState<Category | "All">("All");
  const [sort, setSort] = useState<Sort>("featured");
  const [availableOnly, setAvailableOnly] = useState(true);

  const shown = useMemo(() => {
    let list = pieces.slice();
    if (filter !== "All") list = list.filter((p) => p.category === filter);
    if (availableOnly) list = list.filter((p) => p.status === "Available");
    if (sort === "price-asc") {
      list.sort((a, b) => (a.price ?? 1e9) - (b.price ?? 1e9));
    } else if (sort === "price-desc") {
      list.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    } else {
      list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
    return list;
  }, [pieces, filter, sort, availableOnly]);

  return (
    <section className="mx-auto max-w-7xl px-6 mt-14">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {(["All", ...categories] as const).map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "font-display text-[0.64rem] tracking-[0.22em] uppercase px-4 py-2.5 rounded-sm border transition-all",
                  active
                    ? "bg-ink text-ivory border-ink shadow-sm"
                    : "bg-transparent text-ink/70 border-ink/20 hover:border-gold-deep hover:text-ink",
                )}
              >
                <span className="block">{c}</span>
                {c !== "All" && (
                  <span className="block text-[0.6rem] italic tracking-normal opacity-70 font-serif mt-0.5">
                    {categoriesES[c]}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-ink/10 py-4">
          <label className="flex items-center gap-2 font-display text-[0.66rem] tracking-[0.22em] uppercase text-ink/70 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
              className="accent-gold-deep"
            />
            Available only
          </label>
          <div className="flex items-center gap-3">
            <span className="section-label">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="font-serif text-sm bg-transparent border border-ink/20 rounded-sm px-3 py-2 focus:outline-none focus:border-gold-deep"
            >
              <option value="featured">Featured first</option>
              <option value="price-asc">Price — low to high</option>
              <option value="price-desc">Price — high to low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
        {shown.map((p) => (
          <Link
            key={p.slug}
            href={`/collection/${p.slug}`}
            className="group block"
          >
            <div className="relative">
              <div className="frame-gilt">
                <div className="arch relative aspect-[3/4] overflow-hidden bg-ink">
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                  />
                </div>
              </div>

              {p.status !== "Available" && (
                <span className="absolute top-4 left-4 z-10 bg-ink text-ivory font-display text-[0.6rem] tracking-[0.25em] uppercase px-3 py-1.5 border border-gold/40">
                  {p.status}
                </span>
              )}
              {p.price != null && p.status === "Available" && (
                <span className="absolute top-4 right-4 z-10 bg-ivory/95 text-ink font-display text-xs tracking-wider px-3 py-1.5 border border-gold/40 shadow">
                  {formatPrice(p.price)}
                </span>
              )}
            </div>

            <div className="mt-5 text-center">
              <div className="section-label">{p.category}</div>
              <h3 className="font-serif text-ink text-xl mt-2 group-hover:text-gold-deep transition-colors">
                {p.title}
              </h3>
              {p.era && (
                <div className="font-serif italic text-ink/60 text-sm mt-1">
                  {p.era}
                </div>
              )}
              <div className="mt-3 font-display text-[0.68rem] tracking-[0.28em] uppercase text-gold-deep">
                {p.price != null ? formatPrice(p.price) : "Inquire for price"}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="text-center font-serif italic text-ink/60 mt-20">
          No pieces match these filters. Adjust the filters or view the full
          collection.
        </p>
      )}
    </section>
  );
}
