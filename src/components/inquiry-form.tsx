"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitInquiry, type ContactState, type Intent } from "@/app/actions";

const initial: ContactState = { status: "idle" };

type Props = {
  intent?: Intent;
  piece?: string;
  pieceSlug?: string;
  /** dark = on-dark sections; light = on-parchment */
  tone?: "dark" | "light";
  title?: string;
  intro?: string;
};

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary font-display text-[0.72rem] tracking-[0.3em] uppercase px-8 py-4 rounded-sm disabled:opacity-60"
    >
      {pending ? "Sending…" : label}
    </button>
  );
}

export function InquiryForm({
  intent = "general",
  piece,
  pieceSlug,
  tone = "dark",
  title,
  intro,
}: Props) {
  const [state, action] = useActionState(submitInquiry, initial);
  const onLight = tone === "light";

  const labelClass = onLight ? "text-gold-deep" : "text-gold-hi/80";
  const fieldClass = onLight
    ? "bg-ivory/60 border-ink/15 text-ink placeholder:text-ink/30 focus:border-gold-deep focus:bg-ivory"
    : "field";
  const paragraphMuted = onLight ? "text-ink/60" : "text-ivory/50";

  const submitLabel =
    intent === "acquire"
      ? "Send Acquisition Request"
      : intent === "reserve"
        ? "Reserve This Piece"
        : intent === "restoration"
          ? "Send Restoration Request"
          : "Send to the Atelier";

  if (state.status === "success") {
    return (
      <div
        className={`rounded-sm border p-10 text-center ${
          onLight
            ? "border-gold/40 bg-ivory/60"
            : "border-gold/30 bg-ink/40"
        }`}
      >
        <div className="section-label">Deo Gratias</div>
        <p
          className={`font-serif text-2xl md:text-3xl leading-snug mt-4 ${
            onLight ? "text-ink" : "text-ivory"
          }`}
        >
          {state.message}
        </p>
        <div className="hairline mt-8 opacity-60" />
        <p
          className={`font-serif italic mt-6 ${
            onLight ? "text-ink/60" : "text-ivory/60"
          }`}
        >
          May the work of our hands be blessed.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-5" noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
      <input type="hidden" name="intent" value={intent} />
      {piece && <input type="hidden" name="piece" value={piece} />}
      {pieceSlug && <input type="hidden" name="pieceSlug" value={pieceSlug} />}

      {(title || intro) && (
        <header className="mb-2">
          {title && (
            <h3
              className={`font-display text-2xl tracking-wide ${
                onLight ? "text-ink" : "text-ivory"
              }`}
            >
              {title}
            </h3>
          )}
          {intro && (
            <p
              className={`font-serif mt-2 leading-relaxed ${
                onLight ? "text-ink/75" : "text-ivory/80"
              }`}
            >
              {intro}
            </p>
          )}
        </header>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className={`section-label ${labelClass}`}>Your name</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            className={`mt-2 w-full rounded-sm px-4 py-3 font-serif text-base border transition ${fieldClass}`}
          />
        </label>
        <label className="block">
          <span className={`section-label ${labelClass}`}>Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className={`mt-2 w-full rounded-sm px-4 py-3 font-serif text-base border transition ${fieldClass}`}
            placeholder="you@parish.org"
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className={`section-label ${labelClass}`}>Phone (optional)</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            className={`mt-2 w-full rounded-sm px-4 py-3 font-serif text-base border transition ${fieldClass}`}
          />
        </label>
        <label className="block">
          <span className={`section-label ${labelClass}`}>Shipping state (U.S.)</span>
          <input
            type="text"
            name="state"
            maxLength={40}
            placeholder="e.g. Massachusetts"
            className={`mt-2 w-full rounded-sm px-4 py-3 font-serif text-base border transition ${fieldClass}`}
          />
        </label>
      </div>

      {!piece && intent !== "restoration" && (
        <label className="block">
          <span className={`section-label ${labelClass}`}>Piece of interest (optional)</span>
          <input
            type="text"
            name="piece"
            className={`mt-2 w-full rounded-sm px-4 py-3 font-serif text-base border transition ${fieldClass}`}
            placeholder="e.g. Our Lady of Lourdes, vintage"
          />
        </label>
      )}

      {intent === "restoration" && (
        <label className="block">
          <span className={`section-label ${labelClass}`}>The piece to be restored</span>
          <input
            type="text"
            name="piece"
            className={`mt-2 w-full rounded-sm px-4 py-3 font-serif text-base border transition ${fieldClass}`}
            placeholder="e.g. 30-inch plaster Our Lady of Lourdes, c. 1930"
          />
        </label>
      )}

      <label className="block">
        <span className={`section-label ${labelClass}`}>
          {intent === "acquire"
            ? "Anything we should know?"
            : intent === "reserve"
              ? "Anything we should know?"
              : intent === "restoration"
                ? "Condition and scope"
                : "Your message"}
        </span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={5}
          className={`mt-2 w-full rounded-sm px-4 py-3 font-serif text-base border transition resize-y ${fieldClass}`}
          placeholder={
            intent === "restoration"
              ? "Age, damage, photographs can be emailed after we reply."
              : "Questions, requested delivery window, gift occasion — anything Rita should know."
          }
        />
      </label>

      {state.status === "error" && (
        <p className="font-serif text-rust/90 bg-rust/10 border border-rust/30 rounded-sm px-4 py-3">
          {state.message}
        </p>
      )}

      <div className={`rounded-sm border px-4 py-3 text-xs leading-relaxed font-serif ${
        onLight ? "border-ink/15 bg-parchment/70 text-ink/75" : "border-gold/20 bg-ink/50 text-ivory/70"
      }`}>
        <strong className="font-display tracking-[0.18em] uppercase text-[0.62rem]">
          U.S. shipping only ·
        </strong>{" "}
        Shipping &amp; handling is quoted after inquiry and paid by the buyer.
        Rita personally packs each piece for safe transport.{" "}
        <span className="italic opacity-90">Consultas en español bienvenidas.</span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <p className={`text-xs tracking-[0.2em] uppercase font-display ${paragraphMuted}`}>
          Private · no mailing lists · reply within two working days
        </p>
        <Submit label={submitLabel} />
      </div>
    </form>
  );
}
