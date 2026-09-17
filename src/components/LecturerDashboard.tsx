import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  Megaphone, 
  BookOpen, 
  FileText, 
  Users, 
  Plus, 
  CheckCircle, 
  Clock, 
  Send, 
  ShieldCheck, 
  HelpCircle, 
  Award, 
  MessageSquare,
  Building,
  Upload,
  Calendar,
  Settings,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LecturerProfile } from '../types';

export const LecturerDashboard: React.FC = () => {
  const { 
    currentLecturerProfile, 
    lecturerProfiles, 
    updateLecturerProfile,
    courseAnnouncements, 
    addCourseAnnouncement,
    lecturerRepMessages,
    sendLecturerRepMessage,
    studyMaterials,
    addStudyMaterial,
    pastQuestions,
    student,
    courses,
    setCurrentView
  } = useApp();

  const lecturer = currentLecturerProfile || lecturerProfiles[0];
  const [selectedCourse, setSelectedCourse] = useState(lecturer?.coursesTaught?.[0] || 'CSC 301');
  const [activeTab, setActiveTab] = useState<'announcements' | 'materials' | 'rep_chat' | 'quizzes' | 'settings'>('announcements');

  // Announcement state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newPriority, setNewPriority] = useState<'normal' | 'urgent'>('normal');
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);

  // Chat state
  const [chatInput, setChatInput] = useState('');

  // Office hours state
  const [officeHours, setOfficeHours] = useState(lecturer?.officeHours || 'Tuesdays & Thursdays, 2:00 PM - 4:00 PM');
  const [officeLocation, setOfficeLocation] = useState(lecturer?.officeLocation || 'Block B, Faculty of Technology, Office 204');
  const [bio, setBio] = useState(lecturer?.bio || '');

  // Announcements for selected course
  const announcementsList = useMemo(() => {
    return courseAnnouncements.filter(a => a.courseCode === selectedCourse);
  }, [courseAnnouncements, selectedCourse]);

  // Messages with Course Rep for selected course
  const chatMessages = useMemo(() => {
    return lecturerRepMessages[selectedCourse] || [];
  }, [lecturerRepMessages, selectedCourse]);

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    addCourseAnnouncement({
      courseCode: selectedCourse,
      courseTitle: courses.find(c => c.courseCode === selectedCourse)?.courseTitle || `${selectedCourse} Module`,
      institutionId: lecturer.institutionId,
      departmentName: lecturer.departmentName,
      title: newTitle.trim(),
      content: newContent.trim(),
      authorId: lecturer.id,
      authorName: `${lecturer.title} ${lecturer.fullName}`,
      authorRole: 'lecturer',
      priority: newPriority
    });

    setNewTitle('');
    setNewContent('');
    setShowAnnouncementForm(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendLecturerRepMessage(selectedCourse, chatInput.trim(), 'lecturer');
    setChatInput('');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateLecturerProfile({
      officeHours,
      officeLocation,
      bio
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16">
      {/* Lecturer Header */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 text-white border-b border-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-800/80 border-2 border-indigo-400/40 flex items-center justify-center font-bold text-2xl text-white shadow-xl">
                {lecturer.title ? lecturer.title.replace('.', '') : 'DR'}
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-indigo-500/20 border border-indigo-400/40 rounded-full text-xs font-semibold text-indigo-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                    <span>VERIFIED ACADEMIC FACULTY</span>
                  </span>
                  <span className="text-xs text-indigo-200">
                    {lecturer.departmentName}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {lecturer.title} {lecturer.fullName}
                </h1>
                <p className="text-sm text-indigo-200 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <span>{lecturer.institutionName} • {lecturer.facultyName}</span>
                </p>
              </div>
            </div>

            {/* Course Selector Tabs */}
            <div className="bg-white/10 p-1.5 rounded-2xl border border-white/10 flex items-center space-x-1">
              {Array.from(new Set(lecturer.coursesTaught)).map((code, idx) => (
                <button
                  key={`${code}_${idx}`}
                  onClick={() => setSelectedCourse(code)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    selectedCourse === code
                      ? 'bg-white text-indigo-950 shadow-md'
                      : 'text-indigo-200 hover:text-white'
                  }`}
                >
                  {code} Space
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-indigo-900/60">
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <span className="text-xs text-indigo-200 block">Current Course Space</span>
              <span className="text-xl font-bold text-white">{selectedCourse}</span>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <span className="text-xs text-indigo-200 block">Enrolled Students</span>
              <span className="text-xl font-bold text-white">142 registered</span>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <span className="text-xs text-indigo-200 block">Verified Course Rep</span>
              <span className="text-sm font-bold text-emerald-400 block mt-1">
                {student.fullName} (Active)
              </span>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <span className="text-xs text-indigo-200 block">Office Consultation</span>
              <span className="text-xs font-medium text-indigo-100 block mt-1 truncate">
                {officeHours}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-1">
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 flex items-center space-x-2 transition ${
              activeTab === 'announcements'
                ? 'border-indigo-600 text-indigo-700 dark:text-indigo-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>Course Announcements ({announcementsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('rep_chat')}
            className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 flex items-center space-x-2 transition ${
              activeTab === 'rep_chat'
                ? 'border-indigo-600 text-indigo-700 dark:text-indigo-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Course Rep Direct Line ({chatMessages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('materials')}
            className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 flex items-center space-x-2 transition ${
              activeTab === 'materials'
                ? 'border-indigo-600 text-indigo-700 dark:text-indigo-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Lecture Materials Vault</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 flex items-center space-x-2 transition ${
              activeTab === 'settings'
                ? 'border-indigo-600 text-indigo-700 dark:text-indigo-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Office Hours & Profile</span>
          </button>
        </div>

        {/* Tab 1: Announcements */}
        {activeTab === 'announcements' && (
          <div className="mt-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Official Class Broadcasts for {selectedCourse}
                </h3>
                <p className="text-xs text-slate-500">
                  Announcements published here are sent directly to all enrolled students and the Course Rep.
                </p>
              </div>
              <button
                onClick={() => setShowAnnouncementForm(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition flex items-center space-x-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>New Class Notice</span>
              </button>
            </div>

            {showAnnouncementForm && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-900 shadow-xl">
                <form onSubmit={handlePostAnnouncement} className="space-y-4">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Publish Official Academic Announcement
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Title:
                    </label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Mid-Semester Continuous Assessment Schedule"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Announcement Details:
                    </label>
                    <textarea
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      rows={4}
                      placeholder="Specify test guidelines, venue, permissible calculators, and syllabus coverage..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Priority:
                      </label>
                      <select
                        value={newPriority}
                        onChange={(e) => setNewPriority(e.target.value as 'normal' | 'urgent')}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-800"
                      >
                        <option value="normal">Normal Class Broadcast</option>
                        <option value="urgent">🚨 Urgent / Examination Notice</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowAnnouncementForm(false)}
                        className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm"
                      >
                        Publish to Students
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            <div className="space-y-4">
              {announcementsList.map(ann => (
                <div key={ann.id} className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                        {ann.courseCode}
                      </span>
                      {ann.priority === 'urgent' && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                          Urgent
                        </span>
                      )}
                      <span className="text-xs text-slate-400">
                        {new Date(ann.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      Author: {ann.authorName}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-2">
                    {ann.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 whitespace-pre-line">
                    {ann.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Course Rep Chat */}
        {activeTab === 'rep_chat' && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-bold">
                  CR
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">{student.fullName}</h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    ✓ Verified Course Representative
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1 text-slate-600 dark:text-slate-300">
                <div><strong>Course:</strong> {selectedCourse}</div>
                <div><strong>Matric No:</strong> {student.matricNumber}</div>
                <div><strong>Class Size:</strong> 142 classmates</div>
              </div>

              <p className="text-xs text-slate-500">
                Liaise with your elected Course Rep on class attendance, laboratory sessions, assignment hand-ins, and student inquiries.
              </p>
            </div>

            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col h-[500px]">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Lecturer ↔ Course Rep Coordination ({selectedCourse})
                  </span>
                </div>
                <span className="text-xs text-slate-500">Direct Academic Channel</span>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {chatMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.senderRole === 'lecturer' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div className="flex items-center space-x-1 text-[11px] text-slate-400 mb-0.5">
                      <span>{msg.senderName}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-sm ${
                        msg.senderRole === 'lecturer'
                          ? 'bg-indigo-600 text-white rounded-tr-none'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={`Send instructions or updates to ${student.fullName} (Course Rep)...`}
                  className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 3: Materials Vault */}
        {activeTab === 'materials' && (
          <div className="mt-6 space-y-4">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Lecture Slides, Notes & Recommended Texts for {selectedCourse}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Resources uploaded here become available to all enrolled students on StudentHub NG.
                </p>
              </div>
              <button
                onClick={() => setCurrentView('materials')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold"
              >
                Upload Course Slides
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studyMaterials
                .filter(m => m.courseCode.includes(selectedCourse) || m.department === lecturer.departmentName)
                .slice(0, 4)
                .map(mat => (
                  <div key={mat.id} className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-sm text-slate-800 dark:text-slate-200">{mat.title}</h5>
                      <p className="text-xs text-slate-500">{mat.courseCode} • {mat.fileType} • {mat.downloadCount} downloads</p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-lg">
                      Published
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Tab 4: Settings & Office Hours */}
        {activeTab === 'settings' && (
          <div className="mt-6 max-w-2xl bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
              Academic Profile & Student Consultation Hours
            </h3>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Office Consultation Hours:
                </label>
                <input
                  type="text"
                  value={officeHours}
                  onChange={(e) => setOfficeHours(e.target.value)}
                  placeholder="e.g. Mondays & Wednesdays, 10:00 AM - 12:00 PM"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Office Location:
                </label>
                <input
                  type="text"
                  value={officeLocation}
                  onChange={(e) => setOfficeLocation(e.target.value)}
                  placeholder="e.g. Block B, Department of Computer Science, Room 204"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Faculty Bio & Research Areas:
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition"
                >
                  Save Profile Information
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
