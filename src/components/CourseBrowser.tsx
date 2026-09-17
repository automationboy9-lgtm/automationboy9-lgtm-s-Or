import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CourseRecord } from '../types';
import { 
  Search, 
  BookOpen, 
  Layers, 
  GraduationCap, 
  Calendar, 
  CheckCircle2, 
  Filter, 
  Plus, 
  ExternalLink, 
  Sparkles, 
  Download, 
  HelpCircle, 
  BookMarked, 
  Calculator, 
  SlidersHorizontal,
  FileSpreadsheet,
  X,
  ChevronRight,
  Info,
  Building2,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CourseBrowserProps {
  initialLevel?: string;
  initialDepartment?: string;
  initialQuery?: string;
  onSelectCourse?: (course: CourseRecord) => void;
  standalone?: boolean;
}

interface LevelCurriculumGroup {
  firstSem: CourseRecord[];
  secondSem: CourseRecord[];
  totalUnits: number;
}

export const CourseBrowser: React.FC<CourseBrowserProps> = ({
  initialLevel = 'all',
  initialDepartment = 'all',
  initialQuery = '',
  onSelectCourse,
  standalone = false
}) => {
  const { 
    courses, 
    setCurrentView, 
    addTask, 
    addToast,
    student
  } = useApp();

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [levelFilter, setLevelFilter] = useState(initialLevel);
  const [semesterFilter, setSemesterFilter] = useState('all');
  const [facultyFilter, setFacultyFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState(initialDepartment);
  const [unitFilter, setUnitFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table' | 'curriculum'>('grid');
  
  // Selected course detail modal
  const [selectedCourse, setSelectedCourse] = useState<CourseRecord | null>(null);

  // Distinct Levels present in dataset
  const availableLevels = useMemo(() => {
    const set = new Set<string>();
    courses.forEach(c => {
      if (c.level) set.add(c.level);
    });
    // Order logically
    const ordered = ['100L', '200L', '300L', '400L', '500L', 'ND 1', 'ND 2', 'ND I', 'ND II', 'HND 1', 'HND 2', 'HND I', 'HND II', 'NCE I', 'NCE II', 'NCE III'];
    return ordered.filter(l => set.has(l)).concat(Array.from(set).filter(l => !ordered.includes(l)));
  }, [courses]);

  // Distinct Faculties
  const availableFaculties = useMemo(() => {
    const set = new Set<string>();
    courses.forEach(c => {
      if (c.faculty) set.add(c.faculty);
    });
    return Array.from(set).sort();
  }, [courses]);

  // Filtered Courses calculation
  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchCode = c.courseCode.toLowerCase().includes(q);
        const matchTitle = c.courseTitle.toLowerCase().includes(q);
        const matchDesc = (c.courseDescription || '').toLowerCase().includes(q);
        const matchDept = (c.department || '').toLowerCase().includes(q);
        const matchFaculty = (c.faculty || '').toLowerCase().includes(q);
        const matchProg = (c.programme || '').toLowerCase().includes(q);
        if (!matchCode && !matchTitle && !matchDesc && !matchDept && !matchFaculty && !matchProg) {
          return false;
        }
      }

      // Level filter (exact match or equivalent ND 1/ND 2 year matching)
      if (levelFilter !== 'all') {
        const cNorm = (c.level || '').toUpperCase().replace(/\s+/g, '');
        const fNorm = (levelFilter || '').toUpperCase().replace(/\s+/g, '');
        const matchesExact = cNorm === fNorm;
        const matchesEquiv =
          ((fNorm === 'ND1' || fNorm === 'NDI' || fNorm === '100L') && (cNorm === 'ND1' || cNorm === 'NDI' || cNorm === '100L')) ||
          ((fNorm === 'ND2' || fNorm === 'NDII' || fNorm === '200L') && (cNorm === 'ND2' || cNorm === 'NDII' || cNorm === '200L')) ||
          ((fNorm === 'HND1' || fNorm === 'HNDI' || fNorm === '300L') && (cNorm === 'HND1' || cNorm === 'HNDI' || cNorm === '300L')) ||
          ((fNorm === 'HND2' || fNorm === 'HNDII' || fNorm === '400L') && (cNorm === 'HND2' || cNorm === 'HNDII' || cNorm === '400L'));

        if (!matchesExact && !matchesEquiv) {
          return false;
        }
      }

      // Semester filter
      if (semesterFilter !== 'all') {
        if (semesterFilter === 'First' && !c.semester.toLowerCase().includes('first')) return false;
        if (semesterFilter === 'Second' && !c.semester.toLowerCase().includes('second')) return false;
      }

      // Faculty filter
      if (facultyFilter !== 'all' && c.faculty.toLowerCase() !== facultyFilter.toLowerCase()) {
        return false;
      }

      // Department filter
      if (departmentFilter !== 'all' && !c.department.toLowerCase().includes(departmentFilter.toLowerCase())) {
        return false;
      }

      // Credit unit filter
      if (unitFilter !== 'all') {
        const num = parseInt(unitFilter, 10);
        if (unitFilter === '4+' && c.creditUnit < 4) return false;
        if (unitFilter !== '4+' && c.creditUnit !== num) return false;
      }

      return true;
    });
  }, [courses, searchQuery, levelFilter, semesterFilter, facultyFilter, departmentFilter, unitFilter]);

  // Grouped by level for Curriculum view
  const groupedByLevel = useMemo<Record<string, LevelCurriculumGroup>>(() => {
    const groups: Record<string, LevelCurriculumGroup> = {};
    
    filteredCourses.forEach(c => {
      const lvl = c.level || 'Other';
      if (!groups[lvl]) {
        groups[lvl] = { firstSem: [], secondSem: [], totalUnits: 0 };
      }
      if (c.semester.toLowerCase().includes('first')) {
        groups[lvl].firstSem.push(c);
      } else {
        groups[lvl].secondSem.push(c);
      }
      groups[lvl].totalUnits += c.creditUnit;
    });

    return groups;
  }, [filteredCourses]);

  // Actions
  const handleAddToPlanner = (course: CourseRecord) => {
    addTask({
      title: `Study Session: ${course.courseCode} - ${course.courseTitle}`,
      courseCode: course.courseCode,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      dueTime: '10:00 AM',
      type: 'study-session',
      priority: 'medium',
      isCompleted: false,
      notes: `Curriculum: ${course.department} (${course.level}) - ${course.creditUnit} Units.`
    });
    addToast('Added to Planner', `${course.courseCode} study session added to your schedule.`, 'success');
  };

  const handleExportCSV = () => {
    const headers = ['Course Code', 'Course Title', 'Credit Unit', 'Level', 'Semester', 'Faculty', 'Department', 'Description'];
    const rows = filteredCourses.map(c => [
      `"${c.courseCode}"`,
      `"${c.courseTitle.replace(/"/g, '""')}"`,
      c.creditUnit,
      `"${c.level}"`,
      `"${c.semester}"`,
      `"${c.faculty}"`,
      `"${c.department}"`,
      `"${(c.courseDescription || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Nigerian_Curriculum_Courses_${levelFilter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('Curriculum Exported', `Downloaded ${filteredCourses.length} courses to CSV file.`, 'info');
  };

  return (
    <div className={`space-y-6 ${standalone ? 'max-w-7xl mx-auto px-4 py-8' : ''}`}>
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 text-white relative overflow-hidden shadow-xl border border-emerald-500/20">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <GraduationCap className="w-3.5 h-3.5" />
              NUC CCMAS / BMAS & NBTE Unified Academic Standards
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Universal Course Search & Curriculum Explorer
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore accredited university, polytechnic, and college curricula from <strong>100 Level to 400L/500L</strong>, ND, HND, and NCE across all Nigerian tertiary institutions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-2 border border-white/10 backdrop-blur-sm"
              title="Download filtered curriculum as CSV"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Quick Level Navigation Pills */}
        <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-xs font-bold text-slate-300 shrink-0 mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            Quick Levels:
          </span>
          <button
            onClick={() => setLevelFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
              levelFilter === 'all'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            All ({courses.length})
          </button>
          {availableLevels.map(lvl => {
            const count = courses.filter(c => c.level.toLowerCase() === lvl.toLowerCase()).length;
            const isSelected = levelFilter.toLowerCase() === lvl.toLowerCase();
            return (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                <span>{lvl}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-black/20 text-white' : 'bg-black/30 text-emerald-300'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Multifaceted Filtering Bar */}
      <div className="p-4 md:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Main Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by course code (e.g. CSC 101, GST 111, LAW 201), title, keywords or topic..."
              className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* View Mode Switches */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0 self-stretch md:self-auto justify-center">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode('curriculum')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'curriculum'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              <span>Curriculum Tree</span>
            </button>
          </div>
        </div>

        {/* Detailed Filters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          {/* Level Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Academic Level
            </label>
            <select
              value={levelFilter}
              onChange={e => setLevelFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Academic Levels</option>
              {availableLevels.map(lvl => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>

          {/* Semester Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Semester
            </label>
            <select
              value={semesterFilter}
              onChange={e => setSemesterFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Semesters</option>
              <option value="First">First Semester (Harmattan / Alpha)</option>
              <option value="Second">Second Semester (Rain / Omega)</option>
            </select>
          </div>

          {/* Faculty / Discipline */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Faculty / Discipline
            </label>
            <select
              value={facultyFilter}
              onChange={e => setFacultyFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Faculties & Schools</option>
              {availableFaculties.map(fac => (
                <option key={fac} value={fac}>{fac}</option>
              ))}
            </select>
          </div>

          {/* Credit Units */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Credit Units
            </label>
            <select
              value={unitFilter}
              onChange={e => setUnitFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">Any Credit Units</option>
              <option value="1">1 Unit</option>
              <option value="2">2 Units</option>
              <option value="3">3 Units</option>
              <option value="4+">4+ Units (Heavy)</option>
            </select>
          </div>
        </div>

        {/* Results summary and Active Filters Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
          <div>
            Showing <strong className="text-slate-900 dark:text-white">{filteredCourses.length}</strong> accredited courses
            {levelFilter !== 'all' && <span> for <strong>{levelFilter}</strong></span>}
            {semesterFilter !== 'all' && <span> in <strong>{semesterFilter} Semester</strong></span>}
          </div>

          {(searchQuery || levelFilter !== 'all' || semesterFilter !== 'all' || facultyFilter !== 'all' || unitFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setLevelFilter('all');
                setSemesterFilter('all');
                setFacultyFilter('all');
                setDepartmentFilter('all');
                setUnitFilter('all');
              }}
              className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Courses Rendering */}
      {filteredCourses.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <BookOpen className="w-10 h-10 mx-auto text-slate-400" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No courses match this filter</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Try broadening your search term or choosing "All Academic Levels" to view courses from 100L to 400L.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setLevelFilter('all');
              setSemesterFilter('all');
              setFacultyFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Header with Code and Level */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-mono font-black text-xs border border-emerald-500/20">
                      {course.courseCode}
                    </span>
                    <span className="ml-2 text-xs font-extrabold text-slate-500 dark:text-slate-400">
                      {course.creditUnit} {course.creditUnit === 1 ? 'Unit' : 'Units'}
                    </span>
                  </div>

                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold">
                    {course.level}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {course.courseTitle}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    <span>{course.department}</span>
                    <span>•</span>
                    <span className="line-clamp-1">{course.faculty}</span>
                  </div>
                </div>

                {course.courseDescription && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {course.courseDescription}
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <span className="text-[10px] font-semibold text-slate-400 line-clamp-1">
                  {course.semester}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToPlanner(course);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors"
                    title="Add to Study Planner"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCourse(course);
                    }}
                    className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-1"
                  >
                    Details
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : viewMode === 'table' ? (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 uppercase font-black tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Course Title</th>
                  <th className="px-3 py-3">Units</th>
                  <th className="px-3 py-3">Level</th>
                  <th className="px-4 py-3">Department & Faculty</th>
                  <th className="px-4 py-3">Semester</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredCourses.map(course => (
                  <tr 
                    key={course.id}
                    onClick={() => setSelectedCourse(course)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {course.courseCode}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                      {course.courseTitle}
                    </td>
                    <td className="px-3 py-3 font-extrabold text-slate-700 dark:text-slate-300">
                      {course.creditUnit}
                    </td>
                    <td className="px-3 py-3">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold">
                        {course.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-[11px]">
                      {course.department}
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-[11px]">
                      {course.semester}
                    </td>
                    <td className="px-4 py-3 text-right" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleAddToPlanner(course)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] hover:bg-emerald-600 hover:text-white transition-all"
                        >
                          + Plan
                        </button>
                        <button
                          onClick={() => setSelectedCourse(course)}
                          className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Curriculum Tree View */
        <div className="space-y-6">
          {(Object.entries(groupedByLevel) as [string, LevelCurriculumGroup][]).map(([lvl, data]) => (
            <div key={lvl} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-sm">
                    {lvl}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      {lvl} Curriculum Outline
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Standard Benchmark Courses for Nigerian Higher Institutions
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Total Workload: </span>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{data.totalUnits} Credit Units</span>
                </div>
              </div>

              {/* 2 Semesters Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* First Semester */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      First Semester (Harmattan)
                    </span>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      {(data.firstSem || []).reduce((acc, c) => acc + c.creditUnit, 0)} Units ({(data.firstSem || []).length} Courses)
                    </span>
                  </div>

                  {(data.firstSem || []).length === 0 ? (
                    <p className="text-xs text-slate-400 italic py-2">No courses registered for first semester.</p>
                  ) : (
                    <div className="space-y-2">
                      {(data.firstSem || []).map(course => (
                        <div
                          key={course.id}
                          onClick={() => setSelectedCourse(course)}
                          className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 cursor-pointer transition-all flex items-center justify-between gap-3 shadow-xs"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-black text-xs text-emerald-600 dark:text-emerald-400">
                                {course.courseCode}
                              </span>
                              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                                {course.courseTitle}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-400">{course.department}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold shrink-0">
                            {course.creditUnit} U
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Second Semester */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-xs font-black uppercase tracking-wider text-blue-700 dark:text-blue-400">
                      Second Semester (Rain)
                    </span>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      {(data.secondSem || []).reduce((acc, c) => acc + c.creditUnit, 0)} Units ({(data.secondSem || []).length} Courses)
                    </span>
                  </div>

                  {(data.secondSem || []).length === 0 ? (
                    <p className="text-xs text-slate-400 italic py-2">No courses registered for second semester.</p>
                  ) : (
                    <div className="space-y-2">
                      {(data.secondSem || []).map(course => (
                        <div
                          key={course.id}
                          onClick={() => setSelectedCourse(course)}
                          className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 cursor-pointer transition-all flex items-center justify-between gap-3 shadow-xs"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-black text-xs text-blue-600 dark:text-blue-400">
                                {course.courseCode}
                              </span>
                              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                                {course.courseTitle}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-400">{course.department}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold shrink-0">
                            {course.creditUnit} U
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Course Detail Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto space-y-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-mono font-black text-sm border border-emerald-500/20">
                      {selectedCourse.courseCode}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs">
                      {selectedCourse.level}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-emerald-100 dark:border-emerald-900">
                      {selectedCourse.creditUnit} Credit Units
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-1">
                    {selectedCourse.courseTitle}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Semester</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedCourse.semester}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Faculty</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedCourse.faculty}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Department</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedCourse.department}</span>
                </div>
              </div>

              {/* Course Description & Syllabus */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-emerald-500" />
                  Course Syllabus & Learning Objectives
                </h4>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-200/80 dark:border-slate-700/80">
                  {selectedCourse.courseDescription || 'Standard NUC CCMAS/BMAS curriculum outline with theoretical principles, problem-solving, laboratory practicals, and tutorial exercises.'}
                </div>
              </div>

              {/* Quick Actions for this course */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Academic Tools for {selectedCourse.courseCode}
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={() => {
                      handleAddToPlanner(selectedCourse);
                      setSelectedCourse(null);
                    }}
                    className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-200 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all flex items-center gap-2.5 text-left"
                  >
                    <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold">Add to Study Planner</div>
                      <div className="text-[10px] opacity-75 font-normal">Schedule weekly revision slots</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCourse(null);
                      setCurrentView('copilot');
                    }}
                    className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 text-purple-800 dark:text-purple-200 text-xs font-bold hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-all flex items-center gap-2.5 text-left"
                  >
                    <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                    <div>
                      <div className="font-bold">Ask AI Study Copilot</div>
                      <div className="text-[10px] opacity-75 font-normal">Explain topics & generate quizzes</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCourse(null);
                      setCurrentView('past_questions');
                    }}
                    className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-800 dark:text-blue-200 text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-all flex items-center gap-2.5 text-left"
                  >
                    <BookMarked className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-bold">Practice Past Questions</div>
                      <div className="text-[10px] opacity-75 font-normal">Test knowledge with CBT questions</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCourse(null);
                      setCurrentView('materials');
                    }}
                    className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-200 text-xs font-bold hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-all flex items-center gap-2.5 text-left"
                  >
                    <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <div className="font-bold">Study Materials & Notes</div>
                      <div className="text-[10px] opacity-75 font-normal">Download verified handouts & PDFs</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseBrowser;
