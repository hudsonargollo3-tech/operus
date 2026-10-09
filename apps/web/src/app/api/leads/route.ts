import { NextRequest, NextResponse } from 'next/server';

// Lead statuses
export type LeadStatus = 'new_lead' | 'contacted' | 'qualified' | 'demo_scheduled' | 'converted' | 'won' | 'lost';

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: { prefix?: string; limit?: number }): Promise<{ keys: Array<{ name: string }> }>;
}

interface StatusHistoryItem {
  status: LeadStatus;
  timestamp: string;
  note?: string;
}

interface LeadBody {
  name?: string;
  email?: string;
  crm?: string;
  uf?: string;
  specialty?: string;
  plano?: string;
  clinicName?: string;
  utm_source?: string;
  utm_campaign?: string;
  landing_page?: string;
}

interface Lead extends LeadBody {
  id: string;
  status: LeadStatus;
  status_history: StatusHistoryItem[];
  created_at: string;
  updated_at: string;
  next_action?: string;
}

interface UpdateStatusBody {
  status: LeadStatus;
  note?: string;
  next_action?: string;
}

const LEADS_KV = (globalThis as unknown as { OPERUS_LEADS: KVNamespace }).OPERUS_LEADS;

function generateLeadId(email: string): string {
  const emailHash = Buffer.from(email.toLowerCase().trim())
    .toString('base64')
    .replace(/[^a-zA-Z0-9]/g, '')
    .substring(0, 8);
  return `lead_${Date.now()}_${emailHash}`;
}

// Handle different methods based on URL
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const leadId = url.searchParams.get('id');
    const status = url.searchParams.get('status');
    
    // GET /api/leads?id=xxx - get single lead
    if (leadId) {
      if (!LEADS_KV) {
        return NextResponse.json({ error: 'KV not configured' }, { status: 500 });
      }

      const key = `lead:${leadId}`;
      const data = await LEADS_KV.get(key);
      
      if (!data) {
        return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
      }

      return NextResponse.json(JSON.parse(data));
    }

    // GET /api/leads?status=xxx - get leads by status
    if (status) {
      if (!LEADS_KV) {
        return NextResponse.json({ leads: [] });
      }

      const listResult = await LEADS_KV.list({ prefix: 'lead:' });
      const leads: Lead[] = [];

      for (const keyObj of listResult.keys) {
        const data = await LEADS_KV.get(keyObj.name);
        if (data) {
          const lead = JSON.parse(data) as Lead;
          if (lead.status === status) {
            leads.push(lead);
          }
        }
      }

      return NextResponse.json({ leads });
    }

    // GET /api/leads - list all lead IDs
    if (!LEADS_KV) {
      return NextResponse.json({ leads: [] });
    }

    const listResult = await LEADS_KV.list({ prefix: 'lead:' });
    return NextResponse.json({ lead_ids: listResult.keys.map(k => k.name) });

  } catch (error) {
    return NextResponse.json(
      { error: 'internal error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: LeadBody = await request.json().catch(() => ({}));
    const { name, email, crm, uf, specialty, plano, clinicName, utm_source, utm_campaign, landing_page } = body;

    if (!email || !crm) {
      return NextResponse.json(
        { error: 'email and crm are required' },
        { status: 400 }
      );
    }

    const leadId = generateLeadId(email);
    const key = `lead:${leadId}`;

    const lead: Lead = {
      id: leadId,
      name: (name || '').slice(0, 120),
      email: email.toLowerCase().trim(),
      crm: crm.slice(0, 20),
      uf: (uf || 'SP').slice(0, 2),
      specialty: (specialty || 'Cirurgia Geral').slice(0, 80),
      plano: (plano || '').slice(0, 30),
      clinicName: (clinicName || '').slice(0, 120),
      utm_source: utm_source || 'landing',
      utm_campaign: utm_campaign || '',
      landing_page: landing_page || '/',
      status: 'new_lead',
      status_history: [
        { 
          status: 'new_lead', 
          timestamp: new Date().toISOString(),
          note: 'Initial lead capture' 
        }
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (LEADS_KV) {
      await LEADS_KV.put(key, JSON.stringify(lead), { expirationTtl: 90 * 24 * 60 * 60 });
    }

    return NextResponse.json({ 
      success: true, 
      lead_id: leadId,
      status: lead.status,
      created_at: lead.created_at,
      next_steps: ['contact_scheduled', 'send_welcome_package']
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: 'internal error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const leadId = url.searchParams.get('id');
    
    if (!leadId) {
      return NextResponse.json({ error: 'lead id is required' }, { status: 400 });
    }

    const body: UpdateStatusBody = await request.json();
    const { status, note, next_action } = body;

    if (!status) {
      return NextResponse.json({ error: 'status is required' }, { status: 400 });
    }

    if (!LEADS_KV) {
      return NextResponse.json({ error: 'KV not configured' }, { status: 500 });
    }

    const key = `lead:${leadId}`;
    const existingData = await LEADS_KV.get(key);
    
    if (!existingData) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    const lead = JSON.parse(existingData) as Lead;
    
    const updatedLead: Lead = {
      ...lead,
      status,
      next_action: next_action,
      updated_at: new Date().toISOString(),
      status_history: [
        ...lead.status_history,
        { status, timestamp: new Date().toISOString(), note }
      ]
    };

    await LEADS_KV.put(key, JSON.stringify(updatedLead), { expirationTtl: 90 * 24 * 60 * 60 });

    return NextResponse.json({ 
      success: true, 
      lead: updatedLead 
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'internal error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const leadId = url.searchParams.get('id');
    
    if (!leadId) {
      return NextResponse.json({ error: 'lead id is required' }, { status: 400 });
    }

    if (!LEADS_KV) {
      return NextResponse.json({ error: 'KV not configured' }, { status: 500 });
    }

    const key = `lead:${leadId}`;
    await LEADS_KV.delete(key);

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json(
      { error: 'internal error' },
      { status: 500 }
    );
  }
}