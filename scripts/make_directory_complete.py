import json, re, sys, os

with open('src/data/institutionsData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'export const institutionsData: Institution\[\] = (\[[\s\S]+\]);', content)
existing = json.loads(m.group(1))
existing_ids = {inst['id'] for inst in existing}
existing_names = {inst['name'].lower().strip() for inst in existing}

print(f"Loaded {len(existing)} existing records.")
