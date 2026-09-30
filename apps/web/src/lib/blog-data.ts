export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  category: 'Gestão Cirúrgica' | 'TUSS & Faturamento' | 'TCLE & Jurídico' | 'Tecnologia Médica';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  content: string;
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'como-eliminar-glosas-multi-procedimentos-tuss',
    title: 'Como Eliminar Glosas em Multi-Procedimentos TUSS e Maximizar Honorários Cirúrgicos',
    summary: 'Aprenda a aplicar as regras de via de acesso única e vias distintas (100%, 70% e 50%) para auditar guias antes do envio aos convênios.',
    category: 'TUSS & Faturamento',
    author: {
      name: 'Dr. Lucas Arantes',
      role: 'Especialista em Auditoria Médica & Cirurgião',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
    },
    date: '30 de Setembro, 2026',
    readTime: '6 min de leitura',
    tags: ['TUSS', 'Glosas', 'Faturamento Médico', 'Honorários'],
    content: `
## O Custo Invisível das Glosas na Rotina do Cirurgião

Estudos recentes de governança hospitalar mostram que equipes cirúrgicas de alto volume perdem entre **12% e 28% de seus honorários legítimos** por inconsistências no preenchimento de códigos TUSS, vias de acesso e documentação de OPME.

Quando múltiplos procedimentos são realizados no mesmo ato operatório, a aplicação das porcentagens de remuneração (100% no procedimento principal, 70% ou 50% nos secundários conforme a via de acesso) frequentemente gera divergências com a operadora de saúde.

### 1. Entendendo a Regra de Vias de Acesso
- **Mesma Via de Acesso:** O procedimento de maior porte é remunerado a 100%, e os demais a 50% do valor de tabela contratada.
- **Vias de Acesso Distintas:** O procedimento principal recebe 100%, e os atos cirúrgicos executados por acessos cirúrgicos separados são remunerados a 70%.

### 2. A Solução com Operus Surgical Suite
No Operus, a calculadora de vias de acesso audita automaticamente a composição de códigos TUSS no momento do agendamento, emitindo o espelho de faturamento blindado contra glosas com descrição técnica justificada.
    `
  },
  {
    slug: 'validade-juridica-tcle-digital-cfm',
    title: 'Validade Jurídica do Termo de Consentimento Livre e Esclarecido (TCLE) Digital segundo o CFM',
    summary: 'Entenda os requisitos legais da Resolução CFM nº 2.299/2021 e da LGPD para coleta de assinatura eletrônica do paciente.',
    category: 'TCLE & Jurídico',
    author: {
      name: 'Dra. Camila Vasconcelos',
      role: 'Consultora em Direito Médico & Bioética',
      avatar: 'https://images.unsplash.com/photo-1594824813589-9a74c76a9170?w=150&auto=format&fit=crop&q=80'
    },
    date: '28 de Setembro, 2026',
    readTime: '5 min de leitura',
    tags: ['TCLE', 'CFM', 'Direito Médico', 'Assinatura Digital'],
    content: `
## Por que o TCLE em Papel é uma Fragilidade Jurídica?

Termos de consentimento impressos são frequentemente extraviados, preenchidos às pressas minutos antes da indução anestésica ou assinados sem comprovação de tempo hábil de reflexão pelo paciente.

Em disputas judiciais, a alegação de "vício de consentimento" é uma das causas mais comuns de condenação civil de cirurgiões.

### Requisitos Essenciais para o TCLE Digital Válido:
1. **Timestamp Auditável:** Registro do momento exato em que o paciente abriu, leu e aceitou os termos.
2. **Coleta de Metadados de Autenticidade:** Endereço IP, geolocalização e identificador do dispositivo do paciente.
3. **Assinatura Eletrônica em Tela:** Traço biométrico manuscrito na tela do smartphone com validação via link seguro com token descartável.
4. **Armazenamento Criptografado:** Imutabilidade do documento em formato PDF/A assinado digitalmente.

O Operus automatiza esse fluxo via SMS e WhatsApp com link dedicado, garantindo conformidade total com o CFM e a LGPD.
    `
  },
  {
    slug: 'gestao-cirurgica-moderna-abandonando-o-whatsapp',
    title: 'Por que Cirurgiões de Alta Performance Abandonaram o WhatsApp na Rotina Cirúrgica',
    summary: 'Os riscos de desorganização, falhas de comunicação com anestesistas e fornecedores de OPME em grupos de mensagem.',
    category: 'Gestão Cirúrgica',
    author: {
      name: 'Dr. Rodrigo Mendes',
      role: 'Cirurgião Ortopedista & Co-founder',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80'
    },
    date: '24 de Setembro, 2026',
    readTime: '4 min de leitura',
    tags: ['Produtividade', 'Equipe Cirúrgica', 'WhatsApp', 'Gestão'],
    content: `
## O Caos dos Grupos Informais de Cirurgia

No dia a dia do cirurgião, o WhatsApp se tornou uma armadilha: dezenas de mensagens perdidas entre fornecedores de caixas cirúrgicas, secretárias de consultório, anestesistas e equipes de enfermagem.

As consequências são conhecidas:
- Falta de material ou caixa de instrumental trocada no momento da cirurgia;
- Divergências nos repasses de honorários para auxiliares;
- Informações sensíveis de pacientes circulando em aparelhos pessoais não protegidos (infração à LGPD).

### A Central Cirúrgica Operus
Com o Operus, cada cirurgia é tratada como um projeto estruturado: status da guia, confirmação da equipe, entrega de OPME e acompanhamento pós-operatório unificados em uma timeline em tempo real.
    `
  }
];
