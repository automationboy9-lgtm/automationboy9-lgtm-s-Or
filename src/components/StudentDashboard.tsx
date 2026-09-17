import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { SAMPLE_PAST_QUESTIONS, SAMPLE_STUDY_MATERIALS, SAMPLE_TIMETABLE } from '../data/mockData';
import { 
  GraduationCap, 
  Sparkles, 
  BookOpen, 
  Calculator, 
  Calendar, 
  Clock, 
  Award, 
  TrendingUp, 
  Flame, 
  ArrowRight, 
  FolderKanban, 
  Users, 
  Building2, 
  Plus,
  Play,
  Download,
  Send,
  CheckCircle2,
  BookmarkCheck,
  Compass,
  FileText,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Hash
} from 'lucide-react';
import { motion } from 'motion/react';
import { CourseRecord } from '../types';

export const StudentDashboard: React.FC<{
  onOpenProfile?: () => void;
  onOpenSubscription?: () => void;
}> = ({ onOpenProfile, onOpenSubscription }) => {
  const { 
    student, 
    setCurrentView, 
    tasks, 
    toggleTaskCompleted, 
    semesters, 
    courses: globalCourses,
    pastQuestions: globalPastQuestions,
    studyMaterials: globalStudyMaterials,
    setSubscriptionOpen,
    studyGroups,
    savedCopilotNotes,
    addToast
  } = useApp();

  const [quickAiInput, setQuickAiInput] = useState('');

  const pendingTasks = (tasks || []).filter(t => !t.isCompleted);

  // 1. Personalized Enrolled Courses
  const enrolledCourses = useMemo(() => {
    const list = globalCourses || [];
    const rawCodes: string[] = student.enrolledCourseCodes || [];
    const enrolledCodes: string[] = Array.from(new Set(rawCodes));

    if (enrolledCodes.length > 0) {
      const seen = new Set<string>();
      const matched: any[] = [];
      for (const code of enrolledCodes) {
        if (seen.has(code)) continue;
        const found = list.find(c => c.courseCode === code);
        if (found) {
          seen.add(code);
          matched.push(found);
        } else {
          seen.add(code);
          matched.push({
            id: `crs_${code}`,
            courseCode: code,
            courseTitle: `${code} Course`,
            creditUnit: 3,
            institutionId: student.institutionId,
            institutionName: student.institutionName,
            department: student.department,
            level: student.level,
            semester: 'First Semester (Harmattan)'
          });
        }
      }
      if (matched.length > 0) return matched;
    }

    // Check semester courses
    if (semesters && semesters.length > 0 && semesters[0].courses.length > 0) {
      const seen = new Set<string>();
      const semCourses: any[] = [];
      for (const sc of semesters[0].courses) {
        if (!seen.has(sc.courseCode)) {
          seen.add(sc.courseCode);
          semCourses.push({
            id: sc.id || `sem_crs_${sc.courseCode}`,
            courseCode: sc.courseCode,
            courseTitle: sc.courseTitle,
            creditUnit: sc.units || sc.creditUnit || 3,
            institutionId: student.institutionId,
            institutionName: student.institutionName,
            department: student.department,
            level: student.level,
            semester: 'First Semester (Harmattan)'
          });
        }
      }
      return semCourses;
    }

    // Fallback to department courses
    const deptNorm = (student.department || '').toLowerCase();
    const seen = new Set<string>();
    const deptCourses: any[] = [];
    for (const c of list) {
      if (seen.has(c.courseCode)) continue;
      if (
        (c.department || '').toLowerCase().includes(deptNorm) ||
        (student.level && (c.level || '').includes(student.level))
      ) {
        seen.add(c.courseCode);
        deptCourses.push(c);
        if (deptCourses.length >= 5) break;
      }
    }

    return deptCourses;
  }, [globalCourses, student, semesters]);

  // 2. Personalized Past Questions (Matching enrolled courses or department)
  const personalizedPastQuestions = useMemo(() => {
    const allPq = globalPastQuestions && globalPastQuestions.length > 0 
      ? globalPastQuestions 
      : SAMPLE_PAST_QUESTIONS;
    
    const enrolledCodes = student.enrolledCourseCodes || [];
    const deptNorm = (student.department || '').toLowerCase();

    // Prioritize enrolled courses
    const matched = allPq.filter(pq => 
      enrolledCodes.includes(pq.courseCode) ||
      (pq.department && pq.department.toLowerCase().includes(deptNorm)) ||
      (pq.institutionName && pq.institutionName.toLowerCase().includes((student.institutionName || '').toLowerCase()))
    );

    if (matched.length >= 3) return matched.slice(0, 5);
    return allPq.slice(0, 5);
  }, [globalPastQuestions, student]);

  // 3. Personalized Study Materials
  const personalizedMaterials = useMemo(() => {
    const allMats = globalStudyMaterials && globalStudyMaterials.length > 0 
      ? globalStudyMaterials 
      : SAMPLE_STUDY_MATERIALS;

    const enrolledCodes = student.enrolledCourseCodes || [];
    const deptNorm = (student.department || '').toLowerCase();

    const matched = allMats.filter(m => 
      enrolledCodes.includes(m.courseCode) ||
      (m.department && m.department.toLowerCase().includes(deptNorm))
    );

    if (matched.length >= 2) return matched.slice(0, 4);
    return allMats.slice(0, 4);
  }, [globalStudyMaterials, student]);

  // 4. Personalized AI Copilot Recommendation Prompts
  const copilotRecommendations = useMemo(() => {
    const prompts: { label: string; prompt: string; tag: string }[] = [];

    if (enrolledCourses.length > 0) {
      const topCourse = enrolledCourses[0];
      prompts.push({
        label: `Explain core concepts in ${topCourse.courseCode}`,
        prompt: `Explain the fundamental concepts and exam tips for ${topCourse.courseCode}: ${topCourse.courseTitle} in simple, step-by-step terms with Nigerian tertiary curriculum examples.`,
        tag: topCourse.courseCode
      });

      if (enrolledCourses.length > 1) {
        const secondCourse = enrolledCourses[1];
        prompts.push({
          label: `Generate 5 practice exam questions for ${secondCourse.courseCode}`,
          prompt: `Generate 5 standard exam practice questions with detailed worked solutions for ${secondCourse.courseCode} (${secondCourse.courseTitle}) based on Nigerian university syllabus.`,
          tag: 'Exam Prep'
        });
      }
    }

    if (student.academicInterests && student.academicInterests.length > 0) {
      const interest = student.academicInterests[0];
      prompts.push({
        label: `Research breakthroughs in ${interest}`,
        prompt: `Provide a structured academic summary of recent trends and industry applications in ${interest} for an undergraduate student.`,
        tag: 'Research'
      });
    } else {
      prompts.push({
        label: 'CBT Exam Strategy & Time Allocation',
        prompt: 'Give me proven strategies for acing Nigerian university and polytechnic CBT and theory examinations.',
        tag: 'Strategy'
      });
    }

    return prompts;
  }, [enrolledCourses, student]);

  // 5. Personalized Reading Groups
  const personalizedGroups = useMemo(() => {
    const list = studyGroups || [];
    const deptNorm = (student.department || '').toLowerCase();
    const instNorm = (student.institutionName || '').toLowerCase();

    return list.filter(g => 
      (g.department && g.department.toLowerCase().includes(deptNorm)) ||
      (g.institution && g.institution.toLowerCase().includes(instNorm)) ||
      g.category === 'Past Questions' ||
      g.category === 'Exam Prep'
    ).slice(0, 4);
  }, [studyGroups, student]);

  const handleQuickAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickAiInput.trim()) return;
    setCurrentView('copilot');
  };

  const handleLaunchPrompt = (promptText: string) => {
    // Navigate to copilot with recommended prompt
    setCurrentView('copilot');
  };

  return (
    <section className="flex-1 p-6 sm:p-8 bg-slate-50 dark:bg-slate-950 space-y-8 min-h-full">
      
      {/* Top Welcome & Actions Row */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Student Avatar */}
            {student.avatarUrl ? (
              <img
                src={student.avatarUrl}
                alt={student.fullName}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shadow-md shrink-0 mt-1"
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-black text-xl border-2 border-emerald-500 shrink-0 mt-1">
                {student.fullName ? student.fullName.charAt(0).toUpperCase() : 'S'}
              </div>
            )}
            
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Authenticated Student Portal</span>
                </div>
                {student.username && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-mono font-semibold">
                    {student.username}
                  </span>
                )}
                {student.academicSession && (
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-[11px] font-bold">
                    {student.academicSession} Session
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Welcome back, {student.fullName}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
                Your personalized academic workspace for <strong>{student.department || 'Computer Science'}</strong> at {student.institutionName || 'University of Lagos'}.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button 
              onClick={() => setCurrentView('my_courses')}
              className="px-3.5 py-2 bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-300 shadow-xs hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>My Courses</span>
            </button>
            <button 
              onClick={() => setCurrentView('my_library')}
              className="px-3.5 py-2 bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800 rounded-xl text-xs sm:text-sm font-bold text-purple-800 dark:text-purple-300 shadow-xs hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors flex items-center gap-1.5"
            >
              <BookmarkCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>My Library</span>
            </button>
            <button 
              onClick={onOpenProfile}
              className="px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
            >
              <span>Edit Profile</span>
            </button>
            <button 
              onClick={() => setCurrentView('copilot')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Study Ask</span>
            </button>
          </div>
        </div>

        {/* Authenticated Student Academic Profile Badge */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          {/* Institution */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Institution
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate" title={student.institutionName}>
                {student.institutionName || 'University of Lagos'}
              </p>
            </div>
          </div>

          {/* Department */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Department
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate" title={student.department}>
                {student.department || 'Computer Science'}
              </p>
            </div>
          </div>

          {/* Programme */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Programme
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate" title={student.programme}>
                {student.programme || 'B.Sc Computer Science'}
              </p>
            </div>
          </div>

          {/* Level & Session */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Level & Session
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate">
                {student.level || '100L'} • {student.academicSession || '2024/2025'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Self-Service Course Rep & Departmental Ecosystem Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 dark:from-slate-900 dark:via-emerald-950/20 dark:to-slate-900 border border-emerald-200/80 dark:border-emerald-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                Self-Service Departmental Workspace: {student.department} ({student.level})
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300">
                Self-Configured
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Manage your registered semester courses, build personal collections in your library, or verify as an authorized class representative.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <button
            onClick={() => setCurrentView('my_courses')}
            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition"
          >
            Manage Courses ({enrolledCourses.length})
          </button>
          <button
            onClick={() => setCurrentView('course_rep')}
            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-sm"
          >
            Course Rep Portal
          </button>
        </div>
      </div>

      {/* 4-Column Professional Polish Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Enrolled Courses */}
        <div 
          onClick={() => setCurrentView('gpa_calculator')}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 rounded-lg text-base flex items-center justify-center">
              📖
            </div>
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider group-hover:text-emerald-600 transition-colors">
              VIEW TIMETABLE
            </span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            {enrolledCourses.length || 4}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Enrolled Courses</p>
        </div>

        {/* Card 2: Current CGPA */}
        <div 
          onClick={() => setCurrentView('gpa_calculator')}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-lg text-base flex items-center justify-center">
              📈
            </div>
            <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400">
              {student.currentCgpa >= 4.5 ? 'First Class' : student.currentCgpa >= 3.5 ? '2nd Class Upper' : '+0.12'}
            </span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            {student.currentCgpa.toFixed(2)}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Current CGPA ({student.gradingSystem})</p>
        </div>

        {/* Card 3: AI Credits Left */}
        <div 
          onClick={() => setCurrentView('copilot')}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 rounded-lg text-base flex items-center justify-center">
              💡
            </div>
            <span className="text-xs font-bold text-purple-500 dark:text-purple-400">
              {student.studyStreakDays}d streak
            </span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            24
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">AI Copilot Credits</p>
        </div>

        {/* Card 4: Community Study Circles */}
        <div 
          onClick={() => setCurrentView('community')}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 rounded-lg text-base flex items-center justify-center">
              👥
            </div>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider group-hover:underline">
              COMMUNITY
            </span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            {personalizedGroups.length || (studyGroups || []).length || 6}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Department Study Circles</p>
        </div>

      </div>

      {/* PERSONALIZED ENROLLED COURSES SECTION */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/50 dark:bg-slate-800/40">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Your Enrolled Courses ({enrolledCourses.length})</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personalized based on your registered {student.department} curriculum for {student.level}.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('gpa_calculator')}
            className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider hover:underline flex items-center gap-1"
          >
            <span>Manage Courses & GPA</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrolledCourses.map((course, idx) => (
            <div
              key={`${course.id || course.courseCode}_${idx}`}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all group space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono font-black text-xs px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {course.courseCode}
                </span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  {course.creditUnit || 3} Credit Units
                </span>
              </div>

              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 transition-colors" title={course.courseTitle}>
                  {course.courseTitle}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {course.semester || 'First Semester (Harmattan)'}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => setCurrentView('past_questions')}
                  className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Practice Exams</span>
                </button>
                <button
                  onClick={() => setCurrentView('copilot')}
                  className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-purple-500" />
                  <span>Ask AI</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: 2 Cols for Recent Content & 1 Col for Side Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Span) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Recent Past Questions Archive Block (Personalized) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/40">
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <span>Recommended Past Examination Papers</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                    For {student.department || 'Your Department'}
                  </span>
                </h3>
              </div>
              <button 
                onClick={() => setCurrentView('past_questions')}
                className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider hover:underline"
              >
                EXPLORE ARCHIVE
              </button>
            </div>
            
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {personalizedPastQuestions.map(pq => (
                <div 
                  key={pq.id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-mono font-bold text-xs">
                      PDF
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {pq.courseCode}: {pq.courseTitle}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {pq.sessionYear} Session • {pq.semester} • {pq.institutionName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setCurrentView('past_questions')}
                      className="text-emerald-600 dark:text-emerald-400 text-sm font-bold hover:underline"
                    >
                      Practice
                    </button>
                    <button 
                      onClick={() => setCurrentView('past_questions')}
                      className="hidden sm:inline-block text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 text-xs font-semibold"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Access Tools Grid */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <span>Nigerian Tertiary Portals & Quick Hubs</span>
              </h3>
              <span className="text-xs text-slate-400 font-medium">NUC • NBTE • NCCE</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => setCurrentView('institutions')}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50/50 dark:bg-slate-800/40 text-left transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Building2 className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">Institutions</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">160+ Accredited</p>
              </button>

              <button
                onClick={() => setCurrentView('project_center')}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50/50 dark:bg-slate-800/40 text-left transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <FolderKanban className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">Project Hub</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Topic & Research</p>
              </button>

              <button
                onClick={() => setCurrentView('past_questions')}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50/50 dark:bg-slate-800/40 text-left transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">Past Questions</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">CBT & Solutions</p>
              </button>

              <button
                onClick={() => setCurrentView('community')}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50/50 dark:bg-slate-800/40 text-left transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">Study Circles</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Peer Collaboration</p>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column (1 Span) */}
        <div className="space-y-6">
          
          {/* AI Study Copilot Promo & Quick Question Box */}
          <div className="bg-emerald-950 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg border border-emerald-900/60">
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span>AI Study Copilot</span>
                  <span className="px-1.5 py-0.5 text-[9px] font-black rounded bg-emerald-400 text-emerald-950">Multi-Source</span>
                </h3>
                {savedCopilotNotes && savedCopilotNotes.length > 0 && (
                  <span className="text-[10px] font-bold text-emerald-300 bg-white/10 px-2 py-0.5 rounded-full">
                    {savedCopilotNotes.length} saved notes
                  </span>
                )}
              </div>
              <p className="text-emerald-200 text-xs mb-3 leading-relaxed">
                4 Academic Engines: <strong>StudentHub DB</strong>, <strong>Gemini</strong>, <strong>ChatGPT</strong> & <strong>Web Research</strong>.
              </p>
              <form onSubmit={handleQuickAsk} className="flex gap-2">
                <input 
                  type="text" 
                  value={quickAiInput}
                  onChange={e => setQuickAiInput(e.target.value)}
                  placeholder="Ask anything or enter a course code..." 
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs w-full text-white placeholder:text-emerald-300 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
                <button 
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 p-2 rounded-lg text-sm font-bold flex items-center justify-center transition-transform hover:scale-105 shrink-0"
                  aria-label="Send Query"
                >
                  ➜
                </button>
              </form>

              {/* Personalized AI Prompt Recommendations */}
              <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block">
                  Recommended For Your Courses:
                </span>
                <div className="space-y-1.5">
                  {copilotRecommendations.map((rec, i) => (
                    <button
                      key={i}
                      onClick={() => handleLaunchPrompt(rec.prompt)}
                      className="w-full text-left p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] text-emerald-100 transition-colors flex items-center justify-between gap-2"
                    >
                      <span className="truncate">{rec.label}</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 shrink-0">
                        {rec.tag}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-emerald-300">
                <span className="flex items-center gap-1">
                  <span>⚡ Instant Step-by-Step Solver</span>
                </span>
                <button
                  onClick={() => setCurrentView('copilot')}
                  className="font-bold hover:underline flex items-center gap-0.5"
                >
                  <span>Launch Copilot</span>
                  <span>➜</span>
                </button>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Department Reading Groups Widget */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-600" />
                <span>Reading Groups</span>
              </h3>
              <button
                onClick={() => setCurrentView('community')}
                className="text-xs font-bold text-teal-600 hover:underline"
              >
                Join More
              </button>
            </div>

            <div className="space-y-2.5">
              {personalizedGroups.map(grp => (
                <div
                  key={grp.id}
                  onClick={() => setCurrentView('community')}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-teal-500 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                      {grp.name}
                    </h4>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                      {grp.memberCount} members
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {grp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 dark:text-white">Upcoming Deadlines</h3>
              <span className="text-xs font-bold text-slate-400">
                {pendingTasks.length} PENDING
              </span>
            </div>

            <div className="space-y-4">
              {(tasks || []).slice(0, 3).map((task, idx) => (
                <div key={task.id} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    idx === 0 ? 'bg-red-500' : idx === 1 ? 'bg-orange-400' : 'bg-emerald-500'
                  }`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                      {task.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Due {task.dueDate} • {task.courseCode}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setCurrentView('past_questions')}
              className="w-full mt-6 text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase hover:underline transition-colors py-1 text-center flex items-center justify-center gap-1"
            >
              <span>Explore Exam Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </section>
  );
};
