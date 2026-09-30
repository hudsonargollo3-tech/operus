import re
import json

with open("/root/ClubeMkt/operus/docs/main_bundle.js", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Supabase table queries (.from("..."))
tables = set(re.findall(r'\.from\(\s*["\']([a-zA-Z0-9_-]+)["\']\s*\)', code))
print("Supabase tables referenced in bundle:")
for t in sorted(tables):
    print(f" - {t}")

# 2. Supabase RPC functions (.rpc("..."))
rpcs = set(re.findall(r'\.rpc\(\s*["\']([a-zA-Z0-9_-]+)["\']\s*', code))
print("\nSupabase RPCs referenced in bundle:")
for r in sorted(rpcs):
    print(f" - {r}")

# 3. Supabase Edge Functions (.functions.invoke("..."))
edge_funcs = set(re.findall(r'functions\.invoke\(\s*["\']([a-zA-Z0-9_-]+)["\']', code) + re.findall(r'/functions/v1/([a-zA-Z0-9_-]+)', code))
print("\nEdge Functions referenced in bundle:")
for ef in sorted(edge_funcs):
    print(f" - {ef}")

# 4. Routes (path: "...")
route_paths = set(re.findall(r'path:\s*["\']([^"\']+)["\']', code) + re.findall(r'path="([^"]+)"', code) + re.findall(r'to:\s*["\'](/[^"\']*)["\']', code) + re.findall(r'href:\s*["\'](/[^"\']*)["\']', code) + re.findall(r'navigate\(\s*["\'](/[^"\']*)["\']', code))
print("\nNavigation / Routes found:")
for p in sorted(route_paths):
    print(f" - {p}")

# 5. Look for Dialog / Modal / Sheet components
dialog_names = set(re.findall(r'function\s+([A-Z][a-zA-Z0-9]*(?:Modal|Dialog|Drawer|Sheet|Form|View|Details|Card|Panel|Page|Tab|Header|Table))\b', code))
print(f"\nComponent definitions ({len(dialog_names)} found):")
for d in sorted(dialog_names)[:50]:
    print(f" - {d}")
