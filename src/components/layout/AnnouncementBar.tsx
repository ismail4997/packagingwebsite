"use client";

import { useSyncExternalStore } from "react";
import { X } from "lucide-react";

const storageKey = "packnext.announce.dismissed";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function dismissed() {
  return sessionStorage.getItem(storageKey) === "1";
}

export function AnnouncementBar() {
  const hidden = useSyncExternalStore(subscribe, dismissed, () => false);
  if (hidden) return null;

  return (
    <div className="bg-ink text-foam">
      <div className="shell flex items-start justify-between gap-4 py-2.5 text-sm leading-5">
        <p>
          Quotation-based custom packaging for businesses in Pakistan. Share the size, material, and quantity. The price is confirmed after review.
        </p>
        <button
          type="button"
          className="mt-0.5 shrink-0 rounded-full p-1 text-foam/80 hover:text-foam"
          aria-label="Dismiss announcement"
          onClick={() => {
            sessionStorage.setItem(storageKey, "1");
            listeners.forEach((listener) => listener());
          }}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
