import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { supabase, formatSupabaseError } from '../lib/supabase';
import { 
  KeyRound, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ChevronLeft,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';

export const ForgotPasswordPage: React.FC = () => {
  const { setCurrentView, addToast } = useApp();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setErrorMessage('Please enter your account email address.');
      return;
    }

    setLoading(true);

    try {
      const redirectUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: redirectUrl,
      });

      if (error) {
        setErrorMessage(formatSupabaseError(error));
        setLoading(false);
        return;
      }

      setSuccessMessage(
        `A password recovery link has been dispatched to ${email.trim()}. Please check your email inbox (and spam/junk folder) and click the link to reset your password.`
      );
      addToast('Password Reset Link Sent', 'Check your email for reset instructions.', 'info');
    } catch (err: any) {
      console.error('Password reset error:', err);
      setErrorMessage(err.message || 'Failed to send password reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white relative">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentView('login')}
              className="inline-flex items-center gap-1.5 text-xs text-emerald-200 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </button>
            <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md bg-emerald-400 text-emerald-950">
              Supabase Flow
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white text-emerald-900 flex items-center justify-center shadow-lg font-black text-2xl">
              <KeyRound className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                Reset Password
              </h2>
              <p className="text-xs text-emerald-200/90 font-medium">
                Recover your StudentHub NG account
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-5">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-800 dark:text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {successMessage ? (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-xs space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Reset Email Dispatched</span>
              </div>
              <p className="leading-relaxed pl-7">{successMessage}</p>
              <div className="pt-2 pl-7">
                <button
                  onClick={() => setCurrentView('login')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm"
                >
                  <span>Return to Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Enter the email address associated with your StudentHub NG account and Supabase will send you a secure password reset link.
                </p>
              </div>

              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label 
                    htmlFor="reset-email" 
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Account Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      id="reset-email"
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      autoComplete="email"
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all mt-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Instructions...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <button
              onClick={() => setCurrentView('login')}
              className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
            >
              Remember your password? Back to Sign In
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
