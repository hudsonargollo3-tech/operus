'use client';

import React, { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import {
  FolderOpen,
  FileText,
  Upload,
  Search,
  Download,
  Eye,
  Scan,
  CheckCircle2,
  Lock,
  Sparkles
} from 'lucide-react';

export default function DocumentosPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const docs = [
    {
      id: 'DOC-1',
      nome: 'Laudo Ressonância Magnética Joelho Direito - Carlos Eduardo.pdf',
      tipo: 'Laudo / Exame Imagem',
      tamanho: '4.2 MB',
      data: '28/09/2026',
      ocrStatus: 'Processado com IA',
      paciente: 'Carlos Eduardo Fontes',
      resumoOcr: 'Ruptura completa do ligamento cruzado anterior (LCA) e lesão em alça de balde do menisco medial.'
    },
    {
      id: 'DOC-2',
      nome: 'Radiografia Bacia Panorâmica com Carga - Mariana Silveira.pdf',
      tipo: 'Radiografia',
      tamanho: '8.1 MB',
      data: '27/09/2026',
      ocrStatus: 'Processado com IA',
      paciente: 'Mariana Silveira Leite',
      resumoOcr: 'Coxartrose avançada à esquerda com colapso do espaço articular superolateral e osteófitos marginais.'
    },
    {
      id: 'DOC-3',
      nome: 'Guia de Autorização TUSS - SulAmérica Saúde.pdf',
      tipo: 'Guia SADT / Convênio',
      tamanho: '1.1 MB',
      data: '26/09/2026',
      ocrStatus: 'Validado',
      paciente: 'Beatriz Vasconcelos',
      resumoOcr: 'Autorização concedida para TUSS 30722129 + Placa LCP Bloqueada Synthes.'
    }
  ];

  const filtered = docs.filter(d =>
    d.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.paciente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          title="Documentos, Laudos & OCR Clínico Inteligente"
          subtitle="Repositório seguro de exames, guias de convênio e extração automática de dados médicos"
        />

        <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Upload Drag & Drop Banner */}
          <div className="bg-white border-2 border-dashed border-blue-300 hover:border-blue-500 rounded-3xl p-8 text-center transition space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Arraste e solte laudos, exames ou guias TUSS</h3>
              <p className="text-xs text-slate-500">O OCR Clínico da Operus extrai automaticamente CIDs, códigos TUSS e conclusões diagnósticas</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer">
              Selecionar Arquivo do Computador
            </button>
          </div>

          {/* Search Bar */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nome do exame ou paciente..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Documents Grid */}
          <div className="space-y-3">
            {filtered.map((d) => (
              <div key={d.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{d.nome}</h4>
                      <p className="text-xs text-slate-500">
                        Paciente: <strong className="text-slate-700">{d.paciente}</strong> • {d.tipo} • {d.tamanho} • {d.data}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <Sparkles className="w-3.5 h-3.5" />
                      {d.ocrStatus}
                    </span>
                    <button className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition" title="Baixar">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* OCR Summary Box */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 block flex items-center gap-1">
                    <Scan className="w-3.5 h-3.5 text-blue-600" />
                    Extração Diagnóstica (OCR):
                  </span>
                  <p className="text-slate-600 italic">{d.resumoOcr}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
