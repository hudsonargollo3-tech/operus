'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Users,
  Building2,
  TrendingUp,
  DollarSign,
  Activity,
  CheckCircle2,
  ExternalLink,
  Search,
  Plus,
  ArrowUpRight
} from 'lucide-react';

export default function SuperAdminPage() {
  const tenants = [
    { id: '1', name: 'Instituto Cirúrgico Paulista', owner: 'Dr. Lucas Arantes', specialty: 'Ortopedia', plan: 'Enterprise (R$ 890/mês)', surgeries: 84, status: 'Ativo' },
    { id: '2', name: 'Clínica Vasconcelos Plástica', owner: 'Dra. Camila Vasconcelos', specialty: 'Cirurgia Plástica', plan: 'Equipe Pro (R$ 490/mês)', surgeries: 42, status: 'Ativo' },
    { id: '3', name: 'Vascular Prime Salvador', owner: 'Dr. Eduardo Bahia', specialty: 'Cirurgia Vascular', plan: 'Equipe Pro (R$ 490/mês)', surgeries: 29, status: 'Ativo' },
    { id: '4', name: 'Centro Neurocirúrgico RS', owner: 'Dr. Fernando Souza', specialty: 'Neurocirurgia', plan: 'Enterprise (R$ 890/mês)', surgeries: 63, status: 'Ativo' },
    { id: '5', name: 'Urologia Especializada DF', owner: 'Dr. Marcelo Ribeiro', specialty: 'Urologia', plan: 'Solo Pro (R$ 290/mês)', surgeries: 18, status: 'Trial' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      {/* Super Admin Nav */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 px-6 py-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white flex items-center justify-center shadow-md">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 font-heading">OPERUS</h1>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                Super Admin
              </span>
            </div>
            <p className="text-xs text-slate-500">SaaS Multi-Tenant Management Console • Hudson Argollo</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-xs">
          <Link href="/painel" className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-xs flex items-center gap-1.5">
            <span>Ver Painel Tenant</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link href="/" className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium transition">
            Landing Page
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-6">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1.5 shadow-xs">
            <span className="text-xs text-slate-500 font-semibold">MRR (Receita Mensal Recorrente)</span>
            <p className="text-2xl font-extrabold text-slate-900 font-heading">R$ 38.450</p>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +18.4% este mês
            </span>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1.5 shadow-xs">
            <span className="text-xs text-slate-500 font-semibold">Clínicas & Equipes Ativas</span>
            <p className="text-2xl font-extrabold text-blue-600 font-heading">54 Tenants</p>
            <span className="text-[11px] text-slate-500">42 Pagantes • 12 em Trial</span>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1.5 shadow-xs">
            <span className="text-xs text-slate-500 font-semibold">Cirurgias Processadas</span>
            <p className="text-2xl font-extrabold text-slate-900 font-heading">1.840</p>
            <span className="text-[11px] text-emerald-600 font-bold">R$ 14.2M em honorários</span>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1.5 shadow-xs">
            <span className="text-xs text-slate-500 font-semibold">Taxa de Conversão TCLE</span>
            <p className="text-2xl font-extrabold text-emerald-600 font-heading">99.2%</p>
            <span className="text-[11px] text-slate-500">Tempo médio: 42 segundos</span>
          </div>
        </div>

        {/* Tenant Management Table */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">Clínicas & Contas Cadastradas</h2>
              <p className="text-xs text-slate-500">Gerenciamento global de planos, cobrança e instâncias</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar clínica ou CRM..."
                  className="pl-8 pr-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                />
              </div>
              <button className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" />
                Novo Tenant
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                <tr>
                  <th className="py-3 px-4">Clínica / Grupo</th>
                  <th className="py-3 px-4">Responsável Técnico</th>
                  <th className="py-3 px-4">Especialidade</th>
                  <th className="py-3 px-4">Plano</th>
                  <th className="py-3 px-4">Cirurgias (Mês)</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {tenants.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4 font-bold text-slate-900 font-heading">{t.name}</td>
                    <td className="py-3.5 px-4 text-slate-600">{t.owner}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-semibold">
                        {t.specialty}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{t.plan}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-900 font-bold">{t.surgeries} cirurgias</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${t.status === 'Ativo' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link href="/painel" className="px-2.5 py-1 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 border border-slate-200 rounded-lg text-[11px] font-semibold transition inline-block">
                        Impersonar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Microservices Health */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center font-bold">✓</div>
              <div>
                <p className="text-xs font-bold text-slate-900">PostgreSQL & Supabase</p>
                <p className="text-[11px] text-slate-500">22 Tabelas • Latência 18ms</p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-mono font-bold">100% OK</span>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center font-bold">✓</div>
              <div>
                <p className="text-xs font-bold text-slate-900">TCLE Signature Worker</p>
                <p className="text-[11px] text-slate-500">Assinaturas e Timestamp ICP-Brasil</p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-mono font-bold">100% OK</span>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold">↻</div>
              <div>
                <p className="text-xs font-bold text-slate-900">AI Content Engine Cron</p>
                <p className="text-[11px] text-slate-500">GEO Search & llms.txt Sync</p>
              </div>
            </div>
            <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-mono font-bold">Ativo</span>
          </div>
        </div>
      </main>
    </div>
  );
}
