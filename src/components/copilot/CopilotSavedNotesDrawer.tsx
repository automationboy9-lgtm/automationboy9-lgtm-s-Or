import React, { useState, useMemo } from 'react';
import { SavedCopilotNote, CopilotProvider } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Bookmark, 
  Trash2, 
  Copy, 
  Check, 
  Search, 
  ExternalLink,
  Filter,
  Calendar,
  Sparkles,
  Database,
  Bot,
  Globe,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CopilotSavedNotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNoteToPrompt?: (note: SavedCopilotNote) => void;
}

export const CopilotSavedNotesDrawer: React.FC<CopilotSavedNotesDrawerProps> = ({
  isOpen,
  onClose,
  onSelectNoteToPrompt
}) => {
  const { savedCopilotNotes, deleteCopilotNote, addToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProviderFilter, setSelectedProviderFilter] = useState<'all' | CopilotProvider>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredNotes = useMemo(() => {
    return (savedCopilotNotes || []).filter((note) => {
      const matchesProvider = selectedProviderFilter === 'all' || note.provider === selectedProviderFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        note.title.toLowerCase().includes(q) ||
        note.query.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q) ||
        (note.tags || []).some(t => t.toLowerCase().includes(q));

      return matchesProvider && matchesSearch;
    });
  }, [savedCopilotNotes, selectedProviderFilter, searchQuery]);

  const handleCopyNote = (note: SavedCopilotNote) => {
    navigator.clipboard.writeText(`${note.title}\n\nQuery: ${note.query}\n\n${note.content}\n\nSource: ${note.sourceAttribution || note.provider}`);
    setCopiedId(note.id);
    addToast('Copied', 'Study note copied to clipboard.', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  const getProviderIcon = (provider: CopilotProvider) => {
    switch (provider) {
      case 'studenthub':
        return <Database className="w-3.5 h-3.5 text-emerald-500" />;
      case 'gemini':
        return <Sparkles className="w-3.5 h-3.5 text-indigo-500" />;
      case 'chatgpt':
        return <Bot className="w-3.5 h-3.5 text-teal-500" />;
      case 'web':
        return <Globe className="w-3.5 h-3.5 text-blue-500" />;
    }
  };

  const getProviderBadge = (provider: CopilotProvider) => {
    switch (provider) {
      case 'studenthub':
        return 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300';
      case 'gemini':
        return 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300';
      case 'chatgpt':
        return 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300';
      case 'web':
        return 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="bg-white dark:bg-slate-900 w-full max-w-xl h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>Saved Study Notes</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold">
                  {savedCopilotNotes.length}
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Notes, derivations, and solutions saved from Copilot to your profile.
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

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 space-y-3 bg-white dark:bg-slate-900">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saved notes, topics, formulas..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[10px] font-bold uppercase text-slate-400 shrink-0 mr-1">
              Provider:
            </span>
            {(['all', 'studenthub', 'gemini', 'chatgpt', 'web'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setSelectedProviderFilter(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedProviderFilter === p
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {p === 'all' ? 'All Providers' : p === 'studenthub' ? 'StudentHub AI' : p === 'gemini' ? 'Gemini' : p === 'chatgpt' ? 'ChatGPT' : 'Web Research'}
              </button>
            ))}
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-3">
              <Bookmark className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 stroke-1" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                {savedCopilotNotes.length === 0 ? 'No notes saved yet' : 'No notes match your filter'}
              </p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                While chatting with any AI provider, click <strong>"Save to Profile"</strong> on any response to store it here permanently.
              </p>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${getProviderBadge(note.provider)}`}>
                        {getProviderIcon(note.provider)}
                        <span className="capitalize">{note.provider}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(note.savedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {note.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopyNote(note)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors"
                      title="Copy note"
                    >
                      {copiedId === note.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => deleteCopilotNote(note.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-400 hover:text-red-600 transition-colors"
                      title="Delete note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 text-xs border border-slate-100 dark:border-slate-800/80">
                  <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Prompt:</p>
                  <p className="italic">"{note.query}"</p>
                </div>

                <div className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                  {note.content}
                </div>

                {note.sourceAttribution && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{note.sourceAttribution}</span>
                    {onSelectNoteToPrompt && (
                      <button
                        onClick={() => {
                          onSelectNoteToPrompt(note);
                          onClose();
                        }}
                        className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                      >
                        Ask follow-up in Copilot ➜
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};
