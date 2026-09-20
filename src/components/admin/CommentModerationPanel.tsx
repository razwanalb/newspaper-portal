import React, { useState } from 'react';
import { 
  MessageSquare, 
  Trash2, 
  Check, 
  Search, 
  ThumbsUp, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { CommentItem, Article, UserAccount } from '../../types';

interface CommentModerationPanelProps {
  commentsMap: Record<string, CommentItem[]>;
  articles: Article[];
  currentUser: UserAccount;
  onDeleteComment: (articleId: string, commentId: string) => void;
  onViewLiveArticle: (article: Article) => void;
}

export const CommentModerationPanel: React.FC<CommentModerationPanelProps> = ({
  commentsMap,
  articles,
  currentUser,
  onDeleteComment,
  onViewLiveArticle
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Flatten comments with article info
  const allComments: { comment: CommentItem; article?: Article }[] = [];
  Object.entries(commentsMap).forEach(([articleId, list]) => {
    const art = articles.find(a => a.id === articleId);
    list.forEach(c => {
      allComments.push({ comment: c, article: art });
    });
  });

  const filteredComments = allComments.filter(({ comment, article }) => {
    const q = searchQuery.toLowerCase();
    return (
      comment.author.toLowerCase().includes(q) ||
      comment.content.toLowerCase().includes(q) ||
      (article && article.title.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif text-neutral-900 dark:text-neutral-100">
            Reader Discussion & Comment Moderation
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Review public comments, safeguard discussion standards, and moderate flagged feedback.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search comments or author..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm outline-none"
          />
        </div>
      </div>

      {/* Comments List */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xs">
        {filteredComments.length === 0 ? (
          <div className="p-12 text-center text-neutral-500 text-sm">
            No reader comments found matching your query.
          </div>
        ) : (
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {filteredComments.map(({ comment, article }) => (
              <div key={comment.id} className="p-5 hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex gap-3.5">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-900 dark:text-white text-sm">
                        {comment.author}
                      </span>
                      <span className="text-xs text-neutral-400">
                        {comment.date}
                      </span>
                    </div>

                    <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1 leading-relaxed">
                      {comment.content}
                    </p>

                    {article && (
                      <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                        <span>On:</span>
                        <button
                          onClick={() => onViewLiveArticle(article)}
                          className="font-serif font-semibold text-neutral-800 dark:text-neutral-200 hover:text-red-600 hover:underline flex items-center gap-1"
                        >
                          <span className="truncate max-w-sm">{article.title}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-start shrink-0">
                  <div className="flex items-center gap-1 text-xs text-neutral-500 mr-2">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{comment.likes}</span>
                  </div>

                  <button
                    onClick={() => onDeleteComment(comment.articleId, comment.id)}
                    className="p-1.5 text-neutral-400 hover:text-red-600 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                    title="Remove comment"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
