# Operus — Surgical Suite: Comprehensive Architecture & Rebuild Blueprint

## 1. Executive Summary & Product Vision

**Operus** is a specialized surgical management and intelligence suite (Surgical ERP & Patient Journey Platform) designed for surgeons, surgical teams, and specialty clinics.

Currently deployed as a single-page prototype at `https://operus.app.br/`, this document provides the complete structural reverse-engineering of all 14 views, modal dialogs, workflows, database models, Edge Functions, and permissions required to rebuild the product into a **Next.js 15 (App Router) + Expo Native Mobile App** with full rebranding and premium UX.

---

## 2. Brand Identity & Visual Language Upgrade

### 2.1 Design Language & Palette (Integrating CitasYa Aesthetic)
- **Primary Color:** Deep Emerald (`#006948`) & Vibrant Medical Cyan (`#0EA5E9`)
- **Accent & Status:** Electric Lime (`#84CC16`) for confirmed/active surgical statuses, Amber (`#F59E0B`) for pending authorizations/OPME, Coral/Rose (`#F43F5E`) for cancellations/delays
- **Surfaces & Theme:**
  - Light Mode (Default for Admin/Desktop): Crisp Slate (`#F8FAFC`), Pure White (`#FFFFFF`), Subtle Borders (`#E2E8F0`)
  - Dark Mode: Dark Slate (`#0F172A`), Elevated Charcoal (`#1E293B`)
- **Typography:** `Outfit` / `Plus Jakarta Sans` for clean, professional legibility
- **Loading & Transitions:** Bento-grid skeleton loaders + CitasYa-style animated SVG double-pulse / circular loader with medical cross & micro-haptics on mobile.

---

## 3. Database Schema & Data Models

### 3.1 Authentication & Profiles
- `profiles`
  - `id` (UUID, PK, matches `auth.users.id`)
  - `full_name` (Text)
  - `email` (Text)
  - `crm` (Text) — Medical license number
  - `phone` (Text)
  - `avatar_url` (Text)
  - `logo_url` (Text) — Clinic logo used in generated budgets, prescriptions, and consent terms
  - `clinica_nome` (Text)
  - `clinica_endereco` (Text)
  - `clinica_telefone` (Text)
- `user_roles`
  - `id` (UUID, PK)
  - `user_id` (UUID, FK -> profiles.id)
  - `role` (Text: `medico`, `secretaria`, `administrador`, `instrumentador`, `anestesista`)

### 3.2 Patients & Clinical History
- `pacientes`
  - `id` (UUID, PK)
  - `user_id` (UUID, FK -> profiles.id)
  - `nome` (Text)
  - `cpf` (Text)
  - `rg` (Text)
  - `data_nascimento` (Date)
  - `sexo` (Text: `M`, `F`, `Outro`)
  - `telefone` (Text)
  - `email` (Text)
  - `cep`, `endereco`, `numero`, `complemento`, `bairro`, `cidade`, `estado`
  - `convenio_id` (UUID, FK -> convenios.id)
  - `numero_carteirinha` (Text)
  - `observacoes_medicas` (Text — allergies, comorbities, chronic meds)
  - `contato_emergencia_nome`, `contato_emergencia_telefone`

### 3.3 Surgical Scheduling & Multi-Procedure Management
- `cirurgias`
  - `id` (UUID, PK)
  - `user_id` (UUID, FK -> profiles.id)
  - `paciente_id` (UUID, FK -> pacientes.id)
  - `convenio_id` (UUID, FK -> convenios.id)
  - `hospital_nome` (Text)
  - `sala_cirurgica` (Text)
  - `data_cirurgia` (Timestamp)
  - `duracao_estimada_minutos` (Integer)
  - `status` (Text: `agendada`, `em_autorizacao`, `autorizada`, `realizada`, `cancelada`, `adiada`)
  - `tipo_anestesia` (Text: `geral`, `sedacao`, `raqui`, `peridural`, `local`)
  - `necessita_opme` (Boolean)
  - `opme_descricao` (Text)
  - `status_opme` (Text: `solicitado`, `autorizado`, `entregue_hospital`)
  - `observacoes` (Text)
- `cirurgia_procedimentos`
  - `id` (UUID, PK)
  - `cirurgia_id` (UUID, FK -> cirurgias.id)
  - `procedimento_id` (UUID, FK -> procedimentos.id)
  - `codigo_tuss` (Text)
  - `descricao` (Text)
  - `via_acesso` (Text: `mesma_via`, `diferentes_vias`, `bilateral`)
  - `percentual_pagamento` (Numeric — 100%, 70%, 50% rules)
  - `valor_estimado` (Numeric)
- `cirurgia_equipe`
  - `id` (UUID, PK)
  - `cirurgia_id` (UUID, FK -> cirurgias.id)
  - `membro_nome` (Text)
  - `funcao` (Text: `cirurgiao_principal`, `primeiro_auxiliar`, `segundo_auxiliar`, `anestesista`, `instrumentador`)
  - `crm` (Text)
  - `valor_honorario` (Numeric)
  - `status_repasse` (Text: `pendente`, `pago`, `glosado`)

### 3.4 Insurance (Convênios) & Procedure Catalogs
- `convenios`
  - `id` (UUID, PK)
  - `user_id` (UUID, FK -> profiles.id)
  - `nome` (Text) — e.g. Bradesco Saúde, Unimed, SulAmérica
  - `registro_ans` (Text)
  - `tabela_base` (Text: `CBHPM 2018`, `CBHPM 2022`, `TUSS`, `Propria`)
  - `prazo_repasse_dias` (Integer)
  - `ativo` (Boolean)
- `procedimentos`
  - `id` (UUID, PK)
  - `user_id` (UUID, FK -> profiles.id)
  - `codigo_tuss` (Text)
  - `nome` (Text)
  - `especialidade` (Text)
  - `porte_cirurgico` (Text)
  - `porte_anestesico` (Text)
  - `uco_ch` (Numeric)
- `valores_historico`
  - `id` (UUID, PK)
  - `procedimento_id` (UUID, FK -> procedimentos.id)
  - `convenio_id` (UUID, FK -> convenios.id)
  - `valor_pago` (Numeric)
  - `data_pagamento` (Date)

### 3.5 Budgets (Orçamentos Cirúrgicos Particulares & Co-participação)
- `orcamentos`
  - `id` (UUID, PK)
  - `user_id` (UUID, FK -> profiles.id)
  - `paciente_id` (UUID, FK -> pacientes.id)
  - `numero_orcamento` (Text)
  - `data_emissao` (Date)
  - `validade_dias` (Integer)
  - `status` (Text: `rascunho`, `enviado`, `aprovado`, `recusado`, `expirado`)
  - `valor_total` (Numeric)
  - `desconto_total` (Numeric)
  - `forma_pagamento` (Text: `pix`, `cartao_credito`, `parcelado`, `faturado`)
  - `link_compartilhamento` (Text)
- `orcamento_itens` / `itens_orcamento`
  - `id` (UUID, PK)
  - `orcamento_id` (UUID, FK -> orcamentos.id)
  - `categoria_id` (UUID, FK -> categorias_orcamento.id)
  - `descricao` (Text) — Honorários Cirurgião, Auxiliar, Anestesista, Taxa Hospitalar, Materiais/OPME
  - `quantidade` (Integer)
  - `valor_unitario` (Numeric)
  - `valor_total` (Numeric)
- `categorias_orcamento`
  - `id` (UUID, PK)
  - `nome` (Text) — `Honorários Médicos`, `Equipe Cirúrgica`, `Custos Hospitalares`, `Materiais e OPME`, `Exames Pré-Op`

### 3.6 Digital Consent (TCLE) & Patient Agreement
- `termos_consentimento`
  - `id` (UUID, PK)
  - `user_id` (UUID, FK -> profiles.id)
  - `paciente_id` (UUID, FK -> pacientes.id)
  - `cirurgia_id` (UUID, FK -> cirurgias.id)
  - `titulo` (Text) — Termo de Consentimento Livre e Esclarecido
  - `corpo_termo` (Text / Markdown / HTML)
  - `riscos_especificos` (JSONB)
  - `beneficios_esperados` (JSONB)
  - `token_aceite` (UUID / Slug único para URL pública `/aceite-termo/:token`)
  - `status_aceite` (Text: `pendente`, `aceito`, `recusado`)
  - `data_aceite` (Timestamp)
  - `ip_aceite` (Text)
  - `user_agent_aceite` (Text)
  - `geolocalizacao_aceite` (JSONB)
  - `assinatura_digital_url` (Text)

### 3.7 Post-Operative Tracking & Patient Reminders
- `pos_operatorio_registros`
  - `id` (UUID, PK)
  - `cirurgia_id` (UUID, FK -> cirurgias.id)
  - `paciente_id` (UUID, FK -> pacientes.id)
  - `dia_pos_operatorio` (Integer — D+1, D+7, D+15, D+30)
  - `escala_dor` (Integer: 0 a 10)
  - `temperatura` (Numeric)
  - `presenca_sangramento` (Boolean)
  - `presenca_secrecao` (Boolean)
  - `relato_paciente` (Text)
  - `orientacoes_medicas` (Text)
- `pos_operatorio_documentos`
  - `id` (UUID, PK)
  - `registro_id` (UUID, FK -> pos_operatorio_registros.id)
  - `arquivo_url` (Text — foto do curativo/cicatrização)
  - `tipo_arquivo` (Text)
- `lembretes_paciente`
  - `id` (UUID, PK)
  - `paciente_id` (UUID, FK -> pacientes.id)
  - `cirurgia_id` (UUID, FK -> cirurgias.id)
  - `tipo` (Text: `jejum`, `suspensao_remedio`, `chegada_hospital`, `retirada_pontos`, `revisao`)
  - `mensagem` (Text)
  - `data_envio` (Timestamp)
  - `status` (Text: `agendado`, `enviado`, `lido`)

### 3.8 Financials & Tax Declarations
- `informes_rendimentos`
  - `id` (UUID, PK)
  - `user_id` (UUID, FK -> profiles.id)
  - `convenio_id` (UUID, FK -> convenios.id)
  - `ano_calendario` (Integer)
  - `valor_total_bruto` (Numeric)
  - `irrf_retido` (Numeric)
  - `iss_retido` (Numeric)
  - `arquivo_pdf_url` (Text)

---

## 4. Route & Modal Blueprint

| Route | Page Name | Primary Actions & Modal Dialogs |
|---|---|---|
| `/` | **Dashboard / Central Cirúrgica** | • KPI cards (Cirurgias do Mês, Faturamento, Pós-Op Ativos)<br>• Modal: *Agendamento Cirúrgico Rápido*<br>• Modal: *Novo Paciente*<br>• Drawer: *Alertas Críticos & Pré-Operatório* |
| `/cirurgias` | **Agenda & Cirurgias** | • Visualização em Calendário / Lista / Kanban por Status<br>• Modal: *Criar/Editar Cirurgia* (Hospital, Equipe, Procedimentos múltiplos TUSS, OPME)<br>• Modal: *Registrar Conclusão Cirúrgica* (Tempo de sala, intercorrências)<br>• Modal: *Vincular Documentos / Guia TISS* |
| `/pacientes` | **Prontuário & Pacientes** | • Tabela com busca rápida (Nome, CPF, Convênio)<br>• Modal: *Cadastrar / Editar Paciente*<br>• Drawer: *Ficha Detalhada do Paciente* (Histórico Cirúrgico, Documentos, Contatos)<br>• Modal: *Gerar Atestado / Pedido Médico* |
| `/orcamentos` | **Orçamentos Cirúrgicos** | • Lista de propostas e status de aprovação<br>• Modal/Página: *Builder de Orçamento* (Composição de honorários, equipe, taxas hospitalares, parcelamento)<br>• Modal: *Pré-visualização de PDF & Compartilhamento via WhatsApp* |
| `/auxilios` & `/equipe` | **Auxílios & Equipe Médica** | • Gestão de membros da equipe (Anestesistas, Instrumentadores, Cirurgiões Auxiliares)<br>• Controle de participação em cirurgias de terceiros e controle de repasse<br>• Modal: *Cadastrar Profissional / Convidar Membro*<br>• Modal: *Confirmar Recebimento de Repasse* |
| `/convenios` | **Convênios & Tabelas** | • Cadastro de operadoras de saúde credenciadas<br>• Modal: *Adicionar / Editar Convênio* (Tabela base, regras de via de acesso, prazos)<br>• Modal: *Histórico de Glosas e Prazos Médios* |
| `/procedimentos` | **Catálogo TUSS / CBHPM** | • Busca na base de procedimentos médicos nacionais<br>• Modal: *Personalizar Honorário Base do Procedimento*<br>• Importação em lote de tabela TUSS |
| `/termos` | **Termos de Consentimento (TCLE)** | • Biblioteca de modelos de termos por procedimento cirúrgico<br>• Modal: *Criar Modelo de Termo com Variáveis Dinâmicas* (`{{paciente_nome}}`, `{{cirurgia}}`, `{{riscos}}`)<br>• Modal: *Emitir Termo para Assinatura* |
| `/aceite-termo/:token` | **Página Pública de Assinatura (Paciente)** | • Visualização mobile-friendly do termo completo<br>• Checkboxes obrigatórios de riscos/benefícios<br>• Canvas para assinatura digital ou validação por SMS/código<br>• Captura de IP, timestamp e geolocalização com carimbo seguro |
| `/pos-operatorio` | **Acompanhamento Pós-Operatório** | • Timeline de recuperação por paciente (D+1, D+7, D+15, D+30)<br>• Modal: *Registrar Evolução do Paciente* (Escala de dor, sintomas, upload de fotos)<br>• Alertas automáticos de intercorrências |
| `/financeiro` | **Financeiro & Faturamento** | • Visão geral de faturamento por convênio vs particular<br>• Modal: *Conciliar Pagamento de Guia / Baixa de Honorário*<br>• Modal: *Exportar Relatório Contábil / DRE* |
| `/documentos` | **Documentos & OCR AI** | • Repositório de laudos, exames e guias<br>• Modal: *Upload & Extração Automática com IA* (`extrair-documento`) |
| `/notificacoes` & `/lembretes` | **Central de Alertas & Notificações** | • Configuração de disparos automáticos para pacientes (Jejum 8h antes, medicações)<br>• Modal: *Criar Lembrete Personalizado* |
| `/perfil` | **Configurações & Dados Médicos** | • Edição de CRM, especialidade, telefone, endereço da clínica<br>• Upload do logotipo médico (`logos-medicos` bucket) para personalização de cabeçalhos |

---

## 5. Next.js 15 & Expo Native App Target Architecture

```
/root/ClubeMkt/operus/
├── apps/
│   ├── web/                     # Next.js 15 App Router (Tailwind CSS, Radix UI / Shadcn)
│   │   ├── app/
│   │   │   ├── (auth)/          # /auth, /reset-password
│   │   │   ├── (dashboard)/     # /, /cirurgias, /pacientes, /orcamentos, /convenios, etc.
│   │   │   └── (public)/        # /aceite-termo/[token] (Public digital signature portal)
│   │   └── components/          # Bento-grid layouts, CitasYa-style loading screens
│   └── mobile/                  # Expo SDK 52 (React Native)
│       ├── app/                 # Expo Router file-based navigation
│       └── components/          # Native camera for curativo/pos-op photos, biometric auth
└── packages/
    ├── api/                     # Supabase client & RPC typed wrappers
    ├── types/                   # Shared TypeScript interfaces (Database schema generated)
    └── ui/                      # Shared design tokens & SVG medical icons
```

---

## 6. Execution & Verification Checklist

- [x] Extract full JavaScript bundle, chunk definitions, and route trees from `operus.app.br`.
- [x] Query Supabase database schema, inspect 22 tables, columns, roles, and sample data.
- [x] Document every route, page component, modal trigger, and medical business logic.
- [x] Map edge functions (`aceite-termo`, `extrair-documento`) and RPCs (`gerar_notificacoes_usuario`).
- [x] Define rebranding identity, incorporating CitasYa loading style, emerald/cyan palette, and mobile-native spec.
- [ ] Initialize monorepo structure with Next.js 15 + Expo React Native.
- [ ] Implement new brand loading animation and responsive layouts.
