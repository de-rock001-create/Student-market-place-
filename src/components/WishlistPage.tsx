import React, { useState } from 'react';
import { 
  Heart, 
  Trash2, 
  ArrowLeft, 
  ShoppingBag, 
  ShieldCheck, 
  MapPin, 
  MessageSquare, 
  ExternalLink,
  Search,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatNaira, generateWhatsAppUrl } from '../utils/formatters';

export const WishlistPage: React.FC = () => {
  const { 
    currentUser, 
    wishlistProducts, 
    removeFromWishlist, 
    clearWishlist, 
    setCurrentView,
    setActiveProductDetail,
    openChatForProduct,
    incrementWhatsAppLead,
    setIsAuthModalOpen
  } = useApp();

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  // Calculate total wishlist value
  const totalValue = wishlistProducts.reduce((sum, item) => sum + item.price, 0);

  const filteredItems = wishlistProducts.filter(item => {
    const matchesCat = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                          item.hostelOrFaculty.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">
          Sign In to Access Your Wishlist
        </h2>
        <p className="mt-2 text-sm text-gray-600 max-w-md mx-auto">
          Wishlists are tied securely to your verified student profile so you can track textbooks, laptops, and hostel deals across devices.
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm transition-all cursor-pointer"
        >
          Sign In or Select Demo Student
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <button
            onClick={() => setCurrentView('marketplace')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Marketplace</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <span>My Campus Wishlist</span>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-sm font-extrabold">
                {wishlistProducts.length}
              </span>
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Saved items tied to <strong className="text-gray-800">{currentUser.fullName}</strong> ({currentUser.universityName} • {currentUser.studyLevel})
          </p>
        </div>

        {wishlistProducts.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-gray-400 font-medium">Total Saved Value</div>
              <div className="text-lg font-black text-emerald-700 leading-tight">
                {formatNaira(totalValue)}
              </div>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all items from your wishlist?')) {
                  clearWishlist();
                }
              }}
              className="px-3.5 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl border border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        /* Empty State */
        <div className="max-w-md mx-auto py-20 text-center">
          <div className="w-20 h-20 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-100 shadow-2xs">
            <Heart className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h3 className="text-xl font-black text-gray-900">Your Wishlist is Empty</h3>
          <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed">
            Found something you like? Click the heart icon on any campus listing or on the product details page to save it here for quick access.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setCurrentView('marketplace')}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-2 mx-auto"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Campus Deals</span>
            </button>
          </div>
        </div>
      ) : (
        /* Wishlist Content */
        <div className="mt-6">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search within saved items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 text-xs">
              <span className="text-gray-400 font-medium text-[11px] flex-shrink-0">Category:</span>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-800 font-semibold px-2.5 py-1.5 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="all">All Categories ({wishlistProducts.length})</option>
                <option value="Textbooks & Handouts">Textbooks</option>
                <option value="Laptops & Gadgets">Laptops & Gadgets</option>
                <option value="Hostel Appliances">Hostel Appliances</option>
                <option value="Bedspace & Sublets">Bedspace & Sublets</option>
                <option value="Campus Fashion">Campus Fashion</option>
                <option value="Campus Gigs & Tech Services">Services</option>
              </select>
            </div>
          </div>

          {/* Wishlist Items List / Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => {
              const whatsAppUrl = generateWhatsAppUrl(item.sellerPhone, item.title, item.price);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div className="p-4">
                    {/* Image & Main Info */}
                    <div className="flex gap-4">
                      <div 
                        onClick={() => setActiveProductDetail(item)}
                        className="relative w-24 h-24 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 cursor-pointer"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-emerald-800/90 text-white text-[9px] font-extrabold uppercase">
                          {item.universityName.includes('(') ? item.universityName.split('(')[1]?.replace(')', '') : item.universityName}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                            {item.condition}
                          </span>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="p-1 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <h4 
                          onClick={() => setActiveProductDetail(item)}
                          className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 hover:text-emerald-700 cursor-pointer"
                        >
                          {item.title}
                        </h4>

                        <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-500 truncate">
                          <MapPin className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{item.hostelOrFaculty}</span>
                        </div>

                        <div className="mt-2 text-base font-black text-emerald-700">
                          {formatNaira(item.price)}
                        </div>
                      </div>
                    </div>

                    {/* Seller details */}
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={item.sellerAvatar}
                          alt={item.sellerName}
                          className="w-4 h-4 rounded-full object-cover border border-emerald-400"
                        />
                        <span className="text-[11px] text-gray-600 font-medium">
                          {item.sellerName} ({item.sellerDept})
                        </span>
                        {item.sellerIsVerified && (
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {item.status === 'active' ? '🟢 Available' : '🟡 In Trade'}
                      </span>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => incrementWhatsAppLead(item.id)}
                      className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                    >
                      <span>WhatsApp Seller</span>
                    </a>

                    <button
                      onClick={() => openChatForProduct(item)}
                      className="p-2 rounded-xl bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 transition-colors cursor-pointer"
                      title="UniChat"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setActiveProductDetail(item)}
                      className="py-2 px-3 rounded-xl bg-white hover:bg-gray-100 text-gray-700 text-xs font-bold border border-gray-200 transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
