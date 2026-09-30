'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, Stethoscope } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState('Herlonmoura@hotmail.com');
  const [password, setPassword] = useState('••••••••');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#090D16] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-operus-800/20 via-operus-500/10 to-transparent rounded-full blur-3xl pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-operus-600 to-operus-900 border border-operus-500/40 text-lime-300 shadow-2xl">
          <Stethoscope className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Operus <span className="text-lime-400 font-normal">Surgical Suite</span>
        </h2>
        <p className="text-xs text-slate-400">
          Acesso seguro para cirurgiões, equipes médicas e clínicas
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-slate-900/90 border border-slate-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail Profissional</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-operus-500 transition"
                  placeholder="medico@clinica.com.br"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Senha</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-operus-500 transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded bg-slate-950 border-slate-800 text-operus-600 focus:ring-0" />
                <span>Lembrar neste dispositivo</span>
              </label>
              <a href="#" className="text-lime-400 hover:underline">Esqueceu a senha?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-operus-700 hover:bg-operus-600 text-white font-bold text-xs shadow-lg transition active:scale-95 cursor-pointer"
            >
              <span>{loading ? 'Autenticando...' : 'Acessar Central Cirúrgica'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-lime-300" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
