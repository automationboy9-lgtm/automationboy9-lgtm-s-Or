import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Sparkles, 
  BookOpen, 
  FileText, 
  BookmarkCheck, 
  Share2, 
  Star, 
  ShieldCheck, 
  Globe, 
  CheckCircle2, 
  Layers,
  ArrowRight,
  Eye
} from 'lucide-react';
import { motion } from 'motion/react';
import { StudyMaterial } from '../types';
import { useApp } from '../context/AppContext';

interface StudyMaterialViewerModalProps {
  material: StudyMaterial | null;
  isOpen: boolean;
  onClose: () => void;
  onSearchBrowserForCourse: (courseCode: string) => void;
}

export const StudyMaterialViewerModal: React.FC<StudyMaterialViewerModalProps> = ({
  material,
  isOpen,
  onClose,
  onSearchBrowserForCourse
}) => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'reader' | 'summary' | 'outline'>('reader');
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  if (!isOpen || !material) return null;

  const handleDownload = () => {
    const textContent = `================================================================================
                    STUDENTHUB NG - STUDY RESOURCE VAULT
COURSE CODE:      ${material.courseCode}
COURSE TITLE:     ${material.courseTitle}
RESOURCE TITLE:   ${material.title}
CATEGORY:         ${material.category || 'Lecture Material'}
INSTITUTION:      ${material.institutionName}
DEPARTMENT:       ${material.department} (${material.level})
SEMESTER:         ${material.semester || 'First Semester'}
ACADEMIC YEAR:    ${material.academicYear || '2023/2024'}
UPLOADER:         ${material.uploaderName}
PAGES / SIZE:     ${material.pages} Pages • ${material.fileSize}
================================================================================

1. MODULE OVERVIEW:
${material.description}

2. KEY EXAMINATION PRINCIPLES & SYLLABUS HIGHLIGHTS:
${(material.keyTopics || material.tags || ['Core Definitions', 'Theorems', 'Sample Problems']).map(t => `- ${t}`).join('\n')}

3. COMPREHENSIVE LECTURE STUDY NOTES:
${material.contentPreview || `This study pack covers the accredited syllabus for ${material.courseCode}.
- Module 1: Foundational Theoretical Framework and Definitions.
- Module 2: Applied Mathematical Modeling, Proofs, and Empirical Relations.
- Module 3: Common Examination Pitfalls, Multiple-Choice Analysis, and Model Essay Answers.
- Module 4: Laboratory Protocols and Case Studies.`}

4. ETHICAL & COPYRIGHT COMPLIANCE:
Source: ${material.source}
${material.copyrightNotice || 'Fair-use academic study note for tertiary examination preparation.'}
================================================================================`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${material.courseCode}_${material.title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast('Resource Downloaded', `Successfully saved "${material.title}" to your device.`, 'success');
  };

  const handleGenerateSummary = async () => {
    if (aiSummary) {
      setActiveTab('summary');
      return;
    }

    setIsSummarizing(true);
    setActiveTab('summary');

    try {
      const res = await fetch('/api/copilot/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseCode: material.courseCode,
          title: material.title,
          text: `${material.title}\n${material.description}\n${material.contentPreview || ''}`
        })
      });

      const data = await res.json();
      if (data.summary) {
        setAiSummary(data.summary);
      } else {
        throw new Error('No summary');
      }
    } catch (e) {
      setAiSummary(`### 📖 High-Yield Revision Summary for ${material.courseCode}

**1. Executive Overview:**
- Focuses on the core curriculum benchmarks mandated by the NUC/NBTE.
- Synthesizes theoretical foundations, algorithmic procedures, and empirical problem solving.

**2. Key High-Yield Principles for Exams:**
- Master definitions, derivations, and boundary condition assumptions.
- Memorize recurring formulas and standard SI unit conversions.
- Always structure theory exam solutions with clear steps: *Given Data → Formula → Substitution → Final SI Unit*.`);
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-4xl w-full my-auto overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs sm:text-sm">
              {material.courseCode}
            </span>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-white line-clamp-1">
                {material.title}
              </h3>
              <p className="text-[11px] text-slate-300">
                {material.institutionName} • {material.department} ({material.level})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Selection Bar */}
        <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 flex-wrap shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('reader')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'reader'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Document Reader</span>
            </button>

            <button
              onClick={handleGenerateSummary}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'summary'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI High-Yield Summary</span>
            </button>

            <button
              onClick={() => setActiveTab('outline')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'outline'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Syllabus Breakdown</span>
            </button>
          </div>

          <button
            onClick={() => onSearchBrowserForCourse(material.courseCode)}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Search Web for more {material.courseCode} resources</span>
          </button>
        </div>

        {/* Content Viewer */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'reader' && (
            <div className="space-y-6">
              {/* Meta Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 flex-wrap gap-2">
                  <span>Author / Contributor: <strong className="text-slate-800 dark:text-slate-200">{material.uploaderName}</strong></span>
                  <span>Category: <strong className="text-emerald-600 dark:text-emerald-400">{material.category || 'Lecture Material'}</strong></span>
                  <span>Format: <strong className="text-slate-800 dark:text-slate-200">{material.fileType} ({material.pages} Pages)</strong></span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {material.description}
                </p>
              </div>

              {/* Document Pages Preview Simulation */}
              <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900 shadow-sm space-y-6">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-4 text-center space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                    NIGERIAN TERTIARY CURRICULUM SYLLABUS PACK
                  </span>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">
                    {material.courseCode}: {material.courseTitle}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {material.institutionName} • {material.faculty} • {material.department}
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                    Module 1: Foundational Principles and Theoretical Scope
                  </h4>
                  <p>
                    This study handbook delivers comprehensive instructional coverage designed to satisfy the National Universities Commission (NUC) and National Board for Technical Education (NBTE) benchmarks. Students must familiarize themselves with standard notation, coordinate conventions, and foundational definitions.
                  </p>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300">
                    Key Axiom / Formula: Σ F_x = 0; Σ F_y = 0; Σ M_z = 0 (Static Equilibrium Conditions)
                  </div>

                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm pt-2">
                    Module 2: Analytical Procedures & Exam Problem Patterns
                  </h4>
                  <p>
                    Examination questions in Nigerian institutions consistently test step-by-step problem identification. When answering essay questions, always write down your initial assumptions, cite standard laws, and state final numerical solutions with standard SI units.
                  </p>

                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm pt-2">
                    Module 3: Practice Exercises & Revision Questions
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    <li>Differentiate between fundamental SI quantities and derived dimensional parameters.</li>
                    <li>Solve typical 10-year semester exam questions under timed conditions.</li>
                    <li>Verify theoretical models with empirical laboratory data.</li>
                  </ul>
                </div>

                {material.tags && material.tags.length > 0 && (
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 flex-wrap">
                    {material.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-4">
              <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h4 className="font-extrabold text-sm">AI High-Yield Exam Summary</h4>
              </div>

              {isSummarizing ? (
                <div className="py-8 flex flex-col items-center justify-center space-y-2 text-slate-500 text-xs">
                  <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing high-yield revision flashcard...</span>
                </div>
              ) : (
                <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                  {aiSummary}
                </div>
              )}
            </div>
          )}

          {activeTab === 'outline' && (
            <div className="space-y-4">
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Syllabus & Lecture Delivery Blueprint
              </h4>
              <div className="space-y-2.5">
                {[
                  { week: 'Week 1-2', topic: 'Introduction & Foundational Theoretical Foundations', status: 'Core' },
                  { week: 'Week 3-4', topic: 'Analytical Formulations, Laws, and Governing Equations', status: 'High-Yield' },
                  { week: 'Week 5-6', topic: 'Midterm Test (CBT & Theory Assessment Modules)', status: 'Exam Prep' },
                  { week: 'Week 7-9', topic: 'Applied Problem Solving, Real-World Implementations & Laboratories', status: 'Practical' },
                  { week: 'Week 10-12', topic: 'Comprehensive 10-Year Past Examination Questions Revision', status: 'Exam Prep' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-slate-500">{item.week}</span>
                      <span className="font-bold text-slate-900 dark:text-white">{item.topic}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[10px]">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Source: {material.source}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 font-bold text-slate-700 dark:text-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
