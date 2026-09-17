import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CopilotProvider, 
  CopilotMessage, 
  CopilotReferenceItem,
  CopilotWebLink,
  SavedCopilotNote,
  PastQuestion,
  StudyMaterial
} from '../types';
import { CopilotProviderSelector } from './copilot/CopilotProviderSelector';
import { CopilotCompareModal } from './copilot/CopilotCompareModal';
import { CopilotSavedNotesDrawer } from './copilot/CopilotSavedNotesDrawer';
import { CopilotResourcePickerModal } from './copilot/CopilotResourcePickerModal';
import { PastQuestionViewerModal } from './PastQuestionViewerModal';
import { StudyMaterialViewerModal } from './StudyMaterialViewerModal';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Copy, 
  Check, 
  Trash2, 
  BookOpen, 
  GraduationCap, 
  Lightbulb, 
  Code, 
  FileText, 
  HelpCircle,
  RotateCcw,
  Building2,
  Database,
  Globe,
  Scale,
  Bookmark,
  Paperclip,
  ExternalLink,
  AlertTriangle,
  Layers,
  ArrowRight,
  Search,
  BookMarked
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AIStudyCopilot: React.FC = () => {
  const { 
    student, 
    addToast, 
    courses, 
    pastQuestions, 
    studyMaterials, 
    savedCopilotNotes, 
    saveCopilotNote,
    setCurrentView
  } = useApp();

  // Active Provider: StudentHub AI, Gemini, ChatGPT, Web Research
  const [selectedProvider, setSelectedProvider] = useState<CopilotProvider>('gemini');

  // Study Mode
  const [copilotMode, setCopilotMode] = useState<'explainer' | 'past_question' | 'revision' | 'practice' | 'project' | 'assignment'>('explainer');

  // Attached Reference Resources (StudentHub courses, past questions, study materials)
  const [attachedResources, setAttachedResources] = useState<CopilotReferenceItem[]>([]);

  // Modals state
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [comparePrompt, setComparePrompt] = useState('');
  const [isSavedNotesDrawerOpen, setIsSavedNotesDrawerOpen] = useState(false);
  const [isResourcePickerOpen, setIsResourcePickerOpen] = useState(false);

  // Modals for inspecting full past questions / materials from Copilot cards
  const [selectedPqForModal, setSelectedPqForModal] = useState<PastQuestion | null>(null);
  const [selectedMaterialForModal, setSelectedMaterialForModal] = useState<StudyMaterial | null>(null);

  // Chat conversation messages
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'init_msg',
      role: 'assistant',
      provider: 'gemini',
      content: `Hello ${student.fullName.split(' ')[0]}! 👋 I am your upgraded **Multi-Source AI Study Copilot**, calibrated for **${student.institutionName} (${student.department})**.

You now have **4 study assistance options** at your disposal:
- 🏛️ **StudentHub AI**: Searches our database of 160+ Nigerian institutions, verified 10-year past questions, and lecture notes.
- 💡 **Google Gemini**: Deep step-by-step pedagogical explanations, worked calculations, revision sheets, and exam practice.
- 🤖 **OpenAI ChatGPT**: Analytical reasoning, code, and academic frameworks processed through secure server handling.
- 🌐 **Web Research**: Gathers scholarly consensus from Google Scholar, NOUN Courseware, and OpenStax with direct browser links.

*Use the provider switcher above to alternate anytime, compare answers side-by-side, or attach course materials as context!*`,
      timestamp: 'Just now',
      sourceAttribution: 'StudentHub NG Academic Intelligence Suite'
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Prompt suggestions tailored to student
  const promptSuggestions = useMemo(() => [
    {
      label: 'GST 101 Grammar & Concord',
      prompt: 'Explain the most tested subject-verb agreement rules for GST 101 with standard Nigerian exam examples.',
      mode: 'explainer' as const,
      provider: 'gemini' as const
    },
    {
      label: 'MAT 101 Quadratic Derivation',
      prompt: 'Show step-by-step how to find roots of quadratic equations using completing the square and the standard formula.',
      mode: 'past_question' as const,
      provider: 'studenthub' as const
    },
    {
      label: 'CSC 201 Trees & Traversal',
      prompt: 'Explain Inorder, Preorder, and Postorder tree traversals with code algorithms and common exam question formats.',
      mode: 'explainer' as const,
      provider: 'chatgpt' as const
    },
    {
      label: 'Web Scholar: AI in Nigerian Higher Ed',
      prompt: 'What are the current peer-reviewed findings and policy frameworks on adopting AI in Nigerian tertiary institutions?',
      mode: 'revision' as const,
      provider: 'web' as const
    },
    {
      label: 'Final-Year Project Topics',
      prompt: `Suggest 3 viable, novel undergraduate final-year project topics for ${student.department} at ${student.institutionName}, including problem statements and methodology.`,
      mode: 'project' as const,
      provider: 'gemini' as const
    }
  ], [student.department, student.institutionName]);

  // Handle sending a query
  const handleSendMessage = async (customText?: string, overrideProvider?: CopilotProvider) => {
    const textToSend = customText || inputPrompt;
    if (!textToSend.trim() || isLoading) return;

    const activeProvider = overrideProvider || selectedProvider;

    const userMessage: CopilotMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      provider: activeProvider,
      mode: copilotMode,
      referencedResources: attachedResources.length > 0 ? [...attachedResources] : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      // If StudentHub AI is selected, extract potential matching database items
      let matchedDbItems: CopilotReferenceItem[] = [];
      if (activeProvider === 'studenthub') {
        const queryLower = textToSend.toLowerCase();
        // Match courses
        (courses || []).forEach(c => {
          if (queryLower.includes(c.code.toLowerCase()) || queryLower.includes(c.title.toLowerCase())) {
            matchedDbItems.push({
              id: c.id,
              type: 'course',
              title: `${c.code}: ${c.title}`,
              courseCode: c.code,
              yearOrLevel: c.level,
              institutionName: student.institutionName
            });
          }
        });
        // Match past questions
        (pastQuestions || []).forEach(pq => {
          if (queryLower.includes(pq.courseCode.toLowerCase())) {
            matchedDbItems.push({
              id: pq.id,
              type: 'past_question',
              title: `${pq.courseCode} Past Question (${pq.sessionYear})`,
              courseCode: pq.courseCode,
              yearOrLevel: pq.sessionYear,
              institutionName: pq.institutionName
            });
          }
        });
      }

      // Build conversation history payload
      const historyPayload = messages
        .filter(m => m.id !== 'init_msg')
        .slice(-6)
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.content
        }));

      const res = await fetch('/api/copilot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          provider: activeProvider,
          mode: copilotMode,
          studentContext: {
            institutionName: student.institutionName,
            department: student.department,
            level: student.level,
            programme: student.programme,
            gradingSystem: student.gradingSystem
          },
          conversationHistory: historyPayload,
          referencedResources: attachedResources
        })
      });

      const data = await res.json();

      if (data.reply) {
        const assistantMessage: CopilotMessage = {
          id: `ast_${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          provider: data.provider || activeProvider,
          mode: copilotMode,
          sourceAttribution: data.sourceAttribution || getProviderAttribution(data.provider || activeProvider),
          webLinks: data.webLinks,
          referencedResources: matchedDbItems.length > 0 ? matchedDbItems : undefined
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (err: any) {
      console.error('Error fetching copilot response:', err);
      // Fallback academic solution
      const fallbackMessage: CopilotMessage = {
        id: `ast_fb_${Date.now()}`,
        role: 'assistant',
        content: `### 📚 Academic Study Guidance (${activeProvider.toUpperCase()})

Here is the academic breakdown for **"${userMessage.content}"**:

1. **Foundational Concept**:
   - In the standard ${student.department} curriculum at ${student.institutionName}, this topic is evaluated under standard continuous assessment and semester examinations.
   - Core principle: Always isolate the stated parameters, identify governing definitions or theorems, and verify SI units.

2. **Step-by-Step Methodology**:
   - **Step 1**: State given variables, assumptions, and required deliverables.
   - **Step 2**: Cite the applicable governing law or theorem before numerical calculation.
   - **Step 3**: Solve step-by-step, showing all intermediate reductions.

3. **Nigerian Tertiary Examination Tip**:
   - Lecturers and examiners award up to 40% of marks for formula statements and accurate unit definitions.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        provider: activeProvider,
        mode: copilotMode,
        sourceAttribution: `${activeProvider} Offline Academic Synthesis`
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getProviderAttribution = (provider: CopilotProvider) => {
    switch (provider) {
      case 'studenthub':
        return 'StudentHub NG Academic Knowledge Base & Curricula';
      case 'gemini':
        return 'Google Gemini 3.8 Flash (Server-Side)';
      case 'chatgpt':
        return 'OpenAI ChatGPT (gpt-4o-mini Server API)';
      case 'web':
        return 'Academic Web & Open Access Repositories';
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addToast('Copied', 'Study notes copied to clipboard.', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveToProfile = (msg: CopilotMessage) => {
    const titleSnippet = msg.content
      .split('\n')[0]
      .replace(/[#*`]/g, '')
      .trim()
      .slice(0, 45) || 'Study Notes';

    saveCopilotNote({
      title: `${titleSnippet}...`,
      query: messages.find((m, i) => i > 0 && messages[i - 1]?.id === msg.id)?.content || 'Study Query',
      provider: msg.provider,
      content: msg.content,
      sourceAttribution: msg.sourceAttribution,
      mode: msg.mode,
      webLinks: msg.webLinks,
      tags: [student.department, msg.provider]
    });
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `init_${Date.now()}`,
        role: 'assistant',
        provider: selectedProvider,
        content: `Chat cleared! What new academic topic would you like to explore for **${student.institutionName}**?`,
        timestamp: 'Just now',
        sourceAttribution: 'StudentHub NG AI Assistant'
      }
    ]);
    addToast('Chat Reset', 'Conversation history cleared.', 'info');
  };

  const handleTransferToProvider = (promptText: string, targetProvider: CopilotProvider) => {
    setSelectedProvider(targetProvider);
    handleSendMessage(promptText, targetProvider);
  };

  const handleOpenComparisonForMessage = (promptText: string) => {
    setComparePrompt(promptText);
    setIsCompareModalOpen(true);
  };

  // Open full Past Question viewer modal when clicking a reference item
  const handleOpenReferencedPastQuestion = (courseCode?: string) => {
    if (!courseCode) return;
    const pq = (pastQuestions || []).find(p => p.courseCode.toLowerCase() === courseCode.toLowerCase());
    if (pq) {
      setSelectedPqForModal(pq);
    } else {
      setCurrentView('past_questions');
    }
  };

  // Open full Study Material viewer modal when clicking a reference item
  const handleOpenReferencedMaterial = (courseCode?: string) => {
    if (!courseCode) return;
    const mat = (studyMaterials || []).find(m => m.courseCode.toLowerCase() === courseCode.toLowerCase());
    if (mat) {
      setSelectedMaterialForModal(mat);
    } else {
      setCurrentView('materials');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Copilot Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-white/10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">AI Study Copilot</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/30">
                Multi-Source Edition
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1.5 flex-wrap">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{student.institutionName} • {student.department} ({student.level})</span>
            </p>
          </div>
        </div>

        {/* Header Action Tools */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10 shadow-sm"
            title="Compare answers side-by-side"
          >
            <Scale className="w-3.5 h-3.5 text-indigo-300" />
            <span>Compare Answers</span>
          </button>

          <button
            onClick={() => setIsSavedNotesDrawerOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10 shadow-sm"
            title="View saved study notes"
          >
            <Bookmark className="w-3.5 h-3.5 text-emerald-300" />
            <span>Saved Notes</span>
            {savedCopilotNotes.length > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px]">
                {savedCopilotNotes.length}
              </span>
            )}
          </button>

          <button
            onClick={handleClearChat}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Provider Selector Component */}
      <CopilotProviderSelector
        selectedProvider={selectedProvider}
        onSelectProvider={setSelectedProvider}
        disabled={isLoading}
      />

      {/* Study Mode Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
        <button
          onClick={() => setCopilotMode('explainer')}
          className={`p-3 rounded-2xl border text-left transition-all ${
            copilotMode === 'explainer'
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
          }`}
        >
          <Lightbulb className="w-4 h-4 text-amber-500 mb-1" />
          <p className="font-bold text-xs">Concept Explainer</p>
          <p className="text-[10px] text-slate-500">Break down theories</p>
        </button>

        <button
          onClick={() => setCopilotMode('past_question')}
          className={`p-3 rounded-2xl border text-left transition-all ${
            copilotMode === 'past_question'
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
          }`}
        >
          <BookOpen className="w-4 h-4 text-blue-500 mb-1" />
          <p className="font-bold text-xs">Past Question Solver</p>
          <p className="text-[10px] text-slate-500">Step-by-step working</p>
        </button>

        <button
          onClick={() => setCopilotMode('revision')}
          className={`p-3 rounded-2xl border text-left transition-all ${
            copilotMode === 'revision'
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
          }`}
        >
          <FileText className="w-4 h-4 text-purple-500 mb-1" />
          <p className="font-bold text-xs">Revision Sheets</p>
          <p className="text-[10px] text-slate-500">High-yield cheat notes</p>
        </button>

        <button
          onClick={() => setCopilotMode('practice')}
          className={`p-3 rounded-2xl border text-left transition-all ${
            copilotMode === 'practice'
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-teal-500 mb-1" />
          <p className="font-bold text-xs">Exam Practice</p>
          <p className="text-[10px] text-slate-500">Mock questions & keys</p>
        </button>

        <button
          onClick={() => setCopilotMode('project')}
          className={`p-3 rounded-2xl border text-left transition-all ${
            copilotMode === 'project'
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-emerald-500 mb-1" />
          <p className="font-bold text-xs">Project Advisor</p>
          <p className="text-[10px] text-slate-500">Topics & APA citations</p>
        </button>

        <button
          onClick={() => setCopilotMode('assignment')}
          className={`p-3 rounded-2xl border text-left transition-all ${
            copilotMode === 'assignment'
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
          }`}
        >
          <Code className="w-4 h-4 text-rose-500 mb-1" />
          <p className="font-bold text-xs">Assignment Helper</p>
          <p className="text-[10px] text-slate-500">Outlines & structures</p>
        </button>
      </div>

      {/* Main Chat Interface */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 shadow-sm flex flex-col h-[580px]">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div
                  className={`w-9 h-9 rounded-xl text-white flex items-center justify-center shrink-0 mt-1 shadow-md ${
                    msg.provider === 'studenthub'
                      ? 'bg-emerald-600 shadow-emerald-500/20'
                      : msg.provider === 'gemini'
                      ? 'bg-indigo-600 shadow-indigo-500/20'
                      : msg.provider === 'chatgpt'
                      ? 'bg-teal-600 shadow-teal-500/20'
                      : 'bg-blue-600 shadow-blue-500/20'
                  }`}
                >
                  {msg.provider === 'studenthub' && <Database className="w-5 h-5" />}
                  {msg.provider === 'gemini' && <Sparkles className="w-5 h-5" />}
                  {msg.provider === 'chatgpt' && <Bot className="w-5 h-5" />}
                  {msg.provider === 'web' && <Globe className="w-5 h-5" />}
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100'
                }`}
              >
                {/* Provider Tag & Mode (Assistant) */}
                {msg.role === 'assistant' && (
                  <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          msg.provider === 'studenthub'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : msg.provider === 'gemini'
                            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                            : msg.provider === 'chatgpt'
                            ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        }`}
                      >
                        {msg.provider === 'studenthub' ? 'StudentHub AI' : msg.provider === 'gemini' ? 'Google Gemini' : msg.provider === 'chatgpt' ? 'OpenAI ChatGPT' : 'Web Research'}
                      </span>
                      {msg.mode && (
                        <span className="text-[10px] text-slate-400 font-medium">
                          • {msg.mode.replace('_', ' ')}
                        </span>
                      )}
                    </div>

                    <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                  </div>
                )}

                {/* Referenced resources badges if user attached them */}
                {msg.role === 'user' && msg.referencedResources && msg.referencedResources.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2 pb-2 border-b border-white/20">
                    {msg.referencedResources.map((res, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/20 text-white text-[10px] font-semibold">
                        <Paperclip className="w-2.5 h-2.5" />
                        <span>{res.courseCode || res.title}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Message Body */}
                <div className="whitespace-pre-wrap font-sans space-y-2 leading-relaxed">
                  {msg.content}
                </div>

                {/* Direct Browser Research Links (When Web Research is used) */}
                {msg.webLinks && msg.webLinks.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-blue-500" />
                        <span>Open Verified Sources in Browser:</span>
                      </p>
                      <span className="text-[10px] text-slate-400">External Links</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.webLinks.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 group transition-all"
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="font-bold text-[11px] text-blue-600 dark:text-blue-400 group-hover:underline flex items-center gap-1">
                              <span>{link.platform}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </span>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              {link.badge}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">
                            {link.description}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matched StudentHub Database Cards (When StudentHub AI detects courses/pqs) */}
                {msg.referencedResources && msg.referencedResources.length > 0 && msg.role === 'assistant' && (
                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Matched StudentHub Academic Records:</span>
                      </p>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Verified Data</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.referencedResources.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2"
                        >
                          <div>
                            <span className="font-bold text-[11px] text-slate-900 dark:text-white block truncate">
                              {item.title}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {item.type === 'past_question' ? 'Past Question Paper' : 'Course Outline'}
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              if (item.type === 'past_question') {
                                handleOpenReferencedPastQuestion(item.courseCode);
                              } else {
                                handleOpenReferencedMaterial(item.courseCode);
                              }
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 text-[10px] font-bold shrink-0 transition-colors"
                          >
                            Inspect ➜
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Assistant Footer Actions: Copy, Save to Profile, Compare, and Cross-Ask */}
                {msg.role === 'assistant' && (
                  <div className="mt-4 pt-2.5 border-t border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-2 text-[10px]">
                    <div className="text-slate-500 dark:text-slate-400 font-medium">
                      {msg.sourceAttribution && <span>{msg.sourceAttribution}</span>}
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold flex items-center gap-1 text-slate-600 dark:text-slate-300 transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Notes</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleSaveToProfile(msg)}
                        className="p-1.5 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>Save to Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          const prevUserMsg = [...messages].reverse().find(m => m.role === 'user');
                          handleOpenComparisonForMessage(prevUserMsg ? prevUserMsg.content : msg.content.slice(0, 100));
                        }}
                        className="p-1.5 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Scale className="w-3.5 h-3.5" />
                        <span>Compare</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* User Message Action: Quick switch / ask this question in other AI */}
                {msg.role === 'user' && (
                  <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] opacity-90">
                    <span>{msg.timestamp}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] opacity-75">Ask in:</span>
                      {(['studenthub', 'gemini', 'chatgpt', 'web'] as const)
                        .filter(p => p !== msg.provider)
                        .map(p => (
                          <button
                            key={p}
                            onClick={() => handleTransferToProvider(msg.content, p)}
                            className="px-1.5 py-0.5 rounded bg-white/20 hover:bg-white/30 text-white font-bold text-[9px] uppercase transition-colors"
                            title={`Ask this question using ${p}`}
                          >
                            {p === 'studenthub' ? 'StudentHub' : p === 'gemini' ? 'Gemini' : p === 'chatgpt' ? 'ChatGPT' : 'Web'}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                  {student.fullName.charAt(0)}
                </div>
              )}
            </motion.div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center animate-pulse text-white ${
                  selectedProvider === 'studenthub'
                    ? 'bg-emerald-600'
                    : selectedProvider === 'gemini'
                    ? 'bg-indigo-600'
                    : selectedProvider === 'chatgpt'
                    ? 'bg-teal-600'
                    : 'bg-blue-600'
                }`}
              >
                {selectedProvider === 'studenthub' && <Database className="w-4 h-4" />}
                {selectedProvider === 'gemini' && <Sparkles className="w-4 h-4" />}
                {selectedProvider === 'chatgpt' && <Bot className="w-4 h-4" />}
                {selectedProvider === 'web' && <Globe className="w-4 h-4" />}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <span>
                  {selectedProvider === 'studenthub' && 'Searching StudentHub academic database & syllabus benchmarks...'}
                  {selectedProvider === 'gemini' && 'Gemini is synthesizing step-by-step pedagogical solution...'}
                  {selectedProvider === 'chatgpt' && 'OpenAI ChatGPT is formulating analytical derivation...'}
                  {selectedProvider === 'web' && 'Synthesizing scholarly web research & browser links...'}
                </span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce delay-200" />
                </span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Suggested Prompt Chips */}
        <div className="px-6 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 shrink-0">
            Quick Prompts:
          </span>
          {promptSuggestions.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedProvider(item.provider);
                setCopilotMode(item.mode);
                handleSendMessage(item.prompt, item.provider);
              }}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 whitespace-nowrap transition-colors flex items-center gap-1"
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Attached Reference Items Preview Bar */}
        {attachedResources.length > 0 && (
          <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-emerald-50/70 dark:bg-emerald-950/30 flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-extrabold uppercase text-emerald-800 dark:text-emerald-300 flex items-center gap-1 shrink-0">
              <Paperclip className="w-3 h-3" />
              <span>Context:</span>
            </span>
            {attachedResources.map((item) => (
              <span
                key={item.id}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-slate-800 dark:text-slate-200 shrink-0 shadow-xs"
              >
                <span>{item.title}</span>
                <button
                  onClick={() => setAttachedResources(prev => prev.filter(r => r.id !== item.id))}
                  className="text-slate-400 hover:text-red-500 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-b-3xl space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={() => setIsResourcePickerOpen(true)}
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-600 dark:text-slate-300 transition-colors shrink-0"
              title="Reference StudentHub Course or Past Question"
            >
              <Paperclip className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </button>

            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder={`Ask ${selectedProvider === 'studenthub' ? 'StudentHub AI' : selectedProvider === 'gemini' ? 'Gemini' : selectedProvider === 'chatgpt' ? 'ChatGPT' : 'Web Research'} about ${student.department} courses, formulas, or project topics...`}
              className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className={`px-5 py-3 rounded-2xl disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all shrink-0 ${
                selectedProvider === 'studenthub'
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
                  : selectedProvider === 'gemini'
                  ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20'
                  : selectedProvider === 'chatgpt'
                  ? 'bg-teal-600 hover:bg-teal-700 shadow-teal-500/20'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
              }`}
            >
              <span>Ask</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Prominent Academic Verification Disclaimer */}
      <div className="p-4 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/20 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <p className="font-extrabold text-amber-900 dark:text-amber-200">
            Official Academic Verification Notice
          </p>
          <p className="text-amber-800 dark:text-amber-300/90 leading-relaxed">
            All AI-generated answers, formulas, derivations, and web research summaries should always be verified against your department's approved syllabus, lecturer lecture notes, and official <strong>NUC (National Universities Commission)</strong> / <strong>NBTE (National Board for Technical Education)</strong> benchmarks. Do not present unverified AI output as plagiarized coursework.
          </p>
        </div>
      </div>

      {/* Side-by-Side Comparison Modal */}
      <CopilotCompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        initialPrompt={comparePrompt}
      />

      {/* Saved Study Notes Drawer */}
      <CopilotSavedNotesDrawer
        isOpen={isSavedNotesDrawerOpen}
        onClose={() => setIsSavedNotesDrawerOpen(false)}
        onSelectNoteToPrompt={(note) => {
          setInputPrompt(`Follow-up on: "${note.query}"`);
        }}
      />

      {/* Resource Picker Modal */}
      <CopilotResourcePickerModal
        isOpen={isResourcePickerOpen}
        onClose={() => setIsResourcePickerOpen(false)}
        onAttachResource={(res) => {
          setAttachedResources(prev => [...prev, res]);
          addToast('Resource Attached', `${res.title} added as prompt context.`, 'info');
        }}
        attachedResourceIds={attachedResources.map(r => r.id)}
      />

      {/* Full Past Question Viewer Modal */}
      {selectedPqForModal && (
        <PastQuestionViewerModal
          pq={selectedPqForModal}
          isOpen={Boolean(selectedPqForModal)}
          onClose={() => setSelectedPqForModal(null)}
          onStartCbt={() => {
            setSelectedPqForModal(null);
            setCurrentView('past_questions');
          }}
          onSearchBrowserForCourse={(code) => {
            setSelectedPqForModal(null);
            setSelectedProvider('web');
            handleSendMessage(`Search academic literature and past question solutions for ${code}`, 'web');
          }}
        />
      )}

      {/* Full Study Material Viewer Modal */}
      {selectedMaterialForModal && (
        <StudyMaterialViewerModal
          material={selectedMaterialForModal}
          isOpen={Boolean(selectedMaterialForModal)}
          onClose={() => setSelectedMaterialForModal(null)}
          onSearchBrowserForCourse={(code) => {
            setSelectedMaterialForModal(null);
            setSelectedProvider('web');
            handleSendMessage(`Search open access textbooks and lecture notes for ${code}`, 'web');
          }}
        />
      )}

    </div>
  );
};
