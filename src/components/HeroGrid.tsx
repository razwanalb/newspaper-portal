import React from 'react';
import { Article, AdPlacement } from '../types';
import { MessageSquare, Clock, ArrowUpRight } from 'lucide-react';

interface HeroGridProps {
  onSelectArticle: (article: Article) => void;
  articles: Article[];
  ad?: AdPlacement;
  onAdClick: (ad: AdPlacement) => void;
}

export const HeroGrid: React.FC<HeroGridProps> = ({
  onSelectArticle,
  articles,
  ad,
  onAdClick
}) => {
  // Find key articles for the hero grid
  const mainFeature = articles.find(a => a.id === 'cal-state-graduation') || articles[0];
  const midStory1 = articles.find(a => a.id === 'us-taiwan-china-relations') || articles[1];
  const midStory2 = articles.find(a => a.id === 'tech-tweetstorm-christmas') || articles[2];
  const textStory = articles.find(a => a.id === 'mortgage-credit-scores') || articles[3];

  return (
    <section className="w-full pt-4 pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Big Lead Feature (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div 
            onClick={() => onSelectArticle(mainFeature)}
            className="group cursor-pointer relative overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-sm flex-1 flex flex-col"
          >
            <div className="relative aspect-4/3 sm:aspect-16/11 lg:aspect-auto lg:flex-1 overflow-hidden">
              <img
                src={mainFeature.imageUrl}
                alt={mainFeature.title}
                referrerPolicy="no-referrer"
                loading="eager"
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
              
              {/* Mobile overlay title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white lg:hidden">
                <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider">
                  {mainFeature.category}
                </span>
                <h2 className="font-serif-headline text-xl font-bold mt-1 line-clamp-2">
                  {mainFeature.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-neutral-300 mt-2">
                  <span>{mainFeature.date}</span>
                  <span>•</span>
                  <span>{mainFeature.commentCount} comments</span>
                </div>
              </div>
            </div>

            {/* Desktop Headline & Excerpt below image or integrated */}
            <div className="hidden lg:block pt-3.5">
              <span className="text-xs font-bold text-red-600 dark:text-red-500 uppercase tracking-wider block mb-1">
                {mainFeature.category}
              </span>
              <h2 className="font-serif-headline text-2xl font-bold text-neutral-900 dark:text-neutral-50 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-tight">
                {mainFeature.title}
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2 line-clamp-3 leading-relaxed">
                {mainFeature.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <span className="font-medium">by {mainFeature.author}</span>
                <span>•</span>
                <span>{mainFeature.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  {mainFeature.commentCount} comments
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column: Two Stacked Visual Stories (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Top Story (Biden - US & Taiwan) */}
          <article 
            onClick={() => onSelectArticle(midStory1)}
            className="group cursor-pointer flex flex-col flex-1"
          >
            <div className="relative aspect-16/9 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-sm mb-3">
              <img
                src={midStory1.imageUrl}
                alt={midStory1.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </div>
            <h3 className="font-serif-headline text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug">
              {midStory1.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mt-2">
              <span>{midStory1.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                {midStory1.commentCount} comments
              </span>
            </div>
          </article>

          {/* Bottom Story (Freight containers) */}
          <article 
            onClick={() => onSelectArticle(midStory2)}
            className="group cursor-pointer flex flex-col flex-1 pt-4 border-t border-neutral-200 dark:border-neutral-800"
          >
            <div className="relative aspect-16/9 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-sm mb-3">
              <img
                src={midStory2.imageUrl}
                alt={midStory2.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </div>
            <h3 className="font-serif-headline text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug">
              {midStory2.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mt-2">
              <span>{midStory2.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                {midStory2.commentCount} comments
              </span>
            </div>
          </article>
        </div>

        {/* Right Column: Trending Text Headline + 300x250 Ad Banner (3 Cols) */}
        <div className="lg:col-span-3 flex flex-col justify-between gap-6">
          
          {/* Top Text Story (Mortgage shopping / credit score) */}
          <article 
            onClick={() => onSelectArticle(textStory)}
            className="group cursor-pointer p-4 bg-neutral-50 dark:bg-neutral-800/40 rounded border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
          >
            <span className="text-[11px] font-bold text-red-600 dark:text-red-500 uppercase tracking-wider block mb-1">
              Personal Finance
            </span>
            <h3 className="font-serif-headline text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug">
              {textStory.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mt-2">
              <span>{textStory.date}</span>
              <span>•</span>
              <span>{textStory.commentCount} comments</span>
            </div>
          </article>

          {/* 300x250 Ad Space Widget (Matches Screenshot 1) */}
          {ad && ad.active && (
            <div 
              onClick={() => onAdClick(ad)}
              className="group relative cursor-pointer overflow-hidden rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-900 text-white shadow-sm flex flex-col justify-between min-h-[250px]"
            >
              {/* Ad Background with hot air balloon sunset */}
              <img
                src={ad.imageUrl}
                alt={ad.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

              {/* Ad Content */}
              <div className="relative p-5 z-10 flex flex-col justify-between h-full">
                <div>
                  <span className="inline-block bg-neutral-800/80 text-[10px] uppercase font-bold tracking-widest text-neutral-300 px-2 py-0.5 rounded backdrop-blur-xs mb-2">
                    Sponsored Ad
                  </span>
                  <h4 className="font-serif-headline text-lg sm:text-xl font-black uppercase tracking-wide leading-tight text-white drop-shadow-sm">
                    {ad.title}
                  </h4>
                  {ad.subtitle && (
                    <p className="text-xs text-neutral-200 mt-1.5 line-clamp-2">
                      {ad.subtitle}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-2">
                  <div className="inline-flex items-center gap-1.5 bg-transparent border border-white/80 hover:bg-white hover:text-neutral-900 text-white text-xs font-bold tracking-widest px-4 py-2 rounded-xs transition-colors uppercase">
                    <span>{ad.ctaText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-3 font-mono">
                    {ad.dimensions}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
