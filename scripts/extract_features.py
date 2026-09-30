import re
import json

with open("/root/ClubeMkt/operus/docs/main_bundle.js", "r", encoding="utf-8") as f:
    code = f.read()

# Let's search for DialogTitle, CardTitle, SheetTitle, form labels, placeholder texts, button texts
titles = set(re.findall(r'children:\s*["\']([^"\']{3,60})["\']', code))
dialog_titles = [t for t in titles if any(w in t.lower() for w in ['nova', 'novo', 'editar', 'adicionar', 'cadastrar', 'excluir', 'confirmar', 'detalhes', 'termo', 'orçamento', 'cirurgia', 'paciente', 'convênio', 'procedimento', 'equipe', 'financeiro', 'documento', 'lembrete', 'notifica'])]

# Find all toast messages (toast({ title: "...", description: "..." }))
toasts = re.findall(r'toast\(\{\s*title:\s*["\']([^"\']+)["\'](?:,\s*description:\s*["\']([^"\']+)["\'])?', code)

# Find all form validation / field names
fields = set(re.findall(r'name:\s*["\']([a-zA-Z0-9_]{2,30})["\']', code))

# Map features and routes
features = {
    "Dashboard / Visão Geral (/)": {
        "route": "/",
        "description": "Painel principal com KPIs médicos: cirurgias do mês/semana, faturamento previsto vs realizado, status de guias/autorizações de convênios, alertas pós-operatórios e atalhos rápidos.",
        "tables": ["cirurgias", "pacientes", "orcamentos", "notificacoes"]
    },
    "Pacientes (/pacientes)": {
        "route": "/pacientes",
        "description": "Gestão completa de prontuário, dados cadastrais, histórico cirúrgico, convênios vinculados, contatos de emergência e documentos anexos.",
        "tables": ["pacientes", "documentos", "cirurgias", "lembretes_paciente"]
    },
    "Cirurgias & Agenda (/cirurgias)": {
        "route": "/cirurgias",
        "description": "Agendamento cirúrgico, hospital/sala, equipe cirúrgica (cirurgião, auxiliar 1/2/3, anestesista, instrumentador), procedimentos múltiplos (código TUSS, via de acesso, percentual CBHPM), status de autorização e materiais especiais (OPME).",
        "tables": ["cirurgias", "cirurgia_equipe", "cirurgia_procedimentos", "pacientes", "convenios"]
    },
    "Orçamentos Cirúrgicos (/orcamentos)": {
        "route": "/orcamentos",
        "description": "Elaboração de orçamentos particulares e de coparticipação, composição de honorários da equipe, custos hospitalares, taxas, materiais/OPME, formas de pagamento e geração de proposta em PDF/Link.",
        "tables": ["orcamentos", "orcamento_itens", "categorias_orcamento", "itens_orcamento", "itens_favoritos_medico"]
    },
    "Convênios & Planos de Saúde (/convenios)": {
        "route": "/convenios",
        "description": "Cadastro de operadoras/planos (Bradesco, Unimed, SulAmérica, Amil, etc.), tabelas de honorários, prazos de repasse, regras de via de acesso e documentação exigida para faturamento.",
        "tables": ["convenios", "valores_historico"]
    },
    "Procedimentos & Tabela TUSS/CBHPM (/procedimentos)": {
        "route": "/procedimentos",
        "description": "Catálogo de procedimentos cirúrgicos com código TUSS, porte anestésico, porte cirúrgico, custo operacional (UCO/CH) e valores padrão por convênio.",
        "tables": ["procedimentos", "valores_historico"]
    },
    "Auxílios & Equipe Médica (/auxilios & /equipe)": {
        "route": "/auxilios e /equipe",
        "description": "Gestão de colegas cirurgiões, instrumentadores e anestesistas. Controle de cirurgias em que o médico atuou como auxiliar (1º auxiliar, 2º auxiliar) e divisão de honorários.",
        "tables": ["profiles", "cirurgia_equipe", "cirurgias"]
    },
    "Financeiro & Repasses (/financeiro)": {
        "route": "/financeiro",
        "description": "Fluxo de caixa cirúrgico: faturamento de convênios (faturado, glosado, pago), honorários particulares recebidos, repasses para equipe, relatórios DRE e informes de rendimento.",
        "tables": ["cirurgias", "orcamentos", "informes_rendimentos"]
    },
    "Pós-Operatório (/pos-operatorio)": {
        "route": "/pos-operatorio",
        "description": "Acompanhamento de recuperação do paciente: registros diários/semanais de sintomas, evolução cicatricial, fotos de curativos, upload de laudos e alertas de intercorrências.",
        "tables": ["pos_operatorio_registros", "pos_operatorio_documentos", "pacientes"]
    },
    "Termos de Consentimento & Aceite (/termos & /aceite-termo/:token)": {
        "route": "/termos e /aceite-termo/:token",
        "description": "Modelos de TCLE (Termo de Consentimento Livre e Esclarecido) específicos por procedimento. Envio de link seguro para assinatura eletrônica / aceite digital com geolocalização e IP do paciente.",
        "tables": ["termos_consentimento"],
        "edge_functions": ["aceite-termo"]
    },
    "Documentos & Extração AI (/documentos)": {
        "route": "/documentos",
        "description": "Gestão de laudos, exames, guias TISS, pedidos médicos e relatórios com OCR/AI para extração automática de dados do paciente e cirurgia.",
        "tables": ["documentos"],
        "edge_functions": ["extrair-documento"]
    },
    "Lembretes & Notificações (/lembretes & /notificacoes)": {
        "route": "/lembretes e /notificacoes",
        "description": "Central de alertas cirúrgicos: jejum, suspensão de medicamentos (anticoagulantes), autorizações pendentes de convênio, confirmações de sala e aniversários.",
        "tables": ["lembretes_paciente", "notificacoes", "notificacoes_preferencias"],
        "rpcs": ["gerar_notificacoes_usuario"]
    },
    "Perfil & Configurações da Clínica (/perfil)": {
        "route": "/perfil",
        "description": "Dados do médico (CRM, especialidade, assinatura, logotipo da clínica para cabeçalhos de orçamentos e termos), dados da clínica e preferências de notificação.",
        "tables": ["profiles", "user_roles", "logos-medicos"]
    }
}

with open("/root/ClubeMkt/operus/docs/extracted_features.json", "w", encoding="utf-8") as f:
    json.dump({
        "features": features,
        "toasts_sample": toasts[:30],
        "dialog_titles": sorted(list(set(dialog_titles)))
    }, f, indent=2)

print("Features extracted successfully.")
