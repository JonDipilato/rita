"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Crest } from "./crest";

const links = [
  { href: "/collection", label: "Collection" },
  { href: "/#acquire", label: "How to Acquire" },
  { href: "/#rita", label: "About Rita" },
  { href: "/#restoration", label: "Restoration" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-ink/85 backdrop-blur-xl border-b border-gold/20 py-3"
          : "bg-transparent py-6",
      )}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="GOSPA Statuary Restoration Co."
        >
          <Crest
            className={cn(
              "transition-colors",
              scrolled ? "text-gold-hi" : "text-gold",
            )}
          />
          <span
            className={cn(
              "font-display text-[0.72rem] leading-tight tracking-[0.22em] uppercase",
              scrolled ? "text-ivory" : "text-ink",
            )}
          >
            <span className="block text-gild">GOSPA</span>
            <span className="block opacity-80 text-[0.62rem] tracking-[0.28em] mt-0.5">
              Statuary Restoration Co.
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "font-display text-[0.72rem] tracking-[0.25em] uppercase transition-colors",
                scrolled
                  ? "text-ivory/80 hover:text-gold-hi"
                  : "text-ink/80 hover:text-gold-deep",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/collection"
          className="hidden lg:inline-flex btn-primary font-display text-[0.7rem] tracking-[0.28em] uppercase px-5 py-2.5 rounded-sm"
        >
          Browse the Collection
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "lg:hidden p-2 -m-2",
            scrolled ? "text-ivory" : "text-ink",
          )}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-6 h-6"
          >
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-ink/95 backdrop-blur-xl border-t border-gold/20 mt-3">
          <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-ivory/90 text-sm tracking-[0.22em] uppercase"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/collection"
              onClick={() => setOpen(false)}
              className="btn-primary font-display text-[0.75rem] tracking-[0.25em] uppercase px-5 py-3 rounded-sm text-center"
            >
              Browse the Collection
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
