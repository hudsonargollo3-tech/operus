'use client';

import React, { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import {
  Settings,
  User,
  Building2,
  Lock,
  Bell,
  Save,
  CheckCircle2,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

export default function PerfilConfiguracoesPage() {
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    nome: 'Dr. Lucas Arantes',
    crm: '142.890-SP',
    especialidade: 'Ortopedia e Traumatologia / Cirurgia do Quadril',
    email: 'dr.lucas@paulista.com.br',
    telefone: '(11) 98765-4321',
    clinicaNome: 'Instituto Cirúrgico Paulista',
    clinicaCnpj: '34.567.890/0001-12',
    endereco: 'Av. Paulista, 1842 - 14º Andar, Bela Vista, São Paulo - SP',
    notificarWhatsapp: true,
    notificarEmail: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          title="Configurações & Perfil Clínico"
          subtitle="Dados do cirurgião responsável, instituição técnica, equipe e preferências de notificação"
        />

        <main className="flex-1 p-6 space-y-6 max-w-4xl mx-auto w-full">
          <form onSubmit={handleSave} className="space-y-6">
            {/* Responsável Técnico */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Cirurgião Responsável</h3>
                  <p className="text-xs text-slate-500">Dados impressos automaticamente nos laudos, orçamentos e termos TCLE</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Nome Completo</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Registro Profissional (CRM/UF)</label>
                  <input
                    type="text"
                    value={formData.crm}
                    onChange={(e) => setFormData({ ...formData, crm: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition font-mono"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-semibold text-slate-700">Especialidade / RQE</label>
                  <input
                    type="text"
                    value={formData.especialidade}
                    onChange={(e) => setFormData({ ...formData, especialidade: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">E-mail</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>
            </div>

            {/* Clínica / Instituto */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Instituição & Clínica</h3>
                  <p className="text-xs text-slate-500">Dados do consultório ou grupo cirúrgico</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Razão Social / Nome Fantasia</label>
                  <input
                    type="text"
                    value={formData.clinicaNome}
                    onChange={(e) => setFormData({ ...formData, clinicaNome: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">CNPJ</label>
                  <input
                    type="text"
                    value={formData.clinicaCnpj}
                    onChange={(e) => setFormData({ ...formData, clinicaCnpj: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition font-mono"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-semibold text-slate-700">Endereço Completo</label>
                  <input
                    type="text"
                    value={formData.endereco}
                    onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>
            </div>

            {/* Submit Bar */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">
                {saved && <span className="text-emerald-600 font-bold flex items-center gap-1">✓ Alterações salvas com sucesso!</span>}
              </span>

              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Save className="w-4 h-4" />
                Salvar Configurações
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
