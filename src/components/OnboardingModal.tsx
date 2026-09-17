import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  Building2, 
  BookOpen, 
  Target, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  X,
  Search,
  School,
  FolderTree,
  Layers,
  Award,
  CheckCircle2,
  Clock,
  Settings,
  Plus,
  Trash2,
  BookMarked,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FacultyRecord, DepartmentRecord, CourseRecord } from '../types';
import { getSchoolAccreditedLevels } from '../data/schoolAcademicData';
import { 
  resolveFacultiesForInstitution, 
  resolveDepartmentsForFaculty, 
  resolveProgrammesForDepartment 
} from '../data/academicHierarchyResolver';

export const OnboardingModal: React.FC = () => {
  const { 
    onboardingOpen, 
    setOnboardingOpen, 
    student, 
    updateStudent, 
    setCurrentView, 
    addToast,
    institutions,
    courses: globalCourses
  } = useApp();

  // 10-Step Self-Service Onboarding Workflow
  const [step, setStep] = useState(1);
  const totalSteps = 10;

  // Step 1: Personal Profile
  const [fullName, setFullName] = useState(student.fullName || '');
  const [email, setEmail] = useState(student.email || '');
  const [matricNumber, setMatricNumber] = useState(student.matricNumber || '');
  const [phoneNumber, setPhoneNumber] = useState(student.phoneNumber || '');

  // Step 2: Institution
  const [selectedInstitutionId, setSelectedInstitutionId] = useState(student.institutionId || 'unilag');
  const [institutionSearch, setInstitutionSearch] = useState('');

  // Step 3-6: Academic Hierarchy
  const [selectedFaculty, setSelectedFaculty] = useState(student.faculty || 'Faculty of Science');
  const [selectedDepartment, setSelectedDepartment] = useState(student.department || 'Computer Science');
  const [selectedProgramme, setSelectedProgramme] = useState(student.programme || 'B.Sc Computer Science');
  const [selectedLevel, setSelectedLevel] = useState(student.level || '200L');
  const [selectedSemester, setSelectedSemester] = useState<'First Semester (Harmattan)' | 'Second Semester (Rain/Omega)'>('First Semester (Harmattan)');

  // Step 7: Course Selection
  const [selectedCourseCodes, setSelectedCourseCodes] = useState<string[]>(student.enrolledCourseCodes || []);
  const [customCourseCode, setCustomCourseCode] = useState('');
  const [customCourseTitle, setCustomCourseTitle] = useState('');
  const [customCourseUnits, setCustomCourseUnits] = useState(3);

  // Step 8: Study Preferences
  const [gradingSystem, setGradingSystem] = useState<'5.0' | '4.0'>(student.gradingSystem || '5.0');
  const [targetCgpa, setTargetCgpa] = useState<number>(student.targetCgpa || 4.70);
  const [studyHoursPerDay, setStudyHoursPerDay] = useState(3);
  const [aiCopilotTone, setAiCopilotTone] = useState<'exam_focused' | 'deep_conceptual' | 'quick_summary'>('exam_focused');
  const [dailyReminders, setDailyReminders] = useState(true);

  if (!onboardingOpen) return null;

  const selectedInst = institutions.find(i => i.id === selectedInstitutionId) || institutions[0];

  const filteredInstitutions = institutions.filter(inst =>
    inst.name.toLowerCase().includes(institutionSearch.toLowerCase()) ||
    inst.shortName.toLowerCase().includes(institutionSearch.toLowerCase()) ||
    inst.state.toLowerCase().includes(institutionSearch.toLowerCase()) ||
    inst.type.toLowerCase().includes(institutionSearch.toLowerCase())
  );

  // Dynamic Faculties for chosen institution
  const availableFaculties = useMemo(() => {
    if (!selectedInst) return [];
    const facs = resolveFacultiesForInstitution(selectedInst);
    return facs.map(f => f.name);
  }, [selectedInst]);

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
    const depts = resolveDepartmentsForFaculty(facRecord, selectedInst);
    return depts.map(d => d.name);
  }, [selectedInst, selectedFaculty]);

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
    const progs = resolveProgrammesForDepartment(deptRecord, selectedInst);
    return progs.map(p => p.name);
  }, [selectedInst, selectedFaculty, selectedDepartment]);

  const availableLevels = useMemo(() => {
    if (selectedInst) {
      const accredited = getSchoolAccreditedLevels(selectedInst);
      if (accredited && accredited.length > 0) {
        return accredited;
      }
    }
    return ['100L', '200L', '300L', '400L', '500L', '600L', 'ND 1', 'ND 2', 'HND 1', 'HND 2'];
  }, [selectedInst]);

  // Departmental courses candidate list
  const suggestedDepartmentCourses = useMemo(() => {
    const list = globalCourses || [];
    const deptNorm = (selectedDepartment || '').toLowerCase();
    
    const seen = new Set<string>();
    const matched: CourseRecord[] = [];

    for (const c of list) {
      if (seen.has(c.courseCode)) continue;
      const cDept = (c.department || '').toLowerCase();
      const cLvl = (c.level || '').toLowerCase();
      if (
        (cDept.includes(deptNorm) || deptNorm.includes(cDept)) &&
        (!selectedLevel || cLvl.includes(selectedLevel.toLowerCase().slice(0, 3)))
      ) {
        seen.add(c.courseCode);
        matched.push(c);
      }
    }

    if (matched.length > 0) return matched;

    const fallback: CourseRecord[] = [];
    for (const c of list) {
      if (!seen.has(c.courseCode)) {
        seen.add(c.courseCode);
        fallback.push(c);
        if (fallback.length >= 6) break;
      }
    }
    return fallback;
  }, [globalCourses, selectedDepartment, selectedLevel]);

  // Initialize enrolled courses if empty
  useEffect(() => {
    if (selectedCourseCodes.length === 0 && suggestedDepartmentCourses.length > 0) {
      setSelectedCourseCodes(Array.from(new Set(suggestedDepartmentCourses.map(c => c.courseCode))));
    }
  }, [suggestedDepartmentCourses]);

  const handleSelectInstitution = (instId: string) => {
    setSelectedInstitutionId(instId);
    const chosen = institutions.find(i => i.id === instId);
    if (chosen) {
      setGradingSystem(chosen.gradingSystem);
      if (chosen.faculties && chosen.faculties.length > 0) {
        setSelectedFaculty(chosen.faculties[0]);
      }
    }
  };

  const toggleCourseCode = (code: string) => {
    setSelectedCourseCodes(prev => 
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  const handleAddCustomCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCourseCode.trim()) return;
    const cleanCode = customCourseCode.trim().toUpperCase();
    if (!selectedCourseCodes.includes(cleanCode)) {
      setSelectedCourseCodes(prev => [...prev, cleanCode]);
      addToast('Course Added', `${cleanCode} added to your semester load.`, 'success');
      setCustomCourseCode('');
      setCustomCourseTitle('');
    }
  };

  const handleComplete = () => {
    updateStudent({
      fullName,
      email,
      matricNumber,
      phoneNumber,
      institutionId: selectedInstitutionId,
      institutionName: selectedInst.name,
      institutionType: selectedInst.type,
      faculty: selectedFaculty,
      department: selectedDepartment,
      programme: selectedProgramme,
      level: selectedLevel,
      gradingSystem,
      targetCgpa,
      enrolledCourseCodes: selectedCourseCodes
    });
    setOnboardingOpen(false);
    setCurrentView('dashboard');
    addToast(
      'Academic Environment Built!',
      `You successfully tailored StudentHub NG for ${selectedDepartment} (${selectedLevel}) at ${selectedInst.shortName}.`,
      'success'
    );
  };

  const stepTitles = [
    'Student Identity',
    'Select Institution',
    'Faculty / College',
    'Department',
    'Degree Programme',
    'Academic Level',
    'Enrolled Courses',
    'Study Preferences',
    'Review Environment',
    'Launch Dashboard'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Progress Bar & Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 dark:from-slate-800/80 dark:to-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 font-black text-sm">
              {step}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {stepTitles[step - 1]}
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  Step {step} of {totalSteps}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Build and personalize your own Nigerian academic workspace
              </p>
            </div>
          </div>
          <button
            onClick={() => setOnboardingOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator dots */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 flex">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 transition-all duration-300 ${
                idx + 1 <= step ? 'bg-emerald-600' : 'bg-transparent'
              }`}
            />
          ))}
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">

          {/* STEP 1: PERSONAL IDENTITY */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
                  1. Build Your Student Identity
                </h4>
                <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Start by configuring your official matriculation and student profile. Your academic records, course rep coordination, and GPA calculations will attach to this profile.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name (as registered with your institution)
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="e.g. Babatunde Adeleke"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Official Student Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. b.adeleke@live.unilag.edu.ng"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Matric / JAMB Reg Number
                  </label>
                  <input
                    type="text"
                    value={matricNumber}
                    onChange={e => setMatricNumber(e.target.value)}
                    placeholder="e.g. 210805524"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  WhatsApp / Phone Number (Optional for study group sync)
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="e.g. +234 803 123 4567"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
            </div>
          )}

          {/* STEP 2: INSTITUTION SELECTION */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40">
                <h4 className="font-bold text-sm text-indigo-950 dark:text-indigo-200">
                  2. Select Your Tertiary Institution
                </h4>
                <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Choose your university, polytechnic, or college of education. Curriculum benchmarks, grading scales (5.0 vs 4.0), and past questions automatically align.
                </p>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by school name, acronym (e.g. UNILAG, UI, FUTA, YABATECH) or state..."
                  value={institutionSearch}
                  onChange={e => setInstitutionSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                {filteredInstitutions.map(inst => {
                  const isSelected = selectedInstitutionId === inst.id;
                  return (
                    <button
                      key={inst.id}
                      type="button"
                      onClick={() => handleSelectInstitution(inst.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected 
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                          {inst.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {inst.shortName} • {inst.type} • {inst.state} State ({inst.gradingSystem} Scale)
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: FACULTY SELECTION */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/40">
                <h4 className="font-bold text-sm text-teal-950 dark:text-teal-200">
                  3. Select Your Faculty / College / School
                </h4>
                <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Available faculties accredited at <strong>{selectedInst.name}</strong>.
                </p>
              </div>

              <div className="space-y-2">
                {availableFaculties.map((fac, idx) => {
                  const isSelected = selectedFaculty === fac;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedFaculty(fac)}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/20 font-bold'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{fac}</span>
                      {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: DEPARTMENT SELECTION */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                <h4 className="font-bold text-sm text-emerald-950 dark:text-emerald-200">
                  4. Select Academic Department
                </h4>
                <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Departments under <strong>{selectedFaculty}</strong> at {selectedInst.shortName}.
                </p>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {availableDepartments.map((dept, idx) => {
                  const isSelected = selectedDepartment === dept;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedDepartment(dept)}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/20 font-bold'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{dept}</span>
                      {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: PROGRAMME SELECTION */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
                <h4 className="font-bold text-sm text-blue-950 dark:text-blue-200">
                  5. Degree or Diploma Award Programme
                </h4>
                <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Specific degree designation for your course of study.
                </p>
              </div>

              <div className="space-y-2">
                {availableProgrammes.map((prog, idx) => {
                  const isSelected = selectedProgramme === prog;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedProgramme(prog)}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/20 font-bold'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{prog}</span>
                      {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6: LEVEL & SEMESTER */}
          {step === 6 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
                <h4 className="font-bold text-sm text-amber-950 dark:text-amber-200">
                  6. Current Academic Level & Semester
                </h4>
                <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Select your current year of study. This ensures the correct departmental courses and past questions are recommended.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Academic Level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {availableLevels.map(lvl => {
                    const isSelected = selectedLevel === lvl;
                    return (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSelectedLevel(lvl)}
                        className={`p-3 rounded-2xl border text-center font-bold transition-all ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-600 text-white shadow-md'
                            : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Active Semester
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedSemester('First Semester (Harmattan)')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedSemester === 'First Semester (Harmattan)'
                        ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/20 font-bold'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div>1st Semester (Harmattan / Alpha)</div>
                    <div className="text-[11px] text-slate-500 font-normal mt-0.5">October – March session</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSemester('Second Semester (Rain/Omega)')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedSemester === 'Second Semester (Rain/Omega)'
                        ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/20 font-bold'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div>2nd Semester (Rain / Omega)</div>
                    <div className="text-[11px] text-slate-500 font-normal mt-0.5">April – September session</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: SELF-SERVICE COURSE ENROLLMENT */}
          {step === 7 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                <h4 className="font-bold text-sm text-emerald-950 dark:text-emerald-200">
                  7. Self-Service Course Enrollment
                </h4>
                <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Select the courses you are taking this semester. You can also add unlisted or elective courses manually.
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Recommended for {selectedDepartment} ({selectedLevel}):</span>
                  <span className="text-emerald-600 font-bold">{selectedCourseCodes.length} selected</span>
                </div>

                <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                  {suggestedDepartmentCourses.map((course, idx) => {
                    const isEnrolled = selectedCourseCodes.includes(course.courseCode);
                    return (
                      <div
                        key={`${course.id || course.courseCode}_${idx}`}
                        onClick={() => toggleCourseCode(course.courseCode)}
                        className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                          isEnrolled
                            ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isEnrolled}
                            onChange={() => {}}
                            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                          />
                          <div>
                            <span className="font-black text-slate-900 dark:text-white mr-2">{course.courseCode}</span>
                            <span className="text-slate-600 dark:text-slate-300">{course.courseTitle}</span>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {course.creditUnit} Units
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add Custom Course Form */}
              <form onSubmit={handleAddCustomCourse} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="font-bold text-[11px] text-slate-500 uppercase tracking-wider">
                  + Add Custom / Elective Course
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Code (e.g. GST 201)"
                    value={customCourseCode}
                    onChange={e => setCustomCourseCode(e.target.value)}
                    className="w-32 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Course Title (Optional)"
                    value={customCourseTitle}
                    onChange={e => setCustomCourseTitle(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold text-xs hover:bg-emerald-700"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 8: STUDY & ACADEMIC PREFERENCES */}
          {step === 8 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40">
                <h4 className="font-bold text-sm text-indigo-950 dark:text-indigo-200">
                  8. Personal Study & Target Preferences
                </h4>
                <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Tailor your daily study habit goals, AI Study Copilot assistance tone, and target graduating CGPA.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Grading Scale System
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGradingSystem('5.0')}
                    className={`p-3 rounded-xl border text-left font-bold ${
                      gradingSystem === '5.0'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    5.0 Scale (First Class: ≥ 4.50)
                  </button>
                  <button
                    type="button"
                    onClick={() => setGradingSystem('4.0')}
                    className={`p-3 rounded-xl border text-left font-bold ${
                      gradingSystem === '4.0'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    4.0 Scale (Distinction: ≥ 3.50)
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Target Graduating CGPA
                  </label>
                  <span className="font-black text-sm text-emerald-600">
                    {targetCgpa.toFixed(2)} / {gradingSystem === '5.0' ? '5.00' : '4.00'}
                  </span>
                </div>
                <input
                  type="range"
                  min={gradingSystem === '5.0' ? '2.50' : '2.00'}
                  max={gradingSystem === '5.0' ? '5.00' : '4.00'}
                  step="0.05"
                  value={targetCgpa}
                  onChange={e => setTargetCgpa(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  AI Study Copilot Tone
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setAiCopilotTone('exam_focused')}
                    className={`p-2.5 rounded-xl border text-center font-bold ${
                      aiCopilotTone === 'exam_focused'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    Exam Focused
                  </button>
                  <button
                    type="button"
                    onClick={() => setAiCopilotTone('deep_conceptual')}
                    className={`p-2.5 rounded-xl border text-center font-bold ${
                      aiCopilotTone === 'deep_conceptual'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    Deep Concepts
                  </button>
                  <button
                    type="button"
                    onClick={() => setAiCopilotTone('quick_summary')}
                    className={`p-2.5 rounded-xl border text-center font-bold ${
                      aiCopilotTone === 'quick_summary'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    Quick Summary
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 9: REVIEW ENVIRONMENT */}
          {step === 9 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span className="font-extrabold text-sm">Review Your StudentHub Environment</span>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-400 text-slate-950 text-[10px] font-black rounded-full">
                    Ready to Launch
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-800">
                  <div>
                    <span className="text-slate-400">Student:</span>
                    <p className="font-bold">{fullName || 'Babatunde Adeleke'}</p>
                    <p className="text-slate-400 text-[11px]">{matricNumber || '210805524'}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Institution:</span>
                    <p className="font-bold">{selectedInst.name}</p>
                    <p className="text-emerald-400 text-[11px]">{selectedInst.type} ({gradingSystem} Scale)</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Faculty & Department:</span>
                    <p className="font-bold">{selectedDepartment}</p>
                    <p className="text-slate-400 text-[11px]">{selectedFaculty}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Programme & Level:</span>
                    <p className="font-bold">{selectedProgramme}</p>
                    <p className="text-slate-400 text-[11px]">{selectedLevel} • {selectedSemester.split(' ')[0]}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-400 block mb-1">Enrolled Courses ({selectedCourseCodes.length}):</span>
                  <div className="flex flex-wrap gap-1.5">
                    {Array.from(new Set(selectedCourseCodes)).map((c, idx) => (
                      <span key={`${c}_${idx}`} className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono text-[11px] font-bold">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3">
                <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <p className="text-xs text-emerald-900 dark:text-emerald-200">
                  The student builds their own StudentHub NG experience. All sections of your platform will now reflect your personalized courses and departmental resources.
                </p>
              </div>
            </div>
          )}

          {/* STEP 10: LAUNCH DASHBOARD */}
          {step === 10 && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-600/30">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Your Personal StudentHub NG is Ready!
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  Congratulations <strong>{fullName}</strong>. Your personalized academic dashboard for <strong>{selectedDepartment} ({selectedLevel})</strong> at <strong>{selectedInst.shortName}</strong> is initialized.
                </p>
              </div>

              <div className="p-4 max-w-md mx-auto rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Personal Academic Vault Activated</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{selectedCourseCodes.length} Courses Enrolled & Syllabi Ready</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Target Graduating CGPA Benchmark: {targetCgpa.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(prev => prev - 1)}
              className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              onClick={() => setStep(prev => prev + 1)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/30"
            >
              <Check className="w-4 h-4" />
              <span>Launch My Personalized StudentHub</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
