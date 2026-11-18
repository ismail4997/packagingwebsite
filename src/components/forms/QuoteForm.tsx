"use client";

import { useEffect, useRef, useState } from "react";
import { cities } from "@/lib/site";
import { materials } from "@/lib/data/materials";
import { finishingOptions, printingOptions } from "@/lib/data/studio";
import { issuesToFields, quoteSchema } from "@/lib/quote-schema";
import { quoteSummary } from "@/lib/summary";
import { phoneHint } from "@/lib/validation";
import { whatsappConfigured } from "@/lib/whatsapp";

type Mode = "quote" | "contact" | "product";

type Initial = {
  packagingType?: string;
  material?: string;
  materialChoices?: { id: string; name: string }[];
  printingChoices?: string[];
  finishingChoices?: string[];
  lengthMm?: string;
  widthMm?: string;
  heightMm?: string;
  quantity?: string;
  brandColor?: string;
  hideHeight?: boolean;
};

type Success = {
  id: string;
  persistence: string;
  summary: string;
  warnings: string[];
  whatsappUrl: string | null;
  email: string;
};

export function QuoteForm({
  mode,
  source,
  initial,
}: {
  mode: Mode;
  source: string;
  initial?: Initial;
}) {
  const kind = mode === "contact" ? "contact" : "quote";
  const materialChoices = initial?.materialChoices ?? materials.map((item) => ({ id: item.id, name: item.name }));
  const printingChoices = initial?.printingChoices ?? printingOptions.map((item) => item.label);
  const finishingChoices = initial?.finishingChoices ?? finishingOptions.map((item) => item.label);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState<Success | null>(null);
  const [printing, setPrinting] = useState<string[]>(mode === "contact" ? [] : [printingChoices[0]].filter(Boolean));
  const [finishing, setFinishing] = useState<string[]>(mode === "contact" ? [] : ["No special finishing"]);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function toggle(list: string[], value: string, exclusive?: string) {
    if (exclusive && value === exclusive) return [exclusive];
    const next = list.includes(value) ? list.filter((item) => item !== value) : [...list.filter((item) => item !== exclusive), value];
    return next.length ? next : list;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const form = new FormData(event.currentTarget);
    form.set("printing", JSON.stringify(printing));
    form.set("finishing", JSON.stringify(finishing));
    form.set("startedAt", String(startedAt.current));
    const payload = {
      kind,
      name: String(form.get("name") ?? ""),
      business: String(form.get("business") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      city: String(form.get("city") ?? ""),
      packagingType: String(form.get("packagingType") ?? ""),
      material: String(form.get("material") ?? ""),
      lengthMm: String(form.get("lengthMm") ?? ""),
      widthMm: String(form.get("widthMm") ?? ""),
      heightMm: String(form.get("heightMm") ?? ""),
      quantity: String(form.get("quantity") ?? ""),
      printing,
      finishing,
      instructions: String(form.get("instructions") ?? ""),
      brandColor: String(form.get("brandColor") ?? ""),
      source,
      companyWebsite: String(form.get("companyWebsite") ?? ""),
      startedAt,
    };
    const parsed = quoteSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(issuesToFields(parsed.error));
      setMessage("Check the highlighted fields.");
      return;
    }
    const file = form.get("artwork");
    if (file instanceof File && file.size > 8 * 1024 * 1024) {
      setErrors({ artwork: "File is larger than 8 MB." });
      return;
    }
    setErrors({});
    setPending(true);
    try {
      const response = await fetch("/api/quotes", { method: "POST", body: form });
      const data = (await response.json()) as Success & { ok?: boolean; message?: string; errors?: Record<string, string> };
      if (!response.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setMessage(data.message || "The request could not be sent.");
        return;
      }
      setSuccess({
        id: data.id,
        persistence: data.persistence,
        summary: data.summary,
        warnings: data.warnings ?? [],
        whatsappUrl: data.whatsappUrl,
        email: data.email,
      });
    } catch {
      setMessage("The request could not be sent. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  if (success) {
    return (
      <div className="panel p-6 sm:p-8" role="status">
        <p className="kicker">Request recorded</p>
        <h2 className="display mt-3 text-4xl">Reference {success.id}</h2>
        <p className="mt-4 text-sm leading-6 text-ink-soft">
          {success.persistence === "supabase"
            ? "Saved to the PACKNEXT quotation database."
            : success.persistence === "local-file"
              ? "Saved on this server’s local storage. This is not a cloud database until Supabase is configured."
              : "This copy was not stored on a server. Keep the summary below."}
        </p>
        <ul className="mt-4 space-y-2 text-sm text-ink-soft">
          {success.warnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
        <pre className="mt-6 overflow-x-auto rounded-2xl bg-ink p-4 text-left text-xs leading-5 whitespace-pre-wrap text-foam">
          {success.summary}
        </pre>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            className="btn btn-ink"
            onClick={() => navigator.clipboard.writeText(success.summary)}
          >
            Copy summary
          </button>
          <a
            className="btn btn-ghost"
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(success.summary)}`}
            download={`${success.id}.txt`}
          >
            Download summary
          </a>
          {success.whatsappUrl ? (
            <a className="btn btn-press" href={success.whatsappUrl} target="_blank" rel="noreferrer">
              Send on WhatsApp
            </a>
          ) : (
            <p className="text-sm text-ink-soft">WhatsApp is not configured yet. Set NEXT_PUBLIC_WHATSAPP_NUMBER.</p>
          )}
        </div>
        </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="panel grid gap-5 p-6 sm:p-8" noValidate>
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="startedAt" defaultValue="" />
      <input type="hidden" name="printing" value={JSON.stringify(printing)} />
      <input type="hidden" name="finishing" value={JSON.stringify(finishing)} />
      <input type="hidden" name="brandColor" value={initial?.brandColor ?? ""} />
      <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {mode !== "contact" ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Packaging" name="packagingType" error={errors.packagingType} required>
            <input className="field" name="packagingType" defaultValue={initial?.packagingType ?? ""} required={kind === "quote"} />
          </Field>
          <Field label="Material" name="material" error={errors.material} required>
            <select className="select" name="material" defaultValue={initial?.material ?? materialChoices[0]?.name}>
              {materialChoices.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Length / width (mm)" name="lengthMm" error={errors.lengthMm} required>
            <input className="field" name="lengthMm" inputMode="numeric" defaultValue={initial?.lengthMm ?? ""} />
          </Field>
          <Field label="Width / gusset / height (mm)" name="widthMm" error={errors.widthMm} required>
            <input className="field" name="widthMm" inputMode="numeric" defaultValue={initial?.widthMm ?? ""} />
          </Field>
          {initial?.hideHeight ? (
            <input type="hidden" name="heightMm" value="" />
          ) : (
            <Field label="Height (mm)" name="heightMm" error={errors.heightMm}>
              <input className="field" name="heightMm" inputMode="numeric" defaultValue={initial?.heightMm ?? ""} />
            </Field>
          )}
          <Field label="Quantity" name="quantity" error={errors.quantity} required>
            <input className="field" name="quantity" inputMode="numeric" defaultValue={initial?.quantity ?? ""} />
          </Field>
          <fieldset className="sm:col-span-2">
            <legend className="text-sm font-medium">Printing <span className="text-press">*</span></legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {printingChoices.map((choice) => (
                <button
                  type="button"
                  key={choice}
                  aria-pressed={printing.includes(choice)}
                  className={`rounded-full border px-3 py-2 text-sm ${printing.includes(choice) ? "border-ink bg-ink text-foam" : "border-ink/15"}`}
                  onClick={() => setPrinting((current) => toggle(current, choice))}
                >
                  {choice}
                </button>
              ))}
            </div>
            {errors.printing ? <p className="mt-2 text-sm text-press-deep">{errors.printing}</p> : null}
          </fieldset>
          <fieldset className="sm:col-span-2">
            <legend className="text-sm font-medium">Finishing</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {finishingChoices.map((choice) => (
                <button
                  type="button"
                  key={choice}
                  aria-pressed={finishing.includes(choice)}
                  className={`rounded-full border px-3 py-2 text-sm ${finishing.includes(choice) ? "border-ink bg-ink text-foam" : "border-ink/15"}`}
                  onClick={() => setFinishing((current) => toggle(current, choice, "No special finishing"))}
                >
                  {choice}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name} required>
          <input className="field" name="name" autoComplete="name" required />
        </Field>
        <Field label="Business name" name="business" error={errors.business} required={kind === "quote"}>
          <input className="field" name="business" autoComplete="organization" />
        </Field>
        <Field label="Phone" name="phone" error={errors.phone} required hint={phoneHint}>
          <input className="field" name="phone" autoComplete="tel" inputMode="tel" placeholder="0300 1234567" required />
        </Field>
        <Field label="Email" name="email" error={errors.email} required>
          <input className="field" name="email" autoComplete="email" type="email" required />
        </Field>
        <Field label="City" name="city" error={errors.city} required>
          <select className="select" name="city" defaultValue="Lahore" required>
            {cities.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </Field>
        <Field label="Artwork" name="artwork" error={errors.artwork} hint="PNG, JPG, WebP, or PDF. 8 MB maximum.">
          <input className="field" name="artwork" type="file" accept=".png,.jpg,.jpeg,.webp,.pdf,image/png,image/jpeg,image/webp,application/pdf" />
        </Field>
        <Field label={mode === "contact" ? "How can we help?" : "Additional instructions"} name="instructions" error={errors.instructions}>
          <textarea className="field min-h-32" name="instructions" />
        </Field>
      </div>
      {message ? (
        <p role="alert" className="text-sm text-press-deep">
          {message}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-4">
        <button className="btn btn-press" type="submit" disabled={pending}>
          {pending ? "Sending request…" : kind === "quote" ? "Request quotation" : "Send message"}
        </button>
        {!whatsappConfigured() ? (
          <p className="text-sm text-ink-soft">WhatsApp sends after you add a business number.</p>
        ) : null}
      </div>
      <p className="text-xs leading-5 text-ink-soft">
        Required fields are marked. This form does not calculate a manufacturing price. A summary is shown after a real save attempt, including whether cloud storage is connected.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  required,
  hint,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm" htmlFor={name}>
      <span className="font-medium">
        {label} {required ? <span className="text-press">*</span> : null}
      </span>
      <div className="mt-2">{children}</div>
      {hint ? <span className="mt-1 block text-xs leading-5 text-ink-soft">{hint}</span> : null}
      {error ? <span className="mt-1 block text-sm text-press-deep">{error}</span> : null}
    </label>
  );
}

export function liveSummary(input: Parameters<typeof quoteSummary>[0]) {
  return quoteSummary(input);
}
