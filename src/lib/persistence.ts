import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { QuoteInput } from "@/lib/quote-schema";
import { quoteSummary } from "@/lib/summary";
import { whatsappLink } from "@/lib/whatsapp";

export type ArtworkFile = {
  buffer: Buffer;
  filename: string;
  type: string;
};

export type SaveResult = {
  id: string;
  persistence: "supabase" | "local-file" | "unsaved";
  email: "sent" | "not-configured" | "failed";
  warnings: string[];
  summary: string;
  whatsappUrl: string | null;
};

function referenceId() {
  const day = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `PN-${day}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

function recordFrom(id: string, input: QuoteInput, artworkPath: string | null, artworkName: string | null) {
  return {
    id,
    createdAt: new Date().toISOString(),
    kind: input.kind,
    name: input.name,
    business: input.business,
    phone: input.phone,
    email: input.email,
    city: input.city,
    packaging_type: input.packagingType,
    material: input.material,
    length_mm: input.lengthMm,
    width_mm: input.widthMm,
    height_mm: input.heightMm,
    quantity: input.quantity,
    printing: input.printing,
    finishing: input.finishing,
    instructions: input.instructions,
    brand_color: input.brandColor,
    source: input.source,
    artwork_path: artworkPath,
    artwork_name: artworkName,
  };
}

async function saveLocal(id: string, input: QuoteInput, artwork: ArtworkFile | null) {
  const quotesDir = path.join(process.cwd(), "storage", "quotes");
  await mkdir(quotesDir, { recursive: true });
  let artworkPath: string | null = null;
  if (artwork) {
    const uploads = path.join(process.cwd(), "storage", "uploads");
    await mkdir(uploads, { recursive: true });
    const storedName = `${id}.${artwork.filename.split(".").pop()}`;
    await writeFile(path.join(uploads, storedName), artwork.buffer);
    artworkPath = `storage/uploads/${storedName}`;
  }
  const record = recordFrom(id, input, artworkPath, artwork?.filename ?? null);
  await writeFile(path.join(quotesDir, `${id}.json`), JSON.stringify(record, null, 2), "utf8");
  return artworkPath;
}

async function saveSupabase(id: string, input: QuoteInput, artwork: ArtworkFile | null) {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  let artworkPath: string | null = null;
  if (artwork) {
    const extension = artwork.filename.split(".").pop() || "bin";
    artworkPath = `${id}.${extension}`;
    const upload = await fetch(`${url}/storage/v1/object/artwork/${artworkPath}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        apikey: key,
        "Content-Type": artwork.type,
        "x-upsert": "true",
      },
      body: new Uint8Array(artwork.buffer),
    });
    if (!upload.ok) {
      throw new Error(`Artwork upload failed (${upload.status}).`);
    }
  }

  const insert = await fetch(`${url}/rest/v1/quote_requests`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      apikey: key,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(recordFrom(id, input, artworkPath, artwork?.filename ?? null)),
  });
  if (!insert.ok) {
    const detail = await insert.text();
    throw new Error(`Database insert failed (${insert.status}). ${detail.slice(0, 180)}`);
  }
  return artworkPath;
}

async function notifyEmail(summary: string, id: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_NOTIFY_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL;
  if (!apiKey || !to || !from) return "not-configured" as const;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `PACKNEXT quotation request ${id}`,
      text: summary,
    }),
  });
  return response.ok ? ("sent" as const) : ("failed" as const);
}

export async function storeQuote(input: QuoteInput, artwork: ArtworkFile | null): Promise<SaveResult> {
  const id = referenceId();
  const warnings: string[] = [];
  let persistence: SaveResult["persistence"] = "unsaved";

  const supabaseConfigured = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (supabaseConfigured) {
    try {
      await saveSupabase(id, input, artwork);
      persistence = "supabase";
    } catch (error) {
      warnings.push(
        error instanceof Error
          ? `Cloud storage did not accept the request (${error.message}).`
          : "Cloud storage did not accept the request.",
      );
    }
  }

  if (persistence !== "supabase") {
    try {
      await saveLocal(id, input, artwork);
      persistence = "local-file";
      if (!supabaseConfigured) {
        warnings.push(
          "Saved on this server's local disk, not in a cloud database. Configure Supabase before relying on this in production. Serverless hosts may discard local files.",
        );
      } else {
        warnings.push("A local copy was written because cloud storage failed.");
      }
    } catch {
      persistence = "unsaved";
      warnings.push(
        "The request was not stored. No database is usable and the server could not write a file. Send the summary on WhatsApp or email.",
      );
    }
  }

  const summary = quoteSummary({
    reference: id,
    name: input.name,
    business: input.business,
    phone: input.phone,
    email: input.email,
    city: input.city,
    packagingType: input.packagingType,
    material: input.material,
    lengthMm: input.lengthMm,
    widthMm: input.widthMm,
    heightMm: input.heightMm,
    quantity: input.quantity,
    printing: input.printing,
    finishing: input.finishing,
    instructions: input.instructions,
    brandColor: input.brandColor,
    artworkName: artwork?.filename,
  });

  let email: SaveResult["email"] = "not-configured";
  try {
    email = await notifyEmail(summary, id);
    if (email === "failed") warnings.push("The notification email could not be sent.");
    if (email === "not-configured") {
      warnings.push("Email notification is not configured. Set RESEND_API_KEY, QUOTE_FROM_EMAIL, and QUOTE_NOTIFY_EMAIL.");
    }
  } catch {
    email = "failed";
    warnings.push("The notification email could not be sent.");
  }

  return {
    id,
    persistence,
    email,
    warnings,
    summary,
    whatsappUrl: whatsappLink(summary),
  };
}
