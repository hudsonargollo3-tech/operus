'use client';

import React, { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import {
  Bell,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileCheck2,
  ShieldCheck,
  Activity,
  Trash2
} from 'lucide-react';

export default function NotificacoesPage() {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      tipo: 'tcle',
      titulo: 'Termo de Consentimento Assinado Digitalmente',
      descricao: 'Mariana Silveira Leite assinou o TCLE da Artroplastia de Quadril via smartphone.',
      tempo: 'Há 25 minutos',
      lida: false,
      icon: FileCheck2,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
    },
    {
      id: '2',
      tipo: 'alerta_clinico',
      titulo: 'Alerta Pós-Op: Paciente relatou dor moderada/alta',
      descricao: 'Carlos Eduardo Fontes registrou Escala EVA 7/10 e febre de 37.9°C no check-in diário.',
      tempo: 'Há 1 hora',
      lida: false,
      icon: AlertTriangle,
      color: 'text-amber-600 bg-amber-50 border-amber-100'
    },
    {
      id: '3',
      tipo: 'opme',
      titulo: 'OPME Entregue no Centro Cirúrgico',
      descricao: 'Prótese Cerâmica Stryker foi confirmada pela farmácia central do Hospital Sírio-Libanês.',
      tempo: 'Há 3 horas',
      lida: true,
      icon: ShieldCheck,
      color: 'text-blue-600 bg-blue-50 border-blue-100'
    }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, lida: true })));
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          title="Central de Notificações & Alertas Clínicos"
          subtitle="Atualizações em tempo real de assinaturas de termos, alertas de pós-op e entregas de OPME"
        />

        <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header Action Bar */}
          <div className="flex items-center justify-between bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">Notificações Recentes</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                {notifications.filter(n => !n.lida).length} não lidas
              </span>
            </div>

            <button
              onClick={markAllRead}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition cursor-pointer"
            >
              Marcar todas como lidas
            </button>
          </div>

          {/* Notifications Feed */}
          <div className="space-y-3">
            {notifications.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className={`p-5 bg-white border rounded-2xl shadow-xs transition space-y-2 flex items-start gap-4 ${
                    !n.lida ? 'border-blue-200 bg-blue-50/10' : 'border-slate-200'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${n.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">{n.titulo}</h4>
                      <span className="text-xs text-slate-400 font-medium">{n.tempo}</span>
                    </div>
                    <p className="text-xs text-slate-600">{n.descricao}</p>
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
