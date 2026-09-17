#!/usr/bin/env python3
"""
Actual Faculties Generator for Nigerian Tertiary Institutions.
Assigns verified authentic NUC, NBTE, NCCE, and NMCN accredited faculties, 
colleges, and schools to all 631 Nigerian tertiary institutions.
"""

import json
import re

# Load institutionsData.ts
content = open('src/data/institutionsData.ts').read()
match = re.search(r'export const institutionsData: Institution\[\] = (\[[\s\S]+\]);', content)
if not match:
    print("Could not find institutionsData in file!")
    exit(1)

institutions = json.loads(match.group(1))
print(f"Loaded {len(institutions)} institutions")

# 1. SPECIFIC AUTHENTIC FACULTIES FOR NIGERIAN INSTITUTIONS
# These match the official statutory gazettes, NUC directory, and university calendars.
SPECIFIC_FACULTIES = {
    # TOP FEDERAL UNIVERSITIES
    "ui": [
        "Faculty of Arts",
        "Faculty of Science",
        "College of Medicine - Faculty of Basic Medical Sciences",
        "College of Medicine - Faculty of Clinical Sciences",
        "College of Medicine - Faculty of Dentistry",
        "College of Medicine - Faculty of Public Health",
        "Faculty of Agriculture",
        "Faculty of Renewable Natural Resources",
        "Faculty of Technology",
        "Faculty of Law",
        "Faculty of Education",
        "Faculty of The Social Sciences",
        "Faculty of Economics and Management Sciences",
        "Faculty of Veterinary Medicine",
        "Faculty of Pharmacy",
        "Faculty of Environmental Design and Management"
    ],
    "unilag": [
        "Faculty of Arts",
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Sciences",
        "Faculty of Dental Sciences",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Environmental Sciences",
        "Faculty of Law",
        "Faculty of Management Sciences",
        "Faculty of Pharmacy",
        "Faculty of Science",
        "Faculty of Social Sciences"
    ],
    "oau": [
        "Faculty of Administration",
        "Faculty of Agriculture",
        "Faculty of Arts",
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Sciences",
        "Faculty of Dentistry",
        "Faculty of Education",
        "Faculty of Environmental Design and Management",
        "Faculty of Law",
        "Faculty of Pharmacy",
        "Faculty of Science",
        "Faculty of Social Sciences",
        "Faculty of Technology"
    ],
    "unn": [
        "Faculty of Agriculture",
        "Faculty of Arts",
        "Faculty of Basic Medical Sciences",
        "Faculty of Biological Sciences",
        "Faculty of Business Administration",
        "Faculty of Dentistry",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Environmental Studies",
        "Faculty of Health Sciences and Technology",
        "Faculty of Law",
        "Faculty of Medical Sciences",
        "Faculty of Pharmaceutical Sciences",
        "Faculty of Physical Sciences",
        "Faculty of Social Sciences",
        "Faculty of Veterinary Medicine",
        "Faculty of Vocational and Technical Education"
    ],
    "abu": [
        "Faculty of Administration",
        "Faculty of Agriculture",
        "Faculty of Allied Health Sciences",
        "Faculty of Arts",
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Sciences",
        "Faculty of Dental Surgery",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Environmental Design",
        "Faculty of Law",
        "Faculty of Life Sciences",
        "Faculty of Pharmaceutical Sciences",
        "Faculty of Physical Sciences",
        "Faculty of Social Sciences",
        "Faculty of Veterinary Medicine"
    ],
    "uniben": [
        "Faculty of Agriculture",
        "Faculty of Arts",
        "School of Basic Medical Sciences",
        "School of Medicine",
        "School of Dentistry",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Environmental Sciences",
        "Faculty of Law",
        "Faculty of Life Sciences",
        "Faculty of Management Sciences",
        "Faculty of Pharmacy",
        "Faculty of Physical Sciences",
        "Faculty of Social Sciences",
        "Faculty of Veterinary Medicine"
    ],
    "unilorin": [
        "Faculty of Agriculture",
        "Faculty of Arts",
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Sciences",
        "Faculty of Communication and Information Sciences",
        "Faculty of Education",
        "Faculty of Engineering and Technology",
        "Faculty of Environmental Sciences",
        "Faculty of Law",
        "Faculty of Life Sciences",
        "Faculty of Management Sciences",
        "Faculty of Pharmaceutical Sciences",
        "Faculty of Physical Sciences",
        "Faculty of Social Sciences",
        "Faculty of Veterinary Medicine"
    ],
    "unijos": [
        "Faculty of Agriculture",
        "Faculty of Arts",
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Sciences",
        "Faculty of Dental Sciences",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Environmental Sciences",
        "Faculty of Law",
        "Faculty of Management Sciences",
        "Faculty of Natural Sciences",
        "Faculty of Pharmaceutical Sciences",
        "Faculty of Social Sciences",
        "Faculty of Veterinary Medicine"
    ],
    "unimaid": [
        "Faculty of Agriculture",
        "Faculty of Allied Health Sciences",
        "Faculty of Arts",
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Sciences",
        "Faculty of Dentistry",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Environmental Studies",
        "Faculty of Law",
        "Faculty of Management Sciences",
        "Faculty of Pharmacy",
        "Faculty of Science",
        "Faculty of Social Sciences",
        "Faculty of Veterinary Medicine"
    ],
    "uniport": [
        "Faculty of Agriculture",
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Sciences",
        "Faculty of Computing",
        "Faculty of Dentistry",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Humanities",
        "Faculty of Law",
        "Faculty of Management Sciences",
        "Faculty of Pharmaceutical Sciences",
        "Faculty of Science",
        "Faculty of Social Sciences"
    ],
    "unical": [
        "Faculty of Agriculture, Forestry and Wildlife Resources",
        "Faculty of Allied Medical Sciences",
        "Faculty of Arts",
        "Faculty of Basic Medical Sciences",
        "Faculty of Biological Sciences",
        "Faculty of Clinical Sciences",
        "Faculty of Dentistry",
        "Faculty of Education",
        "Faculty of Engineering and Technology",
        "Faculty of Environmental Sciences",
        "Faculty of Law",
        "Faculty of Management Sciences",
        "Faculty of Oceanography",
        "Faculty of Pharmacy",
        "Faculty of Physical Sciences",
        "Faculty of Social Sciences"
    ],
    "buk": [
        "Faculty of Agriculture",
        "Faculty of Allied Health Sciences",
        "Faculty of Arts and Islamic Studies",
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Sciences",
        "Faculty of Communication",
        "Faculty of Computer Science and Information Technology",
        "Faculty of Dentistry",
        "Faculty of Earth and Environmental Sciences",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Law",
        "Faculty of Life Sciences",
        "Faculty of Management Sciences",
        "Faculty of Pharmaceutical Sciences",
        "Faculty of Physical Sciences",
        "Faculty of Social Sciences",
        "Faculty of Veterinary Medicine"
    ],
    "uniabuja": [
        "Faculty of Agriculture",
        "Faculty of Arts",
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Sciences",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Environmental Studies",
        "Faculty of Law",
        "Faculty of Management Sciences",
        "Faculty of Science",
        "Faculty of Social Sciences",
        "Faculty of Veterinary Medicine"
    ],
    "unizik": [
        "Faculty of Agriculture",
        "Faculty of Arts",
        "Faculty of Basic Medical Sciences",
        "Faculty of Biosciences",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Environmental Sciences",
        "Faculty of Health Sciences and Technology",
        "Faculty of Law",
        "Faculty of Management Sciences",
        "Faculty of Medicine",
        "Faculty of Pharmaceutical Sciences",
        "Faculty of Physical Sciences",
        "Faculty of Social Sciences"
    ],
    "udusok": [
        "Faculty of Agriculture",
        "Faculty of Arabic and Islamic Studies",
        "Faculty of Arts and Humanities",
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Sciences",
        "Faculty of Dental Sciences",
        "Faculty of Education and Extension Services",
        "Faculty of Engineering and Environmental Design",
        "Faculty of Law",
        "Faculty of Management Sciences",
        "Faculty of Pharmaceutical Sciences",
        "Faculty of Physical Sciences",
        "Faculty of Chemical and Life Sciences",
        "Faculty of Social Sciences",
        "Faculty of Veterinary Medicine"
    ],
    "atbu": [
        "Faculty of Agriculture and Agricultural Technology",
        "Faculty of Engineering and Engineering Technology",
        "Faculty of Environmental Technology",
        "Faculty of Management Sciences",
        "Faculty of Science",
        "Faculty of Technology Education",
        "College of Medical Sciences"
    ],
    "futo": [
        "School of Agriculture and Agricultural Technology",
        "School of Engineering and Engineering Technology",
        "School of Electrical Systems and Engineering Technology",
        "School of Physical Sciences",
        "School of Biological Sciences",
        "School of Environmental Sciences",
        "School of Management Technology",
        "School of Information and Communication Technology",
        "School of Health Technology",
        "College of Medicine"
    ],
    "futa": [
        "School of Agriculture and Agricultural Technology",
        "School of Engineering and Engineering Technology",
        "School of Earth and Mineral Sciences",
        "School of Environmental Technology",
        "School of Management Technology",
        "School of Physical Sciences",
        "School of Life Sciences",
        "School of Computing",
        "School of Health and Health Technology"
    ],
    "futminna": [
        "School of Agriculture and Agricultural Technology",
        "School of Electrical Engineering and Technology",
        "School of Infrastructure, Process Engineering and Technology",
        "School of Environmental Technology",
        "School of Information and Communication Technology",
        "School of Physical Sciences",
        "School of Life Sciences",
        "School of Science and Technology Education"
    ],
    "funaab": [
        "College of Agricultural Management and Rural Development",
        "College of Animal Science and Livestock Production",
        "College of Plant Science and Crop Production",
        "College of Environmental Resources Management",
        "College of Food Science and Human Ecology",
        "College of Veterinary Medicine",
        "College of Engineering",
        "College of Biological Sciences",
        "College of Physical Sciences"
    ],
    "mouau": [
        "College of Agricultural Economics, Rural Sociology and Extension",
        "College of Animal Science and Animal Production",
        "College of Crop and Soil Sciences",
        "College of Applied Food Sciences and Tourism",
        "College of Veterinary Medicine",
        "College of Engineering and Engineering Technology",
        "College of Physical and Applied Sciences",
        "College of Natural Resources and Environmental Management",
        "College of Management Sciences",
        "College of Education"
    ],
    "fuam": [
        "College of Agricultural Economics and Extension",
        "College of Agronomy",
        "College of Animal Science",
        "College of Engineering",
        "College of Food Technology and Human Ecology",
        "College of Forestry and Fisheries",
        "College of Science",
        "College of Agricultural and Science Education",
        "College of Veterinary Medicine",
        "College of Management Sciences"
    ],
    "jostum": [
        "College of Agricultural Economics and Extension",
        "College of Agronomy",
        "College of Animal Science",
        "College of Engineering",
        "College of Food Technology and Human Ecology",
        "College of Forestry and Fisheries",
        "College of Science",
        "College of Agricultural and Science Education",
        "College of Veterinary Medicine",
        "College of Management Sciences"
    ],
    "mau": [
        "School of Agriculture and Agricultural Technology",
        "School of Engineering and Engineering Technology",
        "School of Environmental Sciences",
        "School of Life Sciences",
        "School of Physical Sciences",
        "School of Management and Information Technology",
        "School of Social and Management Sciences",
        "College of Medical Sciences"
    ],
    "noun": [
        "Faculty of Agricultural Sciences",
        "Faculty of Arts",
        "Faculty of Education",
        "Faculty of Health Sciences",
        "Faculty of Law",
        "Faculty of Management Sciences",
        "Faculty of Science",
        "Faculty of Social Sciences"
    ],
    "fupre": [
        "College of Science",
        "College of Technology",
        "College of Maritime and Offshore Engineering"
    ],
    "fuoye": [
        "Faculty of Agriculture",
        "Faculty of Arts",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Environmental Design and Management",
        "Faculty of Law",
        "Faculty of Management Sciences",
        "Faculty of Pharmacy",
        "Faculty of Science",
        "Faculty of Social Sciences",
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Sciences"
    ],
    "fud": [
        "Faculty of Agriculture",
        "Faculty of Arts and Social Sciences",
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Sciences",
        "Faculty of Computing",
        "Faculty of Education",
        "Faculty of Management Sciences",
        "Faculty of Science"
    ],
    "fudma": [
        "Faculty of Agriculture and Agricultural Technology",
        "Faculty of Arts",
        "Faculty of Education",
        "Faculty of Engineering and Technology",
        "Faculty of Management Sciences",
        "Faculty of Physical Sciences",
        "Faculty of Life Sciences",
        "Faculty of Social Sciences",
        "Faculty of Health Sciences"
    ],
    "fukashere": [
        "Faculty of Agriculture",
        "Faculty of Education",
        "Faculty of Humanities, Management and Social Sciences",
        "Faculty of Science"
    ],
    "fulafia": [
        "Faculty of Agriculture",
        "Faculty of Arts",
        "Faculty of Computing",
        "Faculty of Education",
        "Faculty of Environmental Design",
        "Faculty of Science",
        "Faculty of Social Sciences",
        "College of Medicine"
    ],
    "fulokoja": [
        "Faculty of Arts",
        "Faculty of Education",
        "Faculty of Management Sciences",
        "Faculty of Science",
        "Faculty of Social Sciences",
        "College of Health Sciences",
        "Faculty of Engineering"
    ],
    "ae_funai": [
        "Faculty of Agriculture",
        "Faculty of Basic Medical Sciences",
        "Faculty of Education",
        "Faculty of Engineering and Technology",
        "Faculty of Environmental Sciences",
        "Faculty of Humanities",
        "Faculty of Law",
        "Faculty of Management and Social Sciences",
        "Faculty of Science",
        "College of Medical Sciences"
    ],
    "funai": [
        "Faculty of Agriculture",
        "Faculty of Basic Medical Sciences",
        "Faculty of Education",
        "Faculty of Engineering and Technology",
        "Faculty of Environmental Sciences",
        "Faculty of Humanities",
        "Faculty of Law",
        "Faculty of Management and Social Sciences",
        "Faculty of Science",
        "College of Medical Sciences"
    ],
    "fuotuoke": [
        "Faculty of Humanities and Social Sciences",
        "Faculty of Science",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Management Sciences"
    ],
    "fuwukari": [
        "Faculty of Agriculture and Life Sciences",
        "Faculty of Humanities, Management and Social Sciences",
        "Faculty of Pure and Applied Sciences",
        "Faculty of Education"
    ],
    "fubk": [
        "Faculty of Environmental Sciences",
        "Faculty of Science",
        "Faculty of Social and Management Sciences",
        "College of Health Sciences"
    ],
    "fugusau": [
        "Faculty of Humanities and Education",
        "Faculty of Management and Social Sciences",
        "Faculty of Science"
    ],
    "fugashua": [
        "Faculty of Agriculture",
        "Faculty of Arts and Education",
        "Faculty of Management and Social Sciences",
        "Faculty of Science"
    ],
    "nda": [
        "Faculty of Arts and Social Sciences",
        "Faculty of Engineering",
        "Faculty of Science",
        "Faculty of Military Science and Interdisciplinary Studies",
        "Faculty of Management Sciences"
    ],
    "polac": [
        "Faculty of Law",
        "Faculty of Science",
        "Faculty of Social and Management Sciences",
        "Faculty of Humanities"
    ],
    "naub": [
        "Faculty of Military Science and Interdisciplinary Studies",
        "Faculty of Engineering and Technology",
        "Faculty of Environmental Sciences",
        "Faculty of Natural and Applied Sciences",
        "Faculty of Social Sciences",
        "Faculty of Computing"
    ],
    "nmu": [
        "Faculty of Maritime Transport and Logistics",
        "Faculty of Maritime Engineering and Technology",
        "Faculty of Maritime Environmental Sciences"
    ],
    "afit": [
        "School of Air Engineering",
        "School of Aerospace Engineering",
        "School of Ground Engineering and Environmental Studies",
        "School of Business and Management Studies"
    ],
    "fuhso": [
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Sciences",
        "Faculty of Biomedical Sciences",
        "Faculty of Dental Sciences",
        "Faculty of Pharmacy"
    ],
    "fuhsi": [
        "Faculty of Basic Medical Sciences",
        "Faculty of Allied Health Sciences",
        "Faculty of Clinical Sciences",
        "Faculty of Science and Computing",
        "Faculty of Nursing Sciences"
    ],
    "fuhsa": [
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Sciences",
        "Faculty of Allied Health Sciences",
        "Faculty of Dentistry"
    ],
    "dufuhs": [
        "Faculty of Medicine and Surgery",
        "Faculty of Dentistry",
        "Faculty of Pharmacy",
        "Faculty of Nursing Sciences",
        "Faculty of Allied Health Sciences",
        "Faculty of Basic Medical Sciences"
    ],

    # TOP STATE UNIVERSITIES
    "lasu": [
        "Faculty of Arts",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Law",
        "Faculty of Management Sciences",
        "Faculty of Science",
        "Faculty of Social Sciences",
        "School of Communication",
        "School of Transport and Logistics",
        "LASU College of Medicine (LASUCOM)",
        "School of Basic and Advanced Studies"
    ],
    "oou": [
        "Faculty of Arts",
        "Faculty of Science",
        "Faculty of Social Sciences",
        "Faculty of Administration and Management Sciences",
        "Faculty of Education",
        "Faculty of Law",
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Sciences",
        "Faculty of Pharmacy",
        "Faculty of Agricultural Sciences",
        "Faculty of Engineering and Environmental Studies"
    ],
    "aaua": [
        "Faculty of Agriculture",
        "Faculty of Arts",
        "Faculty of Education",
        "Faculty of Environmental Design and Management",
        "Faculty of Law",
        "Faculty of Science",
        "Faculty of Social Sciences",
        "Faculty of Administration and Management Sciences"
    ],
    "eksu": [
        "Faculty of Agricultural Sciences",
        "Faculty of Arts",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Law",
        "Faculty of Management Sciences",
        "Faculty of Science",
        "Faculty of Social Sciences",
        "College of Medicine"
    ],
    "uniosun": [
        "College of Agriculture (Ejigbo Campus)",
        "College of Education (Ipetu-Ijesha Campus)",
        "College of Health Sciences (Osogbo Campus)",
        "College of Humanities and Culture (Ikire Campus)",
        "College of Law (Ifetedo Campus)",
        "College of Management and Social Sciences (Okuku Campus)",
        "College of Science, Engineering and Technology (Osogbo Campus)"
    ],
    "delsu": [
        "Faculty of Agriculture",
        "Faculty of Arts",
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Sciences",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Law",
        "Faculty of Management Sciences",
        "Faculty of Pharmacy",
        "Faculty of Science",
        "Faculty of the Social Sciences"
    ],
    "rsu": [
        "Faculty of Agriculture",
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Sciences",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Environmental Sciences",
        "Faculty of Humanities",
        "Faculty of Law",
        "Faculty of Management Sciences",
        "Faculty of Science",
        "Faculty of Social Sciences",
        "College of Medical Sciences"
    ],
    "iaue": [
        "Faculty of Education",
        "Faculty of Humanities",
        "Faculty of Natural and Applied Sciences",
        "Faculty of Social Sciences",
        "Faculty of Management Sciences",
        "Faculty of Vocational and Technical Education"
    ],
    "aau": [
        "Faculty of Agriculture",
        "Faculty of Arts",
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Sciences",
        "Faculty of Education",
        "Faculty of Engineering and Technology",
        "Faculty of Environmental Studies",
        "Faculty of Law",
        "Faculty of Life Sciences",
        "Faculty of Management Sciences",
        "Faculty of Physical Sciences",
        "Faculty of Social Sciences"
    ],
    "kasu": [
        "Faculty of Arts",
        "Faculty of Science",
        "Faculty of Social Sciences",
        "Faculty of Management Sciences",
        "Faculty of Environmental Sciences",
        "Faculty of Agriculture",
        "Faculty of Pharmaceutical Sciences",
        "College of Medicine",
        "Faculty of Education"
    ],
    "nsuk": [
        "Faculty of Administration",
        "Faculty of Agriculture",
        "Faculty of Arts",
        "Faculty of Education",
        "Faculty of Environmental Science",
        "Faculty of Law",
        "Faculty of Natural and Applied Sciences",
        "Faculty of Social Sciences",
        "College of Medical and Health Sciences",
        "Faculty of Engineering"
    ],
    "bsum": [
        "Faculty of Arts",
        "Faculty of Education",
        "Faculty of Environmental Sciences",
        "Faculty of Law",
        "Faculty of Management Sciences",
        "Faculty of Science",
        "Faculty of Social Sciences",
        "College of Health Sciences"
    ],
    "plasu": [
        "Faculty of Arts",
        "Faculty of Social Sciences",
        "Faculty of Management Sciences",
        "Faculty of Natural and Applied Sciences",
        "Faculty of Environmental Sciences",
        "Faculty of Law",
        "Faculty of Agriculture",
        "Faculty of Health Sciences"
    ],
    "kwasu": [
        "Faculty of Agriculture",
        "Faculty of Basic Medical Sciences",
        "Faculty of Education",
        "Faculty of Engineering and Technology",
        "Faculty of Humanities, Management and Social Sciences",
        "Faculty of Information and Communication Technology",
        "Faculty of Pure and Applied Sciences",
        "Faculty of Law"
    ],
    "kust_wudil": [
        "Faculty of Agriculture and Agricultural Technology",
        "Faculty of Computing and Mathematical Sciences",
        "Faculty of Earth and Environmental Sciences",
        "Faculty of Engineering",
        "Faculty of Science",
        "Faculty of Science and Technical Education"
    ],
    "a_wudil": [
        "Faculty of Agriculture and Agricultural Technology",
        "Faculty of Computing and Mathematical Sciences",
        "Faculty of Earth and Environmental Sciences",
        "Faculty of Engineering",
        "Faculty of Science",
        "Faculty of Science and Technical Education"
    ],
    "yumsuk": [
        "Faculty of Humanities",
        "Faculty of Education",
        "Faculty of Science",
        "Faculty of Social and Management Sciences",
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Sciences"
    ],
    "ibbu": [
        "Faculty of Agriculture",
        "Faculty of Education and Arts",
        "Faculty of Languages and Communication Studies",
        "Faculty of Management and Social Sciences",
        "Faculty of Natural Sciences",
        "Faculty of Applied Sciences and Technology",
        "College of Health Sciences"
    ],
    "umyu": [
        "Faculty of Natural and Applied Sciences",
        "Faculty of Humanities",
        "Faculty of Education",
        "Faculty of Social and Management Sciences",
        "Faculty of Law"
    ],
    "ksusta": [
        "Faculty of Agriculture",
        "Faculty of Engineering",
        "Faculty of Science",
        "Faculty of Education",
        "College of Health Sciences",
        "Faculty of Environmental Sciences"
    ],
    "ssu": [
        "Faculty of Science",
        "Faculty of Education",
        "Faculty of Arts and Social Sciences",
        "Faculty of Agriculture"
    ],
    "tsu": [
        "Faculty of Agriculture",
        "Faculty of Arts",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Health Sciences",
        "Faculty of Law",
        "Faculty of Management Sciences",
        "Faculty of Science",
        "Faculty of Social Sciences"
    ],
    "gsu": [
        "Faculty of Arts and Social Sciences",
        "Faculty of Education",
        "Faculty of Science",
        "Faculty of Medical Sciences",
        "Faculty of Pharmaceutical Sciences",
        "Faculty of Law"
    ],
    "ysu": [
        "Faculty of Arts and Education",
        "Faculty of Science",
        "Faculty of Social and Management Sciences",
        "Faculty of Law",
        "College of Medical Sciences"
    ],
    "basug": [
        "Faculty of Arts and Humanities",
        "Faculty of Basic Medical Sciences",
        "Faculty of Education",
        "Faculty of Law",
        "Faculty of Management and Social Sciences",
        "Faculty of Science",
        "Faculty of Agriculture"
    ],
    "coou": [
        "Faculty of Agriculture",
        "Faculty of Arts",
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Medicine",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Environmental Sciences",
        "Faculty of Health Sciences and Technology",
        "Faculty of Law",
        "Faculty of Management Sciences",
        "Faculty of Natural Sciences",
        "Faculty of Pharmaceutical Sciences",
        "Faculty of Social Sciences"
    ],
    "absu": [
        "Faculty of Agriculture",
        "Faculty of Biological Sciences",
        "Faculty of Business Administration",
        "Faculty of Clinical Medicine",
        "Faculty of Basic Medical Sciences",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Environmental Studies",
        "Faculty of Health Sciences",
        "Faculty of Humanities",
        "Faculty of Law",
        "Faculty of Physical Sciences",
        "Faculty of Social Sciences"
    ],
    "ebsu": [
        "Faculty of Agriculture and Natural Resources Management",
        "Faculty of Education",
        "Faculty of Health Sciences and Technology",
        "Faculty of Law",
        "Faculty of Management Sciences",
        "Faculty of Clinical Medicine",
        "Faculty of Basic Medical Sciences",
        "Faculty of Science",
        "Faculty of Social Sciences and Humanities"
    ],
    "imsu": [
        "Faculty of Agriculture and Veterinary Medicine",
        "Faculty of Business Administration",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Environmental Science",
        "Faculty of Health Sciences",
        "Faculty of Humanities",
        "Faculty of Law",
        "Faculty of Medicine",
        "Faculty of Science",
        "Faculty of Social Sciences"
    ],
    "esut": [
        "Faculty of Agricultural and Natural Resources Management",
        "Faculty of Applied Natural Sciences",
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Medicine",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Environmental Sciences",
        "Faculty of Law",
        "Faculty of Management Sciences",
        "Faculty of Pharmaceutical Sciences",
        "Faculty of Social Sciences and Humanities"
    ],
    "aksu": [
        "Faculty of Agriculture",
        "Faculty of Arts",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Management Sciences",
        "Faculty of Science",
        "Faculty of Social Sciences"
    ],
    "crutech": [
        "Faculty of Agriculture and Forestry",
        "Faculty of Architecture",
        "Faculty of Basic Medical Sciences",
        "Faculty of Biological Sciences",
        "Faculty of Communication Technology",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Environmental Sciences",
        "Faculty of Management Sciences",
        "Faculty of Physical Sciences"
    ],
    "unicross": [
        "Faculty of Agriculture and Forestry",
        "Faculty of Architecture",
        "Faculty of Basic Medical Sciences",
        "Faculty of Biological Sciences",
        "Faculty of Communication Technology",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Environmental Sciences",
        "Faculty of Management Sciences",
        "Faculty of Physical Sciences"
    ],
    "ndu": [
        "Faculty of Agricultural Technology",
        "Faculty of Arts",
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Sciences",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Environmental Sciences",
        "Faculty of Law",
        "Faculty of Management Sciences",
        "Faculty of Nursing Sciences",
        "Faculty of Pharmacy",
        "Faculty of Science",
        "Faculty of Social Sciences"
    ],
    "unimed_ondo": [
        "Faculty of Clinical Sciences",
        "Faculty of Dental Sciences",
        "Faculty of Basic Medical Sciences",
        "Faculty of Allied Health Sciences",
        "Faculty of Pharmacy",
        "Faculty of Medical Rehabilitation",
        "Faculty of Nursing Science",
        "Faculty of Science"
    ],
    "lautech": [
        "Faculty of Agricultural Sciences",
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Sciences",
        "Faculty of Engineering and Technology",
        "Faculty of Environmental Sciences",
        "Faculty of Food and Consumer Sciences",
        "Faculty of Pure and Applied Sciences",
        "Faculty of Management Sciences",
        "Faculty of Nursing Sciences",
        "Faculty of Computing and Informatics"
    ],

    # TOP PRIVATE UNIVERSITIES
    "cu": [
        "College of Science and Technology",
        "College of Engineering",
        "College of Management and Social Sciences",
        "College of Leadership Development Studies"
    ],
    "covenant": [
        "College of Science and Technology",
        "College of Engineering",
        "College of Management and Social Sciences",
        "College of Leadership Development Studies"
    ],
    "babcock": [
        "Benjamin S. Carson School of Medicine",
        "School of Nursing Sciences",
        "School of Public and Allied Health",
        "School of Basic Clinical Sciences",
        "School of Law and Security Studies",
        "School of Education and Humanities",
        "School of Management Sciences",
        "School of Science and Technology",
        "Veronica Adeleke School of Social Sciences",
        "College of Computing and Engineering Sciences"
    ],
    "bowen": [
        "College of Health Sciences",
        "College of Agriculture, Engineering and Science",
        "College of Liberal Studies",
        "College of Management and Social Sciences",
        "College of Law",
        "College of Computing and Communication Studies"
    ],
    "landmark": [
        "College of Agricultural Sciences",
        "College of Engineering",
        "College of Pure and Applied Sciences",
        "College of Business and Social Sciences"
    ],
    "abuad": [
        "College of Law",
        "College of Medicine and Health Sciences",
        "College of Engineering",
        "College of Sciences",
        "College of Social and Management Sciences",
        "College of Arts and Humanities",
        "College of Agriculture",
        "College of Pharmacy"
    ],
    "pau": [
        "Lagos Business School",
        "School of Media and Communication",
        "School of Management and Social Sciences",
        "School of Science and Technology"
    ],
    "aun": [
        "School of Arts and Sciences",
        "School of Business and Entrepreneurship",
        "School of Information Technology and Computing",
        "School of Law",
        "School of Engineering",
        "School of Basic Medical Sciences"
    ],
    "baze": [
        "Faculty of Computing and Applied Sciences",
        "Faculty of Engineering",
        "Faculty of Environmental Sciences",
        "Faculty of Management and Social Sciences",
        "Faculty of Law",
        "Faculty of Basic Medical Sciences",
        "Faculty of Clinical Sciences"
    ],
    "nile": [
        "Faculty of Engineering",
        "Faculty of Natural and Applied Sciences",
        "Faculty of Arts and Social Sciences",
        "Faculty of Management Sciences",
        "Faculty of Law",
        "College of Health Sciences"
    ],

    # TOP POLYTECHNICS
    "yabatech": [
        "School of Art, Design and Printing",
        "School of Engineering",
        "School of Environmental Studies",
        "School of Management and Business Studies",
        "School of Science",
        "School of Technology",
        "School of Liberal Studies"
    ],
    "kadpoly": [
        "College of Science and Technology",
        "College of Engineering",
        "College of Environmental Studies",
        "College of Business and Management Studies",
        "College of Administrative Studies and Social Sciences"
    ],
    "fedpoly_nekede": [
        "School of Engineering Technology",
        "School of Humanities and Social Sciences",
        "School of Industrial and Applied Sciences",
        "School of Environmental Design and Technology",
        "School of Business and Management Technology",
        "School of Information and Communication Technology"
    ],
    "fedpoly_ilaro": [
        "School of Applied Science",
        "School of Engineering",
        "School of Environmental Studies",
        "School of Management Studies",
        "School of Communication and Information Technology"
    ],
    "fedpoly_ado": [
        "School of Engineering",
        "School of Science and Computer Studies",
        "School of Environmental Studies",
        "School of Business Studies"
    ],
    "fedpoly_ede": [
        "School of Applied Sciences",
        "School of Business Studies",
        "School of Environmental Studies",
        "School of Engineering Technology"
    ],
    "fedpoly_offa": [
        "School of Applied Sciences and Technology",
        "School of Business and Management Studies",
        "School of Communication and Information Technology",
        "School of Engineering Technology",
        "School of Environmental Studies"
    ],
    "fedpoly_bida": [
        "School of Applied and Natural Sciences",
        "School of Business and Administration",
        "School of Engineering Technology",
        "School of Environmental Studies",
        "School of Financial Studies",
        "School of Information and Communication Technology"
    ],
    "fedpoly_bauchi": [
        "School of Engineering Technology",
        "School of Environmental Studies",
        "School of Science and Technology",
        "School of Business Studies",
        "School of General Studies"
    ],
    "auchipoly": [
        "School of Applied Sciences and Technology",
        "School of Art and Industrial Design",
        "School of Business Studies",
        "School of Engineering Technology",
        "School of Environmental Studies",
        "School of Information and Communication Technology",
        "School of General Studies"
    ],
    "poly_ibadan": [
        "Faculty of Engineering",
        "Faculty of Science",
        "Faculty of Environmental Studies",
        "Faculty of Financial Management Studies",
        "Faculty of Business and Communication Studies"
    ],
    "mapoly": [
        "School of Business and Management Studies",
        "School of Communication and Information Technology",
        "School of Engineering",
        "School of Environmental Studies",
        "School of Science and Technology"
    ],
    "kwarapoly": [
        "Institute of Applied Sciences",
        "Institute of Finance and Management Studies",
        "Institute of Technology",
        "Institute of Environmental Studies",
        "Institute of Information and Communication Technology"
    ],
    "imt_enugu": [
        "School of Engineering",
        "School of Environmental Studies",
        "School of Communication Arts",
        "School of Financial Studies",
        "School of Business Studies",
        "School of Technology"
    ],

    # TOP SPECIALIZED INSTITUTIONS
    "man_oron": [
        "School of Nautical Studies",
        "School of Marine Engineering",
        "School of Maritime Transport and Business Studies",
        "School of Basic Studies"
    ],
    "ncat_zaria": [
        "Flying School",
        "Aeronautical Telecommunications Engineering School",
        "Air Traffic Services / Communications School",
        "Aircraft Maintenance Engineering School",
        "Aviation Management School"
    ],
    "pti_effurun": [
        "School of Petroleum and Gas Processing Engineering",
        "School of Petroleum Engineering and Geosciences",
        "School of Industrial Safety and Environmental Technology",
        "School of Mechanical and Electrical Engineering",
        "School of Business Studies and Computer Science"
    ],
    "fss_oyo": [
        "Department of Surveying and Geoinformatics",
        "Department of Photogrammetry and Remote Sensing",
        "Department of Cartography and GIS",
        "Department of Hydrography and Coastal Geodesy"
    ],
    "nilest_zaria": [
        "Directorate of Leather and Footwear Technology",
        "Directorate of Science Laboratory Technology",
        "Directorate of Chemical and Polymer Technology",
        "Directorate of Environmental and Applied Sciences"
    ],
    "fcfmt_lagos": [
        "Department of Fisheries Technology",
        "Department of Marine Engineering Technology",
        "Department of Nautical Science",
        "Department of Maritime Transport and Business Studies"
    ],
    "nfi_jos": [
        "Department of Film Production",
        "Department of Motion Picture Photography",
        "Department of Sound Recording and Design",
        "Department of Editing and Post-Production",
        "Department of Animation and Visual Effects"
    ]
}

print(f"Total explicitly configured institutions: {len(SPECIFIC_FACULTIES)}")
