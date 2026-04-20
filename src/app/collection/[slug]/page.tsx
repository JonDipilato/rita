import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { InquiryForm } from "@/components/inquiry-form";
import { ProductGallery } from "./product-gallery";
import {
  collection,
  categoriesES,
  findBySlug,
  formatPrice,
} from "@/lib/collection";

export async function generateStaticParams() {
  return collection.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const piece = findBySlug(slug);
  if (!piece) return { title: "Not found" };
  return {
    title: piece.title,
    description: piece.description,
    openGraph: {
      title: piece.title,
      description: piece.description,
      images: piece.images.slice(0, 1),
    },
  };
}

export default async function PiecePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const piece = findBySlug(slug);
  if (!piece) notFound();

  const related = collection
    .filter(
      (p) => p.slug !== piece.slug && p.category === piece.category,
    )
    .slice(0, 3);

  const available = piece.status === "Available";

  return (
    <>
      <Nav />
      <main className="flex-1 pt-32 pb-8 bg-parchment">
        <nav className="mx-auto max-w-7xl px-6 text-sm text-ink/60 font-serif flex gap-2 items-center">
          <Link href="/" className="hover:text-gold-deep">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/collection" className="hover:text-gold-deep">Collection</Link>
          <span aria-hidden>/</span>
          <span className="text-ink/80">{piece.title}</span>
        </nav>

        <article className="mx-auto max-w-7xl px-6 mt-10 grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-7">
            <ProductGallery images={piece.images} title={piece.title} />
          </div>

          <aside className="lg:col-span-5">
            <div className="section-label">{piece.category}</div>
            <div className="font-serif italic text-ink/55 text-sm mt-1">
              {categoriesES[piece.category]}
            </div>
            <h1 className="font-display mt-4 text-4xl md:text-5xl leading-[1.05]">
              {piece.title}
            </h1>
            {piece.devotion && piece.devotion !== piece.title && (
              <p className="font-serif italic text-ink/70 text-lg mt-2">
                {piece.devotion}
              </p>
            )}

            <div className="hairline my-6 max-w-sm" />

            <div className="flex items-baseline gap-4 flex-wrap">
              <div className="font-display text-3xl md:text-4xl text-gold-deep">
                {formatPrice(piece.price)}
              </div>
              <StatusPill status={piece.status} />
            </div>

            <p className="font-serif text-ink/85 text-lg leading-relaxed mt-6">
              {piece.description}
            </p>

            {piece.highlights && piece.highlights.length > 0 && (
              <ul className="mt-6 space-y-2">
                {piece.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 font-serif text-ink/80"
                  >
                    <Cross className="text-gold-deep mt-1.5 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ink/10 pt-6">
              {piece.era && (
                <Spec label="Era">{piece.era}</Spec>
              )}
              {piece.height && (
                <Spec label="Height">{piece.height}</Spec>
              )}
              {piece.medium && (
                <Spec label="Medium" wide>{piece.medium}</Spec>
              )}
              {piece.condition && (
                <Spec label="Condition" wide>{piece.condition}</Spec>
              )}
              {piece.provenance && (
                <Spec label="Provenance" wide>{piece.provenance}</Spec>
              )}
            </dl>

            <div className="mt-8 rounded-sm border border-gold/30 bg-ivory/60 px-5 py-4 text-sm font-serif text-ink/80 leading-relaxed">
              <div className="section-label mb-1">Shipping &amp; handling</div>
              U.S. destinations only. Shipping &amp; handling is quoted on inquiry
              and paid by the buyer. Rita personally packs each piece; larger
              statuary is crated.
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#inquire"
                aria-disabled={!available}
                className={`btn-primary font-display text-[0.72rem] tracking-[0.28em] uppercase px-6 py-4 rounded-sm ${
                  available ? "" : "pointer-events-none opacity-50"
                }`}
              >
                {available ? "Acquire this Piece" : piece.status}
              </a>
              {available && (
                <a
                  href="#reserve"
                  className="font-display text-[0.72rem] tracking-[0.28em] uppercase text-ink border border-ink/20 hover:border-gold-deep px-6 py-4 rounded-sm"
                >
                  Reserve for 48 Hours
                </a>
              )}
            </div>
          </aside>
        </article>

        {available && (
          <>
            <section
              id="inquire"
              className="bg-ink text-ivory mt-24"
            >
              <div className="mx-auto max-w-6xl px-6 py-20 grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5">
                  <div className="section-label text-gold-hi/80">Acquire</div>
                  <h2 className="font-display mt-5 text-4xl leading-tight">
                    Bring{" "}
                    <span className="italic font-serif font-normal">
                      {piece.title}
                    </span>{" "}
                    <span className="text-gild">home.</span>
                  </h2>
                  <p className="font-serif text-ivory/80 text-lg mt-6 leading-relaxed">
                    Fill in your details and Rita will reply personally within
                    two working days with a total that includes shipping &amp;
                    handling to your U.S. address.
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <InquiryForm
                    intent="acquire"
                    piece={piece.title}
                    pieceSlug={piece.slug}
                    tone="dark"
                  />
                </div>
              </div>
            </section>

            <section
              id="reserve"
              className="bg-parchment text-ink"
            >
              <div className="mx-auto max-w-4xl px-6 py-20">
                <div className="section-label">Reserve</div>
                <h2 className="font-display mt-5 text-3xl md:text-4xl leading-tight">
                  Hold {piece.title} for 48 hours.
                </h2>
                <p className="font-serif text-ink/75 text-lg mt-4 leading-relaxed">
                  A reservation gives you two working days to confirm. If Rita
                  hears nothing within 48 hours the piece returns to the
                  available collection — no obligation.
                </p>
                <div className="mt-8">
                  <InquiryForm
                    intent="reserve"
                    piece={piece.title}
                    pieceSlug={piece.slug}
                    tone="light"
                  />
                </div>
              </div>
            </section>
          </>
        )}

        {related.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 mt-24">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <div className="section-label">More from this devotion</div>
                <h2 className="font-display mt-3 text-3xl">
                  Related pieces
                </h2>
              </div>
              <Link
                href="/collection"
                className="font-display text-[0.7rem] tracking-[0.28em] uppercase text-ink/70 hover:text-gold-deep"
              >
                See the full collection →
              </Link>
            </div>
            <div className="hairline mt-6" />
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/collection/${r.slug}`}
                  className="group block"
                >
                  <div className="frame-gilt">
                    <div className="arch relative aspect-[3/4] overflow-hidden bg-ink">
                      <Image
                        src={r.images[0]}
                        alt={r.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[1000ms] group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="font-serif text-ink text-lg group-hover:text-gold-deep transition-colors">
                      {r.title}
                    </div>
                    <div className="font-display text-[0.68rem] tracking-[0.28em] uppercase text-gold-deep mt-1">
                      {formatPrice(r.price)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

function StatusPill({ status }: { status: "Available" | "Reserved" | "Sold" }) {
  const styles = {
    Available: "bg-ivory text-ink border-gold/40",
    Reserved: "bg-gold/20 text-ink border-gold",
    Sold: "bg-ink text-ivory border-ink",
  } as const;
  return (
    <span
      className={`inline-block font-display text-[0.62rem] tracking-[0.25em] uppercase px-3 py-1.5 border ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function Spec({
  label,
  children,
  wide,
}: {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "col-span-2" : undefined}>
      <dt className="section-label">{label}</dt>
      <dd className="font-serif text-ink/85 text-base mt-1 leading-relaxed">
        {children}
      </dd>
    </div>
  );
}

function Cross({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={`w-3 h-3 ${className}`}
      fill="currentColor"
      aria-hidden
    >
      <rect x="5" y="1" width="2" height="10" />
      <rect x="1" y="5" width="10" height="2" />
    </svg>
  );
}
