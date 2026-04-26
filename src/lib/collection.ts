export type Category =
  | "Blessed Mother"
  | "Sacred Heart"
  | "Saints & Infant Jesus"
  | "Crucifix & Passion";

export type Status = "Available" | "Reserved" | "Sold";

export type Piece = {
  slug: string;
  title: string;
  devotion?: string;            // e.g. "Our Lady of Fátima"
  category: Category;
  price?: number;               // USD. Omit for "Inquire for price"
  status: Status;
  era?: string;                 // e.g. "Vintage, c. 1950s"
  medium?: string;              // e.g. "Plaster with polychrome and gold leaf"
  height?: string;              // e.g. "28 inches"
  provenance?: string;          // backstory
  condition?: string;           // e.g. "Restored by Rita M. Shea, 2025"
  description: string;          // main sales copy
  highlights?: string[];        // bullet points
  images: string[];             // webp paths, first is hero
  thumb: string;                // main thumbnail
  hero?: boolean;
  featured?: boolean;
};

const img = (id: string) => `/statues/${id}.webp`;
const thumb = (id: string) => `/statues/${id}-thumb.webp`;

export const collection: Piece[] = [
  {
    slug: "our-lady-of-fatima-crowned",
    title: "Our Lady of Fátima, Crowned",
    devotion: "Our Lady of Fátima",
    category: "Blessed Mother",
    status: "Available",
    era: "Mid-century devotional, fully restored",
    medium: "Plaster with polychrome, crystal inset rosary, hand-gilded crown",
    height: "Approx. 34 inches",
    provenance:
      "A traditional Fátima image with pierced-heart rosary and star-mantle, finished in the old manner. Re-gilded crown in 22K gold leaf, hand-embroidered star pattern on the cape renewed by Rita.",
    condition: "Museum-quality restoration, 2025",
    description:
      "A cathedral-scale Our Lady of Fátima — the very image Rita keeps before her own workbench. Her mantle is dusted in gold stars; her crown is jeweled; her hands hold the crystalline rosary. Ready to preside over a private chapel, family altar, or sanctuary niche.",
    highlights: [
      "Hand-restored by Rita M. Shea",
      "22K gold leaf crown and hem",
      "Crystal rosary with original inset stones",
      "Fully sealed and finished — ready for veneration",
    ],
    images: [img("DJI_20260419121121_0019_D"), img("DJI_20260419121227_0023_D")],
    thumb: thumb("DJI_20260419121121_0019_D"),
    hero: true,
    featured: true,
  },
  {
    slug: "our-lady-of-lourdes-vintage",
    title: "Our Lady of Lourdes",
    devotion: "Our Lady of Lourdes",
    category: "Blessed Mother",
    price: 850,
    status: "Available",
    era: "Vintage, c. 1950–1960",
    medium: "Chalkware plaster with polychrome and gilding",
    height: "Approx. 24 inches",
    provenance:
      "A classical rosary-bearing Lourdes figure in the French tradition. Hand-poured chalkware from the mid-20th century, then carefully restored: rosary beads redrawn, flesh-tones rebuilt, gilt edges returned along the mantle.",
    condition: "Restored by Rita M. Shea",
    description:
      "The figure every Catholic childhood remembers — hands folded in prayer, rosary falling from her wrist, the blue mantle and ivory sash of Lourdes. Tagged in Rita's studio at $850 as a vintage piece, professionally restored and ready for an altar.",
    highlights: [
      "Vintage mid-century plaster",
      "Rosary restored — original cross intact",
      "Ivory sash and blue mantle repainted in the traditional manner",
      "Ready to ship",
    ],
    images: [img("DJI_20260419122929_0058_D"), img("DJI_20260419123222_0059_D")],
    thumb: thumb("DJI_20260419122929_0058_D"),
    featured: true,
  },
  {
    slug: "our-lady-of-mount-carmel",
    title: "Our Lady of Mount Carmel with the Infant",
    devotion: "Our Lady of Mount Carmel",
    category: "Blessed Mother",
    price: 895,
    status: "Available",
    era: "Vintage, fully restored",
    medium: "Plaster with scrollwork polychromy, original gilt filigree",
    height: "Approx. 24 inches",
    provenance:
      "A crowned Madonna presenting the brown scapular with the Christ Child in her arms — the classical Carmelite iconography. Both scapulars present and embroidered; golden scrollwork hand-restored across the cream and cocoa robes.",
    condition: "Restored by Rita M. Shea",
    description:
      "Our Lady extends the scapular — the Carmelite promise — while the Christ Child, crowned and robed, offers the same. Both crowns regilded, scrollwork edges reworked, the embroidered scapulars renewed. A reverent, warm-palette piece suited to a Carmelite devotion or family chapel.",
    highlights: [
      "Tagged $895 in the studio",
      "Both scapulars embroidered and restored",
      "Regilded crowns on Mother and Child",
      "Ready to ship",
    ],
    images: [img("DJI_20260419122525_0039_D")],
    thumb: thumb("DJI_20260419122525_0039_D"),
    featured: true,
  },
  {
    slug: "our-lady-of-grace",
    title: "Our Lady of Grace",
    devotion: "Our Lady of Grace / Miraculous Medal",
    category: "Blessed Mother",
    status: "Available",
    era: "Vintage, restored",
    medium: "Plaster with polychromy, gilt-edged mantle, serpent-and-orb base",
    height: "Approx. 30 inches",
    provenance:
      "A large Miraculous Medal Madonna in the traditional turquoise-and-ivory palette. Feet upon the world, serpent beneath — the full iconography, restored whole. Behind her the crowned Our Lady of Fátima piece (see next listing) awaits unwrapping.",
    condition: "Restored by Rita M. Shea",
    description:
      "A striking, confident Madonna with open hands extended in blessing. The gilt edges of her mantle and the silver-green lining have been carefully renewed; her face and hands are finished in warm flesh-tones with a soft matte glaze.",
    highlights: [
      "Serpent-and-orb base intact and repainted",
      "Turquoise mantle with gilt edging",
      "Soft flesh-tone glazes in the old manner",
      "Ready to ship",
    ],
    images: [img("DJI_20260419122553_0042_D")],
    thumb: thumb("DJI_20260419122553_0042_D"),
    featured: true,
  },
  {
    slug: "sacred-heart-of-jesus-classical",
    title: "Sacred Heart of Jesus — Classical Palette",
    devotion: "Sacred Heart of Jesus",
    category: "Sacred Heart",
    status: "Available",
    era: "Vintage, restored",
    medium: "Plaster with polychromy and gilt trim",
    height: "Approx. 22 inches",
    provenance:
      "A tabletop Sacred Heart in the more classical rose-and-green palette, with ivory and cream undersleeves. The Heart-in-hand iconography, carefully shaded; a subtle, devotional piece for a private oratory.",
    condition: "Restored by Rita M. Shea",
    description:
      "More intimate than the large Sacred Heart, this table-scale piece sits well on a desk altar, bedroom shrine, or hospital-room bedside. The Heart is hand-painted with the crown-of-thorns in thin brushwork.",
    highlights: [
      "Tabletop scale",
      "Quiet classical palette",
      "Subtle brushed thorns on the Heart",
      "Ready to ship",
    ],
    images: [img("DJI_20260419122635_0046_D")],
    thumb: thumb("DJI_20260419122635_0046_D"),
    featured: true,
  },
  {
    slug: "infant-of-prague",
    title: "The Infant Jesus of Prague",
    devotion: "Infant Jesus of Prague",
    category: "Saints & Infant Jesus",
    status: "Available",
    era: "Vintage, restored",
    medium: "Plaster with silk-finish polychromy, jeweled crown, gold orb",
    height: "Approx. 20 inches",
    provenance:
      "A lavishly finished Infant of Prague — blessing hand raised, orb in the left, red and pearl-crystal crown atop. The IHS sunburst chest-plate hand-painted; the crimson and cream robe edged in gold with fuchsia scrollwork.",
    condition: "Restored by Rita M. Shea",
    description:
      "One of the atelier's most dramatic small-scale pieces. Ideal for a prayer niche, a child's baptism gift, or a private chapel. The crown is seated high; the rosary falls from his arm; the IHS is framed by a golden sunburst on the chest.",
    highlights: [
      "Jeweled crown with red and pearl insets",
      "Orb with cross, original gilding intact",
      "Fuchsia-and-gold robe scrollwork restored",
      "IHS sunburst on chest hand-painted",
    ],
    images: [img("DJI_20260419122712_0048_D")],
    thumb: thumb("DJI_20260419122712_0048_D"),
    featured: true,
  },
  {
    slug: "st-joseph-and-st-martin-de-porres",
    title: "St. Joseph & St. Martin de Porres — Pair",
    devotion: "St. Joseph · St. Martin de Porres",
    category: "Saints & Infant Jesus",
    status: "Available",
    era: "Restored pair",
    medium: "Plaster polychromy with gilded halo (St. Martin)",
    height: "Approx. 14 inches each",
    provenance:
      "A devotional pair typical of a domestic shrine — St. Joseph the Worker and St. Martin de Porres, the beloved Peruvian lay-brother. Halos, habit folds, and palette restored together so the two stand as a matched set.",
    condition: "Restored by Rita M. Shea",
    description:
      "Two of the most asked-for household saints, restored as a matched pair. Also available individually — please inquire.",
    highlights: [
      "Sold as a pair, or individually on inquiry",
      "St. Martin's gilded halo restored",
      "Matched scale for side-by-side display",
    ],
    images: [img("DJI_20260419121128_0020_D"), img("DJI_20260419121240_0025_D")],
    thumb: thumb("DJI_20260419121128_0020_D"),
  },
  {
    slug: "cristo-de-limpias",
    title: "Santo Cristo de Limpias — Passion Bust",
    devotion: "Santo Cristo de Limpias",
    category: "Crucifix & Passion",
    price: 800,
    status: "Available",
    era: "Used, restored in the rustic manner",
    medium: "Plaster with polychromy, carved and painted crown of thorns",
    height: "Approx. 18 inches",
    provenance:
      "A rare devotional bust in the tradition of the miraculous Cristo de Limpias (northern Spain). The gaze lifted toward the Father; the crown of thorns leafed and painted in green and red; blood rivulets carefully detailed. The pedestal reads 'Sto Cristo de Limpias' in carved gilt.",
    condition: "Restored by Rita M. Shea — rustic finish preserved",
    description:
      "A deeply moving piece of Passion devotion — not a soft or decorative image, but the suffering Christ as he is venerated in northern Spain. Suited to a Good Friday chapel, a Passion retreat space, or a serious private oratory. Tagged $800.",
    highlights: [
      "Leafed crown of thorns, polychrome wounds",
      "Gilded 'Sto Cristo de Limpias' pedestal",
      "Rare American example of a Spanish devotion",
    ],
    images: [img("DJI_20260419122833_0054_D")],
    thumb: thumb("DJI_20260419122833_0054_D"),
    featured: true,
  },
];

export const categories: Category[] = [
  "Blessed Mother",
  "Sacred Heart",
  "Saints & Infant Jesus",
  "Crucifix & Passion",
];

export const categoriesES: Record<Category, string> = {
  "Blessed Mother": "La Santísima Virgen",
  "Sacred Heart": "Sagrado Corazón",
  "Saints & Infant Jesus": "Santos y Niño Jesús",
  "Crucifix & Passion": "Crucifijos y la Pasión",
};

export function formatPrice(p?: number) {
  if (p == null) return "Inquire for price";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(p);
}

export function findBySlug(slug: string) {
  return collection.find((p) => p.slug === slug);
}
