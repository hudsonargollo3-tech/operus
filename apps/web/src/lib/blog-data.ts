export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  category: 'Gestão Cirúrgica' | 'TUSS & Faturamento' | 'TCLE & Jurídico' | 'Tecnologia Médica' | 'OPME & Logística';
  author: {
    name: string;
    role: string;
    avatar: string;
    crm?: string;
  };
  date: string;
  readTime: string;
  tags: string[];
  keyTakeaways: string[];
  tussCodes?: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'como-eliminar-glosas-multi-procedimentos-tuss',
    title: 'Como Eliminar Glosas em Multi-Procedimentos TUSS e Maximizar Honorários Cirúrgicos',
    summary: 'Guia definitivo de auditoria pré-operatória: regras de via de acesso única e vias distintas (100%, 70% e 50%) para blindar guias de autorização TUSS contra glosas de convênio.',
    category: 'TUSS & Faturamento',
    author: {
      name: 'Dr. Lucas Arantes',
      role: 'Especialista em Auditoria Médica & Cirurgião Geral',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
      crm: 'CRM-SP 184.920'
    },
    date: '30 de Setembro, 2026',
    readTime: '7 min de leitura',
    tags: ['TUSS', 'Glosas', 'Faturamento Médico', 'Honorários Cirúrgicos', 'CBHPM'],
    keyTakeaways: [
      'Procedimentos múltiplos no mesmo ato cirúrgico seguem a regra de 100% no código principal e 70% (vias distintas) ou 50% (mesma via).',
      'A inconsistência na justificativa técnica de vias cirúrgicas é responsável por 68% das glosas em cirurgias combinadas.',
      'A pré-auditoria automatizada com verificação de compatibilidade CBHPM reduz o tempo de recebimento de honorários em até 22 dias.'
    ],
    tussCodes: ['31001017', '31003052', '31003460', '31401015'],
    faqs: [
      {
        question: 'Qual a diferença de remuneração entre mesma via de acesso e vias distintas?',
        answer: 'Na mesma via de acesso, o procedimento de maior porte recebe 100% do porte estipulado e os demais recebem 50%. Em vias cirúrgicas distintas (ex: laparoscopia + via perineal), o principal recebe 100% e os procedimentos secundários recebem 70% do valor contratado.'
      },
      {
        question: 'Como justificar tecnicamente procedimentos múltiplos para a operadora?',
        answer: 'O laudo descritivo operatório deve discriminar explicitamente cada incisão cirúrgica, os tempos operatórios independentes e o posicionamento de trocartes/campos para comprovar a independência anatômica dos atos operatórios.'
      }
    ],
    content: `
## O Custo Invisível das Glosas na Rotina do Cirurgião

Estudos de governança hospitalar e faturamento médico demonstram que equipes cirúrgicas de alto volume perdem entre **12% e 28% de seus honorários legítimos** por inconsistências no preenchimento de códigos TUSS, vias de acesso e documentação de OPME.

Quando múltiplos procedimentos são realizados no mesmo ato operatório, a aplicação das porcentagens de remuneração (100% no procedimento principal, 70% ou 50% nos secundários conforme a via de acesso) frequentemente gera divergências com a operadora de saúde.

### 1. A Regra das Vias de Acesso e Percentuais Contratuais
- **Mesma Via de Acesso:** O procedimento de maior porte anestésico/cirúrgico é remunerado a 100%, e os atos subsequentes realizados pelo mesmo campo são remunerados a 50% da tabela CBHPM ou contratada.
- **Vias de Acesso Distintas:** O procedimento principal recebe 100%, e os atos cirúrgicos executados por incisões ou acessos anatômicos separados são remunerados a 70%.
- **Cirurgias Bilaterais:** Procedimentos em órgãos pares por incisões distintas geralmente seguem a remuneração de 100% no primeiro lado e 70% no contralateral, salvo regulação contratual específica.

### 2. Principais Causas de Glosas Evitáveis
1. **Falta de Discriminação de Tempos Cirúrgicos:** Descrições operatórias genéricas sem menção aos acessos individuais.
2. **Incompatibilidade de Código TUSS:** Utilização de códigos com abrangência inclusiva (pacotes) concomitante a códigos desmembrados.
3. **Ausência de Comprovante de OPME:** Não inclusão de etiquetas de rastreabilidade ANVISA com QR Code/DataMatrix na folha de sala.

### 3. Blindagem de Faturamento com o Operus Surgical Suite
No Operus, a calculadora de vias de acesso audita automaticamente a composição de códigos TUSS no momento do agendamento, emitindo o espelho de faturamento blindado contra glosas com descrição técnica justificada e parâmetros contratuais validados.
    `
  },
  {
    slug: 'validade-juridica-tcle-digital-cfm',
    title: 'Validade Jurídica do Termo de Consentimento Livre e Esclarecido (TCLE) Digital segundo o CFM',
    summary: 'Requisitos legais da Resolução CFM nº 2.299/2021, MP 2.200-2 e LGPD para assinatura eletrônica de termos de consentimento cirúrgico.',
    category: 'TCLE & Jurídico',
    author: {
      name: 'Dra. Camila Vasconcelos',
      role: 'Consultora em Direito Médico & Bioética',
      avatar: 'https://images.unsplash.com/photo-1594824813589-9a74c76a9170?w=150&auto=format&fit=crop&q=80',
      crm: 'OAB-SP 312.450'
    },
    date: '28 de Setembro, 2026',
    readTime: '6 min de leitura',
    tags: ['TCLE', 'CFM 2299', 'Direito Médico', 'Assinatura Digital', 'LGPD'],
    keyTakeaways: [
      'A Resolução CFM nº 2.299/2021 autoriza termos e consentimentos médicos assinados eletronicamente desde que assegurada a autenticidade e integridade.',
      'O consentimento em papel assinado no pré-operatório imediato na maca é o argumento principal em 74% dos processos de vício de consentimento.',
      'A coleta de timestamp auditável, geolocalização e hash SHA-256 confere validade probatória plena em tribunais de justiça.'
    ],
    faqs: [
      {
        question: 'O paciente precisa de certificado ICP-Brasil para assinar o TCLE?',
        answer: 'Não. Segundo a Lei nº 14.063/2020 e a Resolução CFM 2.299/2021, a assinatura eletrônica avançada (comprova autoria por biometria manuscrita na tela, IP, e-mail/SMS com token de uso único) tem plena validade jurídica para atos médicos de consentimento.'
      },
      {
        question: 'Qual a antecedência recomendada para o envio do TCLE ao paciente?',
        answer: 'O Código de Ética Médica e a jurisprudência recomendam que o paciente receba as informações e o termo com pelo menos 48 a 72 horas de antecedência ao ato cirúrgico eletivo, assegurando tempo suficiente para reflexão e esclarecimento de dúvidas.'
      }
    ],
    content: `
## Por que o TCLE em Papel é uma Fragilidade Jurídica?

Termos de consentimento impressos são frequentemente extraviados, preenchidos às pressas minutos antes da indução anestésica ou assinados sem comprovação de tempo hábil de reflexão pelo paciente.

Em disputas judiciais sobre erro médico e responsabilidade civil, a alegação de **"vício de consentimento"** ou falta de esclarecimento dos riscos específicos é uma das causas mais frequentes de condenação.

### Requisitos Essenciais para o TCLE Digital Válido:
1. **Timestamp Auditável:** Registro do momento exato em que o paciente abriu, leu e aceitou os termos.
2. **Coleta de Metadados de Autenticidade:** Endereço IP, geolocalização e identificador do dispositivo do paciente.
3. **Assinatura Eletrônica em Tela:** Traço biométrico manuscrito na tela do smartphone com validação via link seguro com token descartável.
4. **Armazenamento Criptografado:** Imutabilidade do documento em formato PDF/A assinado digitalmente com hash criptográfico SHA-256.

O Operus automatiza esse fluxo via SMS e WhatsApp com link dedicado, garantindo conformidade total com o CFM e a LGPD.
    `
  },
  {
    slug: 'rastreabilidade-opme-consignados-seguranca-sala',
    title: 'Rastreabilidade de OPME e Implantes: Eliminando Conflitos entre Hospital, Fornecedor e Cirurgião',
    summary: 'Como organizar o fluxo de caixas consignadas, conferência de lotes e etiquetas ANVISA no intraoperatório sem atrasos de sala cirúrgica.',
    category: 'OPME & Logística',
    author: {
      name: 'Dr. Roberto Meireles',
      role: 'Cirurgião Ortopedista & Chefe de Bloco Cirúrgico',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
      crm: 'CRM-RJ 142.880'
    },
    date: '25 de Setembro, 2026',
    readTime: '8 min de leitura',
    tags: ['OPME', 'Implantes', 'Rastreabilidade', 'ANVISA', 'Gestão Hospitalar'],
    keyTakeaways: [
      'A falta de conferência prévia de instrumentais e caixas consignadas causa mais de 35% dos atrasos de primeira cirurgia em centros cirúrgicos.',
      'O registro fotográfico instantâneo com leitura de DataMatrix vincula lote e validade do implante diretamente ao prontuário do paciente.',
      'A comunicação direta com o distribuidor de OPME com confirmação de entrega 24h antes reduz cancelamentos de sala a zero.'
    ],
    faqs: [
      {
        question: 'Quem é responsável pela guarda das etiquetas de OPME?',
        answer: 'A equipe de enfermagem de sala fixa as etiquetas na folha de sala e prontuário, mas a conferência do código correto e da indicação clínica cabe ao cirurgião responsável, sendo essencial para a autorização do faturamento.'
      },
      {
        question: 'Como o Operus previne a falta de material no dia da cirurgia?',
        answer: 'O sistema cria um canal automatizado com checklist de consignação, alertando a instrumentadora e o fornecedor 48h e 24h antes do procedimento, com upload obrigatório do comprovante de esterilização e envio da caixa.'
      }
    ],
    content: `
## O Desafio da Cadeia de Suprimentos no Bloco Cirúrgico

A logística de Órteses, Próteses e Materiais Especiais (OPME) é um dos pontos mais críticos da cirurgia moderna. Um único parafuso ortopédico com tamanho divergente ou uma caixa de instrumental sem selo de esterilização válido pode cancelar um procedimento de alta complexidade.

### As Três Etapas da Rastreabilidade Segura:
1. **Pré-Operatório (48h antes):** Verificação de autorização da guia OPME pelo convênio e confirmação de entrega do kit com a distribuidora.
2. **Intraoperatório:** Leitura visual ou via scanner de código de barras das etiquetas ANVISA, registro de quantidades utilizadas e sobras.
3. **Pós-Operatório:** Consolidação instantânea do espelho de sala com exportação para o sistema hospitalar e emissão de relatório de uso.
    `
  },
  {
    slug: 'gestao-cirurgica-moderna-abandonando-o-whatsapp',
    title: 'Por que Cirurgiões de Alta Performance Abandonaram o WhatsApp na Rotina Cirúrgica',
    summary: 'Os riscos de desorganização, vazamento de dados sensíveis (LGPD) e perda de receitas ao gerenciar mapas cirúrgicos em grupos de mensagens.',
    category: 'Gestão Cirúrgica',
    author: {
      name: 'Dr. Fernando Albuquerque',
      role: 'Cirurgião Plástico & Diretor de Clínica Privada',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&auto=format&fit=crop&q=80',
      crm: 'CRM-SP 165.310'
    },
    date: '20 de Setembro, 2026',
    readTime: '5 min de leitura',
    tags: ['Gestão Cirúrgica', 'LGPD Médica', 'Comunicação Clínica', 'Produtividade'],
    keyTakeaways: [
      'Grupos de WhatsApp misturam dados sensíveis de pacientes com conversas informais, violando diretamente as diretrizes da LGPD e do CFM.',
      'Mensagens soltas e uploads de exames em chat resultam em perda média de 4.5 horas semanais por cirurgião na busca de informações.',
      'Centralizar o mapa de cirurgias em um painel unificado melhora a pontualidade da equipe em 92%.'
    ],
    faqs: [
      {
        question: 'O WhatsApp é proibido para comunicação médica?',
        answer: 'O CFM permite comunicação entre médicos, mas veda o compartilhamento de prontuários em grupos abertos sem criptografia ponta a ponta controlada por prontuário eletrônico certificado.'
      }
    ],
    content: `
## O Caos dos Grupos de Cirurgia no WhatsApp

O que começou como uma ferramenta rápida de aviso transformou-se em uma fonte de estresse, cancelamentos de cirurgia e riscos regulatórios.

Documentos perdidos em galerias de celular, laudos sem associação direta ao prontuário e discussões de casos sem registro auditável colocam a clínica em vulnerabilidade ética e jurídica.

A substituição de mensagens instantâneas por um **Operating System Cirúrgico** dedicado garante que anestesistas, instrumentadores, secretárias e faturistas visualizem a mesma informação em tempo real com controle de acessos por perfil.
    `
  }
];
