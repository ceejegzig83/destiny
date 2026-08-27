import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Phone
} from 'lucide-react';
import { PortalConfig } from '../types';

interface AdminLoginGateProps {
  portalConfig: PortalConfig;
  onLoginSuccess: () => void;
  onBackToStore: () => void;
}

export const AdminLoginGate: React.FC<AdminLoginGateProps> = ({
  portalConfig,
  onLoginSuccess,
  onBackToStore
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    // Accepted authorized email (user explicitly provided ceejegzig83@gamil.com, and also support standard @gmail.com)
    const isEmailValid =
      cleanEmail === 'ceejegzig83@gamil.com' ||
      cleanEmail === 'ceejegzig83@gmail.com';

    // Accepted authorized password
    const isPasswordValid = cleanPass === 'Destiny';

    setTimeout(() => {
      setIsSubmitting(false);

      if (isEmailValid && isPasswordValid) {
        onLoginSuccess();
      } else {
        if (!isEmailValid && !isPasswordValid) {
          setErrorMessage('Invalid username/email and password. Access restricted to authorized portal administrators.');
        } else if (!isEmailValid) {
          setErrorMessage('Unrecognized administrator email address. Please use your authorized credentials.');
        } else {
          setErrorMessage('Incorrect password. Please verify and try again.');
        }
      }
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 bg-stone-950 text-stone-100 font-sans" id="admin-login-screen">
      <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Back link */}
        <button
          onClick={onBackToStore}
          className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-400 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Storefront</span>
        </button>

        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 text-stone-950 font-black text-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
            FD
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-stone-100 font-display">
            Master Admin Portal
          </h1>
          <p className="text-xs text-stone-400">
            {portalConfig.portalName} • Central Operations CMS
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-semibold">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Restricted Administrator Gate</span>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-2xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-start gap-2.5 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Username / Email</span>
            </label>
            <div className="relative">
              <input
                id="admin-email-input"
                type="email"
                required
                autoComplete="off"
                placeholder="Enter administrator email..."
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Password</span>
            </label>
            <div className="relative">
              <input
                id="admin-password-input"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                className="w-full bg-stone-850 border border-stone-700 rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            id="admin-login-submit-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold rounded-xl text-xs sm:text-sm shadow-lg shadow-amber-600/30 transition flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            <Lock className="w-4 h-4" />
            <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Admin Dashboard'}</span>
          </button>
        </form>

        {/* Security Notice */}
        <div className="pt-3 border-t border-stone-800 text-center space-y-1.5 text-[11px] text-stone-500">
          <p>This administrative portal is restricted to the platform owner.</p>
          <div className="flex items-center justify-center gap-1 text-stone-400">
            <Phone className="w-3 h-3 text-amber-400" />
            <span>Support: {portalConfig.hotline}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
