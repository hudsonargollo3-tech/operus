import React from 'react';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-data';

export const metadata = {
  title: 'Blog de Inteligência Cirúrgica & Gestão Médica — Operus',
  description: 'Artigos técnicos sobre auditoria TUSS, faturamento cirúrgico, validade legal de TCLE digital e governança de equipes cirúrgicas.'
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col antialiased selection:bg-[#1B58D6] selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2766E6] to-[#1646BB] border border-blue-400/30 flex items-center justify-center shadow-md group-hover:scale-105 transition">
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
          </div>
          <div>
            <h1 className="text-base font-bold text-white font-heading tracking-tight">OPERUS</h1>
            <p className="text-[11px] text-sky-400 font-semibold">Intelligence Blog</p>
          </div>
        </Link>

        <div className="flex items-center gap-3 text-xs">
          <Link href="/login" className="px-4 py-2 rounded-xl text-slate-300 hover:text-white font-semibold transition">
            Entrar
          </Link>
          <Link href="/cadastro" className="px-4 py-2 rounded-xl bg-[#1B58D6] hover:bg-[#2766E6] text-white font-bold shadow-md shadow-blue-900/30 transition">
            Começar Grátis
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[11px] uppercase font-bold px-3 py-1 rounded-full bg-blue-500/20 text-sky-300 border border-blue-500/30">
            Inteligência & Governança Médica
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            O Portal do Cirurgião de Alta Performance
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Estratégias comprovadas para zerar glosas de convênio, acelerar o aceite de TCLE digital e blindar a governança da sua equipe cirúrgica.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs border-b border-slate-800">
          <button className="px-3.5 py-1.5 rounded-lg bg-[#1B58D6] text-white font-bold shrink-0">Todos os Artigos</button>
          <button className="px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 shrink-0 font-medium">TUSS & Faturamento</button>
          <button className="px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 shrink-0 font-medium">TCLE & Jurídico</button>
          <button className="px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 shrink-0 font-medium">Gestão de Equipe</button>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition group shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-sky-400 font-bold uppercase tracking-wider">{post.category}</span>
                  <span className="text-slate-500">{post.readTime}</span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-lg font-bold text-white group-hover:text-sky-300 transition font-heading leading-snug">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[10px] text-sky-300">
                    {post.author.name[0]}
                  </div>
                  <span className="text-xs text-slate-300 font-medium">{post.author.name}</span>
                </div>
                <Link href={`/blog/${post.slug}`} className="text-xs text-sky-400 font-bold group-hover:translate-x-1 transition flex items-center gap-1">
                  Ler artigo →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 p-6 text-center text-xs text-slate-500">
        Operus Surgical Suite • Intelligence Blog • ClubeMkt
      </footer>
    </div>
  );
}
