'use client';

import React, { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Heart,
  MessageSquare,
  Phone,
  Search,
  Thermometer,
  User,
  X,
  Plus,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function PosOperatorioPage() {
  const [filterSeverity, setFilterSeverity] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);

  const patientsPosOp = [
    {
      id: 'POS-101',
      nome: 'Mariana Silveira Leite',
      procedimento: 'Artroplastia Total de Quadril',
      cirurgiaData: '29/09/2026',
      diasPosOp: 2,
      dorEscala: 3,
      temperatura: '36.8°C',
      sangramento: false,
      secrecao: false,
      relato: 'Boa evolução. Deambulação assistida sem intercorrências no corredor. Pouco edema.',
      statusAlerta: 'estavel',
      telefone: '(11) 98765-4321',
      ultimaAtualizacao: 'Hoje • 07:15'
    },
    {
      id: 'POS-102',
      nome: 'Carlos Eduardo Fontes',
      procedimento: 'Reconstrução de LCA + Meniscectomia',
      cirurgiaData: '28/09/2026',
      diasPosOp: 3,
      dorEscala: 7,
      temperatura: '37.9°C',
      sangramento: true,
      secrecao: false,
      relato: 'Dor moderada a intensa ao movimentar o joelho, sensação febril nas últimas 4 horas.',
      statusAlerta: 'atencao',
      telefone: '(11) 97654-3210',
      ultimaAtualizacao: 'Hoje • 06:40'
    },
    {
      id: 'POS-103',
      nome: 'Beatriz Vasconcelos',
      procedimento: 'Osteotomia Corretiva de Tíbia',
      cirurgiaData: '26/09/2026',
      diasPosOp: 5,
      dorEscala: 2,
      temperatura: '36.5°C',
      sangramento: false,
      secrecao: false,
      relato: 'Sem queixas álgicas relevantes. Uso regular da medicação prescrita e crioterapia.',
      statusAlerta: 'estavel',
      telefone: '(11) 99123-8899',
      ultimaAtualizacao: 'Ontem • 20:30'
    },
    {
      id: 'POS-104',
      nome: 'Roberto Carlos Oliveira',
      procedimento: 'Endarterectomia Carotídea',
      cirurgiaData: '25/09/2026',
      diasPosOp: 6,
      dorEscala: 1,
      temperatura: '36.6°C',
      sangramento: false,
      secrecao: false,
      relato: 'Ferida operatória limpa e seca, sem déficits neurológicos focais. PA estável.',
      statusAlerta: 'alta_programada',
      telefone: '(71) 98845-1200',
      ultimaAtualizacao: 'Hoje • 08:00'
    }
  ];

  const filtered = patientsPosOp.filter((p) => {
    const matchesSearch = p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.procedimento.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterSeverity === 'todos') return matchesSearch;
    return matchesSearch && p.statusAlerta === filterSeverity;
  });

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          title="Monitoramento Pós-Operatório"
          subtitle="Telemetria diária de dor (EVA), febre, drenagem e alertas clínicos automatizados"
        />

        <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-1">
              <span className="text-xs font-semibold text-slate-500">Pacientes em Acompanhamento</span>
              <p className="text-2xl font-extrabold text-slate-900 font-heading">12 Casos</p>
              <span className="text-[11px] text-blue-600 font-medium">D0 ao D30 pós-cirúrgico</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-1">
              <span className="text-xs font-semibold text-slate-500">Alertas Clínicos Ativos</span>
              <p className="text-2xl font-extrabold text-amber-600 font-heading">1 Alerta</p>
              <span className="text-[11px] text-amber-700 font-medium">Febre &gt; 37.8°C / Dor EVA &ge; 7</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-1">
              <span className="text-xs font-semibold text-slate-500">Evolução Estável</span>
              <p className="text-2xl font-extrabold text-emerald-600 font-heading">10 Pacientes</p>
              <span className="text-[11px] text-emerald-700 font-medium">Parâmetros dentro da meta</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-1">
              <span className="text-xs font-semibold text-slate-500">Taxa de Resposta Diária</span>
              <p className="text-2xl font-extrabold text-indigo-600 font-heading">94.8%</p>
              <span className="text-[11px] text-slate-500">Check-in via WhatsApp/Web</span>
            </div>
          </div>

          {/* Action & Filter Bar */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por paciente ou cirurgia..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'atencao', label: '⚠️ Requer Atenção' },
                { id: 'estavel', label: '✓ Estáveis' },
                { id: 'alta_programada', label: 'Alta Programada' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterSeverity(tab.id)}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    filterSeverity === tab.id
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Patients Feed */}
          <div className="space-y-3">
            {filtered.map((patient) => {
              const isWarning = patient.statusAlerta === 'atencao';
              return (
                <div
                  key={patient.id}
                  className={`bg-white border rounded-2xl p-5 shadow-xs transition space-y-3 ${
                    isWarning
                      ? 'border-amber-300 bg-amber-50/20 ring-1 ring-amber-200'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          D+{patient.diasPosOp}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{patient.nome}</h3>
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                          isWarning
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {isWarning ? 'Atenção Necessária' : 'Evolução Normal'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {patient.procedimento} • Cirurgia em {patient.cirurgiaData} • Atualizado: {patient.ultimaAtualizacao}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/55${patient.telefone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Telemetry Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                    <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                      patient.dorEscala >= 6
                        ? 'bg-rose-50 border-rose-200 text-rose-800 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 font-medium'
                    }`}>
                      <span>Escala de Dor (EVA)</span>
                      <span className="font-mono font-bold text-sm">{patient.dorEscala} / 10</span>
                    </div>

                    <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                      parseFloat(patient.temperatura) >= 37.8
                        ? 'bg-amber-50 border-amber-200 text-amber-800 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 font-medium'
                    }`}>
                      <span>Temperatura</span>
                      <span className="font-mono font-bold">{patient.temperatura}</span>
                    </div>

                    <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                      patient.sangramento
                        ? 'bg-amber-50 border-amber-200 text-amber-800 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 font-medium'
                    }`}>
                      <span>Sangramento</span>
                      <span>{patient.sangramento ? '⚠️ Presente' : '✓ Ausente'}</span>
                    </div>

                    <div className="p-2.5 rounded-xl border bg-slate-50 border-slate-200 text-slate-700 font-medium flex items-center justify-between">
                      <span>Secreção / Dreno</span>
                      <span>{patient.secrecao ? '⚠️ Sim' : '✓ Seco'}</span>
                    </div>
                  </div>

                  {/* Patient Clinical Notes */}
                  <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-700 flex items-start gap-2">
                    <span className="font-bold text-slate-900 shrink-0">Relato do Paciente:</span>
                    <p className="italic">{patient.relato}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
