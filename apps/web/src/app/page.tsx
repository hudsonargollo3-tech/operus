'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

// Lead capture via Cloudflare KV
async function captureLead(plano: string) {
  try {
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plano, source: 'landing' }),
    });
  } catch {
    // Silently fail — lead capture is best-effort
  }
}



export default function LandingPage() {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

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
          <button
            onClick={() => { captureLead(''); router.push('/cadastro'); }}
            className="px-4 py-2 bg-[#1B58D6] hover:bg-[#2766E6] text-white font-bold rounded-xl shadow-md shadow-blue-900/30 transition cursor-pointer"
          >
            Começar Grátis
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pt-16 pb-20 max-w-6xl mx-auto w-full text-center space-y-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#1646BB]/30 via-[#2766E6]/20 to-sky-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-sky-300 text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>O SaaS Cirúrgico que Fecha Glosas e Libera Tempo</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-heading leading-[1.15]">
            Gestão cirúrgica completa — TCLE digital, TUSS, OPME e auditoria zero glosas.
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-[#1B58D6] bg-clip-text text-transparent">
              30 segundos
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Plataforma SaaS para cirurgiões e clínicas — gestão de pacientes, agenda com equipe, aceite digital de TCLE com validade legal, cálculo TUSS automático e rastreamento de OPME.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => { captureLead(''); router.push('/cadastro'); }}
            className="px-7 py-3.5 bg-[#1B58D6] hover:bg-[#2766E6] text-white font-bold text-sm rounded-xl shadow-xl shadow-blue-900/40 transition active:scale-95 cursor-pointer"
          >
            Iniciar Teste Grátis de 14 Dias
          </button>
          <button
            onClick={() => { captureLead('demo'); router.push('/painel'); }}
            className="px-7 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm rounded-xl transition cursor-pointer"
          >
            Explorar Demonstração Interativa
          </button>
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
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs text-sky-400 font-bold uppercase tracking-wider bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            Tabela de Lançamento Oficial
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Planos sob medida para sua rotina cirúrgica
          </h2>
          <p className="text-xs text-slate-400">
            Valores promocionais de early-access garantidos para os primeiros 100 cirurgiões.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Plano 1: Solo Start */}
          <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-4 flex flex-col justify-between hover:border-slate-700 transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-heading">1. Solo Start</h3>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Básico</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">Para cirurgiões individuais iniciando a digitalização da rotina.</p>
              
              <div className="pt-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-white font-mono">R$ 39,90</span>
                  <span className="text-slate-400 text-[11px]">/mês</span>
                </div>
                <p className="text-[10px] text-slate-500 line-through">De R$ 59,90 após lançamento</p>
              </div>

              <ul className="space-y-2 text-slate-300 pt-3 border-t border-slate-800/80 text-[11px]">
                <li className="flex items-center gap-1.5">✓ <strong>1 Médico + 1 Secretária</strong></li>
                <li className="flex items-center gap-1.5">✓ Gestão de cirurgias com status</li>
                <li className="flex items-center gap-1.5">✓ Cadastro e prontuário manual</li>
                <li className="flex items-center gap-1.5">✓ Timeline da agenda semanal</li>
              </ul>
            </div>
            <Link href="/cadastro?plano=solo" className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-center rounded-xl transition block text-xs">
              Começar Solo
            </Link>
          </div>

          {/* Plano 2: Duo / Consultório */}
          <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-4 flex flex-col justify-between hover:border-slate-700 transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-heading">2. Consultório</h3>
                <span className="text-[10px] text-sky-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">Financeiro</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">Para consultórios com até 3 médicos e orçamentos rápidos.</p>
              
              <div className="pt-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-white font-mono">R$ 49,90</span>
                  <span className="text-slate-400 text-[11px]">/mês</span>
                </div>
                <p className="text-[10px] text-slate-500 line-through">De R$ 69,90 após lançamento</p>
              </div>

              <ul className="space-y-2 text-slate-300 pt-3 border-t border-slate-800/80 text-[11px]">
                <li className="flex items-center gap-1.5">✓ <strong>Até 3 Médicos + 1 Secretária</strong></li>
                <li className="flex items-center gap-1.5">✓ <strong>Gestão Financeira</strong> de honorários</li>
                <li className="flex items-center gap-1.5">✓ <strong>Alimentação por Fotos</strong> e exames</li>
                <li className="flex items-center gap-1.5">✓ <strong>Gerador de Orçamentos</strong> Cirúrgicos</li>
              </ul>
            </div>
            <Link href="/cadastro?plano=consultorio" className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-center rounded-xl transition block text-xs">
              Começar Consultório
            </Link>
          </div>

          {/* Plano 3: Equipe Pro (Destaque) */}
          <div className="p-5 bg-gradient-to-b from-[#1646BB]/40 to-slate-900 border-2 border-blue-500 rounded-3xl space-y-4 flex flex-col justify-between shadow-2xl relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#1B58D6] text-white text-[9px] font-bold uppercase tracking-wider shadow">
              Mais Recomendado
            </span>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-heading">3. Equipe Pro</h3>
                <span className="text-[10px] text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">TCLE Digital</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">Governança completa para equipes cirúrgicas e termos digitais.</p>
              
              <div className="pt-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-white font-mono">R$ 109,90</span>
                  <span className="text-slate-400 text-[11px]">/mês</span>
                </div>
                <p className="text-[10px] text-slate-400 line-through">De R$ 159,00 após lançamento</p>
              </div>

              <ul className="space-y-2 text-slate-200 pt-3 border-t border-slate-800 text-[11px]">
                <li className="flex items-center gap-1.5">✓ <strong>Múltiplos Médicos + Até 3 Secretárias</strong></li>
                <li className="flex items-center gap-1.5">✓ <strong>Criação de Equipes</strong> (Auxiliares/Anest)</li>
                <li className="flex items-center gap-1.5">✓ <strong>TCLE Digital</strong> com Assinatura Legal</li>
                <li className="flex items-center gap-1.5">✓ <strong>Upload de Fotos</strong> e curativos</li>
                <li className="flex items-center gap-1.5">✓ Auditoria TUSS e Orçamentos</li>
              </ul>
            </div>
            <Link href="/cadastro?plano=equipe" className="w-full py-2.5 bg-[#1B58D6] hover:bg-[#2766E6] text-white font-bold text-center rounded-xl shadow-lg shadow-blue-900/40 transition block text-xs">
              Assinar Equipe Pro
            </Link>
          </div>

          {/* Plano 4: Clínica Enterprise */}
          <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-4 flex flex-col justify-between hover:border-slate-700 transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-heading">4. Enterprise</h3>
                <span className="text-[10px] text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">Clínicas</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">Para clínicas de alta complexidade, hospitais dia e múltiplos CNPJs.</p>
              
              <div className="pt-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-white font-mono">R$ 299,00</span>
                  <span className="text-slate-400 text-[11px]">/mês</span>
                </div>
                <p className="text-[10px] text-slate-500">Ou sob consulta para redes</p>
              </div>

              <ul className="space-y-2 text-slate-300 pt-3 border-t border-slate-800/80 text-[11px]">
                <li className="flex items-center gap-1.5">✓ <strong>Médicos & Secretárias Ilimitados</strong></li>
                <li className="flex items-center gap-1.5">✓ <strong>Multi-Unidades</strong> & Múltiplos CNPJs</li>
                <li className="flex items-center gap-1.5">✓ <strong>Rastreamento de OPME</strong> avançado</li>
                <li className="flex items-center gap-1.5">✓ API, Webhooks & Integração ERP</li>
                <li className="flex items-center gap-1.5">✓ Gerente de Conta Dedicado VIP</li>
              </ul>
            </div>
            <Link href="/cadastro?plano=enterprise" className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-center rounded-xl transition block text-xs">
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
