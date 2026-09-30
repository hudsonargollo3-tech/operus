export type UserRole = 'medico' | 'secretaria' | 'administrador' | 'instrumentador' | 'anestesista';

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  crm: string | null;
  phone: string | null;
  avatar_url: string | null;
  logo_url: string | null;
  clinica_nome: string | null;
  clinica_endereco: string | null;
  clinica_telefone: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Paciente {
  id: string;
  user_id: string;
  nome: string;
  cpf: string | null;
  rg: string | null;
  data_nascimento: string | null;
  sexo: 'M' | 'F' | 'Outro' | null;
  telefone: string | null;
  email: string | null;
  cep: string | null;
  endereco: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  cidade: string | null;
  estado: string | null;
  convenio_id: string | null;
  numero_carteirinha: string | null;
  observacoes_medicas: string | null;
  contato_emergencia_nome: string | null;
  contato_emergencia_telefone: string | null;
  created_at?: string;
  updated_at?: string;
}

export type CirurgiaStatus = 'agendada' | 'em_autorizacao' | 'autorizada' | 'realizada' | 'cancelada' | 'adiada';

export interface Cirurgia {
  id: string;
  user_id: string;
  paciente_id: string;
  convenio_id: string | null;
  hospital_nome: string | null;
  sala_cirurgica: string | null;
  data_cirurgia: string;
  duracao_estimada_minutos: number | null;
  status: CirurgiaStatus;
  tipo_anestesia: string | null;
  necessita_opme: boolean;
  opme_descricao: string | null;
  status_opme: string | null;
  observacoes: string | null;
  created_at?: string;
  updated_at?: string;
  // Join relations
  paciente?: Paciente;
  convenio?: Convenio;
  procedimentos?: CirurgiaProcedimento[];
  equipe?: CirurgiaEquipe[];
}

export interface CirurgiaProcedimento {
  id: string;
  cirurgia_id: string;
  procedimento_id?: string | null;
  codigo_tuss: string | null;
  descricao: string;
  via_acesso: 'mesma_via' | 'diferentes_vias' | 'bilateral' | null;
  percentual_pagamento: number | null;
  valor_estimado: number | null;
}

export interface CirurgiaEquipe {
  id: string;
  cirurgia_id: string;
  membro_nome: string;
  funcao: 'cirurgiao_principal' | 'primeiro_auxiliar' | 'segundo_auxiliar' | 'anestesista' | 'instrumentador';
  crm: string | null;
  valor_honorario: number | null;
  status_repasse: 'pendente' | 'pago' | 'glosado' | null;
}

export interface Convenio {
  id: string;
  user_id: string;
  nome: string;
  registro_ans: string | null;
  tabela_base: string | null;
  prazo_repasse_dias: number | null;
  ativo: boolean;
  created_at?: string;
}

export interface Procedimento {
  id: string;
  user_id: string;
  codigo_tuss: string;
  nome: string;
  especialidade: string | null;
  porte_cirurgico: string | null;
  porte_anestesico: string | null;
  uco_ch: number | null;
  created_at?: string;
}

export interface Orcamento {
  id: string;
  user_id: string;
  paciente_id: string;
  numero_orcamento: string | null;
  data_emissao: string | null;
  validade_dias: number | null;
  status: 'rascunho' | 'enviado' | 'aprovado' | 'recusado' | 'expirado';
  valor_total: number;
  desconto_total: number | null;
  forma_pagamento: string | null;
  link_compartilhamento: string | null;
  created_at?: string;
  itens?: OrcamentoItem[];
  paciente?: Paciente;
}

export interface OrcamentoItem {
  id: string;
  orcamento_id: string;
  categoria_id: string | null;
  descricao: string;
  quantidade: number;
  valor_unitario: number;
  valor_total: number;
}

export interface TermoConsentimento {
  id: string;
  user_id: string;
  paciente_id: string;
  cirurgia_id: string | null;
  titulo: string;
  corpo_termo: string;
  riscos_especificos: string[] | null;
  beneficios_esperados: string[] | null;
  token_aceite: string;
  status_aceite: 'pendente' | 'aceito' | 'recusado';
  data_aceite: string | null;
  ip_aceite: string | null;
  user_agent_aceite: string | null;
  geolocalizacao_aceite: any | null;
  assinatura_digital_url: string | null;
  created_at?: string;
  paciente?: Paciente;
  cirurgia?: Cirurgia;
}

export interface PosOperatorioRegistro {
  id: string;
  cirurgia_id: string;
  paciente_id: string;
  dia_pos_operatorio: number;
  escala_dor: number;
  temperatura: number | null;
  presenca_sangramento: boolean;
  presenca_secrecao: boolean;
  relato_paciente: string | null;
  orientacoes_medicas: string | null;
  created_at?: string;
}
