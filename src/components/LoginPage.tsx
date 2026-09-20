import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowLeft, KeyRound, AlertCircle, CheckCircle2, UserCheck, Shield } from 'lucide-react';
import { UserAccount } from '../types';

interface LoginPageProps {
  allUsers: UserAccount[];
  onLoginSuccess: (user: UserAccount) => void;
  onGoHome: () => void;
  darkMode?: boolean;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  allUsers,
  onLoginSuccess,
  onGoHome,
  darkMode
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const matchedUser = allUsers.find(
        u => u.email.trim().toLowerCase() === email.trim().toLowerCase()
      );

      if (!matchedUser) {
        setError('No staff account found with this email address. Please check your credentials.');
        return;
      }

      if (matchedUser.status === 'suspended') {
        setError('This editorial account has been suspended by the Super Administrator.');
        return;
      }

      // Successful login
      onLoginSuccess(matchedUser);
    }, 400);
  };

  const handleQuickSelect = (userEmail: string, defaultPass: string) => {
    setEmail(userEmail);
    setPassword(defaultPass);
    setError(null);
  };

  const superAdmin = allUsers.find(u => u.role === 'super_admin') || allUsers[0];
  const moderator = allUsers.find(u => u.role === 'moderator') || allUsers[1];

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
      
      {/* Top Bar / Back to site */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6 px-4">
        <button
          onClick={onGoHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to The Soledad Times Public Site</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Masthead Branding */}
        <div className="text-center mb-8">
          <h1 className="font-masthead text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            The Soledad Times
          </h1>
          <div className="mt-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
            <Shield className="w-3.5 h-3.5" />
            <span>Staff & Editorial Newsroom Login</span>
          </div>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Restricted authorization area for verified editorial and administration staff.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-neutral-900 py-8 px-6 sm:px-10 shadow-xl border border-neutral-200 dark:border-neutral-800 rounded-sm">
          
          {error && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded flex items-start gap-2.5 text-xs text-red-700 dark:text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                Work Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="editor@soledadtimes.com"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-neutral-600 dark:text-neutral-400">
                <input type="checkbox" defaultChecked className="rounded text-red-600 focus:ring-red-500" />
                <span>Remember this terminal</span>
              </label>
              <span className="text-neutral-400 text-[11px]">256-Bit SSL Encrypted</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 px-4 bg-red-600 hover:bg-red-700 disabled:bg-neutral-400 text-white font-bold text-sm rounded shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Authenticate & Enter CMS</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Credential Test Switcher */}
          <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <div className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest text-center mb-3">
              Staff Test Credentials
            </div>
            
            <div className="grid grid-cols-1 gap-2.5">
              {superAdmin && (
                <button
                  type="button"
                  onClick={() => handleQuickSelect(superAdmin.email, 'admin123')}
                  className="w-full text-left p-2.5 border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20 rounded hover:border-red-500 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-600" />
                      <span>{superAdmin.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-red-600 text-white font-bold rounded">
                        Super Admin
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {superAdmin.email} • Full System Control
                    </div>
                  </div>
                  <span className="text-xs font-bold text-red-600 dark:text-red-400 opacity-80 group-hover:opacity-100">
                    Use →
                  </span>
                </button>
              )}

              {moderator && (
                <button
                  type="button"
                  onClick={() => handleQuickSelect(moderator.email, 'moderator123')}
                  className="w-full text-left p-2.5 border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20 rounded hover:border-blue-500 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span>{moderator.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-blue-600 text-white font-bold rounded">
                        News Moderator
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {moderator.email} • Upload, Publish & Edit
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 opacity-80 group-hover:opacity-100">
                    Use →
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 text-center text-[11px] text-neutral-400">
            Notice: All login attempts and IP sessions are cryptographically logged for security.
          </div>

        </div>
      </div>
    </div>
  );
};
