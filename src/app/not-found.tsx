import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell py-24">
      <p className="kicker">404</p>
      <h1 className="display mt-3 text-5xl sm:text-7xl">This page is not in the catalogue.</h1>
      <p className="mt-4 max-w-lg text-ink-soft">The link may be old. The packaging library and the studio are the useful places to continue.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/products" className="btn btn-ink">
          Explore packaging
        </Link>
        <Link href="/" className="btn btn-ghost">
          Home
        </Link>
      </div>
    </div>
  );
}
