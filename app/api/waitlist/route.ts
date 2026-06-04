import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export const dynamic = "force-dynamic";

const STORE = path.join(process.cwd(), "data", "waitlist.jsonl");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Early-access signup endpoint. Appends each valid signup as one JSON line to
 * data/waitlist.jsonl (created on first use). This is intentionally a simple,
 * dependency-free store so the site works the moment you run it — swap the
 * `persist()` body for your email provider (Formspree, ConvertKit, Resend,
 * Supabase, …) when you go live.
 */
async function persist(entry: Record<string, unknown>) {
  await fs.mkdir(path.dirname(STORE), { recursive: true });
  await fs.appendFile(STORE, JSON.stringify(entry) + "\n", "utf8");
}

export async function POST(req: Request) {
  let body: { email?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 422 });
  }

  try {
    await persist({
      email,
      source: typeof body.source === "string" ? body.source.slice(0, 40) : "site",
      at: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Couldn't save right now — please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, message: "You're on the early-access list." });
}
