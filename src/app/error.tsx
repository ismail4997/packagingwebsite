"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="shell py-24">
      <h1 className="display text-5xl">This page did not load.</h1>
      <p className="mt-4 max-w-lg text-ink-soft">Refresh the view. If it keeps happening, the rest of the site is still available from the menu.</p>
      <button type="button" className="btn btn-ink mt-6" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
