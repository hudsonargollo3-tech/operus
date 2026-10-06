import { NextResponse } from 'next/server';

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  list(options?: { prefix?: string }): Promise<{ keys: Array<{ name: string }> }>;
}

interface LeadBody {
  name?: string;
  email?: string;
  crm?: string;
  uf?: string;
  specialty?: string;
  plano?: string;
  clinicName?: string;
}

// export const runtime = "edge"; // disabled for open-next compatibility

export async function POST(request: Request) {
  try {
    const body: LeadBody = await request.json().catch(() => ({}));

    const { name, email, crm, uf, specialty, plano, clinicName } = body;

    if (!email || !crm) {
      return NextResponse.json(
        { error: 'email and crm are required' },
        { status: 400 }
      );
    }

    const emailHash = await crypto
      .subtle.digest('SHA-256', new TextEncoder().encode(email.toLowerCase().trim()))
      .then((buf) => Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join(''));

    const timestamp = Date.now();
    const key = `lead:${timestamp}:${emailHash}`;

    const value = JSON.stringify({
      name: (name || '').slice(0, 120),
      email: email.toLowerCase().trim(),
      crm: crm.slice(0, 20),
      uf: (uf || '').slice(0, 2),
      specialty: (specialty || '').slice(0, 80),
      plano: (plano || '').slice(0, 30),
      clinicName: (clinicName || '').slice(0, 120),
      source: 'landing',
      created_at: new Date().toISOString(),
    });

    // Dedup: check if this email already has a lead in the last 24h
    const prefix = `lead:*:${emailHash}`;
    const LEADS_KV = (globalThis as unknown as { OPERUS_LEADS: KVNamespace }).OPERUS_LEADS;

    if (LEADS_KV) {
      try {
        const existing = await LEADS_KV.list({ prefix: `lead:*:${emailHash}` });
        if (existing.keys && existing.keys.length > 0) {
          // Already captured in last 24h — return 200 but skip store
          const redirectUrl = new URL('/cadastro', request.url);
          if (plano) redirectUrl.searchParams.set('plano', plano);
          return NextResponse.redirect(redirectUrl, 302);
        }
      } catch {
        // KV list not available in all bindings — continue to put
      }
    }

    if (LEADS_KV) {
      await LEADS_KV.put(key, value, { expirationTtl: 90 * 24 * 60 * 60 });
    }

    const redirectUrl = new URL('/cadastro', request.url);
    if (plano) redirectUrl.searchParams.set('plano', plano);
    return NextResponse.redirect(redirectUrl, 302);
  } catch (error) {
    return NextResponse.json(
      { error: 'internal error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'operus-leads' });
}