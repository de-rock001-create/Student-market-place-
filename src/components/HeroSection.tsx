import React from 'react';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  GraduationCap, 
  Zap, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NIGERIAN_UNIVERSITIES } from '../data/universities';
import { ProductCategory } from '../types';

export const HeroSection: React.FC = () => {
  const { 
    selectedUniversity, 
    setSelectedUniversity, 
    searchQuery, 
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setIsVerifyModalOpen,
    currentUser
  } = useApp();

  const currentUni = NIGERIAN_UNIVERSITIES.find(u => u.id === selectedUniversity) || NIGERIAN_UNIVERSITIES[0];

  const categoryChips: { label: string; value: ProductCategory }[] = [
    { label: '📚 Textbooks', value: 'Textbooks & Handouts' },
    { label: '💻 Electronics & Gadgets', value: 'Laptops & Gadgets' },
    { label: '🛏️ Hostel & Sublets', value: 'Bedspace & Sublets' },
    { label: '⚡ Hostel Appliances', value: 'Hostel Appliances' },
    { label: '👕 Campus Fashion', value: 'Campus Fashion' },
    { label: '🛠️ Student Services', value: 'Campus Gigs & Tech Services' }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-gray-50/50 pt-8 pb-10 border-b border-gray-100">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-10 -z-10 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-20 left-10 -z-10 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Network Status Badge */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-800 text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            Direct Campus P2P Network • v2.4 Active
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Buy and Sell Safely Within Your Campus <span className="inline-block">🇳🇬</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Connect directly with verified students in your university. Zero delivery delays, campus pickup at SUB or faculty gates, and 100% student-vetted sellers.
          </p>
        </div>

        {/* Interactive Campus Search Box */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl shadow-emerald-950/5 border border-emerald-100 p-4 sm:p-5">
          {/* Current Campus Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-gray-100 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="text-gray-500 font-medium">Current Campus Zone:</span>
              <span className="font-bold text-gray-900">
                {selectedUniversity === 'all' ? 'All Nigerian Campuses' : `${currentUni.fullName} (${currentUni.shortName})`}
              </span>
              {selectedUniversity !== 'all' && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {currentUni.mainCampus}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-gray-400">Switch:</span>
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="bg-gray-50 hover:bg-gray-100 text-emerald-800 font-bold px-2.5 py-1 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="all">All Nigerian Campuses (Nationwide)</option>
                {NIGERIAN_UNIVERSITIES.map(u => (
                  <option key={u.id} value={u.id}>{u.shortName} ({u.state})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search textbooks, power banks, hostel fans, calculators, laptops..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 focus:bg-white text-sm text-gray-900 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
            </div>
            <button
              onClick={() => {
                // Focus into results or scroll to listings
                const el = document.getElementById('campus-listings-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <span>Find on Campus</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Category Chips */}
          <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-gray-400 text-[11px] font-semibold mr-1 flex-shrink-0">Quick filters:</span>
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex-shrink-0 transition-colors cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Items
            </button>
            {categoryChips.map(chip => (
              <button
                key={chip.value}
                onClick={() => setSelectedCategory(selectedCategory === chip.value ? 'All' : chip.value)}
                className={`px-3 py-1.5 rounded-lg font-semibold flex-shrink-0 transition-colors cursor-pointer ${
                  selectedCategory === chip.value
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-center">
          <div className="bg-white/90 p-3 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div className="text-left">
              <div className="text-xs sm:text-sm font-extrabold text-gray-900">18,400+</div>
              <div className="text-[10px] text-gray-500">Verified Students</div>
            </div>
          </div>

          <div className="bg-white/90 p-3 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0" />
            <div className="text-left">
              <div className="text-xs sm:text-sm font-extrabold text-gray-900">12 Campuses</div>
              <div className="text-[10px] text-gray-500">Active Trade Hubs</div>
            </div>
          </div>

          <div className="bg-white/90 p-3 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-center gap-2">
            <Zap className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <div className="text-left">
              <div className="text-xs sm:text-sm font-extrabold text-gray-900">₦0 Fees</div>
              <div className="text-[10px] text-gray-500">Free for Students</div>
            </div>
          </div>

          <div className="bg-white/90 p-3 rounded-xl border border-gray-200/80 shadow-2xs flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div className="text-left">
              <div className="text-xs sm:text-sm font-extrabold text-gray-900">SUB Safe Zones</div>
              <div className="text-[10px] text-gray-500">Daylight Verification</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
