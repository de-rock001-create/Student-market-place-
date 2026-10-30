import React from 'react';
import { 
  Filter, 
  RotateCcw, 
  MapPin, 
  ShieldCheck, 
  PlusCircle, 
  Flame, 
  ArrowRight, 
  SlidersHorizontal 
} from 'lucide-react';
import { HeroSection } from './HeroSection';
import { PopularCategories } from './PopularCategories';
import { ListingCard } from './ListingCard';
import { useApp } from '../context/AppContext';
import { NIGERIAN_UNIVERSITIES } from '../data/universities';
import { ProductCategory, CampusCondition } from '../types';
import { formatNaira } from '../utils/formatters';

export const MarketplaceView: React.FC = () => {
  const { 
    products, 
    selectedUniversity, 
    setSelectedUniversity, 
    searchQuery, 
    setSearchQuery,
    selectedCategory, 
    setSelectedCategory,
    selectedCondition, 
    setSelectedCondition,
    priceFilter, 
    setPriceFilter,
    listingViewFilter, 
    setListingViewFilter,
    setIsPostModalOpen,
    setCurrentView
  } = useApp();

  // Filter listings
  const filteredListings = products.filter(item => {
    // 1. University Filter
    if (selectedUniversity !== 'all' && item.universityId !== selectedUniversity) {
      return false;
    }

    // 2. Category Filter
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }

    // 3. Condition Filter
    if (selectedCondition !== 'All' && item.condition !== selectedCondition) {
      return false;
    }

    // 4. Price Filter
    if (item.price > priceFilter) {
      return false;
    }

    // 5. Tab view (all, hostel_safe, urgent)
    if (listingViewFilter === 'hostel_safe' && !item.isHostelSafeVerified) {
      return false;
    }
    if (listingViewFilter === 'urgent' && !item.isUrgentSale) {
      return false;
    }

    // 6. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchHostel = item.hostelOrFaculty.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchUni = item.universityName.toLowerCase().includes(q);
      return matchTitle || matchDesc || matchHostel || matchCategory || matchUni;
    }

    return true;
  });

  const activeUni = NIGERIAN_UNIVERSITIES.find(u => u.id === selectedUniversity) || NIGERIAN_UNIVERSITIES[0];

  const handleResetFilters = () => {
    setSelectedUniversity('all');
    setSelectedCategory('All');
    setSelectedCondition('All');
    setPriceFilter(350000);
    setSearchQuery('');
    setListingViewFilter('all');
  };

  const hasActiveFilters = selectedUniversity !== 'all' || 
    selectedCategory !== 'All' || 
    selectedCondition !== 'All' || 
    priceFilter < 350000 || 
    searchQuery !== '' || 
    listingViewFilter !== 'all';

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Popular Categories Cards */}
      <PopularCategories />

      {/* Campus Listings Main Section */}
      <div id="campus-listings-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Section Header & Sub-Tabs */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-gray-200">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block">
              ● Live Campus Feed
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Featured Campus Listings
            </h2>
          </div>

          {/* Quick Sub-Filter Tabs (All Items, Hostel Safe, Urgent Sales) */}
          <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl text-xs font-bold self-start sm:self-auto">
            <button
              onClick={() => setListingViewFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                listingViewFilter === 'all'
                  ? 'bg-white text-gray-900 shadow-2xs font-extrabold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Items ({products.length})
            </button>
            <button
              onClick={() => setListingViewFilter('hostel_safe')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                listingViewFilter === 'hostel_safe'
                  ? 'bg-white text-emerald-800 shadow-2xs font-extrabold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Hostel Safe
            </button>
            <button
              onClick={() => setListingViewFilter('urgent')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
                listingViewFilter === 'urgent'
                  ? 'bg-white text-rose-700 shadow-2xs font-extrabold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-600" />
              <span>Urgent Sales</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            
            {/* University Filter */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-700">Campus:</span>
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-800 font-semibold px-2.5 py-1.5 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="all">All Nigerian Campuses</option>
                {NIGERIAN_UNIVERSITIES.map(u => (
                  <option key={u.id} value={u.id}>{u.shortName}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-700">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ProductCategory | 'All')}
                className="bg-gray-50 border border-gray-200 text-gray-800 font-semibold px-2.5 py-1.5 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Textbooks & Handouts">📚 Textbooks</option>
                <option value="Laptops & Gadgets">💻 Laptops & Gadgets</option>
                <option value="Hostel Appliances">⚡ Appliances</option>
                <option value="Bedspace & Sublets">🛏️ Bedspaces</option>
                <option value="Campus Fashion">👕 Fashion</option>
                <option value="Campus Gigs & Tech Services">🛠️ Services</option>
              </select>
            </div>

            {/* Condition Filter */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-700">Condition:</span>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value as CampusCondition | 'All')}
                className="bg-gray-50 border border-gray-200 text-gray-800 font-semibold px-2.5 py-1.5 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="All">Any Condition</option>
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="Fairly Used (Clean)">Fairly Used</option>
                <option value="Good Condition">Good Condition</option>
                <option value="Move-in Ready">Move-in Ready</option>
              </select>
            </div>

            {/* Price Max Slider */}
            <div className="flex items-center gap-2 min-w-[200px]">
              <span className="font-bold text-gray-700">Max:</span>
              <input
                type="range"
                min="5000"
                max="350000"
                step="5000"
                value={priceFilter}
                onChange={(e) => setPriceFilter(Number(e.target.value))}
                className="w-24 sm:w-28 accent-emerald-600"
              />
              <span className="font-black text-emerald-700 text-xs">
                {priceFilter >= 350000 ? '₦350k+' : formatNaira(priceFilter)}
              </span>
            </div>

            {/* Reset Filter Button */}
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}

          </div>
        </div>

        {/* Listings Grid */}
        <div className="mt-6">
          {filteredListings.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-lg mx-auto">
              <div className="w-14 h-14 bg-gray-100 text-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <SlidersHorizontal className="w-7 h-7" />
              </div>
              <h3 className="font-black text-gray-900 text-lg">No listings match your criteria</h3>
              <p className="mt-1 text-xs text-gray-500">
                Try widening your price range, clearing keywords, or selecting "All Campuses".
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredListings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>

        {/* Graduation Room Clearing CTA Banner (Matches Screenshot 3) */}
        <div className="mt-12 bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-emerald-300 font-extrabold uppercase text-xs tracking-wider block mb-2">
              ✨ Clear Your Hostel • Pass It Down
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Graduating or Clearing Your Room? Sell to incoming freshers in minutes.
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Don't abandon good hostel furniture, textbooks, gas burners, or electronics. Connect with thousands of verified tertiary students arriving across campuses each week.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsPostModalOpen(true)}
                className="px-6 py-3 bg-white text-emerald-950 hover:bg-emerald-50 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4 text-emerald-700" />
                <span>Post a Free Campus Listing Now</span>
              </button>
              <button
                onClick={() => setCurrentView('safety')}
                className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Safety Guide</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Campus Meeting Spot Protocol (Matches Screenshot 4) */}
        <div className="mt-8 bg-emerald-50/80 border border-emerald-200/80 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 font-bold shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                Campus Protocol
              </span>
              <h4 className="text-base font-black text-emerald-950">
                Meeting Spot Safety: Trade in Broad Daylight
              </h4>
              <p className="mt-1 text-xs text-emerald-900/80 leading-relaxed max-w-xl">
                Always meet at designated student landmarks: the SUB Cafeteria, University Main Library front steps, or your Faculty quadrangle. Never agree to off-campus or late-night handoffs.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsPostModalOpen(true)}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex-shrink-0 cursor-pointer"
          >
            Sell on Campus Free
          </button>
        </div>

      </div>
    </div>
  );
};
