import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Users, 
  Cpu, 
  Sparkles, 
  Activity, 
  Database, 
  Server, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw,
  Search,
  Lock,
  Building2,
  FolderTree,
  Layers,
  GraduationCap,
  BookOpen,
  Upload,
  FileSpreadsheet,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  FileCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AcademicImportResult } from '../types';

export const AdminCommandCenter: React.FC = () => {
  const { 
    student, 
    institutions, 
    faculties, 
    departments, 
    programmes, 
    courses, 
    pastQuestions, 
    studyMaterials,
    addInstitution,
    addCourse,
    deleteCourse,
    updatePastQuestionStatus,
    updateStudyMaterialStatus,
    importAcademicData,
    addToast,
    additionRequests,
    updateAdditionRequestStatus,
    courseRepApplications,
    updateCourseRepApplicationStatus,
    lecturerProfiles,
    updateLecturerVerificationStatus
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'academic' | 'importer' | 'moderation' | 'users' | 'ai_logs' | 'additions' | 'verifications'>('overview');
  const [additionFilter, setAdditionFilter] = useState<'all' | 'institution' | 'department' | 'course'>('all');
  const [additionStatusFilter, setAdditionStatusFilter] = useState<'all' | 'Pending Review' | 'Approved' | 'Declined'>('all');
  const [searchUser, setSearchUser] = useState('');
  const [courseSearch, setCourseSearch] = useState('');

  // Course Add Modal
  const [addCourseModal, setAddCourseModal] = useState(false);
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseUnits, setNewCourseUnits] = useState(3);
  const [newCourseLevel, setNewCourseLevel] = useState('100L');
  const [newCourseSemester, setNewCourseSemester] = useState<'First Semester (Harmattan)' | 'Second Semester (Rain/Omega)'>('First Semester (Harmattan)');
  const [newCourseDept, setNewCourseDept] = useState('Computer Science');
  const [newCourseInstId, setNewCourseInstId] = useState(institutions[0]?.id || 'unilag');
  const [newCourseDesc, setNewCourseDesc] = useState('');

  // Importer State
  const [importJsonText, setImportJsonText] = useState(`[
  {
    "courseCode": "CSC 301",
    "courseTitle": "Database Design & Management Systems",
    "creditUnit": 3,
    "institutionName": "University of Lagos",
    "institutionId": "unilag",
    "faculty": "Faculty of Science",
    "department": "Computer Science",
    "level": "300L",
    "semester": "First Semester (Harmattan)",
    "courseDescription": "Relational algebra, SQL query optimization, ER diagrams, normalization (1NF-BCNF), and transaction ACID properties."
  },
  {
    "courseCode": "CSC 302",
    "courseTitle": "Operating Systems & Kernel Architecture",
    "creditUnit": 3,
    "institutionName": "University of Lagos",
    "institutionId": "unilag",
    "faculty": "Faculty of Science",
    "department": "Computer Science",
    "level": "300L",
    "semester": "Second Semester (Rain/Omega)",
    "courseDescription": "Process management, CPU scheduling algorithms, virtual memory paging, deadlocks, and POSIX concurrency."
  }
]`);
  const [importResult, setImportResult] = useState<AcademicImportResult | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const [mockUsers] = useState([
    { id: 'usr_1', name: 'Chukwuebuka Obi', email: 'ebuka@student.unilag.edu.ng', institution: 'University of Lagos (UNILAG)', department: 'Computer Science', level: '300L', plan: 'Student Pro', status: 'Active' },
    { id: 'usr_2', name: 'Amina Yusuf', email: 'amina.yusuf@abu.edu.ng', institution: 'Ahmadu Bello University (ABU Zaria)', department: 'Electrical Engineering', level: '400L', plan: 'Student Free', status: 'Active' },
    { id: 'usr_3', name: 'Oluwaseun Adeleke', email: 'o.adeleke@ui.edu.ng', institution: 'University of Ibadan (UI)', department: 'Medicine & Surgery', level: '200L', plan: 'Student Pro', status: 'Active' },
    { id: 'usr_4', name: 'Blessing Okon', email: 'blessing@unn.edu.ng', institution: 'University of Nigeria, Nsukka (UNN)', department: 'Accountancy', level: '500L', plan: 'Student Pro', status: 'Active' },
    { id: 'usr_5', name: 'Femi Balogun', email: 'f.balogun@yabatech.edu.ng', institution: 'Yaba College of Technology (YABATECH)', department: 'Mechanical Engineering', level: 'HND II', plan: 'Student Free', status: 'Active' }
  ]);

  const filteredUsers = mockUsers.filter(u => 
    u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.institution.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  const filteredCourses = courses.filter(c => 
    c.courseCode.toLowerCase().includes(courseSearch.toLowerCase()) ||
    c.courseTitle.toLowerCase().includes(courseSearch.toLowerCase()) ||
    c.department.toLowerCase().includes(courseSearch.toLowerCase()) ||
    c.institutionName.toLowerCase().includes(courseSearch.toLowerCase())
  );

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseCode.trim() || !newCourseTitle.trim()) {
      addToast('Validation Error', 'Course code and title are required.', 'error');
      return;
    }

    const chosenInst = institutions.find(i => i.id === newCourseInstId) || institutions[0];

    addCourse({
      courseCode: newCourseCode.trim().toUpperCase(),
      courseTitle: newCourseTitle.trim(),
      creditUnit: Number(newCourseUnits),
      institutionId: chosenInst.id,
      institutionName: chosenInst.name,
      faculty: chosenInst.faculties[0] || 'Faculty of Science',
      department: newCourseDept,
      level: newCourseLevel,
      semester: newCourseSemester,
      courseDescription: newCourseDesc.trim() || `Curriculum benchmark course for ${newCourseCode.toUpperCase()}.`
    });

    setAddCourseModal(false);
    setNewCourseCode('');
    setNewCourseTitle('');
    setNewCourseDesc('');
    addToast('Course Added', `${newCourseCode.toUpperCase()} added to academic directory.`, 'success');
  };

  const handleRunImport = () => {
    setIsImporting(true);
    try {
      const parsed = JSON.parse(importJsonText);
      const result = importAcademicData(parsed);
      setImportResult(result);
      if (result.success) {
        addToast('Import Completed', `Successfully imported ${result.importedCount} courses.`, 'success');
      } else {
        addToast('Import Warning', `Imported ${result.importedCount} courses with ${result.failedCount} errors.`, 'warning');
      }
    } catch (e: any) {
      setImportResult({
        success: false,
        totalRecords: 0,
        importedCount: 0,
        failedCount: 1,
        duplicateCount: 0,
        errors: [{ row: 0, reason: `JSON Syntax Error: ${e.message}` }]
      });
      addToast('Import Failed', 'Please verify your JSON syntax structure.', 'error');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 text-white shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center font-black shadow-lg shadow-indigo-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">Admin Command Center</h1>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30 flex items-center gap-1">
                <Activity className="w-3 h-3 text-emerald-400" />
                Root Administrative Access
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Curriculum directory governance, batch academic data importer, resource moderation & telemetry
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 bg-white/10 p-1 rounded-2xl backdrop-blur-md overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('academic')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'academic' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Curriculum ({courses.length})
          </button>
          <button
            onClick={() => setActiveTab('importer')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'importer' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Data Importer
          </button>
          <button
            onClick={() => setActiveTab('moderation')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'moderation' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Moderation
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'users' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setActiveTab('additions')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeTab === 'additions' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>Addition Requests</span>
            {(additionRequests || []).filter(r => r.status === 'Pending Review').length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
                {(additionRequests || []).filter(r => r.status === 'Pending Review').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('verifications')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeTab === 'verifications' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>Role Verifications</span>
            {(courseRepApplications || []).filter(a => a.status === 'PENDING').length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-400 text-slate-950 text-[10px] font-black">
                {(courseRepApplications || []).filter(a => a.status === 'PENDING').length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Institutions</span>
                <Building2 className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{institutions.length}</div>
              <p className="text-[11px] text-slate-500">Universities, Poly & Colleges</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Accredited Courses</span>
                <BookOpen className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{courses.length}</div>
              <p className="text-[11px] text-slate-500">Active Syllabus Catalogues</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Past Exam Papers</span>
                <FileCheck className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{pastQuestions.length}</div>
              <p className="text-[11px] text-slate-500">Peer & Official Solutions</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Study Handouts</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{studyMaterials.length}</div>
              <p className="text-[11px] text-slate-500">Revision Notes & Guides</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-500" />
              <span>Nigerian Tertiary Academic Directory Governance</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              StudentHub NG maintains an official relational hierarchy schema (Institution → Faculty → Department → Programme → Level → Semester → Course). Use the <strong>Curriculum</strong> and <strong>Data Importer</strong> tabs to manage course metadata, update departmental credit allocations, and verify student submissions.
            </p>
          </div>
        </div>
      )}

      {/* CURRICULUM MANAGEMENT TAB */}
      {activeTab === 'academic' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search active courses by code, title, or department..."
                value={courseSearch}
                onChange={e => setCourseSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <button
              onClick={() => setAddCourseModal(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Single Course</span>
            </button>
          </div>

          {/* Courses Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5">Code</th>
                  <th className="p-3.5">Title</th>
                  <th className="p-3.5">Institution</th>
                  <th className="p-3.5">Department</th>
                  <th className="p-3.5">Level</th>
                  <th className="p-3.5">Units</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredCourses.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-black text-indigo-600 dark:text-indigo-400">{c.courseCode}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white max-w-xs truncate">{c.courseTitle}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{c.institutionName}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{c.department}</td>
                    <td className="p-3.5">{c.level}</td>
                    <td className="p-3.5 font-semibold">{c.creditUnit} U</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => {
                          deleteCourse(c.id);
                          addToast('Course Deleted', `${c.courseCode} was removed.`, 'info');
                        }}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DATA IMPORTER TAB */}
      {activeTab === 'importer' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Academic Curriculum Batch Importer
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Import institutional curriculum data in JSON schema. Validates course codes, unit allocations, and prevents duplicates.
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  JSON Curriculum Dataset Payload
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setImportJsonText(`[
  {
    "courseCode": "EEE 301",
    "courseTitle": "Signals and Linear Systems",
    "creditUnit": 3,
    "institutionName": "University of Lagos",
    "institutionId": "unilag",
    "faculty": "Faculty of Engineering",
    "department": "Electrical Engineering",
    "level": "300L",
    "semester": "First Semester (Harmattan)",
    "courseDescription": "Continuous and discrete Fourier transforms, Laplace domains, transfer functions, and convolution."
  }
]`);
                  }}
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                >
                  Load Sample Template
                </button>
              </div>

              <textarea
                rows={10}
                value={importJsonText}
                onChange={e => setImportJsonText(e.target.value)}
                className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-900 text-emerald-400 font-mono text-xs focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Required attributes: <code className="text-indigo-500 font-bold">courseCode</code>, <code className="text-indigo-500 font-bold">courseTitle</code>, <code className="text-indigo-500 font-bold">creditUnit</code>, <code className="text-indigo-500 font-bold">department</code>, <code className="text-indigo-500 font-bold">level</code>
              </div>

              <button
                onClick={handleRunImport}
                disabled={isImporting}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
              >
                <Upload className="w-4 h-4" />
                <span>{isImporting ? 'Validating & Importing...' : 'Execute Batch Import'}</span>
              </button>
            </div>
          </div>

          {/* Import Result Box */}
          {importResult && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-3xl border shadow-sm space-y-4 ${
                importResult.success
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
                  : 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {importResult.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  )}
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {importResult.success ? 'Batch Import Verified & Applied' : 'Import Partially Completed'}
                  </h4>
                </div>

                <div className="flex items-center gap-3 text-xs font-bold">
                  <span className="text-emerald-700 dark:text-emerald-400">{importResult.importedCount} Imported</span>
                  <span>•</span>
                  <span className="text-amber-700 dark:text-amber-400">{importResult.duplicateCount} Duplicates Skipped</span>
                  <span>•</span>
                  <span className="text-rose-700 dark:text-rose-400">{importResult.failedCount} Failed</span>
                </div>
              </div>

              {importResult.errors.length > 0 && (
                <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                  <div className="font-bold text-rose-600">Validation Warnings:</div>
                  {importResult.errors.map((err, idx) => (
                    <div key={idx} className="text-slate-600 dark:text-slate-400">
                      • Row {err.row}: {err.reason}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      )}

      {/* RESOURCE MODERATION TAB */}
      {activeTab === 'moderation' && (
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-blue-500" />
              <span>Past Exam Submissions Verification</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pastQuestions.map(pq => (
                <div
                  key={pq.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-blue-500 text-white font-bold text-xs">{pq.courseCode}</span>
                        <span className="text-xs text-slate-500">{pq.level}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1">{pq.courseTitle}</h4>
                      <p className="text-xs text-slate-500">{pq.institutionName} • {pq.sessionYear}</p>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      pq.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {pq.status || 'Approved'}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-300 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <span className="font-bold">Attribution:</span> {pq.source} ({pq.sourceType})
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => {
                        updatePastQuestionStatus(pq.id, 'Approved');
                        addToast('Paper Approved', `${pq.courseCode} marked as verified.`, 'success');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* USERS TAB */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Search registered students by name, email, or institution..."
              value={searchUser}
              onChange={e => setSearchUser(e.target.value)}
              className="w-full text-xs bg-transparent focus:outline-none text-slate-900 dark:text-white"
            />
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5">Student Name</th>
                  <th className="p-3.5">Institution</th>
                  <th className="p-3.5">Department</th>
                  <th className="p-3.5">Level</th>
                  <th className="p-3.5">Plan</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{u.name}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{u.institution}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">{u.department}</td>
                    <td className="p-3.5">{u.level}</td>
                    <td className="p-3.5"><span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold">{u.plan}</span></td>
                    <td className="p-3.5"><span className="text-emerald-600 font-bold">{u.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADDITION REQUESTS TAB */}
      {activeTab === 'additions' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span>Academic Directory Addition Queue</span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold">
                  {(additionRequests || []).length} Submissions
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                Students select from verified records during onboarding. If an institution, department or course is unavailable, their submission appears here for administrative verification and catalog provisioning.
              </p>
            </div>

            {/* Type & Status Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={additionFilter}
                onChange={e => setAdditionFilter(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
              >
                <option value="all">All Request Types</option>
                <option value="institution">Institutions Only</option>
                <option value="department">Departments Only</option>
                <option value="course">Courses Only</option>
              </select>

              <select
                value={additionStatusFilter}
                onChange={e => setAdditionStatusFilter(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
              >
                <option value="all">All Statuses</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Approved">Approved</option>
                <option value="Declined">Declined</option>
              </select>
            </div>
          </div>

          {/* Addition Requests Grid */}
          <div className="space-y-3">
            {(additionRequests || [])
              .filter(req => additionFilter === 'all' || req.type === additionFilter)
              .filter(req => additionStatusFilter === 'all' || req.status === additionStatusFilter)
              .map(req => (
                <div
                  key={req.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-slate-300 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <span className={`px-2.5 py-1 rounded-xl text-xs font-black uppercase tracking-wider ${
                        req.type === 'institution'
                          ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                          : req.type === 'department'
                          ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                          : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      }`}>
                        {req.type}
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {req.name} {req.code ? `(${req.code})` : ''}
                      </h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-slate-400">
                        {new Date(req.createdAt).toLocaleDateString()}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                        req.status === 'Approved'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : req.status === 'Declined'
                          ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                  </div>

                  {/* Submission Context Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50/70 dark:bg-slate-800/40 p-3 rounded-xl">
                    <div>
                      <span className="text-slate-400 block">Institution / Location:</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {req.institutionName || req.institutionState || 'Not specified'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Department / Faculty:</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {req.departmentName || req.facultyName || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Submitted By:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {req.submittedByName || 'Student'} ({req.submittedByEmail || 'No email'})
                      </span>
                    </div>
                  </div>

                  {/* Description / Syllabus */}
                  {req.description && (
                    <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-100/50 dark:bg-slate-800/30 p-2.5 rounded-xl">
                      <span className="font-bold text-slate-800 dark:text-slate-200">Justification / Syllabus Details: </span>
                      {req.description}
                    </div>
                  )}

                  {/* Admin Notes */}
                  {req.adminNotes && (
                    <p className="text-[11px] text-slate-400 italic">
                      Admin note: {req.adminNotes}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-2 pt-2">
                    {req.status !== 'Approved' && (
                      <button
                        onClick={() => {
                          updateAdditionRequestStatus(req.id, 'Approved', 'Approved and provisioned into verified curriculum catalog');
                          addToast('Request Approved', `${req.name} added to accredited catalog.`, 'success');
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve & Provision Record</span>
                      </button>
                    )}

                    {req.status !== 'Declined' && (
                      <button
                        onClick={() => {
                          updateAdditionRequestStatus(req.id, 'Declined', 'Declined: Duplicate or unaccredited record');
                          addToast('Request Declined', `${req.name} was marked as declined.`, 'info');
                        }}
                        className="px-3.5 py-1.5 rounded-xl border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-bold transition-colors"
                      >
                        Decline
                      </button>
                    )}

                    {req.status !== 'Pending Review' && (
                      <button
                        onClick={() => {
                          updateAdditionRequestStatus(req.id, 'Pending Review', 'Re-queued for investigation');
                          addToast('Status Updated', `${req.name} re-opened for review.`, 'info');
                        }}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        Reset to Pending
                      </button>
                    )}
                  </div>
                </div>
              ))}

            {(additionRequests || []).length === 0 && (
              <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  No Addition Requests Pending
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  When students encounter an unlisted tertiary institution, department, or course during onboarding, their submission will appear here for review.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ROLE VERIFICATIONS TAB */}
      {activeTab === 'verifications' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Academic Role Verification & RBAC Governance</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enforce strict separation between Students, Course Representatives, Lecturers, and Platform Administrators.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold rounded-lg border border-emerald-200 dark:border-emerald-800">
                  {courseRepApplications.length} Rep Applications
                </span>
                <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold rounded-lg border border-indigo-200 dark:border-indigo-800">
                  {lecturerProfiles.length} Faculty Profiles
                </span>
              </div>
            </div>
          </div>

          {/* Sub-section 1: Course Representative Applications */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span>Course Representative Endorsement Queue</span>
                <span className="text-xs text-slate-400">({courseRepApplications.length} total)</span>
              </h4>
            </div>

            <div className="space-y-3">
              {courseRepApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {app.courseCode}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        app.status === 'ACTIVE' || app.status === 'VERIFIED'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : app.status === 'PENDING'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                      }`}>
                        {app.status}
                      </span>
                      <span className="text-xs text-slate-400">
                        Applied: {new Date(app.applicationDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div>
                      <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                        {app.studentName} ({app.studentEmail})
                      </h5>
                      <p className="text-xs text-slate-500">
                        Matric: <strong>{app.matricNumber}</strong> • {app.departmentName} ({app.level}) • {app.institutionName}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                      <strong>Verification Statement:</strong> "{app.verificationInfo}"
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {app.status !== 'ACTIVE' && app.status !== 'VERIFIED' && (
                      <button
                        onClick={() => {
                          updateCourseRepApplicationStatus(app.id, 'ACTIVE');
                          addToast('Course Rep Approved', `${app.studentName} verified as Course Rep for ${app.courseCode}.`, 'success');
                        }}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve & Activate</span>
                      </button>
                    )}

                    {app.status !== 'REJECTED' && (
                      <button
                        onClick={() => {
                          updateCourseRepApplicationStatus(app.id, 'REJECTED');
                          addToast('Application Rejected', `Course Rep application for ${app.studentName} was rejected.`, 'info');
                        }}
                        className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300 rounded-xl text-xs font-bold transition border border-red-200 dark:border-red-900"
                      >
                        Reject
                      </button>
                    )}

                    {(app.status === 'ACTIVE' || app.status === 'VERIFIED') && (
                      <button
                        onClick={() => {
                          updateCourseRepApplicationStatus(app.id, 'SUSPENDED');
                          addToast('Rep Suspended', `${app.studentName}'s Course Rep privileges have been suspended.`, 'warning');
                        }}
                        className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 rounded-xl text-xs font-bold transition border border-amber-200 dark:border-amber-900"
                      >
                        Suspend Access
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-section 2: Lecturer Faculty Directory */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span>Verified Faculty & Lecturer Accounts</span>
                <span className="text-xs text-slate-400">({lecturerProfiles.length} verified)</span>
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lecturerProfiles.map((lec) => (
                <div
                  key={lec.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {lec.title} {lec.fullName}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                          {lec.verificationStatus}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {lec.departmentName} • {lec.institutionName}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {lec.email}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs space-y-1">
                    <div><strong>Courses Taught:</strong> {lec.coursesTaught.join(', ')}</div>
                    <div><strong>Office:</strong> {lec.officeLocation}</div>
                    <div><strong>Consultation:</strong> {lec.officeHours}</div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    {lec.verificationStatus !== 'VERIFIED' ? (
                      <button
                        onClick={() => {
                          updateLecturerVerificationStatus(lec.id, 'VERIFIED');
                          addToast('Lecturer Verified', `${lec.title} ${lec.fullName} has been granted Faculty privileges.`, 'success');
                        }}
                        className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700"
                      >
                        Grant Verified Access
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          updateLecturerVerificationStatus(lec.id, 'SUSPENDED');
                          addToast('Access Suspended', `${lec.title} ${lec.fullName} faculty access suspended.`, 'warning');
                        }}
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-semibold hover:bg-red-50 hover:text-red-600"
                      >
                        Suspend Faculty Access
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {addCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Add Curriculum Course</h3>
              <button onClick={() => setAddCourseModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Course Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CSC 301"
                    value={newCourseCode}
                    onChange={e => setNewCourseCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Credit Units</label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={newCourseUnits}
                    onChange={e => setNewCourseUnits(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Database Management Systems"
                  value={newCourseTitle}
                  onChange={e => setNewCourseTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Institution</label>
                  <select
                    value={newCourseInstId}
                    onChange={e => setNewCourseInstId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                  >
                    {institutions.map(i => (
                      <option key={i.id} value={i.id}>{i.shortName || i.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Department</label>
                  <input
                    type="text"
                    value={newCourseDept}
                    onChange={e => setNewCourseDept(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Level</label>
                  <select
                    value={newCourseLevel}
                    onChange={e => setNewCourseLevel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                  >
                    <option value="100L">100L / ND I</option>
                    <option value="200L">200L / ND II</option>
                    <option value="300L">300L / HND I</option>
                    <option value="400L">400L / HND II</option>
                    <option value="500L">500L</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Semester</label>
                  <select
                    value={newCourseSemester}
                    onChange={e => setNewCourseSemester(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                  >
                    <option value="First Semester (Harmattan)">1st Semester (Harmattan)</option>
                    <option value="Second Semester (Rain/Omega)">2nd Semester (Rain/Omega)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Course Description</label>
                <textarea
                  rows={2}
                  value={newCourseDesc}
                  onChange={e => setNewCourseDesc(e.target.value)}
                  placeholder="Official syllabus overview..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddCourseModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                >
                  Save Course
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
};
