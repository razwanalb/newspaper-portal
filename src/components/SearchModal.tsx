import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, Calendar, ArrowRight, Tag } from 'lucide-react';
import { Article } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const popularKeywords = ['Vaccine', 'Climate', 'Football', 'Wall Street', 'California', 'Education', 'Movies'];

  const searchResults = useMemo(() => {
    let list = articles;
    if (selectedTag) {
      list = list.filter(a => 
        a.category.toLowerCase() === selectedTag.toLowerCase() ||
        a.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase())
      );
    }
    if (!query.trim()) {
      return selectedTag ? list : [];
    }
    const q = query.toLowerCase().trim();
    return list.filter(a => 
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [articles, query, selectedTag]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-150">
      <div 
        className="w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-sm shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Search Header Input */}
        <div className="p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
          <Search className="w-6 h-6 text-red-600 dark:text-red-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type search terms to find news, stories & opinions..."
            className="w-full text-lg sm:text-xl font-serif-headline bg-transparent border-none text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-full transition-colors ml-2"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-6 py-3 bg-neutral-50 dark:bg-neutral-800/40 border-b border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-neutral-500 dark:text-neutral-400 font-semibold uppercase tracking-wider text-[10px]">
            Popular:
          </span>
          {popularKeywords.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setQuery(tag);
                setSelectedTag(null);
              }}
              className="px-2.5 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-red-600 hover:text-red-600 rounded-xs transition-colors"
            >
              {tag}
            </button>
          ))}
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="px-2 py-0.5 text-xs text-red-600 font-bold hover:underline ml-auto"
            >
              Clear tag filter
            </button>
          )}
        </div>

        {/* Results Area */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="space-y-4">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                Found {searchResults.length} Match{searchResults.length > 1 ? 'es' : ''}
              </span>
              {searchResults.map((article) => (
                <div
                  key={'search-' + article.id}
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                  className="group cursor-pointer flex gap-4 p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 rounded transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
                >
                  <div className="relative w-24 h-18 shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-xs">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-red-600 dark:text-red-500 uppercase tracking-wider">
                      {article.category}
                    </span>
                    <h4 className="font-serif-headline text-base font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 transition-colors line-clamp-1">
                      {article.title}
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                      {article.excerpt}
                    </p>
                    <div className="text-[11px] text-neutral-400 mt-1">
                      {article.date} • {article.readTime}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-red-600 self-center shrink-0 transition-colors" />
                </div>
              ))}
            </div>
          ) : query ? (
            <div className="py-12 text-center text-neutral-500">
              <p className="text-base font-serif-headline">No dispatches found matching "{query}"</p>
              <p className="text-xs text-neutral-400 mt-1">Try another keyword or browse our main category sections.</p>
            </div>
          ) : (
            <div className="py-8 text-center text-neutral-400">
              <p className="text-sm">Start typing above or click any trending keyword to browse articles.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
