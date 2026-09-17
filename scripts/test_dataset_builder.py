import json, re, sys, os

# Test reading current institutionsData.ts
content = open('src/data/institutionsData.ts').read()
m = re.search(r'export const institutionsData: Institution\[\] = (\[[\s\S]+\]);', content)
if not m:
    print("Failed to match institutionsData.ts")
    sys.exit(1)

existing = json.loads(m.group(1))
print(f"Loaded {len(existing)} existing institutions.")

# Collect existing IDs
existing_ids = {inst['id'] for inst in existing}
print(f"Unique existing IDs: {len(existing_ids)}")
