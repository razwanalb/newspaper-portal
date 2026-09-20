import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Check, 
  X, 
  Lock, 
  Mail, 
  Calendar, 
  FileText,
  AlertTriangle
} from 'lucide-react';
import { UserAccount, UserRole } from '../../types';

interface UserManagerProps {
  users: UserAccount[];
  currentUser: UserAccount;
  onAddUser: (user: UserAccount) => void;
  onUpdateUserRole: (id: string, newRole: UserRole) => void;
  onToggleUserStatus: (id: string) => void;
  onDeleteUser: (id: string) => void;
}

export const UserManager: React.FC<UserManagerProps> = ({
  users,
  currentUser,
  onAddUser,
  onUpdateUserRole,
  onToggleUserStatus,
  onDeleteUser
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('moderator');
  const [title, setTitle] = useState('');

  const isSuperAdmin = currentUser.role === 'super_admin';

  if (!isSuperAdmin) {
    return (
      <div className="bg-white dark:bg-neutral-900 rounded-xl p-8 border border-neutral-200 dark:border-neutral-800 text-center max-w-2xl mx-auto my-12">
        <div className="w-14 h-14 bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold font-serif text-neutral-900 dark:text-neutral-100">
          Super Admin Authorization Required
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
          As a <span className="font-bold text-neutral-900 dark:text-white">News Moderator</span>, your workspace is strictly focused on creating, composing, and publishing stories. Staff account management, role assignment, and editorial system policies are exclusively reserved for the <span className="font-bold text-red-600 dark:text-red-400">Super Admin</span>.
        </p>
        <div className="mt-6 p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs text-neutral-500">
          To test Super Admin capabilities, use the quick role switcher in the top navigation bar to switch to Victoria Vance.
        </div>
      </div>
    );
  }

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const newUser: UserAccount = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      role,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      title: title.trim() || (role === 'super_admin' ? 'Super Administrator' : 'News Desk Moderator'),
      joinedDate: 'Just now',
      articlesCount: 0,
      status: 'active'
    };

    onAddUser(newUser);
    setName('');
    setEmail('');
    setTitle('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-neutral-900 dark:text-neutral-100">
              Newsroom Staff & Role Permissions
            </h1>
            <span className="px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 text-[10px] font-black uppercase rounded tracking-wider">
              Super Admin Control
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Authorize new moderators, promote editors to Super Admin, or modify operational credentials.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-sm transition-colors text-sm shrink-0 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Moderator / Admin</span>
        </button>
      </div>

      {/* Roles Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-bold text-sm mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Super Administrator Scope</span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-300">
            Unrestricted master privileges: publishing, site layout toggles, banner ads, breaking news ticker, comment audit, and team account provisioning.
          </p>
        </div>

        <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-xl">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm mb-1">
            <Shield className="w-4 h-4" />
            <span>News Moderator Scope</span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-300">
            Focused news desk responsibilities: composing stories, updating copy, publishing articles, saving drafts, and tagging categories.
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 text-[11px] font-black uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                <th className="py-3.5 px-4">Staff Member</th>
                <th className="py-3.5 px-4">Role & Access Tier</th>
                <th className="py-3.5 px-4">Editorial Desk</th>
                <th className="py-3.5 px-4 text-center">Stories Published</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-sm">
              {users.map((user) => {
                const isCurrentAccount = user.id === currentUser.id;
                return (
                  <tr key={user.id} className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40 transition-colors">
                    
                    {/* User Info */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                        />
                        <div>
                          <div className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                            <span>{user.name}</span>
                            {isCurrentAccount && (
                              <span className="text-[10px] bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 px-1.5 py-0.2 rounded font-semibold">
                                You
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-neutral-400 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        user.role === 'super_admin'
                          ? 'bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                      }`}>
                        {user.role === 'super_admin' ? (
                          <>
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Super Admin
                          </>
                        ) : (
                          <>
                            <Shield className="w-3.5 h-3.5" />
                            News Moderator
                          </>
                        )}
                      </span>
                    </td>

                    {/* Desk Title */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs text-neutral-600 dark:text-neutral-300 font-medium">
                      {user.title}
                    </td>

                    {/* Published Stories */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap text-xs font-bold text-neutral-800 dark:text-neutral-200">
                      {user.articlesCount} stories
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${
                        user.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                          : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400'
                      }`}>
                        {user.status === 'active' ? 'Active' : 'Suspended'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      {!isCurrentAccount && (
                        <div className="flex items-center justify-end gap-2">
                          
                          {/* Role Toggle */}
                          <button
                            onClick={() => onUpdateUserRole(user.id, user.role === 'super_admin' ? 'moderator' : 'super_admin')}
                            className="text-xs font-semibold px-2.5 py-1 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            title="Toggle between Super Admin and Moderator"
                          >
                            {user.role === 'super_admin' ? 'Demote to Moderator' : 'Promote to Super Admin'}
                          </button>

                          {/* Suspend / Activate */}
                          <button
                            onClick={() => onToggleUserStatus(user.id)}
                            className="text-xs px-2 py-1 rounded text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                          >
                            {user.status === 'active' ? 'Suspend' : 'Activate'}
                          </button>
                        </div>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-xl max-w-lg w-full p-6 border border-neutral-200 dark:border-neutral-800 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-lg font-bold font-serif text-neutral-900 dark:text-neutral-100">
                Register Newsroom Staff Account
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Jonathan Sterling"
                  className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">
                  Staff Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g., j.sterling@soledadtimes.com"
                  className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">
                  Desk Title / Beat
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Senior Politics Desk Moderator"
                  className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">
                  Access Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm outline-none font-semibold"
                >
                  <option value="moderator">News Moderator (Upload, Publish & Edit stories only)</option>
                  <option value="super_admin">Super Administrator (Full Master Control)</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
