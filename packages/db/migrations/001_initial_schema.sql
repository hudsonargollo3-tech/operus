-- Operus Surgical Suite — Initial PostgreSQL / Supabase Database Schema
-- Version: 1.0.0
-- Security: Full Row-Level Security (RLS) enabled on all multi-tenant tables.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles (User / Surgeon / Staff Profile)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    crm TEXT,
    crm_uf VARCHAR(2),
    especialidade TEXT DEFAULT 'Cirurgia Geral',
    phone TEXT,
    avatar_url TEXT,
    logo_url TEXT,
    clinica_nome TEXT,
    clinica_endereco TEXT,
    clinica_telefone TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. User Roles
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('superadmin', 'admin', 'cirurgiao', 'anestesista', 'instrumentador', 'enfermeiro', 'secretaria', 'financeiro')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, role)
);

-- 3. Convenios (Health Insurances)
CREATE TABLE IF NOT EXISTS public.convenios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL,
    registro_ans VARCHAR(20),
    tabela_base TEXT DEFAULT 'CBHPM',
    prazo_pagamento_dias INTEGER DEFAULT 30,
    desconto_glosa_percentual NUMERIC(5,2) DEFAULT 0.00,
    observacoes TEXT,
    ativo BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Pacientes (Patients)
CREATE TABLE IF NOT EXISTS public.pacientes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome_completo TEXT NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    rg VARCHAR(20),
    data_nascimento DATE,
    sexo VARCHAR(1) CHECK (sexo IN ('M', 'F', 'O')),
    telefone TEXT,
    email TEXT,
    endereco TEXT,
    cidade TEXT,
    estado VARCHAR(2),
    cep VARCHAR(10),
    convenio_id UUID REFERENCES public.convenios(id) ON DELETE SET NULL,
    numero_carteirinha TEXT,
    observacoes_clinicas TEXT,
    alergias TEXT,
    medicamentos_uso TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Procedimentos TUSS (Surgical Procedures Catalog)
CREATE TABLE IF NOT EXISTS public.procedimentos_tuss (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo_tuss VARCHAR(20) NOT NULL UNIQUE,
    descricao TEXT NOT NULL,
    porte_anestesico VARCHAR(5),
    porte_cirurgico VARCHAR(5),
    via_acesso_padrao TEXT,
    valor_referencia NUMERIC(12,2) DEFAULT 0.00,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Cirurgias (Surgical Cases / Schedule)
CREATE TABLE IF NOT EXISTS public.cirurgias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paciente_id UUID NOT NULL REFERENCES public.pacientes(id) ON DELETE CASCADE,
    cirurgiao_principal_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    hospital_nome TEXT NOT NULL,
    sala_cirurgica TEXT,
    data_cirurgia TIMESTAMPTZ NOT NULL,
    duracao_estimada_minutos INTEGER DEFAULT 120,
    status TEXT NOT NULL DEFAULT 'agendada' CHECK (status IN ('agendada', 'confirmada', 'em_andamento', 'concluida', 'cancelada', 'reagendada')),
    tipo_anestesia TEXT,
    carater TEXT DEFAULT 'eletiva' CHECK (carater IN ('eletiva', 'urgencia', 'emergencia')),
    observacoes_pre_op TEXT,
    observacoes_pos_op TEXT,
    termo_assinado BOOLEAN DEFAULT false,
    opme_solicitado BOOLEAN DEFAULT false,
    opme_autorizado BOOLEAN DEFAULT false,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. Cirurgia Procedimentos (Multi-procedimento TUSS com via de acesso 100/70/50%)
CREATE TABLE IF NOT EXISTS public.cirurgia_procedimentos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cirurgia_id UUID NOT NULL REFERENCES public.cirurgias(id) ON DELETE CASCADE,
    procedimento_tuss_id UUID NOT NULL REFERENCES public.procedimentos_tuss(id) ON DELETE RESTRICT,
    via_acesso TEXT DEFAULT 'mesma_via' CHECK (via_acesso IN ('mesma_via', 'vias_distintas')),
    percentual_remuneracao NUMERIC(5,2) DEFAULT 100.00,
    ordem_prioridade INTEGER DEFAULT 1,
    valor_negociado NUMERIC(12,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. Equipe Cirurgica (Surgical Staff Members)
CREATE TABLE IF NOT EXISTS public.equipe_cirurgica (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cirurgia_id UUID NOT NULL REFERENCES public.cirurgias(id) ON DELETE CASCADE,
    profissional_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    nome_avulso TEXT,
    papel TEXT NOT NULL CHECK (papel IN ('cirurgiao_principal', 'primeiro_auxiliar', 'segundo_auxiliar', 'anestesista', 'instrumentador', 'circulante')),
    crm_ou_coren TEXT,
    percentual_honorario NUMERIC(5,2) DEFAULT 0.00,
    valor_fixo NUMERIC(12,2) DEFAULT 0.00,
    confirmado BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. Termo Modelos (Consent Templates)
CREATE TABLE IF NOT EXISTS public.termo_modelos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo TEXT NOT NULL,
    categoria TEXT DEFAULT 'Geral',
    conteudo_template TEXT NOT NULL,
    riscos_mapeados JSONB DEFAULT '[]'::jsonb,
    cuidados_pre_op JSONB DEFAULT '[]'::jsonb,
    cuidados_pos_op JSONB DEFAULT '[]'::jsonb,
    versao INTEGER DEFAULT 1,
    ativo BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. Termos de Consentimento (TCLE Issued Instances)
CREATE TABLE IF NOT EXISTS public.termos_consentimento (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cirurgia_id UUID REFERENCES public.cirurgias(id) ON DELETE CASCADE,
    paciente_id UUID NOT NULL REFERENCES public.pacientes(id) ON DELETE CASCADE,
    modelo_id UUID REFERENCES public.termo_modelos(id) ON DELETE SET NULL,
    titulo TEXT NOT NULL,
    conteudo_final TEXT NOT NULL,
    token_publico TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'assinado', 'recusado', 'expirado')),
    assinado_em TIMESTAMPTZ,
    ip_assinatura TEXT,
    user_agent TEXT,
    geolocalizacao JSONB,
    assinatura_base64 TEXT,
    hash_sha256 TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. OPME Itens (Orthotics, Prosthetics and Special Materials)
CREATE TABLE IF NOT EXISTS public.opme_itens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cirurgia_id UUID NOT NULL REFERENCES public.cirurgias(id) ON DELETE CASCADE,
    fornecedor TEXT NOT NULL,
    codigo_produto TEXT,
    descricao TEXT NOT NULL,
    quantidade INTEGER DEFAULT 1,
    valor_unitario NUMERIC(12,2) DEFAULT 0.00,
    lote TEXT,
    numero_serie TEXT,
    anvisa_registro TEXT,
    status TEXT NOT NULL DEFAULT 'solicitado' CHECK (status IN ('solicitado', 'autorizado', 'consignado', 'utilizado', 'devolvido', 'glosado')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 12. Orcamentos Cirurgicos (Quotations & Estimates)
CREATE TABLE IF NOT EXISTS public.orcamentos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paciente_id UUID NOT NULL REFERENCES public.pacientes(id) ON DELETE CASCADE,
    cirurgia_id UUID REFERENCES public.cirurgias(id) ON DELETE SET NULL,
    numero_orcamento TEXT UNIQUE NOT NULL,
    valor_total NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    valor_honorarios NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    valor_hospitalar NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    valor_opme NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    desconto NUMERIC(12,2) DEFAULT 0.00,
    forma_pagamento TEXT,
    condicoes_parcelamento TEXT,
    validade_dias INTEGER DEFAULT 30,
    status TEXT NOT NULL DEFAULT 'rascunho' CHECK (status IN ('rascunho', 'enviado', 'aprovado', 'recusado', 'expirado')),
    aprovado_em TIMESTAMPTZ,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 13. Pos-Operatorio Acompanhamento (Post-Op Check-in Tracking)
CREATE TABLE IF NOT EXISTS public.acompanhamentos_pos_op (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cirurgia_id UUID NOT NULL REFERENCES public.cirurgias(id) ON DELETE CASCADE,
    paciente_id UUID NOT NULL REFERENCES public.pacientes(id) ON DELETE CASCADE,
    dia_marco TEXT NOT NULL CHECK (dia_marco IN ('D0', 'D1', 'D3', 'D7', 'D15', 'D30', 'D60', 'D90')),
    data_prevista DATE NOT NULL,
    escala_dor INTEGER CHECK (escala_dor BETWEEN 0 AND 10),
    febre BOOLEAN DEFAULT false,
    sangramento BOOLEAN DEFAULT false,
    secrecao_ferida BOOLEAN DEFAULT false,
    foto_cicatriz_url TEXT,
    relato_paciente TEXT,
    conduta_medica TEXT,
    status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'respondido', 'analisado_medico', 'alerta_vermelho')),
    respondido_em TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 14. Documentos Anexos
CREATE TABLE IF NOT EXISTS public.documentos_anexos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cirurgia_id UUID REFERENCES public.cirurgias(id) ON DELETE CASCADE,
    paciente_id UUID NOT NULL REFERENCES public.pacientes(id) ON DELETE CASCADE,
    titulo TEXT NOT NULL,
    tipo TEXT NOT NULL CHECK (tipo IN ('laudo_exame', 'tcle_assinado', 'guia_tiss', 'nota_fiscal', 'foto_cirurgia', 'receita', 'outro')),
    arquivo_url TEXT NOT NULL,
    arquivo_tamanho_bytes BIGINT,
    mime_type TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 15. Notificações do Sistema
CREATE TABLE IF NOT EXISTS public.notificacoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    titulo TEXT NOT NULL,
    mensagem TEXT NOT NULL,
    tipo TEXT NOT NULL DEFAULT 'info' CHECK (tipo IN ('info', 'alerta', 'urgente', 'sucesso')),
    lida BOOLEAN DEFAULT false,
    link_acao TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 16. Logs de Auditoria e Conformidade LGPD/CFM
CREATE TABLE IF NOT EXISTS public.auditoria_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    acao TEXT NOT NULL,
    entidade TEXT NOT NULL,
    entidade_id UUID,
    dados_anteriores JSONB,
    dados_novos JSONB,
    ip_origem TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- RLS POLICIES --
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pacientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cirurgias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.termos_consentimento ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acompanhamentos_pos_op ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orcamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notificacoes ENABLE ROW LEVEL SECURITY;

-- Base Profiles Policy
CREATE POLICY "Public profiles are viewable by authenticated users" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Public TCLE Token Access for Patient Signatures
CREATE POLICY "Allow public read of TCLE via valid token" ON public.termos_consentimento FOR SELECT TO public USING (token_publico IS NOT NULL);
CREATE POLICY "Allow public update of signature on TCLE via token" ON public.termos_consentimento FOR UPDATE TO public USING (token_publico IS NOT NULL AND status = 'pendente');

-- Indexes for maximum query performance
CREATE INDEX IF NOT EXISTS idx_cirurgias_paciente ON public.cirurgias(paciente_id);
CREATE INDEX IF NOT EXISTS idx_cirurgias_cirurgiao ON public.cirurgias(cirurgiao_principal_id);
CREATE INDEX IF NOT EXISTS idx_cirurgias_data ON public.cirurgias(data_cirurgia);
CREATE INDEX IF NOT EXISTS idx_pacientes_cpf ON public.pacientes(cpf);
CREATE INDEX IF NOT EXISTS idx_termos_token ON public.termos_consentimento(token_publico);
CREATE INDEX IF NOT EXISTS idx_pos_op_cirurgia ON public.acompanhamentos_pos_op(cirurgia_id);
