import json
import re

content = open('src/data/institutionsData.ts').read()
match = re.search(r'export const institutionsData: Institution\[\] = (\[[\s\S]+\]);', content)
institutions = json.loads(match.group(1))

unique_facs = sorted(list({f.strip() for inst in institutions for f in inst.get('faculties', [])}))

def categorize(fac_name, inst_type="University"):
    name = fac_name.lower().strip()
    isPoly = 'poly' in inst_type.lower() or 'monotechnic' in inst_type.lower() or 'college of technology' in inst_type.lower() or 'institute of technology' in inst_type.lower()
    isCOE = 'education' in inst_type.lower() or 'coe' in inst_type.lower() or 'teachers' in inst_type.lower()
    isHealthMonotechnic = 'health' in inst_type.lower() or 'nursing' in inst_type.lower() or 'midwifery' in inst_type.lower()

    # Specialized Monotechnic Checks FIRST
    # Aviation
    if 'flying' in name or 'pilot' in name:
        return 'aviation_pilot'
    if 'air traffic' in name or 'ats' in name or 'communications school' in name:
        return 'aviation_atc'
    if 'aircraft maintenance' in name or 'airframe' in name or 'air engineering' in name:
        return 'aviation_maintenance'
    if 'aeronautical telecommunications' in name or 'aeronautical telecom' in name:
        return 'aviation_telecom'
    if 'aviation management' in name:
        return 'aviation_management'

    # Maritime
    if 'nautical' in name:
        return 'maritime_nautical'
    if 'marine engineering' in name or 'maritime engineering' in name:
        return 'maritime_engineering'
    if 'maritime transport' in name or 'maritime and offshore' in name or 'maritime' in name:
        return 'maritime_transport'

    # Petroleum
    if 'petroleum' in name or 'gas processing' in name:
        return 'petroleum_offshore'
    if 'industrial safety' in name:
        return 'industrial_safety'

    # Leather / Survey Monotechnics
    if 'leather' in name or 'footwear' in name:
        return 'leather_technology'
    if 'survey' in name or 'geomatics' in name:
        return 'surveying_geoinformatics'

    # Nursing Specialties
    if 'critical care' in name:
        return 'nursing_critical_care'
    if 'perioperative' in name:
        return 'nursing_perioperative'
    if 'paediatric' in name or 'pediatric' in name:
        return 'nursing_paediatric'
    if 'psychiatric' in name or 'mental health' in name:
        return 'nursing_psychiatric'
    if 'public health nursing' in name:
        return 'nursing_public_health'
    if 'midwifery' in name:
        return 'nursing_midwifery'
    if 'nursing' in name:
        return 'nursing_general'

    # Colleges of Health Technology (Monotechnic Schools)
    if 'community health' in name:
        return 'health_tech_community'
    if 'health information' in name or 'medical records' in name:
        return 'health_tech_records'
    if 'environmental health' in name:
        return 'health_tech_environmental'
    if 'dental health' in name:
        return 'health_tech_dental'
    if 'medical laboratory technology' in name:
        return 'health_tech_lab'
    if 'pharmacy technician' in name:
        return 'health_tech_pharmacy'

    # Monotechnic Agriculture
    if 'animal health and production' in name or 'veterinary laboratory' in name:
        return 'animal_health_monotechnic'
    if 'horticultural' in name:
        return 'horticulture_monotechnic'
    if 'fisheries technology' in name or 'fisheries and aquaculture technology' in name:
        return 'fisheries_monotechnic'
    if 'forestry technology' in name or 'wood and paper' in name:
        return 'forestry_monotechnic'
    if 'agricultural technology' in name or 'agricultural and bio-environmental' in name:
        return 'agric_tech_monotechnic'

    # Specialized University Faculties
    if 'dental' in name or 'dentistry' in name:
        return 'dentistry'
    if 'pharmacy' in name or 'pharmaceutical' in name:
        return 'pharmacy'
    if 'veterinary' in name:
        return 'veterinary'
    if 'basic clinical' in name:
        return 'clinical_sciences'
    if 'basic medical' in name or 'biomedical' in name:
        return 'basic_medical_sciences'
    if 'clinical' in name:
        return 'clinical_sciences'
    if 'public health' in name:
        return 'public_health'
    if 'renewable' in name or 'natural resources' in name or 'forestry' in name:
        return 'renewable_natural_resources'
    if 'animal science' in name or 'livestock' in name:
        return 'animal_science_specialized'
    if 'plant science' in name or 'crop' in name or 'agronomy' in name:
        return 'plant_crop_specialized'
    if 'food science and human ecology' in name or 'food and consumer' in name:
        return 'food_human_ecology'
    if 'agricultural management' in name or 'rural development' in name or 'agricultural economics' in name:
        return 'agric_mgt_rural_dev'
    if 'earth and mineral' in name or 'mineral' in name or 'earth and environmental' in name:
        return 'earth_mineral_sciences'
    if 'allied health' in name or 'medical rehabilitation' in name or 'health sciences' in name or 'medical sciences' in name or 'medicine' in name:
        if 'medicine' in name or 'medical sciences' in name or 'lasucom' in name or 'benjamin' in name:
            return 'clinical_sciences'
        return 'allied_health'

    # Colleges of Education
    if isCOE or 'education' in name or 'teaching' in name:
        if 'language' in name or 'english' in name or 'french' in name or 'arabic' in name:
            return 'coe_languages'
        if 'early childhood' in name or 'primary' in name:
            return 'coe_early_childhood'
        if 'technical' in name:
            return 'coe_technical'
        if 'vocational' in name or 'home economics' in name:
            return 'coe_vocational'
        if 'science' in name:
            return 'coe_sciences'
        if 'art' in name or 'social' in name or 'humanities' in name:
            return 'coe_arts_social'
        if 'adult' in name or 'non-formal' in name or 'special' in name:
            return 'coe_adult_nonformal'
        return 'coe_education'

    # Polytechnics
    if isPoly:
        if 'art' in name or 'design' in name or 'printing' in name:
            return 'poly_art_design'
        if 'environmental' in name or 'built' in name:
            return 'poly_environmental'
        if 'engineering' in name or 'technology' in name and 'information' not in name and 'applied' not in name:
            return 'poly_engineering'
        if 'information' in name or 'computing' in name or 'computer' in name:
            return 'computing_informatics'
        if 'applied science' in name or 'applied and natural' in name or 'science and technology' in name:
            return 'poly_technology'
        if 'business' in name or 'management' in name or 'financial' in name or 'account' in name:
            return 'poly_management'
        if 'liberal' in name or 'general' in name or 'communication' in name:
            return 'poly_liberal'

    # Universities Comprehensive
    if 'computing' in name or 'computer' in name or 'information technology' in name or 'informatics' in name:
        return 'computing_informatics'
    if 'engineering' in name or 'aerospace' in name:
        return 'engineering_university'
    if 'environmental' in name or 'architecture' in name or 'built' in name:
        return 'environmental_sciences'
    if 'agriculture' in name or 'agric' in name:
        return 'agriculture_comprehensive'
    if 'law' in name or 'legal' in name or 'security' in name:
        return 'law'
    if 'management' in name or 'business' in name or 'administration' in name or 'financial' in name or 'leadership' in name:
        return 'management_sciences'
    if 'social' in name or 'economic' in name or 'sociology' in name:
        return 'social_sciences'
    if 'art' in name or 'humanities' in name or 'language' in name or 'media' in name:
        return 'arts_humanities'
    if 'biological' in name or 'life' in name or 'bio' in name:
        return 'biological_life_sciences'
    if 'physical' in name:
        return 'physical_sciences'
    if 'science' in name or 'pure and applied' in name or 'natural' in name:
        return 'physical_sciences'

    return 'arts_humanities'

results = {}
for fac in unique_facs:
    cat = categorize(fac)
    results[fac] = cat

print(f"Mapped {len(results)} faculties across {len(set(results.values()))} distinct categories.")
# Let's inspect any categories with only 1 or verify diversity
for cat in sorted(set(results.values())):
    count = sum(1 for c in results.values() if c == cat)
    print(f"  {cat}: {count} faculties")
