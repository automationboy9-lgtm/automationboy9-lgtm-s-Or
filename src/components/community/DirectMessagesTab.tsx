import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MessageCircle,
  Search,
  Send,
  User,
  Building2,
  GraduationCap,
  ShieldAlert,
  UserX,
  Plus,
  CornerDownRight,
  X,
  CheckCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface DirectMessagesTabProps {
  onOpenReport: (type: 'user' | 'message', id: string, title: string) => void;
  onOpenBlock: (userId: string, userName: string) => void;
}

export const DirectMessagesTab: React.FC<DirectMessagesTabProps> = ({
  onOpenReport,
  onOpenBlock
}) => {
  const {
    student,
    currentUser,
    directConversations,
    directMessages,
    sendDirectMessage,
    startOrGetDirectConversation,
    markConversationAsRead,
    blockedUserIds,
    studyGroups
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConvId, setSelectedConvId] = useState<string | null>(
    directConversations[0]?.id || null
  );
  const [messageInput, setMessageInput] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [newChatModalOpen, setNewChatModalOpen] = useState(false);
  const [newPeerSearch, setNewPeerSearch] = useState('');

  const currentStudentId = currentUser?.id || 'current_student';

  // Filter out blocked users from conversations
  const visibleConversations = (directConversations || []).filter(
    conv =>
      !(blockedUserIds || []).includes(conv.participantId) &&
      (conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.participantInstitution.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessageText.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeConversation = visibleConversations.find(c => c.id === selectedConvId);
  const activeMessages = selectedConvId ? directMessages[selectedConvId] || [] : [];

  // Extract student peers from study groups to allow quick 1-on-1 chats
  const peerList = React.useMemo(() => {
    const peersMap = new Map<string, { id: string; name: string; institution: string; department: string }>();

    (studyGroups || []).forEach(group => {
      (group.members || []).forEach(member => {
        if (member.id !== currentStudentId && !(blockedUserIds || []).includes(member.id)) {
          peersMap.set(member.id, {
            id: member.id,
            name: member.name,
            institution: member.institution,
            department: member.department
          });
        }
      });
    });

    // Add common campus peers if few
    if (peersMap.size < 3) {
      peersMap.set('std_chidi_okonkwo', {
        id: 'std_chidi_okonkwo',
        name: 'Chidi Okonkwo',
        institution: 'University of Lagos (UNILAG)',
        department: 'Mechanical Engineering'
      });
      peersMap.set('std_amina_bello', {
        id: 'std_amina_bello',
        name: 'Amina Bello',
        institution: 'Ahmadu Bello University (ABU)',
        department: 'Computer Science'
      });
      peersMap.set('std_segun_adeyemi', {
        id: 'std_segun_adeyemi',
        name: 'Segun Adeyemi',
        institution: 'University of Ibadan (UI)',
        department: 'Economics'
      });
    }

    return Array.from(peersMap.values());
  }, [studyGroups, currentStudentId, blockedUserIds]);

  const filteredPeers = peerList.filter(
    p =>
      p.name.toLowerCase().includes(newPeerSearch.toLowerCase()) ||
      p.institution.toLowerCase().includes(newPeerSearch.toLowerCase()) ||
      p.department.toLowerCase().includes(newPeerSearch.toLowerCase())
  );

  const handleSelectConversation = (convId: string) => {
    setSelectedConvId(convId);
    markConversationAsRead(convId);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeConversation) return;

    sendDirectMessage(
      activeConversation.id,
      activeConversation.participantId,
      activeConversation.participantName,
      messageInput.trim(),
      replyingTo || undefined
    );

    setMessageInput('');
    setReplyingTo(null);
  };

  const handleStartPeerChat = (peer: { id: string; name: string; institution: string; department: string }) => {
    const convId = startOrGetDirectConversation(
      peer.id,
      peer.name,
      peer.institution,
      peer.department
    );
    setSelectedConvId(convId);
    setNewChatModalOpen(false);
  };

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col md:flex-row h-[750px]">
      {/* Left Column: Conversations List */}
      <div className="w-full md:w-80 lg:w-96 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 bg-slate-50/40 dark:bg-slate-900/40">
        {/* Top bar with new message button */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-teal-600" />
              <span>Direct Messages</span>
            </h3>
            <button
              onClick={() => setNewChatModalOpen(true)}
              className="p-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white shadow-sm flex items-center gap-1 text-xs font-bold"
              title="Start New Student Chat"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Chat</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Conversations Scroll Area */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
          {visibleConversations.length === 0 ? (
            <div className="p-8 text-center space-y-2 text-slate-400">
              <MessageCircle className="w-8 h-8 opacity-40 mx-auto text-teal-600" />
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                No active conversations
              </p>
              <p className="text-[11px]">
                Click "New Chat" to message course mates and study partners.
              </p>
            </div>
          ) : (
            visibleConversations.map(conv => {
              const isSelected = conv.id === selectedConvId;
              return (
                <button
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv.id)}
                  className={`w-full p-4 text-left flex items-start gap-3 transition-colors ${
                    isSelected
                      ? 'bg-teal-50/70 dark:bg-teal-950/30'
                      : 'hover:bg-slate-100/60 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-600 text-white flex items-center justify-center font-extrabold text-xs shrink-0 shadow-sm">
                    {conv.participantName.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                        {conv.participantName}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    <p className="text-[10px] text-slate-400 truncate mt-0.5">
                      {conv.participantInstitution}
                    </p>

                    <div className="flex items-center justify-between gap-2 mt-1">
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 truncate">
                        {conv.lastMessageText}
                      </p>
                      {conv.unreadCount > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full bg-teal-600 text-white text-[9px] font-black shrink-0">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Right Column: Chat Window */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-slate-900">
        {activeConversation ? (
          <>
            {/* Active Conversation Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/40 dark:bg-slate-850/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-extrabold text-xs shadow-sm">
                  {activeConversation.participantName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {activeConversation.participantName}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {activeConversation.participantInstitution} • {activeConversation.participantDepartment}
                  </p>
                </div>
              </div>

              {/* Safety & Moderation Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() =>
                    onOpenReport(
                      'user',
                      activeConversation.participantId,
                      activeConversation.participantName
                    )
                  }
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title="Report Student"
                >
                  <ShieldAlert className="w-4 h-4" />
                </button>

                <button
                  onClick={() =>
                    onOpenBlock(
                      activeConversation.participantId,
                      activeConversation.participantName
                    )
                  }
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title="Block Student"
                >
                  <UserX className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 bg-slate-50/30 dark:bg-slate-950/30">
              {activeMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-2 text-slate-400">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300">
                    Encrypted Campus Direct Chat
                  </h4>
                  <p className="text-[11px] max-w-xs">
                    Start talking with {activeConversation.participantName} regarding academic projects, course reviews, and study schedules.
                  </p>
                </div>
              ) : (
                activeMessages.map(msg => {
                  const isMe = msg.senderId === currentStudentId;

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      {/* Bubble */}
                      <div
                        className={`max-w-md rounded-2xl p-3.5 shadow-sm text-xs space-y-1.5 ${
                          isMe
                            ? 'bg-teal-600 text-white rounded-tr-none'
                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-none'
                        }`}
                      >
                        {/* Quote reply */}
                        {msg.replyToText && (
                          <div
                            className={`p-2 rounded-xl text-[11px] border-l-2 mb-1 ${
                              isMe
                                ? 'bg-teal-700/60 border-teal-300 text-teal-100'
                                : 'bg-slate-100 dark:bg-slate-700/50 border-teal-500 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            <span className="font-bold block text-[10px]">↩ Quoting message:</span>
                            <p className="italic line-clamp-2">{msg.replyToText}</p>
                          </div>
                        )}

                        <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      </div>

                      {/* Meta actions */}
                      <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-slate-400">
                        <span>{msg.sentAt}</span>
                        {isMe && <CheckCheck className="w-3 h-3 text-teal-600" />}
                        <button
                          onClick={() => setReplyingTo(msg.text)}
                          className="hover:text-teal-600 flex items-center gap-0.5 ml-1"
                        >
                          <CornerDownRight className="w-2.5 h-2.5" />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Replying Banner */}
            {replyingTo && (
              <div className="px-4 py-2 bg-teal-50 dark:bg-teal-950/40 border-t border-teal-200 dark:border-teal-900/60 flex items-center justify-between text-xs text-teal-800 dark:text-teal-300">
                <div className="flex items-center gap-2 overflow-hidden">
                  <CornerDownRight className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">
                    Replying to quote: "{replyingTo}"
                  </span>
                </div>
                <button
                  onClick={() => setReplyingTo(null)}
                  className="p-1 rounded-md text-teal-600 hover:bg-teal-100 dark:hover:bg-teal-900/50"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Message Input Form */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 bg-white dark:bg-slate-900"
            >
              <input
                type="text"
                value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
                placeholder={`Message ${activeConversation.participantName}...`}
                className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!messageInput.trim()}
                className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold transition-all shadow-md shadow-teal-600/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3 text-slate-400">
            <MessageCircle className="w-12 h-12 opacity-40 text-teal-600" />
            <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">
              Select a Student Conversation
            </h4>
            <p className="text-xs max-w-sm">
              Connect directly with students across Nigerian universities, polytechnics, and colleges to share notes and revision tips.
            </p>
            <button
              onClick={() => setNewChatModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Start New Student Chat</span>
            </button>
          </div>
        )}
      </div>

      {/* New Peer Chat Modal */}
      {newChatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <User className="w-4 h-4 text-teal-600" />
                <span>Start Direct Conversation</span>
              </h4>
              <button
                onClick={() => setNewChatModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 border-b border-slate-100 dark:border-slate-800">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search students by name, school, or department..."
                  value={newPeerSearch}
                  onChange={e => setNewPeerSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="p-4 max-h-72 overflow-y-auto space-y-2">
              {filteredPeers.map(peer => (
                <button
                  key={peer.id}
                  onClick={() => handleStartPeerChat(peer)}
                  className="w-full p-3 rounded-2xl hover:bg-teal-50/70 dark:hover:bg-slate-800/60 text-left flex items-center justify-between gap-3 transition-colors border border-transparent hover:border-teal-200 dark:hover:border-teal-900/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 flex items-center justify-center font-bold text-xs">
                      {peer.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white">
                        {peer.name}
                      </h5>
                      <p className="text-[10px] text-slate-400">
                        {peer.institution} • {peer.department}
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg bg-teal-600 text-white text-[10px] font-bold">
                    Message
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
