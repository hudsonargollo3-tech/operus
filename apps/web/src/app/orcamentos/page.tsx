'use client';

import React from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import { FileText, Plus, Search, DollarSign, Share2, CheckCircle2, Clock, Download } from 'lucide-react';

export default function OrcamentosPage() {
  const orcamentos = [
    {
      id: 'ORC-1042',
      paciente: 'Claudio Henrique Mendes',
      procedimento: 'Termoablação Endovenosa a Laser (Safenectomia Térmica)',
      valorTotal: 'R$ 14.500,00',
      status: 'aprovado',
      data: '28/09/2026',
      detalhes: 'Honorários (R$ 8.500) + Taxa Hospitalar (R$ 3.800) + Fibra Laser (R$ 2.200)'
    },
    {
      id: 'ORC-1043',
      paciente: 'Silvia Helena Castro',
      procedimento: 'Tratamento de Telangiectasias e Microvarizes (CLACS - 3 Sessões)',
      valorTotal: 'R$ 4.200,00',
      status: 'enviado',
      data: '29/09/2026',
      detalhes: 'Pacote 3 sessões Laser ND:YAG + Crioescleroterapia'
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          title="Orçamentos Cirúrgicos"
          subtitle="Composição de honorários, materiais e geração de propostas para pacientes"
        />

        <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Propostas Emitidas</h2>
              <p className="text-xs text-slate-500">Acompanhe orçamentos particulares e coparticipações</p>
            </div>

            <button className="flex items-center gap-1.5 bg-operus-700 hover:bg-operus-800 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-xs transition">
              <Plus className="w-4 h-4 text-lime-300" />
              <span>Novo Orçamento</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orcamentos.map((orc) => (
              <div key={orc.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-operus-50 text-operus-800 flex items-center justify-center font-bold text-xs border border-operus-200">
                      {orc.id}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{orc.paciente}</h3>
                      <p className="text-xs text-slate-400">{orc.data}</p>
                    </div>
                  </div>

                  {orc.status === 'aprovado' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Aprovado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      <Clock className="w-3.5 h-3.5" /> Aguardando
                    </span>
                  )}
                </div>

                <div className="text-xs space-y-1">
                  <p className="font-semibold text-slate-800">{orc.procedimento}</p>
                  <p className="text-slate-500">{orc.detalhes}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Total Proposta</span>
                    <p className="text-lg font-bold text-operus-800">{orc.valorTotal}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700">
                      <Share2 className="w-3.5 h-3.5 text-emerald-600" /> Compartilhar
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-medium text-white">
                      <Download className="w-3.5 h-3.5" /> PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
