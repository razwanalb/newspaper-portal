import React from 'react';
import { Flame, Radio } from 'lucide-react';

interface BreakingTickerProps {
  enabled: boolean;
  tickerText: string;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({
  enabled,
  tickerText
}) => {
  if (!enabled || !tickerText.trim()) return null;

  return (
    <div className="w-full bg-neutral-900 text-white text-xs border-b border-neutral-800 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-9">
        
        {/* Badge */}
        <div className="flex items-center gap-1.5 bg-red-600 text-white font-black uppercase text-[10px] tracking-wider px-2.5 py-1 shrink-0 rounded-xs shadow-xs">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>Breaking</span>
        </div>

        {/* Ticker Content */}
        <div className="relative flex-1 overflow-hidden ml-3.5 h-full flex items-center">
          <div className="whitespace-nowrap text-neutral-200 hover:text-white font-medium text-xs tracking-wide">
            {tickerText}
          </div>
        </div>

      </div>
    </div>
  );
};
