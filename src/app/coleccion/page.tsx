import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import {
  collection,
  categoriesES,
  formatPrice,
} from "@/lib/collection";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "La Colección — Estatuas Católicas Restauradas",
  description:
    "Colección privada de estatuas católicas restauradas a mano por Rita M. Shea: la Santísima Virgen, el Sagrado Corazón, Santos, Niño Jesús, crucifijos y relicarios. Envíos dentro de los EE. UU. Consultas en español bienvenidas.",
  alternates: {
    canonical: "/coleccion",
    languages: {
      en: "/collection",
      es: "/coleccion",
    },
  },
  keywords: [
    "estatuas católicas",
    "estatuas religiosas restauradas",
    "imágenes sagradas",
    "Virgen de Fátima",
    "Virgen de Lourdes",
    "Virgen del Carmen",
    "Sagrado Corazón de Jesús",
    "Santo Cristo de Limpias",
    "Niño Jesús de Praga",
    "San Martín de Porres",
    "relicarios católicos",
    "arte sacro restaurado",
  ],
  openGraph: {
    title: "La Colección · GOSPA Statuary",
    description:
      "Estatuas católicas restauradas a mano por Rita M. Shea. Envíos dentro de los EE. UU. Consultas en español bienvenidas.",
    type: "website",
    images: ["/statues/DJI_20260419121121_0019_D.webp"],
  },
};

export default function ColeccionPage() {
  const available = collection.filter((p) => p.status === "Available");

  return (
    <>
      <Nav />
      <main className="flex-1 bg-parchment text-ink">
        <section className="pt-36 pb-16 border-b border-gold/20">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <div className="section-label">La Colección</div>
            <h1 className="font-display mt-5 text-5xl md:text-6xl leading-tight">
              Estatuas sagradas,
              <br />
              <span className="italic font-serif font-normal text-gold-deep">
                restauradas a mano.
              </span>
            </h1>
            <p className="font-serif text-ink/75 text-lg md:text-xl mt-8 leading-relaxed max-w-3xl mx-auto">
              Una colección privada de imágenes de la Santísima Virgen, el
              Sagrado Corazón, los santos, el Niño Jesús, crucifijos y
              relicarios — cada pieza restaurada personalmente por Rita M.
              Shea, maestra restauradora con más de cincuenta años al
              servicio del arte sacro.
            </p>

            <div className="hairline mx-auto mt-10 max-w-md" />

            <p className="font-serif italic text-ink/70 text-lg mt-8 max-w-2xl mx-auto leading-relaxed">
              &ldquo;Para que el arte sea oración, debe ser de buena
              calidad.&rdquo;
            </p>
            <p className="section-label mt-3">— Rita M. Shea</p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="grid md:grid-cols-3 gap-px bg-gold/25 border border-gold/25">
            {[
              {
                t: "Retiro en Nuevo Hampshire",
                b: "El retiro se hace en el taller de Rita en Nuevo Hampshire, con cita previa. Un familiar coordina el día para que Rita nunca reciba visitantes sola.",
              },
              {
                t: "Envío — lo coordina usted",
                b: "Si usted está fuera de Nueva Inglaterra, contrate un servicio de transporte especializado de su elección (recomendamos Plycon, Ship Smart o Craters & Freighters). Ellos se encargan del empaque y envío; Rita entrega la pieza en el taller.",
              },
              {
                t: "Consulta en español",
                b: "Escriba en español o en inglés, como prefiera. Rita contesta personalmente dentro de dos días hábiles.",
              },
            ].map((c) => (
              <div key={c.t} className="bg-parchment p-6 md:p-8">
                <div className="section-label">{c.t}</div>
                <p className="font-serif text-ink/80 mt-3 leading-relaxed text-sm">
                  {c.b}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="section-label">Piezas disponibles</div>
              <h2 className="font-display mt-3 text-3xl md:text-4xl">
                {available.length} piezas en el taller
              </h2>
            </div>
            <Link
              href="/collection"
              className="font-display text-[0.7rem] tracking-[0.28em] uppercase text-ink/70 hover:text-gold-deep"
            >
              View in English →
            </Link>
          </div>
          <div className="hairline mt-6" />

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
            {available.map((p) => (
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
                  {p.price != null && (
                    <span className="absolute top-4 right-4 z-10 bg-ivory/95 text-ink font-display text-xs tracking-wider px-3 py-1.5 border border-gold/40 shadow">
                      {formatPrice(p.price)}
                    </span>
                  )}
                </div>
                <div className="mt-5 text-center">
                  <div className="section-label">
                    {categoriesES[p.category]}
                  </div>
                  <div className="font-serif italic text-ink/55 text-xs mt-1">
                    {p.category}
                  </div>
                  <h3 className="font-serif text-ink text-xl mt-3 group-hover:text-gold-deep transition-colors">
                    {p.title}
                  </h3>
                  <div className="mt-2 font-display text-[0.66rem] tracking-[0.28em] uppercase text-gold-deep">
                    {p.price != null
                      ? formatPrice(p.price)
                      : "Consulte por el precio"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="consulta" className="bg-ink text-ivory">
          <div className="mx-auto max-w-5xl px-6 py-20 text-center">
            <div className="section-label text-gold-hi/80">Consulta</div>
            <h2 className="font-display mt-5 text-3xl md:text-4xl leading-tight">
              ¿Le interesa una pieza?
            </h2>
            <p className="font-serif text-ivory/80 text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
              Elija una pieza de la colección y escriba a Rita. Ella le
              responderá personalmente en español o en inglés. El retiro se
              hace en su taller en Nuevo Hampshire con cita previa; si usted
              está lejos, puede contratar un transportista especializado para
              recoger la pieza.
            </p>
            <a
              href={CONTACT.phoneHref}
              className="mt-10 inline-flex flex-col group"
            >
              <span className="section-label text-gold-hi/80">
                Llame al taller
              </span>
              <span className="font-display text-gild text-3xl md:text-4xl tracking-[0.15em] mt-2 group-hover:text-gold-hi">
                {CONTACT.phone}
              </span>
            </a>
            <div className="mt-8">
              <Link
                href="/collection"
                className="btn-primary font-display text-[0.72rem] tracking-[0.3em] uppercase px-7 py-4 rounded-sm inline-block"
              >
                Ver todas las piezas
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
