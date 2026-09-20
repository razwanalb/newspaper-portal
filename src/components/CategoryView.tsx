import React, { useState } from 'react';
import { Article, CategoryType } from '../types';
import { ChevronRight, Facebook, Twitter, Youtube, CheckCircle2 } from 'lucide-react';

interface CategoryViewProps {
  category: CategoryType;
  articles: Article[];
  allArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onGoHome: () => void;
  onSubscribeNewsletter: (name: string, email: string) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  category,
  articles,
  allArticles,
  onSelectArticle,
  onGoHome,
  onSubscribeNewsletter
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSidebarSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onSubscribeNewsletter(name || 'Subscriber', email);
    setSubscribed(true);
    setName('');
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  // Featured article in this category
  const leadArticle = articles[0] || allArticles[0];
  const remainingArticles = articles.slice(1);
  const latestUpdates = allArticles.slice(0, 5);

  return (
    <div className="w-full py-6">
      {/* Breadcrumb matching screenshot 10 */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-6">
        <button onClick={onGoHome} className="hover:text-red-600 transition-colors">
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-neutral-400" />
        <span className="font-semibold text-neutral-800 dark:text-neutral-200">{category}</span>
      </nav>

      {/* Category Heading matching screenshot 10 */}
      <div className="mb-8">
        <h2 className="font-bold text-2xl sm:text-3xl tracking-wide uppercase text-neutral-900 dark:text-neutral-100">
          <span>CATEGORY: </span>
          <span className="text-red-600 dark:text-red-500">{category}</span>
        </h2>
      </div>

      {/* 2-Column Main & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Column (8 cols) */}
        <div className="lg:col-span-8">
          {/* Big Featured Card */}
          {leadArticle && (
            <article 
              onClick={() => onSelectArticle(leadArticle)}
              className="group cursor-pointer mb-10 pb-8 border-b border-neutral-200 dark:border-neutral-800"
            >
              <div className="relative aspect-16/10 sm:aspect-16/9 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-sm mb-4">
                <img
                  src={leadArticle.imageUrl}
                  alt={leadArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>

              <div className="text-center sm:text-left">
                <span className="text-xs font-bold text-red-600 dark:text-red-500 uppercase tracking-wider block mb-2">
                  {leadArticle.category}
                </span>

                <h1 className="font-serif-headline text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-neutral-900 dark:text-neutral-50 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-tight mb-3">
                  {leadArticle.title}
                </h1>

                <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                  <span>written by </span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">{leadArticle.author}</span>
                  <span className="mx-2">•</span>
                  <span>{leadArticle.date}</span>
                </div>

                <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed line-clamp-3">
                  {leadArticle.excerpt}
                </p>

                <div className="mt-4">
                  <span className="inline-block text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider group-hover:underline">
                    Read Full Story →
                  </span>
                </div>
              </div>
            </article>
          )}

          {/* List of Other Articles in this Category */}
          <div className="space-y-6">
            {remainingArticles.length > 0 ? (
              remainingArticles.map((art) => (
                <article
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="group cursor-pointer flex flex-col sm:flex-row gap-5 items-start pb-6 border-b border-neutral-100 dark:border-neutral-800"
                >
                  <div className="relative w-full sm:w-56 aspect-16/10 shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-sm">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] font-bold text-red-600 dark:text-red-500 uppercase tracking-wider block mb-1">
                      {art.category}
                    </span>
                    <h3 className="font-serif-headline text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-2 line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                    <div className="text-xs text-neutral-400 mt-2">
                      <span>{art.date}</span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="p-8 bg-neutral-50 dark:bg-neutral-800/40 text-center rounded">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Showing all available editorial reports for <span className="font-bold">{category}</span>.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar (4 cols) matching Screenshot 10 */}
        <aside className="lg:col-span-4 space-y-8">
          
          {/* FOLLOW US Widget */}
          <div className="border border-neutral-200 dark:border-neutral-800 p-5 rounded-xs bg-white dark:bg-neutral-900">
            <h3 className="text-xs font-bold uppercase tracking-wider pb-2 border-b-2 border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 mb-4">
              Follow Us
            </h3>

            <div className="space-y-3 text-xs">
              {/* Facebook */}
              <div className="flex items-center justify-between p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xs">
                <div className="flex items-center gap-2.5 text-blue-600 font-semibold">
                  <Facebook className="w-4 h-4 fill-blue-600" />
                  <span className="text-neutral-800 dark:text-neutral-200"><strong>249K</strong> Fans</span>
                </div>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 bg-white dark:bg-neutral-700 hover:bg-blue-600 hover:text-white border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 font-medium rounded-xs transition-colors"
                >
                  Like
                </a>
              </div>

              {/* Twitter / X */}
              <div className="flex items-center justify-between p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xs">
                <div className="flex items-center gap-2.5 text-neutral-800 dark:text-neutral-200 font-semibold">
                  <Twitter className="w-4 h-4" />
                  <span><strong>71.5K</strong> Followers</span>
                </div>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 bg-white dark:bg-neutral-700 hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-100 dark:hover:text-neutral-900 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 font-medium rounded-xs transition-colors"
                >
                  Follow Us
                </a>
              </div>

              {/* YouTube */}
              <div className="flex items-center justify-between p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xs">
                <div className="flex items-center gap-2.5 text-red-600 font-semibold">
                  <Youtube className="w-4 h-4 fill-red-600" />
                  <span className="text-neutral-800 dark:text-neutral-200"><strong>145K</strong> Subscribers</span>
                </div>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 bg-white dark:bg-neutral-700 hover:bg-red-600 hover:text-white border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 font-medium rounded-xs transition-colors"
                >
                  Subscribe
                </a>
              </div>
            </div>
          </div>

          {/* LATEST UPDATE Widget */}
          <div className="border border-neutral-200 dark:border-neutral-800 p-5 rounded-xs bg-white dark:bg-neutral-900">
            <h3 className="text-xs font-bold uppercase tracking-wider pb-2 border-b-2 border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 mb-4">
              Latest Update
            </h3>

            <div className="space-y-4">
              {latestUpdates.map((item) => (
                <article
                  key={'sidebar-' + item.id}
                  onClick={() => onSelectArticle(item)}
                  className="group cursor-pointer flex gap-3.5 items-start pb-3 border-b border-neutral-100 dark:border-neutral-800 last:border-0 last:pb-0"
                >
                  <div className="relative w-20 h-16 shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-xs">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif-headline text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-neutral-400 mt-1 block">
                      {item.date}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Newsletter Sidebar Box */}
          <div className="border border-neutral-200 dark:border-neutral-800 p-5 rounded-xs bg-neutral-50 dark:bg-neutral-800/50">
            <h3 className="text-xs font-bold uppercase tracking-wider pb-2 border-b-2 border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 mb-3">
              Newsletter
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
              Get editorial analysis delivered directly to your inbox every morning.
            </p>
            {subscribed ? (
              <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 text-xs rounded flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSidebarSubscribe} className="space-y-2.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address..."
                  className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-none text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-red-600"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-neutral-900 hover:bg-red-700 dark:bg-neutral-100 dark:hover:bg-red-600 text-white dark:text-neutral-900 dark:hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </aside>

      </div>
    </div>
  );
};
