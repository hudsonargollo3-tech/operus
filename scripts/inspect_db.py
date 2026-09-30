import requests
import json
import os

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

SUPABASE_URL = "https://xnrdqvxktuwucukohbzm.supabase.co"
DOCS_DIR = "/root/ClubeMkt/operus/docs"

# 1. Anon key
with open(f"{DOCS_DIR}/main_bundle.js", "r", encoding="utf-8") as f:
    code = f.read()

import re
jwts = set(re.findall(r'eyJ[a-zA-Z0-9_-]+\.eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+', code))
anon_key = None
for jwt in jwts:
    try:
        import base64
        payload_b64 = jwt.split('.')[1]
        payload = json.loads(base64.urlsafe_b64decode(payload_b64 + '===').decode('utf-8'))
        if payload.get('role') == 'anon':
            anon_key = jwt
            break
    except Exception:
        continue

# 2. Authenticate
auth_resp = requests.post(
    f"{SUPABASE_URL}/auth/v1/token?grant_type=password",
    headers={"apikey": anon_key, "Content-Type": "application/json", "User-Agent": HEADERS['User-Agent']},
    json={"email": "Herlonmoura@hotmail.com", "password": "Cafe2309@"}
)
auth_data = auth_resp.json()
access_token = auth_data.get('access_token')
user = auth_data.get('user', {})

tables = [
    "profiles",
    "user_roles",
    "pacientes",
    "cirurgias",
    "cirurgia_equipe",
    "cirurgia_procedimentos",
    "convenios",
    "procedimentos",
    "valores_historico",
    "orcamentos",
    "orcamento_itens",
    "categorias_orcamento",
    "itens_orcamento",
    "itens_favoritos_medico",
    "documentos",
    "pos_operatorio_registros",
    "pos_operatorio_documentos",
    "termos_consentimento",
    "lembretes_paciente",
    "notificacoes",
    "notificacoes_preferencias",
    "informes_rendimentos"
]

db_summary = {}

req_headers = {
    "apikey": anon_key,
    "Authorization": f"Bearer {access_token}",
    "User-Agent": HEADERS['User-Agent'],
    "Prefer": "count=exact"
}

for table in tables:
    try:
        r = requests.get(f"{SUPABASE_URL}/rest/v1/{table}?select=*&limit=5", headers=req_headers)
        if r.status_code == 200:
            count = r.headers.get('content-range', '0').split('/')[-1]
            rows = r.json()
            cols = list(rows[0].keys()) if rows else []
            db_summary[table] = {
                "count": count,
                "columns": cols,
                "sample_record": rows[0] if rows else None
            }
            print(f"Table '{table}': {count} records | Columns: {len(cols)}")
        else:
            print(f"Table '{table}': Error {r.status_code} - {r.text}")
            db_summary[table] = {"error": r.status_code, "msg": r.text}
    except Exception as e:
        print(f"Table '{table}': Exception {e}")

with open(f"{DOCS_DIR}/db_schema_and_samples.json", "w", encoding="utf-8") as f:
    json.dump(db_summary, f, indent=2, default=str)

print(f"\nSaved detailed DB schema and sample inspection to {DOCS_DIR}/db_schema_and_samples.json")
