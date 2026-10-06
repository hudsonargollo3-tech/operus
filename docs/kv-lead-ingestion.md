# KV Lead Ingestion Design — Operus Surgical Suite

## Context
Replacing the stub Supabase-based lead capture (currently unused in cadastro form) with Cloudflare KV for the landing page /cadastro flow.

## Architecture

```
User → Landing Page (page.tsx) → /api/leads [Edge Function] → Cloudflare KV (OPERUS_LEADS)
                                                        → Redirect /cadastro?plano=X
```

## KV Schema

- **Namespace:** `OPERUS_LEADS`
- **Key pattern:** `lead:{timestamp}:{sha256(email)}`
- **Value JSON:**
  ```json
  {
    "name": "Dr. Carlos Silva",
    "email": "carlos@exemplo.com.br",
    "crm": "123456",
    "uf": "SP",
    "specialty": "Ortopedia",
    "plano": "equipe",
    "source": "landing",
    "created_at": "2026-10-06T14:30:00Z"
  }
  ```
- **TTL:** 90 days
- **Dedup:** KV get by email hash → 24h cooldown

## wrangler.toml Changes

Add to existing config:
```toml
[[kv_namespaces]]
binding = "LEADS_KV"
id = "<namespace_id>"
preview_id = "<preview_id>"
```

## Route: `/api/leads` (Edge Function)

```ts
// apps/web/src/app/api/leads/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, crm, uf, specialty, plano } = body;

  // Validation
  if (!email || !crm) {
    return NextResponse.json({ error: 'email and crm required' }, { status: 400 });
  }

  const emailHash = crypto.subtle.digest('SHA-256', new TextEncoder().encode(email));
  const key = `lead:${Date.now()}:${emailHash}`;

  const value = JSON.stringify({
    name, email, crm, uf, specialty, plano,
    source: 'landing',
    created_at: new Date().toISOString()
  });

  // Dedup check via KV get
  // KV put with TTL
  // Redirect 302 to /cadastro?plano=X
}
```

## Landing Page Integration

Update `apps/web/src/app/page.tsx` CTA buttons to POST to `/api/leads` before redirecting to `/cadastro`.

## Files to Create/Modify

1. `apps/web/src/app/api/leads/route.ts` — new Edge route
2. `apps/web/wrangler.jsonc` — add KV namespace binding
3. `apps/web/src/app/page.tsx` — wire CTAs to POST /api/leads
4. `apps/web/src/app/cadastro/page.tsx` — read `?plano=` query param, pre-select plan

## Notes
- No Supabase dependency for leads (per stakeholder request)
- KV is eventually consistent — acceptable for lead capture
- Consider adding a Cloudflare Analytics event for conversion tracking
- LGPD: no sensitive health data in leads, only email hash for dedup