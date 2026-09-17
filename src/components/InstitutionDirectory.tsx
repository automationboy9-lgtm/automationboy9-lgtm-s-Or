import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Institution, FacultyRecord, DepartmentRecord, ProgrammeRecord, CourseRecord } from '../types';
import { 
  Building2, 
  Search, 
  MapPin, 
  GraduationCap, 
  ExternalLink, 
  Check, 
  ChevronRight,
  BookOpen,
  BookMarked,
  Calendar,
  Layers,
  ArrowLeft,
  Sparkles,
  School,
  FileCheck,
  FolderTree,
  Filter,
  CheckCircle2,
  Info,
  ShieldCheck,
  Award,
  Globe,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InstitutionLogo } from './InstitutionLogo';
import { CourseBrowser } from './CourseBrowser';
import { 
  resolveFacultiesForInstitution, 
  resolveDepartmentsForFaculty, 
  resolveProgrammesForDepartment, 
  resolveCoursesForProgramme 
} from '../data/academicHierarchyResolver';

type DrilldownLevel = 'institutions' | 'institution' | 'faculty' | 'department' | 'programme';

export const InstitutionDirectory: React.FC = () => {
  const { 
    institutions, 
    faculties, 
    departments, 
    programmes, 
    courses, 
    student, 
    updateStudent, 
    addToast,
    setCurrentView,
    addTask
  } = useApp();

  // Top level view: Directory vs Global Course Browser
  const [activeMainTab, setActiveMainTab] = useState<'institutions' | 'courses'>('institutions');

  // Navigation / Drilldown State
  const [currentLevel, setCurrentLevel] = useState<DrilldownLevel>('institutions');
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyRecord | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentRecord | null>(null);
  const [selectedProgramme, setSelectedProgramme] = useState<ProgrammeRecord | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [regulatorFilter, setRegulatorFilter] = useState('all');
  const [zoneFilter, setZoneFilter] = useState('all');
  const [accreditationFilter, setAccreditationFilter] = useState('all');
  const [activeLevelTab, setActiveLevelTab] = useState<string>('100L');
  const [activeSemesterTab, setActiveSemesterTab] = useState<'all' | 'First Semester (Harmattan)' | 'Second Semester (Rain/Omega)'>('all');

  // Pagination State for 600+ Institutions
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(24);

  // Extract unique states and geopolitical zones
  const states = useMemo(() => Array.from(new Set((institutions || []).map(i => i.state))).sort(), [institutions]);
  const zones = useMemo(() => Array.from(new Set((institutions || []).map(i => i.geopoliticalZone).filter(Boolean))).sort(), [institutions]);
  const regulators = useMemo(() => Array.from(new Set((institutions || []).map(i => i.regulator).filter(Boolean))).sort(), [institutions]);

  // Dynamic Metrics
  const metrics = useMemo(() => {
    const total = (institutions || []).length;
    const universities = (institutions || []).filter(i => i.type.includes('University')).length;
    const polytechnics = (institutions || []).filter(i => i.type.includes('Polytechnic')).length;
    const colleges = (institutions || []).filter(i => i.type.includes('College') || i.type.includes('Monotechnic')).length;
    const fullyAccredited = (institutions || []).filter(i => i.accreditationStatus === 'Full Accreditation').length;
    return { total, universities, polytechnics, colleges, fullyAccredited };
  }, [institutions]);

  // Filtered institutions
  const filteredInstitutions = useMemo(() => {
    return (institutions || []).filter(inst => {
      const matchSearch = 
        inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (inst.regulator && inst.regulator.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (inst.faculties && inst.faculties.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchType = typeFilter === 'all' || inst.type === typeFilter;
      const matchState = stateFilter === 'all' || inst.state.toLowerCase() === stateFilter.toLowerCase();
      const matchRegulator = regulatorFilter === 'all' || inst.regulator === regulatorFilter;
      const matchZone = zoneFilter === 'all' || inst.geopoliticalZone === zoneFilter;
      const matchAccreditation = accreditationFilter === 'all' || inst.accreditationStatus === accreditationFilter;

      return matchSearch && matchType && matchState && matchRegulator && matchZone && matchAccreditation;
    });
  }, [institutions, searchQuery, typeFilter, stateFilter, regulatorFilter, zoneFilter, accreditationFilter]);

  // Reset to first page whenever search or filter criteria change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, typeFilter, stateFilter, regulatorFilter, zoneFilter, accreditationFilter, pageSize]);

  // Total pages and paginated slice of institutions
  const effectivePageSize = pageSize === -1 ? filteredInstitutions.length || 1 : pageSize;
  const totalPages = Math.max(1, Math.ceil(filteredInstitutions.length / effectivePageSize));
  
  const displayedInstitutions = useMemo(() => {
    if (pageSize === -1) return filteredInstitutions;
    const startIndex = (currentPage - 1) * pageSize;
    return filteredInstitutions.slice(startIndex, startIndex + pageSize);
  }, [filteredInstitutions, currentPage, pageSize]);

  // Hierarchical Data Resolvers
  const currentInstitutionFaculties = useMemo(() => {
    if (!selectedInstitution) return [];
    if (selectedInstitution.faculties && selectedInstitution.faculties.length > 0) {
      return resolveFacultiesForInstitution(selectedInstitution);
    }
    const directMatches = faculties.filter(f => f.institutionId === selectedInstitution.id);
    if (directMatches.length > 0) return directMatches;
    return resolveFacultiesForInstitution(selectedInstitution);
  }, [selectedInstitution, faculties]);

  const currentFacultyDepartments = useMemo(() => {
    if (!selectedFaculty || !selectedInstitution) return [];
    return resolveDepartmentsForFaculty(selectedFaculty, selectedInstitution);
  }, [selectedFaculty, selectedInstitution]);

  const currentDepartmentProgrammes = useMemo(() => {
    if (!selectedDepartment || !selectedInstitution) return [];
    return resolveProgrammesForDepartment(selectedDepartment, selectedInstitution);
  }, [selectedDepartment, selectedInstitution]);

  // Programme Courses
  const currentProgrammeCourses = useMemo(() => {
    if (!selectedProgramme || !selectedInstitution || !selectedDepartment) return [];
    
    // Check direct matches in courses state
    const directMatches = courses.filter(c => {
      const matchInst = c.institutionId === selectedInstitution.id || c.institutionName.toLowerCase() === selectedInstitution.name.toLowerCase();
      const matchDept = c.department.toLowerCase() === selectedProgramme.departmentName.toLowerCase() || 
                        c.department.toLowerCase().includes(selectedDepartment.name.toLowerCase());
      return matchInst && matchDept;
    });

    if (directMatches.length > 0) return directMatches;

    // Use comprehensive academic hierarchy resolver
    return resolveCoursesForProgramme(selectedProgramme, selectedDepartment, selectedInstitution);
  }, [selectedProgramme, selectedInstitution, selectedDepartment, courses]);

  // Handlers for Drilldown Navigation
  const handleSelectInstitution = (inst: Institution) => {
    setSelectedInstitution(inst);
    setSelectedFaculty(null);
    setSelectedDepartment(null);
    setSelectedProgramme(null);
    setCurrentLevel('institution');
  };

  const handleSelectFaculty = (fac: FacultyRecord) => {
    setSelectedFaculty(fac);
    setSelectedDepartment(null);
    setSelectedProgramme(null);
    setCurrentLevel('faculty');
  };

  const handleSelectDepartment = (dept: DepartmentRecord) => {
    setSelectedDepartment(dept);
    setSelectedProgramme(null);
    setCurrentLevel('department');
  };

  const handleSelectProgramme = (prog: ProgrammeRecord) => {
    setSelectedProgramme(prog);
    setActiveLevelTab(prog.levels[0] || '100L');
    setCurrentLevel('programme');
  };

  const handleBreadcrumbClick = (target: DrilldownLevel) => {
    if (target === 'institutions') {
      setSelectedInstitution(null);
      setSelectedFaculty(null);
      setSelectedDepartment(null);
      setSelectedProgramme(null);
      setCurrentLevel('institutions');
    } else if (target === 'institution') {
      setSelectedFaculty(null);
      setSelectedDepartment(null);
      setSelectedProgramme(null);
      setCurrentLevel('institution');
    } else if (target === 'faculty') {
      setSelectedDepartment(null);
      setSelectedProgramme(null);
      setCurrentLevel('faculty');
    } else if (target === 'department') {
      setSelectedProgramme(null);
      setCurrentLevel('department');
    }
  };

  const handleSetStudentAcademicHierarchy = () => {
    if (!selectedInstitution) return;
    updateStudent({
      institutionId: selectedInstitution.id,
      institutionName: selectedInstitution.name,
      institutionType: selectedInstitution.type,
      gradingSystem: selectedInstitution.gradingSystem,
      faculty: selectedFaculty ? selectedFaculty.name : student.faculty,
      department: selectedDepartment ? selectedDepartment.name : student.department,
      programme: selectedProgramme ? selectedProgramme.name : student.programme,
      level: activeLevelTab || student.level
    });
    addToast(
      'Profile Personalized',
      `Academic path set: ${selectedInstitution.shortName} • ${selectedDepartment?.name || 'Department'} • ${activeLevelTab}.`,
      'success'
    );
  };

  const handleAddCourseToPlanner = (course: CourseRecord) => {
    addTask({
      title: `Study Session: ${course.courseCode} (${course.courseTitle})`,
      courseCode: course.courseCode,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      dueTime: '10:00 AM',
      type: 'study-session',
      priority: 'medium',
      isCompleted: false,
      notes: course.courseDescription
    });
  };

  const getRegulatorBadgeColor = (reg?: string) => {
    switch (reg) {
      case 'NUC':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
      case 'NBTE':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800';
      case 'NCCE':
        return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800';
      case 'NMCN':
        return 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  const getAccreditationBadge = (status?: string) => {
    if (status === 'Full Accreditation') {
      return (
        <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          Full Accreditation
        </span>
      );
    }
    if (status === 'Interim Accreditation') {
      return (
        <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-[10px] font-semibold border border-amber-200 dark:border-amber-800 flex items-center gap-1">
          <Award className="w-3 h-3 text-amber-500" />
          Interim Accreditation
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium border border-slate-200 dark:border-slate-700">
        {status || 'Approved'}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-950 text-white shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-emerald-500/30">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">Nigerian Tertiary Institutions & Curriculum</h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                Official Directory
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Comprehensive database of all Nigerian Universities, Polytechnics & Colleges across 36 States + FCT with 100L-400L accredited courses.
            </p>
          </div>
        </div>

        {selectedInstitution && activeMainTab === 'institutions' && (
          <button
            onClick={handleSetStudentAcademicHierarchy}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20"
          >
            <Check className="w-4 h-4" />
            <span>Set as My Academic Path</span>
          </button>
        )}
      </div>

      {/* Main Tab Switcher */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/80 dark:border-slate-700/80">
        <button
          onClick={() => setActiveMainTab('institutions')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
            activeMainTab === 'institutions'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Tertiary Institutions ({institutions.length})</span>
        </button>

        <button
          onClick={() => setActiveMainTab('courses')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
            activeMainTab === 'courses'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Universal Course Search (100L - 400L)</span>
        </button>
      </div>

      {activeMainTab === 'courses' ? (
        <CourseBrowser standalone={false} />
      ) : (
        <>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Total Approved</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl font-black text-slate-900 dark:text-white">{metrics.total}</span>
            <span className="text-[10px] text-emerald-600 font-bold">Institutions</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Universities</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{metrics.universities}</span>
            <span className="text-[10px] text-slate-500">Fed / State / Priv</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Polytechnics</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl font-black text-blue-600 dark:text-blue-400">{metrics.polytechnics}</span>
            <span className="text-[10px] text-slate-500">NBTE Regulated</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Colleges & Specialized</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl font-black text-purple-600 dark:text-purple-400">{metrics.colleges}</span>
            <span className="text-[10px] text-slate-500">Health / COE</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between col-span-2 sm:col-span-1">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Regulators</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl font-black text-teal-600 dark:text-teal-400">4 Bodies</span>
            <span className="text-[10px] text-slate-500">NUC/NBTE/NCCE/NMCN</span>
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation Bar */}
      <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center flex-wrap gap-1.5 text-xs">
        <button
          onClick={() => handleBreadcrumbClick('institutions')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-colors ${
            currentLevel === 'institutions' 
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300' 
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Nigeria ({filteredInstitutions.length} shown)</span>
        </button>

        {selectedInstitution && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => handleBreadcrumbClick('institution')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-colors ${
                currentLevel === 'institution'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <School className="w-3.5 h-3.5" />
              <span>{selectedInstitution.shortName || selectedInstitution.name}</span>
            </button>
          </>
        )}

        {selectedFaculty && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => handleBreadcrumbClick('faculty')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-colors ${
                currentLevel === 'faculty'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FolderTree className="w-3.5 h-3.5" />
              <span>{selectedFaculty.name}</span>
            </button>
          </>
        )}

        {selectedDepartment && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => handleBreadcrumbClick('department')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-colors ${
                currentLevel === 'department'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{selectedDepartment.name}</span>
            </button>
          </>
        )}

        {selectedProgramme && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 font-black">
              {selectedProgramme.name}
            </span>
          </>
        )}
      </div>

      {/* DRILLDOWN LEVEL 0: INSTITUTIONS GRID */}
      {currentLevel === 'institutions' && (
        <div className="space-y-6">
          {/* Search & Advanced Filters */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search by institution name, acronym, city, state, or regulator (e.g. UNILAG, UI, FUTA, YABATECH, ABU, Covenant, FPI, NUC, NBTE)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              {/* Category Filter */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Institution Category
                </label>
                <select
                  value={typeFilter}
                  onChange={e => setTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="all">All 15 Categories</option>
                  <option value="Federal University">1. Federal Universities</option>
                  <option value="State University">2. State Universities</option>
                  <option value="Private University">3. Private Universities</option>
                  <option value="Federal Polytechnic">4. Federal Polytechnics</option>
                  <option value="State Polytechnic">5. State Polytechnics</option>
                  <option value="Private Polytechnic">6. Private Polytechnics</option>
                  <option value="Monotechnic / Specialized Institution">7. Monotechnics / Specialized</option>
                  <option value="College of Agriculture">8. Colleges of Agriculture</option>
                  <option value="College of Health Sciences and Technology">9. Colleges of Health Sciences</option>
                  <option value="College of Nursing Sciences">10. Colleges of Nursing Sciences</option>
                  <option value="College of Education">11. Colleges of Education</option>
                  <option value="Federal College of Education">12. Federal Colleges of Education</option>
                  <option value="State College of Education">13. State Colleges of Education</option>
                  <option value="Private College of Education">14. Private Colleges of Education</option>
                  <option value="Other recognized tertiary institution">15. Other Recognized Tertiary</option>
                </select>
              </div>

              {/* State Filter */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  State / Territory
                </label>
                <select
                  value={stateFilter}
                  onChange={e => setStateFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="all">All 36 States + FCT</option>
                  {states.map(s => (
                    <option key={s} value={s}>{s} State</option>
                  ))}
                </select>
              </div>

              {/* Regulator Filter */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Regulator
                </label>
                <select
                  value={regulatorFilter}
                  onChange={e => setRegulatorFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="all">All Regulators</option>
                  <option value="NUC">NUC (Universities)</option>
                  <option value="NBTE">NBTE (Polytechnics/Monotechnics)</option>
                  <option value="NCCE">NCCE (Colleges of Education)</option>
                  <option value="NMCN">NMCN (Nursing Colleges)</option>
                </select>
              </div>

              {/* Geopolitical Zone Filter */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Geopolitical Zone
                </label>
                <select
                  value={zoneFilter}
                  onChange={e => setZoneFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="all">All 6 Geopolitical Zones</option>
                  <option value="South West">South West</option>
                  <option value="South South">South South</option>
                  <option value="South East">South East</option>
                  <option value="North Central">North Central</option>
                  <option value="North West">North West</option>
                  <option value="North East">North East</option>
                </select>
              </div>
            </div>
          </div>

          {/* Institutions Grid Cards */}
          {filteredInstitutions.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <Building2 className="w-10 h-10 mx-auto text-slate-400" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No institutions match this filter</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Try clearing your search query or selecting "All Categories" to view the full directory of Nigerian tertiary institutions.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setTypeFilter('all');
                  setStateFilter('all');
                  setRegulatorFilter('all');
                  setZoneFilter('all');
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedInstitutions.map(inst => {
                  const isMyInst = student.institutionId === inst.id;
                  return (
                    <div
                      key={inst.id}
                      className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all flex flex-col justify-between hover:shadow-md ${
                        isMyInst 
                          ? 'border-emerald-500 ring-2 ring-emerald-500/20 dark:border-emerald-500' 
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <InstitutionLogo institution={inst} size="md" />
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                                  {inst.name}
                                </h3>
                                {inst.shortName && (
                                  <span className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] font-black border border-emerald-200 dark:border-emerald-800">
                                    {inst.shortName}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                <MapPin className="w-3 h-3 text-slate-400" />
                                <span>{inst.city}, {inst.state}</span>
                                {inst.geopoliticalZone && (
                                  <span className="text-[10px] text-slate-400">• {inst.geopoliticalZone}</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {isMyInst && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold border border-emerald-500/30 flex items-center gap-1 shrink-0">
                              <CheckCircle2 className="w-3 h-3" />
                              My Campus
                            </span>
                          )}
                        </div>

                        {/* Regulators and Status Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {inst.regulator && (
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getRegulatorBadgeColor(inst.regulator)}`}>
                              {inst.regulator} Approved
                            </span>
                          )}
                          {getAccreditationBadge(inst.accreditationStatus)}
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-semibold">
                            {inst.type}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold border border-emerald-100 dark:border-emerald-900">
                            {inst.gradingSystem} Scale
                          </span>
                        </div>

                        {inst.motto && (
                          <p className="text-xs italic text-slate-500 dark:text-slate-400 line-clamp-1 pt-1">
                            "{inst.motto}"
                          </p>
                        )}
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                          <span><strong className="text-slate-800 dark:text-slate-200">{(inst.faculties || []).length}</strong> Faculties/Schools</span>
                          {inst.websiteUrl && (
                            <a
                              href={inst.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-400 hover:text-emerald-600 transition-colors"
                              title="Visit official website"
                            >
                              <Globe className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>

                        <button
                          onClick={() => handleSelectInstitution(inst)}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <span>Explore Hierarchy</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination Controls */}
              {filteredInstitutions.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mt-6">
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                    <span>
                      Showing{' '}
                      <strong className="text-slate-800 dark:text-slate-200">
                        {pageSize === -1 ? 1 : (currentPage - 1) * pageSize + 1}
                      </strong>{' '}
                      to{' '}
                      <strong className="text-slate-800 dark:text-slate-200">
                        {pageSize === -1 ? filteredInstitutions.length : Math.min(currentPage * pageSize, filteredInstitutions.length)}
                      </strong>{' '}
                      of{' '}
                      <strong className="text-emerald-600 dark:text-emerald-400 font-bold">
                        {filteredInstitutions.length}
                      </strong>{' '}
                      accredited institutions
                    </span>
                    
                    <div className="flex items-center gap-1 ml-2">
                      <span className="text-[11px]">Per page:</span>
                      <select
                        value={pageSize}
                        onChange={(e) => {
                          setPageSize(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                        className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-slate-700 dark:text-slate-300 font-semibold focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                      >
                        <option value={24}>24</option>
                        <option value={48}>48</option>
                        <option value={96}>96</option>
                        <option value={-1}>All ({filteredInstitutions.length})</option>
                      </select>
                    </div>
                  </div>

                  {totalPages > 1 && pageSize !== -1 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(page => {
                            if (totalPages <= 7) return true;
                            if (page === 1 || page === totalPages) return true;
                            if (Math.abs(page - currentPage) <= 1) return true;
                            return false;
                          })
                          .reduce<(number | string)[]>((acc, page, idx, arr) => {
                            if (idx > 0 && page - (arr[idx - 1] as number) > 1) {
                              acc.push('...');
                            }
                            acc.push(page);
                            return acc;
                          }, [])
                          .map((item, idx) => (
                            item === '...' ? (
                              <span key={`ellipsis-${idx}`} className="px-2 text-xs text-slate-400">...</span>
                            ) : (
                              <button
                                key={`page-${item}`}
                                onClick={() => setCurrentPage(item as number)}
                                className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                                  currentPage === item
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                              >
                                {item}
                              </button>
                            )
                          ))
                        }
                      </div>

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* DRILLDOWN LEVEL 1: INSTITUTION VIEW & FACULTY SELECTION */}
      {currentLevel === 'institution' && selectedInstitution && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <InstitutionLogo institution={selectedInstitution} size="lg" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white">
                      {selectedInstitution.name}
                    </h2>
                    {selectedInstitution.shortName && (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[11px] font-black">
                        {selectedInstitution.shortName}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[11px] font-bold">
                      {selectedInstitution.type}
                    </span>
                    {selectedInstitution.regulator && (
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${getRegulatorBadgeColor(selectedInstitution.regulator)}`}>
                        {selectedInstitution.regulator} Regulated
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2 flex-wrap">
                    <span>{selectedInstitution.city}, {selectedInstitution.state}</span>
                    {selectedInstitution.geopoliticalZone && (
                      <>
                        <span>•</span>
                        <span>{selectedInstitution.geopoliticalZone} Zone</span>
                      </>
                    )}
                    {selectedInstitution.establishedYear && (
                      <>
                        <span>•</span>
                        <span>Est. {selectedInstitution.establishedYear}</span>
                      </>
                    )}
                    <span>•</span>
                    <span>{selectedInstitution.gradingSystem} Max CGPA Grading</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedInstitution.websiteUrl && (
                  <a
                    href={selectedInstitution.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Official Portal</span>
                  </a>
                )}
                <button
                  onClick={() => handleBreadcrumbClick('institutions')}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>All Institutions</span>
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center gap-3">
              <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <span className="font-bold">Motto:</span> "{selectedInstitution.motto}". Select any faculty or school below to navigate down to academic departments, accredited degree tracks, and curriculum courses.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Faculties, Colleges & Schools ({currentInstitutionFaculties.length})</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentInstitutionFaculties.map((fac, idx) => (
                <div
                  key={fac.id || idx}
                  onClick={() => handleSelectFaculty(fac)}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 cursor-pointer transition-all hover:shadow-md group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                        {fac.code || 'FAC'}
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {fac.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {fac.description || 'Academic faculties and specialized study divisions.'}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span>View Departments & Programmes</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DRILLDOWN LEVEL 2: FACULTY VIEW & DEPARTMENT SELECTION */}
      {currentLevel === 'faculty' && selectedInstitution && selectedFaculty && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold">
                  {selectedFaculty.code || 'FACULTY'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {selectedInstitution.name}
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                {selectedFaculty.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {selectedFaculty.description}
              </p>
            </div>

            <button
              onClick={() => handleBreadcrumbClick('institution')}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Faculties</span>
            </button>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Academic Departments ({currentFacultyDepartments.length})</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentFacultyDepartments.map(dept => (
                <div
                  key={dept.id}
                  onClick={() => handleSelectDepartment(dept)}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 cursor-pointer transition-all hover:shadow-md group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-black">
                        {dept.code}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      Department of {dept.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Undergraduate and accredited curriculum tracks for {dept.name}.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span>Explore Degree Programmes</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DRILLDOWN LEVEL 3: DEPARTMENT VIEW & PROGRAMME SELECTION */}
      {currentLevel === 'department' && selectedInstitution && selectedFaculty && selectedDepartment && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold">
                  {selectedDepartment.code}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {selectedFaculty.name} • {selectedInstitution.shortName}
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                Department of {selectedDepartment.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Choose an approved degree or diploma track to view semester course catalogues, past questions, and study materials.
              </p>
            </div>

            <button
              onClick={() => handleBreadcrumbClick('faculty')}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Departments</span>
            </button>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Programmes & Degree Tracks ({currentDepartmentProgrammes.length})</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentDepartmentProgrammes.map(prog => (
                <div
                  key={prog.id}
                  onClick={() => handleSelectProgramme(prog)}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 cursor-pointer transition-all hover:shadow-md group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-black border border-emerald-200 dark:border-emerald-800">
                        {prog.degreeType === 'ND' ? 'National Diploma Certificate (ND)' : prog.degreeType}
                      </span>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {prog.durationYears} Years Duration
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {prog.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Accredited curriculum with syllabus coverage from {prog.levels[0]} up to {prog.levels[prog.levels.length - 1]}.
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {prog.levels.map(lvl => (
                        <span key={lvl} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-semibold">
                          {lvl}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-between">
                    <span>Inspect Full Course Directory</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DRILLDOWN LEVEL 4: PROGRAMME VIEW & COURSE CATALOGUE */}
      {currentLevel === 'programme' && selectedInstitution && selectedFaculty && selectedDepartment && selectedProgramme && (
        <div className="space-y-6">
          {/* Programme Header */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 text-[10px] font-black">
                    {selectedProgramme.degreeType === 'ND' ? 'National Diploma Certificate (ND)' : selectedProgramme.degreeType}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {selectedInstitution.name} • {selectedDepartment.name}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {selectedProgramme.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Standard Nigerian Tertiary Institution Benchmark Curriculum
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSetStudentAcademicHierarchy}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Set as My Programme</span>
                </button>
                <button
                  onClick={() => handleBreadcrumbClick('department')}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              </div>
            </div>

            {/* Level & Semester Filters */}
            <div className="pt-2 flex flex-col md:flex-row md:items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1">Level:</span>
                {selectedProgramme.levels.map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setActiveLevelTab(lvl)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      activeLevelTab === lvl
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1">Semester:</span>
                <button
                  onClick={() => setActiveSemesterTab('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    activeSemesterTab === 'all'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveSemesterTab('First Semester (Harmattan)')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    activeSemesterTab === 'First Semester (Harmattan)'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  1st Sem (Harmattan)
                </button>
                <button
                  onClick={() => setActiveSemesterTab('Second Semester (Rain/Omega)')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    activeSemesterTab === 'Second Semester (Rain/Omega)'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  2nd Sem (Rain/Omega)
                </button>
              </div>
            </div>
          </div>

          {/* Courses List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Curriculum Courses for {activeLevelTab}</span>
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Official Regulatory Benchmark Curriculum
              </span>
            </div>

            {currentProgrammeCourses
              .filter(c => c.level === activeLevelTab)
              .filter(c => activeSemesterTab === 'all' || c.semester === activeSemesterTab)
              .length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <BookOpen className="w-8 h-8 mx-auto text-slate-400" />
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No courses listed for this exact filter</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Try switching semester filters or import new course data through the Admin Command Center Academic Importer.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentProgrammeCourses
                    .filter(c => c.level === activeLevelTab)
                    .filter(c => activeSemesterTab === 'all' || c.semester === activeSemesterTab)
                    .map(course => (
                      <div
                        key={course.id}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-sm transition-all space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs">
                                {course.courseCode}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold">
                                {course.creditUnit} Units
                              </span>
                            </div>

                            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium text-right">
                              {course.semester.includes('First') ? '1st Semester' : '2nd Semester'}
                            </span>
                          </div>

                          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                            {course.courseTitle}
                          </h4>

                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {course.courseDescription}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 flex-wrap text-xs">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setCurrentView('past_questions')}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1 transition-colors"
                            >
                              <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                              <span>Past Questions</span>
                            </button>
                            <button
                              onClick={() => setCurrentView('materials')}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1 transition-colors"
                            >
                              <BookMarked className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                              <span>Study Notes</span>
                            </button>
                          </div>

                          <button
                            onClick={() => handleAddCourseToPlanner(course)}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 transition-colors"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Add to Planner</span>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
          </div>
        </div>
      )}
        </>
      )}

    </div>
  );
};
