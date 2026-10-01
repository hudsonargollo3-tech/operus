'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import {
  Calendar,
  Users,
  Activity,
  FileCheck2,
  DollarSign,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Hospital,
  ChevronRight,
  Share2,
  ShieldCheck,
  TrendingUp,
  ExternalLink,
  X
} from 'lucide-react';

export default function TenantDashboardPage() {
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [copiedLink, setCopiedLink] = useState(false);

  const stats = [
    { label: 'Cirurgias no Mês', value: '18', subtext: '4 esta semana', icon: Calendar, color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { label: 'Pacientes em Pós-Op', value: '12', subtext: '9 estáveis • 3 com queixas', icon: Activity, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { label: 'TCLEs Pendentes', value: '2', subtext: 'Aguardando paciente', icon: FileCheck2, color: 'text-amber-600 bg-amber-50 border-amber-100' },
    { label: 'Honorários a Faturar', value: 'R$ 64.200', subtext: 'Previsão líquida TUSS', icon: DollarSign, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
  ];

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
      tcleToken: 'tc-mariana-892',
      status: 'Confirmada',
      honorarios: 'R$ 14.500',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
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
      tcleStatus: 'Aguardando Assinatura',
      tcleToken: 'demo',
      status: 'Pendente TCLE',
      honorarios: 'R$ 9.800',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 'CIR-894',
      patient: 'Beatriz Vasconcelos',
      hospital: 'Hospital Nove de Julho — Sala 02',
      date: '03/10 • 08:00',
      procedure: 'Osteotomia Corretiva de Tíbia (TUSS 30722129)',
      secondary: 'Fixação Interna com Placa Bloqueada',
      team: 'Dr. Lucas Arantes (Titular) • Dr. Rafael (Aux 1)',
      opme: 'Placa LCP Synthes (Aguardando Retirada)',
      tcleStatus: 'Assinado Digitalmente',
      tcleToken: 'tc-beatriz-894',
      status: 'Pendente OPME',
      honorarios: 'R$ 11.200',
      statusColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    }
  ];

  const filteredSurgeries = activeFilter === 'Todas'
    ? surgeries
    : surgeries.filter(s => s.status.toLowerCase().includes(activeFilter.toLowerCase()));

  const handleCopyTcle = (token: string) => {
    const url = `${window.location.origin}/aceite-termo/${token}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          title="Central Cirúrgica & Governança"
          subtitle="Instituto Cirúrgico Paulista • Dr. Lucas Arantes (CRM 142.890-SP)"
        />

        <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Top Quick Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold">
                OP
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Operus Clinic OS</h2>
                <p className="text-xs text-slate-500">Gestão cirúrgica de ponta a ponta com segurança regulatória CFM</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/cirurgias"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
              >
                <Plus className="w-4 h-4" />
                Agendar Cirurgia
              </Link>
              <Link
                href="/orcamentos"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition"
              >
                <DollarSign className="w-4 h-4 text-slate-500" />
                Novo Orçamento
              </Link>
              <Link
                href="/blueprint"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-600 text-xs font-medium rounded-xl border border-slate-200 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Blueprint
              </Link>
            </div>
          </div>

          {/* KPI Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-2 hover:border-slate-300 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">{stat.label}</span>
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${stat.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-slate-900 tracking-tight">{stat.value}</p>
                    <p className="text-[11px] font-medium text-slate-500">{stat.subtext}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Surgical Queue Header & Filter Tabs */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Fila Cirúrgica & Procedimentos Iminentes</h3>
                <p className="text-xs text-slate-500">Acompanhamento em tempo real de autorizações, OPME e assinaturas de TCLE</p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-medium text-slate-600">
                {['Todas', 'Confirmada', 'Pendente TCLE', 'Pendente OPME'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      activeFilter === filter
                        ? 'bg-white text-blue-700 font-bold shadow-xs'
                        : 'hover:text-slate-900'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Surgeries List */}
            <div className="divide-y divide-slate-100">
              {filteredSurgeries.map((surgery) => (
                <div key={surgery.id} className="p-5 hover:bg-slate-50/70 transition space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          {surgery.id}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{surgery.patient}</h4>
                        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${surgery.statusColor}`}>
                          {surgery.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 flex items-center gap-1.5">
                        <Hospital className="w-3.5 h-3.5 text-slate-400" />
                        {surgery.hospital}
                        <span className="text-slate-300">•</span>
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <strong className="text-slate-800">{surgery.date}</strong>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-400 font-medium">Honorários Estimados</span>
                      <p className="text-sm font-extrabold text-slate-900 font-mono">{surgery.honorarios}</p>
                    </div>
                  </div>

                  {/* Procedures and Badges */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs space-y-1.5">
                    <div className="flex items-center gap-2 font-medium text-slate-800">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      {surgery.procedure}
                    </div>
                    {surgery.secondary && (
                      <div className="flex items-center gap-2 text-slate-500 pl-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        {surgery.secondary}
                      </div>
                    )}
                  </div>

                  {/* Footer Meta & Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                    <div className="flex flex-wrap items-center gap-3 text-slate-500">
                      <span className="flex items-center gap-1 text-slate-600">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                        OPME: <strong className="text-slate-700">{surgery.opme}</strong>
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1 text-slate-600">
                        <FileCheck2 className={`w-3.5 h-3.5 ${surgery.tcleStatus.includes('Assinado') ? 'text-emerald-600' : 'text-amber-600'}`} />
                        TCLE: <strong className={surgery.tcleStatus.includes('Assinado') ? 'text-emerald-700' : 'text-amber-700'}>{surgery.tcleStatus}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyTcle(surgery.tcleToken)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition cursor-pointer"
                        title="Copiar Link do Termo TCLE para WhatsApp"
                      >
                        <Share2 className="w-3.5 h-3.5 text-slate-500" />
                        {copiedLink ? 'Link Copiado!' : 'Link TCLE'}
                      </button>

                      <Link
                        href={`/aceite-termo/${surgery.tcleToken}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition"
                      >
                        Abrir Termo
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
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
