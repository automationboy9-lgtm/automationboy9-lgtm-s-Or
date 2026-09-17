import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CopilotReferenceItem } from '../../types';
import { 
  X, 
  Search, 
  BookOpen, 
  FileText, 
  GraduationCap, 
  Building2, 
  Check, 
  Plus,
  Paperclip
} from 'lucide-react';
import { motion } from 'motion/react';

interface CopilotResourcePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAttachResource: (resource: CopilotReferenceItem) => void;
  attachedResourceIds: string[];
}

export const CopilotResourcePickerModal: React.FC<CopilotResourcePickerModalProps> = ({
  isOpen,
  onClose,
  onAttachResource,
  attachedResourceIds
}) => {
  const { courses, pastQuestions, studyMaterials, student } = useApp();

  const [activeTab, setActiveTab] = useState<'courses' | 'past_questions' | 'materials'>('courses');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return (courses || []).filter((c) => {
      if (!q) return true;
      return (
        c.code.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.departmentName?.toLowerCase().includes(q) ||
        c.level?.toLowerCase().includes(q)
      );
    }).slice(0, 30);
  }, [courses, searchQuery]);

  const filteredPastQuestions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return (pastQuestions || []).filter((pq) => {
      if (!q) return true;
      return (
        pq.courseCode.toLowerCase().includes(q) ||
        pq.courseTitle.toLowerCase().includes(q) ||
        pq.sessionYear.toLowerCase().includes(q) ||
        pq.institutionName.toLowerCase().includes(q)
      );
    }).slice(0, 30);
  }, [pastQuestions, searchQuery]);

  const filteredMaterials = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return (studyMaterials || []).filter((m) => {
      if (!q) return true;
      return (
        m.courseCode.toLowerCase().includes(q) ||
        m.title.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.institutionName.toLowerCase().includes(q)
      );
    }).slice(0, 30);
  }, [studyMaterials, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <Paperclip className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>Reference StudentHub Resources</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Attach accredited courses, past questions, or lecture notes as direct context for your AI study session.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'courses'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Courses ({(courses || []).length})</span>
            </button>
            <button
              onClick={() => setActiveTab('past_questions')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'past_questions'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Past Questions ({(pastQuestions || []).length})</span>
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'materials'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Study Notes ({(studyMaterials || []).length})</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeTab.replace('_', ' ')} by code, title, or topic...`}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeTab === 'courses' && (
            filteredCourses.map((c) => {
              const isAttached = attachedResourceIds.includes(c.id);
              return (
                <div
                  key={c.id}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between gap-3 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-black text-xs">
                        {c.code}
                      </span>
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {c.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {c.creditUnits} Units • {c.level} • {c.departmentName || student.department}
                    </p>
                  </div>

                  <button
                    disabled={isAttached}
                    onClick={() => {
                      onAttachResource({
                        id: c.id,
                        type: 'course',
                        title: `${c.code}: ${c.title}`,
                        courseCode: c.code,
                        yearOrLevel: c.level,
                        institutionName: student.institutionName
                      });
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                      isAttached
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                    }`}
                  >
                    {isAttached ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>{isAttached ? 'Attached' : 'Attach'}</span>
                  </button>
                </div>
              );
            })
          )}

          {activeTab === 'past_questions' && (
            filteredPastQuestions.map((pq) => {
              const isAttached = attachedResourceIds.includes(pq.id);
              return (
                <div
                  key={pq.id}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between gap-3 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-black text-xs">
                        {pq.courseCode}
                      </span>
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {pq.courseTitle}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {pq.sessionYear} • {pq.semester} • {pq.totalQuestions} Questions • {pq.institutionName}
                    </p>
                  </div>

                  <button
                    disabled={isAttached}
                    onClick={() => {
                      onAttachResource({
                        id: pq.id,
                        type: 'past_question',
                        title: `${pq.courseCode} Exam (${pq.sessionYear})`,
                        courseCode: pq.courseCode,
                        yearOrLevel: pq.sessionYear,
                        institutionName: pq.institutionName
                      });
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                      isAttached
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                    }`}
                  >
                    {isAttached ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>{isAttached ? 'Attached' : 'Attach'}</span>
                  </button>
                </div>
              );
            })
          )}

          {activeTab === 'materials' && (
            filteredMaterials.map((m) => {
              const isAttached = attachedResourceIds.includes(m.id);
              return (
                <div
                  key={m.id}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between gap-3 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-black text-xs">
                        {m.courseCode}
                      </span>
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {m.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {m.category} • {m.fileType.toUpperCase()} ({m.fileSize}) • {m.author}
                    </p>
                  </div>

                  <button
                    disabled={isAttached}
                    onClick={() => {
                      onAttachResource({
                        id: m.id,
                        type: 'study_material',
                        title: `${m.courseCode}: ${m.title}`,
                        courseCode: m.courseCode,
                        yearOrLevel: m.fileType,
                        institutionName: m.institutionName
                      });
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                      isAttached
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                    }`}
                  >
                    {isAttached ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>{isAttached ? 'Attached' : 'Attach'}</span>
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end bg-slate-50/50 dark:bg-slate-800/30">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl font-bold text-xs"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};
