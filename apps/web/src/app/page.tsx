'use client';

import React, { useState, useEffect } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import {
  Calendar,
  DollarSign,
  Activity,
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertTriangle,
  User,
  Hospital,
  ChevronRight,
  Plus
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating instant hydration / data load with smooth transition
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen message="Operus Surgical Suite" submessage="Sincronizando agenda e prontuários cirúrgicos..." />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Navigation */}
      <AppSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          title="Central Cirúrgica"
          subtitle="Visão operacional, agenda da semana e pacientes em recuperação"
        />

        <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Bento Grid: Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Cirurgias do Mês */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Cirurgias do Mês</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-900">18</span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+12% vs mês ant.</span>
                </div>
                <p className="text-[11px] text-slate-400">4 agendadas para esta semana</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-operus-50 text-operus-700 border border-operus-200/60 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
            </div>

            {/* Card 2: Faturamento Previsto */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Faturamento Previsto</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-900">R$ 54.800</span>
                </div>
                <p className="text-[11px] text-slate-400">R$ 38.200 convênios • R$ 16.600 particular</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-200/60 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>

            {/* Card 3: Pós-Operatório Ativo */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pós-Op Ativos</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-900">7</span>
                  <span className="text-xs font-semibold text-operus-700 bg-operus-50 px-1.5 py-0.5 rounded">Sem queixas</span>
                </div>
                <p className="text-[11px] text-slate-400">2 no D+1 • 3 no D+7 • 2 no D+15</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
            </div>

            {/* Card 4: Guias & OPME Pendentes */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Autorizações / OPME</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-amber-600">3</span>
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">Atenção</span>
                </div>
                <p className="text-[11px] text-slate-400">2 guias em análise • 1 OPME pendente</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Section: Próximas Cirurgias & Alertas Críticos */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Col (2 spans): Próximas Cirurgias */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-operus-700" />
                  <h3 className="text-sm font-bold text-slate-900">Agenda Cirúrgica Recente</h3>
                </div>
                <Link
                  href="/cirurgias"
                  className="text-xs font-semibold text-operus-700 hover:text-operus-800 flex items-center gap-1"
                >
                  Ver todas <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {/* Surgical Item 1 */}
                <div className="py-3.5 flex items-center justify-between hover:bg-slate-50/80 px-2 rounded-lg transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-operus-50 text-operus-800 flex flex-col items-center justify-center border border-operus-200/50">
                      <span className="text-[10px] uppercase font-bold text-slate-400">QUI</span>
                      <span className="text-sm font-bold leading-none">02</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">Maria Aparecida dos Santos</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-medium text-slate-700">Safenectomia Bilateral + Laser</span> • 
                        <span className="flex items-center gap-1 text-slate-500"><Hospital className="w-3 h-3" /> Hospital Santa Joana</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      <CheckCircle2 className="w-3 h-3" /> Autorizada
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1">07:30 • Sala 4</p>
                  </div>
                </div>

                {/* Surgical Item 2 */}
                <div className="py-3.5 flex items-center justify-between hover:bg-slate-50/80 px-2 rounded-lg transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex flex-col items-center justify-center border border-slate-200">
                      <span className="text-[10px] uppercase font-bold text-slate-400">SEX</span>
                      <span className="text-sm font-bold leading-none">03</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">Roberto Carlos Oliveira</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-medium text-slate-700">Endarterectomia de Carótida</span> • 
                        <span className="flex items-center gap-1 text-slate-500"><Hospital className="w-3 h-3" /> Hospital Aliança</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
                      <Clock className="w-3 h-3" /> Em Análise
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1">10:00 • Bradesco Saúde</p>
                  </div>
                </div>

                {/* Surgical Item 3 */}
                <div className="py-3.5 flex items-center justify-between hover:bg-slate-50/80 px-2 rounded-lg transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex flex-col items-center justify-center border border-slate-200">
                      <span className="text-[10px] uppercase font-bold text-slate-400">SEG</span>
                      <span className="text-sm font-bold leading-none">06</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">Claudio Henrique Mendes</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-medium text-slate-700">Varizes com Microespuma Guiada</span> • 
                        <span className="flex items-center gap-1 text-slate-500"><Hospital className="w-3 h-3" /> Day Clinic Clap</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                      Particular
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1">14:00 • Orçamento Aprovado</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col (1 span): Alertas Pré & Pós-Op */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <h3 className="text-sm font-bold text-slate-900">Alertas Cirúrgicos</h3>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">3 ativos</span>
              </div>

              <div className="space-y-3">
                {/* Alert 1 */}
                <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-lg space-y-1">
                  <p className="text-xs font-bold text-amber-900 flex items-center justify-between">
                    <span>TCLE Pendente de Assinatura</span>
                    <span className="text-[10px] text-amber-700 font-normal">Amanhã 07:30</span>
                  </p>
                  <p className="text-xs text-amber-800">
                    Paciente <strong>Maria Aparecida</strong> ainda não assinou o termo digital.
                  </p>
                  <Link href="/termos" className="text-[11px] font-semibold text-operus-800 underline block pt-1">
                    Reenviar link por WhatsApp →
                  </Link>
                </div>

                {/* Alert 2 */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <p className="text-xs font-bold text-slate-900 flex items-center justify-between">
                    <span>Acompanhamento D+1</span>
                    <span className="text-[10px] text-slate-500">Hoje</span>
                  </p>
                  <p className="text-xs text-slate-600">
                    Paciente <strong>Juliana Ramos</strong> realizou cirurgia ontem. Formulário de dor enviado.
                  </p>
                  <Link href="/pos-operatorio" className="text-[11px] font-semibold text-operus-700 hover:underline block pt-1">
                    Ver resposta pós-op →
                  </Link>
                </div>

                {/* Alert 3 */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <p className="text-xs font-bold text-slate-900 flex items-center justify-between">
                    <span>Material OPME Entregue</span>
                    <span className="text-[10px] text-slate-500">Hospital Santa Joana</span>
                  </p>
                  <p className="text-xs text-slate-600">
                    Fibra laser radial conferida e disponível para procedimento do dia 02.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
