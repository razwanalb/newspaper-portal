import React from 'react';
import { X, BookmarkCheck, Trash2, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface SavedArticlesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
}

export const SavedArticlesModal: React.FC<SavedArticlesModalProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveBookmark
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="w-full max-w-xl bg-white dark:bg-neutral-900 rounded shadow-2xl border border-neutral-200 dark:border-neutral-800 p-6"
        role="dialog"
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-6">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-red-600" />
            <h2 className="font-serif-headline text-xl font-bold text-neutral-900 dark:text-neutral-100">
              Saved Reading List ({savedArticles.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-red-600 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {savedArticles.length > 0 ? (
            savedArticles.map((article) => (
              <div
                key={'saved-' + article.id}
                className="group flex gap-3.5 p-3 rounded bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 items-center justify-between"
              >
                <div 
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                  className="flex gap-3 cursor-pointer flex-1 min-w-0"
                >
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-14 object-cover rounded shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-red-600 uppercase">
                      {article.category}
                    </span>
                    <h4 className="font-serif-headline text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 transition-colors line-clamp-1">
                      {article.title}
                    </h4>
                    <span className="text-[10px] text-neutral-400">{article.date}</span>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveBookmark(article.id)}
                  className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-neutral-500">
              <p className="text-sm">No articles saved yet.</p>
              <p className="text-xs text-neutral-400 mt-1">
                Click the bookmark icon on any article to save it for offline reading.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
