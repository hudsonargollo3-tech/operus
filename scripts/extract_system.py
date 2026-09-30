import requests
import json
import os
import re

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

SUPABASE_URL = "https://xnrdqvxktuwucukohbzm.supabase.co"
DOCS_DIR = "/root/ClubeMkt/operus/docs"
os.makedirs(DOCS_DIR, exist_ok=True)

# 1. Fetch main bundle to find all chunk files and anon key
index_html = requests.get('https://operus.app.br/auth', headers=HEADERS).text
js_files = re.findall(r'src="(/assets/[^"]+\.js)"', index_html)

print("JS Files in index.html:", js_files)

main_js_url = f"https://operus.app.br{js_files[0]}"
main_js = requests.get(main_js_url, headers=HEADERS).text

# Save main bundle
with open(f"{DOCS_DIR}/main_bundle.js", "w", encoding="utf-8") as f:
    f.write(main_js)

# Find all chunk references in main_js
chunks = set(re.findall(r'"assets/([^"]+\.js)"', main_js) + re.findall(r'/assets/([^"]+\.js)', main_js))
print(f"Found {len(chunks)} chunks in main bundle.")

# Download all chunks
chunks_dir = f"{DOCS_DIR}/chunks"
os.makedirs(chunks_dir, exist_ok=True)
for chunk in sorted(chunks):
    chunk_url = f"https://operus.app.br/assets/{chunk}"
    try:
        c_resp = requests.get(chunk_url, headers=HEADERS)
        if c_resp.status_code == 200:
            with open(f"{chunks_dir}/{chunk}", "w", encoding="utf-8") as f:
                f.write(c_resp.text)
    except Exception as e:
        print(f"Error fetching chunk {chunk}: {e}")

# 2. Extract Supabase anon key
jwts = set(re.findall(r'eyJ[a-zA-Z0-9_-]+\.eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+', main_js))
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

# 3. Authenticate and get session token
auth_resp = requests.post(
    f"{SUPABASE_URL}/auth/v1/token?grant_type=password",
    headers={"apikey": anon_key, "Content-Type": "application/json", "User-Agent": HEADERS['User-Agent']},
    json={"email": "Herlonmoura@hotmail.com", "password": "Cafe2309@"}
)
auth_data = auth_resp.json()
access_token = auth_data.get('access_token')

# 4. Fetch Supabase OpenAPI Swagger spec (contains ALL tables, columns, RPCs, relationships)
openapi_resp = requests.get(
    f"{SUPABASE_URL}/rest/v1/?apikey={anon_key}",
    headers={
        "apikey": anon_key,
        "Authorization": f"Bearer {access_token}",
        "User-Agent": HEADERS['User-Agent']
    }
)

if openapi_resp.status_code == 200:
    openapi_spec = openapi_resp.json()
    with open(f"{DOCS_DIR}/supabase_openapi.json", "w", encoding="utf-8") as f:
        json.dump(openapi_spec, f, indent=2)
    print(f"Successfully saved Supabase OpenAPI spec. Definitions found: {len(openapi_spec.get('definitions', {}))}, Paths: {len(openapi_spec.get('paths', {}))}")
else:
    print(f"Failed to fetch OpenAPI spec: {openapi_resp.status_code} {openapi_resp.text}")

print("Extraction step 1 finished!")
