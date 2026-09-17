import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Compass,
  MessageCircle,
  Bell,
  Globe,
  Plus,
  Shield,
  UserX,
  LogIn,
  Sparkles,
  BookOpen,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StudyGroup } from '../types';

// Community Sub-components
import { CommunityFeed } from './community/CommunityFeed';
import { MyGroupsTab } from './community/MyGroupsTab';
import { DiscoverGroupsTab } from './community/DiscoverGroupsTab';
import { DirectMessagesTab } from './community/DirectMessagesTab';
import { CommunityNotificationsTab } from './community/CommunityNotificationsTab';
import { ReportModal } from './community/ReportModal';
import { BlockedUsersModal } from './community/BlockedUsersModal';
import { CreateGroupModal } from './community/CreateGroupModal';
import { GroupWorkspaceModal } from './community/GroupWorkspaceModal';

export const CommunityForum: React.FC = () => {
  const {
    student,
    currentUser,
    isAuthenticated,
    setCurrentView,
    studyGroups,
    communityPosts,
    directConversations,
    communityNotifications,
    blockedUserIds,
    blockUser,
    addToast
  } = useApp();

  // Navigation tab state: 'feed' | 'my_groups' | 'discover_groups' | 'messages' | 'notifications'
  const [activeTab, setActiveTab] = useState<'feed' | 'my_groups' | 'discover_groups' | 'messages' | 'notifications'>('feed');

  // Modals state
  const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const [blockedUsersModalOpen, setBlockedUsersModalOpen] = useState(false);
  const [activeGroupWorkspace, setActiveGroupWorkspace] = useState<StudyGroup | null>(null);

  // Content moderation / report modal state
  const [reportModalData, setReportModalData] = useState<{
    isOpen: boolean;
    contentType: 'post' | 'comment' | 'message' | 'group' | 'user';
    contentId: string;
    contentTitle?: string;
  }>({
    isOpen: false,
    contentType: 'post',
    contentId: ''
  });

  const studentId = currentUser?.id || 'current_student';

  // Badge calculations
  const myGroupsCount = studyGroups.filter(
    g => g.creatorId === studentId || g.members.some(m => m.id === studentId)
  ).length;

  const pendingRequestsCount = studyGroups
    .filter(g => g.creatorId === studentId || g.members.some(m => m.id === studentId && m.role === 'admin'))
    .reduce((sum, g) => sum + (g.pendingRequests?.length || 0), 0);

  const unreadMessagesCount = directConversations.reduce(
    (sum, c) => sum + (c.unreadCount || 0),
    0
  );

  const unreadNotificationsCount = communityNotifications.filter(n => !n.isRead).length;

  const handleOpenReport = (
    type: 'post' | 'comment' | 'message' | 'group' | 'user',
    id: string,
    title?: string
  ) => {
    setReportModalData({
      isOpen: true,
      contentType: type,
      contentId: id,
      contentTitle: title
    });
  };

  const handleBlockStudent = (userId: string, userName: string) => {
    if (confirm(`Block ${userName}? You will no longer see their discussions, comments, or direct messages.`)) {
      blockUser(userId);
    }
  };

  const handleNavigateToGroupFromNotification = (groupId: string) => {
    const targetGroup = studyGroups.find(g => g.id === groupId);
    if (targetGroup) {
      setActiveGroupWorkspace(targetGroup);
    } else {
      setActiveTab('discover_groups');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-950 via-slate-900 to-slate-950 text-white shadow-xl border border-teal-900/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-black border border-teal-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>StudentHub NG Community</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold">
                Nigeria Tertiary Education Network
              </span>
            </div>

            <h1 className="text-xl sm:text-3xl font-black tracking-tight leading-tight">
              Collaborative Student Social & Study Community
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Connect with coursemates, form peer reading circles, exchange verified past questions, organize exam study sessions, and direct message students nationwide.
            </p>
          </div>

          {/* Quick Action Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setCreateGroupModalOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-teal-600/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Study Group</span>
            </button>

            <button
              onClick={() => setBlockedUsersModalOpen(true)}
              className="px-3 py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1.5 border border-slate-700/60 transition-colors"
              title="Manage Blocked Students"
            >
              <UserX className="w-4 h-4 text-rose-400" />
              <span className="hidden sm:inline">Blocked ({blockedUserIds.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Unauthenticated Student Callout Notice */}
      {!isAuthenticated && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-amber-900 dark:text-amber-200">
                You are currently viewing in Preview Mode
              </h3>
              <p className="text-xs text-amber-700 dark:text-amber-300">
                Sign in with your student account to create discussions, send direct messages, and join private study groups.
              </p>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('login')}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 shadow-md"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Participate</span>
          </button>
        </div>
      )}

      {/* Community Navigation Tabs Section */}
      <div className="border-b border-slate-200 dark:border-slate-800 flex items-center gap-1 sm:gap-2 overflow-x-auto pb-px">
        {/* 1. Public Feed */}
        <button
          onClick={() => setActiveTab('feed')}
          className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'feed'
              ? 'border-teal-600 text-teal-600 dark:text-teal-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Public Feed</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-extrabold">
            {communityPosts.length}
          </span>
        </button>

        {/* 2. My Groups */}
        <button
          onClick={() => setActiveTab('my_groups')}
          className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'my_groups'
              ? 'border-teal-600 text-teal-600 dark:text-teal-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>My Groups</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-extrabold">
            {myGroupsCount}
          </span>
          {pendingRequestsCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" title="Pending requests in groups" />
          )}
        </button>

        {/* 3. Discover Groups */}
        <button
          onClick={() => setActiveTab('discover_groups')}
          className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'discover_groups'
              ? 'border-teal-600 text-teal-600 dark:text-teal-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Discover Groups</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-extrabold">
            {studyGroups.length}
          </span>
        </button>

        {/* 4. Messages */}
        <button
          onClick={() => setActiveTab('messages')}
          className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'messages'
              ? 'border-teal-600 text-teal-600 dark:text-teal-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Direct Messages</span>
          {unreadMessagesCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-teal-600 text-white text-[10px] font-black">
              {unreadMessagesCount}
            </span>
          )}
        </button>

        {/* 5. Notifications */}
        <button
          onClick={() => setActiveTab('notifications')}
          className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'notifications'
              ? 'border-teal-600 text-teal-600 dark:text-teal-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notifications</span>
          {unreadNotificationsCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-black">
              {unreadNotificationsCount}
            </span>
          )}
        </button>
      </div>

      {/* Tab Content Display */}
      <div className="pt-2">
        {activeTab === 'feed' && (
          <CommunityFeed
            onOpenReport={(type, id, title) => handleOpenReport(type, id, title)}
            onOpenBlock={(userId, userName) => handleBlockStudent(userId, userName)}
          />
        )}

        {activeTab === 'my_groups' && (
          <MyGroupsTab
            onOpenGroup={group => setActiveGroupWorkspace(group)}
            onOpenCreateGroup={() => setCreateGroupModalOpen(true)}
            onNavigateToDiscover={() => setActiveTab('discover_groups')}
          />
        )}

        {activeTab === 'discover_groups' && (
          <DiscoverGroupsTab
            onOpenGroup={group => setActiveGroupWorkspace(group)}
            onOpenCreateGroup={() => setCreateGroupModalOpen(true)}
          />
        )}

        {activeTab === 'messages' && (
          <DirectMessagesTab
            onOpenReport={(type, id, title) => handleOpenReport(type, id, title)}
            onOpenBlock={(userId, userName) => handleBlockStudent(userId, userName)}
          />
        )}

        {activeTab === 'notifications' && (
          <CommunityNotificationsTab
            onNavigateToGroup={handleNavigateToGroupFromNotification}
            onNavigateToFeed={() => setActiveTab('feed')}
          />
        )}
      </div>

      {/* Modal: Create Study Group */}
      <CreateGroupModal
        isOpen={createGroupModalOpen}
        onClose={() => setCreateGroupModalOpen(false)}
        onSuccess={newGroupId => {
          const created = studyGroups.find(g => g.id === newGroupId);
          if (created) {
            setActiveGroupWorkspace(created);
          }
          addToast('Study Group Created', 'Your new study group is live!', 'success');
        }}
      />

      {/* Modal: Study Group Workspace & Live Chat */}
      {activeGroupWorkspace && (
        <GroupWorkspaceModal
          group={
            studyGroups.find(g => g.id === activeGroupWorkspace.id) ||
            activeGroupWorkspace
          }
          isOpen={Boolean(activeGroupWorkspace)}
          onClose={() => setActiveGroupWorkspace(null)}
          onOpenReport={(type, id, title) => handleOpenReport(type, id, title)}
        />
      )}

      {/* Modal: Blocked Students List */}
      <BlockedUsersModal
        isOpen={blockedUsersModalOpen}
        onClose={() => setBlockedUsersModalOpen(false)}
      />

      {/* Modal: Content Moderation & Reporting */}
      <ReportModal
        isOpen={reportModalData.isOpen}
        contentType={reportModalData.contentType}
        contentId={reportModalData.contentId}
        contentTitle={reportModalData.contentTitle}
        onClose={() =>
          setReportModalData(prev => ({ ...prev, isOpen: false }))
        }
      />
    </div>
  );
};
