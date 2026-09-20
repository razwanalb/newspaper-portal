import React from 'react';
import { 
  LayoutDashboard, 
  Plus, 
  ShieldCheck, 
  Shield, 
  UserCheck, 
  LogOut, 
  Settings,
  Flame
} from 'lucide-react';
import { UserAccount } from '../types';

interface AdminBarProps {
  currentUser: UserAccount;
  onOpenDashboard: () => void;
  onNewArticle: () => void;
  onOpenRoleSwitcher: () => void;
  onLogout: () => void;
}

export const AdminBar: React.FC<AdminBarProps> = ({
  currentUser,
  onOpenDashboard,
  onNewArticle,
  onOpenRoleSwitcher,
  onLogout
}) => {
  const isSuperAdmin = currentUser.role === 'super_admin';

  return (
    <div className="w-full bg-[#1d2327] text-[#c3c4c7] text-[12px] px-4 py-1.5 flex items-center justify-between z-50 border-b border-[#2c3338] shadow-sm select-none">
      
      {/* Left side items */}
      <div className="flex items-center gap-4">
        {/* WP / CMS Admin Link */}
        <button
          onClick={onOpenDashboard}
          className="flex items-center gap-1.5 text-white hover:text-[#72aee6] font-semibold transition-colors cursor-pointer"
        >
          <LayoutDashboard className="w-3.5 h-3.5 text-[#72aee6]" />
          <span>Dashboard</span>
        </button>

        {/* Quick New Story */}
        <button
          onClick={onNewArticle}
          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-emerald-400" />
          <span>New Story</span>
        </button>

        {/* Super Admin indicator */}
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-neutral-400">
          <span>Role:</span>
          <span className={`font-bold uppercase text-[10px] px-1.5 py-0.2 rounded ${
            isSuperAdmin ? 'bg-red-900/80 text-red-200' : 'bg-emerald-900/80 text-emerald-200'
          }`}>
            {isSuperAdmin ? 'Super Admin' : 'News Moderator'}
          </span>
        </span>
      </div>

      {/* Right side user & actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenRoleSwitcher}
          className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          title="Switch Active Persona"
        >
          <img
            src={currentUser.avatar}
            alt=""
            className="w-4 h-4 rounded-full object-cover"
          />
          <span className="hidden md:inline font-medium text-white">{currentUser.name}</span>
          <span className="text-[11px] text-amber-400 underline decoration-dotted ml-1">Switch Role</span>
        </button>

        <button
          onClick={onLogout}
          className="hover:text-red-400 transition-colors p-1"
          title="Sign Out / Reader Mode"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
