import React, { useState, useMemo } from 'react';
import { 
  X, 
  Award, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText, 
  Building, 
  BookOpen, 
  Send, 
  HelpCircle,
  ShieldCheck,
  Upload,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CourseRecord } from '../types';

interface BecomeCourseRepModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourseCode?: string;
}

export const BecomeCourseRepModal: React.FC<BecomeCourseRepModalProps> = ({
  isOpen,
  onClose,
  preselectedCourseCode
}) => {
  const { 
    student, 
    courses, 
    courseRepApplications, 
    submitCourseRepApplication, 
    setCurrentView 
  } = useApp();

  // Find existing application if any
  const existingApp = useMemo(() => {
    return courseRepApplications.find(a => a.userId === student.id || a.studentEmail === student.email);
  }, [courseRepApplications, student.id, student.email]);

  const [selectedCourseCode, setSelectedCourseCode] = useState(
    preselectedCourseCode || student.enrolledCourseCodes?.[0] || 'CSC 301'
  );
  const [matricNumber, setMatricNumber] = useState(student.matricNumber || '');
  const [verificationInfo, setVerificationInfo] = useState(
    'Elected departmental Course Representative by class assembly and approved by the course lecturer.'
  );
  const [academicSession, setAcademicSession] = useState(student.academicSession || '2024/2025');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Find course details
  const matchedCourse = useMemo(() => {
    return courses.find(c => c.courseCode === selectedCourseCode) || {
      id: `crs_${selectedCourseCode}`,
      courseCode: selectedCourseCode,
      courseTitle: `${selectedCourseCode} Course Space`,
      creditUnit: 3,
      department: student.department,
      faculty: student.faculty,
      level: student.level,
      institutionId: student.institutionId,
      institutionName: student.institutionName,
      status: 'Approved' as const
    };
  }, [courses, selectedCourseCode, student]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!matricNumber.trim()) {
      setError('Please provide your verified matriculation number.');
      return;
    }
    if (!verificationInfo.trim() || verificationInfo.trim().length < 20) {
      setError('Please provide a brief statement (at least 20 characters) explaining your appointment or election as Course Rep.');
      return;
    }

    submitCourseRepApplication({
      userId: student.id,
      studentName: student.fullName,
      studentEmail: student.email,
      matricNumber: matricNumber.trim(),
      institutionId: student.institutionId,
      institutionName: student.institutionName,
      facultyName: student.faculty,
      departmentName: student.department,
      programmeName: student.programme,
      level: student.level,
      courseCode: selectedCourseCode,
      courseTitle: matchedCourse.courseTitle,
      academicSession,
      verificationInfo: verificationInfo.trim()
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        id="become-course-rep-modal"
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Award className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Course Representative Application</h2>
              <p className="text-xs text-emerald-200">
                Official verification for academic leadership on StudentHub NG
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Status Display if already active or pending */}
          {existingApp && !submitted && (
            <div className={`mb-6 p-4 rounded-xl border ${
              existingApp.status === 'ACTIVE' || existingApp.status === 'VERIFIED'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : existingApp.status === 'PENDING'
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                : 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-900 dark:text-red-200'
            }`}>
              <div className="flex items-start space-x-3">
                {existingApp.status === 'ACTIVE' || existingApp.status === 'VERIFIED' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                ) : existingApp.status === 'PENDING' ? (
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                )}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Current Application Status:</span>
                    <span className="px-2 py-0.5 text-xs font-bold uppercase rounded-full bg-white dark:bg-slate-800 border">
                      {existingApp.status}
                    </span>
                  </div>
                  <p className="text-sm mt-1">
                    Course: <strong>{existingApp.courseCode}</strong> ({existingApp.courseTitle})
                  </p>
                  <p className="text-xs mt-1 opacity-80">
                    Applied on: {new Date(existingApp.applicationDate).toLocaleDateString()} • Session: {existingApp.academicSession}
                  </p>
                  {(existingApp.status === 'ACTIVE' || existingApp.status === 'VERIFIED') && (
                    <button
                      onClick={() => {
                        onClose();
                        setCurrentView('course_rep');
                      }}
                      className="mt-3 inline-flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Open Course Rep Dashboard</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                Application Submitted Successfully!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto">
                Your request to become the verified Course Representative for <strong>{selectedCourseCode}</strong> has been received by academic administrators. You will be notified once reviewed.
              </p>
              <div className="mt-6 flex justify-center space-x-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onClose();
                    setCurrentView('dashboard');
                  }}
                  className="px-5 py-2.5 bg-emerald-700 text-white rounded-xl text-sm font-semibold hover:bg-emerald-800 transition"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Responsibility Info Banner */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                <div className="flex items-center space-x-1.5 font-semibold text-slate-900 dark:text-slate-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Verified Course Representative Role</span>
                </div>
                <p>
                  Course Representatives post authorized class announcements, coordinate reading groups, and liaise with course lecturers on test schedules and materials. Course Reps are not administrators.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-600 dark:text-red-400 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Institution and Department Context */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Institution:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {student.institutionName}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Department & Level:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {student.department} • {student.level}
                  </span>
                </div>
              </div>

              {/* Course Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Course for Representative Status:
                </label>
                <select
                  value={selectedCourseCode}
                  onChange={(e) => setSelectedCourseCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {Array.from(new Set(student.enrolledCourseCodes || ['CSC 301', 'CSC 302', 'MAT 301', 'GST 222'])).map((code, idx) => (
                    <option key={`${code}_${idx}`} value={code}>
                      {code} — {courses.find(c => c.courseCode === code)?.courseTitle || 'Course Module'}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  You can apply for courses you are currently enrolled in.
                </p>
              </div>

              {/* Matriculation Number & Academic Session */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Matriculation / Student ID:
                  </label>
                  <input
                    type="text"
                    value={matricNumber}
                    onChange={(e) => setMatricNumber(e.target.value)}
                    placeholder="e.g. 219482 or U21CS1045"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Academic Session:
                  </label>
                  <input
                    type="text"
                    value={academicSession}
                    onChange={(e) => setAcademicSession(e.target.value)}
                    placeholder="2024/2025"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Endorsement / Proof Statement */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Appointment Details & Verification Statement:
                </label>
                <textarea
                  value={verificationInfo}
                  onChange={(e) => setVerificationInfo(e.target.value)}
                  rows={3}
                  placeholder="Explain how you were appointed or elected as course rep (e.g. elected in department meeting, appointed by course lecturer Dr. XYZ)..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[11px] text-slate-400">
                  Minimum 20 characters. Admins may verify with your department.
                </span>
              </div>

              {/* Actions */}
              <div className="pt-3 flex items-center justify-end space-x-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold rounded-xl shadow-sm transition flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
