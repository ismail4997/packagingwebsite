"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        scrolled || open ? "border-line bg-paper/95 backdrop-blur" : "border-transparent bg-paper/80"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-serif text-[1.35rem] tracking-[-0.04em] text-ink" aria-label="PACKNEXT home">
          PACK<span className="text-press">NEXT</span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm ${active ? "text-ink" : "text-ink-soft hover:text-ink"}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/contact" className="hidden text-sm text-ink-soft hover:text-ink sm:inline">
            Contact
          </Link>
          <Link href="/studio" className="btn btn-ink nav-quote px-4 py-2.5 text-sm">
            Get a custom quote
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open ? (
        <div id="mobile-nav" className="border-t border-line lg:hidden">
          <nav className="shell flex flex-col gap-1 py-4" aria-label="Mobile">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-2xl px-3 py-3 text-lg font-serif" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="rounded-2xl px-3 py-3 text-lg font-serif" onClick={() => setOpen(false)}>
              Contact
            </Link>
            <Link href="/studio" className="btn btn-press mt-2" onClick={() => setOpen(false)}>
              Get a custom quote
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
