import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Users,
  MessageSquare,
  BookOpen,
  Calendar,
  Shield,
  Send,
  CornerDownRight,
  Plus,
  Lock,
  Globe,
  FileText,
  Clock,
  MapPin,
  CheckCircle,
  ExternalLink,
  UserCheck,
  UserX,
  Crown,
  ShieldAlert,
  Download,
  Paperclip,
  Share2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudyGroup, GroupSharedResource, StudySession } from '../../types';

interface GroupWorkspaceModalProps {
  group: StudyGroup;
  isOpen: boolean;
  onClose: () => void;
  onOpenReport?: (type: 'group' | 'message', id: string, title: string) => void;
}

export const GroupWorkspaceModal: React.FC<GroupWorkspaceModalProps> = ({
  group,
  isOpen,
  onClose,
  onOpenReport
}) => {
  const {
    student,
    currentUser,
    groupChatMessages,
    sendGroupChatMessage,
    addStudySession,
    toggleAttendStudySession,
    shareResourceInGroup,
    handleGroupJoinRequest,
    promoteGroupMember,
    removeGroupMember,
    deleteStudyGroup,
    leaveStudyGroup,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'chat' | 'resources' | 'sessions' | 'members'>('chat');
  const [chatInput, setChatInput] = useState('');
  const [replyingTo, setReplyingTo] = useState<{ messageId: string; senderName: string; text: string } | null>(null);

  // Modals inside workspace
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [sessionVenue, setSessionVenue] = useState('');
  const [sessionTopic, setSessionTopic] = useState('');

  const [resourceModalOpen, setResourceModalOpen] = useState(false);
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceType, setResourceType] = useState<'lecture_notes' | 'past_question' | 'summary' | 'formula_sheet' | 'other'>('lecture_notes');
  const [resourceCourse, setResourceCourse] = useState(group.courseCode || '');
  const [resourceFormat, setResourceFormat] = useState('PDF');
  const [resourceLink, setResourceLink] = useState('');

  if (!isOpen) return null;

  const studentId = currentUser?.id || 'current_student';
  const currentMember = group.members.find(m => m.id === studentId);
  const isMember = Boolean(currentMember);
  const isCreator = group.creatorId === studentId || currentMember?.role === 'creator';
  const isAdmin = isCreator || currentMember?.role === 'admin';

  const messages = groupChatMessages[group.id] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    sendGroupChatMessage(
      group.id,
      chatInput.trim(),
      replyingTo || undefined
    );

    setChatInput('');
    setReplyingTo(null);
  };

  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionTitle.trim() || !sessionDate.trim() || !sessionTime.trim()) return;

    addStudySession(group.id, {
      title: sessionTitle.trim(),
      date: sessionDate.trim(),
      time: sessionTime.trim(),
      venueOrLink: sessionVenue.trim() || 'Virtual Google Meet',
      topic: sessionTopic.trim() || 'Comprehensive course revision',
      hostName: student.fullName
    });

    setSessionTitle('');
    setSessionDate('');
    setSessionTime('');
    setSessionVenue('');
    setSessionTopic('');
    setScheduleModalOpen(false);
  };

  const handleShareResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceTitle.trim()) return;

    shareResourceInGroup(group.id, {
      title: resourceTitle.trim(),
      type: resourceType,
      courseCode: resourceCourse.trim().toUpperCase() || group.courseCode || 'GENERAL',
      fileFormat: resourceFormat,
      downloadUrl: resourceLink.trim() || undefined
    });

    setResourceTitle('');
    setResourceLink('');
    setResourceModalOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-5xl w-full h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-black shadow-md">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white line-clamp-1">
                    {group.name}
                  </h2>
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
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {group.institution} • {group.department} {group.courseCode && `• ${group.courseCode}`} • {group.memberCount} members
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onOpenReport && (
                <button
                  onClick={() => onOpenReport('group', group.id, group.name)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title="Report Study Group"
                >
                  <ShieldAlert className="w-4 h-4" />
                </button>
              )}

              {isMember && !isCreator && (
                <button
                  onClick={() => {
                    leaveStudyGroup(group.id);
                    onClose();
                  }}
                  className="px-2.5 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold"
                >
                  Leave Group
                </button>
              )}

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="px-4 border-b border-slate-200 dark:border-slate-800 flex gap-2 overflow-x-auto bg-white dark:bg-slate-900">
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'chat'
                  ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Group Chat</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px]">
                {messages.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'resources'
                  ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Shared Resources</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px]">
                {group.sharedResources?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('sessions')}
              className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'sessions'
                  ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Study Sessions</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px]">
                {group.studySessions?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('members')}
              className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'members'
                  ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Members & Admins</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px]">
                {group.members.length}
              </span>
              {isAdmin && (group.pendingRequests?.length || 0) > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px] font-black">
                  {group.pendingRequests?.length} req
                </span>
              )}
            </button>
          </div>

          {/* Main Tab Content */}
          <div className="flex-1 overflow-hidden flex flex-col bg-slate-50/50 dark:bg-slate-950/50">
            {/* 1. CHAT TAB */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Messages stream */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2 text-slate-400">
                      <MessageSquare className="w-10 h-10 opacity-40 text-teal-600" />
                      <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        No messages in this study group yet.
                      </p>
                      <p className="text-[11px] max-w-sm">
                        Start the academic discussion, ask questions about past questions, or share lecture notes.
                      </p>
                    </div>
                  ) : (
                    messages.map(msg => {
                      const isMe = msg.senderId === studentId;
                      const isSystem = msg.senderId === 'system';

                      if (isSystem) {
                        return (
                          <div key={msg.id} className="text-center py-2">
                            <span className="inline-block px-3 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800/70 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                              📢 {msg.text}
                            </span>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                        >
                          {/* Sender name */}
                          <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-slate-500 dark:text-slate-400">
                            <span className="font-bold text-slate-700 dark:text-slate-300">
                              {isMe ? 'You' : msg.senderName}
                            </span>
                            <span>•</span>
                            <span className="text-[10px]">{msg.senderInstitution}</span>
                            <span>•</span>
                            <span className="text-[10px]">{msg.sentAt}</span>
                          </div>

                          {/* Bubble Container */}
                          <div
                            className={`max-w-md sm:max-w-lg rounded-2xl p-3.5 shadow-sm text-xs space-y-2 ${
                              isMe
                                ? 'bg-teal-600 text-white rounded-tr-none'
                                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                            }`}
                          >
                            {/* Reply to quote preview */}
                            {msg.replyToText && (
                              <div
                                className={`p-2 rounded-xl text-[11px] mb-1.5 border-l-2 ${
                                  isMe
                                    ? 'bg-teal-700/60 border-teal-300 text-teal-100'
                                    : 'bg-slate-100 dark:bg-slate-800 border-teal-500 text-slate-600 dark:text-slate-300'
                                }`}
                              >
                                <span className="font-bold block text-[10px]">
                                  ↩ Replying to {msg.replyToSenderName}:
                                </span>
                                <p className="line-clamp-2 italic">{msg.replyToText}</p>
                              </div>
                            )}

                            {/* Main message text */}
                            <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                            {/* Attached Resource Preview Card */}
                            {msg.attachedResource && (
                              <div
                                className={`mt-2 p-3 rounded-xl border flex items-center justify-between gap-2 ${
                                  isMe
                                    ? 'bg-teal-700/50 border-teal-400/40 text-white'
                                    : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 overflow-hidden">
                                  <div className="w-8 h-8 rounded-lg bg-teal-500/30 flex items-center justify-center shrink-0">
                                    <FileText className="w-4 h-4" />
                                  </div>
                                  <div className="overflow-hidden">
                                    <h5 className="font-bold text-[11px] truncate">
                                      {msg.attachedResource.title}
                                    </h5>
                                    <p className="text-[10px] opacity-80">
                                      {msg.attachedResource.courseCode} • {msg.attachedResource.fileFormat}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() =>
                                    addToast('Resource Vault', 'Opening shared study document...', 'info')
                                  }
                                  className="px-2 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-[10px] font-bold shrink-0 flex items-center gap-1"
                                >
                                  <Download className="w-3 h-3" />
                                  <span>View</span>
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Quick action bar */}
                          <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-slate-400">
                            <button
                              onClick={() =>
                                setReplyingTo({
                                  messageId: msg.id,
                                  senderName: msg.senderName,
                                  text: msg.text
                                })
                              }
                              className="hover:text-teal-600 flex items-center gap-0.5"
                            >
                              <CornerDownRight className="w-3 h-3" />
                              <span>Reply</span>
                            </button>
                            {onOpenReport && !isMe && (
                              <button
                                onClick={() =>
                                  onOpenReport('message', msg.id, msg.text.slice(0, 50))
                                }
                                className="hover:text-rose-500 flex items-center gap-0.5"
                              >
                                <ShieldAlert className="w-3 h-3" />
                                <span>Report</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Reply banner if replying */}
                {replyingTo && (
                  <div className="px-4 py-2 bg-teal-50 dark:bg-teal-950/40 border-t border-teal-200 dark:border-teal-900/60 flex items-center justify-between text-xs text-teal-800 dark:text-teal-300">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <CornerDownRight className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">
                        Replying to <strong>{replyingTo.senderName}</strong>: "{replyingTo.text}"
                      </span>
                    </div>
                    <button
                      onClick={() => setReplyingTo(null)}
                      className="p-1 rounded-md text-teal-600 hover:bg-teal-100 dark:hover:bg-teal-900/50"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Chat input box */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
                >
                  <button
                    type="button"
                    onClick={() => setResourceModalOpen(true)}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-teal-600 transition-colors"
                    title="Share Academic Resource"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>

                  <input
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    placeholder="Type an academic message, formula question, or study update..."
                    className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />

                  <button
                    type="submit"
                    disabled={!chatInput.trim()}
                    className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold transition-all shadow-md shadow-teal-600/20"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* 2. SHARED RESOURCES TAB */}
            {activeTab === 'resources' && (
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      Group Academic Repository
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Shared past question papers, lecture handouts, and exam summaries
                    </p>
                  </div>

                  <button
                    onClick={() => setResourceModalOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Share Resource</span>
                  </button>
                </div>

                {/* Resource list */}
                {(!group.sharedResources || group.sharedResources.length === 0) ? (
                  <div className="py-12 text-center space-y-2">
                    <BookOpen className="w-10 h-10 text-teal-600/40 mx-auto" />
                    <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300">
                      No Shared Resources Yet
                    </h4>
                    <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                      Click the "Share Resource" button to upload or link lecture materials, past questions, and revision notes for your peers.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {(group.sharedResources || []).map(res => (
                      <div
                        key={res.id}
                        className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="overflow-hidden">
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase">
                              {res.courseCode} • {res.type.replace('_', ' ')}
                            </span>
                            <h4 className="font-extrabold text-xs text-slate-900 dark:text-white mt-1 line-clamp-2">
                              {res.title}
                            </h4>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              Shared by {res.sharedBy} • {res.sharedAt}
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-500">
                            Format: {res.fileFormat}
                          </span>
                          <button
                            onClick={() => {
                              addToast('Document Accessed', `Opening "${res.title}" for download...`, 'success');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/50 hover:bg-teal-100 text-teal-700 dark:text-teal-300 text-xs font-bold flex items-center gap-1.5"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download / View</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. STUDY SESSIONS TAB */}
            {activeTab === 'sessions' && (
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      Upcoming Study Sessions & Timetable
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Organized group revision meetings, virtual webinars, and tutorial sessions
                    </p>
                  </div>

                  <button
                    onClick={() => setScheduleModalOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Schedule Session</span>
                  </button>
                </div>

                {(!group.studySessions || group.studySessions.length === 0) ? (
                  <div className="py-12 text-center space-y-2">
                    <Calendar className="w-10 h-10 text-teal-600/40 mx-auto" />
                    <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300">
                      No Scheduled Sessions
                    </h4>
                    <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                      Organize your group's next exam preparation session or weekend tutorial.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {(group.studySessions || []).map(session => (
                      <div
                        key={session.id}
                        className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                              {session.title}
                            </h4>
                            <span className="px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300 text-[10px] font-bold">
                              {session.attendeesCount} RSVP'd
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-300">
                            <strong>Topic:</strong> {session.topic}
                          </p>

                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-teal-600" />
                              <span>{session.date}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-teal-600" />
                              <span>{session.time}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-teal-600" />
                              <span>{session.venueOrLink}</span>
                            </span>
                            <span className="text-[10px] opacity-80">
                              Host: {session.hostName}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => toggleAttendStudySession(group.id, session.id)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                              session.isAttending
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>{session.isAttending ? 'Attending' : 'RSVP to Attend'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4. MEMBERS & ADMINS TAB */}
            {activeTab === 'members' && (
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
                {/* Pending Requests Section (For Creator / Admin) */}
                {isAdmin && (group.pendingRequests || []).length > 0 && (
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-xs text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-amber-600" />
                        <span>Pending Join Requests ({group.pendingRequests?.length})</span>
                      </h4>
                      <span className="text-[10px] text-amber-700 dark:text-amber-300">
                        Admin approval required
                      </span>
                    </div>

                    <div className="space-y-2">
                      {(group.pendingRequests || []).map(req => (
                        <div
                          key={req.id}
                          className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/40 flex items-center justify-between gap-3"
                        >
                          <div>
                            <p className="font-bold text-xs text-slate-900 dark:text-white">
                              {req.studentName}{' '}
                              <span className="text-[10px] font-normal text-slate-500">
                                ({req.studentInstitution} • {req.department} • {req.level})
                              </span>
                            </p>
                            {req.message && (
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic mt-0.5">
                                "{req.message}"
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => handleGroupJoinRequest(group.id, req.id, 'accept')}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1"
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => handleGroupJoinRequest(group.id, req.id, 'reject')}
                              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 text-[11px] font-bold flex items-center gap-1"
                            >
                              <UserX className="w-3.5 h-3.5" />
                              <span>Decline</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Group Rules & Guidelines */}
                {Boolean(group.rules && group.rules.length > 0) && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                    <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-teal-600" />
                      <span>Study Group Rules & Conduct</span>
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
                      {(group.rules || []).map((r, rIdx) => (
                        <li key={rIdx}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Member Directory */}
                <div className="space-y-3">
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center justify-between">
                    <span>Enrolled Study Members ({(group.members || []).length})</span>
                    <span className="text-[10px] text-slate-400">
                      Created by {group.creatorName}
                    </span>
                  </h4>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
                    {(group.members || []).map(member => {
                      const isTargetCreator = member.role === 'creator';
                      const isTargetAdmin = member.role === 'admin';
                      const isTargetMe = member.id === studentId;

                      return (
                        <div
                          key={member.id}
                          className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/60 dark:hover:bg-slate-800/40"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 flex items-center justify-center font-bold text-xs">
                              {member.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-xs text-slate-900 dark:text-white">
                                  {member.name} {isTargetMe && '(You)'}
                                </span>
                                {isTargetCreator && (
                                  <span className="px-1.5 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-[9px] font-black flex items-center gap-0.5">
                                    <Crown className="w-2.5 h-2.5" />
                                    Creator
                                  </span>
                                )}
                                {isTargetAdmin && !isTargetCreator && (
                                  <span className="px-1.5 py-0.2 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 text-[9px] font-black flex items-center gap-0.5">
                                    <Shield className="w-2.5 h-2.5" />
                                    Admin
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400">
                                {member.institution} • {member.department} {member.level && `• ${member.level}`}
                              </p>
                            </div>
                          </div>

                          {/* Admin Controls on Member */}
                          {isCreator && !isTargetCreator && (
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() =>
                                  promoteGroupMember(
                                    group.id,
                                    member.id,
                                    isTargetAdmin ? 'member' : 'admin'
                                  )
                                }
                                className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                              >
                                {isTargetAdmin ? 'Demote' : 'Make Admin'}
                              </button>
                              <button
                                onClick={() => removeGroupMember(group.id, member.id)}
                                className="px-2 py-1 rounded-lg border border-rose-200 dark:border-rose-900/50 text-[10px] font-bold text-rose-600 hover:bg-rose-50"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Creator Danger Zone */}
                {isCreator && (
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                    <div>
                      <h5 className="font-bold text-xs text-rose-600 dark:text-rose-400">
                        Disband Study Group
                      </h5>
                      <p className="text-[11px] text-slate-400">
                        Permanently delete this group, its chat history, and shared files.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this study group?')) {
                          deleteStudyGroup(group.id);
                          onClose();
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                    >
                      Delete Group
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Schedule Session Sub-Modal */}
          <AnimatePresence>
            {scheduleModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-teal-600" />
                      <span>Schedule New Study Session</span>
                    </h4>
                    <button
                      onClick={() => setScheduleModalOpen(false)}
                      className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleAddSession} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Session Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={sessionTitle}
                        onChange={e => setSessionTitle(e.target.value)}
                        placeholder="e.g. Mid-Semester Exam Past Question Walkthrough"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Date *
                        </label>
                        <input
                          type="text"
                          required
                          value={sessionDate}
                          onChange={e => setSessionDate(e.target.value)}
                          placeholder="e.g. Friday, Oct 18"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Time *
                        </label>
                        <input
                          type="text"
                          required
                          value={sessionTime}
                          onChange={e => setSessionTime(e.target.value)}
                          placeholder="e.g. 4:00 PM WAT"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Venue or Online Link *
                      </label>
                      <input
                        type="text"
                        required
                        value={sessionVenue}
                        onChange={e => setSessionVenue(e.target.value)}
                        placeholder="e.g. Faculty Library Room 4B or meet.google.com/xyz-abc"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Discussion Agenda / Topic
                      </label>
                      <input
                        type="text"
                        value={sessionTopic}
                        onChange={e => setSessionTopic(e.target.value)}
                        placeholder="e.g. Modules 1 to 4 key derivations and calculation formulas"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setScheduleModalOpen(false)}
                        className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 text-xs font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md"
                      >
                        Publish Session
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Share Resource Sub-Modal */}
          <AnimatePresence>
            {resourceModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-teal-600" />
                      <span>Share Academic Resource</span>
                    </h4>
                    <button
                      onClick={() => setResourceModalOpen(false)}
                      className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleShareResource} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Resource Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={resourceTitle}
                        onChange={e => setResourceTitle(e.target.value)}
                        placeholder="e.g. 2023 Past Question Solutions with Formula Sheet"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Resource Type
                        </label>
                        <select
                          value={resourceType}
                          onChange={e => setResourceType(e.target.value as any)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        >
                          <option value="lecture_notes">Lecture Notes</option>
                          <option value="past_question">Past Questions</option>
                          <option value="summary">Summary / Handout</option>
                          <option value="formula_sheet">Formula Sheet</option>
                          <option value="other">General Material</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Course Code
                        </label>
                        <input
                          type="text"
                          value={resourceCourse}
                          onChange={e => setResourceCourse(e.target.value)}
                          placeholder="e.g. GST 101"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white uppercase"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Document / Cloud Drive Link (Optional)
                      </label>
                      <input
                        type="text"
                        value={resourceLink}
                        onChange={e => setResourceLink(e.target.value)}
                        placeholder="e.g. https://drive.google.com/... or vault ID"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setResourceModalOpen(false)}
                        className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 text-xs font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md"
                      >
                        Post to Repository
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
