import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { supabase, upsertUserProfile, formatSupabaseError, getAppRedirectUrl } from '../lib/supabase';
import { 
  GraduationCap, 
  ShieldCheck, 
  Mail, 
  Lock, 
  User, 
  School, 
  ArrowRight, 
  X, 
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion } from 'motion/react';

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    authMode, 
    setAuthMode, 
    setCurrentView, 
    addToast,
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isSubmittingRef = useRef(false);

  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const interval = setInterval(() => {
      setCooldownSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownSeconds]);

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmittingRef.current || loading || cooldownSeconds > 0) {
      return;
    }

    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    if (authMode === 'signup') {
      // Direct user to full self-built account creation with Nigerian institution & email verification
      setAuthModalOpen(false);
      setCurrentView('signup');
      return;
    }

    isSubmittingRef.current = true;
    setLoading(true);

    try {
      if (authMode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          if (error.message?.toLowerCase().includes('email not confirmed') || error.code === 'email_not_confirmed') {
            setErrorMessage('Your email has not been verified yet. Please click below to verify your email.');
            setLoading(false);
            isSubmittingRef.current = false;
            return;
          }
          const friendly = formatSupabaseError(error);
          setErrorMessage(friendly);
          if (error.status === 429 || friendly.includes('request limit')) {
            setCooldownSeconds(60);
          }
          return;
        }

        if (data.user) {
          setAuthModalOpen(false);
          addToast('Welcome Back!', 'Logged into StudentHub NG portal.', 'success');
          setCurrentView('dashboard');
        }
      } else {
        // Quick sign up or redirect to full registration
        const redirectUrl = getAppRedirectUrl();
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: redirectUrl || undefined,
            data: {
              full_name: fullName.trim(),
              level: '100L',
            },
          },
        });

        if (error) {
          const friendly = formatSupabaseError(error);
          setErrorMessage(friendly);
          if (error.status === 429 || friendly.includes('request limit')) {
            setCooldownSeconds(60);
          }
          return;
        }

        if (data.user) {
          try {
            await upsertUserProfile({
              id: data.user.id,
              full_name: fullName.trim(),
              email: email.trim(),
              level: '100L',
            });
          } catch (profileErr) {
            console.warn('Profile sync note:', profileErr);
          }

          setAuthModalOpen(false);
          if (data.session) {
            addToast('Welcome!', 'Student account created successfully.', 'success');
            setCurrentView('dashboard');
          } else {
            addToast('Account Created', 'Please check your email for confirmation.', 'info');
            setCurrentView('login');
          }
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
      isSubmittingRef.current = false;
    }
  };

  const openFullSignUp = () => {
    setAuthModalOpen(false);
    setCurrentView('signup');
  };

  const openFullLogin = () => {
    setAuthModalOpen(false);
    setCurrentView('login');
  };

  const openForgotPassword = () => {
    setAuthModalOpen(false);
    setCurrentView('forgot_password');
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
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                {authMode === 'signup' ? 'Create Student Account' : 'Student Sign In'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Supabase Authenticated Student Portal
              </p>
            </div>
          </div>
          <button
            onClick={() => setAuthModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Mode Switcher */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setErrorMessage(null);
              }}
              className={`py-1.5 rounded-lg transition-all ${
                authMode === 'login'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setErrorMessage(null);
              }}
              className={`py-1.5 rounded-lg transition-all ${
                authMode === 'signup'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              Sign Up
            </button>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-800 dark:text-red-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Babatunde Fashola"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={openForgotPassword}
                    className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-9 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || cooldownSeconds > 0}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all mt-2"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Connecting to Supabase...</span>
                </>
              ) : cooldownSeconds > 0 ? (
                <span>Please wait {cooldownSeconds}s</span>
              ) : (
                <>
                  <span>{authMode === 'signup' ? 'Create Account' : 'Sign In to Dashboard'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Full flow links */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center space-y-2">
            {authMode === 'signup' ? (
              <button
                type="button"
                onClick={openFullSignUp}
                className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline block w-full"
              >
                Need full academic track registration? Open full form →
              </button>
            ) : (
              <button
                type="button"
                onClick={openFullLogin}
                className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium block w-full"
              >
                Go to Dedicated Sign In Page →
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
