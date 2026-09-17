import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bell,
  CheckCircle2,
  ThumbsUp,
  MessageSquare,
  Users,
  Calendar,
  Shield,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CommunityNotification } from '../../types';

interface CommunityNotificationsTabProps {
  onNavigateToGroup?: (groupId: string) => void;
  onNavigateToFeed?: () => void;
}

export const CommunityNotificationsTab: React.FC<CommunityNotificationsTabProps> = ({
  onNavigateToGroup,
  onNavigateToFeed
}) => {
  const {
    communityNotifications,
    markCommunityNotificationRead,
    markAllCommunityNotificationsRead
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'reaction' | 'comment' | 'group' | 'direct_message' | 'study_session'>('all');

  const filteredNotifications = (communityNotifications || []).filter(n => {
    if (filter === 'all') return true;
    if (filter === 'group') return n.type === 'group_request' || n.type === 'group_accepted';
    return n.type === filter;
  });

  const getIcon = (type: CommunityNotification['type']) => {
    switch (type) {
      case 'reaction':
        return <ThumbsUp className="w-4 h-4 text-teal-600" />;
      case 'comment':
        return <MessageSquare className="w-4 h-4 text-sky-600" />;
      case 'group_request':
      case 'group_accepted':
        return <Users className="w-4 h-4 text-emerald-600" />;
      case 'direct_message':
        return <MessageSquare className="w-4 h-4 text-teal-600" />;
      case 'study_session':
        return <Calendar className="w-4 h-4 text-indigo-600" />;
      default:
        return <Bell className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Top action bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Community Activity & Alerts
            </h3>
            <p className="text-xs text-slate-400">
              Stay updated on peer discussions, group study sessions, and replies
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={markAllCommunityNotificationsRead}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Mark all read</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {(['all', 'reaction', 'comment', 'group', 'message'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-colors whitespace-nowrap ${
              filter === tab
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
            }`}
          >
            {tab === 'all' ? 'All Alerts' : tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Notification Items List */}
      <div className="space-y-2.5">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <Bell className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
            <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300">
              No notifications in this category
            </h4>
            <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
              When peers react to your questions, comment on your discussions, or schedule study groups, notifications will appear here.
            </p>
          </div>
        ) : (
          (filteredNotifications || []).map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => markCommunityNotificationRead(item.id)}
              className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3.5 cursor-pointer ${
                item.isRead
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                  : 'bg-teal-50/50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-900/60 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.message}
                  </p>
                  <p className="text-[10px] text-slate-400 pt-0.5">{item.timestamp}</p>
                </div>
              </div>

              {/* Action Button */}
              {item.actionLink && (
                <div className="shrink-0 self-center">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      markCommunityNotificationRead(item.id);
                      if (item.type.includes('group') && onNavigateToGroup) {
                        onNavigateToGroup(item.actionLink!);
                      } else if (onNavigateToFeed) {
                        onNavigateToFeed();
                      }
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 hover:bg-teal-100 text-xs font-bold flex items-center gap-1"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
