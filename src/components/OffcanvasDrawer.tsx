import React from 'react';
import { X, Facebook, Twitter, Youtube, Mail, Rss, MapPin, Phone, ShieldCheck, Newspaper, Sun, Moon, LayoutDashboard, Shield } from 'lucide-react';
import { CategoryType, Article, UserAccount } from '../types';

interface OffcanvasDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (cat: CategoryType | null) => void;
  onOpenContact: () => void;
  onSelectArticle: (article: Article) => void;
  recentArticles: Article[];
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  currentUser?: UserAccount | null;
  onOpenAdmin?: () => void;
  onOpenLogin?: () => void;
}

export const OffcanvasDrawer: React.FC<OffcanvasDrawerProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onOpenContact,
  onSelectArticle,
  recentArticles,
  darkMode,
  onToggleDarkMode,
  currentUser,
  onOpenAdmin,
  onOpenLogin
}) => {
  if (!isOpen) return null;

  const categories: CategoryType[] = [
    'News',
    'Politics',
    'Business',
    'Education',
    'Entertainment',
    'Environment',
    'Sports',
    'Technology',
    'World News'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 max-w-xs sm:max-w-sm w-full bg-white dark:bg-neutral-900 shadow-2xl p-6 overflow-y-auto flex flex-col justify-between z-10 transition-transform">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="font-masthead text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              The Soledad Times
            </h2>
            <div className="flex items-center gap-1.5">
              {onToggleDarkMode && (
                <button
                  id="drawer-theme-toggle-btn"
                  onClick={onToggleDarkMode}
                  className="p-1.5 text-neutral-600 dark:text-neutral-300 hover:text-red-600 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-neutral-500 hover:text-red-600 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Only show CMS Admin shortcut if staff member is already logged in */}
          {currentUser && (
            <div className="pt-4 pb-2">
              <button
                onClick={() => {
                  if (onOpenAdmin) onOpenAdmin();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-900 dark:bg-neutral-800 text-white hover:bg-red-600 dark:hover:bg-red-600 transition-colors shadow-xs cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 bg-red-600 text-white rounded-lg">
                    <LayoutDashboard className="w-4 h-4" />
                  </span>
                  <div className="text-left">
                    <div className="text-xs font-bold leading-tight">
                      {currentUser.role === 'super_admin' ? 'Super Admin CMS' : 'News Moderator CMS'}
                    </div>
                    <div className="text-[10px] text-neutral-400 leading-tight">
                      Logged in: {currentUser.name}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-red-400 group-hover:text-white">Enter →</span>
              </button>
            </div>
          )}

          {/* Quick Categories Navigation */}
          <div className="py-5">
            <h3 className="text-xs font-black tracking-widest text-neutral-400 dark:text-neutral-500 uppercase mb-3">
              Categories
            </h3>
            <ul className="space-y-2 text-base font-semibold">
              <li>
                <button
                  onClick={() => { onSelectCategory(null); onClose(); }}
                  className="w-full text-left py-1 text-neutral-900 dark:text-neutral-200 hover:text-red-600 transition-colors"
                >
                  Front Page / Home
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => { onSelectCategory(cat); onClose(); }}
                    className="w-full text-left py-1 text-neutral-700 dark:text-neutral-300 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center justify-between"
                  >
                    <span>{cat}</span>
                    <span className="text-xs text-neutral-400 font-normal">Explore →</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => { onOpenContact(); onClose(); }}
                  className="w-full text-left py-1 text-red-600 dark:text-red-400 font-bold hover:underline"
                >
                  Contact Us & Editorial Office
                </button>
              </li>
            </ul>
          </div>

          {/* Recent Stories */}
          <div className="py-4 border-t border-neutral-200 dark:border-neutral-800">
            <h3 className="text-xs font-black tracking-widest text-neutral-400 dark:text-neutral-500 uppercase mb-3">
              Trending Stories
            </h3>
            <div className="space-y-3">
              {recentArticles.slice(0, 3).map((art) => (
                <button
                  key={art.id}
                  onClick={() => { onSelectArticle(art); onClose(); }}
                  className="group flex gap-3 text-left w-full hover:bg-neutral-50 dark:hover:bg-neutral-800/50 p-1.5 rounded transition-colors"
                >
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover rounded shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 line-clamp-2 leading-snug">
                      {art.title}
                    </p>
                    <span className="text-[11px] text-neutral-400">{art.date}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info in drawer */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-4 mb-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-neutral-900 dark:hover:text-white">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-neutral-900 dark:hover:text-white">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-neutral-900 dark:hover:text-white">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="mailto:contact@soledadtimes.com" className="hover:text-neutral-900 dark:hover:text-white">
              <Mail className="w-4 h-4" />
            </a>
          </div>
          <p>© 2026 The Soledad Times. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
