import type { MetadataRoute } from "next";
import { categories, allProductPaths } from "@/lib/data/catalog";
import { industries } from "@/lib/data/industries";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/products",
    "/materials",
    "/industries",
    "/about",
    "/contact",
    "/quote",
    "/studio",
    ...categories.map((category) => `/products/${category.slug}`),
    ...allProductPaths().map((item) => `/products/${item.category}/${item.product}`),
    ...industries.map((industry) => `/industries/${industry.slug}`),
  ];
  return paths.map((path) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
