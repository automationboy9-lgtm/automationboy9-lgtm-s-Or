import json
import re

# Load institutions
content = open('src/data/institutionsData.ts').read()
match = re.search(r'export const institutionsData: Institution\[\] = (\[[\s\S]+\]);', content)
institutions = json.loads(match.group(1))
print(f"Loaded {len(institutions)} institutions.")

# Let's inspect unique faculty names
all_faculties = set()
for inst in institutions:
    for f in inst.get('faculties', []):
        all_faculties.add(f.strip())

print(f"Unique faculty names: {len(all_faculties)}")
