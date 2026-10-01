'use client';

import React, { useState } from 'react';
import {
  Lock,
  ShieldCheck,
  KeyRound,
  FileCode,
  Palette,
  Sparkles,
  Copy,
  Check,
  Database,
  Smartphone,
  Globe,
  Share2
} from 'lucide-react';

export default function BlueprintViewerPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'concept-3d' | 'brand-identity' | 'architecture' | 'carousel'>('concept-3d');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlPass = params.get('pass') || params.get('password') || params.get('key') || params.get('auth') || params.get('p');
      const hash = window.location.hash ? window.location.hash.replace('#', '') : '';
      const cached = localStorage.getItem('operus_auth');

      if (
        urlPass === 'operus2026' || urlPass === 'clube2026' || urlPass === 'admin' ||
        hash === 'operus2026' || hash === 'clube2026' ||
        cached === 'true'
      ) {
        setIsAuthenticated(true);
        localStorage.setItem('operus_auth', 'true');
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'operus2026' || password === 'clube2026' || password === 'admin') {
      setIsAuthenticated(true);
      setErrorMsg('');
      if (typeof window !== 'undefined') {
        localStorage.setItem('operus_auth', 'true');
      }
    } else {
      setErrorMsg('Senha incorreta. Tente novamente.');
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090D16] text-white flex flex-col items-center justify-center p-4">
        <div className="absolute w-[350px] h-[350px] bg-gradient-to-tr from-[#1646BB]/40 via-[#2766E6]/25 to-sky-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-slate-900/95 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-md relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2766E6] to-[#1646BB] border border-blue-400/30 text-white shadow-xl shadow-blue-900/30 mb-2">
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
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight font-heading">
              Operus Blueprint Vault
            </h1>
            <p className="text-xs text-slate-400">
              Acesso protegido à arquitetura técnica, identidade visual e prompts de IA.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Chave de Acesso
              </label>
              <div className="relative col-span-2">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Digite a senha..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1B58D6] focus:border-transparent transition"
                  autoFocus
                />
              </div>
              {errorMsg && <p className="text-xs text-rose-400 mt-2 font-medium">{errorMsg}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#1B58D6] hover:bg-[#2766E6] active:scale-98 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-sky-300" />
              <span>Desbloquear Especificação</span>
            </button>
          </form>

          <div className="text-center pt-2 border-t border-slate-800/85">
            <span className="text-[11px] text-slate-500">
              Operus Surgical Suite • ClubeMkt Ecosystem
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2766E6] to-[#1646BB] border border-blue-400/30 flex items-center justify-center shadow-md">
            <svg className="w-5 h-5" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="rotate(15 20 20)">
                <path d="M14.2 14.6 a8.6 8.6 0 1 0 11.6 0" fill="none" stroke="#ffffff" strokeWidth="2.6" stroke-linecap="round"/>
                <g fill="#ffffff">
                  <rect x="18.9" y="10.6" width="2.2" height="5.4" rx="0.5"/>
                  <rect x="18.7" y="15.8" width="2.6" height="0.8"/>
                  <path d="M18.7 16.6 L21.3 16.6 L21.3 19.4 Q21.3 21.2 20 21.2 Q18.7 21.0 18.7 19.4 Z"/>
                </g>
              </g>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold text-white font-heading">OPERUS</h1>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-300 border border-blue-500/30">
                Blueprint Vault
              </span>
            </div>
            <p className="text-xs text-slate-400">Master Architecture, Original Cobalt Tokens & AI Prompting Hub</p>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-[61px] z-30 bg-slate-950/95 border-b border-slate-800/80 px-4 py-2 backdrop-blur-md">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-7xl mx-auto text-xs font-bold">
          <button onClick={() => setActiveTab('concept-3d' as any)} className={`tab-btn shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${activeTab === 'concept-3d' as any ? 'bg-[#1B58D6] text-white' : 'text-slate-400'}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Novo Conceito 3D & "OP"</span>
          </button>
          <button onClick={() => setActiveTab('brand-identity' as any)} className={`tab-btn shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${activeTab === 'brand-identity' as any ? 'bg-[#1B58D6] text-white' : 'text-slate-400'}`}>
            <Palette className="w-3.5 h-3.5" />
            <span>Cores Originais (#1B58D6)</span>
          </button>
          <button onClick={() => setActiveTab('architecture' as any)} className={`tab-btn shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${activeTab === 'architecture' as any ? 'bg-[#1B58D6] text-white' : 'text-slate-400'}`}>
            <Database className="w-3.5 h-3.5" />
            <span>Arquitetura & Rotas</span>
          </button>
          <button onClick={() => setActiveTab('carousel' as any)} className={`tab-btn shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${activeTab === 'carousel' as any ? 'bg-[#1B58D6] text-white' : 'text-slate-400'}`}>
            <Share2 className="w-3.5 h-3.5" />
            <span>Banners & Marketing</span>
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 space-y-6">

        {/* View: Concept 3D */}
        {activeTab === 'concept-3d' as any && (
          <div className="space-y-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-heading">
                <Sparkles className="w-5 h-5 text-sky-400" />
                Identidade Minimalista B2B SaaS (Zero RPG / Zero Gaming)
              </h2>
              <p className="text-xs text-slate-400">
                Formulação limpa com estética Apple Pro, Linear e Dieter Rams com parâmetros negativos anti-ruído.
              </p>
            </div>

            {/* Prompt 1 */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white font-heading">1. Logo Vetorial "OP" Contínuo (Linear / Stripe Style)</h3>
                <button onClick={() => copyToClipboard('Minimalist modern tech company logo for "OPERUS", abstract geometric monogram combining letter "O" and letter "P" into a continuous smooth ribbon loop with a clean vertical surgical alignment, single uniform line weight, subtle layered overlap shadows, vibrant cobalt blue (#1B58D6) and electric royal blue (#2766E6) on a clean dark slate background (#090D16), Apple design system, Linear app aesthetic, pure flat vector, Figma UI icon, mathematically balanced, no text, no runes, no swords, no gaming elements --ar 1:1 --v 6.1 --style raw --no sword, dagger, blade, runes, gaming, rpg, shield, crest, stars, magic, metallic armor, smoke, aura', 'p1')} className="flex items-center gap-1.5 bg-[#1B58D6] hover:bg-[#2766E6] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition">
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedId === 'p1' ? 'Copiado!' : 'Copiar Prompt'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-400">Vetor Puro 2D/2.5D com espessura única e zero armas/runas</p>
            </div>

            {/* Prompt 2 */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white font-heading">2. Ícone 3D de Luxo em Vidro Safira (Apple iOS Pro)</h3>
                <button onClick={() => copyToClipboard('Modern 3D iOS app icon for a medical technology SaaS called "Operus", rounded squircle dark slate icon container, featuring a clean floating abstract geometric "OP" loop in frosted sapphire glass and vibrant cobalt blue (#1B58D6), soft natural studio lighting, clean glass refraction, minimalist luxury industrial design, Octane render, 8k resolution, Apple Human Interface Guidelines aesthetic --ar 1:1 --v 6.1 --no sword, blade, runes, gaming, rpg, shield, crest, magic, smoke, flame', 'p2')} className="flex items-center gap-1.5 bg-[#1B58D6] hover:bg-[#2766E6] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition">
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedId === 'p2' ? 'Copiado!' : 'Copiar Prompt'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-400">Design Industrial Suíço, Vidro Fosco & Iluminação Suave</p>
            </div>
          </div>
        )}

        {/* View: Brand Identity */}
        {activeTab === 'brand-identity' && (
          <div className="space-y-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-heading">
                <Palette className="w-5 h-5 text-sky-400" />
                Identidade Visual & Cores Oficiais do Operus
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs font-bold">
                <div className="p-4 rounded-2xl bg-[#1B58D6] text-white">#1B58D6 - Azul Operus</div>
                <div className="p-4 rounded-2xl bg-[#2766E6] text-white">#2766E6 - Cobalt</div>
                <div className="p-4 rounded-2xl bg-[#1646BB] text-white">#1646BB - Sapphire</div>
                <div className="p-4 rounded-2xl bg-[#0F172A] text-white border border-slate-800">#0F172A - Slate</div>
              </div>
            </div>
          </div>
        )}

        {/* View: Architecture */}
        {activeTab === 'architecture' && (
          <div className="space-y-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-heading">
                <Database className="w-5 h-5 text-sky-400" />
                Monorepo Operus & Modelos de Dados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs leading-relaxed">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="font-bold text-sky-400">apps/web (Next.js 15)</span>
                  <p className="text-slate-400 mt-1">App Router, faturamento, TCLE digital público e orçamentos.</p>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="font-bold text-blue-400">apps/mobile (Expo SDK 52)</span>
                  <p className="text-slate-400 mt-1">React Native, câmera para curativos, biometria facial.</p>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                  <span className="font-bold text-indigo-400">packages/types</span>
                  <p className="text-slate-400 mt-1">Tipagens TypeScript completas para faturamento, TUSS e equipe.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View: Carousel Marketing */}
        {activeTab === 'carousel' && (
          <div className="space-y-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-heading">
                <Share2 className="w-5 h-5 text-sky-400" />
                Roteiro de Carrossel Instagram & Prompts 4:5
              </h2>
              <p className="text-xs text-slate-400">Pressione copiar para extrair o prompt de imagem do Midjourney correspondente.</p>
            </div>

            {/* Slide 1 */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                <h4 className="font-bold text-white text-sm">Lâmina 01 • Por que cirurgiões de elite abandonaram o WhatsApp?</h4>
                <button onClick={() => copyToClipboard('/imagine prompt: High-contrast 4:5 Instagram carousel slide background, dark obsidian (#090D16) surface with a glowing frosted sapphire glass smartphone displaying fragmented chat bubbles dissolving into structured cobalt blue (#1B58D6) surgical data widgets, dramatic studio lighting, ultra-clean medical SaaS aesthetic --ar 4:5 --v 6.1 --style raw', 'c1')} className="flex items-center gap-1.5 bg-[#1B58D6] text-white px-3 py-1.5 rounded-lg font-bold transition">
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedId === 'c1' ? 'Copiado!' : 'Copiar Prompt Visual'}</span>
                </button>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl font-mono text-[11px] text-slate-400 leading-relaxed select-all">/imagine prompt: High-contrast 4:5 Instagram carousel slide background, dark obsidian (#090D16) surface with a glowing frosted sapphire glass smartphone displaying fragmented chat bubbles dissolving into structured cobalt blue (#1B58D6) surgical data widgets, dramatic studio lighting, ultra-clean medical SaaS aesthetic --ar 4:5 --v 6.1 --style raw</div>
            </div>

            {/* Slide 2 */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                <h4 className="font-bold text-white text-sm">Lâmina 02 • Glosas de Convênio & Falhas de OPME</h4>
                <button onClick={() => copyToClipboard('/imagine prompt: Minimalist 4:5 Instagram carousel slide visual, 3D floating medical document with red warning highlight badges and transparent glass surgical implants (OPME) surrounded by amber and cobalt analytical charts, dark slate aesthetic, studio caustics --ar 4:5 --v 6.1 --style raw', 'c2')} className="flex items-center gap-1.5 bg-[#1B58D6] text-white px-3 py-1.5 rounded-lg font-bold transition">
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedId === 'c2' ? 'Copiado!' : 'Copiar Prompt Visual'}</span>
                </button>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl font-mono text-[11px] text-slate-400 leading-relaxed select-all">/imagine prompt: Minimalist 4:5 Instagram carousel slide visual, 3D floating medical document with red warning highlight badges and transparent glass surgical implants (OPME) surrounded by amber and cobalt analytical charts, dark slate aesthetic, studio caustics --ar 4:5 --v 6.1 --style raw</div>
            </div>

            {/* Slide 3 */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                <h4 className="font-bold text-white text-sm">Lâmina 03 • Operus: Central Cirúrgica em Tempo Real</h4>
                <button onClick={() => copyToClipboard('/imagine prompt: Premium 4:5 Instagram slide visual, floating ultra-thin glass tablet showcasing the Operus surgical calendar and multi-procedure timeline in vibrant cobalt blue (#1B58D6) and clean white, soft glowing rim light on dark background --ar 4:5 --v 6.1 --style raw', 'c3')} className="flex items-center gap-1.5 bg-[#1B58D6] text-white px-3 py-1.5 rounded-lg font-bold transition">
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedId === 'c3' ? 'Copiado!' : 'Copiar Prompt Visual'}</span>
                </button>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl font-mono text-[11px] text-slate-400 leading-relaxed select-all">/imagine prompt: Premium 4:5 Instagram slide visual, floating ultra-thin glass tablet showcasing the Operus surgical calendar and multi-procedure timeline in vibrant cobalt blue (#1B58D6) and clean white, soft glowing rim light on dark background --ar 4:5 --v 6.1 --style raw</div>
            </div>

            {/* Slide 4 */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                <h4 className="font-bold text-white text-sm">Lâmina 04 • TCLE Digital com Validade CFM e Repasse Automático</h4>
                <button onClick={() => copyToClipboard('/imagine prompt: Modern 4:5 Instagram slide visual, 3D biometric digital signature stamp glowing in emerald green (#10B981) and cobalt blue on a sleek encrypted medical legal certificate, floating in dark space with grid lines --ar 4:5 --v 6.1 --style raw', 'c4')} className="flex items-center gap-1.5 bg-[#1B58D6] text-white px-3 py-1.5 rounded-lg font-bold transition">
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedId === 'c4' ? 'Copiado!' : 'Copiar Prompt Visual'}</span>
                </button>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl font-mono text-[11px] text-slate-400 leading-relaxed select-all">/imagine prompt: Modern 4:5 Instagram slide visual, 3D biometric digital signature stamp glowing in emerald green (#10B981) and cobalt blue on a sleek encrypted medical legal certificate, floating in dark space with grid lines --ar 4:5 --v 6.1 --style raw</div>
            </div>

            {/* Slide 5 */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                <h4 className="font-bold text-white text-sm">Lâmina 05 • Eleve a governança da sua prática cirúrgica</h4>
                <button onClick={() => copyToClipboard('/imagine prompt: Luxury 4:5 Instagram carousel finale slide, glowing 3D "OP Scalpel" sapphire glass emblem floating above a polished dark pedestal with subtle blue volumetric fog and an invitation button reading "Comece Agora", Apple keynote lighting, 8k --ar 4:5 --v 6.1 --style raw', 'c5')} className="flex items-center gap-1.5 bg-[#1B58D6] text-white px-3 py-1.5 rounded-lg font-bold transition">
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedId === 'c5' ? 'Copiado!' : 'Copiar Prompt Visual'}</span>
                </button>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl font-mono text-[11px] text-slate-400 leading-relaxed select-all">/imagine prompt: Luxury 4:5 Instagram carousel finale slide, glowing 3D "OP Scalpel" sapphire glass emblem floating above a polished dark pedestal with subtle blue volumetric fog and an invitation button reading "Comece Agora", Apple keynote lighting, 8k --ar 4:5 --v 6.1 --style raw</div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 p-6 text-center text-xs text-slate-500">
        Operus Surgical Suite • Blueprint Vault & Prompting Intelligence • Powered by ClubeMkt
      </footer>
    </div>
  );
}
