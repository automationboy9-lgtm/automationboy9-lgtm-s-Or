import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Search,
  Filter,
  Users,
  Globe,
  Lock,
  Plus,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  X,
  ShieldCheck,
  Building2,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudyGroup } from '../../types';

interface DiscoverGroupsTabProps {
  onOpenGroup: (group: StudyGroup) => void;
  onOpenCreateGroup: () => void;
}

export const DiscoverGroupsTab: React.FC<DiscoverGroupsTabProps> = ({
  onOpenGroup,
  onOpenCreateGroup
}) => {
  const {
    studyGroups,
    currentUser,
    joinStudyGroup,
    requestToJoinGroup
  } = useApp();

  const studentId = currentUser?.id || 'current_student';

  const [searchQuery, setSearchQuery] = useState('');
  const [privacyFilter, setPrivacyFilter] = useState<'all' | 'public' | 'private'>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [previewGroup, setPreviewGroup] = useState<StudyGroup | null>(null);
  const [joinRequestModalGroup, setJoinRequestModalGroup] = useState<StudyGroup | null>(null);
  const [joinRequestNote, setJoinRequestNote] = useState('Hi! I would like to join this study group for exam revision and resource sharing.');

  const filteredGroups = studyGroups.filter(g => {
    // Privacy filter
    if (privacyFilter !== 'all' && g.privacy !== privacyFilter) return false;

    // Level filter
    if (levelFilter !== 'all' && g.level !== levelFilter && g.level !== 'All Levels') return false;

    // Search query
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      g.name.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) ||
      g.institution.toLowerCase().includes(q) ||
      g.department.toLowerCase().includes(q) ||
      (g.courseCode && g.courseCode.toLowerCase().includes(q)) ||
      (g.tags && g.tags.some(t => t.toLowerCase().includes(q)));

    return matchesSearch;
  });

  const handleJoinClick = (group: StudyGroup) => {
    if (group.privacy === 'public') {
      joinStudyGroup(group.id);
    } else {
      setJoinRequestModalGroup(group);
    }
  };

  const submitJoinRequest = () => {
    if (!joinRequestModalGroup) return;
    requestToJoinGroup(joinRequestModalGroup.id, joinRequestNote.trim());
    setJoinRequestModalGroup(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Search & Filter Bar */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search groups by course code, department, institution..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <button
            onClick={onOpenCreateGroup}
            className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md shadow-teal-600/20 flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create Study Group</span>
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400">Privacy:</span>
            <select
              value={privacyFilter}
              onChange={e => setPrivacyFilter(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold"
            >
              <option value="all">All Groups</option>
              <option value="public">Public (Instant Join)</option>
              <option value="private">Private (Request Only)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400">Level:</span>
            <select
              value={levelFilter}
              onChange={e => setLevelFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold"
            >
              <option value="all">All Academic Levels</option>
              <option value="100L">100 Level</option>
              <option value="200L">200 Level</option>
              <option value="300L">300 Level</option>
              <option value="400L">400 Level</option>
              <option value="500L">500 Level</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div>

          <span className="text-[11px] text-slate-400 ml-auto">
            Showing <strong>{filteredGroups.length}</strong> study circles
          </span>
        </div>
      </div>

      {/* Groups Grid */}
      {filteredGroups.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <Compass className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
          <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">
            No Study Groups Match Your Filter
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria or create a brand-new study group for your course or department.
          </p>
          <button
            onClick={onOpenCreateGroup}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md"
          >
            Create This Study Group
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGroups.map(group => {
            const isMember = group.members.some(m => m.id === studentId);
            const isPending = group.pendingRequests?.some(r => r.studentId === studentId);

            return (
              <div
                key={group.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-teal-500/40 transition-colors"
              >
                <div className="space-y-2.5">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 ${
                        group.privacy === 'public'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                          : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                      }`}
                    >
                      {group.privacy === 'public' ? (
                        <Globe className="w-3 h-3" />
                      ) : (
                        <Lock className="w-3 h-3" />
                      )}
                      <span className="capitalize">{group.privacy}</span>
                    </span>

                    {group.courseCode && (
                      <span className="px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-[10px] font-black uppercase">
                        {group.courseCode}
                      </span>
                    )}

                    <span className="text-[10px] text-slate-400 font-bold ml-auto">
                      {group.level || 'All Levels'}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white line-clamp-1">
                      {group.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                      {group.description}
                    </p>
                  </div>

                  {/* School & Department */}
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5 pt-1">
                    <p className="flex items-center gap-1 truncate">
                      <Building2 className="w-3 h-3 text-teal-600 shrink-0" />
                      <span className="truncate">{group.institution}</span>
                    </p>
                    <p className="flex items-center gap-1 truncate">
                      <GraduationCap className="w-3 h-3 text-teal-600 shrink-0" />
                      <span className="truncate">{group.department}</span>
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{group.memberCount} members</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span>{group.sharedResources?.length || 0} files</span>
                    </span>
                  </div>
                </div>

                {/* Card footer actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setPreviewGroup(group)}
                    className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-teal-600 transition-colors"
                  >
                    View Details
                  </button>

                  {isMember ? (
                    <button
                      onClick={() => onOpenGroup(group)}
                      className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                    >
                      <span>Open Room</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : isPending ? (
                    <span className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Pending Approval</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleJoinClick(group)}
                      className="px-3.5 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-xs font-bold flex items-center gap-1 border border-teal-200 dark:border-teal-800/60"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{group.privacy === 'public' ? 'Join Circle' : 'Request to Join'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Group Preview Modal */}
      <AnimatePresence>
        {previewGroup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-4 overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold capitalize ${
                      previewGroup.privacy === 'public'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {previewGroup.privacy} Group
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                    {previewGroup.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {previewGroup.institution} • {previewGroup.department}
                  </p>
                </div>
                <button
                  onClick={() => setPreviewGroup(null)}
                  className="p-1 rounded-xl text-slate-400 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <h4 className="font-bold text-slate-700 dark:text-slate-300">About & Goals:</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">
                    {previewGroup.description}
                  </p>
                </div>

                {previewGroup.rules && previewGroup.rules.length > 0 && (
                  <div>
                    <h4 className="font-bold text-slate-700 dark:text-slate-300">Group Rules:</h4>
                    <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-0.5 mt-1">
                      {previewGroup.rules.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Enrolled: {previewGroup.memberCount} students</span>
                  <span>Repository: {previewGroup.sharedResources?.length || 0} files</span>
                  <span>Sessions: {previewGroup.studySessions?.length || 0}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  onClick={() => setPreviewGroup(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600"
                >
                  Close
                </button>
                {previewGroup.members.some(m => m.id === studentId) ? (
                  <button
                    onClick={() => {
                      const g = previewGroup;
                      setPreviewGroup(null);
                      onOpenGroup(g);
                    }}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md"
                  >
                    Open Group Room
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const g = previewGroup;
                      setPreviewGroup(null);
                      handleJoinClick(g);
                    }}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md"
                  >
                    {previewGroup.privacy === 'public' ? 'Join Group Now' : 'Send Join Request'}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Request to Join Private Group Modal */}
      <AnimatePresence>
        {joinRequestModalGroup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-4 overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-500" />
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Request to Join Private Circle
                  </h3>
                </div>
                <button
                  onClick={() => setJoinRequestModalGroup(null)}
                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                <p>
                  <strong>{joinRequestModalGroup.name}</strong> is a private group. The creator or group administrators will review your request.
                </p>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Introduction note to group admins:
                  </label>
                  <textarea
                    rows={3}
                    value={joinRequestNote}
                    onChange={e => setJoinRequestNote(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setJoinRequestModalGroup(null)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  onClick={submitJoinRequest}
                  className="flex-1 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md"
                >
                  Send Request
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
