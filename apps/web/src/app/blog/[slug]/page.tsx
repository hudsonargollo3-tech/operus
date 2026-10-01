import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BLOG_POSTS } from '@/lib/blog-data';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Artigo Não Encontrado — Operus Blog',
      description: 'Artigo de inteligência cirúrgica não encontrado.'
    };
  }

  return {
    title: `${post.title} — Operus Intelligence`,
    description: post.summary,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    }
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Structured Data Schema for AI Engines (Perplexity, ChatGPT Search, Claude, Google AI Overviews)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    inLanguage: 'pt-BR',
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Operus Surgical Suite',
      url: 'https://operus.clubemkt.digital'
    },
    keywords: post.tags.join(', '),
    mainEntity: post.faqs && post.faqs.length > 0 ? {
      '@type': 'FAQPage',
      mainEntity: post.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    } : undefined
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col antialiased selection:bg-[#1B58D6] selection:text-white">
      {/* JSON-LD for AI Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <Link href="/blog" className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition">
          ← Voltar para o Blog
        </Link>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2766E6] to-[#1646BB] flex items-center justify-center text-white">
            <svg className="w-4 h-4" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <span className="text-sm font-bold text-white font-heading">OPERUS</span>
        </Link>
        <Link href="/cadastro" className="px-3.5 py-1.5 rounded-xl bg-[#1B58D6] hover:bg-[#2766E6] text-white text-xs font-bold transition">
          Testar Operus
        </Link>
      </header>

      {/* Article Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-12 space-y-8">
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-sky-300 font-bold uppercase tracking-wider border border-blue-500/30">
              {post.category}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{post.readTime}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{post.date}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading leading-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            {post.summary}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sky-400">
              {post.author.name[0]}
            </div>
            <div>
              <p className="text-xs font-bold text-white flex items-center gap-2">
                {post.author.name}
                {post.author.crm && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {post.author.crm}
                  </span>
                )}
              </p>
              <p className="text-[11px] text-slate-400">{post.author.role}</p>
            </div>
          </div>
        </div>

        {/* AI Key Takeaways Box (Generative Engine Optimization Hook) */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="bg-gradient-to-r from-blue-950/60 to-slate-900 border border-blue-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wide">
              <svg className="w-4 h-4 text-[#22D3EE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Síntese Executiva & Pontos Chave (AI Quick Reference)
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              {post.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span className="text-slate-200">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* TUSS / Regulatory Tags if available */}
        {post.tussCodes && (
          <div className="flex items-center gap-2 flex-wrap text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Códigos TUSS Auditados:</span>
            {post.tussCodes.map((code) => (
              <span key={code} className="px-2 py-0.5 rounded bg-slate-800 text-sky-300 font-mono border border-slate-700">
                {code}
              </span>
            ))}
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl whitespace-pre-line font-sans">
            {post.content}
          </div>
        </div>

        {/* Interactive FAQ Section for AI Search Engine Snippet Indexation */}
        {post.faqs && post.faqs.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Perguntas Frequentes & Respostas Diretas
            </h3>
            <div className="space-y-3">
              {post.faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 space-y-2">
                  <h4 className="text-sm font-semibold text-sky-200">{faq.question}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Card */}
        <div className="bg-gradient-to-br from-[#1646BB]/40 via-slate-900 to-slate-950 border border-blue-500/30 p-8 rounded-3xl text-center space-y-4 shadow-2xl">
          <h3 className="text-xl font-bold text-white font-heading">
            Pronto para transformar sua rotina cirúrgica?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Automatize o cálculo de vias de acesso TUSS, emita TCLE digital com validade CFM e gerencie sua equipe cirúrgica em uma central única.
          </p>
          <div className="pt-2">
            <Link href="/cadastro" className="inline-flex px-6 py-3 bg-[#1B58D6] hover:bg-[#2766E6] text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-900/40 transition">
              Começar Teste Grátis de 14 Dias
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 p-6 text-center text-xs text-slate-500">
        Operus Surgical Suite • Intelligence Blog • ClubeMkt
      </footer>
    </div>
  );
}
