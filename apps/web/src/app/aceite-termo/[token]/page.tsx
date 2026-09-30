'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText, Lock, User, Calendar, Stethoscope } from 'lucide-react';

export default function AceiteTermoPublicPage() {
  const [accepted, setAccepted] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientCpf, setPatientCpf] = useState('');
  const [isSigned, setIsSigned] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-operus-700 border border-operus-500/40 text-lime-300 mb-2 shadow-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Termo de Consentimento Livre e Esclarecido (TCLE)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Documento médico legal para realização de procedimento cirúrgico
          </p>
        </div>

        {/* Surgical Card Details */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Paciente</span>
              <p className="text-sm font-bold text-white">Maria Aparecida dos Santos</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Médico Responsável</span>
              <p className="text-sm font-bold text-white">Dr. Herlon Moura (CRM 23904)</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Data Prevista</span>
              <p className="text-sm font-bold text-white">02/10/2026 • 07:30</p>
            </div>
          </div>

          <div className="text-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Procedimento Cirúrgico Indicado</span>
            <p className="text-slate-200 font-semibold text-sm">
              Safenectomia Bilateral com Termoablação a Laser (Endolaser) + Microflebectomias
            </p>
          </div>
        </div>

        {/* Consent Body Content */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-h-96 overflow-y-auto">
          <h3 className="font-bold text-white text-base">1. Natureza e Objetivos do Procedimento</h3>
          <p>
            Declaro ter sido informado(a) de forma clara pelo cirurgião sobre o diagnóstico de insuficiência venosa crônica e a indicação cirúrgica correspondente para tratamento das veias varicosas e refluxo das veias safenas magnas.
          </p>

          <h3 className="font-bold text-white text-base">2. Riscos e Possíveis Complicações</h3>
          <p>
            Fui orientado(a) que, como em qualquer ato cirúrgico, existem riscos inerentes, incluindo mas não limitados a:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>Hematomas, equimoses e edema pós-operatório transitório.</li>
            <li>Parestesias ou alteração temporária da sensibilidade cutânea na área tratada.</li>
            <li>Hiperpigmentação cutânea residual ou reações inflamatórias locais.</li>
            <li>Necessidade de complementação estética ou escleroterapia ambulatorial futura.</li>
          </ul>

          <h3 className="font-bold text-white text-base">3. Cuidados Pré e Pós-Operatórios</h3>
          <p>
            Comprometo-me a seguir rigorosamente as orientações de jejum absoluto de 8 horas, suspensão de medicações anticoagulantes prescritas e uso da meia elástica compressiva no período pós-operatório.
          </p>
        </div>

        {/* Confirmation & Signature Section */}
        {!isSigned ? (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-5">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-operus-600 focus:ring-operus-500 border-slate-600 bg-slate-900 cursor-pointer"
              />
              <span className="text-xs sm:text-sm text-slate-200">
                Li atentamente, compreendi todas as informações prestadas e concordo livremente com a realização do procedimento cirúrgico proposto.
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Confirme seu Nome Completo</label>
                <input
                  type="text"
                  placeholder="Nome do paciente"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-operus-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">CPF do Paciente</label>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  value={patientCpf}
                  onChange={(e) => setPatientCpf(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-operus-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              disabled={!accepted || !patientName || !patientCpf}
              onClick={() => setIsSigned(true)}
              className="w-full py-3 rounded-xl bg-operus-700 hover:bg-operus-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm tracking-wide shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Assinar Eletronicamente Termo de Consentimento</span>
            </button>
          </div>
        ) : (
          <div className="bg-emerald-950/70 border border-emerald-500/60 rounded-2xl p-6 text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-800/80 text-lime-300">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Termo Assinado com Sucesso!</h3>
            <p className="text-xs text-emerald-200">
              Registro legal protocolado. Cópia criptografada enviada para o cirurgião e arquivada no prontuário.
            </p>
            <div className="text-[11px] text-slate-400 pt-2 font-mono">
              Hash de Validação: OP-2026-TCLE-{Math.random().toString(36).substring(2, 10).toUpperCase()}
            </div>
          </div>
        )}
      </div>

      <footer className="text-center text-xs text-slate-500 mt-8">
        Operus Surgical Suite • Plataforma em conformidade com CFM e LGPD
      </footer>
    </div>
  );
}
