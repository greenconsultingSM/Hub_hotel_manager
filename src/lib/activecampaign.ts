// Sync ActiveCampaign (account Staymore), SOLO lato server.
// Best-effort by design: se le env mancano o l'API fallisce, il chiamante salva
// comunque il lead su Supabase con ac_synced=false e si recupera col backfill.
// Decisioni (gate 2026-06-10/11): namespace "Hub" nell'account condiviso;
// 2 liste (Newsletter, Waitlist Ebook); tag hub:source:* e hub:lead:*;
// lead GC = solo tag di notifica, niente liste/nurturing.

const AC_URL = process.env.AC_API_URL; // es. https://<account>.api-us1.com
const AC_KEY = process.env.AC_API_KEY;

// ID liste nell'account AC (si valorizzano dopo la fotografia dell'account).
const LIST_NEWSLETTER = process.env.AC_LIST_NEWSLETTER_ID;
const LIST_WAITLIST = process.env.AC_LIST_WAITLIST_ID;

export type AcSyncInput = {
  email: string;
  nome?: string;
  source: string;
  destinazione?: "gc" | "staymore" | "partner" | null;
};

export type AcSyncResult =
  | { synced: true; contactId: string }
  | { synced: false; skipped: true } // env assenti: non è un errore
  | { synced: false; skipped?: false; error: string };

export function acConfigured(): boolean {
  return Boolean(AC_URL && AC_KEY);
}

async function ac(path: string, body: unknown): Promise<Response> {
  return fetch(`${AC_URL}/api/3/${path}`, {
    method: "POST",
    headers: { "Api-Token": AC_KEY as string, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    // il submit dell'utente non deve mai aspettare AC oltre il ragionevole
    signal: AbortSignal.timeout(5000),
  });
}

// La waitlist ebook ha la sua lista (promessa email distinta); tutto il resto
// confluisce nella newsletter. I tag portano source e routing.
function listFor(source: string): string | undefined {
  return source === "guida-disintermediazione" ? LIST_WAITLIST : LIST_NEWSLETTER;
}

export async function syncLeadToAc(input: AcSyncInput): Promise<AcSyncResult> {
  if (!acConfigured()) return { synced: false, skipped: true };

  try {
    // 1. contact/sync: crea o aggiorna per email (idempotente)
    const syncRes = await ac("contact/sync", {
      contact: { email: input.email, firstName: input.nome ?? "" },
    });
    if (!syncRes.ok) return { synced: false, error: `contact/sync ${syncRes.status}` };
    const contactId: string | undefined = (await syncRes.json())?.contact?.id;
    if (!contactId) return { synced: false, error: "contact/sync: id mancante" };

    // 2. iscrizione alla lista (status 1 = attivo; il double opt-in, se Staymore
    //    lo sceglierà, passa dall'automation innescata dal tag pending-confirm)
    const listId = listFor(input.source);
    if (listId) {
      const listRes = await ac("contactLists", {
        contactList: { list: listId, contact: contactId, status: 1 },
      });
      if (!listRes.ok) return { synced: false, error: `contactLists ${listRes.status}` };
    }

    // 3. tag: provenienza sempre; routing solo se presente.
    //    I tag si riferiscono per NOME via l'endpoint contactTags richiede l'id del
    //    tag: per semplicità il mapping nome→id si risolve alla fotografia
    //    dell'account (env AC_TAG_*); finché mancano, si salta senza errore.
    const tagIds = [
      process.env[`AC_TAG_SOURCE_${input.source.toUpperCase().replace(/-/g, "_")}`],
      input.destinazione ? process.env[`AC_TAG_LEAD_${input.destinazione.toUpperCase()}`] : undefined,
    ].filter(Boolean) as string[];
    for (const tag of tagIds) {
      await ac("contactTags", { contactTag: { contact: contactId, tag } });
    }

    return { synced: true, contactId };
  } catch (err) {
    return { synced: false, error: err instanceof Error ? err.message : "errore sconosciuto" };
  }
}
