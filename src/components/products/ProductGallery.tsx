"use client";

import { useState } from "react";
import { productPhoto } from "@/lib/data/photos";

export function ProductGallery({ slug, shape, material, name }: { slug: string; shape: string; material: string; name: string }) {
  const src = productPhoto(slug, shape, material);
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button type="button" className="panel block w-full overflow-hidden p-0" onClick={() => setOpen(true)} aria-label={`Enlarge photo of ${name}`}>
        <img src={src} alt={name} className="h-[420px] w-full object-cover" />
      </button>
      <p className="mt-3 text-xs leading-5 text-ink-soft">
        A real example of this kind of pack. Your size, window, board, and print are made to order. This photograph is not finished PACKNEXT stock.
      </p>
      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/70 p-4" role="dialog" aria-modal="true" aria-label={`${name} enlarged`}>
          <button type="button" className="absolute inset-0 cursor-default" aria-label="Close enlarged photo" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[1.75rem] bg-paper p-3">
            <img src={src} alt={name} className="max-h-[70vh] w-full object-contain" />
            <button type="button" className="btn btn-ink mt-3" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
