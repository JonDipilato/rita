import Link from "next/link";
import { Crest } from "./crest";

export function Footer() {
  return (
    <footer className="mt-28 bg-ink text-ivory">
      <div className="hairline" />
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Crest className="text-gold-hi w-10 h-10" />
            <div className="font-display tracking-[0.22em] uppercase text-[0.82rem] leading-tight">
              <div className="text-gild">GOSPA Statuary</div>
              <div className="text-ivory/70 text-[0.7rem] tracking-[0.26em]">
                Restoration Co.
              </div>
            </div>
          </div>
          <p className="font-serif text-ivory/75 text-lg leading-relaxed mt-6 italic max-w-md">
            &ldquo;In order for art to be a prayer, it must be of good
            quality.&rdquo;
          </p>
          <p className="text-ivory/50 text-xs tracking-widest mt-3 uppercase">
            — Rita M. Shea, Master Restorer
          </p>
        </div>

        <div className="md:col-span-3">
          <h4 className="section-label text-gold-hi/80">Explore</h4>
          <ul className="mt-5 space-y-3 font-serif text-ivory/80">
            <li><Link href="/collection" className="hover:text-gold-hi transition-colors">The Collection</Link></li>
            <li><Link href="/#acquire" className="hover:text-gold-hi transition-colors">How to Acquire</Link></li>
            <li><Link href="/#rita" className="hover:text-gold-hi transition-colors">About Rita</Link></li>
            <li><Link href="/#restoration" className="hover:text-gold-hi transition-colors">Restoration</Link></li>
            <li><Link href="/#contact" className="hover:text-gold-hi transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="section-label text-gold-hi/80">Shipping &amp; Inquiries</h4>
          <div className="mt-5 font-serif text-ivory/80 space-y-2 leading-relaxed">
            <p>
              U.S. shipping only. S&amp;H quoted on inquiry and paid by the
              buyer. Rita personally packs each piece.
            </p>
            <p className="italic text-ivory/60">
              Consultas en español bienvenidas.
            </p>
            <p>Contact details being finalized — please use the inquiry form.</p>
          </div>
          <div className="mt-6 flex gap-3">
            <Link
              href="/collection"
              className="btn-ghost font-display text-[0.7rem] tracking-[0.28em] uppercase px-4 py-2.5 rounded-sm"
            >
              Browse the Collection
            </Link>
          </div>
        </div>
      </div>
      <div className="hairline opacity-50" />
      <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-ivory/50 font-display tracking-[0.22em] uppercase">
        <span>© {new Date().getFullYear()} GOSPA Statuary Restoration Co.</span>
        <span>Sacred art, restored by hand.</span>
      </div>
    </footer>
  );
}
