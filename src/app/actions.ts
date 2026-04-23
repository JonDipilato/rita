"use server";

import { mkdir, appendFile } from "node:fs/promises";
import { resolve } from "node:path";

export type Intent =
  | "acquire"
  | "reserve"
  | "restoration"
  | "general"
  | "notify";

export type ContactState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export async function submitInquiry(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const state = String(formData.get("state") ?? "").trim();
  const intent = String(formData.get("intent") ?? "general").trim() as Intent;
  const piece = String(formData.get("piece") ?? "").trim();
  const pieceSlug = String(formData.get("pieceSlug") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const honey = String(formData.get("website") ?? "").trim();

  if (honey) return { status: "success", message: "Thank you." };

  if (!name || name.length < 2) {
    return { status: "error", message: "Please share your full name." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "A valid email is needed so Rita can reply." };
  }
  if (intent !== "notify" && (!message || message.length < 10)) {
    return {
      status: "error",
      message: "Please tell Rita a little more — at least a sentence.",
    };
  }

  const entry = {
    at: new Date().toISOString(),
    intent,
    piece,
    pieceSlug,
    name,
    email,
    phone,
    state,
    message,
  };

  try {
    const dir = resolve(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(
      resolve(dir, "inquiries.jsonl"),
      JSON.stringify(entry) + "\n",
      "utf8",
    );
  } catch {
    // non-fatal
  }

  const ack: Record<Intent, string> = {
    acquire:
      "Your request has been received. Rita will reply personally within two working days with the total including shipping & handling (U.S. destinations).",
    reserve:
      "Your reservation is noted. Rita will hold the piece for 48 hours while she confirms availability and writes to you.",
    restoration:
      "Your restoration inquiry has been received. Rita will reply within two working days with an assessment and estimate.",
    general:
      "Your message has been received. Rita or a member of her studio will reply within two working days.",
    notify:
      "You’re on the list. When a similar piece arrives at the atelier, Rita will write to you personally.",
  };

  return { status: "success", message: ack[intent] ?? ack.general };
}
