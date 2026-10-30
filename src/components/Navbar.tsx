import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  Heart, 
  PlusCircle, 
  ShieldCheck, 
  Bell, 
  User, 
  LogOut, 
  ChevronDown, 
  Sparkles, 
  GraduationCap, 
  LayoutDashboard,
  Menu,
  X,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NIGERIAN_UNIVERSITIES } from '../data/universities';
import { DEMO_USERS } from '../data/mockData';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    isAuthenticated,
    logoutUser,
    switchDemoUser,
    wishlistIds,
    selectedUniversity,
    setSelectedUniversity,
    searchQuery,
    setSearchQuery,
    currentView,
    setCurrentView,
    setIsPostModalOpen,
    setIsAuthModalOpen,
    setIsVerifyModalOpen,
    showToast
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCampusDropdownOpen, setIsCampusDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const campusMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (campusMenuRef.current && !campusMenuRef.current.contains(e.target as Node)) {
        setIsCampusDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeUni = NIGERIAN_UNIVERSITIES.find(u => u.id === selectedUniversity) || NIGERIAN_UNIVERSITIES[0];

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Campus Selector */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <button 
              onClick={() => setCurrentView('marketplace')}
              className="flex items-center gap-2 group text-left cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-xs group-hover:bg-emerald-700 transition-colors">
                U
              </div>
              <div>
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-gray-900 group-hover:text-emerald-700 transition-colors">
                  UniMarket<span className="text-emerald-600">.ng</span>
                </span>
                <span className="hidden sm:inline-block ml-1.5 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded">
                  Campus P2P
                </span>
              </div>
            </button>

            {/* Campus Selector Dropdown */}
            <div className="relative" ref={campusMenuRef}>
              <button
                onClick={() => setIsCampusDropdownOpen(!isCampusDropdownOpen)}
                className="hidden md:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-800 transition-colors cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="max-w-[140px] truncate">{activeUni.shortName}</span>
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </button>

              {isCampusDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Select Your University
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    <button
                      onClick={() => {
                        setSelectedUniversity('all');
                        setIsCampusDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-emerald-50 cursor-pointer ${
                        selectedUniversity === 'all' ? 'text-emerald-700 bg-emerald-50 font-bold' : 'text-gray-700'
                      }`}
                    >
                      <span>All Campuses (Nationwide)</span>
                      {selectedUniversity === 'all' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                    {NIGERIAN_UNIVERSITIES.map((uni) => (
                      <button
                        key={uni.id}
                        onClick={() => {
                          setSelectedUniversity(uni.id);
                          setIsCampusDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 cursor-pointer ${
                          selectedUniversity === uni.id ? 'text-emerald-700 bg-emerald-50 font-bold' : 'text-gray-700'
                        }`}
                      >
                        <div>
                          <div className="font-semibold">{uni.shortName} - {uni.fullName}</div>
                          <div className="text-[10px] text-gray-400">{uni.mainCampus} • {uni.state}</div>
                        </div>
                        {selectedUniversity === uni.id && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={`Search books, gadgets, hostel items in ${activeUni.shortName}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 hover:bg-gray-100/80 focus:bg-white text-xs sm:text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-xs"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setCurrentView('marketplace')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                currentView === 'marketplace'
                  ? 'bg-emerald-50 text-emerald-700 font-bold'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              Marketplace
            </button>

            {/* Dedicated Wishlist Tab */}
            <button
              onClick={() => setCurrentView('wishlist')}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentView === 'wishlist'
                  ? 'bg-rose-50 text-rose-700 font-bold'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${currentView === 'wishlist' ? 'text-rose-600 fill-rose-600' : 'text-gray-500'}`} />
              <span>Wishlist</span>
              {wishlistIds.length > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 bg-rose-500 text-white text-[10px] font-bold rounded-full animate-in zoom-in">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                currentView === 'dashboard'
                  ? 'bg-emerald-50 text-emerald-700 font-bold'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setCurrentView('safety')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                currentView === 'safety'
                  ? 'bg-emerald-50 text-emerald-700 font-bold'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safety Tips</span>
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Post Ad Button */}
            <button
              onClick={() => {
                if (!currentUser) {
                  setIsAuthModalOpen(true);
                } else {
                  setIsPostModalOpen(true);
                }
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm hover:shadow transition-all transform active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="whitespace-nowrap">+ Sell Item</span>
            </button>

            {/* User Profile / Menu */}
            {currentUser ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1 pl-1.5 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all cursor-pointer"
                >
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.fullName}
                    className="w-7 h-7 rounded-lg object-cover border border-emerald-500"
                  />
                  <div className="hidden sm:block text-left text-xs">
                    <div className="font-bold text-gray-800 leading-tight flex items-center gap-1">
                      {currentUser.fullName.split(' ')[0]}
                      {currentUser.isVerified && (
                        <ShieldCheck className="w-3 h-3 text-emerald-600 fill-emerald-100" />
                      )}
                    </div>
                    <div className="text-[10px] text-gray-500 leading-none">
                      {currentUser.studyLevel}
                    </div>
                  </div>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    {/* User Mini Card */}
                    <div className="px-4 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <img
                          src={currentUser.avatarUrl}
                          alt={currentUser.fullName}
                          className="w-10 h-10 rounded-xl object-cover border-2 border-emerald-500"
                        />
                        <div>
                          <div className="font-bold text-sm text-gray-900 flex items-center gap-1">
                            {currentUser.fullName}
                            {currentUser.isVerified && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                                Verified
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-600">{currentUser.universityName}</div>
                          <div className="text-[11px] text-emerald-700 font-medium">
                            {currentUser.department} • {currentUser.studyLevel}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu links */}
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setCurrentView('dashboard');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                        <span>Seller Dashboard Hub</span>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentView('wishlist');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <Heart className="w-4 h-4 text-rose-500" />
                          <span>My Campus Wishlist</span>
                        </div>
                        {wishlistIds.length > 0 && (
                          <span className="px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
                            {wishlistIds.length}
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setIsVerifyModalOpen(true);
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <GraduationCap className="w-4 h-4 text-indigo-600" />
                        <span>
                          {currentUser.isVerified ? 'Matric ID & Verification Badge' : 'Get Verified Student Badge'}
                        </span>
                      </button>
                    </div>

                    {/* Switch Demo Accounts */}
                    <div className="border-t border-gray-100 pt-1 pb-1">
                      <div className="px-4 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Switch Student Profile (Demo)
                      </div>
                      {DEMO_USERS.map(demo => (
                        <button
                          key={demo.id}
                          onClick={() => {
                            switchDemoUser(demo.id);
                            setIsUserMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-1.5 text-xs flex items-center justify-between hover:bg-emerald-50 cursor-pointer ${
                            currentUser.id === demo.id ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-gray-600'
                          }`}
                        >
                          <div>
                            <div className="font-medium">{demo.fullName}</div>
                            <div className="text-[10px] text-gray-400">{demo.universityName} • {demo.studyLevel}</div>
                          </div>
                          {currentUser.id === demo.id && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={() => {
                          logoutUser();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-3 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 space-y-2">
            <div className="px-1">
              <input
                type="text"
                placeholder="Search campus marketplace..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-1 pt-2">
              <button
                onClick={() => {
                  setCurrentView('marketplace');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-xs font-semibold text-left ${currentView === 'marketplace' ? 'bg-emerald-50 text-emerald-800' : 'text-gray-700'}`}
              >
                Marketplace
              </button>
              <button
                onClick={() => {
                  setCurrentView('wishlist');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-xs font-semibold text-left flex items-center justify-between ${currentView === 'wishlist' ? 'bg-rose-50 text-rose-800' : 'text-gray-700'}`}
              >
                <span>Wishlist</span>
                {wishlistIds.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px]">
                    {wishlistIds.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  setCurrentView('dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-xs font-semibold text-left ${currentView === 'dashboard' ? 'bg-emerald-50 text-emerald-800' : 'text-gray-700'}`}
              >
                Seller Dashboard
              </button>
              <button
                onClick={() => {
                  setCurrentView('safety');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-xs font-semibold text-left ${currentView === 'safety' ? 'bg-emerald-50 text-emerald-800' : 'text-gray-700'}`}
              >
                Safety & Safe Spots
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
