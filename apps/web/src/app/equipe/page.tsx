'use client';

import React, { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import {
  HeartHandshake,
  Plus,
  Search,
  User,
  ShieldCheck,
  Phone,
  Mail,
  DollarSign,
  Calendar,
  CheckCircle2
} from 'lucide-react';

export default function EquipePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const membros = [
    {
      id: 'EQ-01',
      nome: 'Dr. André Vasconcelos',
      crm: 'CRM 189.442-SP',
      funcao: '1º Auxiliar Cirúrgico',
      especialidade: 'Ortopedia & Traumatologia',
      telefone: '(11) 98765-1122',
      email: 'andre.vasconcelos@med.br',
      cirurgiasMes: 14,
      status: 'Disponível'
    },
    {
      id: 'EQ-02',
      nome: 'Dra. Beatriz Helena Lima',
      crm: 'CRM 201.330-SP',
      funcao: 'Anestesiologista (SBA/TSA)',
      especialidade: 'Anestesiologia',
      telefone: '(11) 97788-4455',
      email: 'beatriz.anest@clinica.com',
      cirurgiasMes: 18,
      status: 'Em Sala'
    },
    {
      id: 'EQ-03',
      nome: 'Lais Santos',
      crm: 'COREN 440.112',
      funcao: 'Instrumentadora Cirúrgica Chefe',
      especialidade: 'Instrumentação Ortopédica e Vascular',
      telefone: '(11) 99344-7788',
      email: 'lais.santos@inst.com',
      cirurgiasMes: 22,
      status: 'Disponível'
    },
    {
      id: 'EQ-04',
      nome: 'Dr. Rafael Moreira',
      crm: 'CRM 175.890-SP',
      funcao: '2º Auxiliar Cirúrgico',
      especialidade: 'Cirurgia Geral & Trauma',
      telefone: '(11) 98112-9900',
      email: 'rafael.moreira@med.br',
      cirurgiasMes: 8,
      status: 'Disponível'
    }
  ];

  const filtered = membros.filter(m =>
    m.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.funcao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.crm.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          title="Equipe Cirúrgica & Auxiliares"
          subtitle="Cadastro de cirurgiões auxiliares, anestesistas, instrumentadores e escalas de plantão"
        />

        <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Action Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">4 Profissionais na Equipe Ativa</h2>
                <p className="text-xs text-slate-500">Divisão automatizada de honorários e confirmação de presença em sala</p>
              </div>
            </div>

            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer">
              <Plus className="w-4 h-4" />
              Adicionar Membro da Equipe
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
                placeholder="Buscar por nome, CRM ou função..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((m) => (
              <div key={m.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      {m.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">{m.nome}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          m.status === 'Disponível'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {m.status}
                        </span>
                      </div>
                      <p className="text-xs text-blue-700 font-semibold">{m.funcao}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{m.crm}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs space-y-1.5 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{m.telefone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{m.email}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500">
                    <strong className="text-slate-900 font-bold">{m.cirurgiasMes} cirurgias</strong> acompanhadas este mês
                  </span>
                  <button className="text-blue-600 font-bold hover:underline cursor-pointer">
                    Histórico & Repasses →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
