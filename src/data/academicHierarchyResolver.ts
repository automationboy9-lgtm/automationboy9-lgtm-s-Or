import { 
  Institution, 
  FacultyRecord, 
  DepartmentRecord, 
  ProgrammeRecord, 
  CourseRecord,
  DegreeType 
} from '../types';
import { COMPREHENSIVE_COURSES } from './allCoursesData';
import { ACTO_ENGINEERING_TECH_COURSES } from './schoolAcademicData';

export interface DepartmentTemplate {
  name: string;
  code: string;
  programmes: {
    name: string;
    code: string;
    degreeType: DegreeType;
    durationYears: number;
    levels: string[];
  }[];
  courseCodePrefixes: string[];
}

export const FACULTY_DEPARTMENT_TEMPLATES: Record<string, DepartmentTemplate[]> = {
  "aviation_pilot": [
    {
      "name": "Commercial Pilot Flight Training",
      "code": "PFT",
      "programmes": [
        {
          "name": "Commercial Pilot License (CPL) with Instrument Rating",
          "code": "CPL-IR",
          "degreeType": "Other",
          "durationYears": 2,
          "levels": [
            "Stage 1",
            "Stage 2",
            "Stage 3"
          ]
        }
      ],
      "courseCodePrefixes": [
        "AVN",
        "PHY",
        "MTH",
        "GST"
      ]
    },
    {
      "name": "Flight Operations and Navigation",
      "code": "FON",
      "programmes": [
        {
          "name": "Flight Operations Officer Diploma",
          "code": "DIP-FON",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "Year 1",
            "Year 2"
          ]
        }
      ],
      "courseCodePrefixes": [
        "AVN",
        "MET",
        "GST"
      ]
    },
    {
      "name": "Simulator and Instrument Flying",
      "code": "SIF",
      "programmes": [
        {
          "name": "Multi-Engine Instrument Rating Certificate",
          "code": "CERT-MEIR",
          "degreeType": "Other",
          "durationYears": 1,
          "levels": [
            "Phase 1",
            "Phase 2"
          ]
        }
      ],
      "courseCodePrefixes": [
        "AVN",
        "GST"
      ]
    }
  ],
  "aviation_atc": [
    {
      "name": "Air Traffic Control (Aerodrome & Approach)",
      "code": "ATC",
      "programmes": [
        {
          "name": "Air Traffic Control Standard Diploma",
          "code": "DIP-ATC",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "Year 1",
            "Year 2"
          ]
        }
      ],
      "courseCodePrefixes": [
        "AVN",
        "MET",
        "GST"
      ]
    },
    {
      "name": "Area and Radar Control",
      "code": "ARC",
      "programmes": [
        {
          "name": "Area Airways & Radar Control Diploma",
          "code": "DIP-ARC",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "Year 1",
            "Year 2"
          ]
        }
      ],
      "courseCodePrefixes": [
        "AVN",
        "EEE",
        "GST"
      ]
    },
    {
      "name": "Aeronautical Information Services (AIS)",
      "code": "AIS",
      "programmes": [
        {
          "name": "Aeronautical Information Management Diploma",
          "code": "DIP-AIS",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "Year 1",
            "Year 2"
          ]
        }
      ],
      "courseCodePrefixes": [
        "AVN",
        "GST"
      ]
    }
  ],
  "aviation_maintenance": [
    {
      "name": "Airframe and Powerplant Maintenance Engineering",
      "code": "APM",
      "programmes": [
        {
          "name": "Aircraft Maintenance Engineering (Airframe/Powerplant)",
          "code": "AME-AP",
          "degreeType": "HND",
          "durationYears": 3,
          "levels": [
            "Year 1",
            "Year 2",
            "Year 3"
          ]
        }
      ],
      "courseCodePrefixes": [
        "AVN",
        "MEE",
        "ENG",
        "GST"
      ]
    },
    {
      "name": "Avionics Maintenance Engineering",
      "code": "AVM",
      "programmes": [
        {
          "name": "Aircraft Maintenance Engineering (Avionics)",
          "code": "AME-AV",
          "degreeType": "HND",
          "durationYears": 3,
          "levels": [
            "Year 1",
            "Year 2",
            "Year 3"
          ]
        }
      ],
      "courseCodePrefixes": [
        "AVN",
        "EEE",
        "ENG",
        "GST"
      ]
    }
  ],
  "aviation_telecom": [
    {
      "name": "Aeronautical Telecommunications Engineering",
      "code": "ATE",
      "programmes": [
        {
          "name": "Aeronautical Telecommunications Diploma",
          "code": "DIP-ATE",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "Year 1",
            "Year 2"
          ]
        }
      ],
      "courseCodePrefixes": [
        "AVN",
        "EEE",
        "GST"
      ]
    },
    {
      "name": "Navigational Aids Maintenance Engineering",
      "code": "NAME",
      "programmes": [
        {
          "name": "Navigational Aids Engineering Diploma",
          "code": "DIP-NAE",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "Year 1",
            "Year 2"
          ]
        }
      ],
      "courseCodePrefixes": [
        "AVN",
        "EEE",
        "PHY",
        "GST"
      ]
    }
  ],
  "aviation_management": [
    {
      "name": "Aviation Management and Airport Operations",
      "code": "AMO",
      "programmes": [
        {
          "name": "ND Aviation Management",
          "code": "ND-AVM",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Aviation Management",
          "code": "HND-AVM",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "AVN",
        "BUS",
        "MKT",
        "GST"
      ]
    },
    {
      "name": "Airline Marketing and Safety Management",
      "code": "AMS",
      "programmes": [
        {
          "name": "Diploma in Airline Marketing and Safety",
          "code": "DIP-AMS",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "AVN",
        "BUS",
        "GST"
      ]
    }
  ],
  "maritime_nautical": [
    {
      "name": "Nautical Science",
      "code": "NTS",
      "programmes": [
        {
          "name": "ND Nautical Science",
          "code": "ND-NTS",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Nautical Science",
          "code": "HND-NTS",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MAR",
        "PHY",
        "MTH",
        "GST"
      ]
    },
    {
      "name": "Maritime Meteorology and Oceanography",
      "code": "MMO",
      "programmes": [
        {
          "name": "ND Maritime Meteorology",
          "code": "ND-MMO",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MAR",
        "PHY",
        "GST"
      ]
    },
    {
      "name": "Hydrography and Marine Cartography",
      "code": "HYD",
      "programmes": [
        {
          "name": "ND Hydrography",
          "code": "ND-HYD",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MAR",
        "SVG",
        "GST"
      ]
    }
  ],
  "maritime_engineering": [
    {
      "name": "Marine Engineering Technology",
      "code": "MRE",
      "programmes": [
        {
          "name": "ND Marine Engineering",
          "code": "ND-MRE",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Marine Engineering",
          "code": "HND-MRE",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MAR",
        "MEE",
        "ENG",
        "GST"
      ]
    },
    {
      "name": "Naval Architecture and Ship Construction",
      "code": "NAS",
      "programmes": [
        {
          "name": "ND Naval Architecture",
          "code": "ND-NAS",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MAR",
        "MEE",
        "ENG",
        "GST"
      ]
    },
    {
      "name": "Marine Electrical and Electronics Engineering",
      "code": "MEE",
      "programmes": [
        {
          "name": "ND Marine Electrical Engineering",
          "code": "ND-MEE",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MAR",
        "EEE",
        "ENG",
        "GST"
      ]
    }
  ],
  "maritime_transport": [
    {
      "name": "Maritime Transport and Business Studies",
      "code": "MTB",
      "programmes": [
        {
          "name": "ND Maritime Transport Studies",
          "code": "ND-MTB",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Maritime Transport Studies",
          "code": "HND-MTB",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MAR",
        "BUS",
        "ECO",
        "GST"
      ]
    },
    {
      "name": "Port and Shipping Operations Management",
      "code": "PSM",
      "programmes": [
        {
          "name": "ND Port Operations Management",
          "code": "ND-PSM",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MAR",
        "BUS",
        "GST"
      ]
    }
  ],
  "petroleum_offshore": [
    {
      "name": "Petroleum Engineering Technology",
      "code": "PET",
      "programmes": [
        {
          "name": "ND Petroleum Engineering Tech",
          "code": "ND-PET",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Petroleum Engineering Tech",
          "code": "HND-PET",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PNG",
        "ENG",
        "MTH",
        "GST"
      ]
    },
    {
      "name": "Petroleum Geosciences and Exploration",
      "code": "PGE",
      "programmes": [
        {
          "name": "ND Petroleum Geosciences",
          "code": "ND-PGE",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Petroleum Geosciences",
          "code": "HND-PGE",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "GLY",
        "PHY",
        "GST"
      ]
    },
    {
      "name": "Offshore and Subsea Engineering Technology",
      "code": "OET",
      "programmes": [
        {
          "name": "ND Offshore Engineering Tech",
          "code": "ND-OET",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ENG",
        "PNG",
        "GST"
      ]
    }
  ],
  "petroleum_processing": [
    {
      "name": "Petroleum and Natural Gas Processing Technology",
      "code": "PNG",
      "programmes": [
        {
          "name": "ND Petroleum & Gas Processing",
          "code": "ND-PNG",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Petroleum & Gas Processing",
          "code": "HND-PNG",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PNG",
        "CHE",
        "CHM",
        "GST"
      ]
    },
    {
      "name": "Chemical and Petrochemical Technology",
      "code": "PCT",
      "programmes": [
        {
          "name": "ND Chemical Petrochemical Tech",
          "code": "ND-PCT",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CHE",
        "CHM",
        "GST"
      ]
    }
  ],
  "industrial_safety": [
    {
      "name": "Industrial Safety and Environmental Technology",
      "code": "ISE",
      "programmes": [
        {
          "name": "ND Industrial Safety Technology",
          "code": "ND-ISE",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Industrial Safety Technology",
          "code": "HND-ISE",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ENV",
        "CHM",
        "GST"
      ]
    },
    {
      "name": "Environmental Pollution and Risk Management",
      "code": "EPR",
      "programmes": [
        {
          "name": "ND Environmental Pollution Control",
          "code": "ND-EPR",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ENV",
        "BIO",
        "GST"
      ]
    }
  ],
  "leather_technology": [
    {
      "name": "Leather Technology",
      "code": "LET",
      "programmes": [
        {
          "name": "ND Leather Technology",
          "code": "ND-LET",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Leather Technology",
          "code": "HND-LET",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CHM",
        "ENG",
        "GST"
      ]
    },
    {
      "name": "Footwear Technology and Design",
      "code": "FWT",
      "programmes": [
        {
          "name": "ND Footwear Technology",
          "code": "ND-FWT",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ART",
        "ENG",
        "GST"
      ]
    }
  ],
  "surveying_geoinformatics": [
    {
      "name": "Surveying and Geoinformatics",
      "code": "SVG",
      "programmes": [
        {
          "name": "ND Surveying & Geoinformatics",
          "code": "ND-SVG",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Surveying & Geoinformatics",
          "code": "HND-SVG",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "SVG",
        "MTH",
        "PHY",
        "GST"
      ]
    },
    {
      "name": "Photogrammetry and Remote Sensing",
      "code": "PRS",
      "programmes": [
        {
          "name": "ND Photogrammetry & Remote Sensing",
          "code": "ND-PRS",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Photogrammetry & Remote Sensing",
          "code": "HND-PRS",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "SVG",
        "CSC",
        "GST"
      ]
    },
    {
      "name": "Cartography and Geographic Information Systems",
      "code": "CGIS",
      "programmes": [
        {
          "name": "ND Cartography & GIS",
          "code": "ND-CGIS",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "SVG",
        "GEO",
        "GST"
      ]
    }
  ],
  "dentistry": [
    {
      "name": "Child Dental Health",
      "code": "CDH",
      "programmes": [
        {
          "name": "BDS Bachelor of Dental Surgery",
          "code": "BDS-CDH",
          "degreeType": "MBBS",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "DEN",
        "ANA",
        "PHS",
        "BCH",
        "GST"
      ]
    },
    {
      "name": "Oral and Maxillofacial Surgery",
      "code": "OMS",
      "programmes": [
        {
          "name": "BDS Bachelor of Dental Surgery",
          "code": "BDS-OMS",
          "degreeType": "MBBS",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "DEN",
        "SUR",
        "ANA",
        "GST"
      ]
    },
    {
      "name": "Restorative Dentistry",
      "code": "RED",
      "programmes": [
        {
          "name": "BDS Bachelor of Dental Surgery",
          "code": "BDS-RED",
          "degreeType": "MBBS",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "DEN",
        "GST"
      ]
    },
    {
      "name": "Preventive and Community Dentistry",
      "code": "PCD",
      "programmes": [
        {
          "name": "BDS Bachelor of Dental Surgery",
          "code": "BDS-PCD",
          "degreeType": "MBBS",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "DEN",
        "GST"
      ]
    },
    {
      "name": "Oral Pathology and Oral Medicine",
      "code": "OPM",
      "programmes": [
        {
          "name": "BDS Bachelor of Dental Surgery",
          "code": "BDS-OPM",
          "degreeType": "MBBS",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "DEN",
        "PTH",
        "GST"
      ]
    }
  ],
  "pharmacy": [
    {
      "name": "Clinical Pharmacy and Biopharmacy",
      "code": "CPB",
      "programmes": [
        {
          "name": "Doctor of Pharmacy (Pharm.D)",
          "code": "PHARMD",
          "degreeType": "B.Pharm",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PHA",
        "PHM",
        "BCH",
        "GST"
      ]
    },
    {
      "name": "Pharmaceutics and Pharmaceutical Technology",
      "code": "PPT",
      "programmes": [
        {
          "name": "B.Pharm / Pharm.D Pharmaceutics",
          "code": "PHARM-PPT",
          "degreeType": "B.Pharm",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PHA",
        "CHM",
        "GST"
      ]
    },
    {
      "name": "Pharmaceutical Chemistry",
      "code": "PCH",
      "programmes": [
        {
          "name": "B.Pharm Pharmaceutical Chemistry",
          "code": "PHARM-PCH",
          "degreeType": "B.Pharm",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PHA",
        "CHM",
        "BCH",
        "GST"
      ]
    },
    {
      "name": "Pharmacognosy and Herbal Drug Development",
      "code": "PCG",
      "programmes": [
        {
          "name": "B.Pharm Pharmacognosy",
          "code": "PHARM-PCG",
          "degreeType": "B.Pharm",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PHA",
        "BIO",
        "CHM",
        "GST"
      ]
    },
    {
      "name": "Pharmacology and Toxicology",
      "code": "PHT",
      "programmes": [
        {
          "name": "B.Pharm Pharmacology",
          "code": "PHARM-PHT",
          "degreeType": "B.Pharm",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PHA",
        "PHS",
        "BCH",
        "GST"
      ]
    },
    {
      "name": "Pharmaceutical Microbiology and Biotechnology",
      "code": "PMB",
      "programmes": [
        {
          "name": "B.Pharm Pharmaceutical Microbiology",
          "code": "PHARM-PMB",
          "degreeType": "B.Pharm",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PHA",
        "MCB",
        "GST"
      ]
    }
  ],
  "veterinary": [
    {
      "name": "Veterinary Anatomy",
      "code": "VAN",
      "programmes": [
        {
          "name": "Doctor of Veterinary Medicine (DVM)",
          "code": "DVM-VAN",
          "degreeType": "MBBS",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "VET",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Veterinary Physiology and Biochemistry",
      "code": "VPB",
      "programmes": [
        {
          "name": "Doctor of Veterinary Medicine (DVM)",
          "code": "DVM-VPB",
          "degreeType": "MBBS",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "VET",
        "BCH",
        "PHS",
        "GST"
      ]
    },
    {
      "name": "Veterinary Pathology",
      "code": "VPT",
      "programmes": [
        {
          "name": "Doctor of Veterinary Medicine (DVM)",
          "code": "DVM-VPT",
          "degreeType": "MBBS",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "VET",
        "PTH",
        "GST"
      ]
    },
    {
      "name": "Veterinary Microbiology and Parasitology",
      "code": "VMP",
      "programmes": [
        {
          "name": "Doctor of Veterinary Medicine (DVM)",
          "code": "DVM-VMP",
          "degreeType": "MBBS",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "VET",
        "MCB",
        "GST"
      ]
    },
    {
      "name": "Veterinary Surgery and Radiology",
      "code": "VSR",
      "programmes": [
        {
          "name": "Doctor of Veterinary Medicine (DVM)",
          "code": "DVM-VSR",
          "degreeType": "MBBS",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "VET",
        "SUR",
        "GST"
      ]
    },
    {
      "name": "Veterinary Theriogenology and Animal Reproduction",
      "code": "VTH",
      "programmes": [
        {
          "name": "Doctor of Veterinary Medicine (DVM)",
          "code": "DVM-VTH",
          "degreeType": "MBBS",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "VET",
        "ANS",
        "GST"
      ]
    },
    {
      "name": "Veterinary Public Health and Preventive Medicine",
      "code": "VPH",
      "programmes": [
        {
          "name": "Doctor of Veterinary Medicine (DVM)",
          "code": "DVM-VPH",
          "degreeType": "MBBS",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "VET",
        "GST"
      ]
    }
  ],
  "nursing_general": [
    {
      "name": "General Nursing",
      "code": "GNS",
      "programmes": [
        {
          "name": "Registered Nurse (RN) / ND Nursing",
          "code": "RN-ND",
          "degreeType": "ND",
          "durationYears": 3,
          "levels": [
            "Year 1",
            "Year 2",
            "Year 3"
          ]
        }
      ],
      "courseCodePrefixes": [
        "NUR",
        "ANA",
        "PHS",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Medical-Surgical Nursing",
      "code": "MSN",
      "programmes": [
        {
          "name": "HND Medical-Surgical Nursing",
          "code": "HND-MSN",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "Year 1",
            "Year 2"
          ]
        }
      ],
      "courseCodePrefixes": [
        "NUR",
        "SUR",
        "GST"
      ]
    },
    {
      "name": "Maternal and Child Health Nursing",
      "code": "MCN",
      "programmes": [
        {
          "name": "Diploma in Maternal & Child Health",
          "code": "DIP-MCN",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "Year 1",
            "Year 2"
          ]
        }
      ],
      "courseCodePrefixes": [
        "NUR",
        "GST"
      ]
    }
  ],
  "nursing_midwifery": [
    {
      "name": "Basic Midwifery",
      "code": "BM",
      "programmes": [
        {
          "name": "Registered Midwife (RM) / ND Midwifery",
          "code": "RM-ND",
          "degreeType": "ND",
          "durationYears": 3,
          "levels": [
            "Year 1",
            "Year 2",
            "Year 3"
          ]
        }
      ],
      "courseCodePrefixes": [
        "NUR",
        "ANA",
        "PHS",
        "GST"
      ]
    },
    {
      "name": "Obstetric and Neonatal Care",
      "code": "ONC",
      "programmes": [
        {
          "name": "HND Obstetric Nursing",
          "code": "HND-ONC",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "Year 1",
            "Year 2"
          ]
        }
      ],
      "courseCodePrefixes": [
        "NUR",
        "GST"
      ]
    },
    {
      "name": "Reproductive Health and Family Planning",
      "code": "RHF",
      "programmes": [
        {
          "name": "Diploma in Family Planning & Reproductive Health",
          "code": "DIP-RHF",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "Year 1",
            "Year 2"
          ]
        }
      ],
      "courseCodePrefixes": [
        "NUR",
        "GST"
      ]
    }
  ],
  "nursing_public_health": [
    {
      "name": "Public Health Nursing",
      "code": "PHN",
      "programmes": [
        {
          "name": "HND Public Health Nursing",
          "code": "HND-PHN",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "Year 1",
            "Year 2"
          ]
        }
      ],
      "courseCodePrefixes": [
        "NUR",
        "COM",
        "GST"
      ]
    },
    {
      "name": "Primary Health Care and Disease Surveillance",
      "code": "PDS",
      "programmes": [
        {
          "name": "Diploma in Primary Health Care Nursing",
          "code": "DIP-PHC",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "Year 1",
            "Year 2"
          ]
        }
      ],
      "courseCodePrefixes": [
        "NUR",
        "GST"
      ]
    }
  ],
  "nursing_psychiatric": [
    {
      "name": "Psychiatric and Mental Health Nursing",
      "code": "PMN",
      "programmes": [
        {
          "name": "Registered Psychiatric Nurse (RPN)",
          "code": "RPN",
          "degreeType": "ND",
          "durationYears": 3,
          "levels": [
            "Year 1",
            "Year 2",
            "Year 3"
          ]
        }
      ],
      "courseCodePrefixes": [
        "NUR",
        "PSY",
        "GST"
      ]
    },
    {
      "name": "Behavioural Sciences and Psychotherapy",
      "code": "BSP",
      "programmes": [
        {
          "name": "Diploma in Mental Health Rehabilitation",
          "code": "DIP-MHR",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "Year 1",
            "Year 2"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PSY",
        "SOC",
        "GST"
      ]
    }
  ],
  "nursing_perioperative": [
    {
      "name": "Perioperative and Surgical Nursing",
      "code": "PON",
      "programmes": [
        {
          "name": "Post-Basic Perioperative Nursing Diploma",
          "code": "DIP-PON",
          "degreeType": "HND",
          "durationYears": 1,
          "levels": [
            "Semester 1",
            "Semester 2"
          ]
        }
      ],
      "courseCodePrefixes": [
        "NUR",
        "SUR",
        "GST"
      ]
    },
    {
      "name": "Operating Theatre Techniques and Anaesthesia",
      "code": "OTA",
      "programmes": [
        {
          "name": "Certificate in Operating Theatre Techniques",
          "code": "CERT-OTA",
          "degreeType": "Other",
          "durationYears": 1,
          "levels": [
            "Level 1"
          ]
        }
      ],
      "courseCodePrefixes": [
        "NUR",
        "GST"
      ]
    }
  ],
  "nursing_critical_care": [
    {
      "name": "Critical Care and Intensive Care Nursing",
      "code": "CCN",
      "programmes": [
        {
          "name": "Post-Basic Intensive Care Nursing Diploma",
          "code": "DIP-CCN",
          "degreeType": "HND",
          "durationYears": 1,
          "levels": [
            "Semester 1",
            "Semester 2"
          ]
        }
      ],
      "courseCodePrefixes": [
        "NUR",
        "MED",
        "GST"
      ]
    },
    {
      "name": "Emergency and Trauma Nursing",
      "code": "ETN",
      "programmes": [
        {
          "name": "Diploma in Emergency & Trauma Nursing",
          "code": "DIP-ETN",
          "degreeType": "HND",
          "durationYears": 1,
          "levels": [
            "Semester 1",
            "Semester 2"
          ]
        }
      ],
      "courseCodePrefixes": [
        "NUR",
        "GST"
      ]
    }
  ],
  "nursing_paediatric": [
    {
      "name": "Paediatric Nursing and Child Health",
      "code": "PDN",
      "programmes": [
        {
          "name": "Post-Basic Paediatric Nursing Diploma",
          "code": "DIP-PDN",
          "degreeType": "HND",
          "durationYears": 1,
          "levels": [
            "Semester 1",
            "Semester 2"
          ]
        }
      ],
      "courseCodePrefixes": [
        "NUR",
        "PAE",
        "GST"
      ]
    },
    {
      "name": "Neonatal Intensive Care Nursing",
      "code": "NIC",
      "programmes": [
        {
          "name": "Certificate in Neonatal Nursing",
          "code": "CERT-NIC",
          "degreeType": "Other",
          "durationYears": 1,
          "levels": [
            "Level 1"
          ]
        }
      ],
      "courseCodePrefixes": [
        "NUR",
        "GST"
      ]
    }
  ],
  "health_tech_community": [
    {
      "name": "Community Health Extension (CHEW)",
      "code": "CHE",
      "programmes": [
        {
          "name": "Diploma in Community Health (CHEW)",
          "code": "DIP-CHEW",
          "degreeType": "ND",
          "durationYears": 3,
          "levels": [
            "Year 1",
            "Year 2",
            "Year 3"
          ]
        }
      ],
      "courseCodePrefixes": [
        "NUR",
        "COM",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Junior Community Health Extension (JCHEW)",
      "code": "JCH",
      "programmes": [
        {
          "name": "Certificate in Community Health (JCHEW)",
          "code": "CERT-JCHEW",
          "degreeType": "Other",
          "durationYears": 2,
          "levels": [
            "Year 1",
            "Year 2"
          ]
        }
      ],
      "courseCodePrefixes": [
        "BIO",
        "GST"
      ]
    }
  ],
  "health_tech_records": [
    {
      "name": "Health Information Management",
      "code": "HIM",
      "programmes": [
        {
          "name": "ND Health Information Management",
          "code": "ND-HIM",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Health Information Management",
          "code": "HND-HIM",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CSC",
        "MED",
        "GST"
      ]
    },
    {
      "name": "Medical Records and Biostatistics",
      "code": "MRB",
      "programmes": [
        {
          "name": "Diploma in Medical Records",
          "code": "DIP-MRB",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "STA",
        "CSC",
        "GST"
      ]
    }
  ],
  "health_tech_environmental": [
    {
      "name": "Environmental Health Technology",
      "code": "EHT",
      "programmes": [
        {
          "name": "ND Environmental Health Technology",
          "code": "ND-EHT",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Environmental Health Technology",
          "code": "HND-EHT",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ENV",
        "CHM",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Public Health Sanitation and Hygiene",
      "code": "PSH",
      "programmes": [
        {
          "name": "Diploma in Environmental Health Assistance",
          "code": "DIP-EHA",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ENV",
        "GST"
      ]
    }
  ],
  "health_tech_lab": [
    {
      "name": "Medical Laboratory Technician Studies",
      "code": "MLT",
      "programmes": [
        {
          "name": "Medical Laboratory Technician Diploma",
          "code": "DIP-MLT",
          "degreeType": "ND",
          "durationYears": 3,
          "levels": [
            "Year 1",
            "Year 2",
            "Year 3"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MLS",
        "BIO",
        "CHM",
        "GST"
      ]
    },
    {
      "name": "Medical Laboratory Assistant Studies",
      "code": "MLA",
      "programmes": [
        {
          "name": "Medical Laboratory Assistant Certificate",
          "code": "CERT-MLA",
          "degreeType": "Other",
          "durationYears": 2,
          "levels": [
            "Year 1",
            "Year 2"
          ]
        }
      ],
      "courseCodePrefixes": [
        "BIO",
        "CHM",
        "GST"
      ]
    }
  ],
  "health_tech_pharmacy": [
    {
      "name": "Pharmacy Technician Studies",
      "code": "PHT",
      "programmes": [
        {
          "name": "Pharmacy Technician Diploma",
          "code": "DIP-PHT",
          "degreeType": "ND",
          "durationYears": 3,
          "levels": [
            "Year 1",
            "Year 2",
            "Year 3"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PHA",
        "CHM",
        "BIO",
        "GST"
      ]
    }
  ],
  "health_tech_dental": [
    {
      "name": "Dental Health Technology",
      "code": "DHT",
      "programmes": [
        {
          "name": "ND Dental Technology",
          "code": "ND-DHT",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Dental Technology",
          "code": "HND-DHT",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "DEN",
        "PHY",
        "GST"
      ]
    },
    {
      "name": "Dental Therapy and Nursing",
      "code": "DTN",
      "programmes": [
        {
          "name": "ND Dental Therapy",
          "code": "ND-DTH",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Dental Therapy",
          "code": "HND-DTH",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "DEN",
        "NUR",
        "GST"
      ]
    }
  ],
  "agric_tech_monotechnic": [
    {
      "name": "Agricultural Technology",
      "code": "AGT",
      "programmes": [
        {
          "name": "ND Agricultural Technology",
          "code": "ND-AGT",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Crop Production Technology",
          "code": "HND-CPT",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "AGR",
        "CRP",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Agricultural Extension and Management",
      "code": "AEM",
      "programmes": [
        {
          "name": "HND Agricultural Extension & Management",
          "code": "HND-AEM",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "AGE",
        "AGR",
        "GST"
      ]
    },
    {
      "name": "Soil Science and Agricultural Chemistry",
      "code": "SAC",
      "programmes": [
        {
          "name": "ND Soil Science Technology",
          "code": "ND-SAC",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "SOS",
        "CHM",
        "GST"
      ]
    }
  ],
  "animal_health_monotechnic": [
    {
      "name": "Animal Health and Production Technology",
      "code": "AHP",
      "programmes": [
        {
          "name": "ND Animal Health & Production",
          "code": "ND-AHP",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Animal Health Technology",
          "code": "HND-AHT",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        },
        {
          "name": "HND Animal Production Technology",
          "code": "HND-APT",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ANS",
        "VET",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Veterinary Laboratory Technology",
      "code": "VLT",
      "programmes": [
        {
          "name": "ND Veterinary Laboratory Technology",
          "code": "ND-VLT",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "VET",
        "BIO",
        "CHM",
        "GST"
      ]
    }
  ],
  "horticulture_monotechnic": [
    {
      "name": "Horticultural Technology",
      "code": "HRT",
      "programmes": [
        {
          "name": "ND Horticultural Technology",
          "code": "ND-HRT",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Horticultural Technology",
          "code": "HND-HRT",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CRP",
        "AGR",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Landscape Gardening and Floriculture",
      "code": "LGF",
      "programmes": [
        {
          "name": "ND Landscape Horticulture",
          "code": "ND-LGF",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "AGR",
        "ART",
        "GST"
      ]
    }
  ],
  "fisheries_monotechnic": [
    {
      "name": "Fisheries and Aquaculture Technology",
      "code": "FAT",
      "programmes": [
        {
          "name": "ND Fisheries Technology",
          "code": "ND-FAT",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Fisheries Technology",
          "code": "HND-FAT",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "FIS",
        "AGR",
        "BIO",
        "GST"
      ]
    }
  ],
  "forestry_monotechnic": [
    {
      "name": "Forestry Technology",
      "code": "FOT",
      "programmes": [
        {
          "name": "ND Forestry Technology",
          "code": "ND-FOT",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Forestry Technology",
          "code": "HND-FOT",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "FOR",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Wildlife and Ecotourism Management",
      "code": "WEM",
      "programmes": [
        {
          "name": "ND Wildlife & Ecotourism",
          "code": "ND-WEM",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Wildlife & Ecotourism",
          "code": "HND-WEM",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "WEM",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Wood and Paper Technology",
      "code": "WPT",
      "programmes": [
        {
          "name": "ND Wood and Paper Tech",
          "code": "ND-WPT",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "FOR",
        "CHM",
        "GST"
      ]
    }
  ],
  "engineering_university": [
    {
      "name": "Civil Engineering",
      "code": "CVE",
      "programmes": [
        {
          "name": "B.Eng Civil Engineering",
          "code": "BENG-CVE",
          "degreeType": "B.Eng",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CVE",
        "ENG",
        "MTH",
        "PHY",
        "GST"
      ]
    },
    {
      "name": "Electrical and Electronics Engineering",
      "code": "EEE",
      "programmes": [
        {
          "name": "B.Eng Electrical & Electronics Engineering",
          "code": "BENG-EEE",
          "degreeType": "B.Eng",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "EEE",
        "ENG",
        "MTH",
        "PHY",
        "GST"
      ]
    },
    {
      "name": "Mechanical Engineering",
      "code": "MEE",
      "programmes": [
        {
          "name": "B.Eng Mechanical Engineering",
          "code": "BENG-MEE",
          "degreeType": "B.Eng",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MEE",
        "ENG",
        "MTH",
        "PHY",
        "GST"
      ]
    },
    {
      "name": "Chemical Engineering",
      "code": "CHE",
      "programmes": [
        {
          "name": "B.Eng Chemical Engineering",
          "code": "BENG-CHE",
          "degreeType": "B.Eng",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CHE",
        "CHM",
        "ENG",
        "MTH",
        "GST"
      ]
    },
    {
      "name": "Computer Engineering",
      "code": "CPE",
      "programmes": [
        {
          "name": "B.Eng Computer Engineering",
          "code": "BENG-CPE",
          "degreeType": "B.Eng",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CPE",
        "EEE",
        "CSC",
        "ENG",
        "GST"
      ]
    },
    {
      "name": "Petroleum and Gas Engineering",
      "code": "PGE",
      "programmes": [
        {
          "name": "B.Eng Petroleum Engineering",
          "code": "BENG-PGE",
          "degreeType": "B.Eng",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PNG",
        "ENG",
        "GLY",
        "GST"
      ]
    },
    {
      "name": "Agricultural and Bioresources Engineering",
      "code": "ABE",
      "programmes": [
        {
          "name": "B.Eng Agricultural & Bioresources Engineering",
          "code": "BENG-ABE",
          "degreeType": "B.Eng",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ENG",
        "AGR",
        "GST"
      ]
    },
    {
      "name": "Metallurgical and Materials Engineering",
      "code": "MME",
      "programmes": [
        {
          "name": "B.Eng Metallurgical & Materials Engineering",
          "code": "BENG-MME",
          "degreeType": "B.Eng",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MME",
        "ENG",
        "CHM",
        "PHY",
        "GST"
      ]
    },
    {
      "name": "Mechatronics and Robotics Engineering",
      "code": "MCE",
      "programmes": [
        {
          "name": "B.Eng Mechatronics Engineering",
          "code": "BENG-MCE",
          "degreeType": "B.Eng",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MCE",
        "EEE",
        "MEE",
        "CSC",
        "GST"
      ]
    }
  ],
  "computing_informatics": [
    {
      "name": "Computer Science",
      "code": "CSC",
      "programmes": [
        {
          "name": "B.Sc Computer Science",
          "code": "BSC-CSC",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CSC",
        "MTH",
        "GST"
      ]
    },
    {
      "name": "Software Engineering",
      "code": "SEN",
      "programmes": [
        {
          "name": "B.Sc Software Engineering",
          "code": "BSC-SEN",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "SEN",
        "CSC",
        "MTH",
        "GST"
      ]
    },
    {
      "name": "Cybersecurity",
      "code": "CYB",
      "programmes": [
        {
          "name": "B.Sc Cybersecurity",
          "code": "BSC-CYB",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CYB",
        "CSC",
        "MTH",
        "GST"
      ]
    },
    {
      "name": "Information Technology",
      "code": "IFT",
      "programmes": [
        {
          "name": "B.Sc Information Technology",
          "code": "BSC-IFT",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "IFT",
        "CSC",
        "GST"
      ]
    },
    {
      "name": "Data Science and Artificial Intelligence",
      "code": "DSA",
      "programmes": [
        {
          "name": "B.Sc Data Science",
          "code": "BSC-DSA",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CSC",
        "STA",
        "MTH",
        "GST"
      ]
    },
    {
      "name": "Information Systems",
      "code": "INF",
      "programmes": [
        {
          "name": "B.Sc Information Systems",
          "code": "BSC-INF",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "INF",
        "CSC",
        "BUS",
        "GST"
      ]
    }
  ],
  "physical_sciences": [
    {
      "name": "Physics",
      "code": "PHY",
      "programmes": [
        {
          "name": "B.Sc Physics",
          "code": "BSC-PHY",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PHY",
        "MTH",
        "CHM",
        "GST"
      ]
    },
    {
      "name": "Chemistry",
      "code": "CHM",
      "programmes": [
        {
          "name": "B.Sc Chemistry",
          "code": "BSC-CHM",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CHM",
        "PHY",
        "MTH",
        "GST"
      ]
    },
    {
      "name": "Mathematics",
      "code": "MTH",
      "programmes": [
        {
          "name": "B.Sc Mathematics",
          "code": "BSC-MTH",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MTH",
        "STA",
        "CSC",
        "GST"
      ]
    },
    {
      "name": "Statistics",
      "code": "STA",
      "programmes": [
        {
          "name": "B.Sc Statistics",
          "code": "BSC-STA",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "STA",
        "MTH",
        "CSC",
        "GST"
      ]
    },
    {
      "name": "Geology and Mining Sciences",
      "code": "GLY",
      "programmes": [
        {
          "name": "B.Sc Geology",
          "code": "BSC-GLY",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "GLY",
        "PHY",
        "CHM",
        "GST"
      ]
    },
    {
      "name": "Industrial Chemistry",
      "code": "ICH",
      "programmes": [
        {
          "name": "B.Sc Industrial Chemistry",
          "code": "BSC-ICH",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CHM",
        "CHE",
        "GST"
      ]
    }
  ],
  "biological_life_sciences": [
    {
      "name": "Biochemistry",
      "code": "BCH",
      "programmes": [
        {
          "name": "B.Sc Biochemistry",
          "code": "BSC-BCH",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "BCH",
        "CHM",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Microbiology",
      "code": "MCB",
      "programmes": [
        {
          "name": "B.Sc Microbiology",
          "code": "BSC-MCB",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MCB",
        "BIO",
        "CHM",
        "GST"
      ]
    },
    {
      "name": "Plant Biology and Biotechnology",
      "code": "PBB",
      "programmes": [
        {
          "name": "B.Sc Plant Biology",
          "code": "BSC-PBB",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "BIO",
        "BOT",
        "GST"
      ]
    },
    {
      "name": "Zoology and Environmental Biology",
      "code": "ZEB",
      "programmes": [
        {
          "name": "B.Sc Zoology",
          "code": "BSC-ZEB",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "BIO",
        "ZOO",
        "GST"
      ]
    },
    {
      "name": "Genetics and Biotechnology",
      "code": "GBT",
      "programmes": [
        {
          "name": "B.Sc Biotechnology",
          "code": "BSC-GBT",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "BIO",
        "BCH",
        "GST"
      ]
    }
  ],
  "environmental_sciences": [
    {
      "name": "Architecture",
      "code": "ARC",
      "programmes": [
        {
          "name": "B.Sc / B.Arch Architecture",
          "code": "BSC-ARC",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ARC",
        "BLD",
        "GST"
      ]
    },
    {
      "name": "Building",
      "code": "BLD",
      "programmes": [
        {
          "name": "B.Sc Building",
          "code": "BSC-BLD",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "BLD",
        "CVE",
        "GST"
      ]
    },
    {
      "name": "Estate Management",
      "code": "ESM",
      "programmes": [
        {
          "name": "B.Sc Estate Management",
          "code": "BSC-ESM",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ESM",
        "LAW",
        "ECO",
        "GST"
      ]
    },
    {
      "name": "Quantity Surveying",
      "code": "QTS",
      "programmes": [
        {
          "name": "B.Sc Quantity Surveying",
          "code": "BSC-QTS",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "QTS",
        "BLD",
        "MTH",
        "GST"
      ]
    },
    {
      "name": "Urban and Regional Planning",
      "code": "URP",
      "programmes": [
        {
          "name": "B.Sc Urban & Regional Planning",
          "code": "BSC-URP",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "URP",
        "GEO",
        "GST"
      ]
    },
    {
      "name": "Surveying and Geoinformatics",
      "code": "SVG",
      "programmes": [
        {
          "name": "B.Sc Surveying & Geoinformatics",
          "code": "BSC-SVG",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "SVG",
        "MTH",
        "PHY",
        "GST"
      ]
    }
  ],
  "agriculture_comprehensive": [
    {
      "name": "Agricultural Economics",
      "code": "AGE",
      "programmes": [
        {
          "name": "B.Agric Agricultural Economics",
          "code": "BAGR-AGE",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "AGE",
        "ECO",
        "AGR",
        "GST"
      ]
    },
    {
      "name": "Agricultural Extension and Rural Sociology",
      "code": "AEX",
      "programmes": [
        {
          "name": "B.Agric Agricultural Extension",
          "code": "BAGR-AEX",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "AGR",
        "SOC",
        "GST"
      ]
    },
    {
      "name": "Animal Science",
      "code": "ANS",
      "programmes": [
        {
          "name": "B.Agric Animal Science",
          "code": "BAGR-ANS",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ANS",
        "AGR",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Crop Protection and Environmental Biology",
      "code": "CPEB",
      "programmes": [
        {
          "name": "B.Agric Crop Protection",
          "code": "BAGR-CPB",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CRP",
        "BIO",
        "CHM",
        "GST"
      ]
    },
    {
      "name": "Agronomy and Plant Science",
      "code": "AGY",
      "programmes": [
        {
          "name": "B.Agric Agronomy",
          "code": "BAGR-AGY",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CRP",
        "SOS",
        "GST"
      ]
    },
    {
      "name": "Soil Resources Management",
      "code": "SRM",
      "programmes": [
        {
          "name": "B.Agric Soil Science",
          "code": "BAGR-SRM",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "SOS",
        "CHM",
        "AGR",
        "GST"
      ]
    }
  ],
  "law": [
    {
      "name": "Public and International Law",
      "code": "PIL",
      "programmes": [
        {
          "name": "LL.B Law",
          "code": "LLB-PIL",
          "degreeType": "LL.B",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "LAW",
        "PUL",
        "GST"
      ]
    },
    {
      "name": "Private and Property Law",
      "code": "PPL",
      "programmes": [
        {
          "name": "LL.B Law",
          "code": "LLB-PPL",
          "degreeType": "LL.B",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "LAW",
        "PRL",
        "GST"
      ]
    },
    {
      "name": "Commercial and Industrial Law",
      "code": "CIL",
      "programmes": [
        {
          "name": "LL.B Commercial Law",
          "code": "LLB-CIL",
          "degreeType": "LL.B",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "LAW",
        "CIL",
        "GST"
      ]
    },
    {
      "name": "Jurisprudence and International Law",
      "code": "JIL",
      "programmes": [
        {
          "name": "LL.B Jurisprudence",
          "code": "LLB-JIL",
          "degreeType": "LL.B",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "LAW",
        "JIL",
        "GST"
      ]
    },
    {
      "name": "Islamic Law (Sharia)",
      "code": "ISL",
      "programmes": [
        {
          "name": "LL.B Common and Islamic Law",
          "code": "LLB-ISL",
          "degreeType": "LL.B",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "LAW",
        "ISL",
        "GST"
      ]
    }
  ],
  "management_sciences": [
    {
      "name": "Accounting",
      "code": "ACC",
      "programmes": [
        {
          "name": "B.Sc Accounting",
          "code": "BSC-ACC",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ACC",
        "BUS",
        "ECO",
        "GST"
      ]
    },
    {
      "name": "Banking and Finance",
      "code": "BFN",
      "programmes": [
        {
          "name": "B.Sc Banking & Finance",
          "code": "BSC-BFN",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "BFN",
        "ECO",
        "ACC",
        "GST"
      ]
    },
    {
      "name": "Business Administration",
      "code": "BUS",
      "programmes": [
        {
          "name": "B.Sc Business Administration",
          "code": "BSC-BUS",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "BUS",
        "MKT",
        "ECO",
        "GST"
      ]
    },
    {
      "name": "Marketing",
      "code": "MKT",
      "programmes": [
        {
          "name": "B.Sc Marketing",
          "code": "BSC-MKT",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MKT",
        "BUS",
        "ECO",
        "GST"
      ]
    },
    {
      "name": "Public Administration",
      "code": "PAD",
      "programmes": [
        {
          "name": "B.Sc Public Administration",
          "code": "BSC-PAD",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PAD",
        "POL",
        "GST"
      ]
    },
    {
      "name": "Actuarial Science and Insurance",
      "code": "INS",
      "programmes": [
        {
          "name": "B.Sc Actuarial Science",
          "code": "BSC-ACS",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "INS",
        "MTH",
        "STA",
        "GST"
      ]
    },
    {
      "name": "Industrial Relations and Personnel Management",
      "code": "IRPM",
      "programmes": [
        {
          "name": "B.Sc Employment Relations & HRM",
          "code": "BSC-HRM",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "BUS",
        "SOC",
        "GST"
      ]
    }
  ],
  "social_sciences": [
    {
      "name": "Economics",
      "code": "ECO",
      "programmes": [
        {
          "name": "B.Sc Economics",
          "code": "BSC-ECO",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ECO",
        "MTH",
        "STA",
        "GST"
      ]
    },
    {
      "name": "Political Science",
      "code": "POL",
      "programmes": [
        {
          "name": "B.Sc Political Science",
          "code": "BSC-POL",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "POL",
        "PAD",
        "SOC",
        "GST"
      ]
    },
    {
      "name": "Sociology and Anthropology",
      "code": "SOC",
      "programmes": [
        {
          "name": "B.Sc Sociology",
          "code": "BSC-SOC",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "SOC",
        "PSY",
        "GST"
      ]
    },
    {
      "name": "Psychology",
      "code": "PSY",
      "programmes": [
        {
          "name": "B.Sc Psychology",
          "code": "BSC-PSY",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PSY",
        "SOC",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Mass Communication and Media Studies",
      "code": "MAS",
      "programmes": [
        {
          "name": "B.Sc Mass Communication",
          "code": "BSC-MAS",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MAS",
        "ENG",
        "GST"
      ]
    },
    {
      "name": "Geography and Environmental Management",
      "code": "GEO",
      "programmes": [
        {
          "name": "B.Sc Geography",
          "code": "BSC-GEO",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "GEO",
        "ENV",
        "GST"
      ]
    },
    {
      "name": "Demography and Social Statistics",
      "code": "DSS",
      "programmes": [
        {
          "name": "B.Sc Demography",
          "code": "BSC-DSS",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "STA",
        "SOC",
        "GST"
      ]
    }
  ],
  "arts_humanities": [
    {
      "name": "English and Literary Studies",
      "code": "ENG",
      "programmes": [
        {
          "name": "B.A English Studies",
          "code": "BA-ENG",
          "degreeType": "B.A",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ENG",
        "LIT",
        "GST"
      ]
    },
    {
      "name": "History and Diplomatic Studies",
      "code": "HIS",
      "programmes": [
        {
          "name": "B.A History & International Studies",
          "code": "BA-HIS",
          "degreeType": "B.A",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "HIS",
        "POL",
        "GST"
      ]
    },
    {
      "name": "Philosophy",
      "code": "PHL",
      "programmes": [
        {
          "name": "B.A Philosophy",
          "code": "BA-PHL",
          "degreeType": "B.A",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PHL",
        "GST"
      ]
    },
    {
      "name": "Religious Studies and Comparative Religions",
      "code": "REL",
      "programmes": [
        {
          "name": "B.A Religious Studies",
          "code": "BA-REL",
          "degreeType": "B.A",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "REL",
        "HIS",
        "GST"
      ]
    },
    {
      "name": "Linguistics and African Languages",
      "code": "LIN",
      "programmes": [
        {
          "name": "B.A Linguistics",
          "code": "BA-LIN",
          "degreeType": "B.A",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "LIN",
        "YOR",
        "IGB",
        "HAU",
        "GST"
      ]
    },
    {
      "name": "Theatre and Film Studies",
      "code": "THA",
      "programmes": [
        {
          "name": "B.A Theatre Arts",
          "code": "BA-THA",
          "degreeType": "B.A",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "THA",
        "ENG",
        "GST"
      ]
    },
    {
      "name": "European Languages and Integration (French/Russian/German)",
      "code": "EUL",
      "programmes": [
        {
          "name": "B.A French Language",
          "code": "BA-FRE",
          "degreeType": "B.A",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "FRE",
        "GST"
      ]
    },
    {
      "name": "Music",
      "code": "MUS",
      "programmes": [
        {
          "name": "B.A Music",
          "code": "BA-MUS",
          "degreeType": "B.A",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MUS",
        "ART",
        "GST"
      ]
    }
  ],
  "poly_engineering": [
    {
      "name": "Electrical/Electronic Engineering Technology",
      "code": "EET",
      "programmes": [
        {
          "name": "ND Electrical Engineering Tech",
          "code": "ND-EET",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Electrical Engineering (Power/Telecom)",
          "code": "HND-EET",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "EEE",
        "ENG",
        "MTH",
        "PHY",
        "GST"
      ]
    },
    {
      "name": "Mechanical Engineering Technology",
      "code": "MET",
      "programmes": [
        {
          "name": "ND Mechanical Engineering Tech",
          "code": "ND-MET",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Mechanical Engineering (Manufacturing/Automotive)",
          "code": "HND-MET",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MEE",
        "ENG",
        "MTH",
        "PHY",
        "GST"
      ]
    },
    {
      "name": "Civil Engineering Technology",
      "code": "CET",
      "programmes": [
        {
          "name": "ND Civil Engineering Tech",
          "code": "ND-CET",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Civil Engineering (Structures/Water)",
          "code": "HND-CET",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CVE",
        "ENG",
        "MTH",
        "PHY",
        "GST"
      ]
    },
    {
      "name": "Computer Engineering Technology",
      "code": "CPT",
      "programmes": [
        {
          "name": "ND Computer Engineering",
          "code": "ND-CPT",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Computer Engineering",
          "code": "HND-CPT",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CPE",
        "EEE",
        "CSC",
        "GST"
      ]
    },
    {
      "name": "Chemical Engineering Technology",
      "code": "CHT",
      "programmes": [
        {
          "name": "ND Chemical Engineering",
          "code": "ND-CHT",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Chemical Engineering",
          "code": "HND-CHT",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CHE",
        "CHM",
        "GST"
      ]
    },
    {
      "name": "Agricultural and Bio-Environmental Engineering",
      "code": "ABE",
      "programmes": [
        {
          "name": "ND Agric & Bio-Environmental Tech",
          "code": "ND-ABE",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Agric & Bio-Environmental Tech",
          "code": "HND-ABE",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ENG",
        "AGR",
        "GST"
      ]
    },
    {
      "name": "Metallurgical Engineering Technology",
      "code": "MLT",
      "programmes": [
        {
          "name": "ND Metallurgical Engineering",
          "code": "ND-MLT",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Metallurgical Engineering",
          "code": "HND-MLT",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MME",
        "CHM",
        "GST"
      ]
    }
  ],
  "poly_technology": [
    {
      "name": "Science Laboratory Technology (SLT)",
      "code": "SLT",
      "programmes": [
        {
          "name": "ND Science Laboratory Technology",
          "code": "ND-SLT",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND SLT (Biochemistry / Chemistry / Microbiology / Physics)",
          "code": "HND-SLT",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "BIO",
        "CHM",
        "PHY",
        "GST"
      ]
    },
    {
      "name": "Computer Science Technology",
      "code": "CST",
      "programmes": [
        {
          "name": "ND Computer Science",
          "code": "ND-CST",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Computer Science",
          "code": "HND-CST",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CSC",
        "MTH",
        "GST"
      ]
    },
    {
      "name": "Food Technology",
      "code": "FDT",
      "programmes": [
        {
          "name": "ND Food Technology",
          "code": "ND-FDT",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Food Technology",
          "code": "HND-FDT",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "FST",
        "CHM",
        "MCB",
        "GST"
      ]
    },
    {
      "name": "Mathematics and Statistics",
      "code": "MTS",
      "programmes": [
        {
          "name": "ND Statistics",
          "code": "ND-STA",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Statistics",
          "code": "HND-STA",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "STA",
        "MTH",
        "CSC",
        "GST"
      ]
    },
    {
      "name": "Hospitality and Tourism Management",
      "code": "HTM",
      "programmes": [
        {
          "name": "ND Hospitality Management",
          "code": "ND-HTM",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Hospitality Management",
          "code": "HND-HTM",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "HTM",
        "BUS",
        "GST"
      ]
    },
    {
      "name": "Polymer and Textile Technology",
      "code": "PTT",
      "programmes": [
        {
          "name": "ND Textile Technology",
          "code": "ND-PTT",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Textile Technology",
          "code": "HND-PTT",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CHM",
        "ENG",
        "GST"
      ]
    }
  ],
  "poly_management": [
    {
      "name": "Accountancy",
      "code": "ACC",
      "programmes": [
        {
          "name": "ND Accountancy",
          "code": "ND-ACC",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Accountancy",
          "code": "HND-ACC",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ACC",
        "BUS",
        "ECO",
        "GST"
      ]
    },
    {
      "name": "Business Administration and Management",
      "code": "BAM",
      "programmes": [
        {
          "name": "ND Business Administration",
          "code": "ND-BAM",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Business Administration",
          "code": "HND-BAM",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "BUS",
        "MKT",
        "ECO",
        "GST"
      ]
    },
    {
      "name": "Banking and Finance",
      "code": "BFN",
      "programmes": [
        {
          "name": "ND Banking & Finance",
          "code": "ND-BFN",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Banking & Finance",
          "code": "HND-BFN",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "BFN",
        "ACC",
        "ECO",
        "GST"
      ]
    },
    {
      "name": "Marketing",
      "code": "MKT",
      "programmes": [
        {
          "name": "ND Marketing",
          "code": "ND-MKT",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Marketing",
          "code": "HND-MKT",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MKT",
        "BUS",
        "ECO",
        "GST"
      ]
    },
    {
      "name": "Office Technology and Management (OTM)",
      "code": "OTM",
      "programmes": [
        {
          "name": "ND Office Technology Management",
          "code": "ND-OTM",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Office Technology Management",
          "code": "HND-OTM",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "OTM",
        "BUS",
        "CSC",
        "GST"
      ]
    },
    {
      "name": "Public Administration",
      "code": "PAD",
      "programmes": [
        {
          "name": "ND Public Administration",
          "code": "ND-PAD",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Public Administration",
          "code": "HND-PAD",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PAD",
        "POL",
        "GST"
      ]
    },
    {
      "name": "Purchasing and Supply",
      "code": "PAS",
      "programmes": [
        {
          "name": "ND Purchasing & Supply",
          "code": "ND-PAS",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Purchasing & Supply",
          "code": "HND-PAS",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "BUS",
        "ECO",
        "GST"
      ]
    }
  ],
  "poly_environmental": [
    {
      "name": "Architectural Technology",
      "code": "ARC",
      "programmes": [
        {
          "name": "ND Architectural Technology",
          "code": "ND-ARC",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Architectural Technology",
          "code": "HND-ARC",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ARC",
        "BLD",
        "GST"
      ]
    },
    {
      "name": "Building Technology",
      "code": "BLD",
      "programmes": [
        {
          "name": "ND Building Technology",
          "code": "ND-BLD",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Building Technology",
          "code": "HND-BLD",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "BLD",
        "CVE",
        "GST"
      ]
    },
    {
      "name": "Estate Management and Valuation",
      "code": "ESM",
      "programmes": [
        {
          "name": "ND Estate Management",
          "code": "ND-ESM",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Estate Management",
          "code": "HND-ESM",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ESM",
        "LAW",
        "ECO",
        "GST"
      ]
    },
    {
      "name": "Quantity Surveying",
      "code": "QTS",
      "programmes": [
        {
          "name": "ND Quantity Surveying",
          "code": "ND-QTS",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Quantity Surveying",
          "code": "HND-QTS",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "QTS",
        "BLD",
        "MTH",
        "GST"
      ]
    },
    {
      "name": "Surveying and Geo-Informatics",
      "code": "SVG",
      "programmes": [
        {
          "name": "ND Surveying & Geoinformatics",
          "code": "ND-SVG",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Surveying & Geoinformatics",
          "code": "HND-SVG",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "SVG",
        "MTH",
        "PHY",
        "GST"
      ]
    },
    {
      "name": "Urban and Regional Planning",
      "code": "URP",
      "programmes": [
        {
          "name": "ND Urban & Regional Planning",
          "code": "ND-URP",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Urban & Regional Planning",
          "code": "HND-URP",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "URP",
        "GEO",
        "GST"
      ]
    }
  ],
  "poly_art_design": [
    {
      "name": "Fine Art",
      "code": "FAR",
      "programmes": [
        {
          "name": "ND Fine Art",
          "code": "ND-FAR",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Fine Art (Painting/Sculpture)",
          "code": "HND-FAR",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ART",
        "GST"
      ]
    },
    {
      "name": "Graphic Design and Digital Media",
      "code": "GRD",
      "programmes": [
        {
          "name": "ND Graphic Design",
          "code": "ND-GRD",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Graphic Design",
          "code": "HND-GRD",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ART",
        "CSC",
        "GST"
      ]
    },
    {
      "name": "Industrial Design and Ceramics",
      "code": "IDC",
      "programmes": [
        {
          "name": "ND Industrial Design",
          "code": "ND-IDC",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Ceramics Technology",
          "code": "HND-IDC",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ART",
        "CHM",
        "GST"
      ]
    },
    {
      "name": "Fashion Design and Clothing Technology",
      "code": "FDC",
      "programmes": [
        {
          "name": "ND Fashion Design",
          "code": "ND-FDC",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Fashion Design",
          "code": "HND-FDC",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ART",
        "GST"
      ]
    },
    {
      "name": "Printing Technology",
      "code": "PRT",
      "programmes": [
        {
          "name": "ND Printing Technology",
          "code": "ND-PRT",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Printing Technology",
          "code": "HND-PRT",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ART",
        "ENG",
        "GST"
      ]
    }
  ],
  "poly_liberal": [
    {
      "name": "Mass Communication",
      "code": "MAC",
      "programmes": [
        {
          "name": "ND Mass Communication",
          "code": "ND-MAC",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        },
        {
          "name": "HND Mass Communication",
          "code": "HND-MAC",
          "degreeType": "HND",
          "durationYears": 2,
          "levels": [
            "HND I",
            "HND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MAS",
        "ENG",
        "GST"
      ]
    },
    {
      "name": "Languages and Communication Skills",
      "code": "LCS",
      "programmes": [
        {
          "name": "ND Language Studies",
          "code": "ND-LCS",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ENG",
        "FRE",
        "GST"
      ]
    },
    {
      "name": "Social Sciences and Humanities",
      "code": "SSH",
      "programmes": [
        {
          "name": "ND Social Studies",
          "code": "ND-SSH",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "SOC",
        "POL",
        "GST"
      ]
    },
    {
      "name": "Legal Studies",
      "code": "LGS",
      "programmes": [
        {
          "name": "ND Legal Studies",
          "code": "ND-LGS",
          "degreeType": "ND",
          "durationYears": 2,
          "levels": [
            "ND I",
            "ND II"
          ]
        }
      ],
      "courseCodePrefixes": [
        "LAW",
        "GST"
      ]
    }
  ],
  "coe_education": [
    {
      "name": "Educational Foundations and Management",
      "code": "EFM",
      "programmes": [
        {
          "name": "NCE Educational Foundations",
          "code": "NCE-EFM",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "EDU",
        "GST"
      ]
    },
    {
      "name": "Curriculum and Instruction",
      "code": "CUI",
      "programmes": [
        {
          "name": "NCE Curriculum Studies",
          "code": "NCE-CUI",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "EDU",
        "GST"
      ]
    },
    {
      "name": "Educational Psychology, Guidance and Counselling",
      "code": "EPG",
      "programmes": [
        {
          "name": "NCE Guidance and Counselling",
          "code": "NCE-EPG",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "EDU",
        "PSY",
        "GST"
      ]
    }
  ],
  "coe_sciences": [
    {
      "name": "Biology / Integrated Science Education",
      "code": "BIE",
      "programmes": [
        {
          "name": "NCE Biology / Integrated Science",
          "code": "NCE-BIE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "BIO",
        "EDU",
        "GST"
      ]
    },
    {
      "name": "Chemistry Education",
      "code": "CHE",
      "programmes": [
        {
          "name": "NCE Chemistry / Integrated Science",
          "code": "NCE-CHE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CHM",
        "EDU",
        "GST"
      ]
    },
    {
      "name": "Physics Education",
      "code": "PHE",
      "programmes": [
        {
          "name": "NCE Physics / Mathematics",
          "code": "NCE-PHE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PHY",
        "EDU",
        "MTH",
        "GST"
      ]
    },
    {
      "name": "Mathematics Education",
      "code": "MTE",
      "programmes": [
        {
          "name": "NCE Mathematics / Computer",
          "code": "NCE-MTE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MTH",
        "CSC",
        "EDU",
        "GST"
      ]
    },
    {
      "name": "Computer Science Education",
      "code": "CSE",
      "programmes": [
        {
          "name": "NCE Computer Science Education",
          "code": "NCE-CSE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CSC",
        "EDU",
        "GST"
      ]
    },
    {
      "name": "Physical and Health Education",
      "code": "PHE",
      "programmes": [
        {
          "name": "NCE Physical & Health Education",
          "code": "NCE-PED",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "EDU",
        "BIO",
        "GST"
      ]
    }
  ],
  "coe_arts_social": [
    {
      "name": "Social Studies Education",
      "code": "SSE",
      "programmes": [
        {
          "name": "NCE Social Studies",
          "code": "NCE-SSE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "SOC",
        "EDU",
        "GST"
      ]
    },
    {
      "name": "Economics Education",
      "code": "ECE",
      "programmes": [
        {
          "name": "NCE Economics Education",
          "code": "NCE-ECE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ECO",
        "EDU",
        "GST"
      ]
    },
    {
      "name": "Political Science Education",
      "code": "PSE",
      "programmes": [
        {
          "name": "NCE Political Science Education",
          "code": "NCE-PSE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "POL",
        "EDU",
        "GST"
      ]
    },
    {
      "name": "Geography Education",
      "code": "GEE",
      "programmes": [
        {
          "name": "NCE Geography Education",
          "code": "NCE-GEE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "GEO",
        "EDU",
        "GST"
      ]
    },
    {
      "name": "Christian Religious Studies Education (CRS)",
      "code": "CRE",
      "programmes": [
        {
          "name": "NCE Christian Religious Studies",
          "code": "NCE-CRE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "REL",
        "EDU",
        "GST"
      ]
    },
    {
      "name": "Islamic Studies Education (ISS)",
      "code": "ISE",
      "programmes": [
        {
          "name": "NCE Islamic Studies",
          "code": "NCE-ISE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "REL",
        "EDU",
        "GST"
      ]
    },
    {
      "name": "History Education",
      "code": "HSE",
      "programmes": [
        {
          "name": "NCE History Education",
          "code": "NCE-HSE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "HIS",
        "EDU",
        "GST"
      ]
    },
    {
      "name": "Music Education",
      "code": "MUE",
      "programmes": [
        {
          "name": "NCE Music Education",
          "code": "NCE-MUE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MUS",
        "EDU",
        "GST"
      ]
    },
    {
      "name": "Theatre Arts Education",
      "code": "TAE",
      "programmes": [
        {
          "name": "NCE Theatre Arts Education",
          "code": "NCE-TAE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "THA",
        "EDU",
        "GST"
      ]
    }
  ],
  "coe_languages": [
    {
      "name": "English Language and Literature Education",
      "code": "ELE",
      "programmes": [
        {
          "name": "NCE English Education",
          "code": "NCE-ELE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ENG",
        "LIT",
        "EDU",
        "GST"
      ]
    },
    {
      "name": "French Language Education",
      "code": "FLE",
      "programmes": [
        {
          "name": "NCE French Education",
          "code": "NCE-FLE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "FRE",
        "EDU",
        "GST"
      ]
    },
    {
      "name": "Hausa Language Education",
      "code": "HLE",
      "programmes": [
        {
          "name": "NCE Hausa Education",
          "code": "NCE-HLE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "HAU",
        "EDU",
        "GST"
      ]
    },
    {
      "name": "Igbo Language Education",
      "code": "ILE",
      "programmes": [
        {
          "name": "NCE Igbo Education",
          "code": "NCE-ILE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "IGB",
        "EDU",
        "GST"
      ]
    },
    {
      "name": "Yoruba Language Education",
      "code": "YLE",
      "programmes": [
        {
          "name": "NCE Yoruba Education",
          "code": "NCE-YLE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "YOR",
        "EDU",
        "GST"
      ]
    },
    {
      "name": "Arabic Language Education",
      "code": "ALE",
      "programmes": [
        {
          "name": "NCE Arabic Education",
          "code": "NCE-ALE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ARA",
        "EDU",
        "GST"
      ]
    }
  ],
  "coe_vocational": [
    {
      "name": "Agricultural Science Education",
      "code": "AGE",
      "programmes": [
        {
          "name": "NCE Agricultural Science",
          "code": "NCE-AGE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "AGR",
        "EDU",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Business Education (Accounting/Secretarial)",
      "code": "BED",
      "programmes": [
        {
          "name": "NCE Business Education",
          "code": "NCE-BED",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "BUS",
        "ACC",
        "EDU",
        "GST"
      ]
    },
    {
      "name": "Home Economics Education",
      "code": "HEE",
      "programmes": [
        {
          "name": "NCE Home Economics",
          "code": "NCE-HEE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "HSM",
        "EDU",
        "CHM",
        "GST"
      ]
    },
    {
      "name": "Fine and Applied Arts Education",
      "code": "FAE",
      "programmes": [
        {
          "name": "NCE Fine Arts Education",
          "code": "NCE-FAE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ART",
        "EDU",
        "GST"
      ]
    }
  ],
  "coe_technical": [
    {
      "name": "Electrical/Electronics Technology Education",
      "code": "ETE",
      "programmes": [
        {
          "name": "NCE Electrical Technology Education",
          "code": "NCE-ETE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "EEE",
        "ENG",
        "EDU",
        "GST"
      ]
    },
    {
      "name": "Mechanical / Automobile Technology Education",
      "code": "MTE",
      "programmes": [
        {
          "name": "NCE Auto/Mechanical Tech Education",
          "code": "NCE-MTE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MEE",
        "ENG",
        "EDU",
        "GST"
      ]
    },
    {
      "name": "Building / Woodwork Technology Education",
      "code": "BTE",
      "programmes": [
        {
          "name": "NCE Building Technology Education",
          "code": "NCE-BTE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "BLD",
        "ENG",
        "EDU",
        "GST"
      ]
    },
    {
      "name": "Metalwork Technology Education",
      "code": "MWT",
      "programmes": [
        {
          "name": "NCE Metalwork Tech Education",
          "code": "NCE-MWT",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ENG",
        "EDU",
        "GST"
      ]
    }
  ],
  "coe_early_childhood": [
    {
      "name": "Early Childhood Care and Education (ECCE)",
      "code": "ECE",
      "programmes": [
        {
          "name": "NCE Early Childhood Care Education",
          "code": "NCE-ECE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "EDU",
        "PSY",
        "GST"
      ]
    },
    {
      "name": "Primary Education Studies (PES)",
      "code": "PES",
      "programmes": [
        {
          "name": "NCE Primary Education Studies",
          "code": "NCE-PES",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "EDU",
        "GST"
      ]
    }
  ],
  "coe_adult_nonformal": [
    {
      "name": "Adult and Non-Formal Education",
      "code": "ANF",
      "programmes": [
        {
          "name": "NCE Adult & Non-Formal Education",
          "code": "NCE-ANF",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "EDU",
        "SOC",
        "GST"
      ]
    },
    {
      "name": "Special Needs and Inclusive Education",
      "code": "SNE",
      "programmes": [
        {
          "name": "NCE Special Needs Education",
          "code": "NCE-SNE",
          "degreeType": "NCE",
          "durationYears": 3,
          "levels": [
            "NCE I",
            "NCE II",
            "NCE III"
          ]
        }
      ],
      "courseCodePrefixes": [
        "EDU",
        "PSY",
        "GST"
      ]
    }
  ],
  "basic_medical_sciences": [
    {
      "name": "Human Anatomy",
      "code": "ANA",
      "programmes": [
        {
          "name": "B.Sc Human Anatomy",
          "code": "BSC-ANA",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ANA",
        "PHS",
        "BCH",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Human Physiology",
      "code": "PHS",
      "programmes": [
        {
          "name": "B.Sc Human Physiology",
          "code": "BSC-PHS",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PHS",
        "ANA",
        "BCH",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Medical Biochemistry",
      "code": "MBC",
      "programmes": [
        {
          "name": "B.Sc Medical Biochemistry",
          "code": "BSC-MBC",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "BCH",
        "CHM",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Pharmacology and Therapeutics",
      "code": "PHT",
      "programmes": [
        {
          "name": "B.Sc Pharmacology",
          "code": "BSC-PHT",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PHA",
        "PHS",
        "BCH",
        "GST"
      ]
    }
  ],
  "clinical_sciences": [
    {
      "name": "Internal Medicine",
      "code": "MED",
      "programmes": [
        {
          "name": "MBBS Medicine & Surgery",
          "code": "MBBS",
          "degreeType": "MBBS",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MED",
        "ANA",
        "PHS",
        "PTH",
        "GST"
      ]
    },
    {
      "name": "Surgery",
      "code": "SUR",
      "programmes": [
        {
          "name": "MBBS Surgery",
          "code": "MBBS-SUR",
          "degreeType": "MBBS",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "SUR",
        "ANA",
        "GST"
      ]
    },
    {
      "name": "Paediatrics and Child Health",
      "code": "PAE",
      "programmes": [
        {
          "name": "MBBS Paediatrics",
          "code": "MBBS-PAE",
          "degreeType": "MBBS",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PAE",
        "MED",
        "GST"
      ]
    },
    {
      "name": "Obstetrics and Gynaecology",
      "code": "OBG",
      "programmes": [
        {
          "name": "MBBS Obstetrics & Gynaecology",
          "code": "MBBS-OBG",
          "degreeType": "MBBS",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "OBG",
        "SUR",
        "GST"
      ]
    },
    {
      "name": "Community Medicine and Primary Care",
      "code": "COM",
      "programmes": [
        {
          "name": "MBBS Community Medicine",
          "code": "MBBS-COM",
          "degreeType": "MBBS",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "COM",
        "MED",
        "GST"
      ]
    },
    {
      "name": "Anaesthesia and Intensive Care",
      "code": "ANS",
      "programmes": [
        {
          "name": "MBBS Anaesthesia",
          "code": "MBBS-ANS",
          "degreeType": "MBBS",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ANS",
        "PHA",
        "GST"
      ]
    },
    {
      "name": "Radiology and Radiodiagnosis",
      "code": "RAD",
      "programmes": [
        {
          "name": "MBBS Radiology",
          "code": "MBBS-RAD",
          "degreeType": "MBBS",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "RAD",
        "PHY",
        "GST"
      ]
    },
    {
      "name": "Psychiatry and Behavioural Medicine",
      "code": "PSY",
      "programmes": [
        {
          "name": "MBBS Psychiatry",
          "code": "MBBS-PSY",
          "degreeType": "MBBS",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PSY",
        "MED",
        "GST"
      ]
    },
    {
      "name": "Ophthalmology",
      "code": "OPH",
      "programmes": [
        {
          "name": "MBBS Ophthalmology",
          "code": "MBBS-OPH",
          "degreeType": "MBBS",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "OPH",
        "SUR",
        "GST"
      ]
    }
  ],
  "allied_health": [
    {
      "name": "Nursing Science",
      "code": "NUR",
      "programmes": [
        {
          "name": "B.N.Sc Nursing Science",
          "code": "BNSC-NUR",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "NUR",
        "ANA",
        "PHS",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Medical Laboratory Science",
      "code": "MLS",
      "programmes": [
        {
          "name": "B.MLS Medical Laboratory Science",
          "code": "BMLS",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MLS",
        "BCH",
        "MCB",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Physiotherapy & Medical Rehabilitation",
      "code": "PST",
      "programmes": [
        {
          "name": "B.MR / B.PT Physiotherapy",
          "code": "BPT",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PST",
        "ANA",
        "PHS",
        "PHY",
        "GST"
      ]
    },
    {
      "name": "Radiography and Radiation Science",
      "code": "RAD",
      "programmes": [
        {
          "name": "B.Sc Radiography",
          "code": "BSC-RAD",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "RAD",
        "PHY",
        "ANA",
        "GST"
      ]
    },
    {
      "name": "Optometry",
      "code": "OPT",
      "programmes": [
        {
          "name": "Doctor of Optometry (O.D)",
          "code": "OD-OPT",
          "degreeType": "MBBS",
          "durationYears": 6,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L",
            "600L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "OPT",
        "PHY",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Prosthetics and Orthotics",
      "code": "PNO",
      "programmes": [
        {
          "name": "B.Tech Prosthetics and Orthotics",
          "code": "BTECH-PNO",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PNO",
        "ANA",
        "ENG",
        "GST"
      ]
    },
    {
      "name": "Biomedical Technology",
      "code": "BMT",
      "programmes": [
        {
          "name": "B.Tech Biomedical Technology",
          "code": "BTECH-BMT",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ENG",
        "EEE",
        "PHY",
        "GST"
      ]
    }
  ],
  "public_health": [
    {
      "name": "Epidemiology and Medical Statistics",
      "code": "EMS",
      "programmes": [
        {
          "name": "B.Sc Public Health",
          "code": "BSC-PH",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "COM",
        "STA",
        "GST"
      ]
    },
    {
      "name": "Health Promotion and Education",
      "code": "HPE",
      "programmes": [
        {
          "name": "B.Sc Health Promotion & Education",
          "code": "BSC-HPE",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "COM",
        "EDU",
        "GST"
      ]
    },
    {
      "name": "Environmental Health Sciences",
      "code": "EHS",
      "programmes": [
        {
          "name": "B.Sc Environmental Health",
          "code": "BSC-EHS",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ENV",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Human Nutrition and Dietetics",
      "code": "HND",
      "programmes": [
        {
          "name": "B.Sc Human Nutrition & Dietetics",
          "code": "BSC-HND",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "BCH",
        "BIO",
        "CHM",
        "GST"
      ]
    },
    {
      "name": "Health Policy and Management",
      "code": "HPM",
      "programmes": [
        {
          "name": "B.Sc Health Policy & Management",
          "code": "BSC-HPM",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "COM",
        "PAD",
        "GST"
      ]
    }
  ],
  "renewable_natural_resources": [
    {
      "name": "Forest Resources Management",
      "code": "FRM",
      "programmes": [
        {
          "name": "B.Sc Forest Resources Management",
          "code": "BSC-FRM",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "FOR",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Wildlife and Ecotourism Management",
      "code": "WEM",
      "programmes": [
        {
          "name": "B.Sc Wildlife & Ecotourism",
          "code": "BSC-WEM",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "WEM",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Aquaculture and Fisheries Management",
      "code": "AFM",
      "programmes": [
        {
          "name": "B.Sc Aquaculture & Fisheries",
          "code": "BSC-AFM",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "FIS",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Wood and Paper Technology",
      "code": "WPT",
      "programmes": [
        {
          "name": "B.Sc Wood & Paper Technology",
          "code": "BSC-WPT",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "FOR",
        "CHM",
        "GST"
      ]
    },
    {
      "name": "Social and Environmental Forestry",
      "code": "SEF",
      "programmes": [
        {
          "name": "B.Sc Social & Environmental Forestry",
          "code": "BSC-SEF",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "FOR",
        "ENV",
        "GST"
      ]
    }
  ],
  "animal_science_specialized": [
    {
      "name": "Animal Breeding and Genetics",
      "code": "ABG",
      "programmes": [
        {
          "name": "B.Agric Animal Breeding & Genetics",
          "code": "BAGR-ABG",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ANS",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Animal Nutrition",
      "code": "ANN",
      "programmes": [
        {
          "name": "B.Agric Animal Nutrition",
          "code": "BAGR-ANN",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ANS",
        "BCH",
        "GST"
      ]
    },
    {
      "name": "Animal Physiology",
      "code": "ANP",
      "programmes": [
        {
          "name": "B.Agric Animal Physiology",
          "code": "BAGR-ANP",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ANS",
        "PHS",
        "GST"
      ]
    },
    {
      "name": "Animal Production and Health",
      "code": "APH",
      "programmes": [
        {
          "name": "B.Agric Animal Production & Health",
          "code": "BAGR-APH",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ANS",
        "VET",
        "GST"
      ]
    },
    {
      "name": "Pasture and Range Management",
      "code": "PRM",
      "programmes": [
        {
          "name": "B.Agric Pasture & Range Management",
          "code": "BAGR-PRM",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "ANS",
        "AGR",
        "GST"
      ]
    }
  ],
  "plant_crop_specialized": [
    {
      "name": "Crop Protection",
      "code": "CPP",
      "programmes": [
        {
          "name": "B.Agric Crop Protection",
          "code": "BAGR-CPP",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CRP",
        "BIO",
        "CHM",
        "GST"
      ]
    },
    {
      "name": "Horticulture",
      "code": "HRT",
      "programmes": [
        {
          "name": "B.Agric Horticulture",
          "code": "BAGR-HRT",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CRP",
        "AGR",
        "GST"
      ]
    },
    {
      "name": "Plant Breeding and Seed Technology",
      "code": "PBST",
      "programmes": [
        {
          "name": "B.Agric Plant Breeding & Seed Tech",
          "code": "BAGR-PBST",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CRP",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Plant Physiology and Crop Production",
      "code": "PPCP",
      "programmes": [
        {
          "name": "B.Agric Plant Physiology & Crop Prod",
          "code": "BAGR-PPCP",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "CRP",
        "BIO",
        "GST"
      ]
    },
    {
      "name": "Soil Science and Land Management",
      "code": "SSLM",
      "programmes": [
        {
          "name": "B.Agric Soil Science & Land Management",
          "code": "BAGR-SSLM",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "SOS",
        "CHM",
        "GST"
      ]
    }
  ],
  "food_human_ecology": [
    {
      "name": "Food Science and Technology",
      "code": "FST",
      "programmes": [
        {
          "name": "B.Sc Food Science & Technology",
          "code": "BSC-FST",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "FST",
        "CHM",
        "MCB",
        "GST"
      ]
    },
    {
      "name": "Home Science and Management",
      "code": "HSM",
      "programmes": [
        {
          "name": "B.Sc Home Science & Management",
          "code": "BSC-HSM",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "HSM",
        "ECO",
        "GST"
      ]
    },
    {
      "name": "Hospitality and Tourism",
      "code": "HTM",
      "programmes": [
        {
          "name": "B.Sc Hospitality & Tourism",
          "code": "BSC-HTM",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "HTM",
        "BUS",
        "GST"
      ]
    },
    {
      "name": "Nutrition and Dietetics",
      "code": "NTD",
      "programmes": [
        {
          "name": "B.Sc Nutrition and Dietetics",
          "code": "BSC-NTD",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "BCH",
        "BIO",
        "CHM",
        "GST"
      ]
    }
  ],
  "agric_mgt_rural_dev": [
    {
      "name": "Agricultural Economics and Farm Management",
      "code": "AEFM",
      "programmes": [
        {
          "name": "B.Agric Agricultural Economics",
          "code": "BAGR-AEFM",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "AGE",
        "ECO",
        "GST"
      ]
    },
    {
      "name": "Agricultural Extension and Rural Development",
      "code": "AERD",
      "programmes": [
        {
          "name": "B.Agric Agricultural Extension",
          "code": "BAGR-AERD",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "AGR",
        "SOC",
        "GST"
      ]
    },
    {
      "name": "Agricultural Administration",
      "code": "AGA",
      "programmes": [
        {
          "name": "B.Agric Agricultural Administration",
          "code": "BAGR-AGA",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PAD",
        "AGR",
        "GST"
      ]
    },
    {
      "name": "Communication and General Studies",
      "code": "CGNS",
      "programmes": [
        {
          "name": "B.Sc Agricultural Communication",
          "code": "BSC-AGC",
          "degreeType": "B.Sc",
          "durationYears": 4,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "MAS",
        "ENG",
        "GST"
      ]
    }
  ],
  "earth_mineral_sciences": [
    {
      "name": "Applied Geology",
      "code": "AGL",
      "programmes": [
        {
          "name": "B.Tech Applied Geology",
          "code": "BTECH-AGL",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "GLY",
        "PHY",
        "CHM",
        "GST"
      ]
    },
    {
      "name": "Applied Geophysics",
      "code": "AGP",
      "programmes": [
        {
          "name": "B.Tech Applied Geophysics",
          "code": "BTECH-AGP",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "GLY",
        "PHY",
        "MTH",
        "GST"
      ]
    },
    {
      "name": "Meteorology and Climate Science",
      "code": "MCS",
      "programmes": [
        {
          "name": "B.Tech Meteorology",
          "code": "BTECH-MCS",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "PHY",
        "MTH",
        "GST"
      ]
    },
    {
      "name": "Remote Sensing and Geospatial Information Science",
      "code": "RSG",
      "programmes": [
        {
          "name": "B.Tech Remote Sensing & GIS",
          "code": "BTECH-RSG",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "SVG",
        "CSC",
        "GST"
      ]
    },
    {
      "name": "Marine Science and Technology",
      "code": "MST",
      "programmes": [
        {
          "name": "B.Tech Marine Science",
          "code": "BTECH-MST",
          "degreeType": "B.Sc",
          "durationYears": 5,
          "levels": [
            "100L",
            "200L",
            "300L",
            "400L",
            "500L"
          ]
        }
      ],
      "courseCodePrefixes": [
        "BIO",
        "CHM",
        "GST"
      ]
    }
  ]
};

// Institutional statutory overrides for flagship institutions
export const FLAGSHIP_INSTITUTION_DEPARTMENTS: Record<string, Record<string, DepartmentTemplate[]>> = {
  'ui': {
    'Renewable Natural Resources': FACULTY_DEPARTMENT_TEMPLATES.renewable_natural_resources,
    'Public Health': FACULTY_DEPARTMENT_TEMPLATES.public_health,
    'Basic Medical Sciences': FACULTY_DEPARTMENT_TEMPLATES.basic_medical_sciences,
    'Clinical Sciences': FACULTY_DEPARTMENT_TEMPLATES.clinical_sciences,
    'Dentistry': FACULTY_DEPARTMENT_TEMPLATES.dentistry,
    'Pharmacy': FACULTY_DEPARTMENT_TEMPLATES.pharmacy,
    'Veterinary Medicine': FACULTY_DEPARTMENT_TEMPLATES.veterinary
  },
  'unilag': {
    'Basic Medical Sciences': FACULTY_DEPARTMENT_TEMPLATES.basic_medical_sciences,
    'Clinical Sciences': FACULTY_DEPARTMENT_TEMPLATES.clinical_sciences,
    'Dental Sciences': FACULTY_DEPARTMENT_TEMPLATES.dentistry,
    'Pharmacy': FACULTY_DEPARTMENT_TEMPLATES.pharmacy
  },
  'oau': {
    'Basic Medical Sciences': FACULTY_DEPARTMENT_TEMPLATES.basic_medical_sciences,
    'Clinical Sciences': FACULTY_DEPARTMENT_TEMPLATES.clinical_sciences,
    'Dentistry': FACULTY_DEPARTMENT_TEMPLATES.dentistry,
    'Pharmacy': FACULTY_DEPARTMENT_TEMPLATES.pharmacy
  },
  'abu': {
    'Basic Medical Sciences': FACULTY_DEPARTMENT_TEMPLATES.basic_medical_sciences,
    'Clinical Sciences': FACULTY_DEPARTMENT_TEMPLATES.clinical_sciences,
    'Dental Surgery': FACULTY_DEPARTMENT_TEMPLATES.dentistry,
    'Pharmaceutical Sciences': FACULTY_DEPARTMENT_TEMPLATES.pharmacy,
    'Veterinary Medicine': FACULTY_DEPARTMENT_TEMPLATES.veterinary
  },
  'funaab': {
    'Animal Science': FACULTY_DEPARTMENT_TEMPLATES.animal_science_specialized,
    'Plant Science': FACULTY_DEPARTMENT_TEMPLATES.plant_crop_specialized,
    'Food Science': FACULTY_DEPARTMENT_TEMPLATES.food_human_ecology,
    'Agricultural Management': FACULTY_DEPARTMENT_TEMPLATES.agric_mgt_rural_dev,
    'Veterinary Medicine': FACULTY_DEPARTMENT_TEMPLATES.veterinary
  },
  'futa': {
    'Earth and Mineral': FACULTY_DEPARTMENT_TEMPLATES.earth_mineral_sciences,
    'Computing': FACULTY_DEPARTMENT_TEMPLATES.computing_informatics,
    'Engineering': FACULTY_DEPARTMENT_TEMPLATES.engineering_university
  },
  'ncat_zaria': {
    'Flying School': FACULTY_DEPARTMENT_TEMPLATES.aviation_pilot,
    'Air Traffic': FACULTY_DEPARTMENT_TEMPLATES.aviation_atc,
    'Aircraft Maintenance': FACULTY_DEPARTMENT_TEMPLATES.aviation_maintenance,
    'Aeronautical Telecommunications': FACULTY_DEPARTMENT_TEMPLATES.aviation_telecom,
    'Aviation Management': FACULTY_DEPARTMENT_TEMPLATES.aviation_management
  },
  'man_oron': {
    'Nautical Studies': FACULTY_DEPARTMENT_TEMPLATES.maritime_nautical,
    'Marine Engineering': FACULTY_DEPARTMENT_TEMPLATES.maritime_engineering,
    'Maritime Transport': FACULTY_DEPARTMENT_TEMPLATES.maritime_transport
  },
  'pti_effurun': {
    'Offshore Studies': FACULTY_DEPARTMENT_TEMPLATES.petroleum_offshore,
    'Petroleum Technology': FACULTY_DEPARTMENT_TEMPLATES.petroleum_processing,
    'Industrial Safety': FACULTY_DEPARTMENT_TEMPLATES.industrial_safety
  },
  'adeyemi_tech_ondo': {
    'Engineering Technology': [
      {
        name: 'Computer Science',
        code: 'CSC',
        programmes: [
          {
            name: 'ND Computer Science',
            code: 'ND-CSC',
            degreeType: 'ND',
            durationYears: 2,
            levels: ['ND 1', 'ND 2']
          }
        ],
        courseCodePrefixes: ['COM', 'CSC', 'GNS', 'GST']
      },
      {
        name: 'Multimedia Technology',
        code: 'MMT',
        programmes: [
          {
            name: 'ND Multimedia Technology',
            code: 'ND-MMT',
            degreeType: 'ND',
            durationYears: 2,
            levels: ['ND 1', 'ND 2']
          }
        ],
        courseCodePrefixes: ['MMT', 'MED', 'GNS', 'GST']
      },
      {
        name: 'Software Engineering',
        code: 'SWE',
        programmes: [
          {
            name: 'ND Software Engineering',
            code: 'ND-SWE',
            degreeType: 'ND',
            durationYears: 2,
            levels: ['ND 1', 'ND 2']
          }
        ],
        courseCodePrefixes: ['SWE', 'SEN', 'COM', 'GNS', 'GST']
      },
      {
        name: 'Hardware Engineering',
        code: 'HWE',
        programmes: [
          {
            name: 'ND Hardware Engineering',
            code: 'ND-HWE',
            degreeType: 'ND',
            durationYears: 2,
            levels: ['ND 1', 'ND 2']
          }
        ],
        courseCodePrefixes: ['HWE', 'CTE', 'EEC', 'GNS', 'GST']
      }
    ]
  }
};

export function matchFacultyToTemplate(
  facultyName: string, 
  instType: string = 'University'
): DepartmentTemplate[] {
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
  if (isCOE || name.includes('education') || name.includes('teaching')) {
    if (name.includes('language') || name.includes('english') || name.includes('french') || name.includes('arabic')) return FACULTY_DEPARTMENT_TEMPLATES.coe_languages;
    if (name.includes('early childhood') || name.includes('primary')) return FACULTY_DEPARTMENT_TEMPLATES.coe_early_childhood;
    if (name.includes('technical')) return FACULTY_DEPARTMENT_TEMPLATES.coe_technical;
    if (name.includes('vocational') || name.includes('home economics')) return FACULTY_DEPARTMENT_TEMPLATES.coe_vocational;
    if (name.includes('science')) return FACULTY_DEPARTMENT_TEMPLATES.coe_sciences;
    if (name.includes('art') || name.includes('social') || name.includes('humanities')) return FACULTY_DEPARTMENT_TEMPLATES.coe_arts_social;
    if (name.includes('adult') || name.includes('non-formal') || name.includes('special')) return FACULTY_DEPARTMENT_TEMPLATES.coe_adult_nonformal;
    return FACULTY_DEPARTMENT_TEMPLATES.coe_education;
  }

  // 10. Polytechnics
  if (isPoly) {
    if (name.includes('art') || name.includes('design') || name.includes('printing')) return FACULTY_DEPARTMENT_TEMPLATES.poly_art_design;
    if (name.includes('environmental') || name.includes('built')) return FACULTY_DEPARTMENT_TEMPLATES.poly_environmental;
    if (name.includes('engineering') || (name.includes('technology') && !name.includes('information') && !name.includes('applied'))) return FACULTY_DEPARTMENT_TEMPLATES.poly_engineering;
    if (name.includes('information') || name.includes('computing') || name.includes('computer')) return FACULTY_DEPARTMENT_TEMPLATES.computing_informatics;
    if (name.includes('applied science') || name.includes('applied and natural') || name.includes('science and technology') || name.includes('applied')) return FACULTY_DEPARTMENT_TEMPLATES.poly_technology;
    if (name.includes('business') || name.includes('management') || name.includes('financial') || name.includes('account')) return FACULTY_DEPARTMENT_TEMPLATES.poly_management;
    if (name.includes('liberal') || name.includes('general') || name.includes('communication')) return FACULTY_DEPARTMENT_TEMPLATES.poly_liberal;
  }

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
}

// 1. Resolve Faculties for ANY Institution
export function resolveFacultiesForInstitution(inst: Institution): FacultyRecord[] {
  if (inst.faculties && inst.faculties.length > 0) {
    return inst.faculties.map((facName, index) => {
      const slug = facName.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 24);
      return {
        id: `fac_${inst.id}_${slug}_${index}`,
        name: facName,
        code: facName.split(' ').map(w => w[0]).filter(Boolean).join('').substring(0, 4).toUpperCase() || 'FAC',
        institutionId: inst.id,
        institutionName: inst.name,
        description: `Accredited division for academic programmes in ${facName} at ${inst.name}`
      };
    });
  }

  // Default fallback if no faculties specified
  return [
    {
      id: `fac_${inst.id}_gen`,
      name: 'Faculty of Academic Studies',
      code: 'FAS',
      institutionId: inst.id,
      institutionName: inst.name,
      description: `Academic programmes at ${inst.name}`
    }
  ];
}

// 2. Resolve Departments for ANY Faculty in ANY Institution
export function resolveDepartmentsForFaculty(
  fac: FacultyRecord, 
  inst: Institution
): DepartmentRecord[] {
  // Check flagship statutory overrides
  const instOverrides = FLAGSHIP_INSTITUTION_DEPARTMENTS[inst.id.toLowerCase()];
  if (instOverrides) {
    for (const [key, templates] of Object.entries(instOverrides)) {
      if (fac.name.toLowerCase().includes(key.toLowerCase())) {
        return templates.map((tmpl, idx) => ({
          id: `dept_${inst.id}_${fac.id}_${tmpl.code.toLowerCase()}_${idx}`,
          name: tmpl.name,
          code: tmpl.code,
          facultyId: fac.id,
          facultyName: fac.name,
          institutionId: inst.id,
          institutionName: inst.name
        }));
      }
    }
  }

  // Standard template resolution
  const templates = matchFacultyToTemplate(fac.name, inst.type);
  return templates.map((tmpl, idx) => ({
    id: `dept_${inst.id}_${fac.id}_${tmpl.code.toLowerCase()}_${idx}`,
    name: tmpl.name,
    code: tmpl.code,
    facultyId: fac.id,
    facultyName: fac.name,
    institutionId: inst.id,
    institutionName: inst.name
  }));
}

// Helper: Resolve all departments across all faculties of an institution
export function resolveAllDepartmentsForInstitution(inst: Institution): DepartmentRecord[] {
  const faculties = resolveFacultiesForInstitution(inst);
  const allDepts: DepartmentRecord[] = [];
  faculties.forEach(fac => {
    const depts = resolveDepartmentsForFaculty(fac, inst);
    allDepts.push(...depts);
  });
  return allDepts;
}

// 3. Resolve Programmes for Department
export function resolveProgrammesForDepartment(
  dept: DepartmentRecord, 
  inst: Institution
): ProgrammeRecord[] {
  const templates = matchFacultyToTemplate(dept.facultyName, inst.type);
  const matchedTmpl = templates.find(t => 
    t.name.toLowerCase() === dept.name.toLowerCase() || 
    t.code.toLowerCase() === dept.code.toLowerCase() ||
    dept.name.toLowerCase().includes(t.name.toLowerCase()) ||
    t.name.toLowerCase().includes(dept.name.toLowerCase())
  );

  if (matchedTmpl && matchedTmpl.programmes && matchedTmpl.programmes.length > 0) {
    return matchedTmpl.programmes.map(p => ({
      id: `prog_${dept.id}_${p.code.toLowerCase()}`,
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
    }));
  }

  const isPoly = inst.type.toLowerCase().includes('poly') || inst.type.toLowerCase().includes('technology');
  const isCOE = inst.type.toLowerCase().includes('education') || inst.type.toLowerCase().includes('coe');

  if (isPoly) {
    return [
      {
        id: `prog_${dept.id}_nd`,
        name: `ND ${dept.name}`,
        code: `ND-${dept.code}`,
        degreeType: 'ND',
        departmentId: dept.id,
        departmentName: dept.name,
        facultyId: dept.facultyId,
        facultyName: dept.facultyName,
        institutionId: inst.id,
        institutionName: inst.name,
        durationYears: 2,
        levels: ['ND I', 'ND II']
      },
      {
        id: `prog_${dept.id}_hnd`,
        name: `HND ${dept.name}`,
        code: `HND-${dept.code}`,
        degreeType: 'HND',
        departmentId: dept.id,
        departmentName: dept.name,
        facultyId: dept.facultyId,
        facultyName: dept.facultyName,
        institutionId: inst.id,
        institutionName: inst.name,
        durationYears: 2,
        levels: ['HND I', 'HND II']
      }
    ];
  } else if (isCOE) {
    return [
      {
        id: `prog_${dept.id}_nce`,
        name: `NCE ${dept.name}`,
        code: `NCE-${dept.code}`,
        degreeType: 'NCE',
        departmentId: dept.id,
        departmentName: dept.name,
        facultyId: dept.facultyId,
        facultyName: dept.facultyName,
        institutionId: inst.id,
        institutionName: inst.name,
        durationYears: 3,
        levels: ['NCE I', 'NCE II', 'NCE III']
      }
    ];
  }

  return [
    {
      id: `prog_${dept.id}_bsc`,
      name: `B.Sc ${dept.name}`,
      code: `BSC-${dept.code}`,
      degreeType: 'B.Sc',
      departmentId: dept.id,
      departmentName: dept.name,
      facultyId: dept.facultyId,
      facultyName: dept.facultyName,
      institutionId: inst.id,
      institutionName: inst.name,
      durationYears: 4,
      levels: ['100L', '200L', '300L', '400L']
    }
  ];
}

// 4. Resolve Courses for ANY Programme & Department in ANY Institution
export function resolveCoursesForProgramme(
  prog: ProgrammeRecord, 
  dept: DepartmentRecord, 
  inst: Institution
): CourseRecord[] {
  // Check Adeyemi College of Technology, Ondo custom curriculum
  if (inst.id === 'adeyemi_tech_ondo' || dept.institutionId === 'adeyemi_tech_ondo') {
    const actoMatches = ACTO_ENGINEERING_TECH_COURSES.filter(c => 
      c.department.toLowerCase().includes(dept.name.toLowerCase()) || 
      dept.name.toLowerCase().includes(c.department.toLowerCase())
    );
    if (actoMatches.length > 0) {
      return actoMatches.map(c => ({
        ...c,
        faculty: dept.facultyName,
        department: dept.name,
        programme: prog.name
      }));
    }
  }

  const templates = matchFacultyToTemplate(dept.facultyName, inst.type);
  const matchedTmpl = templates.find(t => 
    t.name.toLowerCase() === dept.name.toLowerCase() || 
    t.code.toLowerCase() === dept.code.toLowerCase() ||
    dept.name.toLowerCase().includes(t.name.toLowerCase()) ||
    t.name.toLowerCase().includes(dept.name.toLowerCase())
  );

  const targetPrefixes = matchedTmpl?.courseCodePrefixes || [dept.code, 'GST'];

  // Match relevant courses from COMPREHENSIVE_COURSES
  const matchingCourses = COMPREHENSIVE_COURSES.filter(c => {
    const codePrefix = c.courseCode.split(' ')[0].toUpperCase();
    const deptMatch = c.department.toLowerCase().includes(dept.name.toLowerCase()) || 
                      dept.name.toLowerCase().includes(c.department.toLowerCase());
    const facultyMatch = c.faculty.toLowerCase().includes(dept.facultyName.toLowerCase()) || 
                         dept.facultyName.toLowerCase().includes(c.faculty.toLowerCase());
    const prefixMatch = targetPrefixes.includes(codePrefix);

    return deptMatch || prefixMatch || (facultyMatch && c.isElective);
  });

  // Always include General Studies (GST) for 100L to 300L
  const gstCourses = COMPREHENSIVE_COURSES.filter(c => c.courseCode.startsWith('GST'));
  
  const courseMap = new Map<string, CourseRecord>();

  // Add matching disciplinary courses
  matchingCourses.forEach(c => {
    courseMap.set(c.courseCode, {
      ...c,
      id: `crs_${inst.id}_${c.courseCode.toLowerCase().replace(' ', '_')}`,
      institutionId: inst.id,
      institutionName: inst.name,
      faculty: dept.facultyName,
      department: dept.name,
      programme: prog.name
    });
  });

  // Add GST courses for corresponding levels
  gstCourses.forEach(c => {
    if (prog.levels.includes(c.level) && !courseMap.has(c.courseCode)) {
      courseMap.set(c.courseCode, {
        ...c,
        id: `crs_${inst.id}_${c.courseCode.toLowerCase().replace(' ', '_')}`,
        institutionId: inst.id,
        institutionName: inst.name,
        faculty: dept.facultyName,
        department: dept.name,
        programme: prog.name
      });
    }
  });

  const results = Array.from(courseMap.values());

  if (results.length < 4) {
    const fallbacks = COMPREHENSIVE_COURSES.filter(c => 
      c.courseCode.startsWith('GST') || 
      c.courseCode.startsWith('CSC') || 
      c.courseCode.startsWith('ENG')
    );
    fallbacks.forEach(c => {
      if (!courseMap.has(c.courseCode)) {
        courseMap.set(c.courseCode, {
          ...c,
          id: `crs_${inst.id}_${c.courseCode.toLowerCase().replace(' ', '_')}`,
          institutionId: inst.id,
          institutionName: inst.name,
          faculty: dept.facultyName,
          department: dept.name,
          programme: prog.name
        });
      }
    });
    return Array.from(courseMap.values());
  }

  return results;
}
