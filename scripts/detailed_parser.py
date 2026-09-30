import re
import json

with open("/root/ClubeMkt/operus/docs/main_bundle.js", "r", encoding="utf-8") as f:
    code = f.read()

# Let's find Portuguese UI texts, dialog titles, form labels, buttons, headers
dialog_headers = set(re.findall(r'DialogTitle[^>]*>([^<]+)<', code) + re.findall(r'title:\s*["\']([^"\']+)["\']', code))

# Extract all routes and their matched text / headings
pages_keywords = [
    "pacientes", "cirurgias", "orcamentos", "convenios", "procedimentos", 
    "auxilios", "equipe", "financeiro", "documentos", "pos-operatorio", 
    "lembretes", "notificacoes", "perfil", "termos", "aceite-termo"
]

print(f"Total bundle size: {len(code):,} characters")

# Find table schema details from db_schema_and_samples.json
with open("/root/ClubeMkt/operus/docs/db_schema_and_samples.json", "r", encoding="utf-8") as f:
    db_schema = json.load(f)

print("DB Tables extracted:", list(db_schema.keys()))
