'use client';

import React from 'react';
import { Search, Plus, Bell, ShieldCheck, Building2 } from 'lucide-react';
import Link from 'next/link';

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  onNewSurgery?: () => void;
  onNewPatient?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title = 'Central Cirúrgica',
  subtitle = 'Visão geral da rotina cirúrgica e pacientes em acompanhamento',
  onNewSurgery,
  onNewPatient,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>

      {/* Global Actions & Search */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative hidden md:block w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar paciente, cirurgia ou TUSS..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-operus-600 focus:bg-white transition"
          />
        </div>

        {/* Quick Surgery Button */}
        <button
          onClick={onNewSurgery}
          className="flex items-center gap-1.5 bg-operus-700 hover:bg-operus-800 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-xs transition active:scale-95 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-lime-300" />
          <span>Nova Cirurgia</span>
        </button>

        {/* Quick Patient Button */}
        <button
          onClick={onNewPatient}
          className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-xs font-medium border border-slate-200 transition active:scale-95 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-slate-500" />
          <span>Novo Paciente</span>
        </button>

        {/* Notification Bell */}
        <Link
          href="/notificacoes"
          className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 border border-slate-200 transition"
          title="Notificações"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
        </Link>
      </div>
    </header>
  );
};
