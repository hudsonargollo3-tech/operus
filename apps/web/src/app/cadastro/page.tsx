'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

async function captureLead(data: Record<string, string>) {
  try {
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch {
    // best-effort
  }
}

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlPlano = searchParams.get('plano') || '';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    crm: '',
    uf: 'SP',
    specialty: 'Cirurgia Geral',
    clinicName: '',
    plano: urlPlano,
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    captureLead({
      name: formData.name,
      email: formData.email,
      crm: formData.crm,
      uf: formData.uf,
      specialty: formData.specialty,
      plano: formData.plano,
      clinicName: formData.clinicName,
    });
    setTimeout(() => {
      router.push('/painel');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative antialiased selection:bg-[#1B58D6] selection:text-white">
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-[#1646BB]/35 via-[#2766E6]/25 to-sky-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2766E6] to-[#1646BB] border border-blue-400/30 text-white shadow-lg shadow-blue-900/30 mb-1">
            <svg className="w-7 h-7" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="rotate(15 20 20)">
                <path d="M14.2 14.6 a8.6 8.6 0 1 0 11.6 0" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round"/>
                <g fill="#ffffff">
                  <rect x="18.9" y="10.6" width="2.2" height="5.4" rx="0.5"/>
                  <rect x="18.7" y="15.8" width="2.6" height="0.8"/>
                  <path d="M18.7 16.6 L21.3 16.6 L21.3 19.4 Q21.3 21.2 20 21.2 Q18.7 21.0 18.7 19.4 Z"/>
                </g>
              </g>
            </svg>
          </Link>
          <h1 className="text-2xl font-extrabold text-white tracking-tight font-heading">
            Criar Conta no Operus
          </h1>
          <p className="text-xs text-slate-400">
            Cadastre seu consultório ou equipe cirúrgica em menos de 2 minutos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block font-semibold text-slate-300">Nome do Cirurgião(ã)</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Dr(a). Nome Sobrenome"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1B58D6]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-semibold text-slate-300">CRM / UF</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={formData.crm}
                  onChange={(e) => setFormData({ ...formData, crm: e.target.value })}
                  placeholder="123456"
                  className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1B58D6]"
                />
                <select
                  value={formData.uf}
                  onChange={(e) => setFormData({ ...formData, uf: e.target.value })}
                  className="w-20 px-2 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1B58D6]"
                >
                  <option value="SP">SP</option>
                  <option value="RJ">RJ</option>
                  <option value="MG">MG</option>
                  <option value="RS">RS</option>
                  <option value="PR">PR</option>
                  <option value="BA">BA</option>
                  <option value="DF">DF</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block font-semibold text-slate-300">Especialidade Cirúrgica</label>
              <select
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1B58D6]"
              >
                <option value="Cirurgia Geral">Cirurgia Geral</option>
                <option value="Cirurgia Plástica">Cirurgia Plástica</option>
                <option value="Ortopedia & Traumatologia">Ortopedia & Traumatologia</option>
                <option value="Cirurgia Vascular">Cirurgia Vascular</option>
                <option value="Neurocirurgia">Neurocirurgia</option>
                <option value="Urologia">Urologia</option>
                <option value="Ginecologia Cirúrgica">Ginecologia Cirúrgica</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block font-semibold text-slate-300">Nome da Clínica / Grupo</label>
              <input
                type="text"
                required
                value={formData.clinicName}
                onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                placeholder="Ex: Instituto Cirúrgico Paulista"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1B58D6]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-300">Plano de Interesse</label>
            <select
              value={formData.plano}
              onChange={(e) => setFormData({ ...formData, plano: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1B58D6]"
            >
              <option value="">Selecione um plano</option>
              <option value="solo">Solo Start — R$ 39,90/mês</option>
              <option value="consultorio">Consultório — R$ 49,90/mês</option>
              <option value="equipe">Equipe Pro — R$ 109,90/mês</option>
              <option value="enterprise">Enterprise — R$ 299,00/mês</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-300">E-mail Profissional</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="cirurgiao@clinica.com.br"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1B58D6]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-300">Definir Senha</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Mínimo de 8 caracteres"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1B58D6]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#1B58D6] hover:bg-[#2766E6] active:scale-[0.98] text-white font-bold rounded-xl shadow-lg shadow-blue-900/40 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Ativar Conta & Iniciar 14 Dias Grátis</span>
            )}
          </button>
        </form>

        <div className="text-center pt-3 border-t border-slate-800 text-xs text-slate-400">
          Já tem conta?{' '}
          <Link href="/login" className="text-sky-400 font-bold hover:underline">
            Fazer login
          </Link>
        </div>
      </div>
    </div>
  );
}
