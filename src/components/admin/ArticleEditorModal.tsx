import React, { useState, useEffect } from 'react';
import { 
  X, 
  Image as ImageIcon, 
  Eye, 
  Check, 
  Clock, 
  Sparkles, 
  Tag, 
  User, 
  Layers, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { Article, CategoryType, ArticleStatus, UserAccount } from '../../types';

interface ArticleEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: Article) => void;
  initialArticle: Article | null;
  currentUser: UserAccount;
}

const CATEGORIES: CategoryType[] = [
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

const PRESET_IMAGES = [
  { label: 'Politics', url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Campus / Education', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Technology / AI', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Markets / Finance', url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Global Diplomacy', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Climate / Nature', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Sports Arena', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80' }
];

export const ArticleEditorModal: React.FC<ArticleEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialArticle,
  currentUser
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('News');
  const [subcategory, setSubcategory] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [contentBody, setContentBody] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [status, setStatus] = useState<ArticleStatus>('published');
  const [featured, setFeatured] = useState(false);
  const [trending, setTrending] = useState(false);
  const [hotBadge, setHotBadge] = useState('');
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialArticle) {
      setTitle(initialArticle.title);
      setSubtitle(initialArticle.subtitle || '');
      setCategory(initialArticle.category);
      setSubcategory(initialArticle.subcategory || '');
      setAuthor(initialArticle.author);
      setImageUrl(initialArticle.imageUrl);
      setImageCaption(initialArticle.imageCaption || '');
      setExcerpt(initialArticle.excerpt);
      setContentBody(initialArticle.content.join('\n\n'));
      setTagsInput(initialArticle.tags.join(', '));
      setStatus(initialArticle.status || 'published');
      setFeatured(!!initialArticle.featured);
      setTrending(!!initialArticle.trending);
      setHotBadge(initialArticle.hotBadge || '');
    } else {
      // New article defaults
      setTitle('');
      setSubtitle('');
      setCategory('News');
      setSubcategory('Breaking');
      setAuthor(currentUser.name);
      setImageUrl(PRESET_IMAGES[0].url);
      setImageCaption('Press dispatch photo archives.');
      setExcerpt('');
      setContentBody('');
      setTagsInput('News, Dispatch, Analysis');
      setStatus('published');
      setFeatured(false);
      setTrending(false);
      setHotBadge('');
    }
    setErrorMsg('');
  }, [initialArticle, isOpen, currentUser]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMsg('Please provide an article headline/title.');
      return;
    }
    if (!excerpt.trim()) {
      setErrorMsg('Please provide a brief summary excerpt.');
      return;
    }
    if (!contentBody.trim()) {
      setErrorMsg('Please write article body content.');
      return;
    }

    const paragraphs = contentBody
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    // Calculate approximate read time
    const wordCount = (contentBody + ' ' + title).split(/\s+/).length;
    const minutes = Math.max(1, Math.round(wordCount / 200));

    const finalArticle: Article = {
      id: initialArticle ? initialArticle.id : 'art_' + Date.now(),
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      category,
      subcategory: subcategory.trim() || undefined,
      author: author.trim() || currentUser.name,
      authorAvatar: initialArticle?.authorAvatar || currentUser.avatar,
      date: initialArticle ? initialArticle.date : 'Just now',
      readTime: `${minutes} min read`,
      commentCount: initialArticle ? initialArticle.commentCount : 0,
      imageUrl: imageUrl.trim() || PRESET_IMAGES[0].url,
      imageCaption: imageCaption.trim() || undefined,
      excerpt: excerpt.trim(),
      content: paragraphs.length > 0 ? paragraphs : [excerpt.trim()],
      featured,
      trending,
      hotBadge: hotBadge.trim() || undefined,
      tags: tags.length > 0 ? tags : [category],
      views: initialArticle ? initialArticle.views : 1,
      status,
      publishedBy: currentUser.name,
      updatedAt: 'Just now'
    };

    onSave(finalArticle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-5xl bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-red-600 text-white rounded-lg">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                {initialArticle ? 'Edit Article' : 'Compose & Publish New Story'}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Logged in as <span className="font-semibold text-neutral-700 dark:text-neutral-300">{currentUser.name}</span> ({currentUser.role === 'super_admin' ? 'Super Admin' : 'News Moderator'})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowLivePreview(!showLivePreview)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              {showLivePreview ? 'Hide Live Preview' : 'Show Live Preview'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Form + Optional Live Preview */}
        <div className="flex-1 overflow-y-auto p-6">
          {errorMsg && (
            <div className="mb-5 p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-lg flex items-center gap-2.5 text-red-700 dark:text-red-300 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className={`grid gap-6 ${showLivePreview ? 'lg:grid-cols-12' : 'grid-cols-1'}`}>
            
            {/* Editor Form */}
            <form onSubmit={handleSubmit} id="article-editor-form" className={`space-y-5 ${showLivePreview ? 'lg:col-span-7' : 'w-full max-w-3xl mx-auto'}`}>
              
              {/* Title / Headline */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                  Headline / Article Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Senate passes historic clean energy compromise bill..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-serif text-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                />
              </div>

              {/* Subtitle / Subhead */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                  Sub-headline / Deck (Optional)
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Additional context clarifying the news lead..."
                  className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:ring-2 focus:ring-red-600 outline-none"
                />
              </div>

              {/* Category, Subcategory & Status Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryType)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm outline-none"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                    Sub-section
                  </label>
                  <input
                    type="text"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    placeholder="e.g. Higher Ed, Markets"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm outline-none"
                  >
                  </input>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                    Publishing Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ArticleStatus)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm font-semibold outline-none"
                  >
                    <option value="published">Published (Live)</option>
                    <option value="draft">Draft (Private)</option>
                    <option value="review">Needs Editorial Review</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Cover Image & Presets */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                  Lead Photo URL <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    required
                    className="flex-1 px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm outline-none font-mono"
                  />
                </div>

                {/* Preset Image Chooser */}
                <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-neutral-500">
                  <span className="font-semibold">Quick Presets:</span>
                  {PRESET_IMAGES.map((img) => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => setImageUrl(img.url)}
                      className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
                    >
                      {img.label}
                    </button>
                  ))}
                </div>

                <div className="mt-2">
                  <input
                    type="text"
                    value={imageCaption}
                    onChange={(e) => setImageCaption(e.target.value)}
                    placeholder="Photo caption and accreditation / agency credit..."
                    className="w-full px-3 py-1.5 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 text-xs outline-none"
                  />
                </div>
              </div>

              {/* Summary / Excerpt */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                  Summary Excerpt (Leads, RSS & Social Snippet) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A concise 2-sentence summary outlining the core development..."
                  required
                  className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm outline-none"
                />
              </div>

              {/* Article Content Body */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                    Story Body (Paragraphs separated by blank line) <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs text-neutral-400">
                    {contentBody.split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>
                <textarea
                  rows={7}
                  value={contentBody}
                  onChange={(e) => setContentBody(e.target.value)}
                  placeholder="Write the full report here. Press Enter twice between paragraphs..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm font-sans leading-relaxed outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              {/* Tags, Author, Flags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                    Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Politics, G7, Diplomacy"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
                    Bylined Reporter / Author
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author name"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm outline-none"
                  />
                </div>
              </div>

              {/* Editorial Badges & Placement Flags */}
              <div className="flex flex-wrap items-center gap-5 p-3.5 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded border-neutral-300 focus:ring-red-500"
                  />
                  <span className="font-bold text-neutral-800 dark:text-neutral-200">
                    Feature on Front Page Hero
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={trending}
                    onChange={(e) => setTrending(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded border-neutral-300 focus:ring-red-500"
                  />
                  <span className="font-bold text-neutral-800 dark:text-neutral-200">
                    Mark as Trending
                  </span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-neutral-500">Custom Ribbon:</span>
                  <input
                    type="text"
                    value={hotBadge}
                    onChange={(e) => setHotBadge(e.target.value)}
                    placeholder="e.g. EXCLUSIVE"
                    className="px-2 py-1 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[11px] font-bold uppercase w-28"
                  />
                </div>
              </div>

            </form>

            {/* Live Front-Page Preview Column */}
            {showLivePreview && (
              <div className="lg:col-span-5 bg-neutral-50 dark:bg-neutral-950 rounded-xl p-4 border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-200 dark:border-neutral-800">
                  <span className="text-xs font-black uppercase tracking-wider text-neutral-500">
                    Newspaper Front-Page Card Preview
                  </span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    status === 'published' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {status}
                  </span>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden shadow-xs">
                  <div className="relative aspect-16/9 bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                    <img 
                      src={imageUrl || PRESET_IMAGES[0].url} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = PRESET_IMAGES[0].url;
                      }}
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 tracking-wider">
                        {category}
                      </span>
                      {hotBadge && (
                        <span className="bg-black text-amber-300 text-[10px] font-black uppercase px-2 py-0.5 tracking-wider">
                          {hotBadge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-white leading-snug line-clamp-2">
                      {title || 'Your article headline appears here...'}
                    </h3>
                    {subtitle && (
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-1 italic">
                        {subtitle}
                      </p>
                    )}
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 line-clamp-2">
                      {excerpt || 'The excerpt summary will introduce the report to readers on the front page.'}
                    </p>

                    <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                      <span>By {author || currentUser.name}</span>
                      <span>Just now</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
          <div className="text-xs text-neutral-500">
            {initialArticle ? 'Updating existing story' : 'Publishing as new story'}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="article-editor-form"
              className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" />
              {initialArticle ? 'Save Changes' : (status === 'published' ? 'Publish Story' : 'Save as Draft')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
