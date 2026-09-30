'use client';

import React, { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import {
  Calendar,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Hospital,
  User,
  Stethoscope,
  MoreVertical,
  X
} from 'lucide-react';

export default function CirurgiasPage() {
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for New Surgery Modal
  const [formData, setFormData] = useState({
    paciente_nome: '',
    convenio: 'Bradesco Saúde',
    hospital: 'Hospital Santa Joana',
    sala: 'Sala 4',
    data: '2026-10-05T08:00',
    procedimento_principal: '30906155 - Safenectomia Bilateral',
    necessita_opme: true,
    opme_descricao: 'Fibra Laser Radial 1470nm + Introdutor 6F',
    primeiro_auxiliar: 'Dr. Matheus Serapião (CRM 31204)',
    anestesista: 'Dra. Vanessa Costa (CRM 19844)',
    instrumentador: 'Lais Santos',
  });

  const cirurgias = [
    {
      id: '1',
      paciente: 'Maria Aparecida dos Santos',
      convenio: 'Bradesco Saúde Top Nacional',
      hospital: 'Hospital Santa Joana',
      sala: 'Sala 4',
      data: '02/10/2026 às 07:30',
      procedimentos: ['30906155 - Safenectomia Bilateral (100%)', '30906147 - Flebectomias Múltiplas (70%)'],
      status: 'autorizada',
      equipe: 'Dr. Matheus Serapião (1º Aux), Dra. Vanessa Costa (Anest)',
      opme: 'Fibra Laser Radial 1470nm (Entregue no Hospital)'
    },
    {
      id: '2',
      paciente: 'Roberto Carlos Oliveira',
      convenio: 'SulAmérica Especial',
      hospital: 'Hospital Aliança',
      sala: 'Sala 2',
      data: '03/10/2026 às 10:00',
      procedimentos: ['30904012 - Endarterectomia de Carótida (100%)'],
      status: 'em_autorizacao',
      equipe: 'Dr. Lelivaldo Britto (1º Aux), Dr. Davi Silva (Anest)',
      opme: 'Patch de Dacron + Shunt de Javid (Em análise de guia)'
    },
    {
      id: '3',
      paciente: 'Claudio Henrique Mendes',
      convenio: 'Particular (Orçamento #1042)',
      hospital: 'Day Clinic Clap Varizes',
      sala: 'Sala Procedimentos 1',
      data: '06/10/2026 às 14:00',
      procedimentos: ['30906163 - Termoablação Endovenosa Guiada por US'],
      status: 'agendada',
      equipe: 'Dra. Mariana Lima (Aux)',
      opme: 'N/A'
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          title="Agenda & Cirurgias"
          subtitle="Gerenciamento de procedimentos cirúrgicos, salas, equipes e autorizações"
          onNewSurgery={() => setIsModalOpen(true)}
        />

        <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {['todos', 'autorizada', 'em_autorizacao', 'agendada', 'realizada'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                    filterStatus === st
                      ? 'bg-operus-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st === 'em_autorizacao' ? 'Em Autorização' : st}
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1.5 bg-operus-700 hover:bg-operus-800 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-xs transition"
              >
                <Plus className="w-4 h-4 text-lime-300" />
                <span>Nova Cirurgia</span>
              </button>
            </div>
          </div>

          {/* Surgery Cards List */}
          <div className="grid grid-cols-1 gap-4">
            {cirurgias.map((cir) => (
              <div
                key={cir.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-operus-500/40 transition space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-operus-50 text-operus-800 flex items-center justify-center border border-operus-200/50">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{cir.paciente}</h3>
                      <p className="text-xs text-slate-500">{cir.convenio}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {cir.status === 'autorizada' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Autorizada
                      </span>
                    )}
                    {cir.status === 'em_autorizacao' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock className="w-3.5 h-3.5" /> Em Autorização
                      </span>
                    )}
                    {cir.status === 'agendada' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        Agendada Particular
                      </span>
                    )}

                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase">Hospital & Horário</span>
                    <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <Hospital className="w-3.5 h-3.5 text-slate-500" />
                      {cir.hospital} ({cir.sala})
                    </p>
                    <p className="text-slate-600 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {cir.data}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase">Procedimentos (TUSS)</span>
                    {cir.procedimentos.map((p, idx) => (
                      <p key={idx} className="text-slate-800 font-medium truncate">
                        • {p}
                      </p>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase">Equipe & OPME</span>
                    <p className="text-slate-700 truncate">
                      <strong>Equipe:</strong> {cir.equipe}
                    </p>
                    <p className="text-slate-700 truncate">
                      <strong>OPME:</strong> {cir.opme}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal: Nova Cirurgia */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-operus-700 text-lime-300 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Agendar Nova Cirurgia</h3>
                  <p className="text-xs text-slate-500">Cadastre o paciente, procedimentos TUSS e equipe cirúrgica</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Nome do Paciente</label>
                  <input
                    type="text"
                    placeholder="Ex: João da Silva"
                    value={formData.paciente_nome}
                    onChange={(e) => setFormData({ ...formData, paciente_nome: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-operus-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Convênio / Pagamento</label>
                  <select
                    value={formData.convenio}
                    onChange={(e) => setFormData({ ...formData, convenio: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-operus-600 focus:outline-none"
                  >
                    <option>Bradesco Saúde</option>
                    <option>Unimed</option>
                    <option>SulAmérica</option>
                    <option>Amil</option>
                    <option>Particular</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Hospital</label>
                  <input
                    type="text"
                    value={formData.hospital}
                    onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-operus-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Sala Cirúrgica</label>
                  <input
                    type="text"
                    value={formData.sala}
                    onChange={(e) => setFormData({ ...formData, sala: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-operus-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Data e Hora</label>
                  <input
                    type="datetime-local"
                    value={formData.data}
                    onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-operus-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Procedimento Principal (Código TUSS / Nome)</label>
                <input
                  type="text"
                  value={formData.procedimento_principal}
                  onChange={(e) => setFormData({ ...formData, procedimento_principal: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-operus-600 focus:outline-none"
                />
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <span className="font-bold text-slate-900 block">Equipe Cirúrgica Alocada</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="1º Cirurgião Auxiliar"
                    value={formData.primeiro_auxiliar}
                    onChange={(e) => setFormData({ ...formData, primeiro_auxiliar: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-operus-600 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Médico Anestesista"
                    value={formData.anestesista}
                    onChange={(e) => setFormData({ ...formData, anestesista: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-operus-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-200 text-xs font-semibold transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert('Cirurgia agendada com sucesso!');
                  setIsModalOpen(false);
                }}
                className="px-5 py-2 rounded-lg bg-operus-700 hover:bg-operus-800 text-white text-xs font-bold shadow-md transition"
              >
                Confirmar Agendamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
