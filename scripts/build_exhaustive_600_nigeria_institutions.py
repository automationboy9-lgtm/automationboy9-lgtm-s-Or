import json
import re
import os
import sys

# 1. Load Existing Institutions
content = open('src/data/institutionsData.ts').read()
m = re.search(r'export const institutionsData: Institution\[\] = (\[[\s\S]+\]);', content)
if not m:
    print("Error: Could not parse institutionsData.ts")
    sys.exit(1)

existing_institutions = json.loads(m.group(1))
print(f"Loaded {len(existing_institutions)} existing institutions.")

existing_ids = {inst['id'] for inst in existing_institutions}
existing_names = {inst['name'].lower().strip() for inst in existing_institutions}

STATE_TO_ZONE = {
    'Abia': 'South East', 'Anambra': 'South East', 'Ebonyi': 'South East', 'Enugu': 'South East', 'Imo': 'South East',
    'Akwa Ibom': 'South South', 'Bayelsa': 'South South', 'Cross River': 'South South', 'Delta': 'South South', 'Edo': 'South South', 'Rivers': 'South South',
    'Ekiti': 'South West', 'Lagos': 'South West', 'Ogun': 'South West', 'Ondo': 'South West', 'Osun': 'South West', 'Oyo': 'South West',
    'Benue': 'North Central', 'Kogi': 'North Central', 'Kwara': 'North Central', 'Nasarawa': 'North Central', 'Niger': 'North Central', 'Plateau': 'North Central', 'FCT': 'North Central',
    'Adamawa': 'North East', 'Bauchi': 'North East', 'Borno': 'North East', 'Gombe': 'North East', 'Taraba': 'North East', 'Yobe': 'North East',
    'Jigawa': 'North West', 'Kaduna': 'North West', 'Kano': 'North West', 'Katsina': 'North West', 'Kebbi': 'North West', 'Sokoto': 'North West', 'Zamfara': 'North West'
}

def make_id(name, city):
    clean = re.sub(r'[^a-zA-Z0-9]+', '_', name.lower()).strip('_')
    tokens = clean.split('_')
    # Use acronym or first letters + city
    short = "".join([t[0] for t in tokens if len(t) > 0 and t not in ['of', 'and', 'the', 'for', 'in']])[:10]
    city_slug = re.sub(r'[^a-zA-Z0-9]+', '', city.lower())[:6]
    candidate = f"{short}_{city_slug}".strip('_')
    return candidate

