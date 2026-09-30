'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Calendar,
  Users,
  FileText,
  ShieldCheck,
  Stethoscope,
  HeartHandshake,
  DollarSign,
  Activity,
  FileCheck2,
  FolderOpen,
  Bell,
  Settings,
  LayoutDashboard,
  LogOut
} from 'lucide-react';

const menuItems = [
  { name: 'Central Cirúrgica', href: '/', icon: LayoutDashboard },
  { name: 'Agenda & Cirurgias', href: '/cirurgias', icon: Calendar },
  { name: 'Pacientes & Prontuários', href: '/pacientes', icon: Users },
  { name: 'Orçamentos', href: '/orcamentos', icon: FileText },
  { name: 'Pós-Operatório', href: '/pos-operatorio', icon: Activity },
  { name: 'Termos de Consentimento', href: '/termos', icon: FileCheck2 },
  { name: 'Convênios & Planos', href: '/convenios', icon: ShieldCheck },
  { name: 'Procedimentos & TUSS', href: '/procedimentos', icon: Stethoscope },
  { name: 'Auxílios & Equipe', href: '/equipe', icon: HeartHandshake },
  { name: 'Financeiro', href: '/financeiro', icon: DollarSign },
  { name: 'Documentos & OCR', href: '/documentos', icon: FolderOpen },
  { name: 'Notificações', href: '/notificacoes', icon: Bell },
  { name: 'Configurações', href: '/perfil', icon: Settings },
];

export const AppSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0 h-screen sticky top-0 select-none">
      {/* Brand Header */}
      <div className="p-5 flex items-center gap-3 border-b border-slate-800/80">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-operus-600 to-operus-800 flex items-center justify-center text-lime-300 shadow-md border border-operus-500/30">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 4v16m-8-8h16" />
          </svg>
        </div>
        <div>
          <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
            Operus <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-operus-500/20 text-lime-400 font-semibold border border-operus-500/30">Suite</span>
          </h1>
          <p className="text-xs text-slate-400">Gestão Cirúrgica</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-operus-800/60 text-white font-semibold border border-operus-600/40 shadow-sm'
                  : 'hover:bg-slate-800 hover:text-white text-slate-400'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-lime-400' : 'text-slate-400'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Card Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-operus-700 text-white flex items-center justify-center text-xs font-bold ring-2 ring-operus-500/40 shrink-0">
              HM
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">Dr. Herlon Moura</p>
              <p className="text-[10px] text-slate-400 truncate">CRM 23904 • Cirurgião</p>
            </div>
          </div>
          <Link href="/auth" title="Sair" className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800 transition">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
};
