import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { InquiryForm } from "@/components/inquiry-form";
import { NotifyForm } from "@/components/notify-form";
import { ProductGallery } from "./product-gallery";
import {
  collection,
  categoriesES,
  findBySlug,
  formatPrice,
} from "@/lib/collection";
import { CONTACT } from "@/lib/contact";

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
  const canonical = `/collection/${piece.slug}`;
  const keywordBase = [
    piece.title,
    piece.devotion,
    piece.category,
    categoriesES[piece.category],
    "Catholic statue for sale",
    "restored Catholic statue",
    "estatua católica",
    "estatua religiosa restaurada",
    "devotional statue",
    "religious art",
  ].filter(Boolean) as string[];
  return {
    title: piece.title,
    description: piece.description,
    alternates: { canonical },
    keywords: keywordBase,
    openGraph: {
      title: piece.title,
      description: piece.description,
      type: "website",
      url: canonical,
      images: piece.images.slice(0, 1),
    },
    twitter: {
      card: "summary_large_image",
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

  const base = "https://gospastatuary.com";
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: piece.title,
    description: piece.description,
    image: piece.images.map((src) => `${base}${src}`),
    sku: piece.slug,
    category: piece.category,
    brand: { "@type": "Brand", name: "GOSPA Statuary Restoration Co." },
    ...(piece.price != null && {
      offers: {
        "@type": "Offer",
        url: `${base}/collection/${piece.slug}`,
        priceCurrency: "USD",
        price: piece.price,
        availability:
          piece.status === "Available"
            ? "https://schema.org/InStock"
            : piece.status === "Reserved"
              ? "https://schema.org/LimitedAvailability"
              : "https://schema.org/SoldOut",
        itemCondition: "https://schema.org/RefurbishedCondition",
        seller: { "@type": "Organization", name: "GOSPA Statuary Restoration Co." },
        areaServed: "US",
      },
    }),
  };

  return (
    <>
      <Script
        id={`product-jsonld-${piece.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(productJsonLd)}
      </Script>
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
              <div className="section-label mb-1">Pickup &amp; shipping</div>
              {CONTACT.pickupNote}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#inquire"
                aria-disabled={!available}
                className={`btn-primary font-display text-[0.72rem] tracking-[0.28em] uppercase px-6 py-4 rounded-sm ${
                  available ? "" : "pointer-events-none opacity-50"
                }`}
              >
                {available ? "Write to Rita about this Piece" : piece.status}
              </a>
              {available && (
                <a
                  href={CONTACT.phoneHref}
                  className="font-display text-[0.72rem] tracking-[0.28em] uppercase text-ink border border-ink/20 hover:border-gold-deep px-6 py-4 rounded-sm inline-flex items-center gap-3"
                >
                  <span>Call Rita</span>
                  <span className="text-gold-deep tracking-[0.15em]">
                    {CONTACT.phone}
                  </span>
                </a>
              )}
            </div>

            {!available && (
              <div className="mt-8">
                <NotifyForm piece={piece.title} pieceSlug={piece.slug} tone="light" />
              </div>
            )}
          </aside>
        </article>

        {available && (
          <section id="inquire" className="bg-ink text-ivory mt-24">
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
                  Write a short note about yourself and your interest. Rita
                  replies personally within two working days and — together
                  with a family member — coordinates an atelier visit day for
                  pickup or carrier handoff.
                </p>
                <div className="mt-6 rounded-sm border border-gold/30 bg-ink/60 px-5 py-4">
                  <div className="section-label text-gold-hi/80">How it works</div>
                  <ul className="font-serif text-ivory/80 text-sm mt-3 leading-relaxed list-disc pl-5 space-y-1.5">
                    <li>Local buyers drive to the New Hampshire atelier.</li>
                    <li>Out-of-region buyers hire a white-glove shipper directly — Plycon, Ship Smart, or Craters &amp; Freighters work well.</li>
                    <li>Rita never packs or ships — the piece passes from her hands to you or your carrier at the atelier.</li>
                    <li>Payment is settled before pickup.</li>
                  </ul>
                </div>
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
