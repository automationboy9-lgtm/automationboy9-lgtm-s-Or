import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { StudentProfileData, SupabaseProfile } from '../types';

// Client-side environment variables defined via Vite config or import.meta.env
const supabaseUrl = 
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_URL) || 
  (typeof process !== 'undefined' && process.env?.SUPABASE_URL) || 
  '';

const supabasePublishableKey = 
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY) || 
  (typeof process !== 'undefined' && process.env?.SUPABASE_PUBLISHABLE_KEY) || 
  '';

// Fallback placeholder credentials for local development when env vars are not set
const DEFAULT_SUPABASE_URL = 'https://demo-project.supabase.co';
const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';

const effectiveUrl = (supabaseUrl && supabaseUrl.trim().length > 0 && supabaseUrl.startsWith('http'))
  ? supabaseUrl.trim()
  : DEFAULT_SUPABASE_URL;

const effectiveKey = (supabasePublishableKey && supabasePublishableKey.trim().length > 0)
  ? supabasePublishableKey.trim()
  : DEFAULT_SUPABASE_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseUrl.trim().length > 0 && 
  supabaseUrl.startsWith('http') && 
  supabasePublishableKey && 
  supabasePublishableKey.trim().length > 0 &&
  !supabaseUrl.includes('placeholder')
);

// Create Supabase client singleton safely without throwing on startup in VS Code / local dev
export const supabase: SupabaseClient = createClient(effectiveUrl, effectiveKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});

export interface AuthErrorResponse {
  message: string;
  code?: string;
  status?: number;
}

/**
 * Fetch a student's profile from the Supabase `profiles` table.
 * If the database table hasn't been migrated yet, falls back gracefully
 * to Supabase user metadata.
 */
export async function fetchUserProfile(userId: string): Promise<{
  profile: SupabaseProfile | null;
  fromTable: boolean;
  error?: string;
}> {
  if (!isSupabaseConfigured) {
    return { profile: null, fromTable: false };
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      // Table missing error code PGRST205 or 42P01
      if (error.code === 'PGRST205' || error.message.includes('Could not find the table') || error.message.includes('relation "public.profiles" does not exist')) {
        return { profile: null, fromTable: false, error: 'TABLE_NOT_FOUND' };
      }
      console.warn('Error fetching profile from database:', error.message);
      return { profile: null, fromTable: false, error: error.message };
    }

    if (data) {
      return { profile: data as SupabaseProfile, fromTable: true };
    }

    return { profile: null, fromTable: true };
  } catch (err: any) {
    console.warn('Caught error fetching profile:', err);
    return { profile: null, fromTable: false, error: err.message };
  }
}

/**
 * Upsert a student profile record into Supabase `profiles` table
 * and synchronize with auth user_metadata.
 */
export async function upsertUserProfile(profile: Partial<SupabaseProfile> & { id: string }): Promise<{
  success: boolean;
  savedToTable: boolean;
  error?: string;
}> {
  let savedToTable = false;
  let tableError: string | undefined;

  if (!isSupabaseConfigured) {
    return { success: true, savedToTable: false };
  }

  try {
    const payload = {
      id: profile.id,
      full_name: profile.full_name,
      email: profile.email,
      institution_id: profile.institution_id || '',
      faculty_id: profile.faculty_id || '',
      department_id: profile.department_id || '',
      programme_id: profile.programme_id || '',
      level: profile.level || '100L',
      avatar_url: profile.avatar_url || '',
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('profiles')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      if (error.code === 'PGRST205' || error.message.includes('Could not find the table')) {
        tableError = 'TABLE_NOT_FOUND';
      } else {
        tableError = error.message;
      }
    } else {
      savedToTable = true;
    }
  } catch (err: any) {
    tableError = err.message;
  }

  // Only sync to user metadata in Auth if there is an active authenticated session
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData?.session?.user?.id === profile.id) {
      await supabase.auth.updateUser({
        data: {
          full_name: profile.full_name,
          institution_id: profile.institution_id,
          faculty_id: profile.faculty_id,
          department_id: profile.department_id,
          programme_id: profile.programme_id,
          level: profile.level,
          avatar_url: profile.avatar_url,
        },
      });
    }
  } catch (metaErr) {
    // Non-critical background sync error; do not fail upsert
  }

  return {
    success: savedToTable || !tableError || tableError === 'TABLE_NOT_FOUND',
    savedToTable,
    error: tableError,
  };
}

/**
 * Get the Supabase project host URL
 */
export function getSupabaseHost(): string {
  return supabaseUrl || 'https://vacadyxlzpxwwzjymrin.supabase.co';
}

/**
 * Get the clean canonical application URL for email callbacks and redirects.
 * Strictly avoids using localhost and falls back to live app URL or Supabase host.
 */
export function getAppRedirectUrl(): string {
  if (typeof window !== 'undefined' && window.location.origin) {
    const origin = window.location.origin;
    // Strictly forbid localhost; use live app origin if available
    if (!origin.includes('localhost') && !origin.includes('127.0.0.1')) {
      return origin;
    }
  }
  // Default to Supabase host or live cloud environment URL
  return getSupabaseHost();
}

export interface DetailedAuthError {
  message: string;
  code?: string;
  status?: number;
  host: string;
  raw?: any;
  recommendation?: string;
}

export function getDetailedAuthError(error: any): DetailedAuthError {
  const host = getSupabaseHost();
  if (!error) {
    return {
      message: 'Unknown authentication error',
      host,
    };
  }

  const rawMsg = error.message || (typeof error === 'string' ? error : JSON.stringify(error));
  const code = error.code || (error as any).error_code || (error as any).error || undefined;
  const status = error.status || (error as any).statusCode || undefined;

  let recommendation = '';
  if (code === 'email_not_confirmed' || rawMsg.includes('Email not confirmed')) {
    recommendation = 'Your account was registered in Supabase, but email confirmation is pending. Because Supabase free-tier emails may be delayed or filtered to Gmail Spam/Promotions, you can enter your 6-digit confirmation code, resend via Supabase host, or in the Supabase Dashboard (Authentication -> Users) click "Confirm user" to instantly activate this account.';
  } else if (status === 429 || rawMsg.toLowerCase().includes('rate limit') || rawMsg.toLowerCase().includes('over_email_send_rate_limit')) {
    recommendation = 'Supabase built-in mailer hourly rate limit reached. Please wait a few minutes before resending, or have the project administrator confirm the user directly in the Supabase Dashboard.';
  } else if (code === 'invalid_credentials' || rawMsg.includes('Invalid login credentials')) {
    recommendation = 'The email or password does not match. Please verify your password. If you need to reset it, use the password reset option.';
  } else if (rawMsg.includes('User already registered')) {
    recommendation = 'This email is already registered in Supabase. Please proceed to Sign In with your password.';
  } else if (rawMsg.includes('Password should be at least 6 characters')) {
    recommendation = 'Please enter a password with at least 6 characters.';
  }

  return {
    message: rawMsg,
    code,
    status,
    host,
    raw: error,
    recommendation,
  };
}

/**
 * Verify a student's email using the 6-digit OTP code or confirmation token from their email
 */
export async function verifyEmailOtp(email: string, token: string): Promise<{
  success: boolean;
  session?: Session | null;
  user?: User | null;
  error?: string;
  detailedError?: DetailedAuthError;
}> {
  try {
    // Attempt signup type verification first (standard for Supabase registration confirmation)
    let res = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: token.trim(),
      type: 'signup',
    });

    if (res.error) {
      // Fallback to 'email' otp type in case the template or project uses magic link email type
      const retry = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: token.trim(),
        type: 'email',
      });
      if (!retry.error) {
        res = retry;
      }
    }

    if (res.error) {
      return {
        success: false,
        error: formatSupabaseError(res.error),
        detailedError: getDetailedAuthError(res.error),
      };
    }

    return {
      success: true,
      session: res.data.session,
      user: res.data.user,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Failed to verify confirmation code.',
      detailedError: getDetailedAuthError(err),
    };
  }
}

/**
 * Resend the Supabase verification email with the proper web application redirect URL
 */
export async function resendVerificationEmail(email: string): Promise<{
  success: boolean;
  error?: string;
  detailedError?: DetailedAuthError;
}> {
  try {
    const redirectUrl = getAppRedirectUrl();
    const res = await supabase.auth.resend({
      type: 'signup',
      email: email.trim(),
      options: redirectUrl ? { emailRedirectTo: redirectUrl } : undefined,
    });

    if (res.error) {
      return {
        success: false,
        error: formatSupabaseError(res.error),
        detailedError: getDetailedAuthError(res.error),
      };
    }

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Failed to resend confirmation email.',
      detailedError: getDetailedAuthError(err),
    };
  }
}

/**
 * Format raw error from Supabase into full detailed message
 */
export function formatSupabaseError(error: any): string {
  if (!error) return 'An unknown error occurred.';
  const msg = error.message || String(error);
  const status = error.status || error.statusCode;
  const code = error.code || (error as any).error_code;

  const prefix = code || (status ? `HTTP ${status}` : 'SupabaseError');
  return `[${prefix}] ${msg}`;
}

