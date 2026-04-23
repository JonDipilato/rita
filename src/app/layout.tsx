import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GOSPA Statuary Restoration Co. — Rita M. Shea, Master Restorer",
    template: "%s · GOSPA Statuary Restoration",
  },
  description:
    "Hand-restored Catholic devotional statuary offered by Rita M. Shea from her New Hampshire atelier — Madonnas, Sacred Hearts, saints, crucifixes, and reliquaries. Local pickup in New England or buyer-arranged shipping. Consultas en español bienvenidas.",
  metadataBase: new URL("https://gospastatuary.com"),
  keywords: [
    "Catholic statues for sale",
    "restored Catholic statues",
    "religious statues New Hampshire",
    "Catholic statues New England",
    "estatuas católicas restauradas",
    "devotional statues",
    "sacred art restoration",
    "Our Lady of Fátima statue",
    "Sacred Heart of Jesus statue",
    "Infant of Prague statue",
    "Santo Cristo de Limpias",
    "religious antiques",
  ],
  openGraph: {
    title: "GOSPA Statuary Restoration Co.",
    description:
      "In order for art to be a prayer, it must be of good quality. — Hand-restored Catholic statuary from Rita M. Shea's New Hampshire atelier.",
    type: "website",
    images: ["/statues/DJI_20260419121121_0019_D.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-parchment text-ink">
        {children}
      </body>
    </html>
  );
}
