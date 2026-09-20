import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Users, 
  Settings, 
  Globe, 
  Plus, 
  Menu, 
  X, 
  LogOut, 
  ShieldCheck, 
  Shield, 
  Lock, 
  Sun, 
  Moon, 
  ChevronDown,
  UserCheck
} from 'lucide-react';
import { UserAccount, UserRole } from '../../types';

interface AdminLayoutProps {
  currentUser: UserAccount;
  onSwitchUser: (user: UserAccount) => void;
  allUsers: UserAccount[];
  activeTab: 'overview' | 'news' | 'users' | 'settings' | 'comments';
  onSelectTab: (tab: 'overview' | 'news' | 'users' | 'settings' | 'comments') => void;
  onExitToSite: () => void;
  onNewArticle: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentUser,
  onSwitchUser,
  allUsers,
  activeTab,
  onSelectTab,
  onExitToSite,
  onNewArticle,
  darkMode,
  onToggleDarkMode,
  children
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const isSuperAdmin = currentUser.role === 'super_admin';

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, superAdminOnly: false },
    { id: 'news', label: 'Stories & Articles', icon: FileText, superAdminOnly: false },
    { id: 'comments', label: 'Comments Moderation', icon: MessageSquare, superAdminOnly: false },
    { id: 'users', label: 'Staff & Roles', icon: Users, superAdminOnly: true },
    { id: 'settings', label: 'System Settings', icon: Settings, superAdminOnly: true },
  ] as const;

  return (
    <div className="min-h-screen flex bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      
      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      {/* Admin Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-neutral-900 text-neutral-200 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* Masthead in Admin */}
          <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-masthead text-xl font-bold text-white tracking-wider">
                  The Soledad Times
                </span>
              </div>
              <p className="text-[10px] font-mono text-neutral-400 mt-0.5 uppercase tracking-widest">
                Editorial CMS Portal
              </p>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 text-neutral-400 hover:text-white md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current User Quick Role Box */}
          <div className="p-4 mx-3 my-3 bg-neutral-800/80 rounded-xl border border-neutral-700/60">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-red-500 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">
                  {currentUser.name}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className={`text-[10px] font-black uppercase px-1.5 py-0.2 rounded flex items-center gap-1 ${
                    isSuperAdmin ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    {isSuperAdmin ? <ShieldCheck className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                    {isSuperAdmin ? 'Super Admin' : 'News Moderator'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Switch Button */}
            <div className="relative mt-3 pt-2.5 border-t border-neutral-700/60">
              <button
                type="button"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="w-full flex items-center justify-between text-[11px] font-semibold text-neutral-300 hover:text-white px-2 py-1 rounded bg-neutral-900/60 hover:bg-neutral-900 transition-colors"
              >
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-amber-400" />
                  Switch Active Role
                </span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {/* Role Dropdown */}
              {isRoleDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl p-1 z-50">
                  <p className="text-[10px] text-neutral-400 px-2 py-1 font-semibold uppercase">
                    Test As Role:
                  </p>
                  {allUsers.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => {
                        onSwitchUser(u);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded text-xs flex items-center justify-between hover:bg-neutral-700 transition-colors ${
                        u.id === currentUser.id ? 'bg-neutral-700 text-white font-bold' : 'text-neutral-300'
                      }`}
                    >
                      <div className="truncate">
                        <div>{u.name}</div>
                        <div className="text-[10px] text-neutral-400">
                          {u.role === 'super_admin' ? 'Super Admin (Full)' : 'Moderator (News Only)'}
                        </div>
                      </div>
                      {u.id === currentUser.id && (
                        <span className="text-[10px] text-emerald-400 font-bold">Active</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Nav Items */}
          <nav className="px-3 space-y-1 mt-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isLocked = item.superAdminOnly && !isSuperAdmin;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white font-bold'
                      : isLocked
                      ? 'text-neutral-500 hover:text-neutral-400 hover:bg-neutral-800/40'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>

                  {isLocked && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-neutral-400 bg-neutral-800 px-1.5 py-0.5 rounded">
                      <Lock className="w-3 h-3" />
                      Admin
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-neutral-800 space-y-2">
          <button
            onClick={onExitToSite}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition-colors cursor-pointer"
          >
            <Globe className="w-4 h-4 text-neutral-400" />
            <span>Return to Public Newspaper</span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 text-neutral-600 dark:text-neutral-300 md:hidden rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-500">
              <span>CMS</span>
              <span>/</span>
              <span className="capitalize font-bold text-neutral-900 dark:text-white">
                {activeTab}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            
            {/* Dark Mode */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Compose Article */}
            <button
              onClick={onNewArticle}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Story</span>
            </button>

            {/* Public View link */}
            <button
              onClick={onExitToSite}
              className="flex items-center gap-1 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-red-600 px-2 py-1 rounded transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Site</span>
            </button>
          </div>
        </header>

        {/* Dynamic Children Panel */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

      </div>

    </div>
  );
};
