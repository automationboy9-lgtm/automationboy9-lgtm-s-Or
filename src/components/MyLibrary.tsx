import React, { useState, useMemo } from 'react';
import { 
  Bookmark, 
  FolderPlus, 
  Folder, 
  FileText, 
  BookOpen, 
  Sparkles, 
  Trash2, 
  Plus, 
  Search, 
  ExternalLink,
  Tag,
  ChevronRight,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PersonalCollection } from '../types';

export const MyLibrary: React.FC = () => {
  const { 
    student, 
    pastQuestions, 
    studyMaterials, 
    savedCopilotNotes, 
    personalCollections, 
    createPersonalCollection, 
    deletePersonalCollection,
    removeItemFromCollection,
    setCurrentView,
    toggleBookmarkPastQuestion,
    toggleBookmarkStudyMaterial 
  } = useApp();

  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(
    personalCollections[0]?.id || null
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDesc, setNewCollectionDesc] = useState('');
  const [newCollectionCourse, setNewCollectionCourse] = useState(student.enrolledCourseCodes?.[0] || 'CSC 301');
  const [newCollectionColor, setNewCollectionColor] = useState('#059669');

  // Bookmarked past questions
  const bookmarkedPQs = useMemo(() => {
    const ids = student.bookmarkedPastQuestionIds || [];
    return pastQuestions.filter(pq => ids.includes(pq.id));
  }, [pastQuestions, student.bookmarkedPastQuestionIds]);

  // Bookmarked study materials
  const bookmarkedMats = useMemo(() => {
    const ids = student.bookmarkedStudyMaterialIds || [];
    return studyMaterials.filter(m => ids.includes(m.id));
  }, [studyMaterials, student.bookmarkedStudyMaterialIds]);

  // Active collection object
  const activeCollection = useMemo(() => {
    return personalCollections.find(c => c.id === activeCollectionId) || personalCollections[0] || null;
  }, [personalCollections, activeCollectionId]);

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;

    createPersonalCollection(
      newCollectionName.trim(),
      newCollectionDesc.trim(),
      newCollectionCourse,
      newCollectionColor
    );

    setNewCollectionName('');
    setNewCollectionDesc('');
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white border-b border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-1">
                <Bookmark className="w-4 h-4" />
                <span>Personal Academic Vault</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                My Library & Custom Collections
              </h1>
              <p className="text-sm text-emerald-200 mt-1">
                Curate your saved exam papers, lecture handouts, and AI Copilot study notes.
              </p>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl text-sm shadow-md transition flex items-center space-x-2"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Create Collection</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-800/60">
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <span className="text-xs text-emerald-200 block">Custom Collections</span>
              <span className="text-2xl font-bold text-white">{personalCollections.length}</span>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <span className="text-xs text-emerald-200 block">Saved Past Questions</span>
              <span className="text-2xl font-bold text-white">{bookmarkedPQs.length}</span>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <span className="text-xs text-emerald-200 block">Saved Lecture Notes</span>
              <span className="text-2xl font-bold text-white">{bookmarkedMats.length}</span>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <span className="text-xs text-emerald-200 block">AI Copilot Notes</span>
              <span className="text-2xl font-bold text-emerald-300">{savedCopilotNotes.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Collections List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>My Collections</span>
              </h3>
              <button
                onClick={() => setShowCreateModal(true)}
                className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold"
              >
                + New
              </button>
            </div>

            <div className="space-y-2">
              {personalCollections.map(col => (
                <div
                  key={col.id}
                  onClick={() => setActiveCollectionId(col.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                    activeCollection?.id === col.id
                      ? 'bg-white dark:bg-slate-900 border-emerald-500 shadow-sm ring-1 ring-emerald-500/20'
                      : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 font-bold"
                      style={{ backgroundColor: col.color || '#059669' }}
                    >
                      <Folder className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        {col.name}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {col.itemIds?.length || 0} items • {col.courseCode || 'General'}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>

            {/* Quick Links to Saved All */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Quick Access
              </h4>
              <button
                onClick={() => setCurrentView('past_questions')}
                className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 flex items-center justify-between transition"
              >
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>All Past Questions Directory</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => setCurrentView('materials')}
                className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 flex items-center justify-between transition"
              >
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-teal-600" />
                  <span>All Study Materials Vault</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Right Column: Active Collection Items */}
          <div className="lg:col-span-2 space-y-6">
            {activeCollection ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span 
                        className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white uppercase"
                        style={{ backgroundColor: activeCollection.color || '#059669' }}
                      >
                        {activeCollection.courseCode || 'General'}
                      </span>
                      <span className="text-xs text-slate-400">
                        Created {new Date(activeCollection.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-2">
                      {activeCollection.name}
                    </h2>
                    {activeCollection.description && (
                      <p className="text-xs text-slate-500 mt-1">
                        {activeCollection.description}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => deletePersonalCollection(activeCollection.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition"
                    title="Delete collection"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Collection Items */}
                <div className="mt-5 space-y-3">
                  {activeCollection.itemIds?.length === 0 ? (
                    <div className="text-center py-12">
                      <Bookmark className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                        This collection is empty.
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Bookmark past questions and study materials to organize them here.
                      </p>
                    </div>
                  ) : (
                    activeCollection.itemIds?.map(item => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between hover:border-emerald-500/40 transition"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                            {item.type === 'past_question' ? (
                              <FileText className="w-4 h-4" />
                            ) : item.type === 'copilot_note' ? (
                              <Sparkles className="w-4 h-4" />
                            ) : (
                              <BookOpen className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                              {item.title}
                            </h5>
                            {item.subtitle && (
                              <p className="text-xs text-slate-500">{item.subtitle}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              if (item.type === 'past_question') setCurrentView('past_questions');
                              else if (item.type === 'copilot_note') setCurrentView('copilot');
                              else setCurrentView('materials');
                            }}
                            className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold rounded-lg hover:bg-emerald-50 text-slate-700 dark:text-slate-200"
                          >
                            Open
                          </button>
                          <button
                            onClick={() => removeItemFromCollection(activeCollection.id, item.id)}
                            className="p-1 text-slate-400 hover:text-red-500"
                            title="Remove from collection"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : null}

            {/* Saved AI Copilot Notes Section */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Saved AI Study Copilot Summaries & Solutions ({savedCopilotNotes.length})
                  </h3>
                </div>
                <button
                  onClick={() => setCurrentView('copilot')}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  Ask Copilot
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {savedCopilotNotes.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">
                    No copilot notes saved yet. When using AI Study Copilot, click "Save to Notes" to keep them in your library.
                  </p>
                ) : (
                  savedCopilotNotes.map(note => (
                    <div key={note.id} className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                          {note.courseCode || 'General'}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {new Date(note.savedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h5 className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-1">
                        {note.title}
                      </h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                        {note.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Collection Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 max-w-md w-full shadow-2xl">
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-4 flex items-center space-x-2">
              <FolderPlus className="w-5 h-5 text-emerald-600" />
              <span>Create New Study Collection</span>
            </h3>

            <form onSubmit={handleCreateCollection} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Collection Name:
                </label>
                <input
                  type="text"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="e.g. CSC 301 Exam Cram or Final Year Project Papers"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Associated Course:
                </label>
                <select
                  value={newCollectionCourse}
                  onChange={(e) => setNewCollectionCourse(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                >
                  {Array.from(new Set(student.enrolledCourseCodes || ['CSC 301', 'CSC 302', 'MAT 301', 'GST 222'])).map((code, idx) => (
                    <option key={`${code}_${idx}`} value={code}>{code}</option>
                  ))}
                  <option value="General">General / Cross-Disciplinary</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Description (optional):
                </label>
                <textarea
                  value={newCollectionDesc}
                  onChange={(e) => setNewCollectionDesc(e.target.value)}
                  rows={2}
                  placeholder="What is this collection for?"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold"
                >
                  Create Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
