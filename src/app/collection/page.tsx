import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CollectionGrid } from "./collection-grid";
import { collection } from "@/lib/collection";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Sacred statuary and religious art, restored and offered for sale by Rita M. Shea. Virgin Mary, Sacred Heart, the Infant of Prague, saints, reliquaries and more — all hand-restored, U.S. shipping.",
};

export default function CollectionPage() {
  const count = collection.filter((p) => p.status === "Available").length;

  return (
    <>
      <Nav />
      <main className="flex-1 pt-36 pb-8 bg-parchment">
        <header className="mx-auto max-w-7xl px-6 text-center">
          <div className="section-label">The Collection</div>
          <h1 className="font-display mt-5 text-5xl md:text-6xl leading-[0.98]">
            Sacred art,
            <br />
            <span className="text-gild italic font-serif">offered for acquisition.</span>
          </h1>
          <p className="font-serif text-ink/75 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
            Each piece below is from Rita&apos;s studio — personally restored and
            ready for a home, parish, or private chapel. {count} pieces currently
            available. Shipping &amp; handling within the continental U.S. is paid
            by the buyer and quoted on inquiry.
          </p>
          <p className="font-serif italic text-ink/50 text-base mt-3">
            Consultas en español bienvenidas.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="#grid"
              className="btn-primary font-display text-[0.7rem] tracking-[0.28em] uppercase px-6 py-3 rounded-sm"
            >
              Browse the Collection
            </Link>
            <Link
              href="/#acquire"
              className="font-display text-[0.7rem] tracking-[0.28em] uppercase text-ink/70 hover:text-gold-deep px-6 py-3 rounded-sm border border-ink/15"
            >
              How to Acquire
            </Link>
          </div>
          <div className="hairline mx-auto mt-12 max-w-md" />
        </header>

        <div id="grid">
          <CollectionGrid pieces={collection} />
        </div>
      </main>
      <Footer />
    </>
  );
}
