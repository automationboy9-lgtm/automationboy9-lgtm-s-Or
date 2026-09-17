import { 
  PastQuestion, 
  StudyMaterial, 
  StudentProfileData, 
  ProjectTopic, 
  MarketplaceListing, 
  CommunityPost, 
  BudgetItem, 
  PlannerTask,
  DocumentItem,
  SemesterRecord,
  AdminStats,
  AIInteractionLog,
  TimetableSlot
} from '../types';

export const DEFAULT_STUDENT: StudentProfileData = {
  id: 'stu_01',
  fullName: 'Chinedu Adeleke',
  username: 'chinedu_tech',
  email: 'chinedu.adeleke@student.ui.edu.ng',
  matricNumber: '219482',
  institutionId: 'ui',
  institutionName: 'University of Ibadan',
  institutionType: 'Federal University',
  faculty: 'Faculty of Technology',
  department: 'Computer Science',
  programme: 'B.Sc Computer Science',
  level: '300L',
  academicSession: '2024/2025',
  gradingSystem: '5.0',
  targetCgpa: 4.65,
  currentCgpa: 4.52,
  totalUnitsTaken: 78,
  isPro: true,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  phone: '+234 803 123 4567',
  bio: '300L Computer Science student at UI. Passionate about software architecture, AI, and backend systems.',
  academicInterests: ['Artificial Intelligence', 'Data Science', 'Backend Engineering', 'Computer Networks'],
  enrolledCourseCodes: ['CSC 301', 'CSC 302', 'MAT 301', 'GST 222'],
  preferredResourceTypes: ['Past Questions & Worked Solutions', 'Lecture Notes & Handouts', 'CBT Practice Tests'],
  preferredTopics: ['Relational Database Normalization', 'Kernel Schedulers', 'Graph Algorithms'],
  joinedReadingGroupIds: ['grp_unilag_csc_300', 'grp_ui_csc_algo'],
  onboardingCompleted: true,
  joinedDate: 'October 2023',
  studyStreakDays: 14,
  roles: ['student', 'course_rep'],
  isCourseRep: true,
  courseRepStatus: 'ACTIVE',
  courseRepCourseCode: 'CSC 301',
  bookmarkedPastQuestionIds: ['pq_1', 'pq_2', 'pq_gst222_2022'],
  bookmarkedStudyMaterialIds: ['mat_1'],
  completedPracticeQuestionsCount: 42,
  studySessionsCount: 9,
  weeklyStudyGoalHours: 15
};

export const SAMPLE_SEMESTERS: SemesterRecord[] = [
  {
    id: 'sem_1',
    semesterName: 'Year 1 - First Semester',
    academicSession: '2022/2023',
    gpa: 4.60,
    totalUnits: 20,
    totalPoints: 92,
    courses: [
      { id: 'c1', courseCode: 'CSC 101', courseTitle: 'Introduction to Computer Science', units: 3, grade: 'A', gradePoint: 5 },
      { id: 'c2', courseCode: 'MAT 101', courseTitle: 'Algebra and Trigonometry', units: 3, grade: 'A', gradePoint: 5 },
      { id: 'c3', courseCode: 'PHY 101', courseTitle: 'General Physics I (Mechanics & Thermal)', units: 3, grade: 'B', gradePoint: 4 },
      { id: 'c4', courseCode: 'CHM 101', courseTitle: 'General Chemistry I (Inorganic & Physical)', units: 3, grade: 'B', gradePoint: 4 },
      { id: 'c5', courseCode: 'GST 101', courseTitle: 'Use of English & Communication Skills I', units: 2, grade: 'A', gradePoint: 5 },
      { id: 'c6', courseCode: 'GST 103', courseTitle: 'Nigerian Peoples & Culture', units: 2, grade: 'A', gradePoint: 5 },
      { id: 'c7', courseCode: 'PHY 107', courseTitle: 'Physics Practical I', units: 2, grade: 'A', gradePoint: 5 },
      { id: 'c8', courseCode: 'CHM 107', courseTitle: 'Chemistry Practical I', units: 2, grade: 'B', gradePoint: 4 }
    ]
  },
  {
    id: 'sem_2',
    semesterName: 'Year 1 - Second Semester',
    academicSession: '2022/2023',
    gpa: 4.45,
    totalUnits: 20,
    totalPoints: 89,
    courses: [
      { id: 'c9', courseCode: 'CSC 102', courseTitle: 'Introduction to Problem Solving & C Programming', units: 3, grade: 'A', gradePoint: 5 },
      { id: 'c10', courseCode: 'MAT 102', courseTitle: 'Calculus and Coordinate Geometry', units: 3, grade: 'B', gradePoint: 4 },
      { id: 'c11', courseCode: 'PHY 102', courseTitle: 'General Physics II (Electricity & Optics)', units: 3, grade: 'B', gradePoint: 4 },
      { id: 'c12', courseCode: 'GST 102', courseTitle: 'Use of English II', units: 2, grade: 'A', gradePoint: 5 },
      { id: 'c13', courseCode: 'STA 102', courseTitle: 'Introductory Statistics', units: 3, grade: 'A', gradePoint: 5 },
      { id: 'c14', courseCode: 'CSC 104', courseTitle: 'Computer Application Packages', units: 2, grade: 'A', gradePoint: 5 },
      { id: 'c15', courseCode: 'PHY 108', courseTitle: 'Physics Practical II', units: 2, grade: 'B', gradePoint: 4 },
      { id: 'c16', courseCode: 'LIB 101', courseTitle: 'Use of Library', units: 2, grade: 'A', gradePoint: 5 }
    ]
  },
  {
    id: 'sem_3',
    semesterName: 'Year 2 - First Semester',
    academicSession: '2023/2024',
    gpa: 4.55,
    totalUnits: 20,
    totalPoints: 91,
    courses: [
      { id: 'c17', courseCode: 'CSC 201', courseTitle: 'Computer Programming I (Object-Oriented Java)', units: 3, grade: 'A', gradePoint: 5 },
      { id: 'c18', courseCode: 'CSC 205', courseTitle: 'Operating Systems Foundations', units: 3, grade: 'A', gradePoint: 5 },
      { id: 'c19', courseCode: 'MAT 201', courseTitle: 'Linear Algebra I', units: 3, grade: 'B', gradePoint: 4 },
      { id: 'c20', courseCode: 'MAT 203', courseTitle: 'Differential Equations', units: 3, grade: 'B', gradePoint: 4 },
      { id: 'c21', courseCode: 'GST 201', courseTitle: 'Peace Studies & Conflict Resolution', units: 2, grade: 'A', gradePoint: 5 },
      { id: 'c22', courseCode: 'EEE 201', courseTitle: 'Basic Circuit Theory', units: 3, grade: 'A', gradePoint: 5 },
      { id: 'c23', courseCode: 'CSC 299', courseTitle: 'Software Laboratory I', units: 3, grade: 'A', gradePoint: 5 }
    ]
  }
];

export const SAMPLE_PAST_QUESTIONS: PastQuestion[] = [
  {
    id: 'pq_gst101_ui',
    courseCode: 'GST 101',
    courseTitle: 'Use of English & Communication Skills',
    institutionId: 'ui',
    institutionName: 'University of Ibadan',
    faculty: 'General Studies Unit',
    department: 'General Studies',
    level: '100L',
    sessionYear: '2023/2024',
    semester: 'First Semester (Harmattan)',
    examType: 'Semester Exam',
    questionCount: 40,
    rating: 4.9,
    source: 'General Studies Unit UI Past Question Archive (2023/2024)',
    sourceType: 'authorized_upload',
    status: 'Approved',
    copyrightNotice: 'Educational fair-use review material for Nigerian undergraduate examination preparation.',
    questions: [
      {
        id: 1,
        question: 'Which of the following sentences correctly illustrates the subjective case of the personal pronoun in English syntax?',
        options: [
          'It was him who delivered the vote of thanks.',
          'It was he who delivered the vote of thanks.',
          'Between you and I, the lecture was cancelled.',
          'The Dean invited my friend and I to the symposium.'
        ],
        correctOption: 1,
        explanation: 'In formal standard English, the predicate pronoun following the linking verb "was" takes the subjective/nominative case ("he", not "him").',
        type: 'objective'
      },
      {
        id: 2,
        question: 'Identify the figure of speech in: "The Nigerian economy groaned under the burden of soaring inflation."',
        options: [
          'Metaphor',
          'Personification',
          'Hyperbole',
          'Synecdoche'
        ],
        correctOption: 1,
        explanation: 'Personification assigns human attributes ("groaned") to an inanimate abstract concept ("the Nigerian economy").',
        type: 'objective'
      },
      {
        id: 3,
        question: 'What is the phonetic transcription of the vowel sound in the word "plumb"?',
        options: [
          '/ʌ/ (Short open-mid back unrounded vowel)',
          '/uː/ (Long close back rounded vowel)',
          '/ɒ/ (Short open back rounded vowel)',
          '/æ/ (Short near-open front unrounded vowel)'
        ],
        correctOption: 0,
        explanation: '"Plumb" is pronounced /plʌm/ with the /ʌ/ vowel sound (like in "cup", "strut"). The "b" is silent.',
        type: 'objective'
      },
      {
        id: 4,
        question: 'In academic writing, which referencing style is most commonly used in Social Sciences and Education in Nigerian tertiary institutions?',
        options: [
          'APA (American Psychological Association) 7th Edition',
          'IEEE Citation Format',
          'Chicago Manual of Style (Notes and Bibliography)',
          'OSCOLA Legal Referencing'
        ],
        correctOption: 0,
        explanation: 'APA referencing (author, year) is the dominant standard across Nigerian Universities for social sciences, management, and education.',
        type: 'objective'
      }
    ]
  },
  {
    id: 'pq_mat101_unilag',
    courseCode: 'MAT 101',
    courseTitle: 'Elementary Mathematics I (Algebra & Trigonometry)',
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'Faculty of Science',
    department: 'Mathematics',
    level: '100L',
    sessionYear: '2023/2024',
    semester: 'First Semester (Harmattan)',
    examType: 'Semester Exam',
    questionCount: 30,
    rating: 4.8,
    source: 'UNILAG Department of Mathematics Exam Repository (2023/2024)',
    sourceType: 'authorized_upload',
    status: 'Approved',
    copyrightNotice: 'Educational fair-use review material.',
    questions: [
      {
        id: 1,
        question: 'If the roots of the quadratic equation 2x² - 7x + 3 = 0 are α and β, calculate the exact value of (1/α + 1/β).',
        options: [
          '7/3',
          '3/7',
          '-7/3',
          '14/3'
        ],
        correctOption: 0,
        explanation: 'Using Vieta\'s formulas: α + β = -(-7)/2 = 7/2, and αβ = 3/2. Therefore, (1/α + 1/β) = (α + β)/(αβ) = (7/2) / (3/2) = 7/3.',
        type: 'objective'
      },
      {
        id: 2,
        question: 'Find the 7th term of the Geometric Progression (G.P.): 3, 6, 12, 24, ...',
        options: [
          '192',
          '384',
          '768',
          '96'
        ],
        correctOption: 0,
        explanation: 'First term a = 3, common ratio r = 6/3 = 2. The nth term T_n = a * r^(n-1). For n = 7: T_7 = 3 * 2^(7-1) = 3 * 2^6 = 3 * 64 = 192.',
        type: 'objective'
      },
      {
        id: 3,
        question: 'Solve for x in the equation: log₂(x + 2) + log₂(x - 2) = 5',
        options: [
          'x = 6 (ignoring extraneous negative root)',
          'x = 4',
          'x = 8',
          'x = √32'
        ],
        correctOption: 0,
        explanation: 'By product rule: log₂((x + 2)(x - 2)) = 5 => x² - 4 = 2⁵ = 32 => x² = 36 => x = 6 (x = -6 is invalid as log arguments must be > 0).',
        type: 'objective'
      }
    ]
  },
  {
    id: 'pq_csc201_futa',
    courseCode: 'CSC 201',
    courseTitle: 'Computer Programming I (Data Structures & OOP)',
    institutionId: 'futa',
    institutionName: 'Federal University of Technology, Akure',
    faculty: 'School of Computing (SOC)',
    department: 'Computer Science',
    level: '200L',
    sessionYear: '2023/2024',
    semester: 'First Semester (Harmattan)',
    examType: 'Semester Exam',
    questionCount: 25,
    rating: 4.95,
    source: 'FUTA School of Computing Exam Archive',
    sourceType: 'authorized_upload',
    status: 'Approved',
    copyrightNotice: 'Educational fair-use review material.',
    questions: [
      {
        id: 1,
        question: 'Which of the following data structures follows the LIFO (Last In First Out) principle and is used in function recursion call stacks?',
        options: [
          'Queue',
          'Stack',
          'Linked List',
          'Binary Search Tree'
        ],
        correctOption: 1,
        explanation: 'A Stack is a LIFO data structure where the most recently pushed element is the first to be popped.',
        type: 'objective'
      },
      {
        id: 2,
        question: 'What is the worst-case time complexity of standard QuickSort when the pivot selection is unoptimized (e.g., always selecting the first element on an already sorted array)?',
        options: [
          'O(n log n)',
          'O(n²)',
          'O(log n)',
          'O(n)'
        ],
        correctOption: 1,
        explanation: 'When the partition is completely unbalanced on a sorted list, recursion depth becomes n and comparisons total n(n-1)/2 yielding O(n²).',
        type: 'objective'
      }
    ]
  },
  {
    id: 'pq_acc101_poly',
    courseCode: 'ACC 101',
    courseTitle: 'Principles of Financial Accounting I',
    institutionId: 'yabatech',
    institutionName: 'Yaba College of Technology',
    faculty: 'School of Management and Business Studies',
    department: 'Accounting',
    level: 'ND I',
    sessionYear: '2023/2024',
    semester: 'First Semester (Harmattan)',
    examType: 'Semester Exam',
    questionCount: 35,
    rating: 4.7,
    source: 'YABATECH SMBS Student Academic Board',
    sourceType: 'student_submission',
    status: 'Approved',
    copyrightNotice: 'Educational review material.',
    questions: [
      {
        id: 1,
        question: 'According to the fundamental accounting equation, which of the following expressions is ALWAYS true?',
        options: [
          'Assets = Liabilities + Owner\'s Equity (Capital)',
          'Assets = Liabilities - Capital',
          'Capital = Assets + Liabilities',
          'Liabilities = Capital - Assets'
        ],
        correctOption: 0,
        explanation: 'The fundamental accounting equation states that Total Assets = Total Liabilities + Equity.',
        type: 'objective'
      }
    ]
  },
  {
    id: 'pq_law101_oau',
    courseCode: 'LAW 101',
    courseTitle: 'Legal Method I (Sources of Nigerian Law)',
    institutionId: 'oau',
    institutionName: 'Obafemi Awolowo University',
    faculty: 'Faculty of Law',
    department: 'Law',
    level: '100L',
    sessionYear: '2022/2023',
    semester: 'First Semester (Harmattan)',
    examType: 'Semester Exam',
    questionCount: 20,
    rating: 4.9,
    source: 'OAU Law Students Society (LSS) Editorial Board',
    sourceType: 'student_submission',
    status: 'Approved',
    copyrightNotice: 'Educational review material.',
    questions: [
      {
        id: 1,
        question: 'Under the hierarchy of Nigerian court systems, decisions of which court are binding on all other subordinate courts nationwide based on the doctrine of stare decisis?',
        options: [
          'Federal High Court',
          'Court of Appeal',
          'Supreme Court of Nigeria',
          'National Industrial Court'
        ],
        correctOption: 2,
        explanation: 'The Supreme Court is the apex court in Nigeria, and its judicial precedents bind all other courts in the federation.',
        type: 'objective'
      }
    ]
  }
];

export const SAMPLE_STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat_1',
    title: 'Comprehensive GST 101 Exam Revision Summary & Idiomatic Expressions',
    courseCode: 'GST 101',
    courseTitle: 'Use of English & Communication Skills',
    faculty: 'General Studies',
    department: 'General Studies Unit',
    level: '100L',
    semester: 'First Semester (Harmattan)',
    institutionName: 'University of Ibadan',
    uploaderName: 'Dr. A. O. Babatunde (Verified HOD Lecturer)',
    fileType: 'PDF',
    pages: 42,
    fileSize: '3.4 MB',
    downloads: 1420,
    rating: 4.9,
    source: 'UI General Studies Unit (2024)',
    sourceType: 'authorized_upload',
    status: 'Approved',
    copyrightNotice: 'Educational study note shared for university revision.',
    description: 'Complete departmental lecture notes covering syntax, phonetics, reading comprehension techniques, concordance rules, and standard past questions marking scheme.',
    tags: ['GST', 'English', '100L', 'Grammar', 'Phonetics'],
    dateUploaded: 'Jan 15, 2024'
  },
  {
    id: 'mat_2',
    title: 'CSC 201: Data Structures and Algorithms with Java Implementations',
    courseCode: 'CSC 201',
    courseTitle: 'Computer Programming I',
    faculty: 'Faculty of Science',
    department: 'Computer Science',
    level: '200L',
    semester: 'First Semester (Harmattan)',
    institutionName: 'University of Lagos',
    uploaderName: 'Prof. K. E. Okoye',
    fileType: 'PDF',
    pages: 88,
    fileSize: '6.8 MB',
    downloads: 980,
    rating: 5.0,
    source: 'Department of Computer Science UNILAG',
    sourceType: 'authorized_upload',
    status: 'Approved',
    copyrightNotice: 'Educational revision material.',
    description: 'Detailed slides and runnable code examples for Linked Lists, Stacks, Queues, Binary Trees, Graph Traversal (BFS/DFS), and Big-O Complexity.',
    tags: ['Data Structures', 'Java', 'CSC201', 'Algorithms'],
    dateUploaded: 'Feb 02, 2024'
  },
  {
    id: 'mat_3',
    title: 'MAT 101: Worked Solutions to 10-Year Past Questions (Step-by-Step)',
    courseCode: 'MAT 101',
    courseTitle: 'Elementary Mathematics I (Algebra & Trigonometry)',
    faculty: 'Faculty of Science',
    department: 'Mathematics',
    level: '100L',
    semester: 'First Semester (Harmattan)',
    institutionName: 'FUTA',
    uploaderName: 'Engr. S. Adeleke (First Class Alumni)',
    fileType: 'PDF',
    pages: 65,
    fileSize: '5.1 MB',
    downloads: 2150,
    rating: 4.95,
    source: 'FUTA Mathematics Departmental Tutors',
    sourceType: 'student_submission',
    status: 'Approved',
    copyrightNotice: 'Educational study aid.',
    description: 'Step-by-step breakdown of quadratic equations, binomial expansions, polynomial division, matrix determinants, and De Moivre\'s theorem.',
    tags: ['Maths', 'MAT101', 'Algebra', 'Worked Solutions'],
    dateUploaded: 'Nov 20, 2023'
  },
  {
    id: 'mat_4',
    title: 'MEE 201: Engineering Mechanics (Statics & Dynamics) Handout',
    courseCode: 'MEE 201',
    courseTitle: 'Engineering Mechanics',
    faculty: 'Faculty of Engineering',
    department: 'Mechanical Engineering',
    level: '200L',
    semester: 'First Semester (Harmattan)',
    institutionName: 'Ahmadu Bello University',
    uploaderName: 'Engr. Dr. M. Bello',
    fileType: 'PDF',
    pages: 74,
    fileSize: '7.2 MB',
    downloads: 730,
    rating: 4.8,
    source: 'ABU Zaria Faculty of Engineering Handouts',
    sourceType: 'authorized_upload',
    status: 'Approved',
    copyrightNotice: 'Departmental educational study guide.',
    description: 'Free body diagrams, vector equilibrium, moments, centroids, moment of inertia, and Newton’s laws applied to mechanical assemblies.',
    tags: ['Engineering', 'Statics', 'Dynamics', 'Mechanics'],
    dateUploaded: 'Jan 28, 2024'
  },
  {
    id: 'mat_5',
    title: 'ACC 101: Financial Accounting Principles & Ledger Templates',
    courseCode: 'ACC 101',
    courseTitle: 'Principles of Accounting',
    faculty: 'Faculty of Management Sciences',
    department: 'Accounting',
    level: '100L / ND I',
    semester: 'First Semester (Harmattan)',
    institutionName: 'Yaba College of Technology',
    uploaderName: 'Mrs. F. Adebayo (FCA)',
    fileType: 'PDF',
    pages: 50,
    fileSize: '4.0 MB',
    downloads: 1100,
    rating: 4.75,
    source: 'YABATECH SMBS Accounting Course Materials',
    sourceType: 'authorized_upload',
    status: 'Approved',
    copyrightNotice: 'Educational accounting practice sheets.',
    description: 'Double entry book-keeping, trial balance adjustments, trading profit & loss accounts, and balance sheet prep for Nigerian small businesses.',
    tags: ['Accounting', 'ACC101', 'Ledger', 'Financial Accounting'],
    dateUploaded: 'Dec 12, 2023'
  }
];

export const SAMPLE_PROJECT_TOPICS: ProjectTopic[] = [
  {
    id: 'proj_1',
    title: 'Design and Implementation of an AI-Powered Mobile Disease Surveillance System for Rural Healthcare Centers in Nigeria',
    department: 'Computer Science',
    faculty: 'Faculty of Science / Computing',
    problemStatement: 'Primary healthcare centers in rural Nigerian local governments lack real-time epidemiological monitoring tools, delaying malaria and cholera outbreak containment.',
    objectives: [
      'To build a lightweight offline-first mobile diagnostic logger for rural community health extension workers (CHEWs).',
      'To implement a centralized predictive analytics dashboard aggregating disease patterns by LGA.',
      'To evaluate the system latency and diagnostic accuracy against Ministry of Health benchmarks.'
    ],
    methodology: 'Agile software development methodology; Flutter cross-platform mobile frontend with local SQLite caching; Node.js backend with Geospatial GIS clustering algorithms.',
    expectedOutcome: 'A deployable web and mobile surveillance portal capable of operating in low-bandwidth environments across Nigerian state health ministries.',
    caseStudyFocus: 'Selected Primary Healthcare Centers in Oyo and Osun States.'
  },
  {
    id: 'proj_2',
    title: 'Development of an IoT-Based Smart Prepaid Energy Meter with Anti-Tampering and USSD Recharge Architecture for Nigerian DisCos',
    department: 'Electrical & Electronics Engineering',
    faculty: 'Faculty of Engineering',
    problemStatement: 'Electricity Distribution Companies (DisCos) in Nigeria incur massive commercial losses due to meter bypass, energy theft, and poor network connectivity in remote suburbs.',
    objectives: [
      'To design an embedded microcontroller circuit capable of sensing current imbalance and physical enclosure breach.',
      'To integrate a GSM/GPRS module for offline USSD-based token recharge without internet dependence.',
      'To test meter accuracy under fluctuating Nigerian grid voltage (160V - 260V).'
    ],
    methodology: 'Hardware prototyping using ESP32 microcontroller, PZEM-004T energy sensor, SIM800L GSM module, and cloud MQTT broker.',
    expectedOutcome: 'A functional hardware prototype with instant SMS tamper notification sent to the DisCo substation.',
    caseStudyFocus: 'Ibadan Electricity Distribution Company (IBEDC) Feeder Network.'
  },
  {
    id: 'proj_3',
    title: 'Assessment of Financial Technology (Fintech) Adoption on the Growth of Micro, Small, and Medium Enterprises (MSMEs) in Lagos State',
    department: 'Economics',
    faculty: 'Faculty of Social Sciences',
    problemStatement: 'Despite the explosion of payment gateways and POS agents, many informal MSMEs in Lagos markets face transaction failure costs and credit access bottlenecks.',
    objectives: [
      'To determine the extent to which digital payment platforms influence weekly sales turnover of market traders.',
      'To examine the impact of fintech micro-loans on business capital expansion.',
      'To identify structural barriers such as network downtime and fraudulent chargeback disputes.'
    ],
    methodology: 'Descriptive survey research design; structured questionnaire administered to 350 registered market traders in Computer Village and Balogun Market; Multiple Regression Analysis via SPSS.',
    expectedOutcome: 'Actionable policy recommendations for the Central Bank of Nigeria (CBN) and commercial fintech operators on rural payment resilience.',
    caseStudyFocus: 'Registered Traders in Lagos Mainland and Island Commercial Hubs.'
  }
];

export const SAMPLE_MARKETPLACE_LISTINGS: MarketplaceListing[] = [
  {
    id: 'mkt_1',
    title: 'Casio fx-991EX ClassWiz Scientific Calculator (Original)',
    price: 18500,
    category: 'Calculators',
    institutionName: 'University of Ibadan',
    campusLocation: 'Kuti Hall / Faculty of Tech',
    sellerName: 'Tunde Bakare',
    sellerPhone: '+2348023456789',
    sellerRating: 4.9,
    condition: 'Like New',
    description: 'Clean Casio ClassWiz calculator used for only one semester. Perfect for MAT 101/102, Engineering, and Physics students. Solar & battery powered with high-res LCD screen.',
    postedAt: '2 days ago',
    isVerifiedStudent: true
  },
  {
    id: 'mkt_2',
    title: 'Standard Laboratory White Coat + Safety Goggles (Size L)',
    price: 6500,
    category: 'Medical Supplies',
    institutionName: 'University of Lagos',
    campusLocation: 'College of Medicine, Idi-Araba',
    sellerName: 'Amina Yusuf',
    sellerPhone: '+2348134567890',
    sellerRating: 5.0,
    condition: 'Brand New',
    description: 'Thick 100% cotton lab coat required for Chemistry and Medical Science practicals. Includes side slits and chest pocket.',
    postedAt: '1 day ago',
    isVerifiedStudent: true
  },
  {
    id: 'mkt_3',
    title: 'A1 Engineering Drawing Board with T-Square & Set Squares',
    price: 14000,
    category: 'Engineering Equipment',
    institutionName: 'FUTA',
    campusLocation: 'South Gate / Obanla Campus',
    sellerName: 'Emeka Nwosu',
    sellerPhone: '+2348056789012',
    sellerRating: 4.8,
    condition: 'Good',
    description: 'Smooth drafting board with metallic edge clip and 90cm wooden T-square. Essential for MEE 101 / MEE 201 technical drawing courses.',
    postedAt: '3 days ago',
    isVerifiedStudent: true
  },
  {
    id: 'mkt_4',
    title: 'Essential University Physics (Vol 1 & 2 by Wolfson) Textbook',
    price: 8000,
    category: 'Textbooks',
    institutionName: 'Obafemi Awolowo University',
    campusLocation: 'Fajuyi Hall, OAU Ile-Ife',
    sellerName: 'Kehinde Olatunji',
    sellerPhone: '+2348078901234',
    sellerRating: 4.7,
    condition: 'Good',
    description: 'Complete textbook for PHY 101 & PHY 102. No torn pages, highlighted key chapters with formula summary cheat-sheet inside.',
    postedAt: '5 days ago',
    isVerifiedStudent: true
  }
];

export const SAMPLE_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post_1',
    authorName: 'Blessing Okoro',
    authorInstitution: 'University of Ibadan',
    authorDepartment: 'Pharmacy (400L)',
    authorBadge: 'Top Contributor',
    title: 'Tips for passing GST 101 with an A without cramming the entire textbook',
    content: 'For freshers asking about GST 101 exams: the key is understanding the 15 core concordance rules and phonetic vowel transcriptions (/ʌ/, /æ/, /θ/, /ð/). Do not memorize past questions blindly—focus on understanding why the options are right. Happy to answer questions below!',
    category: 'Academic Help',
    likes: 84,
    commentsCount: 16,
    createdAt: '3 hours ago',
    isLiked: false,
    comments: [
      {
        id: 'c_1',
        authorName: 'Samuel Danjuma',
        authorInstitution: 'ABU Zaria',
        content: 'Spot on! The phonetics section carries almost 30% of the CBT questions in most federal universities.',
        createdAt: '2 hours ago'
      },
      {
        id: 'c_2',
        authorName: 'Faith Adeleke',
        authorInstitution: 'UNILAG',
        content: 'Thanks Blessing! Could you explain the difference between restrictive and non-restrictive relative clauses?',
        createdAt: '1 hour ago'
      }
    ]
  },
  {
    id: 'post_2',
    authorName: 'Farouk Usman',
    authorInstitution: 'FUTA',
    authorDepartment: 'Computer Science (300L)',
    authorBadge: 'Tech Lead',
    title: 'How I maintain a 4.80 CGPA while working on open source software projects',
    content: 'Many students believe you have to sacrifice all extracurricular activities to graduate with a First Class. Here is my daily schedule: 1) Active recall 1 hour before sleeping, 2) Complete past questions before the lecturer finishes the syllabus, 3) 25-minute Pomodoro sprints. Consistency beats 14-hour night marathons before exams!',
    category: 'Exam Prep',
    likes: 128,
    commentsCount: 24,
    createdAt: '6 hours ago',
    isLiked: true,
    comments: []
  },
  {
    id: 'post_3',
    authorName: 'Ifeanyi Nnamdi',
    authorInstitution: 'UNN Nsukka',
    authorDepartment: 'Civil Engineering (500L)',
    authorBadge: 'FYP Scholar',
    title: 'Final Year Project Defense Advice: What external supervisors really look for',
    content: 'Just concluded my mock defense today. Note this down: 1. Know your methodology inside out. 2. Understand every mathematical formula in Chapter 3. 3. Cite recent Nigerian empirical research from 2020-2024. Never put something in your slides you cannot defend within 30 seconds.',
    category: 'Final Year Project',
    likes: 95,
    commentsCount: 19,
    createdAt: '1 day ago',
    isLiked: false,
    comments: []
  }
];

export const SAMPLE_TASKS: PlannerTask[] = [
  {
    id: 'tsk_1',
    title: 'CSC 301 Assignment 2 (Binary Search Tree Traversal Algorithm)',
    courseCode: 'CSC 301',
    dueDate: '2026-09-08',
    dueTime: '23:59',
    type: 'assignment',
    priority: 'high',
    isCompleted: false,
    notes: 'Implement recursive in-order, pre-order, and post-order traversal in Java.'
  },
  {
    id: 'tsk_2',
    title: 'MAT 201 Mid-Semester Test Preparation (Eigenvalues & Vectors)',
    courseCode: 'MAT 201',
    dueDate: '2026-09-12',
    dueTime: '10:00',
    type: 'test',
    priority: 'high',
    isCompleted: false,
    notes: 'Review tutorial sheet chapters 3 and 4 with study group.'
  },
  {
    id: 'tsk_3',
    title: 'Chapter 2 Literature Review Draft for Final Year Seminar',
    courseCode: 'CSC 499',
    dueDate: '2026-09-18',
    dueTime: '16:00',
    type: 'project',
    priority: 'medium',
    isCompleted: false,
    notes: 'Collect 15 peer-reviewed papers on AI disease surveillance in Sub-Saharan Africa.'
  }
];

export const SAMPLE_BUDGET: BudgetItem[] = [
  { id: 'b_1', title: 'Monthly Pocket Allowance from Parents', amount: 45000, type: 'income', category: 'Allowance', date: '2026-09-01' },
  { id: 'b_2', title: 'Departmental Handout & Practical Manuals', amount: 6500, type: 'expense', category: 'Textbooks & Handouts', date: '2026-09-02' },
  { id: 'b_3', title: 'Faculty & Departmental Student Association Dues', amount: 3000, type: 'expense', category: 'Departmental Dues', date: '2026-09-03' },
  { id: 'b_4', title: 'Monthly MTN 50GB Student Data Plan', amount: 7500, type: 'expense', category: 'Data & Subscriptions', date: '2026-09-03' },
  { id: 'b_5', title: 'Hostel Provisions & Food Market Run', amount: 12000, type: 'expense', category: 'Food & Groceries', date: '2026-09-04' }
];

export const SAMPLE_DOCUMENTS: DocumentItem[] = [
  { id: 'doc_1', title: 'Official Admission Letter (JAMB & Institution)', category: 'Admission', fileSize: '1.2 MB', uploadedAt: 'Oct 14, 2023', secureTag: 'VERIFIED_ORIGINAL' },
  { id: 'doc_2', title: '2023/2024 School Fees Receipt (e-Tranzact)', category: 'School Fees', fileSize: '850 KB', uploadedAt: 'Nov 02, 2023', secureTag: 'PAID_PORTAL_APPROVED' },
  { id: 'doc_3', title: 'Harmattan Semester Course Registration Form', category: 'Course Registration', fileSize: '640 KB', uploadedAt: 'Nov 10, 2023', secureTag: 'HOD_SIGNED' },
  { id: 'doc_4', title: 'Smart Student Identity Card Copy', category: 'ID Card', fileSize: '420 KB', uploadedAt: 'Jan 05, 2024', secureTag: 'VALIDATED_2026' }
];

export const SAMPLE_ADMIN_STATS: AdminStats = {
  totalStudents: 34820,
  activeToday: 4190,
  totalInstitutions: 168,
  totalCourses: 450,
  totalPastQuestions: 14200,
  totalStudyMaterials: 8950,
  totalAiQueriesToday: 18450,
  proSubscribers: 4210,
  monthlyRevenueNgn: 6315000,
  systemHealth: 'Optimal'
};

export const SAMPLE_AI_LOGS: AIInteractionLog[] = [
  {
    id: 'log_1',
    studentName: 'Chinedu Adeleke',
    institution: 'University of Ibadan',
    department: 'Computer Science',
    promptSnippet: 'Explain time complexity of Dijkstra vs A* search algorithm for exam revision...',
    responseTokens: 420,
    mode: 'AI Study Copilot',
    timestamp: '2 mins ago',
    status: 'Success'
  },
  {
    id: 'log_2',
    studentName: 'Zainab Mohammed',
    institution: 'Ahmadu Bello University',
    department: 'Human Physiology',
    promptSnippet: 'Generate 5 practice past questions on cardiac cycle and action potential...',
    responseTokens: 580,
    mode: 'Exam Quiz Generator',
    timestamp: '8 mins ago',
    status: 'Success'
  },
  {
    id: 'log_3',
    studentName: 'Oluwaseun Bakare',
    institution: 'University of Lagos',
    department: 'Commercial Law',
    promptSnippet: 'Explain the rule in Rylands v Fletcher with Nigerian Supreme Court precedents...',
    responseTokens: 640,
    mode: 'Assignment Assistant',
    timestamp: '14 mins ago',
    status: 'Success'
  }
];

export const SAMPLE_TIMETABLE: TimetableSlot[] = [
  {
    id: 'tt_1',
    courseCode: 'CSC 301',
    courseTitle: 'Database Management Systems',
    day: 'Monday',
    time: '08:00 AM - 10:00 AM',
    venue: 'Faculty of Tech Lecture Theatre 1 (LT1)',
    lecturer: 'Prof. A. O. Osofisan'
  },
  {
    id: 'tt_2',
    courseCode: 'CSC 303',
    courseTitle: 'Operating Systems Principles',
    day: 'Monday',
    time: '11:00 AM - 01:00 PM',
    venue: 'Hardware Lab II, CS Dept',
    lecturer: 'Dr. K. A. Akanni'
  },
  {
    id: 'tt_3',
    courseCode: 'MAT 301',
    courseTitle: 'Numerical Analysis I',
    day: 'Tuesday',
    time: '09:00 AM - 11:00 AM',
    venue: 'Science Hall 3 (Large Amphitheatre)',
    lecturer: 'Dr. O. B. Babatunde'
  },
  {
    id: 'tt_4',
    courseCode: 'GST 301',
    courseTitle: 'Entrepreneurship & Innovation',
    day: 'Wednesday',
    time: '10:00 AM - 12:00 PM',
    venue: 'University Central CBT Centre',
    lecturer: 'Prof. Y. K. Sanusi'
  },
  {
    id: 'tt_5',
    courseCode: 'CSC 305',
    courseTitle: 'Data Communications & Networks',
    day: 'Thursday',
    time: '02:00 PM - 04:00 PM',
    venue: 'New Tech Complex Room 204',
    lecturer: 'Dr. E. O. Ojo'
  },
  {
    id: 'tt_6',
    courseCode: 'CSC 399',
    courseTitle: 'Software Engineering Laboratory & Practical',
    day: 'Friday',
    time: '09:00 AM - 12:00 PM',
    venue: 'Main Software Engineering Hub',
    lecturer: 'Engr. D. Adeleke & Tech Team'
  }
];

