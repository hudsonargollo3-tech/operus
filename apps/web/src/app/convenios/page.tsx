'use client';

import React, { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import {
  ShieldCheck,
  Plus,
  Search,
  Building2,
  FileSpreadsheet,
  Clock,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Settings2
} from 'lucide-react';

export default function ConveniosPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const convenios = [
    {
      id: '1',
      nome: 'Bradesco Saúde',
      registroAns: '005711',
      tabelaBase: 'CBHPM 2020 + 20% CH',
      prazoRepasse: '45 dias',
      ucoChValor: 'R$ 0,72 / UCO R$ 14,50',
      cirurgiasMes: 8,
      status: 'Ativo',
      glosasTaxa: '1.2%'
    },
    {
      id: '2',
      nome: 'SulAmérica Saúde',
      registroAns: '006246',
      tabelaBase: 'CBHPM 2018 Integral',
      prazoRepasse: '30 dias',
      ucoChValor: 'R$ 0,68 / UCO R$ 13,80',
      cirurgiasMes: 5,
      status: 'Ativo',
      glosasTaxa: '0.8%'
    },
    {
      id: '3',
      nome: 'Amil Assistência Médica',
      registroAns: '326305',
      tabelaBase: 'CBHPM 5ª Edição + Acordo',
      prazoRepasse: '60 dias',
      ucoChValor: 'R$ 0,65 / UCO R$ 13,20',
      cirurgiasMes: 3,
      status: 'Ativo',
      glosasTaxa: '2.4%'
    },
    {
      id: '4',
      nome: 'Unimed Seguros / Central Nacional',
      registroAns: '000701',
      tabelaBase: 'Tabela Própria Unimed 2024',
      prazoRepasse: '30 dias',
      ucoChValor: 'R$ 0,70 / UCO R$ 14,00',
      cirurgiasMes: 2,
      status: 'Ativo',
      glosasTaxa: '1.5%'
    }
  ];

  const filtered = convenios.filter(c =>
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.registroAns.includes(searchTerm)
  );

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          title="Convênios & Tabelas Base"
          subtitle="Configuração de operadoras, registros ANS, deflatores e regras de repasse financeiro"
        />

        <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Top Actions & Summary */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">4 Operadoras Credenciadas</h2>
                <p className="text-xs text-slate-500">Tabelas parametrizadas para cálculo automático de portes cirúrgicos</p>
              </div>
            </div>

            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer">
              <Plus className="w-4 h-4" />
              Novo Convênio
            </button>
          </div>

          {/* Search Bar */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por operadora ou código ANS..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Convenios Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((c) => (
              <div key={c.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{c.nome}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {c.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-mono">Registro ANS: {c.registroAns}</p>
                  </div>

                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition" title="Editar Parâmetros">
                    <Settings2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs space-y-2 text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tabela de Referência:</span>
                    <strong className="text-slate-900">{c.tabelaBase}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Coeficientes (CH / UCO):</span>
                    <span className="font-mono font-medium text-slate-800">{c.ucoChValor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Prazo Médio de Repasse:</span>
                    <span className="font-medium text-slate-800">{c.prazoRepasse}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Taxa Histórica de Glosas:</span>
                    <span className="font-bold text-emerald-700">{c.glosasTaxa}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500 font-medium">
                    <strong className="text-slate-900 font-bold">{c.cirurgiasMes} cirurgias</strong> este mês
                  </span>
                  <span className="text-blue-600 font-bold text-xs hover:underline cursor-pointer">
                    Ver Regras de Faturamento →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
