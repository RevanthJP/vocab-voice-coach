import React, { useState } from 'react';
import { X, Mail, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import { storageService } from '../services/storageService';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile, isNewSignUp?: boolean) => void;
}

type AuthTab = 'login' | 'signup' | 'forgot';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [tab, setTab] = useState<AuthTab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (tab === 'login') {
        if (!email || !password) {
          setError('Please fill in both email and password.');
          setLoading(false);
          return;
        }
        const res = storageService.login(email, password);
        if (res.error || !res.user) {
          setError(res.error || 'Failed to login');
          setLoading(false);
          return;
        }
        onSuccess(res.user, false);
        onClose();
      } else if (tab === 'signup') {
        if (!email || !password || !name) {
          setError('Please provide your name, email, and a password.');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Password should be at least 6 characters long.');
          setLoading(false);
          return;
        }
        const res = storageService.register(email, password, name);
        if (res.error || !res.user) {
          setError(res.error || 'Failed to sign up');
          setLoading(false);
          return;
        }
        onSuccess(res.user, true);
        onClose();
      } else if (tab === 'forgot') {
        if (!email) {
          setError('Please enter your email address.');
          setLoading(false);
          return;
        }
        // In local/demo mode, reset password directly to 'password123'
        const res = storageService.resetPassword(email, 'password123');
        if (!res.success) {
          setError(res.error || 'Unable to find account.');
          setLoading(false);
          return;
        }
        setResetSent(true);
        setLoading(false);
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-600 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {/* Brand Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0B749C] to-[#1FBAC0] flex items-center justify-center text-white mx-auto mb-3 shadow-md">
              <span className="font-bold text-xl">V</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {tab === 'login' && 'Sign in to save your progress'}
              {tab === 'signup' && 'Create Your Account'}
              {tab === 'forgot' && 'Reset Password'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {tab === 'login' && 'Create an account to keep your practice progress across devices.'}
              {tab === 'signup' && 'Start speaking English confidently with personal feedback'}
              {tab === 'forgot' && 'Enter your email to restore access'}
            </p>
          </div>

          {/* Tab Switcher */}
          {tab !== 'forgot' && (
            <div className="flex rounded-xl bg-slate-100 p-1 mb-5">
              <button
                type="button"
                onClick={() => {
                  setTab('login');
                  setError(null);
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  tab === 'login' ? 'bg-white text-[#0B749C] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => {
                  setTab('signup');
                  setError(null);
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  tab === 'signup' ? 'bg-white text-[#0B749C] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2 text-rose-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Reset Sent Notice */}
          {resetSent && (
            <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs leading-relaxed">
              <p className="font-bold">Password Reset Simulated!</p>
              <p className="mt-1">
                Your password for <strong>{email}</strong> has been updated to <code>password123</code>. You can now log in.
              </p>
              <button
                type="button"
                onClick={() => {
                  setTab('login');
                  setResetSent(false);
                }}
                className="mt-2 font-bold text-[#0B749C] underline"
              >
                Return to login
              </button>
            </div>
          )}

          {/* Form */}
          {!resetSent && (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {tab === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-600 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:border-[#0B749C] focus:ring-2 focus:ring-[#0B749C]/20 outline-hidden"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-600 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:border-[#0B749C] focus:ring-2 focus:ring-[#0B749C]/20 outline-hidden"
                    required
                  />
                </div>
              </div>

              {tab !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">Password</label>
                    {tab === 'login' && (
                      <button
                        type="button"
                        onClick={() => {
                          setTab('forgot');
                          setError(null);
                        }}
                        className="text-[11px] text-[#0B749C] hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-600 absolute left-3 top-3" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:border-[#0B749C] focus:ring-2 focus:ring-[#0B749C]/20 outline-hidden"
                      required
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0B749C] hover:bg-[#085a79] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                <span>
                  {loading
                    ? 'Processing...'
                    : tab === 'login'
                    ? 'Sign In'
                    : tab === 'signup'
                    ? 'Create Account'
                    : 'Send Password Reset'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Demo Mode Notice */}
          {tab === 'login' && !resetSent && (
            <div className="mt-4 pt-3.5 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-600">
                Already using Demo Mode? Sign in to save your progress across devices.
              </p>
            </div>
          )}

          {tab === 'forgot' && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => {
                  setTab('login');
                  setError(null);
                  setResetSent(false);
                }}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                ← Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
