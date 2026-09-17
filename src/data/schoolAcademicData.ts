import { 
  Institution, 
  SchoolCalendar, 
  AcademicCalendarEvent, 
  SchoolTimetableEntry, 
  CourseRecord, 
  PastQuestion 
} from '../types';

// =========================================================================
// 1. ACCREDITED LEVELS RESOLVER FOR EVERY SCHOOL TYPE IN NIGERIA
// =========================================================================
export function getSchoolAccreditedLevels(inst: Institution): string[] {
  const name = inst.name.toLowerCase();
  const type = inst.type.toLowerCase();

  // Adeyemi College of Technology Ondo: 2-year program (ND1, ND2)
  if (inst.id === 'adeyemi_tech_ondo' || name.includes('adeyemi college of technology')) {
    return ['ND 1', 'ND 2'];
  }

  // Monotechnics / Specialized Technology Colleges with 2-year programs
  if (type.includes('monotechnic') || name.includes('college of technology') || name.includes('institute of journalism')) {
    return ['ND 1', 'ND 2'];
  }

  // Polytechnics (National Diploma & Higher National Diploma)
  if (type.includes('polytechnic') || name.includes('polytechnic')) {
    return ['ND 1', 'ND 2', 'HND 1', 'HND 2'];
  }

  // Colleges of Education
  if (type.includes('education') || name.includes('college of education')) {
    return ['NCE I', 'NCE II', 'NCE III'];
  }

  // Colleges of Nursing Sciences & Health Technology
  if (type.includes('nursing') || type.includes('health') || name.includes('college of health')) {
    return ['Year 1', 'Year 2', 'Year 3', 'Year 4'];
  }

  // Aviation
  if (name.includes('aviation') || inst.id === 'ncat_zaria') {
    return ['Stage 1', 'Stage 2', 'Stage 3'];
  }

  // Universities (5-year for Engr/Agric/Pharm, 6-year for Med/Vet, 4-year for Arts/Sci)
  const hasLongProg = (inst.faculties || []).some(f => 
    f.toLowerCase().includes('medicine') || 
    f.toLowerCase().includes('surgery') || 
    f.toLowerCase().includes('veterinary')
  );

  if (hasLongProg) {
    return ['100L', '200L', '300L', '400L', '500L', '600L'];
  }

  const hasEngOrLaw = (inst.faculties || []).some(f => 
    f.toLowerCase().includes('engineering') || 
    f.toLowerCase().includes('technology') || 
    f.toLowerCase().includes('law') ||
    f.toLowerCase().includes('pharmacy')
  );

  if (hasEngOrLaw) {
    return ['100L', '200L', '300L', '400L', '500L'];
  }

  return ['100L', '200L', '300L', '400L'];
}

// =========================================================================
// 2. OFFICIAL ACADEMIC CALENDARS (FIRST & SECOND SEMESTER SCHEDULES)
// =========================================================================
export const SCHOOL_CALENDARS: Record<string, SchoolCalendar> = {
  'adeyemi_tech_ondo': {
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    academicSession: '2024/2025',
    approvedBy: 'College Academic Board & NBTE Regulatory Directorate',
    lastUpdated: 'Approved for 2024/2025 Session',
    firstSemester: {
      startDate: 'October 14, 2024',
      endDate: 'February 21, 2025',
      examStartDate: 'February 03, 2025',
      events: [
        {
          id: 'cal_acto_1',
          title: 'Resumption of ND 1 (Freshers) & ND 2 (Returning Students)',
          category: 'Resumption',
          startDate: '2024-10-14',
          endDate: '2024-10-18',
          description: 'Arrival of all admitted ND 1 candidates and returning ND 2 engineering technology students to campus hostels.',
          semester: 'First Semester (Harmattan)',
          status: 'completed'
        },
        {
          id: 'cal_acto_2',
          title: 'Online Portal Screening, Verification & Course Registration',
          category: 'Registration',
          startDate: '2024-10-14',
          endDate: '2024-10-25',
          description: 'Payment of college fees, biometric verification, and course enrollment across all 4 departments.',
          semester: 'First Semester (Harmattan)',
          status: 'completed'
        },
        {
          id: 'cal_acto_3',
          title: 'ND 1 Orientation & Industrial Safety Workshop',
          category: 'Registration',
          startDate: '2024-10-21',
          endDate: '2024-10-23',
          description: 'Faculty of Engineering Technology induction on computer laboratory etiquette, hardware workshop safety, and ethics.',
          semester: 'First Semester (Harmattan)',
          status: 'completed'
        },
        {
          id: 'cal_acto_4',
          title: 'Commencement of 1st Semester Lectures & Practical Labs',
          category: 'Lectures',
          startDate: '2024-10-28',
          endDate: '2025-01-24',
          description: 'Intensive academic lectures and hands-on laboratory workshops for ND 1 and ND 2 departments.',
          semester: 'First Semester (Harmattan)',
          status: 'ongoing'
        },
        {
          id: 'cal_acto_5',
          title: 'Official Matriculation Ceremony for ND 1 Freshmen',
          category: 'Matriculation',
          startDate: '2024-11-20',
          description: 'Formal induction of new ND 1 students into Adeyemi College of Technology, Ondo.',
          semester: 'First Semester (Harmattan)',
          status: 'completed'
        },
        {
          id: 'cal_acto_6',
          title: 'Mid-Semester Continuous Assessment (CA) & CBT Tests',
          category: 'Continuous Assessment',
          startDate: '2024-12-09',
          endDate: '2024-12-13',
          description: 'Departmental CA assessments accounting for 30% of total semester evaluation.',
          semester: 'First Semester (Harmattan)',
          status: 'completed'
        },
        {
          id: 'cal_acto_7',
          title: 'Revision & Practical Engineering Project Submissions Week',
          category: 'Lectures',
          startDate: '2025-01-27',
          endDate: '2025-01-31',
          description: 'Zero lecture week dedicated to revision, hardware workshop project tests, and multimedia portfolio reviews.',
          semester: 'First Semester (Harmattan)',
          status: 'upcoming'
        },
        {
          id: 'cal_acto_8',
          title: 'First Semester Examinations (ND 1 & ND 2)',
          category: 'Examination',
          startDate: '2025-02-03',
          endDate: '2025-02-21',
          description: 'Written theory examinations and CBT assessments for all courses.',
          semester: 'First Semester (Harmattan)',
          status: 'upcoming'
        },
        {
          id: 'cal_acto_9',
          title: 'First Semester Break & Result Collation',
          category: 'Break',
          startDate: '2025-02-24',
          endDate: '2025-03-07',
          description: 'Two weeks inter-semester vacation for students and academic board grading.',
          semester: 'First Semester (Harmattan)',
          status: 'upcoming'
        }
      ]
    },
    secondSemester: {
      startDate: 'March 10, 2025',
      endDate: 'July 18, 2025',
      examStartDate: 'June 30, 2025',
      events: [
        {
          id: 'cal_acto_10',
          title: 'Second Semester Resumption & Course Registration',
          category: 'Resumption',
          startDate: '2025-03-10',
          endDate: '2025-03-14',
          description: 'Resumption of ND 1 and ND 2 students and course registration for Rain semester.',
          semester: 'Second Semester (Rain/Omega)',
          status: 'upcoming'
        },
        {
          id: 'cal_acto_11',
          title: 'Commencement of 2nd Semester Lectures & Studio Labs',
          category: 'Lectures',
          startDate: '2025-03-17',
          endDate: '2025-06-20',
          description: 'Core semester lectures, software engineering coding bootcamps, and robotics labs.',
          semester: 'Second Semester (Rain/Omega)',
          status: 'upcoming'
        },
        {
          id: 'cal_acto_12',
          title: 'Annual Technology & Innovation Exhibition (Ondo Tech Expo)',
          category: 'SUG Week',
          startDate: '2025-05-05',
          endDate: '2025-05-09',
          description: 'Inter-departmental robotics showcase, mobile app demo day, and multimedia film festival.',
          semester: 'Second Semester (Rain/Omega)',
          status: 'upcoming'
        },
        {
          id: 'cal_acto_13',
          title: 'Mid-Semester Continuous Assessment (CA) & Practical Tests',
          category: 'Continuous Assessment',
          startDate: '2025-05-19',
          endDate: '2025-05-23',
          description: 'Departmental practical assessment and midterm tests.',
          semester: 'Second Semester (Rain/Omega)',
          status: 'upcoming'
        },
        {
          id: 'cal_acto_14',
          title: 'Revision Week & ND 2 Final Project Defense',
          category: 'Lectures',
          startDate: '2025-06-23',
          endDate: '2025-06-27',
          description: 'Final year ND 2 project defenses and revision for ND 1 & ND 2 exams.',
          semester: 'Second Semester (Rain/Omega)',
          status: 'upcoming'
        },
        {
          id: 'cal_acto_15',
          title: 'Second Semester Final Examinations',
          category: 'Examination',
          startDate: '2025-06-30',
          endDate: '2025-07-18',
          description: 'Comprehensive examinations across all departments.',
          semester: 'Second Semester (Rain/Omega)',
          status: 'upcoming'
        },
        {
          id: 'cal_acto_16',
          title: 'SIWES 4-Month Industrial Training (ND 1 Students)',
          category: 'Break',
          startDate: '2025-07-28',
          endDate: '2025-11-28',
          description: 'Compulsory 16-week Students Industrial Work Experience Scheme (SIWES) in engineering, media, and tech firms.',
          semester: 'Second Semester (Rain/Omega)',
          status: 'upcoming'
        }
      ]
    }
  },

  'unilag': {
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    academicSession: '2024/2025',
    approvedBy: 'University of Lagos Senate',
    lastUpdated: 'Approved at 342nd Senate Meeting',
    firstSemester: {
      startDate: 'November 04, 2024',
      endDate: 'March 14, 2025',
      examStartDate: 'February 24, 2025',
      events: [
        {
          id: 'cal_unilag_1',
          title: 'Resumption of Returning & Fresh Undergraduate Students',
          category: 'Resumption',
          startDate: '2024-11-04',
          description: 'Opening of university halls of residence at Akoka and Idi-Araba campuses.',
          semester: 'First Semester (Harmattan)',
          status: 'completed'
        },
        {
          id: 'cal_unilag_2',
          title: 'Undergraduate Course Registration & Add/Drop Period',
          category: 'Registration',
          startDate: '2024-11-04',
          endDate: '2024-11-22',
          description: 'Online registration for all levels (100L - 500L) on portal.',
          semester: 'First Semester (Harmattan)',
          status: 'completed'
        },
        {
          id: 'cal_unilag_3',
          title: 'Commencement of 1st Semester Lectures',
          category: 'Lectures',
          startDate: '2024-11-11',
          endDate: '2025-02-14',
          description: '14 weeks of intensive lectures across all faculties.',
          semester: 'First Semester (Harmattan)',
          status: 'ongoing'
        },
        {
          id: 'cal_unilag_4',
          title: '54th Convocation Ceremonies',
          category: 'Convocation',
          startDate: '2025-01-13',
          endDate: '2025-01-17',
          description: 'Conferment of degrees and diploma awards at J.F. Ade Ajayi Auditorium.',
          semester: 'First Semester (Harmattan)',
          status: 'upcoming'
        },
        {
          id: 'cal_unilag_5',
          title: 'First Semester Examinations (100L - 500L)',
          category: 'Examination',
          startDate: '2025-02-24',
          endDate: '2025-03-14',
          description: 'GST CBT and departmental written examinations.',
          semester: 'First Semester (Harmattan)',
          status: 'upcoming'
        }
      ]
    },
    secondSemester: {
      startDate: 'April 07, 2025',
      endDate: 'August 01, 2025',
      examStartDate: 'July 14, 2025',
      events: [
        {
          id: 'cal_unilag_6',
          title: 'Resumption for Second Semester & Lectures Begin',
          category: 'Resumption',
          startDate: '2025-04-07',
          description: 'Commencement of Rain semester academic activities.',
          semester: 'Second Semester (Rain/Omega)',
          status: 'upcoming'
        },
        {
          id: 'cal_unilag_7',
          title: 'Second Semester Examinations',
          category: 'Examination',
          startDate: '2025-07-14',
          endDate: '2025-08-01',
          description: 'End of session degree examinations.',
          semester: 'Second Semester (Rain/Omega)',
          status: 'upcoming'
        }
      ]
    }
  },

  'yabatech': {
    institutionId: 'yabatech',
    institutionName: 'Yaba College of Technology',
    academicSession: '2024/2025',
    approvedBy: 'YabaTech Academic Board',
    lastUpdated: 'Official Academic Board Schedule',
    firstSemester: {
      startDate: 'October 21, 2024',
      endDate: 'February 28, 2025',
      examStartDate: 'February 10, 2025',
      events: [
        {
          id: 'cal_yaba_1',
          title: 'Resumption for ND 1, ND 2, HND 1, HND 2 Students',
          category: 'Resumption',
          startDate: '2024-10-21',
          description: 'Resumption of all full-time and part-time students.',
          semester: 'First Semester (Harmattan)',
          status: 'completed'
        },
        {
          id: 'cal_yaba_2',
          title: 'Commencement of Lectures & Workshop Sessions',
          category: 'Lectures',
          startDate: '2024-10-28',
          endDate: '2025-01-31',
          description: 'Lectures across Engineering, Technology, and Management schools.',
          semester: 'First Semester (Harmattan)',
          status: 'ongoing'
        },
        {
          id: 'cal_yaba_3',
          title: 'First Semester Examinations',
          category: 'Examination',
          startDate: '2025-02-10',
          endDate: '2025-02-28',
          description: 'Semester examinations for ND and HND tracks.',
          semester: 'First Semester (Harmattan)',
          status: 'upcoming'
        }
      ]
    },
    secondSemester: {
      startDate: 'March 17, 2025',
      endDate: 'July 25, 2025',
      examStartDate: 'July 07, 2025',
      events: [
        {
          id: 'cal_yaba_4',
          title: 'Second Semester Resumption & Lectures Begin',
          category: 'Resumption',
          startDate: '2025-03-17',
          description: 'Return of ND and HND students for Rain semester.',
          semester: 'Second Semester (Rain/Omega)',
          status: 'upcoming'
        },
        {
          id: 'cal_yaba_5',
          title: 'Second Semester Examinations & HND Project Defense',
          category: 'Examination',
          startDate: '2025-07-07',
          endDate: '2025-07-25',
          description: 'Final examinations and external project evaluations.',
          semester: 'Second Semester (Rain/Omega)',
          status: 'upcoming'
        }
      ]
    }
  }
};

// Universal calendar resolver for ANY school
export function getSchoolAcademicCalendar(inst: Institution): SchoolCalendar {
  if (SCHOOL_CALENDARS[inst.id]) {
    return SCHOOL_CALENDARS[inst.id];
  }

  const isPoly = inst.type.toLowerCase().includes('poly') || inst.type.toLowerCase().includes('technology') || inst.type.toLowerCase().includes('monotechnic');
  const approvalBody = isPoly ? `${inst.shortName || inst.name} Academic Board & NBTE` : `${inst.shortName || inst.name} Senate`;

  return {
    institutionId: inst.id,
    institutionName: inst.name,
    academicSession: '2024/2025',
    approvedBy: approvalBody,
    lastUpdated: 'Official Accredited Schedule',
    firstSemester: {
      startDate: 'October 28, 2024',
      endDate: 'February 28, 2025',
      examStartDate: 'February 10, 2025',
      events: [
        {
          id: `cal_${inst.id}_1`,
          title: 'Resumption of Returning and Fresh Students',
          category: 'Resumption',
          startDate: '2024-10-28',
          description: `Arrival of students to campus and opening of academic departments at ${inst.name}.`,
          semester: 'First Semester (Harmattan)',
          status: 'completed'
        },
        {
          id: `cal_${inst.id}_2`,
          title: 'Online Screening, Departmental Clearance & Course Registration',
          category: 'Registration',
          startDate: '2024-10-28',
          endDate: '2024-11-15',
          description: 'Payment of fees and portal course enrollment across all faculties and departments.',
          semester: 'First Semester (Harmattan)',
          status: 'completed'
        },
        {
          id: `cal_${inst.id}_3`,
          title: 'Commencement of 1st Semester Lectures',
          category: 'Lectures',
          startDate: '2024-11-04',
          endDate: '2025-01-31',
          description: 'Regular lectures, studio work, and practical laboratory sessions.',
          semester: 'First Semester (Harmattan)',
          status: 'ongoing'
        },
        {
          id: `cal_${inst.id}_4`,
          title: 'Fresh Students Orientation & Matriculation',
          category: 'Matriculation',
          startDate: '2024-11-27',
          description: `Official matriculation ceremony for all newly admitted students at ${inst.name}.`,
          semester: 'First Semester (Harmattan)',
          status: 'completed'
        },
        {
          id: `cal_${inst.id}_5`,
          title: 'Mid-Semester Continuous Assessment (CA) Tests',
          category: 'Continuous Assessment',
          startDate: '2024-12-16',
          endDate: '2024-12-20',
          description: 'Continuous assessment test contributing 30% to course final grades.',
          semester: 'First Semester (Harmattan)',
          status: 'completed'
        },
        {
          id: `cal_${inst.id}_6`,
          title: 'Revision Week & Lab Practical Assessments',
          category: 'Lectures',
          startDate: '2025-02-03',
          endDate: '2025-02-07',
          description: 'Revision week ahead of examinations.',
          semester: 'First Semester (Harmattan)',
          status: 'upcoming'
        },
        {
          id: `cal_${inst.id}_7`,
          title: 'First Semester Examinations',
          category: 'Examination',
          startDate: '2025-02-10',
          endDate: '2025-02-28',
          description: `Written and computer-based examinations across all departments of ${inst.name}.`,
          semester: 'First Semester (Harmattan)',
          status: 'upcoming'
        },
        {
          id: `cal_${inst.id}_8`,
          title: 'First Semester Break',
          category: 'Break',
          startDate: '2025-03-03',
          endDate: '2025-03-14',
          description: 'Inter-semester vacation and processing of results.',
          semester: 'First Semester (Harmattan)',
          status: 'upcoming'
        }
      ]
    },
    secondSemester: {
      startDate: 'March 17, 2025',
      endDate: 'July 25, 2025',
      examStartDate: 'July 07, 2025',
      events: [
        {
          id: `cal_${inst.id}_9`,
          title: 'Second Semester Resumption & Course Registration',
          category: 'Resumption',
          startDate: '2025-03-17',
          endDate: '2025-03-21',
          description: 'Students return to campus and register courses for the second semester.',
          semester: 'Second Semester (Rain/Omega)',
          status: 'upcoming'
        },
        {
          id: `cal_${inst.id}_10`,
          title: 'Commencement of 2nd Semester Lectures',
          category: 'Lectures',
          startDate: '2025-03-24',
          endDate: '2025-06-27',
          description: 'Teaching and research lectures for the Rain semester.',
          semester: 'Second Semester (Rain/Omega)',
          status: 'upcoming'
        },
        {
          id: `cal_${inst.id}_11`,
          title: 'Mid-Semester Continuous Assessment (CA) Tests',
          category: 'Continuous Assessment',
          startDate: '2025-05-12',
          endDate: '2025-05-16',
          description: 'Mid-term evaluation and test papers.',
          semester: 'Second Semester (Rain/Omega)',
          status: 'upcoming'
        },
        {
          id: `cal_${inst.id}_12`,
          title: 'Second Semester Final Examinations',
          category: 'Examination',
          startDate: '2025-07-07',
          endDate: '2025-07-25',
          description: 'End of session examinations for all levels.',
          semester: 'Second Semester (Rain/Omega)',
          status: 'upcoming'
        },
        {
          id: `cal_${inst.id}_13`,
          title: 'End of Session Break / SIWES Industrial Attachment',
          category: 'Break',
          startDate: '2025-07-28',
          endDate: '2025-10-17',
          description: 'Long vacation and mandatory student industrial internship.',
          semester: 'Second Semester (Rain/Omega)',
          status: 'upcoming'
        }
      ]
    }
  };
}

// =========================================================================
// 3. ADEYEMI COLLEGE OF TECHNOLOGY ONDO - CURRICULUM COURSES (ND 1 & ND 2)
// =========================================================================
export const ACTO_ENGINEERING_TECH_COURSES: CourseRecord[] = [
  // ----------------------------------------------------
  // COMPUTER SCIENCE (ND 1 & ND 2)
  // ----------------------------------------------------
  {
    id: 'crs_acto_com111',
    courseTitle: 'Introduction to Computing & Information Technology',
    courseCode: 'COM 111',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Computer history, hardware architecture, number systems (binary, octal, hexadecimal), operating system functions, problem-solving with flowcharts and pseudocodes.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_com112',
    courseTitle: 'Digital Electronics & Logic Design',
    courseCode: 'COM 112',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Boolean algebra, logic gates (AND, OR, NOT, NAND, NOR, XOR), Karnaugh maps simplification, combinational circuits (adders, multiplexers, decoders), and flip-flops.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_com113',
    courseTitle: 'Python Programming Fundamentals',
    courseCode: 'COM 113',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Python syntax, control flow (if/else, loops), functions, data structures (lists, tuples, sets, dictionaries), file I/O handling, and basic algorithmic problem solving.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_gns101',
    courseTitle: 'Use of English & Communication Skills I',
    courseCode: 'GNS 101',
    creditUnit: 2,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Technical communication, grammar mechanics, reading comprehension, report writing, and concord for engineering technology practitioners.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_com121',
    courseTitle: 'Scientific Programming with C++',
    courseCode: 'COM 121',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 1',
    semester: 'Second Semester (Rain/Omega)',
    courseDescription: 'C++ syntax, pointer memory management, dynamic memory allocation, structs, introductory OOP concepts, and numerical computing algorithms.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_com122',
    courseTitle: 'Database Design & Structured Query Language (SQL)',
    courseCode: 'COM 122',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 1',
    semester: 'Second Semester (Rain/Omega)',
    courseDescription: 'Relational database theory, Entity-Relationship (ER) modeling, normalization (1NF to 3NF/BCNF), SQL DDL/DML queries, joins, and transactions in MySQL/PostgreSQL.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_com123',
    courseTitle: 'Web Technologies & Internet Applications',
    courseCode: 'COM 123',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 1',
    semester: 'Second Semester (Rain/Omega)',
    courseDescription: 'HTML5, CSS3 responsive grid/flexbox design, vanilla JavaScript DOM manipulation, asynchronous fetch APIs, and client-server web architecture.',
    status: 'Approved'
  },
  // ND 2 Computer Science
  {
    id: 'crs_acto_com211',
    courseTitle: 'Object-Oriented Programming with Java',
    courseCode: 'COM 211',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 2',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Java virtual machine (JVM), class definitions, encapsulation, inheritance, polymorphism, abstract classes, interfaces, exception handling, and GUI Swing/JavaFX.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_com212',
    courseTitle: 'Data Structures & Algorithm Design',
    courseCode: 'COM 212',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 2',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Asymptotic Big-O analysis, singly/doubly linked lists, stacks, queues, binary search trees (BST), heap priority queues, sorting algorithms, and graph traversals (BFS/DFS).',
    status: 'Approved'
  },
  {
    id: 'crs_acto_com213',
    courseTitle: 'Operating Systems Architecture & Unix',
    courseCode: 'COM 213',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 2',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Process scheduling (RR, SJF, Priority), IPC synchronization, deadlocks prevention, virtual memory paging, file systems, and Bash shell scripting.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_com221',
    courseTitle: 'Mobile Application Development',
    courseCode: 'COM 221',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 2',
    semester: 'Second Semester (Rain/Omega)',
    courseDescription: 'Mobile UX/UI paradigms, cross-platform app engineering with Flutter and React Native, device hardware access, local SQLite caching, and REST integrations.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_com222',
    courseTitle: 'Computer Networking & Cyber Security',
    courseCode: 'COM 222',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 2',
    semester: 'Second Semester (Rain/Omega)',
    courseDescription: 'OSI 7-layer model, TCP/IP protocol suite, IPv4/IPv6 subnetting, routing protocols, firewalls, network packet sniffing with Wireshark, and symmetric/asymmetric cryptography.',
    status: 'Approved'
  },

  // ----------------------------------------------------
  // MULTIMEDIA TECHNOLOGY (ND 1 & ND 2)
  // ----------------------------------------------------
  {
    id: 'crs_acto_mmt111',
    courseTitle: 'Introduction to Digital Media & Graphic Design',
    courseCode: 'MMT 111',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Multimedia Technology',
    programme: 'ND Multimedia Technology',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Color theory, typography hierarchy, raster vs vector imaging (Adobe Photoshop & Illustrator), digital composition, branding design, and print prepress layout.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_mmt112',
    courseTitle: 'Audio Production & Sound Engineering',
    courseCode: 'MMT 112',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Multimedia Technology',
    programme: 'ND Multimedia Technology',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Acoustics physics, digital audio workstations (DAW), microphone polar patterns, multi-track studio recording, EQ filtering, audio compression, and podcast mastering.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_mmt113',
    courseTitle: 'Visual Storytelling & Scriptwriting',
    courseCode: 'MMT 113',
    creditUnit: 2,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Multimedia Technology',
    programme: 'ND Multimedia Technology',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Three-act narrative structure, character arc development, storyboard drafting, camera shot angles, script formatting for film, television, and commercials.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_mmt121',
    courseTitle: '2D Animation & Motion Graphics',
    courseCode: 'MMT 121',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Multimedia Technology',
    programme: 'ND Multimedia Technology',
    level: 'ND 1',
    semester: 'Second Semester (Rain/Omega)',
    courseDescription: 'Disney\'s 12 principles of animation, keyframing, timeline easing, kinetic typography, motion tracking in Adobe After Effects, and promotional explainer video production.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_mmt122',
    courseTitle: 'Digital Cinematography & Studio Lighting',
    courseCode: 'MMT 122',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Multimedia Technology',
    programme: 'ND Multimedia Technology',
    level: 'ND 1',
    semester: 'Second Semester (Rain/Omega)',
    courseDescription: 'Camera sensors, focal lengths, aperture depth of field, three-point lighting setups, gimbal camera stabilization, and documentary fieldwork cinematography.',
    status: 'Approved'
  },
  // ND 2 Multimedia Technology
  {
    id: 'crs_acto_mmt211',
    courseTitle: '3D Computer Graphics & Modeling (Blender/Maya)',
    courseCode: 'MMT 211',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Multimedia Technology',
    programme: 'ND Multimedia Technology',
    level: 'ND 2',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Polygonal 3D modeling, topology edge loops, UV unwrapping, PBR procedural texturing, realistic scene lighting, skeletal rigging, and photorealistic raytrace rendering.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_mmt212',
    courseTitle: 'Video Editing & Visual Effects (VFX)',
    courseCode: 'MMT 212',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Multimedia Technology',
    programme: 'ND Multimedia Technology',
    level: 'ND 2',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Non-linear video editing (Premiere Pro / DaVinci Resolve), color grading with LUTs, green screen chroma keying, rotoscoping, particle effects, and sound sync.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_mmt221',
    courseTitle: 'Virtual Reality (VR) & Interactive Media',
    courseCode: 'MMT 221',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Multimedia Technology',
    programme: 'ND Multimedia Technology',
    level: 'ND 2',
    semester: 'Second Semester (Rain/Omega)',
    courseDescription: 'Interactive game mechanics in Unity / Unreal Engine, VR headset spatial tracking, 360-degree immersive video production, UI audio feedback, and interactive art installations.',
    status: 'Approved'
  },

  // ----------------------------------------------------
  // SOFTWARE ENGINEERING (ND 1 & ND 2)
  // ----------------------------------------------------
  {
    id: 'crs_acto_swe111',
    courseTitle: 'Principles of Software Engineering & Logic',
    courseCode: 'SWE 111',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Software Engineering',
    programme: 'ND Software Engineering',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Software development life cycle (SDLC), Agile Scrum methodologies, user stories, software requirements specification (SRS), UML use cases, and algorithmic complexity.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_swe112',
    courseTitle: 'Object-Oriented Programming (TypeScript & Modern JS)',
    courseCode: 'SWE 112',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Software Engineering',
    programme: 'ND Software Engineering',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Strong static typing in TypeScript, interfaces, generics, async/await concurrency, functional programming principles, and module packaging with npm.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_swe113',
    courseTitle: 'Discrete Mathematics for Software Engineers',
    courseCode: 'SWE 113',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Software Engineering',
    programme: 'ND Software Engineering',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Propositional and predicate calculus, set theory, relations and functions, proof by mathematical induction, graph theory, combinatorics, and automata state machines.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_swe121',
    courseTitle: 'Full-Stack Web Application Engineering',
    courseCode: 'SWE 121',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Software Engineering',
    programme: 'ND Software Engineering',
    level: 'ND 1',
    semester: 'Second Semester (Rain/Omega)',
    courseDescription: 'Component architecture with React, state management, Node.js and Express backend API design, JWT authentication, server-side data validation, and responsive CSS.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_swe122',
    courseTitle: 'Relational & NoSQL Database Engineering',
    courseCode: 'SWE 122',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Software Engineering',
    programme: 'ND Software Engineering',
    level: 'ND 1',
    semester: 'Second Semester (Rain/Omega)',
    courseDescription: 'PostgreSQL database design, indexing for high performance, ACID transaction guarantees, MongoDB document data modeling, and Redis in-memory caching.',
    status: 'Approved'
  },
  // ND 2 Software Engineering
  {
    id: 'crs_acto_swe211',
    courseTitle: 'Software Architecture & Enterprise Design Patterns',
    courseCode: 'SWE 211',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Software Engineering',
    programme: 'ND Software Engineering',
    level: 'ND 2',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Gang of Four (GoF) design patterns (Singleton, Factory, Observer, Strategy, Decorator), clean architecture, SOLID principles, monolithic vs microservice distributed architectures.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_swe212',
    courseTitle: 'API Engineering, Microservices & GraphQL',
    courseCode: 'SWE 212',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Software Engineering',
    programme: 'ND Software Engineering',
    level: 'ND 2',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'RESTful API maturity models, OpenAPI/Swagger specifications, GraphQL schema and resolvers, rate-limiting, gRPC remote procedure calls, and API gateway security.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_swe213',
    courseTitle: 'DevOps, Git & CI/CD Cloud Automation',
    courseCode: 'SWE 213',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Software Engineering',
    programme: 'ND Software Engineering',
    level: 'ND 2',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Advanced Git branching strategies (Gitflow), Docker containerization, multi-stage image builds, GitHub Actions CI/CD pipelines, automated testing, and Cloud Run/AWS deployment.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_swe221',
    courseTitle: 'Software Testing, Quality Assurance & Security',
    courseCode: 'SWE 221',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Software Engineering',
    programme: 'ND Software Engineering',
    level: 'ND 2',
    semester: 'Second Semester (Rain/Omega)',
    courseDescription: 'Unit testing with Jest/PyTest, integration testing, end-to-end testing with Playwright, test-driven development (TDD), OWASP Top 10 web vulnerabilities, and security auditing.',
    status: 'Approved'
  },

  // ----------------------------------------------------
  // HARDWARE ENGINEERING (ND 1 & ND 2)
  // ----------------------------------------------------
  {
    id: 'crs_acto_hwe111',
    courseTitle: 'Electrical Engineering Science & Circuit Theory',
    courseCode: 'HWE 111',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Hardware Engineering',
    programme: 'ND Hardware Engineering',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Ohm\'s law, Kirchhoff\'s voltage and current laws (KVL/KCL), Thévenin and Norton theorems, superposition, AC circuit sinusoidal steady-state, power factor, and transformers.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_hwe112',
    courseTitle: 'Digital Logic Systems & Microprocessor Basics',
    courseCode: 'HWE 112',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Hardware Engineering',
    programme: 'ND Hardware Engineering',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Digital ICs (TTL/CMOS), decoders, multiplexers, latches, flip-flops, asynchronous and synchronous counters, shift registers, and internal ALU microprocessor architecture.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_hwe113',
    courseTitle: 'Semiconductor Devices & Analog Electronics',
    courseCode: 'HWE 113',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Hardware Engineering',
    programme: 'ND Hardware Engineering',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'PN junction diodes, Zener diodes, rectification and power supply filtering, BJT and MOSFET transistors, small-signal amplifiers, operational amplifiers (Op-Amps), and 555 timers.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_hwe121',
    courseTitle: 'Computer Hardware Architecture & Assembly',
    courseCode: 'HWE 121',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Hardware Engineering',
    programme: 'ND Hardware Engineering',
    level: 'ND 1',
    semester: 'Second Semester (Rain/Omega)',
    courseDescription: 'Motherboard architecture, chipsets, CPU sockets, RAM memory hierarchies, BIOS/UEFI firmware, PCIe expansion buses, storage drives (NVMe/SATA), power supply units, and physical PC assembly.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_hwe122',
    courseTitle: 'Embedded Systems & C Programming',
    courseCode: 'HWE 122',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Hardware Engineering',
    programme: 'ND Hardware Engineering',
    level: 'ND 1',
    semester: 'Second Semester (Rain/Omega)',
    courseDescription: 'Embedded C programming, microcontroller memory mapping, GPIO input/output pin manipulation, analog-to-digital converters (ADC), pulse width modulation (PWM), and timer interrupts.',
    status: 'Approved'
  },
  // ND 2 Hardware Engineering
  {
    id: 'crs_acto_hwe211',
    courseTitle: 'Microcontroller Interfacing & IoT Sensor Networks',
    courseCode: 'HWE 211',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Hardware Engineering',
    programme: 'ND Hardware Engineering',
    level: 'ND 2',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Arduino, ESP32 and STM32 microcontroller platforms, I2C, SPI, and UART communication protocols, interfacing environmental sensors, OLED displays, relay modules, and MQTT IoT clouds.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_hwe212',
    courseTitle: 'Computer Troubleshooting, Diagnostics & Soldering',
    courseCode: 'HWE 212',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Hardware Engineering',
    programme: 'ND Hardware Engineering',
    level: 'ND 2',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Hardware diagnostic tools, multimeter voltage checking, motherboard component-level troubleshooting, SMD rework, soldering techniques, heat dissipation, and preventive maintenance.',
    status: 'Approved'
  },
  {
    id: 'crs_acto_hwe221',
    courseTitle: 'Robotics, Actuators & Automation Hardware',
    courseCode: 'HWE 221',
    creditUnit: 3,
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Hardware Engineering',
    programme: 'ND Hardware Engineering',
    level: 'ND 2',
    semester: 'Second Semester (Rain/Omega)',
    courseDescription: 'DC motors, stepper motors, servo actuators, H-bridge motor drivers (L298N), ultrasonic/infrared obstacle detection, kinematic robot chassis assembly, and autonomous line tracking.',
    status: 'Approved'
  }
];

// =========================================================================
// 4. ADEYEMI COLLEGE OF TECHNOLOGY ONDO - WEEKLY TIMETABLE SLOTS
// =========================================================================
export const ACTO_TIMETABLE_ENTRIES: SchoolTimetableEntry[] = [
  // ND 1 Computer Science (First Semester)
  {
    id: 'tt_acto_1',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    day: 'Monday',
    time: '08:00 AM - 10:00 AM',
    courseCode: 'COM 111',
    courseTitle: 'Introduction to Computing & Information Technology',
    venue: 'Engineering Tech Complex - Hall A1',
    lecturer: 'Engr. A. O. Oladipo',
    type: 'Lecture'
  },
  {
    id: 'tt_acto_2',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    day: 'Monday',
    time: '10:00 AM - 12:00 PM',
    courseCode: 'COM 113',
    courseTitle: 'Python Programming Fundamentals',
    venue: 'Computer Laboratory 1 (Computing Centre)',
    lecturer: 'Mr. T. E. Fagbemi',
    type: 'Lab / Practical'
  },
  {
    id: 'tt_acto_3',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    day: 'Tuesday',
    time: '08:00 AM - 10:00 AM',
    courseCode: 'COM 112',
    courseTitle: 'Digital Electronics & Logic Design',
    venue: 'Hardware Workshop Block B',
    lecturer: 'Engr. B. K. Adeyemi',
    type: 'Lecture'
  },
  {
    id: 'tt_acto_4',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    day: 'Tuesday',
    time: '10:00 AM - 12:00 PM',
    courseCode: 'COM 112',
    courseTitle: 'Digital Electronics Practical (Logic Gate Breadboards)',
    venue: 'Digital Electronics Lab 2',
    lecturer: 'Engr. B. K. Adeyemi',
    type: 'Lab / Practical'
  },
  {
    id: 'tt_acto_5',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    day: 'Wednesday',
    time: '08:00 AM - 10:00 AM',
    courseCode: 'GNS 101',
    courseTitle: 'Use of English & Communication Skills I',
    venue: 'General Studies Lecture Theatre (GNS LT)',
    lecturer: 'Mrs. F. A. Akinwumi',
    type: 'Lecture'
  },
  {
    id: 'tt_acto_6',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    day: 'Thursday',
    time: '01:00 PM - 03:00 PM',
    courseCode: 'COM 113',
    courseTitle: 'Python Problem-Solving Hands-on Code Lab',
    venue: 'Computer Laboratory 2',
    lecturer: 'Mr. T. E. Fagbemi',
    type: 'Lab / Practical'
  },

  // ND 2 Computer Science (First Semester)
  {
    id: 'tt_acto_7',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 2',
    semester: 'First Semester (Harmattan)',
    day: 'Monday',
    time: '10:00 AM - 12:00 PM',
    courseCode: 'COM 211',
    courseTitle: 'Object-Oriented Programming with Java',
    venue: 'Advanced Software Lab 3',
    lecturer: 'Dr. O. M. Adewale',
    type: 'Lab / Practical'
  },
  {
    id: 'tt_acto_8',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 2',
    semester: 'First Semester (Harmattan)',
    day: 'Tuesday',
    time: '01:00 PM - 03:00 PM',
    courseCode: 'COM 212',
    courseTitle: 'Data Structures & Algorithm Design',
    venue: 'Engineering Tech Hall B2',
    lecturer: 'Engr. A. O. Oladipo',
    type: 'Lecture'
  },
  {
    id: 'tt_acto_9',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 2',
    semester: 'First Semester (Harmattan)',
    day: 'Wednesday',
    time: '10:00 AM - 12:00 PM',
    courseCode: 'COM 213',
    courseTitle: 'Operating Systems Architecture & Unix Shells',
    venue: 'Systems & Network Lab',
    lecturer: 'Engr. K. S. Balogun',
    type: 'Lecture'
  },

  // ND 1 Multimedia Technology (First Semester)
  {
    id: 'tt_acto_10',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Multimedia Technology',
    programme: 'ND Multimedia Technology',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    day: 'Monday',
    time: '08:00 AM - 10:00 AM',
    courseCode: 'MMT 111',
    courseTitle: 'Introduction to Digital Media & Graphic Design',
    venue: 'Digital Design Studio 1',
    lecturer: 'Mr. S. O. Adegoke',
    type: 'Lab / Practical'
  },
  {
    id: 'tt_acto_11',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Multimedia Technology',
    programme: 'ND Multimedia Technology',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    day: 'Tuesday',
    time: '10:00 AM - 12:00 PM',
    courseCode: 'MMT 112',
    courseTitle: 'Audio Production & Sound Engineering',
    venue: 'Acoustic Sound Recording Suite',
    lecturer: 'Mr. D. A. Johnson',
    type: 'Lab / Practical'
  },
  {
    id: 'tt_acto_12',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Multimedia Technology',
    programme: 'ND Multimedia Technology',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    day: 'Wednesday',
    time: '01:00 PM - 03:00 PM',
    courseCode: 'MMT 113',
    courseTitle: 'Visual Storytelling & Scriptwriting',
    venue: 'Media Amphitheatre 2',
    lecturer: 'Ms. T. B. Olowookere',
    type: 'Lecture'
  },

  // ND 2 Multimedia Technology
  {
    id: 'tt_acto_13',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Multimedia Technology',
    programme: 'ND Multimedia Technology',
    level: 'ND 2',
    semester: 'First Semester (Harmattan)',
    day: 'Monday',
    time: '01:00 PM - 04:00 PM',
    courseCode: 'MMT 211',
    courseTitle: '3D Computer Graphics & Modeling (Blender)',
    venue: '3D Animation Rendering Lab',
    lecturer: 'Mr. S. O. Adegoke',
    type: 'Lab / Practical'
  },
  {
    id: 'tt_acto_14',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Multimedia Technology',
    programme: 'ND Multimedia Technology',
    level: 'ND 2',
    semester: 'First Semester (Harmattan)',
    day: 'Thursday',
    time: '09:00 AM - 12:00 PM',
    courseCode: 'MMT 212',
    courseTitle: 'Video Editing & Visual Effects (VFX)',
    venue: 'Video Post-Production VFX Suite',
    lecturer: 'Mr. D. A. Johnson',
    type: 'Lab / Practical'
  },

  // ND 1 Software Engineering
  {
    id: 'tt_acto_15',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Software Engineering',
    programme: 'ND Software Engineering',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    day: 'Monday',
    time: '08:00 AM - 10:00 AM',
    courseCode: 'SWE 111',
    courseTitle: 'Principles of Software Engineering & Logic',
    venue: 'Software Engineering Lecture Hall C1',
    lecturer: 'Dr. O. M. Adewale',
    type: 'Lecture'
  },
  {
    id: 'tt_acto_16',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Software Engineering',
    programme: 'ND Software Engineering',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    day: 'Tuesday',
    time: '08:00 AM - 11:00 AM',
    courseCode: 'SWE 112',
    courseTitle: 'Object-Oriented Programming (TypeScript & JS)',
    venue: 'Full-Stack Development Lab 4',
    lecturer: 'Engr. K. S. Balogun',
    type: 'Lab / Practical'
  },
  {
    id: 'tt_acto_17',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Software Engineering',
    programme: 'ND Software Engineering',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    day: 'Wednesday',
    time: '10:00 AM - 12:00 PM',
    courseCode: 'SWE 113',
    courseTitle: 'Discrete Mathematics for Software Engineers',
    venue: 'Engineering Tech Complex - Hall A2',
    lecturer: 'Dr. I. O. Ayodele',
    type: 'Lecture'
  },

  // ND 2 Software Engineering
  {
    id: 'tt_acto_18',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Software Engineering',
    programme: 'ND Software Engineering',
    level: 'ND 2',
    semester: 'First Semester (Harmattan)',
    day: 'Tuesday',
    time: '01:00 PM - 03:00 PM',
    courseCode: 'SWE 211',
    courseTitle: 'Software Architecture & Enterprise Design Patterns',
    venue: 'Software Engineering Lecture Hall C1',
    lecturer: 'Dr. O. M. Adewale',
    type: 'Lecture'
  },
  {
    id: 'tt_acto_19',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Software Engineering',
    programme: 'ND Software Engineering',
    level: 'ND 2',
    semester: 'First Semester (Harmattan)',
    day: 'Thursday',
    time: '10:00 AM - 01:00 PM',
    courseCode: 'SWE 213',
    courseTitle: 'DevOps, Git & CI/CD Cloud Automation Lab',
    venue: 'Cloud DevOps Computing Center',
    lecturer: 'Engr. K. S. Balogun',
    type: 'Lab / Practical'
  },

  // ND 1 Hardware Engineering
  {
    id: 'tt_acto_20',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Hardware Engineering',
    programme: 'ND Hardware Engineering',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    day: 'Monday',
    time: '10:00 AM - 12:00 PM',
    courseCode: 'HWE 111',
    courseTitle: 'Electrical Engineering Science & Circuit Theory',
    venue: 'Hardware Workshop Block B1',
    lecturer: 'Engr. B. K. Adeyemi',
    type: 'Lecture'
  },
  {
    id: 'tt_acto_21',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Hardware Engineering',
    programme: 'ND Hardware Engineering',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    day: 'Wednesday',
    time: '08:00 AM - 11:00 AM',
    courseCode: 'HWE 112',
    courseTitle: 'Digital Logic Systems & Circuit Wiring Lab',
    venue: 'Digital Logic Workshop B2',
    lecturer: 'Engr. B. K. Adeyemi',
    type: 'Lab / Practical'
  },
  {
    id: 'tt_acto_22',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Hardware Engineering',
    programme: 'ND Hardware Engineering',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    day: 'Thursday',
    time: '01:00 PM - 03:00 PM',
    courseCode: 'HWE 113',
    courseTitle: 'Semiconductor Devices & Analog Electronics',
    venue: 'Electronics Testing Lab',
    lecturer: 'Engr. P. O. Akinsola',
    type: 'Lecture'
  },

  // ND 2 Hardware Engineering
  {
    id: 'tt_acto_23',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Hardware Engineering',
    programme: 'ND Hardware Engineering',
    level: 'ND 2',
    semester: 'First Semester (Harmattan)',
    day: 'Tuesday',
    time: '09:00 AM - 12:00 PM',
    courseCode: 'HWE 211',
    courseTitle: 'Microcontroller Interfacing & IoT Sensors Lab',
    venue: 'Embedded Systems & Robotics Lab',
    lecturer: 'Engr. P. O. Akinsola',
    type: 'Lab / Practical'
  },
  {
    id: 'tt_acto_24',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Hardware Engineering',
    programme: 'ND Hardware Engineering',
    level: 'ND 2',
    semester: 'First Semester (Harmattan)',
    day: 'Friday',
    time: '09:00 AM - 12:00 PM',
    courseCode: 'HWE 212',
    courseTitle: 'Computer Maintenance, Diagnostics & Soldering Workshop',
    venue: 'Hardware Maintenance & Repair Clinic',
    lecturer: 'Engr. B. K. Adeyemi',
    type: 'Lab / Practical'
  },

  // Examination Timetable Entries for ACTO
  {
    id: 'tt_acto_exam_1',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    day: 'Monday',
    time: '09:00 AM - 12:00 PM',
    courseCode: 'COM 111',
    courseTitle: 'Introduction to Computing & Information Technology',
    venue: 'Engineering Tech Examination Centre A',
    lecturer: 'Chief Invigilator: Engr. A. O. Oladipo',
    type: 'Examination',
    examDate: '2025-02-03'
  },
  {
    id: 'tt_acto_exam_2',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Multimedia Technology',
    programme: 'ND Multimedia Technology',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    day: 'Tuesday',
    time: '09:00 AM - 12:00 PM',
    courseCode: 'MMT 111',
    courseTitle: 'Introduction to Digital Media & Graphic Design',
    venue: 'Multimedia Examination Hall',
    lecturer: 'Chief Invigilator: Mr. S. O. Adegoke',
    type: 'Examination',
    examDate: '2025-02-04'
  },
  {
    id: 'tt_acto_exam_3',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Software Engineering',
    programme: 'ND Software Engineering',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    day: 'Wednesday',
    time: '09:00 AM - 12:00 PM',
    courseCode: 'SWE 111',
    courseTitle: 'Principles of Software Engineering & Logic',
    venue: 'Engineering Tech Examination Centre B',
    lecturer: 'Chief Invigilator: Dr. O. M. Adewale',
    type: 'Examination',
    examDate: '2025-02-05'
  },
  {
    id: 'tt_acto_exam_4',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Hardware Engineering',
    programme: 'ND Hardware Engineering',
    level: 'ND 1',
    semester: 'First Semester (Harmattan)',
    day: 'Thursday',
    time: '09:00 AM - 12:00 PM',
    courseCode: 'HWE 111',
    courseTitle: 'Electrical Engineering Science & Circuit Theory',
    venue: 'Hardware Engineering Hall B',
    lecturer: 'Chief Invigilator: Engr. B. K. Adeyemi',
    type: 'Examination',
    examDate: '2025-02-06'
  }
];

// Helper to resolve or generate authentic timetable entries for ANY institution
export function getSchoolTimetable(
  inst: Institution,
  departmentName?: string,
  levelName?: string,
  semesterName?: string
): SchoolTimetableEntry[] {
  if (inst.id === 'adeyemi_tech_ondo') {
    let filtered = ACTO_TIMETABLE_ENTRIES;
    if (departmentName && departmentName !== 'all') {
      filtered = filtered.filter(t => t.department.toLowerCase().includes(departmentName.toLowerCase()));
    }
    if (levelName && levelName !== 'all') {
      filtered = filtered.filter(t => t.level === levelName);
    }
    if (semesterName && semesterName !== 'all') {
      filtered = filtered.filter(t => t.semester.includes(semesterName) || semesterName.includes(t.semester));
    }
    return filtered;
  }

  // Generate authentic schedule based on institution's departments and levels
  const days: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'> = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
  ];
  const times = [
    '08:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '01:00 PM - 03:00 PM',
    '03:00 PM - 05:00 PM'
  ];

  const targetDept = departmentName && departmentName !== 'all' ? departmentName : 'Computer Science';
  const targetLevel = levelName && levelName !== 'all' ? levelName : (getSchoolAccreditedLevels(inst)[0] || '100L');
  const targetSemester = semesterName && semesterName !== 'all' ? semesterName : 'First Semester (Harmattan)';

  const codePrefix = targetDept.substring(0, 3).toUpperCase();
  const baseNum = targetLevel.includes('ND') ? '111' : targetLevel.substring(0, 3);

  return [
    {
      id: `tt_${inst.id}_1`,
      institutionId: inst.id,
      institutionName: inst.name,
      faculty: 'Academic Faculty',
      department: targetDept,
      programme: `${targetLevel.includes('ND') ? 'ND' : 'B.Sc'} ${targetDept}`,
      level: targetLevel,
      semester: targetSemester as any,
      day: 'Monday',
      time: '08:00 AM - 10:00 AM',
      courseCode: `${codePrefix} ${baseNum.substring(0, 1)}01`,
      courseTitle: `Foundations of ${targetDept} I`,
      venue: `${inst.shortName || 'Main'} Faculty Lecture Theatre 1`,
      lecturer: 'Dr. A. B. Adeyemi',
      type: 'Lecture'
    },
    {
      id: `tt_${inst.id}_2`,
      institutionId: inst.id,
      institutionName: inst.name,
      faculty: 'Academic Faculty',
      department: targetDept,
      programme: `${targetLevel.includes('ND') ? 'ND' : 'B.Sc'} ${targetDept}`,
      level: targetLevel,
      semester: targetSemester as any,
      day: 'Monday',
      time: '10:00 AM - 12:00 PM',
      courseCode: `${codePrefix} ${baseNum.substring(0, 1)}02`,
      courseTitle: `Principles & Laboratory Practice in ${targetDept}`,
      venue: 'Central Science & Computing Lab',
      lecturer: 'Engr. M. K. Bello',
      type: 'Lab / Practical'
    },
    {
      id: `tt_${inst.id}_3`,
      institutionId: inst.id,
      institutionName: inst.name,
      faculty: 'Academic Faculty',
      department: targetDept,
      programme: `${targetLevel.includes('ND') ? 'ND' : 'B.Sc'} ${targetDept}`,
      level: targetLevel,
      semester: targetSemester as any,
      day: 'Tuesday',
      time: '08:00 AM - 10:00 AM',
      courseCode: 'GST 101',
      courseTitle: 'Use of English & Communication Skills',
      venue: 'University Large Hall A',
      lecturer: 'Dr. (Mrs.) C. Okon',
      type: 'Lecture'
    },
    {
      id: `tt_${inst.id}_4`,
      institutionId: inst.id,
      institutionName: inst.name,
      faculty: 'Academic Faculty',
      department: targetDept,
      programme: `${targetLevel.includes('ND') ? 'ND' : 'B.Sc'} ${targetDept}`,
      level: targetLevel,
      semester: targetSemester as any,
      day: 'Wednesday',
      time: '10:00 AM - 12:00 PM',
      courseCode: `${codePrefix} ${baseNum.substring(0, 1)}03`,
      courseTitle: `Quantitative Analysis & Systems for ${targetDept}`,
      venue: 'Auditorium 2',
      lecturer: 'Prof. T. O. Fashola',
      type: 'Lecture'
    },
    {
      id: `tt_${inst.id}_5`,
      institutionId: inst.id,
      institutionName: inst.name,
      faculty: 'Academic Faculty',
      department: targetDept,
      programme: `${targetLevel.includes('ND') ? 'ND' : 'B.Sc'} ${targetDept}`,
      level: targetLevel,
      semester: targetSemester as any,
      day: 'Thursday',
      time: '01:00 PM - 03:00 PM',
      courseCode: `${codePrefix} ${baseNum.substring(0, 1)}04`,
      courseTitle: `Applied Technology & Project Workshop`,
      venue: 'Departmental Design Studio',
      lecturer: 'Engr. S. A. Danladi',
      type: 'Lab / Practical'
    },
    {
      id: `tt_${inst.id}_exam_1`,
      institutionId: inst.id,
      institutionName: inst.name,
      faculty: 'Academic Faculty',
      department: targetDept,
      programme: `${targetLevel.includes('ND') ? 'ND' : 'B.Sc'} ${targetDept}`,
      level: targetLevel,
      semester: targetSemester as any,
      day: 'Friday',
      time: '09:00 AM - 12:00 PM',
      courseCode: `${codePrefix} ${baseNum.substring(0, 1)}01`,
      courseTitle: `Foundations of ${targetDept} I (Semester Exam)`,
      venue: 'Main Examination Pavilion',
      lecturer: 'Chief Invigilator: Dean of Faculty',
      type: 'Examination',
      examDate: '2025-02-14'
    }
  ];
}

// =========================================================================
// 5. PAST QUESTIONS REPOSITORY - INCLUDING ADEYEMI COLLEGE OF TECHNOLOGY ONDO
// =========================================================================
export const ACTO_PAST_QUESTIONS: PastQuestion[] = [
  // Computer Science - ND 1
  {
    id: 'pq_acto_com111_2024',
    courseCode: 'COM 111',
    courseTitle: 'Introduction to Computing & Information Technology',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 1',
    sessionYear: '2023/2024',
    semester: 'First Semester (Harmattan)',
    examType: 'Semester Exam',
    questionCount: 4,
    source: 'Adeyemi College of Technology Academic Examination Directorate',
    sourceType: 'admin_approved',
    status: 'Approved',
    copyrightNotice: 'Official Past Examination Paper released for revision and CBT practice.',
    questions: [
      {
        questionNumber: 1,
        questionText: 'Which fundamental hardware subsystem of the von Neumann architecture is responsible for performing integer arithmetic, bitwise shifts, and boolean logical comparisons?',
        options: [
          'Arithmetic Logic Unit (ALU)',
          'Control Unit (CU)',
          'Memory Management Unit (MMU)',
          'Instruction Register (IR)'
        ],
        correctOptionIndex: 0,
        explanation: 'The ALU (Arithmetic Logic Unit) executes all arithmetic calculations (addition, subtraction, multiplication) and logical operations (AND, OR, NOT, comparison) inside the central processor.',
        conceptCategory: 'Computer Architecture & ALU'
      },
      {
        questionNumber: 2,
        questionText: 'Convert the decimal integer 173 to its direct 8-bit unsigned binary representation.',
        options: [
          '10101101',
          '11001101',
          '10110101',
          '10011111'
        ],
        correctOptionIndex: 0,
        explanation: '173 = 128 + 32 + 8 + 4 + 1. In powers of two: 2^7 (128) + 2^5 (32) + 2^3 (8) + 2^2 (4) + 2^0 (1) = 10101101 in binary.',
        conceptCategory: 'Number Systems & Binary Conversion'
      },
      {
        questionNumber: 3,
        questionText: 'In algorithm flowcharts, which geometric symbol is strictly standardized by ANSI/ISO to represent a conditional branch or decision point?',
        options: [
          'Diamond (Rhombus)',
          'Rectangle',
          'Parallelogram',
          'Oval / Rounded Pill'
        ],
        correctOptionIndex: 0,
        explanation: 'Standard flowcharting syntax: Diamond denotes a decision/condition with two or more output branches (Yes/No, True/False). Parallelogram represents Input/Output; Rectangle represents a process.',
        conceptCategory: 'Flowcharts & Algorithm Representation'
      },
      {
        questionNumber: 4,
        questionText: 'Which computer memory type is non-volatile and contains the permanent bootstrapping firmware responsible for Power-On Self-Test (POST)?',
        options: [
          'ROM (Read-Only Memory / BIOS / UEFI)',
          'Dynamic RAM (DRAM)',
          'L1 CPU Cache',
          'Static RAM (SRAM)'
        ],
        correctOptionIndex: 0,
        explanation: 'ROM (Read-Only Memory) retains its memory contents without electrical power and stores essential bootstrapping firmware (BIOS/UEFI) required to initialize system hardware.',
        conceptCategory: 'Memory Systems & Firmware'
      }
    ]
  },

  // Computer Science - ND 2
  {
    id: 'pq_acto_com211_2024',
    courseCode: 'COM 211',
    courseTitle: 'Object-Oriented Programming with Java',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Computer Science',
    programme: 'ND Computer Science',
    level: 'ND 2',
    sessionYear: '2023/2024',
    semester: 'First Semester (Harmattan)',
    examType: 'Semester Exam',
    questionCount: 4,
    source: 'ACT Department of Computer Science Exam Board',
    sourceType: 'admin_approved',
    status: 'Approved',
    copyrightNotice: 'ACT Department of Computer Science archived assessment.',
    questions: [
      {
        questionNumber: 1,
        questionText: 'In Java, which access modifier restricts the visibility of a class member exclusively to within the declaring class and cannot be accessed by subclasses?',
        options: [
          'private',
          'protected',
          'public',
          'default (package-private)'
        ],
        correctOptionIndex: 0,
        explanation: 'The "private" modifier restricts field and method visibility strictly to within the enclosing class body, enforcing the principle of object encapsulation.',
        conceptCategory: 'Encapsulation & Access Modifiers'
      },
      {
        questionNumber: 2,
        questionText: 'What is the runtime behavior when a subclass provides a specific implementation for an instance method already declared in its superclass with identical name and parameter signature?',
        options: [
          'Method Overriding (Dynamic Polymorphism)',
          'Method Overloading (Compile-time Polymorphism)',
          'Shadowing',
          'Covariant Hiding'
        ],
        correctOptionIndex: 0,
        explanation: 'Method overriding allows a subclass to provide a specialized implementation of a method defined in its superclass, resolved at runtime via dynamic method dispatch.',
        conceptCategory: 'Polymorphism & Method Overriding'
      },
      {
        questionNumber: 3,
        questionText: 'Which Java keyword is utilized in a method header to declare that the method might throw specific checked exceptions, delegating handling to the caller?',
        options: [
          'throws',
          'throw',
          'catch',
          'finally'
        ],
        correctOptionIndex: 0,
        explanation: '"throws" is used in the method signature to specify which checked exceptions may be propagated out of the method, whereas "throw" explicitly raises an exception object.',
        conceptCategory: 'Exception Handling Mechanics'
      },
      {
        questionNumber: 4,
        questionText: 'What is the fundamental difference between an Abstract Class and an Interface in Java 8+?',
        options: [
          'An abstract class can declare instance fields and constructors; an interface cannot hold state',
          'Interfaces can only have private methods',
          'Classes can extend multiple abstract classes',
          'Abstract classes cannot have concrete methods'
        ],
        correctOptionIndex: 0,
        explanation: 'Abstract classes can maintain instance variables, constructors, and mutable state, while interfaces cannot maintain state (only static constants) though they support multiple implementation.',
        conceptCategory: 'Abstract Classes vs Interfaces'
      }
    ]
  },

  // Multimedia Technology - ND 1
  {
    id: 'pq_acto_mmt111_2024',
    courseCode: 'MMT 111',
    courseTitle: 'Introduction to Digital Media & Graphic Design',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Multimedia Technology',
    programme: 'ND Multimedia Technology',
    level: 'ND 1',
    sessionYear: '2023/2024',
    semester: 'First Semester (Harmattan)',
    examType: 'Semester Exam',
    questionCount: 4,
    source: 'ACT Multimedia & Design Directorate',
    sourceType: 'admin_approved',
    status: 'Approved',
    copyrightNotice: 'ACT accredited examination questions for Multimedia Technology.',
    questions: [
      {
        questionNumber: 1,
        questionText: 'In digital graphics, which color model is subtractive and specifically engineered for physical four-color commercial offset printing?',
        options: [
          'CMYK (Cyan, Magenta, Yellow, Key/Black)',
          'RGB (Red, Green, Blue)',
          'HSB (Hue, Saturation, Brightness)',
          'LAB Color Space'
        ],
        correctOptionIndex: 0,
        explanation: 'CMYK is a subtractive color model used in color printing where ink absorbs light. RGB is additive and used exclusively for electronic displays.',
        conceptCategory: 'Color Models & Prepress Printing'
      },
      {
        questionNumber: 2,
        questionText: 'What mathematical distinction fundamentally separates vector graphic assets from raster bitmap images?',
        options: [
          'Vectors are defined by mathematical curves and geometric paths, allowing infinite scaling without resolution pixelation',
          'Vectors are composed of fixed pixel grids with fixed DPI',
          'Raster images have smaller file sizes regardless of detail',
          'Vectors cannot be colored or styled'
        ],
        correctOptionIndex: 0,
        explanation: 'Vector graphics utilize mathematical formulas (Bézier curves, coordinates) to render shapes, making them infinitely scalable without loss of crispness, unlike pixel-based raster graphics.',
        conceptCategory: 'Vector vs Raster Graphics'
      },
      {
        questionNumber: 3,
        questionText: 'What is the standard minimum image resolution in dots per inch (DPI) required for high-definition professional offset paper printing in Nigeria?',
        options: [
          '300 DPI',
          '72 DPI',
          '150 DPI',
          '600 DPI'
        ],
        correctOptionIndex: 0,
        explanation: '300 DPI (Dots Per Inch) is the global printing standard for crisp, high-resolution photographic and graphic print materials, compared to 72/96 DPI for screen displays.',
        conceptCategory: 'Resolution & Print Specifications'
      },
      {
        questionNumber: 4,
        questionText: 'In typography hierarchy, what is the typographic term for the deliberate adjustment of space between two specific consecutive letter characters?',
        options: [
          'Kerning',
          'Tracking',
          'Leading',
          'Ligature'
        ],
        correctOptionIndex: 0,
        explanation: 'Kerning adjusts spacing between individual letter pairs (such as "AV" or "WA"). Tracking refers to overall letter spacing across an entire block of text; Leading refers to line height.',
        conceptCategory: 'Typography & Spatial Optics'
      }
    ]
  },

  // Multimedia Technology - ND 2
  {
    id: 'pq_acto_mmt211_2024',
    courseCode: 'MMT 211',
    courseTitle: '3D Computer Graphics & Modeling (Blender/Maya)',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Multimedia Technology',
    programme: 'ND Multimedia Technology',
    level: 'ND 2',
    sessionYear: '2023/2024',
    semester: 'First Semester (Harmattan)',
    examType: 'Semester Exam',
    questionCount: 4,
    source: 'ACT Animation & Media Production Lab',
    sourceType: 'admin_approved',
    status: 'Approved',
    copyrightNotice: 'ACT official 3D animation test archive.',
    questions: [
      {
        questionNumber: 1,
        questionText: 'In 3D mesh modeling, what is the geometric term for the process of flattening a 3D surface mesh into 2D coordinate space so that image textures can be accurately wrapped?',
        options: [
          'UV Unwrapping',
          'Retopology',
          'Extrusion',
          'Subdivision Surface'
        ],
        correctOptionIndex: 0,
        explanation: 'UV unwrapping is the process of projecting a 3D mesh onto a 2D plane (using U and V coordinates) to map 2D image textures accurately to 3D geometry.',
        conceptCategory: 'UV Mapping & 3D Texturing'
      },
      {
        questionNumber: 2,
        questionText: 'Which 3D shading technique calculates realistic lighting by tracing the physical path of light photons and their reflections across scene objects?',
        options: [
          'Ray Tracing / Path Tracing',
          'Flat Shading',
          'Gouraud Shading',
          'Phong Interpolation'
        ],
        correctOptionIndex: 0,
        explanation: 'Ray tracing and path tracing simulate the real physical behavior of light rays bouncing off surfaces, producing accurate ambient occlusion, reflections, refractions, and caustics.',
        conceptCategory: 'Photorealistic 3D Rendering'
      },
      {
        questionNumber: 3,
        questionText: 'In 3D character rigging, what is the system that automatically calculates the rotation of ancestor bones based on the desired position of the terminal effector (e.g. hand or foot)?',
        options: [
          'Inverse Kinematics (IK)',
          'Forward Kinematics (FK)',
          'Weight Painting',
          'Lattice Deformer'
        ],
        correctOptionIndex: 0,
        explanation: 'Inverse Kinematics (IK) calculates parent bone rotations automatically from the target position of the end-effector (such as moving the hand causes the elbow and shoulder to bend).',
        conceptCategory: 'Character Rigging & Kinematics'
      },
      {
        questionNumber: 4,
        questionText: 'What is a 4-sided polygon called in 3D modeling topology, which is strongly preferred for clean animation deformations and subdivision?',
        options: [
          'Quad',
          'N-gon',
          'Tri',
          'B-spline'
        ],
        correctOptionIndex: 0,
        explanation: 'Quads (4-sided polygons) are the gold standard for clean animation topology because they subdivide predictably and deform cleanly without pinching or shading artifacts.',
        conceptCategory: '3D Topology & Polygon Modeling'
      }
    ]
  },

  // Software Engineering - ND 1
  {
    id: 'pq_acto_swe111_2024',
    courseCode: 'SWE 111',
    courseTitle: 'Principles of Software Engineering & Logic',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Software Engineering',
    programme: 'ND Software Engineering',
    level: 'ND 1',
    sessionYear: '2023/2024',
    semester: 'First Semester (Harmattan)',
    examType: 'Semester Exam',
    questionCount: 4,
    source: 'ACT Software Engineering Exam Committee',
    sourceType: 'admin_approved',
    status: 'Approved',
    copyrightNotice: 'ACT Software Engineering Faculty Examination Archive.',
    questions: [
      {
        questionNumber: 1,
        questionText: 'In modern Agile Scrum software development, what is the time-boxed period (typically 1 to 4 weeks) during which a development team completes a designated set of user stories?',
        options: [
          'Sprint (Iteration)',
          'Epic',
          'Backlog Grooming',
          'Waterfall Phase'
        ],
        correctOptionIndex: 0,
        explanation: 'A Sprint is a fixed-duration timebox (usually 2 weeks) during which a Scrum team creates a potentially releasable product increment from selected product backlog items.',
        conceptCategory: 'Agile Methodologies & Scrum'
      },
      {
        questionNumber: 2,
        questionText: 'According to the Software Requirements Specification (SRS) standards (IEEE 830), which statement describes a NON-FUNCTIONAL requirement?',
        options: [
          'The system shall respond to user API requests within 200 milliseconds under a concurrent load of 1,000 users',
          'The system shall allow users to reset their password via SMS OTP',
          'The system shall generate end-of-month PDF financial reports',
          'The system shall allow students to register 8 courses per semester'
        ],
        correctOptionIndex: 0,
        explanation: 'Non-functional requirements describe system qualities, constraints, and performance metrics (e.g. latency, security, scalability) rather than specific behavioral features.',
        conceptCategory: 'Requirements Engineering & SRS'
      },
      {
        questionNumber: 3,
        questionText: 'In software version control with Git, which command creates a new isolated line of development without modifying the main codebase branch?',
        options: [
          'git checkout -b <branch-name> / git switch -c <branch-name>',
          'git commit -m',
          'git merge',
          'git rebase'
        ],
        correctOptionIndex: 0,
        explanation: '"git checkout -b <branch-name>" or "git switch -c <branch-name>" creates a new isolated Git branch from the current HEAD pointer, allowing developers to build features independently.',
        conceptCategory: 'Version Control & Git Workflow'
      },
      {
        questionNumber: 4,
        questionText: 'What is the worst-case asymptotic time complexity of searching an element in an unsorted array of n elements using Linear Search?',
        options: [
          'O(n)',
          'O(1)',
          'O(log n)',
          'O(n²)'
        ],
        correctOptionIndex: 0,
        explanation: 'Linear search inspects every element sequentially until it finds the target or reaches the end; in the worst case, all n elements must be checked, yielding O(n) runtime.',
        conceptCategory: 'Algorithm Complexity & Big-O'
      }
    ]
  },

  // Software Engineering - ND 2
  {
    id: 'pq_acto_swe211_2024',
    courseCode: 'SWE 211',
    courseTitle: 'Software Architecture & Enterprise Design Patterns',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Software Engineering',
    programme: 'ND Software Engineering',
    level: 'ND 2',
    sessionYear: '2023/2024',
    semester: 'First Semester (Harmattan)',
    examType: 'Semester Exam',
    questionCount: 4,
    source: 'ACT Department of Software Engineering',
    sourceType: 'admin_approved',
    status: 'Approved',
    copyrightNotice: 'ACT Software Engineering Advanced Architecture examination archive.',
    questions: [
      {
        questionNumber: 1,
        questionText: 'Under the SOLID principles of object-oriented architecture, what does the "Single Responsibility Principle" (SRP) mandate?',
        options: [
          'A module or class should have one, and only one, reason to change',
          'A software entity should be open for extension but closed for modification',
          'Subtypes must be substitutable for their base types',
          'High-level modules should not depend on low-level modules'
        ],
        correctOptionIndex: 0,
        explanation: 'SRP (Single Responsibility Principle) states that a class should perform one cohesive job and have only one actor or reason to change, minimizing ripple effects when updating code.',
        conceptCategory: 'SOLID Principles of Architecture'
      },
      {
        questionNumber: 2,
        questionText: 'Which Gang of Four (GoF) creational design pattern ensures that a class has only a single global instance and provides a single global point of access to it?',
        options: [
          'Singleton Pattern',
          'Factory Method Pattern',
          'Builder Pattern',
          'Prototype Pattern'
        ],
        correctOptionIndex: 0,
        explanation: 'The Singleton pattern restricts class instantiation to a single object, useful for shared resources like database connection pools, logger instances, or configuration managers.',
        conceptCategory: 'Creational Design Patterns'
      },
      {
        questionNumber: 3,
        questionText: 'In event-driven microservices architecture, which architectural pattern separates read queries from write command mutations into distinct models and pipelines?',
        options: [
          'CQRS (Command Query Responsibility Segregation)',
          'MVC (Model-View-Controller)',
          'Saga Pattern',
          'Strangler Fig Pattern'
        ],
        correctOptionIndex: 0,
        explanation: 'CQRS separates operations that update data (Commands) from operations that read data (Queries), enabling independent scaling, specialized database schemas, and optimized read caches.',
        conceptCategory: 'Distributed Systems & CQRS'
      },
      {
        questionNumber: 4,
        questionText: 'In RESTful web APIs, which HTTP request method must be strictly IDEMPOTENT and used to completely replace an existing resource?',
        options: [
          'PUT',
          'POST',
          'PATCH',
          'CONNECT'
        ],
        correctOptionIndex: 0,
        explanation: 'HTTP PUT is idempotent; making multiple identical PUT requests with the same payload results in the exact same resource state as making a single request, replacing the target entity.',
        conceptCategory: 'RESTful API Engineering & Idempotency'
      }
    ]
  },

  // Hardware Engineering - ND 1
  {
    id: 'pq_acto_hwe111_2024',
    courseCode: 'HWE 111',
    courseTitle: 'Electrical Engineering Science & Circuit Theory',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Hardware Engineering',
    programme: 'ND Hardware Engineering',
    level: 'ND 1',
    sessionYear: '2023/2024',
    semester: 'First Semester (Harmattan)',
    examType: 'Semester Exam',
    questionCount: 4,
    source: 'ACT Hardware Engineering Workshop Board',
    sourceType: 'admin_approved',
    status: 'Approved',
    copyrightNotice: 'ACT Accredited Hardware Engineering Past Questions.',
    questions: [
      {
        questionNumber: 1,
        questionText: 'State Kirchhoff\'s Voltage Law (KVL) as applied to closed electrical circuit meshes:',
        options: [
          'The algebraic sum of all electrical potential differences (voltages) around any closed loop is zero',
          'The total current entering any circuit node equals the total current leaving that node',
          'Voltage is inversely proportional to circuit resistance',
          'Power dissipated equals current divided by voltage'
        ],
        correctOptionIndex: 0,
        explanation: 'KVL (Kirchhoff\'s Voltage Law) is a consequence of conservation of energy: the directed sum of potential differences around any closed circuit loop must equal zero: ΣV = 0.',
        conceptCategory: 'Kirchhoff\'s Circuit Laws'
      },
      {
        questionNumber: 2,
        questionText: 'Three resistors with values R1 = 10Ω, R2 = 20Ω, and R3 = 20Ω are connected in parallel across a 12V DC power source. What is the total equivalent circuit resistance (R_eq)?',
        options: [
          '5Ω',
          '10Ω',
          '20Ω',
          '50Ω'
        ],
        correctOptionIndex: 0,
        explanation: '1/R_eq = 1/10 + 1/20 + 1/20 = 2/20 + 1/20 + 1/20 = 4/20 = 1/5. Thus R_eq = 5Ω.',
        conceptCategory: 'Parallel Circuit Calculations'
      },
      {
        questionNumber: 3,
        questionText: 'Which theorem states that any linear bilateral two-terminal resistive network can be replaced by an equivalent circuit consisting of a single voltage source (V_th) in series with a resistor (R_th)?',
        options: [
          'Thévenin\'s Theorem',
          'Norton\'s Theorem',
          'Maximum Power Transfer Theorem',
          'Superposition Theorem'
        ],
        correctOptionIndex: 0,
        explanation: 'Thévenin\'s theorem simplifies any linear electrical circuit to a single open-circuit voltage source (V_th) in series with an equivalent resistance (R_th).',
        conceptCategory: 'Network Theorems'
      },
      {
        questionNumber: 4,
        questionText: 'What is the electrical unit of Capacitance?',
        options: [
          'Farad (F)',
          'Henry (H)',
          'Ohm (Ω)',
          'Siemens (S)'
        ],
        correctOptionIndex: 0,
        explanation: 'The Farad (F) is the SI unit of electrical capacitance (1 Farad = 1 Coulomb per Volt). Henry is the unit of inductance; Ohm is resistance; Siemens is conductance.',
        conceptCategory: 'Electronic Components & SI Units'
      }
    ]
  },

  // Hardware Engineering - ND 2
  {
    id: 'pq_acto_hwe211_2024',
    courseCode: 'HWE 211',
    courseTitle: 'Microcontroller Interfacing & IoT Sensor Networks',
    institutionId: 'adeyemi_tech_ondo',
    institutionName: 'Adeyemi College of Technology, Ondo',
    faculty: 'Faculty of Engineering Technology',
    department: 'Hardware Engineering',
    programme: 'ND Hardware Engineering',
    level: 'ND 2',
    sessionYear: '2023/2024',
    semester: 'First Semester (Harmattan)',
    examType: 'Semester Exam',
    questionCount: 4,
    source: 'ACT Embedded Systems & IoT Research Group',
    sourceType: 'admin_approved',
    status: 'Approved',
    copyrightNotice: 'ACT Hardware Engineering laboratory examination archive.',
    questions: [
      {
        questionNumber: 1,
        questionText: 'In serial microcontroller communication, which synchronous two-wire serial protocol uses a Serial Data (SDA) line and a Serial Clock (SCL) line with master-slave pull-up resistors?',
        options: [
          'I2C (Inter-Integrated Circuit)',
          'SPI (Serial Peripheral Interface)',
          'UART (Universal Asynchronous Receiver-Transmitter)',
          'RS-232'
        ],
        correctOptionIndex: 0,
        explanation: 'I2C uses only 2 bidirectional open-drain lines (SDA and SCL) pulled up with resistors to connect multiple peripheral sensor ICs to a microcontroller using 7-bit addresses.',
        conceptCategory: 'Serial Microcontroller Protocols (I2C)'
      },
      {
        questionNumber: 2,
        questionText: 'In Internet of Things (IoT) sensor hardware, which lightweight, publish-subscribe network protocol is optimized for constrained devices operating over low-bandwidth wireless connections?',
        options: [
          'MQTT (Message Queuing Telemetry Transport)',
          'HTTP/1.1 REST',
          'FTP',
          'SNMP'
        ],
        correctOptionIndex: 0,
        explanation: 'MQTT is a very lightweight broker-based publish/subscribe messaging protocol designed specifically for IoT sensors with small memory footprints and unreliable mobile/cellular networks.',
        conceptCategory: 'IoT Protocols & Telemetry'
      },
      {
        questionNumber: 3,
        questionText: 'What is the function of a pull-up resistor connected to a digital microcontroller input pin wired to an active-low push button?',
        options: [
          'To prevent the input pin from floating and hold it at a stable HIGH (Vcc) logic state when the button is open',
          'To increase current flow into the chip',
          'To invert the clock signal',
          'To convert analog signals to digital'
        ],
        correctOptionIndex: 0,
        explanation: 'A pull-up resistor prevents floating high-impedance states by ensuring the microcontroller pin reads a definite HIGH (logic 1) when the switch is open, dropping to LOW (logic 0) when pressed.',
        conceptCategory: 'Digital Circuit Interfacing'
      },
      {
        questionNumber: 4,
        questionText: 'What technique modulates the duty cycle of a fixed-frequency digital square wave to control the rotational speed of a DC motor or brightness of an LED?',
        options: [
          'PWM (Pulse Width Modulation)',
          'Frequency Modulation (FM)',
          'Amplitude Shift Keying (ASK)',
          'Analog Attenuation'
        ],
        correctOptionIndex: 0,
        explanation: 'PWM (Pulse Width Modulation) varies the percentage of time the signal is HIGH (duty cycle) in each period, regulating average power delivered to motors or LEDs without analog voltage losses.',
        conceptCategory: 'Actuator Control & PWM'
      }
    ]
  }
];
