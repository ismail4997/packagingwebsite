import { site } from "@/lib/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    slogan: site.tagline,
    description: site.description,
    areaServed: {
      "@type": "Country",
      name: "Pakistan",
    },
    ...(site.email ? { email: site.email } : {}),
    ...(site.phoneDisplay ? { telephone: site.phoneDisplay } : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}

export function productJsonLd(input: {
  name: string;
  description: string;
  path: string;
  category: string;
  material: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    url: new URL(input.path, site.url).toString(),
    category: input.category,
    brand: { "@type": "Brand", name: site.name },
    material: input.material,
    additionalProperty: {
      "@type": "PropertyValue",
      name: "Pricing",
      value: "Quoted in PKR after specification review. No list price is published.",
    },
  };
}
