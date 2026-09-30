import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Operus — Surgical Suite',
  description: 'Plataforma premium para gestão de pacientes cirúrgicos, agenda, equipe, convênios e financeiro.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-50 text-slate-900 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
