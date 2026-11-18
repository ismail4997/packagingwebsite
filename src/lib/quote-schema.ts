import { z } from "zod";
import { cities } from "@/lib/site";
import { isValidPhone, phoneHint } from "@/lib/validation";

const emptyToNull = (value: unknown) =>
  value === "" || value === undefined || value === null ? null : value;

const mm = z.preprocess(
  emptyToNull,
  z.union([
    z.null(),
    z.coerce
      .number({ error: "Enter a size in millimetres." })
      .min(10, "Minimum size is 10 mm.")
      .max(2000, "Maximum size is 2000 mm."),
  ]),
);

export const quoteSchema = z
  .object({
    kind: z.enum(["quote", "contact"]),
    name: z.string().trim().min(2, "Enter your name.").max(80),
    business: z.string().trim().max(120).optional().default(""),
    phone: z.string().trim().refine(isValidPhone, phoneHint),
    email: z.string().trim().email("Enter a valid email address.").max(120),
    city: z.enum(cities, { error: "Choose a city." }),
    packagingType: z.string().trim().max(120).optional().default(""),
    material: z.string().trim().max(120).optional().default(""),
    lengthMm: mm,
    widthMm: mm,
    heightMm: mm,
    quantity: z.preprocess(
      emptyToNull,
      z.union([
        z.null(),
        z.coerce
          .number({ error: "Enter a quantity." })
          .int("Quantity must be a whole number.")
          .min(1, "Quantity must be at least 1.")
          .max(1_000_000, "Quantity looks too large. Contact us directly for this volume."),
      ]),
    ),
    printing: z.array(z.string().trim().max(80)).max(8).default([]),
    finishing: z.array(z.string().trim().max(80)).max(12).default([]),
    instructions: z.string().trim().max(2000).optional().default(""),
    brandColor: z
      .string()
      .trim()
      .refine((value) => value === "" || /^#[0-9a-fA-F]{6}$/.test(value), "Choose a valid colour.")
      .optional()
      .default(""),
    source: z.string().trim().max(160).optional().default(""),
    companyWebsite: z.string().optional().default(""),
    startedAt: z.coerce.number().optional(),
  })
  .superRefine((value, context) => {
    if (value.kind !== "quote") return;
    if (value.business.trim().length < 2) {
      context.addIssue({ code: "custom", path: ["business"], message: "Enter the business name." });
    }
    if (!value.packagingType) {
      context.addIssue({ code: "custom", path: ["packagingType"], message: "Choose a packaging type." });
    }
    if (!value.material) {
      context.addIssue({ code: "custom", path: ["material"], message: "Choose a material." });
    }
    if (value.lengthMm === null) {
      context.addIssue({ code: "custom", path: ["lengthMm"], message: "Enter the length or width." });
    }
    if (value.widthMm === null) {
      context.addIssue({ code: "custom", path: ["widthMm"], message: "Enter the second dimension." });
    }
    if (value.quantity === null) {
      context.addIssue({ code: "custom", path: ["quantity"], message: "Enter the quantity you need." });
    }
    if (value.printing.length === 0) {
      context.addIssue({ code: "custom", path: ["printing"], message: "Select at least one printing option." });
    }
  });

export type QuoteInput = z.infer<typeof quoteSchema>;

export function issuesToFields(error: z.ZodError) {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fields[key]) fields[key] = issue.message;
  }
  return fields;
}
