import { LeadStatus } from '@/app/api/leads/route';

interface Lead {
  id: string;
  name: string;
  email: string;
  crm: string;
  uf: string;
  specialty: string;
  plano: string;
  clinicName: string;
  utm_source: string;
  utm_campaign: string;
  landing_page: string;
  status: LeadStatus;
  status_history: Array<{
    status: LeadStatus;
    timestamp: string;
    note?: string;
  }>;
  created_at: string;
  updated_at: string;
  next_action?: string;
}

interface CreateLeadParams {
  name?: string;
  email: string;
  crm: string;
  uf?: string;
  specialty?: string;
  plano?: string;
  clinicName?: string;
  utm_source?: string;
  utm_campaign?: string;
  landing_page?: string;
}

interface UpdateStatusParams {
  leadId: string;
  status: LeadStatus;
  note?: string;
  next_action?: string;
}

// Create a new lead
export async function createLead(params: CreateLeadParams): Promise<{ success: boolean; lead_id: string; status: LeadStatus; created_at: string }> {
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to create lead');
  }
  
  return res.json();
}

// Get a single lead by ID
export async function getLead(leadId: string): Promise<Lead> {
  const res = await fetch(`/api/leads?id=${leadId}`);
  
  if (!res.ok) {
    throw new Error('Lead not found');
  }
  
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}

// Get leads by status
export async function getLeadsByStatus(status: LeadStatus): Promise<{ leads: Lead[] }> {
  const res = await fetch(`/api/leads?status=${status}`);
  
  if (!res.ok) {
    return { leads: [] };
  }
  
  return res.json();
}

// Get all lead IDs
export async function getLeadIds(): Promise<{ lead_ids: string[] }> {
  const res = await fetch('/api/leads');
  return res.json();
}

// Update lead status
export async function updateLeadStatus(params: UpdateStatusParams): Promise<{ success: boolean; lead: Lead }> {
  const res = await fetch(`/api/leads?id=${params.leadId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: params.status,
      note: params.note,
      next_action: params.next_action,
    }),
  });
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to update lead status');
  }
  
  return res.json();
}

// Delete a lead
export async function deleteLead(leadId: string): Promise<{ success: boolean }> {
  const res = await fetch(`/api/leads?id=${leadId}`, {
    method: 'DELETE',
  });
  
  if (!res.ok) {
    throw new Error('Failed to delete lead');
  }
  
  return res.json();
}

// Lead status workflow definitions
export const LEAD_STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; description: string; next: LeadStatus | null }> = {
  new_lead: {
    label: 'Novo Lead',
    color: 'bg-blue-100 text-blue-800',
    description: 'Lead capturado automaticamente',
    next: 'contacted',
  },
  contacted: {
    label: 'Contatado',
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Primeiro contato com o paciente realizado',
    next: 'qualified',
  },
  qualified: {
    label: 'Qualificado',
    color: 'bg-indigo-100 text-indigo-800',
    description: 'Interesse comprovado, agendando demonstração',
    next: 'demo_scheduled',
  },
  demo_scheduled: {
    label: 'Demo Agendada',
    color: 'bg-purple-100 text-purple-800',
    description: 'Sessão demonstrativa marcada',
    next: 'converted',
  },
  converted: {
    label: 'Convertido',
    color: 'bg-green-100 text-green-800',
    description: 'Paciente fechou plano',
    next: null,
  },
  won: {
    label: 'Vendido',
    color: 'bg-emerald-200 text-emerald-900',
    description: 'Lead fechado com sucesso',
    next: null,
  },
  lost: {
    label: 'Perdido',
    color: 'bg-gray-100 text-gray-800',
    description: 'Lead não converteu após esforço',
    next: null,
  },
};

// Default CTA messages for each plan
export const PLAN_CTA_MESSAGES: Record<string, { title: string; description: string }> = {
  solo: {
    title: 'Comece com Solo Start',
    description: 'Para cirurgiões individuais iniciando a digitalização da rotina.',
  },
  consultorio: {
    title: 'Kit do Consultório',
    description: 'Para até 3 médicos com gestão financeira completa.',
  },
  equipe: {
    title: 'Equipe Pro - Recomendado',
    description: 'Governança completa com TCLE digital e auditoria TUSS.',
  },
  enterprise: {
    title: 'Enterprise',
    description: 'Para clínicas e redes com múltiplos CNPJs.',
  },
};