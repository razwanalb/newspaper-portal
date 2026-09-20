import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle, 
  Clock, 
  Archive, 
  Tag, 
  Calendar,
  Sparkles,
  ExternalLink,
  Flame
} from 'lucide-react';
import { Article, CategoryType, ArticleStatus, UserAccount } from '../../types';

interface NewsManagerProps {
  articles: Article[];
  currentUser: UserAccount;
  onEditArticle: (article: Article) => void;
  onDeleteArticle: (id: string) => void;
  onToggleStatus: (id: string, newStatus: ArticleStatus) => void;
  onNewArticle: () => void;
  onViewLiveArticle: (article: Article) => void;
}

export const NewsManager: React.FC<NewsManagerProps> = ({
  articles,
  currentUser,
  onEditArticle,
  onDeleteArticle,
  onToggleStatus,
  onNewArticle,
  onViewLiveArticle
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const isSuperAdmin = currentUser.role === 'super_admin';

  // Filter articles
  const filteredArticles = articles.filter(art => {
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (art.excerpt && art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;

    const currentStatus = art.status || 'published';
    const matchesStatus = statusFilter === 'All' || currentStatus === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['All', 'News', 'Politics', 'Business', 'Education', 'Entertainment', 'Environment', 'Sports', 'Technology', 'World News'];

  return (
    <div className="space-y-6">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-neutral-900 dark:text-neutral-100">
            Editorial Newsroom & Article Manager
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Manage, compose, update, and publish stories across all news desks.
            {isSuperAdmin ? (
              <span className="ml-1 text-red-600 dark:text-red-400 font-semibold">(Full Super Admin Privileges)</span>
            ) : (
              <span className="ml-1 text-emerald-600 dark:text-emerald-400 font-semibold">(Moderator: Publishing & Editing Scope)</span>
            )}
          </p>
        </div>

        <button
          onClick={onNewArticle}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-sm transition-colors text-sm shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Compose New Story</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4">
        
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3 text-xs sm:text-sm font-semibold">
          {[
            { label: 'All Stories', value: 'All', count: articles.length },
            { label: 'Published (Live)', value: 'published', count: articles.filter(a => (a.status || 'published') === 'published').length },
            { label: 'Drafts', value: 'draft', count: articles.filter(a => a.status === 'draft').length },
            { label: 'Needs Review', value: 'review', count: articles.filter(a => a.status === 'review').length }
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                statusFilter === tab.value
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-xs px-1.5 py-0.2 rounded-full bg-black/10 dark:bg-white/10">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search and Category Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, excerpt, or reporter name..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-neutral-400 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat} Section</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 text-[11px] font-black uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                <th className="py-3.5 px-4">Story Details</th>
                <th className="py-3.5 px-4">Section / Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Reporter</th>
                <th className="py-3.5 px-4 text-center">Reads</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-sm">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-500">
                    No articles found matching the current search and filters.
                  </td>
                </tr>
              ) : (
                filteredArticles.map((art) => {
                  const currentStatus = art.status || 'published';
                  return (
                    <tr key={art.id} className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-colors">
                      
                      {/* Story Details */}
                      <td className="py-3.5 px-4 max-w-md">
                        <div className="flex gap-3">
                          <img
                            src={art.imageUrl}
                            alt=""
                            className="w-16 h-12 object-cover rounded-md shrink-0 bg-neutral-100"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=120&auto=format&fit=crop&q=80';
                            }}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              {art.featured && (
                                <span className="px-1.5 py-0.2 bg-red-600 text-white text-[9px] font-black uppercase rounded">
                                  Hero Feature
                                </span>
                              )}
                              {art.trending && (
                                <span className="flex items-center gap-0.5 text-amber-500 text-[10px] font-bold">
                                  <Flame className="w-3 h-3 fill-amber-500" /> Hot
                                </span>
                              )}
                            </div>
                            <p className="font-serif font-bold text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-snug">
                              {art.title}
                            </p>
                            <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                              {art.excerpt}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                          {art.category}
                        </span>
                        {art.subcategory && (
                          <span className="block text-[11px] text-neutral-400 mt-0.5">
                            {art.subcategory}
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            currentStatus === 'published' 
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                              : currentStatus === 'draft'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300'
                          }`}>
                            {currentStatus === 'published' && <CheckCircle className="w-3 h-3" />}
                            {currentStatus === 'draft' && <Clock className="w-3 h-3" />}
                            {currentStatus === 'review' && <Sparkles className="w-3 h-3" />}
                            <span className="capitalize">{currentStatus}</span>
                          </span>
                        </div>
                      </td>

                      {/* Author */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-xs text-neutral-600 dark:text-neutral-400">
                        <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                          {art.author}
                        </div>
                        <div className="text-[11px] text-neutral-400">{art.date}</div>
                      </td>

                      {/* Reads */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        {art.views.toLocaleString()}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          
                          {/* Preview Live */}
                          <button
                            onClick={() => onViewLiveArticle(art)}
                            className="p-1.5 rounded text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            title="Read Full Live Story"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>

                          {/* Quick Publish / Unpublish Toggle */}
                          <button
                            onClick={() => onToggleStatus(art.id, currentStatus === 'published' ? 'draft' : 'published')}
                            className="p-1.5 rounded text-neutral-500 hover:text-emerald-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            title={currentStatus === 'published' ? 'Switch to Draft' : 'Publish to Front Page'}
                          >
                            <CheckCircle className={`w-4 h-4 ${currentStatus === 'published' ? 'text-emerald-600' : 'text-neutral-400'}`} />
                          </button>

                          {/* Edit Article */}
                          <button
                            onClick={() => onEditArticle(art)}
                            className="p-1.5 rounded text-neutral-600 dark:text-neutral-300 hover:text-red-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                            title="Edit Story Content"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* Delete Article (Super admin full, or confirmation) */}
                          <button
                            onClick={() => setConfirmDeleteId(art.id)}
                            className="p-1.5 rounded text-neutral-400 hover:text-red-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                            title="Delete Story"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-xl max-w-md w-full p-6 border border-neutral-200 dark:border-neutral-800 shadow-2xl">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Confirm Story Deletion
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
              Are you sure you want to delete this story from the newspaper archives? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 text-sm font-semibold rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteArticle(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm"
              >
                Delete Story
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
