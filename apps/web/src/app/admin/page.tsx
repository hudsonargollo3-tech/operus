'use client';

import React from 'react';
import Link from 'next/link';

export default function SuperAdminPage() {
  const tenants = [
    { id: '1', name: 'Instituto Cirúrgico Paulista', owner: 'Dr. Lucas Arantes', specialty: 'Ortopedia', plan: 'Enterprise (R$ 890/mês)', surgeries: 84, status: 'Ativo' },
    { id: '2', name: 'Clínica Vasconcelos Plástica', owner: 'Dra. Camila Vasconcelos', specialty: 'Cirurgia Plástica', plan: 'Equipe Pro (R$ 490/mês)', surgeries: 42, status: 'Ativo' },
    { id: '3', name: 'Vascular Prime Salvador', owner: 'Dr. Eduardo Bahia', specialty: 'Cirurgia Vascular', plan: 'Equipe Pro (R$ 490/mês)', surgeries: 29, status: 'Ativo' },
    { id: '4', name: 'Centro Neurocirúrgico RS', owner: 'Dr. Fernando Souza', specialty: 'Neurocirurgia', plan: 'Enterprise (R$ 890/mês)', surgeries: 63, status: 'Ativo' },
    { id: '5', name: 'Urologia Especializada DF', owner: 'Dr. Marcelo Ribeiro', specialty: 'Urologia', plan: 'Solo Pro (R$ 290/mês)', surgeries: 18, status: 'Trial' },
  ];

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col antialiased selection:bg-[#1B58D6] selection:text-white">
      {/* Super Admin Nav */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2766E6] to-[#1646BB] border border-blue-400/30 flex items-center justify-center shadow-md">
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
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white font-heading">OPERUS</h1>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Super Admin
              </span>
            </div>
            <p className="text-xs text-slate-400">SaaS Multi-Tenant Management Console</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <Link href="/painel" className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition">
            Ver Painel Tenant →
          </Link>
          <Link href="/" className="px-3.5 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 transition">
            Landing Page
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-6">
        {/* KPI Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
            <span className="text-xs text-slate-400 font-semibold">MRR (Receita Mensal Recorrente)</span>
            <p className="text-2xl font-extrabold text-white font-heading">R$ 38.450</p>
            <span className="text-[11px] text-emerald-400 font-bold">+18.4% este mês</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
            <span className="text-xs text-slate-400 font-semibold">Clínicas & Equipes Ativas</span>
            <p className="text-2xl font-extrabold text-sky-400 font-heading">54 Tenants</p>
            <span className="text-[11px] text-slate-400">42 Pagantes • 12 em Trial</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
            <span className="text-xs text-slate-400 font-semibold">Cirurgias Processadas</span>
            <p className="text-2xl font-extrabold text-white font-heading">1.840</p>
            <span className="text-[11px] text-emerald-400 font-bold">R$ 14.2M em honorários</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
            <span className="text-xs text-slate-400 font-semibold">Taxa de Conversão TCLE</span>
            <p className="text-2xl font-extrabold text-emerald-400 font-heading">99.2%</p>
            <span className="text-[11px] text-slate-400">Tempo médio: 42 segundos</span>
          </div>
        </div>

        {/* Tenant Management Table */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white font-heading">Clínicas & Contas Cadastradas</h2>
              <p className="text-xs text-slate-400">Gerenciamento global de planos, cobrança e instâncias</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Buscar clínica ou CRM..."
                className="px-3.5 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1B58D6]"
              />
              <button className="px-3.5 py-1.5 bg-[#1B58D6] hover:bg-[#2766E6] text-white text-xs font-bold rounded-xl transition">
                + Novo Tenant
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
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
              <tbody className="divide-y divide-slate-800/80 font-medium">
                {tenants.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-850/50 transition">
                    <td className="py-3.5 px-4 font-bold text-white font-heading">{t.name}</td>
                    <td className="py-3.5 px-4 text-slate-300">{t.owner}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-sky-300 border border-blue-500/20 text-[10px]">
                        {t.specialty}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{t.plan}</td>
                    <td className="py-3.5 px-4 font-mono text-white font-bold">{t.surgeries} cirurgias</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${t.status === 'Ativo' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link href="/painel" className="px-2.5 py-1 bg-slate-800 hover:bg-[#1B58D6] text-white rounded-lg text-[11px] transition inline-block">
                        Impersonar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System & Microservice Health */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</div>
              <div>
                <p className="text-xs font-bold text-white">PostgreSQL & Supabase</p>
                <p className="text-[11px] text-slate-400">22 Tabelas • Latência 18ms</p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-mono">100% OK</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</div>
              <div>
                <p className="text-xs font-bold text-white">TCLE Signature Worker</p>
                <p className="text-[11px] text-slate-400">Assinaturas e Timestamp ICP-Brasil</p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-mono">100% OK</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-sky-400 flex items-center justify-center font-bold">↻</div>
              <div>
                <p className="text-xs font-bold text-white">AI Content Engine Cron</p>
                <p className="text-[11px] text-slate-400">Próxima publicação: Hoje 23:59</p>
              </div>
            </div>
            <span className="text-[10px] bg-blue-950 text-sky-300 px-2 py-0.5 rounded font-mono">Ativo</span>
          </div>
        </div>
      </main>
    </div>
  );
}
