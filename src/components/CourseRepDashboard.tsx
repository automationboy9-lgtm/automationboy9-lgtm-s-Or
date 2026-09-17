import React, { useState, useMemo } from 'react';
import { 
  Award, 
  Megaphone, 
  MessageSquare, 
  Users, 
  BookOpen, 
  FileText, 
  Calendar, 
  Clock, 
  Plus, 
  CheckCircle, 
  Send, 
  ShieldCheck, 
  Search, 
  Filter, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CourseAnnouncement } from '../types';

export const CourseRepDashboard: React.FC = () => {
  const { 
    student, 
    setCurrentView, 
    courseAnnouncements, 
    addCourseAnnouncement, 
    deleteCourseAnnouncement,
    lecturerRepMessages,
    sendLecturerRepMessage,
    studyGroups,
    pastQuestions,
    courses
  } = useApp();

  const [activeTab, setActiveTab] = useState<'announcements' | 'lecturer_line' | 'study_sessions' | 'resources' | 'roster'>('announcements');
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementContent, setNewAnnouncementContent] = useState('');
  const [announcementPriority, setAnnouncementPriority] = useState<'normal' | 'urgent'>('normal');
  const [newAttachmentName, setNewAttachmentName] = useState('');
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);

  // Chat with lecturer
  const [chatInput, setChatInput] = useState('');

  const repCourseCode = student.courseRepCourseCode || 'CSC 301';
  const matchedCourse = courses.find(c => c.courseCode === repCourseCode);

  // Announcements filtered for this course
  const courseAnnouncementsList = useMemo(() => {
    return courseAnnouncements.filter(a => a.courseCode === repCourseCode);
  }, [courseAnnouncements, repCourseCode]);

  // Messages with lecturer for this course
  const courseMessages = useMemo(() => {
    return lecturerRepMessages[repCourseCode] || [];
  }, [lecturerRepMessages, repCourseCode]);

  // Classmates enrolled count estimation
  const enrolledClassmatesCount = 142;

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncementTitle.trim() || !newAnnouncementContent.trim()) return;

    addCourseAnnouncement({
      courseCode: repCourseCode,
      courseTitle: matchedCourse?.courseTitle || `${repCourseCode} Class Space`,
      institutionId: student.institutionId,
      departmentName: student.department,
      title: newAnnouncementTitle.trim(),
      content: newAnnouncementContent.trim(),
      authorId: student.id,
      authorName: `${student.fullName} (Course Rep)`,
      authorRole: 'course_rep',
      priority: announcementPriority,
      attachments: newAttachmentName.trim() ? [{ title: newAttachmentName.trim(), size: '180 KB' }] : undefined
    });

    setNewAnnouncementTitle('');
    setNewAnnouncementContent('');
    setNewAttachmentName('');
    setShowAnnouncementForm(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendLecturerRepMessage(repCourseCode, chatInput.trim(), 'course_rep');
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16">
      {/* Top Banner with Role Context */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white border-b border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="inline-flex items-center space-x-1 px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition text-emerald-100"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Student Dashboard</span>
                </button>
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-emerald-500/20 border border-emerald-400/40 rounded-full text-xs font-semibold text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>VERIFIED COURSE REPRESENTATIVE</span>
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                <span>{repCourseCode}: {matchedCourse?.courseTitle || 'Structured Programming'}</span>
              </h1>
              <p className="text-sm text-emerald-200">
                {student.department} • {student.level} • {student.institutionName} • Session {student.academicSession || '2024/2025'}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAnnouncementForm(true)}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl text-sm shadow-md transition flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Post Announcement</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-800/60">
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <span className="text-xs text-emerald-200 block">Enrolled Classmates</span>
              <span className="text-xl font-bold text-white">{enrolledClassmatesCount}</span>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <span className="text-xs text-emerald-200 block">Course Announcements</span>
              <span className="text-xl font-bold text-white">{courseAnnouncementsList.length}</span>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <span className="text-xs text-emerald-200 block">Lecturer Direct Channel</span>
              <span className="text-xl font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active</span>
              </span>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <span className="text-xs text-emerald-200 block">Rep Status</span>
              <span className="text-xl font-bold text-amber-300">Active / Endorsed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-1">
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 flex items-center space-x-2 transition ${
              activeTab === 'announcements'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>Announcements ({courseAnnouncementsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('lecturer_line')}
            className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 flex items-center space-x-2 transition ${
              activeTab === 'lecturer_line'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Lecturer Direct Line ({courseMessages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('study_sessions')}
            className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 flex items-center space-x-2 transition ${
              activeTab === 'study_sessions'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Revision & Study Sessions</span>
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 flex items-center space-x-2 transition ${
              activeTab === 'resources'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Curated Resources</span>
          </button>
        </div>

        {/* Tab 1: Announcements */}
        {activeTab === 'announcements' && (
          <div className="mt-6 space-y-6">
            {showAnnouncementForm && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-900 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                    <Megaphone className="w-4 h-4 text-emerald-600" />
                    <span>Broadcast Course Announcement</span>
                  </h3>
                  <button
                    onClick={() => setShowAnnouncementForm(false)}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Announcement Title:
                    </label>
                    <input
                      type="text"
                      value={newAnnouncementTitle}
                      onChange={(e) => setNewAnnouncementTitle(e.target.value)}
                      placeholder="e.g. Lab 2 Timetable Shift or Test Date Confirmation"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Broadcast Content:
                    </label>
                    <textarea
                      value={newAnnouncementContent}
                      onChange={(e) => setNewAnnouncementContent(e.target.value)}
                      rows={4}
                      placeholder="Enter detailed message for your classmates..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Priority Level:
                      </label>
                      <select
                        value={announcementPriority}
                        onChange={(e) => setAnnouncementPriority(e.target.value as 'normal' | 'urgent')}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                      >
                        <option value="normal">Normal Announcement</option>
                        <option value="urgent">🚨 Urgent / Exam Notice</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Optional Attachment Name:
                      </label>
                      <input
                        type="text"
                        value={newAttachmentName}
                        onChange={(e) => setNewAttachmentName(e.target.value)}
                        placeholder="e.g. Test_Sitting_Arrangement.pdf"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAnnouncementForm(false)}
                      className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition flex items-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Publish Broadcast</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {courseAnnouncementsList.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
                <Megaphone className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Announcements Yet</h4>
                <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                  Keep your classmates informed by posting test updates, lab schedules, or lecturer notices.
                </p>
                <button
                  onClick={() => setShowAnnouncementForm(true)}
                  className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-semibold"
                >
                  Create First Announcement
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {courseAnnouncementsList.map(ann => (
                  <div 
                    key={ann.id}
                    className={`bg-white dark:bg-slate-900 rounded-2xl p-5 border shadow-sm transition ${
                      ann.priority === 'urgent'
                        ? 'border-red-300 dark:border-red-900 bg-red-50/20'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                            {ann.courseCode}
                          </span>
                          {ann.priority === 'urgent' && (
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                              Urgent Notice
                            </span>
                          )}
                          <span className="text-xs text-slate-500">
                            {new Date(ann.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                          {ann.title}
                        </h4>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                          By: {ann.authorName}
                        </span>
                        {ann.authorId === student.id && (
                          <button
                            onClick={() => deleteCourseAnnouncement(ann.id)}
                            className="p-1 text-slate-400 hover:text-red-500 transition"
                            title="Delete announcement"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-slate-700 dark:text-slate-300 mt-3 whitespace-pre-line">
                      {ann.content}
                    </p>

                    {ann.attachments && ann.attachments.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-3">
                        <span className="text-xs text-slate-400 font-medium">Attachment:</span>
                        {ann.attachments.map((att, idx) => (
                          <div key={idx} className="inline-flex items-center space-x-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium text-emerald-700 dark:text-emerald-400">
                            <FileText className="w-3.5 h-3.5" />
                            <span>{att.title}</span>
                            {att.size && <span className="text-slate-400">({att.size})</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Lecturer Direct Line */}
        {activeTab === 'lecturer_line' && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lecturer Information Card */}
            <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                  DO
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Dr. Babatunde Ogunlesi</h4>
                  <p className="text-xs text-slate-500">Course Lecturer • {repCourseCode}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                <div><strong>Office:</strong> Block B, Technology, Office 204</div>
                <div><strong>Consultation:</strong> Tuesdays & Thursdays, 2:00 PM</div>
                <div><strong>Role:</strong> Official Course Rep ↔ Lecturer Coordination</div>
              </div>

              <p className="text-xs text-slate-500">
                Use this channel to clarify assignment guidelines, venue bookings, test schedules, and student inquiries with the lecturer.
              </p>
            </div>

            {/* Chat Box */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col h-[500px]">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Direct Coordination Channel ({repCourseCode})
                  </span>
                </div>
                <span className="text-xs text-slate-500">End-to-end Academic Thread</span>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {courseMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.senderRole === 'course_rep' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div className="flex items-center space-x-1 text-[11px] text-slate-400 mb-0.5">
                      <span>{msg.senderName}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-sm ${
                        msg.senderRole === 'course_rep'
                          ? 'bg-emerald-600 text-white rounded-tr-none'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={`Send a coordination message to the ${repCourseCode} lecturer...`}
                  className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 3: Revision & Study Sessions */}
        {activeTab === 'study_sessions' && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                  Coordinate Class Revision & Lab Sessions
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                  Organize physical or virtual past question walkthroughs for {repCourseCode}.
                </p>
              </div>
              <button
                onClick={() => setCurrentView('community')}
                className="px-3.5 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700 transition"
              >
                Schedule in Reading Groups
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-emerald-600 uppercase">Upcoming Session</span>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 mt-1">
                  Lab 2: Dynamic Memory & Pointer Walkthrough
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Friday, 3:00 PM – 5:30 PM • Computer Science Lab 2
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-600 dark:text-slate-400">48 classmates attending</span>
                  <span className="text-xs font-semibold text-emerald-600">Session Confirmed</span>
                </div>
              </div>

              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-emerald-600 uppercase">Virtual Review</span>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 mt-1">
                  Mid-Semester Exam Past Questions Drill
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Saturday, 7:00 PM • StudentHub Virtual Study Room
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-600 dark:text-slate-400">62 classmates attending</span>
                  <span className="text-xs font-semibold text-emerald-600">Link Ready</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Curated Resources */}
        {activeTab === 'resources' && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  Verified Exam Papers & Study Material for {repCourseCode}
                </h4>
                <p className="text-xs text-slate-500">
                  Ensure all enrolled students have access to verified academic resources.
                </p>
              </div>
              <button
                onClick={() => setCurrentView('past_questions')}
                className="px-3.5 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700 transition"
              >
                Browse Past Questions Center
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pastQuestions
                .filter(pq => pq.courseCode.toLowerCase().includes(repCourseCode.toLowerCase()) || pq.courseCode === repCourseCode)
                .map(pq => (
                  <div key={pq.id} className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-sm text-slate-800 dark:text-slate-200">{pq.courseCode}: {pq.courseTitle}</h5>
                      <p className="text-xs text-slate-500 mt-0.5">{pq.year} • {pq.semester} • {pq.questions?.length || 0} Questions</p>
                    </div>
                    <button
                      onClick={() => setCurrentView('past_questions')}
                      className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-xs font-semibold rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                    >
                      Open Paper
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
