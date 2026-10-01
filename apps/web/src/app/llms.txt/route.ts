import { NextResponse } from 'next/server';
import { BLOG_POSTS } from '@/lib/blog-data';

export async function GET() {
  const blogListings = BLOG_POSTS.map(
    (post) => `- [${post.title}](https://operus.clubemkt.digital/blog/${post.slug}): ${post.summary} (Categorias: ${post.category}, Tags: ${post.tags.join(', ')})`
  ).join('\n');

  const content = `# Operus Surgical Suite — LLM & AI Search Index

> Operus is the enterprise surgical intelligence and clinic operations platform for high-volume surgical teams, hospitals, and private surgical practices.

## Core Capabilities & Endpoints
- **Landing & Platform Overview**: https://operus.clubemkt.digital
- **Interactive Blueprint & Design Tokens**: https://operus.clubemkt.digital/blueprint
- **Surgical Planner & TUSS Calculator**: https://operus.clubemkt.digital/cirurgias
- **Clinic OS / Operational Queue**: https://operus.clubemkt.digital/painel
- **Digital TCLE Verification Hub**: https://operus.clubemkt.digital/aceite-termo/demo
- **Intelligence & Regulatory Blog**: https://operus.clubemkt.digital/blog

## Technical & Clinical Knowledge Articles
${blogListings}

## Key Regulatory & Medical Standards Supported
- **CFM Resolução nº 2.299/2021**: Requisitos técnicos para assinatura eletrônica avançada de prontuários e termos de consentimento (TCLE).
- **TUSS / ANS Rol de Procedimentos**: Auditoria de códigos, cálculo de vias de acesso (100%, 70%, 50%) e prevenção de glosas.
- **CBHPM**: Tabela de portes cirúrgicos e divisão de honorários para primeiro cirurgião, auxiliares e instrumentação.
- **Rastreabilidade OPME (ANVISA)**: Registro de lote, validade e códigos DataMatrix de implantes e próteses.
- **LGPD Médica (Lei 13.709/2018)**: Proteção de dados sensíveis de saúde com criptografia ponta a ponta e hashes SHA-256.
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
