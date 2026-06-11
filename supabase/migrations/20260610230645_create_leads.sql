-- Tabella leads: event-log dei contatti raccolti dal sito (ogni submission = una riga).
-- Fonte di verità: Supabase. Il dedupe per email lo fa ActiveCampaign (contact/sync è
-- idempotente). Decisioni: brainstorming/gate 2026-06-10/11 (Supabase-first + sync AC).

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- dati del contatto (nome obbligatorio a livello form; nullable qui per import/backfill)
  email text not null,
  nome text,
  struttura text,

  -- routing per bisogno (handoff): gc = Green Consulting, staymore = Staymore
  destinazione text check (destinazione in ('gc', 'staymore', 'partner')),

  -- provenienza (aggiornamenti, glossario, calcolatore, guida-disintermediazione, articolo-<slug>, …)
  source text not null,

  -- dati extra del form (es. input/risultato del calcolatore, con menzione in informativa)
  payload jsonb,

  -- prova del consenso (GDPR): quando, da quale form, con quale testo informativa
  consenso_ts timestamptz not null default now(),
  consenso_fonte text not null,
  consenso_testo text,

  -- stato sincronizzazione ActiveCampaign (per backfill e debug)
  ac_synced boolean not null default false,
  ac_contact_id text,
  ac_synced_at timestamptz,
  ac_error text
);

comment on table public.leads is
  'Event-log lead del sito Hub Hotel Manager. Insert SOLO via route server (service role); nessun accesso client.';

-- RLS attiva, NESSUNA policy: la tabella è invisibile ad anon/authenticated.
-- La route server usa la secret key (bypassa RLS by design).
alter table public.leads enable row level security;

-- indici operativi
create index leads_email_idx on public.leads (email);
create index leads_source_idx on public.leads (source);
create index leads_pending_sync_idx on public.leads (ac_synced) where ac_synced = false;
