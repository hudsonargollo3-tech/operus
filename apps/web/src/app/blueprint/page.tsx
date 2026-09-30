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
  LayoutDashboard,
  Calendar,
  Users,
  Eye,
  Download,
  Share2,
  ExternalLink,
  ChevronRight,
  Database,
  Smartphone,
  Globe
} from 'lucide-react';

export default function BlueprintViewerPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'architecture' | 'branding' | 'prompts' | 'design-system'>('architecture');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'operus2026' || password === 'clube2026' || password === 'admin') {
      setIsAuthenticated(true);
      setErrorMsg('');
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
        <div className="absolute w-[350px] h-[350px] bg-gradient-to-tr from-emerald-800/30 via-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 p-8 rounded-2xl shadow-2xl backdrop-blur-md relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-700 to-slate-900 border border-emerald-500/40 text-lime-300 mb-2 shadow-lg">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Operus Blueprint Vault
            </h1>
            <p className="text-xs text-slate-400">
              Acesso protegido à arquitetura técnica, identidade visual e prompts de IA.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Chave de Acesso
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Digite a senha..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  autoFocus
                />
              </div>
              {errorMsg && <p className="text-xs text-rose-400 mt-1.5 font-medium">{errorMsg}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-lime-300" />
              <span>Desbloquear Especificação</span>
            </button>
          </form>

          <div className="text-center pt-2 border-t border-slate-800/80">
            <span className="text-[11px] text-slate-500">
              Operus Surgical Suite • ClubeMkt Ecosystem
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-slate-900 border border-emerald-500/40 flex items-center justify-center text-lime-300 font-bold text-base shadow-md">
            OP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white">Operus Surgical Suite</h1>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-lime-300 border border-emerald-500/30">
                Blueprint & Branding
              </span>
            </div>
            <p className="text-xs text-slate-400">Master Architecture, CitasYa Design Tokens & AI Prompting Hub</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {[
            { id: 'architecture', label: 'Arquitetura & Rotas', icon: Database },
            { id: 'design-system', label: 'CitasYa Design System', icon: Palette },
            { id: 'prompts', label: 'Prompts IA Master', icon: Sparkles },
            { id: 'branding', label: 'Identidade & Banners', icon: Globe },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-6">
        {/* Tab 1: Architecture */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Database className="w-5 h-5 text-emerald-400" />
                    Arquitetura do Monorepo & 22 Tabelas Supabase
                  </h2>
                  <p className="text-xs text-slate-400">
                    Estrutura Next.js 15 + Expo Native SDK 52 com modelos TypeScript completos
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard('cat /root/ClubeMkt/operus/docs/ARCHITECTURE_SPEC.md', 'arch-cat')}
                  className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700 transition"
                >
                  {copiedId === 'arch-cat' ? <Check className="w-3.5 h-3.5 text-lime-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copiar Caminho MD</span>
                </button>
              </div>

              {/* Monorepo Blueprint Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <Globe className="w-4 h-4" /> apps/web (Next.js 15)
                  </span>
                  <p className="text-slate-400">
                    App Router, Tailwind CSS, Radix UI, Bento Grids, SSR Supabase auth, PDF generator e portal de assinatura pública.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <span className="font-bold text-lime-400 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" /> apps/mobile (Expo SDK 52)
                  </span>
                  <p className="text-slate-400">
                    React Native, Expo Router, câmera nativa para fotos de cicatrização pós-operatória e biometria FaceID.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                    <FileCode className="w-4 h-4" /> packages/types
                  </span>
                  <p className="text-slate-400">
                    Definições TypeScript estritas para Cirurgias, Pacientes, Orçamentos, Convênios, TUSS e TCLE.
                  </p>
                </div>
              </div>
            </div>

            {/* 14 Views Mapping Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white">Mapeamento das 14 Telas & Modais Operacionais</h3>
              <div className="divide-y divide-slate-800 text-xs">
                {[
                  { r: '/', name: 'Central Cirúrgica', desc: 'KPIs médicos, faturamento previsto, cirurgias da semana e alertas pré-op.' },
                  { r: '/cirurgias', name: 'Agenda & Cirurgias', desc: 'Equipes cirúrgicas, procedimentos TUSS múltiplos, via de acesso e OPME.' },
                  { r: '/pacientes', name: 'Prontuário & Pacientes', desc: 'Ficha médica, convênios, comorbidades e documentos anexos.' },
                  { r: '/orcamentos', name: 'Orçamentos Cirúrgicos', desc: 'Composição de honorários, materiais hospitalares e envio PDF/WhatsApp.' },
                  { r: '/termos', name: 'Modelos de TCLE', desc: 'Biblioteca de termos com variáveis dinâmicas por cirurgia.' },
                  { r: '/aceite-termo/:token', name: 'Assinatura Digital (Pública)', desc: 'Aceite do paciente com IP, geolocalização e carimbo legal.' },
                  { r: '/pos-operatorio', name: 'Timeline Pós-Op', desc: 'Marcos D+1, D+7, D+15, escala de dor, upload de fotos do curativo.' },
                  { r: '/convenios', name: 'Convênios & Planos', desc: 'Tabelas CBHPM/TUSS, prazos de repasse e documentação.' },
                  { r: '/equipe', name: 'Auxílios & Equipe', desc: 'Controle de participação em cirurgias de terceiros e divisão de repasses.' },
                  { r: '/financeiro', name: 'Faturamento & Repasses', desc: 'Faturamento por operadora, controle de glosas e informes contábeis.' },
                ].map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-emerald-400 font-semibold">{item.r}</span>
                      <p className="font-bold text-white text-sm mt-0.5">{item.name}</p>
                      <p className="text-slate-400 text-xs">{item.desc}</p>
                    </div>
                    <span className="text-[11px] px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      Mapeada
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Design System (CitasYa Adaptation) */}
        {activeTab === 'design-system' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-lime-400" />
                  CitasYa Design System Adaptado para Operus
                </h2>
                <p className="text-xs text-slate-400">
                  Paleta tropical-médica, tipografia de alta performance e double-bezel cards
                </p>
              </div>

              {/* Palette Showcase */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#006948] text-white space-y-1 shadow-md">
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Primary Emerald</span>
                  <p className="text-sm font-extrabold">#006948</p>
                  <p className="text-[11px] opacity-80">Autoridade & Confiança Médica</p>
                </div>

                <div className="p-4 rounded-xl bg-[#84CC16] text-slate-950 space-y-1 shadow-md">
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Electric Lime</span>
                  <p className="text-sm font-extrabold">#84CC16</p>
                  <p className="text-[11px] opacity-80">Status Ativo & Foco Interativo</p>
                </div>

                <div className="p-4 rounded-xl bg-[#0EA5E9] text-white space-y-1 shadow-md">
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Medical Cyan</span>
                  <p className="text-sm font-extrabold">#0EA5E9</p>
                  <p className="text-[11px] opacity-80">Precisão Cirúrgica & Tech</p>
                </div>

                <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-700 text-white space-y-1 shadow-md">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Dark Slate</span>
                  <p className="text-sm font-extrabold text-white">#0F172A</p>
                  <p className="text-[11px] text-slate-400">Superfícies Dark & Contraste</p>
                </div>
              </div>

              {/* Typography Tokens */}
              <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <h4 className="text-sm font-bold text-white">Tokens Tipográficos</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block font-semibold">Títulos & Headings</span>
                    <p className="font-bold text-white text-base font-sans">Outfit (SemiBold / Bold)</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Corpo & Formulários</span>
                    <p className="font-medium text-white text-base">Plus Jakarta Sans</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Códigos TUSS & Hashes</span>
                    <p className="font-mono text-lime-300 text-base">JetBrains Mono</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Prompts IA Master */}
        {activeTab === 'prompts' && (
          <div className="space-y-6">
            {[
              {
                id: 'p-logo',
                title: 'Logo Principal & Ícone Vetorial SVG',
                target: 'Midjourney v6.1 / Flux.1 Pro / Ideogram 2',
                prompt: '/imagine prompt: Minimalist surgical technology logo mark for "OPERUS", featuring an ultra-sleek geometric medical cross fused with a precision circular surgical lens ring, clean vector design, emerald green (#006948) and electric lime (#84CC16) accents on pure dark obsidian background (#090D16), Apple Pro design aesthetic, mathematically balanced, Figma icon style, svg flat vector, high contrast, 8k --ar 1:1 --v 6.1 --style raw',
              },
              {
                id: 'p-app-icon',
                title: 'Ícone 3D de Luxo para App (iOS / Android Squircle)',
                target: 'Midjourney v6.1 / Octane Render',
                prompt: '/imagine prompt: Premium 3D square app icon for "Operus Surgical Suite", rounded squircle iOS style, frosted glass and brushed dark titanium material, glowing neon emerald green medical cross embossed in the center with subtle cyan refractive edge lighting, studio lighting, octane render, Ray Tracing, 8k resolution, minimalist hyper-realistic, luxury tech branding --ar 1:1 --v 6.1',
              },
              {
                id: 'p-hero',
                title: 'Banner Hero para Website & Landing Page (16:9)',
                target: 'Midjourney v6.1 / Flux.1 Pro',
                prompt: '/imagine prompt: Wide cinematic shot of a modern minimalist surgical consultation suite, a confident surgeon in tailored surgical scrubs holding a sleek glass tablet displaying a glowing emerald and slate medical dashboard with surgical schedules and charts, high-end private hospital background with subtle ambient cyan and warm lighting, depth of field, Hasselblad photography, clean architectural lines, ultra-realistic, 8k --ar 16:9 --v 6.1 --style raw',
              },
              {
                id: 'p-tcle',
                title: 'Destaque: Assinatura Digital de TCLE & Biometria',
                target: 'Midjourney v6.1 / Flux.1 Pro',
                prompt: '/imagine prompt: Close-up macro photograph of a patient\'s hands using a smartphone to sign a digital consent form on a clean dark-mode medical interface, biometric fingerprint validation glow in emerald and lime, clean modern clinic background, natural soft lighting, premium aesthetic, 8k resolution --ar 16:9 --v 6.1',
              },
              {
                id: 'p-linkedin',
                title: 'Banner LinkedIn B2B Thought Leadership (1200x627)',
                target: 'Ideogram 2 / Midjourney v6.1',
                prompt: '/imagine prompt: Sleek professional LinkedIn banner for "Operus Surgical Suite", dark slate (#0F172A) textured background with glowing geometric data nodes in emerald (#006948) and electric lime, floating surgical KPI cards showing revenue growth and zero glosas, subtle typography "Precision Surgical Operating System", ultra-clean corporate tech aesthetic --ar 1200:627 --v 6.1',
              },
              {
                id: 'p-social-story',
                title: 'Capa para Reels / Stories do Instagram (9:16)',
                target: 'Midjourney v6.1 / Flux.1 Pro',
                prompt: '/imagine prompt: Vertical high-impact mobile wallpaper and reel cover for surgical SaaS, dark titanium texture with glowing circular surgical ring in emerald green and cyber lime, futuristic medical interface elements, clean negative space for typography, hyper-detailed, 8k --ar 9:16 --v 6.1',
              }
            ].map((p) => (
              <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">{p.title}</h3>
                    <span className="text-[11px] text-emerald-400 font-semibold">{p.target}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(p.prompt, p.id)}
                    className="flex items-center gap-1.5 bg-emerald-700/80 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition cursor-pointer"
                  >
                    {copiedId === p.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-lime-300" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Prompt</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-300 leading-relaxed select-all">
                  {p.prompt}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Branding & Banners */}
        {activeTab === 'branding' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                Estratégia de Posicionamento & Roteiro de Carrossel Instagram
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs pt-2">
                {[
                  { step: '01. Gancho', title: 'Adeus WhatsApp', text: 'Por que cirurgiões de elite abandonaram grupos informais na rotina cirúrgica?' },
                  { step: '02. Dor Real', title: 'Custo Oculto', text: 'Glosas, atrasos de OPME e termos de papel perdidos custam até 30% da receita.' },
                  { step: '03. Solução', title: 'Central Única', text: 'Operus: Da agenda à assinatura digital de TCLE em menos de 1 minuto.' },
                  { step: '04. Governança', title: 'Regras TUSS', text: 'Cálculo 100/70/50% automático e repasses transparentes para a equipe.' },
                  { step: '05. Conversão', title: 'CTA Final', text: 'Modernize sua prática cirúrgica hoje mesmo.' }
                ].map((c, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-lime-400">{c.step}</span>
                    <h4 className="font-bold text-white text-sm">{c.title}</h4>
                    <p className="text-slate-400 text-xs">{c.text}</p>
                  </div>
                ))}
              </div>
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
