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
    "Fifty years of sacred statue restoration by Rita M. Shea. Catholic devotional statues, religious relics, and liturgical art — restored by hand in the tradition of the cathedral ateliers.",
  metadataBase: new URL("https://gospastatuary.com"),
  openGraph: {
    title: "GOSPA Statuary Restoration Co.",
    description:
      "In order for art to be a prayer, it must be of good quality. — Fifty years of sacred statue restoration.",
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
