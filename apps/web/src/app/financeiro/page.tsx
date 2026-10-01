'use client';

import React, { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  Users,
  Search,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function FinanceiroPage() {
  const [filterStatus, setFilterStatus] = useState('todos');

  const repasses = [
    {
      id: 'REP-401',
      cirurgia: 'CIR-892 • Artroplastia Total de Quadril',
      paciente: 'Mariana Silveira Leite',
      convenio: 'Bradesco Saúde',
      dataCirurgia: '29/09/2026',
      valorBruto: 14500,
      cirurgiaoPrincipal: 10150, // 70%
      primeiroAuxiliar: 2900,   // 20%
      instrumentador: 1450,     // 10%
      status: 'pendente',
      previsaoPagamento: '15/11/2026',
      glosas: 0
    },
    {
      id: 'REP-402',
      cirurgia: 'CIR-890 • Safenectomia Bilateral',
      paciente: 'Maria Aparecida dos Santos',
      convenio: 'Bradesco Saúde',
      dataCirurgia: '15/09/2026',
      valorBruto: 9200,
      cirurgiaoPrincipal: 6440,
      primeiroAuxiliar: 1840,
      instrumentador: 920,
      status: 'pago',
      previsaoPagamento: '30/09/2026',
      glosas: 0
    },
    {
      id: 'REP-403',
      cirurgia: 'CIR-887 • Osteotomia de Tíbia',
      paciente: 'Roberto Carlos Oliveira',
      convenio: 'SulAmérica',
      dataCirurgia: '10/09/2026',
      valorBruto: 11200,
      cirurgiaoPrincipal: 7840,
      primeiroAuxiliar: 2240,
      instrumentador: 1120,
      status: 'glosado_parcial',
      previsaoPagamento: 'Em Recurso',
      glosas: 1450
    }
  ];

  const filtered = repasses.filter((r) => {
    if (filterStatus === 'todos') return true;
    return r.status === filterStatus;
  });

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          title="Gestão Financeira & Repasse de Honorários"
          subtitle="Previsão de recebíveis, divisão de honorários da equipe cirúrgica e prevenção de glosas"
        />

        <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* KPI Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-1.5">
              <span className="text-xs font-semibold text-slate-500">Honorários a Receber</span>
              <p className="text-2xl font-extrabold text-slate-900 font-heading">R$ 64.200</p>
              <span className="text-[11px] text-blue-600 font-medium">8 cirurgias em liquidação</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-1.5">
              <span className="text-xs font-semibold text-slate-500">Repassado à Equipe no Mês</span>
              <p className="text-2xl font-extrabold text-emerald-600 font-heading">R$ 28.400</p>
              <span className="text-[11px] text-emerald-700 font-medium">Auxiliares, anestesistas e instrumentação</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-1.5">
              <span className="text-xs font-semibold text-slate-500">Taxa de Glosas</span>
              <p className="text-2xl font-extrabold text-slate-900 font-heading">1.1%</p>
              <span className="text-[11px] text-emerald-600 font-bold">Abaixo da média nacional (8.4%)</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-1.5">
              <span className="text-xs font-semibold text-slate-500">Prazo Médio de Liquidação</span>
              <p className="text-2xl font-extrabold text-indigo-600 font-heading">38 dias</p>
              <span className="text-[11px] text-slate-500">Ciclo médio de convênios</span>
            </div>
          </div>

          {/* Action & Filter Bar */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Extrato de Procedimentos & Repasses</h3>
              <p className="text-xs text-slate-500">Divisão transparente de honorários por função operatória</p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'pendente', label: '⏳ A Receber' },
                { id: 'pago', label: '✓ Pagos' },
                { id: 'glosado_parcial', label: '⚠️ Glosados/Recurso' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterStatus(tab.id)}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    filterStatus === tab.id
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Surgeries Fee Breakdown Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <div key={item.id} className="p-5 hover:bg-slate-50 transition space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          {item.id}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{item.cirurgia}</h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          item.status === 'pago'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : item.status === 'pendente'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}>
                          {item.status === 'pago' ? '✓ Pago' : item.status === 'pendente' ? '⏳ Em Processamento' : '⚠️ Glosa em Recurso'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Paciente: <strong className="text-slate-700">{item.paciente}</strong> • Convênio: {item.convenio} • Data: {item.dataCirurgia}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-400 font-medium">Valor Total da Fatura</span>
                      <p className="text-base font-extrabold text-slate-900 font-mono">
                        R$ {item.valorBruto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  {/* Team Fee Split Chips */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 text-blue-900">
                      <div className="flex justify-between">
                        <span className="font-semibold">Cirurgião Titular (70%)</span>
                        <strong className="font-mono">R$ {item.cirurgiaoPrincipal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                      <div className="flex justify-between">
                        <span className="font-medium">1º Auxiliar (20%)</span>
                        <strong className="font-mono">R$ {item.primeiroAuxiliar.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                      <div className="flex justify-between">
                        <span className="font-medium">Instrumentador (10%)</span>
                        <strong className="font-mono">R$ {item.instrumentador.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Payment Terms */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span>Previsão de Depósito: <strong className="text-slate-800">{item.previsaoPagamento}</strong></span>
                    <button className="text-blue-600 font-bold hover:underline cursor-pointer">
                      Ver Demonstrativo Detalhado →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
