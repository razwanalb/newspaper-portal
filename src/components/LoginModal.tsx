import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Shield, 
  User, 
  Lock, 
  ArrowRight, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { UserAccount } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  allUsers: UserAccount[];
  onSelectUser: (user: UserAccount | null) => void;
  onOpenDashboard: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  allUsers,
  onSelectUser,
  onOpenDashboard
}) => {
  const [activeTab, setActiveTab] = useState<'quick' | 'credentials'>('quick');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      onSelectUser(found);
      onClose();
      onOpenDashboard();
    } else {
      // Default to moderator if unknown email
      const newMod: UserAccount = {
        id: 'usr_' + Date.now(),
        name: email.split('@')[0] || 'Staff Member',
        email,
        role: 'moderator',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        title: 'News Desk Reporter',
        joinedDate: 'Just now',
        articlesCount: 0,
        status: 'active'
      };
      onSelectUser(newMod);
      onClose();
      onOpenDashboard();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl max-w-lg w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-red-600 text-white rounded-lg">
                <Lock className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-bold font-serif text-neutral-900 dark:text-neutral-100">
                Editorial Newsroom Access
              </h2>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Select or log in to your staff editorial panel
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-xs font-bold">
          <button
            onClick={() => setActiveTab('quick')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              activeTab === 'quick'
                ? 'bg-white dark:bg-neutral-900 text-red-600 border-b-2 border-red-600'
                : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
          >
            1-Click Role Switcher
          </button>
          <button
            onClick={() => setActiveTab('credentials')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              activeTab === 'credentials'
                ? 'bg-white dark:bg-neutral-900 text-red-600 border-b-2 border-red-600'
                : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
          >
            Staff Credentials Login
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6">
          {activeTab === 'quick' ? (
            <div className="space-y-4">
              <p className="text-xs text-neutral-500">
                Instantly switch roles to test the Super Admin vs Moderator scopes:
              </p>

              {/* Super Admin Card */}
              {allUsers.filter(u => u.role === 'super_admin').map((u) => (
                <div
                  key={u.id}
                  onClick={() => {
                    onSelectUser(u);
                    onClose();
                    onOpenDashboard();
                  }}
                  className="p-4 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/40 dark:bg-red-950/20 hover:border-red-500 dark:hover:border-red-600 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar}
                        alt=""
                        className="w-12 h-12 rounded-full object-cover border-2 border-red-500"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-neutral-900 dark:text-white text-sm">
                            {u.name}
                          </span>
                          <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.2 rounded-full">
                            Super Admin
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          {u.title}
                        </p>
                        <p className="text-[11px] text-red-700 dark:text-red-300 mt-1 font-medium">
                          Master authority: news, staff roles, ad toggles, ticker, site settings.
                        </p>
                      </div>
                    </div>

                    <ArrowRight className="w-5 h-5 text-red-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}

              {/* Moderator Card */}
              {allUsers.filter(u => u.role === 'moderator').slice(0, 1).map((u) => (
                <div
                  key={u.id}
                  onClick={() => {
                    onSelectUser(u);
                    onClose();
                    onOpenDashboard();
                  }}
                  className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 hover:border-emerald-500 dark:hover:border-emerald-600 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar}
                        alt=""
                        className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-neutral-900 dark:text-white text-sm">
                            {u.name}
                          </span>
                          <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-2 py-0.2 rounded-full">
                            News Moderator
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          {u.title}
                        </p>
                        <p className="text-[11px] text-emerald-700 dark:text-emerald-300 mt-1 font-medium">
                          Focused news desk: compose, publish & edit stories only.
                        </p>
                      </div>
                    </div>

                    <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}

              {/* Public Reader Mode */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    onSelectUser(null);
                    onClose();
                  }}
                  className="w-full py-2.5 px-4 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold transition-colors"
                >
                  Continue Browsing as Public Reader (Sign Out)
                </button>
              </div>

            </div>
          ) : (
            <form onSubmit={handleManualLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400 mb-1">
                  Newsroom Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="superadmin@soledadtimes.com or moderator@soledadtimes.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-sm text-sm transition-colors cursor-pointer"
              >
                Sign In & Launch Workspace
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
