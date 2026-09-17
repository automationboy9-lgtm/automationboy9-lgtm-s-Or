import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Settings, 
  X, 
  Moon, 
  Sun, 
  Download, 
  RotateCcw, 
  Bell, 
  Database, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { darkMode, toggleDarkMode, resetData, addToast, student, semesters, tasks, budget } = useApp();

  if (!isOpen) return null;

  const handleExportData = () => {
    const exportPayload = {
      exportedAt: new Date().toISOString(),
      student,
      semesters,
      tasks,
      budget
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `StudentHub_NG_Backup_${student.matricNumber.replace('/', '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    addToast('Data Exported', 'Academic profile & GPA records exported successfully.', 'success');
  };

  const handleReset = () => {
    if (window.confirm('Reset all academic data to default sample state?')) {
      resetData();
      addToast('Data Reset', 'Default academic records restored.', 'info');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Application Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          
          {/* Appearance Toggle */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="w-5 h-5 text-purple-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">Appearance Theme</h4>
                <p className="text-[11px] text-slate-500">{darkMode ? 'Dark Mode (Night Owl Study)' : 'Light Mode (Clean View)'}</p>
              </div>
            </div>

            <button
              onClick={toggleDarkMode}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-900 dark:text-white shadow-sm"
            >
              Switch to {darkMode ? 'Light' : 'Dark'}
            </button>
          </div>

          {/* Export Data */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-teal-600" />
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">Export Academic Backup</h4>
                <p className="text-[11px] text-slate-500">Save CGPA records & tasks to JSON</p>
              </div>
            </div>

            <button
              onClick={handleExportData}
              className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm"
            >
              Export
            </button>
          </div>

          {/* Reset Demo Data */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-rose-500" />
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">Reset Local Database</h4>
                <p className="text-[11px] text-slate-500">Restore factory sample records</p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-xl border border-rose-300 dark:border-rose-800 text-rose-600 hover:bg-rose-50 text-xs font-bold"
            >
              Reset
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
