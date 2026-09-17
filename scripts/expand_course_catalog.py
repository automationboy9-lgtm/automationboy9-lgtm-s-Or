import json

COURSES = []

def add(code, title, unit, faculty, dept, prog, level, semester, desc, is_elective=False):
    COURSES.append({
        "id": f"crs_{code.lower().replace(' ', '_')}_{level.lower().replace(' ', '_')}",
        "courseCode": code,
        "courseTitle": title,
        "creditUnit": unit,
        "institutionId": "all",
        "institutionName": "National Standard (All Institutions)",
        "faculty": faculty,
        "department": dept,
        "programme": prog,
        "level": level,
        "semester": semester,
        "courseDescription": desc,
        "isElective": is_elective,
        "status": "Approved"
    })

# =========================================================================
# 1. GENERAL STUDIES (GST / GNS) - Universal Across All Nigerian Institutions
# =========================================================================
add("GST 111", "Communication in English I", 2, "General Studies", "General Studies", "All Programmes", "100L", "First Semester (Harmattan)", "Grammar mechanics, vocabulary development, listening comprehension, note-taking, sentence structures, and academic writing fundamentals.")
add("GST 112", "Nigerian Peoples and Culture", 2, "General Studies", "General Studies", "All Programmes", "100L", "First Semester (Harmattan)", "Study of Nigerian history, culture, ethical values, indigenous traditions, ethnic relations, and national unity.")
add("GST 113", "Philosophy, Logic and Human Existence", 2, "General Studies", "General Studies", "All Programmes", "100L", "First Semester (Harmattan)", "Introduction to philosophical inquiry, symbolic logic, critical thinking, fallacy detection, and ethical human existence.")
add("GST 121", "Communication in English II", 2, "General Studies", "General Studies", "All Programmes", "100L", "Second Semester (Rain/Omega)", "Advanced composition, research documentation styles (APA/MLA), term paper presentations, logical argumentation, and speech delivery.")
add("GST 122", "Use of Library, Study Skills and ICT", 2, "General Studies", "General Studies", "All Programmes", "100L", "Second Semester (Rain/Omega)", "Library organization, bibliographic citations, digital cataloging (OPAC), e-learning databases, and online academic research.")

add("GST 211", "Environment and Sustainable Development", 2, "General Studies", "General Studies", "All Programmes", "200L", "First Semester (Harmattan)", "Ecosystem dynamics, climate change, biodiversity preservation, pollution mitigation, waste management, and UN Sustainable Development Goals.")
add("GST 212", "Philosophy of Science and Applied Technology", 2, "General Studies", "General Studies", "All Programmes", "200L", "First Semester (Harmattan)", "Historical scientific revolutions, scientific methodology, epistemology, ethics of technological breakthroughs, and African indigenous knowledge.")
add("GST 222", "Peace Studies and Conflict Resolution", 2, "General Studies", "General Studies", "All Programmes", "200L", "Second Semester (Rain/Omega)", "Theories of conflict, ethnic & communal dispute mediation, alternative dispute resolution (ADR), peace-building, and international diplomacy.")
add("GST 223", "Introduction to Entrepreneurship Studies", 2, "General Studies", "General Studies", "All Programmes", "200L", "Second Semester (Rain/Omega)", "Entrepreneurial mindsets, opportunity identification, business models, feasibility research, and intellectual property rights in Nigeria.")

add("GST 311", "Venture Creation and Innovation", 2, "General Studies", "General Studies", "All Programmes", "300L", "First Semester (Harmattan)", "Hands-on venture incubation, business plan writing, product prototyping, digital marketing strategy, SME finance, and pitch decks.")
add("GST 312", "Leadership, Governance and Civic Responsibilities", 2, "General Studies", "General Studies", "All Programmes", "300L", "Second Semester (Rain/Omega)", "Civic duties, constitutional rights, anti-corruption frameworks, leadership ethics, public accountability, and community development.")

add("GST 411", "Research Methodology and Ethics", 2, "General Studies", "General Studies", "All Programmes", "400L", "First Semester (Harmattan)", "Qualitative and quantitative research designs, sampling techniques, statistical hypothesis testing, plagiarism avoidance, and academic publishing.")

# =========================================================================
# 2. COMPUTER SCIENCE, CYBERSECURITY & SOFTWARE ENGINEERING
# =========================================================================
add("CSC 101", "Introduction to Computer Science", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "100L", "First Semester (Harmattan)", "History of computing, hardware/software taxonomy, number systems (binary, octal, hex), boolean algebra, flowcharts, and system software.")
add("CSC 102", "Introduction to Problem Solving with Python", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "100L", "Second Semester (Rain/Omega)", "Variables, conditionals, loops, functions, lists, dictionaries, file I/O, error handling, and structured programming paradigms.")
add("MTH 101", "Elementary Mathematics I (Algebra & Trigonometry)", 3, "Faculty of Science", "Mathematics", "B.Sc Computer Science", "100L", "First Semester (Harmattan)", "Set theory, quadratic equations, polynomial functions, binomial theorem, trigonometric identities, complex numbers, and matrices.")
add("MTH 102", "Elementary Mathematics II (Calculus)", 3, "Faculty of Science", "Mathematics", "B.Sc Computer Science", "100L", "Second Semester (Rain/Omega)", "Limits, continuity, differentiation from first principles, chain rule, integration techniques, definite integrals, and application to rates of change.")
add("PHY 101", "General Physics I (Mechanics & Thermal Physics)", 3, "Faculty of Science", "Physics", "B.Sc Computer Science", "100L", "First Semester (Harmattan)", "Dimensional analysis, vectors, Newton's laws of motion, work, energy, rotational dynamics, gravitation, thermodynamics, and kinetic theory.")
add("PHY 102", "General Physics II (Electricity & Magnetism)", 3, "Faculty of Science", "Physics", "B.Sc Computer Science", "100L", "Second Semester (Rain/Omega)", "Electrostatics, Coulomb's law, electric fields, Gauss's theorem, capacitors, DC circuits, Kirchhoff's laws, magnetic forces, and Faraday's law.")

add("CSC 201", "Computer Programming I (Object-Oriented Java)", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "200L", "First Semester (Harmattan)", "Classes, objects, encapsulation, inheritance, polymorphism, abstract classes, interfaces, generic collections, and GUI development.")
add("CSC 202", "Computer Programming II (C/C++ Systems)", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "200L", "Second Semester (Rain/Omega)", "Pointers, dynamic memory allocation (malloc/free), structs, memory management, operator overloading, templates, and low-level system interactions.")
add("CSC 203", "Discrete Mathematics and Structures", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "200L", "First Semester (Harmattan)", "Propositional logic, predicate calculus, mathematical induction, relations, graph theory, trees, combinatorics, and automata theory.")
add("CSC 204", "Fundamentals of Data Structures", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "200L", "Second Semester (Rain/Omega)", "Arrays, linked lists, stacks, queues, binary search trees, hash tables, sorting algorithms, and Big-O computational complexity analysis.")
add("CSC 205", "Computer Architecture and Organization", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "200L", "First Semester (Harmattan)", "Logic gates, flip-flops, ALU design, register transfer language, instruction set architecture (MIPS/x86), memory hierarchy, and pipelining.")
add("CSC 206", "Introduction to Web Technologies & UI", 2, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "200L", "Second Semester (Rain/Omega)", "HTML5 semantic markup, CSS3 Flexbox/Grid, JavaScript DOM manipulation, asynchronous AJAX/Fetch API, and responsive web design.")

add("CSC 301", "Structured Software Engineering", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "300L", "First Semester (Harmattan)", "Software development lifecycles (Agile, Scrum, Waterfall), UML design diagrams, requirement engineering, testing strategies, and CI/CD.")
add("CSC 302", "Database Design and Management Systems (SQL/NoSQL)", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "300L", "Second Semester (Rain/Omega)", "Relational data model, ER modeling, SQL querying, normalization (1NF to BCNF), transaction ACID properties, indexing, and MongoDB NoSQL.")
add("CSC 303", "Operating Systems Internals & Concurrency", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "300L", "First Semester (Harmattan)", "Process management, CPU scheduling algorithms, threads, race conditions, semaphores, deadlock detection/prevention, and virtual memory paging.")
add("CSC 304", "Computer Networks and Data Communications", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "300L", "Second Semester (Rain/Omega)", "OSI and TCP/IP models, IPv4/IPv6 subnetting, routing protocols (OSPF/BGP), transport layer (TCP/UDP), socket programming, and Wireshark analysis.")
add("CSC 305", "Theory of Automata and Formal Languages", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "300L", "First Semester (Harmattan)", "Deterministic and nondeterministic finite automata, regular expressions, context-free grammars, pushdown automata, and Turing machines.")
add("CSC 306", "Cybersecurity, Cryptography and Network Defense", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "300L", "Second Semester (Rain/Omega)", "Symmetric/asymmetric encryption (AES, RSA), hashing (SHA-256), PKI, authentication protocols, firewalls, penetration testing, and ethical hacking.")
add("CSC 399", "Students Industrial Work Experience Scheme (SIWES)", 6, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "300L", "Second Semester (Rain/Omega)", "6-month mandatory full-time industrial internship placement in technology firms, IT departments, or telecommunication enterprises.")

add("CSC 401", "Artificial Intelligence and Machine Learning", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "400L", "First Semester (Harmattan)", "Heuristic search (A*), knowledge representation, supervised/unsupervised machine learning, neural networks, deep learning, and NLP.")
add("CSC 402", "Compiler Construction and Parsing Techniques", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "400L", "Second Semester (Rain/Omega)", "Lexical analysis (lex), syntax parsing (LL/LR parsers), semantic analysis, intermediate representation, code optimization, and code generation.")
add("CSC 403", "Distributed Computing and Cloud Systems", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "400L", "First Semester (Harmattan)", "Distributed architecture, RPC, REST/gRPC APIs, message queues, microservices, containerization (Docker, Kubernetes), and cloud hosting.")
add("CSC 404", "Mobile Application Development (Flutter/Android)", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "400L", "First Semester (Harmattan)", "Cross-platform mobile apps, state management, REST API integration, local SQLite storage, mobile push notifications, and device sensors.")
add("CSC 405", "Human-Computer Interaction and UI/UX Design", 2, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "400L", "Second Semester (Rain/Omega)", "Usability principles, design thinking, cognitive heuristics, wireframing, Figma prototyping, usability testing, and accessibility guidelines.")
add("CSC 499", "Final Year Capstone Research Project", 6, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "400L", "Second Semester (Rain/Omega)", "Independent original software engineering and research project under faculty supervision, culminating in defense, report, and system demo.")

# =========================================================================
# 3. FACULTY OF ENGINEERING & TECHNOLOGY
# =========================================================================
add("ENG 101", "Engineering Drawing and CAD I", 2, "Faculty of Engineering", "General Engineering", "B.Eng All Disciplines", "100L", "First Semester (Harmattan)", "Lettering, geometric constructions, orthographic projections, isometric views, sectioning, dimensioning, and AutoCAD 2D drafting.")
add("ENG 102", "Engineering Workshop Practice I", 2, "Faculty of Engineering", "General Engineering", "B.Eng All Disciplines", "100L", "Second Semester (Rain/Omega)", "Safety regulations, hand tools, benchwork, sheet metal fabrication, welding techniques, woodturning, and basic electrical wiring.")

add("ENG 201", "Engineering Mathematics I", 3, "Faculty of Engineering", "General Engineering", "B.Eng All Disciplines", "200L", "First Semester (Harmattan)", "Ordinary differential equations (ODEs), Laplace transforms, vector calculus, gradient, divergence, curl, and series expansions.")
add("ENG 202", "Engineering Mathematics II", 3, "Faculty of Engineering", "General Engineering", "B.Eng All Disciplines", "200L", "Second Semester (Rain/Omega)", "Partial differential equations (PDEs), Fourier series, complex variables, contour integration, and numerical methods for engineers.")
add("ENG 203", "Applied Mechanics and Strength of Materials", 3, "Faculty of Engineering", "General Engineering", "B.Eng All Disciplines", "200L", "First Semester (Harmattan)", "Force systems, trusses, centroids, moment of inertia, stress-strain relationships, shear force and bending moment diagrams.")
add("ENG 204", "Engineering Thermodynamics I", 3, "Faculty of Engineering", "General Engineering", "B.Eng All Disciplines", "200L", "Second Semester (Rain/Omega)", "First and second laws of thermodynamics, closed and open systems, ideal gas cycles, Carnot cycle, steam tables, and entropy analysis.")

add("EEE 201", "Circuit Theory and Analysis I", 3, "Faculty of Engineering", "Electrical Engineering", "B.Eng Electrical Engineering", "200L", "First Semester (Harmattan)", "Mesh and nodal analysis, Thevenin and Norton theorems, maximum power transfer, AC steady-state analysis, phasors, and resonance.")
add("EEE 202", "Basic Electronics and Semiconductor Devices", 3, "Faculty of Engineering", "Electrical Engineering", "B.Eng Electrical Engineering", "200L", "Second Semester (Rain/Omega)", "P-N junction diodes, BJT and MOSFET transistors, small-signal amplifier models, operational amplifiers (Op-Amps), and power supplies.")
add("EEE 301", "Electromagnetic Fields and Wave Propagation", 3, "Faculty of Engineering", "Electrical Engineering", "B.Eng Electrical Engineering", "300L", "First Semester (Harmattan)", "Maxwell's equations, electrostatic and magnetostatic boundary conditions, Poynting vector, plane wave propagation in media, and transmission lines.")
add("EEE 302", "Electric Power Systems and High Voltage Tech", 3, "Faculty of Engineering", "Electrical Engineering", "B.Eng Electrical Engineering", "300L", "Second Semester (Rain/Omega)", "Power generation, transmission line modeling, per-unit system, load flow analysis (Gauss-Seidel/Newton-Raphson), and fault calculations.")
add("EEE 303", "Control Systems Engineering and Feedback", 3, "Faculty of Engineering", "Electrical Engineering", "B.Eng Electrical Engineering", "300L", "First Semester (Harmattan)", "Open-loop/closed-loop systems, transfer functions, block diagram reduction, Routh-Hurwitz stability, Root Locus, and Bode plot frequency response.")
add("EEE 401", "Telecommunication Systems and DSP", 3, "Faculty of Engineering", "Electrical Engineering", "B.Eng Electrical Engineering", "400L", "First Semester (Harmattan)", "Analog/digital modulation (AM, FM, QAM), sampling theorem, Discrete Fourier Transform (DFT/FFT), FIR/IIR digital filter design, and satellite comms.")
add("EEE 402", "Power Electronics and Industrial Drives", 3, "Faculty of Engineering", "Electrical Engineering", "B.Eng Electrical Engineering", "400L", "Second Semester (Rain/Omega)", "Thyristors, TRIACs, IGBT switches, DC-DC buck/boost converters, single/three-phase inverters, and variable frequency motor speed drives.")

add("MEE 301", "Fluid Mechanics and Hydraulic Machines", 3, "Faculty of Engineering", "Mechanical Engineering", "B.Eng Mechanical Engineering", "300L", "First Semester (Harmattan)", "Fluid statics, Bernoulli equation, Navier-Stokes equations, laminar and turbulent pipe flow, boundary layer theory, pumps, and turbines.")
add("MEE 302", "Theory of Machines and Kinematics", 3, "Faculty of Engineering", "Mechanical Engineering", "B.Eng Mechanical Engineering", "300L", "Second Semester (Rain/Omega)", "Kinematic pairs, velocity and acceleration diagrams, gear trains, cams and followers, balancing of rotating masses, and gyroscopic couples.")
add("MEE 401", "Heat and Mass Transfer", 3, "Faculty of Engineering", "Mechanical Engineering", "B.Eng Mechanical Engineering", "400L", "First Semester (Harmattan)", "Steady/unsteady conduction, Fourier law, free and forced convection, radiation heat transfer, blackbody radiation, and heat exchanger design.")
add("MEE 402", "Machine Design and Failure Prevention", 3, "Faculty of Engineering", "Mechanical Engineering", "B.Eng Mechanical Engineering", "400L", "Second Semester (Rain/Omega)", "Design of shafts, keys, couplings, springs, threaded fasteners, journal bearings, fatigue failure theories, and finite element modeling (FEM).")

add("CVE 201", "Civil Engineering Surveying I", 3, "Faculty of Engineering", "Civil Engineering", "B.Eng Civil Engineering", "200L", "First Semester (Harmattan)", "Chain surveying, compass surveying, leveling, contouring, theodolite traverse, and calculation of land areas.")
add("CVE 301", "Structural Mechanics & Determinate Trusses", 3, "Faculty of Engineering", "Civil Engineering", "B.Eng Civil Engineering", "300L", "First Semester (Harmattan)", "Analysis of determinate beams, frames, and trusses; influence lines, deflection using virtual work, and energy methods.")
add("CVE 302", "Soil Mechanics & Foundation Engineering I", 3, "Faculty of Engineering", "Civil Engineering", "B.Eng Civil Engineering", "300L", "Second Semester (Rain/Omega)", "Soil composition, classification (USCS/AASHTO), permeability, seepage flow nets, effective stress principle, and consolidation testing.")
add("CVE 401", "Reinforced Concrete & Steel Design", 4, "Faculty of Engineering", "Civil Engineering", "B.Eng Civil Engineering", "400L", "First Semester (Harmattan)", "Limit state design to BS 8110/Eurocode 2, design of beams, slabs, columns, pad footings, and structural steel connections.")
add("CVE 402", "Highway & Transportation Engineering", 3, "Faculty of Engineering", "Civil Engineering", "B.Eng Civil Engineering", "400L", "Second Semester (Rain/Omega)", "Geometric highway design, pavement materials (bitumen, asphalt), traffic volume studies, flexible/rigid pavement design, and road drainage.")

add("ENG 501", "Engineering Management, Law and Professional Ethics", 2, "Faculty of Engineering", "General Engineering", "B.Eng All Disciplines", "500L", "First Semester (Harmattan)", "COREN/NSE codes of practice, project management (PERT/CPM), contract law, arbitration, occupational health and safety, and EIA.")
add("ENG 599", "Final Year Engineering Capstone Design Project", 6, "Faculty of Engineering", "General Engineering", "B.Eng All Disciplines", "500L", "Second Semester (Rain/Omega)", "Comprehensive design, simulation, physical prototyping, testing, and technical defense of a complex real-world engineering system.")

# =========================================================================
# 4. MEDICINE, NURSING, PHARMACY & BASIC MEDICAL SCIENCES
# =========================================================================
add("BIO 101", "General Biology I (Cell Biology & Genetics)", 3, "Faculty of Science", "Biological Sciences", "Pre-Medicine & Health Sciences", "100L", "First Semester (Harmattan)", "Cell structure, organelles, membrane transport, mitosis, meiosis, Mendelian inheritance, molecular genetics, and taxonomy.")
add("BIO 102", "General Biology II (Botany & Zoology)", 3, "Faculty of Science", "Biological Sciences", "Pre-Medicine & Health Sciences", "100L", "Second Semester (Rain/Omega)", "Plant morphology, photosynthesis, transpiration, animal organ systems (digestive, respiratory, circulatory, nervous), and ecology.")
add("CHM 101", "General Chemistry I (Physical & Inorganic)", 3, "Faculty of Science", "Chemical Sciences", "Pre-Medicine & Health Sciences", "100L", "First Semester (Harmattan)", "Atomic structure, periodic trends, chemical bonding, stoichiometry, gas laws, chemical equilibria, acids/bases, and thermochemistry.")
add("CHM 102", "General Chemistry II (Organic Chemistry)", 3, "Faculty of Science", "Chemical Sciences", "Pre-Medicine & Health Sciences", "100L", "Second Semester (Rain/Omega)", "Functional groups, hybridization, alkanes, alkenes, alkynes, aromatic compounds, stereochemistry, substitution, and elimination reactions.")

add("ANA 201", "Gross Anatomy of the Upper & Lower Limbs", 4, "College of Medicine", "Anatomy", "MBBS / B.N.Sc / B.Pharm", "200L", "First Semester (Harmattan)", "Osteology, muscular attachments, neurovascular bundles, joints, fascial compartments, and clinical surface anatomy of the limbs.")
add("ANA 202", "Gross Anatomy of the Thorax, Abdomen & Pelvis", 4, "College of Medicine", "Anatomy", "MBBS / B.N.Sc / B.Pharm", "200L", "Second Semester (Rain/Omega)", "Pleura, lungs, heart, mediastinum, abdominal viscera, peritoneal cavity, pelvic organs, perineum, and clinical correlate anatomy.")
add("PHS 201", "General & Blood Physiology", 3, "College of Medicine", "Physiology", "MBBS / B.N.Sc / B.Pharm", "200L", "First Semester (Harmattan)", "Cellular membrane potential, homeostasis, red blood cells, hemoglobin, white blood cells, immunity, hemostasis, and blood transfusion.")
add("PHS 202", "Cardiovascular & Respiratory Physiology", 3, "College of Medicine", "Physiology", "MBBS / B.N.Sc / B.Pharm", "200L", "Second Semester (Rain/Omega)", "Cardiac cycle, ECG interpretation, blood pressure regulation, microcirculation, pulmonary ventilation, gas transport, and hypoxia.")
add("BCH 201", "General Biochemistry & Biomolecules", 3, "College of Medicine", "Biochemistry", "MBBS / B.N.Sc / B.Pharm", "200L", "First Semester (Harmattan)", "Structure and properties of amino acids, proteins, carbohydrates, lipids, nucleic acids, enzyme kinetics, and vitamins/coenzymes.")
add("BCH 202", "Intermediary Metabolism & Bioenergetics", 3, "College of Medicine", "Biochemistry", "MBBS / B.N.Sc / B.Pharm", "200L", "Second Semester (Rain/Omega)", "Glycolysis, citric acid cycle, oxidative phosphorylation, glycogen metabolism, gluconeogenesis, beta-oxidation of fatty acids, and urea cycle.")

add("PHA 301", "General Pharmacology & Pharmacokinetics", 3, "College of Medicine", "Pharmacology", "MBBS / B.N.Sc / B.Pharm", "300L", "First Semester (Harmattan)", "Drug absorption, distribution, metabolism, excretion (ADME), drug-receptor interactions, dose-response curves, and adverse drug reactions.")
add("PHA 302", "Autonomic & Cardiovascular Pharmacology", 3, "College of Medicine", "Pharmacology", "MBBS / B.N.Sc / B.Pharm", "300L", "Second Semester (Rain/Omega)", "Sympathomimetics, parasympatholytics, antihypertensive drugs, diuretics, antianginals, antiarrhythmics, and lipid-lowering agents.")
add("PTH 301", "General Pathology & Cell Injury", 3, "College of Medicine", "Pathology", "MBBS / B.N.Sc / B.Pharm", "300L", "First Semester (Harmattan)", "Cellular adaptations, necrosis, apoptosis, acute and chronic inflammation, wound healing, hemodynamic disorders, and neoplasia.")
add("MCB 301", "Medical Microbiology & Immunology", 3, "College of Medicine", "Medical Microbiology", "MBBS / B.N.Sc / B.Pharm", "300L", "First Semester (Harmattan)", "Bacterial pathogenesis, viral replication, fungal infections, innate/adaptive immunity, antigen-antibody reactions, and diagnostic serology.")

add("NUR 201", "Introduction to Professional Nursing & History", 2, "College of Medicine", "Nursing Science", "B.N.Sc Nursing", "200L", "First Semester (Harmattan)", "Evolution of modern nursing (Florence Nightingale, Kofoworola Pratt), nursing ethical codes, legal responsibilities, and therapeutic communication.")
add("NUR 202", "Health Assessment & Clinical Physical Examination", 3, "College of Medicine", "Nursing Science", "B.N.Sc Nursing", "200L", "Second Semester (Rain/Omega)", "Comprehensive health history taking, head-to-toe physical assessment techniques, vital signs analysis, and diagnostic documentation.")
add("NUR 301", "Foundations of Nursing Practice & Clinical Skills", 3, "College of Medicine", "Nursing Science", "B.N.Sc Nursing", "300L", "First Semester (Harmattan)", "Nursing process (assessment, diagnosis, planning, intervention, evaluation), vital signs monitoring, aseptic wound dressings, and catheterization.")
add("NUR 302", "Medical-Surgical Nursing I", 4, "College of Medicine", "Nursing Science", "B.N.Sc Nursing", "300L", "Second Semester (Rain/Omega)", "Pathophysiology and holistic nursing care of patients with respiratory, cardiovascular, endocrine, and gastrointestinal diseases.")
add("NUR 401", "Maternal, Child Health & Midwifery Nursing", 4, "College of Medicine", "Nursing Science", "B.N.Sc Nursing", "400L", "First Semester (Harmattan)", "Antenatal care, stages of normal labor, partograph monitoring, obstetric emergencies, neonatal resuscitation, and family planning.")
add("NUR 402", "Community Health & Public Health Nursing", 4, "College of Medicine", "Nursing Science", "B.N.Sc Nursing", "400L", "Second Semester (Rain/Omega)", "Primary health care principles, epidemiology of infectious diseases, immunization schedules, home visits, school health, and sanitation.")

add("MED 401", "Clinical Medicine & Patient Bedside Examination", 5, "College of Medicine", "Medicine", "MBBS Medicine & Surgery", "400L", "First Semester (Harmattan)", "History taking, systemic clinical physical examination, differential diagnoses formulation, diagnostic lab ordering, and inpatient ward rounds.")
add("SUR 401", "Principles of Surgery & Operative Techniques", 5, "College of Medicine", "Surgery", "MBBS Medicine & Surgery", "400L", "Second Semester (Rain/Omega)", "Surgical asepsis, wound management, trauma and burn resuscitation, pre/post-operative care, fluid balance, and surgical theater etiquette.")
add("PHM 401", "Medicinal Chemistry & Pharmaceutical Formulation", 4, "Faculty of Pharmacy", "Pharmaceutics", "B.Pharm Pharmacy", "400L", "First Semester (Harmattan)", "Drug synthesis, structure-activity relationships (SAR), solid dosage formulation (tablets, capsules), sterile compounding, and stability testing.")
add("MLS 301", "Clinical Chemistry & Enzymology", 3, "College of Medicine", "Medical Laboratory Science", "B.MLS Medical Laboratory Science", "300L", "First Semester (Harmattan)", "Serum electrolytes, renal function tests (urea, creatinine), liver enzymes (ALT, AST, ALP), automated biochemistry analyzers, and quality control.")
add("MLS 401", "Hematology & Blood Transfusion Science", 4, "College of Medicine", "Medical Laboratory Science", "B.MLS Medical Laboratory Science", "400L", "First Semester (Harmattan)", "Blood film preparation, differential leukocyte counts, coagulation assays, ABO/Rh typing, crossmatching, and blood banking standards.")

# =========================================================================
# 5. FACULTY OF LAW (LL.B)
# =========================================================================
add("LAW 101", "Legal Method I", 3, "Faculty of Law", "Law", "LL.B Bachelor of Laws", "100L", "First Semester (Harmattan)", "Definition of law, classification of law, sources of Nigerian law (Constitution, statutes, case law, customary law, Islamic law), and court hierarchy.")
add("LAW 102", "Legal Method II & Judicial Precedent", 3, "Faculty of Law", "Law", "LL.B Bachelor of Laws", "100L", "Second Semester (Rain/Omega)", "Doctrine of stare decisis, ratio decidendi, obiter dicta, statutory interpretation rules (literal, golden, mischief), and legal reasoning.")

add("LAW 201", "Nigerian Constitutional Law I", 4, "Faculty of Law", "Public Law", "LL.B Bachelor of Laws", "200L", "First Semester (Harmattan)", "Constitutional supremacy, separation of powers, rule of law, federalism, executive powers, legislative functions, and judicial review.")
add("LAW 202", "Nigerian Constitutional Law II (Fundamental Rights)", 4, "Faculty of Law", "Public Law", "LL.B Bachelor of Laws", "200L", "Second Semester (Rain/Omega)", "Chapter IV 1999 Constitution fundamental rights (life, liberty, fair hearing, privacy, speech, assembly), enforcement procedures, and emergency powers.")
add("LAW 203", "Law of Contract I", 4, "Faculty of Law", "Commercial Law", "LL.B Bachelor of Laws", "200L", "First Semester (Harmattan)", "Offer and acceptance, consideration, intention to create legal relations, capacity to contract, terms of contract, and privity.")
add("LAW 204", "Law of Contract II (Vitiating Elements & Remedies)", 4, "Faculty of Law", "Commercial Law", "LL.B Bachelor of Laws", "200L", "Second Semester (Rain/Omega)", "Mistake, misrepresentation, duress, undue influence, illegality, discharge of contracts, and remedies (damages, specific performance, injunction).")
add("LAW 205", "Nigerian Legal System", 3, "Faculty of Law", "Jurisprudence", "LL.B Bachelor of Laws", "200L", "First Semester (Harmattan)", "Civil and criminal court jurisdictions, legal aid, police powers, bail administration, and legal education/profession in Nigeria.")

add("LAW 301", "Criminal Law I (General Principles)", 4, "Faculty of Law", "Public Law", "LL.B Bachelor of Laws", "300L", "First Semester (Harmattan)", "Criminal Code and Penal Code comparisons, actus reus, mens rea, strict liability, general defenses (insanity, self-defense, intoxication, mistake).")
add("LAW 302", "Criminal Law II (Specific Offenses)", 4, "Faculty of Law", "Public Law", "LL.B Bachelor of Laws", "300L", "Second Semester (Rain/Omega)", "Homicide (murder, manslaughter), assault, sexual offenses, theft, robbery, burglary, forgery, obtaining by false pretenses, and treason.")
add("LAW 303", "Law of Torts I", 4, "Faculty of Law", "Private Law", "LL.B Bachelor of Laws", "300L", "First Semester (Harmattan)", "Nature of torts, trespass to person (assault, battery, false imprisonment), trespass to land, negligence (duty of care, breach, causation, damages).")
add("LAW 304", "Law of Torts II", 4, "Faculty of Law", "Private Law", "LL.B Bachelor of Laws", "300L", "Second Semester (Rain/Omega)", "Occupiers' liability, nuisance, Rylands v. Fletcher strict liability, defamation (libel, slander, defenses), vicarious liability, and economic torts.")
add("LAW 305", "Commercial Law I (Sale of Goods & Agency)", 4, "Faculty of Law", "Commercial Law", "LL.B Bachelor of Laws", "300L", "First Semester (Harmattan)", "Sale of Goods Act, transfer of property, nemo dat exceptions, duties of buyer and seller, creation of agency, and rights/duties of principal and agent.")

add("LAW 401", "Land Law I (Customary Land Tenure)", 4, "Faculty of Law", "Private Law", "LL.B Bachelor of Laws", "400L", "First Semester (Harmattan)", "Customary land ownership, family property, communal land tenure, alienability, pledge, customary tenancy, and devolution of estates.")
add("LAW 402", "Land Law II (Land Use Act 1978)", 4, "Faculty of Law", "Private Law", "LL.B Bachelor of Laws", "400L", "Second Semester (Rain/Omega)", "Land Use Act 1978, Governor's consent, right of occupancy (statutory vs. customary), revocation, compensation, and mortgages.")
add("LAW 403", "Company Law and Corporate Governance (CAMA 2020)", 4, "Faculty of Law", "Commercial Law", "LL.B Bachelor of Laws", "400L", "First Semester (Harmattan)", "Incorporation of companies, separate legal personality (Salomon doctrine), memo/articles of association, directors' duties, shareholder rights, and winding up.")
add("LAW 404", "Law of Evidence I", 4, "Faculty of Law", "Procedural Law", "LL.B Bachelor of Laws", "400L", "First Semester (Harmattan)", "Evidence Act 2011, admissibility of relevance, direct/hearsay evidence, confessions, character evidence, judicial notice, and burden of proof.")
add("LAW 405", "Law of Evidence II", 4, "Faculty of Law", "Procedural Law", "LL.B Bachelor of Laws", "400L", "Second Semester (Rain/Omega)", "Documentary and electronic evidence admissibility, competence and compellability of witnesses, examination-in-chief, cross-examination, and estoppel.")

# =========================================================================
# 6. FACULTY OF MANAGEMENT SCIENCES & ADMINISTRATION
# =========================================================================
add("ACC 101", "Principles of Financial Accounting I", 3, "Faculty of Management Sciences", "Accounting", "B.Sc Accounting", "100L", "First Semester (Harmattan)", "Accounting concepts, conventions, double-entry bookkeeping, ledger accounts, trial balance, and accounting for cash transactions.")
add("ACC 102", "Principles of Financial Accounting II", 3, "Faculty of Management Sciences", "Accounting", "B.Sc Accounting", "100L", "Second Semester (Rain/Omega)", "Final accounts of sole traders, adjustments (accruals, prepayments, depreciation, bad debts), bank reconciliation statements, and correction of errors.")
add("BUS 101", "Introduction to Business Management", 3, "Faculty of Management Sciences", "Business Administration", "B.Sc Business Administration", "100L", "First Semester (Harmattan)", "Forms of business ownership, management functions (planning, organizing, leading, controlling), business environment, and ethics.")
add("BUS 102", "Principles of Marketing", 3, "Faculty of Management Sciences", "Marketing", "B.Sc Marketing", "100L", "Second Semester (Rain/Omega)", "Concepts of marketing, customer needs, market segmentation, marketing mix, and consumer behavior basics.")

add("ACC 201", "Financial Accounting for Partnerships & Corporations", 3, "Faculty of Management Sciences", "Accounting", "B.Sc Accounting", "200L", "First Semester (Harmattan)", "Partnership admissions, dissolutions, goodwill valuation, company share capital, debentures, bonus/rights issues, and publication of accounts.")
add("ACC 202", "Cost and Management Accounting I", 3, "Faculty of Management Sciences", "Accounting", "B.Sc Accounting", "200L", "Second Semester (Rain/Omega)", "Cost classifications, material pricing (FIFO, LIFO, Weighted Average), labor costing, overhead allocation, absorption costing, and marginal costing.")
add("BFN 201", "Introduction to Banking and Financial Institutions", 3, "Faculty of Management Sciences", "Banking and Finance", "B.Sc Banking and Finance", "200L", "First Semester (Harmattan)", "Nigerian financial system, commercial banking operations, Central Bank of Nigeria (CBN) regulations, money markets, and financial instruments.")
add("BFN 202", "Principles of Corporate Finance", 3, "Faculty of Management Sciences", "Banking and Finance", "B.Sc Banking and Finance", "200L", "Second Semester (Rain/Omega)", "Time value of money, discounted cash flow valuation, capital budgeting fundamentals, risk and return trade-off, and working capital.")
add("PAD 201", "Introduction to Public Administration", 3, "Faculty of Management Sciences", "Public Administration", "B.Sc Public Administration", "200L", "First Semester (Harmattan)", "Theories of bureaucracy (Max Weber), public policy formulation, civil service structure in Nigeria, and administrative accountability.")

add("ACC 301", "Financial Reporting & IFRS Standards", 3, "Faculty of Management Sciences", "Accounting", "B.Sc Accounting", "300L", "First Semester (Harmattan)", "International Financial Reporting Standards (IFRS/IAS), statement of cash flows (IAS 7), revenue recognition (IFRS 15), and group consolidated accounts.")
add("ACC 302", "Auditing and Assurance Services", 3, "Faculty of Management Sciences", "Accounting", "B.Sc Accounting", "300L", "Second Semester (Rain/Omega)", "Auditing standards (ISA), internal controls, audit risk assessment, substantive testing, sampling methods, audit evidence, and auditor's report.")
add("ACC 303", "Public Sector and Government Accounting", 3, "Faculty of Management Sciences", "Accounting", "B.Sc Accounting", "300L", "First Semester (Harmattan)", "IPSAS accrual accounting, Treasury Single Account (TSA), government fund accounting, GIFMIS, fiscal responsibility frameworks, and public procurement.")
add("MKT 301", "Marketing Management & Consumer Behavior", 3, "Faculty of Management Sciences", "Marketing", "B.Sc Marketing", "300L", "First Semester (Harmattan)", "Marketing mix (4Ps/7Ps), market segmentation, targeting, positioning (STP), consumer buying decision processes, and digital marketing strategies.")
add("BUS 301", "Organizational Behavior & Theory", 3, "Faculty of Management Sciences", "Business Administration", "B.Sc Business Administration", "300L", "First Semester (Harmattan)", "Individual behavior, motivation theories (Maslow, Herzberg), group dynamics, leadership styles, power and politics, and organizational culture.")

add("ACC 401", "Advanced Corporate Financial Reporting & Consolidation", 3, "Faculty of Management Sciences", "Accounting", "B.Sc Accounting", "400L", "First Semester (Harmattan)", "Complex group consolidations, foreign currency transactions (IAS 21), financial instruments (IFRS 9), segment reporting, and corporate governance.")
add("ACC 402", "Taxation Principles and Tax Planning in Nigeria", 3, "Faculty of Management Sciences", "Accounting", "B.Sc Accounting", "400L", "Second Semester (Rain/Omega)", "Companies Income Tax Act (CITA), Personal Income Tax (PITA), Value Added Tax (VAT), withholding taxes, capital gains tax, and FIRS tax filing.")
add("ACC 403", "Strategic Financial Management", 3, "Faculty of Management Sciences", "Accounting", "B.Sc Accounting", "400L", "First Semester (Harmattan)", "Capital budgeting (NPV, IRR), Weighted Average Cost of Capital (WACC), capital structure theories (Modigliani-Miller), dividend policies, and M&A.")
add("BUS 401", "Business Policy and Strategic Management", 3, "Faculty of Management Sciences", "Business Administration", "B.Sc Business Administration", "400L", "Second Semester (Rain/Omega)", "SWOT/PESTEL analysis, Porter's Five Forces, corporate competitive strategy formulation, organizational turnaround, and business case studies.")

# =========================================================================
# 7. FACULTY OF SOCIAL SCIENCES
# =========================================================================
add("ECO 101", "Principles of Microeconomics", 3, "Faculty of Social Sciences", "Economics", "B.Sc Economics", "100L", "First Semester (Harmattan)", "Scarcity, choice, scale of preference, demand and supply equilibrium, elasticity concepts, consumer utility theory, and production costs.")
add("ECO 102", "Principles of Macroeconomics", 3, "Faculty of Social Sciences", "Economics", "B.Sc Economics", "100L", "Second Semester (Rain/Omega)", "National income accounting (GDP, GNP), circular flow of income, aggregate demand and supply, inflation, unemployment, and monetary/fiscal policies.")
add("POL 101", "Introduction to Political Science", 3, "Faculty of Social Sciences", "Political Science", "B.Sc Political Science", "100L", "First Semester (Harmattan)", "Nature and scope of politics, state sovereignty, political power and authority, ideologies (democracy, socialism, fascism), and political systems.")
add("SOC 101", "Introduction to Sociology", 3, "Faculty of Social Sciences", "Sociology", "B.Sc Sociology", "100L", "First Semester (Harmattan)", "Foundations of sociological thought (Marx, Durkheim, Weber), social institutions (family, religion, education), socialization, and deviance.")
add("MAS 101", "Introduction to Mass Communication", 3, "Faculty of Social Sciences", "Mass Communication", "B.Sc Mass Communication", "100L", "First Semester (Harmattan)", "Nature, channels, and functions of mass communication; print, broadcast, digital journalism, media theories, and press history in Nigeria.")
add("PSY 101", "Introduction to Psychology", 3, "Faculty of Social Sciences", "Psychology", "B.Sc Psychology", "100L", "First Semester (Harmattan)", "Biological foundations of behavior, sensation, perception, learning, memory, personality development, emotion, and psychological assessment.")

add("ECO 201", "Microeconomic Theory (Intermediate)", 3, "Faculty of Social Sciences", "Economics", "B.Sc Economics", "200L", "First Semester (Harmattan)", "Indifference curve analysis, revealed preference, Cobb-Douglas production functions, returns to scale, perfect competition, monopoly, and oligopoly models.")
add("ECO 202", "Macroeconomic Theory (Intermediate)", 3, "Faculty of Social Sciences", "Economics", "B.Sc Economics", "200L", "Second Semester (Rain/Omega)", "IS-LM model framework, multiplier analysis, open economy Mundell-Fleming model, Phillips curve, and Central Bank monetary transmission.")
add("POL 201", "Nigerian Government and Politics", 3, "Faculty of Social Sciences", "Political Science", "B.Sc Political Science", "200L", "First Semester (Harmattan)", "Colonial administration, constitutional development (Clifford to 1999 Constitution), federal character, military rule in Nigeria, and elections.")
add("MAS 201", "News Writing and Reporting", 3, "Faculty of Social Sciences", "Mass Communication", "B.Sc Mass Communication", "200L", "First Semester (Harmattan)", "News gathering techniques, inverted pyramid style, leads, beat reporting, interviewing skills, libel laws, and newsroom ethics.")
add("SOC 201", "Social Psychology & Collective Behavior", 3, "Faculty of Social Sciences", "Sociology", "B.Sc Sociology", "200L", "First Semester (Harmattan)", "Social attitudes, conformity, obedience, prejudice, crowd dynamics, social movements, and collective action.")

add("ECO 301", "Econometrics and Quantitative Methods", 3, "Faculty of Social Sciences", "Economics", "B.Sc Economics", "300L", "First Semester (Harmattan)", "Ordinary Least Squares (OLS) regression, Gauss-Markov assumptions, multicollinearity, heteroskedasticity, autocorrelation, and SPSS/EViews analysis.")
add("POL 301", "International Relations & Foreign Policy", 3, "Faculty of Social Sciences", "Political Science", "B.Sc Political Science", "300L", "First Semester (Harmattan)", "Theories of international relations (realism, liberalism, constructivism), Nigeria's Afrocentric foreign policy, diplomacy, and global institutions.")
add("MAS 301", "Broadcast Production & Media Ethics", 3, "Faculty of Social Sciences", "Mass Communication", "B.Sc Mass Communication", "300L", "First Semester (Harmattan)", "Radio and television scriptwriting, studio camera operations, audio mixing, editing techniques, NBC broadcasting code, and media law.")
add("PSY 301", "Developmental Psychology (Child to Adult)", 3, "Faculty of Social Sciences", "Psychology", "B.Sc Psychology", "300L", "First Semester (Harmattan)", "Prenatal development, infancy, cognitive maturation, adolescent identity crisis, adult transitions, aging, and psychological interventions.")

add("ECO 401", "Economic Planning and Development in Nigeria", 3, "Faculty of Social Sciences", "Economics", "B.Sc Economics", "400L", "First Semester (Harmattan)", "Theories of economic growth, poverty alleviation, structural adjustment, industrialization policies, foreign direct investment, and debt management.")
add("POL 401", "Public Policy Analysis and Decision Making", 3, "Faculty of Social Sciences", "Political Science", "B.Sc Political Science", "400L", "First Semester (Harmattan)", "Models of public policymaking (rational, incremental, institutional), policy implementation hurdles in Nigeria, monitoring, and evaluation.")
add("MAS 401", "Investigative Journalism & Digital Media", 3, "Faculty of Social Sciences", "Mass Communication", "B.Sc Mass Communication", "400L", "First Semester (Harmattan)", "In-depth investigative reporting, data journalism, OSINT verification, FOI Act requests, multimedia storytelling, and online publication.")

# =========================================================================
# 8. FACULTY OF ARTS & HUMANITIES
# =========================================================================
add("ENG 111", "English Grammar and Composition", 3, "Faculty of Arts", "English and Literary Studies", "B.A English", "100L", "First Semester (Harmattan)", "Parts of speech, sentence types, clause analysis, paragraph unity, expository and argumentative essay writing.")
add("LIT 101", "Introduction to Drama and Theatre", 3, "Faculty of Arts", "English and Literary Studies", "B.A English", "100L", "First Semester (Harmattan)", "Elements of drama (plot, character, spectacle), tragic and comic conventions, analysis of classical and African dramatic works.")
add("HIS 101", "Nigeria from the Earliest Times to 1800", 3, "Faculty of Arts", "History and International Studies", "B.A History", "100L", "First Semester (Harmattan)", "Centers of ancient civilization in Nigeria (Nok, Ife, Igbo-Ukwu, Benin, Kanem-Borno, Hausa States), state formation, and trans-Saharan trade.")
add("PHL 101", "Introduction to Philosophy & Epistemology", 3, "Faculty of Arts", "Philosophy", "B.A Philosophy", "100L", "First Semester (Harmattan)", "The nature of philosophical thinking, branches of philosophy (metaphysics, epistemology, ethics, logic), and knowledge theories.")

add("ENG 201", "Advanced English Phonetics and Phonology", 3, "Faculty of Arts", "English and Literary Studies", "B.A English", "200L", "First Semester (Harmattan)", "IPA phonetic transcription, consonants and vowels articulation, syllable structure, stress, intonation, and Nigerian English phonology.")
add("LIT 201", "Survey of African Literature in English", 3, "Faculty of Arts", "English and Literary Studies", "B.A English", "200L", "Second Semester (Rain/Omega)", "Themes of anti-colonialism, cultural identity, post-colonial disillusionment in Achebe, Soyinka, Ngugi, Chimamanda Ngozi Adichie.")
add("HIS 201", "Nigeria from 1800 to 1960", 3, "Faculty of Arts", "History and International Studies", "B.A History", "200L", "First Semester (Harmattan)", "The 1804 Sokoto Jihad, British colonial conquest, amalgamation of 1914, nationalist movements, and the struggle for independence.")
add("PHL 201", "African Philosophy and Worldviews", 3, "Faculty of Arts", "Philosophy", "B.A Philosophy", "200L", "First Semester (Harmattan)", "Debate on the existence of African philosophy, ethnophilosophy, sage philosophy, communalism vs individualism, and Ubuntu.")

add("ENG 301", "Applied Linguistics & Sociolinguistics", 3, "Faculty of Arts", "English and Literary Studies", "B.A English", "300L", "First Semester (Harmattan)", "Language in society, dialects, accents, pidgins and creoles (Nigerian Pidgin), language policy, diglossia, and code-switching.")
add("LIT 301", "Modern Literary Theory and Criticism", 3, "Faculty of Arts", "English and Literary Studies", "B.A English", "300L", "First Semester (Harmattan)", "Formalism, structuralism, post-structuralism, psychoanalytic criticism, Marxism, post-colonialism, and eco-criticism.")
add("HIS 301", "Diplomatic History & The United Nations", 3, "Faculty of Arts", "History and International Studies", "B.A History", "300L", "First Semester (Harmattan)", "Concert of Europe, World War diplomacy, League of Nations, UN Charter, Security Council peace operations, and Cold War balance of power.")

add("ENG 401", "Stylistics and Discourse Analysis", 3, "Faculty of Arts", "English and Literary Studies", "B.A English", "400L", "First Semester (Harmattan)", "Linguistic analysis of literary texts, cohesion and coherence, speech act theory, conversational implicature, and critical discourse analysis.")
add("HIS 401", "War and Peace in 20th Century Africa", 3, "Faculty of Arts", "History and International Studies", "B.A History", "400L", "First Semester (Harmattan)", "Liberation struggles in Southern Africa, Nigerian Civil War (1967-1970), Rwandan genocide, and African Union peace architectures.")

# =========================================================================
# 9. FACULTY OF AGRICULTURE
# =========================================================================
add("AGR 101", "Introduction to Agricultural Sciences", 2, "Faculty of Agriculture", "General Agriculture", "B.Agric All Disciplines", "100L", "First Semester (Harmattan)", "Importance of agriculture in national economy, farming systems in Nigeria, crop classification, livestock branches, and soil resources.")
add("AGR 201", "Agricultural Ecology and Farming Systems", 3, "Faculty of Agriculture", "General Agriculture", "B.Agric All Disciplines", "200L", "First Semester (Harmattan)", "Agro-ecological zones of Nigeria, climate factors, soil-plant-water relationships, shifting cultivation, crop rotation, and agroforestry.")
add("ANS 201", "Anatomy and Physiology of Farm Animals", 3, "Faculty of Agriculture", "Animal Science", "B.Agric Animal Science", "200L", "First Semester (Harmattan)", "Skeletal, digestive (ruminants vs non-ruminants), circulatory, and reproductive systems of cattle, sheep, goats, pigs, and poultry.")
add("CRP 201", "Principles of Crop Production & Agronomy", 3, "Faculty of Agriculture", "Crop Production", "B.Agric Crop Science", "200L", "Second Semester (Rain/Omega)", "Land preparation, seedbed planting techniques, fertilizers, pest and disease management for major cereals, legumes, roots, and tubers.")
add("SOS 201", "Introduction to Soil Science", 3, "Faculty of Agriculture", "Soil Science", "B.Agric Soil Science", "200L", "First Semester (Harmattan)", "Soil formation, weathering, physical properties (texture, structure), chemical properties (pH, cation exchange), and soil fertility.")

add("AGE 301", "Farm Management and Production Economics", 3, "Faculty of Agriculture", "Agricultural Economics", "B.Agric Agricultural Economics", "300L", "First Semester (Harmattan)", "Production functions, law of diminishing returns, enterprise budgeting, farm records, risk and uncertainty in Nigerian agriculture.")
add("ANS 301", "Animal Nutrition & Feedstuff Evaluation", 3, "Faculty of Agriculture", "Animal Science", "B.Agric Animal Science", "300L", "First Semester (Harmattan)", "Proximate analysis, feed formulation, energy and protein evaluation, vitamins, minerals, and unconventional feedstuffs in Nigeria.")
add("FIS 301", "Fish Ecology and Pond Aquaculture", 3, "Faculty of Agriculture", "Fisheries and Aquaculture", "B.Agric Fisheries", "300L", "First Semester (Harmattan)", "Fish pond construction, limnology, water quality management, fish breeding (Clarias, Tilapia), and commercial fish processing.")
add("AGR 399", "Farm Practical Training Year (SIWES/FPTY)", 6, "Faculty of Agriculture", "General Agriculture", "B.Agric All Disciplines", "300L", "Second Semester (Rain/Omega)", "Full-time hands-on commercial farm work on university teaching and research farms, managing livestock and arable crops.")

add("AGE 401", "Agricultural Marketing & International Trade", 3, "Faculty of Agriculture", "Agricultural Economics", "B.Agric Agricultural Economics", "400L", "First Semester (Harmattan)", "Marketing channels for agricultural commodities, price fluctuations, storage, commodity boards, and export market access.")
add("CRP 401", "Plant Breeding and Crop Biotechnology", 3, "Faculty of Agriculture", "Crop Production", "B.Agric Crop Science", "400L", "First Semester (Harmattan)", "Mendelian genetics in crop improvement, hybridization, selection methods, tissue culture, and GM crops regulation in Nigeria.")

# =========================================================================
# 10. FACULTY OF ENVIRONMENTAL SCIENCES
# =========================================================================
add("ARC 101", "Architectural Graphics and Design Studio I", 4, "Faculty of Environmental Sciences", "Architecture", "B.Sc Architecture", "100L", "First Semester (Harmattan)", "Freehand sketching, geometric drawing, presentation techniques, scale models, and architectural anthropometrics.")
add("ESM 101", "Introduction to Estate Management & Land Economy", 2, "Faculty of Environmental Sciences", "Estate Management", "B.Sc Estate Management", "100L", "First Semester (Harmattan)", "The nature of landed property, rights in land, the real estate market, and professional roles of estate surveyors and valuers.")
add("URP 101", "Principles of Urban and Regional Planning", 3, "Faculty of Environmental Sciences", "Urban and Regional Planning", "B.Sc Urban and Regional Planning", "100L", "First Semester (Harmattan)", "History of urban settlements, town planning theories, land use zoning, urban decay, and master plan formulation.")

add("ARC 201", "Architectural Design Studio II", 4, "Faculty of Environmental Sciences", "Architecture", "B.Sc Architecture", "200L", "First Semester (Harmattan)", "Design of residential bungalows, spatial programming, passive solar orientation, natural ventilation, and construction detailing.")
add("QTS 201", "Building Construction and Quantities I", 3, "Faculty of Environmental Sciences", "Quantity Surveying", "B.Sc Quantity Surveying", "200L", "First Semester (Harmattan)", "Taking-off quantities for substructure (excavation, concrete, foundations), Mensuration, and Standard Method of Measurement (BESMM4).")
add("ESM 201", "Principles of Real Estate Valuation I", 3, "Faculty of Environmental Sciences", "Estate Management", "B.Sc Estate Management", "200L", "First Semester (Harmattan)", "Concepts of value, valuation methods (comparative, investment, cost/contractor's, profits/residual), and valuation math tables.")

add("ARC 301", "Building Services and Sustainable Design", 3, "Faculty of Environmental Sciences", "Architecture", "B.Sc Architecture", "300L", "First Semester (Harmattan)", "Plumbing, electrical installation, HVAC design, acoustic control, fire protection systems, and green building certifications.")
add("QTS 301", "Contract Administration and Tendering", 3, "Faculty of Environmental Sciences", "Quantity Surveying", "B.Sc Quantity Surveying", "300L", "First Semester (Harmattan)", "Tendering procedures (open, selective), preparation of Bills of Quantities (BOQ), standard forms of building contracts, and dispute resolution.")
add("BLD 301", "Construction Technology & Site Management", 3, "Faculty of Environmental Sciences", "Building Technology", "B.Sc Building", "300L", "First Semester (Harmattan)", "Multi-storey construction, formwork, scaffolding, concrete placement, site safety regulations, and construction plant selection.")

add("ARC 401", "Comprehensive Urban Architecture Design Studio", 6, "Faculty of Environmental Sciences", "Architecture", "B.Sc Architecture", "400L", "First Semester (Harmattan)", "Design of complex civic structures (hospitals, university campuses, airports, commercial centers) with full technical specifications.")
add("ESM 401", "Advanced Property & Asset Management", 3, "Faculty of Environmental Sciences", "Estate Management", "B.Sc Estate Management", "400L", "First Semester (Harmattan)", "Lease management, rent collection strategies, facility management of commercial properties, and real estate investment trusts (REITs).")

# =========================================================================
# 11. FACULTY OF EDUCATION
# =========================================================================
add("EDU 101", "Introduction to Educational Foundations", 2, "Faculty of Education", "Educational Foundations", "B.Ed All Disciplines", "100L", "First Semester (Harmattan)", "Philosophical, historical, and sociological foundations of education in Nigeria; National Policy on Education.")
add("EDU 102", "Developmental Psychology of the Child", 2, "Faculty of Education", "Educational Psychology", "B.Ed All Disciplines", "100L", "Second Semester (Rain/Omega)", "Stages of human development, cognitive development (Piaget), behavioral conditioning, and implications for classroom teaching.")

add("EDU 201", "Curriculum Theory and Instructional Design", 2, "Faculty of Education", "Curriculum Studies", "B.Ed All Disciplines", "200L", "First Semester (Harmattan)", "Curriculum models (Tyler, Wheeler), behavioral instructional objectives, lesson note preparation, and teaching aid creation.")
add("EDU 202", "Educational Measurement, Evaluation & Testing", 2, "Faculty of Education", "Educational Foundations", "B.Ed All Disciplines", "200L", "Second Semester (Rain/Omega)", "Test construction, validity and reliability, item analysis, standard deviation, continuous assessment, and reporting learner progress.")

add("EDU 301", "Teaching Practice I (Microteaching & Practicum)", 3, "Faculty of Education", "Curriculum Studies", "B.Ed All Disciplines", "300L", "First Semester (Harmattan)", "Microteaching lab sessions, instructional skills simulation, board writing, questioning techniques, and secondary school observation.")
add("SED 301", "Methods of Teaching Science & STEM", 2, "Faculty of Education", "Science Education", "B.Sc (Ed) Science Education", "300L", "First Semester (Harmattan)", "Laboratory safety, discovery and inquiry methods, hands-on scientific experiments, and improvisation of local science apparatus.")
add("GDC 301", "Principles of Guidance and Counselling", 2, "Faculty of Education", "Guidance and Counselling", "B.Ed Guidance & Counselling", "300L", "First Semester (Harmattan)", "Counselling theories, individual vs group counselling, vocational guidance, school psychological assessment, and confidentiality.")

add("EDU 401", "Teaching Practice II (Full Supervised Field Practicum)", 6, "Faculty of Education", "Curriculum Studies", "B.Ed All Disciplines", "400L", "First Semester (Harmattan)", "12-week supervised full-time teaching placement in accredited secondary schools with formal evaluation by faculty assessors.")
add("EAM 401", "Educational Administration and School Management", 2, "Faculty of Education", "Educational Management", "B.Ed Educational Management", "400L", "First Semester (Harmattan)", "Leadership in schools, supervisory roles, school records keeping, discipline administration, education budget, and community relations.")

# =========================================================================
# 12. POLYTECHNIC PROGRAMMES (ND & HND Standards)
# =========================================================================
add("COM 111", "Introduction to Computing & Information Tech", 3, "School of Technology", "Computer Science", "ND Computer Science", "ND I", "First Semester (Harmattan)", "Computer components, input/output peripherals, Windows/Linux OS, office productivity packages (Word, Excel, PowerPoint), and internet basics.")
add("COM 112", "Introduction to Digital Electronics", 3, "School of Technology", "Computer Science", "ND Computer Science", "ND I", "First Semester (Harmattan)", "Number systems, Boolean algebra, basic logic gates (AND, OR, NOT, NAND, NOR), truth tables, and simple combinational logic circuits.")
add("COM 121", "Programming using Visual Basic/Python", 3, "School of Technology", "Computer Science", "ND Computer Science", "ND I", "Second Semester (Rain/Omega)", "Algorithm design, flowcharts, data types, variable declarations, loops, subroutines, form design, and database connectivity.")
add("COM 211", "Object-Oriented Programming with Java", 3, "School of Technology", "Computer Science", "ND Computer Science", "ND II", "First Semester (Harmattan)", "OOP concepts, class creation, objects, methods, encapsulation, inheritance, exceptions, and desktop application interfaces.")
add("COM 221", "Database Systems Design & Implementation", 3, "School of Technology", "Computer Science", "ND Computer Science", "ND II", "Second Semester (Rain/Omega)", "Relational database concepts, entity relationship modeling, Microsoft Access/MySQL implementation, SQL queries, and normalization.")

add("EEC 111", "Electrical Engineering Science I", 3, "School of Engineering", "Electrical Engineering Technology", "ND Electrical Engineering Tech", "ND I", "First Semester (Harmattan)", "DC circuits, Ohm's law, Kirchhoff's laws, electric fields, magnetic circuits, electromagnetic induction, and simple instruments.")
add("EEC 121", "Electrical Workshop Practice I", 2, "School of Engineering", "Electrical Engineering Technology", "ND Electrical Engineering Tech", "ND I", "Second Semester (Rain/Omega)", "Electrical safety, conduit wiring, surface wiring, domestic installations, cable jointing, and circuit testing.")
add("EEC 211", "Electrical Power Systems I", 3, "School of Engineering", "Electrical Engineering Technology", "ND Electrical Engineering Tech", "ND II", "First Semester (Harmattan)", "Power distribution, transformer theory, overhead conductors, cable sizing, protective switchgear, and earthing methods.")

add("BAM 111", "Principles of Economics I", 3, "School of Management Studies", "Business Administration", "ND Business Administration", "ND I", "First Semester (Harmattan)", "Basic economic principles, demand and supply, elasticities, price mechanism, and market structures in Nigeria.")
add("BAM 112", "Principles of Law I (Nigerian Legal System)", 2, "School of Management Studies", "Business Administration", "ND Business Administration", "ND I", "First Semester (Harmattan)", "Sources of Nigerian law, courts structure, torts, and business contract basics for commercial students.")
add("ACC 111", "Principles of Accounts I", 3, "School of Management Studies", "Accountancy", "ND Accountancy", "ND I", "First Semester (Harmattan)", "Double entry book-keeping, ledger posting, cash book, trial balance, and trading/profit and loss accounts.")

add("SLT 111", "Laboratory Techniques and Safety Regulations", 3, "School of Technology", "Science Laboratory Technology", "ND Science Laboratory Tech", "ND I", "First Semester (Harmattan)", "Laboratory glassware, sterilization, reagent preparation, balances, microscopy, laboratory hazards, and first aid.")
add("SLT 211", "Analytical Chemistry and Instrumentation", 3, "School of Technology", "Science Laboratory Technology", "ND Science Laboratory Tech", "ND II", "First Semester (Harmattan)", "Spectrophotometry, chromatography (paper, TLC), pH metry, gravimetric and volumetric analytical determinations.")

add("COM 311", "Operating System Internals & Linux Administration", 3, "School of Technology", "Computer Science", "HND Computer Science", "HND I", "First Semester (Harmattan)", "Linux command line, file system permissions, process control, shell scripting, user administration, and server package management.")
add("COM 321", "Web Application Development with PHP/MySQL", 3, "School of Technology", "Computer Science", "HND Computer Science", "HND I", "Second Semester (Rain/Omega)", "Server-side scripting, sessions and cookies, form sanitization, CRUD operations, database connection pooling, and web security.")
add("COM 411", "Software Engineering Principles & Project", 4, "School of Technology", "Computer Science", "HND Computer Science", "HND II", "First Semester (Harmattan)", "Software lifecycle models, SRS documentation, system architecture, unit testing, version control with Git, and deployment.")

# =========================================================================
# 13. COLLEGE OF EDUCATION (NCE Standards)
# =========================================================================
add("EDU 111", "Introduction to the Teaching Profession", 2, "School of Education", "Educational Foundations", "NCE All Programmes", "NCE I", "First Semester (Harmattan)", "Teaching as a profession, teacher ethics, historical evolution of teacher education in Nigeria, and classroom management basics.")
add("EDU 112", "Foundations of Nigerian Education", 2, "School of Education", "Educational Foundations", "NCE All Programmes", "NCE I", "Second Semester (Rain/Omega)", "Indigenous African education, missionary influence, colonial educational policies, National Policy on Education (NPE), and 6-3-3-4/9-3-4 systems.")
add("EDU 211", "Educational Psychology & Child Development", 2, "School of Education", "Educational Psychology", "NCE All Programmes", "NCE II", "First Semester (Harmattan)", "Theories of learning (Pavlov, Skinner, Piaget, Vygotsky), cognitive development, motivation in learning, and individual learner differences.")
add("EDU 221", "Curriculum Studies & Educational Technology", 2, "School of Education", "Curriculum and Instruction", "NCE All Programmes", "NCE II", "Second Semester (Rain/Omega)", "Curriculum planning, lesson note preparation, instructional objectives (Bloom's taxonomy), and audio-visual teaching aids construction.")
add("EDU 311", "Teaching Practice (Supervised School Practicum)", 6, "School of Education", "Educational Foundations", "NCE All Programmes", "NCE III", "First Semester (Harmattan)", "12-week intensive hands-on classroom teaching practice in certified primary or secondary schools with external faculty supervision.")

print(f"Total standard courses generated: {len(COURSES)}")

ts_code = f"""// StudentHub NG - Comprehensive Course Catalog (100L to 400L/500L, ND, HND, NCE)
// Standards aligned with NUC CCMAS/BMAS, NBTE, NCCE, and NMCN curricula across Nigerian tertiary institutions.

import {{ CourseRecord }} from '../types';

export const COMPREHENSIVE_COURSES: CourseRecord[] = {json.dumps(COURSES, indent=2)};

// Helper to filter courses by level
export const getCoursesByLevel = (level: string): CourseRecord[] => {{
  return COMPREHENSIVE_COURSES.filter(c => c.level.toLowerCase() === level.toLowerCase());
}};

// Helper to filter courses by semester
export const getCoursesBySemester = (semesterKeyword: string): CourseRecord[] => {{
  return COMPREHENSIVE_COURSES.filter(c => c.semester.toLowerCase().includes(semesterKeyword.toLowerCase()));
}};

// Helper to filter courses by department/programme
export const getCoursesByDepartment = (dept: string): CourseRecord[] => {{
  return COMPREHENSIVE_COURSES.filter(c => 
    c.department.toLowerCase().includes(dept.toLowerCase()) || 
    c.programme.toLowerCase().includes(dept.toLowerCase()) ||
    c.faculty.toLowerCase().includes(dept.toLowerCase())
  );
}};

// Helper to search across code, title, description, and keywords
export const searchCourses = (query: string): CourseRecord[] => {{
  const q = query.trim().toLowerCase();
  if (!q) return COMPREHENSIVE_COURSES;
  return COMPREHENSIVE_COURSES.filter(c => 
    c.courseCode.toLowerCase().includes(q) ||
    c.courseTitle.toLowerCase().includes(q) ||
    c.department.toLowerCase().includes(q) ||
    c.faculty.toLowerCase().includes(q) ||
    c.level.toLowerCase().includes(q) ||
    c.courseDescription.toLowerCase().includes(q)
  );
}};

export default COMPREHENSIVE_COURSES;
"""

with open("src/data/allCoursesData.ts", "w", encoding="utf-8") as f:
    f.write(ts_code)

print("Successfully written to src/data/allCoursesData.ts!")
