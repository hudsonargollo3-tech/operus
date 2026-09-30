'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen message="Operus Surgical Suite" submessage="Iniciando plataforma cirúrgica..." />;
  }

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col antialiased selection:bg-[#1B58D6] selection:text-white">
      
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2766E6] to-[#1646BB] border border-blue-400/30 flex items-center justify-center shadow-lg shadow-blue-900/30">
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
          </Link>
          <div>
            <span className="text-base font-bold text-white font-heading tracking-tight block leading-none">OPERUS</span>
            <span className="text-[10px] text-sky-400 font-semibold uppercase tracking-wider">Surgical Suite</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <a href="#features" className="hover:text-white transition">Funcionalidades</a>
          <a href="#tuss-tcle" className="hover:text-white transition">TUSS & TCLE</a>
          <a href="#pricing" className="hover:text-white transition">Planos</a>
          <Link href="/blog" className="hover:text-white transition">Blog & Conteúdo</Link>
          <Link href="/blueprint" className="text-sky-400 hover:text-sky-300 transition">Blueprint Vault</Link>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3 text-xs">
          <Link href="/login" className="px-3.5 py-2 text-slate-300 hover:text-white font-semibold transition">
            Entrar
          </Link>
          <Link href="/cadastro" className="px-4 py-2 bg-[#1B58D6] hover:bg-[#2766E6] text-white font-bold rounded-xl shadow-md shadow-blue-900/30 transition">
            Começar Grátis
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pt-16 pb-20 max-w-6xl mx-auto w-full text-center space-y-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#1646BB]/30 via-[#2766E6]/20 to-sky-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-sky-300 text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>O Sistema Operacional do Cirurgião Moderno</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-heading leading-[1.15]">
            Da agenda com a equipe ao aceite digital de TCLE em{' '}
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-[#1B58D6] bg-clip-text text-transparent">
              30 segundos
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Elimine glosas em multi-procedimentos TUSS, automatize a coleta legal de TCLE e unifique a comunicação com hospitais, anestesistas e fornecedores de OPME.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link href="/cadastro" className="px-7 py-3.5 bg-[#1B58D6] hover:bg-[#2766E6] text-white font-bold text-sm rounded-xl shadow-xl shadow-blue-900/40 transition active:scale-95">
            Iniciar Teste Grátis de 14 Dias
          </Link>
          <Link href="/painel" className="px-7 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm rounded-xl transition">
            Explorar Demonstração Interativa
          </Link>
        </div>

        {/* Quick Social Proof */}
        <div className="relative z-10 pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Conformidade CFM nº 2.299/2021</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Cálculo TUSS 100/70/50% Automático</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Auditoria Pré-Faturamento Zero Glosas</span>
          </div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section id="features" className="px-4 sm:px-6 py-16 max-w-6xl mx-auto w-full space-y-8 border-t border-slate-800/80">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs text-sky-400 font-bold uppercase tracking-wider">Governança Cirúrgica Completa</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Tudo o que sua equipe precisa em um só lugar
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          {/* Card 1 */}
          <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-3 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-blue-950 text-sky-300 flex items-center justify-center font-bold text-base">
              📋
            </div>
            <h3 className="text-base font-bold text-white font-heading">TCLE Digital com Validade Legal</h3>
            <p className="text-slate-400 leading-relaxed">
              Envio por WhatsApp e SMS com link seguro. O paciente assina na tela do celular com registro de IP, timestamp e geolocalização auditável.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-3 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-blue-950 text-sky-300 flex items-center justify-center font-bold text-base">
              ⚖️
            </div>
            <h3 className="text-base font-bold text-white font-heading">Auditoria de Vias de Acesso TUSS</h3>
            <p className="text-slate-400 leading-relaxed">
              Composição automática de regras de via única e vias distintas (100%, 70% e 50%), blindando o envio contra glosas das operadoras.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-3 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-blue-950 text-sky-300 flex items-center justify-center font-bold text-base">
              📦
            </div>
            <h3 className="text-base font-bold text-white font-heading">Rastreamento de OPME & Instrumental</h3>
            <p className="text-slate-400 leading-relaxed">
              Controle em tempo real da cotação, autorização do convênio e entrega de caixas cirúrgicas e próteses no hospital.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Matrix */}
      <section id="pricing" className="px-4 sm:px-6 py-16 max-w-6xl mx-auto w-full space-y-8 border-t border-slate-800/80">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs text-sky-400 font-bold uppercase tracking-wider">Planos Transparentes</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Escolha o plano ideal para sua prática
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Tier 1 */}
          <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white font-heading">Cirurgião Solo</h3>
              <p className="text-slate-400">Para cirurgiões com equipe reduzida</p>
              <div className="pt-2">
                <span className="text-3xl font-extrabold text-white font-mono">R$ 290</span>
                <span className="text-slate-400">/mês</span>
              </div>
              <ul className="space-y-2 text-slate-300 pt-3 border-t border-slate-800">
                <li>✓ Até 25 cirurgias por mês</li>
                <li>✓ TCLE Digital Ilimitado</li>
                <li>✓ Cálculo TUSS Automático</li>
                <li>✓ 1 Usuário Cirurgião + 1 Secretária</li>
              </ul>
            </div>
            <Link href="/cadastro" className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-center rounded-xl transition block">
              Escolher Solo
            </Link>
          </div>

          {/* Tier 2: Featured */}
          <div className="p-6 bg-gradient-to-b from-[#1646BB]/40 to-slate-900 border-2 border-blue-500 rounded-3xl space-y-5 flex flex-col justify-between shadow-2xl relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#1B58D6] text-white text-[10px] font-bold uppercase tracking-wider shadow">
              Mais Popular
            </span>
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white font-heading">Equipe Pro</h3>
              <p className="text-slate-300">Para grupos e equipes cirúrgicas</p>
              <div className="pt-2">
                <span className="text-3xl font-extrabold text-white font-mono">R$ 490</span>
                <span className="text-slate-400">/mês</span>
              </div>
              <ul className="space-y-2 text-slate-200 pt-3 border-t border-slate-800">
                <li>✓ Cirurgias ilimitadas</li>
                <li>✓ Repasse automático de honorários</li>
                <li>✓ Acesso para auxiliares e anestesistas</li>
                <li>✓ Rastreamento completo de OPME</li>
                <li>✓ Suporte prioritário via WhatsApp</li>
              </ul>
            </div>
            <Link href="/cadastro" className="w-full py-3 bg-[#1B58D6] hover:bg-[#2766E6] text-white font-bold text-center rounded-xl shadow-lg shadow-blue-900/40 transition block">
              Assinar Equipe Pro
            </Link>
          </div>

          {/* Tier 3 */}
          <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white font-heading">Clínica Enterprise</h3>
              <p className="text-slate-400">Hospitais dia e clínicas de alta complexidade</p>
              <div className="pt-2">
                <span className="text-3xl font-extrabold text-white font-mono">R$ 890</span>
                <span className="text-slate-400">/mês</span>
              </div>
              <ul className="space-y-2 text-slate-300 pt-3 border-t border-slate-800">
                <li>✓ Multi-tenancy e múltiplos CNPJs</li>
                <li>✓ Integração direta com ERP Hospitalar</li>
                <li>✓ API de prontuários & Webhooks</li>
                <li>✓ Gerente de conta dedicado</li>
              </ul>
            </div>
            <Link href="/cadastro" className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-center rounded-xl transition block">
              Falar com Consultor
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 p-8 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">OPERUS SURGICAL SUITE</span>
            <span>• ClubeMkt Ecosystem</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="hover:text-slate-300">Blog</Link>
            <Link href="/login" className="hover:text-slate-300">Entrar</Link>
            <Link href="/cadastro" className="hover:text-slate-300">Cadastre-se</Link>
            <Link href="/admin" className="hover:text-slate-300">Super Admin</Link>
            <Link href="/painel" className="hover:text-slate-300">Painel Tenant</Link>
            <Link href="/blueprint" className="hover:text-slate-300">Blueprint Vault</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
