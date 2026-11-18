import { NextResponse } from "next/server";
import { issuesToFields, quoteSchema } from "@/lib/quote-schema";
import { storeQuote, type ArtworkFile } from "@/lib/persistence";

const MAX_BYTES = 8 * 1024 * 1024;
const allowedTypes = new Map([
  ["image/png", "png"],
  ["image/jpeg", "jpg"],
  ["image/webp", "webp"],
  ["application/pdf", "pdf"],
]);

const hits = new Map<string, number[]>();

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || "local";
}

function limited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < 10 * 60 * 1000);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > 8;
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function listField(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || !value.trim()) return [];
  try {
    const parsed = JSON.parse(value) as unknown;
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, message: "The form could not be sent from this origin." }, { status: 403 });
  }
  if (limited(clientKey(request))) {
    return NextResponse.json(
      { ok: false, message: "Too many requests from this connection. Wait a few minutes and try again." },
      { status: 429 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, message: "The form could not be read." }, { status: 400 });
  }

  if (String(form.get("companyWebsite") ?? "").trim()) {
    return NextResponse.json({
      ok: true,
      id: "PN-RECEIVED",
      persistence: "discarded",
      email: "not-configured",
      warnings: [],
      summary: "",
      whatsappUrl: null,
    });
  }

  const startedAt = Number(form.get("startedAt") ?? 0);
  const elapsed = Date.now() - startedAt;
  if (!startedAt || elapsed < 1200 || elapsed > 1000 * 60 * 60 * 24) {
    return NextResponse.json(
      { ok: false, message: "The form was submitted too quickly or the page had been open too long. Refresh and try again." },
      { status: 400 },
    );
  }

  const parsed = quoteSchema.safeParse({
    kind: form.get("kind"),
    name: form.get("name"),
    business: form.get("business") ?? "",
    phone: form.get("phone"),
    email: form.get("email"),
    city: form.get("city"),
    packagingType: form.get("packagingType") ?? "",
    material: form.get("material") ?? "",
    lengthMm: form.get("lengthMm") ?? "",
    widthMm: form.get("widthMm") ?? "",
    heightMm: form.get("heightMm") ?? "",
    quantity: form.get("quantity") ?? "",
    printing: listField(form.get("printing")),
    finishing: listField(form.get("finishing")),
    instructions: form.get("instructions") ?? "",
    brandColor: form.get("brandColor") ?? "",
    source: form.get("source") ?? "",
    companyWebsite: "",
    startedAt,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Check the highlighted fields.", errors: issuesToFields(parsed.error) },
      { status: 400 },
    );
  }

  let artwork: ArtworkFile | null = null;
  const file = form.get("artwork");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { ok: false, message: "Artwork must be 8 MB or smaller.", errors: { artwork: "File is larger than 8 MB." } },
        { status: 400 },
      );
    }
    const extension = allowedTypes.get(file.type);
    const nameExtension = file.name.split(".").pop()?.toLowerCase();
    const extensionOk =
      extension &&
      (nameExtension === extension || (extension === "jpg" && nameExtension === "jpeg"));
    if (!extensionOk) {
      return NextResponse.json(
        {
          ok: false,
          message: "Upload a PNG, JPG, WebP, or PDF.",
          errors: { artwork: "Use a PNG, JPG, WebP, or PDF." },
        },
        { status: 400 },
      );
    }
    const safeExtension = extension === "jpg" && nameExtension === "jpeg" ? "jpg" : extension;
    const original = file.name.replace(/[^\w.\- ]+/g, "").slice(0, 80);
    artwork = {
      buffer: Buffer.from(await file.arrayBuffer()),
      filename: original || `artwork.${safeExtension}`,
      type: file.type,
    };
  }

  try {
    const result = await storeQuote(parsed.data, artwork);
    return NextResponse.json({ ok: true, ...result });
  } catch {
    return NextResponse.json(
      { ok: false, message: "The request could not be saved. You can still send the summary on WhatsApp if it is configured." },
      { status: 500 },
    );
  }
}
