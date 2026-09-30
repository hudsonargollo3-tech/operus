# Operus Surgical Suite — Enterprise Surgical OS & Intelligence SaaS

Operus é a plataforma de governança e inteligência operacional para cirurgiões, equipes cirúrgicas e clínicas de alta complexidade.

---

## 1. Visão Geral da Arquitetura

O projeto é estruturado como um monorepo Turborepo + pnpm:

```
operus/
├── apps/
│   ├── web/                    # Next.js 15 (App Router, Tailwind CSS, SSR)
│   │   ├── src/app/
│   │   │   ├── page.tsx        # Landing Page de Alta Conversão & Tabela de Planos
│   │   │   ├── login/          # Autenticação com Redirecionamento Inteligente
│   │   │   ├── cadastro/       # Onboarding de Cirurgiões (CRM, Especialidade)
│   │   │   ├── admin/          # Console Super Admin SaaS (MRR, Tenants, Health)
│   │   │   ├── painel/         # Central Cirúrgica do Tenant / Clínica
│   │   │   ├── blog/           # Blog de Inteligência Médica & SEO
│   │   │   │   └── [slug]/     # Artigos Dinâmicos de Alta Autoridade
│   │   │   ├── cirurgias/      # Agendamento & Multi-Procedimentos TUSS
│   │   │   ├── orcamentos/     # Builder de Honorários & Propostas
│   │   │   ├── pacientes/      # Prontuário Cirúrgico & Histórico
│   │   │   ├── aceite-termo/   # Portal Público de TCLE com Assinatura Legal
│   │   │   └── blueprint/      # Blueprint Vault & Prompts IA
│   │   └── src/components/
│   │       ├── layout/         # AppHeader, AppSidebar
│   │       └── ui/             # LoadingScreen (Adaptada de CitasYa)
│   └── mobile/                 # React Native / Expo SDK 52 (Captura de pós-op)
├── packages/
│   └── types/                  # 22 Modelos TypeScript estritos (Supabase Schema)
├── docs/
│   ├── ARCHITECTURE_SPEC.md    # Especificação Reversa & 22 Tabelas do Banco
│   ├── BRAND_AND_PROMPT_SYSTEM.md # Tokens Oficiais (#1B58D6) & Prompts IA 3D
│   └── index.html              # Viewer Standalone do Blueprint Vault
└── scripts/
    ├── cron_blog_generator.py  # Gerador Automático de Artigos SEO & Cronjob
    └── server.py               # Servidor Microservice de Documentação
```

---

## 2. Estrutura Oficial de Planos & Preços (Lançamento)

| Plano | Preço Lançamento | Preço Regular | Usuários | Recursos Principais |
| :--- | :--- | :--- | :--- | :--- |
| **1. Solo Start** | **R$ 39,90/mês** | R$ 59,90/mês | 1 Médico + 1 Secretária | Gestão de status cirúrgico, prontuário manual, timeline semanal |
| **2. Consultório** | **R$ 49,90/mês** | R$ 69,90/mês | Até 3 Médicos + 1 Sec | Gestão Financeira de honorários, upload de fotos/exames, gerador de orçamentos |
| **3. Equipe Pro ⭐** | **R$ 109,90/mês** | R$ 159,00/mês | Múltiplos Médicos + Até 3 Sec | **TCLE Digital legal**, repasse para auxiliares/anestesistas, auditoria TUSS |
| **4. Enterprise** | **R$ 299,00/mês** | Sob Consulta | Médicos & Sec Ilimitados | Multi-Unidades, múltiplos CNPJs, rastreamento OPME, API & Integração ERP |

---

## 3. Identidade Visual & Design Tokens

- **Azul Operus Primário:** `#1B58D6` (Confiança & Autoridade Médica)
- **Azul Cobalto Elétrico:** `#2766E6` (Interatividade, Destaques & Gradientes)
- **Azul Safira Real:** `#1646BB` (Bordas & Base de Superfícies)
- **Dark Obsidian:** `#090D16` (Canvas Dark Mode)
- **Dark Slate:** `#0F172A` (Cards Double-Bezel)
- **Símbolo Vetorial:** Abertura circular cirúrgica com eixo vertical de bisturi micro-rotacionado a 15° (sem clichês de RPG, espadas ou runas).

---

## 4. Endpoints & Deployment em Produção

- **Landing Page & Planos:** `https://customer-journey.clubemkt.online/operus`
- **Login:** `https://customer-journey.clubemkt.online/operus/login`
- **Cadastro Médico:** `https://customer-journey.clubemkt.online/operus/cadastro`
- **Super Admin SaaS:** `https://customer-journey.clubemkt.online/operus/admin`
- **Painel da Clínica:** `https://customer-journey.clubemkt.online/operus/painel`
- **Blog:** `https://customer-journey.clubemkt.online/operus/blog`
- **Blueprint Vault:** `https://customer-journey.clubemkt.online/operus/blueprint` (Senha: `operus2026`)

---

## 5. Como Executar Localmente

```bash
# Instalar dependências
pnpm install

# Executar aplicação web Next.js
pnpm --filter @operus/web dev

# Build de produção
pnpm --filter @operus/web build

# Executar gerador de conteúdo do blog
python3 scripts/cron_blog_generator.py
```
