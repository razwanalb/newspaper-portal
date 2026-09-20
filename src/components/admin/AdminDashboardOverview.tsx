import React from 'react';
import { 
  FileText, 
  Eye, 
  Users, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Plus, 
  TrendingUp, 
  ShieldCheck, 
  Shield, 
  Edit3, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { Article, UserAccount, AnalyticsData } from '../../types';

interface AdminDashboardOverviewProps {
  articles: Article[];
  currentUser: UserAccount;
  analytics: AnalyticsData;
  onNavigateTab: (tab: 'news' | 'users' | 'settings' | 'comments') => void;
  onNewArticle: () => void;
  onEditArticle: (article: Article) => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  articles,
  currentUser,
  analytics,
  onNavigateTab,
  onNewArticle,
  onEditArticle
}) => {
  const isSuperAdmin = currentUser.role === 'super_admin';

  const publishedCount = articles.filter(a => (a.status || 'published') === 'published').length;
  const draftCount = articles.filter(a => a.status === 'draft').length;
  const reviewCount = articles.filter(a => a.status === 'review').length;
  const totalViews = articles.reduce((acc, a) => acc + (a.views || 0), 0);
  const totalComments = articles.reduce((acc, a) => acc + (a.commentCount || 0), 0);

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-xl p-6 sm:p-8 shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 ${
                isSuperAdmin ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'
              }`}>
                {isSuperAdmin ? <ShieldCheck className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
                {isSuperAdmin ? 'Super Administrator Panel' : 'News Moderator Panel'}
              </span>
              <span className="text-xs text-neutral-400">The Soledad Times CMS</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-serif">
              Welcome back, {currentUser.name}
            </h1>
            <p className="text-sm text-neutral-300 mt-1 max-w-xl">
              {isSuperAdmin ? (
                'You have master authority over all news reporting, editorial desks, system settings, staff credentials, and monetization.'
              ) : (
                'You are currently authorized for the News Desk. Upload new reports, edit draft stories, and publish breaking dispatches directly to the front page.'
              )}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onNewArticle}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-sm transition-colors text-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Compose Story</span>
            </button>
            <button
              onClick={() => onNavigateTab('news')}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors text-sm cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>All Articles</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Articles */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Articles</span>
            <FileText className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-neutral-900 dark:text-white">
            {articles.length}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">{publishedCount} live</span>
            <span>•</span>
            <span>{draftCount} drafts</span>
          </div>
        </div>

        {/* Total Article Reads */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Readers</span>
            <Eye className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-neutral-900 dark:text-white">
            {totalViews.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% this week</span>
          </div>
        </div>

        {/* Editorial Reviews */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">In Review / Queue</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-neutral-900 dark:text-white">
            {reviewCount}
          </div>
          <div className="text-xs text-neutral-400 mt-2">
            Awaiting editorial sign-off
          </div>
        </div>

        {/* Reader Comments */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Comments</span>
            <MessageSquare className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-serif text-neutral-900 dark:text-white">
            {totalComments}
          </div>
          <div className="text-xs text-neutral-400 mt-2">
            Across published reports
          </div>
        </div>

      </div>

      {/* Role Quick Reference Box */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
        <h2 className="text-base font-bold font-serif text-neutral-900 dark:text-neutral-100 mb-3">
          Your Access Permissions & Privileges
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
            <div className="font-bold text-neutral-800 dark:text-neutral-200 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Story Creation & Publishing</span>
            </div>
            <p className="text-neutral-500">
              Compose breaking news, upload cover photography, assign categories, and publish instantly.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
            <div className="font-bold text-neutral-800 dark:text-neutral-200 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Editing & Revisions</span>
            </div>
            <p className="text-neutral-500">
              Update headline copy, revise lead paragraphs, update tags, and toggle draft/published status.
            </p>
          </div>

          <div className={`p-3.5 rounded-lg border ${
            isSuperAdmin 
              ? 'bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800'
              : 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40'
          }`}>
            <div className="font-bold text-neutral-800 dark:text-neutral-200 mb-1 flex items-center gap-1.5">
              {isSuperAdmin ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Site & Team Administration</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span className="text-amber-800 dark:text-amber-300">Super Admin Only Scope</span>
                </>
              )}
            </div>
            <p className="text-neutral-500">
              {isSuperAdmin 
                ? 'Full access to add moderators, change roles, edit ticker broadcast, and toggle banner ads.'
                : 'Moderators cannot modify team roles, ads, or site settings.'}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Stories Stream */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold font-serif text-neutral-900 dark:text-neutral-100">
            Recent Editorial Dispatches
          </h2>
          <button
            onClick={() => onNavigateTab('news')}
            className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
          >
            <span>View All Stories</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {articles.slice(0, 5).map((art) => (
            <div key={art.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={art.imageUrl}
                  alt=""
                  className="w-12 h-10 object-cover rounded shrink-0 bg-neutral-100"
                />
                <div className="min-w-0">
                  <p className="font-serif font-bold text-sm text-neutral-900 dark:text-neutral-100 truncate">
                    {art.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                    <span className="font-semibold text-neutral-700 dark:text-neutral-300">{art.category}</span>
                    <span>•</span>
                    <span>By {art.author}</span>
                    <span>•</span>
                    <span className="capitalize">{art.status || 'published'}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onEditArticle(art)}
                className="p-1.5 text-neutral-500 hover:text-red-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors shrink-0"
                title="Edit Story"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
