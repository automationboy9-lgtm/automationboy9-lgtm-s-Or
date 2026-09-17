import json
import re
import os
import sys

# Load current institutions
with open('src/data/institutionsData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'export const institutionsData: Institution\[\] = (\[[\s\S]+\]);', content)
if not m:
    print("Could not parse institutionsData.ts")
    sys.exit(1)

existing = json.loads(m.group(1))
print(f"Starting with {len(existing)} existing institutions.")

existing_ids = {inst['id'] for inst in existing}
existing_names = {inst['name'].lower().strip() for inst in existing}

STATE_TO_ZONE = {
    'Abia': 'South East', 'Anambra': 'South East', 'Ebonyi': 'South East', 'Enugu': 'South East', 'Imo': 'South East',
    'Akwa Ibom': 'South South', 'Bayelsa': 'South South', 'Cross River': 'South South', 'Delta': 'South South', 'Edo': 'South South', 'Rivers': 'South South',
    'Ekiti': 'South West', 'Lagos': 'South West', 'Ogun': 'South West', 'Ondo': 'South West', 'Osun': 'South West', 'Oyo': 'South West',
    'Benue': 'North Central', 'Kogi': 'North Central', 'Kwara': 'North Central', 'Nasarawa': 'North Central', 'Niger': 'North Central', 'Plateau': 'North Central', 'FCT': 'North Central',
    'Adamawa': 'North East', 'Bauchi': 'North East', 'Borno': 'North East', 'Gombe': 'North East', 'Taraba': 'North East', 'Yobe': 'North East',
    'Jigawa': 'North West', 'Kaduna': 'North West', 'Kano': 'North West', 'Katsina': 'North West', 'Kebbi': 'North West', 'Sokoto': 'North West', 'Zamfara': 'North West'
}

def get_faculties_for_type(name, itype):
    itype_lower = itype.lower()
    if 'university' in itype_lower:
        if 'technology' in name.lower() or 'tech' in name.lower():
            return [
                "School of Computing & Information Technology",
                "School of Engineering & Engineering Technology",
                "School of Environmental Sciences",
                "School of Physical Sciences",
                "School of Life Sciences",
                "School of Management Technology"
            ]
        elif 'agriculture' in name.lower():
            return [
                "College of Agricultural Economics & Extension",
                "College of Animal Science & Animal Production",
                "College of Crop & Soil Sciences",
                "College of Food Science & Technology",
                "College of Veterinary Medicine",
                "College of Physical & Applied Sciences"
            ]
        elif 'health' in name.lower() or 'medical' in name.lower():
            return [
                "Faculty of Basic Medical Sciences",
                "Faculty of Clinical Sciences",
                "Faculty of Nursing Sciences",
                "Faculty of Allied Health Sciences",
                "Faculty of Pharmacy",
                "Faculty of Dentistry"
            ]
        elif 'education' in name.lower():
            return [
                "Faculty of Educational Foundations",
                "Faculty of Science & STEM Education",
                "Faculty of Arts & Social Science Education",
                "Faculty of Vocational & Technical Education",
                "Faculty of Early Childhood & Special Education"
            ]
        else:
            return [
                "Faculty of Science",
                "Faculty of Engineering",
                "Faculty of Management Sciences",
                "Faculty of Social Sciences",
                "Faculty of Arts & Humanities",
                "Faculty of Law",
                "College of Medicine"
            ]
    elif 'polytechnic' in itype_lower:
        return [
            "School of Technology & Applied Sciences",
            "School of Engineering Technology",
            "School of Management & Business Studies",
            "School of Environmental Studies",
            "School of Communication & Information Technology"
        ]
    elif 'education' in itype_lower:
        return [
            "School of Education",
            "School of Sciences",
            "School of Vocational & Technical Education",
            "School of Arts & Social Sciences",
            "School of Early Childhood & Primary Education"
        ]
    elif 'nursing' in itype_lower:
        return [
            "Department of General Nursing Sciences",
            "Department of Basic Midwifery",
            "Department of Public Health & Community Nursing"
        ]
    elif 'health' in itype_lower:
        return [
            "School of Community Health Sciences",
            "School of Medical Laboratory Sciences",
            "School of Environmental Health Technology",
            "School of Health Information Management",
            "School of Pharmacy Technician Studies"
        ]
    elif 'agriculture' in itype_lower:
        return [
            "Department of Agricultural Technology",
            "Department of Animal Health & Production",
            "Department of Crop Production Technology",
            "Department of Fisheries & Aquaculture",
            "Department of Soil Science & Agro-Climatology"
        ]
    else:
        return [
            "School of Applied Sciences",
            "School of Vocational Studies",
            "School of Management Studies"
        ]

print("Helper functions ready.")
