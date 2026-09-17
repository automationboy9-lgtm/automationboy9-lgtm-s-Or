import json, re

content = open('src/data/institutionsData.ts').read()
m = re.search(r'export const institutionsData: Institution\[\] = (\[[\s\S]+\]);', content)
existing = json.loads(m.group(1))
print("Current count:", len(existing))
