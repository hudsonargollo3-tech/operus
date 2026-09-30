'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function TenantDashboardPage() {
  const [activeFilter, setActiveFilter] = useState('Todas');

  const surgeries = [
    {
      id: 'CIR-892',
      patient: 'Mariana Silveira Leite',
      hospital: 'Hospital Sírio-Libanês — Sala 04',
      date: 'Amanhã • 07:30',
      procedure: 'Artroplastia Total de Quadril Não Cimentada (TUSS 30724016)',
      secondary: 'Tenotomia de Adutores (TUSS 30713022 - 70%)',
      team: 'Dr. Lucas Arantes (Titular) • Dr. André V. (Aux 1) • Dra. Beatriz (Anest)',
      opme: 'Prótese Cerâmica Stryker (Entregue no Hospital)',
      tcleStatus: 'Assinado Digitalmente',
      status: 'Confirmada',
      honorarios: 'R$ 14.500'
    },
    {
      id: 'CIR-893',
      patient: 'Carlos Eduardo Fontes',
      hospital: 'Hospital Albert Einstein — Sala 12',
      date: 'Sexta-feira • 13:00',
      procedure: 'Reconstrução de Ligamento Cruzado Anterior - LCA (TUSS 30726116)',
      secondary: 'Meniscectomia Parcial por Artroscopia (TUSS 30726051 - 70%)',
      team: 'Dr. Lucas Arantes (Titular) • Dra. Helena (Aux 1)',
      opme: 'Parafuso de Interferência & Enxerto (Autorizado)',
      tcleStatus: 'Aguardando Assinatura do Paciente',
      status: 'Pendente TCLE',
      honorarios: 'R$ 9.800'
    },
    {
      id: 'CIR-894',
      patient: 'Beatriz Vasconcelos',
      hospital: 'Hospital Nove de Julho — Sala 02',
      date: '03/10 • 08:00',
      procedure: 'Osteotomia Corretiva de Tíbia (TUSS 30722129)',
      secondary: 'Fixação Interna com Placa Bloqueada',
      team: 'Dr. Lucas Arantes (Titular) • Dr. Rafael (Aux 1)',
      opme: 'Placa LCP Synthes (Aguardando Retirada Fornecedor)',
      tcleStatus: 'Assinado Digitalmente',
      status: 'Pendente OPME',
      honorarios: 'R$ 11.200'
    }
  ];

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col antialiased selection:bg-[#1B58D6] selection:text-white">
      {/* Clinic Panel Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2766E6] to-[#1646BB] border border-blue-400/30 flex items-center justify-center shadow-md">
            <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="rotate(15 20 20)">
                <path d="M14.2 14.6 a8.6 8.6 0 1 0 11.6 0" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round"/>
                <g fill="#ffffff">
                  <rect x="18.9" y="10.6" width="2.2" height="5.4" rx="0.5"/>
                  <rect x="18.7" y="15.8" width="2.6" height="0.8"/>
                  <path d="M18.7 16.6 L21.3 16.6 L21.3 19.4 Q21.3 21.2 20 21.2 Q18.7 21.0 18.7 19.4 Z"/>
                </g>
              </g>
            </svg>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white font-heading">Instituto Cirúrgico Paulista</h1>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-300 border border-blue-500/30">
                Dr. Lucas Arantes (CRM 142.890-SP)
              </span>
            </div>
            <p className="text-xs text-slate-400">Central Cirúrgica & Governança Operatória</p>
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-2.5 text-xs">
          <Link href="/cirurgias" className="px-3.5 py-1.5 bg-[#1B58D6] hover:bg-[#2766E6] text-white font-bold rounded-xl transition shadow-md shadow-blue-900/30">
            + Agendar Cirurgia
          </Link>
          <Link href="/orcamentos" className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition">
            Novo Orçamento
          </Link>
          <Link href="/blueprint" className="px-3.5 py-1.5 border border-slate-700 text-slate-300 rounded-xl hover:bg-slate-800 transition">
            Blueprint & Specs
          </Link>
        </div>
      </header>

      {/* Main Panel Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-6">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
            <span className="text-xs text-slate-400 font-semibold">Cirurgias no Mês (Outubro)</span>
            <p className="text-2xl font-extrabold text-white font-heading">18 Procedimentos</p>
            <span className="text-[11px] text-sky-400">4 esta semana</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
            <span className="text-xs text-slate-400 font-semibold">Previsão de Honorários</span>
            <p className="text-2xl font-extrabold text-emerald-400 font-heading">R$ 148.900</p>
            <span className="text-[11px] text-slate-400">Cálculo TUSS 100/70/50% auditado</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
            <span className="text-xs text-slate-400 font-semibold">TCLEs Pendentes de Aceite</span>
            <p className="text-2xl font-extrabold text-amber-400 font-heading">1 Paciente</p>
            <span className="text-[11px] text-amber-300">Link enviado via WhatsApp</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
            <span className="text-xs text-slate-400 font-semibold">Status de OPME</span>
            <p className="text-2xl font-extrabold text-white font-heading">100% Entregue</p>
            <span className="text-[11px] text-emerald-400">1 em rota de entrega</span>
          </div>
        </div>

        {/* Surgical Timeline & Agenda Table */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white font-heading">Próximos Procedimentos Cirúrgicos</h2>
              <p className="text-xs text-slate-400">Visão integrada de paciente, equipe, OPME e termos jurídicos</p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              {['Todas', 'Confirmadas', 'Pendentes'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${activeFilter === tab ? 'bg-[#1B58D6] text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-3">
            {surgeries.map((s) => (
              <div key={s.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 hover:border-blue-500/40 transition">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-850 pb-2.5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-sky-400 bg-blue-950/80 border border-blue-800/50 px-2.5 py-0.5 rounded-lg">
                      {s.id}
                    </span>
                    <h3 className="font-bold text-white text-sm font-heading">{s.patient}</h3>
                    <span className="text-xs text-slate-400">• {s.hospital}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                      {s.date}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${s.status === 'Confirmada' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                      {s.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-500 font-semibold block">Procedimentos TUSS:</span>
                    <p className="text-slate-200 font-medium">1. {s.procedure}</p>
                    <p className="text-slate-400">2. {s.secondary}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-500 font-semibold block">Equipe & Materiais:</span>
                    <p className="text-slate-300">{s.team}</p>
                    <p className="text-sky-300">📦 {s.opme}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-850 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-medium">TCLE Digital:</span>
                    <span className={`text-[11px] font-semibold ${s.tcleStatus.includes('Assinado') ? 'text-emerald-400 flex items-center gap-1' : 'text-amber-400'}`}>
                      {s.tcleStatus.includes('Assinado') ? '✓ ' + s.tcleStatus : '⏳ ' + s.tcleStatus}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white font-mono">{s.honorarios}</span>
                    <Link href={`/cirurgias`} className="px-3 py-1 bg-slate-800 hover:bg-[#1B58D6] text-white rounded-lg transition font-semibold text-[11px]">
                      Ver Prontuário →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
