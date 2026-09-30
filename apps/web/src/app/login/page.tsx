'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Direct routing for instant feedback
    setTimeout(() => {
      if (email.includes('admin') || email.includes('hudson')) {
        router.push('/admin');
      } else {
        router.push('/painel');
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative antialiased selection:bg-[#1B58D6] selection:text-white">
      {/* Ambient Radial Glow */}
      <div className="absolute w-[450px] h-[450px] bg-gradient-to-tr from-[#1646BB]/35 via-[#2766E6]/25 to-sky-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2766E6] to-[#1646BB] border border-blue-400/30 text-white shadow-xl shadow-blue-900/30 mb-2">
            <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            Acessar Operus
          </h1>
          <p className="text-xs text-slate-400">
            Inteligência e governança para sua equipe cirúrgica
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-300">E-mail Profissional</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ex: cirurgiao@clinica.com.br"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1B58D6] transition"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block font-semibold text-slate-300">Senha</label>
              <a href="#" className="text-sky-400 hover:underline">Esqueceu a senha?</a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1B58D6] transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#1B58D6] hover:bg-[#2766E6] active:scale-[0.98] text-white font-bold rounded-xl shadow-lg shadow-blue-900/40 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Entrar na Central Cirúrgica</span>
            )}
          </button>
        </form>

        <div className="text-center pt-3 border-t border-slate-800 text-xs text-slate-400">
          Ainda não tem conta?{' '}
          <Link href="/cadastro" className="text-sky-400 font-bold hover:underline">
            Criar conta de cirurgião
          </Link>
        </div>
      </div>
    </div>
  );
}
