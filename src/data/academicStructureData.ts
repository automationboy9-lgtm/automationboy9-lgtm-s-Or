import { 
  Institution, 
  FacultyRecord, 
  DepartmentRecord, 
  ProgrammeRecord, 
  CourseRecord, 
  PastQuestion, 
  StudyMaterial 
} from '../types';
import { NIGERIAN_INSTITUTIONS } from './institutionsData';
import { COMPREHENSIVE_COURSES } from './allCoursesData';
import { ACTO_ENGINEERING_TECH_COURSES, ACTO_PAST_QUESTIONS } from './schoolAcademicData';

// ==========================================
// 1. NIGERIAN TERTIARY INSTITUTIONS DIRECTORY
// ==========================================
export const ALL_INSTITUTIONS: Institution[] = NIGERIAN_INSTITUTIONS;

// ==========================================
// 2. FACULTIES & SCHOOLS DATA
// ==========================================
export const ALL_FACULTIES: FacultyRecord[] = [
  // UNILAG
  { id: 'fac_unilag_sci', name: 'Faculty of Science', code: 'FSC', institutionId: 'unilag', institutionName: 'University of Lagos', description: 'Computing, Mathematics, Physics, Chemistry, Marine Biology & Microbiology' },
  { id: 'fac_unilag_eng', name: 'Faculty of Engineering', code: 'ENG', institutionId: 'unilag', institutionName: 'University of Lagos', description: 'Electrical, Mechanical, Civil, Chemical, Systems & Petroleum Engineering' },
  { id: 'fac_unilag_law', name: 'Faculty of Law', code: 'LAW', institutionId: 'unilag', institutionName: 'University of Lagos', description: 'Jurisprudence, Public & Commercial Law' },
  { id: 'fac_unilag_mgt', name: 'Faculty of Management Sciences', code: 'FMS', institutionId: 'unilag', institutionName: 'University of Lagos', description: 'Accounting, Business Admin, Finance, Marketing & Actuarial Science' },
  { id: 'fac_unilag_soc', name: 'Faculty of Social Sciences', code: 'FSS', institutionId: 'unilag', institutionName: 'University of Lagos', description: 'Economics, Mass Communication, Political Science, Psychology & Sociology' },
  { id: 'fac_unilag_med', name: 'College of Medicine', code: 'CMUL', institutionId: 'unilag', institutionName: 'University of Lagos', description: 'Medicine & Surgery, Nursing, Physiotherapy, Medical Lab Science & Dentistry' },

  // UI
  { id: 'fac_ui_sci', name: 'Faculty of Science', code: 'SCI', institutionId: 'ui', institutionName: 'University of Ibadan', description: 'Computer Science, Mathematics, Physics, Statistics, Geology & Zoology' },
  { id: 'fac_ui_tech', name: 'Faculty of Technology', code: 'TECH', institutionId: 'ui', institutionName: 'University of Ibadan', description: 'Electrical/Electronic, Mechanical, Civil, Petroleum & Agricultural Engineering' },
  { id: 'fac_ui_law', name: 'Faculty of Law', code: 'LAW', institutionId: 'ui', institutionName: 'University of Ibadan', description: 'Legal Method, Constitutional Law, Commercial Law & International Law' },
  { id: 'fac_ui_soc', name: 'Faculty of Social Sciences', code: 'FSS', institutionId: 'ui', institutionName: 'University of Ibadan', description: 'Economics, Political Science, Geography & Sociology' },
  { id: 'fac_ui_econ', name: 'Faculty of Economics & Management Sciences', code: 'FEMS', institutionId: 'ui', institutionName: 'University of Ibadan', description: 'Banking and Finance, Accounting, Business Administration' },

  // OAU
  { id: 'fac_oau_tech', name: 'Faculty of Technology', code: 'TECH', institutionId: 'oau', institutionName: 'Obafemi Awolowo University', description: 'Computer Engineering, Mechanical Engineering, Electronic & Electrical Engineering' },
  { id: 'fac_oau_sci', name: 'Faculty of Science', code: 'SCI', institutionId: 'oau', institutionName: 'Obafemi Awolowo University', description: 'Computer Science, Chemistry, Physics, Mathematics' },
  { id: 'fac_oau_admin', name: 'Faculty of Administration', code: 'ADM', institutionId: 'oau', institutionName: 'Obafemi Awolowo University', description: 'Management and Accounting, Public Administration' },

  // YABATECH
  { id: 'fac_yaba_tech', name: 'School of Technology', code: 'SOT', institutionId: 'yabatech', institutionName: 'Yaba College of Technology', description: 'Computer Science, Food Technology, Hospitality Management, Polymer Technology' },
  { id: 'fac_yaba_eng', name: 'School of Engineering', code: 'SOE', institutionId: 'yabatech', institutionName: 'Yaba College of Technology', description: 'Electrical/Electronic, Mechanical, Civil, Industrial Maintenance & Computer Engineering' },
  { id: 'fac_yaba_mgt', name: 'School of Management & Business Studies', code: 'SMBS', institutionId: 'yabatech', institutionName: 'Yaba College of Technology', description: 'Accountancy, Business Administration, Banking & Finance, Marketing' },

  // FCE Akoka
  { id: 'fac_fce_tech', name: 'School of Technical Education', code: 'STE', institutionId: 'fce_akoka', institutionName: 'Federal College of Education (Technical), Akoka', description: 'Automobile Tech, Building Tech, Electrical/Electronic Tech, Metalwork Tech' },
  { id: 'fac_fce_sci', name: 'School of Science Education', code: 'SSE', institutionId: 'fce_akoka', institutionName: 'Federal College of Education (Technical), Akoka', description: 'Computer Science Education, Biology Education, Chemistry Education, Physics Education' },

  // Adeyemi College of Technology, Ondo
  { id: 'fac_acto_engtech', name: 'Faculty of Engineering Technology', code: 'FET', institutionId: 'adeyemi_tech_ondo', institutionName: 'Adeyemi College of Technology, Ondo', description: 'Accredited Faculty of Engineering Technology in Ondo offering two-year National Diploma programs in Computer Science, Multimedia Technology, Software Engineering, and Hardware Engineering.' }
];

// ==========================================
// 3. DEPARTMENTS DATA
// ==========================================
export const ALL_DEPARTMENTS: DepartmentRecord[] = [
  // UNILAG Departments
  { id: 'dept_unilag_csc', name: 'Computer Science', code: 'CSC', facultyId: 'fac_unilag_sci', facultyName: 'Faculty of Science', institutionId: 'unilag', institutionName: 'University of Lagos' },
  { id: 'dept_unilag_mat', name: 'Mathematics', code: 'MAT', facultyId: 'fac_unilag_sci', facultyName: 'Faculty of Science', institutionId: 'unilag', institutionName: 'University of Lagos' },
  { id: 'dept_unilag_phy', name: 'Physics', code: 'PHY', facultyId: 'fac_unilag_sci', facultyName: 'Faculty of Science', institutionId: 'unilag', institutionName: 'University of Lagos' },
  { id: 'dept_unilag_eee', name: 'Electrical & Electronics Engineering', code: 'EEE', facultyId: 'fac_unilag_eng', facultyName: 'Faculty of Engineering', institutionId: 'unilag', institutionName: 'University of Lagos' },
  { id: 'dept_unilag_mec', name: 'Mechanical Engineering', code: 'MEC', facultyId: 'fac_unilag_eng', facultyName: 'Faculty of Engineering', institutionId: 'unilag', institutionName: 'University of Lagos' },
  { id: 'dept_unilag_cve', name: 'Civil & Environmental Engineering', code: 'CVE', facultyId: 'fac_unilag_eng', facultyName: 'Faculty of Engineering', institutionId: 'unilag', institutionName: 'University of Lagos' },
  { id: 'dept_unilag_law', name: 'Law', code: 'LAW', facultyId: 'fac_unilag_law', facultyName: 'Faculty of Law', institutionId: 'unilag', institutionName: 'University of Lagos' },
  { id: 'dept_unilag_acc', name: 'Accounting', code: 'ACC', facultyId: 'fac_unilag_mgt', facultyName: 'Faculty of Management Sciences', institutionId: 'unilag', institutionName: 'University of Lagos' },
  { id: 'dept_unilag_bus', name: 'Business Administration', code: 'BUS', facultyId: 'fac_unilag_mgt', facultyName: 'Faculty of Management Sciences', institutionId: 'unilag', institutionName: 'University of Lagos' },
  { id: 'dept_unilag_eco', name: 'Economics', code: 'ECO', facultyId: 'fac_unilag_soc', facultyName: 'Faculty of Social Sciences', institutionId: 'unilag', institutionName: 'University of Lagos' },
  { id: 'dept_unilag_mas', name: 'Mass Communication', code: 'MAS', facultyId: 'fac_unilag_soc', facultyName: 'Faculty of Social Sciences', institutionId: 'unilag', institutionName: 'University of Lagos' },
  { id: 'dept_unilag_med', name: 'Medicine & Surgery', code: 'MED', facultyId: 'fac_unilag_med', facultyName: 'College of Medicine', institutionId: 'unilag', institutionName: 'University of Lagos' },
  { id: 'dept_unilag_nur', name: 'Nursing Science', code: 'NUR', facultyId: 'fac_unilag_med', facultyName: 'College of Medicine', institutionId: 'unilag', institutionName: 'University of Lagos' },

  // UI Departments
  { id: 'dept_ui_csc', name: 'Computer Science', code: 'CSC', facultyId: 'fac_ui_sci', facultyName: 'Faculty of Science', institutionId: 'ui', institutionName: 'University of Ibadan' },
  { id: 'dept_ui_mat', name: 'Mathematics', code: 'MAT', facultyId: 'fac_ui_sci', facultyName: 'Faculty of Science', institutionId: 'ui', institutionName: 'University of Ibadan' },
  { id: 'dept_ui_eee', name: 'Electrical & Electronic Engineering', code: 'EEE', facultyId: 'fac_ui_tech', facultyName: 'Faculty of Technology', institutionId: 'ui', institutionName: 'University of Ibadan' },
  { id: 'dept_ui_mec', name: 'Mechanical Engineering', code: 'MEC', facultyId: 'fac_ui_tech', facultyName: 'Faculty of Technology', institutionId: 'ui', institutionName: 'University of Ibadan' },
  { id: 'dept_ui_eco', name: 'Economics', code: 'ECO', facultyId: 'fac_ui_soc', facultyName: 'Faculty of Social Sciences', institutionId: 'ui', institutionName: 'University of Ibadan' },
  { id: 'dept_ui_law', name: 'Law', code: 'LAW', facultyId: 'fac_ui_law', facultyName: 'Faculty of Law', institutionId: 'ui', institutionName: 'University of Ibadan' },

  // YABATECH Departments
  { id: 'dept_yaba_csc', name: 'Computer Science', code: 'CSC', facultyId: 'fac_yaba_tech', facultyName: 'School of Technology', institutionId: 'yabatech', institutionName: 'Yaba College of Technology' },
  { id: 'dept_yaba_food', name: 'Food Technology', code: 'FST', facultyId: 'fac_yaba_tech', facultyName: 'School of Technology', institutionId: 'yabatech', institutionName: 'Yaba College of Technology' },
  { id: 'dept_yaba_eee', name: 'Electrical Engineering', code: 'EEE', facultyId: 'fac_yaba_eng', facultyName: 'School of Engineering', institutionId: 'yabatech', institutionName: 'Yaba College of Technology' },
  { id: 'dept_yaba_acc', name: 'Accountancy', code: 'ACC', facultyId: 'fac_yaba_mgt', facultyName: 'School of Management & Business Studies', institutionId: 'yabatech', institutionName: 'Yaba College of Technology' },
  { id: 'dept_yaba_bus', name: 'Business Administration', code: 'BUS', facultyId: 'fac_yaba_mgt', facultyName: 'School of Management & Business Studies', institutionId: 'yabatech', institutionName: 'Yaba College of Technology' },

  // Adeyemi College of Technology, Ondo Departments
  { id: 'dept_acto_csc', name: 'Computer Science', code: 'CSC', facultyId: 'fac_acto_engtech', facultyName: 'Faculty of Engineering Technology', institutionId: 'adeyemi_tech_ondo', institutionName: 'Adeyemi College of Technology, Ondo' },
  { id: 'dept_acto_mmt', name: 'Multimedia Technology', code: 'MMT', facultyId: 'fac_acto_engtech', facultyName: 'Faculty of Engineering Technology', institutionId: 'adeyemi_tech_ondo', institutionName: 'Adeyemi College of Technology, Ondo' },
  { id: 'dept_acto_swe', name: 'Software Engineering', code: 'SWE', facultyId: 'fac_acto_engtech', facultyName: 'Faculty of Engineering Technology', institutionId: 'adeyemi_tech_ondo', institutionName: 'Adeyemi College of Technology, Ondo' },
  { id: 'dept_acto_hwe', name: 'Hardware Engineering', code: 'HWE', facultyId: 'fac_acto_engtech', facultyName: 'Faculty of Engineering Technology', institutionId: 'adeyemi_tech_ondo', institutionName: 'Adeyemi College of Technology, Ondo' }
];

// ==========================================
// 4. PROGRAMMES DATA
// ==========================================
export const ALL_PROGRAMMES: ProgrammeRecord[] = [
  // UNILAG Programmes
  { id: 'prog_unilag_bsc_csc', name: 'B.Sc Computer Science', code: 'BSC-CSC', degreeType: 'B.Sc', departmentId: 'dept_unilag_csc', departmentName: 'Computer Science', facultyId: 'fac_unilag_sci', facultyName: 'Faculty of Science', institutionId: 'unilag', institutionName: 'University of Lagos', durationYears: 4, levels: ['100L', '200L', '300L', '400L'] },
  { id: 'prog_unilag_bsc_mat', name: 'B.Sc Mathematics', code: 'BSC-MAT', degreeType: 'B.Sc', departmentId: 'dept_unilag_mat', departmentName: 'Mathematics', facultyId: 'fac_unilag_sci', facultyName: 'Faculty of Science', institutionId: 'unilag', institutionName: 'University of Lagos', durationYears: 4, levels: ['100L', '200L', '300L', '400L'] },
  { id: 'prog_unilag_beng_eee', name: 'B.Sc Electrical & Electronics Engineering', code: 'BSC-EEE', degreeType: 'B.Eng', departmentId: 'dept_unilag_eee', departmentName: 'Electrical & Electronics Engineering', facultyId: 'fac_unilag_eng', facultyName: 'Faculty of Engineering', institutionId: 'unilag', institutionName: 'University of Lagos', durationYears: 5, levels: ['100L', '200L', '300L', '400L', '500L'] },
  { id: 'prog_unilag_beng_mec', name: 'B.Sc Mechanical Engineering', code: 'BSC-MEC', degreeType: 'B.Eng', departmentId: 'dept_unilag_mec', departmentName: 'Mechanical Engineering', facultyId: 'fac_unilag_eng', facultyName: 'Faculty of Engineering', institutionId: 'unilag', institutionName: 'University of Lagos', durationYears: 5, levels: ['100L', '200L', '300L', '400L', '500L'] },
  { id: 'prog_unilag_llb_law', name: 'LL.B Bachelor of Laws', code: 'LLB-LAW', degreeType: 'LL.B', departmentId: 'dept_unilag_law', departmentName: 'Law', facultyId: 'fac_unilag_law', facultyName: 'Faculty of Law', institutionId: 'unilag', institutionName: 'University of Lagos', durationYears: 5, levels: ['100L', '200L', '300L', '400L', '500L'] },
  { id: 'prog_unilag_bsc_acc', name: 'B.Sc Accounting', code: 'BSC-ACC', degreeType: 'B.Sc', departmentId: 'dept_unilag_acc', departmentName: 'Accounting', facultyId: 'fac_unilag_mgt', facultyName: 'Faculty of Management Sciences', institutionId: 'unilag', institutionName: 'University of Lagos', durationYears: 4, levels: ['100L', '200L', '300L', '400L'] },
  { id: 'prog_unilag_bsc_bus', name: 'B.Sc Business Administration', code: 'BSC-BUS', degreeType: 'B.Sc', departmentId: 'dept_unilag_bus', departmentName: 'Business Administration', facultyId: 'fac_unilag_mgt', facultyName: 'Faculty of Management Sciences', institutionId: 'unilag', institutionName: 'University of Lagos', durationYears: 4, levels: ['100L', '200L', '300L', '400L'] },
  { id: 'prog_unilag_bsc_eco', name: 'B.Sc Economics', code: 'BSC-ECO', degreeType: 'B.Sc', departmentId: 'dept_unilag_eco', departmentName: 'Economics', facultyId: 'fac_unilag_soc', facultyName: 'Faculty of Social Sciences', institutionId: 'unilag', institutionName: 'University of Lagos', durationYears: 4, levels: ['100L', '200L', '300L', '400L'] },
  { id: 'prog_unilag_bsc_mas', name: 'B.Sc Mass Communication', code: 'BSC-MAS', degreeType: 'B.Sc', departmentId: 'dept_unilag_mas', departmentName: 'Mass Communication', facultyId: 'fac_unilag_soc', facultyName: 'Faculty of Social Sciences', institutionId: 'unilag', institutionName: 'University of Lagos', durationYears: 4, levels: ['100L', '200L', '300L', '400L'] },
  { id: 'prog_unilag_mbbs', name: 'MBBS Medicine & Surgery', code: 'MBBS-MED', degreeType: 'MBBS', departmentId: 'dept_unilag_med', departmentName: 'Medicine & Surgery', facultyId: 'fac_unilag_med', facultyName: 'College of Medicine', institutionId: 'unilag', institutionName: 'University of Lagos', durationYears: 6, levels: ['100L', '200L', '300L', '400L', '500L', '600L'] },
  { id: 'prog_unilag_bnsc', name: 'B.N.Sc Nursing Science', code: 'BNSC-NUR', degreeType: 'B.Sc', departmentId: 'dept_unilag_nur', departmentName: 'Nursing Science', facultyId: 'fac_unilag_med', facultyName: 'College of Medicine', institutionId: 'unilag', institutionName: 'University of Lagos', durationYears: 5, levels: ['100L', '200L', '300L', '400L', '500L'] },

  // UI Programmes
  { id: 'prog_ui_bsc_csc', name: 'B.Sc Computer Science', code: 'BSC-CSC-UI', degreeType: 'B.Sc', departmentId: 'dept_ui_csc', departmentName: 'Computer Science', facultyId: 'fac_ui_sci', facultyName: 'Faculty of Science', institutionId: 'ui', institutionName: 'University of Ibadan', durationYears: 4, levels: ['100L', '200L', '300L', '400L'] },
  { id: 'prog_ui_bsc_mat', name: 'B.Sc Mathematics', code: 'BSC-MAT-UI', degreeType: 'B.Sc', departmentId: 'dept_ui_mat', departmentName: 'Mathematics', facultyId: 'fac_ui_sci', facultyName: 'Faculty of Science', institutionId: 'ui', institutionName: 'University of Ibadan', durationYears: 4, levels: ['100L', '200L', '300L', '400L'] },
  { id: 'prog_ui_beng_eee', name: 'B.Sc Electrical Engineering', code: 'BSC-EEE-UI', degreeType: 'B.Eng', departmentId: 'dept_ui_eee', departmentName: 'Electrical & Electronic Engineering', facultyId: 'fac_ui_tech', facultyName: 'Faculty of Technology', institutionId: 'ui', institutionName: 'University of Ibadan', durationYears: 5, levels: ['100L', '200L', '300L', '400L', '500L'] },
  { id: 'prog_ui_llb_law', name: 'LL.B Bachelor of Laws', code: 'LLB-LAW-UI', degreeType: 'LL.B', departmentId: 'dept_ui_law', departmentName: 'Law', facultyId: 'fac_ui_law', facultyName: 'Faculty of Law', institutionId: 'ui', institutionName: 'University of Ibadan', durationYears: 5, levels: ['100L', '200L', '300L', '400L', '500L'] },

  // YABATECH Programmes
  { id: 'prog_yaba_nd_csc', name: 'ND Computer Science', code: 'ND-CSC', degreeType: 'ND', departmentId: 'dept_yaba_csc', departmentName: 'Computer Science', facultyId: 'fac_yaba_tech', facultyName: 'School of Technology', institutionId: 'yabatech', institutionName: 'Yaba College of Technology', durationYears: 2, levels: ['ND I', 'ND II'] },
  { id: 'prog_yaba_hnd_csc', name: 'HND Computer Science', code: 'HND-CSC', degreeType: 'HND', departmentId: 'dept_yaba_csc', departmentName: 'Computer Science', facultyId: 'fac_yaba_tech', facultyName: 'School of Technology', institutionId: 'yabatech', institutionName: 'Yaba College of Technology', durationYears: 2, levels: ['HND I', 'HND II'] },
  { id: 'prog_yaba_nd_eee', name: 'ND Electrical/Electronic Engineering', code: 'ND-EEE', degreeType: 'ND', departmentId: 'dept_yaba_eee', departmentName: 'Electrical Engineering', facultyId: 'fac_yaba_eng', facultyName: 'School of Engineering', institutionId: 'yabatech', institutionName: 'Yaba College of Technology', durationYears: 2, levels: ['ND I', 'ND II'] },
  { id: 'prog_yaba_hnd_eee', name: 'HND Electrical Engineering (Electronics/Telecom)', code: 'HND-EEE', degreeType: 'HND', departmentId: 'dept_yaba_eee', departmentName: 'Electrical Engineering', facultyId: 'fac_yaba_eng', facultyName: 'School of Engineering', institutionId: 'yabatech', institutionName: 'Yaba College of Technology', durationYears: 2, levels: ['HND I', 'HND II'] },
  { id: 'prog_yaba_nd_acc', name: 'ND Accountancy', code: 'ND-ACC', degreeType: 'ND', departmentId: 'dept_yaba_acc', departmentName: 'Accountancy', facultyId: 'fac_yaba_mgt', facultyName: 'School of Management & Business Studies', institutionId: 'yabatech', institutionName: 'Yaba College of Technology', durationYears: 2, levels: ['ND I', 'ND II'] },

  // Adeyemi College of Technology, Ondo Programmes (ACT - National Diploma Certificate)
  { id: 'prog_acto_nd_csc', name: 'ND Computer Science', code: 'ND-CSC-ACT', degreeType: 'ND', departmentId: 'dept_acto_csc', departmentName: 'Computer Science', facultyId: 'fac_acto_engtech', facultyName: 'Faculty of Engineering Technology', institutionId: 'adeyemi_tech_ondo', institutionName: 'Adeyemi College of Technology, Ondo', durationYears: 2, levels: ['ND 1', 'ND 2'] },
  { id: 'prog_acto_nd_mmt', name: 'ND Multimedia Technology', code: 'ND-MMT-ACT', degreeType: 'ND', departmentId: 'dept_acto_mmt', departmentName: 'Multimedia Technology', facultyId: 'fac_acto_engtech', facultyName: 'Faculty of Engineering Technology', institutionId: 'adeyemi_tech_ondo', institutionName: 'Adeyemi College of Technology, Ondo', durationYears: 2, levels: ['ND 1', 'ND 2'] },
  { id: 'prog_acto_nd_swe', name: 'ND Software Engineering', code: 'ND-SWE-ACT', degreeType: 'ND', departmentId: 'dept_acto_swe', departmentName: 'Software Engineering', facultyId: 'fac_acto_engtech', facultyName: 'Faculty of Engineering Technology', institutionId: 'adeyemi_tech_ondo', institutionName: 'Adeyemi College of Technology, Ondo', durationYears: 2, levels: ['ND 1', 'ND 2'] },
  { id: 'prog_acto_nd_hwe', name: 'ND Hardware Engineering', code: 'ND-HWE-ACT', degreeType: 'ND', departmentId: 'dept_acto_hwe', departmentName: 'Hardware Engineering', facultyId: 'fac_acto_engtech', facultyName: 'Faculty of Engineering Technology', institutionId: 'adeyemi_tech_ondo', institutionName: 'Adeyemi College of Technology, Ondo', durationYears: 2, levels: ['ND 1', 'ND 2'] }
];

// ==========================================
// 5. COMPREHENSIVE COURSES CATALOGUE
// ==========================================
const CORE_MANUAL_COURSES: CourseRecord[] = [
  // General Studies (GST) Courses
  {
    id: 'crs_gst_101',
    courseTitle: 'Use of English & Communication Skills I',
    courseCode: 'GST 101',
    creditUnit: 2,
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'General Studies Unit',
    department: 'General Studies',
    programme: 'All Programmes',
    level: '100L',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Grammar mechanics, paragraph development, reading comprehension, note-taking, concord and academic writing skills.',
    status: 'Approved'
  },
  {
    id: 'crs_gst_102',
    courseTitle: 'Use of English & Communication Skills II',
    courseCode: 'GST 102',
    creditUnit: 2,
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'General Studies Unit',
    department: 'General Studies',
    programme: 'All Programmes',
    level: '100L',
    semester: 'Second Semester (Rain/Omega)',
    courseDescription: 'Logical presentation of research papers, citation techniques (APA/MLA), term paper documentation, and public speaking.',
    status: 'Approved'
  },
  {
    id: 'crs_gst_103',
    courseTitle: 'Nigerian Peoples and Culture',
    courseCode: 'GST 103',
    creditUnit: 2,
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'General Studies Unit',
    department: 'General Studies',
    programme: 'All Programmes',
    level: '100L',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Historical evolution of Nigerian ethnic nationalities, indigenous political systems, colonial impact, and national integration.',
    status: 'Approved'
  },
  {
    id: 'crs_gst_201',
    courseTitle: 'Peace Studies and Conflict Resolution',
    courseCode: 'GST 201',
    creditUnit: 2,
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'General Studies Unit',
    department: 'General Studies',
    programme: 'All Programmes',
    level: '200L',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Theories of social conflict, root causes of ethnic/religious disputes, mediation techniques, and alternative dispute resolution (ADR).',
    status: 'Approved'
  },
  {
    id: 'crs_gst_301',
    courseTitle: 'Entrepreneurship and Innovation Studies',
    courseCode: 'GST 301',
    creditUnit: 2,
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'General Studies Unit',
    department: 'General Studies',
    programme: 'All Programmes',
    level: '300L',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Business idea generation, feasibility plan preparation, market validation, venture financing, and SME management in Nigeria.',
    status: 'Approved'
  },

  // Computer Science Core Courses
  {
    id: 'crs_csc_101',
    courseTitle: 'Introduction to Computer Science',
    courseCode: 'CSC 101',
    creditUnit: 3,
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'Faculty of Science',
    department: 'Computer Science',
    programme: 'B.Sc Computer Science',
    level: '100L',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'History of computing, von Neumann computer architecture, data representation (binary/hex), operating system fundamentals, and problem-solving flowcharts.',
    status: 'Approved'
  },
  {
    id: 'crs_csc_102',
    courseTitle: 'Introduction to Programming Principles (Python/C)',
    courseCode: 'CSC 102',
    creditUnit: 3,
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'Faculty of Science',
    department: 'Computer Science',
    programme: 'B.Sc Computer Science',
    level: '100L',
    semester: 'Second Semester (Rain/Omega)',
    courseDescription: 'Variables, conditional control structures, iteration loops, functions, basic array manipulation, and algorithmic problem-solving.',
    status: 'Approved'
  },
  {
    id: 'crs_csc_201',
    courseTitle: 'Object-Oriented Programming (Java/C++)',
    courseCode: 'CSC 201',
    creditUnit: 3,
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'Faculty of Science',
    department: 'Computer Science',
    programme: 'B.Sc Computer Science',
    level: '200L',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Encapsulation, inheritance, polymorphism, abstract classes, interfaces, exception handling, and object lifecycle.',
    status: 'Approved'
  },
  {
    id: 'crs_csc_202',
    courseTitle: 'Data Structures and Algorithms',
    courseCode: 'CSC 202',
    creditUnit: 3,
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'Faculty of Science',
    department: 'Computer Science',
    programme: 'B.Sc Computer Science',
    level: '200L',
    semester: 'Second Semester (Rain/Omega)',
    courseDescription: 'Arrays, singly/doubly linked lists, stacks, queues, binary search trees (BST), sorting algorithms (Quicksort/Mergesort), and Big-O asymptotic notation.',
    status: 'Approved'
  },
  {
    id: 'crs_csc_301',
    courseTitle: 'Database Systems & Management (DBMS)',
    courseCode: 'CSC 301',
    creditUnit: 3,
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'Faculty of Science',
    department: 'Computer Science',
    programme: 'B.Sc Computer Science',
    level: '300L',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Relational model, SQL DDL/DML queries, Entity-Relationship (ER) modeling, normalization (1NF-BCNF), transactions and ACID properties.',
    status: 'Approved'
  },
  {
    id: 'crs_csc_302',
    courseTitle: 'Operating Systems & System Architecture',
    courseCode: 'CSC 302',
    creditUnit: 3,
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'Faculty of Science',
    department: 'Computer Science',
    programme: 'B.Sc Computer Science',
    level: '300L',
    semester: 'Second Semester (Rain/Omega)',
    courseDescription: 'Process states, CPU scheduling algorithms, virtual memory paging, deadlock prevention/detection, and POSIX concurrency primitives.',
    status: 'Approved'
  },
  {
    id: 'crs_csc_401',
    courseTitle: 'Artificial Intelligence & Machine Learning',
    courseCode: 'CSC 401',
    creditUnit: 3,
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'Faculty of Science',
    department: 'Computer Science',
    programme: 'B.Sc Computer Science',
    level: '400L',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Heuristic search (A*), knowledge representation, supervised classification models, neural networks, loss backpropagation, and NLP.',
    status: 'Approved'
  },
  {
    id: 'crs_csc_402',
    courseTitle: 'Computer Networks & Cybersecurity',
    courseCode: 'CSC 402',
    creditUnit: 3,
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'Faculty of Science',
    department: 'Computer Science',
    programme: 'B.Sc Computer Science',
    level: '400L',
    semester: 'Second Semester (Rain/Omega)',
    courseDescription: 'OSI 7-layer model, TCP/IP packet headers, subnetting, symmetric/asymmetric cryptography (RSA/AES), firewalls, and network vulnerability assessment.',
    status: 'Approved'
  },

  // Mathematics Core Courses
  {
    id: 'crs_mat_101',
    courseTitle: 'Elementary Mathematics I (Algebra & Trigonometry)',
    courseCode: 'MAT 101',
    creditUnit: 3,
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'Faculty of Science',
    department: 'Mathematics',
    programme: 'B.Sc Mathematics',
    level: '100L',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Set theory, complex numbers, mathematical induction, quadratic equations, binomial theorem, trigonometric identities, and De Moivre\'s theorem.',
    status: 'Approved'
  },
  {
    id: 'crs_mat_102',
    courseTitle: 'Elementary Mathematics II (Calculus)',
    courseCode: 'MAT 102',
    creditUnit: 3,
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'Faculty of Science',
    department: 'Mathematics',
    programme: 'B.Sc Mathematics',
    level: '100L',
    semester: 'Second Semester (Rain/Omega)',
    courseDescription: 'Limits, continuity, differentiation techniques, Mean Value Theorem, Taylor series expansion, Riemann integration, and integration by parts.',
    status: 'Approved'
  },
  {
    id: 'crs_mat_201',
    courseTitle: 'Linear Algebra I',
    courseCode: 'MAT 201',
    creditUnit: 3,
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'Faculty of Science',
    department: 'Mathematics',
    programme: 'B.Sc Mathematics',
    level: '200L',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Vector spaces, linear independence, basis and dimension, linear transformations, matrix inverses, determinants, and Gaussian elimination.',
    status: 'Approved'
  },

  // Electrical & Electronics Engineering Courses
  {
    id: 'crs_eee_201',
    courseTitle: 'Circuit Theory I',
    courseCode: 'EEE 201',
    creditUnit: 3,
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'Faculty of Engineering',
    department: 'Electrical & Electronics Engineering',
    programme: 'B.Sc Electrical & Electronics Engineering',
    level: '200L',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Kirchhoff\'s laws (KCL/KVL), nodal and mesh analysis, Thévenin and Norton equivalence theorems, superposition, and steady-state AC circuits.',
    status: 'Approved'
  },
  {
    id: 'crs_eee_301',
    courseTitle: 'Electromagnetic Field Theory',
    courseCode: 'EEE 301',
    creditUnit: 3,
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'Faculty of Engineering',
    department: 'Electrical & Electronics Engineering',
    programme: 'B.Sc Electrical & Electronics Engineering',
    level: '300L',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Coulomb\'s law, Gauss\'s divergence theorem, Biot-Savart law, Ampère\'s circuital law, Maxwell\'s equations, and uniform plane wave propagation.',
    status: 'Approved'
  },

  // Accounting & Management Courses
  {
    id: 'crs_acc_101',
    courseTitle: 'Principles of Accounting I',
    courseCode: 'ACC 101',
    creditUnit: 3,
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'Faculty of Management Sciences',
    department: 'Accounting',
    programme: 'B.Sc Accounting',
    level: '100L',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Historical development of accounting, double-entry bookkeeping, journalizing transactions, ledger posting, trial balance, and basic financial statements.',
    status: 'Approved'
  },
  {
    id: 'crs_acc_201',
    courseTitle: 'Financial Accounting I',
    courseCode: 'ACC 201',
    creditUnit: 3,
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'Faculty of Management Sciences',
    department: 'Accounting',
    programme: 'B.Sc Accounting',
    level: '200L',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'IFRS regulatory framework, revenue recognition (IFRS 15), PPE depreciation schedules (IAS 16), partnership accounts, and manufacturing statements.',
    status: 'Approved'
  },

  // Law Core Courses
  {
    id: 'crs_law_101',
    courseTitle: 'Legal Method I',
    courseCode: 'LAW 101',
    creditUnit: 4,
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'Faculty of Law',
    department: 'Law',
    programme: 'LL.B Bachelor of Laws',
    level: '100L',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Nature and functions of law, classification of law, sources of Nigerian law, judicial precedent (stare decisis), and statutory interpretation canons.',
    status: 'Approved'
  },
  {
    id: 'crs_law_201',
    courseTitle: 'Constitutional Law I',
    courseCode: 'LAW 201',
    creditUnit: 4,
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'Faculty of Law',
    department: 'Law',
    programme: 'LL.B Bachelor of Laws',
    level: '200L',
    semester: 'First Semester (Harmattan)',
    courseDescription: 'Constitutional history of Nigeria, supremacy of the 1999 Constitution (as amended), separation of powers, rule of law, and fundamental human rights.',
    status: 'Approved'
  }
];

// Helper to build deduplicated ALL_COURSES ensuring strictly unique courseCode values
const buildDeduplicatedCourses = (): CourseRecord[] => {
  const result: CourseRecord[] = [];
  const seenCodes = new Set<string>();

  for (const c of CORE_MANUAL_COURSES) {
    const codeKey = c.courseCode.trim().toUpperCase();
    if (!seenCodes.has(codeKey)) {
      seenCodes.add(codeKey);
      result.push(c);
    }
  }

  for (const c of COMPREHENSIVE_COURSES) {
    const codeKey = c.courseCode.trim().toUpperCase();
    if (!seenCodes.has(codeKey)) {
      seenCodes.add(codeKey);
      result.push(c);
    }
  }

  for (const c of ACTO_ENGINEERING_TECH_COURSES) {
    const codeKey = c.courseCode.trim().toUpperCase();
    if (!seenCodes.has(codeKey)) {
      seenCodes.add(codeKey);
      result.push(c);
    }
  }

  return result;
};

export const ALL_COURSES: CourseRecord[] = buildDeduplicatedCourses();

// ==========================================
// 6. PAST QUESTIONS REPOSITORY
// ==========================================
export const ALL_PAST_QUESTIONS: PastQuestion[] = [
  {
    id: 'pq_csc201_2023',
    courseCode: 'CSC 201',
    courseTitle: 'Object-Oriented Programming (Java/C++)',
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'Faculty of Science',
    department: 'Computer Science',
    programme: 'B.Sc Computer Science',
    level: '200L',
    sessionYear: '2022/2023',
    semester: 'First Semester (Harmattan)',
    examType: 'Semester Exam',
    questionCount: 5,
    source: 'Department of Computer Science Academic Repository',
    sourceType: 'authorized_upload',
    status: 'Approved',
    copyrightNotice: 'Verified past exam questions compiled for academic practice under fair use.',
    questions: [
      {
        questionNumber: 1,
        questionText: 'Which of the following Object-Oriented principles is violated when a subclass directly accesses and modifies the private instance variables of its superclass without getter/setter methods?',
        options: [
          'Polymorphism',
          'Encapsulation',
          'Dynamic Binding',
          'Multiple Inheritance'
        ],
        correctOptionIndex: 1,
        explanation: 'Encapsulation mandates that internal object state (fields) remain hidden and protected from direct unauthorized external modification. Private variables must only be accessed through well-defined public accessor methods.',
        conceptCategory: 'OOP Encapsulation'
      },
      {
        questionNumber: 2,
        questionText: 'In Java memory management, where are runtime object instances allocated, and how is unused memory automatically reclaimed?',
        options: [
          'Allocated on the Call Stack; reclaimed via manual free() pointers',
          'Allocated in the JVM Heap; reclaimed automatically by the Garbage Collector',
          'Allocated in Code Segment; reclaimed upon method termination',
          'Allocated on CPU Registers; reclaimed by the Kernel'
        ],
        correctOptionIndex: 1,
        explanation: 'In Java, all objects created with the "new" keyword reside in the JVM Heap. The JVM Garbage Collector tracks object references and automatically reclaims memory occupied by unreferenced objects.',
        conceptCategory: 'JVM Memory Architecture'
      },
      {
        questionNumber: 3,
        questionText: 'What occurs during method overriding in an inheritance hierarchy when a method with the exact same signature in the child class is invoked via a parent reference variable?',
        options: [
          'The parent implementation executes at compile time (Static Binding)',
          'The child implementation executes at runtime (Dynamic Method Dispatch / Polymorphism)',
          'A compilation syntax error is raised immediately',
          'Both parent and child methods execute simultaneously in parallel threads'
        ],
        correctOptionIndex: 1,
        explanation: 'Dynamic Method Dispatch resolves overridden methods at runtime based on the actual object instance type rather than the reference variable type.',
        conceptCategory: 'Polymorphism & Dynamic Dispatch'
      },
      {
        questionNumber: 4,
        questionText: 'Which keyword in Java prevents a class from being subclassed (inherited from)?',
        options: [
          'static',
          'abstract',
          'final',
          'volatile'
        ],
        correctOptionIndex: 2,
        explanation: 'Declaring a class with the "final" modifier prohibits other classes from extending it (e.g., java.lang.String is a final class).',
        conceptCategory: 'Java Access Modifiers'
      },
      {
        questionNumber: 5,
        questionText: 'What is the primary difference between a Java Interface and an Abstract Class before Java 8?',
        options: [
          'An abstract class can only have private methods, while an interface has public methods',
          'An interface could only declare method signatures without bodies and constant variables, while an abstract class can contain state and implemented methods',
          'An abstract class can be instantiated directly with "new", whereas an interface cannot',
          'A class can extend multiple abstract classes but implement only one interface'
        ],
        correctOptionIndex: 1,
        explanation: 'Prior to Java 8 default methods, interfaces were 100% abstract contract specifications with no method implementations or instance state, allowing multiple interface implementation.',
        conceptCategory: 'Abstract Classes vs Interfaces'
      }
    ]
  },
  {
    id: 'pq_mat101_2023',
    courseCode: 'MAT 101',
    courseTitle: 'Elementary Mathematics I (Algebra & Trigonometry)',
    institutionId: 'ui',
    institutionName: 'University of Ibadan',
    faculty: 'Faculty of Science',
    department: 'Mathematics',
    programme: 'B.Sc Mathematics',
    level: '100L',
    sessionYear: '2023/2024',
    semester: 'First Semester (Harmattan)',
    examType: 'Semester Exam',
    questionCount: 4,
    source: 'UI Mathematics Students Association (NAMSN)',
    sourceType: 'student_submission',
    status: 'Approved',
    copyrightNotice: 'Student revision archive reproduced under fair educational practice.',
    questions: [
      {
        questionNumber: 1,
        questionText: 'If the roots of the quadratic equation 2x² - 6x + k = 0 are real and equal, what is the exact value of k?',
        options: [
          'k = 3',
          'k = 4.5 (9/2)',
          'k = 9',
          'k = 18'
        ],
        correctOptionIndex: 1,
        explanation: 'For equal real roots, discriminant D = b² - 4ac = 0. Here, (-6)² - 4(2)(k) = 0 => 36 - 8k = 0 => 8k = 36 => k = 36/8 = 4.5 (9/2).',
        conceptCategory: 'Quadratic Discriminant Theory'
      },
      {
        questionNumber: 2,
        questionText: 'Express the complex number z = 1 + i√3 in polar exponential form r·e^(iθ).',
        options: [
          '2·e^(iπ/6)',
          '2·e^(iπ/3)',
          '√3·e^(iπ/4)',
          '4·e^(iπ/3)'
        ],
        correctOptionIndex: 1,
        explanation: 'Modulus r = √(1² + (√3)²) = √(1 + 3) = √4 = 2. Argument θ = arctan(√3 / 1) = π/3 (60°). Thus z = 2·e^(iπ/3).',
        conceptCategory: 'Complex Numbers & De Moivre'
      },
      {
        questionNumber: 3,
        questionText: 'What is the sum of the first 20 terms of an Arithmetic Progression (AP) whose first term a = 5 and common difference d = 3?',
        options: [
          '580',
          '670',
          '730',
          '1340'
        ],
        correctOptionIndex: 1,
        explanation: 'S_n = (n/2)[2a + (n-1)d]. S_20 = (20/2)[2(5) + (19)(3)] = 10[10 + 57] = 10(67) = 670.',
        conceptCategory: 'Sequences and Series'
      },
      {
        questionNumber: 4,
        questionText: 'According to the Binomial Theorem, what is the coefficient of x³ in the expansion of (2 + x)⁵?',
        options: [
          '10',
          '40',
          '80',
          '160'
        ],
        correctOptionIndex: 1,
        explanation: 'The general term T_(r+1) = ⁵C_r · 2^(5-r) · x^r. For x³, r = 3. Coefficient = ⁵C_3 · 2^(5-3) = 10 · 2² = 10 · 4 = 40.',
        conceptCategory: 'Binomial Theorem'
      }
    ]
  },
  {
    id: 'pq_gst101_2023',
    courseCode: 'GST 101',
    courseTitle: 'Use of English & Communication Skills I',
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    faculty: 'General Studies Unit',
    department: 'General Studies',
    programme: 'All Programmes',
    level: '100L',
    sessionYear: '2023/2024',
    semester: 'First Semester (Harmattan)',
    examType: 'Mid-Semester Test',
    questionCount: 4,
    source: 'General Studies Division (Admin Approved)',
    sourceType: 'admin_approved',
    status: 'Approved',
    copyrightNotice: 'Educational assessment materials for test preparation.',
    questions: [
      {
        questionNumber: 1,
        questionText: 'Choose the option with the correct grammatical subject-verb concord: "Neither the lecturer nor the students _____ present at the faculty assembly."',
        options: [
          'was',
          'were',
          'is',
          'are being'
        ],
        correctOptionIndex: 1,
        explanation: 'Under the principle of proximity in correlative conjunctions (neither...nor / either...or), the verb agrees with the closer subject ("students", plural), requiring "were".',
        conceptCategory: 'English Grammatical Concord'
      },
      {
        questionNumber: 2,
        questionText: 'Identify the figure of speech in: "The Nigerian economy groaned under the heavyweight of inflation."',
        options: [
          'Hyperbole',
          'Simile',
          'Personification',
          'Oxymoron'
        ],
        correctOptionIndex: 2,
        explanation: 'Personification attributes human qualities or actions ("groaned") to inanimate abstract entities ("the Nigerian economy").',
        conceptCategory: 'Figures of Speech'
      },
      {
        questionNumber: 3,
        questionText: 'Which section of an academic term paper synthesizes previous literature, highlights knowledge gaps, and provides scholarly context?',
        options: [
          'Methodology',
          'Literature Review',
          'Executive Abstract',
          'Appendices'
        ],
        correctOptionIndex: 1,
        explanation: 'The Literature Review critically evaluates prior academic publications related to the research question to justify the investigation.',
        conceptCategory: 'Academic Writing Mechanics'
      },
      {
        questionNumber: 4,
        questionText: 'Select the correctly punctuated sentence according to formal academic conventions:',
        options: [
          'The Dean stated; "Students must register all courses before Friday."',
          'The Dean stated, "Students must register all courses before Friday."',
          'The Dean stated: students must register all courses before Friday.',
          'The Dean stated "Students must register all courses before Friday".'
        ],
        correctOptionIndex: 1,
        explanation: 'Direct quotations introduced by a reporting verb require a preceding comma and double quotation marks enclosing the capitalized quote with the period inside.',
        conceptCategory: 'Punctuation Conventions'
      }
    ]
  },
  // Adeyemi College of Technology, Ondo Past Questions Repository
  ...ACTO_PAST_QUESTIONS
];

// ==========================================
// 7. STUDY MATERIALS & LECTURE VAULT
// ==========================================
export const ALL_STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat_csc202_handbook',
    title: 'Complete Data Structures & Algorithms (DSA) Lecture Handbook',
    courseCode: 'CSC 202',
    courseTitle: 'Data Structures and Algorithms',
    faculty: 'Faculty of Science',
    department: 'Computer Science',
    programme: 'B.Sc Computer Science',
    level: '200L',
    semester: 'Second Semester (Rain/Omega)',
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    uploaderName: 'Dr. A. Adebayo (Senior Lecturer)',
    fileType: 'PDF',
    pages: 142,
    fileSize: '4.8 MB',
    downloads: 5210,
    rating: 4.9,
    description: 'Comprehensive course note covering asymptotic Big-O runtime analysis, pointer linked lists, recursive tree traversals (inorder/preorder/postorder), Dijkstra shortest path algorithm, and dynamic programming memoization.',
    tags: ['Algorithms', 'Data Structures', 'Big-O', 'Trees', 'Graphs', 'CSC 202'],
    dateUploaded: '2024-01-15',
    source: 'Official Faculty Lecture Repository',
    sourceType: 'authorized_upload',
    status: 'Approved',
    copyrightNotice: 'Authorized distribution for UNILAG undergraduate study.'
  },
  {
    id: 'mat_mat101_formulas',
    title: 'MAT 101 Master Formula Sheet & Worked Solutions',
    courseCode: 'MAT 101',
    courseTitle: 'Elementary Mathematics I (Algebra & Trigonometry)',
    faculty: 'Faculty of Science',
    department: 'Mathematics',
    programme: 'B.Sc Mathematics',
    level: '100L',
    semester: 'First Semester (Harmattan)',
    institutionId: 'ui',
    institutionName: 'University of Ibadan',
    uploaderName: 'UI Math Student Union Study Group',
    fileType: 'Summary',
    pages: 18,
    fileSize: '1.9 MB',
    downloads: 3890,
    rating: 4.8,
    description: 'Handy pocket cheat-sheet for polynomial division, De Moivre theorem proofs, binomial coefficients, and trigonometric identity conversions.',
    tags: ['Math', 'Algebra', 'Trigonometry', 'Cheat Sheet', 'MAT 101'],
    dateUploaded: '2024-01-20',
    source: 'Student Peer Study Circle (Admin Verified)',
    sourceType: 'student_submission',
    status: 'Approved',
    copyrightNotice: 'Student peer revision notes compiled under academic fair use.'
  },
  {
    id: 'mat_law101_cases',
    title: 'Nigerian Legal System: Landmark Supreme Court Case Summaries',
    courseCode: 'LAW 101',
    courseTitle: 'Legal Method I',
    faculty: 'Faculty of Law',
    department: 'Law',
    programme: 'LL.B Bachelor of Laws',
    level: '100L',
    semester: 'First Semester (Harmattan)',
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    uploaderName: 'Barrister O. Femi',
    fileType: 'DOCX',
    pages: 56,
    fileSize: '2.1 MB',
    downloads: 940,
    rating: 4.9,
    description: 'Summaries of over 60 locus classicus Nigerian cases illustrating the doctrine of stare decisis, repugnancy test, and statutory interpretation canons.',
    tags: ['Law', 'Case Summaries', 'Legal Method', 'Supreme Court', 'Stare Decisis'],
    dateUploaded: '2024-02-01',
    source: 'Verified Legal Clinic Resource',
    sourceType: 'admin_approved',
    status: 'Approved',
    copyrightNotice: 'Judicial case digest for educational review.'
  }
];

// ==========================================
// 8. SAMPLE CSV DATA FOR ACADEMIC IMPORTER
// ==========================================
export const SAMPLE_IMPORT_CSV_CONTENT = `institution_name,institution_type,ownership,state,city,website,regulator,accreditation_status,source_url,faculty,department,programme,level,semester,course_code,course_title,credit_unit
University of Lagos,Federal University,Federal,Lagos,Akoka,https://unilag.edu.ng,NUC,Full Accreditation,https://www.nuc.edu.ng,Faculty of Science,Computer Science,B.Sc Computer Science,100L,First Semester (Harmattan),CSC 101,Introduction to Computer Science,3
University of Lagos,Federal University,Federal,Lagos,Akoka,https://unilag.edu.ng,NUC,Full Accreditation,https://www.nuc.edu.ng,Faculty of Science,Computer Science,B.Sc Computer Science,100L,Second Semester (Rain/Omega),CSC 102,Introduction to Programming Principles,3
University of Lagos,Federal University,Federal,Lagos,Akoka,https://unilag.edu.ng,NUC,Full Accreditation,https://www.nuc.edu.ng,Faculty of Science,Computer Science,B.Sc Computer Science,200L,First Semester (Harmattan),CSC 201,Object-Oriented Programming (Java/C++),3
University of Lagos,Federal University,Federal,Lagos,Akoka,https://unilag.edu.ng,NUC,Full Accreditation,https://www.nuc.edu.ng,Faculty of Science,Computer Science,B.Sc Computer Science,200L,Second Semester (Rain/Omega),CSC 202,Data Structures and Algorithms,3
University of Ibadan,Federal University,Federal,Oyo,Ibadan,https://ui.edu.ng,NUC,Full Accreditation,https://www.nuc.edu.ng,Faculty of Science,Mathematics,B.Sc Mathematics,100L,First Semester (Harmattan),MAT 101,Elementary Mathematics I (Algebra & Trigonometry),3
University of Ibadan,Federal University,Federal,Oyo,Ibadan,https://ui.edu.ng,NUC,Full Accreditation,https://www.nuc.edu.ng,Faculty of Science,Mathematics,B.Sc Mathematics,100L,Second Semester (Rain/Omega),MAT 102,Elementary Mathematics II (Calculus),3
Yaba College of Technology,Federal Polytechnic,Federal,Lagos,Yaba,https://yabatech.edu.ng,NBTE,Full Accreditation,https://nbte.gov.ng,School of Technology,Computer Science,ND Computer Science,ND I,First Semester (Harmattan),COM 111,Introduction to Digital Electronics,3
Yaba College of Technology,Federal Polytechnic,Federal,Lagos,Yaba,https://yabatech.edu.ng,NBTE,Full Accreditation,https://nbte.gov.ng,School of Technology,Computer Science,ND Computer Science,ND II,First Semester (Harmattan),COM 211,Java Programming & Application Development,3
Covenant University,Private University,Private,Ogun,Ota,https://covenantuniversity.edu.ng,NUC,Full Accreditation,https://www.nuc.edu.ng,College of Science and Technology,Computer Science,B.Sc Computer Science,300L,First Semester (Harmattan),CSC 311,Operating Systems Architecture,3
Nigerian Institute of Journalism,Monotechnic / Specialized Institution,Private,Lagos,Ogba,https://nij.edu.ng,NBTE,Full Accreditation,https://nbte.gov.ng,Department of Print Journalism,Journalism,ND Mass Communication,ND I,First Semester (Harmattan),JOU 101,Introduction to Mass Communication,3
Federal College of Education (Technical) Akoka,Federal College of Education,Federal,Lagos,Akoka,https://fcetakoka.edu.ng,NCCE,Full Accreditation,https://ncce.gov.ng,School of Science Education,Computer Science Education,NCE Computer Science,NCE I,First Semester (Harmattan),BED 111,Foundations of Technical Education,2
Lagos State University,State University,State,Lagos,Ojo,https://lasu.edu.ng,NUC,Full Accreditation,https://www.nuc.edu.ng,Faculty of Law,Law,LL.B Bachelor of Laws,200L,First Semester (Harmattan),LAW 201,Constitutional Law I,4`;
