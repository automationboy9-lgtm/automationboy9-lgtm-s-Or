import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserX, X, ShieldCheck, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface BlockedUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BlockedUsersModal: React.FC<BlockedUsersModalProps> = ({ isOpen, onClose }) => {
  const { blockedUserIds, unblockUser } = useApp();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
        >
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
              <UserX className="w-5 h-5 text-rose-500" />
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Blocked Students ({blockedUserIds.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 max-h-80 overflow-y-auto space-y-3">
            {blockedUserIds.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300">
                  No Blocked Users
                </h4>
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                  When you block someone, their discussions, replies, and direct messages will be hidden from your feed.
                </p>
              </div>
            ) : (
              (blockedUserIds || []).map((userId, idx) => (
                <div
                  key={userId}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 flex items-center justify-center font-bold text-xs">
                      #{idx + 1}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        Student ID: {userId.slice(0, 12)}...
                      </p>
                      <p className="text-[10px] text-slate-400">Content hidden from your view</p>
                    </div>
                  </div>
                  <button
                    onClick={() => unblockUser(userId)}
                    className="px-2.5 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 hover:bg-teal-100 text-xs font-bold border border-teal-200 dark:border-teal-800 flex items-center gap-1"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Unblock</span>
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
