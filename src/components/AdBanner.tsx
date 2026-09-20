import React from 'react';
import { AdPlacement } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface AdBannerProps {
  ad: AdPlacement;
  onClick: (ad: AdPlacement) => void;
}

export const AdBanner: React.FC<AdBannerProps> = ({ ad, onClick }) => {
  if (!ad || !ad.active) return null;

  return (
    <div className="w-full my-8">
      <div 
        onClick={() => onClick(ad)}
        className="group relative cursor-pointer overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 rounded flex flex-col md:flex-row items-center justify-between p-4 md:p-6 shadow-xs hover:border-neutral-400 dark:hover:border-neutral-600 transition-all"
      >
        {/* Left Ad Text & CTA */}
        <div className="flex-1 z-10 mb-4 md:mb-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-neutral-400 dark:text-neutral-500 bg-neutral-200/60 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
              ADVERTISEMENT
            </span>
          </div>

          <h3 className="text-lg md:text-xl font-black tracking-tight uppercase text-neutral-900 dark:text-neutral-100">
            {ad.title}
          </h3>

          <div className="flex items-center gap-4 mt-3">
            <button
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xs shadow-xs transition-colors"
            >
              <span>{ad.ctaText}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              {ad.dimensions}
            </span>
          </div>
        </div>

        {/* Right Preview Banner Image / Collage */}
        <div className="w-full md:w-1/2 lg:w-2/5 h-24 md:h-20 overflow-hidden rounded relative">
          <img
            src={ad.imageUrl}
            alt={ad.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-50 dark:from-neutral-900 via-transparent to-transparent md:block hidden" />
        </div>
      </div>
    </div>
  );
};
