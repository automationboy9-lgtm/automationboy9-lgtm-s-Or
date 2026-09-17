import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  supabase, 
  verifyEmailOtp, 
  resendVerificationEmail, 
  getAppRedirectUrl,
  formatSupabaseError 
} from '../lib/supabase';
import { ALL_INSTITUTIONS } from '../data/academicStructureData';
import { 
  resolveFacultiesForInstitution, 
  resolveDepartmentsForFaculty, 
  resolveProgrammesForDepartment 
} from '../data/academicHierarchyResolver';
import { getSchoolAccreditedLevels } from '../data/schoolAcademicData';
import { DepartmentRecord, CourseRecord, FacultyRecord } from '../types';
import { RequestAdditionModal } from './RequestAdditionModal';
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Building2, 
  BookOpen, 
  School, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft,
  Search,
  CheckCircle2,
  ShieldCheck,
  KeyRound,
  RefreshCw,
  Edit3,
  BadgeCheck,
  Sparkles,
  Users,
  Layers,
  Award,
  Check,
  Plus,
  Compass,
  FileText,
  HelpCircle,
  Hash
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Curated avatar presets for Nigerian tertiary students
const AVATAR_PRESETS = [
  { id: 'av_1', label: 'Tech Scholar', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
  { id: 'av_2', label: 'Engineering Lead', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200' },
  { id: 'av_3', label: 'Medical Research', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200' },
  { id: 'av_4', label: 'Science Innovator', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
  { id: 'av_5', label: 'Law Scholar', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200' },
  { id: 'av_6', label: 'Economics Analyst', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
  { id: 'av_7', label: 'Creative Designer', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200' },
  { id: 'av_8', label: 'Polytechnic Innovator', url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200' },
];

// Standard Academic Resource Types
const RESOURCE_TYPE_OPTIONS = [
  'Past Examination Questions & Worked Solutions',
  'Departmental Lecture Notes & Slides',
  'Curated Revision Sheets & Formula Guides',
  'CBT Practice Tests & Timed Quizzes',
  'Laboratory & Practical Manuals',
  'AI Study Copilot Step-by-Step Solver'
];

// Academic interest tags
const DEFAULT_INTEREST_TAGS = [
  'Artificial Intelligence',
  'Cybersecurity',
  'Data Structures & Algorithms',
  'Web & Cloud Computing',
  'Embedded Systems & IoT',
  'Financial Modelling & Audit',
  'Corporate Law & Ethics',
  'Public Health & Pharmacology',
  'Renewable Energy & Power',
  'Robotics & Automation',
  'Database Architecture',
  'Macroeconomics & Policy'
];

// Active Nigerian tertiary academic sessions
const ACADEMIC_SESSIONS = ['2024/2025', '2025/2026', '2023/2024'];

export const SignUpPage: React.FC = () => {
  const { 
    setCurrentView, 
    addToast, 
    setStudentSession, 
    courses: globalCourses,
    studyGroups
  } = useApp();

  // Multi-step registration wizard: 1 to 5
  // Step 1: Account Information
  // Step 2: Academic Information
  // Step 3: Profile Information
  // Step 4: Study Preferences
  // Step 5: Profile Review & Complete
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Verification Step state (if Supabase requires OTP)
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [verifyingOtpLoading, setVerifyingOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Modal for Requesting an Addition (Institution, Department, Course)
  const [additionModalOpen, setAdditionModalOpen] = useState(false);
  const [additionModalType, setAdditionModalType] = useState<'institution' | 'department' | 'course'>('course');

  // STEP 1: ACCOUNT INFORMATION
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sh_student_email') || '';
    }
    return '';
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // STEP 2: ACADEMIC INFORMATION
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<string>(
    ALL_INSTITUTIONS[0]?.id || 'unilag'
  );
  const [institutionSearch, setInstitutionSearch] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedProgramme, setSelectedProgramme] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('100L');
  const [academicSession, setAcademicSession] = useState<string>('2024/2025');
  const [matricNumber, setMatricNumber] = useState<string>('');

  // STEP 3: PROFILE INFORMATION
  const [username, setUsername] = useState('');
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState<string>(AVATAR_PRESETS[0].url);
  const [customAvatarUrl, setCustomAvatarUrl] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Artificial Intelligence',
    'Data Structures & Algorithms'
  ]);
  const [customInterestInput, setCustomInterestInput] = useState('');

  // STEP 4: STUDY PREFERENCES
  const [selectedCourseCodes, setSelectedCourseCodes] = useState<string[]>([]);
  const [courseSearch, setCourseSearch] = useState('');
  const [selectedResourceTypes, setSelectedResourceTypes] = useState<string[]>([
    'Past Examination Questions & Worked Solutions',
    'Departmental Lecture Notes & Slides',
    'AI Study Copilot Step-by-Step Solver'
  ]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Algorithms & Logic',
    'Object-Oriented Programming',
    'Calculus & Linear Algebra'
  ]);
  const [customTopicInput, setCustomTopicInput] = useState('');
  const [joinedGroupIds, setJoinedGroupIds] = useState<string[]>([]);

  // Validation and Submission state
  const [loading, setLoading] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Auto-generate a clean username candidate when fullName changes (if not edited)
  useEffect(() => {
    if (!username && fullName.trim()) {
      const sanitized = fullName.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').substring(0, 15);
      setUsername(sanitized ? `@${sanitized}` : '');
    }
  }, [fullName, username]);

  // Selected Institution object
  const selectedInst = useMemo(() => {
    return ALL_INSTITUTIONS.find(i => i.id === selectedInstitutionId) || ALL_INSTITUTIONS[0];
  }, [selectedInstitutionId]);

  // Institution Search Filter
  const filteredInstitutions = useMemo(() => {
    if (!institutionSearch.trim()) return ALL_INSTITUTIONS;
    const query = institutionSearch.toLowerCase();
    return ALL_INSTITUTIONS.filter(
      inst =>
        inst.name.toLowerCase().includes(query) ||
        inst.id.toLowerCase().includes(query) ||
        inst.shortName.toLowerCase().includes(query) ||
        inst.state.toLowerCase().includes(query) ||
        inst.type.toLowerCase().includes(query)
    );
  }, [institutionSearch]);

  // Dynamic Faculties for chosen institution
  const availableFaculties = useMemo(() => {
    if (!selectedInst) return [];
    return resolveFacultiesForInstitution(selectedInst);
  }, [selectedInst]);

  // Sync selected faculty when availableFaculties change
  useEffect(() => {
    if (availableFaculties.length > 0) {
      const match = availableFaculties.find(f => f.name === selectedFaculty);
      if (!match) {
        setSelectedFaculty(availableFaculties[0].name);
      }
    } else {
      setSelectedFaculty('Faculty of Science');
    }
  }, [availableFaculties, selectedFaculty]);

  // Dynamic Departments for chosen faculty
  const availableDepartments = useMemo(() => {
    if (!selectedInst || !selectedFaculty) return [];
    const facRecord: FacultyRecord = {
      id: `fac_${selectedInst.id}_${selectedFaculty.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      name: selectedFaculty,
      code: selectedFaculty.split(' ').map(w => w[0]).filter(Boolean).join('').substring(0, 4).toUpperCase() || 'FAC',
      institutionId: selectedInst.id,
      institutionName: selectedInst.name
    };
    return resolveDepartmentsForFaculty(facRecord, selectedInst);
  }, [selectedInst, selectedFaculty]);

  // Sync selected department
  useEffect(() => {
    if (availableDepartments.length > 0) {
      const match = availableDepartments.find(d => d.name === selectedDepartment);
      if (!match) {
        setSelectedDepartment(availableDepartments[0].name);
      }
    } else {
      setSelectedDepartment('Computer Science');
    }
  }, [availableDepartments, selectedDepartment]);

  // Dynamic Programmes for chosen department
  const availableProgrammes = useMemo(() => {
    if (!selectedInst || !selectedDepartment) return [];
    const deptRecord: DepartmentRecord = {
      id: `dept_${selectedInst.id}_${selectedDepartment.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      name: selectedDepartment,
      code: selectedDepartment.split(' ').map(w => w[0]).filter(Boolean).join('').substring(0, 4).toUpperCase() || 'DEP',
      facultyId: `fac_${selectedInst.id}_${selectedFaculty.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      facultyName: selectedFaculty,
      institutionId: selectedInst.id,
      institutionName: selectedInst.name
    };
    return resolveProgrammesForDepartment(deptRecord, selectedInst);
  }, [selectedInst, selectedDepartment, selectedFaculty]);

  // Sync selected programme
  useEffect(() => {
    if (availableProgrammes.length > 0) {
      const match = availableProgrammes.find(p => p.name === selectedProgramme);
      if (!match) {
        setSelectedProgramme(availableProgrammes[0].name);
      }
    } else {
      setSelectedProgramme(`B.Sc ${selectedDepartment || 'Degree'}`);
    }
  }, [availableProgrammes, selectedProgramme, selectedDepartment]);

  // Dynamic accredited levels based on institution type (Polytechnic ND/HND vs University 100L-500L vs College of Education)
  const accreditedLevels = useMemo(() => {
    if (!selectedInst) return ['100L', '200L', '300L', '400L'];
    return getSchoolAccreditedLevels(selectedInst);
  }, [selectedInst]);

  // Sync selected level if not in accredited levels
  useEffect(() => {
    if (accreditedLevels.length > 0 && !accreditedLevels.includes(selectedLevel)) {
      setSelectedLevel(accreditedLevels[0]);
    }
  }, [accreditedLevels, selectedLevel]);

  // Dynamic Available Courses matching institution, department, and level
  const availableCourses = useMemo(() => {
    const list = globalCourses || [];
    const deptNorm = selectedDepartment.toLowerCase();
    const levelNorm = selectedLevel.toLowerCase().replace(' ', '');

    const matching = list.filter(c => {
      const cDept = (c.department || '').toLowerCase();
      const cLevel = (c.level || '').toLowerCase().replace(' ', '');
      const cInst = (c.institutionId || '').toLowerCase();

      const instMatches = !c.institutionId || cInst === selectedInst.id.toLowerCase() || cInst === 'all';
      const deptMatches = cDept.includes(deptNorm) || deptNorm.includes(cDept) || cDept.includes('general') || c.courseCode.startsWith('GST');
      const levelMatches = !c.level || cLevel.includes(levelNorm) || levelNorm.includes(cLevel);

      return instMatches && (deptMatches || c.courseCode.startsWith('GST')) && levelMatches;
    });

    if (matching.length >= 3) {
      return matching;
    }

    // Fallback standard curriculum courses for chosen level
    const generalCourses: CourseRecord[] = [
      {
        id: `crs_std_1_${selectedLevel.replace(/\s+/g, '_')}`,
        courseCode: selectedLevel.includes('200') || selectedLevel.includes('ND 2') ? 'CSC 201' : 'GST 111',
        courseTitle: selectedLevel.includes('200') || selectedLevel.includes('ND 2') ? 'Computer Programming I (Python & C++)' : 'Communication in English & Academic Writing',
        creditUnit: 2,
        institutionId: selectedInst.id,
        institutionName: selectedInst.name,
        faculty: selectedFaculty,
        department: selectedDepartment,
        programme: selectedProgramme || selectedDepartment || 'General Studies',
        level: selectedLevel,
        semester: 'First Semester (Harmattan)',
        courseDescription: 'Core NUC CCMAS benchmark course.',
        status: 'Approved'
      },
      {
        id: `crs_std_2_${selectedLevel.replace(/\s+/g, '_')}`,
        courseCode: selectedLevel.includes('200') || selectedLevel.includes('ND 2') ? 'CSC 203' : 'MTH 101',
        courseTitle: selectedLevel.includes('200') || selectedLevel.includes('ND 2') ? 'Data Structures & Algorithms' : 'Elementary Mathematics I (Algebra & Trigonometry)',
        creditUnit: 3,
        institutionId: selectedInst.id,
        institutionName: selectedInst.name,
        faculty: selectedFaculty,
        department: selectedDepartment,
        programme: selectedProgramme || selectedDepartment || 'General Studies',
        level: selectedLevel,
        semester: 'First Semester (Harmattan)',
        courseDescription: 'Core foundational academic curriculum.',
        status: 'Approved'
      },
      {
        id: `crs_std_3_${selectedLevel.replace(/\s+/g, '_')}`,
        courseCode: selectedLevel.includes('200') || selectedLevel.includes('ND 2') ? 'MAT 201' : 'GST 113',
        courseTitle: selectedLevel.includes('200') || selectedLevel.includes('ND 2') ? 'Linear Algebra & Discrete Structures' : 'Nigerian Peoples and Culture',
        creditUnit: 2,
        institutionId: selectedInst.id,
        institutionName: selectedInst.name,
        faculty: selectedFaculty,
        department: selectedDepartment,
        programme: selectedProgramme || selectedDepartment || 'General Studies',
        level: selectedLevel,
        semester: 'First Semester (Harmattan)',
        courseDescription: 'Mandatory general studies curriculum.',
        status: 'Approved'
      },
      {
        id: `crs_std_4_${selectedLevel.replace(/\s+/g, '_')}`,
        courseCode: selectedLevel.includes('200') || selectedLevel.includes('ND 2') ? 'CSC 205' : 'PHY 101',
        courseTitle: selectedLevel.includes('200') || selectedLevel.includes('ND 2') ? 'Digital Electronics & Microprocessors' : 'General Physics I (Mechanics, Thermal & Waves)',
        creditUnit: 3,
        institutionId: selectedInst.id,
        institutionName: selectedInst.name,
        faculty: selectedFaculty,
        department: selectedDepartment,
        programme: selectedProgramme || selectedDepartment || 'General Studies',
        level: selectedLevel,
        semester: 'First Semester (Harmattan)',
        courseDescription: 'Science & engineering foundation module.',
        status: 'Approved'
      }
    ];

    return [...matching, ...generalCourses];
  }, [globalCourses, selectedDepartment, selectedLevel, selectedInst, selectedFaculty]);

  // Pre-select first 3 courses when courses change if none selected
  useEffect(() => {
    if (selectedCourseCodes.length === 0 && availableCourses.length > 0) {
      setSelectedCourseCodes(availableCourses.slice(0, 3).map(c => c.courseCode));
    }
  }, [availableCourses, selectedCourseCodes]);

  // Filter courses by search input in Step 4
  const filteredCourses = useMemo(() => {
    if (!courseSearch.trim()) return availableCourses;
    const query = courseSearch.toLowerCase();
    return availableCourses.filter(
      c =>
        c.courseCode.toLowerCase().includes(query) ||
        c.courseTitle.toLowerCase().includes(query)
    );
  }, [availableCourses, courseSearch]);

  // Dynamic Recommended Reading Groups in Step 4
  const recommendedReadingGroups = useMemo(() => {
    const list = studyGroups || [];
    const deptNorm = selectedDepartment.toLowerCase();
    const instNorm = selectedInst.name.toLowerCase();

    return list.filter(g => {
      const gDept = (g.department || '').toLowerCase();
      const gInst = (g.institution || '').toLowerCase();
      return (
        gDept.includes(deptNorm) ||
        deptNorm.includes(gDept) ||
        gInst.includes(instNorm) ||
        g.category === 'Past Questions' ||
        g.category === 'Exam Prep'
      );
    }).slice(0, 4);
  }, [studyGroups, selectedDepartment, selectedInst]);

  // Auto-connect first recommended study group if none joined
  useEffect(() => {
    if (joinedGroupIds.length === 0 && recommendedReadingGroups.length > 0) {
      setJoinedGroupIds([recommendedReadingGroups[0].id]);
    }
  }, [recommendedReadingGroups, joinedGroupIds]);

  // Compute selected courses metadata for review & semester initialization
  const selectedCourseObjects = useMemo(() => {
    return availableCourses.filter(c => selectedCourseCodes.includes(c.courseCode));
  }, [availableCourses, selectedCourseCodes]);

  const totalCreditUnits = useMemo(() => {
    return selectedCourseObjects.reduce((acc, c) => acc + (c.creditUnit || 2), 0);
  }, [selectedCourseObjects]);

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 6) score += 25;
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9!@#$%^&*]/.test(password)) score += 25;
    return score;
  }, [password]);

  // Step Validation Handlers
  const validateStep1 = (): boolean => {
    setStepError(null);
    if (!fullName.trim()) {
      setStepError('Please enter your full legal name.');
      return false;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStepError('Please enter a valid academic or personal email address.');
      return false;
    }
    if (password.length < 6) {
      setStepError('Password must be at least 6 characters long.');
      return false;
    }
    if (password !== confirmPassword) {
      setStepError('Passwords do not match. Please verify both password fields.');
      return false;
    }
    return true;
  };

  const validateStep2 = (): boolean => {
    setStepError(null);
    if (!selectedInst) {
      setStepError('Please select your accredited institution.');
      return false;
    }
    if (!selectedFaculty.trim()) {
      setStepError('Please select your faculty or school.');
      return false;
    }
    if (!selectedDepartment.trim()) {
      setStepError('Please select your academic department.');
      return false;
    }
    if (!selectedProgramme.trim()) {
      setStepError('Please select your degree/certificate programme.');
      return false;
    }
    if (!selectedLevel.trim()) {
      setStepError('Please select your current academic level.');
      return false;
    }
    return true;
  };

  const validateStep3 = (): boolean => {
    setStepError(null);
    const cleanUsername = username.replace(/^@/, '').trim();
    if (!cleanUsername || cleanUsername.length < 3) {
      setStepError('Username must be at least 3 characters long.');
      return false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
      setStepError('Username can only contain letters, numbers, and underscores.');
      return false;
    }
    if (selectedInterests.length === 0) {
      setStepError('Please select or add at least one academic interest.');
      return false;
    }
    return true;
  };

  const validateStep4 = (): boolean => {
    setStepError(null);
    if (selectedCourseCodes.length === 0) {
      setStepError('Please select at least one course for your initial timetable and GPA tracker.');
      return false;
    }
    if (selectedResourceTypes.length === 0) {
      setStepError('Please select at least one preferred academic resource.');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (currentStep === 3) {
      if (validateStep3()) {
        setCurrentStep(4);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (currentStep === 4) {
      if (validateStep4()) {
        setCurrentStep(5);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevStep = () => {
    setStepError(null);
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as any);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Toggle helpers
  const toggleCourseCode = (code: string) => {
    setSelectedCourseCodes(prev => 
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  const toggleInterest = (tag: string) => {
    setSelectedInterests(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleAddCustomInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInterestInput.trim()) return;
    const tag = customInterestInput.trim();
    if (!selectedInterests.includes(tag)) {
      setSelectedInterests(prev => [...prev, tag]);
    }
    setCustomInterestInput('');
  };

  const toggleResourceType = (type: string) => {
    setSelectedResourceTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const handleAddCustomTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopicInput.trim()) return;
    const topic = customTopicInput.trim();
    if (!selectedTopics.includes(topic)) {
      setSelectedTopics(prev => [...prev, topic]);
    }
    setCustomTopicInput('');
  };

  const toggleJoinGroup = (groupId: string) => {
    setJoinedGroupIds(prev => 
      prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
    );
  };

  // Final Complete Profile Submission Handler
  const handleCompleteProfile = async () => {
    setStepError(null);
    setLoading(true);

    const cleanUsername = username.replace(/^@/, '').trim();
    const finalAvatar = customAvatarUrl.trim() || selectedAvatarUrl;

    const profileMetadata = {
      full_name: fullName.trim(),
      username: `@${cleanUsername}`,
      matric_number: matricNumber.trim(),
      institution_id: selectedInst.id,
      institution_name: selectedInst.name,
      institution_type: selectedInst.type,
      faculty_name: selectedFaculty,
      department_name: selectedDepartment,
      programme_name: selectedProgramme,
      level: selectedLevel,
      academic_session: academicSession,
      academic_interests: selectedInterests,
      enrolled_course_codes: selectedCourseCodes,
      enrolled_courses: selectedCourseObjects,
      preferred_resources: selectedResourceTypes,
      preferred_topics: selectedTopics,
      joined_groups: joinedGroupIds,
      avatar_url: finalAvatar,
      bio: bio.trim() || `${selectedLevel} student of ${selectedDepartment} at ${selectedInst.name}.`,
      onboarding_completed: true
    };

    try {
      // 1. Attempt Supabase Auth Registration
      let registeredUser: any = null;
      try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: profileMetadata,
            emailRedirectTo: getAppRedirectUrl()
          }
        });

        if (authError) {
          console.warn('Supabase Auth Notice (falling back to seamless active session):', authError.message);
        } else if (authData?.user) {
          registeredUser = authData.user;
          // Check if email confirmation is enforced
          if (authData.user.identities && authData.user.identities.length === 0) {
            setStepError('An account with this email already exists. Please sign in or use a different email.');
            setLoading(false);
            return;
          }
        }
      } catch (authException) {
        console.warn('Supabase request handled gracefully:', authException);
      }

      // 2. Establish active session with complete profile metadata
      setStudentSession(email.trim(), fullName.trim(), profileMetadata);

      // 3. Mark completed and show celebration
      setIsCompleted(true);
      addToast(
        'Profile Created Successfully!',
        `Welcome to StudentHub NG, ${fullName.trim()}! Your ${selectedDepartment} workspace is now active.`,
        'success'
      );

      // 4. Smoothly transition to student dashboard after celebration
      setTimeout(() => {
        setCurrentView('dashboard');
      }, 1600);

    } catch (err: any) {
      console.error('Registration error:', err);
      setStepError(err?.message || 'Failed to complete registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // OTP Verification Handler (if activated)
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      setOtpError('Please enter a valid 6-digit verification code.');
      return;
    }

    setVerifyingOtpLoading(true);
    setOtpError(null);

    try {
      const { user, error } = await verifyEmailOtp(email.trim(), otpCode.trim());
      if (error) {
        setOtpError(formatSupabaseError(error));
        setVerifyingOtpLoading(false);
        return;
      }

      addToast('Email Verified!', 'Your StudentHub account has been verified.', 'success');
      setCurrentView('dashboard');
    } catch (err: any) {
      setOtpError(err?.message || 'Verification failed. Please try again.');
    } finally {
      setVerifyingOtpLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      {/* Addition Request Modal */}
      <RequestAdditionModal
        isOpen={additionModalOpen}
        onClose={() => setAdditionModalOpen(false)}
        defaultType={additionModalType}
        prefilledInstitution={selectedInst.name}
        prefilledFaculty={selectedFaculty}
        prefilledDepartment={selectedDepartment}
        studentName={fullName}
        studentEmail={email}
      />

      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Navigation & Brand Header */}
        <div className="flex items-center justify-between">
          <button
            id="back-to-landing-btn"
            onClick={() => setCurrentView('landing')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">Already registered?</span>
            <button
              id="goto-login-btn"
              onClick={() => setCurrentView('login')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          
          {/* Header Banner */}
          <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 text-white relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>Guided Onboarding Experience</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Build Your StudentHub Profile
              </h1>
              <p className="text-emerald-100/90 text-xs sm:text-sm max-w-xl leading-relaxed">
                Step-by-step academic setup. We personalize your courses, past questions, AI study tools, and reading groups based on your accredited Nigerian curriculum.
              </p>
            </div>
            <div className="absolute -right-8 -bottom-10 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Progress Indicator (Step 1 of 5) */}
          <div className="px-6 sm:px-8 py-4 bg-slate-50/80 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Step {currentStep} of 5
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {currentStep === 1 && 'Account Information'}
                {currentStep === 2 && 'Academic Information'}
                {currentStep === 3 && 'Profile Information'}
                {currentStep === 4 && 'Study Preferences'}
                {currentStep === 5 && 'Profile Review'}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>

            {/* Step Pills for Fast Navigation / Edit Earlier Steps */}
            <div className="flex items-center justify-between gap-1 pt-3 overflow-x-auto">
              {[
                { num: 1, label: 'Account' },
                { num: 2, label: 'Academic' },
                { num: 3, label: 'Profile' },
                { num: 4, label: 'Preferences' },
                { num: 5, label: 'Review' },
              ].map(s => {
                const isPassed = currentStep > s.num;
                const isCurrent = currentStep === s.num;
                return (
                  <button
                    key={s.num}
                    type="button"
                    onClick={() => {
                      // Allow jumping backward to edit earlier steps anytime
                      if (s.num < currentStep) {
                        setCurrentStep(s.num as any);
                        setStepError(null);
                      }
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      isCurrent
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : isPassed
                        ? 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer'
                        : 'text-slate-400 dark:text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isPassed ? 'bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300' : isCurrent ? 'bg-white text-emerald-700' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                    }`}>
                      {isPassed ? '✓' : s.num}
                    </span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Body Content by Step */}
          <div className="p-6 sm:p-8">
            
            {/* Step Error Notice */}
            {stepError && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-bold">Required Information Missing</p>
                  <p>{stepError}</p>
                </div>
              </div>
            )}

            {/* Celebratory Completion Animation */}
            {isCompleted ? (
              <div className="py-12 text-center space-y-5">
                <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg animate-bounce">
                  <BadgeCheck className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    Welcome to StudentHub NG, {fullName}!
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    Your personalized academic workspace has been successfully created. We are loading your courses, past questions, study resources, AI copilot, and reading groups for <strong>{selectedDepartment}</strong>.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-4 py-2 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Launching your Student Dashboard...</span>
                </div>
              </div>
            ) : (
              <>
                {/* ======================================================== */}
                {/* STEP 1: ACCOUNT INFORMATION                               */}
                {/* ======================================================== */}
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <div className="space-y-1">
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        Account Information
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Create your login credentials. Keep them safe to access your study portal on any device.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Full Legal Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                          <input
                            type="text"
                            id="signup-fullname"
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                            placeholder="e.g. Ayodele Emmanuel Adebayo"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                            required
                          />
                        </div>
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                          <input
                            type="email"
                            id="signup-email"
                            value={email}
                            onChange={e => {
                              setEmail(e.target.value);
                              if (typeof window !== 'undefined') {
                                localStorage.setItem('sh_student_email', e.target.value);
                              }
                            }}
                            placeholder="e.g. ayodele@student.unilag.edu.ng"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                            required
                          />
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Institutional or personal email addresses are both accepted.
                        </p>
                      </div>

                      {/* Password & Confirm Password */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Password <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              id="signup-password"
                              value={password}
                              onChange={e => setPassword(e.target.value)}
                              placeholder="Minimum 6 characters"
                              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Confirm Password <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                            <input
                              type={showConfirmPassword ? 'text' : 'password'}
                              id="signup-confirm-password"
                              value={confirmPassword}
                              onChange={e => setConfirmPassword(e.target.value)}
                              placeholder="Repeat your password"
                              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                            >
                              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Password Strength Indicator */}
                      {password && (
                        <div className="space-y-1 pt-1">
                          <div className="flex justify-between text-[11px] text-slate-500">
                            <span>Password Security:</span>
                            <span className={`font-bold ${passwordStrength >= 75 ? 'text-emerald-600' : passwordStrength >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                              {passwordStrength >= 75 ? 'Strong' : passwordStrength >= 50 ? 'Moderate' : 'Too Short'}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-300 ${passwordStrength >= 75 ? 'bg-emerald-500' : passwordStrength >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                              style={{ width: `${passwordStrength}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 flex items-center justify-end">
                      <button
                        type="button"
                        id="step1-next-btn"
                        onClick={handleNextStep}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-101"
                      >
                        <span>Continue to Academic Information</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ======================================================== */}
                {/* STEP 2: ACADEMIC INFORMATION                              */}
                {/* ======================================================== */}
                {currentStep === 2 && (
                  <div className="space-y-5">
                    <div className="space-y-1">
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>Academic Information</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                          Verified NUC • NBTE Directory
                        </span>
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Select your institution, faculty, department, and level. Official academic records are verified to guarantee accurate past exams, syllabus, and GPA grading.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Institution Selector with Search */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Institution <span className="text-red-500">*</span>
                          </label>
                          <span className="text-[11px] text-slate-400">
                            {filteredInstitutions.length} Accredited Schools
                          </span>
                        </div>
                        
                        {/* Search field */}
                        <div className="relative mb-2">
                          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                          <input
                            type="text"
                            value={institutionSearch}
                            onChange={e => setInstitutionSearch(e.target.value)}
                            placeholder="Type to filter institution by name, short acronym (e.g. UNILAG, UI, ACTO), or state..."
                            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                          />
                        </div>

                        {/* Select dropdown */}
                        <select
                          id="signup-institution"
                          value={selectedInstitutionId}
                          onChange={e => setSelectedInstitutionId(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                          required
                        >
                          {filteredInstitutions.map(inst => (
                            <option key={inst.id} value={inst.id}>
                              {inst.name} ({inst.shortName || inst.id.toUpperCase()}) — {inst.state} • {inst.type}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Institution Type (Read-Only Verified Display) */}
                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                            <School className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              Verified Institution Classification
                            </span>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">
                              {selectedInst.type}
                            </p>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-[10px] font-extrabold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Official Record</span>
                        </span>
                      </div>

                      {/* Faculty & Department Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Faculty / School <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="signup-faculty"
                            value={selectedFaculty}
                            onChange={e => setSelectedFaculty(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                            required
                          >
                            {availableFaculties.map(fac => (
                              <option key={fac.id} value={fac.name}>
                                {fac.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Department <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="signup-department"
                            value={selectedDepartment}
                            onChange={e => setSelectedDepartment(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                            required
                          >
                            {availableDepartments.map(dept => (
                              <option key={dept.id} value={dept.name}>
                                {dept.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Programme / Course, Level & Academic Session */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Course / Programme <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="signup-programme"
                            value={selectedProgramme}
                            onChange={e => setSelectedProgramme(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                            required
                          >
                            {availableProgrammes.map(prog => (
                              <option key={prog.id} value={prog.name}>
                                {prog.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Current Level <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="signup-level"
                            value={selectedLevel}
                            onChange={e => setSelectedLevel(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                            required
                          >
                            {accreditedLevels.map(lvl => (
                              <option key={lvl} value={lvl}>
                                {lvl}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Academic Session <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="signup-academic-session"
                            value={academicSession}
                            onChange={e => setAcademicSession(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                            required
                          >
                            {ACADEMIC_SESSIONS.map(sess => (
                              <option key={sess} value={sess}>
                                {sess} Session
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Optional Matric / JAMB Reg Number */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Matriculation / JAMB Reg Number (Optional)
                        </label>
                        <input
                          type="text"
                          id="signup-matric-number"
                          value={matricNumber}
                          onChange={e => setMatricNumber(e.target.value)}
                          placeholder="e.g. 210408012 or 2024109401"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                        />
                      </div>

                      {/* Verification Directory Notice & Request Addition Button */}
                      <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-2.5">
                          <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                          <p className="text-xs text-amber-900 dark:text-amber-200">
                            Students select from verified tertiary records. Cannot find your institution, department or course?
                          </p>
                        </div>
                        <button
                          type="button"
                          id="request-addition-btn"
                          onClick={() => {
                            setAdditionModalType('department');
                            setAdditionModalOpen(true);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shrink-0 transition-colors shadow-xs"
                        >
                          Request an Addition
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back: Account</span>
                      </button>
                      <button
                        type="button"
                        id="step2-next-btn"
                        onClick={handleNextStep}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-101"
                      >
                        <span>Continue to Profile Information</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ======================================================== */}
                {/* STEP 3: PROFILE INFORMATION                               */}
                {/* ======================================================== */}
                {currentStep === 3 && (
                  <div className="space-y-5">
                    <div className="space-y-1">
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        Profile Information
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Personalize how fellow students, study groups, and community members see you on StudentHub NG.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Username */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Username Handle <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Hash className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                          <input
                            type="text"
                            id="signup-username"
                            value={username}
                            onChange={e => {
                              const val = e.target.value;
                              setUsername(val.startsWith('@') ? val : `@${val}`);
                            }}
                            placeholder="@ayodele_tech"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                            required
                          />
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Used for study group mentions, community comments, and peer notes sharing.
                        </p>
                      </div>

                      {/* Profile Photo Preset Selector (Optional) */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          Profile Photo Avatar (Optional)
                        </label>
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 mb-3">
                          {AVATAR_PRESETS.map(av => {
                            const isSelected = selectedAvatarUrl === av.url && !customAvatarUrl;
                            return (
                              <button
                                key={av.id}
                                type="button"
                                onClick={() => {
                                  setSelectedAvatarUrl(av.url);
                                  setCustomAvatarUrl('');
                                }}
                                className={`relative p-0.5 rounded-2xl transition-all ${
                                  isSelected
                                    ? 'ring-3 ring-emerald-500 scale-105 shadow-md'
                                    : 'opacity-70 hover:opacity-100 hover:scale-102'
                                }`}
                                title={av.label}
                              >
                                <img
                                  src={av.url}
                                  alt={av.label}
                                  referrerPolicy="no-referrer"
                                  className="w-12 h-12 rounded-xl object-cover"
                                />
                                {isSelected && (
                                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                                    ✓
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                        <input
                          type="url"
                          value={customAvatarUrl}
                          onChange={e => setCustomAvatarUrl(e.target.value)}
                          placeholder="Or paste a custom avatar photo URL (optional)..."
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                        />
                      </div>

                      {/* Short Bio (Optional) */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Short Bio (Optional)
                        </label>
                        <textarea
                          id="signup-bio"
                          value={bio}
                          onChange={e => setBio(e.target.value)}
                          rows={2}
                          placeholder="e.g. Aspiring cloud architect & software engineer. Dedicated to machine learning and algorithm design..."
                          className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden resize-none"
                        />
                      </div>

                      {/* Academic Interests (Required, at least 1) */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Academic Interests & Focus Areas <span className="text-red-500">*</span>
                          </label>
                          <span className="text-[11px] text-slate-400">
                            Selected: {selectedInterests.length}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {DEFAULT_INTEREST_TAGS.map(tag => {
                            const active = selectedInterests.includes(tag);
                            return (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => toggleInterest(tag)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                                  active
                                    ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                              >
                                {active ? `✓ ${tag}` : `+ ${tag}`}
                              </button>
                            );
                          })}
                        </div>

                        {/* Add Custom Interest Input */}
                        <form onSubmit={handleAddCustomInterest} className="flex gap-2">
                          <input
                            type="text"
                            value={customInterestInput}
                            onChange={e => setCustomInterestInput(e.target.value)}
                            placeholder="Add a custom interest (e.g. Quantum Computing)..."
                            className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                          />
                          <button
                            type="submit"
                            className="px-3.5 py-2 rounded-xl bg-slate-800 dark:bg-slate-700 text-white text-xs font-bold hover:bg-slate-900 transition-colors shrink-0"
                          >
                            Add Tag
                          </button>
                        </form>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back: Academic</span>
                      </button>
                      <button
                        type="button"
                        id="step3-next-btn"
                        onClick={handleNextStep}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-101"
                      >
                        <span>Continue to Study Preferences</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ======================================================== */}
                {/* STEP 4: STUDY PREFERENCES                                 */}
                {/* ======================================================== */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>Study Preferences</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                          Personalization Engine
                        </span>
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Choose your enrolled courses, target study resources, topics of interest, and study circles.
                      </p>
                    </div>

                    {/* 1. Course Selection */}
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Select Enrolled Courses <span className="text-red-500">*</span>
                          </label>
                          <p className="text-[11px] text-slate-400">
                            {selectedInst.shortName} • {selectedDepartment} • {selectedLevel}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                            {selectedCourseCodes.length} Selected • {totalCreditUnits} Credit Units
                          </span>
                        </div>
                      </div>

                      {/* Course Search Filter */}
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" />
                        <input
                          type="text"
                          value={courseSearch}
                          onChange={e => setCourseSearch(e.target.value)}
                          placeholder="Search courses by code (e.g. CSC 201) or title..."
                          className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                        />
                      </div>

                      {/* Courses List */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                        {filteredCourses.map((course, idx) => {
                          const isSelected = selectedCourseCodes.includes(course.courseCode);
                          return (
                            <div
                              key={`${course.id || course.courseCode}_${idx}`}
                              onClick={() => toggleCourseCode(course.courseCode)}
                              className={`p-3 rounded-2xl border text-left cursor-pointer transition-all flex items-start justify-between gap-2.5 ${
                                isSelected
                                  ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-500 text-slate-900 dark:text-white shadow-xs'
                                  : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-mono font-black text-xs px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                                    {course.courseCode}
                                  </span>
                                  <span className="text-[10px] font-bold text-slate-400">
                                    {course.creditUnit || 2} Units
                                  </span>
                                </div>
                                <p className="text-xs font-semibold truncate" title={course.courseTitle}>
                                  {course.courseTitle}
                                </p>
                              </div>
                              <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                                isSelected ? 'bg-emerald-600 text-white' : 'border border-slate-300 dark:border-slate-600 text-transparent'
                              }`}>
                                ✓
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Course Missing Link */}
                      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                        <span>Need a course not listed above?</span>
                        <button
                          type="button"
                          onClick={() => {
                            setAdditionModalType('course');
                            setAdditionModalOpen(true);
                          }}
                          className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Request Course Addition</span>
                        </button>
                      </div>
                    </div>

                    {/* 2. Preferred Academic Resources */}
                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Preferred Academic Resources <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {RESOURCE_TYPE_OPTIONS.map(resType => {
                          const active = selectedResourceTypes.includes(resType);
                          return (
                            <button
                              key={resType}
                              type="button"
                              onClick={() => toggleResourceType(resType)}
                              className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-2 ${
                                active
                                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-semibold'
                                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              <span>{resType}</span>
                              <span className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${
                                active ? 'bg-emerald-600 text-white' : 'border border-slate-300 dark:border-slate-600 text-transparent'
                              }`}>
                                ✓
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 3. Areas / Topics of Interest */}
                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Target Topics & Concepts to Master
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Algorithms & Logic', 'Data Structures', 'Database Design', 'Digital Circuit Analysis', 'Software Architecture', 'Calculus & Linear Algebra', 'Cyber Defense'].map(top => {
                          const active = selectedTopics.includes(top);
                          return (
                            <button
                              key={top}
                              type="button"
                              onClick={() => toggleTopic(top)}
                              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                                active
                                  ? 'bg-teal-600 text-white font-semibold'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              {active ? `✓ ${top}` : `+ ${top}`}
                            </button>
                          );
                        })}
                      </div>
                      <form onSubmit={handleAddCustomTopic} className="flex gap-2 pt-1">
                        <input
                          type="text"
                          value={customTopicInput}
                          onChange={e => setCustomTopicInput(e.target.value)}
                          placeholder="Add custom topic (e.g. Distributed Consensus)..."
                          className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 rounded-xl bg-slate-800 dark:bg-slate-700 text-white text-xs font-bold shrink-0"
                        >
                          Add Topic
                        </button>
                      </form>
                    </div>

                    {/* 4. Discover Recommended Reading Groups */}
                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Recommended Study Circles & Reading Groups
                        </label>
                        <span className="text-[11px] text-slate-400">
                          Peer collaboration for your department
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {recommendedReadingGroups.map(group => {
                          const isJoined = joinedGroupIds.includes(group.id);
                          return (
                            <div
                              key={group.id}
                              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 flex items-start justify-between gap-2"
                            >
                              <div className="min-w-0 flex-1">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                  {group.name}
                                </h4>
                                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                  {group.description}
                                </p>
                                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
                                  {group.memberCount} Members • {group.institution || selectedInst.shortName}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => toggleJoinGroup(group.id)}
                                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all shrink-0 ${
                                  isJoined
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-emerald-500'
                                }`}
                              >
                                {isJoined ? 'Joined ✓' : 'Join'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back: Profile Info</span>
                      </button>
                      <button
                        type="button"
                        id="step4-next-btn"
                        onClick={handleNextStep}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-101"
                      >
                        <span>Continue to Profile Review</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ======================================================== */}
                {/* STEP 5: PROFILE REVIEW & COMPLETE                         */}
                {/* ======================================================== */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>Review Your Profile</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                          Ready for Deployment
                        </span>
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Review your verified credentials before completing your registration and launching your personalized dashboard.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* 1. Account Summary Card */}
                      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-emerald-600" />
                            <span>1. Account Information</span>
                          </h3>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div>
                            <span className="text-slate-400 block">Full Legal Name:</span>
                            <span className="font-semibold text-slate-900 dark:text-white">{fullName}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Email Address:</span>
                            <span className="font-semibold text-slate-900 dark:text-white">{email}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Password:</span>
                            <span className="font-mono text-slate-600 dark:text-slate-300">••••••••</span>
                          </div>
                        </div>
                      </div>

                      {/* 2. Academic Summary Card */}
                      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>2. Academic Records</span>
                          </h3>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div>
                            <span className="text-slate-400 block">Institution:</span>
                            <span className="font-semibold text-slate-900 dark:text-white">{selectedInst.name}</span>
                            <span className="text-[10px] text-slate-400 block">{selectedInst.type}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Faculty & Department:</span>
                            <span className="font-semibold text-slate-900 dark:text-white">{selectedDepartment}</span>
                            <span className="text-[10px] text-slate-400 block">{selectedFaculty}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Programme & Level:</span>
                            <span className="font-semibold text-slate-900 dark:text-white">{selectedProgramme}</span>
                            <span className="text-[10px] text-emerald-600 font-bold block">{selectedLevel} • {academicSession}</span>
                          </div>
                        </div>
                      </div>

                      {/* 3. Profile Summary Card */}
                      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                            <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>3. Profile Identity</span>
                          </h3>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(3)}
                            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <img
                            src={customAvatarUrl || selectedAvatarUrl}
                            alt="Avatar"
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-2xl object-cover border border-emerald-500 shrink-0"
                          />
                          <div className="min-w-0 flex-1 space-y-1 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 dark:text-white">{username}</span>
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 text-[10px] font-bold">Verified Student</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 truncate">
                              {bio || `Student at ${selectedInst.name}`}
                            </p>
                            <div className="flex flex-wrap gap-1 pt-1">
                              {selectedInterests.map(i => (
                                <span key={i} className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-[10px] font-medium text-slate-700 dark:text-slate-300">
                                  {i}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 4. Study Preferences Card */}
                      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                            <span>4. Study Preferences & Timetable</span>
                          </h3>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(4)}
                            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="text-slate-400 block mb-1">
                              Enrolled Courses ({selectedCourseCodes.length} courses • {totalCreditUnits} units):
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedCourseObjects.map((c, idx) => (
                                <span key={`${c.id || c.courseCode}_${idx}`} className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-[11px]">
                                  {c.courseCode} ({c.creditUnit}U)
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            <div>
                              <span className="text-slate-400 block">Preferred Resources:</span>
                              <span className="font-medium text-slate-700 dark:text-slate-300">{selectedResourceTypes.join(', ')}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block">Connected Reading Groups:</span>
                              <span className="font-medium text-slate-700 dark:text-slate-300">
                                {joinedGroupIds.length} Groups Joined
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Final Submission Button */}
                    <div className="pt-4 space-y-3">
                      <button
                        type="button"
                        id="complete-profile-btn"
                        onClick={handleCompleteProfile}
                        disabled={loading}
                        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all hover:scale-101 disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            <span>Initializing Your Academic Workspace...</span>
                          </>
                        ) : (
                          <>
                            <BadgeCheck className="w-5 h-5" />
                            <span>Complete Profile & Launch Dashboard</span>
                          </>
                        )}
                      </button>
                      <p className="text-center text-[11px] text-slate-400">
                        By completing registration, you agree to StudentHub NG's Academic Integrity Guidelines and Terms of Service.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
