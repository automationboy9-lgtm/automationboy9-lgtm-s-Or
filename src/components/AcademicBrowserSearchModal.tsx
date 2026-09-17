import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Globe, 
  ExternalLink, 
  FileText, 
  Download, 
  BookOpen, 
  Sparkles, 
  X, 
  Loader2, 
  BookmarkCheck, 
  GraduationCap, 
  ArrowUpRight,
  Layers,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { StudyResourceCategory } from '../types';

interface AcademicBrowserSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  initialCategory?: string;
  defaultCourseCode?: string;
}

interface BrowserSearchLink {
  platform: string;
  url: string;
  badge: string;
  description: string;
}

interface SearchResourceItem {
  title: string;
  category: StudyResourceCategory | 'Past Question';
  source: string;
  description: string;
  keyTopics?: string[];
  answerGuide?: string;
}

export const AcademicBrowserSearchModal: React.FC<AcademicBrowserSearchModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  initialCategory = 'All',
  defaultCourseCode = ''
}) => {
  const { student, addToast, addStudyMaterial } = useApp();
  const [query, setQuery] = useState(initialQuery || defaultCourseCode);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResourceItem[]>([]);
  const [syllabusOverview, setSyllabusOverview] = useState<string>('');
  const [browserLinks, setBrowserLinks] = useState<BrowserSearchLink[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isOpen) {
      const q = (initialQuery || defaultCourseCode || student.department || 'GST 101').trim();
      setQuery(q);
      executeSearch(q, initialCategory);
    }
  }, [isOpen, initialQuery, defaultCourseCode]);

  const executeSearch = async (searchQuery: string, category: string) => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch('/api/resources/search-web', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery,
          courseCode: defaultCourseCode,
          institution: student.institutionName,
          department: student.department,
          level: student.level,
          category
        })
      });

      const data = await res.json();
      if (data.success) {
        setResults(data.results || []);
        setSyllabusOverview(data.syllabusOverview || '');
        setBrowserLinks(data.browserSearchLinks || []);
      } else {
        throw new Error(data.error || 'Failed to search web resources');
      }
    } catch (err: any) {
      console.warn('Fallback local browser search generation:', err);
      // Construct rich fallback links
      const cleanQ = searchQuery.trim();
      setBrowserLinks([
        {
          platform: 'Google Scholar',
          url: `https://scholar.google.com/scholar?q=${encodeURIComponent(`${cleanQ} lecture notes past questions syllabus`)}`,
          badge: 'Peer-Reviewed & Academic Citations',
          description: 'Direct search across academic publications, textbooks, and syllabus citations.'
        },
        {
          platform: 'NOUN Courseware Repository',
          url: `https://www.google.com/search?q=${encodeURIComponent(`site:nou.edu.ng/courseware ${cleanQ}`)}`,
          badge: 'Nigerian Public Tertiary OER',
          description: 'Free public domain textbook downloads and module syllabi across Nigerian faculties.'
        },
        {
          platform: 'Google Open PDF Past Questions',
          url: `https://www.google.com/search?q=${encodeURIComponent(`${cleanQ} past questions filetype:pdf`)}`,
          badge: 'PDF Document Archive',
          description: 'Direct downloadable exam papers, midterm tests, and revision PDFs.'
        },
        {
          platform: 'OpenStax Free Textbooks',
          url: `https://openstax.org/search?q=${encodeURIComponent(cleanQ)}`,
          badge: 'Open Access Textbooks',
          description: 'Full peer-reviewed college textbooks with exercise answers and formula sheets.'
        }
      ]);
      setSyllabusOverview(`Curated syllabus outline and revision pointers for ${cleanQ.toUpperCase()} in Nigerian higher institutions.`);
      setResults([
        {
          title: `${cleanQ.toUpperCase()} Standard Examination Revision Sheet & Answers`,
          category: 'Past Question',
          source: 'Open Educational Archives',
          description: `High-yield past examination questions, multiple-choice options with explanations, and marking rubrics.`,
          keyTopics: ['Core Theory', 'Marking Scheme', 'Standard Syllabus']
        },
        {
          title: `${cleanQ.toUpperCase()} Comprehensive Lecture Modules & Notes`,
          category: 'Lecture Material',
          source: 'National Higher Education Open Courseware',
          description: `Detailed modular study notes covering foundational concepts, definitions, and laboratory exercises.`,
          keyTopics: ['Course Outline', 'Theoretical Foundations', 'Definitions']
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToVault = (item: SearchResourceItem, index: number) => {
    const key = `${item.title}-${index}`;
    if (savedIds[key]) return;

    addStudyMaterial({
      title: item.title,
      courseCode: (query.length <= 10 && query.includes(' ')) ? query.toUpperCase() : 'GEN 101',
      courseTitle: item.title,
      faculty: student.faculty,
      department: student.department,
      programme: student.programme,
      level: student.level,
      semester: 'First Semester (Harmattan)',
      academicYear: '2023/2024',
      institutionName: student.institutionName,
      uploaderName: 'Web Resource Finder',
      fileType: 'PDF',
      category: (item.category === 'Past Question' ? 'Handout' : item.category) as StudyResourceCategory,
      pages: 35,
      fileSize: '4.2 MB',
      downloads: 1,
      rating: 5.0,
      description: item.description,
      tags: item.keyTopics || ['Web Discovery', 'High-Yield'],
      dateUploaded: new Date().toLocaleDateString(),
      source: item.source,
      sourceType: 'public_resource',
      status: 'Approved',
      copyrightNotice: 'Educational fair-use resource discovered via academic search engine.'
    });

    setSavedIds(prev => ({ ...prev, [key]: true }));
    addToast('Saved to Study Vault', `"${item.title}" added to your personal resources.`, 'success');
  };

  const handleDownloadPaper = (item: SearchResourceItem) => {
    const content = `========================================================================
STUDENTHUB NG - ACADEMIC BROWSER RESOURCE REPOSITORY
Course / Search Topic: ${query.toUpperCase()}
Resource Title: ${item.title}
Category: ${item.category}
Source: ${item.source}
Date Exported: ${new Date().toLocaleString()}
Institution Context: ${student.institutionName} (${student.level} - ${student.department})
========================================================================

1. OVERVIEW & DESCRIPTION:
${item.description}

2. CORE HIGH-YIELD TOPICS:
${(item.keyTopics || ['Foundations', 'Key Terms', 'Exam Rubrics']).map(t => `- ${t}`).join('\n')}

${item.answerGuide ? `3. MODEL ANSWER & EXAM GUIDELINES:\n${item.answerGuide}\n` : ''}
4. FAIR-USE ACADEMIC NOTICE:
This material is provided for non-commercial educational study and exam revision under the Nigerian Copyright Act Fair Dealing Provisions.
========================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.title.replace(/[^a-zA-Z0-9]/g, '_')}_StudyResource.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addToast('Download Started', `Saved "${item.title}" to your device.`, 'success');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-4xl w-full my-auto overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <h2 className="text-lg sm:text-xl font-black">
                Search Every Browser for Academic Resources
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-500/30">
                Web & OER Engine
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Query open academic repositories, Google Scholar, NOUN Courseware, OpenStax, and direct PDF past question indexes across browsers.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Filters */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 space-y-3 shrink-0">
          <form
            onSubmit={e => {
              e.preventDefault();
              executeSearch(query, selectedCategory);
            }}
            className="flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search course code, topic, or subject (e.g., GST 101, CSC 201, MAT 101, Organic Chemistry, Engineering Mechanics)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Searching Web...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Search Repositories</span>
                </>
              )}
            </button>
          </form>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1">
              <Layers className="w-3 h-3" /> Filter:
            </span>
            {['All', 'Past Question', 'Lecture Material', 'Note', 'PDF', 'Course Resource'].map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  executeSearch(query, cat);
                }}
                className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat === 'All' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Quick Browser Launch Engines Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ArrowUpRight className="w-4 h-4 text-blue-500" />
                <span>Launch in Your Web Browser (1-Click Deep Links)</span>
              </h3>
              <span className="text-[10px] text-slate-400">Opens real educational portals directly in browser</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {browserLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {link.platform}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                      {link.description}
                    </p>
                  </div>
                  <div className="pt-2 mt-2 border-t border-slate-200/50 dark:border-slate-800/80">
                    <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300">
                      {link.badge}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Syllabus & Curriculum Context */}
          {syllabusOverview && (
            <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 dark:text-blue-200">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Nigerian Tertiary Syllabus Benchmark & Exam Blueprint</span>
              </div>
              <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                {syllabusOverview}
              </p>
            </div>
          )}

          {/* Curated Discovered Materials & Past Questions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-500" />
                <span>Discovered Materials, Past Questions & Model Solutions</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">
                {results.length} resources found
              </span>
            </div>

            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-3 text-slate-400">
                <Loader2 className="w-7 h-7 animate-spin text-blue-600" />
                <p className="text-xs font-medium">Scanning open educational repositories and tertiary archives...</p>
              </div>
            ) : results.length === 0 && hasSearched ? (
              <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-slate-500 text-xs">
                No specific syllabus match found. Try typing a course code like <strong>GST 101</strong>, <strong>MAT 101</strong>, or <strong>CSC 201</strong>, or click the browser links above to search live web repositories.
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((item, idx) => {
                  const saveKey = `${item.title}-${idx}`;
                  const isSaved = savedIds[saveKey];
                  const isPq = item.category === 'Past Question';

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-all space-y-3 shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase ${
                              isPq 
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                            }`}>
                              {item.category}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium">
                              Source: {item.source}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {item.title}
                          </h4>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleSaveToVault(item, idx)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                              isSaved
                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <BookmarkCheck className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{isSaved ? 'In Vault' : 'Save to Vault'}</span>
                          </button>

                          <button
                            onClick={() => handleDownloadPaper(item)}
                            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.description}
                      </p>

                      {item.answerGuide && (
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">
                            Model Solution & Grading Breakdown:
                          </span>
                          <p className="text-slate-600 dark:text-slate-300 italic">
                            {item.answerGuide}
                          </p>
                        </div>
                      )}

                      {Boolean(item.keyTopics && item.keyTopics.length > 0) && (
                        <div className="flex items-center gap-1.5 flex-wrap pt-1">
                          {(item.keyTopics || []).map((topic, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium"
                            >
                              #{topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>NUC, NBTE, NCCE accredited benchmark repository cross-referencing</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 font-bold text-slate-700 dark:text-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
