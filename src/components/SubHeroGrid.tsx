import React from 'react';
import { Article } from '../types';

interface SubHeroGridProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SubHeroGrid: React.FC<SubHeroGridProps> = ({ articles, onSelectArticle }) => {
  // Grab the 4 sub-hero articles matching screenshot 1 & 2
  const card1 = articles.find(a => a.id === 'vaccine-mandate-protest') || articles[3];
  const card2 = articles.find(a => a.id === 'boyle-heights-casa') || articles[4];
  const card3 = articles.find(a => a.id === 'climate-talks-summit') || articles[5];
  const card4 = articles.find(a => a.id === 'five-substitutes-football') || articles[6];

  const subItems = [card1, card2, card3, card4].filter(Boolean) as Article[];

  return (
    <section className="w-full py-6 border-t border-b border-neutral-200 dark:border-neutral-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {subItems.map((article) => (
          <article
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="group cursor-pointer flex flex-col"
          >
            {/* Aspect thumbnail */}
            <div className="relative aspect-16/10 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-sm mb-3">
              <img
                src={article.imageUrl}
                alt={article.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Red Category Label */}
            <span className="text-[11px] font-bold text-red-600 dark:text-red-500 uppercase tracking-wider mb-1 block">
              {article.category}
            </span>

            {/* Headline */}
            <h3 className="font-serif-headline text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug line-clamp-2">
              {article.title}
            </h3>

            {/* Date */}
            <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span>{article.date}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
