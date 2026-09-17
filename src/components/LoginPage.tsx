import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  supabase, 
  verifyEmailOtp, 
  resendVerificationEmail, 
  formatSupabaseError 
} from '../lib/supabase';
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  KeyRound,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LoginPage: React.FC = () => {
  const { 
    setCurrentView, 
    addToast, 
    setStudentSession
  } = useApp();

  const [email, setEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sh_student_email') || '';
    }
    return '';
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Email verification required state
  const [needsVerification, setNeedsVerification] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sh_student_email', val);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setNeedsVerification(false);

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        // Enforce Email Verification: If Supabase reports email is not confirmed, require verification!
        if (
          error.message?.toLowerCase().includes('email not confirmed') ||
          error.code === 'email_not_confirmed'
        ) {
          setNeedsVerification(true);
          setResendCooldown(60);
          setErrorMessage('Your email address has not been confirmed yet. Please verify your email below before entering the portal.');
          return;
        }

        if (
          error.message?.toLowerCase().includes('invalid') || 
          error.code === 'invalid_credentials'
        ) {
          setErrorMessage('Invalid email or password. Please verify your credentials or create a new account.');
          return;
        }

        setErrorMessage(formatSupabaseError(error));
        return;
      }

      if (data?.user) {
        const meta = data.user.user_metadata || {};
        setStudentSession(data.user.email || email.trim(), meta.full_name, meta);
        addToast('Welcome Back!', 'Signed into your personal student portal.', 'success');
        setCurrentView('dashboard');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP for unconfirmed accounts trying to log in
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError(null);

    const cleanToken = otpCode.trim();
    if (!cleanToken) {
      setOtpError('Please enter the 6-digit confirmation code sent to your email.');
      return;
    }

    setVerifyingOtp(true);

    try {
      const res = await verifyEmailOtp(email.trim(), cleanToken);

      if (!res.success) {
        setOtpError(res.error || 'Invalid or expired confirmation code.');
        setVerifyingOtp(false);
        return;
      }

      // Now sign in to get active session
      const { data } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      const meta = data?.user?.user_metadata || res.user?.user_metadata || {};
      setStudentSession(email.trim(), meta.full_name, meta);
      addToast('Email Verified & Signed In!', 'Welcome to your verified student portal.', 'success');
      setCurrentView('dashboard');
    } catch (err: any) {
      setOtpError(err.message || 'Failed to verify confirmation code.');
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Resend verification email from login screen
  const handleResendEmail = async () => {
    if (resendCooldown > 0 || resending) return;
    setResending(true);
    setOtpError(null);

    const res = await resendVerificationEmail(email.trim());
    setResending(false);

    if (res.success) {
      setResendSuccess(true);
      setResendCooldown(60);
      addToast('Email Sent', `A confirmation email has been dispatched to ${email.trim()}.`, 'success');
      setTimeout(() => setResendSuccess(false), 5000);
    } else {
      setOtpError(res.error || 'Failed to resend confirmation email.');
    }
  };

  // Countdown timer effect
  React.useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown(c => Math.max(0, c - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      
      {/* Top back navigation */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrentView('landing')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
          Student Portal
        </span>
      </div>

      {/* Main Login Card */}
      <motion.div 
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden"
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 p-6 text-white text-center relative overflow-hidden">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner border border-white/20">
            <GraduationCap className="w-6 h-6 text-emerald-300" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-white">
            StudentHub <span className="text-emerald-400">NG</span>
          </h2>
          <p className="text-xs text-emerald-200/90 mt-1">
            Sign in to access your personal academic portal & tools
          </p>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-5">
          
          {/* Error Banner */}
          {errorMessage && !needsVerification && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-800 dark:text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">{errorMessage}</div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {needsVerification ? (
              /* ================= EMAIL CONFIRMATION REQUIRED PANEL ================= */
              <motion.div
                key="verify-panel"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4"
              >
                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Email Verification Required</span>
                  </div>
                  <p className="leading-relaxed text-amber-800 dark:text-amber-300">
                    A confirmation code was sent to <strong>{email}</strong>. Enter the 6-digit OTP code below to activate your account.
                  </p>
                </div>

                {otpError && (
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-800 dark:text-red-300 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div className="flex-1">{otpError}</div>
                  </div>
                )}

                {resendSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Confirmation email sent! Please check your inbox or spam.</span>
                  </div>
                )}

                <form onSubmit={handleVerifyOtp} className="space-y-3">
                  <div>
                    <label 
                      htmlFor="login-otp" 
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                    >
                      6-Digit Confirmation Code
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                      <input
                        id="login-otp"
                        type="text"
                        maxLength={8}
                        value={otpCode}
                        onChange={e => setOtpCode(e.target.value.replace(/\s+/g, ''))}
                        placeholder="e.g. 123456"
                        autoFocus
                        className="w-full pl-10 pr-4 py-2.5 text-base font-mono font-bold tracking-widest text-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={verifyingOtp || !otpCode.trim()}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {verifyingOtp ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>Verify Code & Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => setNeedsVerification(false)}
                    className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
                  >
                    ← Back to Sign In
                  </button>

                  <button
                    type="button"
                    onClick={handleResendEmail}
                    disabled={resendCooldown > 0 || resending}
                    className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline disabled:opacity-50 flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
                    <span>
                      {resendCooldown > 0 ? `Resend (${resendCooldown}s)` : 'Resend Email'}
                    </span>
                  </button>
                </div>
              </motion.div>
            ) : (
              /* ================= STANDARD LOGIN FORM ================= */
              <form onSubmit={handleLogin} className="space-y-4">
                
                {/* Email Field */}
                <div>
                  <label 
                    htmlFor="login-email" 
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Student Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      id="login-email"
                      type="email"
                      required
                      value={email}
                      onChange={e => handleEmailChange(e.target.value)}
                      placeholder="your.email@example.com"
                      autoComplete="email"
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label 
                      htmlFor="login-password" 
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setCurrentView('forgot_password')}
                      className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-60 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </AnimatePresence>

          {/* Sign Up Redirect */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <p>
              Don&apos;t have an account yet?{' '}
              <button
                type="button"
                onClick={() => setCurrentView('signup')}
                className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                Build Your Student Account
              </button>
            </p>
            <p className="text-[11px] text-slate-400">
              Registration is required to access StudentHub NG academic tools.
            </p>
          </div>

        </div>
      </motion.div>

      {/* Footer reassurance */}
      <div className="mt-8 text-center text-xs text-slate-400 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Secured for Nigerian Tertiary Students</span>
      </div>

    </div>
  );
};
