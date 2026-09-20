import React, { useState, useEffect } from 'react';
import { 
  X, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  Heart, 
  MessageSquare, 
  Clock, 
  Calendar, 
  User, 
  Type, 
  Send,
  ThumbsUp,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check
} from 'lucide-react';
import { Article, CommentItem } from '../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onSelectRelated: (article: Article) => void;
  relatedArticles: Article[];
  isBookmarked: boolean;
  onToggleBookmark: (article: Article) => void;
  comments: CommentItem[];
  onAddComment: (articleId: string, author: string, content: string) => void;
  onLikeComment: (commentId: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onSelectRelated,
  relatedArticles,
  isBookmarked,
  onToggleBookmark,
  comments,
  onAddComment,
  onLikeComment
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!article) return null;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(article.id, commentAuthor || 'Guest Reader', commentText.trim());
    setCommentText('');
  };

  const copyUrl = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg leading-relaxed';
      case 'xlarge':
        return 'text-xl leading-loose';
      default:
        return 'text-base leading-relaxed';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-neutral-900 w-full max-w-4xl rounded-sm shadow-2xl overflow-hidden flex flex-col my-auto border border-neutral-200 dark:border-neutral-800"
        role="dialog"
        aria-modal="true"
      >
        {/* Sticky Reader Bar */}
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xs border-b border-neutral-200 dark:border-neutral-800 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
              {article.category}
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <div className="flex items-center gap-1 text-xs text-neutral-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Reader Controls: Font Resizer & Bookmark & Close */}
          <div className="flex items-center gap-2">
            {/* Font Size Selector */}
            <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 rounded p-0.5 text-xs">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded transition-colors ${fontSize === 'normal' ? 'bg-white dark:bg-neutral-700 font-bold shadow-xs' : 'text-neutral-500'}`}
                title="Normal Font Size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded transition-colors ${fontSize === 'large' ? 'bg-white dark:bg-neutral-700 font-bold shadow-xs' : 'text-neutral-500'}`}
                title="Large Font Size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 rounded transition-colors ${fontSize === 'xlarge' ? 'bg-white dark:bg-neutral-700 font-bold shadow-xs' : 'text-neutral-500'}`}
                title="Extra Large Font Size"
              >
                A++
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article)}
              className={`p-1.5 rounded transition-colors ${
                isBookmarked 
                  ? 'text-red-600 bg-red-50 dark:bg-red-950/40' 
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
              title={isBookmarked ? "Saved in Bookmarks" : "Save for Later"}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            {/* Share / Copy link */}
            <button
              onClick={copyUrl}
              className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded"
              title="Copy Article Link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-red-600 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ml-2"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="p-6 sm:p-10 max-h-[82vh] overflow-y-auto">
          {/* Article Header */}
          <div className="mb-6">
            <h1 className="font-serif-headline text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 leading-tight">
              {article.title}
            </h1>
            {article.subtitle && (
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-serif-headline mt-3 leading-relaxed">
                {article.subtitle}
              </p>
            )}

            {/* Byline & Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-b border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-3">
                {article.authorAvatar ? (
                  <img
                    src={article.authorAvatar}
                    alt={article.author}
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-neutral-200 dark:ring-neutral-700"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                    <User className="w-4 h-4 text-neutral-600" />
                  </div>
                )}
                <div>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-200 block">
                    {article.author}
                  </span>
                  <span>{article.date} • {article.views.toLocaleString()} views</span>
                </div>
              </div>

              {/* Social Share Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase font-bold tracking-wider mr-1 text-neutral-400">Share:</span>
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 text-neutral-600 dark:text-neutral-300 hover:text-blue-500 rounded bg-neutral-100 dark:bg-neutral-800"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 text-neutral-600 dark:text-neutral-300 hover:text-blue-600 rounded bg-neutral-100 dark:bg-neutral-800"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 text-neutral-600 dark:text-neutral-300 hover:text-blue-700 rounded bg-neutral-100 dark:bg-neutral-800"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mb-8">
            <div className="aspect-16/10 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-sm">
              <img
                src={article.imageUrl}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            {article.imageCaption && (
              <p className="text-xs text-neutral-500 dark:text-neutral-400 italic mt-2 text-center">
                {article.imageCaption}
              </p>
            )}
          </div>

          {/* Article Text Content */}
          <div className={`space-y-5 text-neutral-800 dark:text-neutral-200 font-serif-headline ${getFontSizeClass()}`}>
            {article.content.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {index === 0 ? (
                  <>
                    <span className="float-left text-5xl font-masthead font-bold pr-3 pt-1 text-neutral-900 dark:text-neutral-100 leading-none">
                      {paragraph.charAt(0)}
                    </span>
                    {paragraph.slice(1)}
                  </>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          </div>

          {/* Article Tags */}
          <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
              Topic Tags:
            </span>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs rounded-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <section className="mt-12 pt-8 border-t-2 border-neutral-900 dark:border-neutral-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif-headline text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-red-600" />
                <span>Reader Responses ({comments.length})</span>
              </h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8 p-4 bg-neutral-50 dark:bg-neutral-800/40 rounded border border-neutral-200 dark:border-neutral-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Join the Discussion
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name (optional)"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-none focus:outline-none focus:border-red-600"
                />
              </div>
              <textarea
                rows={3}
                required
                placeholder="Share your perspective on this report..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-none focus:outline-none focus:border-red-600"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-red-600 dark:bg-neutral-100 dark:hover:bg-red-600 text-white dark:text-neutral-900 dark:hover:text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
              >
                <Send className="w-3 h-3" />
                <span>Post Comment</span>
              </button>
            </form>

            {/* Comment List */}
            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((c) => (
                  <div key={c.id} className="p-4 bg-neutral-50 dark:bg-neutral-800/30 rounded border border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={c.avatar}
                          alt={c.author}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="text-xs font-bold text-neutral-900 dark:text-neutral-200">
                          {c.author}
                        </span>
                        <span className="text-[11px] text-neutral-400">• {c.date}</span>
                      </div>
                      <button
                        onClick={() => onLikeComment(c.id)}
                        className="flex items-center gap-1 text-xs text-neutral-500 hover:text-red-600 transition-colors"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{c.likes}</span>
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed pl-9">
                      {c.content}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-neutral-400 italic">
                  Be the first to share your thoughts on this story.
                </p>
              )}
            </div>
          </section>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
              <h3 className="font-serif-headline text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                More From {article.category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.slice(0, 3).map((rel) => (
                  <div
                    key={'related-' + rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="group cursor-pointer flex flex-col"
                  >
                    <div className="aspect-16/10 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-sm mb-2">
                      <img
                        src={rel.imageUrl}
                        alt={rel.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h4 className="font-serif-headline text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 line-clamp-2">
                      {rel.title}
                    </h4>
                    <span className="text-[10px] text-neutral-400 mt-1">{rel.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
