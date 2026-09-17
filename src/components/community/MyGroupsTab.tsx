import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Plus,
  Crown,
  Shield,
  MessageSquare,
  BookOpen,
  Calendar,
  Globe,
  Lock,
  ArrowRight,
  UserCheck,
  UserX,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudyGroup } from '../../types';

interface MyGroupsTabProps {
  onOpenGroup: (group: StudyGroup) => void;
  onOpenCreateGroup: () => void;
  onNavigateToDiscover: () => void;
}

export const MyGroupsTab: React.FC<MyGroupsTabProps> = ({
  onOpenGroup,
  onOpenCreateGroup,
  onNavigateToDiscover
}) => {
  const {
    studyGroups,
    currentUser,
    handleGroupJoinRequest,
    groupChatMessages
  } = useApp();

  const studentId = currentUser?.id || 'current_student';

  // Filter groups where student is a member or creator
  const myGroups = (studyGroups || []).filter(
    g => g.creatorId === studentId || (g.members || []).some(m => m.id === studentId)
  );

  // Collect pending requests for groups this user administers
  const administeredGroupsWithRequests = (myGroups || []).filter(g => {
    const isCreator = g.creatorId === studentId;
    const isAdmin = (g.members || []).some(m => m.id === studentId && (m.role === 'admin' || m.role === 'creator'));
    return (isCreator || isAdmin) && (g.pendingRequests || []).length > 0;
  });

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-600" />
            <span>My Study & Reading Circles</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Groups you have created or joined to collaborate on lectures, exams & past questions
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onNavigateToDiscover}
            className="px-3.5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
          >
            Discover More
          </button>
          <button
            onClick={onOpenCreateGroup}
            className="px-4 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md shadow-teal-600/20 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create Study Group</span>
          </button>
        </div>
      </div>

      {/* Admin Action Alerts: Pending Join Requests */}
      {administeredGroupsWithRequests.length > 0 && (
        <div className="p-4 rounded-3xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <h3 className="font-extrabold text-xs">
              Pending Join Requests in Your Groups
            </h3>
          </div>

          <div className="space-y-2">
            {administeredGroupsWithRequests.flatMap(g =>
              (g.pendingRequests || []).map(req => (
                <div
                  key={req.id}
                  className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200/80 dark:border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {req.studentName}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        wants to join <strong>{g.name}</strong>
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {req.studentInstitution} • {req.department} • {req.level}
                    </p>
                    {req.message && (
                      <p className="text-[11px] italic text-slate-600 dark:text-slate-400 mt-0.5">
                        "{req.message}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleGroupJoinRequest(g.id, req.id, 'accept')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleGroupJoinRequest(g.id, req.id, 'reject')}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 text-xs font-bold flex items-center gap-1"
                    >
                      <UserX className="w-3.5 h-3.5" />
                      <span>Decline</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Groups Grid */}
      {myGroups.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <Users className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
          <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">
            You Haven't Joined Any Study Groups Yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Study groups allow you to organize exam sessions, exchange past questions, and chat live with coursemates.
          </p>
          <div className="flex justify-center gap-2.5 pt-2">
            <button
              onClick={onNavigateToDiscover}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50"
            >
              Browse Groups
            </button>
            <button
              onClick={onOpenCreateGroup}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md"
            >
              Create Study Group
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(myGroups || []).map(group => {
            const isCreator = group.creatorId === studentId;
            const myMembership = (group.members || []).find(m => m.id === studentId);
            const isAdmin = isCreator || myMembership?.role === 'admin';
            const msgCount = (groupChatMessages[group.id] || []).length;
            const nextSession = group.studySessions?.[0];

            return (
              <div
                key={group.id}
                className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-teal-500/40 transition-colors"
              >
                <div className="space-y-3">
                  {/* Top badges */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 ${
                          group.privacy === 'public'
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                            : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                        }`}
                      >
                        {group.privacy === 'public' ? (
                          <Globe className="w-3 h-3" />
                        ) : (
                          <Lock className="w-3 h-3" />
                        )}
                        <span className="capitalize">{group.privacy}</span>
                      </span>

                      {group.courseCode && (
                        <span className="px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-[10px] font-black uppercase">
                          {group.courseCode}
                        </span>
                      )}

                      {isCreator && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px] font-extrabold flex items-center gap-1">
                          <Crown className="w-3 h-3" />
                          <span>Creator</span>
                        </span>
                      )}

                      {isAdmin && !isCreator && (
                        <span className="px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 text-[10px] font-extrabold flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          <span>Admin</span>
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] font-bold text-slate-400">
                      {group.memberCount} members
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                      {group.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                      {group.description}
                    </p>
                  </div>

                  {/* Meta stats */}
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
                      <span>{msgCount} messages</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                      <span>{group.sharedResources?.length || 0} resources</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      <span>{group.studySessions?.length || 0} sessions</span>
                    </div>
                  </div>

                  {/* Upcoming study session preview if scheduled */}
                  {nextSession && (
                    <div className="p-2.5 rounded-xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200/60 dark:border-teal-900/40 flex items-center gap-2 text-[11px] text-teal-900 dark:text-teal-200">
                      <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
                      <div className="overflow-hidden">
                        <span className="font-bold truncate block">
                          Next Session: {nextSession.title}
                        </span>
                        <span className="text-[10px] opacity-80">
                          {nextSession.date} at {nextSession.time}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Open Group Action */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    {group.institution}
                  </span>

                  <button
                    onClick={() => onOpenGroup(group)}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-teal-600/20"
                  >
                    <span>Open Group Room</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
