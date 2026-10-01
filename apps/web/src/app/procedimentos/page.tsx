'use client';

import React, { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import {
  Stethoscope,
  Plus,
  Search,
  Calculator,
  Filter,
  CheckCircle2,
  DollarSign,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function ProcedimentosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSpecialty, setActiveSpecialty] = useState('Todas');

  // Multi-procedure dynamic calculator state
  const [calcSelected, setCalcSelected] = useState<string[]>([
    '30724016', // Artroplastia Total de Quadril
    '30713022', // Tenotomia de Adutores
  ]);
  const [calcVia, setCalcVia] = useState<'mesma_via' | 'diferentes_vias' | 'bilateral'>('mesma_via');

  const procedimentos = [
    { codigo: '30724016', nome: 'Artroplastia Total de Quadril Não Cimentada', porte: 'Porte 10B', anestesico: 'Porte 6', especialidade: 'Ortopedia', honorarioBase: 8500 },
    { codigo: '30713022', nome: 'Tenotomia de Adutores de Quadril', porte: 'Porte 4C', anestesico: 'Porte 3', especialidade: 'Ortopedia', honorarioBase: 2400 },
    { codigo: '30726116', nome: 'Reconstrução de Ligamento Cruzado Anterior (LCA)', porte: 'Porte 9A', anestesico: 'Porte 5', especialidade: 'Ortopedia', honorarioBase: 6800 },
    { codigo: '30726051', nome: 'Meniscectomia Parcial por Artroscopia', porte: 'Porte 6B', anestesico: 'Porte 4', especialidade: 'Ortopedia', honorarioBase: 3200 },
    { codigo: '30906155', nome: 'Safenectomia Bilateral de Membros Inferiores', porte: 'Porte 8C', anestesico: 'Porte 5', especialidade: 'Cirurgia Vascular', honorarioBase: 5600 },
    { codigo: '30906163', nome: 'Termoablação Endovenosa a Laser de Safena', porte: 'Porte 9B', anestesico: 'Porte 5', especialidade: 'Cirurgia Vascular', honorarioBase: 7200 },
    { codigo: '30801052', nome: 'Colecistectomia por Videolaparoscopia', porte: 'Porte 8B', anestesico: 'Porte 5', especialidade: 'Cirurgia Geral', honorarioBase: 4900 },
  ];

  const specialties = ['Todas', 'Ortopedia', 'Cirurgia Vascular', 'Cirurgia Geral'];

  const filtered = procedimentos.filter((p) => {
    const matchSearch = p.codigo.includes(searchTerm) || p.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSpec = activeSpecialty === 'Todas' || p.especialidade === activeSpecialty;
    return matchSearch && matchSpec;
  });

  // Calculate fees based on CBHPM / ANS multi-procedure rules
  const selectedProcs = calcSelected.map(code => procedimentos.find(p => p.codigo === code)).filter(Boolean) as typeof procedimentos;
  
  let calculatedTotal = 0;
  const procBreakdown = selectedProcs.map((proc, index) => {
    let multiplier = 1.0;
    if (index === 0) {
      multiplier = 1.0;
    } else if (index === 1) {
      multiplier = calcVia === 'mesma_via' ? 0.70 : 0.70;
    } else {
      multiplier = calcVia === 'mesma_via' ? 0.50 : 0.50;
    }
    const val = proc.honorarioBase * multiplier;
    calculatedTotal += val;
    return {
      ...proc,
      multiplierPercent: Math.round(multiplier * 100),
      valorFinal: val
    };
  });

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          title="Catálogo TUSS & Calculadora de Múltiplos Procedimentos"
          subtitle="Tabela de procedimentos, portes cirúrgicos/anestésicos e motor de cálculo ANS 100/70/50%"
        />

        <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Interactive Multi-Procedure Calculator Simulator */}
          <div className="bg-white border border-blue-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 font-heading">Simulador de Múltiplos Procedimentos Cirúrgicos</h2>
                  <p className="text-xs text-slate-500">Regras de via de acesso (100% 1º proc • 70% 2º proc • 50% subsequentes)</p>
                </div>
              </div>

              {/* Via de Acesso Selector */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
                <button
                  onClick={() => setCalcVia('mesma_via')}
                  className={`px-3 py-1 rounded-lg transition ${calcVia === 'mesma_via' ? 'bg-white text-blue-700 shadow-xs font-bold' : ''}`}
                >
                  Mesma Via (100 / 70 / 50%)
                </button>
                <button
                  onClick={() => setCalcVia('diferentes_vias')}
                  className={`px-3 py-1 rounded-lg transition ${calcVia === 'diferentes_vias' ? 'bg-white text-blue-700 shadow-xs font-bold' : ''}`}
                >
                  Vias Diferentes (100 / 70%)
                </button>
              </div>
            </div>

            {/* Calculated Results Box */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <span className="text-xs font-semibold text-slate-500 block">Procedimentos Selecionados na Simulação:</span>
                {procBreakdown.map((item, idx) => (
                  <div key={item.codigo} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-blue-600">{item.codigo}</span>
                        <strong className="text-slate-900">{item.nome}</strong>
                      </div>
                      <span className="text-slate-500 font-medium">Base: R$ {item.honorarioBase.toLocaleString('pt-BR')} • Multiplicador: <strong>{item.multiplierPercent}%</strong> ({idx === 0 ? 'Procedimento Principal' : 'Secundário'})</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      R$ {item.valorFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-5 rounded-2xl flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Total Estimado Honorários</span>
                  <p className="text-3xl font-extrabold text-slate-900 font-mono">
                    R$ {calculatedTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-[11px] text-slate-500">Cálculo auditável pronto para envio ao convênio</p>
                </div>

                <div className="pt-4 border-t border-blue-200/60 text-xs text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span>1º Auxiliar (30%):</span>
                    <strong className="font-mono">R$ {(calculatedTotal * 0.3).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>2º Auxiliar (20%):</span>
                    <strong className="font-mono">R$ {(calculatedTotal * 0.2).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Procedure Catalog Search & Table */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Catálogo de Procedimentos Cirúrgicos</h3>
                <p className="text-xs text-slate-500">Portes cirúrgicos, portes anestésicos e referências TUSS/CBHPM</p>
              </div>

              {/* Specialty Filter */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
                {specialties.map((spec) => (
                  <button
                    key={spec}
                    onClick={() => setActiveSpecialty(spec)}
                    className={`px-3 py-1 rounded-lg transition ${
                      activeSpecialty === spec ? 'bg-white text-blue-700 shadow-xs font-bold' : 'hover:text-slate-900'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Código TUSS</th>
                    <th className="py-3 px-4">Procedimento</th>
                    <th className="py-3 px-4">Especialidade</th>
                    <th className="py-3 px-4">Porte Cirúrgico</th>
                    <th className="py-3 px-4">Porte Anestésico</th>
                    <th className="py-3 px-4 text-right">Honorário Base</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filtered.map((p) => (
                    <tr key={p.codigo} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-600">{p.codigo}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{p.nome}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]">
                          {p.especialidade}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">{p.porte}</td>
                      <td className="py-3.5 px-4 text-slate-500">{p.anestesico}</td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                        R$ {p.honorarioBase.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
