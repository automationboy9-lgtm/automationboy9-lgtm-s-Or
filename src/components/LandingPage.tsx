import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NIGERIAN_INSTITUTIONS } from '../data/institutionsData';
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
  ArrowRight, 
  CheckCircle2, 
  Award, 
  FileText, 
  Wallet, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare,
  Search,
  Star,
  Cpu,
  Layers,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onOpenAuth?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = () => {
  const { 
    setCurrentView, 
    currentUser, 
    isAuthenticated, 
    student, 
    theme, 
    toggleTheme
  } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [institutionFilter, setInstitutionFilter] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Registered students access directly; all newcomers must register first
  const handleFeatureClick = (targetView: any) => {
    if (isAuthenticated) {
      setCurrentView(targetView);
    } else {
      setCurrentView('signup');
    }
  };

  const faqs = [
    {
      q: 'Does StudentHub NG support both Nigerian Universities (5.0 scale) and Polytechnics (4.0 scale)?',
      a: 'Yes! StudentHub NG includes a dual-engine GPA and CGPA calculator that precisely computes 5.0 scale (A=5, B=4, C=3, D=2, E=1, F=0) for Federal, State, and Private Universities, as well as 4.0 scale (Distinction, Upper Credit, Lower Credit, Pass) for Polytechnics, Monotechnics, and Colleges of Education.'
    },
    {
      q: 'How does the AI Study Copilot assist Nigerian students with past questions and assignments?',
      a: 'Our AI Study Copilot is trained on Nigerian tertiary academic syllabi (NUC, NBTE, and NCCE standards). It breaks down complex 10-year past questions step-by-step, explains standard exam marking schemes, generates chapter outlines for research projects, and synthesizes lengthy lecture notes into high-yield exam revision summaries.'
    },
    {
      q: 'Are past questions and lecture notes tailored to my specific Nigerian tertiary institution?',
      a: 'Yes. StudentHub NG hosts departmental past questions, GST series (GST 101, 102, 103, 201), course outlines, and study materials organized by institution (e.g. UI, UNILAG, OAU, ABU, FUTA, UNN, YABATECH, LASU, and more), faculty, department, and semester.'
    },
    {
      q: 'Can I generate and structure my Final-Year Project on StudentHub NG?',
      a: 'Absolutely. The Final-Year Project Center provides an AI topic generator tailored to your department, problem statement formulator, Chapter 1 through 5 architectural templates, and APA 7th edition citation formatting for Nigerian academic research.'
    },
    {
      q: 'Is StudentHub NG free to use for Nigerian students?',
      a: 'All core tools—including the GPA/CGPA Calculator, Nigerian Institution Directory, Student Community & Study Groups, and standard Past Questions practice—are 100% free forever. Students can optionally upgrade to StudentHub Pro for unlimited AI Copilot queries and advanced exam analytics.'
    }
  ];

  const featuredFeatures = [
    {
      icon: <Sparkles className="w-6 h-6 text-emerald-500" />,
      title: 'AI Study Copilot',
      desc: 'Instant step-by-step concept explanations, past question breakdown, and assignment structure assistant.',
      view: 'copilot' as const,
      tag: 'Powered by Gemini AI'
    },
    {
      icon: <BookOpen className="w-6 h-6 text-blue-500" />,
      title: '10-Year Past Questions & CBT',
      desc: 'Search authentic past questions by course code, session, and institution. Take timed mock exams with instant scorecards.',
      view: 'past_questions' as const,
      tag: '14,000+ Verified Questions'
    },
    {
      icon: <Calculator className="w-6 h-6 text-purple-500" />,
      title: '5.0 & 4.0 GPA / CGPA Engine',
      desc: 'Calculate semester GPA, track multi-session CGPA, and forecast the target grades needed for First Class or Distinction.',
      view: 'gpa_calculator' as const,
      tag: 'NUC & NBTE Aligned'
    },
    {
      icon: <Building2 className="w-6 h-6 text-amber-500" />,
      title: 'Nigerian Institutions Directory',
      desc: 'Explore accredited faculties, departments, cut-offs, and programmes across Federal, State, and Private tertiary schools.',
      view: 'institutions' as const,
      tag: '160+ Institutions'
    },
    {
      icon: <Users className="w-6 h-6 text-teal-500" />,
      title: 'Peer Study Groups & Community',
      desc: 'Connect with coursemates nationwide, form peer reading circles, exchange study resources, and collaborate on difficult course topics.',
      view: 'community' as const,
      tag: 'Social & Reading Circles'
    },
    {
      icon: <FolderKanban className="w-6 h-6 text-rose-500" />,
      title: 'Final-Year Project Center',
      desc: 'AI project topic generator by department, proposal blueprints, Chapter 1-5 guides, and APA 7th reference builder.',
      view: 'project_center' as const,
      tag: 'Research Hub'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      
      {/* Website Navigation Header */}
      <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                StudentHub <span className="text-emerald-600 dark:text-emerald-400">NG</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
                Nigeria 🇳🇬
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <button 
              onClick={() => handleFeatureClick('gpa_calculator')} 
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              GPA Calculator
            </button>
            <button 
              onClick={() => handleFeatureClick('past_questions')} 
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Past Questions
            </button>
            <button 
              onClick={() => handleFeatureClick('copilot')} 
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>AI Copilot</span>
            </button>
            <button 
              onClick={() => handleFeatureClick('institutions')} 
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Institutions
            </button>
            <button 
              onClick={() => handleFeatureClick('materials')} 
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Study Materials
            </button>
          </nav>

          {/* Actions: Theme Toggle & Sign In / Portal */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {isAuthenticated ? (
              <button
                onClick={() => setCurrentView('dashboard')}
                className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => setCurrentView('login')}
                  className="py-2 px-3 sm:px-4 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setCurrentView('signup')}
                  className="py-2 px-3.5 sm:px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Register</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Nav Dropdown */}
        {mobileNavOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-3">
            <button 
              onClick={() => { handleFeatureClick('gpa_calculator'); setMobileNavOpen(false); }} 
              className="block w-full text-left py-2 text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              GPA Calculator
            </button>
            <button 
              onClick={() => { handleFeatureClick('past_questions'); setMobileNavOpen(false); }} 
              className="block w-full text-left py-2 text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              Past Questions
            </button>
            <button 
              onClick={() => { handleFeatureClick('copilot'); setMobileNavOpen(false); }} 
              className="block w-full text-left py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
            >
              AI Study Copilot
            </button>
            <button 
              onClick={() => { handleFeatureClick('institutions'); setMobileNavOpen(false); }} 
              className="block w-full text-left py-2 text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              Nigerian Institutions Directory
            </button>
            <button 
              onClick={() => { handleFeatureClick('materials'); setMobileNavOpen(false); }} 
              className="block w-full text-left py-2 text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              Study Materials
            </button>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex gap-2">
              <button
                onClick={() => { setCurrentView('login'); setMobileNavOpen(false); }}
                className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-bold text-center"
              >
                Sign In
              </button>
              <button
                onClick={() => { setCurrentView('signup'); setMobileNavOpen(false); }}
                className="flex-1 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold text-center"
              >
                Register
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Content */}
      <main className="flex-1 space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/10 to-teal-500/15 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Everything Student. One Platform.</span>
          </motion.div>

          {/* Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
          >
            The Operating System for Students in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Nigerian Tertiary Institutions</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Empowering students across Nigerian Universities, Polytechnics, Monotechnics, and Colleges of Education with AI Study Copilot, past questions, 5.0/4.0 CGPA calculators, and smart academic tools.
          </motion.p>

          {/* Primary CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <button
              onClick={() => setCurrentView('signup')}
              className="px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Register to Access Website</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentView('login')}
              className="px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-700 flex items-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <span>Sign In</span>
            </button>

            <button
              onClick={() => handleFeatureClick('copilot')}
              className="px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-700 flex items-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>AI Study Copilot</span>
            </button>

            <button
              onClick={() => handleFeatureClick('past_questions')}
              className="px-5 py-3.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Past Questions</span>
            </button>
          </motion.div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 max-w-3xl mx-auto">
            <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-sm text-center">
              <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">160+</p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">Institutions Covered</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-sm text-center">
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">14,000+</p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">Past Questions & Solns</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-sm text-center">
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">5.0 & 4.0</p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">Dual CGPA Engines</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-sm text-center">
              <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">99.8%</p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">NUC & NBTE Aligned</p>
            </div>
          </div>
        </div>

        {/* Institution Marquee Ticker */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
            Trusted by students across leading Nigerian institutions
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
            {NIGERIAN_INSTITUTIONS.slice(0, 10).map(inst => (
              <button
                key={inst.id}
                onClick={() => setCurrentView('institutions')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/70 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{inst.shortName}</span>
                <span className="text-[10px] text-slate-400 hidden md:inline">({inst.city})</span>
              </button>
            ))}
            <button
              onClick={() => setCurrentView('institutions')}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:underline"
            >
              + 150 more →
            </button>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>Built for Academic Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Everything You Need from 100L to Convocation
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            A comprehensive suite of academic, productivity, research, and campus tools designed specifically for the realities of Nigerian tertiary education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredFeatures.map((feat, idx) => (
            <div
              key={idx}
              onClick={() => handleFeatureClick(feat.view)}
              className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {feat.icon}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {feat.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>{isAuthenticated ? 'Open Tool' : 'Register to Access'}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section className="bg-slate-100/70 dark:bg-slate-900/60 py-16 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              How StudentHub NG Works in 3 Simple Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Get setup in under 60 seconds with your institution, faculty, and department.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                Select Institution & Level
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Choose your Nigerian University, Polytechnic, or College. Pick your department and current level (100L - 600L, ND, HND).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <div className="w-9 h-9 rounded-xl bg-teal-600 text-white font-extrabold text-sm flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                Unlock AI Copilot & Materials
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Ask the AI Study Copilot tough concept queries, practice 10-year past questions, and download vetted departmental summaries.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                Track CGPA & Plan Semesters
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Use the 5.0 or 4.0 dual grading engine to calculate semester points and forecast the path to First Class or Distinction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About StudentHub NG Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-emerald-900 to-slate-900 text-white shadow-xl flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              Our Vision
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              Reimagining Tertiary Education for the Nigerian Student
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Nigerian tertiary students navigate immense hurdles—from finding authentic past questions and syllabus changes to computing complex 5.0/4.0 grade boundaries. StudentHub NG brings all essential academic, productivity, and campus utilities into a single, unified digital hub.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Fabricated Data</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Departmental Syllabi</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>NUC, NBTE & NCCE Compliant</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-96 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-4">
            <Award className="w-12 h-12 text-amber-400 mx-auto" />
            <div>
              <h4 className="font-bold text-lg">Ready to Excel This Semester?</h4>
              <p className="text-xs text-slate-300 mt-1">
                Join thousands of students from UI, UNILAG, OAU, FUTA, ABU, UNN, and YABATECH.
              </p>
            </div>
            <button
              onClick={() => setCurrentView('signup')}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-md transition-colors cursor-pointer"
            >
              Get Started Now — It's Free
            </button>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Answers to common questions about StudentHub NG, grading scales, and study tools.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact & Support Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Academic Support</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">support@studenthub.ng</p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">24/7 Student Desk</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Campus Ambassador Program</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">ambassadors@studenthub.ng</p>
              <p className="text-[11px] text-blue-600 dark:text-blue-400 mt-1">Active across 36 States</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">StudentHub NG HQ</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Yaba Tech Hub / University Road</p>
              <p className="text-[11px] text-purple-600 dark:text-purple-400 mt-1">Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 pt-8 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-extrabold text-xs">
              S
            </div>
            <span className="font-extrabold text-sm text-slate-900 dark:text-white">
              StudentHub <span className="text-emerald-600">NG</span>
            </span>
            <span className="text-xs text-slate-400 ml-2">© {new Date().getFullYear()} StudentHub NG. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <button onClick={() => handleFeatureClick('institutions')} className="hover:text-emerald-600 cursor-pointer">Directory</button>
            <button onClick={() => handleFeatureClick('past_questions')} className="hover:text-emerald-600 cursor-pointer">Past Questions</button>
            <button onClick={() => handleFeatureClick('gpa_calculator')} className="hover:text-emerald-600 cursor-pointer">CGPA Engine</button>
            <button onClick={() => handleFeatureClick('community')} className="hover:text-emerald-600 cursor-pointer">Community Hub</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
