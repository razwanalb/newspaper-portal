import React from 'react';
import { Article, CategoryType } from '../types';

interface BusinessSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onSelectCategory: (cat: CategoryType) => void;
}

export const BusinessSection: React.FC<BusinessSectionProps> = ({
  articles,
  onSelectArticle,
  onSelectCategory
}) => {
  const freightStory = articles.find(a => a.id === 'tech-tweetstorm-christmas') || articles[2];
  const gdpStory = articles.find(a => a.id === 'us-economic-growth-covid') || articles[10];
  const wealthTaxStory = articles.find(a => a.id === 'wealth-tax-explainer') || articles[11];
  const corporateStory = articles.find(a => a.id === 'corporate-earnings-tech') || articles[12];

  return (
    <section className="w-full py-8 border-t border-neutral-200 dark:border-neutral-800">
      {/* Section Header with Bold Underline */}
      <div className="flex items-center justify-between pb-2 border-b-2 border-neutral-900 dark:border-neutral-100 mb-6">
        <button
          onClick={() => onSelectCategory('Business')}
          className="font-bold text-lg md:text-xl tracking-wider text-neutral-900 dark:text-neutral-100 uppercase hover:text-red-600 transition-colors"
        >
          Business News
        </button>
        <span 
          onClick={() => onSelectCategory('Business')}
          className="text-xs font-semibold text-neutral-400 hover:text-red-600 cursor-pointer"
        >
          View All →
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 cols): Freight containers feature */}
        <div className="lg:col-span-4">
          <article
            onClick={() => onSelectArticle(freightStory)}
            className="group cursor-pointer flex flex-col h-full"
          >
            <div className="relative aspect-16/11 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-sm mb-3">
              <img
                src={freightStory.imageUrl}
                alt={freightStory.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
              />
            </div>
            <span className="text-[11px] font-bold text-red-600 dark:text-red-500 uppercase tracking-wider mb-1 block">
              {freightStory.category}
            </span>
            <h3 className="font-serif-headline text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug">
              {freightStory.title}
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 line-clamp-2 leading-relaxed">
              {freightStory.excerpt}
            </p>
            <span className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-2 block">
              {freightStory.date}
            </span>
          </article>
        </div>

        {/* Center Column (4 cols): 2 Stacked Stories (US GDP & Wall St) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Top Story (US GDP growth slowed) */}
          <article
            onClick={() => onSelectArticle(gdpStory)}
            className="group cursor-pointer flex gap-4 items-start"
          >
            <div className="relative w-28 h-20 shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-sm">
              <img
                src={gdpStory.imageUrl}
                alt={gdpStory.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-serif-headline text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug line-clamp-3">
                {gdpStory.title}
              </h4>
              <span className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-1 block">
                {gdpStory.date}
              </span>
            </div>
          </article>

          {/* Bottom Story (Wall Street wealth tax) */}
          <article
            onClick={() => onSelectArticle(wealthTaxStory)}
            className="group cursor-pointer flex gap-4 items-start pt-4 border-t border-neutral-100 dark:border-neutral-800"
          >
            <div className="relative w-28 h-20 shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-sm">
              <img
                src={wealthTaxStory.imageUrl}
                alt={wealthTaxStory.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-serif-headline text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug line-clamp-3">
                {wealthTaxStory.title}
              </h4>
              <span className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-1 block">
                {wealthTaxStory.date}
              </span>
            </div>
          </article>
        </div>

        {/* Right Column (4 cols): Modern Corporate Glass Atrium */}
        <div className="lg:col-span-4">
          <article
            onClick={() => onSelectArticle(corporateStory)}
            className="group cursor-pointer flex flex-col h-full"
          >
            <div className="relative aspect-16/11 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-sm mb-3">
              <img
                src={corporateStory.imageUrl}
                alt={corporateStory.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
              />
            </div>
            <span className="text-[11px] font-bold text-red-600 dark:text-red-500 uppercase tracking-wider mb-1 block">
              {corporateStory.category}
            </span>
            <h3 className="font-serif-headline text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug">
              {corporateStory.title}
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 line-clamp-2 leading-relaxed">
              {corporateStory.excerpt}
            </p>
            <span className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-2 block">
              {corporateStory.date}
            </span>
          </article>
        </div>

      </div>
    </section>
  );
};
