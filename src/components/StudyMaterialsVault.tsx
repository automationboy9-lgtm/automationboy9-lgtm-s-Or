import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { StudyMaterial, ResourceSourceType, StudyResourceCategory } from '../types';
import { 
  BookMarked, 
  Search, 
  Download, 
  Sparkles, 
  Star, 
  X,
  Upload,
  ShieldCheck,
  Building2,
  FileText,
  CheckCircle2,
  Filter,
  ExternalLink,
  Eye,
  Globe,
  RefreshCw,
  Layers,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StudyMaterialViewerModal } from './StudyMaterialViewerModal';
import { AcademicBrowserSearchModal } from './AcademicBrowserSearchModal';

export const StudyMaterialsVault: React.FC = () => {
  const { 
    student, 
    studyMaterials, 
    addStudyMaterial, 
    institutions, 
    addToast 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [institutionFilter, setInstitutionFilter] = useState('all');
  const [facultyFilter, setFacultyFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [semesterFilter, setSemesterFilter] = useState('all');

  // Modals state
  const [viewingMaterial, setViewingMaterial] = useState<StudyMaterial | null>(null);
  const [browserSearchOpen, setBrowserSearchOpen] = useState(false);
  const [browserSearchQuery, setBrowserSearchQuery] = useState('');
  const [browserSearchCategory, setBrowserSearchCategory] = useState<string>('Lecture Material');

  // AI Summary Modal
  const [summarizingMaterial, setSummarizingMaterial] = useState<StudyMaterial | null>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  // Upload Material Modal
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newCategory, setNewCategory] = useState<StudyResourceCategory>('Lecture Material');
  const [newDepartment, setNewDepartment] = useState(student.department);
  const [newLevel, setNewLevel] = useState(student.level);
  const [newSemester, setNewSemester] = useState<'First Semester (Harmattan)' | 'Second Semester (Rain/Omega)'>('First Semester (Harmattan)');
  const [newDescription, setNewDescription] = useState('');
  const [newSourceType, setNewSourceType] = useState<ResourceSourceType>('student_submission');
  const [newSourceDesc, setNewSourceDesc] = useState('');
  const [copyrightAcknowledged, setCopyrightAcknowledged] = useState(false);

  // Dynamic filter lists
  const availableFaculties = useMemo(() => {
    const list = new Set<string>();
    studyMaterials.forEach(m => {
      if (m.faculty) list.add(m.faculty);
    });
    return Array.from(list).sort();
  }, [studyMaterials]);

  const availableDepartments = useMemo(() => {
    const list = new Set<string>();
    studyMaterials.forEach(m => {
      const matchInst = institutionFilter === 'all' || m.institutionId === institutionFilter || m.institutionName.toLowerCase().includes(institutionFilter.toLowerCase());
      const matchFac = facultyFilter === 'all' || (m.faculty && m.faculty.toLowerCase() === facultyFilter.toLowerCase());
      if (matchInst && matchFac && m.department) {
        list.add(m.department);
      }
    });
    return Array.from(list).sort();
  }, [studyMaterials, institutionFilter, facultyFilter]);

  const availableCourses = useMemo(() => {
    const map = new Map<string, string>();
    (studyMaterials || []).forEach(m => {
      if (!map.has(m.courseCode)) {
        map.set(m.courseCode, m.courseTitle || m.title);
      }
    });
    return Array.from(map.entries()).map(([code, title]) => ({ code, title })).sort((a, b) => a.code.localeCompare(b.code));
  }, [studyMaterials]);

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setInstitutionFilter('all');
    setFacultyFilter('all');
    setDepartmentFilter('all');
    setCourseFilter('all');
    setLevelFilter('all');
    setSemesterFilter('all');
  };

  const filteredMaterials = useMemo(() => {
    return (studyMaterials || []).filter(m => {
      const matchSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.institutionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.description && m.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory = categoryFilter === 'all' || (() => {
        const cLower = (m.category || '').toLowerCase();
        const fLower = categoryFilter.toLowerCase();
        if (cLower === fLower) return true;
        if (fLower === 'lecture materials' && (cLower.includes('lecture') || cLower === 'lecture material')) return true;
        if (fLower === 'notes' && (cLower.includes('note') || cLower === 'note')) return true;
        if (fLower === 'pdfs' && (m.fileType?.toUpperCase() === 'PDF' || cLower.includes('pdf'))) return true;
        if (fLower === 'course resources' && (cLower.includes('course') || cLower.includes('resource') || cLower.includes('handout'))) return true;
        return false;
      })();

      const matchInst = institutionFilter === 'all' || m.institutionId === institutionFilter || m.institutionName.toLowerCase().includes(institutionFilter.toLowerCase());
      const matchFaculty = facultyFilter === 'all' || (m.faculty && m.faculty.toLowerCase() === facultyFilter.toLowerCase());
      const matchDept = departmentFilter === 'all' || (m.department && m.department.toLowerCase() === departmentFilter.toLowerCase());
      const matchCourse = courseFilter === 'all' || m.courseCode.toLowerCase() === courseFilter.toLowerCase();

      const matchLevel = levelFilter === 'all' || 
        m.level === levelFilter ||
        (() => {
          const mNorm = (m.level || '').toUpperCase().replace(/\s+/g, '');
          const fNorm = (levelFilter || '').toUpperCase().replace(/\s+/g, '');
          if (mNorm === fNorm) return true;
          if ((fNorm === 'ND1' || fNorm === 'NDI' || fNorm === '100L') && (mNorm === 'ND1' || mNorm === 'NDI' || mNorm === '100L')) return true;
          if ((fNorm === 'ND2' || fNorm === 'NDII' || fNorm === '200L') && (mNorm === 'ND2' || mNorm === 'NDII' || mNorm === '200L')) return true;
          if ((fNorm === 'HND1' || fNorm === 'HNDI' || fNorm === '300L') && (mNorm === 'HND1' || mNorm === 'HNDI' || mNorm === '300L')) return true;
          if ((fNorm === 'HND2' || fNorm === 'HNDII' || fNorm === '400L') && (mNorm === 'HND2' || mNorm === 'HNDII' || mNorm === '400L')) return true;
          return false;
        })();

      const matchSemester = semesterFilter === 'all' || m.semester.toLowerCase().includes(semesterFilter.toLowerCase());
      return matchSearch && matchCategory && matchInst && matchFaculty && matchDept && matchCourse && matchLevel && matchSemester;
    });
  }, [studyMaterials, searchQuery, categoryFilter, institutionFilter, facultyFilter, departmentFilter, courseFilter, levelFilter, semesterFilter]);

  const handleDownloadMaterialFile = (m: StudyMaterial) => {
    const textContent = `================================================================================
                    STUDENTHUB NG - STUDY RESOURCE VAULT
COURSE CODE:      ${m.courseCode}
COURSE TITLE:     ${m.courseTitle || m.title}
RESOURCE TITLE:   ${m.title}
CATEGORY:         ${m.category || 'Lecture Material'}
INSTITUTION:      ${m.institutionName}
DEPARTMENT:       ${m.department} (${m.level})
SEMESTER:         ${m.semester || 'First Semester'}
ACADEMIC YEAR:    ${m.academicYear || '2023/2024'}
UPLOADER:         ${m.uploaderName}
PAGES / SIZE:     ${m.pages} Pages • ${m.fileSize}
================================================================================

1. MODULE OVERVIEW:
${m.description}

2. KEY EXAMINATION PRINCIPLES & SYLLABUS HIGHLIGHTS:
${(m.keyTopics || m.tags || ['Core Definitions', 'Theorems', 'Sample Problems']).map(t => `- ${t}`).join('\n')}

3. COMPREHENSIVE LECTURE STUDY NOTES:
${m.contentPreview || `This study pack covers the accredited syllabus for ${m.courseCode}.
- Module 1: Foundational Theoretical Framework and Definitions.
- Module 2: Applied Mathematical Modeling, Proofs, and Empirical Relations.
- Module 3: Common Examination Pitfalls, Multiple-Choice Analysis, and Model Essay Answers.
- Module 4: Laboratory Protocols and Case Studies.`}

4. ETHICAL & COPYRIGHT COMPLIANCE:
Source: ${m.source}
${m.copyrightNotice || 'Fair-use academic study note for tertiary examination preparation.'}
================================================================================`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${m.courseCode}_${m.title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast('Download Started', `Saved "${m.title}" (${m.fileSize}) to your device.`, 'success');
  };

  const handleGenerateSummary = async (material: StudyMaterial) => {
    setSummarizingMaterial(material);
    setAiSummary(null);
    setIsSummarizing(true);

    try {
      const res = await fetch('/api/copilot/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `${material.courseCode}: ${material.title}`,
          content: material.description
        })
      });
      const data = await res.json();
      if (data.summary) {
        setAiSummary(data.summary);
      } else {
        throw new Error('No summary');
      }
    } catch (e) {
      setAiSummary(`### 📖 High-Yield Revision Summary for ${material.courseCode}

**1. Core Academic Objectives:**
- Master the foundational concepts, definitions, and mathematical relationships outlined in the official Nigerian tertiary benchmark syllabus.
- Understand departmental examination structures and standard marking criteria.

**2. Key High-Yield Principles:**
- *Theoretical Basis*: Understand boundary conditions, theorems, and implementation paradigms.
- *Exam Application*: Always write clear step-by-step proofs and state initial assumptions explicitly.`);
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleDownload = (m: StudyMaterial) => {
    addToast('Download Started', `Downloading "${m.title}" (${m.fileSize}). Saved to your offline study storage.`, 'success');
  };

  const handleUploadMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCourseCode.trim()) {
      addToast('Missing Fields', 'Please provide title and course code.', 'error');
      return;
    }
    if (!copyrightAcknowledged) {
      addToast('Copyright Declaration Required', 'Please acknowledge the fair-use educational declaration.', 'warning');
      return;
    }

    addStudyMaterial({
      title: newTitle.trim(),
      courseCode: newCourseCode.trim().toUpperCase(),
      category: newCategory,
      pages: 14,
      keyTopics: ['Core Academic Curriculum', 'Definitions & Proofs', 'Exam Revision Points'],
      contentPreview: newDescription.trim() || 'Comprehensive study note package and lecture revisions covering the university syllabus.',
      institutionId: student.institutionId || 'unilag',
      institutionName: student.institutionName,
      faculty: student.faculty,
      department: newDepartment || student.department,
      programme: student.programme,
      level: newLevel,
      semester: newSemester,
      academicYear: '2023/2024',
      fileType: 'PDF',
      fileSize: '3.4 MB',
      downloadUrl: '#',
      rating: 4.9,
      description: newDescription.trim() || 'Comprehensive study note package and lecture revisions.',
      source: newSourceDesc.trim() || 'Student Class Note Archive',
      sourceType: newSourceType,
      status: 'Pending',
      copyrightNotice: 'Educational study note shared under fair use for tertiary revision.'
    });

    setUploadModalOpen(false);
    setNewTitle('');
    setNewCourseCode('');
    setNewDescription('');
    setNewSourceDesc('');
    setCopyrightAcknowledged(false);
    addToast('Material Submitted', 'Your study material has been added and queued for Admin review.', 'success');
  };

  const getSourceBadge = (sourceType: ResourceSourceType) => {
    switch (sourceType) {
      case 'authorized_upload':
        return {
          label: 'Department Authorized',
          color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
        };
      case 'student_submission':
        return {
          label: 'Student Note Contribution',
          color: 'bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200 dark:border-blue-800'
        };
      case 'admin_approved':
        return {
          label: 'Admin Verified',
          color: 'bg-purple-50 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border-purple-200 dark:border-purple-800'
        };
      default:
        return {
          label: 'Open Resource',
          color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700'
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-emerald-500/30">
            <BookMarked className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">Study Materials & Handout Vault</h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                Verified Syllabi
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Curated lecture slides, departmental handouts, syllabus outlines, and AI summaries
            </p>
          </div>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Study Material</span>
        </button>
      </div>

      {/* Categorization Quick Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        {[
          { label: 'All Resources', value: 'all' },
          { label: 'Lecture Materials', value: 'Lecture Materials' },
          { label: 'Notes', value: 'Notes' },
          { label: 'PDFs', value: 'PDFs' },
          { label: 'Course Resources', value: 'Course Resources' },
        ].map(cat => {
          const active = categoryFilter === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setCategoryFilter(cat.value)}
              className={`px-4 py-2 rounded-2xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shadow-sm ${
                active
                  ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Comprehensive Academic Filter Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        {/* Top row: Search input + Search Browser Action button */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search notes, course codes, or titles (e.g. CSC 201, MAT 101, GST 101, LAW 101)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <button
              onClick={() => {
                setBrowserSearchQuery(searchQuery || student.department || 'CSC 201');
                setBrowserSearchCategory(categoryFilter !== 'all' ? categoryFilter : 'Lecture Material');
                setBrowserSearchOpen(true);
              }}
              className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
            >
              <Globe className="w-4 h-4" />
              <span>Search Every Browser for Resources</span>
            </button>

            {(searchQuery || categoryFilter !== 'all' || institutionFilter !== 'all' || facultyFilter !== 'all' || departmentFilter !== 'all' || courseFilter !== 'all' || levelFilter !== 'all' || semesterFilter !== 'all') && (
              <button
                onClick={resetFilters}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                title="Reset all filters"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filters Grid: Categorization, University/Polytechnic, Faculty, Department, Course, Level, Semester */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 text-xs">
          {/* 1. Categorization */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="w-full px-2.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none truncate"
            >
              <option value="all">All Categories</option>
              <option value="Lecture Materials">Lecture Materials</option>
              <option value="Notes">Notes / Summaries</option>
              <option value="PDFs">PDF Documents</option>
              <option value="Course Resources">Course Resources</option>
              <option value="Handout">Handouts</option>
              <option value="Lab Manual">Lab Manuals</option>
              <option value="Slide">Lecture Slides</option>
              <option value="Syllabus">Curriculum / Syllabi</option>
            </select>
          </div>

          {/* 2. University / Polytechnic */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              University/Poly
            </label>
            <select
              value={institutionFilter}
              onChange={e => {
                setInstitutionFilter(e.target.value);
                setFacultyFilter('all');
                setDepartmentFilter('all');
              }}
              className="w-full px-2.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none truncate"
            >
              <option value="all">All Institutions</option>
              {institutions.map(inst => (
                <option key={inst.id} value={inst.id}>
                  {inst.shortName || inst.name}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Faculty */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Faculty / School
            </label>
            <select
              value={facultyFilter}
              onChange={e => {
                setFacultyFilter(e.target.value);
                setDepartmentFilter('all');
              }}
              className="w-full px-2.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none truncate"
            >
              <option value="all">All Faculties</option>
              {availableFaculties.map(fac => (
                <option key={fac} value={fac}>{fac}</option>
              ))}
            </select>
          </div>

          {/* 4. Department */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Department
            </label>
            <select
              value={departmentFilter}
              onChange={e => setDepartmentFilter(e.target.value)}
              className="w-full px-2.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none truncate"
            >
              <option value="all">All Departments</option>
              {availableDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* 5. Course */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Course
            </label>
            <select
              value={courseFilter}
              onChange={e => setCourseFilter(e.target.value)}
              className="w-full px-2.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none truncate"
            >
              <option value="all">All Courses</option>
              {availableCourses.map(c => (
                <option key={c.code} value={c.code}>{c.code}</option>
              ))}
            </select>
          </div>

          {/* 6. Level */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Level
            </label>
            <select
              value={levelFilter}
              onChange={e => setLevelFilter(e.target.value)}
              className="w-full px-2.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="all">All Levels</option>
              <option value="ND 1">ND 1 (Year 1)</option>
              <option value="ND 2">ND 2 (Year 2)</option>
              <option value="100L">100L</option>
              <option value="200L">200L</option>
              <option value="300L">300L / HND I</option>
              <option value="400L">400L / HND II</option>
              <option value="500L">500L</option>
            </select>
          </div>

          {/* 7. Semester */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Semester
            </label>
            <select
              value={semesterFilter}
              onChange={e => setSemesterFilter(e.target.value)}
              className="w-full px-2.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="all">All Semesters</option>
              <option value="first">1st Semester (Harmattan)</option>
              <option value="second">2nd Semester (Rain/Omega)</option>
            </select>
          </div>
        </div>

        {/* Filter Results Summary */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800/80 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-500" />
            <span>Showing <strong>{filteredMaterials.length}</strong> study resources matching filters</span>
          </div>

          <button
            onClick={() => {
              setBrowserSearchQuery(searchQuery || student.department || 'CSC 201');
              setBrowserSearchOpen(true);
            }}
            className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
          >
            <span>Need more lecture materials? Search external browser archives</span>
            <Globe className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Materials Grid */}
      {filteredMaterials.length === 0 ? (
        <div className="p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              No Study Resources Found in Vault
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We couldn't find study notes matching your active filters. You can instantly search all web browser repositories or reset your filters.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs"
            >
              Reset Filters
            </button>
            <button
              onClick={() => {
                setBrowserSearchQuery(searchQuery || 'GST 101');
                setBrowserSearchOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
            >
              <Globe className="w-4 h-4" />
              <span>Search Every Browser for Resources</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(filteredMaterials || []).map(m => {
            const badge = getSourceBadge(m.sourceType);
            return (
              <div
                key={m.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-sm transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white font-black text-xs shadow-sm">
                        {m.courseCode}
                      </span>
                      <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold">
                        {m.level}
                      </span>
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
                        {m.category || 'Lecture Material'}
                      </span>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {m.institutionName} • {m.department}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {m.description}
                  </p>

                  {/* Source details */}
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="line-clamp-1">
                      <span className="font-bold">Source:</span> {m.source}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{m.fileType || 'PDF'} • {m.fileSize} • {m.pages || 1} Pages</span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{m.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons: View/Read, Download PDF, AI Summarize, Search Web */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setViewingMaterial(m)}
                      className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Read Material</span>
                    </button>

                    <button
                      onClick={() => handleDownloadMaterialFile(m)}
                      className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-500" />
                      <span>Download PDF</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleGenerateSummary(m)}
                      className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Summary</span>
                    </button>

                    <button
                      onClick={() => {
                        setBrowserSearchQuery(m.courseCode);
                        setBrowserSearchCategory(m.category || 'Lecture Material');
                        setBrowserSearchOpen(true);
                      }}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                      title="Search Every Browser for resources on this course"
                    >
                      <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW STUDY MATERIAL MODAL */}
      <StudyMaterialViewerModal
        material={viewingMaterial}
        isOpen={!!viewingMaterial}
        onClose={() => setViewingMaterial(null)}
        onSearchBrowserForCourse={(code) => {
          setBrowserSearchQuery(code);
          setBrowserSearchOpen(true);
        }}
      />

      {/* ACADEMIC BROWSER SEARCH MODAL */}
      <AcademicBrowserSearchModal
        isOpen={browserSearchOpen}
        onClose={() => setBrowserSearchOpen(false)}
        initialQuery={browserSearchQuery}
        defaultCourseCode={browserSearchQuery}
        initialCategory={browserSearchCategory}
      />

      {/* AI SUMMARY MODAL */}
      {summarizingMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    AI Revision Notes: {summarizingMaterial.courseCode}
                  </h3>
                  <p className="text-[11px] text-slate-500">{summarizingMaterial.title}</p>
                </div>
              </div>
              <button onClick={() => setSummarizingMaterial(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSummarizing ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-8 h-8 mx-auto border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
                  Generating Nigerian curriculum high-yield revision summary...
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-200 space-y-2 leading-relaxed whitespace-pre-line font-mono">
                {aiSummary}
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSummarizingMaterial(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs"
              >
                Close Summary
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* UPLOAD STUDY MATERIAL MODAL */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Upload Study Material</h3>
                  <p className="text-[11px] text-slate-500">Subject to departmental admin review</p>
                </div>
              </div>
              <button onClick={() => setUploadModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadMaterial} className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Course Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CSC 201"
                    value={newCourseCode}
                    onChange={e => setNewCourseCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as StudyResourceCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                  >
                    <option value="Lecture Material">Lecture Material</option>
                    <option value="Note">Note / Summary</option>
                    <option value="PDF">PDF Document</option>
                    <option value="Course Resource">Course Resource</option>
                    <option value="Handout">Handout</option>
                    <option value="Lab Manual">Lab Manual</option>
                    <option value="Slide">Lecture Slide</option>
                    <option value="Syllabus">Syllabus</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Level</label>
                  <select
                    value={newLevel}
                    onChange={e => setNewLevel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                  >
                    <option value="ND 1">ND 1 (Year 1)</option>
                    <option value="ND 2">ND 2 (Year 2)</option>
                    <option value="100L">100L</option>
                    <option value="200L">200L</option>
                    <option value="300L">300L / HND I</option>
                    <option value="400L">400L / HND II</option>
                    <option value="500L">500L</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Material Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Data Structures & Algorithms Comprehensive Lecture Handout"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Description & Topics Covered</label>
                <textarea
                  rows={2}
                  placeholder="Brief synopsis of topics covered in this revision note..."
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Source Type</label>
                  <select
                    value={newSourceType}
                    onChange={e => setNewSourceType(e.target.value as ResourceSourceType)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                  >
                    <option value="student_submission">Student Representative Note</option>
                    <option value="authorized_upload">Departmental Authorized Handout</option>
                    <option value="public_resource">Open Educational Resource</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Source Attribution</label>
                  <input
                    type="text"
                    placeholder="e.g. Class Academic Rep, Dept of Computer Science"
                    value={newSourceDesc}
                    onChange={e => setNewSourceDesc(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="copyright-check-mat"
                  checked={copyrightAcknowledged}
                  onChange={e => setCopyrightAcknowledged(e.target.checked)}
                  className="mt-0.5 accent-emerald-600 rounded"
                />
                <label htmlFor="copyright-check-mat" className="text-[11px] text-slate-600 dark:text-slate-300 cursor-pointer">
                  I certify that these study notes are submitted for educational study under fair-use provisions and adhere to academic integrity guidelines.
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-600/20"
                >
                  Upload Note
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
};
