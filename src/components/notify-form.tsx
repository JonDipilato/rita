"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitInquiry, type ContactState } from "@/app/actions";

const initial: ContactState = { status: "idle" };

type Props = {
  piece: string;
  pieceSlug: string;
  tone?: "dark" | "light";
};

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary font-display text-[0.68rem] tracking-[0.28em] uppercase px-5 py-3 rounded-sm disabled:opacity-60"
    >
      {pending ? "Saving…" : "Notify Me"}
    </button>
  );
}

export function NotifyForm({ piece, pieceSlug, tone = "light" }: Props) {
  const [state, action] = useActionState(submitInquiry, initial);
  const onLight = tone === "light";

  if (state.status === "success") {
    return (
      <div
        className={`rounded-sm border px-5 py-4 text-sm font-serif ${
          onLight
            ? "border-gold/40 bg-ivory text-ink"
            : "border-gold/30 bg-ink/50 text-ivory"
        }`}
      >
        {state.message}
      </div>
    );
  }

  const fieldBase =
    "w-full rounded-sm px-3 py-2 font-serif text-sm border transition";
  const fieldTone = onLight
    ? "bg-ivory border-ink/15 text-ink placeholder:text-ink/40 focus:border-gold-deep"
    : "bg-ink/60 border-gold/20 text-ivory placeholder:text-ivory/40 focus:border-gold-hi";

  return (
    <form
      action={action}
      className={`rounded-sm border px-5 py-4 ${
        onLight ? "border-gold/30 bg-ivory/60" : "border-gold/30 bg-ink/40"
      }`}
      noValidate
    >
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
      <input type="hidden" name="intent" value="notify" />
      <input type="hidden" name="piece" value={piece} />
      <input type="hidden" name="pieceSlug" value={pieceSlug} />
      <input
        type="hidden"
        name="message"
        value={`Notify me when similar pieces to "${piece}" arrive.`}
      />

      <div
        className={`section-label ${onLight ? "text-gold-deep" : "text-gold-hi/80"}`}
      >
        Notify me when similar pieces arrive
      </div>
      <p
        className={`font-serif text-sm mt-2 leading-relaxed ${
          onLight ? "text-ink/70" : "text-ivory/70"
        }`}
      >
        Rita restores a handful of new pieces each month. Leave your name — no
        mailing list, no marketing. One personal note when the next similar
        piece is ready.
      </p>

      <div className="mt-4 grid sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
        <label className="block">
          <span className="sr-only">Your name</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={`${fieldBase} ${fieldTone}`}
          />
        </label>
        <label className="block">
          <span className="sr-only">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@parish.org"
            className={`${fieldBase} ${fieldTone}`}
          />
        </label>
        <Submit />
      </div>

      {state.status === "error" && (
        <p className="font-serif text-rust/90 bg-rust/10 border border-rust/30 rounded-sm px-3 py-2 text-xs mt-3">
          {state.message}
        </p>
      )}
    </form>
  );
}
