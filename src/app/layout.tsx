import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { organizationJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "PACKNEXT — Packaging that moves your brand forward",
    template: "%s — PACKNEXT",
  },
  description: site.description,
  applicationName: "PACKNEXT",
  keywords: [
    "custom packaging in Pakistan",
    "packaging manufacturers in Pakistan",
    "custom printed boxes Pakistan",
    "food packaging boxes",
    "bakery packaging boxes",
    "cosmetic packaging",
    "kraft packaging",
    "paper bags manufacturing",
    "custom stickers and labels",
    "pharmaceutical packaging",
    "product packaging solutions",
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: "PACKNEXT",
    title: "PACKNEXT — Packaging that moves your brand forward",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "PACKNEXT — Packaging that moves your brand forward",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={locale.code} dir={locale.dir} className={`${fraunces.variable} ${outfit.variable} h-full`}>
      <body className="min-h-full bg-paper text-ink antialiased">
        <JsonLd data={organizationJsonLd()} />
        <a className="skip" href="#content">
          Skip to content
        </a>
        <AnnouncementBar />
        <Suspense fallback={<div className="h-16 border-b border-transparent" />}>
          <Header />
        </Suspense>
        <main id="content">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
