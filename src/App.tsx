import React, { useState } from 'react';
import { AppProvider, useApp, AppView } from './context/AppContext';
import { ToastContainer } from './components/ToastContainer';
import { AuthModal } from './components/AuthModal';
import { OnboardingModal } from './components/OnboardingModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { SettingsModal } from './components/SettingsModal';

// Feature Views
import { LandingPage } from './components/LandingPage';
import { StudentDashboard } from './components/StudentDashboard';
import { AIStudyCopilot } from './components/AIStudyCopilot';
import { PastQuestionsCenter } from './components/PastQuestionsCenter';
import { GpaCgpaCalculator } from './components/GpaCgpaCalculator';
import { InstitutionDirectory } from './components/InstitutionDirectory';
import { StudyMaterialsVault } from './components/StudyMaterialsVault';
import { ProjectCenter } from './components/ProjectCenter';
import { CommunityForum } from './components/CommunityForum';
import { AdminCommandCenter } from './components/AdminCommandCenter';
import { MyCoursesCenter } from './components/MyCoursesCenter';
import { MyLibrary } from './components/MyLibrary';
import { CourseRepDashboard } from './components/CourseRepDashboard';
import { LecturerDashboard } from './components/LecturerDashboard';
import { BecomeCourseRepModal } from './components/BecomeCourseRepModal';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';

import { 
  GraduationCap, 
  Sparkles, 
  BookOpen, 
  Calculator, 
  Building2, 
  Calendar, 
  FolderKanban, 
  ShoppingBag, 
  Users, 
  ShieldCheck, 
  Sun, 
  Moon, 
  Bell, 
  Menu, 
  X, 
  Crown, 
  FileText, 
  Wallet, 
  BookMarked,
  Search,
  CheckCheck,
  ChevronRight,
  LogOut,
  LogIn,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const AppContent: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    userRole, 
    setUserRole,
    student, 
    theme, 
    toggleTheme,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    currentUser,
    isAuthenticated,
    isAuthLoading,
    logout
  } = useApp();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [courseRepModalOpen, setCourseRepModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const sidebarNavItems: { view: AppView; label: string; icon: string; badge?: string }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: '▤' },
    { view: 'my_courses', label: 'My Courses', icon: '🎓', badge: 'ENROLLED' },
    { view: 'my_library', label: 'My Library & Vault', icon: '📚', badge: 'SAVED' },
    { view: 'copilot', label: 'AI Study Copilot', icon: '✦', badge: 'AI' },
    { view: 'past_questions', label: 'Past Questions', icon: '🗂' },
    { view: 'materials', label: 'Study Materials', icon: '📖' },
    { view: 'gpa_calculator', label: 'GPA Calculator', icon: '📊' },
    { view: 'institutions', label: 'Institutions & Courses', icon: '🏛' },
    { view: 'project_center', label: 'Project Hub', icon: '📁' },
    { view: 'community', label: 'Community', icon: '👥' },
    { view: 'course_rep', label: 'Course Rep Portal', icon: '📢', badge: 'REP' },
    { view: 'lecturer', label: 'Lecturer Space', icon: '👨‍🏫', badge: 'FACULTY' },
    { view: 'admin', label: 'Admin Command', icon: '⚙', badge: 'ADMIN' },
    { view: 'landing', label: 'Website Home', icon: '🌐' }
  ];

  const handleNavClick = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setNotifDropdownOpen(false);
  };

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const query = searchQuery.toLowerCase();
    if (query.includes('gpa') || query.includes('cgpa') || query.includes('grade')) {
      setCurrentView('gpa_calculator');
    } else if (query.includes('past') || query.includes('cbt') || query.includes('exam')) {
      setCurrentView('past_questions');
    } else if (query.includes('copilot') || query.includes('ai') || query.includes('ask')) {
      setCurrentView('copilot');
    } else if (query.includes('institution') || query.includes('unilag') || query.includes('university') || query.includes('course') || query.includes('curriculum') || query.includes('100l') || query.includes('200l') || query.includes('300l') || query.includes('400l')) {
      setCurrentView('institutions');
    } else if (query.includes('project') || query.includes('thesis')) {
      setCurrentView('project_center');
    } else if (query.includes('community') || query.includes('group') || query.includes('chat') || query.includes('circle')) {
      setCurrentView('community');
    } else if (query.includes('note') || query.includes('handout') || query.includes('material')) {
      setCurrentView('materials');
    } else {
      setCurrentView('institutions');
    }
  };

  const renderActiveView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onOpenAuth={() => setAuthModalOpen(true)} />;
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignUpPage />;
      case 'forgot_password':
        return <ForgotPasswordPage />;
      case 'dashboard':
        return (
          <StudentDashboard 
            onOpenProfile={() => setProfileModalOpen(true)}
            onOpenSubscription={() => setSubscriptionModalOpen(true)}
          />
        );
      case 'my_courses':
        return <MyCoursesCenter />;
      case 'my_library':
        return <MyLibrary />;
      case 'course_rep':
        return <CourseRepDashboard onOpenApplyModal={() => setCourseRepModalOpen(true)} />;
      case 'lecturer':
        return <LecturerDashboard />;
      case 'copilot':
        return <AIStudyCopilot />;
      case 'past_questions':
        return <PastQuestionsCenter />;
      case 'gpa_calculator':
        return <GpaCgpaCalculator />;
      case 'institutions':
        return <InstitutionDirectory />;
      case 'materials':
        return <StudyMaterialsVault />;
      case 'project_center':
        return <ProjectCenter />;
      case 'community':
        return <CommunityForum />;
      case 'admin':
        return <AdminCommandCenter />;
      default:
        return (
          <StudentDashboard 
            onOpenProfile={() => setProfileModalOpen(true)}
            onOpenSubscription={() => setSubscriptionModalOpen(true)}
          />
        );
    }
  };

  const getStudentInitials = () => {
    if (!student.fullName) return 'BA';
    const parts = student.fullName.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  // Full-width standalone website & auth pages (Normal Website Architecture)
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
        <LandingPage onOpenAuth={() => setCurrentView('login')} />
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
        <ToastContainer />
      </div>
    );
  }

  if (currentView === 'login') {
    return (
      <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
        <LoginPage />
        <ToastContainer />
      </div>
    );
  }

  if (currentView === 'signup') {
    return (
      <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
        <SignUpPage />
        <ToastContainer />
      </div>
    );
  }

  if (currentView === 'forgot_password') {
    return (
      <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
        <ForgotPasswordPage />
        <ToastContainer />
      </div>
    );
  }

  // Strict Registration & Auth Guard: Users must register and log in to access website tools
  if (!currentUser) {
    return (
      <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
        <SignUpPage />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 overflow-hidden">
      
      {/* Professional Polish Sidebar (Desktop) */}
      <aside className="hidden lg:flex w-64 bg-emerald-900 text-white flex-col flex-shrink-0 z-30 select-none">
        
        {/* Brand Header */}
        <div 
          onClick={() => handleNavClick('dashboard')}
          className="p-6 flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <span className="text-emerald-900 font-bold text-xl leading-none">S</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            StudentHub <span className="text-emerald-400">NG</span>
          </h1>
        </div>

        {/* Navigation Item Links */}
        <nav className="flex-1 px-4 space-y-1 mt-2 overflow-y-auto custom-scrollbar">
          {sidebarNavItems.map(item => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors text-left text-sm ${
                  isActive
                    ? 'bg-emerald-800 text-emerald-50 font-semibold shadow-sm'
                    : 'text-emerald-200 hover:bg-emerald-800/50 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-5 h-5 flex items-center justify-center text-sm ${isActive ? 'opacity-90' : 'opacity-60'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-black rounded bg-emerald-400 text-emerald-950">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Premium Upgrade Card Footer */}
        <div className="p-4 mt-auto border-t border-emerald-800">
          <div className="bg-emerald-800/50 rounded-xl p-4 border border-emerald-700/40">
            <p className="text-xs text-emerald-300 uppercase font-bold tracking-widest mb-1.5">
              Premium Plan
            </p>
            <p className="text-xs text-emerald-50 mb-3 leading-relaxed">
              Get unlimited access to AI Copilot, CBT Explanations & Past Questions.
            </p>
            <button 
              onClick={() => setSubscriptionModalOpen(true)}
              className="w-full bg-emerald-400 hover:bg-emerald-300 text-emerald-950 text-xs font-bold py-2 rounded-md transition-colors shadow-sm"
            >
              Upgrade Now
            </button>
          </div>
        </div>

        {/* User Account / Sign Out Section in Sidebar */}
        <div className="p-3 border-t border-emerald-800 bg-emerald-950/60">
          <div className="flex items-center justify-between gap-2 px-1">
            <div 
              onClick={() => setProfileModalOpen(true)}
              className="flex items-center gap-2.5 min-w-0 cursor-pointer group"
              title="Edit Student Profile"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-600">
                {getStudentInitials()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate group-hover:text-emerald-300">
                  {student.fullName}
                </p>
                <p className="text-[10px] text-emerald-300 truncate">
                  {student.level} • Profile
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main App Container */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden h-full">
        
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-8 z-20 flex-shrink-0">
          
          {/* Mobile Menu Trigger & Search Bar */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <form onSubmit={handleGlobalSearch} className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-1.5 w-44 sm:w-80 md:w-96 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 mr-2 text-xs">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search past questions, institutions..."
                className="bg-transparent border-none text-xs sm:text-sm focus:outline-none w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
              />
            </form>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Self-Service Role Switcher */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs shadow-inner">
              <span className="text-slate-400 font-medium">Role:</span>
              <select
                value={userRole}
                onChange={(e) => {
                  const role = e.target.value as any;
                  setUserRole(role);
                  if (role === 'course_rep') setCurrentView('course_rep');
                  else if (role === 'lecturer') setCurrentView('lecturer');
                  else if (role === 'admin' || role === 'super_admin') setCurrentView('admin');
                }}
                className="bg-transparent font-bold text-slate-800 dark:text-slate-100 focus:outline-none cursor-pointer"
              >
                <option value="student" className="text-slate-900 bg-white dark:bg-slate-900">Student</option>
                <option value="course_rep" className="text-slate-900 bg-white dark:bg-slate-900">Course Rep</option>
                <option value="lecturer" className="text-slate-900 bg-white dark:bg-slate-900">Lecturer</option>
                <option value="admin" className="text-slate-900 bg-white dark:bg-slate-900">Admin</option>
                <option value="super_admin" className="text-slate-900 bg-white dark:bg-slate-900">Super Admin</option>
              </select>
            </div>

            {/* Quick Rep Button for Students */}
            {userRole === 'student' && (
              <button
                onClick={() => setCourseRepModalOpen(true)}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-xl border border-emerald-200 dark:border-emerald-800 transition"
              >
                <span>📢 Become Course Rep</span>
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications with Red Ping */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative text-slate-500 dark:text-slate-400 text-lg hover:text-slate-800 dark:hover:text-white cursor-pointer p-1"
                aria-label="Notifications"
              >
                <span>🔔</span>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full ring-2 ring-white dark:ring-slate-900" />
                )}
              </button>

              {/* Notification Dropdown */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-3 z-50">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationRead(n.id);
                          if (n.linkTab) handleNavClick(n.linkTab as AppView);
                        }}
                        className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors ${
                          !n.isRead ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">
                            {n.title}
                          </h5>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          {n.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill / Auth Actions */}
            <div className="flex items-center gap-2 sm:gap-4 border-l border-slate-200 dark:border-slate-800 pl-3 sm:pl-6">
              <div 
                onClick={() => setProfileModalOpen(true)}
                className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
                title="Click to edit academic profile"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-none group-hover:text-emerald-600 transition-colors">
                    {student.fullName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                    {student.institutionName ? student.institutionName.split(' ')[0] : 'UNILAG'} • {student.level}
                  </p>
                </div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 border-2 border-emerald-500 overflow-hidden flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold text-xs sm:text-sm shadow-sm">
                  {getStudentInitials()}
                </div>
              </div>

              <button
                onClick={logout}
                title="Sign Out"
                className="px-2.5 py-1.5 rounded-xl text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 border border-slate-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-800 transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Sign Out</span>
              </button>
            </div>

          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-emerald-900 text-white px-4 py-4 space-y-2 z-30 flex-shrink-0 shadow-lg">
            <div className="grid grid-cols-2 gap-2 pb-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSubscriptionModalOpen(true);
                }}
                className="px-3 py-2 text-xs font-bold rounded-lg bg-emerald-400 text-emerald-950 flex items-center justify-center gap-1.5"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Upgrade Pro</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="px-3 py-2 text-xs font-bold rounded-lg bg-red-800/80 hover:bg-red-700 text-white flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1 max-h-60 overflow-y-auto pt-2 border-t border-emerald-800">
              {sidebarNavItems.map(item => (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium text-left flex items-center gap-2 ${
                    currentView === item.view
                      ? 'bg-emerald-800 text-white font-bold'
                      : 'text-emerald-200 hover:bg-emerald-800/40'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Scrollable Content View */}
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>
        </div>

      </main>

      {/* Global Modals */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <OnboardingModal />
      <StudentProfileModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
      <SubscriptionModal isOpen={subscriptionModalOpen} onClose={() => setSubscriptionModalOpen(false)} />
      <SettingsModal isOpen={settingsModalOpen} onClose={() => setSettingsModalOpen(false)} />
      <BecomeCourseRepModal isOpen={courseRepModalOpen} onClose={() => setCourseRepModalOpen(false)} />
      <ToastContainer />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

