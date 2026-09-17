import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Trash2, 
  CheckCircle, 
  Sparkles, 
  FileText, 
  Users, 
  HelpCircle, 
  Award, 
  ArrowRight, 
  Filter,
  ShieldAlert,
  FolderPlus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CourseRecord } from '../types';
import { RequestAdditionModal } from './RequestAdditionModal';

export const MyCoursesCenter: React.FC = () => {
  const { 
    student, 
    courses, 
    enrollCourse, 
    unenrollCourse, 
    setCurrentView,
    setCourseRepModalOpen 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [additionModalOpen, setAdditionModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'enrolled' | 'browse'>('enrolled');

  const enrolledCodes = useMemo(() => {
    const raw = student.enrolledCourseCodes || ['CSC 301', 'CSC 302', 'MAT 301', 'GST 222'];
    return Array.from(new Set(raw));
  }, [student.enrolledCourseCodes]);

  // Full course objects for enrolled courses
  const enrolledCoursesList = useMemo(() => {
    return enrolledCodes.map(code => {
      const match = courses.find(c => c.courseCode === code);
      if (match) return match;
      return {
        id: `crs_${code}`,
        courseCode: code,
        courseTitle: `${code} General Academic Course`,
        creditUnit: 3,
        department: student.department,
        faculty: student.faculty,
        level: student.level,
        semester: 'Harmattan / First Semester',
        institutionId: student.institutionId,
        institutionName: student.institutionName,
        courseDescription: 'Core academic syllabus course.',
        status: 'Approved' as const
      };
    });
  }, [enrolledCodes, courses, student]);

  // Workload calculations
  const totalCreditUnits = useMemo(() => {
    return enrolledCoursesList.reduce((acc, c) => acc + (c.creditUnit || 2), 0);
  }, [enrolledCoursesList]);

  // Available courses to add (not yet enrolled)
  const availableToAdd = useMemo(() => {
    return courses.filter(c => !enrolledCodes.includes(c.courseCode)).filter(c => {
      if (levelFilter !== 'all' && c.level && !c.level.toLowerCase().includes(levelFilter.toLowerCase())) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          c.courseCode.toLowerCase().includes(q) ||
          c.courseTitle.toLowerCase().includes(q) ||
          (c.department && c.department.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [courses, enrolledCodes, levelFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white border-b border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Self-Service Course Directory</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                My Enrolled Courses & Academic Modules
              </h1>
              <p className="text-sm text-emerald-200 mt-1">
                Customize your academic curriculum for {student.department} • {student.level} • {student.institutionName}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setAdditionModalOpen(true)}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl text-sm transition border border-white/20 flex items-center space-x-2"
              >
                <FolderPlus className="w-4 h-4" />
                <span>Request New Course</span>
              </button>
              <button
                onClick={() => setActiveTab('browse')}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl text-sm shadow-md transition flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Courses</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-800/60">
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <span className="text-xs text-emerald-200 block">Enrolled Courses</span>
              <span className="text-2xl font-bold text-white">{enrolledCoursesList.length}</span>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <span className="text-xs text-emerald-200 block">Total Credit Workload</span>
              <span className="text-2xl font-bold text-white">{totalCreditUnits} Units</span>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <span className="text-xs text-emerald-200 block">Current Level</span>
              <span className="text-2xl font-bold text-emerald-300">{student.level}</span>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <span className="text-xs text-emerald-200 block">Grading Standard</span>
              <span className="text-2xl font-bold text-amber-300">{student.gradingSystem || '5.0'} Scale</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 gap-2">
          <button
            onClick={() => setActiveTab('enrolled')}
            className={`px-4 py-3 text-sm font-semibold border-b-2 flex items-center space-x-2 transition ${
              activeTab === 'enrolled'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>My Enrolled Courses ({enrolledCoursesList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-3 text-sm font-semibold border-b-2 flex items-center space-x-2 transition ${
              activeTab === 'browse'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Add More Courses ({availableToAdd.length} Available)</span>
          </button>
        </div>

        {/* Tab 1: Enrolled Courses */}
        {activeTab === 'enrolled' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {enrolledCoursesList.map((course, idx) => (
                <div
                  key={`${course.id || course.courseCode}_${idx}`}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/40 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs font-bold tracking-wide">
                            {course.courseCode}
                          </span>
                          <span className="text-xs font-semibold text-slate-500">
                            {course.creditUnit || 3} Credit Units
                          </span>
                          {course.level && (
                            <span className="text-xs text-slate-400">
                              • {course.level}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-2">
                          {course.courseTitle}
                        </h3>
                      </div>

                      <button
                        onClick={() => unenrollCourse(course.courseCode)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        title="Remove from my courses"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                      {course.courseDescription || 'Official curriculum benchmark course for departmental graduation requirement.'}
                    </p>
                  </div>

                  {/* 1-Click Action Buttons for this course */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setCurrentView('past_questions')}
                      className="px-3 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-200 text-xs font-medium rounded-xl transition flex items-center justify-center space-x-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Past Questions</span>
                    </button>

                    <button
                      onClick={() => setCurrentView('materials')}
                      className="px-3 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-200 text-xs font-medium rounded-xl transition flex items-center justify-center space-x-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                      <span>Study Notes</span>
                    </button>

                    <button
                      onClick={() => setCurrentView('copilot')}
                      className="px-3 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-slate-700 dark:text-slate-200 text-xs font-medium rounded-xl transition flex items-center justify-center space-x-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Ask AI Copilot</span>
                    </button>

                    <button
                      onClick={() => setCurrentView('community')}
                      className="px-3 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950 text-slate-700 dark:text-slate-200 text-xs font-medium rounded-xl transition flex items-center justify-center space-x-1.5"
                    >
                      <Users className="w-3.5 h-3.5 text-amber-500" />
                      <span>Study Groups</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Course Rep Application Banner */}
            <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-950 dark:text-emerald-100 text-base">
                    Are you the Course Representative for any of your courses?
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    Apply for verified Course Rep status to post class announcements, schedule revision labs, and coordinate with lecturers.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCourseRepModalOpen(true)}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl shrink-0 transition"
              >
                Apply for Course Rep Status
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Browse and Add Courses */}
        {activeTab === 'browse' && (
          <div className="space-y-6">
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search course code or title (e.g. CSC 305, PHY 102, MAT 201)..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm"
                />
              </div>

              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm"
              >
                <option value="all">All Levels</option>
                <option value="100">100 Level</option>
                <option value="200">200 Level</option>
                <option value="300">300 Level</option>
                <option value="400">400 Level</option>
                <option value="500">500 Level</option>
              </select>
            </div>

            {/* Available Courses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableToAdd.slice(0, 18).map((course, idx) => (
                <div
                  key={`${course.id || course.courseCode}_${idx}`}
                  className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-emerald-500/50 transition"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-emerald-700 dark:text-emerald-400">
                        {course.courseCode}
                      </span>
                      <span className="text-xs text-slate-400">
                        {course.creditUnit || 3} Units • {course.level || 'All'}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-1">
                      {course.courseTitle}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {course.department || student.department}
                    </p>
                  </div>

                  <button
                    onClick={() => enrollCourse(course.courseCode)}
                    className="mt-4 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition flex items-center justify-center space-x-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Enroll in Course</span>
                  </button>
                </div>
              ))}
            </div>

            {availableToAdd.length === 0 && (
              <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <p className="text-slate-500 text-sm">No courses matching your filter.</p>
                <button
                  onClick={() => setAdditionModalOpen(true)}
                  className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold"
                >
                  Request to Add This Course
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Addition Request Modal */}
      <RequestAdditionModal
        isOpen={additionModalOpen}
        onClose={() => setAdditionModalOpen(false)}
        initialType="course"
      />
    </div>
  );
};
