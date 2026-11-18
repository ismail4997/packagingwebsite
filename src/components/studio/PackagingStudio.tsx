"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { finishingOptions, getStudioPack, printingOptions, studioPacks, dimensionLabels, defaultStudioState, type StudioState } from "@/lib/data/studio";
import { getMaterial, materials } from "@/lib/data/materials";
import { cities } from "@/lib/site";
import { issuesToFields, quoteSchema } from "@/lib/quote-schema";
import { quoteSummary } from "@/lib/summary";
import { phoneHint } from "@/lib/validation";
import { whatsappLink } from "@/lib/whatsapp";
import type { PreviewHandle } from "@/components/studio/PackPreview";

const PackPreview = dynamic(
  () => import("@/components/studio/PackPreview").then((mod) => mod.PackPreview),
  {
    ssr: false,
    loading: () => <div className="grid h-full place-items-center text-sm text-ink-soft">Preparing the preview…</div>,
  },
);

const steps = ["Packaging", "Material", "Size", "Printing", "Finishing", "Quantity", "Preview", "Quote"];
const storageKey = "packnext.studio.v1";

export function PackagingStudio() {
  const reduce = useReducedMotion();
  const [state, setState] = useState<StudioState>(defaultStudioState);
  const [step, setStep] = useState(0);
  const [reached, setReached] = useState(0);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const api = useRef<PreviewHandle | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let next: StudioState = defaultStudioState;
    const saved = sessionStorage.getItem(storageKey);
    if (saved) {
      try {
        next = { ...defaultStudioState, ...JSON.parse(saved) };
      } catch {
        next = defaultStudioState;
      }
    }
    const packId = params.get("pack");
    const pack = packId ? getStudioPack(packId) : undefined;
    if (pack) {
      next = { ...next, packId: pack.id, materialId: pack.defaultMaterial, ...pack.defaults };
    }
    const materialId = params.get("material");
    if (materialId && getMaterial(materialId)) next = { ...next, materialId };
    const color = params.get("color");
    if (color && /^#[0-9a-fA-F]{6}$/.test(color)) next = { ...next, brandColor: color };
    const finish = params.get("finish");
    if (finish && finishingOptions.some((item) => item.id === finish)) next = { ...next, finishing: [finish] };
    // Client-only session and query values must be applied after hydration so the server markup stays stable.
    /* eslint-disable react-hooks/set-state-in-effect */
    setState(next);
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!ready) return;
    sessionStorage.setItem(storageKey, JSON.stringify(state));
  }, [ready, state]);

  const pack = getStudioPack(state.packId) ?? studioPacks[0];
  const material = getMaterial(state.materialId) ?? materials[0];
  const labels = dimensionLabels(pack.format);

  const summary = useMemo(
    () =>
      quoteSummary({
        name: "—",
        business: "—",
        phone: "—",
        email: "—",
        city: "—",
        packagingType: pack.name,
        material: material.name,
        lengthMm: state.length,
        widthMm: state.width,
        heightMm: pack.format === "flat" ? null : state.height,
        quantity: state.quantity,
        printing: state.printing.map((id) => printingOptions.find((item) => item.id === id)?.label ?? id),
        finishing: state.finishing.map((id) => finishingOptions.find((item) => item.id === id)?.label ?? id),
        brandColor: state.brandColor,
      }),
    [material.name, pack.format, pack.name, state],
  );

  function update(patch: Partial<StudioState>) {
    setState((current) => ({ ...current, ...patch }));
    setError("");
  }

  function choosePack(id: string) {
    const next = getStudioPack(id);
    if (!next) return;
    update({ packId: id, materialId: next.defaultMaterial, ...next.defaults });
  }

  function toggleFinish(id: string) {
    if (id === "none") {
      update({ finishing: ["none"] });
      return;
    }
    const withoutNone = state.finishing.filter((item) => item !== "none");
    const finishing = withoutNone.includes(id) ? withoutNone.filter((item) => item !== id) : [...withoutNone, id];
    update({ finishing: finishing.length ? finishing : ["none"] });
  }

  function togglePrint(id: string) {
    const printing = state.printing.includes(id) ? state.printing.filter((item) => item !== id) : [...state.printing, id];
    update({ printing });
  }

  function validate(index = step) {
    if (index === 2) {
      const values = pack.format === "flat" ? [state.length, state.width] : [state.length, state.width, state.height];
      if (values.some((value) => !Number.isFinite(value) || value < 10 || value > 2000)) {
        return "Enter each dimension between 10 and 2000 millimetres.";
      }
    }
    if (index === 3 && state.printing.length === 0) return "Select at least one printing option.";
    if (index === 5 && (!Number.isInteger(state.quantity) || state.quantity < 1 || state.quantity > 1_000_000)) {
      return "Enter a whole quantity between 1 and 1,000,000.";
    }
    return "";
  }

  function go(nextStep: number) {
    if (nextStep > step) {
      const problem = validate();
      if (problem) {
        setError(problem);
        return;
      }
    }
    setError("");
    setStep(nextStep);
    setReached((current) => Math.max(current, nextStep));
  }

  const whatsapp = whatsappLink(`${summary}\n\nThis is a configuration, not a confirmed quotation.`);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.86fr)]">
      <div id="studio-steps">
        <ol className="flex gap-2 overflow-x-auto pb-2" aria-label="Customisation progress">
          {steps.map((label, index) => (
            <li key={label}>
              <button
                type="button"
                className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium ${
                  index === step ? "bg-ink text-foam" : index <= reached ? "bg-paper-deep text-ink" : "text-ink-soft"
                }`}
                aria-current={index === step ? "step" : undefined}
                disabled={index > reached}
                onClick={() => go(index)}
              >
                {index + 1}. {label}
              </button>
            </li>
          ))}
        </ol>

        <div className="mt-6">
          {step === 0 ? (
            <ChoiceGrid
              legend="Select packaging"
              options={studioPacks.map((item) => ({ id: item.id, label: item.name, detail: item.detail }))}
              selected={state.packId}
              onSelect={choosePack}
            />
          ) : null}
          {step === 1 ? (
            <ChoiceGrid
              legend="Select material"
              options={materials.map((item) => ({ id: item.id, label: item.name, detail: item.short }))}
              selected={state.materialId}
              onSelect={(id) => update({ materialId: id })}
            />
          ) : null}
          {step === 2 ? (
            <div className="grid gap-4 sm:grid-cols-3">
              <Dimension label={`${labels.length} (mm)`} value={state.length} onChange={(length) => update({ length })} />
              <Dimension label={`${labels.width} (mm)`} value={state.width} onChange={(width) => update({ width })} />
              {pack.format === "flat" ? (
                <p className="text-sm leading-6 text-ink-soft">Height is not used for labels and stickers.</p>
              ) : (
                <Dimension label={`${labels.height} (mm)`} value={state.height} onChange={(height) => update({ height })} />
              )}
              <p className="text-sm leading-6 text-ink-soft sm:col-span-3">
                Sizes are in millimetres. The preview uses these proportions. It is not a dieline.
              </p>
            </div>
          ) : null}
          {step === 3 ? (
            <ChoiceGrid
              legend="Select printing"
              multiple
              options={printingOptions.map((item) => ({ id: item.id, label: item.label, detail: item.detail }))}
              selected={state.printing}
              onSelect={togglePrint}
            />
          ) : null}
          {step === 4 ? (
            <ChoiceGrid
              legend="Select finishing"
              multiple
              options={finishingOptions.map((item) => ({ id: item.id, label: item.label, detail: item.detail }))}
              selected={state.finishing}
              onSelect={toggleFinish}
            />
          ) : null}
          {step === 5 ? (
            <div className="max-w-sm">
              <label className="text-sm font-medium" htmlFor="quantity">
                Quantity <span className="text-press">*</span>
              </label>
              <input
                id="quantity"
                className="field mt-2"
                inputMode="numeric"
                value={state.quantity}
                onChange={(event) => update({ quantity: Number(event.target.value) })}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {[100, 250, 500, 1000, 2500].map((quantity) => (
                  <button key={quantity} type="button" className="rounded-full border border-ink/15 px-3 py-1.5 text-sm" onClick={() => update({ quantity })}>
                    {quantity.toLocaleString("en-PK")}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-sm leading-6 text-ink-soft">
                These are shortcuts, not minimums. No minimum is published. The quotation will say what is practical.
              </p>
            </div>
          ) : null}
          {step === 6 ? (
            <div className="max-w-xl">
              <h2 className="display text-4xl">Look at it from more than one side.</h2>
              <p className="mt-4 text-sm leading-6 text-ink-soft">
                Drag the preview to rotate it, or use the view controls. Change the brand colour to see the print panel. Gloss, matte, foil, emboss, and a die-cut window all change this guide. It is not a printed proof.
              </p>
            </div>
          ) : null}
          {step === 7 ? (
            <StudioQuote state={state} packName={pack.name} materialName={material.name} flat={pack.format === "flat"} />
          ) : null}
        </div>

        {error ? (
          <p role="alert" className="mt-4 text-sm text-press-deep">
            {error}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" className="btn btn-ghost" onClick={() => go(Math.max(0, step - 1))} disabled={step === 0}>
            Back
          </button>
          {step < 7 ? (
            <button type="button" className="btn btn-ink" onClick={() => go(step + 1)}>
              Continue
            </button>
          ) : null}
        </div>
      </div>

      <aside className="lg:sticky lg:top-24">
        <div className="panel overflow-hidden">
          <div className="h-[320px] sm:h-[420px]">
            <PackPreview
              apiRef={api}
              reducedMotion={Boolean(reduce)}
              config={{
                kind: pack.preview,
                materialId: state.materialId,
                brandColor: state.brandColor,
                length: state.length,
                width: state.width,
                height: pack.format === "flat" ? 8 : state.height,
                finishing: state.finishing,
                label: `${pack.name} preview in ${material.name}`,
              }}
            />
          </div>
          <div className="space-y-4 border-t border-line p-4">
            <div className="flex flex-wrap gap-2">
              {(["three", "front", "side", "top"] as const).map((view) => (
                <button key={view} type="button" className="rounded-full border border-ink/15 px-3 py-1.5 text-xs capitalize" onClick={() => api.current?.setView(view)}>
                  {view === "three" ? "Angle" : view}
                </button>
              ))}
              <button type="button" className="rounded-full border border-ink/15 px-3 py-1.5 text-xs" onClick={() => api.current?.zoom(1)}>
                Zoom in
              </button>
              <button type="button" className="rounded-full border border-ink/15 px-3 py-1.5 text-xs" onClick={() => api.current?.zoom(-1)}>
                Zoom out
              </button>
            </div>
            <label className="flex items-center justify-between gap-3 text-sm">
              Brand colour
              <input
                type="color"
                value={state.brandColor}
                aria-label="Brand colour"
                onChange={(event) => update({ brandColor: event.target.value })}
              />
            </label>
            <p className="text-sm leading-6">
              <span className="font-medium">{pack.name}</span>
              <span className="text-ink-soft"> · {material.name}</span>
            </p>
            <p className="text-xs leading-5 text-ink-soft">
              {state.length} × {state.width}
              {pack.format === "flat" ? "" : ` × ${state.height}`} mm · Qty {state.quantity.toLocaleString("en-PK")}
            </p>
            {whatsapp ? (
              <a className="btn btn-ghost w-full" href={whatsapp} target="_blank" rel="noreferrer">
                Send this configuration on WhatsApp
              </a>
            ) : (
              <p className="text-xs leading-5 text-ink-soft">Add NEXT_PUBLIC_WHATSAPP_NUMBER to send this configuration on WhatsApp.</p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

function ChoiceGrid({
  legend,
  options,
  selected,
  onSelect,
  multiple = false,
}: {
  legend: string;
  options: { id: string; label: string; detail: string }[];
  selected: string | string[];
  onSelect: (id: string) => void;
  multiple?: boolean;
}) {
  const chosen = Array.isArray(selected) ? selected : [selected];
  return (
    <fieldset>
      <legend className="text-sm font-medium">{legend}</legend>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const active = chosen.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              className={`rounded-3xl border p-4 text-left transition ${active ? "border-ink bg-foam" : "border-ink/10 bg-foam/40 hover:border-ink/30"}`}
              onClick={() => onSelect(option.id)}
            >
              <span className="block font-medium">{option.label}</span>
              <span className="mt-1 block text-sm leading-5 text-ink-soft">{option.detail}</span>
              {multiple ? <span className="mt-3 block text-xs">{active ? "Selected" : "Select"}</span> : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Dimension({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  const id = label.replace(/[^a-z]+/gi, "-").toLowerCase();
  return (
    <label className="text-sm font-medium" htmlFor={id}>
      {label}
      <input
        id={id}
        className="field mt-2"
        inputMode="decimal"
        value={Number.isFinite(value) ? value : ""}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function StudioQuote({
  state,
  packName,
  materialName,
  flat,
}: {
  state: StudioState;
  packName: string;
  materialName: string;
  flat: boolean;
}) {
  const startedAt = useRef(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState<{ id: string; summary: string; warnings: string[]; whatsappUrl: string | null; persistence: string } | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const printing = state.printing.map((id) => printingOptions.find((item) => item.id === id)?.label ?? id);
  const finishing = state.finishing.map((id) => finishingOptions.find((item) => item.id === id)?.label ?? id);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    form.set("kind", "quote");
    form.set("source", "Packaging Studio");
    form.set("packagingType", packName);
    form.set("material", materialName);
    form.set("lengthMm", String(state.length));
    form.set("widthMm", String(state.width));
    form.set("heightMm", flat ? "" : String(state.height));
    form.set("quantity", String(state.quantity));
    form.set("printing", JSON.stringify(printing));
    form.set("finishing", JSON.stringify(finishing));
    form.set("brandColor", state.brandColor);
    form.set("startedAt", String(startedAt.current));
    const parsed = quoteSchema.safeParse({
      kind: "quote",
      name: form.get("name"),
      business: form.get("business"),
      phone: form.get("phone"),
      email: form.get("email"),
      city: form.get("city"),
      packagingType: packName,
      material: materialName,
      lengthMm: state.length,
      widthMm: state.width,
      heightMm: flat ? "" : state.height,
      quantity: state.quantity,
      printing,
      finishing,
      instructions: form.get("instructions") ?? "",
      brandColor: state.brandColor,
      source: "Packaging Studio",
      companyWebsite: form.get("companyWebsite") ?? "",
      startedAt: startedAt.current,
    });
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
    setPending(true);
    setMessage("");
    try {
      const response = await fetch("/api/quotes", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setMessage(data.message || "The request could not be sent.");
        return;
      }
      setSuccess(data);
    } catch {
      setMessage("The request could not be sent. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  if (success) {
    return (
      <div role="status">
        <p className="kicker">Request recorded</p>
        <h2 className="display mt-3 text-4xl">Reference {success.id}</h2>
        <p className="mt-3 text-sm leading-6 text-ink-soft">
          {success.persistence === "supabase"
            ? "Saved to the quotation database."
            : success.persistence === "local-file"
              ? "Saved on local server storage. Cloud storage is not connected until Supabase is configured."
              : "Not stored on a server. Keep this summary."}
        </p>
        <ul className="mt-3 space-y-1 text-sm text-ink-soft">
          {success.warnings?.map((warning: string) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-ink p-4 text-xs leading-5 whitespace-pre-wrap text-foam">{success.summary}</pre>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" className="btn btn-ink" onClick={() => navigator.clipboard.writeText(success.summary)}>
            Copy summary
          </button>
          {success.whatsappUrl ? (
            <a className="btn btn-press" href={success.whatsappUrl} target="_blank" rel="noreferrer">
              Send on WhatsApp
            </a>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="rounded-3xl bg-paper-deep/70 p-4 text-sm leading-6">
        <p className="font-medium">Quotation summary</p>
        <p className="mt-2 text-ink-soft">
          {packName} · {materialName} · {state.length} × {state.width}
          {flat ? "" : ` × ${state.height}`} mm · {state.quantity.toLocaleString("en-PK")} · {printing.join(", ")} · {finishing.join(", ")}
        </p>
        <p className="mt-2 text-ink-soft">No price is calculated here. PACKNEXT quotes this specification after review.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Name <span className="text-press">*</span>
          <input className="field mt-2" name="name" autoComplete="name" />
          {errors.name ? <span className="mt-1 block font-normal text-press-deep">{errors.name}</span> : null}
        </label>
        <label className="text-sm font-medium">
          Business name <span className="text-press">*</span>
          <input className="field mt-2" name="business" autoComplete="organization" />
          {errors.business ? <span className="mt-1 block font-normal text-press-deep">{errors.business}</span> : null}
        </label>
        <label className="text-sm font-medium">
          Phone <span className="text-press">*</span>
          <input className="field mt-2" name="phone" autoComplete="tel" placeholder="0300 1234567" />
          <span className="mt-1 block font-normal text-xs text-ink-soft">{phoneHint}</span>
          {errors.phone ? <span className="mt-1 block font-normal text-press-deep">{errors.phone}</span> : null}
        </label>
        <label className="text-sm font-medium">
          Email <span className="text-press">*</span>
          <input className="field mt-2" name="email" type="email" autoComplete="email" />
          {errors.email ? <span className="mt-1 block font-normal text-press-deep">{errors.email}</span> : null}
        </label>
        <label className="text-sm font-medium">
          City <span className="text-press">*</span>
          <select className="select mt-2" name="city" defaultValue="Lahore">
            {cities.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
          {errors.city ? <span className="mt-1 block font-normal text-press-deep">{errors.city}</span> : null}
        </label>
        <label className="text-sm font-medium">
          Artwork
          <input className="field mt-2" name="artwork" type="file" accept=".png,.jpg,.jpeg,.webp,.pdf,image/png,image/jpeg,image/webp,application/pdf" />
          <span className="mt-1 block font-normal text-xs text-ink-soft">PNG, JPG, WebP, or PDF. 8 MB maximum.</span>
          {errors.artwork ? <span className="mt-1 block font-normal text-press-deep">{errors.artwork}</span> : null}
        </label>
      </div>
      <label className="text-sm font-medium">
        Additional instructions
        <textarea className="field mt-2 min-h-28" name="instructions" />
      </label>
      {message ? (
        <p role="alert" className="text-sm text-press-deep">
          {message}
        </p>
      ) : null}
      <button className="btn btn-press w-fit" disabled={pending} type="submit">
        {pending ? "Sending request…" : "Request quotation"}
      </button>
    </form>
  );
}
