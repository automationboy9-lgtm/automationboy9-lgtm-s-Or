import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  Search,
  Plus,
  Tag,
  ShieldAlert,
  UserX,
  CornerDownRight,
  Send,
  Sparkles,
  BookOpen,
  HelpCircle,
  Lightbulb,
  BrainCircuit,
  Filter,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CommunityPost } from '../../types';

interface CommunityFeedProps {
  onOpenReport: (type: 'post' | 'comment', id: string, title: string) => void;
  onOpenBlock: (userId: string, userName: string) => void;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({
  onOpenReport,
  onOpenBlock
}) => {
  const {
    communityPosts,
    addCommunityPost,
    reactToPost,
    addComment,
    addPostCommentReply,
    student,
    currentUser,
    blockedUserIds,
    addToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newPostModal, setNewPostModal] = useState(false);

  // New post form state
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('Academics');
  const [postCourseCode, setPostCourseCode] = useState('');
  const [postTags, setPostTags] = useState('Exams, Study Tips');

  // Track expanded comment threads & reply inputs
  const [expandedPostComments, setExpandedPostComments] = useState<Record<string, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [activeReplyCommentId, setActiveReplyCommentId] = useState<string | null>(null);
  const [replyInput, setReplyInput] = useState('');

  const categories = [
    'all',
    'Academics',
    'Past Questions',
    'Study Tips',
    'Project Research',
    'Campus Life',
    'General'
  ];

  // Filter posts (hide blocked users, filter by search & category)
  const filteredPosts = communityPosts.filter(post => {
    if (post.authorId && blockedUserIds.includes(post.authorId)) return false;

    const matchesCategory =
      selectedCategory === 'all' ||
      post.category?.toLowerCase() === selectedCategory.toLowerCase();

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q) ||
      post.authorName.toLowerCase().includes(q) ||
      post.authorInstitution.toLowerCase().includes(q) ||
      (post.courseCode && post.courseCode.toLowerCase().includes(q)) ||
      post.tags.some(t => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    addCommunityPost({
      authorName: student.fullName,
      authorInstitution: student.institutionName,
      authorFaculty: student.faculty,
      authorDepartment: student.department,
      title: postTitle.trim(),
      content: postContent.trim(),
      category: postCategory,
      courseCode: postCourseCode.trim().toUpperCase() || undefined,
      tags: postTags.split(',').map(t => t.trim()).filter(Boolean)
    });

    setPostTitle('');
    setPostContent('');
    setPostCourseCode('');
    setNewPostModal(false);
  };

  const toggleComments = (postId: string) => {
    setExpandedPostComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    addComment(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    setExpandedPostComments(prev => ({ ...prev, [postId]: true }));
  };

  const handleAddReply = (postId: string, commentId: string) => {
    if (!replyInput.trim()) return;

    addPostCommentReply(postId, commentId, replyInput.trim());
    setReplyInput('');
    setActiveReplyCommentId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Search & Filter Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search academic questions, course codes, past experiences..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <button
            onClick={() => setNewPostModal(true)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-teal-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Discussion</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3" />
            <span>Topic:</span>
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Discussions' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Stream */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">
              No Discussions Found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Be the first to start a conversation, ask a past question solution, or share a study tip with peers.
            </p>
            <button
              onClick={() => setNewPostModal(true)}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md"
            >
              Start New Discussion
            </button>
          </div>
        ) : (
          filteredPosts.map(post => {
            const isCommentsOpen = Boolean(expandedPostComments[post.id]);
            const comments = post.comments || [];
            const isAuthorMe = post.authorId === (currentUser?.id || 'current_student');

            const counts = post.reactionCounts || {
              like: post.likes || 0,
              helpful: 0,
              brilliant: 0,
              question: 0
            };

            return (
              <div
                key={post.id}
                className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                {/* Post Top Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-600 text-white flex items-center justify-center font-extrabold text-xs shadow-sm">
                      {post.authorName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                          {post.authorName}
                        </h4>
                        {post.courseCode && (
                          <span className="px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-[10px] font-black uppercase">
                            {post.courseCode}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {post.authorInstitution} • {post.authorFaculty || post.authorDepartment || 'Student'} • {post.createdAt}
                      </p>
                    </div>
                  </div>

                  {/* Tags & Action Dropdown */}
                  <div className="flex items-center gap-2">
                    <div className="hidden sm:flex flex-wrap gap-1.5 justify-end">
                      {(post.tags || []).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {!isAuthorMe && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onOpenReport('post', post.id, post.title)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          title="Report Post"
                        >
                          <ShieldAlert className="w-3.5 h-3.5" />
                        </button>
                        {post.authorId && (
                          <button
                            onClick={() => onOpenBlock(post.authorId!, post.authorName)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                            title="Block Student"
                          >
                            <UserX className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </p>
                </div>

                {/* Multi-Reaction Bar & Discussion Controls */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  {/* Reaction buttons */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      onClick={() => reactToPost(post.id, 'like')}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        post.userReaction === 'like'
                          ? 'bg-teal-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{counts.like || 0}</span>
                    </button>

                    <button
                      onClick={() => reactToPost(post.id, 'helpful')}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        post.userReaction === 'helpful'
                          ? 'bg-amber-500 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Helpful {counts.helpful ? `(${counts.helpful})` : ''}</span>
                    </button>

                    <button
                      onClick={() => reactToPost(post.id, 'brilliant')}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        post.userReaction === 'brilliant'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <BrainCircuit className="w-3.5 h-3.5" />
                      <span>Brilliant {counts.brilliant ? `(${counts.brilliant})` : ''}</span>
                    </button>

                    <button
                      onClick={() => reactToPost(post.id, 'question')}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        post.userReaction === 'question'
                          ? 'bg-sky-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Question {counts.question ? `(${counts.question})` : ''}</span>
                    </button>
                  </div>

                  {/* Comments & Share */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleComments(post.id)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
                      <span>
                        {comments.length || post.commentsCount || 0} Replies
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        addToast('Link Copied', 'Discussion share link copied to clipboard.', 'success');
                      }}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-teal-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Share Discussion Link"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expandable Comments & Replies Section */}
                <AnimatePresence>
                  {isCommentsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3"
                    >
                      {/* Comments list */}
                      <div className="space-y-2.5">
                        {comments.length === 0 ? (
                          <p className="text-xs text-slate-400 italic">
                            No replies yet. Be the first to answer this academic query!
                          </p>
                        ) : (
                          comments.map(comment => (
                            <div
                              key={comment.id}
                              className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 flex items-center justify-center font-bold text-[10px]">
                                    {comment.authorName.slice(0, 2).toUpperCase()}
                                  </div>
                                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                                    {comment.authorName}
                                  </span>
                                  <span className="text-[10px] text-slate-400">
                                    • {comment.authorInstitution} • {comment.createdAt}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1 text-[10px]">
                                  <button
                                    onClick={() =>
                                      setActiveReplyCommentId(
                                        activeReplyCommentId === comment.id ? null : comment.id
                                      )
                                    }
                                    className="text-teal-600 font-bold hover:underline flex items-center gap-0.5"
                                  >
                                    <CornerDownRight className="w-3 h-3" />
                                    <span>Reply</span>
                                  </button>
                                  <button
                                    onClick={() =>
                                      onOpenReport('comment', comment.id, comment.content.slice(0, 40))
                                    }
                                    className="text-slate-400 hover:text-rose-500 p-1"
                                    title="Report Reply"
                                  >
                                    <ShieldAlert className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>

                              <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed pl-8">
                                {comment.content}
                              </p>

                              {/* Nested Replies */}
                              {Boolean(comment.replies && comment.replies.length > 0) && (
                                <div className="pl-8 pt-1.5 space-y-2">
                                  {(comment.replies || []).map(reply => (
                                    <div
                                      key={reply.id}
                                      className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1"
                                    >
                                      <div className="flex items-center gap-1.5 text-[11px]">
                                        <span className="font-bold text-slate-800 dark:text-slate-200">
                                          {reply.authorName}
                                        </span>
                                        <span className="text-[10px] text-slate-400">
                                          • {reply.authorInstitution} • {reply.createdAt}
                                        </span>
                                      </div>
                                      <p className="text-slate-600 dark:text-slate-300">
                                        {reply.content}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Nested Reply Input */}
                              {activeReplyCommentId === comment.id && (
                                <div className="pl-8 pt-2 flex items-center gap-2">
                                  <input
                                    type="text"
                                    placeholder={`Reply directly to ${comment.authorName}...`}
                                    value={replyInput}
                                    onChange={e => setReplyInput(e.target.value)}
                                    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
                                    onKeyDown={e => {
                                      if (e.key === 'Enter') {
                                        handleAddReply(post.id, comment.id);
                                      }
                                    }}
                                  />
                                  <button
                                    onClick={() => handleAddReply(post.id, comment.id)}
                                    className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold"
                                  >
                                    Post
                                  </button>
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>

                      {/* Add Comment Input Form */}
                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="text"
                          placeholder="Write a helpful response or academic insight..."
                          value={commentInputs[post.id] || ''}
                          onChange={e =>
                            setCommentInputs(prev => ({
                              ...prev,
                              [post.id]: e.target.value
                            }))
                          }
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              handleAddComment(post.id);
                            }
                          }}
                          className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          disabled={!commentInputs[post.id]?.trim()}
                          className="p-2 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold shadow-md shadow-teal-600/20"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {newPostModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
            >
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
                    <Plus className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Start Academic Discussion
                  </h3>
                </div>
                <button
                  onClick={() => setNewPostModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="p-5 space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Discussion Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={postTitle}
                    onChange={e => setPostTitle(e.target.value)}
                    placeholder="e.g. Best derivation method for Engineering Thermodynamics past question?"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Category *
                    </label>
                    <select
                      value={postCategory}
                      onChange={e => setPostCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="Academics">Academics</option>
                      <option value="Past Questions">Past Questions</option>
                      <option value="Study Tips">Study Tips</option>
                      <option value="Project Research">Project Research</option>
                      <option value="Campus Life">Campus Life</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Course Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={postCourseCode}
                      onChange={e => setPostCourseCode(e.target.value)}
                      placeholder="e.g. GST 101, PHY 102"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Question / Discussion Content *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={postContent}
                    onChange={e => setPostContent(e.target.value)}
                    placeholder="Provide clear context, formula details, or lecture references..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={postTags}
                    onChange={e => setPostTags(e.target.value)}
                    placeholder="Exams, Past Questions, Tutorials"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setNewPostModal(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md shadow-teal-600/20"
                  >
                    Publish Post
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
