import React from 'react';
import { ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SafeTradingBanner: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="bg-emerald-900 text-emerald-100 text-xs sm:text-sm py-2 px-4 shadow-sm border-b border-emerald-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="flex h-2 w-2 relative flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="font-semibold text-emerald-300 flex-shrink-0 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 inline" />
            SAFE CAMPUS TRADING:
          </span>
          <span className="truncate text-emerald-200">
            Always meet at public on-campus landmarks such as Student Union Building (SUB) or Faculty Library. Never send transport or booking fees upfront!
          </span>
        </div>
        <button 
          onClick={() => setCurrentView('safety')}
          className="flex-shrink-0 underline hover:text-white flex items-center gap-1 font-medium transition-colors cursor-pointer"
        >
          View Safe Spots <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
