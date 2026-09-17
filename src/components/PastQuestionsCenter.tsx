import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PastQuestion, ResourceSourceType } from '../types';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Play, 
  RotateCcw, 
  Sparkles, 
  Award, 
  ChevronRight, 
  Building2,
  FileText,
  HelpCircle,
  BarChart3,
  ShieldCheck,
  Upload,
  Info,
  Download,
  AlertCircle,
  Plus,
  Eye,
  Globe,
  RefreshCw,
  Layers,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PastQuestionViewerModal } from './PastQuestionViewerModal';
import { AcademicBrowserSearchModal } from './AcademicBrowserSearchModal';

export const PastQuestionsCenter: React.FC = () => {
  const { 
    student, 
    pastQuestions, 
    addPastQuestion, 
    institutions, 
    setCurrentView, 
    addToast 
  } = useApp();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [institutionFilter, setInstitutionFilter] = useState('all');
  const [facultyFilter, setFacultyFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [semesterFilter, setSemesterFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [examTypeFilter, setExamTypeFilter] = useState('all');

  // Modals state
  const [viewingPq, setViewingPq] = useState<PastQuestion | null>(null);
  const [browserSearchOpen, setBrowserSearchOpen] = useState(false);
  const [browserSearchQuery, setBrowserSearchQuery] = useState('');

  // CBT Practice Mode State
  const [activePq, setActivePq] = useState<PastQuestion | null>(pastQuestions[0] || null);
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [activeExplainingIdx, setActiveExplainingIdx] = useState<number | null>(null);
  const [aiExplanationText, setAiExplanationText] = useState<string | null>(null);
  const [isExplainingAi, setIsExplainingAi] = useState(false);

  // Submit Past Question Modal
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newInstitution, setNewInstitution] = useState(student.institutionName);
  const [newDepartment, setNewDepartment] = useState(student.department);
  const [newLevel, setNewLevel] = useState(student.level);
  const [newSessionYear, setNewSessionYear] = useState('2023/2024');
  const [newSemester, setNewSemester] = useState<'First Semester (Harmattan)' | 'Second Semester (Rain/Omega)'>('First Semester (Harmattan)');
  const [newSourceType, setNewSourceType] = useState<ResourceSourceType>('student_submission');
  const [newSourceDesc, setNewSourceDesc] = useState('');
  const [copyrightAcknowledged, setCopyrightAcknowledged] = useState(false);

  // Dynamic filter collections
  const availableFaculties = useMemo(() => {
    const list = new Set<string>();
    pastQuestions.forEach(pq => {
      if (institutionFilter === 'all' || pq.institutionId === institutionFilter || pq.institutionName.toLowerCase().includes(institutionFilter.toLowerCase())) {
        if (pq.faculty) list.add(pq.faculty);
      }
    });
    return Array.from(list).sort();
  }, [pastQuestions, institutionFilter]);

  const availableDepartments = useMemo(() => {
    const list = new Set<string>();
    pastQuestions.forEach(pq => {
      const matchInst = institutionFilter === 'all' || pq.institutionId === institutionFilter || pq.institutionName.toLowerCase().includes(institutionFilter.toLowerCase());
      const matchFac = facultyFilter === 'all' || pq.faculty.toLowerCase() === facultyFilter.toLowerCase();
      if (matchInst && matchFac && pq.department) {
        list.add(pq.department);
      }
    });
    return Array.from(list).sort();
  }, [pastQuestions, institutionFilter, facultyFilter]);

  const availableCourses = useMemo(() => {
    const map = new Map<string, string>();
    pastQuestions.forEach(pq => {
      if (!map.has(pq.courseCode)) {
        map.set(pq.courseCode, pq.courseTitle);
      }
    });
    return Array.from(map.entries()).map(([code, title]) => ({ code, title })).sort((a, b) => a.code.localeCompare(b.code));
  }, [pastQuestions]);

  const availableYears = useMemo(() => {
    const list = new Set<string>();
    (pastQuestions || []).forEach(pq => {
      if (pq.sessionYear) list.add(pq.sessionYear);
    });
    return Array.from(list).sort().reverse();
  }, [pastQuestions]);

  const resetFilters = () => {
    setSearchQuery('');
    setInstitutionFilter('all');
    setFacultyFilter('all');
    setDepartmentFilter('all');
    setCourseFilter('all');
    setLevelFilter('all');
    setSemesterFilter('all');
    setYearFilter('all');
    setExamTypeFilter('all');
  };

  const filteredPqs = useMemo(() => {
    return (pastQuestions || []).filter(pq => {
      const matchSearch = pq.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pq.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pq.institutionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pq.department.toLowerCase().includes(searchQuery.toLowerCase());
      const matchInst = institutionFilter === 'all' || pq.institutionId === institutionFilter || pq.institutionName.toLowerCase().includes(institutionFilter.toLowerCase());
      const matchFaculty = facultyFilter === 'all' || (pq.faculty && pq.faculty.toLowerCase() === facultyFilter.toLowerCase());
      const matchDept = departmentFilter === 'all' || (pq.department && pq.department.toLowerCase() === departmentFilter.toLowerCase());
      const matchCourse = courseFilter === 'all' || pq.courseCode.toLowerCase() === courseFilter.toLowerCase();
      const matchYear = yearFilter === 'all' || pq.sessionYear === yearFilter;
      const matchLevel = levelFilter === 'all' || 
        pq.level === levelFilter ||
        (() => {
          const pNorm = (pq.level || '').toUpperCase().replace(/\s+/g, '');
          const fNorm = (levelFilter || '').toUpperCase().replace(/\s+/g, '');
          if (pNorm === fNorm) return true;
          if ((fNorm === 'ND1' || fNorm === 'NDI' || fNorm === '100L') && (pNorm === 'ND1' || pNorm === 'NDI' || pNorm === '100L')) return true;
          if ((fNorm === 'ND2' || fNorm === 'NDII' || fNorm === '200L') && (pNorm === 'ND2' || pNorm === 'NDII' || pNorm === '200L')) return true;
          if ((fNorm === 'HND1' || fNorm === 'HNDI' || fNorm === '300L') && (pNorm === 'HND1' || pNorm === 'HNDI' || pNorm === '300L')) return true;
          if ((fNorm === 'HND2' || fNorm === 'HNDII' || fNorm === '400L') && (pNorm === 'HND2' || pNorm === 'HNDII' || pNorm === '400L')) return true;
          return false;
        })();
      const matchSemester = semesterFilter === 'all' || pq.semester.toLowerCase().includes(semesterFilter.toLowerCase());
      const matchExamType = examTypeFilter === 'all' || pq.examType === examTypeFilter;
      return matchSearch && matchInst && matchFaculty && matchDept && matchCourse && matchYear && matchLevel && matchSemester && matchExamType;
    });
  }, [pastQuestions, searchQuery, institutionFilter, facultyFilter, departmentFilter, courseFilter, yearFilter, levelFilter, semesterFilter, examTypeFilter]);

  const handleDownloadDirectPaper = (pq: PastQuestion) => {
    let paperText = `================================================================================
                    ${pq.institutionName.toUpperCase()}
                   ${pq.faculty.toUpperCase()}
               DEPARTMENT OF ${pq.department.toUpperCase()}
================================================================================
EXAMINATION:      ${pq.sessionYear} ${pq.semester.toUpperCase()}
COURSE CODE:      ${pq.courseCode}
COURSE TITLE:     ${pq.courseTitle}
LEVEL:            ${pq.level}
TIME ALLOWED:     ${pq.timeAllowed || '2 Hours 30 Minutes'}
================================================================================
INSTRUCTIONS:
${pq.instructions || 'Answer ALL questions in Section A and any THREE in Section B. State all assumptions clearly.'}
================================================================================

SECTION A: OBJECTIVE / MULTIPLE CHOICE QUESTIONS
--------------------------------------------------------------------------------
`;
    if (pq.questions && pq.questions.length > 0) {
      pq.questions.forEach((q, idx) => {
        paperText += `\nQ${idx + 1}. ${q.question || q.questionText}\n`;
        if (q.options) {
          q.options.forEach((opt, oIdx) => {
            paperText += `   [${String.fromCharCode(65 + oIdx)}] ${opt}\n`;
          });
        }
      });
    }

    if (pq.theoryQuestions && pq.theoryQuestions.length > 0) {
      paperText += `\n\nSECTION B: THEORY & ESSAY PROBLEMS\n--------------------------------------------------------------------------------\n`;
      pq.theoryQuestions.forEach(tq => {
        paperText += `\nQUESTION ${tq.questionNumber} [${tq.marks} MARKS]:\n${tq.questionText}\n`;
      });
    }

    paperText += `\n\n================================================================================
SOURCE:           ${pq.source}
GENERATED BY:     StudentHub NG (Everything Student. One Platform.)
================================================================================`;

    const blob = new Blob([paperText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${pq.courseCode.replace(/\s+/g, '_')}_${pq.sessionYear.replace('/', '-')}_PastQuestion.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addToast('Past Question Downloaded', `Saved ${pq.courseCode} (${pq.sessionYear}) to your device.`, 'success');
  };

  const startPractice = (pq: PastQuestion) => {
    setActivePq(pq);
    setPracticeMode(true);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setShowResults(false);
    setAiExplanationText(null);
    addToast('CBT Mock Started', `Practice mode active for ${pq.courseCode} (${pq.sessionYear}). Good luck!`, 'info');
  };

  const handleSelectOption = (qIdx: number, optionIdx: number) => {
    setUserAnswers(prev => ({ ...prev, [qIdx]: optionIdx }));
  };

  const currentQuestions = activePq?.questions || [];
  const activeQuestion = currentQuestions[currentQuestionIdx];

  const calculateScore = () => {
    if (!activePq || !activePq.questions || activePq.questions.length === 0) {
      return { score: 0, total: 0, percentage: 0 };
    }
    let correct = 0;
    activePq.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctOption) {
        correct++;
      }
    });
    const percentage = Math.round((correct / activePq.questions.length) * 100);
    return { score: correct, total: activePq.questions.length, percentage };
  };

  const scoreData = calculateScore();

  const handleAskAiExplanation = async (questionIdx: number) => {
    const q = currentQuestions[questionIdx];
    if (!q) return;

    setActiveExplainingIdx(questionIdx);
    setIsExplainingAi(true);
    setAiExplanationText(null);

    try {
      const res = await fetch('/api/copilot/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q.question,
          options: q.options,
          correctOption: q.options ? q.options[q.correctOption || 0] : 'Standard derivation',
          courseCode: activePq?.courseCode
        })
      });
      const data = await res.json();
      if (data.explanation) {
        setAiExplanationText(data.explanation);
      } else {
        throw new Error('No AI response');
      }
    } catch (e) {
      setAiExplanationText(
        q.explanation ||
        `**Key Concept for ${activePq?.courseCode}:**\nThe correct answer is Option ${(q.correctOption ?? 0) + 1}. Under standard Nigerian departmental syllabi, this question assesses fundamental principles and boundary requirements.`
      );
    } finally {
      setIsExplainingAi(false);
    }
  };

  const handleSubmitNewPq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseCode.trim() || !newCourseTitle.trim()) {
      addToast('Missing Fields', 'Please provide course code and course title.', 'error');
      return;
    }
    if (!copyrightAcknowledged) {
      addToast('Copyright Declaration Required', 'Please acknowledge the educational fair-use declaration.', 'warning');
      return;
    }

    addPastQuestion({
      courseCode: newCourseCode.trim().toUpperCase(),
      courseTitle: newCourseTitle.trim(),
      institutionId: student.institutionId || 'unilag',
      institutionName: newInstitution || student.institutionName,
      faculty: student.faculty || 'Faculty of Science',
      department: newDepartment || student.department,
      programme: student.programme,
      level: newLevel,
      sessionYear: newSessionYear,
      academicYear: newSessionYear,
      semester: newSemester,
      examType: 'Semester Exam',
      questionCount: 15,
      downloadUrl: '#',
      rating: 4.8,
      source: newSourceDesc.trim() || 'Student Examination Paper Submission',
      sourceType: newSourceType,
      status: 'Pending',
      copyrightNotice: 'Educational fair-use review material submitted by verified student representative.'
    });

    setSubmitModalOpen(false);
    setNewCourseCode('');
    setNewCourseTitle('');
    setNewSourceDesc('');
    setCopyrightAcknowledged(false);
    addToast('Submission Received', 'Your past question has been sent to the Admin Command Center for verification.', 'success');
  };

  const getSourceBadge = (sourceType: ResourceSourceType) => {
    switch (sourceType) {
      case 'authorized_upload':
        return {
          label: 'Departmental Authorized',
          color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
        };
      case 'student_submission':
        return {
          label: 'Student Peer Submission',
          color: 'bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200 dark:border-blue-800'
        };
      case 'admin_approved':
        return {
          label: 'Admin Verified',
          color: 'bg-purple-50 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border-purple-200 dark:border-purple-800'
        };
      default:
        return {
          label: 'Public Archive',
          color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700'
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 text-white shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-black shadow-lg shadow-blue-500/30">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">Past Questions & Timed CBT Center</h1>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-500/30">
                Verified Syllabi
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Accredited semester past questions, timed mock tests, and AI worked solution step-throughs
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSubmitModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Submit Exam Paper</span>
          </button>
          <button
            onClick={() => setCurrentView('copilot')}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI Solver</span>
          </button>
        </div>
      </div>

      {/* CBT Practice Simulator Modal / Section */}
      {practiceMode && activePq && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-xl bg-blue-500 text-white font-black text-xs">
                {activePq.courseCode}
              </span>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {activePq.courseTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activePq.institutionName} • {activePq.sessionYear} ({activePq.semester})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPracticeMode(false)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Exit CBT Mode
              </button>
            </div>
          </div>

          {!showResults ? (
            <div className="space-y-6">
              {/* Question Navigation Bar */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {currentQuestions.map((_, idx) => {
                    const isAnswered = userAnswers[idx] !== undefined;
                    const isCurrent = idx === currentQuestionIdx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentQuestionIdx(idx)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                          isCurrent
                            ? 'bg-blue-600 text-white shadow-md'
                            : isAnswered
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Question {currentQuestionIdx + 1} of {currentQuestions.length}</span>
                </div>
              </div>

              {/* Active Question Display */}
              {activeQuestion ? (
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-4">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                    <span className="text-blue-600 dark:text-blue-400 font-extrabold mr-2">Q{currentQuestionIdx + 1}.</span>
                    {activeQuestion.question}
                  </h4>

                  {activeQuestion.options && (
                    <div className="space-y-2.5 pt-2">
                      {activeQuestion.options.map((opt, optIdx) => {
                        const isSelected = userAnswers[currentQuestionIdx] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(currentQuestionIdx, optIdx)}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-950 dark:text-blue-200 font-bold ring-2 ring-blue-500/20'
                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </div>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* AI Explanation / Solver Button */}
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-700/80 flex items-center justify-between flex-wrap gap-2">
                    <button
                      onClick={() => handleAskAiExplanation(currentQuestionIdx)}
                      disabled={isExplainingAi}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 hover:bg-emerald-100 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isExplainingAi ? 'AI Generating Solution...' : 'Explain with AI Copilot'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        disabled={currentQuestionIdx === 0}
                        onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40"
                      >
                        Previous
                      </button>
                      {currentQuestionIdx < currentQuestions.length - 1 ? (
                        <button
                          onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
                          className="px-4 py-1.5 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold"
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowResults(true)}
                          className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow-md"
                        >
                          Submit Test
                        </button>
                      )}
                    </div>
                  </div>

                  {/* AI Explanation Result Box */}
                  {aiExplanationText && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-emerald-950 text-emerald-100 text-xs space-y-2 leading-relaxed"
                    >
                      <div className="flex items-center gap-2 font-bold text-emerald-300">
                        <Sparkles className="w-4 h-4" />
                        <span>AI Step-by-Step Breakdown</span>
                      </div>
                      <p className="whitespace-pre-line">{aiExplanationText}</p>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 text-xs">
                  No interactive objective questions compiled for this paper yet. You can download the full PDF format below.
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-6">
              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center space-y-3">
                <Award className="w-12 h-12 mx-auto text-emerald-500" />
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Score: {scoreData.score} / {scoreData.total} ({scoreData.percentage}%)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  {scoreData.percentage >= 70 
                    ? 'Outstanding! You have mastered this past question module according to university marking schemes.'
                    : 'Good attempt! Review the worked solutions and explanation breakdowns below to reinforce key concepts.'}
                </p>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setUserAnswers({});
                      setCurrentQuestionIdx(0);
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Test</span>
                  </button>
                  <button
                    onClick={() => setPracticeMode(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs"
                  >
                    Back to All Papers
                  </button>
                </div>
              </div>

              {/* Review Answers */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Answer Review & Explanations</h4>
                {currentQuestions.map((q, idx) => {
                  const userChoice = userAnswers[idx];
                  const isCorrect = userChoice === q.correctOption;
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border text-xs space-y-2 ${
                        isCorrect
                          ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
                          : 'bg-rose-50/50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">
                          Q{idx + 1}. {q.question}
                        </span>
                        {isCorrect ? (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-white font-bold text-[10px] shrink-0">
                            Correct (+1)
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-rose-500 text-white font-bold text-[10px] shrink-0">
                            Incorrect
                          </span>
                        )}
                      </div>

                      {q.options && (
                        <div className="text-slate-600 dark:text-slate-300 space-y-1">
                          <div>Your Answer: <span className="font-bold">{userChoice !== undefined ? q.options[userChoice] : 'Not answered'}</span></div>
                          <div>Correct Answer: <span className="font-bold text-emerald-700 dark:text-emerald-400">{q.options[q.correctOption || 0]}</span></div>
                        </div>
                      )}

                      {q.explanation && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/50 dark:border-slate-800">
                          <span className="font-bold">Explanation:</span> {q.explanation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Comprehensive Academic Filter Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        {/* Top row: Search input + Search Browser Action button */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search past questions by course code, title, faculty, or department (e.g. GST 101, CSC 201, MAT 101, LAW 101)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <button
              onClick={() => {
                setBrowserSearchQuery(searchQuery || student.department || 'GST 101');
                setBrowserSearchOpen(true);
              }}
              className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all"
            >
              <Globe className="w-4 h-4" />
              <span>Search Every Browser for Resources</span>
            </button>

            {(searchQuery || institutionFilter !== 'all' || facultyFilter !== 'all' || departmentFilter !== 'all' || courseFilter !== 'all' || levelFilter !== 'all' || semesterFilter !== 'all' || yearFilter !== 'all') && (
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

        {/* Filters Grid: University/Polytechnic, Faculty, Department, Course, Level, Semester, Year */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 text-xs">
          {/* 1. University/Polytechnic Filter */}
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

          {/* 2. Faculty Filter */}
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

          {/* 3. Department Filter */}
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

          {/* 4. Course Filter */}
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

          {/* 5. Level Filter */}
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

          {/* 6. Semester Filter */}
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

          {/* 7. Year Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Year / Session
            </label>
            <select
              value={yearFilter}
              onChange={e => setYearFilter(e.target.value)}
              className="w-full px-2.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="all">All Years</option>
              {availableYears.map(yr => (
                <option key={yr} value={yr}>{yr}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Results Summary */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800/80 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-500" />
            <span>Showing <strong>{filteredPqs.length}</strong> official past exam papers matching criteria</span>
          </div>

          <button
            onClick={() => {
              setBrowserSearchQuery(searchQuery || student.department || 'GST 101');
              setBrowserSearchOpen(true);
            }}
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
          >
            <span>Can't find a paper? Search external browser archives</span>
            <Globe className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Past Questions Grid */}
      {filteredPqs.length === 0 ? (
        <div className="p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              No Past Questions Found in Repository
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We couldn't find questions matching your exact filter combination. You can instantly search all web browser repositories or clear your filters.
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
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20"
            >
              <Globe className="w-4 h-4" />
              <span>Search Every Browser for This Course</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(filteredPqs || []).map(pq => {
            const badge = getSourceBadge(pq.sourceType);
            return (
              <div
                key={pq.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-sm transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-xl bg-blue-600 text-white font-black text-xs shadow-sm">
                        {pq.courseCode}
                      </span>
                      <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold">
                        {pq.level}
                      </span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {pq.courseTitle}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {pq.institutionName} • {pq.department}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 flex-wrap">
                    <span>Year: <strong className="text-slate-700 dark:text-slate-300">{pq.sessionYear}</strong></span>
                    <span>•</span>
                    <span>{pq.semester.includes('First') ? '1st Semester' : '2nd Semester'}</span>
                    <span>•</span>
                    <span>{pq.questionCount} Questions</span>
                  </div>

                  {/* Source & Attribution Box */}
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <div className="line-clamp-2">
                      <span className="font-bold">Source:</span> {pq.source}
                    </div>
                  </div>

                  {/* Fair Use Notice */}
                  <div className="text-[10px] text-slate-400 italic">
                    {pq.copyrightNotice || 'Fair-use academic revision material.'}
                  </div>
                </div>

                {/* Card Action Buttons: View, Download, CBT, Search Web */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setViewingPq(pq)}
                      className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-500" />
                      <span>View Paper</span>
                    </button>

                    <button
                      onClick={() => handleDownloadDirectPaper(pq)}
                      className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Download</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startPractice(pq)}
                      className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Practice CBT</span>
                    </button>

                    <button
                      onClick={() => {
                        setBrowserSearchQuery(pq.courseCode);
                        setBrowserSearchOpen(true);
                      }}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                      title="Search Every Browser for resources on this course"
                    >
                      <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW PAST QUESTION MODAL */}
      <PastQuestionViewerModal
        pq={viewingPq}
        isOpen={!!viewingPq}
        onClose={() => setViewingPq(null)}
        onStartCbt={startPractice}
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
        initialCategory="Past Question"
      />

      {/* SUBMIT PAST QUESTION MODAL */}
      {submitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Submit Past Question</h3>
                  <p className="text-[11px] text-slate-500">Subject to Admin Command Center review</p>
                </div>
              </div>
              <button onClick={() => setSubmitModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitNewPq} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Course Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GST 101"
                    value={newCourseCode}
                    onChange={e => setNewCourseCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Session Year</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2023/2024"
                    value={newSessionYear}
                    onChange={e => setNewSessionYear(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Use of English & Communication Skills"
                  value={newCourseTitle}
                  onChange={e => setNewCourseTitle(e.target.value)}
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
                    <option value="student_submission">Student Representative Submission</option>
                    <option value="authorized_upload">Departmental Authorized Upload</option>
                    <option value="public_resource">Legitimate Public Resource</option>
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
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Source Details & Attribution</label>
                <input
                  type="text"
                  placeholder="e.g. Submitted by Class Governor, CSC Dept UNILAG (2023 Set)"
                  value={newSourceDesc}
                  onChange={e => setNewSourceDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                />
              </div>

              {/* Copyright Checkbox */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="copyright-check"
                  checked={copyrightAcknowledged}
                  onChange={e => setCopyrightAcknowledged(e.target.checked)}
                  className="mt-0.5 accent-blue-600 rounded"
                />
                <label htmlFor="copyright-check" className="text-[11px] text-slate-600 dark:text-slate-300 cursor-pointer">
                  I confirm that this submission is for non-commercial educational study & revision under fair use, and does not violate any proprietary testing service NDA.
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSubmitModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md shadow-blue-600/20"
                >
                  Submit Paper
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
};
