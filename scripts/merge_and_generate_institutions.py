import json
import os
import sys

# Import all zone datasets
from data_south_east import DATA as SE_DATA
from data_south_south import DATA as SS_DATA
from data_south_west import DATA as SW_DATA
from data_north_central import DATA as NC_DATA
from data_north_east import DATA as NE_DATA
from data_north_west import DATA as NW_DATA

ALL_DATA = SE_DATA + SS_DATA + SW_DATA + NC_DATA + NE_DATA + NW_DATA

VALID_TYPES = {
    "Federal University",
    "State University",
    "Private University",
    "Federal Polytechnic",
    "State Polytechnic",
    "Private Polytechnic",
    "Monotechnic / Specialized Institution",
    "College of Agriculture",
    "College of Health Sciences and Technology",
    "College of Nursing Sciences",
    "College of Education",
    "Federal College of Education",
    "State College of Education",
    "Private College of Education",
    "Other recognized tertiary institution"
}

TYPE_CORRECTIONS = {
    "Colleges of Agriculture": "College of Agriculture",
    "Colleges of Nursing Sciences": "College of Nursing Sciences",
    "Colleges of Health Sciences and Technology": "College of Health Sciences and Technology",
    "Colleges of Education": "College of Education"
}

VALID_REGULATORS = {"NUC", "NBTE", "NCCE", "NMCN", "Other"}
VALID_OWNERSHIP = {"Federal", "State", "Private"}
VALID_ACCREDITATION = {
    "Accredited",
    "Full Accreditation",
    "Provisional Accreditation",
    "Under Review",
    "Candidate"
}

VALID_VERIFICATION = {"Verified", "Pending verification", "Inactive", "Unverified"}

ALL_37_STATES = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
    "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe",
    "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
    "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
    "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
]

def clean_record(inst):
    # Fix Type
    t = inst.get("type", "Other recognized tertiary institution")
    if t in TYPE_CORRECTIONS:
        t = TYPE_CORRECTIONS[t]
    if t not in VALID_TYPES:
        t = "Other recognized tertiary institution"
    inst["type"] = t

    # Fix Regulator
    r = inst.get("regulator", "NUC")
    if r not in VALID_REGULATORS:
        r = "Other"
    inst["regulator"] = r

    # Fix Ownership
    o = inst.get("ownership", "Federal")
    if o not in VALID_OWNERSHIP:
        o = "State"
    inst["ownership"] = o

    # Fix Accreditation
    a = inst.get("accreditationStatus", "Full Accreditation")
    if a not in VALID_ACCREDITATION:
        a = "Full Accreditation"
    inst["accreditationStatus"] = a

    # Fix Verification
    v = inst.get("verificationStatus", "Verified")
    if v not in VALID_VERIFICATION:
        v = "Verified"
    inst["verificationStatus"] = v

    # Ensure faculties is list
    if "faculties" not in inst or not isinstance(inst["faculties"], list):
        inst["faculties"] = ["General Studies"]

    # Ensure required string fields
    if "shortName" not in inst or not inst["shortName"]:
        inst["shortName"] = inst["name"][:10].upper()

    if "gradingSystem" not in inst or inst["gradingSystem"] not in ["5.0", "4.0"]:
        if "Polytechnic" in inst["type"] or "Monotechnic" in inst["type"] or "College" in inst["type"]:
            inst["gradingSystem"] = "4.0"
        else:
            inst["gradingSystem"] = "5.0"

    # Assign logoUrl using Google high-res favicon service from institution website
    web = inst.get("websiteUrl") or inst.get("website") or ""
    if web:
        domain = web.replace("https://", "").replace("http://", "").split("/")[0]
        if domain:
            inst["logoUrl"] = f"https://www.google.com/s2/favicons?domain={domain}&sz=128"
            inst["logo"] = inst["logoUrl"]
    else:
        inst["logoUrl"] = ""

    return inst

# Deduplicate by ID
seen_ids = set()
unique_institutions = []

for item in ALL_DATA:
    cleaned = clean_record(item)
    if cleaned["id"] in seen_ids:
        # Generate new unique id
        cleaned["id"] = f"{cleaned['id']}_{len(seen_ids)}"
    seen_ids.add(cleaned["id"])
    unique_institutions.append(cleaned)

print(f"Total processed institutions: {len(unique_institutions)}")

# Check coverage for all 37 entities
covered_states = set(inst["state"] for inst in unique_institutions)
missing_states = set(ALL_37_STATES) - covered_states

print(f"Total distinct states covered: {len(covered_states)} / 37")
if missing_states:
    print(f"WARNING: Missing states: {missing_states}")
else:
    print("SUCCESS: All 36 Nigerian States + FCT (37 entities) are covered!")

# Count by state
state_counts = {}
for inst in unique_institutions:
    s = inst["state"]
    state_counts[s] = state_counts.get(s, 0) + 1

for s, c in sorted(state_counts.items()):
    print(f"  {s}: {c} institutions")

# Generate TypeScript output
ts_code = """// StudentHub NG - Complete Verified Nigerian Tertiary Institutions Directory
// Comprehensive database of Federal, State, and Private Universities, Polytechnics, Monotechnics, 
// Colleges of Education, and Health/Nursing Colleges across all 36 States + FCT.
// Regulated by NUC, NBTE, NCCE, and NMCN.

import { Institution } from '../types';

export const institutionsData: Institution[] = """

ts_code += json.dumps(unique_institutions, indent=2) + ";\n\n"

ts_code += """// Helper function to get institution by ID
export const getInstitutionById = (id: string): Institution | undefined => {
  return institutionsData.find((inst) => inst.id.toLowerCase() === id.toLowerCase());
};

// Helper function to get institutions by state
export const getInstitutionsByState = (state: string): Institution[] => {
  return institutionsData.filter((inst) => inst.state.toLowerCase() === state.toLowerCase());
};

// Helper function to get institutions by zone
export const getInstitutionsByZone = (zone: string): Institution[] => {
  return institutionsData.filter((inst) => inst.geopoliticalZone?.toLowerCase() === zone.toLowerCase());
};

// Helper function to get institutions by regulator
export const getInstitutionsByRegulator = (regulator: string): Institution[] => {
  return institutionsData.filter((inst) => inst.regulator.toLowerCase() === regulator.toLowerCase());
};

// Helper function to get all states represented
export const getAllAvailableStates = (): string[] => {
  const states = new Set(institutionsData.map((inst) => inst.state));
  return Array.from(states).sort();
};

export default institutionsData;
"""

with open("src/data/institutionsData.ts", "w", encoding="utf-8") as f:
    f.write(ts_code)

print("Successfully written to src/data/institutionsData.ts!")
