-- Operus Surgical Suite — Initial Seed Data
-- TUSS Procedimentos Cirúrgicos Comuns e Modelos de Termo de Consentimento

INSERT INTO public.procedimentos_tuss (codigo_tuss, descricao, porte_anestesico, porte_cirurgico, valor_referencia) VALUES
('30907080', 'Tratamento cirúrgico de varizes com termoablação (Laser / Radiofrequência)', '3', '7A', 4500.00),
('30907099', 'Flebectomia de colaterais varicosas (múltiplas punções)', '2', '5B', 1800.00),
('30907102', 'Ligadura de veias perfurantes insuficientes', '2', '4C', 1200.00),
('31005455', 'Colecistectomia videolaparoscópica', '4', '9A', 5200.00),
('31001271', 'Herniorrafia inguinal unilateral videolaparoscópica', '3', '7B', 3800.00),
('30715180', 'Artroscopia diagnóstica e cirúrgica de joelho com meniscectomia', '3', '8A', 4900.00),
('30101786', 'Rinoplastia reparadora / funcional com septoplastia', '4', '8C', 6800.00),
('30501066', 'Mastectomia com reconstrução imediata com prótese', '5', '10A', 9500.00)
ON CONFLICT (codigo_tuss) DO NOTHING;

-- Template Padrão de TCLE
INSERT INTO public.termo_modelos (titulo, categoria, conteudo_template, riscos_mapeados, cuidados_pre_op, cuidados_pos_op) VALUES
('Termo de Consentimento Livre e Esclarecido (TCLE) — Tratamento Endovascular e Cirúrgico de Varizes',
 'Angiologia e Cirurgia Vascular',
 'Declaro que fui devidamente informado(a) pelo cirurgião responsável sobre o diagnóstico da insuficiência venosa crônica, indicação cirúrgica, técnicas a serem empregadas (incluindo ablação térmica por Laser/Radiofrequência e microflebectomias), benefícios esperados e alternativas terapêuticas.',
 '["Equimose e hematomas transitórios", "Hiperpigmentação cutânea residual", "Tromboflebite superficial", "Parestesias temporárias por tração nervosa periférica", "Trombose Venosa Profunda (raro)"]'::jsonb,
 '["Jejum absoluto de 8 horas para sólidos e líquidos", "Suspender anticoagulantes conforme prescrição médica", "Levar meias de compressão elástica prescritas no dia do internamento"]'::jsonb,
 '["Deambulação precoce no mesmo dia do procedimento", "Uso contínuo das meias elásticas por 7 a 14 dias", "Evitar exposição solar direta nas áreas tratadas por 30 dias", "Comparecer aos retornos de D+7 e D+30 para controle ultrassonográfico"]'::jsonb
);
