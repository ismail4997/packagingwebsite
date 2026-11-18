/** English is the live locale. Urdu can be added as a second dictionary without changing page structure. */
export const locale = {
  code: "en" as const,
  dir: "ltr" as const,
  planned: ["ur"] as const,
};

export type LocaleCode = typeof locale.code | (typeof locale.planned)[number];
