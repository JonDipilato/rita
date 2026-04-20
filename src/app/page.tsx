import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { InquiryForm } from "@/components/inquiry-form";
import { collection, formatPrice } from "@/lib/collection";

export default function HomePage() {
  const hero = collection.find((p) => p.hero) ?? collection[0];
  const featured = collection
    .filter((p) => p.featured && p.slug !== hero.slug)
    .slice(0, 6);
  const availableCount = collection.filter((p) => p.status === "Available").length;

  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero hero={hero} availableCount={availableCount} />
        <OpeningPrayer />
        <Featured featured={featured} />
        <Acquire />
        <Devotion />
        <Rita />
        <Restoration />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

/* ----------------------------------------------------------------- */
function Hero({
  hero,
  availableCount,
}: {
  hero: (typeof collection)[number];
  availableCount: number;
}) {
  return (
    <section className="relative min-h-[100vh] bg-ink text-ivory overflow-hidden flex items-center">
      <div className="absolute inset-0 -z-10">
        <Image
          src={hero.images[0]}
          alt={hero.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_20%] opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
      </div>

      <div className="halo" />

      <div className="mx-auto max-w-7xl px-6 pt-36 pb-24 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 rise">
          <div className="flex items-center gap-3 text-gold-hi/90">
            <span className="h-px w-10 bg-gold-hi/60" />
            <span className="section-label text-gold-hi/90">
              GOSPA Statuary · Rita M. Shea, Master Restorer
            </span>
          </div>

          <h1 className="font-display mt-6 text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-[0.02em]">
            <span className="block">Sacred statuary,</span>
            <span className="block text-gild">offered for the faithful.</span>
          </h1>

          <p className="font-serif text-xl md:text-2xl text-ivory/85 mt-8 leading-relaxed max-w-2xl">
            A private collection of Madonnas, Sacred Hearts, saints, crucifixes
            and reliquaries — each one hand-restored in Rita&rsquo;s atelier and
            ready to preside over a home altar, family shrine, or parish niche.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/collection"
              className="btn-primary font-display text-[0.75rem] tracking-[0.3em] uppercase px-7 py-4 rounded-sm"
            >
              Browse the Collection
            </Link>
            <Link
              href="#acquire"
              className="btn-ghost font-display text-[0.75rem] tracking-[0.3em] uppercase px-7 py-4 rounded-sm"
            >
              How to Acquire
            </Link>
          </div>

          <dl className="mt-14 grid grid-cols-3 max-w-xl gap-x-6 gap-y-2">
            {[
              [`${availableCount}`, "Pieces available now"],
              ["U.S.", "Shipping, buyer pays S&H"],
              ["By hand", "Restored, packed, sent"],
            ].map(([k, v]) => (
              <div key={v}>
                <dt className="font-display text-gild text-3xl md:text-4xl">
                  {k}
                </dt>
                <dd className="text-ivory/60 text-xs tracking-[0.18em] uppercase font-display mt-1">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5 hidden lg:block relative">
          <Link href={`/collection/${hero.slug}`} className="block group">
            <div className="frame-gilt rounded-sm">
              <div className="arch relative aspect-[3/4] bg-ink/80 overflow-hidden">
                <Image
                  src={hero.images[0]}
                  alt={hero.title}
                  fill
                  sizes="(max-width: 1024px) 0vw, 40vw"
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                  priority
                />
              </div>
            </div>
            <div className="absolute -bottom-5 left-8 right-8 bg-ink/90 border border-gold/30 backdrop-blur px-6 py-4">
              <div className="section-label text-gold-hi/80">Featured today</div>
              <div className="font-serif italic text-ivory text-lg mt-1">
                {hero.title}
              </div>
              {hero.price != null && (
                <div className="font-display text-gild text-sm tracking-[0.2em] mt-1">
                  {formatPrice(hero.price)}
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */
function OpeningPrayer() {
  return (
    <section className="bg-parchment text-ink border-y border-gold/20">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28 text-center">
        <div className="section-label">The Motto of the House</div>
        <p className="font-serif italic text-3xl md:text-5xl leading-tight mt-6 max-w-3xl mx-auto">
          &ldquo;In order for art to be a prayer,
          <br className="hidden md:block" /> it must be of good quality.&rdquo;
        </p>
        <div className="hairline mx-auto mt-10 max-w-sm" />
        <p className="section-label mt-4">— Rita M. Shea</p>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */
function Featured({ featured }: { featured: (typeof collection)[number][] }) {
  return (
    <section id="collection" className="bg-parchment text-ink">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <div className="section-label">The Collection</div>
            <h2 className="font-display mt-5 text-4xl md:text-5xl leading-tight max-w-3xl">
              Pieces currently{" "}
              <span className="italic font-serif font-normal">on offer.</span>
            </h2>
            <p className="font-serif text-ink/70 text-lg mt-4 max-w-2xl leading-relaxed">
              A rotating selection from Rita&rsquo;s atelier. Each piece is
              one-of-one — restored, signed off, and photographed before it
              leaves the bench.
            </p>
          </div>
          <Link
            href="/collection"
            className="font-display text-[0.72rem] tracking-[0.3em] uppercase text-ink/70 hover:text-gold-deep inline-flex items-center gap-3"
          >
            See the full collection <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="hairline mt-10" />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {featured.map((p) => (
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
                      className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
                {p.price != null && (
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
                <div className="mt-3 font-display text-[0.68rem] tracking-[0.28em] uppercase text-gold-deep">
                  {p.price != null ? formatPrice(p.price) : "Inquire for price"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */
function Acquire() {
  const steps = [
    {
      k: "I",
      t: "Choose your piece",
      b: "Browse the collection. Each listing shows the devotion, era, condition, and — where Rita has priced it — the tag.",
    },
    {
      k: "II",
      t: "Inquire or reserve",
      b: "Send a short note. Reserve a piece for 48 hours while we confirm, or ask Rita to quote shipping to your U.S. address.",
    },
    {
      k: "III",
      t: "Rita replies",
      b: "Within two working days you’ll have a total — piece plus shipping & handling — and instructions to settle by your preferred method.",
    },
    {
      k: "IV",
      t: "Packed & sent",
      b: "Rita personally packs each piece. Larger statuary is crated. Tracking is provided; delivery is typically one to two weeks within the U.S.",
    },
  ];
  return (
    <section id="acquire" className="bg-ink text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="section-label text-gold-hi/80">How to Acquire</div>
            <h2 className="font-display mt-5 text-4xl md:text-5xl leading-tight">
              A quiet,
              <br />
              <span className="text-gild">personal purchase.</span>
            </h2>
            <p className="font-serif text-ivory/75 text-lg mt-8 leading-relaxed">
              These are not catalog items with a shopping cart. Each piece is
              acquired the old way — by letter, with care. Rita reads every
              inquiry herself and replies personally.
            </p>
            <div className="mt-8 rounded-sm border border-gold/30 bg-ink/50 px-5 py-4">
              <div className="section-label text-gold-hi/80">Shipping</div>
              <p className="font-serif text-ivory/80 text-sm mt-2 leading-relaxed">
                U.S. destinations only. Shipping &amp; handling is quoted on
                inquiry and paid by the buyer — itemized, honest, never marked
                up.
              </p>
              <p className="font-serif italic text-ivory/60 text-sm mt-3">
                Consultas en español bienvenidas.
              </p>
            </div>
          </div>

          <ol className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-gold/15 border border-gold/15">
            {steps.map((s) => (
              <li
                key={s.k}
                className="bg-ink p-8 md:p-10 flex flex-col gap-4"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-gild text-2xl">{s.k}</span>
                  <span className="h-px flex-1 bg-gold/30" />
                </div>
                <h3 className="font-display tracking-[0.2em] uppercase text-ivory text-sm">
                  {s.t}
                </h3>
                <p className="font-serif text-ivory/80 leading-relaxed">
                  {s.b}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */
function Devotion() {
  const devotions = [
    {
      es: "La Santísima Virgen",
      en: "The Blessed Mother",
      body:
        "Our Lady of Fátima, Lourdes, Mount Carmel, Guadalupe and the Miraculous Medal — the Madonnas most asked for in Rita’s studio.",
    },
    {
      es: "Sagrado Corazón",
      en: "Sacred Heart of Jesus",
      body:
        "The devotion of St. Margaret Mary — the pierced, burning Heart — restored in crimson mantles and classical rose palettes.",
    },
    {
      es: "Santo Cristo de Limpias",
      en: "Santo Cristo de Limpias",
      body:
        "The northern-Spanish Passion devotion: the suffering Christ whose gaze moves. A rare American example rests in the atelier.",
    },
    {
      es: "Niño Jesús de Praga",
      en: "Infant of Prague",
      body:
        "The crowned Child-King, orb in hand. A household favorite, often given for a baptism, a new home, or a place of healing.",
    },
    {
      es: "San Martín de Porres",
      en: "St. Martin de Porres",
      body:
        "The Peruvian lay-brother and patron of those who sweep, cook, and serve — a saint beloved in homes across the Americas.",
    },
    {
      es: "Relicarios",
      en: "Reliquaries & sacred objects",
      body:
        "Monstrances, pierced-brass candle sleeves, sanctuary pieces — the smaller sacred things that quietly finish an altar.",
    },
  ];

  return (
    <section id="devotions" className="bg-parchment text-ink">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="section-label">Heritage &amp; Devotion</div>
          <h2 className="font-display mt-5 text-4xl md:text-5xl leading-tight">
            For the homes where
            <br />
            <span className="italic font-serif font-normal">
              the altar still matters.
            </span>
          </h2>
          <p className="font-serif text-ink/75 text-lg mt-6 leading-relaxed">
            Rita’s collection serves the devotions carried across generations —
            in Irish, Italian, Portuguese, Filipino, and Latin American
            Catholic households alike. Every piece that leaves the atelier is
            finished the way a grandmother would recognize.
          </p>
        </div>

        <div className="hairline mt-12" />

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/30">
          {devotions.map((d) => (
            <div
              key={d.en}
              className="bg-parchment p-8 md:p-10 hover:bg-ivory transition-colors"
            >
              <div className="section-label">{d.en}</div>
              <div className="font-serif italic text-ink/55 text-sm mt-1">
                {d.es}
              </div>
              <p className="font-serif text-ink/80 mt-4 leading-relaxed">
                {d.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/collection"
            className="btn-primary font-display text-[0.72rem] tracking-[0.3em] uppercase px-7 py-4 rounded-sm inline-block"
          >
            Browse the Collection
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */
function Rita() {
  return (
    <section id="rita" className="bg-ink text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="section-label text-gold-hi/80">About Rita</div>
          <h2 className="font-display mt-5 text-4xl md:text-6xl leading-[0.98]">
            Rita M. Shea.
          </h2>
          <p className="font-serif italic text-ivory/75 text-xl mt-2">
            Master restorer of sacred statuary — eighty-seven years of age,
            still at the bench every morning.
          </p>

          <div className="hairline mt-8 max-w-sm opacity-70" />

          <div className="dropcap font-serif text-lg md:text-xl text-ivory/85 mt-8 leading-[1.75]">
            Rita began restoring sacred statues in her father’s basement
            workshop more than fifty years ago, with a Madonna her mother had
            dropped on the morning of Palm Sunday. She has not stopped since.
            Her atelier — a quiet room beneath the stairs of a New England
            home — has received Madonnas, Sacred Hearts, and saints from
            parishes, convents, and private altars across the country.
          </div>

          <p className="font-serif text-lg text-ivory/80 mt-6 leading-[1.75]">
            She refuses to hurry a piece. She refuses to spray. She refuses
            anything less than the finish a cathedral would accept.
            &ldquo;If the statue is going to be prayed to,&rdquo; she says,
            &ldquo;the people praying deserve the dignity of something
            beautiful.&rdquo;
          </p>

          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {[
              ["1938", "Born"],
              ["1974", "First commission"],
              ["Today", "Still restoring"],
            ].map(([k, v]) => (
              <div key={v} className="border-l border-gold/40 pl-4">
                <div className="font-display text-2xl text-gild">{k}</div>
                <div className="font-display text-[0.65rem] tracking-[0.28em] uppercase text-ivory/60 mt-1">
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2">
          <div className="frame-gilt">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink">
              <Image
                src="/statues/DJI_20260419121121_0019_D.webp"
                alt="From the atelier of Rita M. Shea"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-6">
                <div className="section-label text-gold-hi/80">The Atelier</div>
                <div className="font-serif italic text-ivory text-lg mt-1">
                  Where the hands still know the way.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */
function Restoration() {
  return (
    <section id="restoration" className="bg-parchment text-ink">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-28 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7">
          <div className="section-label">Restoration, by commission</div>
          <h2 className="font-display mt-5 text-4xl md:text-5xl leading-tight">
            Have a piece of your own?
            <br />
            <span className="italic font-serif font-normal">
              Rita still takes select work.
            </span>
          </h2>
          <p className="font-serif text-ink/80 text-lg mt-6 leading-relaxed">
            For parishes, religious communities, and families with a statue
            that has been in the household for generations — Rita continues to
            accept a limited number of restoration commissions each year.
            Polychromy, gilding, missing hands and crowns, crucifix corpuses,
            reliquary repair.
          </p>
          <p className="font-serif text-ink/70 text-base mt-4 leading-relaxed">
            Write with a few photographs and the piece’s story. Rita replies
            personally with an honest assessment — often within two working
            days.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#contact"
              className="btn-primary font-display text-[0.72rem] tracking-[0.3em] uppercase px-6 py-4 rounded-sm"
            >
              Request a Restoration
            </Link>
            <Link
              href="/collection"
              className="font-display text-[0.72rem] tracking-[0.3em] uppercase text-ink border border-ink/20 hover:border-gold-deep px-6 py-4 rounded-sm"
            >
              Or Browse the Collection
            </Link>
          </div>
        </div>

        <ul className="lg:col-span-5 space-y-5 border-l border-gold/30 pl-6">
          {[
            ["Assessment", "Examined for structural integrity, paint history, and age."],
            ["Conservation", "Fractures stabilized, missing elements rebuilt — reversibly."],
            ["Polychromy", "Flesh-tones and mantles in layered hand-mixed glazes."],
            ["Gilding", "22K gold leaf on crowns, halos, and embroidered hems."],
          ].map(([t, b]) => (
            <li key={t}>
              <div className="section-label">{t}</div>
              <p className="font-serif text-ink/80 mt-1 leading-relaxed">{b}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */
function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-ink text-ivory overflow-hidden"
    >
      <div className="absolute inset-0 opacity-25 -z-10">
        <Image
          src="/statues/DJI_20260419122712_0048_D.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[50%_10%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-ink" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-5">
          <div className="section-label text-gold-hi/80">Correspondence</div>
          <h2 className="font-display mt-5 text-4xl md:text-5xl leading-tight">
            Write to the
            <br />
            <span className="text-gild">atelier.</span>
          </h2>
          <p className="font-serif text-ivory/80 text-lg mt-6 leading-relaxed">
            Ask about a piece in the collection, reserve one for 48 hours, or
            begin a restoration. Rita reads every letter herself and replies
            within two working days.
          </p>
          <div className="hairline mt-10 max-w-xs opacity-70" />
          <p className="font-serif italic text-ivory/60 mt-6">
            &ldquo;A broken Virgin is not discarded. She is returned.&rdquo;
          </p>
          <p className="font-serif italic text-ivory/50 mt-4 text-sm">
            Consultas en español bienvenidas.
          </p>
        </div>

        <div className="lg:col-span-7">
          <InquiryForm intent="general" tone="dark" />
        </div>
      </div>
    </section>
  );
}
