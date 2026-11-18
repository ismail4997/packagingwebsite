const pkr = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  maximumFractionDigits: 0,
});

/** Use only when a verified price exists. This site does not invent manufacturing prices. */
export function formatPkr(amount: number) {
  return pkr.format(amount);
}

export function formatMm(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return `${new Intl.NumberFormat("en-PK").format(value)} mm`;
}

export function formatQuantity(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-PK").format(value);
}
