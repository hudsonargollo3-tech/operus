'use client';

import React, { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import { Users, Plus, Search, Filter, Phone, Mail, FileText, Calendar, MoreVertical, ShieldCheck, ChevronRight } from 'lucide-react';

export default function PacientesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const pacientes = [
    {
      id: '1',
      nome: 'Maria Aparecida dos Santos',
      cpf: '432.891.045-88',
      convenio: 'Bradesco Saúde Top Nacional',
      telefone: '(71) 99182-3344',
      email: 'maria.aparecida@gmail.com',
      idade: '54 anos',
      ultimaCirurgia: 'Safenectomia Bilateral (02/10/2026)',
      status: 'Pós-Op Ativo'
    },
    {
      id: '2',
      nome: 'Roberto Carlos Oliveira',
      cpf: '128.940.332-15',
      convenio: 'SulAmérica Especial',
      telefone: '(71) 98845-1200',
      email: 'roberto.carlos@uol.com.br',
      idade: '62 anos',
      ultimaCirurgia: 'Endarterectomia (03/10/2026)',
      status: 'Pré-Op'
    },
    {
      id: '3',
      nome: 'Claudio Henrique Mendes',
      cpf: '784.102.948-00',
      convenio: 'Particular',
      telefone: '(71) 99311-8899',
      email: 'claudio.mendes@adv.br',
      idade: '41 anos',
      ultimaCirurgia: 'Termoablação Laser (06/10/2026)',
      status: 'Agendado'
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          title="Pacientes & Prontuários"
          subtitle="Base cadastral médica, contatos, convênios e histórico cirúrgico"
        />

        <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Action and Search Header */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 min-w-[280px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por nome, CPF, telefone ou convênio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-operus-600 focus:bg-white transition"
              />
            </div>

            <button className="flex items-center gap-1.5 bg-operus-700 hover:bg-operus-800 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-xs transition">
              <Plus className="w-4 h-4 text-lime-300" />
              <span>Novo Paciente</span>
            </button>
          </div>

          {/* Table of Patients */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-4">Paciente</th>
                    <th className="p-4">Convênio / CPF</th>
                    <th className="p-4">Contatos</th>
                    <th className="p-4">Procedimento / Status</th>
                    <th className="p-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pacientes.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-operus-50 text-operus-800 font-bold flex items-center justify-center border border-operus-200">
                            {p.nome.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{p.nome}</p>
                            <p className="text-slate-400 text-[11px]">{p.idade}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 space-y-0.5">
                        <p className="font-semibold text-slate-800">{p.convenio}</p>
                        <p className="text-slate-400 font-mono text-[11px]">CPF: {p.cpf}</p>
                      </td>
                      <td className="p-4 space-y-1">
                        <p className="flex items-center gap-1.5 text-slate-600">
                          <Phone className="w-3.5 h-3.5 text-slate-400" /> {p.telefone}
                        </p>
                        <p className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                          <Mail className="w-3.5 h-3.5 text-slate-400" /> {p.email}
                        </p>
                      </td>
                      <td className="p-4 space-y-1">
                        <p className="font-medium text-slate-800 truncate max-w-xs">{p.ultimaCirurgia}</p>
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 font-semibold text-slate-700 transition">
                          Prontuário
                        </button>
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
