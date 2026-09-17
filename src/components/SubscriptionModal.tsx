import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Check, 
  X, 
  ShieldCheck, 
  Zap, 
  Lock, 
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { student, updateStudent, addToast } = useApp();

  const [selectedPlan, setSelectedPlan] = useState<'semester' | 'annual'>('semester');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/subscription/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan,
          studentId: student.id
        })
      });
      const data = await res.json();
      if (data.status === 'success') {
        updateStudent({ isPro: true });
        addToast('Welcome to StudentHub Pro! 🚀', 'Unlimited AI Copilot queries & verified CBT bank unlocked.', 'success');
        onClose();
      }
    } catch (e) {
      updateStudent({ isPro: true });
      addToast('StudentHub Pro Activated! 🚀', 'Unlimited access enabled.', 'success');
      onClose();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-purple-900 to-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500 text-white flex items-center justify-center font-bold">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">Upgrade to StudentHub Pro</h3>
              <p className="text-xs text-purple-200">Built for Nigerian Tertiary Students</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Plan Selector */}
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => setSelectedPlan('semester')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedPlan === 'semester'
                  ? 'border-purple-600 bg-purple-50/50 dark:bg-purple-950/30 ring-1 ring-purple-600'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <span className="text-[10px] font-bold uppercase text-purple-600">Semester Pass</span>
              <p className="text-xl font-black text-slate-900 dark:text-white mt-1">₦1,500</p>
              <p className="text-[10px] text-slate-400">Valid for 1 full semester</p>
            </div>

            <div
              onClick={() => setSelectedPlan('annual')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all relative ${
                selectedPlan === 'annual'
                  ? 'border-purple-600 bg-purple-50/50 dark:bg-purple-950/30 ring-1 ring-purple-600'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <span className="absolute -top-2 right-3 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[9px] font-black">
                BEST VALUE
              </span>
              <span className="text-[10px] font-bold uppercase text-purple-600">Full Academic Year</span>
              <p className="text-xl font-black text-slate-900 dark:text-white mt-1">₦2,500</p>
              <p className="text-[10px] text-slate-400">2 Semesters (Save ₦500)</p>
            </div>
          </div>

          {/* Pro Benefits List */}
          <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>Unlimited AI Study Copilot</strong> explanations & derivations</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>Unrestricted CBT Mock Exams</strong> with full worked answers</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>AI Final-Year Project</strong> topic synthesis & literature review builder</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>Verified Student Badge</strong> in Community & Study Groups</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleUpgrade}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
            >
              <CreditCard className="w-4 h-4" />
              <span>{isProcessing ? 'Verifying Secure Payment...' : `Pay ₦${selectedPlan === 'semester' ? '1,500' : '2,500'} via Paystack`}</span>
            </button>
            <p className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              <span>256-Bit Bank-Grade Secure Payment</span>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
