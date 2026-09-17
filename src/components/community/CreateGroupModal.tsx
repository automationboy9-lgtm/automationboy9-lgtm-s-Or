import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, X, Lock, Globe, BookOpen, GraduationCap, Building2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (groupId: string) => void;
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { student, createStudyGroup, institutions, departments } = useApp();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [institution, setInstitution] = useState(student.institutionName || 'All Nigerian Institutions');
  const [faculty, setFaculty] = useState(student.faculty || 'General Studies');
  const [department, setDepartment] = useState(student.department || 'All Departments');
  const [courseCode, setCourseCode] = useState('');
  const [level, setLevel] = useState<string>(student.level || '300L');
  const [privacy, setPrivacy] = useState<'public' | 'private'>('public');
  const [tagsInput, setTagsInput] = useState('Exams, Past Questions, Tutorials');
  const [rules, setRules] = useState(
    '1. Strictly academic discussion.\n2. Respect all members.\n3. Share verified lecture notes and past questions only.'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const parsedRules = rules
      .split('\n')
      .map(r => r.trim())
      .filter(Boolean);

    const newGroupId = createStudyGroup({
      name: name.trim(),
      description: description.trim(),
      institution: institution.trim(),
      faculty: faculty.trim(),
      department: department.trim(),
      courseCode: courseCode.trim().toUpperCase() || undefined,
      level: level,
      privacy,
      creatorId: 'current_student',
      creatorName: student.fullName,
      tags: tags.length > 0 ? tags : ['StudyGroup', 'Academics'],
      rules: parsedRules.length > 0 ? parsedRules : ['Maintain academic decorum and share study materials.']
    });

    onClose();
    if (onSuccess) {
      onSuccess(newGroupId);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-xl w-full my-8 overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-teal-900/10 via-slate-900/5 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Create Study & Reading Group
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Form a collaborative circle with peers for revision, tutorials & past questions
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Group Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Group Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. GST 101 Intensive Revision & Mock Circle"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Description & Study Focus *
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe what courses you review, timetable goals, and who should join..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
              />
            </div>

            {/* Privacy Setting */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Privacy Setting *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPrivacy('public')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    privacy === 'public'
                      ? 'border-teal-600 bg-teal-50/70 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <Globe className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span>Public Group</span>
                  </div>
                  <p className="text-[11px] mt-1 opacity-80">
                    Any student can find and join instantly without approval.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPrivacy('private')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    privacy === 'private'
                      ? 'border-teal-600 bg-teal-50/70 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <Lock className="w-4 h-4 text-amber-500" />
                    <span>Private / Request</span>
                  </div>
                  <p className="text-[11px] mt-1 opacity-80">
                    Students must request to join; admins must approve requests.
                  </p>
                </button>
              </div>
            </div>

            {/* Academic Scope: Institution & Department */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Target Institution</span>
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={e => setInstitution(e.target.value)}
                  placeholder="e.g. University of Lagos or All Universities"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
                  <span>Department</span>
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  placeholder="e.g. Computer Science or Faculty-wide"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Course Code & Academic Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                  <span>Specific Course Code (Optional)</span>
                </label>
                <input
                  type="text"
                  value={courseCode}
                  onChange={e => setCourseCode(e.target.value)}
                  placeholder="e.g. MTH 101, CHM 202, LAW 311"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Academic Level
                </label>
                <select
                  value={level}
                  onChange={e => setLevel(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="100L">100 Level (Freshers)</option>
                  <option value="200L">200 Level</option>
                  <option value="300L">300 Level</option>
                  <option value="400L">400 Level</option>
                  <option value="500L">500 Level</option>
                  <option value="Postgraduate">Postgraduate (PGD/MSc/PhD)</option>
                  <option value="All Levels">All Levels (Cross-Year)</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Group Tags (comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                placeholder="Exams, Assignments, Past Questions, Tutorials"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            {/* Group Rules */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Study Group Rules & Guidelines (one per line)
              </label>
              <textarea
                rows={3}
                value={rules}
                onChange={e => setRules(e.target.value)}
                placeholder="Rule 1&#10;Rule 2&#10;Rule 3"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-[11px] resize-none"
              />
            </div>

            {/* Submit */}
            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-lg shadow-teal-600/25 flex items-center justify-center gap-1.5"
              >
                <Users className="w-4 h-4" />
                <span>Launch Group</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
