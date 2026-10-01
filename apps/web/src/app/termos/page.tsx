'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import {
  FileCheck2,
  ShieldCheck,
  Plus,
  Search,
  Share2,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Lock,
  Download,
  X
} from 'lucide-react';

export default function TermosConsentimentoPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const termos = [
    {
      id: 'TC-892',
      paciente: 'Mariana Silveira Leite',
      cpf: '432.891.045-88',
      cirurgia: 'Artroplastia Total de Quadril Não Cimentada',
      token: 'tc-mariana-892',
      status: 'assinado',
      dataEnvio: '28/09/2026',
      dataAssinatura: '28/09/2026 • 19:42',
      ip: '177.18.92.140',
      geo: 'São Paulo, SP - Brasil',
      hashSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    },
    {
      id: 'TC-893',
      paciente: 'Carlos Eduardo Fontes',
      cpf: '128.940.332-15',
      cirurgia: 'Reconstrução de Ligamento Cruzado Anterior (LCA)',
      token: 'demo',
      status: 'pendente',
      dataEnvio: '29/09/2026',
      dataAssinatura: null,
      ip: null,
      geo: null,
      hashSha256: null
    },
    {
      id: 'TC-894',
      paciente: 'Beatriz Vasconcelos',
      cpf: '784.102.948-00',
      cirurgia: 'Osteotomia Corretiva de Tíbia',
      token: 'tc-beatriz-894',
      status: 'assinado',
      dataEnvio: '25/09/2026',
      dataAssinatura: '26/09/2026 • 11:15',
      ip: '189.44.112.5',
      geo: 'São Paulo, SP - Brasil',
      hashSha256: '9f83461ece74fca27a0fac1022d616426d004526803869b0a370e2887f8d400d'
    }
  ];

  const handleCopyLink = (token: string, id: string) => {
    const url = `${window.location.origin}/aceite-termo/${token}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = termos.filter((t) => {
    const matchSearch = t.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        t.cirurgia.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterStatus === 'todos') return matchSearch;
    return matchSearch && t.status === filterStatus;
  });

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          title="Termos de Consentimento (TCLE Digital)"
          subtitle="Governança médico-legal, assinaturas eletrônicas e trilha de auditoria CFM 2.232/2019"
        />

        <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Regulatory Banner */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/40 text-[11px] font-bold">
                  Resolução CFM 2.232/2019
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 text-[11px] font-bold">
                  Marco Civil da Internet
                </span>
              </div>
              <h2 className="text-lg font-extrabold tracking-tight font-heading">
                Trilha de Auditoria Criptográfica & Validade Jurídica
              </h2>
              <p className="text-xs text-slate-300">
                Cada termo assinado gera uma assinatura digital capturada em tela, carimbo de data/hora (timestamp), endereço IP, geolocalização e hash SHA-256 do documento.
              </p>
            </div>

            <button className="px-4 py-2.5 bg-white text-blue-900 hover:bg-blue-50 font-bold rounded-xl text-xs transition shadow-sm cursor-pointer flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              Novo Termo Personalizado
            </button>
          </div>

          {/* Filter Bar */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar paciente ou procedimento..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
              {['todos', 'assinado', 'pendente'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-lg transition capitalize ${
                    filterStatus === st
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {st === 'todos' ? 'Todos' : st === 'assinado' ? '✓ Assinados' : '⏳ Pendentes'}
                </button>
              ))}
            </div>
          </div>

          {/* Termos Grid */}
          <div className="space-y-3">
            {filtered.map((t) => {
              const isSigned = t.status === 'assinado';
              return (
                <div key={t.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          {t.id}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{t.paciente}</h3>
                        <span className="text-xs text-slate-400">• CPF: {t.cpf}</span>
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                          isSigned
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {isSigned ? '✓ Assinado Digitalmente' : '⏳ Aguardando Assinatura'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Procedimento: <strong className="text-slate-800">{t.cirurgia}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyLink(t.token, t.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition border border-slate-200 cursor-pointer"
                        title="Copiar Link para WhatsApp do Paciente"
                      >
                        <Share2 className="w-3.5 h-3.5 text-slate-500" />
                        {copiedId === t.id ? 'Link Copiado!' : 'Link WhatsApp'}
                      </button>

                      <Link
                        href={`/aceite-termo/${t.token}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-semibold transition"
                      >
                        <span>Abrir Termo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Audit Trail Metadata */}
                  {isSigned && (
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs space-y-1.5 font-mono text-slate-600">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span><strong>Data/Hora Aceite:</strong> {t.dataAssinatura}</span>
                        <span><strong>IP:</strong> {t.ip} ({t.geo})</span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        <strong>Hash SHA-256:</strong> {t.hashSha256}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
