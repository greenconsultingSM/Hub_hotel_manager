import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { syncLeadToAc } from "@/lib/activecampaign";
import { EBOOK_COOKIE, ebookToken } from "@/lib/ebook";

// Sblocco reader ebook: i lead con source "ebook-*" ricevono il cookie firmato
// che apre i capitoli gated (decisione 2026-06-10: gate solo email, sblocco immediato).
function withEbookUnlock(res: NextResponse, source: string): NextResponse {
  if (source.startsWith("ebook-")) {
    res.cookies.set(EBOOK_COOKIE, ebookToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }
  return res;
}

// POST /api/lead, unica porta d'ingresso dei lead del sito.
// Flusso (decisioni gate 2026-06-10/11): valida → INSERT su Supabase (fonte di
// verità: il lead è salvo QUI) → sync ActiveCampaign best-effort (se fallisce o
// non è configurato: ac_synced=false, recupero via backfill). Mai bloccare
// l'utente per un problema di AC.

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

// Testo dell'informativa mostrata sotto i form: versionato qui perché va
// registrato come prova del consenso accanto a timestamp e fonte.
const CONSENSO_TESTO_VERSIONE = "informativa-v1-2026-06";

const SOURCES_VALIDE = /^[a-z0-9-]{2,64}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Rate-limit per IP, in-memory best-effort (per istanza serverless: protezione
// di base contro i burst, non un WAF; il vero limite duro è a livello Vercel).
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "payload non valido" }, { status: 400 });
  }

  // Honeypot anti-bot: campo invisibile che gli umani non compilano.
  if (typeof body.azienda === "string" && body.azienda.length > 0) {
    // risposta identica al successo: il bot non deve capire di essere stato scartato
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "troppi tentativi, riprova tra poco" }, { status: 429 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const nome = typeof body.nome === "string" ? body.nome.trim().slice(0, 120) : "";
  const source = typeof body.source === "string" ? body.source.trim() : "";
  const destinazione =
    body.destinazione === "gc" || body.destinazione === "staymore" || body.destinazione === "partner"
      ? body.destinazione
      : null;
  const payload = body.payload && typeof body.payload === "object" ? body.payload : null;

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "email non valida" }, { status: 400 });
  }
  if (!nome) {
    return NextResponse.json({ ok: false, error: "il nome è obbligatorio" }, { status: 400 });
  }
  if (!SOURCES_VALIDE.test(source)) {
    return NextResponse.json({ ok: false, error: "source non valida" }, { status: 400 });
  }

  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    // Backend non ancora configurato (pre-collegamento progetto).
    // In sviluppo lo sblocco ebook resta testabile (il lead NON viene salvato:
    // bypass dichiarato, solo NODE_ENV !== production). In produzione: errore onesto.
    if (process.env.NODE_ENV !== "production" && source.startsWith("ebook-")) {
      console.warn("[lead] DEV BYPASS: Supabase non configurato, sblocco ebook senza salvataggio lead");
      return withEbookUnlock(NextResponse.json({ ok: true, dev: true }), source);
    }
    return NextResponse.json({ ok: false, error: "servizio non disponibile" }, { status: 503 });
  }

  // 1. Supabase, fonte di verità. Client per-request (serverless-friendly).
  const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { persistSession: false },
  });

  const { data: lead, error: dbError } = await supabase
    .from("leads")
    .insert({
      email,
      nome,
      source,
      destinazione,
      payload,
      consenso_fonte: source,
      consenso_testo: CONSENSO_TESTO_VERSIONE,
    })
    .select("id")
    .single();

  if (dbError || !lead) {
    console.error("[lead] insert fallito:", dbError?.message);
    return NextResponse.json({ ok: false, error: "salvataggio non riuscito, riprova" }, { status: 500 });
  }

  // 2. ActiveCampaign, best-effort: l'esito non cambia la risposta all'utente.
  const ac = await syncLeadToAc({ email, nome, source, destinazione });
  if (ac.synced) {
    await supabase
      .from("leads")
      .update({ ac_synced: true, ac_contact_id: ac.contactId, ac_synced_at: new Date().toISOString() })
      .eq("id", lead.id);
  } else if (!("skipped" in ac && ac.skipped)) {
    await supabase.from("leads").update({ ac_error: ac.error }).eq("id", lead.id);
  }

  return withEbookUnlock(NextResponse.json({ ok: true }), source);
}
