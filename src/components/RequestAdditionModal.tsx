import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  BookOpen, 
  FolderTree, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  ShieldCheck, 
  HelpCircle 
} from 'lucide-react';
import { AdditionRequest } from '../types';

interface RequestAdditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'institution' | 'department' | 'course';
  prefilledInstitution?: string;
  prefilledFaculty?: string;
  prefilledDepartment?: string;
  studentName?: string;
  studentEmail?: string;
}

export const RequestAdditionModal: React.FC<RequestAdditionModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'course',
  prefilledInstitution = '',
  prefilledFaculty = '',
  prefilledDepartment = '',
  studentName = '',
  studentEmail = ''
}) => {
  const { submitAdditionRequest, student } = useApp();

  const [type, setType] = useState<'institution' | 'department' | 'course'>(defaultType);
  const [instName, setInstName] = useState(prefilledInstitution);
  const [instType, setInstType] = useState('Federal University');
  const [instState, setInstState] = useState('');
  const [facName, setFacName] = useState(prefilledFaculty);
  const [deptName, setDeptName] = useState(prefilledDepartment);
  const [courseCode, setCourseCode] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [level, setLevel] = useState('100L');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (type === 'institution' && !instName.trim()) {
      setErrorMsg('Please enter the official name of your institution.');
      return;
    }
    if (type === 'department' && (!deptName.trim() || !instName.trim())) {
      setErrorMsg('Please specify both the institution and department name.');
      return;
    }
    if (type === 'course' && (!courseCode.trim() || !courseTitle.trim())) {
      setErrorMsg('Course code (e.g. CSC 201) and Course title are required.');
      return;
    }

    const sName = studentName || student.fullName || 'Student Applicant';
    const sEmail = studentEmail || student.email || 'student@studenthub.ng';

    const reqData: Omit<AdditionRequest, 'id' | 'status' | 'submittedAt'> = {
      type,
      studentName: sName,
      studentEmail: sEmail,
      institutionName: instName.trim() || undefined,
      facultyName: facName.trim() || undefined,
      departmentName: deptName.trim() || undefined,
      courseCode: courseCode.trim().toUpperCase() || undefined,
      courseTitle: courseTitle.trim() || undefined,
      level: level || undefined,
      additionalDetails: notes.trim() || undefined
    };

    submitAdditionRequest(reqData);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setErrorMsg('');
    setCourseCode('');
    setCourseTitle('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        id="request-addition-modal-dialog"
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Request an Academic Addition
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official records are verified before inclusion
              </p>
            </div>
          </div>
          <button
            id="close-addition-modal-btn"
            onClick={handleResetAndClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Addition Request Submitted!
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you. To maintain verified standards across Nigerian tertiary education, official records are reviewed by StudentHub administrators before appearing in the public database.
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Record Type:</span>
                  <span className="font-semibold text-slate-900 dark:text-white capitalize">{type}</span>
                </div>
                {courseCode && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Course:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{courseCode}</span>
                  </div>
                )}
                {deptName && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Department:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{deptName}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-bold text-[10px]">
                    Pending Review
                  </span>
                </div>
              </div>
              <button
                id="done-addition-btn"
                onClick={handleResetAndClose}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-sm"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type Switcher */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  What would you like to request?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    id="type-course-btn"
                    onClick={() => setType('course')}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                      type === 'course'
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Course
                  </button>
                  <button
                    type="button"
                    id="type-department-btn"
                    onClick={() => setType('department')}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                      type === 'department'
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <FolderTree className="w-3.5 h-3.5" />
                    Department
                  </button>
                  <button
                    type="button"
                    id="type-institution-btn"
                    onClick={() => setType('institution')}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                      type === 'institution'
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    Institution
                  </button>
                </div>
              </div>

              {/* Institution input / prefilled */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Institution Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="addition-inst-name"
                  value={instName}
                  onChange={e => setInstName(e.target.value)}
                  placeholder="e.g. University of Lagos, Federal Poly Ilaro"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  required
                />
              </div>

              {/* Extra Institution fields if type === 'institution' */}
              {type === 'institution' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Institution Type
                    </label>
                    <select
                      value={instType}
                      onChange={e => setInstType(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                    >
                      <option value="Federal University">Federal University (NUC)</option>
                      <option value="State University">State University (NUC)</option>
                      <option value="Private University">Private University (NUC)</option>
                      <option value="Federal Polytechnic">Federal Polytechnic (NBTE)</option>
                      <option value="State Polytechnic">State Polytechnic (NBTE)</option>
                      <option value="College of Education">College of Education (NCCE)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      State in Nigeria
                    </label>
                    <input
                      type="text"
                      value={instState}
                      onChange={e => setInstState(e.target.value)}
                      placeholder="e.g. Lagos, Ogun, Oyo"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                    />
                  </div>
                </div>
              )}

              {/* Department fields if department or course */}
              {(type === 'department' || type === 'course') && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Faculty / School
                    </label>
                    <input
                      type="text"
                      value={facName}
                      onChange={e => setFacName(e.target.value)}
                      placeholder="e.g. Faculty of Science"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Department Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={deptName}
                      onChange={e => setDeptName(e.target.value)}
                      placeholder="e.g. Cyber Security"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Course fields if type === 'course' */}
              {type === 'course' && (
                <>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Course Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={courseCode}
                        onChange={e => setCourseCode(e.target.value)}
                        placeholder="CSC 202"
                        className="w-full px-3 py-2 text-xs font-mono font-semibold uppercase rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Course Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={courseTitle}
                        onChange={e => setCourseTitle(e.target.value)}
                        placeholder="Object-Oriented Programming in C++"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Level
                      </label>
                      <select
                        value={level}
                        onChange={e => setLevel(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                      >
                        <option value="100L">100L / Year 1</option>
                        <option value="200L">200L / Year 2</option>
                        <option value="300L">300L / Year 3</option>
                        <option value="400L">400L / Year 4</option>
                        <option value="500L">500L / Year 5</option>
                        <option value="ND 1">ND 1 (Polytechnic)</option>
                        <option value="ND 2">ND 2 (Polytechnic)</option>
                        <option value="HND 1">HND 1 (Polytechnic)</option>
                        <option value="HND 2">HND 2 (Polytechnic)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Credit Units
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="6"
                        defaultValue="2"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Syllabus / Notes */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Additional Details / Accreditation Reference (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Provide any context such as NUC CCMAS curriculum reference or syllabus topic outline..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-hidden resize-none"
                />
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Notice */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p>
                  To protect academic authenticity, students cannot directly edit official records. Submissions are reviewed by administrators before being added to the verified directory.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-addition-request-btn"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit for Review
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
