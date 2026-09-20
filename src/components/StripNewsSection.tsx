import React from 'react';
import { Article } from '../types';

interface StripNewsSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const StripNewsSection: React.FC<StripNewsSectionProps> = ({
  articles,
  onSelectArticle
}) => {
  // 6 specific strip stories matching screenshot 6
  const stripStoryIds = [
    'classic-movies-socal',
    'inspiring-books-reading-list',
    'baseball-tbs-nfl-espn',
    'premiership-rugby-guide',
    'padraig-harrington-ryder-cup',
    'frodon-bryony-frost'
  ];

  const stripStories = stripStoryIds
    .map(id => articles.find(a => a.id === id))
    .filter(Boolean) as Article[];

  return (
    <section className="w-full py-8 border-t border-neutral-200 dark:border-neutral-800">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stripStories.map((story) => (
          <article
            key={story.id}
            onClick={() => onSelectArticle(story)}
            className="group cursor-pointer flex flex-col"
          >
            {/* Aspect image */}
            <div className="relative aspect-4/3 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-sm mb-2.5">
              <img
                src={story.imageUrl}
                alt={story.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
              />
            </div>

            {/* Title */}
            <h4 className="font-serif-headline text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug line-clamp-3">
              {story.title}
            </h4>

            {/* Date */}
            <span className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-1.5 block">
              {story.date}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
};
