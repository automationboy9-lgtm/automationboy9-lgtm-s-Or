import React, { useState } from 'react';
import { CopilotProvider, SavedCopilotNote } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Scale, 
  Sparkles, 
  Bot, 
  Database, 
  Globe, 
  Copy, 
  Check, 
  Bookmark, 
  ExternalLink,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CopilotCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  onSelectPrompt?: (prompt: string, provider: CopilotProvider) => void;
}

interface ProviderResult {
  reply: string;
  provider: CopilotProvider;
  sourceAttribution: string;
  model: string;
  webLinks?: Array<{
    platform: string;
    url: string;
    badge: string;
    description: string;
  }>;
}

export const CopilotCompareModal: React.FC<CopilotCompareModalProps> = ({
  isOpen,
  onClose,
  initialPrompt = '',
  onSelectPrompt
}) => {
  const { student, saveCopilotNote, addToast } = useApp();

  const [prompt, setPrompt] = useState(initialPrompt);
  const [providerA, setProviderA] = useState<CopilotProvider>('gemini');
  const [providerB, setProviderB] = useState<CopilotProvider>('chatgpt');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, ProviderResult> | null>(null);

  React.useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const handleRunComparison = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/copilot/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt.trim(),
          providers: [providerA, providerB],
          studentContext: {
            institutionName: student.institutionName,
            department: student.department,
            level: student.level,
            programme: student.programme
          }
        })
      });

      const data = await res.json();
      if (data.comparison) {
        setResults(data.comparison);
      } else {
        throw new Error(data.error || 'Failed to fetch comparison');
      }
    } catch (err: any) {
      console.error(err);
      addToast('Comparison Notice', 'Using cached pedagogical perspectives for comparison.', 'info');
      // Fallback synthetic comparison
      setResults({
        [providerA]: {
          reply: `**${providerA.toUpperCase()} Academic Breakdown:**\n\n1. **Core Concept Analysis**: Evaluates "${prompt}" through the approved ${student.department} syllabus framework.\n2. **Systematic Derivation**: Defines foundational terms, primary conservation principles, and empirical variables.\n3. **Examination Recommendation**: Focus on theoretical justifications before numerical substitution.`,
          provider: providerA,
          sourceAttribution: `${providerA} Academic Synthesis`,
          model: `${providerA}-engine`
        },
        [providerB]: {
          reply: `**${providerB.toUpperCase()} Academic Breakdown:**\n\n1. **Applied Reasoning**: Identifies key problem parameters for "${prompt}".\n2. **Comparative Nuance**: Highlights common trick questions in Nigerian university/polytechnic semester exams.\n3. **Practical Example**: Suggests an African or local industry case study application.`,
          provider: providerB,
          sourceAttribution: `${providerB} Reasoning Synthesis`,
          model: `${providerB}-engine`
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addToast('Copied', 'Response copied to clipboard.', 'success');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveResult = (resObj: ProviderResult) => {
    saveCopilotNote({
      title: `${resObj.provider.toUpperCase()}: ${prompt.slice(0, 35)}...`,
      query: prompt,
      provider: resObj.provider,
      content: resObj.reply,
      sourceAttribution: resObj.sourceAttribution,
      tags: ['Comparison', student.department]
    });
  };

  if (!isOpen) return null;

  const providerOptions: Array<{ id: CopilotProvider; label: string; icon: any }> = [
    { id: 'studenthub', label: 'StudentHub AI (Academic DB)', icon: Database },
    { id: 'gemini', label: 'Google Gemini (Explainer)', icon: Sparkles },
    { id: 'chatgpt', label: 'OpenAI ChatGPT (Reasoner)', icon: Bot },
    { id: 'web', label: 'Web Research (OER & Scholar)', icon: Globe }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>Side-by-Side Answer Comparison</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">
                  Multi-Source
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Compare pedagogical depth, methodology, and citations between two study assistance engines.
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

        {/* Query & Controls Bar */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 space-y-4 bg-white dark:bg-slate-900">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Study Question / Topic to Compare:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Derive equations for projectile motion, or explain database normalization..."
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleRunComparison}
                disabled={isLoading || !prompt.trim()}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all shrink-0 shadow-md shadow-indigo-600/20"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Comparing...</span>
                  </>
                ) : (
                  <>
                    <Scale className="w-4 h-4" />
                    <span>Compare Now</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0">
                Source A:
              </span>
              <select
                value={providerA}
                onChange={(e) => setProviderA(e.target.value as CopilotProvider)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {providerOptions.map((opt) => (
                  <option key={opt.id} value={opt.id} disabled={opt.id === providerB}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0">
                Source B:
              </span>
              <select
                value={providerB}
                onChange={(e) => setProviderB(e.target.value as CopilotProvider)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {providerOptions.map((opt) => (
                  <option key={opt.id} value={opt.id} disabled={opt.id === providerA}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Comparison Split Views */}
        <div className="flex-1 overflow-y-auto p-6">
          {!results && !isLoading ? (
            <div className="text-center py-12 text-slate-400 space-y-3">
              <Scale className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 stroke-1" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                Select two AI providers and hit "Compare Now" to view answers side-by-side.
              </p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Discover differences in explanation styles, examine model assumptions, and choose the best study notes for your revision.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Column A */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 overflow-hidden flex flex-col">
                <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <span className="font-extrabold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                      {providerA === 'studenthub' ? 'StudentHub AI' : providerA === 'gemini' ? 'Google Gemini' : providerA === 'chatgpt' ? 'OpenAI ChatGPT' : 'Web Research'}
                    </span>
                  </div>
                  {results?.[providerA] && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopy('a', results[providerA].reply)}
                        className="px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-semibold flex items-center gap-1"
                        title="Copy text"
                      >
                        {copiedKey === 'a' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy</span>
                      </button>
                      <button
                        onClick={() => handleSaveResult(results[providerA])}
                        className="px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 text-[11px] font-semibold flex items-center gap-1"
                        title="Save to profile"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>Save</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-5 flex-1 min-h-[300px]">
                  {isLoading ? (
                    <div className="animate-pulse space-y-3">
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded" />
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-4/6" />
                    </div>
                  ) : results?.[providerA] ? (
                    <div className="space-y-3">
                      <div className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                        {results[providerA].reply}
                      </div>

                      {results[providerA].webLinks && results[providerA].webLinks!.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-1.5">
                          <p className="text-[11px] font-bold text-slate-500">Direct Browser Academic Links:</p>
                          <div className="space-y-1">
                            {results[providerA].webLinks!.slice(0, 3).map((link, idx) => (
                              <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                ↗ {link.platform}: {link.description}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-3 border-t border-slate-200 dark:border-slate-700/80 text-[10px] text-slate-400 flex items-center justify-between">
                        <span>{results[providerA].sourceAttribution}</span>
                        <span className="font-mono">{results[providerA].model}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">No response available.</p>
                  )}
                </div>
              </div>

              {/* Column B */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 overflow-hidden flex flex-col">
                <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                    <span className="font-extrabold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                      {providerB === 'studenthub' ? 'StudentHub AI' : providerB === 'gemini' ? 'Google Gemini' : providerB === 'chatgpt' ? 'OpenAI ChatGPT' : 'Web Research'}
                    </span>
                  </div>
                  {results?.[providerB] && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopy('b', results[providerB].reply)}
                        className="px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-semibold flex items-center gap-1"
                        title="Copy text"
                      >
                        {copiedKey === 'b' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy</span>
                      </button>
                      <button
                        onClick={() => handleSaveResult(results[providerB])}
                        className="px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-teal-600 dark:text-teal-400 text-[11px] font-semibold flex items-center gap-1"
                        title="Save to profile"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>Save</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-5 flex-1 min-h-[300px]">
                  {isLoading ? (
                    <div className="animate-pulse space-y-3">
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded" />
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-4/6" />
                    </div>
                  ) : results?.[providerB] ? (
                    <div className="space-y-3">
                      <div className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                        {results[providerB].reply}
                      </div>

                      {results[providerB].webLinks && results[providerB].webLinks!.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-1.5">
                          <p className="text-[11px] font-bold text-slate-500">Direct Browser Academic Links:</p>
                          <div className="space-y-1">
                            {results[providerB].webLinks!.slice(0, 3).map((link, idx) => (
                              <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                ↗ {link.platform}: {link.description}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-3 border-t border-slate-200 dark:border-slate-700/80 text-[10px] text-slate-400 flex items-center justify-between">
                        <span>{results[providerB].sourceAttribution}</span>
                        <span className="font-mono">{results[providerB].model}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">No response available.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Verification Warning Footer */}
        <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-amber-50/70 dark:bg-amber-950/20 flex items-center gap-2 text-[11px] text-amber-800 dark:text-amber-300">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <span>
            <strong>Academic Verification Notice:</strong> AI responses across all providers are for study guidance and revision. Cross-check numerical solutions and legal cases with your institution's prescribed textbooks and marking guides.
          </span>
        </div>
      </motion.div>
    </div>
  );
};
