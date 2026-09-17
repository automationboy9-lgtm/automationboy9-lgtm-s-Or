import json
import re

print("Starting generation of src/data/academicHierarchyResolver.ts...")

# Read base templates
from generate_hierarchy_resolver import TEMPLATES

# Add the remaining templates to TEMPLATES
additional_templates = {
    "basic_medical_sciences": [
        {"name": "Human Anatomy", "code": "ANA", "programmes": [{"name": "B.Sc Human Anatomy", "code": "BSC-ANA", "degreeType": "B.Sc", "durationYears": 4, "levels": ["100L", "200L", "300L", "400L"]}], "courseCodePrefixes": ["ANA", "PHS", "BCH", "BIO", "GST"]},
        {"name": "Human Physiology", "code": "PHS", "programmes": [{"name": "B.Sc Human Physiology", "code": "BSC-PHS", "degreeType": "B.Sc", "durationYears": 4, "levels": ["100L", "200L", "300L", "400L"]}], "courseCodePrefixes": ["PHS", "ANA", "BCH", "BIO", "GST"]},
        {"name": "Medical Biochemistry", "code": "MBC", "programmes": [{"name": "B.Sc Medical Biochemistry", "code": "BSC-MBC", "degreeType": "B.Sc", "durationYears": 4, "levels": ["100L", "200L", "300L", "400L"]}], "courseCodePrefixes": ["BCH", "CHM", "BIO", "GST"]},
        {"name": "Pharmacology and Therapeutics", "code": "PHT", "programmes": [{"name": "B.Sc Pharmacology", "code": "BSC-PHT", "degreeType": "B.Sc", "durationYears": 4, "levels": ["100L", "200L", "300L", "400L"]}], "courseCodePrefixes": ["PHA", "PHS", "BCH", "GST"]}
    ],
    "clinical_sciences": [
        {"name": "Internal Medicine", "code": "MED", "programmes": [{"name": "MBBS Medicine & Surgery", "code": "MBBS", "degreeType": "MBBS", "durationYears": 6, "levels": ["100L", "200L", "300L", "400L", "500L", "600L"]}], "courseCodePrefixes": ["MED", "ANA", "PHS", "PTH", "GST"]},
        {"name": "Surgery", "code": "SUR", "programmes": [{"name": "MBBS Surgery", "code": "MBBS-SUR", "degreeType": "MBBS", "durationYears": 6, "levels": ["100L", "200L", "300L", "400L", "500L", "600L"]}], "courseCodePrefixes": ["SUR", "ANA", "GST"]},
        {"name": "Paediatrics and Child Health", "code": "PAE", "programmes": [{"name": "MBBS Paediatrics", "code": "MBBS-PAE", "degreeType": "MBBS", "durationYears": 6, "levels": ["100L", "200L", "300L", "400L", "500L", "600L"]}], "courseCodePrefixes": ["PAE", "MED", "GST"]},
        {"name": "Obstetrics and Gynaecology", "code": "OBG", "programmes": [{"name": "MBBS Obstetrics & Gynaecology", "code": "MBBS-OBG", "degreeType": "MBBS", "durationYears": 6, "levels": ["100L", "200L", "300L", "400L", "500L", "600L"]}], "courseCodePrefixes": ["OBG", "SUR", "GST"]},
        {"name": "Community Medicine and Primary Care", "code": "COM", "programmes": [{"name": "MBBS Community Medicine", "code": "MBBS-COM", "degreeType": "MBBS", "durationYears": 6, "levels": ["100L", "200L", "300L", "400L", "500L", "600L"]}], "courseCodePrefixes": ["COM", "MED", "GST"]},
        {"name": "Anaesthesia and Intensive Care", "code": "ANS", "programmes": [{"name": "MBBS Anaesthesia", "code": "MBBS-ANS", "degreeType": "MBBS", "durationYears": 6, "levels": ["100L", "200L", "300L", "400L", "500L", "600L"]}], "courseCodePrefixes": ["ANS", "PHA", "GST"]},
        {"name": "Radiology and Radiodiagnosis", "code": "RAD", "programmes": [{"name": "MBBS Radiology", "code": "MBBS-RAD", "degreeType": "MBBS", "durationYears": 6, "levels": ["100L", "200L", "300L", "400L", "500L", "600L"]}], "courseCodePrefixes": ["RAD", "PHY", "GST"]},
        {"name": "Psychiatry and Behavioural Medicine", "code": "PSY", "programmes": [{"name": "MBBS Psychiatry", "code": "MBBS-PSY", "degreeType": "MBBS", "durationYears": 6, "levels": ["100L", "200L", "300L", "400L", "500L", "600L"]}], "courseCodePrefixes": ["PSY", "MED", "GST"]},
        {"name": "Ophthalmology", "code": "OPH", "programmes": [{"name": "MBBS Ophthalmology", "code": "MBBS-OPH", "degreeType": "MBBS", "durationYears": 6, "levels": ["100L", "200L", "300L", "400L", "500L", "600L"]}], "courseCodePrefixes": ["OPH", "SUR", "GST"]}
    ],
    "allied_health": [
        {"name": "Nursing Science", "code": "NUR", "programmes": [{"name": "B.N.Sc Nursing Science", "code": "BNSC-NUR", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["NUR", "ANA", "PHS", "BIO", "GST"]},
        {"name": "Medical Laboratory Science", "code": "MLS", "programmes": [{"name": "B.MLS Medical Laboratory Science", "code": "BMLS", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["MLS", "BCH", "MCB", "BIO", "GST"]},
        {"name": "Physiotherapy & Medical Rehabilitation", "code": "PST", "programmes": [{"name": "B.MR / B.PT Physiotherapy", "code": "BPT", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["PST", "ANA", "PHS", "PHY", "GST"]},
        {"name": "Radiography and Radiation Science", "code": "RAD", "programmes": [{"name": "B.Sc Radiography", "code": "BSC-RAD", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["RAD", "PHY", "ANA", "GST"]},
        {"name": "Optometry", "code": "OPT", "programmes": [{"name": "Doctor of Optometry (O.D)", "code": "OD-OPT", "degreeType": "MBBS", "durationYears": 6, "levels": ["100L", "200L", "300L", "400L", "500L", "600L"]}], "courseCodePrefixes": ["OPT", "PHY", "BIO", "GST"]},
        {"name": "Prosthetics and Orthotics", "code": "PNO", "programmes": [{"name": "B.Tech Prosthetics and Orthotics", "code": "BTECH-PNO", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["PNO", "ANA", "ENG", "GST"]},
        {"name": "Biomedical Technology", "code": "BMT", "programmes": [{"name": "B.Tech Biomedical Technology", "code": "BTECH-BMT", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["ENG", "EEE", "PHY", "GST"]}
    ],
    "public_health": [
        {"name": "Epidemiology and Medical Statistics", "code": "EMS", "programmes": [{"name": "B.Sc Public Health", "code": "BSC-PH", "degreeType": "B.Sc", "durationYears": 4, "levels": ["100L", "200L", "300L", "400L"]}], "courseCodePrefixes": ["COM", "STA", "GST"]},
        {"name": "Health Promotion and Education", "code": "HPE", "programmes": [{"name": "B.Sc Health Promotion & Education", "code": "BSC-HPE", "degreeType": "B.Sc", "durationYears": 4, "levels": ["100L", "200L", "300L", "400L"]}], "courseCodePrefixes": ["COM", "EDU", "GST"]},
        {"name": "Environmental Health Sciences", "code": "EHS", "programmes": [{"name": "B.Sc Environmental Health", "code": "BSC-EHS", "degreeType": "B.Sc", "durationYears": 4, "levels": ["100L", "200L", "300L", "400L"]}], "courseCodePrefixes": ["ENV", "BIO", "GST"]},
        {"name": "Human Nutrition and Dietetics", "code": "HND", "programmes": [{"name": "B.Sc Human Nutrition & Dietetics", "code": "BSC-HND", "degreeType": "B.Sc", "durationYears": 4, "levels": ["100L", "200L", "300L", "400L"]}], "courseCodePrefixes": ["BCH", "BIO", "CHM", "GST"]},
        {"name": "Health Policy and Management", "code": "HPM", "programmes": [{"name": "B.Sc Health Policy & Management", "code": "BSC-HPM", "degreeType": "B.Sc", "durationYears": 4, "levels": ["100L", "200L", "300L", "400L"]}], "courseCodePrefixes": ["COM", "PAD", "GST"]}
    ],
    "renewable_natural_resources": [
        {"name": "Forest Resources Management", "code": "FRM", "programmes": [{"name": "B.Sc Forest Resources Management", "code": "BSC-FRM", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["FOR", "BIO", "GST"]},
        {"name": "Wildlife and Ecotourism Management", "code": "WEM", "programmes": [{"name": "B.Sc Wildlife & Ecotourism", "code": "BSC-WEM", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["WEM", "BIO", "GST"]},
        {"name": "Aquaculture and Fisheries Management", "code": "AFM", "programmes": [{"name": "B.Sc Aquaculture & Fisheries", "code": "BSC-AFM", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["FIS", "BIO", "GST"]},
        {"name": "Wood and Paper Technology", "code": "WPT", "programmes": [{"name": "B.Sc Wood & Paper Technology", "code": "BSC-WPT", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["FOR", "CHM", "GST"]},
        {"name": "Social and Environmental Forestry", "code": "SEF", "programmes": [{"name": "B.Sc Social & Environmental Forestry", "code": "BSC-SEF", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["FOR", "ENV", "GST"]}
    ],
    "animal_science_specialized": [
        {"name": "Animal Breeding and Genetics", "code": "ABG", "programmes": [{"name": "B.Agric Animal Breeding & Genetics", "code": "BAGR-ABG", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["ANS", "BIO", "GST"]},
        {"name": "Animal Nutrition", "code": "ANN", "programmes": [{"name": "B.Agric Animal Nutrition", "code": "BAGR-ANN", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["ANS", "BCH", "GST"]},
        {"name": "Animal Physiology", "code": "ANP", "programmes": [{"name": "B.Agric Animal Physiology", "code": "BAGR-ANP", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["ANS", "PHS", "GST"]},
        {"name": "Animal Production and Health", "code": "APH", "programmes": [{"name": "B.Agric Animal Production & Health", "code": "BAGR-APH", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["ANS", "VET", "GST"]},
        {"name": "Pasture and Range Management", "code": "PRM", "programmes": [{"name": "B.Agric Pasture & Range Management", "code": "BAGR-PRM", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["ANS", "AGR", "GST"]}
    ],
    "plant_crop_specialized": [
        {"name": "Crop Protection", "code": "CPP", "programmes": [{"name": "B.Agric Crop Protection", "code": "BAGR-CPP", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["CRP", "BIO", "CHM", "GST"]},
        {"name": "Horticulture", "code": "HRT", "programmes": [{"name": "B.Agric Horticulture", "code": "BAGR-HRT", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["CRP", "AGR", "GST"]},
        {"name": "Plant Breeding and Seed Technology", "code": "PBST", "programmes": [{"name": "B.Agric Plant Breeding & Seed Tech", "code": "BAGR-PBST", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["CRP", "BIO", "GST"]},
        {"name": "Plant Physiology and Crop Production", "code": "PPCP", "programmes": [{"name": "B.Agric Plant Physiology & Crop Prod", "code": "BAGR-PPCP", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["CRP", "BIO", "GST"]},
        {"name": "Soil Science and Land Management", "code": "SSLM", "programmes": [{"name": "B.Agric Soil Science & Land Management", "code": "BAGR-SSLM", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["SOS", "CHM", "GST"]}
    ],
    "food_human_ecology": [
        {"name": "Food Science and Technology", "code": "FST", "programmes": [{"name": "B.Sc Food Science & Technology", "code": "BSC-FST", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["FST", "CHM", "MCB", "GST"]},
        {"name": "Home Science and Management", "code": "HSM", "programmes": [{"name": "B.Sc Home Science & Management", "code": "BSC-HSM", "degreeType": "B.Sc", "durationYears": 4, "levels": ["100L", "200L", "300L", "400L"]}], "courseCodePrefixes": ["HSM", "ECO", "GST"]},
        {"name": "Hospitality and Tourism", "code": "HTM", "programmes": [{"name": "B.Sc Hospitality & Tourism", "code": "BSC-HTM", "degreeType": "B.Sc", "durationYears": 4, "levels": ["100L", "200L", "300L", "400L"]}], "courseCodePrefixes": ["HTM", "BUS", "GST"]},
        {"name": "Nutrition and Dietetics", "code": "NTD", "programmes": [{"name": "B.Sc Nutrition and Dietetics", "code": "BSC-NTD", "degreeType": "B.Sc", "durationYears": 4, "levels": ["100L", "200L", "300L", "400L"]}], "courseCodePrefixes": ["BCH", "BIO", "CHM", "GST"]}
    ],
    "agric_mgt_rural_dev": [
        {"name": "Agricultural Economics and Farm Management", "code": "AEFM", "programmes": [{"name": "B.Agric Agricultural Economics", "code": "BAGR-AEFM", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["AGE", "ECO", "GST"]},
        {"name": "Agricultural Extension and Rural Development", "code": "AERD", "programmes": [{"name": "B.Agric Agricultural Extension", "code": "BAGR-AERD", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["AGR", "SOC", "GST"]},
        {"name": "Agricultural Administration", "code": "AGA", "programmes": [{"name": "B.Agric Agricultural Administration", "code": "BAGR-AGA", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["PAD", "AGR", "GST"]},
        {"name": "Communication and General Studies", "code": "CGNS", "programmes": [{"name": "B.Sc Agricultural Communication", "code": "BSC-AGC", "degreeType": "B.Sc", "durationYears": 4, "levels": ["100L", "200L", "300L", "400L"]}], "courseCodePrefixes": ["MAS", "ENG", "GST"]}
    ],
    "earth_mineral_sciences": [
        {"name": "Applied Geology", "code": "AGL", "programmes": [{"name": "B.Tech Applied Geology", "code": "BTECH-AGL", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["GLY", "PHY", "CHM", "GST"]},
        {"name": "Applied Geophysics", "code": "AGP", "programmes": [{"name": "B.Tech Applied Geophysics", "code": "BTECH-AGP", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["GLY", "PHY", "MTH", "GST"]},
        {"name": "Meteorology and Climate Science", "code": "MCS", "programmes": [{"name": "B.Tech Meteorology", "code": "BTECH-MCS", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["PHY", "MTH", "GST"]},
        {"name": "Remote Sensing and Geospatial Information Science", "code": "RSG", "programmes": [{"name": "B.Tech Remote Sensing & GIS", "code": "BTECH-RSG", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["SVG", "CSC", "GST"]},
        {"name": "Marine Science and Technology", "code": "MST", "programmes": [{"name": "B.Tech Marine Science", "code": "BTECH-MST", "degreeType": "B.Sc", "durationYears": 5, "levels": ["100L", "200L", "300L", "400L", "500L"]}], "courseCodePrefixes": ["BIO", "CHM", "GST"]}
    ]
}

TEMPLATES.update(additional_templates)

print(f"Total templates in TEMPLATES: {len(TEMPLATES)}")

# Export as JSON string for inclusion in TS
templates_json = json.dumps(TEMPLATES, indent=2)

ts_content = f'''import {{ 
  Institution, 
  FacultyRecord, 
  DepartmentRecord, 
  ProgrammeRecord, 
  CourseRecord,
  DegreeType 
}} from '../types';
import {{ COMPREHENSIVE_COURSES }} from './allCoursesData';

export interface DepartmentTemplate {{
  name: string;
  code: string;
  programmes: {{
    name: string;
    code: string;
    degreeType: DegreeType;
    durationYears: number;
    levels: string[];
  }}[];
  courseCodePrefixes: string[];
}}

export const FACULTY_DEPARTMENT_TEMPLATES: Record<string, DepartmentTemplate[]> = {templates_json};

// Institutional statutory overrides for flagship institutions
export const FLAGSHIP_INSTITUTION_DEPARTMENTS: Record<string, Record<string, DepartmentTemplate[]>> = {{
  'ui': {{
    'Renewable Natural Resources': FACULTY_DEPARTMENT_TEMPLATES.renewable_natural_resources,
    'Public Health': FACULTY_DEPARTMENT_TEMPLATES.public_health,
    'Basic Medical Sciences': FACULTY_DEPARTMENT_TEMPLATES.basic_medical_sciences,
    'Clinical Sciences': FACULTY_DEPARTMENT_TEMPLATES.clinical_sciences,
    'Dentistry': FACULTY_DEPARTMENT_TEMPLATES.dentistry,
    'Pharmacy': FACULTY_DEPARTMENT_TEMPLATES.pharmacy,
    'Veterinary Medicine': FACULTY_DEPARTMENT_TEMPLATES.veterinary
  }},
  'unilag': {{
    'Basic Medical Sciences': FACULTY_DEPARTMENT_TEMPLATES.basic_medical_sciences,
    'Clinical Sciences': FACULTY_DEPARTMENT_TEMPLATES.clinical_sciences,
    'Dental Sciences': FACULTY_DEPARTMENT_TEMPLATES.dentistry,
    'Pharmacy': FACULTY_DEPARTMENT_TEMPLATES.pharmacy
  }},
  'oau': {{
    'Basic Medical Sciences': FACULTY_DEPARTMENT_TEMPLATES.basic_medical_sciences,
    'Clinical Sciences': FACULTY_DEPARTMENT_TEMPLATES.clinical_sciences,
    'Dentistry': FACULTY_DEPARTMENT_TEMPLATES.dentistry,
    'Pharmacy': FACULTY_DEPARTMENT_TEMPLATES.pharmacy
  }},
  'abu': {{
    'Basic Medical Sciences': FACULTY_DEPARTMENT_TEMPLATES.basic_medical_sciences,
    'Clinical Sciences': FACULTY_DEPARTMENT_TEMPLATES.clinical_sciences,
    'Dental Surgery': FACULTY_DEPARTMENT_TEMPLATES.dentistry,
    'Pharmaceutical Sciences': FACULTY_DEPARTMENT_TEMPLATES.pharmacy,
    'Veterinary Medicine': FACULTY_DEPARTMENT_TEMPLATES.veterinary
  }},
  'funaab': {{
    'Animal Science': FACULTY_DEPARTMENT_TEMPLATES.animal_science_specialized,
    'Plant Science': FACULTY_DEPARTMENT_TEMPLATES.plant_crop_specialized,
    'Food Science': FACULTY_DEPARTMENT_TEMPLATES.food_human_ecology,
    'Agricultural Management': FACULTY_DEPARTMENT_TEMPLATES.agric_mgt_rural_dev,
    'Veterinary Medicine': FACULTY_DEPARTMENT_TEMPLATES.veterinary
  }},
  'futa': {{
    'Earth and Mineral': FACULTY_DEPARTMENT_TEMPLATES.earth_mineral_sciences,
    'Computing': FACULTY_DEPARTMENT_TEMPLATES.computing_informatics,
    'Engineering': FACULTY_DEPARTMENT_TEMPLATES.engineering_university
  }},
  'ncat_zaria': {{
    'Flying School': FACULTY_DEPARTMENT_TEMPLATES.aviation_pilot,
    'Air Traffic': FACULTY_DEPARTMENT_TEMPLATES.aviation_atc,
    'Aircraft Maintenance': FACULTY_DEPARTMENT_TEMPLATES.aviation_maintenance,
    'Aeronautical Telecommunications': FACULTY_DEPARTMENT_TEMPLATES.aviation_telecom,
    'Aviation Management': FACULTY_DEPARTMENT_TEMPLATES.aviation_management
  }},
  'man_oron': {{
    'Nautical Studies': FACULTY_DEPARTMENT_TEMPLATES.maritime_nautical,
    'Marine Engineering': FACULTY_DEPARTMENT_TEMPLATES.maritime_engineering,
    'Maritime Transport': FACULTY_DEPARTMENT_TEMPLATES.maritime_transport
  }},
  'pti_effurun': {{
    'Offshore Studies': FACULTY_DEPARTMENT_TEMPLATES.petroleum_offshore,
    'Petroleum Technology': FACULTY_DEPARTMENT_TEMPLATES.petroleum_processing,
    'Industrial Safety': FACULTY_DEPARTMENT_TEMPLATES.industrial_safety
  }}
}};

export function matchFacultyToTemplate(
  facultyName: string, 
  instType: string = 'University'
): DepartmentTemplate[] {{
  const name = facultyName.toLowerCase().trim();
  const isPoly = instType.toLowerCase().includes('poly') || 
                 instType.toLowerCase().includes('monotechnic') || 
                 instType.toLowerCase().includes('technology');
  const isCOE = instType.toLowerCase().includes('education') || 
                instType.toLowerCase().includes('coe') || 
                instType.toLowerCase().includes('teachers');

  // 1. Aviation
  if (name.includes('flying') || name.includes('pilot')) return FACULTY_DEPARTMENT_TEMPLATES.aviation_pilot;
  if (name.includes('air traffic') || name.includes('ats') || name.includes('communications school')) return FACULTY_DEPARTMENT_TEMPLATES.aviation_atc;
  if (name.includes('aircraft maintenance') || name.includes('airframe') || name.includes('air engineering')) return FACULTY_DEPARTMENT_TEMPLATES.aviation_maintenance;
  if (name.includes('aeronautical telecommunications') || name.includes('aeronautical telecom')) return FACULTY_DEPARTMENT_TEMPLATES.aviation_telecom;
  if (name.includes('aviation management')) return FACULTY_DEPARTMENT_TEMPLATES.aviation_management;

  // 2. Maritime
  if (name.includes('nautical')) return FACULTY_DEPARTMENT_TEMPLATES.maritime_nautical;
  if (name.includes('marine engineering') || name.includes('maritime engineering')) return FACULTY_DEPARTMENT_TEMPLATES.maritime_engineering;
  if (name.includes('maritime transport') || name.includes('maritime and offshore') || name.includes('maritime')) return FACULTY_DEPARTMENT_TEMPLATES.maritime_transport;

  // 3. Petroleum & Industrial Safety
  if (name.includes('petroleum') || name.includes('gas processing')) return FACULTY_DEPARTMENT_TEMPLATES.petroleum_offshore;
  if (name.includes('industrial safety')) return FACULTY_DEPARTMENT_TEMPLATES.industrial_safety;

  // 4. Leather & Survey Monotechnics
  if (name.includes('leather') || name.includes('footwear')) return FACULTY_DEPARTMENT_TEMPLATES.leather_technology;
  if (name.includes('survey') || name.includes('geomatics')) return FACULTY_DEPARTMENT_TEMPLATES.surveying_geoinformatics;

  // 5. Nursing Specialties
  if (name.includes('critical care')) return FACULTY_DEPARTMENT_TEMPLATES.nursing_critical_care;
  if (name.includes('perioperative')) return FACULTY_DEPARTMENT_TEMPLATES.nursing_perioperative;
  if (name.includes('paediatric') || name.includes('pediatric')) return FACULTY_DEPARTMENT_TEMPLATES.nursing_paediatric;
  if (name.includes('psychiatric') || name.includes('mental health')) return FACULTY_DEPARTMENT_TEMPLATES.nursing_psychiatric;
  if (name.includes('public health nursing')) return FACULTY_DEPARTMENT_TEMPLATES.nursing_public_health;
  if (name.includes('midwifery')) return FACULTY_DEPARTMENT_TEMPLATES.nursing_midwifery;
  if (name.includes('nursing')) return FACULTY_DEPARTMENT_TEMPLATES.nursing_general;

  // 6. Colleges of Health Technology
  if (name.includes('community health')) return FACULTY_DEPARTMENT_TEMPLATES.health_tech_community;
  if (name.includes('health information') || name.includes('medical records')) return FACULTY_DEPARTMENT_TEMPLATES.health_tech_records;
  if (name.includes('environmental health')) return FACULTY_DEPARTMENT_TEMPLATES.health_tech_environmental;
  if (name.includes('dental health')) return FACULTY_DEPARTMENT_TEMPLATES.health_tech_dental;
  if (name.includes('medical laboratory technology')) return FACULTY_DEPARTMENT_TEMPLATES.health_tech_lab;
  if (name.includes('pharmacy technician')) return FACULTY_DEPARTMENT_TEMPLATES.health_tech_pharmacy;

  // 7. Monotechnic Agriculture
  if (name.includes('animal health and production') || name.includes('veterinary laboratory')) return FACULTY_DEPARTMENT_TEMPLATES.animal_health_monotechnic;
  if (name.includes('horticultural')) return FACULTY_DEPARTMENT_TEMPLATES.horticulture_monotechnic;
  if (name.includes('fisheries technology') || name.includes('fisheries and aquaculture technology')) return FACULTY_DEPARTMENT_TEMPLATES.fisheries_monotechnic;
  if (name.includes('forestry technology') || name.includes('wood and paper')) return FACULTY_DEPARTMENT_TEMPLATES.forestry_monotechnic;
  if (name.includes('agricultural technology') || name.includes('agricultural and bio-environmental')) return FACULTY_DEPARTMENT_TEMPLATES.agric_tech_monotechnic;

  // 8. Specialized University Faculties
  if (name.includes('dental') || name.includes('dentistry')) return FACULTY_DEPARTMENT_TEMPLATES.dentistry;
  if (name.includes('pharmacy') || name.includes('pharmaceutical')) return FACULTY_DEPARTMENT_TEMPLATES.pharmacy;
  if (name.includes('veterinary')) return FACULTY_DEPARTMENT_TEMPLATES.veterinary;
  if (name.includes('basic clinical')) return FACULTY_DEPARTMENT_TEMPLATES.clinical_sciences;
  if (name.includes('basic medical') || name.includes('biomedical')) return FACULTY_DEPARTMENT_TEMPLATES.basic_medical_sciences;
  if (name.includes('clinical') || name.includes('medicine and surgery') || name.includes('college of medicine') || name.includes('lasucom') || name.includes('benjamin')) return FACULTY_DEPARTMENT_TEMPLATES.clinical_sciences;
  if (name.includes('public health')) return FACULTY_DEPARTMENT_TEMPLATES.public_health;
  if (name.includes('renewable') || name.includes('natural resources') || name.includes('forestry')) return FACULTY_DEPARTMENT_TEMPLATES.renewable_natural_resources;
  if (name.includes('animal science') || name.includes('livestock')) return FACULTY_DEPARTMENT_TEMPLATES.animal_science_specialized;
  if (name.includes('plant science') || name.includes('crop') || name.includes('agronomy')) return FACULTY_DEPARTMENT_TEMPLATES.plant_crop_specialized;
  if (name.includes('food science and human ecology') || name.includes('food and consumer')) return FACULTY_DEPARTMENT_TEMPLATES.food_human_ecology;
  if (name.includes('agricultural management') || name.includes('rural development') || name.includes('agricultural economics')) return FACULTY_DEPARTMENT_TEMPLATES.agric_mgt_rural_dev;
  if (name.includes('earth and mineral') || name.includes('mineral') || name.includes('earth and environmental')) return FACULTY_DEPARTMENT_TEMPLATES.earth_mineral_sciences;
  if (name.includes('allied health') || name.includes('medical rehabilitation') || name.includes('health sciences') || name.includes('medical sciences')) return FACULTY_DEPARTMENT_TEMPLATES.allied_health;

  // 9. Colleges of Education
  if (isCOE || name.includes('education') || name.includes('teaching')) {{
    if (name.includes('language') || name.includes('english') || name.includes('french') || name.includes('arabic')) return FACULTY_DEPARTMENT_TEMPLATES.coe_languages;
    if (name.includes('early childhood') || name.includes('primary')) return FACULTY_DEPARTMENT_TEMPLATES.coe_early_childhood;
    if (name.includes('technical')) return FACULTY_DEPARTMENT_TEMPLATES.coe_technical;
    if (name.includes('vocational') || name.includes('home economics')) return FACULTY_DEPARTMENT_TEMPLATES.coe_vocational;
    if (name.includes('science')) return FACULTY_DEPARTMENT_TEMPLATES.coe_sciences;
    if (name.includes('art') || name.includes('social') || name.includes('humanities')) return FACULTY_DEPARTMENT_TEMPLATES.coe_arts_social;
    if (name.includes('adult') || name.includes('non-formal') || name.includes('special')) return FACULTY_DEPARTMENT_TEMPLATES.coe_adult_nonformal;
    return FACULTY_DEPARTMENT_TEMPLATES.coe_education;
  }}

  // 10. Polytechnics
  if (isPoly) {{
    if (name.includes('art') || name.includes('design') || name.includes('printing')) return FACULTY_DEPARTMENT_TEMPLATES.poly_art_design;
    if (name.includes('environmental') || name.includes('built')) return FACULTY_DEPARTMENT_TEMPLATES.poly_environmental;
    if (name.includes('engineering') || (name.includes('technology') && !name.includes('information') && !name.includes('applied'))) return FACULTY_DEPARTMENT_TEMPLATES.poly_engineering;
    if (name.includes('information') || name.includes('computing') || name.includes('computer')) return FACULTY_DEPARTMENT_TEMPLATES.computing_informatics;
    if (name.includes('applied science') || name.includes('applied and natural') || name.includes('science and technology') || name.includes('applied')) return FACULTY_DEPARTMENT_TEMPLATES.poly_technology;
    if (name.includes('business') || name.includes('management') || name.includes('financial') || name.includes('account')) return FACULTY_DEPARTMENT_TEMPLATES.poly_management;
    if (name.includes('liberal') || name.includes('general') || name.includes('communication')) return FACULTY_DEPARTMENT_TEMPLATES.poly_liberal;
  }}

  // 11. Universities Mainstream
  if (name.includes('computing') || name.includes('computer') || name.includes('information technology') || name.includes('informatics')) return FACULTY_DEPARTMENT_TEMPLATES.computing_informatics;
  if (name.includes('engineering') || name.includes('aerospace')) return FACULTY_DEPARTMENT_TEMPLATES.engineering_university;
  if (name.includes('environmental') || name.includes('architecture') || name.includes('built')) return FACULTY_DEPARTMENT_TEMPLATES.environmental_sciences;
  if (name.includes('agriculture') || name.includes('agric')) return FACULTY_DEPARTMENT_TEMPLATES.agriculture_comprehensive;
  if (name.includes('law') || name.includes('legal') || name.includes('security')) return FACULTY_DEPARTMENT_TEMPLATES.law;
  if (name.includes('management') || name.includes('business') || name.includes('administration') || name.includes('financial') || name.includes('leadership')) return FACULTY_DEPARTMENT_TEMPLATES.management_sciences;
  if (name.includes('social') || name.includes('economic') || name.includes('sociology')) return FACULTY_DEPARTMENT_TEMPLATES.social_sciences;
  if (name.includes('biological') || name.includes('life') || name.includes('bio')) return FACULTY_DEPARTMENT_TEMPLATES.biological_life_sciences;
  if (name.includes('physical')) return FACULTY_DEPARTMENT_TEMPLATES.physical_sciences;
  if (name.includes('science') || name.includes('pure and applied') || name.includes('natural')) return FACULTY_DEPARTMENT_TEMPLATES.physical_sciences;

  return FACULTY_DEPARTMENT_TEMPLATES.arts_humanities;
}}

// 1. Resolve Faculties for ANY Institution
export function resolveFacultiesForInstitution(inst: Institution): FacultyRecord[] {{
  if (inst.faculties && inst.faculties.length > 0) {{
    return inst.faculties.map((facName, index) => {{
      const slug = facName.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 24);
      return {{
        id: `fac_${{inst.id}}_${{slug}}_${{index}}`,
        name: facName,
        code: facName.split(' ').map(w => w[0]).filter(Boolean).join('').substring(0, 4).toUpperCase() || 'FAC',
        institutionId: inst.id,
        institutionName: inst.name,
        description: `Accredited division for academic programmes in ${{facName}} at ${{inst.name}}`
      }};
    }});
  }}

  // Default fallback if no faculties specified
  return [
    {{
      id: `fac_${{inst.id}}_gen`,
      name: 'Faculty of Academic Studies',
      code: 'FAS',
      institutionId: inst.id,
      institutionName: inst.name,
      description: `Academic programmes at ${{inst.name}}`
    }}
  ];
}}

// 2. Resolve Departments for ANY Faculty in ANY Institution
export function resolveDepartmentsForFaculty(
  fac: FacultyRecord, 
  inst: Institution
): DepartmentRecord[] {{
  // Check flagship statutory overrides
  const instOverrides = FLAGSHIP_INSTITUTION_DEPARTMENTS[inst.id.toLowerCase()];
  if (instOverrides) {{
    for (const [key, templates] of Object.entries(instOverrides)) {{
      if (fac.name.toLowerCase().includes(key.toLowerCase())) {{
        return templates.map((tmpl, idx) => ({{
          id: `dept_${{inst.id}}_${{fac.id}}_${{tmpl.code.toLowerCase()}}_${{idx}}`,
          name: tmpl.name.startsWith('Department of ') ? tmpl.name : `Department of ${{tmpl.name}}`,
          code: tmpl.code,
          facultyId: fac.id,
          facultyName: fac.name,
          institutionId: inst.id,
          institutionName: inst.name
        }}));
      }}
    }}
  }}

  // Standard template resolution
  const templates = matchFacultyToTemplate(fac.name, inst.type);
  return templates.map((tmpl, idx) => ({{
    id: `dept_${{inst.id}}_${{fac.id}}_${{tmpl.code.toLowerCase()}}_${{idx}}`,
    name: tmpl.name.startsWith('Department of ') ? tmpl.name : `Department of ${{tmpl.name}}`,
    code: tmpl.code,
    facultyId: fac.id,
    facultyName: fac.name,
    institutionId: inst.id,
    institutionName: inst.name
  }}));
}}

// Helper: Resolve all departments across all faculties of an institution
export function resolveAllDepartmentsForInstitution(inst: Institution): DepartmentRecord[] {{
  const faculties = resolveFacultiesForInstitution(inst);
  const allDepts: DepartmentRecord[] = [];
  faculties.forEach(fac => {{
    const depts = resolveDepartmentsForFaculty(fac, inst);
    allDepts.push(...depts);
  }});
  return allDepts;
}}

// 3. Resolve Programmes for Department
export function resolveProgrammesForDepartment(
  dept: DepartmentRecord, 
  inst: Institution
): ProgrammeRecord[] {{
  const templates = matchFacultyToTemplate(dept.facultyName, inst.type);
  const matchedTmpl = templates.find(t => 
    t.name.toLowerCase() === dept.name.toLowerCase() || 
    t.code.toLowerCase() === dept.code.toLowerCase() ||
    dept.name.toLowerCase().includes(t.name.toLowerCase()) ||
    t.name.toLowerCase().includes(dept.name.toLowerCase())
  );

  if (matchedTmpl && matchedTmpl.programmes && matchedTmpl.programmes.length > 0) {{
    return matchedTmpl.programmes.map(p => ({{
      id: `prog_${{dept.id}}_${{p.code.toLowerCase()}}`,
      name: p.name,
      code: p.code,
      degreeType: p.degreeType,
      departmentId: dept.id,
      departmentName: dept.name,
      facultyId: dept.facultyId,
      facultyName: dept.facultyName,
      institutionId: inst.id,
      institutionName: inst.name,
      durationYears: p.durationYears,
      levels: p.levels
    }}));
  }}

  const isPoly = inst.type.toLowerCase().includes('poly') || inst.type.toLowerCase().includes('technology');
  const isCOE = inst.type.toLowerCase().includes('education') || inst.type.toLowerCase().includes('coe');

  if (isPoly) {{
    return [
      {{
        id: `prog_${{dept.id}}_nd`,
        name: `ND ${{dept.name}}`,
        code: `ND-${{dept.code}}`,
        degreeType: 'ND',
        departmentId: dept.id,
        departmentName: dept.name,
        facultyId: dept.facultyId,
        facultyName: dept.facultyName,
        institutionId: inst.id,
        institutionName: inst.name,
        durationYears: 2,
        levels: ['ND I', 'ND II']
      }},
      {{
        id: `prog_${{dept.id}}_hnd`,
        name: `HND ${{dept.name}}`,
        code: `HND-${{dept.code}}`,
        degreeType: 'HND',
        departmentId: dept.id,
        departmentName: dept.name,
        facultyId: dept.facultyId,
        facultyName: dept.facultyName,
        institutionId: inst.id,
        institutionName: inst.name,
        durationYears: 2,
        levels: ['HND I', 'HND II']
      }}
    ];
  }} else if (isCOE) {{
    return [
      {{
        id: `prog_${{dept.id}}_nce`,
        name: `NCE ${{dept.name}}`,
        code: `NCE-${{dept.code}}`,
        degreeType: 'NCE',
        departmentId: dept.id,
        departmentName: dept.name,
        facultyId: dept.facultyId,
        facultyName: dept.facultyName,
        institutionId: inst.id,
        institutionName: inst.name,
        durationYears: 3,
        levels: ['NCE I', 'NCE II', 'NCE III']
      }}
    ];
  }}

  return [
    {{
      id: `prog_${{dept.id}}_bsc`,
      name: `B.Sc ${{dept.name}}`,
      code: `BSC-${{dept.code}}`,
      degreeType: 'B.Sc',
      departmentId: dept.id,
      departmentName: dept.name,
      facultyId: dept.facultyId,
      facultyName: dept.facultyName,
      institutionId: inst.id,
      institutionName: inst.name,
      durationYears: 4,
      levels: ['100L', '200L', '300L', '400L']
    }}
  ];
}}

// 4. Resolve Courses for ANY Programme & Department in ANY Institution
export function resolveCoursesForProgramme(
  prog: ProgrammeRecord, 
  dept: DepartmentRecord, 
  inst: Institution
): CourseRecord[] {{
  const templates = matchFacultyToTemplate(dept.facultyName, inst.type);
  const matchedTmpl = templates.find(t => 
    t.name.toLowerCase() === dept.name.toLowerCase() || 
    t.code.toLowerCase() === dept.code.toLowerCase() ||
    dept.name.toLowerCase().includes(t.name.toLowerCase()) ||
    t.name.toLowerCase().includes(dept.name.toLowerCase())
  );

  const targetPrefixes = matchedTmpl?.courseCodePrefixes || [dept.code, 'GST'];

  // Match relevant courses from COMPREHENSIVE_COURSES
  const matchingCourses = COMPREHENSIVE_COURSES.filter(c => {{
    const codePrefix = c.courseCode.split(' ')[0].toUpperCase();
    const deptMatch = c.department.toLowerCase().includes(dept.name.toLowerCase()) || 
                      dept.name.toLowerCase().includes(c.department.toLowerCase());
    const facultyMatch = c.faculty.toLowerCase().includes(dept.facultyName.toLowerCase()) || 
                         dept.facultyName.toLowerCase().includes(c.faculty.toLowerCase());
    const prefixMatch = targetPrefixes.includes(codePrefix);

    return deptMatch || prefixMatch || (facultyMatch && c.isElective);
  }});

  // Always include General Studies (GST) for 100L to 300L
  const gstCourses = COMPREHENSIVE_COURSES.filter(c => c.courseCode.startsWith('GST'));
  
  const courseMap = new Map<string, CourseRecord>();

  // Add matching disciplinary courses
  matchingCourses.forEach(c => {{
    courseMap.set(c.courseCode, {{
      ...c,
      id: `crs_${{inst.id}}_${{c.courseCode.toLowerCase().replace(' ', '_')}}`,
      institutionId: inst.id,
      institutionName: inst.name,
      faculty: dept.facultyName,
      department: dept.name,
      programme: prog.name
    }});
  }});

  // Add GST courses for corresponding levels
  gstCourses.forEach(c => {{
    if (prog.levels.includes(c.level) && !courseMap.has(c.courseCode)) {{
      courseMap.set(c.courseCode, {{
        ...c,
        id: `crs_${{inst.id}}_${{c.courseCode.toLowerCase().replace(' ', '_')}}`,
        institutionId: inst.id,
        institutionName: inst.name,
        faculty: dept.facultyName,
        department: dept.name,
        programme: prog.name
      }});
    }}
  }});

  const results = Array.from(courseMap.values());

  if (results.length < 4) {{
    const fallbacks = COMPREHENSIVE_COURSES.filter(c => 
      c.courseCode.startsWith('GST') || 
      c.courseCode.startsWith('CSC') || 
      c.courseCode.startsWith('ENG')
    );
    fallbacks.forEach(c => {{
      if (!courseMap.has(c.courseCode)) {{
        courseMap.set(c.courseCode, {{
          ...c,
          id: `crs_${{inst.id}}_${{c.courseCode.toLowerCase().replace(' ', '_')}}`,
          institutionId: inst.id,
          institutionName: inst.name,
          faculty: dept.facultyName,
          department: dept.name,
          programme: prog.name
        }});
      }}
    }});
    return Array.from(courseMap.values());
  }}

  return results;
}}
'''

open('src/data/academicHierarchyResolver.ts', 'w').write(ts_content)
print("Successfully generated src/data/academicHierarchyResolver.ts!")
