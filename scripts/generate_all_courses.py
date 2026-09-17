import json

# Python script to build a comprehensive NUC Benchmark Minimum Academic Standards (BMAS/CCMAS)
# and NBTE/NCCE accredited courses database from 100L to 400L/500L across all Nigerian higher institutions.

COURSES = []

# Helper to generate courses
def add_course(code, title, unit, faculty, dept, prog, level, semester, desc, is_elective=False):
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
# 1. GENERAL STUDIES (GST / GNS) - Mandatory for ALL Nigerian Universities
# =========================================================================
# 100 Level
add_course("GST 111", "Communication in English I", 2, "General Studies", "General Studies", "All Programmes", "100L", "First Semester (Harmattan)", "Grammar mechanics, vocabulary development, listening comprehension, note-taking, sentence structures, and academic writing fundamentals.")
add_course("GST 112", "Nigerian Peoples and Culture", 2, "General Studies", "General Studies", "All Programmes", "100L", "First Semester (Harmattan)", "Study of Nigerian history, culture, ethical values, indigenous traditions, ethnic relations, and national unity.")
add_course("GST 113", "Philosophy, Logic and Human Existence", 2, "General Studies", "General Studies", "All Programmes", "100L", "First Semester (Harmattan)", "Introduction to philosophical inquiry, symbolic logic, critical thinking, fallacy detection, and ethical human existence.")
add_course("GST 121", "Communication in English II", 2, "General Studies", "General Studies", "All Programmes", "100L", "Second Semester (Rain/Omega)", "Advanced composition, research documentation styles (APA/MLA), term paper presentations, logical argumentation, and speech delivery.")
add_course("GST 122", "Use of Library, Study Skills and ICT", 2, "General Studies", "General Studies", "All Programmes", "100L", "Second Semester (Rain/Omega)", "Library organization, bibliographic citations, digital cataloging (OPAC), e-learning databases, and online academic research.")

# 200 Level
add_course("GST 211", "Environment and Sustainable Development", 2, "General Studies", "General Studies", "All Programmes", "200L", "First Semester (Harmattan)", "Ecosystem dynamics, climate change, biodiversity preservation, pollution mitigation, waste management, and UN Sustainable Development Goals.")
add_course("GST 212", "Philosophy of Science and Applied Technology", 2, "General Studies", "General Studies", "All Programmes", "200L", "First Semester (Harmattan)", "Historical scientific revolutions, scientific methodology, epistemology, ethics of technological breakthroughs, and African indigenous knowledge.")
add_course("GST 222", "Peace Studies and Conflict Resolution", 2, "General Studies", "General Studies", "All Programmes", "200L", "Second Semester (Rain/Omega)", "Theories of conflict, ethnic & communal dispute mediation, alternative dispute resolution (ADR), peace-building, and international diplomacy.")
add_course("GST 223", "Introduction to Entrepreneurship Studies", 2, "General Studies", "General Studies", "All Programmes", "200L", "Second Semester (Rain/Omega)", "Entrepreneurial mindsets, opportunity identification, business models, feasibility research, and intellectual property rights in Nigeria.")

# 300 Level
add_course("GST 311", "Venture Creation and Innovation", 2, "General Studies", "General Studies", "All Programmes", "300L", "First Semester (Harmattan)", "Hands-on venture incubation, business plan writing, product prototyping, digital marketing strategy, SME finance, and pitch decks.")
add_course("GST 312", "Leadership, Governance and Civic Responsibilities", 2, "General Studies", "General Studies", "All Programmes", "300L", "Second Semester (Rain/Omega)", "Civic duties, constitutional rights, anti-corruption frameworks, leadership ethics, public accountability, and community development.")

# 400 Level
add_course("GST 411", "Research Methodology and Ethics", 2, "General Studies", "General Studies", "All Programmes", "400L", "First Semester (Harmattan)", "Qualitative and quantitative research designs, sampling techniques, statistical hypothesis testing, plagiarism avoidance, and academic publishing.")

# =========================================================================
# 2. COMPUTER SCIENCE, SOFTWARE ENGINEERING & CYBERSECURITY
# =========================================================================
# 100 Level
add_course("CSC 101", "Introduction to Computer Science", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "100L", "First Semester (Harmattan)", "History of computing, hardware/software taxonomy, number systems (binary, octal, hex), boolean algebra, flowcharts, and system software.")
add_course("CSC 102", "Introduction to Problem Solving with Python", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "100L", "Second Semester (Rain/Omega)", "Variables, conditionals, loops, functions, lists, dictionaries, file I/O, error handling, and structured programming paradigms.")
add_course("MTH 101", "Elementary Mathematics I (Algebra & Trigonometry)", 3, "Faculty of Science", "Mathematics", "B.Sc Computer Science", "100L", "First Semester (Harmattan)", "Set theory, quadratic equations, polynomial functions, binomial theorem, trigonometric identities, complex numbers, and matrices.")
add_course("MTH 102", "Elementary Mathematics II (Calculus)", 3, "Faculty of Science", "Mathematics", "B.Sc Computer Science", "100L", "Second Semester (Rain/Omega)", "Limits, continuity, differentiation from first principles, chain rule, integration techniques, definite integrals, and application to rates of change.")
add_course("PHY 101", "General Physics I (Mechanics & Thermal Physics)", 3, "Faculty of Science", "Physics", "B.Sc Computer Science", "100L", "First Semester (Harmattan)", "Dimensional analysis, vectors, Newton's laws of motion, work, energy, rotational dynamics, gravitation, thermodynamics, and kinetic theory.")
add_course("PHY 102", "General Physics II (Electricity & Magnetism)", 3, "Faculty of Science", "Physics", "B.Sc Computer Science", "100L", "Second Semester (Rain/Omega)", "Electrostatics, Coulomb's law, electric fields, Gauss's theorem, capacitors, DC circuits, Kirchhoff's laws, magnetic forces, and Faraday's law.")

# 200 Level
add_course("CSC 201", "Computer Programming I (Object-Oriented Java)", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "200L", "First Semester (Harmattan)", "Classes, objects, encapsulation, inheritance, polymorphism, abstract classes, interfaces, generic collections, and GUI development.")
add_course("CSC 202", "Computer Programming II (C/C++ Systems)", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "200L", "Second Semester (Rain/Omega)", "Pointers, dynamic memory allocation (malloc/free), structs, memory management, operator overloading, templates, and low-level system interactions.")
add_course("CSC 203", "Discrete Mathematics and Structures", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "200L", "First Semester (Harmattan)", "Propositional logic, predicate calculus, mathematical induction, relations, graph theory, trees, combinatorics, and automata theory.")
add_course("CSC 204", "Fundamentals of Data Structures", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "200L", "Second Semester (Rain/Omega)", "Arrays, linked lists, stacks, queues, binary search trees, hash tables, sorting algorithms, and Big-O computational complexity analysis.")
add_course("CSC 205", "Computer Architecture and Organization", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "200L", "First Semester (Harmattan)", "Logic gates, flip-flops, ALU design, register transfer language, instruction set architecture (MIPS/x86), memory hierarchy, and pipelining.")
add_course("CSC 206", "Introduction to Web Technologies & UI", 2, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "200L", "Second Semester (Rain/Omega)", "HTML5 semantic markup, CSS3 Flexbox/Grid, JavaScript DOM manipulation, asynchronous AJAX/Fetch API, and responsive web design.")

# 300 Level
add_course("CSC 301", "Structured Software Engineering", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "300L", "First Semester (Harmattan)", "Software development lifecycles (Agile, Scrum, Waterfall), UML design diagrams, requirement engineering, testing strategies, and CI/CD.")
add_course("CSC 302", "Database Design and Management Systems (SQL/NoSQL)", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "300L", "Second Semester (Rain/Omega)", "Relational data model, ER modeling, SQL querying, normalization (1NF to BCNF), transaction ACID properties, indexing, and MongoDB NoSQL.")
add_course("CSC 303", "Operating Systems Internals & Concurrency", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "300L", "First Semester (Harmattan)", "Process management, CPU scheduling algorithms, threads, race conditions, semaphores, deadlock detection/prevention, and virtual memory paging.")
add_course("CSC 304", "Computer Networks and Data Communications", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "300L", "Second Semester (Rain/Omega)", "OSI and TCP/IP models, IPv4/IPv6 subnetting, routing protocols (OSPF/BGP), transport layer (TCP/UDP), socket programming, and Wireshark analysis.")
add_course("CSC 305", "Theory of Automata and Formal Languages", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "300L", "First Semester (Harmattan)", "Deterministic and nondeterministic finite automata, regular expressions, context-free grammars, pushdown automata, and Turing machines.")
add_course("CSC 306", "Cybersecurity, Cryptography and Network Defense", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "300L", "Second Semester (Rain/Omega)", "Symmetric/asymmetric encryption (AES, RSA), hashing (SHA-256), PKI, authentication protocols, firewalls, penetration testing, and ethical hacking.")
add_course("CSC 399", "Students Industrial Work Experience Scheme (SIWES)", 6, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "300L", "Second Semester (Rain/Omega)", "6-month mandatory full-time industrial internship placement in technology firms, IT departments, or telecommunication enterprises.")

# 400 Level
add_course("CSC 401", "Artificial Intelligence and Machine Learning", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "400L", "First Semester (Harmattan)", "Heuristic search (A*), knowledge representation, supervised/unsupervised machine learning, neural networks, deep learning, and NLP.")
add_course("CSC 402", "Compiler Construction and Parsing Techniques", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "400L", "Second Semester (Rain/Omega)", "Lexical analysis (lex), syntax parsing (LL/LR parsers), semantic analysis, intermediate representation, code optimization, and code generation.")
add_course("CSC 403", "Distributed Computing and Cloud Systems", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "400L", "First Semester (Harmattan)", "Distributed architecture, RPC, REST/gRPC APIs, message queues, microservices, containerization (Docker, Kubernetes), and cloud hosting.")
add_course("CSC 404", "Mobile Application Development (Flutter/Android)", 3, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "400L", "First Semester (Harmattan)", "Cross-platform mobile apps, state management, REST API integration, local SQLite storage, mobile push notifications, and device sensors.")
add_course("CSC 405", "Human-Computer Interaction and UI/UX Design", 2, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "400L", "Second Semester (Rain/Omega)", "Usability principles, design thinking, cognitive heuristics, wireframing, Figma prototyping, usability testing, and accessibility guidelines.")
add_course("CSC 499", "Final Year Capstone Research Project", 6, "Faculty of Science", "Computer Science", "B.Sc Computer Science", "400L", "Second Semester (Rain/Omega)", "Independent original software engineering and research project under faculty supervision, culminating in defense, report, and system demo.")

# =========================================================================
# 3. ELECTRICAL, ELECTRONIC & MECHANICAL ENGINEERING
# =========================================================================
# 100 Level (General Engineering Foundation)
add_course("ENG 101", "Engineering Drawing and CAD I", 2, "Faculty of Engineering", "General Engineering", "B.Eng All Disciplines", "100L", "First Semester (Harmattan)", "Lettering, geometric constructions, orthographic projections, isometric views, sectioning, dimensioning, and AutoCAD 2D drafting.")
add_course("ENG 102", "Engineering Workshop Practice I", 2, "Faculty of Engineering", "General Engineering", "B.Eng All Disciplines", "100L", "Second Semester (Rain/Omega)", "Safety regulations, hand tools, benchwork, sheet metal fabrication, welding techniques, woodturning, and basic electrical wiring.")

# 200 Level
add_course("ENG 201", "Engineering Mathematics I", 3, "Faculty of Engineering", "General Engineering", "B.Eng All Disciplines", "200L", "First Semester (Harmattan)", "Ordinary differential equations (ODEs), Laplace transforms, vector calculus, gradient, divergence, curl, and series expansions.")
add_course("ENG 202", "Engineering Mathematics II", 3, "Faculty of Engineering", "General Engineering", "B.Eng All Disciplines", "200L", "Second Semester (Rain/Omega)", "Partial differential equations (PDEs), Fourier series, complex variables, contour integration, and numerical methods for engineers.")
add_course("ENG 203", "Applied Mechanics and Strength of Materials", 3, "Faculty of Engineering", "General Engineering", "B.Eng All Disciplines", "200L", "First Semester (Harmattan)", "Force systems, trusses, centroids, moment of inertia, stress-strain relationships, shear force and bending moment diagrams.")
add_course("ENG 204", "Engineering Thermodynamics I", 3, "Faculty of Engineering", "General Engineering", "B.Eng All Disciplines", "200L", "Second Semester (Rain/Omega)", "First and second laws of thermodynamics, closed and open systems, ideal gas cycles, Carnot cycle, steam tables, and entropy analysis.")
add_course("EEE 201", "Circuit Theory and Analysis I", 3, "Faculty of Engineering", "Electrical Engineering", "B.Eng Electrical Engineering", "200L", "First Semester (Harmattan)", "Mesh and nodal analysis, Thevenin and Norton theorems, maximum power transfer, AC steady-state analysis, phasors, and resonance.")
add_course("EEE 202", "Basic Electronics and Semiconductor Devices", 3, "Faculty of Engineering", "Electrical Engineering", "B.Eng Electrical Engineering", "200L", "Second Semester (Rain/Omega)", "P-N junction diodes, BJT and MOSFET transistors, small-signal amplifier models, operational amplifiers (Op-Amps), and power supplies.")

# 300 Level
add_course("EEE 301", "Electromagnetic Fields and Wave Propagation", 3, "Faculty of Engineering", "Electrical Engineering", "B.Eng Electrical Engineering", "300L", "First Semester (Harmattan)", "Maxwell's equations, electrostatic and magnetostatic boundary conditions, Poynting vector, plane wave propagation in media, and transmission lines.")
add_course("EEE 302", "Electric Power Systems and High Voltage Tech", 3, "Faculty of Engineering", "Electrical Engineering", "B.Eng Electrical Engineering", "300L", "Second Semester (Rain/Omega)", "Power generation, transmission line modeling, per-unit system, load flow analysis (Gauss-Seidel/Newton-Raphson), and fault calculations.")
add_course("EEE 303", "Control Systems Engineering and Feedback", 3, "Faculty of Engineering", "Electrical Engineering", "B.Eng Electrical Engineering", "300L", "First Semester (Harmattan)", "Open-loop/closed-loop systems, transfer functions, block diagram reduction, Routh-Hurwitz stability, Root Locus, and Bode plot frequency response.")
add_course("EEE 304", "Digital Electronics and Microprocessors", 3, "Faculty of Engineering", "Electrical Engineering", "B.Eng Electrical Engineering", "300L", "Second Semester (Rain/Omega)", "Combinational/sequential logic, Karnaugh maps, counters, registers, 8086/ARM microprocessor architectures, assembly language, and interfacing.")
add_course("MEE 301", "Fluid Mechanics and Hydraulic Machines", 3, "Faculty of Engineering", "Mechanical Engineering", "B.Eng Mechanical Engineering", "300L", "First Semester (Harmattan)", "Fluid statics, Bernoulli equation, Navier-Stokes equations, laminar and turbulent pipe flow, boundary layer theory, pumps, and turbines.")
add_course("MEE 302", "Theory of Machines and Kinematics", 3, "Faculty of Engineering", "Mechanical Engineering", "B.Eng Mechanical Engineering", "300L", "Second Semester (Rain/Omega)", "Kinematic pairs, velocity and acceleration diagrams, gear trains, cams and followers, balancing of rotating masses, and gyroscopic couples.")
add_course("ENG 399", "Engineering SIWES (Industrial Attachment)", 6, "Faculty of Engineering", "General Engineering", "B.Eng All Disciplines", "300L", "Second Semester (Rain/Omega)", "6 months supervised industrial training in certified engineering firms, power plants, manufacturing facilities, or construction sites.")

# 400 Level
add_course("EEE 401", "Telecommunication Systems and DSP", 3, "Faculty of Engineering", "Electrical Engineering", "B.Eng Electrical Engineering", "400L", "First Semester (Harmattan)", "Analog/digital modulation (AM, FM, QAM), sampling theorem, Discrete Fourier Transform (DFT/FFT), FIR/IIR digital filter design, and satellite comms.")
add_course("EEE 402", "Power Electronics and Industrial Drives", 3, "Faculty of Engineering", "Electrical Engineering", "B.Eng Electrical Engineering", "400L", "Second Semester (Rain/Omega)", "Thyristors, TRIACs, IGBT switches, DC-DC buck/boost converters, single/three-phase inverters, and variable frequency motor speed drives.")
add_course("MEE 401", "Heat and Mass Transfer", 3, "Faculty of Engineering", "Mechanical Engineering", "B.Eng Mechanical Engineering", "400L", "First Semester (Harmattan)", "Steady/unsteady conduction, Fourier law, free and forced convection, radiation heat transfer, blackbody radiation, and heat exchanger design.")
add_course("MEE 402", "Machine Design and Failure Prevention", 3, "Faculty of Engineering", "Mechanical Engineering", "B.Eng Mechanical Engineering", "400L", "Second Semester (Rain/Omega)", "Design of shafts, keys, couplings, springs, threaded fasteners, journal bearings, fatigue failure theories, and finite element modeling (FEM).")

# 500 Level
add_course("ENG 501", "Engineering Management, Law and Professional Ethics", 2, "Faculty of Engineering", "General Engineering", "B.Eng All Disciplines", "500L", "First Semester (Harmattan)", "COREN/NSE codes of practice, project management (PERT/CPM), contract law, arbitration, occupational health and safety, and environmental impact assessment.")
add_course("ENG 599", "Final Year Engineering Capstone Design Project", 6, "Faculty of Engineering", "General Engineering", "B.Eng All Disciplines", "500L", "Second Semester (Rain/Omega)", "Comprehensive design, simulation, physical prototyping, testing, and technical defense of a complex real-world engineering system.")

# =========================================================================
# 4. MEDICINE, NURSING, PHARMACY & HEALTH SCIENCES
# =========================================================================
# 100 Level (Pre-Med Basic Sciences)
add_course("BIO 101", "General Biology I (Cell Biology & Genetics)", 3, "Faculty of Science", "Biological Sciences", "Pre-Medicine & Health Sciences", "100L", "First Semester (Harmattan)", "Cell structure, organelles, membrane transport, mitosis, meiosis, Mendelian inheritance, molecular genetics, and taxonomy of living organisms.")
add_course("BIO 102", "General Biology II (Botany & Zoology)", 3, "Faculty of Science", "Biological Sciences", "Pre-Medicine & Health Sciences", "100L", "Second Semester (Rain/Omega)", "Plant morphology, photosynthesis, transpiration, animal organ systems (digestive, respiratory, circulatory, nervous), and ecology.")
add_course("CHM 101", "General Chemistry I (Physical & Inorganic)", 3, "Faculty of Science", "Chemical Sciences", "Pre-Medicine & Health Sciences", "100L", "First Semester (Harmattan)", "Atomic structure, periodic trends, chemical bonding, stoichiometry, gas laws, chemical equilibria, acids/bases, and thermochemistry.")
add_course("CHM 102", "General Chemistry II (Organic Chemistry)", 3, "Faculty of Science", "Chemical Sciences", "Pre-Medicine & Health Sciences", "100L", "Second Semester (Rain/Omega)", "Functional groups, hybridization, alkanes, alkenes, alkynes, aromatic compounds, stereochemistry, substitution, and elimination reactions.")

# 200 Level (Basic Medical Sciences)
add_course("ANA 201", "Gross Anatomy of the Upper & Lower Limbs", 4, "College of Medicine", "Anatomy", "MBBS / B.N.Sc / B.Pharm", "200L", "First Semester (Harmattan)", "Osteology, muscular attachments, neurovascular bundles, joints, fascial compartments, and clinical surface anatomy of the limbs.")
add_course("ANA 202", "Gross Anatomy of the Thorax, Abdomen & Pelvis", 4, "College of Medicine", "Anatomy", "MBBS / B.N.Sc / B.Pharm", "200L", "Second Semester (Rain/Omega)", "Pleura, lungs, heart, mediastinum, abdominal viscera, peritoneal cavity, pelvic organs, perineum, and clinical correlate anatomy.")
add_course("PHS 201", "General & Blood Physiology", 3, "College of Medicine", "Physiology", "MBBS / B.N.Sc / B.Pharm", "200L", "First Semester (Harmattan)", "Cellular membrane potential, homeostasis, red blood cells, hemoglobin, white blood cells, immunity, hemostasis, and blood transfusion.")
add_course("PHS 202", "Cardiovascular & Respiratory Physiology", 3, "College of Medicine", "Physiology", "MBBS / B.N.Sc / B.Pharm", "200L", "Second Semester (Rain/Omega)", "Cardiac cycle, ECG interpretation, blood pressure regulation, microcirculation, pulmonary ventilation, gas transport, and hypoxia.")
add_course("BCH 201", "General Biochemistry & Biomolecules", 3, "College of Medicine", "Biochemistry", "MBBS / B.N.Sc / B.Pharm", "200L", "First Semester (Harmattan)", "Structure and properties of amino acids, proteins, carbohydrates, lipids, nucleic acids, enzyme kinetics, and vitamins/coenzymes.")
add_course("BCH 202", "Intermediary Metabolism & Bioenergetics", 3, "College of Medicine", "Biochemistry", "MBBS / B.N.Sc / B.Pharm", "200L", "Second Semester (Rain/Omega)", "Glycolysis, citric acid cycle, oxidative phosphorylation, glycogen metabolism, gluconeogenesis, beta-oxidation of fatty acids, and urea cycle.")

# 300 Level
add_course("PHA 301", "General Pharmacology & Pharmacokinetics", 3, "College of Medicine", "Pharmacology", "MBBS / B.N.Sc / B.Pharm", "300L", "First Semester (Harmattan)", "Drug absorption, distribution, metabolism, excretion (ADME), drug-receptor interactions, dose-response curves, and adverse drug reactions.")
add_course("PHA 302", "Autonomic & Cardiovascular Pharmacology", 3, "College of Medicine", "Pharmacology", "MBBS / B.N.Sc / B.Pharm", "300L", "Second Semester (Rain/Omega)", "Sympathomimetics, parasympatholytics, antihypertensive drugs, diuretics, antianginals, antiarrhythmics, and lipid-lowering agents.")
add_course("PTH 301", "General Pathology & Cell Injury", 3, "College of Medicine", "Pathology", "MBBS / B.N.Sc / B.Pharm", "300L", "First Semester (Harmattan)", "Cellular adaptations, necrosis, apoptosis, acute and chronic inflammation, wound healing, hemodynamic disorders, and neoplasia.")
add_course("MCB 301", "Medical Microbiology & Immunology", 3, "College of Medicine", "Medical Microbiology", "MBBS / B.N.Sc / B.Pharm", "300L", "First Semester (Harmattan)", "Bacterial pathogenesis, viral replication, fungal infections, innate/adaptive immunity, antigen-antibody reactions, and diagnostic serology.")
add_course("NUR 301", "Foundations of Nursing Practice & Clinical Skills", 3, "College of Medicine", "Nursing Science", "B.N.Sc Nursing", "300L", "First Semester (Harmattan)", "Nursing process (assessment, diagnosis, planning, intervention, evaluation), vital signs monitoring, aseptic wound dressings, and catheterization.")
add_course("NUR 302", "Medical-Surgical Nursing I", 4, "College of Medicine", "Nursing Science", "B.N.Sc Nursing", "300L", "Second Semester (Rain/Omega)", "Pathophysiology and holistic nursing care of patients with respiratory, cardiovascular, endocrine, and gastrointestinal diseases.")

# 400 Level
add_course("MED 401", "Clinical Medicine & Patient Bedside Examination", 5, "College of Medicine", "Medicine", "MBBS Medicine & Surgery", "400L", "First Semester (Harmattan)", "History taking, systemic clinical physical examination, differential diagnoses formulation, diagnostic lab ordering, and inpatient ward rounds.")
add_course("SUR 401", "Principles of Surgery & Operative Techniques", 5, "College of Medicine", "Surgery", "MBBS Medicine & Surgery", "400L", "Second Semester (Rain/Omega)", "Surgical asepsis, wound management, trauma and burn resuscitation, pre/post-operative care, fluid balance, and surgical theater etiquette.")
add_course("NUR 401", "Maternal, Child Health & Midwifery Nursing", 4, "College of Medicine", "Nursing Science", "B.N.Sc Nursing", "400L", "First Semester (Harmattan)", "Antenatal care, stages of normal labor, partograph monitoring, obstetric emergencies, neonatal resuscitation, and family planning.")
add_course("PHM 401", "Medicinal Chemistry & Pharmaceutical Formulation", 4, "Faculty of Pharmacy", "Pharmaceutics", "B.Pharm Pharmacy", "400L", "First Semester (Harmattan)", "Drug synthesis, structure-activity relationships (SAR), solid dosage formulation (tablets, capsules), sterile compounding, and stability testing.")

# =========================================================================
# 5. LAW (LL.B)
# =========================================================================
# 100 Level
add_course("LAW 101", "Legal Method I", 3, "Faculty of Law", "Law", "LL.B Bachelor of Laws", "100L", "First Semester (Harmattan)", "Definition of law, classification of law, sources of Nigerian law (Constitution, statutes, case law, customary law, Islamic law), and court hierarchy.")
add_course("LAW 102", "Legal Method II & Judicial Precedent", 3, "Faculty of Law", "Law", "LL.B Bachelor of Laws", "100L", "Second Semester (Rain/Omega)", "Doctrine of stare decisis, ratio decidendi, obiter dicta, statutory interpretation rules (literal, golden, mischief), and legal reasoning.")

# 200 Level
add_course("LAW 201", "Nigerian Constitutional Law I", 4, "Faculty of Law", "Public Law", "LL.B Bachelor of Laws", "200L", "First Semester (Harmattan)", "Constitutional supremacy, separation of powers, rule of law, federalism, executive powers, legislative functions, and judicial review.")
add_course("LAW 202", "Nigerian Constitutional Law II (Fundamental Rights)", 4, "Faculty of Law", "Public Law", "LL.B Bachelor of Laws", "200L", "Second Semester (Rain/Omega)", "Chapter IV 1999 Constitution fundamental rights (life, liberty, fair hearing, privacy, speech, assembly), enforcement procedures, and emergency powers.")
add_course("LAW 203", "Law of Contract I", 4, "Faculty of Law", "Commercial Law", "LL.B Bachelor of Laws", "200L", "First Semester (Harmattan)", "Offer and acceptance, consideration, intention to create legal relations, capacity to contract, terms of contract, and privity.")
add_course("LAW 204", "Law of Contract II (Vitiating Elements & Remedies)", 4, "Faculty of Law", "Commercial Law", "LL.B Bachelor of Laws", "200L", "Second Semester (Rain/Omega)", "Mistake, misrepresentation, duress, undue influence, illegality, discharge of contracts, and remedies (damages, specific performance, injunction).")
add_course("LAW 205", "Nigerian Legal System", 3, "Faculty of Law", "Jurisprudence", "LL.B Bachelor of Laws", "200L", "First Semester (Harmattan)", "Civil and criminal court jurisdictions, legal aid, police powers, bail administration, and legal education/profession in Nigeria.")

# 300 Level
add_course("LAW 301", "Criminal Law I (General Principles)", 4, "Faculty of Law", "Public Law", "LL.B Bachelor of Laws", "300L", "First Semester (Harmattan)", "Criminal Code and Penal Code comparisons, actus reus, mens rea, strict liability, general defenses (insanity, self-defense, intoxication, mistake).")
add_course("LAW 302", "Criminal Law II (Specific Offenses)", 4, "Faculty of Law", "Public Law", "LL.B Bachelor of Laws", "300L", "Second Semester (Rain/Omega)", "Homicide (murder, manslaughter), assault, sexual offenses, theft, robbery, burglary, forgery, obtaining by false pretenses, and treason.")
add_course("LAW 303", "Law of Torts I", 4, "Faculty of Law", "Private Law", "LL.B Bachelor of Laws", "300L", "First Semester (Harmattan)", "Nature of torts, trespass to person (assault, battery, false imprisonment), trespass to land, negligence (duty of care, breach, causation, damages).")
add_course("LAW 304", "Law of Torts II", 4, "Faculty of Law", "Private Law", "LL.B Bachelor of Laws", "300L", "Second Semester (Rain/Omega)", "Occupiers' liability, nuisance, Rylands v. Fletcher strict liability, defamation (libel, slander, defenses), vicarious liability, and economic torts.")
add_course("LAW 305", "Commercial Law I (Sale of Goods & Agency)", 4, "Faculty of Law", "Commercial Law", "LL.B Bachelor of Laws", "300L", "First Semester (Harmattan)", "Sale of Goods Act, transfer of property, nemo dat exceptions, duties of buyer and seller, creation of agency, and rights/duties of principal and agent.")

# 400 Level
add_course("LAW 401", "Land Law I (Customary Land Tenure)", 4, "Faculty of Law", "Private Law", "LL.B Bachelor of Laws", "400L", "First Semester (Harmattan)", "Customary land ownership, family property, communal land tenure, alienability, pledge, customary tenancy, and devolution of estates.")
add_course("LAW 402", "Land Law II (Land Use Act 1978)", 4, "Faculty of Law", "Private Law", "LL.B Bachelor of Laws", "400L", "Second Semester (Rain/Omega)", "Land Use Act 1978, Governor's consent, right of occupancy (statutory vs. customary), revocation, compensation, and mortgages.")
add_course("LAW 403", "Company Law and Corporate Governance (CAMA 2020)", 4, "Faculty of Law", "Commercial Law", "LL.B Bachelor of Laws", "400L", "First Semester (Harmattan)", "Incorporation of companies, separate legal personality (Salomon doctrine), memo/articles of association, directors' duties, shareholder rights, and winding up.")
add_course("LAW 404", "Law of Evidence I", 4, "Faculty of Law", "Procedural Law", "LL.B Bachelor of Laws", "400L", "First Semester (Harmattan)", "Evidence Act 2011, admissibility of relevance, direct/hearsay evidence, confessions, character evidence, judicial notice, and burden of proof.")
add_course("LAW 405", "Law of Evidence II", 4, "Faculty of Law", "Procedural Law", "LL.B Bachelor of Laws", "400L", "Second Semester (Rain/Omega)", "Documentary and electronic evidence admissibility, competence and compellability of witnesses, examination-in-chief, cross-examination, and estoppel.")

# =========================================================================
# 6. ACCOUNTING, ECONOMICS, BUSINESS & MANAGEMENT SCIENCES
# =========================================================================
# 100 Level
add_course("ACC 101", "Principles of Financial Accounting I", 3, "Faculty of Management Sciences", "Accounting", "B.Sc Accounting", "100L", "First Semester (Harmattan)", "Accounting concepts, conventions, double-entry bookkeeping, ledger accounts, trial balance, and accounting for cash transactions.")
add_course("ACC 102", "Principles of Financial Accounting II", 3, "Faculty of Management Sciences", "Accounting", "B.Sc Accounting", "100L", "Second Semester (Rain/Omega)", "Final accounts of sole traders, adjustments (accruals, prepayments, depreciation, bad debts), bank reconciliation statements, and correction of errors.")
add_course("ECO 101", "Principles of Microeconomics", 3, "Faculty of Social Sciences", "Economics", "B.Sc Economics", "100L", "First Semester (Harmattan)", "Scarcity, choice, scale of preference, demand and supply equilibrium, elasticity concepts, consumer utility theory, and production costs.")
add_course("ECO 102", "Principles of Macroeconomics", 3, "Faculty of Social Sciences", "Economics", "B.Sc Economics", "100L", "Second Semester (Rain/Omega)", "National income accounting (GDP, GNP), circular flow of income, aggregate demand and supply, inflation, unemployment, and monetary/fiscal policies.")
add_course("BUS 101", "Introduction to Business Management", 3, "Faculty of Management Sciences", "Business Administration", "B.Sc Business Administration", "100L", "First Semester (Harmattan)", "Forms of business ownership, management functions (planning, organizing, leading, controlling), business environment, and ethics.")

# 200 Level
add_course("ACC 201", "Financial Accounting for Partnerships & Corporations", 3, "Faculty of Management Sciences", "Accounting", "B.Sc Accounting", "200L", "First Semester (Harmattan)", "Partnership admissions, dissolutions, goodwill valuation, company share capital, debentures, bonus/rights issues, and publication of accounts.")
add_course("ACC 202", "Cost and Management Accounting I", 3, "Faculty of Management Sciences", "Accounting", "B.Sc Accounting", "200L", "Second Semester (Rain/Omega)", "Cost classifications, material pricing (FIFO, LIFO, Weighted Average), labor costing, overhead allocation, absorption costing, and marginal costing.")
add_course("ECO 201", "Microeconomic Theory (Intermediate)", 3, "Faculty of Social Sciences", "Economics", "B.Sc Economics", "200L", "First Semester (Harmattan)", "Indifference curve analysis, revealed preference, Cobb-Douglas production functions, returns to scale, perfect competition, monopoly, and oligopoly models.")
add_course("ECO 202", "Macroeconomic Theory (Intermediate)", 3, "Faculty of Social Sciences", "Economics", "B.Sc Economics", "200L", "Second Semester (Rain/Omega)", "IS-LM model framework, multiplier analysis, open economy Mundell-Fleming model, Phillips curve, and Central Bank monetary transmission.")
add_course("BFN 201", "Introduction to Banking and Financial Institutions", 3, "Faculty of Management Sciences", "Banking and Finance", "B.Sc Banking and Finance", "200L", "First Semester (Harmattan)", "Nigerian financial system, commercial banking operations, Central Bank of Nigeria (CBN) regulations, money markets, and financial instruments.")

# 300 Level
add_course("ACC 301", "Financial Reporting & IFRS Standards", 3, "Faculty of Management Sciences", "Accounting", "B.Sc Accounting", "300L", "First Semester (Harmattan)", "International Financial Reporting Standards (IFRS/IAS), statement of cash flows (IAS 7), revenue recognition (IFRS 15), and group consolidated accounts.")
add_course("ACC 302", "Auditing and Assurance Services", 3, "Faculty of Management Sciences", "Accounting", "B.Sc Accounting", "300L", "Second Semester (Rain/Omega)", "Auditing standards (ISA), internal controls, audit risk assessment, substantive testing, sampling methods, audit evidence, and auditor's report.")
add_course("ACC 303", "Public Sector and Government Accounting", 3, "Faculty of Management Sciences", "Accounting", "B.Sc Accounting", "300L", "First Semester (Harmattan)", "IPSAS accrual accounting, Treasury Single Account (TSA), government fund accounting, GIFMIS, fiscal responsibility frameworks, and public procurement.")
add_course("MKT 301", "Marketing Management & Consumer Behavior", 3, "Faculty of Management Sciences", "Marketing", "B.Sc Marketing", "300L", "First Semester (Harmattan)", "Marketing mix (4Ps/7Ps), market segmentation, targeting, positioning (STP), consumer buying decision processes, and digital marketing strategies.")
add_course("ECO 301", "Econometrics and Quantitative Methods", 3, "Faculty of Social Sciences", "Economics", "B.Sc Economics", "300L", "First Semester (Harmattan)", "Ordinary Least Squares (OLS) regression, Gauss-Markov assumptions, multicollinearity, heteroskedasticity, autocorrelation, and SPSS/EViews analysis.")

# 400 Level
add_course("ACC 401", "Advanced Corporate Financial Reporting & Consolidation", 3, "Faculty of Management Sciences", "Accounting", "B.Sc Accounting", "400L", "First Semester (Harmattan)", "Complex group consolidations, foreign currency transactions (IAS 21), financial instruments (IFRS 9), segment reporting, and corporate governance.")
add_course("ACC 402", "Taxation Principles and Tax Planning in Nigeria", 3, "Faculty of Management Sciences", "Accounting", "B.Sc Accounting", "400L", "Second Semester (Rain/Omega)", "Companies Income Tax Act (CITA), Personal Income Tax (PITA), Value Added Tax (VAT), withholding taxes, capital gains tax, and FIRS tax filing.")
add_course("ACC 403", "Strategic Financial Management", 3, "Faculty of Management Sciences", "Accounting", "B.Sc Accounting", "400L", "First Semester (Harmattan)", "Capital budgeting (NPV, IRR), Weighted Average Cost of Capital (WACC), capital structure theories (Modigliani-Miller), dividend policies, and mergers/acquisitions.")
add_course("ECO 401", "Economic Planning and Development in Nigeria", 3, "Faculty of Social Sciences", "Economics", "B.Sc Economics", "400L", "First Semester (Harmattan)", "Theories of economic growth, poverty alleviation, structural adjustment, industrialization policies, foreign direct investment, and debt management.")
add_course("BUS 401", "Business Policy and Strategic Management", 3, "Faculty of Management Sciences", "Business Administration", "B.Sc Business Administration", "400L", "Second Semester (Rain/Omega)", "SWOT/PESTEL analysis, Porter's Five Forces, corporate competitive strategy formulation, organizational turnaround, and business case studies.")

# =========================================================================
# 7. POLYTECHNIC PROGRAMMES (ND & HND Standards)
# =========================================================================
add_course("COM 111", "Introduction to Computing & Information Tech", 3, "School of Technology", "Computer Science", "ND Computer Science", "ND I", "First Semester (Harmattan)", "Computer components, input/output peripherals, Windows/Linux OS, office productivity packages (Word, Excel, PowerPoint), and internet basics.")
add_course("COM 112", "Introduction to Digital Electronics", 3, "School of Technology", "Computer Science", "ND Computer Science", "ND I", "First Semester (Harmattan)", "Number systems, Boolean algebra, basic logic gates (AND, OR, NOT, NAND, NOR), truth tables, and simple combinational logic circuits.")
add_course("COM 121", "Programming using Visual Basic/Python", 3, "School of Technology", "Computer Science", "ND Computer Science", "ND I", "Second Semester (Rain/Omega)", "Algorithm design, flowcharts, data types, variable declarations, loops, subroutines, form design, and database connectivity.")
add_course("COM 211", "Object-Oriented Programming with Java", 3, "School of Technology", "Computer Science", "ND Computer Science", "ND II", "First Semester (Harmattan)", "OOP concepts, class creation, objects, methods, encapsulation, inheritance, exceptions, and desktop application interfaces.")
add_course("COM 221", "Database Systems Design & Implementation", 3, "School of Technology", "Computer Science", "ND Computer Science", "ND II", "Second Semester (Rain/Omega)", "Relational database concepts, entity relationship modeling, Microsoft Access/MySQL implementation, SQL queries, and normalization.")
add_course("COM 311", "Operating System Internals & Linux Administration", 3, "School of Technology", "Computer Science", "HND Computer Science", "HND I", "First Semester (Harmattan)", "Linux command line, file system permissions, process control, shell scripting, user administration, and server package management.")
add_course("COM 321", "Web Application Development with PHP/MySQL", 3, "School of Technology", "Computer Science", "HND Computer Science", "HND I", "Second Semester (Rain/Omega)", "Server-side scripting, sessions and cookies, form sanitization, CRUD operations, database connection pooling, and web security.")
add_course("COM 411", "Software Engineering Principles & Project", 4, "School of Technology", "Computer Science", "HND Computer Science", "HND II", "First Semester (Harmattan)", "Software lifecycle models, SRS documentation, system architecture, unit testing, version control with Git, and deployment.")

# =========================================================================
# 8. COLLEGE OF EDUCATION (NCE Standards)
# =========================================================================
add_course("EDU 111", "Introduction to the Teaching Profession", 2, "School of Education", "Educational Foundations", "NCE All Programmes", "NCE I", "First Semester (Harmattan)", "Teaching as a profession, teacher ethics, historical evolution of teacher education in Nigeria, and classroom management basics.")
add_course("EDU 112", "Foundations of Nigerian Education", 2, "School of Education", "Educational Foundations", "NCE All Programmes", "NCE I", "Second Semester (Rain/Omega)", "Indigenous African education, missionary influence, colonial educational policies, National Policy on Education (NPE), and 6-3-3-4/9-3-4 systems.")
add_course("EDU 211", "Educational Psychology & Child Development", 2, "School of Education", "Educational Psychology", "NCE All Programmes", "NCE II", "First Semester (Harmattan)", "Theories of learning (Pavlov, Skinner, Piaget, Vygotsky), cognitive development, motivation in learning, and individual learner differences.")
add_course("EDU 221", "Curriculum Studies & Educational Technology", 2, "School of Education", "Curriculum and Instruction", "NCE All Programmes", "NCE II", "Second Semester (Rain/Omega)", "Curriculum planning, lesson note preparation, instructional objectives (Bloom's taxonomy), and audio-visual teaching aids construction.")
add_course("EDU 311", "Teaching Practice (Supervised School Practicum)", 6, "School of Education", "Educational Foundations", "NCE All Programmes", "NCE III", "First Semester (Harmattan)", "12-week intensive hands-on classroom teaching practice in certified primary or secondary schools with external faculty supervision.")

print(f"Total standard courses generated: {len(COURSES)}")

# Write to src/data/allCoursesData.ts
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
  return COMPREHENSIVE_COURSES.filter(c => c.department.toLowerCase().includes(dept.toLowerCase()) || c.programme.toLowerCase().includes(dept.toLowerCase()));
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

print("Saved to src/data/allCoursesData.ts!")
