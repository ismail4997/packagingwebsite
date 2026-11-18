import type { Metadata } from "next";

export const cities = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Sialkot",
  "Multan",
  "Gujranwala",
  "Peshawar",
  "Other / International",
] as const;

export type City = (typeof cities)[number];

function publicEnv(name: string) {
  const value = process.env[name]?.trim() ?? "";
  return value;
}

export const site = {
  name: "PACKNEXT",
  tagline: "Packaging That Moves Your Brand Forward.",
  altTagline: "Your Product. Your Packaging. Your Next Big Impression.",
  description:
    "PACKNEXT designs and supplies custom packaging, printing, labels, stickers, and bags for businesses in Pakistan. Specify the material, size, and quantity, then request a quotation.",
  url: publicEnv("NEXT_PUBLIC_SITE_URL") || "http://localhost:3000",
  email: publicEnv("NEXT_PUBLIC_CONTACT_EMAIL"),
  phoneDisplay: publicEnv("NEXT_PUBLIC_PHONE_DISPLAY"),
  whatsapp: publicEnv("NEXT_PUBLIC_WHATSAPP_NUMBER").replace(/[^\d]/g, ""),
  locale: "en_PK",
};

/** Facts the business still needs to fill in. These are never presented as confirmed history. */
export const businessProfile = {
  established: "Add the year PACKNEXT was established",
  legalName: "Add the registered business name",
  address: "Add the studio or workshop address",
  hours: "Add business hours",
  coverage: "Add confirmed delivery or pickup arrangements",
  registration: "Add any registration or tax numbers you want published",
};

export const nav = [
  { href: "/products", label: "Packaging" },
  { href: "/materials", label: "Materials" },
  { href: "/industries", label: "Industries" },
  { href: "/studio", label: "Studio" },
  { href: "/about", label: "About" },
] as const;

export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — PACKNEXT`,
      description,
      url: path,
      locale: "en_PK",
      type: "website",
      siteName: "PACKNEXT",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — PACKNEXT`,
      description,
    },
  };
}
