import React from 'react';
import { Article, CategoryType } from '../types';
import { MessageSquare } from 'lucide-react';

interface WorldPoliticsSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onSelectCategory: (cat: CategoryType) => void;
}

export const WorldPoliticsSection: React.FC<WorldPoliticsSectionProps> = ({
  articles,
  onSelectArticle,
  onSelectCategory
}) => {
  // Articles for this block matching Screenshots 2 & 3
  const bidenStory = articles.find(a => a.id === 'us-taiwan-china-relations') || articles[1];
  const chinaStory = articles.find(a => a.id === 'china-carbon-emitter') || articles[7];
  const halloweenStory = articles.find(a => a.id === 'halloween-trick-or-treat') || articles[8];
  const netZeroStory = articles.find(a => a.id === 'un-net-zero-pledges') || articles[9];
  const eduStory = articles.find(a => a.id === 'cal-state-graduation') || articles[0];

  return (
    <section className="w-full py-8">
      {/* Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 8 Columns: WORLD & POLITICS */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between pb-2 border-b-2 border-neutral-900 dark:border-neutral-100 mb-6">
            <button
              onClick={() => onSelectCategory('Politics')}
              className="font-bold text-lg md:text-xl tracking-wider text-neutral-900 dark:text-neutral-100 uppercase hover:text-red-600 transition-colors"
            >
              World & Politics
            </button>
            <span className="text-xs font-semibold text-neutral-400 hover:text-red-600 cursor-pointer" onClick={() => onSelectCategory('Politics')}>
              View All →
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Big Lead Story in World & Politics (7 cols) */}
            <div className="md:col-span-7">
              <article 
                onClick={() => onSelectArticle(bidenStory)}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-sm mb-3">
                  <img
                    src={bidenStory.imageUrl}
                    alt={bidenStory.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-serif-headline text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-tight">
                  {bidenStory.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2 line-clamp-2 leading-relaxed">
                  {bidenStory.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mt-3">
                  <span>{bidenStory.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {bidenStory.commentCount} comments
                  </span>
                </div>
              </article>
            </div>

            {/* Right 3 Stacked Compact Stories (5 cols) */}
            <div className="md:col-span-5 flex flex-col gap-4">
              {[chinaStory, halloweenStory, netZeroStory].map((story, idx) => (
                <article
                  key={story.id + idx}
                  onClick={() => onSelectArticle(story)}
                  className="group cursor-pointer flex gap-4 items-start pb-4 border-b border-neutral-100 dark:border-neutral-800 last:border-0 last:pb-0"
                >
                  <div className="relative w-24 h-20 shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-sm">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif-headline text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug line-clamp-2">
                      {story.title}
                    </h4>
                    <span className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-1 block">
                      {story.date}
                    </span>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </div>

        {/* Right 4 Columns: EDUCATION Section (Matches Screenshot 2 & 3) */}
        <div className="lg:col-span-4">
          <div className="flex items-center justify-between pb-2 border-b-2 border-neutral-900 dark:border-neutral-100 mb-6">
            <button
              onClick={() => onSelectCategory('Education')}
              className="font-bold text-lg md:text-xl tracking-wider text-neutral-900 dark:text-neutral-100 uppercase hover:text-red-600 transition-colors"
            >
              Education
            </button>
            <span className="text-xs font-semibold text-neutral-400 hover:text-red-600 cursor-pointer" onClick={() => onSelectCategory('Education')}>
              View All →
            </span>
          </div>

          <article
            onClick={() => onSelectArticle(eduStory)}
            className="group cursor-pointer flex flex-col"
          >
            {/* Red category */}
            <span className="text-[11px] font-bold text-red-600 dark:text-red-500 uppercase tracking-wider mb-1 block">
              {eduStory.category}
            </span>

            {/* Headline */}
            <h3 className="font-serif-headline text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug mb-2">
              {eduStory.title}
            </h3>

            {/* Author and date */}
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
              <span>by {eduStory.author}</span>
              <span className="mx-2">•</span>
              <span>{eduStory.date}</span>
            </div>

            {/* Large Picture */}
            <div className="relative aspect-16/11 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-sm">
              <img
                src={eduStory.imageUrl}
                alt={eduStory.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
              />
            </div>
          </article>
        </div>

      </div>
    </section>
  );
};
